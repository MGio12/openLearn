// Project/App: GSD-2
// File Purpose: SQLite provider loading and fallback helpers for the GSD database facade.
export const BETTER_SQLITE3_PACKAGE = ["better", "sqlite3"].join("-");
export function suppressSqliteWarning() {
    const origEmit = process.emit;
    // Override via loose cast: Node's overloaded emit signature is not directly assignable.
    process.emit = function (event, ...args) {
        if (event === "warning" &&
            args[0] &&
            typeof args[0] === "object" &&
            "name" in args[0] &&
            args[0].name === "ExperimentalWarning" &&
            "message" in args[0] &&
            typeof args[0].message === "string" &&
            args[0].message.includes("SQLite")) {
            return false;
        }
        return origEmit.apply(process, [event, ...args]);
    };
}
export class SqliteProviderLoader {
    providerName = null;
    providerModule = null;
    loadAttempted = false;
    deps;
    constructor(deps) {
        this.deps = deps;
    }
    load() {
        if (this.loadAttempted)
            return;
        this.loadAttempted = true;
        try {
            this.deps.suppressSqliteWarning();
            const mod = this.deps.requireModule("node:sqlite");
            if (mod.DatabaseSync) {
                this.providerModule = mod;
                this.providerName = "node:sqlite";
                return;
            }
        }
        catch {
            // unavailable
        }
        const betterSqlite = this.loadBetterSqliteModule();
        if (betterSqlite) {
            this.providerModule = betterSqlite;
            this.providerName = "better-sqlite3";
            return;
        }
        const nodeMajor = parseInt(this.deps.nodeVersion.split(".")[0], 10);
        const versionHint = nodeMajor < 22
            ? ` GSD requires Node >= 22.0.0 (current: v${this.deps.nodeVersion}). Upgrade Node to fix this.`
            : "";
        this.deps.writeStderr(`gsd-db: No SQLite provider available (tried node:sqlite, better-sqlite3).${versionHint}\n`);
    }
    getProviderName() {
        return this.providerName;
    }
    openRaw(path) {
        this.load();
        if (!this.providerModule || !this.providerName)
            return null;
        if (this.providerName === "node:sqlite") {
            const { DatabaseSync } = this.providerModule;
            return new DatabaseSync(path);
        }
        const Database = this.providerModule;
        return new Database(path);
    }
    tryOpenBetterSqliteFallback(path) {
        if (this.providerName !== "node:sqlite")
            return null;
        const Database = this.loadBetterSqliteModule();
        if (!Database)
            return null;
        return {
            providerName: "better-sqlite3",
            providerModule: Database,
            rawDb: new Database(path),
        };
    }
    commitFallback(fallback) {
        this.providerName = fallback.providerName;
        this.providerModule = fallback.providerModule;
    }
    reset() {
        this.loadAttempted = false;
        this.providerModule = null;
        this.providerName = null;
    }
    loadBetterSqliteModule() {
        try {
            const mod = this.deps.requireModule(BETTER_SQLITE3_PACKAGE);
            if (typeof mod === "function")
                return mod;
            if (mod && typeof mod.default === "function")
                return mod.default;
        }
        catch {
            // unavailable
        }
        return null;
    }
}
export function createSqliteProviderLoader(deps) {
    return new SqliteProviderLoader(deps);
}
