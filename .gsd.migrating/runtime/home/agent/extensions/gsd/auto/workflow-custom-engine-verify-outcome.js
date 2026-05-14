// Project/App: GSD-2
// File Purpose: Applies custom-engine verification outcomes to auto-mode loop side effects.
export async function handleCustomEngineVerifyPause(input) {
    await input.deps.pauseAuto();
    input.deps.reportPause({
        unitType: input.unitType,
        unitId: input.unitId,
    });
    input.deps.finishTurn("paused", "manual-attention", "custom-engine-verify-pause");
    return { action: "break" };
}
export async function handleCustomEngineVerifyRetryOutcome(input) {
    if (input.outcome.action === "pause") {
        await input.deps.pauseAuto();
        input.deps.finishTurn("paused", "manual-attention", input.outcome.turnError);
        return { action: "break" };
    }
    if (input.outcome.action === "stop") {
        await input.deps.stopAuto(input.outcome.stopMessage);
        input.deps.finishTurn("stopped", "manual-attention", input.outcome.turnError);
        return { action: "break" };
    }
    input.deps.finishTurn("retry");
    return { action: "continue" };
}
