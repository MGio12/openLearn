// GSD worktree session state
let originalCwd = null;
export function getWorktreeOriginalCwd() {
    return originalCwd;
}
export function setWorktreeOriginalCwd(cwd) {
    originalCwd = cwd;
}
export function clearWorktreeOriginalCwd() {
    originalCwd = null;
}
export function ensureWorktreeOriginalCwdFromPath(cwd = process.cwd()) {
    if (originalCwd)
        return originalCwd;
    const marker = `${/\\/.test(cwd) ? "\\" : "/"}.gsd${/\\/.test(cwd) ? "\\" : "/"}worktrees${/\\/.test(cwd) ? "\\" : "/"}`;
    const markerIdx = cwd.indexOf(marker);
    if (markerIdx !== -1) {
        originalCwd = cwd.slice(0, markerIdx);
    }
    return originalCwd;
}
export function getActiveWorktreeName() {
    if (!originalCwd)
        return null;
    const cwd = process.cwd();
    const wtDir = `${originalCwd.replace(/[\\/]+$/, "")}/.gsd/worktrees`.replaceAll("\\", "/");
    const normalizedCwd = cwd.replaceAll("\\", "/");
    if (!normalizedCwd.startsWith(`${wtDir}/`))
        return null;
    const rel = normalizedCwd.slice(wtDir.length + 1);
    const name = rel.split("/")[0];
    return name || null;
}
