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

scripts/    scripts Node, Playwright, extraction, vérification
```

Règles de décision :

- `pages/` : une seule page, DOM local, aucun besoin de réutilisation.
- `ui/` : comportement réutilisé sur au moins deux pages ou monté par contrat `data-*`.
- `domain/` : entrée objet, sortie objet, aucune dépendance à `document`, `window.localStorage`, au CSS ou au DOM.
- `state/` : persistance et actions métier locales. Le DOM doit rester dans `ui/` ou `pages/`.
- Pas de `utils.js` fourre-tout. Un helper partagé n'existe qu'à la troisième duplication claire.

Les anciens fichiers dans `scripts/` peuvent rester comme wrappers compatibles pendant la migration, mais les nouveaux scripts navigateur vont dans `assets/js/`.

## CSS

- CSS page dans `assets/css/pages/` quand la page dépasse environ 50 lignes spécifiques.
- `styles.css` garde les bases globales et les composants réellement partagés.
- `components.css` ne doit exister que si plusieurs pages répètent le même composant avec le même contrat HTML.
- Ne pas créer de système de design abstrait avant duplication réelle.

## Pricing et abonnement

Les prix, libellés de facturation, limites gratuites et états d'abonnement sont de la logique produit. Ils doivent être centralisés avant d'être réutilisés dans plusieurs pages.

État actuel :

- `assets/js/domain/pricing.js` expose les offres checkout.
- `scripts/checkout.js` garde seulement le câblage Payment Links Stripe.
- Le compteur d'essai gratuit vit dans le store `window.OutilPrepa`; son rendu est dans `assets/js/ui/free-trial-banner.js`.

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
- loader JSXGraph ;
- helpers de graphe seulement après duplication réelle.

À garder dans le chapitre :

- définitions, propriétés, méthodes, exemples et corrections ;
- choix pédagogiques et ordre de progression ;
- petites initialisations de graphe propres au chapitre.

## Vérification

Garde-fous principaux :

- `npm run verify`
- `npm run verify:course-sidebar`
- `node scripts/verify-course-sidebar.mjs <page-de-cours>`
- `git diff --check`

Pour un chapitre de cours, ne pas appeler une page finie tant que les notes de sources/génération existent, que KaTeX ne déborde pas, que les corrections se révèlent, que les graphes exacts éventuels sont visibles, et que la sidebar passe en ouvert/replié/hover/focus/mobile.
