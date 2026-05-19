# Génération d'images pour les cours

Ce guide fixe les règles pour produire des images pédagogiques dans les cours HTML.

## Règle centrale

Avant de générer une image, répondre à une seule question :

> Que doit comprendre l'élève après avoir vu cette image ?

Si la réponse est vague, l'image n'est pas prête. Une bonne image de cours ne décore pas : elle crée un déclic, stabilise une intuition ou évite une confusion fréquente.

## Rôles des visuels

Utiliser trois niveaux selon le besoin.

1. **Intuition** : scène réelle ou métaphore visuelle, générée avec imagegen. Elle aide l'élève à ressentir l'idée avant la formule.
2. **Transition** : imagegen fournit une scène mémorable, puis le cours passe à un graphe exact séparé.
3. **Mathématique exacte** : SVG, KaTeX ou JSXGraph quand la position d'un point, la pente, une tangente ou une formule doit être fiable.

Par défaut, les cours de maths doivent éviter de mélanger une scène imagegen et une courbe mathématique dans le même visuel. L'image sert à installer le contexte mental ; le graphe séparé sert à manipuler la mathématique.

## Structure de prompt imagegen

Écrire les prompts en anglais pour la qualité visuelle, avec les textes français exacts entre guillemets si du texte est demandé.

```text
Use case: scientific-educational
Asset type: 16:9 web course context image for <chapter>
Learning intent: after seeing this, the student understands <one idea>
Primary request: <scene or metaphor>
Scene/backdrop: <realistic setting>
Subject: <main objects and action>
Style/medium: premium bande dessinee / graphic novel, semi-real, crisp ink
Composition/framing: wide landscape, readable silhouette
Color role: keep colors compatible with the exact graph that follows
Text (verbatim): none
Constraints: no decorative clutter, no watermark, no logo, no random text
Follow-up visual: exact SVG, KaTeX or JSXGraph graph for the mathematical object
```

## Couleurs et légendes

- **Teal** : courbe de \(f\) ou forme principale dans le graphe exact.
- **Corail** : tangente, pente à surveiller, dérivée négative.
- **Vert** : dérivée positive, montée, validation.
- **Jaune** : point important, position \(A\), minimum ou point de contact.
- **Noir/encre** : axes, traits de construction, contour des labels.

La légende doit rester courte : quatre éléments maximum. Si l'image a besoin de plus de quatre labels, elle explique trop de choses à la fois.

## Texte dans les images

Le texte intégré par imagegen est déconseillé pour les cours de maths. Si une image doit vraiment contenir du texte, limiter aux labels courts, exacts et vérifiables :

- 1 à 3 mots : "Tangente", "Point A", "Pente moyenne".
- Pas de phrase complète dans l'image.
- Pas de formule dans un bitmap génératif.
- Pas de notation critique si une erreur d'une lettre rend le cours faux.

Règle d'acceptation : si un label ou symbole est faux, flou ou ambigu, ne pas retoucher l'explication autour de l'erreur. Refaire une tentative sans texte, puis placer les labels dans un graphe ou une zone HTML séparée.

## Anti-patterns

- Une belle illustration qui ne répond pas à l'intention pédagogique.
- Une métaphore qui remplace la mathématique au lieu de préparer le passage au graphe.
- Une tangente, une sécante ou une courbe mathématique dessinée directement sur une image imagegen.
- Des axes, points ou droites générés approximativement alors que la précision compte.
- Des formules dans une image raster.
- Des labels nombreux, décoratifs ou non relus.
- Une palette monotone ou trop proche d'un thème marketing.
- Une scène trop chargée qui rend le graphe illisible.
- Un visuel qui contredit le cours, par exemple une rampe descendante annotée comme une dérivée positive.

## Checklist qualité

Avant d'accepter un visuel :

- L'intention pédagogique tient en une phrase.
- L'élève peut identifier en moins de cinq secondes l'objet principal.
- Les couleurs ont un rôle constant avec le reste du chapitre.
- Les labels sont courts, lisibles et exacts.
- Les éléments mathématiques précis sont dans un visuel séparé en SVG, HTML, KaTeX ou JSXGraph.
- Le visuel reste lisible en mobile.
- L'alt text décrit l'idée, pas seulement l'apparence.
- Le fichier final est dans le dossier du chapitre, jamais seulement dans un dossier temporaire imagegen.

## Interactions de courbes

Pour les futurs exemples interactifs, utiliser **JSXGraph** quand il faut déplacer un point sur une courbe et recalculer une tangente. Sa documentation expose des éléments adaptés à ce besoin, notamment `Functiongraph`, `Glider`, `Tangent` et `Derivative` : https://jsxgraph.org/docs/

Comparaison rapide :

- **JSXGraph** : bon choix par défaut pour les courbes pédagogiques contrôlées dans une page HTML.
- **Desmos API** : très bon grapheur embarqué, mais l'API demande une clé et convient mieux quand on veut exposer une vraie calculatrice : https://www.desmos.com/api?lang=en
- **GeoGebra** : puissant pour des applets, mais plus lourd pour un simple point déplaçable ; l'intégration recommande le div embedding plutôt que l'iframe quand on veut du contrôle : https://geogebra.github.io/integration/basic-embedding-options.html

## Prototype dérivation

### Image de contexte : skatepark puis courbe interactive

```text
Use case: scientific-educational
Asset type: 16:9 web course context image for a high school math lesson about derivatives
Learning intent: the student understands that the derivative is the local slope at one point
Primary request: a premium comic-book style semi-real skatepark scene that explains local tangent slope intuitively
Scene/backdrop: clean modern skatepark in soft daylight, side-view composition, one smooth concrete half-pipe ramp shaped like a rising mathematical curve
Subject: one skateboarder positioned on the curved ramp, board naturally aligned with the local slope of the ramp
Style/medium: premium bande dessinee / graphic novel look, semi-real proportions, crisp ink, painterly colors
Composition/framing: wide landscape, readable ramp silhouette
Text (verbatim): none
Constraints: no labels, no numbers, no formulas, no watermark, no logo, no speech bubbles, no random text
Follow-up visual: JSXGraph function graph with a glider point A and a tangent element
```

### Graphes exacts à privilégier ensuite

- **Tangente** : JSXGraph avec `functiongraph`, point glissant et tangente recalculée.
- **Taux de variation** : SVG déterministe ou JSXGraph avec deux points \(A\), \(M\) et une sécante.
- **Signe de la dérivée** : SVG déterministe ou JSXGraph pour distinguer clairement \(f'(x)<0\), \(f'(x)=0\) et \(f'(x)>0\).

Ne pas générer ces courbes dans imagegen : l'image sert seulement à aider l'élève à imaginer un contexte réel avant de passer à la représentation mathématique.
