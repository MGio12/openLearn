import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { atomicWriteSync } from "./atomic-write.js";
import { classifyMilestoneScope, } from "./milestone-scope-classifier.js";
import { clearParseCache } from "./files.js";
import { gsdRoot, clearPathCache } from "./paths.js";
import { parseProject, parseRequirements } from "./schemas/parsers.js";
export const PROJECT_RESEARCH_DIMENSIONS = ["STACK", "FEATURES", "ARCHITECTURE", "PITFALLS"];
export const PROJECT_RESEARCH_BLOCKER = "PROJECT-RESEARCH-BLOCKER.md";
export const PROJECT_RESEARCH_INFLIGHT_MARKER = "research-project-inflight";
function researchDir(basePath) {
    return join(gsdRoot(basePath), "research");
}
function runtimeDir(basePath) {
    return join(gsdRoot(basePath), "runtime");
}
function researchDecisionPath(basePath) {
    return join(runtimeDir(basePath), "research-decision.json");
}
function clearResearchCaches() {
    clearPathCache();
    clearParseCache();
}
function isProjectResearchDimensionSatisfied(dir, name) {
    return existsSync(join(dir, `${name}.md`)) || existsSync(join(dir, `${name}-BLOCKER.md`));
}
function writeIfMissing(path, content) {
    if (existsSync(path))
        return false;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, "utf-8");
    return true;
}
function markdownTitle(content) {
    return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Project";
}
function selectedSections(sections) {
    return [
        "What This Is",
        "Core Value",
        "Current State",
        "Architecture / Key Patterns",
        "Constraints",
        "Milestone Sequence",
    ]
        .map((name) => sections[name] ?? "")
        .filter(Boolean)
        .join("\n\n");
}
export function classifyProjectResearchScope(projectContent, requirementsContent) {
    const project = parseProject(projectContent);
    const requirements = parseRequirements(requirementsContent);
    const activeRequirements = requirements.requirements.filter((r) => r.status === "active" || r.parentSection === "Active");
    const activeCapabilities = activeRequirements.filter((r) => r.class !== "constraint" && r.class !== "anti-feature");
    const requirementCoverage = activeRequirements
        .map((r) => [
        r.id,
        r.title,
        r.class,
        r.status,
        r.description,
        r.notes,
    ].filter(Boolean).join(" — "))
        .join("\n");
    const result = classifyMilestoneScope({
        title: markdownTitle(projectContent),
        vision: selectedSections(project.sections),
        successCriteria: activeCapabilities.map((r) => `${r.title}: ${r.description}`),
        definitionOfDone: activeCapabilities.map((r) => r.validation).filter(Boolean),
        requirementCoverage: [
            requirementCoverage,
            Object.entries(requirements.coverageSummary)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n"),
        ].filter(Boolean).join("\n\n"),
    });
    return {
        ...result,
        source: "project-research",
    };
}
export function getProjectResearchStatus(basePath) {
    const dir = researchDir(basePath);
    const globalBlocker = existsSync(join(dir, PROJECT_RESEARCH_BLOCKER));
    const completedDimensions = [];
    const blockerDimensions = [];
    const missingDimensions = [];
    for (const name of PROJECT_RESEARCH_DIMENSIONS) {
        if (existsSync(join(dir, `${name}.md`)))
            completedDimensions.push(name);
        else if (existsSync(join(dir, `${name}-BLOCKER.md`)))
            blockerDimensions.push(name);
        else
            missingDimensions.push(name);
    }
    const allSatisfied = PROJECT_RESEARCH_DIMENSIONS.every((name) => isProjectResearchDimensionSatisfied(dir, name));
    const allDimensionBlockers = allSatisfied &&
        completedDimensions.length === 0 &&
        blockerDimensions.length === PROJECT_RESEARCH_DIMENSIONS.length;
    const blocked = globalBlocker || allDimensionBlockers;
    return {
        complete: allSatisfied && !blocked,
        blocked,
        allDimensionBlockers,
        globalBlocker,
        missingDimensions,
        completedDimensions,
        blockerDimensions,
        hasRealResearch: completedDimensions.length > 0,
    };
}
export function writeProjectResearchAutoSkipDecision(basePath, classification) {
    atomicWriteSync(researchDecisionPath(basePath), JSON.stringify({
        decision: "skip",
        decided_at: new Date().toISOString(),
        source: "project-research-fast-path",
        previous_source: "workflow-preferences",
        reason: "trivial-static-local-project",
        classifier_variant: classification.variant,
        classifier_reasons: classification.reasons,
    }, null, 2) + "\n", "utf-8");
}
export function clearProjectResearchInflightMarker(basePath) {
    const marker = join(runtimeDir(basePath), PROJECT_RESEARCH_INFLIGHT_MARKER);
    if (existsSync(marker))
        unlinkSync(marker);
}
export function finalizeProjectResearchTimeout(basePath, reason) {
    const dir = researchDir(basePath);
    mkdirSync(dir, { recursive: true });
    clearProjectResearchInflightMarker(basePath);
    const before = getProjectResearchStatus(basePath);
    const written = [];
    if (before.complete) {
        clearResearchCaches();
        return { kind: "completed", status: before, written };
    }
    if (before.blocked) {
        clearResearchCaches();
        return { kind: "global-blocker", status: before, written };
    }
    if (before.hasRealResearch) {
        for (const dimension of before.missingDimensions) {
            const blockerPath = join(dir, `${dimension}-BLOCKER.md`);
            if (writeIfMissing(blockerPath, [
                `# ${dimension} research blocker`,
                ``,
                `Auto-mode stopped project research before this dimension produced a durable artifact.`,
                ``,
                `**Reason**: ${reason}`,
                ``,
                `At least one other project research dimension completed, so this blocker satisfies the project research gate without rerunning every scout.`,
            ].join("\n"))) {
                written.push(blockerPath);
            }
        }
        clearResearchCaches();
        return {
            kind: "partial-blockers",
            status: getProjectResearchStatus(basePath),
            written,
        };
    }
    const blockerPath = join(dir, PROJECT_RESEARCH_BLOCKER);
    if (writeIfMissing(blockerPath, [
        `# Project research blocker`,
        ``,
        `Auto-mode stopped project research before any usable research dimension completed.`,
        ``,
        `**Reason**: ${reason}`,
        ``,
        `This fail-closed blocker prevents milestone planning from relying on missing project research.`,
    ].join("\n"))) {
        written.push(blockerPath);
    }
    clearResearchCaches();
    return {
        kind: "global-blocker",
        status: getProjectResearchStatus(basePath),
        written,
    };
}
