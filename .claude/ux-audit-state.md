# UX Audit — Ralph Loop State

Boucle Ralph itérative pour auditer le funnel et améliorer rétention/hiérarchie/scroll.

## Protocole par itération

1. Lire ce fichier → trouver `→ NEXT:` pour savoir quelle page auditer.
2. Démarrer dev server local sur :5500 (déjà actif normalement).
3. Naviguer Chrome à `http://localhost:5500/<page>` en viewport **1440×900**.
4. Capturer:
   - Above-the-fold (viewport visible)
   - Full page scrollable
5. Identifier **UNE seule** amélioration prioritaire, classée par impact:
   - **P0** Above-the-fold ne montre pas la valeur ou le CTA principal
   - **P1** Hiérarchie visuelle confuse (le regard ne suit pas la promesse → preuve → action)
   - **P2** Densité — info importante hors viewport sans signal de scroll
   - **P3** AI slop / cosmétique
6. Implémenter en éditant le HTML/CSS de la page concernée (pas de refacto large).
7. Re-screenshot pour vérifier (compare before/after dans `screenshots/ralph-audit/<page>/`).
8. Commit atomique : `ux(<page>): <one-line summary>`.
9. Mettre à jour ce fichier : déplacer la page vers `## Done`, set `→ NEXT:` sur la suivante.

## Critères "amélioration valable"
- Réduit le scroll nécessaire pour comprendre la valeur, OU
- Clarifie la prochaine action (CTA primaire visible & contrasté), OU
- Élimine friction (texte trop long, choix paradoxal, double demande), OU
- Renforce hiérarchie (1 promesse, 1 preuve, 1 CTA dans la fold).

## File d'attente (funnel order)

**Pass 2** — angle : copy clarity (mots flous, redondances, jargons), interactions (hover/active/disabled states, feedback animation, micro-copy de bouton).

- [x] index.html (pass 2) — Stat "Reste de la semaine 18/24" sans unité (h ? missions ? jours ?) → label renommé "Missions de la semaine" pour rendre l'unité implicite. Delta resserré ("Le reste est en soutien"). Atomique, copy-only.
- [x] onboarding.html (pass 2) — Tightening lede step 4 "Quel rythme" : suppression de "réellement" et "en moyenne" (mots filler). Tentative de retrait des `<br>` codés en dur reverté : `text-wrap: balance` cassait "VEUX-TU" au trait d'union. Les `<br>` éditoriaux sont volontaires et bien placés, on les garde. **Apprentissage à appliquer aux passes suivantes** : ne pas toucher les line-breaks manuels sur la voix éditoriale française (mots composés avec trait d'union créent des cassures inattendues avec balance).
- [x] focus.html (pass 2) — **Vrai bug d'interaction** : `.subtask` du panel droit étaient cliquables (JS toggle `.done` sur clic) mais `cursor: auto` — aucun signal visuel d'interactivité. Ajout de `cursor: pointer`, `padding+margin` négatif pour zone cliquable confortable, `:hover { background: rgba(paper, 0.06) }` pour feedback subtil, et transition sur la checkbox border-color au survol. Affordance maintenant claire pendant la session de focus.
- [x] mission.html (pass 2) — Meta row label "TA MAÎTRISE ACTUELLE" (20 chars) → "MAÎTRISE" (8 chars). Deux redondances supprimées : "Ta" (toute l'UI est déjà en direct address) et "actuelle" (implicite — la valeur affichée est forcément celle du moment). Plus dense visuellement, plus rapide à scanner.
- [x] objectif.html (pass 2) — Espace manquant dans "8sem." (3e stat card, AVANT PARCOURSUP) — la valeur "8" était collée à son unité "sem." sans séparation. Ajout de `margin-left: 6px` sur le span de l'unité. Typographie française standard pour les nombres + unités abrégées (vs "12h45" où l'absence d'espace est correcte pour les heures).
- [x] progression.html (pass 2) — Subtitle "Plante **une** première mission..." → "Plante **ta** première mission..." (le subtitle + le fallback JS dans le `data-garden-status`). Direct address (tutoiement) cohérent avec le reste de l'UI ("ton avance", "ton jardin", "ta première étape"). "Une" sonne neutre/froid dans un contexte qui parle au lycéen directement.
- [x] checkout.html (pass 2) — Lede resserrée. Avant : "...Si le cockpit t'aide **vraiment** à travailler plus juste, garde le **plan quotidien personnalisé qui te le fait tenir** — pour 10€/mois." Trois problèmes : "vraiment" filler, "quotidien personnalisé" redondant, et "qui te le fait tenir" avec un référent pronominal flou ("le" pour quoi ?). Après : "...Si le cockpit t'aide à travailler plus juste, garde ton plan personnalisé — 10€/mois." Plus direct, le pronom flou est éliminé.
- [x] merci.html (pass 2) — Item 3 de "Prochaines étapes" disait "Dès la mise en ligne, tu recevras un email pour activer ton accès" — **contradiction directe** avec l'item 2 ("Explore le cockpit dès maintenant") et le ton général de la page (paiement confirmé, cockpit actif). Reste de copy pré-launch oubliée. Remplacé par "Reviens demain — ta prochaine mission sera prête, calibrée sur ce que tu viens de faire." → boucle d'habitude amorcée, séquence (immédiat → maintenant → demain) cohérente.

## Pass 2 — funnel complet

## File d'attente (funnel order) — Pass 3

**Pass 3** — angle : accessibilité (focus-visible, aria-labels), cohérence cross-page (composants partagés divergents), états edge (empty, error, disabled).

- [x] index.html (pass 3) — Topbar icon-btns (IA + Notifications) étaient des `<div>` avec `title=` uniquement. `title` n'est pas annoncé fiablement par les lecteurs d'écran, et les `<div>` ne sont pas focusables au clavier. Conversion en `<button type="button" aria-label="...">` proprement : focusables Tab, annoncés correctement ("Demander à l'IA", "Notifications, 2 nouvelles"). Badge "2" passé en `aria-hidden` (déjà dans le label). CSS reset minimal (padding 0, color/font inherit) pour neutraliser les defaults `<button>` du navigateur.
- [x] onboarding.html (pass 3) — Options `.opt` n'avaient **aucun `:focus-visible`** : un utilisateur clavier qui tab à travers les 5 choix d'écoles perd visuellement où il est. Ajout d'un focus ring 3px solid stabilo avec outline-offset 3px (assez espacé pour être lisible). Cas spécial `.opt.selected:focus-visible` : outline en ink (noir) au lieu de stabilo pour rester visible sur le fond jaune.
- [x] focus.html (pass 3) — Ambient picker (Lofi/Pluie/Café/Silence) était une grille de `<div>` non-focusables, non-annoncés. Conversion en pattern WAI-ARIA radiogroup proprement : wrapper `role="radiogroup"` + `aria-label="Ambiance sonore"`, chaque option `<button role="radio" aria-checked="...">`. JS mis à jour pour toggler `aria-checked` en plus de la classe `.active`. Ajout `:focus-visible` outline stabilo + reset button defaults (color/font inherit, text-align, width 100%). Screen readers annoncent maintenant "Ambiance sonore radiogroup, Lofi 1 sur 4".
- [x] mission.html (pass 3) — Bonne surprise : `.checklist .item` ont déjà `role="checkbox"` + `tabindex="0"` + `aria-checked` (déjà accessibles). Mais topbar icon-btns toujours `<div>` sans aria — fix propagé depuis iter 17 (index). Conversion en `<button type="button" aria-label="..."` + svg `aria-hidden`. Pattern à propager systématiquement sur les autres pages dashboard.
- [x] objectif.html (pass 3) — Filter chips (Maths spé / Physique-chimie / Dossier / Expression) — pattern de navigation principal de la page mais c'étaient des `<span>` sans clavier ni aria. Conversion JS : crée des `<button type="button" aria-pressed="...">` au lieu de spans, wrapper `role="group" aria-label="Filtre par matière"`. Click handler toggle `aria-pressed` en plus de `.active`. État "données en cours" utilise `disabled` au lieu du hack `pointer-events:none`. CSS : reset button defaults, `:focus-visible` outline stabilo. Noté pour la suite : topbar icon-btn, heatmap cells, topic rows tous encore non-accessibles.
- [x] progression.html (pass 3) — Topbar icon-btn fix propagé : `<div title=...>` → `<button type="button" aria-label="...">`. Pattern maintenant cohérent sur index/mission/progression/objectif (objectif a aussi été fixé en iter 21 indirectement via la conversion des filter chips, mais ses icon-btn restent à faire — vérifier). Reste sur progression : history days (LUN/MAR/MER... DIM) sans aria-label, "DIM 17" est aujourd'hui mais ne l'annonce pas. Note pour itération future.
- [x] checkout.html (pass 3) — 8 SVGs décoratifs (lock chip Stripe, checkmarks "ce qu'on ne te vend pas", icônes trust-row) sans `aria-hidden` → lecteur d'écran tente de les annoncer. Ajout systématique : 8/8 maintenant marqués `aria-hidden="true"`. CTA arrow était déjà bien wrappé en `<span aria-hidden>` (vérifié, rien à faire). Note : `meta name="stripe-checkout-url"` pointe vers une URL Stripe `test_` — à vérifier avec le user si c'est intentionnel ou si la prod l'attendrait en live.
- [x] merci.html (pass 3) — Badge décoratif "OK" (`.success-mark`) n'avait pas `aria-hidden` → lecteur d'écran annonçait "OK" avant l'H1 "Paiement confirmé", redondance pure. Le tape-label "PAIEMENT REÇU" était déjà bien `aria-hidden`. Ajout `aria-hidden="true"` sur le `.success-mark`. Vérification : la séquence annoncée est maintenant H1 → P → study-note, sans bruit décoratif.

## Pass 3 — funnel complet

## File d'attente (funnel order) — Pass 4

**Pass 4** — angle : AI tells (formulations templatées, mots de remplissage banals "vraiment", "simplement"), brand voice française cohérente, claims vagues ou pompeux.

- [x] index.html (pass 4) — AI tell flagrant : "**ajustée depuis ton état utilisateur**" — formulation translation-y typique ("user state" mot-à-mot). Aucun lycéen ne dit "état utilisateur". Remplacé par "ajustée à ta progression" (français natif). 3 occurrences fixées : index.html static, objectif.html static, et user-context-ui.js dynamique. Objectif page : "Impact dossier · état utilisateur · ..." → "Impact dossier · ta progression · ...".
- [x] onboarding.html (pass 4) — Deux ledes assainies. Step 2 : "si tu construis ton dossier ou si Parcoursup arrive déjà" (formulation forcée, "arrive déjà" sonne mécanique) → "Le calendrier change selon ta classe : construire ton dossier ou attaquer Parcoursup". Step 3 : "matières qui comptent vraiment dans le dossier" → "matières qui pèsent dans le dossier" (drop filler "vraiment" + verbe plus précis "pèsent").
- [x] focus.html (pass 4) — Deux `completionSummary` dans `scripts/model.js` avec templated "garde une trace de plus" / "garde une trace réelle". "Trace + adjectif vague" = AI tell typique. Remplacés par : (1) "Ta mission avance, ton dossier s'épaissit." (utilise la métaphore dossier déjà présente sur le site) ; (2) "Mission terminée, ta progression suit." (verbe simple, concret).
- [x] mission.html (pass 4) — Study-note "À garder : une correction propre aujourd'hui devient **une preuve de régularité demain**" — template AI motivationnel (X aujourd'hui → Y demain) + claim vague "preuve de régularité". Remplacé par un argument concret : "ce que tu corriges propre aujourd'hui ne sera pas à refaire avant le contrôle" — promesse mesurable, ancrée dans le réel scolaire (vendredi = contrôle).
- [x] objectif.html (pass 4) — 2 derniers "vraiment" filler sur le site nettoyés. (1) objectif analyse stratégique : "Trois leviers **changent vraiment** ton dossier" → "Trois leviers **font bouger** ton dossier" (verbe plus actif, cohérent avec "font bouger les notes" déjà sur la même page). (2) checkout compare paragraph : "chapitres qui **comptent vraiment** pour tes notes" → "chapitres qui **pèsent** sur tes notes" (verbe précis). Site entier maintenant à 0 occurrence de "vraiment".
- [x] progression.html (pass 4) — Slideover objective copy "73% des **priorités utiles** au dossier sont déjà travaillées" — "priorités utiles" est tautologique (toute priorité est utile par définition), c'est un hedge AI typique. Remplacé par "73% des **chapitres prioritaires pour ton dossier** sont déjà travaillés" — unité concrète (chapitres) + direct address (ton). La page principale est globalement très propre niveau voice (le "pas avec du scroll" est même une voix de marque distinctive, à garder).
- [x] checkout.html (pass 4) — H2 "UNE **TRANSACTION BASÉE SUR** L'HONNÊTETÉ" — vocabulaire corporate/AI en désaccord avec le ton anti-corporate du reste de la page ("On ne te vend pas", "On te donne", "Le travail c'est toi"). Remplacé par "ON NE PROMET QUE CE QU'ON SAIT TENIR" — anaphorique avec le "On" qui rythme la section suivante ("On ne te promet pas une mention. On ne te promet pas d'être à l'X..."). Voice maintenant cohérente sur les 4 H2 de la page.
- [x] merci.html (pass 4) — Study-note disait "Ton plan reste centré sur **une chose**" puis énumérait **trois actions** — incohérence du compteur classique de l'AI ("the key thing is X, Y, and Z"). Remplacé par "Ton plan tient en **trois gestes** : ouvrir le cockpit, finir la bonne mission, voir ton dossier avancer." Le compteur matche maintenant les éléments listés. "Gestes" plus organique que "actions" pour la voix du site.

## Pass 4 — funnel complet

## File d'attente (funnel order) — Pass 5

**Pass 5** — angle : runtime correctness (console errors, network 404, JS broken handlers, interactions qui n'aboutissent pas, états transients mal gérés).

- [x] index.html (pass 5) — 3 items sidebar dead-clicks (Fiches, Contrôles, Préférences) qui apparaissaient interactifs (cursor:pointer, hover) mais ne faisaient **rien** au clic. Mensonge UI classique de l'app pre-launch. Ajout d'un pattern `.sb-item.is-soon` avec `cursor: not-allowed`, couleur dimmed, hover background neutralisé, et une pill "bientôt" à droite. Plus `aria-disabled="true"`. Console + network propres (0 erreur, 0 404), donc le seul bug runtime trouvé sur cette page était ces 3 fake-links.

Note pour pass suivantes : à propager sur mission/objectif/progression/focus qui dupliquent la même sidebar avec les mêmes dead items.
- [x] onboarding.html (pass 5) — **2 bugs runtime combinés** sur le step 7 (email). (1) input pas `required`, l'onboarding pouvait se terminer **sans email** alors que la lede promet "On sauvegarde ta progression". (2) handler `finish` faisait un `return` silencieux si format invalide — bouton qui semble cassé. Fix : `required` + `aria-describedby` sur l'input, handler revu pour montrer un état visuel (`is-invalid` + border rouge + bg pâle), un `<span role="alert">` qui apparaît avec le message, focus auto sur l'input, et un listener `input` qui efface l'erreur dès que l'utilisateur tape un email valide. Console + network propres sur le reste de la page. Flow step 1→2 et back testés OK.
- [x] focus.html (pass 5) — Espace + Échap shortcuts confirmés câblés (testés au clavier, fonctionnent). **Bug runtime** : boutons "Pomodoro précédent" / "Pomodoro suivant" présents en JSX mais **aucun handler dans focus.js** — clic silencieux. Marqués `disabled` + `aria-label` revus ("bientôt disponible"). CSS : `.fx-ctl:disabled` opacity 0.35 + cursor not-allowed + hover désactivé. `.fx-ctl:focus-visible` outline stabilo. Le play/pause central reste vibrant pour bien distinguer le control actif des inactifs.
- [x] mission.html (pass 5) — Console + network propres. Checklist `.item` toggle confirmé fonctionnel (le rôle a11y `checkbox` ajouté par le user/linter en plus). Dead sidebar items "Fiches" + "Contrôles" propagation du fix iter 33 : `is-soon` class + pill "bientôt" + `aria-disabled`.
- [x] objectif.html (pass 5) — Console + network propres. **Propagation** : sidebar Fiches/Contrôles marqués `is-soon`. **Découverte non corrigée (future iter)** : `.hm-cell` heatmap a cursor:pointer mais ne fait que tooltip natif (title attr) — pas de handler clic. `.topic-row` aussi cursor:pointer mais clic mort. Curseur mensonger sur tout le grid central. À traiter dans une itération dédiée pour ne pas mélanger 2 fix.
- [x] progression.html (pass 5) — Console + network propres. Slideover "Détails par matière →" trigger confirmé fonctionnel (passe de hidden→visible au clic). Propagation `is-soon` sur 3 dead items : Fiches, Contrôles, Préférences (cette page a aussi le groupe Réglages avec Préférences, contrairement à mission/objectif).
- [x] checkout.html (pass 5) — Console + network propres. 3 CTAs Stripe pointent toutes la même URL **test_** (déjà flaggé iter 23, à vérifier avant prod). **Bug nav** : lien "Comment ça marche" en topbar pointait vers `index.html` (le dashboard) au lieu d'anchor sur la section features de la même page. Trompeur — l'utilisateur ne s'attend pas à quitter la page checkout. Fix : ajout `id="comment-ca-marche"` sur la section `<section class="block">` qui contient le H2 "Quatre outils, un seul fil rouge", et lien nav passe en `href="#comment-ca-marche"`. Scroll smooth fonctionnel.
- [x] merci.html (pass 5) — Console + network propres, 3 liens internes valides. **Bug claim sans action** : receipt-note disait "Annulable à tout moment **depuis le portail Stripe**" mais aucun lien vers ledit portail nulle part sur la page. Le portail customer Stripe nécessite un URL spécifique ou un lien magique par email. Plus honnête : rephrasé pour pointer vers le canal réel — "le lien « Gérer mon abonnement » dans n'importe quel email Stripe". Tout email Stripe (reçu, change de carte, etc.) contient ce lien.

## Pass 5 — funnel complet

## File d'attente (funnel order) — Pass 6

**Pass 6** — angle : **responsive mobile** (jamais testé sur 40 itérations, le user a explicitement mentionné les lycéens cible probable mobile). Viewport iPhone 13 : 390×844.

- [x] index.html (pass 6) — **Bug critique mobile** : à <=640px la sidebar + topbar passent en `display: none` mais **rien ne les remplace** — le user mobile est piégé sur la page courante, aucune navigation possible. Ajout d'une `<nav class="mobile-tabs" aria-label>` avec 4 destinations clés (Aujourd'hui · Progression · Objectif · Focus), position fixed bottom, padding safe-area-inset-bottom, `:focus-visible` stabilo. `.view { padding-bottom: 80px }` pour éviter le contenu masqué par les tabs. **À propager sur les 4 autres pages dashboard** (mission, objectif, progression, focus) — markup et CSS sont déjà dans styles.css.
- [x] onboarding.html (pass 6) — Sur 390×844 : H1 step 1 faisait 4 lignes/150px à 36px, première option à y=474. Réduction mobile h1 36→28px : 4→3 lignes, hauteur 87px, première option à y=411 (-63px). 3 options entières visibles + 4e partielle (vs 3 avant). Garde le `<br>` éditorial (sinon balance casse "VEUX-TU" au trait d'union, déjà vérifié iter 26). Ajout `padding-bottom: 64px` sur `.ob-stage` pour ne pas que les dots fixes en bas masquent la dernière option.
- [x] focus.html (pass 6) — Footer mobile affichait "Espace Pause / Échap Quitter" — raccourcis inutilisables sans clavier physique. Bruit pour les utilisateurs mobile. `@media (max-width: 640px) { .fx-bottom-group:last-child { display: none } }` masque uniquement le groupe raccourcis. Le 1er groupe ("Notifications coupées / Sites distrayants bloqués") reste affiché — info pertinente sur mobile aussi. Layout flex passe en `justify-content: center` pour bien centrer le groupe restant.
- [x] mission.html (pass 6) — Propagation `mobile-tabs` (CSS déjà global dans `styles.css`, copie du `<nav>` markup avant `</body>`). Mission étant une sous-page du cockpit, l'onglet "Aujourd'hui" est `is-active` + `aria-current="page"`. Le user mobile peut maintenant naviguer vers Progression/Objectif/Focus sans être piégé.
- [x] objectif.html (pass 6) — Propagation `mobile-tabs` avec "Objectif" comme tab active (`is-active` + `aria-current="page"`). Pattern maintenant cohérent sur 3/5 pages dashboard (index, mission, objectif). Reste : progression, focus.
- [x] progression.html (pass 6) — Propagation `mobile-tabs` avec "Progression" `is-active`. 4/5 pages dashboard. Reste : focus (qui n'a pas le shell sidebar/topbar, donc le mobile-tab y est probablement déjà cohérent vu son layout particulier).
- [x] checkout.html (pass 6) — Sur mobile, sticky CTA fonctionne bien (visible bas de fold). **Bug** : un second lien "Voir comment ça marche" (`.nav-link--final`) en bas de page pointait `href="index.html"` au lieu du même anchor `#comment-ca-marche` fixé en iter 39. Désormais cohérent. Bonus mobile : le top-nav "Comment ça marche" est `display:none` sur mobile (CSS existant) — mais ce second lien "Voir comment ça marche" reste visible et remplit ce rôle.
- [x] merci.html (pass 6) — Layout mobile globalement propre (success-main + aside stackés vertical via media query existante). **Polish thumb-target** : `.success-actions` passe en `flex-direction: column` sur ≤640px, CTA primaire `op-btn--dark` devient `width: 100%` avec padding vertical 14px (tap-target ~285×52, largement >44×44 WCAG). Les liens texte ghost passent en `align-self: flex-start` pour rester left-aligned et lisibles. Plus de wrap chaotique des CTAs.

## Pass 6 — funnel complet

## File d'attente (funnel order) — Pass 7

**Pass 7** — angle : **performance / payload** (poids assets, total bytes, font/CSS bloat, render-blocking, cache headers).

- [x] index.html (pass 7) — **Bug perf cross-page** : colors_and_type.css avait un `@import url('https://fonts.googleapis.com/...')` pour JetBrains Mono, ligne 39, render-blocking sur chaque page. Mais Mono n'est utilisé que sur focus/progression/onboarding (stats numériques + slideover + preview durations). Sur index/mission/objectif/checkout/merci c'était un round-trip Google pour rien. Fix : `@import` supprimé de colors_and_type.css, et `<link rel="preconnect"> + <link rel="stylesheet">` ajoutés en `<head>` uniquement sur focus/progression/onboarding. Vérifié : 0 requête Google Fonts sur index, 1 (Mono) sur focus. Local fonts ont déjà `font-display: swap` (rien à fixer là).
- [x] onboarding.html (pass 7) — `onboarding.css` ligne 2 faisait `@import url('../../../colors_and_type.css')` → chaîne séquentielle HTML→onboarding.css→colors_and_type.css. Fix : `<link rel="stylesheet" href="colors_and_type.css">` ajouté en head AVANT le link page-specific, + `@import` supprimé. Les 2 CSS partent en parallèle (startTime identique à ~11-14ms). À propager sur styles.css et focus.css (mêmes pattern d'@import).
- [x] focus.html (pass 7) — Propagation du fix waterfall : `@import` retiré de focus.css, `<link colors_and_type.css>` ajouté en head avant focus.css. CSS parallèles vérifiés (startTime 9ms et 10ms).
- [x] mission.html (pass 7) — Fix `@import` waterfall sur styles.css (utilisé par 5 pages : index, mission, objectif, progression, merci). `@import` retiré + `<link colors_and_type.css>` ajouté en head AVANT styles.css sur les 5 pages. Vérifié sur mission : 3 CSS (colors_and_type, styles, mission.css) partent simultanément à startTime 13ms — au lieu de la chaîne HTML→styles.css→colors_and_type.css. Avec iter 50 (onboarding) et iter 51 (focus), TOUT le site a maintenant un loading parallèle propre.
- [x] objectif.html (pass 7) — 4 scripts classic sync (model.js, state.js, user-context-ui.js, mission-ui.js) bloquaient le parser HTML pendant leur exécution. Ajout de `defer` sur les 4 → ils téléchargent en parallèle + s'exécutent en ordre APRÈS le parsing HTML. Ordre relatif inchangé (le `<script type="module">` inline garde son comportement deferred par défaut). DOMContentLoaded plus tôt = FCP plus rapide. Console clean + filter bar + heatmap (24 cells) + hero stat tous validés. Pattern à propager sur autres pages dashboard.
- [x] progression.html (pass 7) — Propagation `defer` sur les 4 scripts classiques. L'inline `<script>` qui suit dépend de `window.OutilPrepa` mais se self-defers déjà via `if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init)`. Vérifié : stage "GRAINE", garden card, 3 stats, OutilPrepa défini, console clean.
- [x] checkout.html (pass 7) — Ajout `defer` sur `scripts/demo-fixtures.js` + `scripts/checkout.js`. CTA + marquee + console clean. **Future opportunité notée** : Caveat-VariableFont 394KB téléchargé pour ~50 chars de stamps/signature (priorité #1, tous les jours, etc.). Subsetting ou remplacement = gros gain perf, mais multi-iter dédié.
- [x] merci.html (pass 7) — Déjà très léger (3KB CSS, 0 scripts). Mais l'utilisateur converti va systématiquement cliquer "Ouvrir mon cockpit" → ajout `<link rel="prefetch" href="index.html">` pour pré-charger la prochaine page en idle. Vérifié : index.html fetché à 13ms, page-suivante instantanée au clic. Caveat font 394KB téléchargé mais aucun élément ne l'utilise sur cette page (cache hit). Géré par le navigateur, OK pour maintenant.

## Pass 7 — funnel complet

## File d'attente (funnel order) — Pass 8

**Pass 8** — angle : **HTML metadata** (meta description, theme-color pour browser-chrome mobile, favicon, OG tags pour pages publiques). Diminishing returns mais pertinent pour SEO/social.

- [x] index.html (pass 8) — 0 meta tag utile au-delà du viewport (pas de description, pas de favicon, pas de theme-color). Ajout : (1) `<meta name="description">` cohérente avec la voix de la page ("Ton cockpit du jour : une mission claire... Pas de scroll infini") ; (2) `<meta name="theme-color" content="#F4D35E">` pour matcher la chrome mobile au stabilo jaune ; (3) favicon SVG inline data-URI qui reproduit la mark de la sidebar (carré stabilo, border ink, lettre O rotation -6°). Aucun fichier nouveau, pas de requête supplémentaire. **À propager sur les 7 autres pages.**
- [x] onboarding.html (pass 8) — Propagation favicon SVG + theme-color stabilo. Description page-specific : "2 minutes pour caler ton cockpit : objectif, classe, spécialités, rythme. 3 missions offertes pour démarrer." — reflète l'angle de conversion (durée + gratuité).
- [x] focus.html (pass 8) — Propagation metadata avec **variante page-specific** : `theme-color: #121212` (ink) au lieu de stabilo car le fond focus est dark — la chrome mobile colle au design immersif. Favicon SVG identique (cohérence brand). Description : "25 min de focus, une mission, zéro distraction. Notifications coupées, sites distrayants bloqués." (matche les status indicators de la page).
- [x] mission.html (pass 8) — Propagation metadata. Description : "La mission du jour : court, ciblé, ancré sur ce qui pèse pour ton dossier et ton prochain contrôle." (reprend les piliers déjà présents dans `.why` + study-note de la page : court/utile, dossier, contrôle).
- [x] objectif.html (pass 8) — Propagation metadata. Description : "Carte d'impact de ton dossier : leviers prioritaires, chapitres qui pèsent, échéance Parcoursup. Pas d'intuition, des données." (matche les 3 stats hero + le feature copy "Pas par intuition, pas par ordre du manuel" du checkout).
- [x] progression.html (pass 8) — Page avait déjà une `meta description` (la seule du site jusqu'ici, brand voice : "pousse jour après jour... pas avec du scroll"). Ajout theme-color stabilo + favicon SVG pour aligner avec les autres pages.
- [x] checkout.html (pass 8) — Page la plus shareable du funnel. Description existait déjà. Ajout (1) theme-color stabilo + favicon SVG ; (2) **OG/Twitter card complets** : og:title ("un cockpit pour travailler le bon chapitre, pas tout le programme"), og:description (cockpit prépa-Parcoursup + 3 missions offertes + 10€/mois), og:type=website, og:locale=fr_FR, og:site_name. Twitter card summary. Pas d'og:image (pas d'asset, summary card s'affiche bien sans). Share previews sur LinkedIn/Twitter/Slack maintenant cohérents avec le pitch de la page.
- [x] merci.html (pass 8) — Description existait déjà. Ajout (1) theme-color stabilo + favicon SVG ; (2) **`<meta name="robots" content="noindex, nofollow">`** — page transactionnelle post-paiement, ne doit pas être indexée par les moteurs de recherche (sinon "merci.html" pourrait apparaître dans les SERPs sans contexte de paiement).

## Pass 8 — funnel complet

## File d'attente (funnel order) — Pass 9

**Pass 9** — angle : chasse au debris (console.log, TODO/FIXME, hardcoded test data, prototype leftovers, dead CSS classes).

- [x] index.html (pass 9) — **Mini-bug d'incohérence glyph** : missions initialement `done` affichent `✓` (Unicode check). Mais le JS de toggle écrivait literal `'x'` quand l'utilisateur cochait dynamiquement. Donc une mission cochée par l'user affichait `x`, une mission déjà cochée au load affichait `✓` — incohérence visuelle. Fix : JS écrit `'✓'` au lieu de `'x'`. Vérifié au clic. (Pas de console.log/TODO browser-side trouvé, les console.log dans scripts/compute-weights et screenshot sont des CLI tools, intentionnels.)
- [x] onboarding.html (pass 9) — **Typo apostrophe** dans la fixture JS MISSIONS (ligne 399) : `'Énergie mécanique — refaire l exercice clé'` → `'Énergie mécanique — refaire l\'exercice clé'`. Cette chaîne s'affichait dans la preview du step 6 et dans le payload d'onboarding envoyé au modèle. Le reste de la page n'a pas de debris : pas de console.log, pas de TODO, les commentaires HTML sont des dividers structurels.
- [x] focus.html (pass 9) — Format heure anglais "14:00" dans `.fx-next-meta` → français "14h00" (convention française du `h` en séparateur, déjà utilisée ailleurs sur le site comme "12h45"). Sweep du reste de la page clean (pas de console.log, JS et copy propres).
- [x] mission.html (pass 9) — 3 routes "Après cette mission" avec `<span>→</span>` non-marqués `aria-hidden`. Le lecteur d'écran annonçait "Revenir aux priorités du jour right arrow" sur chaque route. Propagation du pattern iter 23 : `<span aria-hidden="true">→</span>`. Vérifié : tree walker excluant aria-hidden produit "Revenir aux priorités du jour", "Voir pourquoi c'est prioritaire", "Garder le plan personnalisé" — clean.
- [x] objectif.html (pass 9) — Arrow `→` non-`aria-hidden` dans le tooltip CTA généré par JS ("Travailler ce levier →"). Fix : `<span aria-hidden="true">→</span>`. **Découverte** : faux positif de l'iter 37 sur le heatmap. J'avais conclu "clic mort" en comparant `cellBefore !== cellAfter` sur le `outerHTML` de la cell — mais le clic crée un tooltip via `document.body.appendChild(tip)`, qui ne modifie pas la cell elle-même. Le heatmap **est** interactif. À retirer du registre flag.
- [ ] progression.html → NEXT (pass 9)
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html
- [ ] onboarding.html
- [ ] focus.html
- [ ] mission.html
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html

## Done

- [x] **index.html** (iter 1) — Mission card height 554→468px (-86px), CTA "Commencer la mission" remontée y=557→y=471 (sous-fold→centre). Stats row (énergie, confiance, temps, semaine) maintenant totalement visible au-dessus du fold. Suppression de `<p class="study-note">` (info redondante avec chip "45 min"), tightening `.daily-brief` padding 28→22px et margin-bottom 28→20px.
- [x] **onboarding.html** (iter 2) — Titre step 1 "QUELLE ÉCOLE VEUX-TU POUVOIR VISER ?" passe de 3 lignes/210px à 2 lignes/108px. Options remontent de y=527 à y=483 (-44px). Réduction de `.step h1` `clamp(40px, 5.5vw, 64px)` → `clamp(36px, 4vw, 52px)`. Step 1 est l'étape la plus critique pour la complétion : un titre moins imposant baisse la barrière psychologique au 1er clic.
- [x] **focus.html** (iter 3) — Réduction de la redondance entre le timer (280px "24:35") et le percentage dans le ring (22px "98%" en blanc vif). Le ring jaune montre déjà la progression — le chiffre était du bruit qui diluait la hiérarchie. `.fx-progress-ring .pct` passe à font-mono 14px + opacity 0.55. Le timer redevient l'unique signal primaire, le ring est secondaire (visuel), le % devient référence tertiaire.
- [x] **mission.html** (iter 4) — Supprimé le préfixe "Mission du jour :" du H1 (redondant avec breadcrumb + chip déjà présents au-dessus). H1 passe de 2 lignes à 1 ligne, hero 550→497px (-53px). Surtout : la CTA primaire "Commencer le focus · 25 min" passe sous le fold à y=814 (visible). C'est l'action attendue à l'arrivée sur la page — la rendre visible sans scroll est l'effet de levier le plus direct sur l'engagement.
- [x] **objectif.html** (iter 5, scope cross-page) — Bug architectural découvert : `body { overflow: hidden, height: 900px }` + `.view { overflow-y: auto }` crée un scroll interne **sans aucun indicateur visuel**. 285px de contenu caché sur objectif (priorités stratégiques + grille de progression coupées), et même 796px sur le cockpit. Ajout d'un scroll-shadow CSS classique (cover layers `local` + shadow layers `scroll`) qui s'auto-cache en haut/bas et révèle l'overflow par une ombre douce. Pattern self-adjusting : n'apparaît que si la page déborde réellement. Concerne toutes les vues utilisant `.view`.
- [x] **progression.html** (iter 6) — État vide "JOUR 0" affichait un planter de 280px dans une carte de 589px (la moitié du fold pour "rien à montrer"). Stats row (CETTE SEMAINE, JOURS ACTIFS, MISSION DU JOUR) repoussée à y=829, sous le fold. Ajout d'un style `.garden-empty` qui compacte le tout : SVG 280→150px, padding 36→22px, gap réduit. Carte passe de 589 à 386px (-34%), stats visibles à y=625, et même la reminder "Mission du jour" remonte au-dessus du fold. L'état vide encourage maintenant la 1ère action sans submerger.
- [x] **checkout.html** (iter 7) — H1 "TRAVAILLE CE QUI RAPPORTE." passe de `clamp(52px, 7.4vw, 104px)` à `clamp(44px, 5vw, 72px)`. Hauteur H1 : 287→207px (-80px). Sur une page checkout, l'éditorial ne doit pas écraser la mécanique de conversion. Le bloc "10€/MOIS" remonte à y=495 et la CTA "Garder le plan personnalisé" à y=662 — prix + action clairement co-visibles dans le fold avec la bande de trust signals.
- [x] **merci.html** (iter 8) — Page post-conversion affichait 3 CTAs au même niveau visuel : "Ouvrir mon cockpit" (dark) + "Voir la mission du jour" (ghost) + "Voir l'impact objectif" (ghost). Décision paralysie classique après le paiement. Restructuration `.success-actions` : la CTA dark devient l'action évidente, les 2 ghost passent en liens texte underlinés (padding/border supprimés, font 14px, color ink-soft). Pattern "1 primaire + N alternatives discrètes" qui réduit le time-to-first-value après l'achat.

## Notes inter-itérations

- Pattern observé sur le cockpit : densité forte sur la carte mission. Surveiller le même phénomène sur les autres écrans (paragraphes qui répètent ce que les chips disent déjà).
- "BONJOUR, MAÏE." (44px uppercase) est un h1 partagé via `.page-head h1` — réutilisé sur toutes les pages logged-in. Ne pas le toucher globalement sans audit cross-page.
- Viewport 1440×900 est la cible. Sur les pages où `docHeight==viewportHeight` exactement, c'est probablement parce que `body { overflow: hidden }` masque du contenu — vérifier qu'on ne CACHE pas du contenu utile.
