/**
 * Type definitions, constants, and configuration shapes for GSD preferences.
 *
 * All interfaces, type aliases, and static lookup tables live here so that
 * both the validation and runtime modules can import them without pulling
 * in filesystem or loading logic.
 */
/**
 * Resolve whether context-mode features (gsd_exec sandbox + compaction
 * snapshot) should be active. Default is ON: missing config or missing
 * `enabled` is treated as true. Only `enabled: false` disables.
 */
export function isContextModeEnabled(prefs) {
    return prefs?.context_mode?.enabled !== false;
}
/** Default preference values for each workflow mode. */
export const MODE_DEFAULTS = {
    solo: {
        git: {
            auto_push: true,
            push_branches: false,
            pre_merge_check: "auto",
            merge_strategy: "squash",
            isolation: "none",
        },
        unique_milestone_ids: false,
    },
    team: {
        git: {
            auto_push: false,
            push_branches: true,
            pre_merge_check: true,
            merge_strategy: "squash",
            isolation: "none",
        },
        unique_milestone_ids: true,
    },
};
/** All recognized top-level keys in GSDPreferences. Used to detect typos / stale config. */
export const KNOWN_PREFERENCE_KEYS = new Set([
    "version",
    "mode",
    "always_use_skills",
    "prefer_skills",
    "avoid_skills",
    "skill_rules",
    "custom_instructions",
    "models",
    "skill_discovery",
    "skill_staleness_days",
    "auto_supervisor",
    "uat_dispatch",
    "unique_milestone_ids",
    "budget_ceiling",
    "budget_enforcement",
    "context_pause_threshold",
    "notifications",
    "cmux",
    "remote_questions",
    "git",
    "post_unit_hooks",
    "pre_dispatch_hooks",
    "dynamic_routing",
    "disabled_model_providers",
    "uok",
    "token_profile",
    "phases",
    "auto_visualize",
    "auto_report",
    "parallel",
    "verification_commands",
    "verification_auto_fix",
    "verification_max_retries",
    "search_provider",
    "context_selection",
    "widget_mode",
    "reactive_execution",
    "gate_evaluation",
    "github",
    "service_tier",
    "forensics_dedup",
    "show_token_cost",
    "min_request_interval_ms",
    "stale_commit_threshold_minutes",
    "context_management",
    "experimental",
    "codebase",
    "slice_parallel",
    "safety_harness",
    "enhanced_verification",
    "enhanced_verification_pre",
    "enhanced_verification_post",
    "enhanced_verification_strict",
    "discuss_preparation",
    "discuss_web_research",
    "discuss_depth",
    "flat_rate_providers",
    "language",
    "context_window_override",
    "context_mode",
    "planning_depth",
]);
/**
 * Broad union of every recognized unit-type *label* used across the codebase.
 *
 * This intentionally covers more than the manifest-tracked dispatch units in
 * `unit-context-manifest.ts:KNOWN_UNIT_TYPES`. Examples that live here but not
 * in the manifest:
 * - `discuss-slice` — dispatched by `guided-flow.ts` rather than auto-mode;
 *   composer falls through to default behavior via `resolveManifest()` null path.
 * - `worktree-merge` — used as a model-routing case, prompt-template name, and
 *   commit-message label, not as an LLM-dispatched unit.
 *
 * Used by `preferences-validation.ts` to validate user-provided unit-type
 * references in preferences (model overrides, skill rules, etc.) — preferences
 * may legitimately reference any label, including non-dispatched ones.
 *
 * The manifest-strict subset lives in `unit-context-manifest.ts:KNOWN_UNIT_TYPES`
 * and is enforced 1:1 against `UNIT_MANIFESTS` by the parity test in
 * `tests/unit-context-manifest.test.ts`.
 */
export const KNOWN_UNIT_LABELS = [
    "research-milestone", "plan-milestone", "research-slice", "plan-slice", "refine-slice",
    "execute-task", "reactive-execute", "gate-evaluate", "complete-slice", "replan-slice", "reassess-roadmap",
    "run-uat", "complete-milestone", "validate-milestone", "rewrite-docs",
    "discuss-milestone", "discuss-slice", "worktree-merge",
    // Deep planning mode (project-level) units
    "workflow-preferences", "discuss-project", "discuss-requirements",
    "research-decision", "research-project",
];
export const SKILL_ACTIONS = new Set(["use", "prefer", "avoid"]);
/**
 * Format a skill reference for the system prompt.
 * If resolved, shows the path so the agent knows exactly where to read.
 * If unresolved, marks it clearly.
 */
export function formatSkillRef(ref, resolutions) {
    const resolution = resolutions.get(ref);
    if (!resolution || resolution.method === "unresolved") {
        return `${ref} (⚠ not found — check skill name or path)`;
    }
    if (resolution.method === "absolute-path" || resolution.method === "absolute-dir") {
        return ref;
    }
    return `${ref} → \`${resolution.resolvedPath}\``;
}
