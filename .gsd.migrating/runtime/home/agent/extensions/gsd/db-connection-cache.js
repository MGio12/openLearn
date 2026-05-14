// Project/App: GSD-2
// File Purpose: Workspace-scoped database connection cache helpers for the GSD database facade.
export class DbConnectionCache {
    entries = new Map();
    get(key) {
        return this.entries.get(key);
    }
    set(key, entry) {
        this.entries.set(key, entry);
    }
    has(key) {
        return this.entries.has(key);
    }
    delete(key) {
        return this.entries.delete(key);
    }
    asReadonlyMap() {
        return this.entries;
    }
    closeNonActive(activeDb, closeEntry) {
        for (const [key, entry] of this.entries) {
            if (entry.db === activeDb)
                continue;
            this.entries.delete(key);
            closeEntry(entry);
        }
    }
}
export function createDbConnectionCache() {
    return new DbConnectionCache();
}
