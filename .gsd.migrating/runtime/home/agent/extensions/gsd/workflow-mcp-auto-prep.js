import { ensureProjectWorkflowMcpConfig, } from "./mcp-project-config.js";
import { usesWorkflowMcpTransport } from "./workflow-mcp.js";
function getAuthModeSafe(ctx, provider) {
    if (!provider)
        return undefined;
    const getAuthMode = ctx.modelRegistry?.getProviderAuthMode;
    if (typeof getAuthMode !== "function")
        return undefined;
    try {
        return getAuthMode(provider);
    }
    catch {
        return undefined;
    }
}
export function shouldAutoPrepareWorkflowMcp(ctx) {
    const provider = ctx.model?.provider;
    const baseUrl = ctx.model?.baseUrl;
    const authMode = getAuthModeSafe(ctx, provider);
    if (provider !== "claude-code")
        return false;
    return usesWorkflowMcpTransport(authMode, baseUrl) || authMode === "externalCli";
}
export function prepareWorkflowMcpForProject(ctx, projectRoot) {
    if (!shouldAutoPrepareWorkflowMcp(ctx))
        return null;
    try {
        const result = ensureProjectWorkflowMcpConfig(projectRoot);
        if (result.status !== "unchanged") {
            ctx.ui?.notify?.(`Claude Code MCP prepared at ${result.configPath}`, "info");
        }
        return result;
    }
    catch (err) {
        ctx.ui?.notify?.(`Claude Code MCP prep failed: ${err instanceof Error ? err.message : String(err)}. Detected Claude Code model but no workflow MCP. Please run /gsd mcp init . from your project root.`, "warning");
        return null;
    }
}
