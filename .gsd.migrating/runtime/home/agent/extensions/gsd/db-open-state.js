// Project/App: GSD-2
// File Purpose: Tracks database open attempt and error status for the GSD database facade.
export class DbOpenState {
    attempted = false;
    lastError = null;
    lastPhase = null;
    markAttempted() {
        this.attempted = true;
    }
    clearError() {
        this.lastError = null;
        this.lastPhase = null;
    }
    recordError(phase, error) {
        this.lastPhase = phase;
        this.lastError = error instanceof Error ? error : new Error(String(error));
    }
    reset() {
        this.attempted = false;
        this.clearError();
    }
    snapshot() {
        return {
            attempted: this.attempted,
            lastError: this.lastError,
            lastPhase: this.lastPhase,
        };
    }
}
export function createDbOpenState() {
    return new DbOpenState();
}
