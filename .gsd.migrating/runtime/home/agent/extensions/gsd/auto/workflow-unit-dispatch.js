// Project/App: GSD-2
// File Purpose: Unit dispatch contract adapter for auto-mode loop.
import { ExecutionGraphScheduler } from "../uok/execution-graph.js";
import { runUnitPhase } from "./phases.js";
import { decideDispatchNodeKind } from "./workflow-kernel.js";
export async function runUnitPhaseViaContract(dispatchContract, ic, iterData, loopState, sidecarItem, deps) {
    if (dispatchContract === "legacy-direct") {
        return deps.runUnitPhase(ic, iterData, loopState, sidecarItem);
    }
    const scheduler = deps.createScheduler();
    let outcome = null;
    const executeNode = async () => {
        outcome = await deps.runUnitPhase(ic, iterData, loopState, sidecarItem);
    };
    const kinds = [
        "unit",
        "hook",
        "subagent",
        "team-worker",
        "verification",
        "reprocess",
    ];
    for (const kind of kinds)
        scheduler.registerHandler(kind, executeNode);
    const nodeId = `dispatch:${ic.iteration}:${iterData.unitType}:${iterData.unitId}`;
    await scheduler.run([
        {
            id: nodeId,
            kind: decideDispatchNodeKind(iterData.unitType, sidecarItem?.kind),
            dependsOn: [],
            metadata: {
                unitType: iterData.unitType,
                unitId: iterData.unitId,
            },
        },
    ], { parallel: false, maxWorkers: 1 });
    return outcome ?? { action: "break", reason: "scheduler-dispatch-missing-result" };
}
export function createExecutionGraphUnitDispatchDeps() {
    return {
        runUnitPhase: async (...args) => runUnitPhase(...args),
        createScheduler: () => new ExecutionGraphScheduler(),
    };
}
