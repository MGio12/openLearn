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

3. L'agent lit les textes extraits et produit :

   - une carte des notions ;
   - les définitions indispensables ;
   - les intuitions à construire ;
   - les erreurs fréquentes ;
   - les exemples gradués ;
   - les questions de compréhension ;
   - un TD progressif ;
   - un corrigé détaillé.

4. L'agent assemble le chapitre en HTML, avec formules au format :

   - inline : `\( f'(a) \)`
   - bloc : `\[ f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h} \]`

5. Les visualisations sont ajoutées uniquement quand elles clarifient une idée. Les règles détaillées sont dans [`docs/generation-image-cours.md`](generation-image-cours.md) : intention pédagogique avant esthétique, scène réelle en style BD pour l'intuition, annotations exactes en HTML/SVG/KaTeX quand la précision compte.

6. Le dossier de sortie contient :

   - `index.html`
   - `images/`
   - `sources.md`
   - `generation-notes.md`

   Le dossier de matière contient les assets partagés :

   - `cours.css`
   - `cours.js`

## Règles pédagogiques

- Le ton doit être celui d'un professeur exigeant, clair, agréable et rassurant.
- Le cours doit aider l'élève à reprendre confiance sans baisser le niveau.
- Les images ne décorent pas : elles doivent expliquer une idée.
- Les points majeurs à retenir sont visuellement marqués.
- Les zones à visualiser sont séparées des théorèmes et méthodes.
- Les questions arrivent au fil du cours, pas seulement à la fin.
- Le TD doit aller du calcul direct vers le raisonnement.
- Toute information incertaine issue des sources doit être signalée dans `generation-notes.md`.

## Extension v1.1

Le scraping web automatisé arrive après validation du prototype PDF.

Règle prévue : web en **liste blanche** seulement. L'agent ne scrape que des domaines ou URLs validés, puis conserve la provenance de chaque source.

## Extension v2

Le tuteur IA adversarial utilisera le cours, les questions et les erreurs fréquentes pour tester la compréhension de l'élève. Son rôle sera de pousser l'élève à expliciter ses raisonnements, repérer les points faibles et proposer une remédiation ciblée.
