# Architecture cible - Objectif Lycée

Ce dépôt reste un site statique vanilla. Le modèle mental n'est pas MVC/MVVM : une page HTML lisible porte la structure et le contenu, puis de petits scripts hydratent les zones interactives via des attributs `data-*`.

## Découpage JavaScript

Arborescence cible :

```text
assets/js/
  domain/   logique pure sans DOM
  state/    localStorage, schéma, store/actions
  ui/       islands DOM réutilisables, montées par data-*
  pages/    comportement propre à une seule page
  shared/   petits contrats navigateur partagés par deux pages réelles
  lib/      bibliothèques tierces vendues localement, sans CDN runtime

scripts/    scripts Node, Playwright, extraction, vérification
```

Règles de décision :

- `pages/` : une seule page, DOM local, aucun besoin de réutilisation.
- `ui/` : comportement réutilisé sur au moins deux pages ou monté par contrat `data-*`.
- `domain/` : entrée objet, sortie objet, aucune dépendance à `document`, `window.localStorage`, au CSS ou au DOM.
- `state/` : persistance et actions métier locales. Le DOM doit rester dans `ui/` ou `pages/`.
- `shared/` : helper navigateur partagé par deux pages concrètes, avec une API globale volontaire et bornée.
- `lib/` : code tiers copié dans le dépôt quand le runtime ne doit pas dépendre d'un CDN ou d'un service externe.
- Pas de `utils.js` fourre-tout. Un helper partagé n'existe qu'à la troisième duplication claire.

Les nouveaux scripts navigateur actifs vont dans `assets/js/`. Exceptions historiques encore chargées par des pages : `scripts/dom.js`, `scripts/mission-ui.js` et `scripts/user-context-ui.js`. Le reste de `scripts/` reste réservé aux scripts Node, Playwright, extraction et vérification.

## Scripts Node locaux

Le serveur statique local `scripts/_server.cjs` sert seulement au développement et aux vérifications automatisées. Sa racine vient de `SITE_ROOT` si la variable est fournie, sinon de la racine du dépôt. `HOST` et `PORT` peuvent être surchargés pour les scripts de test.

Il expose aussi l'endpoint local `POST /api/ai/feynman` pour les feedbacks IA locaux du pilote de cours. La clé DeepSeek reste uniquement côté Node via `DEEPSEEK_API_KEY`; si elle est absente, l'endpoint renvoie un mock explicite pour développer et tester sans coût. Le prompt Feynman impose six rubriques stables : compréhension, erreurs/confusions, notions manquées, explication claire, question de vérification, prochaine micro-action. Les tons supportés côté serveur sont `simple`, `normal`, `exigeant` et `coach-calme`, sans changer l'exigence mathématique. Le modèle par défaut est `deepseek-v4-flash`, configurable avec `DEEPSEEK_MODEL`. La documentation officielle DeepSeek a été vérifiée le 2026-06-01 : l'API compatible OpenAI utilise `https://api.deepseek.com`, les modèles courants listés sont `deepseek-v4-flash` et `deepseek-v4-pro`, et `deepseek-chat` / `deepseek-reasoner` sont annoncés comme dépréciés au 2026-07-24.

Règles de sécurité à conserver :

- résoudre chaque URL avec `path.resolve` contre la racine autorisée ;
- refuser toute requête qui sort de cette racine, y compris les traversées encodées ;
- ne jamais renvoyer de chemin local dans les réponses 404/500 ;
- garder les erreurs client génériques : `Bad request`, `Forbidden`, `Not found`, `Internal server error`.
- pour `/api/ai/feynman`, valider le JSON, refuser les textes ou contextes trop longs, appliquer un timeout, et ne jamais envoyer la clé API au navigateur.

## CSS

- CSS page dans `assets/css/pages/` quand la page dépasse environ 50 lignes spécifiques.
- `styles.css` garde les bases globales et les composants réellement partagés.
- `components.css` ne doit exister que si plusieurs pages répètent le même composant avec le même contrat HTML.
- Ne pas créer de système de design abstrait avant duplication réelle.

## Pricing et abonnement

Les prix, libellés de facturation, limites gratuites et états d'abonnement sont de la logique produit. Ils doivent être centralisés avant d'être réutilisés dans plusieurs pages.

État actuel :

- `checkout.html` reprend le checkout V2 inline : deux offres visibles dès le premier écran, toggle semaine/trimestre dans la page, sans charger `assets/js/domain/pricing.js`.
- `assets/js/domain/pricing.js` expose `window.OPPricing` pour centraliser les libellés si les marqueurs `data-pricing-*` sont réintroduits sur checkout ou sur une autre page.
- `assets/js/pages/checkout.js` valide les Payment Links Stripe, synchronise les CTA `data-checkout-button`, expose `window.OP_UPDATE_CHECKOUT_BUTTONS` pour le toggle tarifaire inline, et stocke l'URL de test dans `localStorage` clé `outilPrepa:stripe.checkoutUrl`.
- Le compteur d'essai gratuit vit dans le store `window.OutilPrepa`; son rendu est dans `assets/js/ui/free-trial-banner.js`.

## Modèle et store locaux

- `assets/js/domain/model.js` expose `window.OutilPrepaModel`.
- `assets/js/state/store.js` expose `window.OutilPrepa` et persiste `localStorage` clé `outilPrepa:v1`.
- Les pages racine doivent charger `assets/js/domain/model.js` avant `assets/js/state/store.js`.
- Le store refuse d'écrire un payload trop gros dans `localStorage` afin d'éviter de saturer le quota navigateur.
- Le composant Feynman de cours persiste la dernière tentative par cours dans `localStorage` clé `outilPrepa:feynman:v1`. Cette clé ne contient pas de compte, se limite au texte élève et au dernier feedback, et le bouton `Recommencer` efface l'entrée du cours courant.
- `scripts/user-context-ui.js` hydrate le contexte visible des pages principales (`index.html`, `objectif.html`, `planning.html`, `progression.html`, `contenu.html`, `parametres.html`) via `data-user-initials`, `data-user-full-name`, `data-user-role`, `data-objective-*` et les dates partagées.
- Les pages principales exposent un fallback `data-local-account-prompt`. Il reste masqué quand `window.OutilPrepa.hasLocalAccount()` est vrai et renvoie uniquement vers `onboarding.html` quand aucun compte local n'existe.
- `onboarding.html` est la porte d'entrée de création ou reprise du compte local. S'il détecte déjà `window.OutilPrepa.hasLocalAccount()`, il redirige vers `index.html` au lieu de relancer le diagnostic.
- `parametres.html` est l'interface de modification/reset d'un compte local déjà créé. Sans compte local, `assets/js/pages/parametres.js` renvoie vers `onboarding.html`; avec compte, elle écrit dans le store partagé via `window.OutilPrepa.saveLocalAccount`.
- Un vrai compte local est identifié par `profile.localAccountId`. Il garde au minimum : prénom ou pseudo, classe, spécialités, matières prioritaires, objectif, rythme, préférences IA (`tone`, `detailLevel`, `allowDeepening`) et l'historique de mission déjà porté par `byDate`.
- `window.OutilPrepa.resetLocalAccount` remet le store à l'état par défaut et supprime le diagnostic onboarding `objectif-lycee-onboarding-v3`.
- L'onboarding React charge aussi le modèle et le store ; quand l'essai est activé, `onboarding/app.jsx` appelle `window.OutilPrepa.applyOnboarding` pour transformer le diagnostic en profil local partagé.

## Pont parent

Le pont parent est statique et sans backend. L'onboarding génère un lien `parent.html#p=...` qui contient un payload v1 compact en base64url. Ce payload doit rester non sensible : pas de nom, email, moyenne exacte, upload d'emploi du temps, URL Stripe privée, token ou texte libre non borné.

Le helper partagé expose seulement les opérations nécessaires : créer le payload, l'encoder, le décoder et fabriquer l'URL parent. La page parent lit le hash, affiche le récap si le payload est valide, sinon affiche un fallback. Le QR code utilise une bibliothèque locale dans `assets/js/lib/` et doit être chargé seulement à la demande.

## Pages de cours

Les chapitres de maths restent des documents HTML riches. Le contenu pédagogique, l'ordre des notions, les exemples, les exercices et les corrections restent dans `index.html`.
Les TD longs peuvent vivre dans une page `td.html` séparée, reliée depuis le chapitre et depuis les boutons `Exos` de `contenu.html`, tout en réutilisant le même shell KaTeX/sidebar/corrections.
Le choix de stack pour cours et TD est documenté dans `docs/stack-cours-td-web.md` : Astro + MDX en cible durable, KaTeX par défaut, JSXGraph par défaut pour les graphes exacts, Desmos/GeoGebra pour les besoins spécialisés, Numbas/STACK pour l'auto-correction avancée.

Le pilote Astro + MDX est isolé du site vanilla :

- sources : `src/pages/cours/second-degre/index.mdx`, `src/pages/cours/second-degre/td.mdx`, `src/courses/components/`, `src/courses/data/second-degre.js` ;
- configuration : `astro.config.mjs` ;
- sortie : `dist-courses/` après `npm run build:courses` ;
- vérification : `npm run verify:courses-astro`.

Il ne modifie pas les liens publics actuels de `contenu.html`, qui continuent de pointer vers les prototypes HTML tant que la migration globale n'est pas validée.

Artefacts attendus par chapitre :

```text
prototypes/cours/maths-specialite/<chapitre>/
  index.html
  td.html           # si page d'entraînement séparée
  sources.md
  source-map.md
  generation-notes.md
  verification-notes.md
  chapitre.css       # seulement si CSS spécifique > 50 lignes
  graphes.js         # seulement si graphes inline trop gros ou dupliqués
```

À partager :

- rendu KaTeX ;
- boutons de révélation/correction ;
- sidebar de cours ;
- progression de lecture ;
- tiroir IA de cours ouvert par `button[data-course-agent-open="<contextId>"]` et alimenté par `script[type="application/json"][data-course-agent-contexts]` ;
- bloc final Feynman `[data-feynman]` relié au même manifeste par `data-feynman-context-id`, avec fallback local sans IA quand la page n'est pas servie en HTTP ;
- loader JSXGraph ;
- helpers de graphe seulement après duplication réelle.

À garder dans le chapitre :

- définitions, propriétés, méthodes, exemples et corrections ;
- choix pédagogiques et ordre de progression ;
- petites initialisations de graphe propres au chapitre.

## Vérification

Garde-fous principaux :

- `npm run verify`
- `npm run verify:agent-map`
- `npm run verify:unsafe-html`
- `npm run verify:localstorage`
- `npm run verify:local-account`
- `npm run verify:ai-endpoint`
- `npm run verify:server-security`
- `npm run verify:course-sidebar`
- `npm run verify:course-agent`
- `npm run build:courses`
- `npm run verify:courses-astro`
- `npm run verify:redesign`
- `npm run verify:cwv`
- `node scripts/verify-course-sidebar.mjs <page-de-cours>`
- `git diff --check`

`npm run verify` inclut `validate:json`, `verify:agent-map`, `verify:unsafe-html`, `verify:localstorage`, `verify:local-account`, `verify:ai-endpoint`, `verify:server-security`, `verify:parent-share`, `verify:onboarding`, `verify:analytics`, `verify:s01` à `verify:s05`, `verify:course-sidebar`, `verify:course-agent`, `verify:redesign` et `verify:cwv`. `verify:local-account` contrôle `parametres.html`, la persistance `outilPrepa:v1`, le reset du diagnostic onboarding, la redirection paramètres sans compte, la redirection onboarding avec compte existant, les sidebars des pages principales, les fallbacks sans compte vers onboarding et l'absence d'overflow desktop/mobile. `verify:ai-endpoint` contrôle le mock sans clé DeepSeek, les erreurs JSON/texte vide/trop long, le refus des méthodes non POST, l'absence d'exposition de secret, le format Feynman en six rubriques, les cas élève presque vide/partiellement juste/faux/incomplet/hors contexte, les tons `simple`, `exigeant`, `coach calme`, et lance un smoke réseau seulement si `DEEPSEEK_API_KEY` est configurée localement. `verify:course-sidebar` et `verify:cwv` couvrent aussi les `td.html` de `prototypes/cours/maths-specialite/`. `verify:course-agent` contrôle aussi le composant Feynman du pilote : texte vide refusé, texte court accepté, texte long accepté, sauvegarde `outilPrepa:feynman:v1`, restauration, reset, fallback sans IA et absence d'injection HTML. `verify:agent-map` contrôle que la carte `docs/agent-codebase-map.md` garde 5 zones maximum, contient les sections d'orientation rapide, que les commandes `npm run ...` documentées existent dans `package.json`, que les chemins critiques référencés existent encore, que les fichiers pivots listés gardent un `AGENT HEADER`, et que `CLAUDE.md` pointe vers la carte. `verify:unsafe-html` scanne les sources HTML/JS/JSX et refuse `insertAdjacentHTML`, `dangerouslySetInnerHTML` ou un `innerHTML` non vide sans commentaire proche `unsafe-html-allow`. Le bundle généré `onboarding/onboarding.bundle.js` est exclu : l'autorisation doit vivre dans la source JSX. `verify:localstorage` refuse toute clé non documentée, sauf lecture/migration de l'ancienne clé checkout. `verify:server-security` lance `_server.cjs` sur une racine temporaire et contrôle `SITE_ROOT`, le rejet de traversal et les messages d'erreur sans fuite de chemin.

Pour un chapitre de cours, ne pas appeler une page finie tant que les notes de sources/génération n'existent pas ou ne sont pas à jour, que KaTeX déborde, que les corrections ne se révèlent pas, que les graphes exacts éventuels ne sont pas visibles, ou que la sidebar ne passe pas en ouvert/replié/hover/focus/mobile.
Le pilote IA de cours est vérifié par `npm run verify:course-agent` : manifeste JSON valide, boutons reliés à des contextes existants, tiroir desktop/mobile, focus textarea, refus d'envoi vide, bloc Feynman final, feedback texte sans HTML utilisateur, fermeture et absence d'overflow.
