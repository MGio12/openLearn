---
source_url: "https://www.mathgm.fr/images/documents/premiere/cours_exercices/Parcours_ProbaCond.pdf"
chapter: "05-probabilites-conditionnelles"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:58+00:00"
cleaned_at: "2026-05-22T08:29:12+00:00"
---

## 1 Vocabulaire/notations

### Exercice 1

1) On choisit au hasard un jour de l’année. On considère les événements :
   * \(P\) : « le jour choisi a été pluvieux » ;
   * \(V\) : « le jour choisi a été venté » ;

   Pour chacune des informations suivantes, indiquer si elle correspond, ou non, à une probabilité conditionnelle, et donner la notation correspondant à cette probabilité.

   a) Dans l’année, 40 % des jours sont pluvieux.
   b) 66 % des jours pluvieux sont ventés.
   c) Parmi les jours non ventés, 22 % sont pluvieux.
   d) 49 % des jours dans l’année n’ont été ni ventés, ni pluvieux.

2) On choisit une personne au hasard dans un groupe constitué de garçons et de filles. On considère les événements suivants : \(F\) : « la personne choisie est une fille » et \(S\) : « la personne choisie pratique un sport en club ».

   a) Traduire les propositions suivantes en utilisant les notations de probabilités :
      * Dans ce groupe il y a 8 % de filles qui font du sport en club.
      * Le sport est pratiqué en club pour 40 % des garçons.
      * Il y a 32 % des personnes qui font du sport en club.
      * Parmi ceux qui pratiquent un sport en club, il y a 25 % de filles.

   b) Traduire en langage naturel les égalités :
      * \(P(\overline{F} \cap S) = 0,24\)
      * \(P_{S}(\overline{F}) = 0,75\)

### Exercice 2

Dans un stock de pommes provenant de deux fournisseurs (A et B), on prend au hasard une pomme. On note : \(A\) : « La pomme provient du fournisseur A » ; \(C\) : « La pomme est commercialisable ». 83 % des pommes provenant du fournisseur A sont commercialisables. En utilisant les événements \(A\) et \(C\), compléter avec une probabilité : \(\ldots \ldots = 0,83\)

## 2 Arbres/Tableaux

### Exercice 3

Dans l’arbre ci-dessous, exprimer chacune des pondérations comme une probabilité (par exemple \(0,65 = P_{A}(B)\)).

\[
\begin{array}{c}
A \xrightarrow{0,2} B \xrightarrow{0,35} \\
A \xrightarrow{0,8} B \xrightarrow{0,58} \\
\end{array}
\]

<!-- UNSURE: L'arbre original est ambigu, les branches ne sont pas clairement représentées. -->

### Exercice 4

On considère deux évènements \(R\) et \(S\) tels que : \(P(R) = \frac{1}{4}\), \(P_{R}(S) = \frac{5}{6}\) et \(P_{\overline{R}}(S) = \frac{11}{12}\). Construire un arbre pondéré avec \(R\) et \(S\).

### Exercice 5

On donne l’arbre de probabilités :

\[
\begin{array}{c}
A \xrightarrow{0,7} B \xrightarrow{0,17} \\
A \xrightarrow{0,3} B \xrightarrow{0,68} \\
\end{array}
\]

Déterminer la probabilité qui est égale à \(0,3\).

### Exercice 6

On considère une urne contenant deux boules rouges et cinq boules vertes. On effectue deux tirages successifs au hasard sans remise. On note \(R_i\) l’événement « On a tiré une boule rouge au \(i\)-ième tirage » et \(V_i\) l’événement « on a tiré une boule verte au \(i\)-ième tirage ». Construire un arbre pondéré représentant cette situation, puis calculer la probabilité de tirer deux boules de couleurs différentes.

### Exercice 7

Dans une classe de 32 élèves, il y a 15 garçons et 28 demi-pensionnaires. 12 garçons sont demi-pensionnaires. Construire un tableau des effectifs en fonction de ces deux critères. On choisit un élève de cette classe au hasard, quelle est la probabilité de choisir une fille sachant qu’elle est demi-pensionnaire ?

### Exercice 8

À partir de l’arbre de probabilités ci-dessous, calculer \(P(A \cap B)\).

\[
\begin{array}{c}
A \xrightarrow{0,8} B \xrightarrow{0,2} \\
\overline{A} \xrightarrow{0,8} B \xrightarrow{0,6} \\
\end{array}
\]

### Exercice 9

Dans un lycée, 60 % des élèves ont une calculatrice graphique dont 80 % sont de marque \(A\). On emprunte la calculatrice d’un élève au hasard et on considère les événements suivants :
* \(G\) : « Sa calculatrice est graphique. »
* \(A\) : « Sa calculatrice est de marque \(A\) »

Quelle est la probabilité que ce soit une calculatrice graphique de marque A ?

### Exercice 10

Dans ce tableau, on note : \(F\) : « La personne est une fille » et \(V\) : « La personne a plus de 20 ans ». On choisit une personne au hasard.

|     | \(F\) | \(\overline{F}\) | Total |
|-----|------|----------------|-------|
| \(V\) | 6    | 44             | 50    |
| \(\overline{V}\) | 56   | 59             | 115   |
| Total | 62   | 103            | 165   |

Déterminer \(P_{V}(F)\).

### Exercice 11

Dans une boulangerie, on dispose d’une réduction si l’on choisit la formule « dessert mystère » pour laquelle le dessert accompagnant le menu est tiré au hasard. Ceyda choisit cette formule alors que les desserts encore disponibles sont répartis comme suit.

|          | Chocolat | Vanille | Total |
|----------|----------|---------|-------|
| Tartelette | 8        | 11      | 19    |
| Éclair    | 13       | 7       | 20    |
| Total     | 21       | 18      | 39    |

On considère les événements \(E\) : « Son dessert est un éclair » et \(V\) : « Son dessert est à la vanille. »

1) Calculer \(p_{E}(V)\), \(p_{V}(E)\), \(p_{\overline{E}}(\overline{V})\).
2) Ceyda voit que son dessert est un éclair. Écrire la probabilité qu’il soit au chocolat comme une probabilité conditionnelle puis la calculer.

## 3 Probabilités totales

### Exercice 12

Soient \(A\) et \(B\) deux événements tels que \(P(A \cap B) = \frac{1}{3}\) et \(P(\overline{A} \cap B) = \frac{1}{5}\). Que vaut \(P(A)\) ?

### Exercice 13

À partir de l’arbre de probabilités ci-dessous, calculer \(P(B)\).

\[
\begin{array}{c}
A \xrightarrow{0,2} B \xrightarrow{0,1} \\
\overline{A} \xrightarrow{0,8} B \xrightarrow{0,9} \\
\end{array}
\]

### Exercice 14

On donne l’arbre de probabilités ci-dessous et \(P(C) = 0,57\).

\[
\begin{array}{c}
A \xrightarrow{\frac{3}{10}} B \xrightarrow{\frac{1}{2}} \\
\overline{A} \xrightarrow{\frac{7}{10}} B \xrightarrow{x} \\
\end{array}
\]

Déterminer la valeur de \(x\).

### Exercice 15

Pour ses révisions, un élève utilise des annales de mathématiques. Dans ces annales, 10 % des exercices sont des QCM, 22 % des exercices ont des questions sur les probabilités et 4 % sont des QCM qui ont des questions sur les probabilités. L’élève choisit au hasard un exercice dans la liste. On définit les événements suivants :
* \(Q\) : « l’exercice choisi est un QCM » ;
* \(R\) : « l’exercice choisi a des questions sur des probabilités ».

1) Donner les probabilités indiquées dans l’énoncé.
2) Calculer \(P_{Q}(R)\) et \(P_{R}(Q)\) et préciser par une phrase à quoi correspondent chacune de ces probabilités.
3) Réaliser un arbre pondéré.

### Exercice 16

On s’intéresse à la clientèle d’un musée. Chaque visiteur peut acheter son billet sur internet avant sa visite ou l’acheter aux caisses du musée à son arrivée. Pour l’instant, la location d’un audioguide pour la visite n’est possible qu’aux caisses du musée. Le directeur s’interroge sur la pertinence de proposer la réservation des audioguides sur internet. Une étude est réalisée. Elle révèle que :
* 70 % des clients achètent leur billet sur internet ;
* parmi les clients achetant leur billet sur internet, 35 % choisissent à leur arrivée au musée une visite avec un audioguide ;
* parmi les clients achetant leur billet aux caisses du musée, 55 % choisissent une visite avec un audioguide.

On choisit au hasard un client du musée. On note :
* \(A\) : « Le client choisit une visite avec un audioguide » ;
* \(B\) : « Le client achète son billet sur internet avant sa visite ».

1) Représenter la situation à l’aide d’un arbre pondéré.
2) Calculer la probabilité que le client choisisse une visite avec un audioguide.

### Exercice 17

Lorsque le basketteur Stephen Curry tire en match, il y a 53 % de chance que ce soit un tir à 2 points et 47 % que ce soit un tir à 3 points. De plus, quand il tire à 2 points, son pourcentage de réussite est de 51,5 % contre 43,5 % à 3 points. Lorsque Curry tire en match, on considère les événements \(D\) : « Il tire à 2 points » et \(M\) : « Il marque. » Recopier et compléter l’arbre pondéré ci-dessous puis calculer \(p(M)\).

\[
\begin{array}{c}
D \xrightarrow{\ldots} M \xrightarrow{\ldots} \\
\overline{D} \xrightarrow{\ldots} M \xrightarrow{\ldots} \\
\end{array}
\]

Les résultats seront arrondis à \(10^{-3}\) si nécessaire.

### Exercice 18

On rappelle que le triathlon est une discipline qui comporte trois sports : la natation, le cyclisme et la course à pied. Fabien s’entraîne tous les jours pour un triathlon et organise son entraînement de la façon suivante :
* chaque entraînement est composé d’un ou deux sports et commence toujours par une séance de course à pied ou de vélo ;
* lorsqu’il commence par une séance de course à pied, il enchaîne avec une séance de natation avec une probabilité de 0,4 ;
* lorsqu’il commence par une séance de vélo, il enchaîne avec une séance de natation avec une probabilité de 0,8.
* Un jour d’entraînement, la probabilité que Fabien pratique une séance de vélo est de 0,3.

On note :
* \(C\) l’évènement : « Fabien commence par une séance de course à pied » ;
* \(V\) l’évènement : « Fabien commence par une séance de vélo » ;
* \(N\) l’évènement : « Fabien enchaîne par une séance de natation ».

1) Réaliser un arbre pour modéliser la situation.
2) Quelle est la probabilité que Fabien commence par une séance de course à pied et enchaîne par une séance de natation ?
3) Démontrer que : \(P(N) = 0,52\).
4) Sachant que Fabien n’a pas fait de séance de natation, quelle est la probabilité qu’il ait commencé son entraînement par une séance de vélo ?

## 4 Indépendance

### Exercice 19

On considère deux événements \(A\) et \(B\) tels que \(p(A) = 0,3\), \(p(B) = 0,6\) et \(p(A \cap B) = 0,2\). Les événements \(A\) et \(B\) sont-ils indépendants ?

### Exercice 20

\(A\) et \(B\) sont deux évènements, et on donne : \(P(A) = \frac{3}{7}\), \(P(B) = \frac{3}{20}\), \(P(A \cup B) = \frac{4}{7}\).

1) Calculer \(p(A \cap B)\)
2) \(A\) et \(B\) sont-ils des évènements indépendants ?
3) Calculer \(P_{A}(B)\) et \(P_{B}(A)\)

### Exercice 21

Dans un magasin de meubles, il y a 55 % de canapés dont 14 % en cuir, 30 % de fauteuils dont 20 % en cuir et le reste est constitué de poufs dont 42 % en cuir. Un client se présente et choisit un meuble. On considère les évènements :
* \(F\) : « le meuble choisi est un fauteuil » ;
* \(C\) : « le meuble choisi est en cuir ».

Montrer que ces deux évènements sont indépendants.

## 5 S’entraîner/Approfondir

### Exercice 22

Dans un supermarché, on réalise une étude sur la vente de bouteilles de jus de fruits sur un mois.
* 40 % des bouteilles vendues sont des bouteilles de jus d’orange ;
* 25 % des bouteilles de jus d’orange vendues possèdent l’appellation « pur jus ».
* Parmi les bouteilles qui ne sont pas de jus d’orange, la proportion des bouteilles de « pur jus » est notée \(x\), où \(x\) est un réel de l’intervalle \([0 ; 1]\).
* Par ailleurs, 20 % des bouteilles de jus de fruits vendues possèdent l’appellation « pur jus ».

On prélève au hasard une bouteille de jus de fruits passée en caisse. On définit les évènements suivants :
\(R\) : la bouteille prélevée est une bouteille de jus d’orange ;
\(J\) : la bouteille prélevée est une bouteille de « pur jus ».

1) Représenter cette situation à l’aide d’un arbre.
2) Déterminer la valeur exacte de \(x\).
3) Une bouteille passée en caisse et prélevée au hasard est une bouteille de « pur jus ». Calculer la probabilité que ce soit une bouteille de jus d’orange.

### Exercice 23

Une agence de voyage propose deux formules week-end pour se rendre à Londres depuis Paris. Les clients choisissent leur moyen de transport : train ou avion. De plus, s’ils le souhaitent, ils peuvent compléter leur formule par l’option « visites guidées ». Une étude a produit les données suivantes :
* 61 % des clients optent pour l’avion ;
* Parmi les clients ayant choisi le train, 69 % choisissent aussi l’option « visites guidées ».
* 44 % des clients ont choisi à la fois l’avion et l’option « visites guidées ».

On interroge au hasard un client de l’agence ayant souscrit à une formule week-end à Londres. On considère les évènements suivants :
* \(A\) : le client a choisi l’avion.
* \(V\) : le client a choisi l’option « visites guidées ».

1) Déterminer \(P_{A}(V)\).
2) Démontrer que la probabilité pour que le client interrogé ait choisi l’option « visites guidées » est environ égale à 0,709.
3) Calculer la probabilité pour que le client interrogé ait pris l’avion sachant qu’il n’a pas choisi l’option « visites guidées ». Arrondir le résultat au centième.
4) On interroge au hasard deux clients de manière aléatoire et indépendante. Quelle est la probabilité qu’aucun des deux ne prenne l’option « visites guidées » ? On donnera les résultats sous forme de valeurs approchées à \(10^{-3}\) près.

### Exercice 24

Dans une ville, une enquête portant sur les habitudes des ménages en matière d’écologie a donné les résultats suivants :
* 70 % des ménages pratiquent le tri sélectif ;
* parmi les ménages pratiquant le tri sélectif, 40 % consomment des produits bio ;
* parmi les ménages ne pratiquant pas le tri sélectif, 10 % consomment des produits bio.

On choisit un ménage au hasard (tous les ménages ayant la même probabilité d’être choisis) et on note :
\(T\) l’évènement « le ménage pratique le tri sélectif » et \(\overline{T}\) son évènement contraire ;
\(B\) l’évènement « le ménage consomme des produits bio » et \(\overline{B}\) son évènement contraire.

1) a) Donner sans justification la probabilité \(p(T)\) de l’évènement \(T\).
   b) Donner sans justification \(p_{T}(B)\) et \(p_{\overline{T}}(B)\)
2) Représenter la situation à l’aide d’un arbre pondéré.
3) a) Calculer la probabilité de l’évènement : « le ménage pratique le tri sélectif et consomme des produits bio ».
   b) Montrer que la probabilité que le ménage consomme des produits bio est égale à 0,31.
4) Calculer la probabilité que le ménage pratique le tri sélectif sachant qu’il consomme des produits bio (arrondir au centième).
5) Les évènements \(T\) et \(B\) sont-ils indépendants ?
6) Calculer la probabilité de l’évènement \(T \cup B\) puis interpréter ce résultat.
7) Cette ville décide de valoriser les ménages ayant un comportement éco-citoyen. Pour cela, elle donne chaque année un chèque de 20 € aux ménages qui pratiquent le tri sélectif et un chèque de 10 € aux ménages qui consomment des produits bio sur présentation de justificatifs (les deux montants peuvent être cumulés).
   a) Quelles sont les différentes sommes versées par cette ville à un habitant ? (on n’attend pas de justification).
   b) Compléter le tableau suivant :

| Sommes versées | Probabilités |
|----------------|--------------|
|                |              |
|                |              |
|                |              |
|                |              |

### Exercice 25

Une angine peut être provoquée soit par une bactérie (angine bactérienne) soit par un virus (angine virale). On admet qu’un malade ne peut pas être à la fois porteur du virus et de la bactérie. L’angine est bactérienne dans 20 % des cas. Pour déterminer si une angine est bactérienne, on dispose d’un test. Le résultat du test peut être positif ou négatif. Le test est conçu pour être positif lorsque l’angine est bactérienne mais il présente des risques d’erreur :
* si l’angine est bactérienne, le test est négatif dans 30 % des cas
* si l’angine est virale, le test est positif dans 10 % des cas

On choisit au hasard un malade atteint d’angine. On note :
* \(B\) l’évènement : « l’angine est bactérienne » ;
* \(T\) l’évènement : « le test effectué sur le malade est positif ».

Si besoin, les résultats seront arrondis à \(10^{-3}\) près.

1) Représenter la situation par un arbre pondéré.
2) Quelle est la probabilité que l’angine soit bactérienne et que le test soit positif ?
3) Montrer que la probabilité que le test soit positif est 0,22.
4) Un malade est choisi au hasard parmi ceux dont le test est positif. Quelle est la probabilité pour que son angine soit bactérienne ?

### Exercice 26

Une entreprise qui fabrique des aiguilles dispose de deux sites de production, le site A et le site B. Le site A produit les trois-quarts des aiguilles, le site B l’autre quart. Certaines aiguilles peuvent présenter un défaut. Une étude de contrôle de qualité a révélé que :
* 2 % des aiguilles du site A sont défectueuses ;
* 4 % des aiguilles du site B sont défectueuses.

Les aiguilles provenant des deux sites sont mélangées et vendues ensemble par lots. On choisit une aiguille au hasard dans un lot et on considère les évènements suivants :
* \(A\) : l’aiguille provient du site A ;
* \(B\) : l’aiguille provient du site B ;
* \(D\) : l’aiguille présente un défaut.
* L’évènement contraire de \(D\) est noté \(\overline{D}\).

1) D’après les données de l’énoncé, donner la valeur de la probabilité de l’évènement \(A\) que l’on notera \(P(A)\).
2) Recopier et compléter sur la copie l’arbre de probabilités ci-dessous en indiquant les probabilités sur les branches.
3) Quelle est la probabilité que l’aiguille ait un défaut et provienne du site A ?
4) Montrer que \(P(D) = 0,025\).
5) Après inspection, l’aiguille choisie se révèle défectueuse. Quelle est la probabilité qu’elle ait été produite sur le site A ?

\[
\begin{array}{c}
A \xrightarrow{\ldots} D \xrightarrow{\ldots} \\
\overline{A} \xrightarrow{\ldots} D \xrightarrow{\ldots} \\
\end{array}
\]

---

## Corrigés

### Corrigé de l’exercice 1

1) a) Non, \(P(P) = 0,4\).
   b) Oui, \(P_{P}(V) = 0,66\).
   c) Oui, \(P_{\overline{V}}(P) = 0,22\).
   d) Non, \(P(\overline{V} \cap \overline{P}) = 0,49\).

2) a) * \(P(F \cap S) = 0,08\).
      * \(P_{\overline{F}}(S) = 0,4\).
      * \(P(S) = 0,32\).
      * \(P_{S}(F) = 0,25\).
   b) * Dans ce groupe, il y a 24 % de garçons qui pratiquent du sport en club.
      * Parmi les personnes qui pratiquent un sport en club, 75 % sont des garçons.

### Corrigé de l’exercice 2

Il s’agit d’une probabilité conditionnelle. Le pourcentage s’applique sur l’ensemble des pommes du fournisseur A. \(P_{A}(C) = 0,83\).

### Corrigé de l’exercice 3

1) \(0,2 = P(A)\)
2) \(0,8 = P(\overline{A})\)
3) \(0,35 = P_{A}(B)\)
4) \(0,65 = P_{A}(\overline{B})\)
5) \(0,58 = P_{\overline{A}}(B)\)
6) \(0,42 = P_{\overline{A}}(\overline{B})\)

### Corrigé de l’exercice 4

\[
\begin{array}{c}
R \xrightarrow{1/4} S \xrightarrow{5/6} \\
\overline{R} \xrightarrow{3/4} S \xrightarrow{1/12} \\
\end{array}
\]

### Corrigé de l’exercice 5

Les probabilités conditionnelles se lisent sur la deuxième partie de l’arbre :
* \(P(R) = 0,7\)
* \(P(\overline{R}) = 0,3\)
* \(P_{R}(T) = 0,17\)
* \(P_{R}(\overline{T}) = 0,83\)
* \(P_{\overline{R}}(T) = 0,68\)
* \(P_{\overline{R}}(\overline{T}) = 0,32\)

### Corrigé de l’exercice 6

\[
\begin{array}{c}
R_1 \xrightarrow{2/7} R_2 \xrightarrow{1/6} \\
V_1 \xrightarrow{5/7} R_2 \xrightarrow{1/3} \\
\end{array}
\]

\(p = \frac{10}{21}\)

### Corrigé de l’exercice 7

|     | \(DP\) | \(\overline{DP}\) | Total |
|-----|-------|-----------------|-------|
| \(G\) | 12    | 3               | 15    |
| \(F\) | 16    | 1               | 17    |
| Total | 28    | 4               | 32    |

\(P_{DP}(F) = \frac{4}{7}\)

### Corrigé de l’exercice 8

\(P(A \cap B) = P(A) \times P_{A}(B)\). \(P(A) = 1 - 0,8 = 0,2\). \(P_{A}(B) = 1 - 0,6 = 0,4\). Ainsi, \(P(A \cap B) = P(A) \times P_{A}(B) = 0,2 \times 0,4 = 0,08\).

### Corrigé de l’exercice 9

\(p(G) = 0,6\) et \(p_{G}(A) = 0,8\) et on cherche \(p(G \cap A)\) : \(p(G \cap A) = p(G) \times p_{G}(A) = 0,6 \times 0,8 = 0,48\).

### Corrigé de l’exercice 10

La probabilité est donnée par : \(P_{V}(F) = \frac{\text{Nombre de garçons de moins de 20 ans}}{\text{Nombre de personnes de moins de 20 ans}} = \frac{59}{115}\)

### Corrigé de l’exercice 11

1) \(p_{E}(V) = \frac{7}{20}\) ; \(p_{V}(E) = \frac{7}{18}\) et \(p_{\overline{E}}(\overline{V}) = \frac{11}{19}\).
2) On cherche \(p_{E}(\overline{V}) = \frac{13}{20}\).

### Corrigé de l’exercice 12

\(P(A) = \frac{1}{3} + \frac{1}{5}\) par la formule des probabilités totales (\(\{B, \overline{B}\}\) partition de \(\Omega\)).

### Corrigé de l’exercice 13

D’après la formule des probabilités totales,
\(P(B) = P(A \cap B) + P(\overline{A} \cap B) = P(A) \times P_{A}(B) + P(\overline{A}) \times P_{\overline{A}}(B) = 0,2 \times 0,9 + 0,8 \times 0,1 = 0,26\)

### Corrigé de l’exercice 14

Comme \(A\) et \(\overline{A}\) forment une partition de l’univers, d’après la loi des probabilités totales : \(P(C) = P(A \cap C) + P(\overline{A} \cap C)\). Or \(P(\overline{A} \cap C) = P(\overline{A}) \times P_{\overline{A}}(C) = 0,7x\). Donc \(0,7x = P(C) - P(A \cap C) = 0,57 - 0,3 \times 0,5 = 0,57 - 0,15 = 0,42\). Donc \(x = \frac{0,42}{0,7} = 0,6\)

### Corrigé de l’exercice 15

1) \(P(Q) = 0,1\), \(P(R) = 0,22\), \(P(R \cap Q) = 0,04\).
2) \(P_{Q}(R) = 0,1\) et \(P_{R}(Q) = \frac{2}{11}\)
3) Arbre pondéré :

\[
\begin{array}{c}
Q \xrightarrow{0,1} R \xrightarrow{0,4} \\
\overline{Q} \xrightarrow{0,9} R \xrightarrow{0,2} \\
\end{array}
\]

### Corrigé de l’exercice 16

1) Arbre pondéré :

\[
\begin{array}{c}
B \xrightarrow{0,7} A \xrightarrow{0,35} \\
\overline{B} \xrightarrow{0,3} A \xrightarrow{0,55} \\
\end{array}
\]

2) \(P(A) = 0,41\).

### Corrigé de l’exercice 17

D’après l’énoncé, \(p(D) = 0,53\), \(p(\overline{D}) = 0,47\), \(p_{D}(M) = 0,515\) et \(p_{\overline{D}}(M) = 0,435\). Les autres probabilités se déduisent par différence avec 1. Par la formule des probabilités totales : \(p(M) = p(D) \times p_{D}(M) + p(\overline{D}) \times p_{\overline{D}}(M) = 0,53 \times 0,515 + 0,47 \times 0,435 = 0,4774\).

### Corrigé de l’exercice 18

1) L’arbre de probabilité correspondant à la situation est :

\[
\begin{array}{c}
C \xrightarrow{0,7} N \xrightarrow{0,4} \\
V \xrightarrow{0,3} N \xrightarrow{0,8} \\
\end{array}
\]

2) Déterminons \(P(C \cap N)\). En utilisant la formule des probabilités conditionnelles, \(P(C \cap N) = P_{C}(N) \times P(C) = 0,7 \times 0,4 = 0,28\).
3) En utilisant la formule des probabilités totales, \(P(N) = P(C \cap N) + P(V \cap N) = P(C) \times P_{C}(N) + P(V) \times P_{V}(N) = 0,7 \times 0,4 + 0,3 \times 0,8 = 0,28 + 0,24 = 0,52\).
4) On veut calculer \(P_{\overline{N}}(V)\). En utilisant la formule de Bayes, \(P_{\overline{N}}(V) = \frac{P(\overline{N} \cap V)}{P(\overline{N})} = \frac{0,3 \times 0,2}{1 - 0,52} = 0,125\)

### Corrigé de l’exercice 19

\(p(A) \times p(B) = 0,3 \times 0,6 = 0,18 \neq p(A \cap B)\), donc \(A\) et \(B\) ne sont pas indépendants.

### Corrigé de l’exercice 20

1) On sait que \(P(A \cup B) = P(A) + P(B) - P(A \cap B)\), soit \(\frac{4}{7} = \frac{3}{7} + \frac{3}{20} - P(A \cap B)\), d’où : \(P(A \cap B) = \frac{3}{7} + \frac{3}{20} - \frac{4}{7} = \frac{3}{20} - \frac{1}{7} = \frac{21}{140} - \frac{20}{140} = \frac{1}{140}\).
2) On a \(P(A) \times P(B) = \frac{9}{140}\) et \(P(A \cap B) = \frac{1}{140}\) : les évènements \(A\) et \(B\) ne sont pas indépendants.
3) \(P_{A}(B) = \frac{P(A \cap B)}{P(A)} = \frac{\frac{1}{140}}{\frac{3}{7}} = \frac{1}{140} \times \frac{7}{3} = \frac{1}{60}\).
   \(P_{B}(A) = \frac{P(A \cap B)}{P(B)} = \frac{\frac{1}{140}}{\frac{3}{20}} = \frac{1}{140} \times \frac{20}{3} = \frac{1}{21}\).

### Corrigé de l’exercice 21

Calculez \(P(C)\), puis calculez \(P(F \cap C)\) et montrez que \(P(F) \times P(C) = P(F \cap C)\).

### Corrigé de l’exercice 22

1) On représente cette situation à l’aide d’un arbre pondéré :

\[
\begin{array}{c}
R \xrightarrow{0,4} J \xrightarrow{0,25} \\
\overline{R} \xrightarrow{0,6} J \xrightarrow{x} \\
\end{array}
\]

2) On sait que 20 % des bouteilles de jus de fruits vendues possèdent l’appellation « pur jus » donc \(P(J) = 0,2\). D’après la formule des probabilités totales : \(P(J) = P(R \cap J) + P(\overline{R} \cap J) = P(R) \times P_{R}(J) + P(\overline{R}) \times P_{\overline{R}}(J) = 0,4 \times 0,25 + 0,6 \times x = 0,1 + 0,6x\). On a donc \(0,2 = 0,1 + 0,6x \iff x = \frac{1}{6}\).
3) Une bouteille passée en caisse et prélevée au hasard est une bouteille de « pur jus ». C
