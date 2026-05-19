# Claude Code — ObjectifLycee

## Profil & stack
- Solo dev, bases en info, pas ingénieur. Code simple, lisible dans 6 mois par moi-même.
- Site statique : HTML/CSS/JS **vanilla**, pas de framework.
- Arbo : `*.html` racine, `assets/css/pages/`, `assets/js/`, `data/`, `scripts/`, `docs/`.

## Règles projet (priment sur les défauts Claude)
- **Inline > extraction.** Duplique 2× sans réfléchir, extrais à la 3ᵉ. Pas de `utils.js` fourre-tout.
- **Pas de split de fichier** sauf > 500 lignes ET responsabilités distinctes.
- **Pas de tests unitaires** sans demande explicite.
- **Pas de dépendance npm** sans demander d'abord.
- CSS par page dans `assets/css/pages/` si > 50 lignes, sinon `styles.css`. Tokens dans `:root`.

## GSD via Codex (CRITIQUE)
Les commandes `/gsd-*` passent par `codex exec`, **jamais** via Skill :
```
Bash("codex exec '/gsd-execute-phase 3'")   # OUI
Skill("gsd-execute-phase", "3")              # NON
```
Raison : skills GSD dans `~/.codex/skills/`. Délègue le compute LLM lourd sur l'abonnement Codex.
Phases longues : `run_in_background: true` ou `timeout: 600000`.

## Pré-commit
1. `/simplify` — duplication, code mort, sur-ingénierie sur le diff.
2. `/review` — code review pré-merge (sécurité, bugs structurels).

## Itération visuelle
Codex implémente → Playwright capture → Claude critique le screenshot → corrections → recapture. Boucle détaillée : `WORKFLOW.md` (Workflow 2).

## Contraintes Windows
- Hooks PostToolUse échouent (non-bloquant, ignorer).
- Écriture fichier via PowerShell `WriteAllText` avec `UTF8Encoding(false)`.
- Pas de backticks dans JS embarqué dans heredocs PowerShell.

## Edge case KaTeX
Ne **jamais** styler un tag générique (`.bloc span`, `.card div`, etc.) dans une zone contenant des formules — KaTeX découpe chaque formule en multiples `<span>`. Utiliser une classe dédiée sur l'élément exact. Cas détaillé : `docs/erreurs-rencontrees.md`.

Les formules KaTeX ne doivent **jamais** être comprimées ou enfermées dans un scroll horizontal. Une formule trop longue doit prendre toute la largeur disponible puis passer en hauteur : utiliser `aligned`, plusieurs blocs `\[...\]`, ou du texte entre les étapes. Ne pas résoudre le problème avec `overflow-x: auto`, une réduction de police, ou une carte trop étroite.

## Visuels mathématiques — INTERDICTION
- **Interdit :** dessiner à la main des courbes, paraboles, tangentes, axes, graphes ou schémas mathématiques approximatifs en SVG/Canvas/CSS/Bezier/HTML décoratif.
- **Interdit :** faire semblant qu'un tracé manuel est un graphe mathématique fiable, même pour une intuition.
- Pour une courbe exacte ou interactive : utiliser un langage/outil mathématique déterministe (`JSXGraph`, Desmos, GeoGebra, ou points calculés depuis une vraie fonction).
- Pour une intuition visuelle non exacte : utiliser imagegen avec un prompt clair, sans axes, graduations, labels mathématiques ni formule dans l'image.
- Si aucun outil mathématique exact n'est nécessaire, préférer une explication en langage mathématique + KaTeX plutôt qu'un dessin approximatif.

## Lecture minimale par scénario
Objectif : ne pas tout relire. Charge seulement les fichiers utiles au travail en cours.

| Scénario | Lire en priorité | Pourquoi |
|---|---|---|
| Créer ou modifier un cours de maths | `docs/regles-creation-cours-maths.md` → `docs/techniques-apprentissage-maths.md` → `docs/superpowers/specs/2026-05-19-structure-contenu-maths-premiere.md` | Règles qualité/rétention/monétisation, techniques d'apprentissage, structure de chapitre validée. |
| Générer un cours depuis des PDF | `docs/pipeline-cours-ia.md` puis les fichiers de règles maths ci-dessus | Workflow PDF → extraction → page HTML+KaTeX, avec contraintes pédagogiques. |
| Choisir les sources PDF Première maths | `lien/premiere/math.md` | Liens validés vers cours et TD Maths91/Maths-et-tiques. |
| Ajouter des visuels pédagogiques | `docs/generation-image-cours.md` + `docs/erreurs-rencontrees.md` | Règles imagegen et pièges KaTeX/CSS à éviter. |
| Travailler la promesse, paywall, pricing, parent/élève | `docs/mission-valeur-monetisation.md` + `docs/version-lycee-priorites.md` | Positionnement produit, funnel, valeur élève/parent, priorités lycée. |
| Prioriser le prochain sprint | `TODO.md` + `docs/version-lycee-priorites.md` | Roadmap active et priorités produit lycée. |
| Modifier le parcours site/app | `WORKFLOW.md` + `TODO.md` | Boucle dashboard → mission → focus → progression → checkout. |
| Reprendre une décision produit majeure | `docs/superpowers/specs/2026-05-14-vision-produit.md` + `docs/superpowers/specs/2026-05-14-objectif-lycee-dashboard-design.md` | Vision et design dashboard déjà validés. |
| Chercher la méthode de dev solo | `docs/vibe-coding-methode.md` + `SKILLS-GUIDE.md` | Méthode de travail, skills, revues, itérations. |

## Règles spécifiques aux cours de maths
- Toujours appliquer la règle mère : baisser la difficulté d'entrée, pas l'exigence finale.
- Ne pas promettre 20/20 comme garantie visible ; le niveau 20/20 est une cible d'entraînement.
- Le vrai différenciateur n'est pas un meilleur PDF : c'est un entraînement qui combat l'illusion de compréhension.
- Chaque notion doit pousser l'élève à produire : question immédiate, étape manquante, exercice seul, choix de méthode, rédaction propre.
- Les exercices `20/20` doivent être préparés par des portes simples, pas accessibles comme un raccourci décoratif.
- Le paywall doit arriver après une preuve de progrès, jamais avant la première valeur ressentie.
