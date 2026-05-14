// Project/App: GSD-2
// File Purpose: Best-effort worker heartbeat adapter for auto-mode loop.
export function maintainWorkerHeartbeat(session, deps) {
    if (!session.workerId)
        return;
    try {
        deps.heartbeatAutoWorker(session.workerId);
        if (session.currentMilestoneId && session.milestoneLeaseToken) {
            const refreshed = deps.refreshMilestoneLease(session.workerId, session.currentMilestoneId, session.milestoneLeaseToken);
            if (!refreshed) {
                deps.logLeaseRefreshMiss?.({
                    workerId: session.workerId,
                    milestoneId: session.currentMilestoneId,
                    fencingToken: session.milestoneLeaseToken,
                });
                session.milestoneLeaseToken = null;
            }
        }
    }
    catch (err) {
        deps.logHeartbeatFailure(err);
    }
}
