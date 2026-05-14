// Project/App: GSD-2
// File Purpose: Milestone and artifact row mappers for the GSD database facade.
export function rowToMilestone(row) {
    return {
        id: row["id"],
        title: row["title"],
        status: row["status"],
        depends_on: JSON.parse(row["depends_on"] || "[]"),
        created_at: row["created_at"],
        completed_at: row["completed_at"] ?? null,
        vision: row["vision"] ?? "",
        success_criteria: JSON.parse(row["success_criteria"] || "[]"),
        key_risks: JSON.parse(row["key_risks"] || "[]"),
        proof_strategy: JSON.parse(row["proof_strategy"] || "[]"),
        verification_contract: row["verification_contract"] ?? "",
        verification_integration: row["verification_integration"] ?? "",
        verification_operational: row["verification_operational"] ?? "",
        verification_uat: row["verification_uat"] ?? "",
        definition_of_done: JSON.parse(row["definition_of_done"] || "[]"),
        requirement_coverage: row["requirement_coverage"] ?? "",
        boundary_map_markdown: row["boundary_map_markdown"] ?? "",
        sequence: Number(row["sequence"] ?? 0),
    };
}
export function rowToArtifact(row) {
    return {
        path: row["path"],
        artifact_type: row["artifact_type"],
        milestone_id: row["milestone_id"] ?? null,
        slice_id: row["slice_id"] ?? null,
        task_id: row["task_id"] ?? null,
        full_content: row["full_content"],
        imported_at: row["imported_at"],
    };
}
