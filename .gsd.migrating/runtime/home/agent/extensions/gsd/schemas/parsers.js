// gsd-2 / Deep planning mode — Markdown → structured object parsers for artifact validation.
//
// Each parser converts a markdown artifact into a typed object suitable for
// JSON Schema validation. The parsers are intentionally minimal — they only
// extract the structure the validators care about, not full semantic content.
const TEMPLATE_TOKEN_RE = /\{\{[^}]+\}\}/;
const H2_RE = /^##\s+(.+)$/gm;
const H3_RE = /^###\s+(.+)$/gm;
const MILESTONE_LINE_RE = /^-\s+\[([ x])\]\s+(M\d{3}):\s+(.+?)\s+(?:—|--|-)\s+(.+)$/gm;
const SLICE_HEADER_RE = /^###\s+(S\d{2})\s*(?:—|--|-)\s+(.+)$/m;
const REQUIREMENT_HEADER_RE = /^###\s+(R\d{3})\s*(?:—|--|-)\s+(.+)$/m;
function splitH2Sections(content) {
    const sections = {};
    const order = [];
    const headerMatches = [];
    for (const m of content.matchAll(H2_RE)) {
        if (m.index === undefined)
            continue;
        headerMatches.push({
            name: m[1].trim(),
            index: m.index,
            lineEnd: m.index + m[0].length,
        });
    }
    for (let i = 0; i < headerMatches.length; i++) {
        const start = headerMatches[i].lineEnd;
        const end = i + 1 < headerMatches.length ? headerMatches[i + 1].index : content.length;
        const body = content.slice(start, end).trim();
        sections[headerMatches[i].name] = body;
        order.push(headerMatches[i].name);
    }
    return { sections, order };
}
function detectTemplateTokens(sections) {
    const flagged = [];
    for (const [name, body] of Object.entries(sections)) {
        if (TEMPLATE_TOKEN_RE.test(body))
            flagged.push(name);
    }
    return { has: flagged.length > 0, flagged };
}
export function parseProject(content) {
    const { sections, order } = splitH2Sections(content);
    const tokens = detectTemplateTokens(sections);
    const milestones = [];
    const sequenceBody = sections["Milestone Sequence"] ?? "";
    for (const m of sequenceBody.matchAll(MILESTONE_LINE_RE)) {
        milestones.push({
            done: m[1] === "x",
            id: m[2],
            title: m[3].trim(),
            oneLiner: m[4].trim(),
        });
    }
    return {
        sections,
        sectionOrder: order,
        milestones,
        hasTemplateTokens: tokens.has,
        sectionsWithTokens: tokens.flagged,
    };
}
function parseRequirementEntry(block, parentSection) {
    const headerMatch = block.match(REQUIREMENT_HEADER_RE);
    if (!headerMatch)
        return null;
    const id = headerMatch[1];
    const title = headerMatch[2].trim();
    const fieldOf = (key) => {
        const re = new RegExp(`^-\\s+${key}:\\s*(.*)$`, "m");
        const matched = block.match(re);
        return matched ? matched[1].trim() : "";
    };
    return {
        id,
        title,
        class: fieldOf("Class"),
        status: fieldOf("Status"),
        description: fieldOf("Description"),
        whyItMatters: fieldOf("Why it matters"),
        source: fieldOf("Source"),
        primaryOwner: fieldOf("Primary owning slice"),
        supportingSlices: fieldOf("Supporting slices"),
        validation: fieldOf("Validation"),
        notes: fieldOf("Notes"),
        parentSection,
    };
}
function splitH3Blocks(sectionBody) {
    if (!sectionBody)
        return [];
    const indices = [];
    for (const m of sectionBody.matchAll(H3_RE)) {
        if (m.index !== undefined)
            indices.push(m.index);
    }
    if (indices.length === 0)
        return [];
    const blocks = [];
    for (let i = 0; i < indices.length; i++) {
        const end = i + 1 < indices.length ? indices[i + 1] : sectionBody.length;
        blocks.push(sectionBody.slice(indices[i], end));
    }
    return blocks;
}
export function parseRequirements(content) {
    const { sections, order } = splitH2Sections(content);
    const tokens = detectTemplateTokens(sections);
    const requirements = [];
    for (const sectionName of ["Active", "Validated", "Deferred", "Out of Scope"]) {
        const body = sections[sectionName] ?? "";
        for (const block of splitH3Blocks(body)) {
            const parsed = parseRequirementEntry(block, sectionName);
            if (parsed)
                requirements.push(parsed);
        }
    }
    const traceBody = sections["Traceability"] ?? "";
    const traceabilityRows = [];
    const lines = traceBody.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length >= 2 && lines[0].startsWith("|") && lines[1].startsWith("|")) {
        const headers = lines[0].replace(/^\|/, "").replace(/\|$/, "").split("|").map(s => s.trim());
        for (let i = 2; i < lines.length; i++) {
            if (!lines[i].startsWith("|"))
                continue;
            const cells = lines[i].replace(/^\|/, "").replace(/\|$/, "").split("|").map(s => s.trim());
            if (cells.length === headers.length) {
                const row = {};
                headers.forEach((h, idx) => { row[h] = cells[idx]; });
                traceabilityRows.push(row);
            }
        }
    }
    const coverageBody = sections["Coverage Summary"] ?? "";
    const coverageSummary = {};
    for (const line of coverageBody.split("\n")) {
        const m2 = line.match(/^-\s+(.+?):\s*(.+)$/);
        if (m2)
            coverageSummary[m2[1].trim()] = m2[2].trim();
    }
    return {
        sections,
        sectionOrder: order,
        requirements,
        traceabilityRows,
        coverageSummary,
        hasTemplateTokens: tokens.has,
    };
}
/**
 * Parse a "Depends" cell (e.g. "S01, S02" or "none" or "—") into a list of
 * slice IDs and a list of malformed values that did not match S\d{2}.
 * Used by both H3-format and Slice-Overview-table parsing paths.
 */
function parseDependsCell(raw) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.toLowerCase() === "none" || trimmed === "—" || trimmed === "-") {
        return { ids: [], malformed: [] };
    }
    const ids = [];
    const malformed = [];
    for (const tok of trimmed.split(/[,\s]+/).filter(Boolean)) {
        if (/^S\d{2}$/.test(tok))
            ids.push(tok);
        else
            malformed.push(tok);
    }
    return { ids, malformed };
}
/**
 * Parse the "Slice Overview" table format emitted by `renderRoadmapContent`
 * in workflow-projections.ts. Columns are: ID | Slice | Risk | Depends |
 * Done | After this. Returns [] when no recognizable table is present.
 */
function parseSliceOverviewTable(body) {
    const slices = [];
    const malformedDepends = [];
    const lines = body.split("\n").map(l => l.trim()).filter(Boolean);
    // Find the header row (starts with "|" and contains "ID")
    const headerIdx = lines.findIndex(l => l.startsWith("|") && /\bID\b/i.test(l));
    if (headerIdx < 0)
        return { slices, malformedDepends };
    const headers = lines[headerIdx]
        .replace(/^\|/, "").replace(/\|$/, "")
        .split("|").map(s => s.trim().toLowerCase());
    const idCol = headers.indexOf("id");
    const sliceCol = headers.indexOf("slice");
    const riskCol = headers.indexOf("risk");
    const dependsCol = headers.indexOf("depends");
    // "After this" is the demo/outcome column. Some templates may use "demo" instead.
    let demoCol = headers.indexOf("after this");
    if (demoCol < 0)
        demoCol = headers.indexOf("demo");
    if (idCol < 0 || sliceCol < 0)
        return { slices, malformedDepends };
    // Skip the separator row (|---|---|...) and walk data rows.
    for (let i = headerIdx + 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.startsWith("|"))
            break;
        const cells = line.replace(/^\|/, "").replace(/\|$/, "").split("|").map(s => s.trim());
        if (cells.length < headers.length)
            continue;
        const id = cells[idCol];
        if (!/^S\d{2}$/.test(id))
            continue;
        const dependsRaw = dependsCol >= 0 ? cells[dependsCol] : "";
        const { ids: dependsIds, malformed } = parseDependsCell(dependsRaw);
        if (malformed.length > 0)
            malformedDepends.push({ sliceId: id, values: malformed });
        slices.push({
            id,
            title: cells[sliceCol] ?? "",
            risk: riskCol >= 0 ? cells[riskCol] : "",
            depends: dependsIds,
            demo: demoCol >= 0 ? cells[demoCol] : "",
        });
    }
    return { slices, malformedDepends };
}
export function parseRoadmap(content) {
    const { sections, order } = splitH2Sections(content);
    const tokens = detectTemplateTokens(sections);
    const slices = [];
    const malformedDepends = [];
    // Format A: legacy "## Slices" H3 format (used by fixtures + some templates).
    const slicesBody = sections["Slices"] ?? "";
    for (const block of splitH3Blocks(slicesBody)) {
        const headerMatch = block.match(SLICE_HEADER_RE);
        if (!headerMatch)
            continue;
        const id = headerMatch[1];
        const title = headerMatch[2].trim();
        const fieldOf = (key) => {
            const re = new RegExp(`^-\\s+${key}:\\s*(.*)$`, "m");
            const matched = block.match(re);
            return matched ? matched[1].trim() : "";
        };
        const { ids: dependsIds, malformed } = parseDependsCell(fieldOf("Depends"));
        if (malformed.length > 0)
            malformedDepends.push({ sliceId: id, values: malformed });
        slices.push({
            id,
            title,
            risk: fieldOf("Risk"),
            depends: dependsIds,
            demo: fieldOf("Demo"),
        });
    }
    // Format B: "## Slice Overview" table format emitted by workflow-projections
    // (gsd_plan_milestone). Used as a fallback when format A produced nothing,
    // so a roadmap that contains both H3 and table sections is parsed once.
    if (slices.length === 0) {
        const overviewBody = sections["Slice Overview"] ?? "";
        if (overviewBody) {
            const parsed = parseSliceOverviewTable(overviewBody);
            slices.push(...parsed.slices);
            malformedDepends.push(...parsed.malformedDepends);
        }
    }
    const dodBody = sections["Definition of Done"] ?? "";
    const definitionOfDone = [];
    for (const line of dodBody.split("\n")) {
        const m3 = line.match(/^-\s+(.+)$/);
        if (m3)
            definitionOfDone.push(m3[1].trim());
    }
    return {
        sections,
        sectionOrder: order,
        slices,
        definitionOfDone,
        hasTemplateTokens: tokens.has,
        malformedDepends,
    };
}
