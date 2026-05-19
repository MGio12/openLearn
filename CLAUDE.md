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

Les équations doivent être propres et écrites dans le langage mathématique adapté : KaTeX pour les expressions, symboles définis avant usage, notation stable entre méthode, exemple et correction. Quand une correction contient plusieurs réponses, plusieurs cas, ou plusieurs questions, les séparer clairement par parties numérotées, labels courts, ou blocs distincts. Ne jamais empiler trois réponses d'affilée dans un seul bloc d'équations sans phrase ni repère. Si une équation risque de passer à la ligne ou de déborder, la découper volontairement en étapes verticales avec `aligned`, plusieurs blocs `\[...\]`, ou du texte entre les lignes.

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
| Créer ou modifier un cours de maths | `docs/regles-creation-cours-maths.md` → `docs/techniques-apprentissage-maths.md` → `docs/superpowers/specs/2026-05-19-structure-contenu-maths-premiere.md` → sources du chapitre dans `lien/premiere/math.md` | Règles qualité/rétention/monétisation, techniques d'apprentissage, structure de chapitre validée, puis PDFs de référence. |
| Générer un cours depuis des PDF | `docs/pipeline-cours-ia.md` → `lien/premiere/math.md` → les fichiers de règles maths ci-dessus | Workflow PDF → extraction → page HTML+KaTeX, avec contraintes pédagogiques et sources validées. |
| Choisir les sources PDF Première maths | `lien/premiere/math.md` | Liens validés vers cours et TD Maths91/Maths-et-tiques. |
| Ajouter des visuels pédagogiques | `docs/generation-image-cours.md` + `docs/erreurs-rencontrees.md` | Règles imagegen et pièges KaTeX/CSS à éviter. |
| Travailler la promesse, paywall, pricing, parent/élève | `docs/mission-valeur-monetisation.md` + `docs/version-lycee-priorites.md` | Positionnement produit, funnel, valeur élève/parent, priorités lycée. |
| Prioriser le prochain sprint | `TODO.md` + `docs/version-lycee-priorites.md` | Roadmap active et priorités produit lycée. |
| Modifier le parcours site/app | `WORKFLOW.md` + `TODO.md` | Boucle dashboard → mission → focus → progression → checkout. |
| Reprendre une décision produit majeure | `docs/superpowers/specs/2026-05-14-vision-produit.md` + `docs/superpowers/specs/2026-05-14-objectif-lycee-dashboard-design.md` | Vision et design dashboard déjà validés. |
| Chercher la méthode de dev solo | `docs/vibe-coding-methode.md` + `SKILLS-GUIDE.md` | Méthode de travail, skills, revues, itérations. |

## Règles spécifiques aux cours de maths
- Toujours appliquer la règle mère : baisser la difficulté d'entrée, pas l'exigence finale.
- Zéro ambiguïté : l'élève ne doit jamais deviner ce que signifie un symbole, pourquoi une méthode est choisie, quelle étape suit, ni quelle est la réponse finale. S'il faut parler davantage pour lever l'ambiguïté, parler davantage.
- Ne pas promettre 20/20 comme garantie visible ; le niveau 20/20 est une cible d'entraînement.
- Le vrai différenciateur n'est pas un meilleur PDF : c'est un entraînement qui combat l'illusion de compréhension.
- Chaque notion doit pousser l'élève à produire : question immédiate, étape manquante, exercice seul, choix de méthode, rédaction propre.
- Les exercices `20/20` doivent être préparés par des portes simples, pas accessibles comme un raccourci décoratif.
- Le paywall doit arriver après une preuve de progrès, jamais avant la première valeur ressentie.
- Un cours doit être mathématiquement consistant : notations stables, définitions avant usage, hypothèses explicites, ordre logique des méthodes, exemples alignés avec les exercices, corrections qui reprennent les mêmes objets.
- Les corrections doivent rester lisibles : une question = une partie identifiable ; plusieurs résultats = résultats séparés ou numérotés ; pas de suite compacte de réponses en équation sans explication.
- Mettre plus de maths que de narration : définitions, théorèmes/propriétés, cas, formules, exemples résolus, justifications, contre-exemples ou pièges, exercices progressifs et rédaction attendue.
- S'appuyer réellement sur les PDFs validés. Pour la Première spécialité, partir de `lien/premiere/math.md`, utiliser Maths91 comme colonne vertébrale cours + exercices, puis Maths-et-tiques comme complément d'intuition ou d'exemples. Ne pas produire un chapitre générique de mémoire quand un PDF source existe.
- Logique attendue : prendre les cours PDF, en faire le plan, reprendre quasiment toute leur substance mathématique, puis améliorer ce que le web peut améliorer. On améliore le travail d'expert : on ne réinvente pas la roue.
- Si une métaphore, une explication plus longue ou une image imagegen retire une vraie ambiguïté, l'utiliser. L'image imagegen sert seulement l'intuition non exacte ; les courbes, axes, labels critiques, formules et constructions mathématiques restent dans KaTeX, JSXGraph, Desmos, GeoGebra ou des objets calculés.
- Avant d'assembler une page, dresser une mini-carte de couverture : notions présentes dans les PDFs, méthodes, exemples, exercices adaptés, erreurs fréquentes, graphes exacts nécessaires, et points non repris volontairement.
- Chaque section importante doit avoir une fonction pédagogique claire : apprendre une notion, faire choisir une méthode, faire produire une étape, faire rédiger, ou préparer un exercice de contrôle. Supprimer les blocs décoratifs qui n'ajoutent pas de math ou d'action élève.

## Pages de cours — layout et sidebar
- Pages en HTML/CSS/JS vanilla. Un prototype peut rester dans `prototypes/cours/`, avec CSS/JS partagés par matière.
- Structure attendue : `<body class="has-course-sidebar">`, `.course-layout[data-course-layout]`, `.course-sidebar[data-course-sidebar]`, `.sidebar-toggle[data-sidebar-toggle]`, liens de plan en `[data-section-link]`.
- Sidebar de cours : fixe à l'extrême gauche, pleine hauteur, ouverte au premier chargement, repliée par changement de largeur. Ne jamais la replier par `transform` hors écran.
- État fermé : garder un rail étroit visible. La flèche du rail est décorative, centrée dans la barre, non cliquable et ne doit pas rouvrir la sidebar. Le vrai bouton sert seulement à replier la sidebar quand elle est ouverte.
- Pour consulter le plan après fermeture : hover ou focus sur le rail révèle temporairement le plan. Sur mobile, un clic sur une section replie automatiquement le rail.
- Pas de scroll interne pour un plan court : compacter les liens et masquer les éléments secondaires sur petite hauteur.
- Contenu : réserver assez de largeur aux textes et formules ; ne pas mettre les formules importantes dans des cartes étroites.
- Vérification dédiée : `node scripts/verify-course-sidebar.mjs` pour contrôler flèche fermée non cliquable/centrée, hover/focus, boutons révélation, overflow global et formules.

## Graphes dans les cours
- Ajouter des graphes exacts quand ils clarifient une lecture mathématique : courbe d'une fonction, racines, signe, extremum, tangente, taux de variation, position relative de deux courbes, figure géométrique déterministe.
- Utiliser JSXGraph par défaut pour les graphes interactifs ou exacts déjà intégrés au prototype. Desmos/GeoGebra sont acceptables si le besoin dépasse JSXGraph. KaTeX suffit pour les tableaux de signe ou les raisonnements sans courbe.
- Un graphe doit correspondre à une vraie fonction ou construction calculée. Les points remarquables affichés doivent être calculables depuis l'exemple du cours et cohérents avec la correction.
- Ne pas multiplier les graphes décoratifs. Chaque graphe doit répondre à une intention en une phrase : "l'élève comprend que...", "l'élève lit...", ou "l'élève compare...".
- Sur mobile et desktop, vérifier que le graphe est visible, non vide, assez large, sans chevauchement de labels, et qu'il ne crée aucun overflow horizontal.
