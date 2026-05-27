/* ============================================================
   ProfilePanel — IKEA-effect surface, with emojis per choice
   ============================================================ */

const { useState: useStateP } = React;

function ProfilePanel({ profile, currentScreen, mission, justFilledKey }) {
  const [collapsed, setCollapsed] = useStateP(false);
  const isGenerating = currentScreen === "generation";
  const isMissionReady = ["mission","social","recap","paywall"].includes(currentScreen);

  let sub = "Profil en construction";
  if (isMissionReady) sub = "Profil — mission prête";
  else if (isGenerating) sub = "Profil — synthèse en cours";

  // count answered profile lines
  const filledCount = PROFILE_LINES.filter(line => {
    const v = profile[line.key];
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === "object" && "hours" in v) return v.hours != null;
    return Boolean(v);
  }).length;
  const totalCount = PROFILE_LINES.length;

  return (
    <div className={`ob-profile ${collapsed ? "ob-profile-collapsed" : ""}`} aria-label="Ton profil en construction">
      <div className="ob-profile-head">
        <div>
          <div className="ob-profile-title">
            {profile.nom ? `Profil — ${profile.nom}` : "Profil"}
          </div>
          <div className="ob-profile-sub">{sub}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="ob-profile-counter">{filledCount}/{totalCount}</span>
          <button
            className="ob-profile-toggle"
            onClick={() => setCollapsed(c => !c)}
            aria-expanded={!collapsed}
          >
            {collapsed ? "Voir" : "Replier"}
            <span style={{ fontFamily: "var(--font-display)", fontSize: 11 }}>{collapsed ? "▾" : "▴"}</span>
          </button>
        </div>
      </div>

      <div className="ob-profile-list">
        {PROFILE_LINES.map(line => {
          const raw = profile[line.key];
          let hasValue = false;
          let display = null;

          if (Array.isArray(raw)) {
            hasValue = raw.length > 0;
            display = line.formatter ? line.formatter(raw) : raw.join(", ");
          } else if (raw && typeof raw === "object" && "hours" in raw) {
            hasValue = raw.hours != null;
            display = hasValue ? line.formatter(raw.hours) : null;
          } else if (raw && typeof raw === "object") {
            hasValue = true;
            display = line.formatter ? line.formatter(raw) : JSON.stringify(raw);
          } else if (raw) {
            hasValue = true;
            display = line.formatter ? line.formatter(raw) : humanizeValue(line.key, raw);
          }

          const emoji = hasValue ? choiceEmoji(line.key, raw && typeof raw === "object" && "hours" in raw ? raw.hours : raw) : null;

          const justFilled = justFilledKey === line.key;
          const isKey = hasValue && line.keyForMission && isMissionReady;

          return (
            <div
              key={line.key}
              className={[
                "ob-profile-line",
                hasValue ? "has-value" : "",
                isKey ? "is-key-mission" : "",
                justFilled ? "just-filled" : "",
              ].filter(Boolean).join(" ")}
            >
              <span className="ob-profile-line-bullet" aria-hidden />
              <div className="ob-profile-line-head">
                <div className="ob-profile-line-label">{line.label}</div>
                {hasValue && isKey && (
                  <div className="ob-profile-line-status is-key">Mission</div>
                )}
              </div>
              <div className={`ob-profile-line-value ${hasValue ? "" : "is-empty"}`}>
                {hasValue && emoji && <span className="ob-profile-line-emoji" aria-hidden>{emoji}</span>}
                <span className="ob-profile-line-text">{hasValue ? display : "—"}</span>
              </div>
            </div>
          );
        })}

        {/* Mission line */}
        {mission && isMissionReady && (
          <div className="ob-profile-line has-value is-key-mission just-filled">
            <span className="ob-profile-line-bullet" aria-hidden />
            <div className="ob-profile-line-head">
              <div className="ob-profile-line-label">Mission du jour</div>
              <div className="ob-profile-line-status is-key">prête</div>
            </div>
            <div className="ob-profile-line-value" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>
              <span className="ob-profile-line-emoji" aria-hidden>🎯</span>
              <span className="ob-profile-line-text">{truncate(mission.action, 80)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Annotation foot — handwriting */}
      <div className="ob-profile-foot">
        {profileFootText(profile, currentScreen, mission)}
      </div>
    </div>
  );
}

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

function humanizeValue(key, raw) {
  if (!raw) return raw;
  if (key === "objectif") return (OBJECTIF_CHOICES.find(c => c.v === raw) || {}).label || raw;
  if (key === "blocage")  return (BLOCAGE_CHOICES.find(c => c.v === raw) || {}).label || raw;
  return raw;
}

function profileFootText(profile, screen, mission) {
  if (screen === "intro")      return "On va remplir ce profil ensemble. 1 question = 1 ligne.";
  if (screen === "classe")     return "Une classe, un calendrier. La suite s'adapte.";
  if (screen === "objectif")   return "Bien. On va creuser ce qui te bloque vraiment.";
  if (screen === "moyenne")    return "L'écart visé devient la boussole.";
  if (screen === "echeance")   return "Plus la date est proche, plus la mission est précise.";
  if (screen === "matiere")    return "Plusieurs matières possibles — on cible la plus rentable d'abord.";
  if (screen === "blocage")    return "Ça change tout. Deux élèves dans la même matière n'ont pas la même mission.";
  if (screen === "niveau")     return "Quel est ton profil ?";
  if (screen === "effort")     return "On respecte ton temps réel. Pas plus, pas moins.";
  if (screen === "nom")        return "Personnalisation de ton espace.";
  if (screen === "generation") return "Croisement matière × blocage × niveau × temps en cours…";
  if (screen === "mission")    return "Une mission, une trace écrite. C'est ce qui distingue le travail clair du travail au hasard.";
  if (screen === "social")     return "Conseil ciblé sur ton blocage.";
  if (screen === "recap")      return "Voilà ton année en une page.";
  if (screen === "paywall")    return "Plan prêt. Décision suivante : activer l'essai.";
  return "";
}

// Export
Object.assign(window, { ProfilePanel });
