// Project/App: GSD-2
// File Purpose: Thin adapter for auto-mode workflow journal event emission.
export function createWorkflowJournalReporter(input) {
    const now = input.now ?? (() => new Date().toISOString());
    return {
        emit(eventType, data) {
            input.emitJournalEvent({
                ts: now(),
                flowId: input.flowId,
                seq: input.nextSeq(),
                eventType,
                data,
            });
        },
    };
}
