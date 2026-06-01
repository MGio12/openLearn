# Notes de génération - TD Second degré

## Décision

Création d’une page `td.html` séparée pour le chapitre, avec 40 exercices corrigés et un lien visible depuis `index.html`.

Ajout d'un pilote Astro + MDX isolé pour le même chapitre :

- `src/pages/cours/second-degre/index.mdx` ;
- `src/pages/cours/second-degre/td.mdx` ;
- composants dans `src/courses/components/` ;
- données partagées dans `src/courses/data/second-degre.js`.

Le pilote ne remplace pas les prototypes HTML et ne modifie pas le parcours public.

## Structure pédagogique

- 10 automatismes.
- 8 méthodes guidées.
- 6 pièges.
- 5 exercices de choix de méthode.
- 6 exercices niveau contrôle.
- 3 exercices cap 20/20, précédés d’une porte d’entrée.
- 2 exercices de révision mélangée.

## Carte de couverture V2

- forme développée, factorisée et canonique
- discriminant, racines, racine double
- signe d’un trinôme et inéquations
- sommet, axe de symétrie, position relative
- somme et produit des racines

## Rôles des sources

- Maths91 sert de colonne vertébrale pour la couverture du programme, les méthodes et les exercices de contrôle.
- Maths-et-tiques sert de complément pour l’intuition, les explications alternatives et les exemples utiles quand la source existe pour le chapitre.
- Les autres sources listées dans `sources.md` inspirent des variations d’énoncés et des pièges, sans recopie brute.

## Garde-fous appliqués

- Corrigés masqués avec `data-reveal`.
- Une réponse pour chaque exercice.
- Corrections détaillées sur les exercices structurants.
- Pas de courbe ou schéma mathématique approximatif.
- Sources citées au niveau de la page et dans `sources.md`.
- Astro + MDX vérifié séparément par `npm run build:courses` et `npm run verify:courses-astro`.
- Graphes exacts du pilote Astro rendus par JSXGraph via le composant `ExactGraph`.

## Éléments volontairement exclus

- Recopie brute d’énoncés PDF.
- Exercices sans réponse.
- Graphes approximatifs dessinés à la main.
