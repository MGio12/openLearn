// Project/App: GSD-2
// File Purpose: Custom-engine iteration-data adapter for auto-mode loop.
export async function buildCustomEngineIterationData(input) {
    const gsdState = await input.deriveState(input.canonicalProjectRoot);
    input.logPostDerive({
        site: "custom-engine-gsd-state",
        basePath: input.basePath,
        canonicalProjectRoot: input.canonicalProjectRoot,
        derivedPhase: gsdState.phase,
        activeUnit: gsdState.activeTask?.id ?? gsdState.activeSlice?.id ?? gsdState.activeMilestone?.id,
    });
    return {
        unitType: input.step.unitType,
        unitId: input.step.unitId,
        prompt: input.step.prompt,
        finalPrompt: input.step.prompt,
        pauseAfterUatDispatch: false,
        state: gsdState,
        mid: input.currentMilestoneId ?? "workflow",
        midTitle: "Workflow",
        isRetry: false,
        previousTier: undefined,
    };
}
