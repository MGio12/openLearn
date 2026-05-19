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

## Adaptations

- Les exercices ont été resserrés et parfois modifiés pour servir la progression du prototype.
- Les corrections sont écrites pour faire apparaître les décisions de méthode et les erreurs de rédaction, pas seulement le résultat.
- Le premier visuel de parabole évite désormais toute courbe dessinée à la main : il utilise un bloc de langage mathématique avec KaTeX pour lire \(a>0\), \(a<0\), le sommet et l'extremum depuis la forme canonique.

## Limites connues

- Pas de scoring automatique : l'élève utilise les corrections masquées comme auto-évaluation.
- Pas d'IA de correction de rédaction.
- Pas d'intégration au parcours principal du site.
- Les droits de republication des exercices doivent être vérifiés avant mise en ligne publique.
