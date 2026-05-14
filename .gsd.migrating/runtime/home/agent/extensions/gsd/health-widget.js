// Project/App: GSD-2
// File Purpose: Always-on ambient health signal rendered below the editor.
import { runProviderChecks, summariseProviderIssues } from "./doctor-providers.js";
import { runEnvironmentChecks } from "./doctor-environment.js";
import { loadEffectiveGSDPreferences } from "./preferences.js";
import { nativeIsRepo, nativeLastCommitEpoch, nativeGetCurrentBranch, nativeCommitSubject } from "./native-git-bridge.js";
import { loadLedgerFromDisk, getProjectTotals } from "./metrics.js";
import { projectRoot } from "./commands/context.js";
import { buildHealthLines, detectHealthWidgetProjectState, } from "./health-widget-core.js";
export const HEALTH_WIDGET_ACTIVE_HINTS = "  /gsd auto to run  ·  /gsd status for overview  ·  /gsd visualize to inspect  ·  /gsd notifications for history  ·  /gsd help";
// ── Data loader ────────────────────────────────────────────────────────────────
function loadHealthWidgetData(basePath) {
    let budgetCeiling;
    let budgetSpent = 0;
    let providerIssue = null;
    let environmentErrorCount = 0;
    let environmentWarningCount = 0;
    let lastCommitEpoch = null;
    let lastCommitMessage = null;
    const projectState = detectHealthWidgetProjectState(basePath);
    try {
        const prefs = loadEffectiveGSDPreferences();
        budgetCeiling = prefs?.preferences?.budget_ceiling;
        const ledger = loadLedgerFromDisk(basePath);
        if (ledger) {
            const totals = getProjectTotals(ledger.units ?? []);
            budgetSpent = totals.cost;
        }
    }
    catch { /* non-fatal */ }
    try {
        const providerResults = runProviderChecks();
        providerIssue = summariseProviderIssues(providerResults);
    }
    catch { /* non-fatal */ }
    try {
        const envResults = runEnvironmentChecks(basePath);
        for (const r of envResults) {
            if (r.status === "error")
                environmentErrorCount++;
            else if (r.status === "warning")
                environmentWarningCount++;
        }
    }
    catch { /* non-fatal */ }
    // ── Last commit info ──
    try {
        if (nativeIsRepo(basePath)) {
            const branch = nativeGetCurrentBranch(basePath);
            const epoch = nativeLastCommitEpoch(basePath, branch || "HEAD");
            if (epoch > 0) {
                lastCommitEpoch = epoch;
                lastCommitMessage = nativeCommitSubject(basePath, branch || "HEAD") || null;
            }
        }
    }
    catch { /* non-fatal */ }
    return {
        projectState,
        budgetCeiling,
        budgetSpent,
        providerIssue,
        environmentErrorCount,
        environmentWarningCount,
        lastCommitEpoch,
        lastCommitMessage,
        lastRefreshed: Date.now(),
    };
}
// ── Widget init ────────────────────────────────────────────────────────────────
const REFRESH_INTERVAL_MS = 60_000;
/**
 * Initialize the always-on gsd-health widget (belowEditor).
 * Call once from the extension entry point after context is available.
 */
export function initHealthWidget(ctx) {
    if (!ctx.hasUI)
        return;
    const basePath = projectRoot();
    // String-array fallback — used in RPC mode (factory is a no-op there)
    const initialData = loadHealthWidgetData(basePath);
    ctx.ui.setWidget("gsd-health", buildHealthLines(initialData), { placement: "belowEditor" });
    // Factory-based widget for TUI mode — replaces the string-array above
    ctx.ui.setWidget("gsd-health", (_tui, _theme) => {
        let data = initialData;
        let cachedLines;
        let refreshInFlight = false;
        let isDisposed = false;
        const refresh = async () => {
            if (refreshInFlight)
                return;
            refreshInFlight = true;
            try {
                data = loadHealthWidgetData(basePath);
                cachedLines = undefined;
                if (!isDisposed)
                    _tui.requestRender();
            }
            catch { /* non-fatal */ }
            finally {
                refreshInFlight = false;
            }
        };
        // Fire first enrichment immediately. requestRender() inside is a no-op
        // if the widget has not yet rendered, so this is safe before factory return.
        void refresh();
        const refreshTimer = setInterval(() => {
            void refresh();
        }, REFRESH_INTERVAL_MS);
        let cachedWidth;
        return {
            render(width) {
                if (!cachedLines || cachedWidth !== width) {
                    cachedLines = buildHealthLines(data, width);
                    if (data.projectState === "active") {
                        cachedLines = [...cachedLines, _theme.fg("dim", HEALTH_WIDGET_ACTIVE_HINTS)];
                    }
                    cachedWidth = width;
                }
                return cachedLines;
            },
            invalidate() { cachedLines = undefined; cachedWidth = undefined; },
            dispose() {
                isDisposed = true;
                clearInterval(refreshTimer);
            },
        };
    }, { placement: "belowEditor" });
}
