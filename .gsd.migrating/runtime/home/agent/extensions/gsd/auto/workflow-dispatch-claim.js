// Project/App: GSD-2
// File Purpose: Best-effort unit dispatch claim adapter for auto-mode loop.
export function ensureDispatchLease(s, milestoneId, deps, opts = {}) {
    if (!s.workerId)
        return { kind: "degraded", reason: "missing-worker" };
    if (!milestoneId)
        return { kind: "degraded", reason: "missing-milestone" };
    if (!opts.forceReclaim && typeof s.milestoneLeaseToken === "number") {
        return { kind: "ready", token: s.milestoneLeaseToken, recovered: false };
    }
    s.milestoneLeaseToken = null;
    try {
        const claim = deps.claimMilestoneLease(s.workerId, milestoneId);
        if (!claim.ok) {
            const reason = `Milestone ${milestoneId} is held by worker ${claim.byWorker} until ${claim.expiresAt}.`;
            deps.logLeaseRecoveryFailed({ milestoneId, workerId: s.workerId, reason });
            return { kind: "blocked", reason };
        }
        s.currentMilestoneId = milestoneId;
        s.milestoneLeaseToken = claim.token;
        deps.logLeaseRecovered({
            milestoneId,
            workerId: s.workerId,
            token: claim.token,
            recovered: opts.forceReclaim === true,
        });
        return { kind: "ready", token: claim.token, recovered: opts.forceReclaim === true };
    }
    catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        deps.logLeaseRecoveryFailed({ milestoneId, workerId: s.workerId, reason });
        return { kind: "failed", reason };
    }
}
export function openDispatchClaim(s, flowId, turnId, iterData, deps) {
    if (!s.workerId || typeof s.milestoneLeaseToken !== "number")
        return { kind: "degraded" };
    const mid = iterData.mid;
    if (!mid)
        return { kind: "degraded" };
    const recent = deps.getRecentDispatchesForUnit(iterData.unitId, 1);
    const attemptN = (recent[0]?.attempt_n ?? 0) + 1;
    try {
        const claim = deps.recordDispatchClaim({
            traceId: flowId,
            turnId,
            workerId: s.workerId,
            milestoneLeaseToken: s.milestoneLeaseToken,
            milestoneId: mid,
            sliceId: iterData.state.activeSlice?.id ?? null,
            taskId: iterData.state.activeTask?.id ?? null,
            unitType: iterData.unitType,
            unitId: iterData.unitId,
            attemptN,
        });
        if (!claim.ok) {
            deps.logClaimRejected({
                unitId: iterData.unitId,
                reason: claim.error,
                existingId: claim.existingId,
                existingWorker: claim.existingWorker,
            });
            if (claim.error === "already_active") {
                return {
                    kind: "skip",
                    reason: "already-active",
                    existingId: claim.existingId,
                    existingWorker: claim.existingWorker,
                };
            }
            return { kind: "skip", reason: "stale-lease" };
        }
        deps.markDispatchRunning(claim.dispatchId);
        return { kind: "opened", dispatchId: claim.dispatchId };
    }
    catch (err) {
        deps.logClaimFailed(err);
        return { kind: "degraded" };
    }
}
