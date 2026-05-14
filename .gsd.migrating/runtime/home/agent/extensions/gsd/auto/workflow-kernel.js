// Project/App: GSD-2
// File Purpose: Pure workflow-loop decisions for auto-mode before side-effect adapters run.
export function decideWorkflowLoop(input) {
    if (!input.active) {
        return {
            action: "stop",
            reason: "inactive",
            message: "Auto-mode is not active.",
        };
    }
    if (input.iteration > input.maxIterations) {
        return {
            action: "stop",
            reason: "max-iterations",
            message: `Safety: loop exceeded ${input.maxIterations} iterations.`,
        };
    }
    if (!input.hasCommandContext) {
        return {
            action: "stop",
            reason: "missing-command-context",
            message: "Auto-mode has no command context for dispatch.",
        };
    }
    if (!input.sessionLockValid) {
        return {
            action: "stop",
            reason: "session-lock-lost",
            message: input.sessionLockReason
                ? `Session lock lost: ${input.sessionLockReason}.`
                : "Session lock lost.",
        };
    }
    return { action: "continue" };
}
export function decideDispatchClaim(input) {
    if (input.kind === "skip") {
        return {
            action: "skip",
            reason: input.reason,
        };
    }
    if (input.kind === "opened") {
        return {
            action: "run",
            dispatchId: input.dispatchId,
        };
    }
    return {
        action: "run",
        dispatchId: null,
    };
}
export function decideEngineDispatch(input) {
    if (input.action === "stop") {
        return {
            action: "stop",
            reason: input.reason ?? "Engine stopped",
        };
    }
    if (input.action === "skip") {
        return { action: "skip" };
    }
    return { action: "dispatch" };
}
export function decideFinalizeResult(input) {
    if (input.action === "break") {
        const reason = input.reason ?? "unknown";
        return {
            action: "stop",
            failureClass: reason === "git-closeout-failure" ? "git" : "closeout",
            ledgerErrorSummary: `finalize-break:${reason}`,
            turnError: "finalize-break",
        };
    }
    if (input.action === "continue") {
        return {
            action: "retry",
            ledgerErrorSummary: "finalize-retry",
        };
    }
    return { action: "complete" };
}
export function decideEngineReconcile(input) {
    if (input.outcome === "milestone-complete") {
        return {
            action: "complete-workflow",
            stopReason: "Workflow complete",
        };
    }
    if (input.outcome === "pause") {
        return { action: "pause" };
    }
    if (input.outcome === "stop") {
        return {
            action: "stop",
            reason: input.reason ?? "Engine stopped",
        };
    }
    return { action: "continue" };
}
export function decideMemoryPressure(input) {
    if (!input.pressured) {
        return { action: "continue" };
    }
    const pct = Math.round(input.pct * 100);
    return {
        action: "stop",
        warningMessage: `Memory pressure: ${input.heapMB}MB / ${input.limitMB}MB (${pct}%) — stopping auto-mode to prevent OOM kill`,
        stopMessage: `Memory pressure: heap at ${input.heapMB}MB / ${input.limitMB}MB (${pct}%). ` +
            `Stopping gracefully to prevent OOM kill after ${input.iteration} iterations. ` +
            "Resume with /gsd auto to continue from where you left off.",
        turnError: "memory-pressure",
    };
}
export function decideMinRequestInterval(input) {
    if (input.minIntervalMs <= 0 || input.lastRequestTimestamp <= 0) {
        return { action: "continue" };
    }
    const elapsedMs = input.nowMs - input.lastRequestTimestamp;
    if (elapsedMs >= input.minIntervalMs) {
        return { action: "continue" };
    }
    return {
        action: "wait",
        waitMs: input.minIntervalMs - elapsedMs,
    };
}
export function decideCooldownRecovery(input) {
    if (input.consecutiveCooldowns > input.maxCooldownRetries) {
        return {
            action: "stop",
            notifyMessage: `Auto-mode stopped: ${input.consecutiveCooldowns} consecutive credential cooldowns — ` +
                "rate limit or quota may be persistently exhausted.",
            stopMessage: `${input.consecutiveCooldowns} consecutive credential cooldowns exceeded retry budget`,
        };
    }
    const waitMs = input.retryAfterMs !== undefined && input.retryAfterMs > 0 && input.retryAfterMs <= 60_000
        ? input.retryAfterMs + 500
        : input.fallbackWaitMs;
    return {
        action: "wait",
        waitMs,
        notifyMessage: `Credentials in cooldown (${input.consecutiveCooldowns}/${input.maxCooldownRetries}) — ` +
            `waiting ${Math.round(waitMs / 1000)}s before retrying.`,
    };
}
export function decideIterationErrorRecovery(input) {
    if (input.consecutiveErrors >= 3) {
        const errorHistory = input.recentErrorMessages
            .map((message, index) => `  ${index + 1}. ${message}`)
            .join("\n");
        return {
            action: "stop",
            notifyMessage: `Auto-mode stopped: ${input.consecutiveErrors} consecutive iteration failures:\n${errorHistory}`,
            stopMessage: `${input.consecutiveErrors} consecutive iteration failures`,
            turnStatus: "failed",
        };
    }
    if (input.consecutiveErrors === 2) {
        return {
            action: "invalidate-and-retry",
            notifyMessage: `Iteration error (attempt ${input.consecutiveErrors}): ` +
                `${input.currentErrorMessage}. Invalidating caches and retrying.`,
            turnStatus: "retry",
        };
    }
    return {
        action: "retry",
        notifyMessage: `Iteration error: ${input.currentErrorMessage}. Retrying.`,
        turnStatus: "retry",
    };
}
export function decideCustomEngineVerifyRetry(input) {
    return input.attempts > input.maxRetries
        ? { action: "recover" }
        : { action: "retry" };
}
export function shouldUseCustomEnginePath(input) {
    return input.activeEngineId != null
        && input.activeEngineId !== "dev"
        && !input.hasSidecarItem
        && !input.engineBypass;
}
export function resolveUnitRequestTimestamp(input) {
    const requestTimestamp = input.requestDispatchedAt ?? input.unitStartedAt;
    return typeof requestTimestamp === "number" ? requestTimestamp : undefined;
}
export function decideCustomEngineRecovery(input) {
    const exhaustedTurnError = "custom-engine-verify-retry-exhausted";
    if (input.outcome === "pause") {
        return {
            action: "pause",
            turnError: input.reason ?? exhaustedTurnError,
        };
    }
    if (input.outcome === "skip") {
        return {
            action: "stop",
            stopMessage: input.reason ??
                `Custom workflow verification for ${input.unitId} requested skip after retry exhaustion, but the custom engine cannot reconcile skipped steps.`,
            turnError: exhaustedTurnError,
        };
    }
    const exhaustedReason = `Custom workflow verification for ${input.unitId} requested retry ${input.attempts} times without passing.`;
    return {
        action: "stop",
        stopMessage: input.outcome === "stop" && input.reason ? input.reason : exhaustedReason,
        turnError: exhaustedTurnError,
    };
}
export function decideInfrastructureError(input) {
    return {
        notifyMessage: `Auto-mode stopped: infrastructure error ${input.code} — ${input.errorMessage}`,
        stopMessage: `Infrastructure error (${input.code}): not recoverable by retry`,
        turnStatus: "failed",
        failureClass: "execution",
    };
}
export function decideModelPolicyBlocked(input) {
    return {
        notifyMessage: `Auto-mode paused: model-policy denied dispatch for ${input.unitType}/${input.unitId}. ${input.errorMessage}`,
        journalData: {
            unitType: input.unitType,
            unitId: input.unitId,
            status: "blocked",
            reason: "model-policy-dispatch-blocked",
            reasons: input.reasons,
        },
        turnStatus: "paused",
        failureClass: "manual-attention",
    };
}
export function decideDispatchNodeKind(unitType, sidecarKind) {
    if (sidecarKind === "hook")
        return "hook";
    if (sidecarKind === "triage")
        return "verification";
    if (sidecarKind === "quick-task")
        return "team-worker";
    if (unitType.startsWith("hook/"))
        return "hook";
    if (unitType === "reactive-execute")
        return "subagent";
    if (unitType === "gate-evaluate"
        || unitType === "validate-milestone"
        || unitType === "run-uat"
        || unitType === "complete-slice") {
        return "verification";
    }
    if (unitType === "replan-slice" || unitType === "reassess-roadmap") {
        return "reprocess";
    }
    return "unit";
}
export function formatDispatchExceptionSummary(input) {
    const message = input.error instanceof Error ? input.error.message : String(input.error);
    return `exception:${message}`;
}
export function formatUnhandledDispatchErrorSummary(input) {
    const message = input.error instanceof Error ? input.error.message : String(input.error);
    return `unhandled-error:${message.slice(0, 200)}`;
}
