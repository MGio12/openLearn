// Project/App: GSD-2
// File Purpose: Normalized SQLite adapter wrapper used by the GSD database facade.
export function normalizeDbRow(row) {
    if (row == null)
        return undefined;
    if (Object.getPrototypeOf(row) === null) {
        return { ...row };
    }
    return row;
}
export function normalizeDbRows(rows) {
    return rows.map((row) => normalizeDbRow(row));
}
export function createDbAdapter(rawDb) {
    const db = rawDb;
    const stmtCache = new Map();
    function wrapStmt(raw) {
        return {
            run(...params) {
                return raw.run(...params);
            },
            get(...params) {
                return normalizeDbRow(raw.get(...params));
            },
            all(...params) {
                return normalizeDbRows(raw.all(...params));
            },
        };
    }
    return {
        exec(sql) {
            db.exec(sql);
        },
        prepare(sql) {
            let cached = stmtCache.get(sql);
            if (cached)
                return cached;
            cached = wrapStmt(db.prepare(sql));
            stmtCache.set(sql, cached);
            return cached;
        },
        close() {
            stmtCache.clear();
            db.close();
        },
    };
}
