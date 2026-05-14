// Project/App: GSD-2
// File Purpose: Applies custom-engine dispatch decisions to auto-mode loop side effects.
export async function handleCustomEngineDispatchOutcome(input) {
    if (input.decision.action === "stop") {
        await input.deps.stopAuto(input.decision.reason);
        return { action: "break" };
    }
    if (input.decision.action === "skip") {
        return { action: "continue" };
    }
    return { action: "dispatch" };
}
