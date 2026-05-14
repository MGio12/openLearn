// Project/App: GSD-2
// File Purpose: Sidecar iteration-data adapter for auto-mode loop.
export async function buildSidecarIterationData(input) {
    const sidecarState = await input.deriveState(input.canonicalProjectRoot);
    input.logPostDerive({
        site: "sidecar",
        basePath: input.basePath,
        canonicalProjectRoot: input.canonicalProjectRoot,
        derivedPhase: sidecarState.phase,
        activeUnit: sidecarState.activeTask?.id ?? sidecarState.activeSlice?.id ?? sidecarState.activeMilestone?.id,
    });
    return {
        unitType: input.sidecarItem.unitType,
        unitId: input.sidecarItem.unitId,
        prompt: input.sidecarItem.prompt,
        finalPrompt: input.sidecarItem.prompt,
        pauseAfterUatDispatch: false,
        state: sidecarState,
        mid: sidecarState.activeMilestone?.id,
        midTitle: sidecarState.activeMilestone?.title,
        isRetry: false,
        previousTier: undefined,
    };
}
