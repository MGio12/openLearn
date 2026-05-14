// Project/App: GSD-2
// File Purpose: Thin adapter for workflow turn observer reporting.
export function createWorkflowTurnReporter(input) {
    let finished = false;
    const now = input.now ?? (() => new Date().toISOString());
    return {
        start() {
            input.observer?.onTurnStart({
                traceId: input.traceId,
                turnId: input.turnId,
                iteration: input.iteration,
                basePath: input.basePath,
                startedAt: input.startedAt,
            });
        },
        finish(finishInput) {
            if (finished)
                return;
            finished = true;
            input.observer?.onTurnResult({
                traceId: input.traceId,
                turnId: input.turnId,
                iteration: input.iteration,
                unitType: finishInput.unitType,
                unitId: finishInput.unitId,
                status: finishInput.status,
                failureClass: finishInput.failureClass ?? "none",
                phaseResults: [],
                error: finishInput.error,
                startedAt: input.startedAt,
                finishedAt: now(),
            });
            input.clearCurrentTurn();
        },
    };
}
