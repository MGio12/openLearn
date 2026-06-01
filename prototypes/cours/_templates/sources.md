<!--
AGENT HEADER
Role: template de tracabilite des sources PDF/pages utilisees pour un chapitre.
Loaded by: agents de cours quand ils choisissent ou documentent les sources.
Reads/writes: document Markdown seulement; aucune logique runtime.
Public contract: source principale, source complementaire, fichiers locaux, droits et adaptation.
Verify: npm run verify:course-sidebar ; git diff --check.
Read next: `docs/agent-codebase-map.md` Zone 3, `lien/premiere/math.md`.
-->
# Sources du chapitre - <titre>

Template à copier dans un dossier de chapitre ; remplacer tous les champs `<...>` avant de considérer la note comme finale.

## PDFs ou pages utilisés

- <source principale>
  URL : <url>
  Rôle : colonne vertébrale du cours, définitions, propriétés, méthodes, exercices.

- <source complémentaire>
  URL : <url>
  Rôle : intuition, autre exemple, exercice ou piège utile.

## Fichiers locaux

- Sources extraites : `prototypes/cours/_extracted/premiere/math/<chapitre>/`
- Sources PDF si présentes : `prototypes/cours/_sources/premiere/math/<chapitre>/`

## Droits et adaptation

Le chapitre adapte les notions et exercices pour un prototype interactif. Avant publication publique, vérifier les droits de republication et remplacer les exercices trop proches si nécessaire.
