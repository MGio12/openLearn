// Project/App: GSD-2
// File Purpose: SQLite schema metadata helpers for the GSD database facade and migrations.
export function indexExists(db, name) {
    return !!db.prepare("SELECT 1 as present FROM sqlite_master WHERE type = 'index' AND name = ?").get(name);
}
export function columnExists(db, table, column) {
    const rows = db.prepare(`PRAGMA table_info(${table})`).all();
    return rows.some((row) => row["name"] === column);
}
export function ensureColumn(db, table, column, ddl) {
    if (!columnExists(db, table, column))
        db.exec(ddl);
}
export function getCurrentSchemaVersion(db) {
    const row = db.prepare("SELECT MAX(version) as v FROM schema_version").get();
    return row ? row["v"] : 0;
}
export function recordSchemaVersion(db, version) {
    db.prepare("INSERT INTO schema_version (version, applied_at) VALUES (:version, :applied_at)").run({
        ":version": version,
        ":applied_at": new Date().toISOString(),
    });
}
