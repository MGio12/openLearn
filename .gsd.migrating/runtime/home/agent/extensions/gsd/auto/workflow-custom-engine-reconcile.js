// Project/App: GSD-2
// File Purpose: Custom-engine successful verification reconcile adapter for auto-mode loop.
import { decideEngineReconcile, } from "./workflow-kernel.js";
export async function handleCustomEngineReconcile(input) {
    input.session.verificationRetryCount?.delete(`${input.iterData.unitType}/${input.iterData.unitId}`);
    input.deps.saveRetryCounts();
    input.deps.logReconcile({
        iteration: input.iteration,
        unitId: input.iterData.unitId,
    });
    const finishedAt = input.deps.now();
    const reconcileResult = await input.deps.reconcile(input.engineState, {
        unitType: input.iterData.unitType,
        unitId: input.iterData.unitId,
        startedAt: input.session.currentUnit?.startedAt ?? finishedAt,
        finishedAt,
    });
    input.deps.clearUnitTimeout();
    input.deps.completeIteration();
    return {
        decision: decideEngineReconcile(reconcileResult.outcome === "stop"
            ? { outcome: "stop", reason: reconcileResult.reason }
            : { outcome: reconcileResult.outcome }),
        reason: reconcileResult.reason,
    };
}
