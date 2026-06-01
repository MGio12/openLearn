# Stack cours et TD web

Ce document fixe le stack à utiliser pour produire des cours et TD de maths de très haute qualité sur le web. Il sert à choisir la bonne technologie avant de toucher à une page de cours, à un TD, à un graphe, à une correction interactive ou à un futur moteur d'exercices.

## Décision

Le coeur du produit doit rester un **cours web sur mesure**, pas un export PDF, pas un module H5P générique, et pas une calculatrice embarquée partout.

Le stack cible est :

```text
Astro + MDX
+ composants pédagogiques maison
+ KaTeX par défaut
+ JSXGraph par défaut pour les graphes exacts
+ Desmos ou GeoGebra seulement quand le besoin dépasse JSXGraph
+ moteur TD maison au début
+ Numbas ou STACK plus tard pour auto-correction avancée
```

Tant que le site reste en prototype vanilla, ne pas migrer vers Astro sans demande explicite. En revanche, écrire les cours et TD actuels comme s'ils devaient migrer vers ce modèle : contenu structuré, composants réutilisables, contrats DOM propres, sources citées, corrections séparées, et pas de logique dispersée.

## Choix par situation

| Situation | Technologie à utiliser | Pourquoi | À éviter |
|---|---|---|---|
| Page de cours statique ou TD long | Astro + MDX en cible, HTML/CSS/JS vanilla dans le prototype actuel | Astro donne un site rapide, des collections de contenu structurées et des composants réutilisables. MDX permet d'écrire du contenu tout en appelant des blocs pédagogiques interactifs. | Un CMS lourd, un PDF converti en HTML, ou une page HTML copiée sans structure durable. |
| Formules, propriétés, calculs et corrections écrites | KaTeX par défaut | Rendu rapide, net, contrôlable visuellement, déjà cohérent avec les prototypes. | Images de formules, formules dans des screenshots, scroll horizontal, réduction de police pour cacher un débordement. |
| Accessibilité mathématique avancée | MathJax | À choisir si l'objectif devient l'exploration d'expressions par lecteur d'écran, speech, Braille ou reflow mathématique avancé. | Remplacer KaTeX partout sans raison : MathJax est plus riche mais plus lourd. |
| Courbes de fonctions, racines, signe, tangentes, points mobiles | JSXGraph par défaut | Contrôle fin dans la page, rendu déterministe, bon pour des graphes pédagogiques cadrés. | SVG/Canvas dessiné à la main, courbes décoratives, approximations visuelles. |
| Vraie calculatrice graphique intégrée | Desmos API | À utiliser quand l'élève doit explorer des expressions librement, manipuler plusieurs courbes ou retrouver une expérience de calculatrice. | Utiliser Desmos pour un simple graphe figé qui pourrait être JSXGraph. |
| Géométrie dynamique, constructions riches, applets complètes | GeoGebra | Meilleur choix pour constructions géométriques, figures manipulables et applets déjà prêtes. | L'embarquer pour une simple droite ou une simple courbe. |
| TD avec corrigés masqués et progression guidée | Moteur maison actuel | Suffisant pour faire produire, révéler, réessayer, choisir une méthode et lire une correction rédigée. | H5P comme coeur du TD de maths. |
| Exercices auto-corrigés avec variantes numériques | Numbas | Bon candidat pour générer des variantes, gérer des réponses numériques et produire des quiz mathématiques web. | Coder à la main un moteur de randomisation fragile si le besoin devient large. |
| Réponses algébriques, équivalence mathématique, feedback précis | STACK | À utiliser quand il faut corriger une expression élève avec un CAS, détecter des erreurs spécifiques et donner un feedback proche d'une correction de professeur. | Comparer des chaînes de caractères pour des réponses algébriques. |
| Vidéos interactives, quiz simples, contenus de présentation | H5P | Utile pour un contenu interactif standard ou une vidéo enrichie. | En faire la fondation des cours et TD de maths ambitieux. |
| Image d'intuition non exacte | imagegen | Sert à installer une métaphore ou un contexte mental avant la mathématique exacte. | Graphes, axes, graduations, formules, labels critiques ou constructions exactes dans une image générative. |
| Animation mathématique vidéo | Manim | Bon choix pour produire une animation explicative exportée en vidéo. | Remplacer une interaction web par une vidéo quand l'élève doit manipuler. |

## Règle d'adoption

Ne pas ajouter une nouvelle dépendance seulement parce qu'elle est meilleure en théorie. Choisir selon le besoin pédagogique réel.

1. Si le contenu est lisible avec texte + KaTeX + correction masquée, rester simple.
2. Si l'élève doit lire ou manipuler un objet mathématique exact, utiliser JSXGraph.
3. Si l'élève doit explorer librement comme dans une calculatrice, utiliser Desmos.
4. Si l'élève doit construire ou déplacer une figure géométrique riche, utiliser GeoGebra.
5. Si l'élève doit être auto-corrigé sur beaucoup de variantes numériques, envisager Numbas.
6. Si l'élève doit entrer une expression algébrique et recevoir un feedback mathématique fiable, envisager STACK.
7. Si l'interaction est seulement un quiz ou une vidéo enrichie, H5P peut compléter, mais ne doit pas piloter le cours.

Toute adoption d'Astro, Numbas, STACK, Desmos API ou GeoGebra comme dépendance durable doit passer par une mini-décision d'architecture : besoin, alternative rejetée, coût d'intégration, mode de vérification, impact sur les cours existants.

## Architecture cible d'un chapitre

Un chapitre de qualité doit séparer clairement :

- le **contenu expert** : définitions, propriétés, méthodes, exemples, exercices, corrections ;
- la **structure pédagogique** : diagnostic, automatisme, méthode guidée, piège, choix de méthode, contrôle, cap 20/20 ;
- le **rendu mathématique** : KaTeX, JSXGraph, Desmos ou GeoGebra selon le besoin ;
- l'**interaction élève** : question, tentative, aide, révélation, feedback, nouvelle tentative ;
- les **sources et notes** : origine des notions, adaptations, exclusions volontaires, vérifications.

Le web doit améliorer le PDF sur la séquence et l'action élève, pas remplacer la substance mathématique validée par une leçon générique.

## Pilote Astro + MDX isolé

Le pilote `second-degre` existe dans le socle Astro isolé sans remplacer les prototypes vanilla :

```text
astro.config.mjs
src/pages/cours/second-degre/index.mdx
src/pages/cours/second-degre/td.mdx
src/courses/components/
src/courses/data/second-degre.js
src/courses/styles/course.css
dist-courses/                 # sortie de build, non intégrée au site vanilla
```

Commandes dédiées :

```bash
npm run dev:courses
npm run build:courses
npm run verify:courses-astro
```

Ces commandes restent hors de `npm run verify` tant que le pilote n'est pas validé pour une migration globale.

Composants pédagogiques du pilote :

- `CourseShell` : document HTML, hero, overview, scripts KaTeX/JSXGraph, tiroir IA local et zone de contenu.
- `CourseSidebar` : plan fixe à gauche, ouvert au chargement, replié par largeur, hover/focus et rail visible.
- `KaTeXBlock` : blocs de formules larges, verticaux, sans scroll horizontal.
- `Reveal` : question ou exercice avec correction masquée.
- `MethodChoice` : cartes de choix de méthode avant calcul.
- `WorkedExample` : exemple résolu avec étapes visibles.
- `ExamWriting` : comparaison brouillon insuffisant / copie propre / points de barème.
- `ExactGraph` : conteneur de graphe exact initialisé par JSXGraph, jamais dessiné à la main.
- `TDExerciseGroup` : groupes de TD progressifs avec corrigés masqués et compteur d'exercices.

Le contenu source du pilote reste tracé dans `prototypes/cours/maths-specialite/second-degre/source-map.md`, `sources.md`, `generation-notes.md` et `verification-notes.md`. Le TD MDX réutilise le corpus progressif de 40 exercices déjà structuré pour le prototype vanilla, afin de conserver la couverture issue des sources validées.

## Vérification minimale

Avant de dire qu'un cours ou un TD est fini :

- les formules se rendent sans erreur console ;
- aucune formule ne déborde et aucun bloc mathématique n'utilise de scroll horizontal ;
- les corrections et aides se révèlent correctement ;
- les graphes exacts se rendent, sont non vides, lisibles mobile/desktop, et cohérents avec la correction ;
- les liens cours/TD/fiches fonctionnent ;
- la sidebar fonctionne ouverte, repliée, hover/focus et mobile ;
- les sources et notes de chapitre existent ;
- la commande de vérification projet pertinente passe.

## Références externes

- Astro Content Collections : https://docs.astro.build/fr/guides/content-collections/
- KaTeX : https://katex.org/docs/api.html
- MathJax accessibility : https://docs.mathjax.org/en/v4.0/basic/accessibility.html
- JSXGraph : https://jsxgraph.org/docs/
- Desmos API : https://www.desmos.com/api/v1.8/docs/index.html
- GeoGebra embedding : https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_Embedding/
- Numbas : https://docs.numbas.org.uk/
- STACK : https://stack-assessment.org/
- H5P : https://h5p.org/content-types-and-applications
- Manim : https://www.manim.community/
