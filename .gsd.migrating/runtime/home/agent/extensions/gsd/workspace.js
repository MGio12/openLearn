// GSD-2 + Workspace handle: single source of truth for path resolution per milestone
import { join, resolve } from "node:path";
import { resolveGsdPathContract, normalizeRealPath } from "./paths.js";
import { isGsdWorktreePath, resolveWorktreeProjectRoot } from "./worktree-root.js";
function tryRealpath(p) {
    return normalizeRealPath(p);
}
/**
 * Create an immutable GsdWorkspace handle from a raw base path.
 * Resolves both the project root and (when applicable) the worktree root,
 * normalizes them via realpath, and freezes the result.
 */
export function createWorkspace(rawBasePath) {
    const resolvedBase = resolve(rawBasePath);
    const isWorktree = isGsdWorktreePath(resolvedBase);
    const projectRootRaw = resolveWorktreeProjectRoot(resolvedBase);
    const projectRoot = tryRealpath(resolve(projectRootRaw));
    const worktreeRoot = isWorktree ? tryRealpath(resolvedBase) : null;
    // Derive a canonical base from the already-realpath-normalized paths so that
    // resolveGsdPathContract always receives a canonical path. Using the raw
    // resolvedBase here can produce a non-canonical projectGsd when the input
    // path contains symlinks, causing contract.projectGsd to diverge from the
    // realpath-normalized projectRoot / identityKey.
    const canonicalBase = isWorktree ? (worktreeRoot ?? resolvedBase) : projectRoot;
    const contract = Object.freeze(resolveGsdPathContract(canonicalBase));
    const identityKey = tryRealpath(projectRoot);
    const mode = isWorktree ? "worktree" : "project";
    const workspace = Object.freeze({
        projectRoot,
        worktreeRoot,
        mode,
        contract,
        identityKey,
        lockRoot: projectRoot,
    });
    return workspace;
}
/**
 * Bind a milestoneId to a workspace, producing an immutable MilestoneScope
 * with path-returning closures that resolve via the authoritative projectGsd.
 *
 * All milestone-content paths route to contract.projectGsd (canonical),
 * since that is the authoritative source of truth regardless of worktree mode.
 */
export function scopeMilestone(workspace, milestoneId) {
    const { contract } = workspace;
    const gsd = contract.projectGsd;
    const scope = Object.freeze({
        workspace,
        milestoneId,
        contextFile: () => join(gsd, "milestones", milestoneId, `${milestoneId}-CONTEXT.md`),
        roadmapFile: () => join(gsd, "milestones", milestoneId, `${milestoneId}-ROADMAP.md`),
        stateFile: () => join(gsd, "STATE.md"),
        dbPath: () => contract.projectDb,
        milestoneDir: () => join(gsd, "milestones", milestoneId),
        metaJson: () => join(gsd, `${milestoneId}-META.json`),
    });
    return scope;
}
