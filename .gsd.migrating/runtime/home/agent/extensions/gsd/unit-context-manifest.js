// GSD-2 — UnitContextManifest (#4782 phase 1).
//
// Declarative description of what context each auto-mode unit type needs
// in its system prompt. Establishes the contract that later phases will
// use to drive a single composeSystemPromptForUnit() — replacing the
// per-unit-type branching currently spread across `auto-prompts.ts`.
//
// **Phase 1 ships the type + the data + a CI coverage guard.** It adds
// zero wiring — no caller reads a manifest yet. Every unit type gets a
// manifest that describes today's behavior as faithfully as possible, so
// when the composer lands in phase 2 the migration can proceed manifest-
// by-manifest without behavior change.
//
// Phased rollout tracking:
//   - Phase 1 (this PR): schema + manifests + coverage test.
//   - Phase 2: add composeSystemPromptForUnit(); migrate one low-risk
//     unit type (e.g. reassess-roadmap) as the pilot.
//   - Phase 3: migrate remaining unit types, tighten manifests per
//     empirical usage, introduce skipWhen predicates absorbing the
//     reassess opt-in gate from #4778.
//   - Phase 4: introduce pipeline variants as declared sequences,
//     absorbing the scope-classifier gates from #4781.
//
// Naming:
//   - Artifact keys are STABLE strings (not paths). Path resolution is
//     the composer's job; manifests describe intent, not disk layout.
//   - Char budgets are nominal — blown budgets log a telemetry event,
//     they do not truncate or error (the composer decides fallback).
// ─── Artifact registry ────────────────────────────────────────────────────
/**
 * Stable identifiers for every artifact class a unit might inline, excerpt,
 * or reference on-demand. Adding a new artifact class requires (a) a key
 * here, (b) path/body resolution in the composer, and (c) updates to any
 * manifest that should surface it.
 */
export const ARTIFACT_KEYS = [
    // Milestone-scoped
    "roadmap",
    "milestone-context",
    "milestone-summary",
    "milestone-validation",
    "milestone-research",
    "milestone-plan",
    // Slice-scoped
    "slice-context",
    "slice-research",
    "slice-plan",
    "slice-summary",
    "slice-uat",
    "slice-assessment",
    // Task-scoped
    "task-plan",
    "task-summary",
    "prior-task-summaries",
    "dependency-summaries",
    // Project-scoped
    "requirements",
    "decisions",
    "project",
    "templates",
];
// ─── Manifests ────────────────────────────────────────────────────────────
// Phase 1 policy: every manifest encodes today's behavior. Skills = "all"
// unless the unit type was already narrowed via the existing skill-manifest
// resolver (#4779). Memory/knowledge policies reflect the defaults in
// `bootstrap/system-context.ts`. Artifact classifications follow what
// `auto-prompts.ts` inlines today for each unit type.
const COMMON_BUDGET_LARGE = 1_500_000; // ~400K tokens
const COMMON_BUDGET_MEDIUM = 750_000; // ~200K tokens
const COMMON_BUDGET_SMALL = 250_000; // ~65K tokens
// ─── Tool policy constants (#4934) ────────────────────────────────────────
// Reused across manifests so per-unit assignment stays declarative and the
// allowed-path set for the docs policy lives in one reviewable place.
const TOOLS_ALL = { mode: "all" };
const TOOLS_PLANNING = { mode: "planning" };
// Like TOOLS_PLANNING but permits dispatch to read-only recon/planning
// specialists. Runtime-enforced by write-gate.ts before the subagent tool runs.
const TOOLS_PLANNING_DISPATCH_RECON = {
    mode: "planning-dispatch",
    allowedSubagents: ["scout", "planner"],
};
// Like TOOLS_PLANNING_DISPATCH_RECON, but for closeout units that fan out
// verification work to review-tier specialists.
const TOOLS_PLANNING_DISPATCH_REVIEW = {
    mode: "planning-dispatch",
    allowedSubagents: ["reviewer", "security", "tester"],
};
const TOOLS_DOCS = {
    mode: "docs",
    // Globs are resolved relative to project basePath. The set is intentionally
    // narrow: top-level docs/, README, CHANGELOG, and any markdown at the
    // project root. Projects with non-standard layouts (e.g. mintlify-docs/)
    // will need this list extended in a follow-up; landed conservative now,
    // expand on demand.
    allowedPathGlobs: [
        "docs/**",
        "README.md",
        "README.*.md",
        "CHANGELOG.md",
        "*.md",
    ],
};
/**
 * Canonical unit types handled by auto-mode dispatch. The coverage test
 * enumerates these against `UNIT_MANIFESTS` to catch manifest drift when
 * a new unit type lands.
 */
export const KNOWN_UNIT_TYPES = [
    "research-milestone",
    "plan-milestone",
    "discuss-milestone",
    "validate-milestone",
    "complete-milestone",
    "research-slice",
    "plan-slice",
    "refine-slice",
    "replan-slice",
    "complete-slice",
    "reassess-roadmap",
    "execute-task",
    "reactive-execute",
    "run-uat",
    "gate-evaluate",
    "rewrite-docs",
    // Deep planning mode (project-level) units
    "workflow-preferences",
    "discuss-project",
    "discuss-requirements",
    "research-decision",
    "research-project",
];
export const UNIT_MANIFESTS = {
    // ─── Milestone-scoped ────────────────────────────────────────────────
    "research-milestone": {
        skills: { mode: "all" },
        knowledge: "full",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "research",
        tools: TOOLS_PLANNING,
        artifacts: {
            // Phase 3 migration (#4782): matches today's actual
            // buildResearchMilestonePrompt inlining order.
            inline: ["milestone-context", "project", "requirements", "decisions", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    "plan-milestone": {
        skills: { mode: "all" },
        knowledge: "full",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "planning",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["project", "requirements", "decisions", "milestone-research", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    "discuss-milestone": {
        skills: { mode: "all" },
        knowledge: "full",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "interview",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["project", "requirements", "decisions", "milestone-context", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    "validate-milestone": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: false,
        preferences: "active-only",
        contextMode: "verification",
        // planning-dispatch: validation is a verification-fan-out unit. It reads
        // the milestone surface and dispatches reviewer/security/tester subagents
        // to report findings without touching user source. Mirrors
        // complete-milestone's policy. Write isolation to .gsd/ is preserved.
        tools: TOOLS_PLANNING_DISPATCH_REVIEW,
        artifacts: {
            inline: ["roadmap", "slice-summary", "slice-uat", "requirements", "decisions", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    "complete-milestone": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: false,
        preferences: "active-only",
        contextMode: "verification",
        // planning-dispatch: completion is a high-leverage place to fan out to
        // reviewer / security / tester subagents. They read the diff and report
        // findings; they do not write user source. Write isolation to .gsd/ is
        // preserved.
        tools: TOOLS_PLANNING_DISPATCH_REVIEW,
        artifacts: {
            // #4780 landed slice-summary as excerpt for this unit; phase 2 of
            // the architecture will read this manifest as the source of truth
            // and retire the special-case wiring in auto-prompts.ts.
            inline: ["roadmap", "milestone-context", "requirements", "decisions", "project", "templates"],
            excerpt: ["slice-summary"],
            onDemand: ["slice-summary"],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    // ─── Slice-scoped ────────────────────────────────────────────────────
    "research-slice": {
        skills: { mode: "all" },
        knowledge: "full",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "research",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["roadmap", "milestone-research", "dependency-summaries", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    "plan-slice": {
        skills: { mode: "all" },
        knowledge: "full",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "planning",
        // planning-dispatch: allows subagent dispatch so the planner can fan out
        // to scout for codebase recon and to planner/decompose-style specialists
        // for sub-decomposition. Write-isolation to .gsd/ is preserved.
        tools: TOOLS_PLANNING_DISPATCH_RECON,
        artifacts: {
            inline: ["roadmap", "slice-research", "dependency-summaries", "requirements", "decisions", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    "refine-slice": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "planning",
        // See plan-slice — same rationale: dispatch to scout/planner-style
        // specialists during refinement is materially better than re-doing recon
        // inline.
        tools: TOOLS_PLANNING_DISPATCH_RECON,
        artifacts: {
            inline: ["slice-plan", "slice-research", "dependency-summaries", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    "replan-slice": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "planning",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["slice-plan", "slice-research", "dependency-summaries", "prior-task-summaries", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    "complete-slice": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: false,
        preferences: "active-only",
        contextMode: "verification",
        // See complete-milestone — same rationale: dispatch to reviewer / security /
        // tester subagents to fan out review work without bloating this unit's
        // context.
        tools: TOOLS_PLANNING_DISPATCH_REVIEW,
        artifacts: {
            // Phase 3 migration (#4782): matches today's actual
            // buildCompleteSlicePrompt inlining order. Overrides prepend +
            // knowledge splice stay in the builder imperatively (see RFC
            // #4924 — computed/prepend blocks are phase-4 composer work).
            inline: ["roadmap", "slice-context", "slice-plan", "requirements", "prior-task-summaries", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    "reassess-roadmap": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "critical-only",
        codebaseMap: false,
        preferences: "none",
        contextMode: "planning",
        tools: TOOLS_PLANNING,
        artifacts: {
            // Phase 2 pilot (#4782): manifest now matches today's actual
            // buildReassessRoadmapPrompt behavior for equivalence. Phase 3
            // will tighten this list once the composer reports real telemetry.
            inline: ["roadmap", "slice-context", "slice-summary", "project", "requirements", "decisions"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    // ─── Task-scoped ─────────────────────────────────────────────────────
    "execute-task": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "execution",
        tools: TOOLS_ALL,
        artifacts: {
            inline: ["task-plan", "slice-plan", "prior-task-summaries", "templates"],
            excerpt: [],
            onDemand: ["slice-research"],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    "reactive-execute": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "execution",
        tools: TOOLS_ALL,
        artifacts: {
            inline: ["slice-plan", "prior-task-summaries", "templates"],
            excerpt: [],
            onDemand: ["slice-research"],
        },
        maxSystemPromptChars: COMMON_BUDGET_LARGE,
    },
    // ─── Ancillary units ─────────────────────────────────────────────────
    "run-uat": {
        skills: { mode: "all" },
        knowledge: "critical-only",
        memory: "critical-only",
        codebaseMap: false,
        preferences: "active-only",
        contextMode: "verification",
        tools: TOOLS_PLANNING,
        artifacts: {
            // Phase 3 migration (#4782): manifest matches today's actual
            // buildRunUatPrompt inlining. Prior phase-1 entry listed
            // `slice-plan` aspirationally — the real builder inlines the UAT
            // file, the slice SUMMARY (optional), and the project row.
            inline: ["slice-uat", "slice-summary", "project"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_SMALL,
    },
    "gate-evaluate": {
        skills: { mode: "all" },
        knowledge: "critical-only",
        memory: "critical-only",
        codebaseMap: false,
        preferences: "active-only",
        contextMode: "verification",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["slice-plan", "prior-task-summaries"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_SMALL,
    },
    "rewrite-docs": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "docs",
        tools: TOOLS_DOCS,
        artifacts: {
            inline: ["project", "requirements", "decisions", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    // ─── Deep planning mode (project-level) units ────────────────────────
    // workflow-preferences: default-writing stage that records
    // commit_policy / branch_model in PREFERENCES.md, defaults
    // uat_dispatch/executor_class, and records the research decision. No project artifacts needed.
    "workflow-preferences": {
        skills: { mode: "none" },
        knowledge: "none",
        memory: "none",
        codebaseMap: false,
        preferences: "none",
        contextMode: "none",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: [],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_SMALL,
    },
    // discuss-project: PROJECT.md interview (deep mode only). Project-scoped
    // discussion runs before any milestone exists, so milestone artifacts are
    // not loaded. Keeps templates available for PROJECT.md scaffolding.
    "discuss-project": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "interview",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    // discuss-requirements: REQUIREMENTS.md interview. PROJECT.md is the
    // primary context input; templates carry the requirements format.
    "discuss-requirements": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "interview",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: ["project", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
    // research-decision: lightweight one-question yes/no unit. Writes a
    // marker JSON; no project artifacts needed.
    "research-decision": {
        skills: { mode: "none" },
        knowledge: "none",
        memory: "none",
        codebaseMap: false,
        preferences: "none",
        contextMode: "none",
        tools: TOOLS_PLANNING,
        artifacts: {
            inline: [],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_SMALL,
    },
    // research-project: orchestrator that fans out 4 parallel scout subagents
    // for project research (stack, features, architecture, pitfalls). Needs the
    // planning-dispatch policy to dispatch them. PROJECT.md + REQUIREMENTS.md
    // give the orchestrator the framing context.
    "research-project": {
        skills: { mode: "all" },
        knowledge: "scoped",
        memory: "prompt-relevant",
        codebaseMap: true,
        preferences: "active-only",
        contextMode: "research",
        tools: { mode: "planning-dispatch", allowedSubagents: ["scout"] },
        artifacts: {
            inline: ["project", "requirements", "templates"],
            excerpt: [],
            onDemand: [],
        },
        maxSystemPromptChars: COMMON_BUDGET_MEDIUM,
    },
};
// ─── Lookup helper ────────────────────────────────────────────────────────
/**
 * Return the manifest for a unit type, or null when the type is unknown.
 *
 * Callers MUST treat null as "fall through to today's default behavior"
 * rather than erroring — unknown unit types may be experimental and
 * should not crash the composer.
 */
export function resolveManifest(unitType) {
    return UNIT_MANIFESTS[unitType] ?? null;
}
