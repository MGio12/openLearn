# Résolution audit parallèle - 2026-05-29

Cette matrice ferme le rapport `AUDIT-PARALLELE-OBJECTIF-LYCEE-2026-05-29.md` dans l'état courant du repo. Les statuts utilisés sont :

- `fixed-v1` : déjà couvert par la première tranche d'audit avant cette passe.
- `fixed-v2` : corrigé dans cette passe.
- `not-useful` : faux positif, déjà couvert autrement, ou contraire aux règles projet.
- `accepted-debt` : dette réelle mais volontairement reportée hors de cette passe.

## Vérifications de clôture v2

- Sécurité et données : `npm run verify:unsafe-html`, `npm run verify:localstorage`, `npm run verify:server-security`, `npm run verify:parent-share`.
- Parcours : `npm run verify:s01`, `npm run verify:s02`, `npm run verify:s03`, `npm run verify:s04`, `npm run verify:s05`.
- Onboarding : `npm run build:onboarding`, `npm run verify:onboarding`.
- Cours et responsive : `npm run verify:course-sidebar`, `npm run verify:redesign`, `npm run verify:cwv`.
- Global : `npm run validate:json`, `npm run verify:agent-map`, `npm run verify`, `git diff --check`.

## Matrice

| ID | Statut | Résolution | Vérification qui ferme |
|---|---|---|---|
| 1A-001 | fixed-v1 | Le store échoue déjà clairement si `OutilPrepaModel.todayISO` manque ; chemin actif migré en v2. | `npm run verify:s01` |
| 1A-002 | fixed-v2 | `SCHEMA_VERSION = 1` est documenté avec la clé `outilPrepa:v1` dans le modèle déplacé. | `npm run verify:s01`, `npm run verify:localstorage` |
| 1A-003 | accepted-debt | Le modèle reste volontairement en un seul fichier ; il est déplacé dans `assets/js/domain/model.js` sans split logique risqué. | `npm run verify:s01` |
| 1A-004 | not-useful | `freeMissionLimit` décrit l'état d'essai du store, pas les prix visibles checkout. `OPPricing` reste la source prix. | `npm run verify:s03` |
| 1A-005 | fixed-v2 | La clé checkout active devient `outilPrepa:stripe.checkoutUrl`; l'ancienne clé est seulement migrée en lecture. | `npm run verify:localstorage`, `npm run verify:s03` |
| 1A-006 | fixed-v2 | Le store actif vit maintenant dans `assets/js/state/store.js`; le README state a été mis à jour. | `npm run verify:agent-map` |
| 1B-001 | fixed-v2 | Migration store terminée côté pages racine : elles chargent `assets/js/state/store.js`. | `npm run verify:s01`, `npm run verify:s05` |
| 1B-002 | not-useful | Le store ne sélectionne pas le DOM ; il expose des abonnements que les islands UI consomment. | Revue code + `npm run verify:s01` |
| 1B-003 | fixed-v2 | Le modèle actif est déplacé dans `assets/js/domain/model.js`. | `npm run verify:s01`, `npm run verify:agent-map` |
| 1B-004 | not-useful | Deux globals nommés existent volontairement : `OutilPrepaModel` pour le modèle, `OPPricing` pour les prix checkout. | `npm run verify:s03` |
| 1B-005 | fixed-v1 | Les actions mission portent des index explicites et le verifier S01 les contrôle. | `npm run verify:s01` |
| 1C-001 | not-useful | Audit confirme que `index.html` n'est pas trop gros selon les règles projet. | Non applicable |
| 2A-001 | fixed-v2 | Les champs mission parent sont bornés par `createPayload()` et revalidés à l'encodage. | `npm run verify:parent-share` |
| 2A-002 | fixed-v2 | `cleanString()` retire `<` et `>` en défense en profondeur. | `npm run verify:parent-share` |
| 2A-003 | fixed-v1 | `parent.js` rend le payload avec `textContent`; la trust boundary est documentée. | `npm run verify:parent-share` |
| 2A-004 | fixed-v2 | Le verifier contrôle une whitelist stricte des clés racine, `mission`, et `offre`. | `npm run verify:parent-share` |
| 2A-005 | fixed-v2 | Les Payment Links sont validés avant usage et stockage ; seuls les domaines Stripe attendus passent. | `npm run verify:s03`, `npm run verify:localstorage` |
| 2A-006 | fixed-v2 | Le store `OutilPrepa` refuse d'écrire un payload localStorage trop gros et logue un warning. | `npm run verify:s01` |
| 2A-007 | fixed-v2 | `base64UrlEncode()` refuse les entrées non string. | `npm run verify:parent-share` |
| 2A-008 | fixed-v2 | `shortenedPayload()` repasse par `normalizePayload()` avant encodage. | `npm run verify:parent-share` |
| 2B-001 | fixed-v1 | L'autorisation `unsafe-html-allow` existe à la source JSX autour du SVG QR local. | `npm run verify:unsafe-html` |
| 2B-002 | fixed-v1 | Les révélations de cours utilisent des écritures DOM contrôlées ; pas d'entrée utilisateur rendue en HTML. | `npm run verify:unsafe-html`, `npm run verify:course-sidebar` |
| 2B-003 | not-useful | DOMPurify n'est pas ajouté : pas de HTML utilisateur accepté aujourd'hui et pas de nouvelle dépendance sans besoin. | Revue code + `npm run verify:unsafe-html` |
| 2B-004 | not-useful | Pas de nouveau contrat IA utilisateur dans cette passe ; la règle courante reste `textContent`, pas HTML riche. | `npm run verify:unsafe-html` |
| 2B-005 | accepted-debt | Le filtrage KaTeX d'entrées utilisateur appartient à la future tranche IA, absente du produit actuel. | Non applicable aujourd'hui |
| 2B-006 | accepted-debt | Les futurs champs IA seront traités dans une tranche dédiée ; aucun champ IA actif ne rend du HTML utilisateur. | Non applicable aujourd'hui |
| 2B-007 | fixed-v1 | Le bundle généré reste ignoré ; la source JSX est scannée et porte le commentaire d'autorisation. | `npm run verify:unsafe-html` |
| 2B-008 | fixed-v2 | La validation parent est fermée par whitelist et usage `textContent`; `cleanString()` n'est pas présenté comme sanitizer HTML général. | `npm run verify:parent-share` |
| 2C-001 | fixed-v1 | `verify:unsafe-html` scanne les sources `.jsx` et ignore seulement le bundle généré. | `npm run verify:unsafe-html` |
| 2C-002 | fixed-v1 | Le test de traversal doublement encodé existe dans `verify-server-security`. | `npm run verify:server-security` |
| 2C-003 | fixed-v2 | Le payload parent est contrôlé par whitelist de clés, plus seulement par blacklist de valeurs sensibles. | `npm run verify:parent-share` |
| 2C-004 | fixed-v1 | Le verifier parent contrôle la longueur des URLs longues. | `npm run verify:parent-share` |
| 2C-005 | not-useful | Pas de hook pré-commit ajouté : `CLAUDE.md` garde une vérification agent explicite plutôt qu'un hook fragile. | `npm run verify` |
| 2C-006 | not-useful | `_server.cjs` est un serveur local dev/test, pas un backend produit exposé. | `npm run verify:server-security` |
| 2C-007 | fixed-v2 | `verify:unsafe-html` a des auto-tests pour les chaînes vides double quote, simple quote, template literal et les cas non vides. | `npm run verify:unsafe-html` |
| 2C-008 | fixed-v2 | Ajout de `scripts/verify-localstorage-keys.mjs` et `npm run verify:localstorage`. | `npm run verify:localstorage` |
| 3A-001 | fixed-v2 | `data-contract="daily-mission"` est remplacé par `data-daily-mission-container`. | `npm run verify:s01`, `npm run verify:s05` |
| 3A-002 | fixed-v1 | Les `[data-mission-action]` portent déjà `data-mission-step`. | `npm run verify:s01` |
| 3A-003 | fixed-v2 | `mission-ui.js` câble `[data-lockable-mission-cta]` selon `OutilPrepa.isLocked()`. | `npm run verify:s01` |
| 3A-004 | fixed-v1 | `planning.js` garde des guards sur les cibles DOM optionnelles. | `npm run verify:s02` |
| 3A-005 | not-useful | `progression.html` garde son contrat `data-grade-*` documenté ; pas de refactor demandé. | `npm run verify:s05` |
| 3A-006 | fixed-v1 | `dashboard-extras.js` câble le panneau "Pourquoi cette mission ?". | `npm run verify:s01` |
| 3A-007 | fixed-v2 | `data-when` est documenté comme contrat visuel seulement. | `npm run verify:agent-map` |
| 3A-008 | fixed-v1 | `scripts/user-context-ui.js` hydrate déjà `data-user-greeting` et `data-today-subtitle`. | `npm run verify:s01` |
| 3B-001 | fixed-v2 | Le câblage Payment Link est fusionné dans `assets/js/pages/checkout.js`; `scripts/checkout.js` est supprimé. | `npm run verify:s03` |
| 3B-002 | fixed-v2 | Le sticky CTA mobile est visible, top-clickable et synchronisé avec l'état checkout. | `npm run verify:s03` |
| 3B-003 | fixed-v1 | Tous les boutons checkout démarrent en `data-checkout-state="needs-config"`. | `npm run verify:s03` |
| 3B-004 | not-useful | Le CTA parent arrive après le récap parent ; ce n'est pas un paywall avant preuve de valeur. | `npm run verify:parent-share` |
| 3B-005 | fixed-v1 | `free-trial-banner.js` sort si `OutilPrepa` est absent. | Revue code |
| 3B-006 | fixed-v2 | Les libellés de prix visibles checkout sont hydratés depuis `window.OPPricing`. | `npm run verify:s03` |
| 3B-007 | not-useful | Conformité déjà acquise : pas de promesse commerciale visible `20/20` sur checkout. | Revue code |
| 3C-001 | fixed-v2 | Les conteneurs cours/formules sont bornés à `max-width: 100%`. | `npm run verify:course-sidebar` |
| 3C-002 | fixed-v2 | Le verifier cours contrôle désormais tous les prototypes par défaut, avec checks stricts pour `second-degre`. | `npm run verify:course-sidebar` |
| 3C-003 | fixed-v2 | `.main` et `.view` ont `min-width: 0`. | `npm run verify:s01`, `npm run verify:s05` |
| 3C-004 | fixed-v2 | `.check-card` est bornée à `max-width: 100%`. | `npm run verify:course-sidebar` |
| 3C-005 | fixed-v1 | La flèche de rail est déjà contrôlée par le verifier sidebar. | `npm run verify:course-sidebar` |
| 3C-006 | fixed-v1 | `.cta:focus-visible` existe déjà dans `assets/css/pages/checkout.css`. | `npm run verify:s04` |
| 3C-007 | not-useful | `index.html` n'est pas une page de cours et ne doit pas porter `data-course-layout`. | Non applicable |
| 3C-008 | not-useful | La duplication CSS cours/app est volontaire : les cours ont un système visuel partagé séparé. | `npm run verify:agent-map` |
| 3C-009 | not-useful | Contraste checkout déjà conforme selon l'audit. | Non applicable |
| 4A-001 | fixed-v2 | `npm run verify` inclut parent-share, onboarding et course-sidebar. | `npm run verify` |
| 4A-002 | fixed-v2 | `npm run verify` inclut `verify:redesign`. | `npm run verify` |
| 4A-003 | fixed-v2 | La carte agent documente les commandes ajoutées, dont analytics/localstorage/redesign. | `npm run verify:agent-map` |
| 4A-004 | not-useful | Les scripts Node qui jettent une erreur sortent déjà en code non nul avec message exploitable. | `npm run verify:s01` |
| 4A-005 | accepted-debt | La factorisation des helpers Playwright n'est pas nécessaire pour fermer les risques produit. | Non applicable aujourd'hui |
| 4B-001 | fixed-v2 | Le sélecteur mission standard est `data-daily-mission-container`; les fallbacks restent limités aux anciennes formes tolérées. | `npm run verify:s01` |
| 4B-002 | accepted-debt | L'élargissement des patterns de copy backend est une amélioration future, pas un bug restant. | `npm run verify:s03` |
| 4B-003 | accepted-debt | L'audit focus global CSS peut être élargi plus tard ; le checkout a déjà son focus visible. | `npm run verify:s04` |
| 4B-004 | accepted-debt | Les routes merci restent contractuelles et limitées ; pas de nouvelle route à découvrir dynamiquement. | `npm run verify:s05` |
| 4B-005 | fixed-v1 | Les verifiers Playwright ont déjà des messages clairs si Chromium ne se lance pas. | Vérifications Playwright |
| 4B-006 | not-useful | Les budgets CWV différenciés cours/autres pages sont explicitement utiles. | `npm run verify:cwv` |
| 4B-007 | accepted-debt | Paralléliser Chromium relève de CI/perf, pas de la correction produit. | Non applicable aujourd'hui |
| 5A-010 | fixed-v2 | Le contournement `showCommitmentRecap` est supprimé ; le récap est obligatoire avant paywall. | `npm run build:onboarding`, `npm run verify:onboarding` |
| 5A-011 | fixed-v2 | Le script QR local est préchargé, mais reste chargé effectivement au clic. | `npm run verify:onboarding`, `npm run verify:parent-share` |
| 5A-012 | fixed-v1 | `storageWarningShown` est déjà singleton. | Revue code |
| 5B-014 | fixed-v2 | `.course-lesson`, `.formula-card`, `.check-card` et `.katex-display` sont bornés sans scroll horizontal formule. | `npm run verify:course-sidebar` |
| 5B-015 | fixed-v1 | Le prototype `second-degre` porte déjà le meta viewport. | `npm run verify:course-sidebar` |
| 5B-016 | not-useful | Les piles `font-family` ont déjà des fallbacks ; `@font-face` ne remplace pas une police système. | Revue CSS |

## Dette acceptée à reprendre plus tard

- Split logique fin du modèle métier (`1A-003`) seulement si les responsabilités deviennent modifiées séparément.
- Contrats de futurs blocs IA utilisateur (`2B-005`, `2B-006`) au moment où le produit accepte vraiment des réponses élève traitées par IA.
- Mutualisation des helpers Playwright et parallélisation CI (`4A-005`, `4B-007`) si le temps de `npm run verify` devient bloquant.
