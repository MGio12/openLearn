/* ============================================================
   Screens - MID (Blocage → Nom)
   ============================================================ */

// ----------------------------------------------------------------
// 7. BLOCAGE - simplifié + friction-reducer en premier
// ----------------------------------------------------------------
function BlocageScreen({ value, onAnswer, profile }) {
  return (
    <QuestionScreen
      eyebrow={`Calibrage · 6 / ${TOTAL_STEPS}`}
      eyebrowPill={{ text: "Étape 6", tone: "stabilo" }}
      title="Par où on commence ?"
      microcopy="Tu peux préciser plus tard. Pour aujourd'hui, un seul angle suffit."
      choices={BLOCAGE_CHOICES}
      value={value}
      onAnswer={onAnswer}
    />
  );
}

// ----------------------------------------------------------------
// 8. NIVEAU - réduit à 4 choix
// ----------------------------------------------------------------
function NiveauScreen({ value, onAnswer, profile }) {
  const matieres = Array.isArray(profile.matieres) ? profile.matieres : [];
  const matiere = matieres[0] || "cette matière";
  // Adapter la préposition : "En Mathématiques" / "En SVT" / "En Anglais"
  const matierePrep = matiere ? `En ${matiere}` : "Dans cette matière";

  return (
    <QuestionScreen
      eyebrow={`Calibrage · 7 / ${TOTAL_STEPS}`}
      eyebrowPill={{ text: "Étape 7", tone: "blue" }}
      title={`${matierePrep}, tu te sens…`}
      microcopy="On calibre l'entrée de la mission. Pas de jugement."
      choices={NIVEAU_CHOICES}
      value={value}
      onAnswer={onAnswer}
      twoCol
    />
  );
}

// ----------------------------------------------------------------
// 9. EFFORT - temps × intensité = résultat
// ----------------------------------------------------------------
function EffortScreen({ value, onAnswer, profile }) {
  const initial = value?.hours ?? value ?? 4;
  const [hours, setHours] = React.useState(typeof initial === "number" ? initial : 4);
  const [schedulePreviewUrl, setSchedulePreviewUrl] = React.useState(null);
  const [scheduleMeta, setScheduleMeta] = React.useState(value?.scheduleUpload || null);
  const [scheduleError, setScheduleError] = React.useState("");
  const fileInput = React.useRef(null);
  const objectUrl = React.useRef(null);
  const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

  React.useEffect(() => () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
  }, []);

  const clearSchedule = () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    setSchedulePreviewUrl(null);
    setScheduleMeta(null);
    setScheduleError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      clearSchedule();
      setScheduleError("Choisis une image : JPG, PNG, WEBP ou HEIC selon ton appareil.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      clearSchedule();
      setScheduleError("Image trop lourde : limite 4 Mo pour ne pas bloquer la page.");
      return;
    }

    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setSchedulePreviewUrl(objectUrl.current);
    setScheduleMeta({
      fileName: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      previewOnly: true,
    });
    setScheduleError("");
  };

  const onPick = (e) => handleFile(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-blue">Étape 8</span>
        Calibrage · 8 / {TOTAL_STEPS}
      </div>
      <h1 className="ob-title">Tu es motivé ?<br/>C'est la base !</h1>
      <p className="ob-microcopy" style={{ marginBottom: 22 }}>
        Le travail c'est <b>temps × intensité = résultat</b>.
      </p>

      {/* Équation visuelle */}
      <div className="ob-equation" aria-label="temps fois intensité égale résultat">
        <div className="ob-equation-row">
          <div className="ob-equation-term">
            <div className="ob-equation-term-label">TEMPS</div>
          </div>
          <div className="ob-equation-op">×</div>
          <div className="ob-equation-term">
            <div className="ob-equation-term-label">INTENSITÉ</div>
          </div>
          <div className="ob-equation-op">=</div>
          <div className="ob-equation-term is-result">
            <div className="ob-equation-term-label">RÉSULTAT</div>
          </div>
        </div>
      </div>

      <div className="ob-effort-grid">
        {/* Slider */}
        <div className="ob-effort-col">
          <div className="ob-slider" style={{ marginBottom: 14 }}>
            <div className="ob-slider-val">
              {hours}<span className="unit">h / semaine</span>
            </div>
            <div className="ob-slider-track">
              <input type="range" min="0" max="10" step="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value, 10))}
                aria-label="Heures par semaine"
              />
            </div>
            <div className="ob-slider-marks">
              <span>0h</span><span>3h</span><span>6h</span><span>10h</span>
            </div>
          </div>

          <div className="ob-effort-note">
            <span className="ob-effort-note-mark" aria-hidden>✓</span>
            <span><b>30 minutes concentré, c'est déjà excellent.</b></span>
          </div>
        </div>

        {/* Photo upload */}
        <div className="ob-effort-col">
          <label className="ob-effort-label">Une photo de ton emploi du temps ?</label>
          <p className="ob-effort-sub">Aperçu local seulement : on garde le nom du fichier, pas l'image.</p>

          <div
            className={`ob-upload ${schedulePreviewUrl || scheduleMeta ? "has-image" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => fileInput.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInput.current?.click()}
          >
            {schedulePreviewUrl ? (
              <>
                <img src={schedulePreviewUrl} alt="Emploi du temps" />
                <div className="ob-upload-overlay">
                  <span>Cliquer pour remplacer</span>
                </div>
              </>
            ) : scheduleMeta ? (
              <>
                <div className="ob-upload-icon" aria-hidden>✓</div>
                <div className="ob-upload-main">{scheduleMeta.fileName || "Image sélectionnée"}</div>
                <div className="ob-upload-sub">Aperçu à reprendre si tu changes de fichier.</div>
              </>
            ) : (
              <>
                <div className="ob-upload-icon" aria-hidden>📷</div>
                <div className="ob-upload-main">Déposer une photo</div>
                <div className="ob-upload-sub">ou cliquer pour choisir un fichier</div>
              </>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onPick}
              style={{ display: "none" }}
            />
          </div>

          {scheduleError && <p className="ob-upload-error" role="alert">{scheduleError}</p>}

          {(schedulePreviewUrl || scheduleMeta) && (
            <button
              className="ob-link-btn"
              onClick={(e) => { e.stopPropagation(); clearSchedule(); }}
            >
              Retirer la photo
            </button>
          )}
        </div>
      </div>

      <div className="ob-actions" style={{ marginTop: 22 }}>
        <button
          className="ob-btn"
          onClick={() => onAnswer({ hours, scheduleUpload: scheduleMeta })}
        >
          Continuer <span className="ob-arrow">→</span>
        </button>
        <button
          className="ob-btn ob-btn--ghost"
          onClick={() => onAnswer({ hours: null, scheduleUpload: null, deferred: true })}
        >
          On verra plus tard
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 10. NOM - "Comment l'IA doit-elle s'adresser à toi ?"
// ----------------------------------------------------------------
function NomScreen({ value, onAnswer }) {
  const [name, setName] = React.useState(value || "");
  const trimmed = name.trim().slice(0, 24);
  const submit = () => { if (trimmed.length >= 1) onAnswer(trimmed); };

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-blue">Étape 9</span>
        Calibrage · 9 / {TOTAL_STEPS}
      </div>
      <h1 className="ob-title">Comment souhaites-tu être appelé ?</h1>
      <p className="ob-microcopy">
        Un prénom ou un pseudo. C'est ce nom qui apparaîtra dans tes missions et le cockpit.
      </p>

      <div className="ob-field">
        <label className="ob-field-label" htmlFor="ob-nom">Prénom ou pseudo</label>
        <input
          id="ob-nom"
          className="ob-input"
          placeholder="Ex. Lina"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          maxLength={24}
          autoFocus
          autoComplete="given-name"
        />
      </div>

      <div className="ob-actions">
        <button className="ob-btn" disabled={trimmed.length < 1} onClick={submit}>
          Continuer <span className="ob-arrow">→</span>
        </button>
        <button className="ob-btn ob-btn--ghost" onClick={() => onAnswer("Toi")}>
          Rester anonyme - m'appeler « Toi »
        </button>
      </div>
    </div>
  );
}

// EXPORT
Object.assign(window, {
  BlocageScreen, NiveauScreen, EffortScreen, NomScreen,
});
