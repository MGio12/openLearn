# Notes de vérification - TD Second degré

## Vérifications attendues

- KaTeX doit se rendre sans erreur console.
- Aucun bloc `.katex-display` ou `.formula-card` ne doit déborder horizontalement.
- Les boutons `data-reveal` doivent masquer puis afficher les corrigés.
- La sidebar doit fonctionner en desktop, mobile, état ouvert, état replié, hover et focus.
- La page `td.html` est couverte par `npm run verify:course-sidebar` et `npm run verify:cwv`.
- Le pilote Astro + MDX est couvert par `npm run build:courses` puis `npm run verify:courses-astro`.

## Graphes

Aucun graphe exact supplémentaire dans le TD. Si un futur exercice demande une lecture de courbe, utiliser JSXGraph ou renvoyer au graphe exact du cours.

Le cours Astro contient les graphes exacts suivants, tous initialisés par JSXGraph :

- orientation de deux paraboles selon le signe de \(a\) ;
- trois cas du discriminant ;
- sommet et axe de symétrie ;
- signe de \(x^2-2x-15\) ;
- position relative de \(f(x)=-x^2+8x-11\) et \(g(x)=x-1\).
