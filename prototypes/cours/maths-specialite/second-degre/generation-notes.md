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

Voir `source-map.md` pour le détail des notions, méthodes, exemples, exercices, pièges, graphes exacts et éléments exclus.

### Notions reprises

- Fonction polynôme du second degré définie sur \(\mathbb{R}\) par \(ax^2+bx+c\), avec \(a\ne0\).
- Vocabulaire de trinôme, racine, sommet, axe de symétrie, minimum, maximum.
- Trois formes : développée, canonique, factorisée.
- Équations simples du second degré avant discriminant.
- Discriminant, racines, factorisation, somme-produit, signe du trinôme et position relative.

### Éléments volontairement exclus de cette version

- Démonstration complète des formules du discriminant depuis la forme canonique : trop lourde pour cette page V2, à réserver à une extension ou un bloc avancé.
- Représentation graphique manuelle point par point : remplacée par des graphes exacts JSXGraph.
- Exercices trop proches des PDFs en grande quantité : la page garde des types représentatifs et doit vérifier les droits avant publication publique.
- Scoring automatique et correction IA de rédaction : hors prototype actuel.

## Adaptations

- Les exercices ont été resserrés et parfois modifiés pour servir la progression du prototype.
- Les corrections sont écrites pour faire apparaître les décisions de méthode et les erreurs de rédaction, pas seulement le résultat.
- Les courbes ajoutées sont des graphes exacts JSXGraph, jamais des tracés à la main.
- Le bloc produit/paywall visible a été retiré du cours élève pour garder une progression mathématique continue ; l'idée reste seulement une note produit à traiter hors contenu pédagogique.

## Limites connues

- Pas de scoring automatique : l'élève utilise les corrections masquées comme auto-évaluation.
- Pas d'IA de correction de rédaction.
- Pas d'intégration au parcours principal du site.
- Les droits de republication des exercices doivent être vérifiés avant mise en ligne publique.
