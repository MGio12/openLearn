// Project/App: GSD-2
// File Purpose: Lightweight DB query row mappers for hot-path status reads.
export function rowToIdStatusSummary(row) {
    return {
        id: row["id"],
        status: row["status"],
    };
}
export function rowToActiveTaskSummary(row) {
    return {
        ...rowToIdStatusSummary(row),
        title: row["title"],
    };
}
export function rowToTaskStatusCounts(row) {
    if (!row)
        return emptyTaskStatusCounts();
    return {
        total: row["total"] ?? 0,
        done: row["done"] ?? 0,
        pending: row["pending"] ?? 0,
    };
}
export function emptyTaskStatusCounts() {
    return { total: 0, done: 0, pending: 0 };
}
export function rowsToStringColumn(rows, column) {
    return rows.map((row) => row[column]);
}
