// GSD auto-mode runtime state
import { AutoSession } from "./auto/session.js";
import { isDeterministicPolicyError, isQueuedUserMessageSkip, isToolInvocationError, markToolEnd as markTrackedToolEnd, markToolStart as markTrackedToolStart, } from "./auto-tool-tracking.js";
export const autoSession = new AutoSession();
export function getAutoRuntimeSnapshot() {
    const orchestrationStatus = autoSession.orchestration?.getStatus();
    return {
        active: autoSession.active,
        paused: autoSession.paused,
        currentUnit: autoSession.currentUnit ? { ...autoSession.currentUnit } : null,
        basePath: autoSession.basePath,
        orchestrationPhase: orchestrationStatus?.phase,
        orchestrationTransitionCount: orchestrationStatus?.transitionCount,
        orchestrationLastTransitionAt: orchestrationStatus?.lastTransitionAt,
    };
}
export function isAutoActive() {
    return autoSession.active;
}
export function isAutoPaused() {
    return autoSession.paused;
}
export function markToolStart(toolCallId, toolName) {
    markTrackedToolStart(toolCallId, autoSession.active, toolName);
}
export function markToolEnd(toolCallId) {
    markTrackedToolEnd(toolCallId);
}
export function recordToolInvocationError(toolName, errorMsg) {
    if (!autoSession.active)
        return;
    if (isToolInvocationError(errorMsg) || isQueuedUserMessageSkip(errorMsg) || isDeterministicPolicyError(errorMsg)) {
        autoSession.lastToolInvocationError = `${toolName}: ${errorMsg}`;
    }
}
export function clearToolInvocationError() {
    if (!autoSession.active)
        return;
    autoSession.lastToolInvocationError = null;
}
