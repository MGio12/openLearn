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

- [ ] mission.html → NEXT
- [ ] objectif.html
- [ ] progression.html
- [ ] checkout.html
- [ ] merci.html

## Done

- [x] **index.html** (iter 1) — Mission card height 554→468px (-86px), CTA "Commencer la mission" remontée y=557→y=471 (sous-fold→centre). Stats row (énergie, confiance, temps, semaine) maintenant totalement visible au-dessus du fold. Suppression de `<p class="study-note">` (info redondante avec chip "45 min"), tightening `.daily-brief` padding 28→22px et margin-bottom 28→20px.
- [x] **onboarding.html** (iter 2) — Titre step 1 "QUELLE ÉCOLE VEUX-TU POUVOIR VISER ?" passe de 3 lignes/210px à 2 lignes/108px. Options remontent de y=527 à y=483 (-44px). Réduction de `.step h1` `clamp(40px, 5.5vw, 64px)` → `clamp(36px, 4vw, 52px)`. Step 1 est l'étape la plus critique pour la complétion : un titre moins imposant baisse la barrière psychologique au 1er clic.
- [x] **focus.html** (iter 3) — Réduction de la redondance entre le timer (280px "24:35") et le percentage dans le ring (22px "98%" en blanc vif). Le ring jaune montre déjà la progression — le chiffre était du bruit qui diluait la hiérarchie. `.fx-progress-ring .pct` passe à font-mono 14px + opacity 0.55. Le timer redevient l'unique signal primaire, le ring est secondaire (visuel), le % devient référence tertiaire.

## Notes inter-itérations

- Pattern observé sur le cockpit : densité forte sur la carte mission. Surveiller le même phénomène sur les autres écrans (paragraphes qui répètent ce que les chips disent déjà).
- "BONJOUR, MAÏE." (44px uppercase) est un h1 partagé via `.page-head h1` — réutilisé sur toutes les pages logged-in. Ne pas le toucher globalement sans audit cross-page.
- Viewport 1440×900 est la cible. Sur les pages où `docHeight==viewportHeight` exactement, c'est probablement parce que `body { overflow: hidden }` masque du contenu — vérifier qu'on ne CACHE pas du contenu utile.
