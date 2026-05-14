// Project/App: GSD-2
// File Purpose: Best-effort dispatch ledger write helpers for auto-mode loop adapters.
export function settleDispatchFailed(dispatchId, errorSummary, deps) {
    if (dispatchId === null)
        return false;
    try {
        deps.markFailed(dispatchId, { errorSummary });
        return true;
    }
    catch (err) {
        deps.logWriteFailure(err);
        return false;
    }
}
export function settleDispatchCompleted(dispatchId, deps) {
    if (dispatchId === null)
        return false;
    try {
        deps.markCompleted(dispatchId);
        return true;
    }
    catch (err) {
        deps.logWriteFailure(err);
        return false;
    }
}
