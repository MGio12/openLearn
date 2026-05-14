// Project/App: GSD-2
// File Purpose: Successful auto-mode iteration cleanup helper.
export function completeWorkflowIteration(state, deps) {
    state.consecutiveErrors = 0;
    state.consecutiveCooldowns = 0;
    state.recentErrorMessages.length = 0;
    deps.emitIterationEnd();
    deps.saveStuckState();
    deps.logIterationComplete();
}
