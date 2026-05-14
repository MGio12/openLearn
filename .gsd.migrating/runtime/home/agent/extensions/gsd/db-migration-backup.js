// Project/App: GSD-2
// File Purpose: Pre-migration backup helper for GSD database schema upgrades.
export function backupDatabaseBeforeMigration(db, dbPath, currentVersion, deps) {
    if (!dbPath || dbPath === ":memory:" || !deps.existsSync(dbPath))
        return;
    try {
        const backupPath = `${dbPath}.backup-v${currentVersion}`;
        if (deps.existsSync(backupPath))
            return;
        try {
            db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
        }
        catch {
            // Checkpoint is best effort; copying the base file is still better than no backup.
        }
        deps.copyFileSync(dbPath, backupPath);
    }
    catch (backupErr) {
        const message = backupErr instanceof Error ? backupErr.message : String(backupErr);
        deps.logWarning("db", `Pre-migration backup failed: ${message}`);
    }
}
