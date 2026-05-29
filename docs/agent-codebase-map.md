# Carte agent du codebase

Objectif : donner a un agent une carte courte avant de modifier une zone partagee. Cette carte ne remplace pas `CLAUDE.md`, `docs/architecture.md`, ni les docs produit. Elle indique quoi lire, quels contrats ne pas casser, et quoi verifier.

## Convention contrat de zone

Toute nouvelle zone partagee doit ajouter ou mettre a jour un paragraphe ici avant ou pendant l'implementation. Le paragraphe doit nommer les fichiers proprietaires, le contrat DOM/data ou storage, les commandes de verification, les pieges connus, et les fichiers a ne pas refactorer sans raison.

Le but est pratique : si une zone sert deux pages reelles, un futur agent doit pouvoir savoir ou lire, quoi modifier et quoi tester sans relire tout le depot.

## Zone 1 - Parcours site/app

Fichiers proprietaires :

- Pages racine : `index.html`, `objectif.html`, `planning.html`, `progression.html`, `checkout.html`, `parent.html`.
- CSS page : `assets/css/pages/`.
- Code navigateur : `assets/js/domain/`, `assets/js/state/`, `assets/js/pages/`, `assets/js/ui/`, `assets/js/shared/`.
- Wrapper historique encore charge par les pages : `scripts/mission-ui.js`.

Contrat DOM/data principal :

- La mission du jour est le contrat central du parcours. `scripts/mission-ui.js` hydrate les cibles `data-daily-mission-*` depuis `window.OutilPrepa` ou `window.OutilPrepaModel`. Le conteneur dashboard standard est `data-daily-mission-container`.
- Les checklists utilisent `data-mission-action` ou `data-daily-mission-checklist` + `data-mission-step`, puis persistent via `assets/js/ui/mission-checklist.js`. Chaque `[data-mission-action]` doit porter un index explicite : `data-mission-step` ou `data-mission-index`.
- Les boutons checkout utilisent `data-checkout-button`, `data-checkout-plan`, `data-checkout-billing`, et demarrent dans le HTML avec `data-checkout-state="needs-config"`. `assets/js/pages/checkout.js` remplace ensuite cet etat par `ready` seulement quand une Payment Link Stripe valide est resolue.
- `data-when` est un contrat visuel de timeline uniquement, pas une source de logique.
- Le partage parent passe par `parent.html#p=...` et le payload v1 de `assets/js/shared/parent-share.js`. Ce payload est public : il ne doit contenir aucune donnee sensible, et `parent.html` doit l'afficher avec `textContent`, jamais avec du HTML utilisateur.

Commandes de verification :

- `npm run verify:s01`
- `npm run verify:s02`
- `npm run verify:s03`
- `npm run verify:s05`
- `npm run verify:localstorage`
- `npm run verify`

Pieges connus :

- `assets/js/pages/checkout.js` porte le cablage Payment Link de checkout, l'etat UI des CTA, l'hydratation des prix depuis `window.OPPricing`, et la migration lecture seule de l'ancienne cle checkout.
- Le payload parent ne doit contenir ni nom, email, moyenne exacte, photo, metadonnee d'upload, URL Stripe privee, token, ni texte libre non borne.
- La mission du jour est un concept transversal, pas une nouvelle page dediee a creer par reflexe.

Ne pas refactorer sans raison :

- `progression.html`, qui contient encore un gros graphe inline et son contrat `data-grade-*`.
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
- `onboarding.html` expose `window.__ONBOARDING_TWEAKS_DEFAULTS`, charge `scripts/analytics.js`, puis le bundle.
- Le partage parent reutilise `window.OLParentShare` depuis `assets/js/shared/parent-share.js`.

Commandes de verification :

- `npm run build:onboarding`
- `npm run verify:onboarding`
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

- Regles : `docs/regles-creation-cours-maths.md`, `docs/techniques-apprentissage-maths.md`, `docs/pipeline-cours-ia.md`, `docs/generation-image-cours.md`.
- Sources Premiere : `lien/premiere/math.md`.
- Prototypes : `prototypes/cours/maths-specialite/`.
- Partage matiere : `prototypes/cours/maths-specialite/cours.css`, `prototypes/cours/maths-specialite/cours.js`.
- Notes de chapitre : `sources.md`, `source-map.md`, `generation-notes.md`, `verification-notes.md` dans chaque dossier de chapitre.

Contrat DOM/data principal :

- Une page de cours utilise `body.has-course-sidebar`, `data-course-layout`, `data-course-sidebar`, `data-sidebar-toggle`, et `data-section-link`.
- Les formules exactes restent en KaTeX. Les courbes, graphes et constructions exactes passent par JSXGraph, Desmos, GeoGebra, ou des points calcules depuis une vraie fonction.
- Les corrections et aides doivent etre revelables, et chaque notion importante doit demander une production eleve.

Commandes de verification :

- `npm run verify:course-sidebar` verifie tous les prototypes `prototypes/cours/maths-specialite/*/index.html`.
- `node scripts/verify-course-sidebar.mjs prototypes/cours/maths-specialite/second-degre/index.html`
- `git diff --check`

Pieges connus :

- Ne pas remplacer les PDF valides par une lecon generique. Maths91 sert de colonne vertebrale, Maths-et-tiques complete l'intuition.
- Ne jamais dessiner une courbe, un axe, une tangente ou un graphe approximatif en SVG, Canvas, CSS ou HTML decoratif.
- Ne jamais mettre une formule KaTeX importante dans un conteneur etroit ou avec scroll horizontal.

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
- Les scripts Playwright verifient des contrats visibles : selectors `data-*`, overflow, console errors, navigation, et contenu produit attendu.

Commandes de verification :

- `npm run validate:json`
- `npm run verify:unsafe-html`
- `npm run verify:localstorage`
- `npm run verify:server-security`
- `npm run verify:agent-map`
- `npm run verify:analytics`
- `npm run verify:redesign`
- `npm run verify`
- `git diff --check`

Pieges connus :

- Ne pas ajouter de dependance pour un parseur simple : preferer `fs`, `path`, JSON natif et regex bornees.
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
- `assets/js/domain/pricing.js` expose `window.OPPricing` comme source de verite des libelles prix visibles checkout.
- `assets/js/pages/checkout.js` peut stocker une URL Stripe locale dans `localStorage` cle `outilPrepa:stripe.checkoutUrl` pour le navigateur de test. L'ancienne cle `op.stripe.checkoutUrl` est seulement lue puis migree.
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
- `assets/js/domain/pricing.js`, source partagee des prix visibles.
