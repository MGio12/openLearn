// GSD2 UOK Contract Types and Versioning
export const CURRENT_UOK_CONTRACT_VERSION = "1";
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function normalizeVersion(value) {
    return value === CURRENT_UOK_CONTRACT_VERSION ? CURRENT_UOK_CONTRACT_VERSION : "0";
}
function requireString(value, key, issues) {
    if (typeof value[key] !== "string" || value[key] === "") {
        issues.push({ path: key, message: `${key} must be a non-empty string` });
    }
}
function requireRecord(value, key, issues) {
    if (!isRecord(value[key])) {
        issues.push({ path: key, message: `${key} must be an object` });
    }
}
export function normalizeTurnResult(value) {
    return { ...value, version: normalizeVersion(value.version) };
}
export function normalizeDispatchEnvelope(value) {
    return { ...value, version: normalizeVersion(value.version) };
}
export function normalizeAuditEvent(value) {
    return { ...value, version: normalizeVersion(value.version) };
}
export function validateTurnResult(value) {
    const normalized = normalizeTurnResult(value);
    const record = normalized;
    const issues = [];
    requireString(record, "traceId", issues);
    requireString(record, "turnId", issues);
    if (!Number.isInteger(record.iteration)) {
        issues.push({ path: "iteration", message: "iteration must be an integer" });
    }
    requireString(record, "status", issues);
    requireString(record, "failureClass", issues);
    if (!Array.isArray(record.phaseResults)) {
        issues.push({ path: "phaseResults", message: "phaseResults must be an array" });
    }
    requireString(record, "startedAt", issues);
    requireString(record, "finishedAt", issues);
    return { ok: issues.length === 0, value: normalized, issues };
}
export function validateDispatchEnvelope(value) {
    const normalized = normalizeDispatchEnvelope(value);
    const record = normalized;
    const issues = [];
    requireString(record, "action", issues);
    requireRecord(record, "reason", issues);
    if (isRecord(record.reason)) {
        requireString(record.reason, "reasonCode", issues);
        requireString(record.reason, "summary", issues);
    }
    return { ok: issues.length === 0, value: normalized, issues };
}
export function validateAuditEvent(value) {
    const normalized = normalizeAuditEvent(value);
    const record = normalized;
    const issues = [];
    requireString(record, "eventId", issues);
    requireString(record, "traceId", issues);
    requireString(record, "category", issues);
    requireString(record, "type", issues);
    requireString(record, "ts", issues);
    requireRecord(record, "payload", issues);
    return { ok: issues.length === 0, value: normalized, issues };
}
