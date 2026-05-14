// Project/App: GSD-2
// File Purpose: Quality gate row mapper for the GSD database facade.
export function rowToGate(row) {
    return {
        milestone_id: row["milestone_id"],
        slice_id: row["slice_id"],
        gate_id: row["gate_id"],
        scope: row["scope"],
        task_id: row["task_id"] ?? "",
        status: row["status"],
        verdict: row["status"] === "pending" ? null : row["verdict"],
        rationale: row["rationale"] || "",
        findings: row["findings"] || "",
        evaluated_at: row["evaluated_at"] ?? null,
    };
}
