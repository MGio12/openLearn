// Project/App: GSD-2
// File Purpose: Runtime counters for telemetry-gated legacy compatibility paths.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { logWarning } from "./workflow-logger.js";
const COUNTERS = [
    "legacy.markdownFallbackUsed",
    "legacy.workflowEngineUsed",
    "legacy.uokFallbackUsed",
    "legacy.mcpAliasUsed",
    "legacy.componentFormatUsed",
    "legacy.providerDefaultUsed",
];
const values = Object.fromEntries(COUNTERS.map((counter) => [counter, 0]));
const warnedCounters = new Set();
const DIAGNOSTICS = {
    "legacy.markdownFallbackUsed": "Deprecated markdown state fallback used; migrate projects to DB-authoritative state before removing markdown derivation.",
    "legacy.workflowEngineUsed": "Deprecated workflow engine path used; prefer auto-milestone workflow templates before removing legacy engines.",
    "legacy.uokFallbackUsed": "Deprecated UOK fallback path used; resolve UOK kernel blockers before removing parity fallback wrappers.",
    "legacy.mcpAliasUsed": "Deprecated MCP alias tool used; update callers to the canonical gsd_* tool name before alias removal.",
    "legacy.componentFormatUsed": "Deprecated component format loaded; migrate skills/agents to component.yaml before removing legacy loaders.",
    "legacy.providerDefaultUsed": "Provider-specific default fallback used without an explicit available model; configure provider-aware model preferences before removing defaults.",
};
process.once("beforeExit", persistLegacyTelemetry);
export function incrementLegacyTelemetry(counter, amount = 1) {
    if (!Number.isFinite(amount) || amount <= 0)
        return;
    values[counter] += amount;
    emitLegacyDiagnostic(counter);
    persistLegacyTelemetry();
}
export function getLegacyTelemetry() {
    return { ...values };
}
export function resetLegacyTelemetry() {
    for (const counter of COUNTERS) {
        values[counter] = 0;
    }
    warnedCounters.clear();
}
export function listLegacyTelemetryCounters() {
    return [...COUNTERS];
}
export function getLegacyTelemetryReport() {
    return {
        ts: new Date().toISOString(),
        counters: getLegacyTelemetry(),
    };
}
export function persistLegacyTelemetrySnapshot() {
    persistLegacyTelemetry();
}
function emitLegacyDiagnostic(counter) {
    if (warnedCounters.has(counter))
        return;
    warnedCounters.add(counter);
    logWarning("migration", DIAGNOSTICS[counter], { counter });
}
function persistLegacyTelemetry() {
    const outputPath = process.env.GSD_LEGACY_TELEMETRY_FILE?.trim();
    if (!outputPath)
        return;
    try {
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, `${JSON.stringify(getLegacyTelemetryReport(), null, 2)}\n`, "utf-8");
    }
    catch {
        // Legacy cleanup telemetry must never block runtime paths.
    }
}
