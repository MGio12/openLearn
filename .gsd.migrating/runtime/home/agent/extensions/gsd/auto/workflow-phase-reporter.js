// Project/App: GSD-2
// File Purpose: Thin adapter for auto-mode UOK phase-result reporting.
export function createWorkflowPhaseReporter(input) {
    return {
        report(phase, action, data) {
            input.observer?.onPhaseResult(phase, action, data);
        },
    };
}
