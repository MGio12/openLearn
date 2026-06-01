/* ============================================================
   Screens - EARLY (Intro → Matières)
   ============================================================ */

// Shared bits ----------------------------------------------------
function Choice({ choice, isSelected, isMulti, onSelect }) {
  return (
    <button
      type="button"
      className={`ob-choice ${isSelected ? "is-selected" : ""} ${isMulti ? "is-multi" : "is-single"}`}
      onClick={() => onSelect(choice.v)}
      aria-pressed={isSelected}
    >
      {isMulti && <span className="ob-choice-tick">✓</span>}
      {choice.emoji && (
        <span className="ob-choice-emoji" aria-hidden>{choice.emoji}</span>
      )}
      <span className="ob-choice-body">
        <span className="ob-choice-label">{choice.label}</span>
        {choice.sub && <span className="ob-choice-sub">{choice.sub}</span>}
      </span>
    </button>
  );
}

// ----------------------------------------------------------------
// Generic question screen - handles single & multi
// ----------------------------------------------------------------
function QuestionScreen({
  title, microcopy, eyebrow, eyebrowPill,
  choices, value, onAnswer,
  twoCol, multi, helperBelow, contextualEncouragement,
}) {
  const [otherText, setOtherText] = React.useState("");

  const isOther = !multi && value && !choices.find(c => c.v === value);
  const [otherOpen, setOtherOpen] = React.useState(value === "Autre" || isOther);

  // Multi state
  const arr = Array.isArray(value) ? value : [];
  const isAllowedAlone = (v) => {
    const c = choices.find(c => c.v === v);
    return c?.aloneOnly;
  };

  const handleSelect = (v) => {
    if (multi) {
      // Toggle membership
      let next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
      // If "aloneOnly" (rien de pressant), exclusive
      const alone = choices.find(c => c.v === v)?.aloneOnly;
      if (alone && !arr.includes(v)) next = [v];
      else if (!alone && next.length > 1) next = next.filter(x => !isAllowedAlone(x));
      onAnswer(next, { autoAdvance: false });
      return;
    }
    if (v === "Autre") { setOtherOpen(true); return; }
    setOtherOpen(false);
    onAnswer(v);
  };

  const submitOther = () => {
    if (otherText.trim()) onAnswer(otherText.trim());
  };

  // pick which encouragement to show (based on most recent click for multi)
  const encouragement = (typeof contextualEncouragement === "function")
    ? contextualEncouragement(multi ? arr : value)
    : null;

  return (
    <div className="ob-card ob-screen-enter">
      {eyebrow && (
        <div className="ob-eyebrow">
          {eyebrowPill && <span className={`pill ${eyebrowPill.tone === "stabilo" ? "is-stabilo" : ""} ${eyebrowPill.tone === "blue" ? "is-blue" : ""}`}>{eyebrowPill.text}</span>}
          {eyebrow}
        </div>
      )}
      <h1 className="ob-title">{title}</h1>
      {microcopy && <p className="ob-microcopy">{microcopy}</p>}

      <div className={`ob-choices ${twoCol ? "is-2col" : ""}`}>
        {choices.map(c => (
          <Choice
            key={c.v}
            choice={c}
            isMulti={multi}
            isSelected={multi ? arr.includes(c.v) : (value === c.v || (c.v === "Autre" && isOther))}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {!multi && otherOpen && (
        <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
          <input
            className="ob-other-input"
            placeholder="Précise ta réponse…"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitOther()}
            autoFocus
            maxLength={80}
            style={{ flex: 1, minWidth: 200 }}
          />
          <button className="ob-btn" disabled={!otherText.trim()} onClick={submitOther}>
            Valider <span className="ob-arrow">→</span>
          </button>
        </div>
      )}

      {helperBelow && <p className="ob-helper-below">{helperBelow}</p>}

      {/* Contextual encouragement - shown after click */}
      {encouragement && (
        <div className="ob-encouragement">
          <span className="ob-encouragement-mark">↳</span>
          <span>{encouragement}</span>
        </div>
      )}

      {/* Multi-select validation footer */}
      {multi && (
        <div className="ob-actions" style={{ marginTop: 18 }}>
          <button
            className="ob-btn"
            disabled={arr.length === 0}
            onClick={() => onAnswer(arr, { autoAdvance: true })}
          >
            Continuer <span className="ob-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------
// 1. INTRO
// ----------------------------------------------------------------
function IntroScreen({ onNext }) {
  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-stabilo">DIAGNOSTIC · 2 MIN</span>
        Objectif Lycée
      </div>

      <div className="ob-intro">
        <div className="ob-intro-display">
          Tu peux travailler beaucoup…<br/>
          et viser le <span className="stab-strong">mauvais endroit.</span>
          <span className="small">Le problème, ce n'est pas l'effort. C'est la direction.</span>
        </div>

        <p className="ob-microcopy" style={{ maxWidth: 580, marginTop: 0 }}>
          On te pose {TOTAL_STEPS} questions. À la fin, tu obtiens une mission utile pour aujourd'hui,
          choisie à partir de ton profil - pas au hasard.
        </p>

        <div className="ob-actions">
          <button className="ob-btn" onClick={onNext}>
            Trouver ma mission <span className="ob-arrow">→</span>
          </button>
        </div>

        <div className="ob-intro-meta">
          <span>· <b>{TOTAL_STEPS} questions</b></span>
          <span>· <b>2 minutes</b> chrono</span>
          <span>· <b>Réversible</b> à tout moment</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 2. CLASSE
// ----------------------------------------------------------------
function ClasseScreen({ value, onAnswer }) {
  return (
    <QuestionScreen
      eyebrow={`Calibrage · 1 / ${TOTAL_STEPS}`}
      eyebrowPill={{ text: "Étape 1", tone: "blue" }}
      title="Tu es en…"
      microcopy="Première et Terminale n'ont pas les mêmes urgences. La suite s'adapte."
      choices={CLASSE_CHOICES}
      value={value}
      onAnswer={onAnswer}
    />
  );
}

// ----------------------------------------------------------------
// 3. OBJECTIF - MULTI
// ----------------------------------------------------------------
function ObjectifScreen({ value, onAnswer }) {
  return (
    <QuestionScreen
      eyebrow={`Calibrage · 2 / ${TOTAL_STEPS}`}
      eyebrowPill={{ text: "Étape 2", tone: "blue" }}
      title="Tu veux surtout…"
      microcopy="Plusieurs choix possibles. Tes priorités orientent la suite."
      choices={OBJECTIF_CHOICES}
      value={value}
      onAnswer={onAnswer}
      twoCol
      multi
    />
  );
}

// ----------------------------------------------------------------
// 4. MOYENNE - actuelle → visée
// ----------------------------------------------------------------
function MoyenneScreen({ value, onAnswer, profile }) {
  const [current, setCurrent] = React.useState(value?.current ?? 11);
  const [target, setTarget]   = React.useState(value?.target  ?? 14);

  React.useEffect(() => {
    if (target < current + 0.5) setTarget(Math.min(20, current + 0.5));
  }, [current]);

  const delta = (target - current).toFixed(1);
  const matieres = Array.isArray(profile.matieres) ? profile.matieres : [];
  const matiere = matieres[0] || "ta matière prioritaire";

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-blue">Étape 3</span>
        Calibrage · 3 / {TOTAL_STEPS}
      </div>
      <h1 className="ob-title">Quelle moyenne tu vises ?</h1>
      <p className="ob-microcopy">
        Un repère pour mesurer si le plan fonctionne dans 3 mois.
      </p>

      <div className="ob-slider">
        <div className="ob-slider-head">
          <span>Ma moyenne actuelle</span>
          <span>0 - 20</span>
        </div>
        <div className="ob-slider-val">
          {current.toFixed(1)}<span className="unit">/ 20</span>
        </div>
        <div className="ob-slider-track">
          <input type="range" min="0" max="20" step="0.5"
            value={current}
            onChange={(e) => setCurrent(parseFloat(e.target.value))}
            aria-label="Moyenne actuelle"
          />
        </div>
        <div className="ob-slider-marks">
          <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span>
        </div>
      </div>

      <div className="ob-slider" style={{ marginTop: 24 }}>
        <div className="ob-slider-head">
          <span>Ma moyenne visée d'ici 3 mois</span>
        </div>
        <div className="ob-slider-val">
          {target.toFixed(1)}<span className="unit">/ 20</span>
        </div>
        <div className="ob-slider-track">
          <input type="range" min={Math.min(20, current + 0.5)} max="20" step="0.5"
            value={target}
            onChange={(e) => setTarget(parseFloat(e.target.value))}
            aria-label="Moyenne visée"
          />
        </div>
      </div>

      <div className="ob-gap">
        <div className="ob-gap-val">{current.toFixed(1)}</div>
        <div className="ob-gap-arrow">→</div>
        <div className="ob-gap-val">{target.toFixed(1)}</div>
        <div className="ob-gap-delta">+{delta} pts</div>
      </div>

      <p className="ob-microcopy" style={{ marginTop: 14, fontSize: 14 }}>
        Cet écart devient ta boussole. Si on l'atteint, tu sauras que c'étaient les bonnes missions.
      </p>

      <div className="ob-actions" style={{ marginTop: 14 }}>
        <button className="ob-btn" onClick={() => onAnswer({ current, target })}>
          Continuer <span className="ob-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 5. ÉCHÉANCES - MULTI, filtrée par classe, psy adaptée
// ----------------------------------------------------------------
function EcheanceScreen({ value, onAnswer, profile }) {
  const choices = echeancesForClasse(profile.classe);
  const today = new Date();

  const arr = Array.isArray(value) ? value : [];

  // psy message - du dernier cliqué
  const lastVal = arr[arr.length - 1];
  const lastMsg = lastVal ? echeancePsyMessage(lastVal) : null;

  const handleToggle = (v) => {
    let next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
    onAnswer(next, { autoAdvance: false });
  };

  const sortedChoices = [...choices].sort((a, b) => (a.days || 9999) - (b.days || 9999));

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-blue">Étape 4</span>
        Calibrage · 4 / {TOTAL_STEPS}
      </div>
      <h1 className="ob-title">Tes prochaines échéances ?</h1>
      <p className="ob-microcopy">
        Plusieurs choix possibles. Plus elles sont précises, plus la mission tombe juste.
      </p>

      <div className="ob-date-grid">
        {sortedChoices.map(c => {
          const dueDate = c.days ? addDays(today, c.days) : null;
          const isSel = arr.includes(c.v);
          return (
            <button
              key={c.v}
              className={`ob-date-card ${isSel ? "is-selected" : ""}`}
              onClick={() => handleToggle(c.v)}
              aria-pressed={isSel}
            >
              <div className="ob-date-card-h">
                <span className="ob-date-emoji" aria-hidden>{c.emoji}</span>
                {c.days ? `Dans ~${c.days} j` : "Échéance ouverte"}
              </div>
              <div className="ob-date-card-d">{c.label}</div>
              {dueDate && (
                <div className="ob-date-card-s">
                  Vers le {dueDate.getDate()}/{(dueDate.getMonth()+1).toString().padStart(2,"0")}
                  {c.days <= 14 && <span style={{ marginLeft: 8 }} className="ob-urgent">⏱ Pressant</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {lastMsg && (
        <div className="ob-encouragement">
          <span className="ob-encouragement-mark">↳</span>
          <span>{lastMsg}</span>
        </div>
      )}

      <div className="ob-actions" style={{ marginTop: 18 }}>
        <button
          className="ob-btn"
          disabled={arr.length === 0}
          onClick={() => onAnswer(arr, { autoAdvance: true })}
        >
          Continuer <span className="ob-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 6. MATIÈRES - MULTI, avec emotional helper
// ----------------------------------------------------------------
function MatiereScreen({ value, onAnswer }) {
  return (
    <QuestionScreen
      eyebrow={`Calibrage · 5 / ${TOTAL_STEPS}`}
      eyebrowPill={{ text: "Étape 5", tone: "blue" }}
      title="Quelles matières te mettent la pression ?"
      microcopy="Celles qui te soulagerait si tu arrivais toujours en confiance dans le cours."
      choices={MATIERE_CHOICES}
      value={value}
      onAnswer={onAnswer}
      twoCol
      multi
    />
  );
}

// EXPORT
Object.assign(window, {
  Choice, QuestionScreen,
  IntroScreen, ClasseScreen, ObjectifScreen,
  MoyenneScreen, EcheanceScreen, MatiereScreen,
});
