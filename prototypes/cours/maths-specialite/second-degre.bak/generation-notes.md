# Notes de génération — Second degré

## État

Prototype réel de cours HTML + KaTeX construit depuis quatre PDF sources : deux Maths91 et deux Maths-et-tiques. Le chapitre reste isolé dans `prototypes/cours/` pour itération.

## Intentions pédagogiques

- Baisser la difficulté d'entrée avec un diagnostic court et une intuition visuelle de la parabole.
- Faire produire l'élève à chaque étape : question immédiate, étape manquante, exercice guidé, exercice seul, choix de méthode, rédaction.
- Mettre le choix de méthode au centre : forme canonique pour le sommet, discriminant pour les racines, tableau de signes pour les inéquations, forme factorisée quand elle est déjà disponible.
- Montrer une rédaction de contrôle qui explicite les points qui rapportent.
- Préparer les exercices `20/20` par une porte simple au lieu d'en faire un raccourci décoratif.
- Signaler un point de paywall possible après une première valeur ressentie, sans bloquer le prototype.

## Sources exploitées

- Maths91 cours : architecture complète, théorème du discriminant, signe du trinôme, exemples rédigés.
- Maths91 exercices : banque d'exercices pour les blocs contrôle et 20/20.
- Maths-et-tiques partie 1 : intuition forme canonique, sommet, variations, parabole.
- Maths-et-tiques partie 2 : discriminant, racines, factorisation, signe et inéquations.

## Carte de couverture V2

### Notions reprises

- Fonction polynôme du second degré définie sur \(\mathbb{R}\) par \(ax^2+bx+c\), avec \(a\ne0\).
- Vocabulaire de trinôme, racine, sommet, axe de symétrie, minimum, maximum.
- Trois formes : développée, canonique, factorisée.
- Équations simples du second degré avant discriminant : racine carrée, facteur commun, produit nul, carré nul, absence de solution réelle évidente.
- Discriminant \(\Delta=b^2-4ac\), trois cas, racine double, deux racines distinctes.
- Factorisation réelle selon le signe de \(\Delta\).
- Somme et produit des racines.
- Signe du trinôme et inéquations.
- Position relative de deux courbes par étude du signe de \(f-g\).

### Définitions, propriétés et méthodes conservées

- Définition d'un trinôme et forme développée.
- Forme canonique \(a(x-\alpha)^2+\beta\), avec \(\alpha=-\frac{b}{2a}\) et \(\beta=f(\alpha)\).
- Sommet \(S(\alpha;\beta)\), axe \(x=\alpha\), extremum selon le signe de \(a\).
- Formules des racines quand \(\Delta>0\), racine double quand \(\Delta=0\), absence de racine réelle quand \(\Delta<0\).
- Factorisation \(a(x-x_1)(x-x_2)\) ou \(a(x-x_0)^2\).
- Relations \(x_1+x_2=-\frac{b}{a}\) et \(x_1x_2=\frac{c}{a}\).
- Règle du signe : signe de \(a\), sauf entre les racines lorsqu'elles existent.

### Exemples et exercices adaptés

- Forme canonique de \(2x^2-8x+3\).
- Équations simples inspirées de Maths-et-tiques : \(x^2=25\), \(4x^2-2x=0\), produit nul, carré nul.
- Discriminant sur \(2x^2-x-6=0\) et question de cas \(\Delta<0\).
- Factorisation de \(4x^2+19x-5\) et racine double de \(9x^2-6x+1\).
- Somme-produit avec \(-2x^2+x+1\).
- Inéquation \(x^2-2x-15<0\) et \(-2x^2+7x+4\ge0\).
- Exercices de contrôle et 20/20 : meilleure forme, bénéfice, paramètre, domaine, position relative.

### Erreurs fréquentes ciblées

- Oublier que \(a\ne0\).
- Lire le mauvais signe dans \(a(x-\alpha)^2+\beta\).
- Utiliser \(\Delta\) quand une forme simple suffit.
- Écrire \(b^2<0\) quand \(b\) est négatif.
- Chercher une factorisation réelle quand \(\Delta<0\).
- Garder le mauvais intervalle dans une inéquation à cause du signe de \(a\).
- Donner le résultat sans justifier l'ensemble de solutions.

### Graphes exacts nécessaires

- Orientation \(a>0/a<0\).
- Sommet et axe de symétrie d'une forme canonique.
- Trois cas du discriminant.
- Signe d'un trinôme entre deux racines.
- Maximum d'un bénéfice quadratique.
- Position relative d'une parabole et d'une droite.

### Éléments volontairement exclus de cette version

- Démonstration complète des formules du discriminant depuis la forme canonique : trop lourde pour cette page V2, à réserver à une extension ou un bloc avancé.
- Représentation graphique manuelle point par point : remplacée par des graphes exacts JSXGraph.
- Exercices trop proches des PDFs en grande quantité : la page garde des types représentatifs et doit vérifier les droits avant publication publique.
- Scoring automatique et correction IA de rédaction : hors prototype actuel.

## Adaptations

- Les exercices ont été resserrés et parfois modifiés pour servir la progression du prototype.
- Les corrections sont écrites pour faire apparaître les décisions de méthode et les erreurs de rédaction, pas seulement le résultat.
- Les courbes ajoutées sont des graphes exacts JSXGraph, jamais des tracés à la main : orientation \(a>0/a<0\), sommet de la forme canonique, trois cas du discriminant, signe entre racines, maximum d'un bénéfice et position relative de deux courbes.
- Le bloc KaTeX reste le point d'entrée pour lire \(a>0\), \(a<0\), le sommet et l'extremum depuis la forme canonique avant de passer aux graphes.
- Le bloc produit/paywall visible a été retiré du cours élève pour garder une progression mathématique continue ; l'idée reste seulement une note produit à traiter hors contenu pédagogique.

## Limites connues

- Pas de scoring automatique : l'élève utilise les corrections masquées comme auto-évaluation.
- Pas d'IA de correction de rédaction.
- Pas d'intégration au parcours principal du site.
- Les droits de republication des exercices doivent être vérifiés avant mise en ligne publique.
