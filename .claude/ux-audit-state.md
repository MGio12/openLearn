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
- [ ] onboarding.html → NEXT (pass 2)
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
