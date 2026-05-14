// Project/App: GSD-2
// File Purpose: Worktree Safety module contract for validating source-writing Unit roots.
import { existsSync, lstatSync } from "node:fs";
import { join, resolve } from "node:path";
import { normalizeWorktreePathForCompare } from "./worktree-root.js";
import { listWorktrees } from "./worktree-manager.js";
import { getCurrentBranch } from "./worktree.js";
const fsOnlyDeps = {
    existsSync,
    lstatSync,
};
const defaultDeps = {
    ...fsOnlyDeps,
    listRegisteredWorktrees(projectRoot) {
        return listWorktrees(projectRoot).map((worktree) => ({
            path: worktree.path,
            branch: worktree.branch,
        }));
    },
    getCurrentBranch,
};
function isValidMilestoneId(milestoneId) {
    return milestoneId.length > 0 && !/[\/\\]|\.\./.test(milestoneId);
}
function samePath(a, b) {
    return normalizeWorktreePathForCompare(a) === normalizeWorktreePathForCompare(b);
}
function failure(kind, reason, remediation, details) {
    return { ok: false, kind, reason, remediation, details };
}
function errorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
export function createWorktreeSafetyModule(deps = defaultDeps) {
    return {
        validateUnitRoot(input) {
            if (input.writeScope === "planning-only") {
                return {
                    ok: true,
                    kind: "not-required",
                    reason: "planning-only Units may write GSD artifacts without a source worktree",
                };
            }
            const milestoneId = input.milestoneId?.trim();
            if (!milestoneId) {
                return failure("milestone-id-missing", `Source-writing Unit ${input.unitType} ${input.unitId} has no milestone id.`, "Resolve the Unit milestone before preparing a worktree root.");
            }
            if (!isValidMilestoneId(milestoneId)) {
                return failure("milestone-id-invalid", `Milestone id "${milestoneId}" is not safe for worktree path resolution.`, "Use a milestone id without path separators or traversal segments.", { milestoneId });
            }
            const projectRoot = resolve(input.projectRoot);
            const unitRoot = resolve(input.unitRoot);
            const expectedRoot = join(projectRoot, ".gsd", "worktrees", milestoneId);
            if (!samePath(unitRoot, expectedRoot)) {
                return failure("invalid-root", `Unit root ${unitRoot} is not the expected worktree root for ${milestoneId}.`, "Prepare the Unit in its canonical milestone worktree before allowing source writes.", { expectedRoot, unitRoot });
            }
            if (!deps.existsSync(unitRoot)) {
                return failure("worktree-missing", `Worktree root ${unitRoot} does not exist.`, "Create or recover the milestone worktree before dispatching the source-writing Unit.", { unitRoot });
            }
            const gitMarker = join(unitRoot, ".git");
            if (!deps.existsSync(gitMarker)) {
                return failure("worktree-git-marker-missing", `Worktree root ${unitRoot} has no .git marker.`, "Recover or recreate the milestone worktree before dispatching the source-writing Unit.", { gitMarker });
            }
            let gitMarkerStat;
            try {
                gitMarkerStat = deps.lstatSync(gitMarker);
            }
            catch (error) {
                return failure("worktree-git-probe-failed", `Unable to inspect .git marker for worktree root ${unitRoot}.`, "Recover or recreate the milestone worktree before dispatching the source-writing Unit.", { gitMarker, error: errorMessage(error) });
            }
            if (!gitMarkerStat.isFile()) {
                return failure("worktree-git-marker-not-file", `Worktree root ${unitRoot} has a .git directory, not a registered worktree .git file.`, "Use a registered GSD worktree instead of a copied or nested repository.", { gitMarker });
            }
            let registered;
            try {
                registered = deps.listRegisteredWorktrees?.(projectRoot);
            }
            catch (error) {
                return failure("worktree-git-probe-failed", `Unable to list registered worktrees for project root ${projectRoot}.`, "Recover or recreate the milestone worktree before dispatching the source-writing Unit.", { projectRoot, error: errorMessage(error) });
            }
            if (registered && !registered.some((worktree) => samePath(worktree.path, unitRoot))) {
                return failure("worktree-unregistered", `Worktree root ${unitRoot} is not registered with git worktree list.`, "Recreate or re-register the milestone worktree before dispatching the source-writing Unit.", { unitRoot });
            }
            if (input.emptyWorktreeWithProjectContent) {
                return failure("empty-worktree-with-project-content", `Worktree root ${unitRoot} has no project content, but the project root does.`, "Resolve untracked project-root content or recreate the worktree so source writes stay isolated.", { unitRoot, projectRoot });
            }
            const expectedBranch = input.expectedBranch?.trim();
            let branch;
            if (expectedBranch) {
                if (!deps.getCurrentBranch) {
                    return failure("worktree-git-probe-failed", `Branch verification requested for ${unitRoot} but no getCurrentBranch dependency is configured.`, "Recover or recreate the milestone worktree before dispatching the source-writing Unit.", { unitRoot, expectedBranch, error: "getCurrentBranch dep not provided" });
                }
                try {
                    branch = deps.getCurrentBranch(unitRoot);
                }
                catch (error) {
                    return failure("worktree-git-probe-failed", `Unable to resolve current branch for worktree root ${unitRoot}.`, "Recover or recreate the milestone worktree before dispatching the source-writing Unit.", { unitRoot, expectedBranch, error: errorMessage(error) });
                }
                if (branch !== expectedBranch) {
                    return failure("branch-mismatch", `Worktree root ${unitRoot} is on branch ${branch}, expected ${expectedBranch}.`, "Switch to the expected milestone branch or recover the worktree before dispatching the Unit.", { branch, expectedBranch });
                }
            }
            if (input.lease?.required && !input.lease.held) {
                return failure("lease-lost", `Milestone lease for ${milestoneId} is not held by the current worker.`, "Reclaim the milestone lease before dispatching the source-writing Unit.", { owner: input.lease.owner ?? null });
            }
            return {
                ok: true,
                kind: "safe",
                projectRoot,
                unitRoot,
                milestoneId,
                branch,
            };
        },
    };
}
export function createFsOnlyWorktreeSafetyModule() {
    return createWorktreeSafetyModule(fsOnlyDeps);
}
