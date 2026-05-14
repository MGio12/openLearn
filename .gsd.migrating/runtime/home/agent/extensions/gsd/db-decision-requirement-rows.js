// Project/App: GSD-2
// File Purpose: Decision and requirement row mappers for the GSD database facade.
export function rowToDecision(row) {
    return {
        seq: row["seq"],
        id: row["id"],
        when_context: row["when_context"],
        scope: row["scope"],
        decision: row["decision"],
        choice: row["choice"],
        rationale: row["rationale"],
        revisable: row["revisable"],
        made_by: row["made_by"] ?? "agent",
        source: row["source"] ?? "discussion",
        superseded_by: row["superseded_by"] ?? null,
    };
}
export function rowToActiveDecision(row) {
    return {
        ...rowToDecision(row),
        superseded_by: null,
    };
}
export function rowToRequirement(row) {
    return {
        id: row["id"],
        class: row["class"],
        status: row["status"],
        description: row["description"],
        why: row["why"],
        source: row["source"],
        primary_owner: row["primary_owner"],
        supporting_slices: row["supporting_slices"],
        validation: row["validation"],
        notes: row["notes"],
        full_content: row["full_content"],
        superseded_by: row["superseded_by"] ?? null,
    };
}
export function rowToActiveRequirement(row) {
    return {
        ...rowToRequirement(row),
        superseded_by: null,
    };
}
export function rowsToRequirementCounts(rows) {
    const counts = {
        active: 0,
        validated: 0,
        deferred: 0,
        outOfScope: 0,
        blocked: 0,
        total: 0,
    };
    for (const row of rows) {
        const status = String(row["status"] ?? "");
        const count = Number(row["count"] ?? 0);
        counts.total += count;
        if (status === "active")
            counts.active += count;
        else if (status === "validated")
            counts.validated += count;
        else if (status === "deferred")
            counts.deferred += count;
        else if (status === "out-of-scope" || status === "out_of_scope")
            counts.outOfScope += count;
        else if (status === "blocked")
            counts.blocked += count;
    }
    return counts;
}
