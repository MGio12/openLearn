# Notes de génération — dérivation

## État

Prototype de rendu HTML créé sans corpus PDF réel. Le contenu illustre la forme attendue : cours fluide, formules KaTeX, questions au fil du cours, fiche synthèse et TD corrigé.

## Intentions pédagogiques

- Insister sur l'idée de pente locale avant les formules.
- Faire apparaître le taux de variation comme pente moyenne.
- Montrer que le signe de la dérivée sert à lire les variations.
- Dédramatiser les erreurs classiques sans baisser l'exigence.

## Visualisations incluses

- `images/skatepark-tangente.webp` : scène imagegen de rampe montante, utilisée uniquement comme contexte mental.
- Trois graphes JSXGraph dans `index.html` + `cours.js` portent les objets mathématiques du chapitre :
  - point \(A\) déplaçable sur la courbe et tangente recalculée automatiquement ;
  - point \(M\) mobile pour visualiser le taux de variation comme pente moyenne ;
  - parabole en U avec tangente mobile pour lire le signe de \(f'(a)\).
- `images/taux-variation.svg` et `images/signe-derivee.svg` restent dans `images/` comme références secondaires, mais ne sont plus affichés dans le cours principal.

Le prototype ne superpose plus de tangente ou de formule sur une image imagegen. L'image installe l'intuition ; la courbe interactive porte la mathématique exacte.

## Prompts imagegen utilisés

1. Tangente : scène de skatepark en style BD premium, rampe courbe clairement montante de gauche à droite, un skateur au milieu, aucun texte.

Le prompt complet est documenté dans `docs/generation-image-cours.md`.

## Limites connues

- Le contenu n'est pas encore synthétisé depuis des sources réelles.
- Les formules de dérivation ne couvrent pas tout le programme.
- Le TD est volontairement court pour valider le format.
- Le tuteur IA adversarial n'est pas inclus dans cette version.
