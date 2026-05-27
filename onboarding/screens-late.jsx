/* ============================================================
   Screens — LATE (Generation → Paywall)
   Mis à jour pour matieres (array) et effortHebdo (object).
   ============================================================ */

function firstMatiere(profile) {
  const ms = Array.isArray(profile.matieres) ? profile.matieres : [];
  return ms[0] || "ta matière";
}
function effortHours(profile) {
  const e = profile.effortHebdo;
  if (e && typeof e === "object") return e.hours;
  return e;
}

// ----------------------------------------------------------------
// 13. GENERATION ANIMÉE
// ----------------------------------------------------------------
function GenerationScreen({ profile, onDone }) {
  const matiere = firstMatiere(profile);
  const blocage = blocageLabel(profile.blocage || "method-gap");
  const niveau  = profile.niveau || "ton niveau";
  const hours   = effortHours(profile);
  const tempsTxt = hours != null ? `${hours} h / semaine` : "ton emploi du temps";
  const objectif = (OBJECTIF_CHOICES.find(c => c.v === profile.objectif) || {}).label || "ton objectif";

  const STEPS = [
    { h: "Analyse de ton profil",   s: `${profile.classe || "Lycée"} · ${objectif}.` },
    { h: "Priorité identifiée",     s: `${matiere} — ${blocage.toLowerCase()}.` },
    { h: "Niveau calibré",          s: `${niveau} : on évite trop facile ou trop dur.` },
    { h: "Temps pris en compte",    s: `Mission calibrée sur ${tempsTxt}.` },
    { h: "Mission prête",           s: "Tu vas voir quoi faire, pourquoi, et quelle trace produire." },
  ];

  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepDelay = reduced ? 200 : 700;
    if (active < STEPS.length) {
      const t = setTimeout(() => setActive(a => a + 1), stepDelay);
      return () => clearTimeout(t);
    }
    const t2 = setTimeout(onDone, reduced ? 200 : 700);
    return () => clearTimeout(t2);
  }, [active]);

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-stabilo">Construction en cours</span>
        Mission personnalisée
      </div>
      <h1 className="ob-title">On prépare ta mission.</h1>
      <p className="ob-microcopy">
        On croise matière, blocage, niveau et engagement hebdo. Pas de mission générique.
      </p>

      <div className="ob-gen-list">
        {STEPS.map((step, i) => {
          const state = i < active ? "is-done" : (i === active ? "is-active" : "");
          return (
            <div key={i} className={`ob-gen-step ${state}`}>
              <div className="ob-gen-step-tick">{i < active ? "✓" : "·"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ob-gen-step-label">{step.h}</div>
                <div className="ob-gen-step-sub">{step.s}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 14. MISSION
// ----------------------------------------------------------------
function MissionScreen({ profile, mission, onNext, tweaks }) {
  const nom = profile.nom || "Toi";
  const matiere = mission.matiere || firstMatiere(profile);
  const blocage = blocageLabel(profile.blocage || "method-gap");

  return (
    <div className="ob-mission ob-screen-enter">
      <div className="ob-mission-stamp">✓ Prête</div>

      <div className="ob-mission-eyebrow">Mission du jour · personnalisée</div>

      <h1 className="ob-title ob-title-md" style={{ marginBottom: 14 }}>
        Ta première mission est prête, {nom}.
      </h1>

      <p className="ob-mission-diag">
        Tu as choisi <span className="stab">{matiere}</span> et tu bloques sur <span className="stab">« {blocage.toLowerCase()} »</span>.
        Avec <span className="stab">{mission.duree} minutes</span> à investir aujourd'hui, on garde une action précise — pas un chapitre entier.
      </p>

      <div className="ob-mission-body">
        <div className="ob-mission-body-eyebrow">
          <span className="pill">Mission du jour</span>
          {mission.duree} min
        </div>
        <h2 className="ob-mission-action">{mission.action}</h2>
        <div className="ob-mission-meta">
          <span><b>Durée :</b> {mission.duree} min</span>
          <span><b>Difficulté :</b> calibrée sur « {profile.niveau || "Correct"} »</span>
          <span><b>Trace écrite :</b> obligatoire</span>
        </div>
      </div>

      <div className="ob-mission-grid">
        <div className="ob-mission-tile">
          <div className="ob-mission-tile-h">Pourquoi cette mission</div>
          <div className="ob-mission-tile-b">{mission.why}</div>
        </div>
        <div className="ob-mission-tile" style={{ background: "var(--stabilo-wash)" }}>
          <div className="ob-mission-tile-h">Trace attendue</div>
          <div className="ob-mission-tile-b">{mission.trace}</div>
        </div>
      </div>

      {tweaks.showZeigarnikLock && (
        <div className="ob-mission-lock">
          <div className="ob-mission-lock-icon" aria-hidden>🔒</div>
          <div className="ob-mission-lock-text">
            <b>Commencer la mission</b> et accéder au focus, au suivi quotidien et aux missions des prochains jours
            nécessite d'activer ton essai gratuit. <span style={{ color: "var(--ink)" }}>On t'explique tout à l'étape suivante.</span>
          </div>
        </div>
      )}

      <div className="ob-actions" style={{ marginTop: 18 }}>
        <button className="ob-btn ob-btn--dark" onClick={onNext}>
          Voir ce que je gagne <span className="ob-arrow">→</span>
        </button>
        <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          Diagnostic et mission : déjà faits, à toi.
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 15. SOCIAL — stats + avis (élèves + parents)
// ----------------------------------------------------------------
function SocialScreen({ profile, onNext, tweaks }) {
  const stats = getSocialStats(profile);
  const blocage = profile.blocage || "method-gap";
  const advice = ADVICE_BY_BLOCAGE[blocage] || ADVICE_BY_BLOCAGE["method-gap"];
  const testimonials = getTestimonials(profile);

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill">Ce qui marche</span>
        élèves + parents
      </div>
      <h1 className="ob-title">Ce qui change pour les élèves<br/>(et leurs parents).</h1>
      <p className="ob-microcopy">
        Pas des avis flatteurs : des chiffres et des retours typés sur ton blocage.
      </p>

      {tweaks.showStatsNumbers && (
        <div className="ob-stats-v2">
          {stats.map((s, i) => (
            <div key={i} className={`ob-stat-v2 ${s.tone === "stabilo" ? "is-stabilo" : ""} ${s.tone === "green" ? "is-green" : ""}`}>
              <div className="ob-stat-v2-num">{s.num}</div>
              <div className="ob-stat-v2-body">
                <div className="ob-stat-v2-text">{s.label}</div>
                <div className="ob-stat-v2-source">— {s.source}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="ob-testi-section-head">
        <span className="ob-testi-section-h">Avis</span>
        <span className="ob-testi-section-sep" />
        <span className="ob-testi-section-tag">exemples · placeholders à remplacer</span>
      </div>

      <div className="ob-testimonials">
        {testimonials.map((t, i) => (
          <div key={i} className={`ob-testi-card ${t.parent ? "is-parent" : ""}`}>
            <div className="ob-testi-card-head">
              <div className={`ob-testi-avatar ${t.color || "is-stabilo"}`} aria-hidden>{t.initials}</div>
              <div className="ob-testi-author">
                <div className="ob-testi-name">
                  {t.name}
                  {t.parent && <span className="ob-testi-pill">Parent</span>}
                </div>
                <div className="ob-testi-meta">{t.meta}</div>
              </div>
              <div className="ob-testi-stars" aria-label={`${t.stars} étoiles sur 5`}>
                {"★".repeat(t.stars)}<span className="ob-testi-stars-off">{"★".repeat(5 - t.stars)}</span>
              </div>
            </div>
            <p className="ob-testi-quote-v2">« {t.quote} »</p>
          </div>
        ))}
      </div>

      <div className="ob-advice" style={{ marginTop: 22 }}>
        <div className="ob-advice-icon">!</div>
        <div className="ob-advice-body">
          <div className="ob-advice-h">Conseil pour TON blocage</div>
          <div className="ob-advice-text">{advice}</div>
        </div>
      </div>

      <div className="ob-actions" style={{ marginTop: 22 }}>
        <button className="ob-btn ob-btn--dark" onClick={onNext}>
          Voir mon plan complet <span className="ob-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 16. RECAP — "Ton année en clair"
// ----------------------------------------------------------------
function RecapScreen({ profile, mission, onNext, tweaks }) {
  const nom = profile.nom || "Toi";
  const matiere = firstMatiere(profile);
  const echArr = Array.isArray(profile.echeances) ? profile.echeances : [];
  const firstEch = echArr.map(v => ECHEANCES_ALL.find(c => c.v === v)).filter(Boolean).sort((a, b) => (a.days || 9999) - (b.days || 9999))[0];
  const echDate = firstEch?.days ? addDays(new Date(), firstEch.days) : null;
  const daysLeft = firstEch?.days || null;

  const deltaPts = profile.moyenne ? (profile.moyenne.target - profile.moyenne.current).toFixed(1) : null;
  const hours = effortHours(profile);

  return (
    <div className="ob-card ob-screen-enter">
      <div className="ob-eyebrow">
        <span className="pill is-stabilo">Cohérence</span>
        Ton plan, en une page
      </div>
      <h1 className="ob-title">Voilà ton année en clair, {nom}.</h1>
      <p className="ob-microcopy">
        Tes engagements, posés. Ce que tu vises, dans quel délai, avec quel investissement.
      </p>

      <div className="ob-recap">
        {profile.moyenne && (
          <div className="ob-recap-card is-key">
            <div className="ob-recap-card-h">📈 Objectif chiffré</div>
            <div className="ob-recap-card-v">
              {profile.moyenne.current.toFixed(1)} → {profile.moyenne.target.toFixed(1)}/20
            </div>
            <div className="ob-recap-card-s">+{deltaPts} pts visés en {matiere}, d'ici 3 mois.</div>
          </div>
        )}

        {firstEch && (
          <div className="ob-recap-card">
            <div className="ob-recap-card-h">📅 Prochaine échéance</div>
            <div className="ob-recap-card-v">{firstEch.label}</div>
            <div className="ob-recap-card-s">
              {daysLeft ? `Dans ~${daysLeft} jours${echDate ? ` · vers le ${echDate.getDate()}/${(echDate.getMonth()+1).toString().padStart(2,"0")}` : ""}` : "Construction long terme"}
              {echArr.length > 1 && <span> · +{echArr.length - 1} autre{echArr.length > 2 ? "s" : ""}</span>}
            </div>
          </div>
        )}

        {hours != null && (
          <div className="ob-recap-card">
            <div className="ob-recap-card-h">⏳ Investissement</div>
            <div className="ob-recap-card-v">{hours} h / semaine</div>
            <div className="ob-recap-card-s">30 min/jour ciblées = excellent rythme.</div>
          </div>
        )}

        <div className="ob-recap-card">
          <div className="ob-recap-card-h">🎯 Premier angle d'attaque</div>
          <div className="ob-recap-card-v">{matiere}</div>
          <div className="ob-recap-card-s">
            Blocage : « {blocageLabel(profile.blocage || "method-gap").toLowerCase()} »
          </div>
        </div>
      </div>

      <div className="ob-recap-foot">
        <p style={{ margin: 0 }}>
          Tu veux passer de <b>{profile.moyenne ? profile.moyenne.current.toFixed(1) : "ta moyenne actuelle"}</b> à
          {" "}<b>{profile.moyenne ? `${profile.moyenne.target.toFixed(1)}/20` : "ta moyenne cible"}</b> en {matiere}.
          {firstEch ? <> Tu as <span className="stab">{daysLeft ? `${daysLeft} jours` : "le temps qu'il faut"}</span> avant {firstEch.label.toLowerCase()}.</> : null}
          {hours != null ? <> Tu prévois <b>{hours} h par semaine</b> pour y arriver.</> : null}
        </p>
        <p style={{ margin: "10px 0 0 0", color: "var(--ink-soft)" }}>
          Première mission prête : <b>{mission.duree} min</b>, dès maintenant. Et une autre demain, calibrée
          pareil. Et celle d'après. C'est exactement ce qu'on garde ouvert pour toi.
        </p>
      </div>

      <div className="ob-actions" style={{ marginTop: 6 }}>
        <button className="ob-btn ob-btn--dark" onClick={onNext}>
          Activer mon plan <span className="ob-arrow">→</span>
        </button>
        <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          3 jours gratuits, prélèvement seulement si tu veux continuer.
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// 17. PAYWALL
// ----------------------------------------------------------------
function PaywallScreen({ profile, mission, tweaks, onActivate, onReviewMission }) {
  const nom = profile.nom || "Toi";
  const matiere = mission.matiere || firstMatiere(profile);
  const today = new Date();
  const trialEnd = addDays(today, tweaks.trialDays || 3);

  const monthly = tweaks.pricePerMonth || 19.99;
  const tutorHour = tweaks.tutorPricePerHour || 40;
  const tutorMonth4h = tutorHour * 4;
  const ratioTutor = (tutorMonth4h / monthly).toFixed(1);
  const priceStr = monthly.toFixed(2).replace(".", ",") + " €";

  return (
    <div className="ob-screen-enter">
      <div className="ob-paywall-grid">
        <div className="ob-paywall-left">
          <div className="ob-card" style={{ flex: "0 0 auto", padding: "26px 28px 22px" }}>
            <div className="ob-eyebrow">
              <span className="pill is-stabilo">Essai gratuit · {tweaks.trialDays} jours</span>
              Décision
            </div>
            <h1 className="ob-title ob-title-md">
              Ton plan est prêt, {nom}.<br/>
              <span style={{ color: "var(--ink-soft)" }}>Active l'essai pour le démarrer.</span>
            </h1>
            <p className="ob-microcopy" style={{ marginBottom: 12 }}>
              Tu as déjà ton diagnostic, ta première mission, sa justification et un conseil ciblé sur ton blocage.
              L'essai ouvre la <span className="stab">continuité</span> : missions des prochains jours, focus, suivi.
            </p>
          </div>

          <div className="ob-paywall-summary">
            <div className="ob-paywall-summary-h">Ce que l'essai ouvre, dès maintenant</div>
            <ul className="ob-paywall-summary-list">
              <li><span><b>Ta mission du jour</b> · {mission.action.slice(0, 90)}{mission.action.length > 90 ? "…" : ""}</span></li>
              <li><span><b>Une nouvelle mission demain</b>, calibrée sur ton blocage et ton temps</span></li>
              <li><span><b>Mode focus</b> · timer, pas de notifs, ambiance lofi/silence</span></li>
              <li><span><b>Suivi de progression</b> sur {matiere} et tes autres matières</span></li>
              <li><span><b>Adaptation</b> à tes contrôles, bac blanc et Parcoursup</span></li>
            </ul>
          </div>

          {tweaks.showAnchorMath && (
            <div className="ob-anchor">
              <div className="ob-anchor-h">Pour comparer · 1 mois d'aide au travail</div>
              <div className="ob-anchor-row">
                <div className="ob-anchor-row-label">Cours particulier</div>
                <div className="ob-anchor-bar">
                  <div className="ob-anchor-bar-fill" style={{ width: "100%" }} />
                </div>
                <div className="ob-anchor-row-price">{tutorMonth4h} €</div>
              </div>
              <div className="ob-anchor-row">
                <div className="ob-anchor-row-label">Objectif Lycée</div>
                <div className="ob-anchor-bar">
                  <div className="ob-anchor-bar-fill is-us" style={{ width: `${Math.max(6, (monthly / tutorMonth4h) * 100)}%` }} />
                </div>
                <div className="ob-anchor-row-price">{priceStr}</div>
              </div>
              <p className="ob-anchor-foot">
                <b>4 h de cours particulier ≈ {tutorMonth4h} €.</b> Objectif Lycée, c'est <b>{ratioTutor}× moins cher</b>,
                avec une mission utile <b>chaque jour</b>, pas seulement 1× par semaine.
              </p>
            </div>
          )}

          {tweaks.showLossAversion && (
            <div className="ob-paywall-summary">
              <div className="ob-paywall-summary-h" style={{ color: "var(--red-2)" }}>Ce que tu n'auras pas sans le plan</div>
              <ul className="ob-paywall-summary-list">
                <li className="is-locked"><span>La mission de demain, et celles des semaines suivantes</span></li>
                <li className="is-locked"><span>L'adaptation continue à ton blocage et tes contrôles</span></li>
                <li className="is-locked"><span>Le mode focus et le timer protégé</span></li>
                <li className="is-locked"><span>Le suivi de ta progression sur {matiere}</span></li>
              </ul>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "10px 0 0 0", lineHeight: 1.45 }}>
                Tu garderas ta première mission. Sans essai, tu reprendras juste à travailler comme avant.
              </p>
            </div>
          )}
        </div>

        <div className="ob-paywall-right">
          <div className="ob-price">
            <span className="ob-price-stamp">Essai gratuit {tweaks.trialDays} jours</span>
            <div className="ob-price-headline">Active ton plan</div>
            <p className="ob-price-trial">
              <b>{tweaks.trialDays} jours gratuits.</b> Aucun prélèvement avant le {formatDateFr(trialEnd)}.
            </p>
            <div className="ob-price-row">
              <span className="ob-price-num">{priceStr}</span>
              <span className="ob-price-unit">/ mois après l'essai</span>
            </div>
            <ul className="ob-price-details">
              <li><span><b>Pas de prélèvement</b> pendant {tweaks.trialDays} jours, garanti.</span></li>
              <li><span><b>Annulation en 1 clic</b> avant le {trialEnd.getDate()}/{(trialEnd.getMonth()+1).toString().padStart(2,"0")} — depuis ton espace.</span></li>
              <li><span><b>Prélèvement automatique</b> {priceStr}/mois si tu n'annules pas. Renouvelable mensuel.</span></li>
              <li><span>Paiement <b>Stripe</b>, aucune donnée bancaire stockée chez nous.</span></li>
            </ul>
            <button className="ob-btn ob-price-cta" onClick={onActivate}>
              Activer mon essai gratuit <span className="ob-arrow">→</span>
            </button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="ob-price-secondary" onClick={onReviewMission}>
                Relire ma mission d'abord
              </button>
            </div>
            <div className="ob-price-foot">
              Premier prélèvement : {formatDateFr(trialEnd).split(" ").slice(0, 3).join(" ")}
            </div>
          </div>

          <div style={{
            background: "var(--paper-2)",
            border: "2px solid var(--ink)",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 13.5,
            lineHeight: 1.5,
            color: "var(--ink-soft)",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 6 }}>
              Pas de surprise
            </div>
            Tu paies pour <b style={{ color: "var(--ink)" }}>garder un plan quotidien personnalisé</b> — pas pour
            accéder à plus de contenu. Si à l'usage tu n'utilises pas la mission du jour, annule.
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// SUCCÈS
// ----------------------------------------------------------------
function TrialActivatedScreen({ profile, mission, tweaks, trialEnd }) {
  return (
    <div className="ob-card ob-screen-enter" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
      <div className="ob-mission-stamp" style={{ position: "static", display: "inline-block", marginBottom: 18, transform: "rotate(-3deg)" }}>
        ✓ Essai activé
      </div>
      <h1 className="ob-title" style={{ fontSize: "clamp(34px, 4vw, 48px)" }}>
        Bienvenue, {profile.nom || "Toi"}.
      </h1>
      <p className="ob-microcopy" style={{ margin: "16px auto 24px", maxWidth: 520 }}>
        Ta mission t'attend. <b style={{ color: "var(--ink)" }}>Aucun prélèvement avant le {formatDateFr(trialEnd)}.</b>
        Tu peux annuler en 1 clic depuis ton espace à tout moment.
      </p>
      <div className="ob-mission-tile" style={{ textAlign: "left", maxWidth: 520, margin: "0 auto" }}>
        <div className="ob-mission-tile-h">Mission du jour · {mission.duree} min</div>
        <div className="ob-mission-tile-b" style={{ fontWeight: 700 }}>{mission.action}</div>
      </div>
      <div className="ob-actions" style={{ justifyContent: "center", marginTop: 22 }}>
        <button className="ob-btn ob-btn--dark">
          Commencer la mission <span className="ob-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// EXPORT
Object.assign(window, {
  GenerationScreen, MissionScreen, SocialScreen,
  RecapScreen, PaywallScreen, TrialActivatedScreen,
});
