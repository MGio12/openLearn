# Pipeline cours IA — prototype

Objectif : transformer 2 à 5 PDFs autorisés sur un même chapitre en un cours web clair, exigeant et rassurant, avec formules LaTeX, visualisations utiles, questions de compréhension et TD corrigé.

Le premier prototype cible le chapitre **Dérivation** en maths spécialité lycée. Il reste isolé du site public pour permettre une itération rapide.

## Principe général

Le format final n'est pas un PDF ni un Markdown : c'est une page **HTML + KaTeX**.

- HTML pour la mise en page pédagogique, les couleurs, les encadrés, les questions et les corrigés masqués.
- KaTeX pour rendre proprement les formules LaTeX dans le navigateur.
- CSS partagé par matière pour garder une identité commune entre chapitres.
- JS léger pour les interactions simples.

## Workflow agent orchestrateur

0. Choisir les sources depuis la liste validée.

   Pour la Première spécialité, commencer par `lien/premiere/math.md`.
   Maths91 est la colonne vertébrale par défaut : cours, définitions, propriétés, exercices.
   Maths-et-tiques sert de complément quand il apporte une intuition, une méthode plus lisible ou un exemple utile.
   La logique de génération est : partir du travail d'expert, en extraire le plan, reprendre presque toute la substance mathématique, puis améliorer la clarté, l'interactivité et la progression. Ne pas reconstruire un chapitre générique depuis la mémoire de l'agent.

1. Placer les PDFs autorisés dans un dossier d'entrée, par exemple :

   ```bash
   prototypes/cours/_sources/maths-specialite/derivation/
   ```

2. Extraire le texte :

   ```bash
   node scripts/course-extract-text.mjs \
     prototypes/cours/_sources/maths-specialite/derivation \
     prototypes/cours/_extracted/maths-specialite/derivation
   ```

3. L'agent lit les textes extraits et produit une carte de couverture avant d'écrire la page :

   - une carte des notions ;
   - le plan du cours PDF principal ;
   - les définitions, hypothèses et propriétés à conserver ;
   - les passages à reprendre quasi tels quels dans leur substance mathématique ;
   - les intuitions à construire ;
   - les erreurs fréquentes ;
   - les exemples gradués ;
   - les questions de compréhension ;
   - un TD progressif ;
   - un corrigé détaillé ;
   - les graphes exacts nécessaires ;
   - les éléments du PDF exclus de cette version et la raison.

   Cette carte sert à éviter un cours trop générique. Le chapitre web doit rester dense en mathématiques : notations stables, hypothèses explicites, propriétés, exemples résolus, exercices de contrôle et corrections rédigées. L'agent améliore le travail d'expert, il ne réinvente pas la roue.

4. L'agent assemble le chapitre en HTML, avec formules au format :

   - inline : `\( f'(a) \)`
   - bloc : `\[ f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h} \]`

5. Les visualisations sont ajoutées uniquement quand elles clarifient une idée. Les règles détaillées sont dans [`docs/generation-image-cours.md`](generation-image-cours.md) : intention pédagogique avant esthétique, imagegen pour l'intuition, et représentation mathématique exacte via KaTeX, JSXGraph, Desmos, GeoGebra ou tracé calculé. Les courbes dessinées à la main en SVG/Canvas/CSS/Bezier sont interdites.

   Pour les graphes de fonctions, utiliser un outil déterministe. Dans les prototypes actuels, JSXGraph est le choix par défaut pour les courbes exactes : racines, signe, extremum, tangente, position relative de deux courbes. Un graphe doit correspondre à une vraie fonction du cours, avec des points remarquables cohérents avec la correction.

6. Le dossier de sortie contient :

   - `index.html`
   - `images/`
   - `sources.md`
   - `generation-notes.md`

   Le dossier de matière contient les assets partagés :

   - `cours.css`
   - `cours.js`

## Règles pédagogiques

Les techniques d'apprentissage à appliquer sont centralisées dans [`docs/techniques-apprentissage-maths.md`](techniques-apprentissage-maths.md).
Les règles de création, de rétention et de monétisation des cours sont dans [`docs/regles-creation-cours-maths.md`](regles-creation-cours-maths.md).

- Le ton doit être celui d'un professeur exigeant, clair, agréable et rassurant.
- Le cours doit aider l'élève à reprendre confiance sans baisser le niveau.
- Le cours doit être plus consistant qu'un résumé : garder la densité mathématique des PDFs et l'organiser en séquence active.
- Le cours doit viser zéro ambiguïté. Si une notion peut être mal comprise, ajouter une phrase, une étape intermédiaire, une métaphore ou un exemple plutôt que laisser l'élève deviner.
- Les images ne décorent pas : elles doivent expliquer une idée.
- Une image imagegen est acceptable pour une intuition non exacte ou une métaphore visuelle, mais pas pour porter une formule, une courbe, des axes, un label mathématique critique ou une construction exacte.
- Les points majeurs à retenir sont visuellement marqués.
- Les zones à visualiser sont séparées des théorèmes et méthodes.
- Les questions arrivent au fil du cours, pas seulement à la fin.
- Le TD doit aller du calcul direct vers le raisonnement.
- Les corrections doivent expliquer le choix de méthode, pas seulement donner le résultat.
- Toute information incertaine issue des sources doit être signalée dans `generation-notes.md`.

## Extension v1.1

Le scraping web automatisé arrive après validation du prototype PDF.

Règle prévue : web en **liste blanche** seulement. L'agent ne scrape que des domaines ou URLs validés, puis conserve la provenance de chaque source.

## Extension v2

Le tuteur IA adversarial utilisera le cours, les questions et les erreurs fréquentes pour tester la compréhension de l'élève. Son rôle sera de pousser l'élève à expliciter ses raisonnements, repérer les points faibles et proposer une remédiation ciblée.
