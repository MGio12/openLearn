# Notes de vérification — Second degré

Date : 2026-05-22

Commande :

```bash
node scripts/verify-course-sidebar.mjs prototypes/cours/maths-specialite/second-degre/index.html
```

## Contrat à vérifier

- KaTeX sans erreur console.
- Aucune formule en overflow horizontal.
- Aucun bloc formule avec scroll horizontal.
- Graphes JSXGraph exacts visibles et non vides.
- Boutons de correction fonctionnels.
- Sidebar ouverte au chargement, repliée par largeur, hover/focus fonctionnels, mobile valide.
- Flèche du rail replié centrée et non cliquable.
- Aucun overflow horizontal global.

## Notes

- Le script `verify-course-sidebar.mjs` accepte maintenant une page de cours en argument pour réutiliser ces contrôles chapitre par chapitre.
