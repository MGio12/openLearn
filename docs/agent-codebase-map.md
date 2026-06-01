# Carte agent du codebase

Objectif : donner a un agent une carte courte avant de modifier une zone partagee. Cette carte ne remplace pas `CLAUDE.md`, `docs/architecture.md`, ni les docs produit. Elle indique quoi lire, quels contrats ne pas casser, et quoi verifier.

## Se reperer en 90 secondes

1. Si la demande est ouverte ou concerne la priorisation, lire `TODO.md` pour identifier l'item actif ou le premier item restant. Si la demande est deja ciblee, commencer par la zone concernee dans cette carte.
2. Lire uniquement la zone concernee par la demande. Si une zone manque, ajouter son contrat avant de disperser l'information ailleurs.
3. Ouvrir seulement les fichiers proprietaires listes dans la zone, puis la doc metier citee par `CLAUDE.md` pour ce scenario.
4. Reperer les selecteurs `data-*`, cles `localStorage`, globals `window.*`, endpoints ou commandes qui forment le contrat public.
5. Lancer les commandes de verification indiquees pour la zone touchee, puis `git diff --check`.

## Fonctionnalites implementees et proprietaires

- Compte local et profil visible : `assets/js/domain/model.js`, `assets/js/state/store.js`, `scripts/user-context-ui.js`, `onboarding.html`, `parametres.html`, `assets/js/pages/parametres.js`. Contrat principal : `outilPrepa:v1`, `profile.localAccountId`, `profile.aiPreferences`, `data-user-*`, `data-local-account-prompt`.
- Onboarding React exceptionnel : `onboarding.html`, `onboarding/state.jsx`, `onboarding/app.jsx`, `onboarding/onboarding.bundle.js`, `onboarding/onboarding.css`. Contrat principal : `objectif-lycee-onboarding-v3`, manifeste `SCREENS`, `window.__ONBOARDING_TWEAKS_DEFAULTS`, puis synchronisation vers `window.OutilPrepa.applyOnboarding`.
- Pages app branchees au store : `index.html`, `objectif.html`, `planning.html`, `progression.html`, `contenu.html`, `parametres.html`, avec `assets/js/state/store.js`, `scripts/user-context-ui.js` et les scripts page dans `assets/js/pages/`.
- Pages funnel/publiques : `checkout.html`, `merci.html`, `parent.html`, `assets/js/pages/checkout.js`, `assets/js/pages/parent.js`, `assets/js/shared/parent-share.js`. Contrat principal : `data-checkout-*`, `outilPrepa:stripe.checkoutUrl`, hash public `parent.html#p=...`, rendu parent en `textContent`.
- Page open source statique : `openSource.html`, `assets/css/pages/openSource.css`. Pas de JS specifique ni de store. Lien depuis la sidebar de toutes les pages cockpit (groupe "Compte"). A modifier en meme temps que la section `.sidebar-os-badge` dans `styles.css` et le strip `.ap-os-strip` dans `index.html` + `assets/css/pages/home.css`.
- Cours HTML et TD : `prototypes/cours/maths-specialite/`, `prototypes/cours/maths-specialite/cours.css`, `prototypes/cours/maths-specialite/cours.js`, `prototypes/cours/_templates/`. Contrat principal : shell sidebar, KaTeX, JSXGraph pour graphes exacts, corrections `data-reveal`, notes de chapitre.
- Pilote Astro/MDX isole : `astro.config.mjs`, `src/pages/cours/second-degre/`, `src/courses/components/`, `src/courses/data/`, `src/courses/styles/course.css`. Contrat principal : pilote separe du site vanilla, verifie par `npm run build:courses` et `npm run verify:courses-astro`.
- Endpoint IA local mock/DeepSeek : `scripts/_server.cjs`, `scripts/verify-ai-endpoint.mjs`, `docs/architecture.md`. Contrat principal : `POST /api/ai/feynman`, mock sans `DEEPSEEK_API_KEY`, sortie Feynman en six rubriques, tons `simple`/`normal`/`exigeant`/`coach-calme`, appel serveur DeepSeek seulement avec cle en environnement.
- Pilote IA de cours : `prototypes/cours/maths-specialite/cours.js`, `prototypes/cours/maths-specialite/cours.css`, chapitre `prototypes/cours/maths-specialite/second-degre/`, `scripts/verify-course-agent.mjs`. Contrat principal : `data-course-agent-contexts`, `data-course-agent-open`, `data-course-agent-entry`, `data-course-agent-jump`, `[data-feynman]`, `outilPrepa:feynman:v1`, `.toc-agent-badge`.

## Convention contrat de zone

Toute nouvelle zone partagee doit ajouter ou mettre a jour un paragraphe ici avant ou pendant l'implementation. Le paragraphe doit nommer les fichiers proprietaires, le contrat DOM/data ou storage, les commandes de verification, les pieges connus, et les fichiers a ne pas refactorer sans raison.

Le but est pratique : si une zone sert deux pages reelles, un futur agent doit pouvoir savoir ou lire, quoi modifier et quoi tester sans relire tout le depot.

## Zone 1 - Parcours site/app

Fichiers proprietaires :

- Pages racine app : `index.html`, `objectif.html`, `planning.html`, `progression.html`, `contenu.html`, `parametres.html`.
- Pages funnel/publiques : `checkout.html`, `merci.html`, `parent.html`.
- CSS page : `assets/css/pages/`.
- Code navigateur : `assets/js/domain/`, `assets/js/state/`, `assets/js/pages/`, `assets/js/ui/`, `assets/js/shared/`.
- Wrapper historique encore charge par les pages : `scripts/mission-ui.js`.

Contrat DOM/data principal :

- La mission du jour est le contrat central du parcours. `scripts/mission-ui.js` hydrate les cibles `data-daily-mission-*` depuis `window.OutilPrepa` ou `window.OutilPrepaModel`. Le conteneur dashboard standard est `data-daily-mission-container`.
- Les checklists utilisent `data-mission-action` ou `data-daily-mission-checklist` + `data-mission-step`, puis persistent via `assets/js/ui/mission-checklist.js`. Chaque `[data-mission-action]` doit porter un index explicite : `data-mission-step` ou `data-mission-index`.
- Les boutons checkout utilisent `data-checkout-button`, `data-checkout-plan` et `data-checkout-billing`. `checkout.html` reprend le checkout V2 inline : prix visibles des deux offres, toggle semaine/trimestre, puis `assets/js/pages/checkout.js` resout la Payment Link Stripe et ajoute `href` + `data-checkout-state` (`ready` ou `needs-config`) au chargement.
- `data-when` est un contrat visuel de timeline uniquement, pas une source de logique.
- Le partage parent passe par `parent.html#p=...`, le payload v1 de `assets/js/shared/parent-share.js`, puis le rendu `assets/js/pages/parent.js`. Ce payload est public : il ne doit contenir aucune donnee sensible, et `parent.html` doit l'afficher avec `textContent`, jamais avec du HTML utilisateur.
- `progression.html` rend la courbe des moyennes avec JSXGraph en renderer canvas sur le conteneur `data-grade-chart`. Ne pas revenir a un SVG trace a la main ; le conteneur doit rester fluide (`width: 100%`, `height: 100%`, flex) et les donnees doivent passer par le contrat `data-grade-*`.
- `scripts/user-context-ui.js` hydrate le profil visible via `data-user-initials`, `data-user-full-name`, `data-user-role`, les libelles objectif/date, et le fallback `data-local-account-prompt`. Les pages principales doivent le charger apres `assets/js/domain/model.js`, `assets/js/state/store.js` et `scripts/dom.js`; sans compte, le fallback pointe vers `onboarding.html`.
- `onboarding.html` est la porte d'entree de creation/reprise de compte local. Il charge le modele/store avant le bundle et redirige vers `index.html` si `window.OutilPrepa.hasLocalAccount()` est deja vrai.
- `parametres.html` et `assets/js/pages/parametres.js` portent la modification/reset d'un compte local deja cree, pas la creation par defaut. Le store reste `outilPrepa:v1`; un compte reel a `profile.localAccountId`, des preferences IA dans `profile.aiPreferences`, et se modifie via `window.OutilPrepa.saveLocalAccount` / `resetLocalAccount`.

Commandes de verification :

- `npm run verify:s01`
- `npm run verify:s02`
- `npm run verify:s03`
- `npm run verify:s04`
- `npm run verify:s05`
- `npm run verify:localstorage`
- `npm run verify:local-account`
- `npm run verify`

Pieges connus :

- `assets/js/pages/checkout.js` porte le cablage Payment Link de checkout, l'etat UI des CTA, et la migration lecture seule de l'ancienne cle checkout. Le toggle tarifaire de `checkout.html` est inline et appelle `window.OP_UPDATE_CHECKOUT_BUTTONS` quand il change `data-checkout-billing`.
- Le payload parent ne doit contenir ni nom, email, moyenne exacte, photo, metadonnee d'upload, URL Stripe privee, token, ni texte libre non borne.
- La mission du jour est un concept transversal, pas une nouvelle page dediee a creer par reflexe.
- Le compte local n'a pas de mot de passe et n'ajoute pas de nouvelle cle localStorage sans extension de `verify:localstorage`.
- Sans compte local, les pages principales doivent afficher un `data-local-account-prompt` visible qui renvoie vers `onboarding.html`, pas vers `parametres.html` ni vers des donnees demo silencieuses.

Ne pas refactorer sans raison :

- `progression.html`, qui contient encore le graphe de moyennes inline et son contrat `data-grade-*`.
- `scripts/mission-ui.js`, car plusieurs pages racine dependent de ses cibles `data-daily-mission-*`.
- `assets/js/shared/parent-share.js`, car le hash parent est public et doit rester compatible.

## Zone 2 - Onboarding React exceptionnel

Fichiers proprietaires :

- Hote : `onboarding.html`.
- Sources React : `onboarding/state.jsx`, `onboarding/profile.jsx`, `onboarding/screens-early.jsx`, `onboarding/screens-mid.jsx`, `onboarding/screens-late.jsx`, `onboarding/app.jsx`.
- Style : `onboarding/onboarding.css`.
- Bundle genere : `onboarding/onboarding.bundle.js`.
- Doc produit : `onboarding.md`.

Contrat DOM/data principal :

- C'est l'exception React du projet : React 18 UMD via CDN et bundle precompile.
- `onboarding/state.jsx` porte le manifeste `SCREENS`, les choix, le moteur mission et la persistance `localStorage` cle `objectif-lycee-onboarding-v3`.
- `onboarding.html` expose `window.__ONBOARDING_TWEAKS_DEFAULTS`, charge `scripts/analytics.js`, `assets/js/domain/model.js`, `assets/js/state/store.js`, puis le bundle.
- Le partage parent reutilise `window.OLParentShare` depuis `assets/js/shared/parent-share.js`.
- Quand l'essai est active, `onboarding/app.jsx` appelle `window.OutilPrepa.applyOnboarding` pour synchroniser le diagnostic dans le compte local partage.

Commandes de verification :

- `npm run build:onboarding`
- `npm run verify:onboarding`
- `npm run verify:local-account`
- `npm run verify:parent-share`
- `npm run verify:s05`
- `npm run verify`

Pieges connus :

- Modifier les JSX, pas le bundle genere a la main. Le bundle doit etre reconstruit apres changement source.
- Ne pas generaliser React aux autres pages : le reste du site reste vanilla.
- Les analytics doivent rester charges avant le bundle pour capter les vues/completions d'ecrans.
- Le paywall arrive apres mission, social proof et recap : ne pas le remonter avant la preuve de valeur.

Ne pas refactorer sans raison :

- Le split `state/profile/screens-early/screens-mid/screens-late/app`, deja documente dans `onboarding.md`.
- `onboarding/onboarding.bundle.js`, sauf regeneration par `npm run build:onboarding`.

## Zone 3 - Cours de maths

Fichiers proprietaires :

- Regles : `docs/stack-cours-td-web.md`, `docs/regles-creation-cours-maths.md`, `docs/techniques-apprentissage-maths.md`, `docs/pipeline-cours-ia.md`, `docs/generation-image-cours.md`.
- Sources Premiere : `lien/premiere/math.md`.
- Sources locales si presentes : `prototypes/cours/_sources/premiere/math/<chapitre>/` et `prototypes/cours/_extracted/premiere/math/<chapitre>/`.
- Prototypes : `prototypes/cours/maths-specialite/`.
- Pilote Astro/MDX isole : `astro.config.mjs`, `src/pages/cours/second-degre/index.mdx`, `src/pages/cours/second-degre/td.mdx`, `src/courses/components/`, `src/courses/data/second-degre.js`, `src/courses/styles/course.css`.
- Partage matiere : `prototypes/cours/maths-specialite/cours.css`, `prototypes/cours/maths-specialite/cours.js`.
- Generateur TD Premiere spe : `scripts/generate-maths-specialite-td.mjs`.
- Notes de chapitre : `sources.md`, `source-map.md`, `generation-notes.md`, `verification-notes.md` dans chaque dossier de chapitre.
- Runtime navigateur cours/TD/IA : `prototypes/cours/maths-specialite/cours.js`; styles partages : `prototypes/cours/maths-specialite/cours.css`; endpoint local Feynman : `scripts/_server.cjs`; verification IA pilote : `scripts/verify-course-agent.mjs`.

Contrat DOM/data principal :

- Une page de cours utilise `body.has-course-sidebar`, `data-course-layout`, `data-course-sidebar`, `data-sidebar-toggle`, et `data-section-link`.
- Une page TD se nomme `td.html`, reutilise le shell cours, garde les corrections masquees via `data-reveal`, et les liens `Exos` de `contenu.html` pointent vers cette page separee.
- Le choix de techno cours/TD se fait depuis `docs/stack-cours-td-web.md` : KaTeX par defaut, JSXGraph par defaut pour graphes exacts, Desmos/GeoGebra seulement pour besoins specifiques, Numbas/STACK seulement pour auto-correction avancee.
- Le tiroir IA de cours et le bloc final Feynman sont partages par `prototypes/cours/maths-specialite/cours.js` et `cours.css`. Un chapitre pilote expose `script[type="application/json"][data-course-agent-contexts]`, chaque bouton `button[data-course-agent-open="<contextId>"]` doit pointer vers un contexte existant, et la section `[data-feynman]` doit declarer `data-feynman-context-id`. Le pilote `second-degre` ajoute aussi un bloc haut de page `[data-course-agent-entry]`, trois liens `[data-course-agent-jump]` et des marqueurs `.toc-agent-badge` dans la sidebar pour rendre les boutons IA trouvables sans les deplacer.
- Les formules exactes restent en KaTeX. Les courbes, graphes et constructions exactes passent par JSXGraph, Desmos, GeoGebra, ou des points calcules depuis une vraie fonction.
- Les corrections et aides doivent etre revelables, et chaque notion importante doit demander une production eleve.

Commandes de verification :

- `npm run verify:course-sidebar` verifie tous les prototypes `prototypes/cours/maths-specialite/*/index.html` et `prototypes/cours/maths-specialite/*/td.html`.
- `npm run verify:course-agent` verifie le pilote IA `second-degre` : manifeste, boutons, liens de decouvrabilite, marqueurs sidebar, tiroir desktop/mobile, focus, feedback texte, bloc Feynman, sauvegarde locale, fallback sans IA, reset et absence d'overflow.
- `npm run build:courses` construit `dist-courses/` sans toucher au site vanilla.
- `npm run verify:courses-astro` verifie les pages MDX `second-degre` generees : build present, sources, composants, sidebar, revelations, KaTeX, graphes JSXGraph, TD 40 exercices et absence d'overflow.
- `node scripts/verify-course-sidebar.mjs prototypes/cours/maths-specialite/second-degre/index.html`
- `git diff --check`

Commandes hors verification :

- `npm run dev:courses` lance un serveur de preview Astro/MDX isole.
- `node scripts/generate-maths-specialite-td.mjs` regenere volontairement les pages `td.html`.

Pieges connus :

- Ne pas remplacer les PDF valides par une lecon generique. Maths91 sert de colonne vertebrale, Maths-et-tiques complete l'intuition.
- Ne pas brancher les pages Astro dans le site public avant validation du pilote : les liens actuels restent sur les prototypes HTML.
- Ne jamais dessiner une courbe, un axe, une tangente ou un graphe approximatif en SVG, Canvas, CSS ou HTML decoratif.
- Ne jamais mettre une formule KaTeX importante dans un conteneur etroit ou avec scroll horizontal.
- Ne jamais exposer de cle DeepSeek, endpoint prive ou secret dans le frontend ; le navigateur appelle seulement l'endpoint local public `POST /api/ai/feynman` quand la page est servie en HTTP, bascule en fallback local sans IA hors serveur, et rend tous les feedbacks avec `textContent`.

Ne pas refactorer sans raison :

- Les longs `index.html` de chapitre : ils portent le contenu pedagogique, l'ordre, les exemples et les corrections.
- `prototypes/cours/maths-specialite/cours.css` et `prototypes/cours/maths-specialite/cours.js`, sauf besoin partage verifie.

## Zone 4 - Scripts Node et verification

Fichiers proprietaires :

- Catalogue de commandes : `package.json`.
- Scripts Node et Playwright : `scripts/`.
- Serveur local de verification : `scripts/_server.cjs`.
- Architecture technique : `docs/architecture.md`.
- Cette carte : `docs/agent-codebase-map.md`.

Contrat DOM/data principal :

- Les scripts doivent rester sans nouvelle dependance npm sauf demande explicite.
- Une verification echoue avec `process.exit(1)` et imprime une raison exploitable.
- `scripts/_server.cjs` sert seulement au dev/test local, respecte `SITE_ROOT`, `HOST`, `PORT`, et ne doit pas exposer de chemin local dans les erreurs.
- `scripts/_server.cjs` expose `POST /api/ai/feynman` pour les feedbacks IA locaux. La clé reste dans `process.env.DEEPSEEK_API_KEY`; sans clé, la route renvoie un mock explicite. La réponse Feynman doit garder six rubriques dans cet ordre : compréhension, erreurs/confusions, notions manquées, explication claire, question de vérification, prochaine micro-action. Limites actuelles : corps JSON 32 KB, texte élève 2500 caractères, contexte cours 5000 caractères, timeout 15 s.
- DeepSeek a ete verifie le 2026-06-01 sur la doc officielle : base OpenAI `https://api.deepseek.com`, modele par defaut local `deepseek-v4-flash`, override possible par `DEEPSEEK_MODEL`.
- Les scripts Playwright verifient des contrats visibles : selectors `data-*`, overflow, console errors, navigation, et contenu produit attendu.

Commandes de verification :

- `npm run validate:json`
- `npm run verify:unsafe-html`
- `npm run verify:localstorage`
- `npm run verify:ai-endpoint`
- `npm run verify:server-security`
- `npm run verify:agent-map`
- `npm run verify:analytics`
- `npm run verify:onboarding`
- `npm run verify:parent-share`
- `npm run verify:s04`
- `npm run verify:redesign`
- `npm run verify:cwv`
- `npm run verify:course-agent`
- `npm run verify`
- `git diff --check`

Pieges connus :

- Ne pas ajouter de dependance pour un parseur simple : preferer `fs`, `path`, JSON natif et regex bornees.
- Ne jamais appeler DeepSeek depuis un script navigateur ni exposer `DEEPSEEK_API_KEY`; l'endpoint local doit rester le seul point d'appel.
- `onboarding/onboarding.bundle.js` est genere. Une autorisation HTML unsafe doit vivre dans la source JSX, pas seulement dans le bundle.
- Un script de verification doit rester stable en CI locale : chemins relatifs depuis la racine, messages courts, pas de sortie verbeuse inutile.

Ne pas refactorer sans raison :

- `scripts/_server.cjs`, dont le comportement de securite est couvert par `npm run verify:server-security`.
- Les scripts `scripts/verify-s01-dashboard.mjs` a `scripts/verify-s05-tunnel.mjs`, qui documentent aussi le contrat produit actif.

## Zone 5 - Donnees produit et localStorage

Fichiers proprietaires :

- Modele demo et schemas locaux : `assets/js/domain/model.js`.
- Store local : `assets/js/state/store.js` et `assets/js/state/README.md`.
- Pricing : `assets/js/domain/pricing.js`.
- Bandeau essai : `assets/js/ui/free-trial-banner.js`.
- Parent share : `assets/js/shared/parent-share.js`, `parent.html`.
- Checkout : `checkout.html`, `assets/js/pages/checkout.js`.

Contrat DOM/data principal :

- `window.OutilPrepaModel` expose le modele demo, la mission, le planning, la progression et les helpers de normalisation.
- `window.OutilPrepa` persiste le store `localStorage` cle `outilPrepa:v1`, notifie les abonnes, et ne doit pas contenir de selection DOM.
- `assets/js/domain/pricing.js` expose `window.OPPricing` comme source partageable de libelles prix, mais `checkout.html` utilise actuellement son propre toggle tarifaire inline et ne le charge pas.
- `assets/js/pages/checkout.js` peut stocker une URL Stripe locale dans `localStorage` cle `outilPrepa:stripe.checkoutUrl` pour le navigateur de test. L'ancienne cle `op.stripe.checkoutUrl` est seulement lue puis migree.
- Le composant Feynman des cours persiste la derniere tentative par cours dans `localStorage` cle `outilPrepa:feynman:v1`; cette donnee reste locale et peut etre effacee par le bouton `Recommencer`.
- Le flow onboarding persiste separement dans `objectif-lycee-onboarding-v3`.
- `assets/js/state/store.js` doit etre charge apres `assets/js/domain/model.js` : s'il manque `window.OutilPrepaModel.todayISO`, il echoue avec une erreur explicite plutot qu'un `TypeError` implicite.

Commandes de verification :

- `npm run verify:s01`
- `npm run verify:s03`
- `npm run verify:onboarding`
- `npm run verify:parent-share`
- `npm run verify:localstorage`
- `npm run verify`

Pieges connus :

- Ne pas melanger logique pure et DOM : `domain/` reste sans `document`, `window.localStorage`, ni CSS.
- Ne pas stocker de donnee sensible dans le hash parent, le checkout local, ou les payloads de demo.

Ne pas refactorer sans raison :

- `assets/js/domain/model.js`, gros fichier central encore utilise comme modele commun.
- `assets/js/state/store.js`, store local expose via `window.OutilPrepa`.
- `assets/js/domain/pricing.js`, source partageable des prix si les marqueurs `data-pricing-*` sont reintroduits.
