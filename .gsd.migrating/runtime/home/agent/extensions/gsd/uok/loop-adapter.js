// GSD2 UOK Turn Observer and DB-Backed Lifecycle Emission
import { CURRENT_UOK_CONTRACT_VERSION, validateTurnResult } from "./contracts.js";
import { buildAuditEnvelope, emitUokAuditEvent } from "./audit.js";
import { writeTurnCloseoutGitRecord, writeTurnGitTransaction } from "./gitops.js";
import { acquireWriterToken, nextWriteRecord, releaseWriterToken } from "./writer.js";
export function createTurnObserver(options) {
    let current = null;
    let writerToken = null;
    const phaseResults = [];
    function nextSequenceMetadata(category, operation, metadata) {
        if (!writerToken)
            return metadata ?? {};
        const record = nextWriteRecord({
            basePath: options.basePath,
            token: writerToken,
            category,
            operation,
            metadata,
        });
        return {
            ...(metadata ?? {}),
            writeSequence: record.sequence.sequence,
            writerTokenId: record.writerToken.tokenId,
        };
    }
    return {
        onTurnStart(contract) {
            current = contract;
            phaseResults.length = 0;
            writerToken = acquireWriterToken({
                basePath: options.basePath,
                traceId: contract.traceId,
                turnId: contract.turnId,
            });
            if (options.enableGitops) {
                writeTurnGitTransaction({
                    basePath: options.basePath,
                    traceId: contract.traceId,
                    turnId: contract.turnId,
                    unitType: contract.unitType,
                    unitId: contract.unitId,
                    stage: "turn-start",
                    action: options.gitAction,
                    push: options.gitPush,
                    status: "ok",
                    metadata: nextSequenceMetadata("gitops", "insert", {
                        iteration: contract.iteration,
                        sidecarKind: contract.sidecarKind,
                    }),
                });
            }
            if (options.enableAudit) {
                emitUokAuditEvent(options.basePath, buildAuditEnvelope({
                    traceId: contract.traceId,
                    turnId: contract.turnId,
                    category: "orchestration",
                    type: "turn-start",
                    payload: nextSequenceMetadata("audit", "append", {
                        iteration: contract.iteration,
                        unitType: contract.unitType,
                        unitId: contract.unitId,
                        sidecarKind: contract.sidecarKind,
                    }),
                }));
            }
        },
        onPhaseResult(phase, action, data) {
            phaseResults.push({
                phase,
                action,
                ts: new Date().toISOString(),
                data,
            });
            if (!current || !options.enableGitops)
                return;
            if (phase === "dispatch") {
                writeTurnGitTransaction({
                    basePath: options.basePath,
                    traceId: current.traceId,
                    turnId: current.turnId,
                    unitType: data?.unitType,
                    unitId: data?.unitId,
                    stage: "stage",
                    action: options.gitAction,
                    push: options.gitPush,
                    status: "ok",
                    metadata: nextSequenceMetadata("gitops", "update", { action }),
                });
            }
            if (phase === "unit") {
                writeTurnGitTransaction({
                    basePath: options.basePath,
                    traceId: current.traceId,
                    turnId: current.turnId,
                    unitType: data?.unitType,
                    unitId: data?.unitId,
                    stage: "checkpoint",
                    action: options.gitAction,
                    push: options.gitPush,
                    status: "ok",
                    metadata: nextSequenceMetadata("gitops", "update", { action }),
                });
            }
            if (phase === "finalize") {
                writeTurnGitTransaction({
                    basePath: options.basePath,
                    traceId: current.traceId,
                    turnId: current.turnId,
                    unitType: data?.unitType,
                    unitId: data?.unitId,
                    stage: "publish",
                    action: options.gitAction,
                    push: options.gitPush,
                    status: "ok",
                    metadata: nextSequenceMetadata("gitops", "update", { action }),
                });
            }
        },
        onTurnResult(result) {
            const cleanup = () => {
                if (writerToken) {
                    releaseWriterToken(options.basePath, writerToken);
                }
                writerToken = null;
                current = null;
                phaseResults.length = 0;
            };
            try {
                const merged = {
                    ...result,
                    version: CURRENT_UOK_CONTRACT_VERSION,
                    phaseResults: Array.isArray(result.phaseResults) && result.phaseResults.length > 0 ? result.phaseResults : [...phaseResults],
                };
                const validation = validateTurnResult(merged);
                if (!validation.ok) {
                    throw new Error(`Invalid UOK turn result: ${validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join("; ")}`);
                }
                if (options.enableAudit) {
                    emitUokAuditEvent(options.basePath, buildAuditEnvelope({
                        traceId: validation.value.traceId,
                        turnId: validation.value.turnId,
                        category: "orchestration",
                        type: "turn-result",
                        payload: nextSequenceMetadata("audit", "append", {
                            contractVersion: validation.value.version,
                            unitType: validation.value.unitType,
                            unitId: validation.value.unitId,
                            status: validation.value.status,
                            failureClass: validation.value.failureClass,
                            error: validation.value.error,
                            phaseCount: validation.value.phaseResults.length,
                        }),
                    }));
                }
                if (options.enableGitops) {
                    const closeout = merged.closeout ?? {
                        traceId: merged.traceId,
                        turnId: merged.turnId,
                        unitType: merged.unitType,
                        unitId: merged.unitId,
                        status: merged.status,
                        failureClass: merged.failureClass,
                        gitAction: options.gitAction,
                        gitPushed: options.gitPush,
                        finishedAt: merged.finishedAt,
                    };
                    writeTurnCloseoutGitRecord(options.basePath, closeout, nextSequenceMetadata("gitops", "update", { action: "record" }));
                }
            }
            finally {
                cleanup();
            }
        },
    };
}
