// Project/App: GSD-2
// File Purpose: Transaction depth helper for the GSD database facade.
export class DbTransactionRunner {
    depth = 0;
    isInTransaction() {
        return this.depth > 0;
    }
    transaction(controls, fn) {
        if (this.depth > 0) {
            return this.runNested(fn);
        }
        controls.begin();
        this.depth++;
        try {
            const result = fn();
            controls.commit();
            return result;
        }
        catch (err) {
            controls.rollback();
            throw err;
        }
        finally {
            this.depth--;
        }
    }
    readTransaction(controls, fn, logRollbackError) {
        if (this.depth > 0) {
            return this.runNested(fn);
        }
        controls.beginRead();
        this.depth++;
        try {
            const result = fn();
            controls.commit();
            return result;
        }
        catch (err) {
            try {
                controls.rollback();
            }
            catch (rollbackErr) {
                logRollbackError(rollbackErr instanceof Error ? rollbackErr : new Error(String(rollbackErr)));
            }
            throw err;
        }
        finally {
            this.depth--;
        }
    }
    runNested(fn) {
        this.depth++;
        try {
            return fn();
        }
        finally {
            this.depth--;
        }
    }
}
export function createDbTransactionRunner() {
    return new DbTransactionRunner();
}
