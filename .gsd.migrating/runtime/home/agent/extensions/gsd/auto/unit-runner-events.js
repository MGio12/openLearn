// GSD-2 + src/resources/extensions/gsd/auto/unit-runner-events.ts - Classifies agent lifecycle events before Unit settlement.
export function isInternalSessionTransitionAbortEvent(event) {
    return event.abortOrigin === "session-transition";
}
export function shouldIgnoreAgentEndForActiveUnit(event) {
    return isInternalSessionTransitionAbortEvent(event);
}
