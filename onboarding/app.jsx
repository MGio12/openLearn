/* ============================================================
   AGENT HEADER
   Role: orchestrateur React du diagnostic, analytics et activation essai.
   Loaded by: scripts/build-onboarding.mjs dans onboarding/onboarding.bundle.js.
   Reads/writes: lit window.__ONBOARDING_TWEAKS_DEFAULTS, persiste le
   brouillon via saveState, puis onActivate synchronise outilPrepa:v1
   via window.OutilPrepa.applyOnboarding; resetAll supprime le brouillon
   onboarding et reset le compte local.
   Public contract: composant App, evenements OLAnalytics
   onboarding_screen_viewed/completed, synchronisation compte local.
   Verify: npm run build:onboarding ; npm run verify:onboarding ; npm run verify:local-account.
   Read next: `docs/agent-codebase-map.md` Zone 2, `onboarding/state.jsx`.

   App - orchestrator (Tweaks panel removed, defaults hardcoded)
   ============================================================ */

const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA, useCallback: useCallbackA } = React;

function App() {
  const t = window.__ONBOARDING_TWEAKS_DEFAULTS;

  const persisted = useMemoA(() => loadState(), []);

  const [profile, setProfile] = useStateA(() => persisted.profile || {});
  const [screenIdx, setScreenIdx] = useStateA(() => {
    if (typeof persisted.screenIdx === "number") return persisted.screenIdx;
    return 0;
  });
  const [justFilledKey, setJustFilledKey] = useStateA(null);
  const [mission, setMission] = useStateA(() => persisted.mission || null);
  const [activated, setActivated] = useStateA(false);

  useEffectA(() => {
    saveState({ profile, screenIdx, mission });
  }, [profile, screenIdx, mission]);

  const screen = SCREENS[Math.min(screenIdx, SCREENS.length - 1)];
  const currentScreenId = screen.id;

  const trackScreenEvent = useCallbackA((eventName, idx, screenId, extra = {}) => {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== "function") return;
    window.OLAnalytics.track(eventName, {
      page: "onboarding",
      screen_id: screenId,
      screen_idx: idx,
      ...extra,
    });
  }, []);

  useEffectA(() => {
    trackScreenEvent("onboarding_screen_viewed", screenIdx, currentScreenId);
  }, [screenIdx, currentScreenId, trackScreenEvent]);

  const goNext = useCallbackA(() => {
    trackScreenEvent("onboarding_screen_completed", screenIdx, currentScreenId);
    setScreenIdx(i => Math.min(SCREENS.length - 1, i + 1));
    setJustFilledKey(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screenIdx, currentScreenId, trackScreenEvent]);

  const goBack = useCallbackA(() => {
    setScreenIdx(i => Math.max(0, i - 1));
    setJustFilledKey(null);
  }, []);

  const setAnswer = useCallbackA((key, value, opts = {}) => {
    const autoAdvance = opts.autoAdvance !== false;
    setProfile(p => ({ ...p, [key]: value }));
    setJustFilledKey(key);

    if (autoAdvance) {
      trackScreenEvent("onboarding_screen_completed", screenIdx, currentScreenId);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => {
        setScreenIdx(i => Math.min(SCREENS.length - 1, i + 1));
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }, reduced ? 50 : 320);
    }
  }, [screenIdx, currentScreenId, trackScreenEvent]);

  const answerFor = (key, isMulti) => (value, opts) => {
    if (isMulti) {
      setAnswer(key, value, { autoAdvance: !!opts?.autoAdvance });
    } else {
      setAnswer(key, value, { autoAdvance: true });
    }
  };

  useEffectA(() => {
    if (screen.id === "generation" && !mission) {
      setMission(computeMission(profile));
    }
    if (["mission","social","recap","paywall"].includes(screen.id)) {
      setMission(computeMission(profile));
    }
  }, [screen.id, profile.matieres, profile.blocage, profile.niveau, profile.effortHebdo]);

  const resetAll = () => {
    if (!window.confirm("Recommencer le diagnostic ?")) return;
    try { localStorage.removeItem(LS_KEY); }
    catch (error) { reportStorageIssue("remove", error); }
    if (window.OutilPrepa && typeof window.OutilPrepa.resetLocalAccount === "function") {
      window.OutilPrepa.resetLocalAccount();
    }
    setProfile({});
    setMission(null);
    setScreenIdx(0);
    setActivated(false);
  };

  const today = new Date();
  const trialEnd = addDays(today, t.trialDays || 3);
  const onActivate = () => {
    const nextMission = mission || computeMission(profile);
    setActivated(true);
    saveState({ profile, screenIdx, mission: nextMission, trialActivated: trialEnd.toISOString() });
    if (window.OutilPrepa && typeof window.OutilPrepa.applyOnboarding === "function") {
      window.OutilPrepa.applyOnboarding({
        ...profile,
        mission: nextMission,
        source: "onboarding",
        completedAt: new Date().toISOString(),
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onReviewMission = () => {
    setScreenIdx(SCREENS.findIndex(s => s.id === "mission"));
  };

  const renderScreen = () => {
    if (activated) {
      return <TrialActivatedScreen profile={profile} mission={mission || computeMission(profile)} tweaks={t} trialEnd={trialEnd} />;
    }
    switch (screen.id) {
      case "intro":
        return <IntroScreen onNext={goNext} />;
      case "classe":
        return <ClasseScreen value={profile.classe} onAnswer={answerFor("classe", false)} />;
      case "objectif":
        return <ObjectifScreen value={profile.objectif} onAnswer={answerFor("objectif", true)} />;
      case "moyenne":
        return <MoyenneScreen value={profile.moyenne} profile={profile} onAnswer={answerFor("moyenne", false)} />;
      case "echeance":
        return <EcheanceScreen value={profile.echeances} profile={profile} onAnswer={answerFor("echeances", true)} />;
      case "matiere":
        return <MatiereScreen value={profile.matieres} onAnswer={answerFor("matieres", true)} />;
      case "blocage":
        return <BlocageScreen value={profile.blocage} profile={profile} onAnswer={answerFor("blocage", false)} />;
      case "niveau":
        return <NiveauScreen value={profile.niveau} profile={profile} onAnswer={answerFor("niveau", false)} />;
      case "effort":
        return <EffortScreen value={profile.effortHebdo} profile={profile} onAnswer={answerFor("effortHebdo", false)} />;
      case "nom":
        return <NomScreen value={profile.nom} onAnswer={answerFor("nom", false)} />;
      case "generation":
        return <GenerationScreen profile={profile} onDone={goNext} />;
      case "mission":
        return <MissionScreen profile={profile} mission={mission || computeMission(profile)} onNext={goNext} tweaks={t} />;
      case "social":
        return <SocialScreen profile={profile} onNext={goNext} tweaks={t} />;
      case "recap":
        return <RecapScreen profile={profile} mission={mission || computeMission(profile)} onNext={goNext} tweaks={t} />;
      case "paywall":
        return <PaywallScreen profile={profile} mission={mission || computeMission(profile)} tweaks={t} onActivate={onActivate} onReviewMission={onReviewMission} />;
      default:
        return null;
    }
  };

  const renderDots = () => {
    const totalDots = SCREENS.length;
    return (
      <div className="ob-progress-dots" aria-label="Progression">
        <span style={{ marginRight: 6 }}>{Math.min(screenIdx + 1, totalDots)} / {totalDots}</span>
        {SCREENS.map((_, i) => (
          <span
            key={i}
            className={`ob-progress-dot ${i < screenIdx ? "is-done" : ""} ${i === screenIdx ? "is-current" : ""}`}
          />
        ))}
      </div>
    );
  };

  const profilePosition = t.profilePosition || "left";

  return (
    <div className={`ob-shell ${profilePosition === "right" ? "is-right" : ""}`}>
      <aside className="ob-profile-col" aria-label="Profil">
        <ProfilePanel
          profile={profile}
          currentScreen={currentScreenId}
          mission={mission}
          justFilledKey={justFilledKey}
        />
      </aside>

      <main className="ob-main-col">
        <div className="ob-top">
          <a className="ob-brand" href="index.html" onClick={(e) => {
            if (e.shiftKey) { e.preventDefault(); resetAll(); }
          }}>
            <span className="ob-brand-mark">O</span>
            Objectif Lycée
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="ob-back"
              onClick={goBack}
              disabled={screenIdx <= 0 || activated}
              aria-label="Revenir à l'étape précédente"
            >
              ← Retour
            </button>
            {renderDots()}
          </div>
        </div>

        {renderScreen()}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
