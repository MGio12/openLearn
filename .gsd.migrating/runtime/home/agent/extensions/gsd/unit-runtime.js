import { closeSync, existsSync, mkdirSync, openSync, readdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { atomicWriteSync } from "./atomic-write.js";
import { gsdRoot, relSliceFile, relTaskFile, resolveSliceFile, resolveTaskFile, } from "./paths.js";
import { loadFile, parseTaskPlanMustHaves, countMustHavesMentionedInSummary } from "./files.js";
import { parseUnitId } from "./unit-id.js";
import { getTask, isDbAvailable, refreshOpenDatabaseFromDisk } from "./gsd-db.js";
import { isClosedStatus } from "./status-guards.js";
// Per-record advisory lock — prevents read-modify-write races between
// concurrent writers updating disjoint fields of the same runtime record.
// Within a single Node process this is moot (writeUnitRuntimeRecord is sync),
// but cross-process callers (parallel slice executors, doctor --fix while a
// detached auto-mode session is alive) can otherwise clobber each other.
const RECORD_LOCK_TIMEOUT_MS = 2_000;
const RECORD_LOCK_STALE_MS = 5_000;
const RECORD_LOCK_SLEEP_BUFFER = new SharedArrayBuffer(4);
const RECORD_LOCK_SLEEP_VIEW = new Int32Array(RECORD_LOCK_SLEEP_BUFFER);
function withRecordLock(recordPath, fn) {
    const lockPath = recordPath + ".lock";
    try {
        mkdirSync(dirname(lockPath), { recursive: true });
    }
    catch {
        // best-effort
    }
    const deadline = Date.now() + RECORD_LOCK_TIMEOUT_MS;
    while (true) {
        try {
            // O_EXCL atomic create-if-not-exists.
            closeSync(openSync(lockPath, "wx"));
            break;
        }
        catch (err) {
            if (err.code !== "EEXIST")
                throw err;
            // Existing lock — check for staleness before either waiting or stealing.
            try {
                const stat = statSync(lockPath);
                if (Date.now() - stat.mtimeMs > RECORD_LOCK_STALE_MS) {
                    try {
                        unlinkSync(lockPath);
                    }
                    catch { /* race: already removed */ }
                    continue;
                }
            }
            catch {
                // stat failed (file removed between EEXIST and stat) — retry create.
                continue;
            }
            if (Date.now() >= deadline) {
                // Last-resort steal — unlikely in practice but avoids permanent wedge.
                try {
                    unlinkSync(lockPath);
                }
                catch { /* race */ }
                continue;
            }
            Atomics.wait(RECORD_LOCK_SLEEP_VIEW, 0, 0, 5);
        }
    }
    try {
        return fn();
    }
    finally {
        try {
            unlinkSync(lockPath);
        }
        catch { /* best-effort */ }
    }
}
export const IN_FLIGHT_RUNTIME_PHASES = new Set([
    "dispatched",
    "wrapup-warning-sent",
    "timeout",
    "finalize-timeout",
    "crashed",
    "paused",
]);
export function isInFlightRuntimePhase(phase) {
    return IN_FLIGHT_RUNTIME_PHASES.has(phase);
}
function runtimeDir(basePath) {
    return join(gsdRoot(basePath), "runtime", "units");
}
function runtimePath(basePath, unitType, unitId) {
    const sanitizedUnitType = unitType.replace(/[\/]/g, "-");
    const sanitizedUnitId = unitId.replace(/[\/]/g, "-");
    return join(runtimeDir(basePath), `${sanitizedUnitType}-${sanitizedUnitId}.json`);
}
export function writeUnitRuntimeRecord(basePath, unitType, unitId, startedAt, updates = {}) {
    const path = runtimePath(basePath, unitType, unitId);
    return withRecordLock(path, () => {
        const prev = readUnitRuntimeRecord(basePath, unitType, unitId);
        const next = {
            version: 1,
            unitType,
            unitId,
            startedAt,
            updatedAt: Date.now(),
            phase: updates.phase ?? prev?.phase ?? "dispatched",
            wrapupWarningSent: updates.wrapupWarningSent ?? prev?.wrapupWarningSent ?? false,
            continueHereFired: updates.continueHereFired ?? prev?.continueHereFired ?? false,
            timeoutAt: updates.timeoutAt ?? prev?.timeoutAt ?? null,
            lastProgressAt: updates.lastProgressAt ?? prev?.lastProgressAt ?? Date.now(),
            progressCount: updates.progressCount ?? prev?.progressCount ?? 0,
            lastProgressKind: updates.lastProgressKind ?? prev?.lastProgressKind ?? "dispatch",
            recovery: updates.recovery ?? prev?.recovery,
            recoveryAttempts: updates.recoveryAttempts ?? prev?.recoveryAttempts ?? 0,
            lastRecoveryReason: updates.lastRecoveryReason ?? prev?.lastRecoveryReason,
        };
        atomicWriteSync(path, JSON.stringify(next, null, 2) + "\n", "utf-8");
        return next;
    });
}
export function readUnitRuntimeRecord(basePath, unitType, unitId) {
    const path = runtimePath(basePath, unitType, unitId);
    if (!existsSync(path))
        return null;
    try {
        return JSON.parse(readFileSync(path, "utf-8"));
    }
    catch {
        return null;
    }
}
export function clearUnitRuntimeRecord(basePath, unitType, unitId) {
    const path = runtimePath(basePath, unitType, unitId);
    if (existsSync(path))
        unlinkSync(path);
}
/**
 * Return all runtime records currently on disk for `basePath`.
 * Returns an empty array if the runtime directory does not exist.
 */
export function listUnitRuntimeRecords(basePath) {
    const dir = runtimeDir(basePath);
    if (!existsSync(dir))
        return [];
    const results = [];
    for (const file of readdirSync(dir)) {
        if (!file.endsWith(".json"))
            continue;
        try {
            const raw = readFileSync(join(dir, file), "utf-8");
            const record = JSON.parse(raw);
            results.push(record);
        }
        catch {
            // Skip malformed files
        }
    }
    return results;
}
export async function inspectExecuteTaskDurability(basePath, unitId) {
    const { milestone: mid, slice: sid, task: tid } = parseUnitId(unitId);
    if (!mid || !sid || !tid)
        return null;
    const planAbs = resolveSliceFile(basePath, mid, sid, "PLAN");
    const summaryAbs = resolveTaskFile(basePath, mid, sid, tid, "SUMMARY");
    const stateAbs = join(gsdRoot(basePath), "STATE.md");
    const planPath = relSliceFile(basePath, mid, sid, "PLAN");
    const summaryPath = relTaskFile(basePath, mid, sid, tid, "SUMMARY");
    const planContent = planAbs ? await loadFile(planAbs) : null;
    const stateContent = existsSync(stateAbs) ? readFileSync(stateAbs, "utf-8") : "";
    const summaryExists = !!(summaryAbs && existsSync(summaryAbs));
    const escapedTid = tid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const taskChecked = !!planContent && new RegExp(`^- \\[[xX]\\] \\*\\*${escapedTid}:`, "m").test(planContent);
    const nextActionAdvanced = !new RegExp(`Execute ${tid}\\b`).test(stateContent);
    let dbComplete = false;
    if (isDbAvailable()) {
        refreshOpenDatabaseFromDisk();
        const task = getTask(mid, sid, tid);
        dbComplete = !!task && isClosedStatus(task.status);
    }
    // Must-have coverage: load task plan and count mentions in summary
    let mustHaveCount = 0;
    let mustHavesMentionedInSummary = 0;
    const taskPlanAbs = resolveTaskFile(basePath, mid, sid, tid, "PLAN");
    if (taskPlanAbs) {
        const taskPlanContent = await loadFile(taskPlanAbs);
        if (taskPlanContent) {
            const mustHaves = parseTaskPlanMustHaves(taskPlanContent);
            mustHaveCount = mustHaves.length;
            if (mustHaveCount > 0 && summaryExists && summaryAbs) {
                const summaryContent = await loadFile(summaryAbs);
                if (summaryContent) {
                    mustHavesMentionedInSummary = countMustHavesMentionedInSummary(mustHaves, summaryContent);
                }
            }
        }
    }
    return {
        planPath,
        summaryPath,
        summaryExists,
        taskChecked,
        nextActionAdvanced,
        dbComplete,
        mustHaveCount,
        mustHavesMentionedInSummary,
    };
}
export function formatExecuteTaskRecoveryStatus(status) {
    if (status.dbComplete)
        return "DB task status is closed";
    const missing = [];
    if (!status.summaryExists)
        missing.push(`summary missing (${status.summaryPath})`);
    if (!status.taskChecked)
        missing.push(`task checkbox unchecked in ${status.planPath}`);
    if (!status.nextActionAdvanced)
        missing.push("state next action still points at the timed-out task");
    if (status.mustHaveCount > 0 && status.mustHavesMentionedInSummary < status.mustHaveCount) {
        missing.push(`must-have gap: ${status.mustHavesMentionedInSummary} of ${status.mustHaveCount} must-haves addressed in summary`);
    }
    return missing.length > 0 ? missing.join("; ") : "all durable task artifacts present";
}
