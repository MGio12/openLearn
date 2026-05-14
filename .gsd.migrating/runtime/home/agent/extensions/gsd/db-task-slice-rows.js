// Project/App: GSD-2
// File Purpose: Task and slice row mappers for the GSD database facade.
export function parseTaskArrayColumn(raw) {
    if (Array.isArray(raw)) {
        return raw.filter((entry) => typeof entry === "string");
    }
    if (typeof raw !== "string")
        return [];
    const trimmed = raw.trim();
    if (!trimmed)
        return [];
    try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
            return parsed.filter((entry) => typeof entry === "string");
        }
        if (typeof parsed === "string" && parsed.trim()) {
            return [parsed.trim()];
        }
        if (parsed === null || parsed === undefined || parsed === "") {
            return [];
        }
        return [String(parsed)];
    }
    catch {
        return trimmed.split(",").map((entry) => entry.trim()).filter(Boolean);
    }
}
export function rowToSlice(row) {
    return {
        milestone_id: row["milestone_id"],
        id: row["id"],
        title: row["title"],
        status: row["status"],
        risk: row["risk"],
        depends: JSON.parse(row["depends"] || "[]"),
        demo: row["demo"] ?? "",
        created_at: row["created_at"],
        completed_at: row["completed_at"] ?? null,
        full_summary_md: row["full_summary_md"] ?? "",
        full_uat_md: row["full_uat_md"] ?? "",
        goal: row["goal"] ?? "",
        success_criteria: row["success_criteria"] ?? "",
        proof_level: row["proof_level"] ?? "",
        integration_closure: row["integration_closure"] ?? "",
        observability_impact: row["observability_impact"] ?? "",
        sequence: row["sequence"] ?? 0,
        replan_triggered_at: row["replan_triggered_at"] ?? null,
        is_sketch: row["is_sketch"] ?? 0,
        sketch_scope: row["sketch_scope"] ?? "",
    };
}
export function rowToTask(row) {
    return {
        milestone_id: row["milestone_id"],
        slice_id: row["slice_id"],
        id: row["id"],
        title: row["title"],
        status: row["status"],
        one_liner: row["one_liner"],
        narrative: row["narrative"],
        verification_result: row["verification_result"],
        duration: row["duration"],
        completed_at: row["completed_at"] ?? null,
        blocker_discovered: row["blocker_discovered"] === 1,
        deviations: row["deviations"],
        known_issues: row["known_issues"],
        key_files: parseTaskArrayColumn(row["key_files"]),
        key_decisions: parseTaskArrayColumn(row["key_decisions"]),
        full_summary_md: row["full_summary_md"],
        description: row["description"] ?? "",
        estimate: row["estimate"] ?? "",
        files: parseTaskArrayColumn(row["files"]),
        verify: row["verify"] ?? "",
        inputs: parseTaskArrayColumn(row["inputs"]),
        expected_output: parseTaskArrayColumn(row["expected_output"]),
        observability_impact: row["observability_impact"] ?? "",
        full_plan_md: row["full_plan_md"] ?? "",
        sequence: row["sequence"] ?? 0,
        blocker_source: row["blocker_source"] ?? "",
        escalation_pending: row["escalation_pending"] ?? 0,
        escalation_awaiting_review: row["escalation_awaiting_review"] ?? 0,
        escalation_artifact_path: row["escalation_artifact_path"] ?? null,
        escalation_override_applied_at: row["escalation_override_applied_at"] ?? null,
    };
}
