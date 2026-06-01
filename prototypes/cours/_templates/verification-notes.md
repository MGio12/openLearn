<!--
AGENT HEADER
Role: template de compte rendu verification layout/math pour un chapitre.
Loaded by: agents apres creation ou modification d'une page cours/TD.
Reads/writes: document Markdown seulement; aucune logique runtime.
Public contract: commande lancee, resultat KaTeX, overflow, corrections, sidebar, graphes exacts.
Verify: npm run verify:course-sidebar ; npm run verify:course-agent ; git diff --check.
Read next: `docs/agent-codebase-map.md` Zone 3, `docs/regles-creation-cours-maths.md`.
-->
# Notes de vérification - <titre>

Template à copier dans un dossier de chapitre ; remplacer tous les champs `<...>` avant de considérer la note comme finale.

Date : <date>

Commandes lancées :

```bash
npm run verify:course-sidebar
node scripts/verify-course-sidebar.mjs prototypes/cours/maths-specialite/<chapitre>/index.html
# Si le chapitre contient un pilote IA/Feynman :
npm run verify:course-agent
# Si le chapitre existe aussi dans le pilote Astro/MDX :
npm run build:courses
npm run verify:courses-astro
git diff --check
```

## Résultat

- KaTeX sans erreur console :
- Aucun overflow horizontal de formule :
- Aucun `overflow-x: auto` sur formule :
- Boutons de correction fonctionnels :
- Sidebar ouverte/repliée/hover/focus/mobile :
- Graphes exacts visibles si présents :
- Aucun débordement horizontal global :

## Issue réutilisable à noter

- <règle ou piège découvert pendant la vérification>
