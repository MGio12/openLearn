// Project/App: GSD-2
// File Purpose: ADR-017 typed reconciliation failure for Recovery Classification.
/**
 * Thrown by reconcileBeforeDispatch when:
 *   - one or more repair functions throw within a pass (`failures` populated), or
 *   - drift persists after the cap=2 lifecycle (`persistentDrift` populated).
 *
 * Recovery Classification recognizes this error via instanceof and maps it to
 * failureKind "reconciliation-drift" with action "escalate".
 */
export class ReconciliationFailedError extends Error {
    failures;
    detectionFailures;
    persistentDrift;
    pass;
    constructor(opts) {
        super(formatMessage(opts));
        this.name = "ReconciliationFailedError";
        this.failures = opts.failures ?? [];
        this.detectionFailures = opts.detectionFailures ?? [];
        this.persistentDrift = opts.persistentDrift ?? [];
        this.pass = opts.pass;
    }
}
function formatMessage(opts) {
    if (opts.detectionFailures && opts.detectionFailures.length > 0) {
        const kinds = opts.detectionFailures.map((f) => f.handlerKind).join(", ");
        const passSuffix = opts.pass !== undefined ? ` in pass ${opts.pass}` : "";
        return `Reconciliation detect failed${passSuffix} for handlers: ${kinds}`;
    }
    if (opts.failures && opts.failures.length > 0) {
        const kinds = opts.failures.map((f) => f.drift.kind).join(", ");
        const passSuffix = opts.pass !== undefined ? ` in pass ${opts.pass}` : "";
        return `Reconciliation repair failed${passSuffix} for drift kinds: ${kinds}`;
    }
    if (opts.persistentDrift && opts.persistentDrift.length > 0) {
        const kinds = opts.persistentDrift.map((d) => d.kind).join(", ");
        return `Reconciliation drift persisted after cap=2 passes: ${kinds}`;
    }
    return "Reconciliation failed";
}
