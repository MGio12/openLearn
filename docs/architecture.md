# Architecture cible — Objectif Lycée

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

Les anciens fichiers dans `scripts/` sont réservés aux scripts Node, Playwright, extraction et vérification. Les scripts navigateur actifs vont dans `assets/js/`.

## Scripts Node locaux

Le serveur statique local `scripts/_server.cjs` sert seulement au développement et aux vérifications automatisées. Sa racine vient de `SITE_ROOT` si la variable est fournie, sinon de la racine du dépôt. `HOST` et `PORT` peuvent être surchargés pour les scripts de test.

Règles de sécurité à conserver :

- résoudre chaque URL avec `path.resolve` contre la racine autorisée ;
- refuser toute requête qui sort de cette racine, y compris les traversées encodées ;
- ne jamais renvoyer de chemin local dans les réponses 404/500 ;
- garder les erreurs client génériques : `Bad request`, `Forbidden`, `Not found`, `Internal server error`.

## CSS

- CSS page dans `assets/css/pages/` quand la page dépasse environ 50 lignes spécifiques.
- `styles.css` garde les bases globales et les composants réellement partagés.
- `components.css` ne doit exister que si plusieurs pages répètent le même composant avec le même contrat HTML.
- Ne pas créer de système de design abstrait avant duplication réelle.

## Pricing et abonnement

Les prix, libellés de facturation, limites gratuites et états d'abonnement sont de la logique produit. Ils doivent être centralisés avant d'être réutilisés dans plusieurs pages.

État actuel :

- `assets/js/domain/pricing.js` expose `window.OPPricing`, source de vérité des libellés de prix visibles sur checkout.
- `assets/js/pages/checkout.js` hydrate les prix depuis `window.OPPricing`, valide les Payment Links Stripe, synchronise les CTA `data-checkout-button`, et stocke l'URL de test dans `localStorage` clé `outilPrepa:stripe.checkoutUrl`.
- Le compteur d'essai gratuit vit dans le store `window.OutilPrepa`; son rendu est dans `assets/js/ui/free-trial-banner.js`.

## Modèle et store locaux

- `assets/js/domain/model.js` expose `window.OutilPrepaModel`.
- `assets/js/state/store.js` expose `window.OutilPrepa` et persiste `localStorage` clé `outilPrepa:v1`.
- Les pages racine doivent charger `assets/js/domain/model.js` avant `assets/js/state/store.js`.
- Le store refuse d'écrire un payload trop gros dans `localStorage` afin d'éviter de saturer le quota navigateur.

## Pont parent

Le pont parent est statique et sans backend. L'onboarding génère un lien `parent.html#p=...` qui contient un payload v1 compact en base64url. Ce payload doit rester non sensible : pas de nom, email, moyenne exacte, upload d'emploi du temps, URL Stripe privée, token ou texte libre non borné.

Le helper partagé expose seulement les opérations nécessaires : créer le payload, l'encoder, le décoder et fabriquer l'URL parent. La page parent lit le hash, affiche le récap si le payload est valide, sinon affiche un fallback. Le QR code utilise une bibliothèque locale dans `assets/js/lib/` et doit être chargé seulement à la demande.

## Pages de cours

Les chapitres de maths restent des documents HTML riches. Le contenu pédagogique, l'ordre des notions, les exemples, les exercices et les corrections restent dans `index.html`.

Artefacts attendus par chapitre :

```text
prototypes/cours/maths-specialite/<chapitre>/
  index.html
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
- `npm run verify:server-security`
- `npm run verify:course-sidebar`
- `npm run verify:course-agent`
- `npm run verify:redesign`
- `node scripts/verify-course-sidebar.mjs <page-de-cours>`
- `git diff --check`

`npm run verify` inclut `validate:json`, `verify:agent-map`, `verify:unsafe-html`, `verify:localstorage`, `verify:server-security`, `verify:parent-share`, `verify:onboarding`, `verify:analytics`, `verify:s01` à `verify:s05`, `verify:course-sidebar`, `verify:course-agent`, `verify:redesign` et `verify:cwv`. `verify:agent-map` contrôle que la carte `docs/agent-codebase-map.md` garde 5 zones maximum, que les commandes `npm run ...` documentées existent dans `package.json`, que les chemins critiques référencés existent encore, et que `CLAUDE.md` pointe vers la carte. `verify:unsafe-html` scanne les sources HTML/JS/JSX et refuse `insertAdjacentHTML`, `dangerouslySetInnerHTML` ou un `innerHTML` non vide sans commentaire proche `unsafe-html-allow`. Le bundle généré `onboarding/onboarding.bundle.js` est exclu : l'autorisation doit vivre dans la source JSX. `verify:localstorage` refuse toute clé non documentée, sauf lecture/migration de l'ancienne clé checkout. `verify:server-security` lance `_server.cjs` sur une racine temporaire et contrôle `SITE_ROOT`, le rejet de traversal et les messages d'erreur sans fuite de chemin.

Pour un chapitre de cours, ne pas appeler une page finie tant que les notes de sources/génération existent, que KaTeX ne déborde pas, que les corrections se révèlent, que les graphes exacts éventuels sont visibles, et que la sidebar passe en ouvert/replié/hover/focus/mobile.
Le pilote IA de cours est vérifié par `npm run verify:course-agent` : manifeste JSON valide, boutons reliés à des contextes existants, tiroir desktop/mobile, focus textarea, refus d'envoi vide, feedback texte sans HTML utilisateur, fermeture et absence d'overflow.
