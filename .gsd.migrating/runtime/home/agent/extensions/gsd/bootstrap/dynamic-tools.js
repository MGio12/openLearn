// Project/App: GSD-2
// File Purpose: Registers workspace-aware dynamic filesystem and shell tools.
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname } from "node:path";
import { createBashTool, createEditTool, createReadTool, createWriteTool } from "@gsd/pi-coding-agent";
import { DEFAULT_BASH_TIMEOUT_SECS } from "../constants.js";
import { setLogBasePath, logWarning } from "../workflow-logger.js";
import { resolveGsdPathContract } from "../paths.js";
export function safeWorkspaceCwd() {
    try {
        return process.cwd();
    }
    catch {
        const projectRoot = process.env.GSD_PROJECT_ROOT;
        if (projectRoot && existsSync(projectRoot))
            return projectRoot;
        return homedir();
    }
}
export function resolveCtxCwd(ctx) {
    if (ctx && typeof ctx === "object" && typeof ctx.cwd === "string") {
        const cwd = ctx.cwd;
        if (existsSync(cwd))
            return cwd;
    }
    return safeWorkspaceCwd();
}
/**
 * Resolve the correct DB path for the current working directory.
 * If `basePath` is inside a `.gsd/worktrees/<MID>/` directory, returns
 * the project root's `.gsd/gsd.db` (shared WAL — R012). Otherwise
 * returns `<basePath>/.gsd/gsd.db`.
 */
export function resolveProjectRootDbPath(basePath) {
    return resolveGsdPathContract(basePath).projectDb;
}
export async function ensureDbOpen(basePath = safeWorkspaceCwd()) {
    try {
        const db = await import("../gsd-db.js");
        const contract = resolveGsdPathContract(basePath);
        const dbPath = contract.projectDb;
        const gsdDir = contract.projectGsd;
        const projectRoot = dirname(dirname(dbPath));
        // Open existing DB file (may be at project root for worktrees)
        if (existsSync(dbPath)) {
            const opened = db.openDatabase(dbPath);
            if (opened)
                setLogBasePath(projectRoot);
            return opened;
        }
        // No DB file — create an empty authoritative DB. Markdown migration is
        // explicit-only; runtime startup must not import projections into state.
        if (existsSync(gsdDir)) {
            const opened = db.openDatabase(dbPath);
            if (opened)
                setLogBasePath(projectRoot);
            return opened;
        }
        logWarning("bootstrap", "ensureDbOpen failed — no .gsd directory found");
        return false;
    }
    catch (err) {
        logWarning("bootstrap", `ensureDbOpen failed: ${err.message ?? String(err)}`);
        return false;
    }
}
export function registerDynamicTools(pi) {
    const fallbackRoot = safeWorkspaceCwd();
    const baseBash = createBashTool(fallbackRoot, {
        spawnHook: (ctx) => ctx,
    });
    const dynamicBash = {
        ...baseBash,
        execute: async (toolCallId, params, signal, onUpdate, ctx) => {
            const basePath = resolveCtxCwd(ctx);
            const fresh = createBashTool(basePath, {
                spawnHook: (spawnCtx) => ({ ...spawnCtx, cwd: basePath }),
            });
            const paramsWithTimeout = {
                ...params,
                timeout: params.timeout ?? DEFAULT_BASH_TIMEOUT_SECS,
            };
            return fresh.execute(toolCallId, paramsWithTimeout, signal, onUpdate, ctx);
        },
    };
    pi.registerTool(dynamicBash);
    const baseWrite = createWriteTool(fallbackRoot);
    pi.registerTool({
        ...baseWrite,
        execute: async (toolCallId, params, signal, onUpdate, ctx) => {
            const fresh = createWriteTool(resolveCtxCwd(ctx));
            return fresh.execute(toolCallId, params, signal, onUpdate, ctx);
        },
    });
    const baseRead = createReadTool(fallbackRoot);
    pi.registerTool({
        ...baseRead,
        execute: async (toolCallId, params, signal, onUpdate, ctx) => {
            const fresh = createReadTool(resolveCtxCwd(ctx));
            return fresh.execute(toolCallId, params, signal, onUpdate, ctx);
        },
    });
    const baseEdit = createEditTool(fallbackRoot);
    pi.registerTool({
        ...baseEdit,
        execute: async (toolCallId, params, signal, onUpdate, ctx) => {
            const fresh = createEditTool(resolveCtxCwd(ctx));
            return fresh.execute(toolCallId, params, signal, onUpdate, ctx);
        },
    });
}
