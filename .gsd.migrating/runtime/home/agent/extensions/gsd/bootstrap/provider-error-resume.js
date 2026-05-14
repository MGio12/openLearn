import { getAutoDashboardData, startAuto } from "../auto.js";
import { resetTransientRetryState } from "./agent-end-recovery.js";
const defaultDeps = {
    getSnapshot: () => getAutoDashboardData(),
    resetTransientRetryState,
    startAuto,
};
export async function resumeAutoAfterProviderDelay(pi, ctx, deps = defaultDeps) {
    const snapshot = deps.getSnapshot();
    if (snapshot.active)
        return "already-active";
    if (!snapshot.paused)
        return "not-paused";
    if (!snapshot.basePath) {
        ctx.ui.notify("Provider error recovery delay elapsed, but no paused auto-mode base path was available. Leaving auto-mode paused.", "warning");
        return "missing-base";
    }
    // Reset provider-error retry state before restarting. Session-creation
    // timeout state intentionally survives delayed resumes so the bounded
    // auto-resume limit cannot be reset into an infinite pause/resume loop.
    deps.resetTransientRetryState();
    await deps.startAuto(ctx, pi, snapshot.basePath, false, { step: snapshot.stepMode });
    return "resumed";
}
