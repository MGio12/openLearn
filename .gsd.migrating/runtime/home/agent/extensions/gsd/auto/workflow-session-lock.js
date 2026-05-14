// Project/App: GSD-2
// File Purpose: Session-lock validation adapter for auto-mode loop.
import { decideWorkflowLoop, } from "./workflow-kernel.js";
export function validateWorkflowSessionLock(input) {
    const sessionLockBase = input.deps.lockBase();
    if (!sessionLockBase)
        return { action: "continue" };
    const lockStatus = input.deps.validateSessionLock(sessionLockBase);
    const detail = lockStatus.failureReason ?? "unknown";
    const lockDecision = decideWorkflowLoop({
        active: input.active,
        iteration: input.iteration,
        maxIterations: input.maxIterations,
        hasCommandContext: true,
        sessionLockValid: lockStatus.valid,
        sessionLockReason: detail,
    });
    if (lockDecision.action !== "stop" || lockDecision.reason !== "session-lock-lost") {
        return { action: "continue" };
    }
    input.deps.logInvalidSessionLock({
        reason: detail,
        existingPid: lockStatus.existingPid,
        expectedPid: lockStatus.expectedPid,
    });
    input.deps.handleLostSessionLock(lockStatus);
    input.deps.logSessionLockExit({
        reason: lockDecision.reason,
        detail,
    });
    return {
        action: "stop",
        reason: lockDecision.reason,
    };
}
