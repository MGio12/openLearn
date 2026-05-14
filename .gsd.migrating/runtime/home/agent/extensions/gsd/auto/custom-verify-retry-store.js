// Project/App: GSD-2
// File Purpose: Persistence adapter for custom workflow verification retry counts.
import { readFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { atomicWriteSync } from "../atomic-write.js";
import { gsdRoot } from "../paths.js";
export function customVerifyRetryStateDir(s) {
    return s.activeRunDir ? join(s.activeRunDir, "runtime") : join(gsdRoot(s.basePath), "runtime");
}
export function customVerifyRetryStatePath(s) {
    return join(customVerifyRetryStateDir(s), "custom-verify-retries.json");
}
export function hydrateCustomVerifyRetryCounts(s, deps) {
    if (s.verificationRetryCount.size > 0) {
        return s.verificationRetryCount;
    }
    try {
        const raw = JSON.parse(readFileSync(customVerifyRetryStatePath(s), "utf-8"));
        const counts = raw && typeof raw === "object" && raw.counts && typeof raw.counts === "object"
            ? raw.counts
            : {};
        for (const [key, value] of Object.entries(counts)) {
            if (typeof value === "number" && Number.isFinite(value) && value > 0) {
                s.verificationRetryCount.set(key, Math.floor(value));
            }
        }
    }
    catch (err) {
        deps.logFailure(err);
    }
    return s.verificationRetryCount;
}
export function saveCustomVerifyRetryCounts(s, deps) {
    const retryCounts = s.verificationRetryCount;
    const filePath = customVerifyRetryStatePath(s);
    try {
        if (!retryCounts || retryCounts.size === 0) {
            unlinkSync(filePath);
            return;
        }
        mkdirSync(customVerifyRetryStateDir(s), { recursive: true });
        atomicWriteSync(filePath, JSON.stringify({
            counts: Object.fromEntries(retryCounts),
            updatedAt: new Date().toISOString(),
        }) + "\n");
    }
    catch (err) {
        const code = err && typeof err === "object" && "code" in err ? err.code : undefined;
        if (code !== "ENOENT") {
            deps.logFailure(err);
        }
    }
}
