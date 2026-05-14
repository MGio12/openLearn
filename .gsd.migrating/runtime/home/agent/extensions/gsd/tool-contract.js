// Project/App: GSD-2
// File Purpose: ADR-015 Tool Contract module for Unit prompt, policy, and tool parity.
import { resolveManifest, } from "./unit-context-manifest.js";
import { getRequiredWorkflowToolsForAutoUnit } from "./workflow-mcp.js";
export function compileUnitToolContract(unitType) {
    const manifest = resolveManifest(unitType);
    if (!manifest) {
        return {
            ok: false,
            reason: "unknown-unit-type",
            detail: `No Unit manifest is registered for ${unitType}`,
        };
    }
    const requiredWorkflowTools = getRequiredWorkflowToolsForAutoUnit(unitType);
    const closeoutTools = requiredWorkflowTools.filter((tool) => /^gsd_(?:task|slice|milestone|complete|validate|save|summary)/.test(tool));
    if (requiresCloseoutTool(unitType) && closeoutTools.length === 0) {
        return {
            ok: false,
            reason: "missing-closeout-tool",
            detail: `${unitType} has no closeout workflow tool`,
        };
    }
    return {
        ok: true,
        contract: {
            unitType,
            contextMode: manifest.contextMode,
            toolsPolicy: manifest.tools,
            requiredWorkflowTools,
            promptObligations: [
                `context-mode:${manifest.contextMode}`,
                `tools-policy:${manifest.tools.mode}`,
            ],
            validationRules: [
                "unit-manifest-present",
                "workflow-tool-surface-present",
                ...(requiresCloseoutTool(unitType) ? ["closeout-tool-present"] : []),
            ],
            closeoutTools,
            artifacts: {
                inline: manifest.artifacts.inline,
                excerpt: manifest.artifacts.excerpt,
                onDemand: manifest.artifacts.onDemand,
            },
        },
    };
}
function requiresCloseoutTool(unitType) {
    return /^(execute-task|reactive-execute|complete-slice|validate-milestone|complete-milestone|run-uat|gate-evaluate)$/.test(unitType);
}
