---
source_url: "https://www.vdouine.net/docmaths/1e/1echap4act.pdf"
chapter: "09-variables-aleatoires"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:03+00:00"
cleaned_at: "2026-05-22T08:31:01+00:00"
---

## Une expérience et une variable aléatoire

Un sac contient 20 jetons unicolores :
* 9 rouges,
* 4 verts,
* 4 jaunes,
* 3 noirs.

Un joueur prend au hasard un jeton du sac :
* Si le jeton est noir il gagne 5 €,
* S’il est vert ou jaune il gagne 3 €,
* S’il est rouge il perd 2 €.

Soit \(X\) la variable aléatoire qui, à chaque tirage, associe le gain algébrique du joueur.

La loi de probabilité de la variable aléatoire \(X\) est donnée par le tableau suivant :

| \(x_i\) | \(-2\) | \(3\) | \(5\) |
|--------|-------|-----|-----|
| \(p_i\) |       |     |     |

### Trois formules à connaître

* Espérance : \(E(X) = \sum_i p_i \times x_i\)
* Variance : \(V(X) = \sum_i p_i \times (x_i - E(X))^2\)
* Écart type : \(\sigma_X = \sqrt{V(X)}\)

| \(x_i\) | \(-2\) | \(3\) | \(5\) |
|--------|-------|-----|-----|
| \(p_i\) |       |     |     |
| \((x_i - E(X))^2\) |       |     |     |

Calculer l’espérance, la variance puis l’écart type de la variable aléatoire \(X\). On pourra s’aider du tableau ci-dessus afin d’organiser les différents calculs. Que représente l’espérance ?

## Avec un cube

On dispose d’un cube en bois de 3 cm d’arête peint en bleu. On le découpe, parallèlement aux faces, en 27 cubes de 1 cm d’arête. On place ces 27 cubes dans un sac. On tire au hasard l’un des 27 cubes du sac.

On suppose que les tirages sont équiprobables.

Soit \(X\) la variable aléatoire qui à chaque tirage associe le nombre de faces peintes sur le cube tiré.

1. Déterminer la loi de probabilité de la variable aléatoire \(X\).
2. Calculer l’espérance mathématique de la variable aléatoire \(X\).

## Avec une roulette

On considère une roulette que l’on fait tourner. Lorsqu’elle s’arrête on peut considérer que la flèche s’immobilise au hasard sur l’un des quinze numéros. On suppose que les quinze secteurs angulaires sont égaux. On notera \(Y\) la variable aléatoire représentant le gain du joueur. Les règles du jeu sont les suivantes :
* On mise 2 € sur un numéro (la mise est automatiquement perdue),
* Si le numéro misé sort, on gagne 20 €, si l’un des numéros voisins sort, on gagne 3 €,
* Sinon on ne gagne rien.

1. Déterminer les différentes valeurs prises par la variable aléatoire \(Y\).
2. Établir dans un tableau la loi de probabilité de la variable aléatoire \(Y\).
3. Calculer l’espérance de cette variable aléatoire. À quoi correspond cette valeur ?

## Avec des boules

Une urne contient 2 boules vertes, 5 boules blanches et 8 boules rouges. Après avoir misé, un joueur tire au hasard une boule de l’urne. La mise est un nombre réel noté \(m\). Les règles du jeu :
* Si la boule est verte il reçoit 16 €,
* Si elle est blanche il récupère sa mise,
* Si elle est rouge il perd sa mise.

On appelle \(Z\) la variable aléatoire représentant le gain du joueur à l’issue de la partie.

1. Déterminer la loi de probabilité de \(Z\).
2. Déterminer la mise \(m\) pour que le jeu soit équitable.

## Une loterie

Lors d’une loterie, un joueur mise 1 euro. S’il gagne la partie, il reçoit 5 euros. S’il perd la partie, il ne reçoit rien. La probabilité que le joueur gagne la partie est \(\frac{7}{30}\). On note \(X\) la variable aléatoire égale au gain algébrique du joueur à l’issue d’une partie.

1. Déterminer la loi de probabilité de \(X\).
2. Calculer l’espérance mathématique de \(X\). Interpréter.
3. Ce jeu est-il favorable ou défavorable au joueur ? Justifier.

## Deux dés

Un joueur mise \(m\) euros et lance deux dés équilibrés. Si la somme des deux nombres est égale à 7, il gagne 15 euros, sinon, il ne gagne rien. On appelle \(Y\) la variable aléatoire égale au gain algébrique du joueur à l’issue de la partie.

1. Déterminer la loi de probabilité de \(Y\).
2. Quand peut-on dire qu’un jeu d’argent est équitable ?
3. Déterminer la valeur de la mise pour que ce jeu d’argent soit équitable.

## Jeu électronique

Un jeu de hasard électronique est composé d’une cible (voir ci-contre) et d’un dispositif allumant de manière aléatoire une des cases.

<!-- UNSURE: La disposition des cases n'est pas claire dans le texte original. -->

La mise pour une partie est de \(m\) euros. Chaque case a la même probabilité de s’allumer.
* Si une case rouge s’allume, le joueur gagne 16 €,
* Si une case verte s’allume, le joueur gagne 7 €,
* Si une case jaune s’allume, le joueur ne gagne rien,
* Si une case bleue s’allume, le joueur perd 2 €.

On note \(G\) la variable aléatoire représentant le gain algébrique du joueur. Déterminer la loi de probabilité de cette variable aléatoire. Déterminer la valeur de \(m\) pour que le jeu soit équitable.

## Mariage en Russie

Dans certaines régions rurales de Russie, on prévoyait les mariages de la manière suivante : une jeune fille tenait dans sa main 3 longs brins d’herbe repliés en deux, dont les six extrémités dépassaient sous sa main (dessin 1) ; une autre jeune fille nouait au hasard les extrémités deux par deux ; si le résultat formait une seule boucle fermée (dessin 2), c’est que la jeune fille qui nouait les brins d’herbe allait se marier dans l’année.

On note \(X\) le nombre de boucles fermées obtenues. À l’aide des documents proposés ci-dessous, déterminer l’ensemble des valeurs prises par la variable aléatoire \(X\). Donner la loi de probabilité de \(X\). Calculer l’espérance de \(X\) et interpréter.

## Produit des faces de deux dés

Un joueur mise 4 euros (la mise est immédiatement perdue) et lance deux dés équilibrés.
* Si le produit des deux nombres est impair, il gagne 36 euros,
* Sinon, il ne gagne rien.

On appelle \(Y\) la variable aléatoire égale au gain algébrique du joueur à l’issue de la partie.

1. Déterminer la loi de probabilité de \(Y\).
2. Calculer l’espérance de \(Y\). Le jeu est-il équitable ?

| × | 1 | 2 | 3 | 4 | 5 | 6 |
|---|----|----|----|----|----|----|
| 1 | 1 | 2 | 3 | 4 | 5 | 6 |
| 2 | 2 | 4 | 6 | 8 | 10 | 12 |
| 3 | 3 | 6 | 9 | 12 | 15 | 18 |
| 4 | 4 | 8 | 12 | 16 | 20 | 24 |
| 5 | 5 | 10 | 15 | 20 | 25 | 30 |
| 6 | 6 | 12 | 18 | 24 | 30 | 36 |

## Somme des faces de deux dés

Un joueur mise 6 euros (la mise est immédiatement perdue) et lance deux dés équilibrés.
* Si la somme des deux nombres est égale à 7, il gagne 30 euros,
* Sinon, il ne gagne rien.

On appelle \(Z\) la variable aléatoire égale au gain algébrique du joueur à l’issue de la partie.

1. Déterminer la loi de probabilité de \(Z\).
2. Calculer l’espérance de \(Z\). Le jeu est-il équitable ?

| + | 1 | 2 | 3 | 4 | 5 | 6 |
|---|----|----|----|----|----|----|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 |

## Une roulette

La roulette proposée ci-contre contient 4 secteurs angulaires. Les deux secteurs « 0 € » mesurent 120° chacun tandis que les deux secteurs « 8 € » mesurent 60° chacun. On estime que la probabilité de tomber sur chacun de ces 4 secteurs est proportionnelle à la mesure de l’angle formé par le secteur.

Pour jouer, on mise \(m\) euros, la mise étant automatiquement perdue. Elle donne le droit au joueur de tourner la roue une fois. Le joueur gagne la somme indiquée sur le secteur angulaire obtenu. On note \(X\) la variable aléatoire correspondant au gain algébrique du joueur.

1. Déterminer la loi de probabilité de \(X\).
2. Déterminer la valeur de la mise \(m\) rendant ce jeu équitable. Arrondir au centime près.
3. Reprendre l’intégralité de l’exercice si la mise permet de tourner la roue deux fois de suite et si la variable aléatoire \(X\) correspond à la somme des deux résultats successifs obtenus.

## Correcte compréhension et utilisation de certaines notations

### Situation 1

Une urne contient 50 tickets numérotés et sa composition est détaillée dans le tableau ci-dessous.

On tire au hasard un ticket et on note \(X\) la variable aléatoire donnant le numéro du ticket tiré. Déterminer les probabilités suivantes après avoir détaillé les événements correspondants :

* \(p(X = 15)\)
* \(p(X \leq 25)\)
* \(p(X \geq 40)\)
* \(p(X < 31)\)
* \(p(X > 20)\)

### Situation 2

Soit une variable aléatoire \(X\) dont la loi de probabilité est donnée dans le tableau proposé ci-dessous. Déterminer les probabilités après avoir détaillé les événements correspondants :

* \(p(X = 8)\)
* \(p(X \leq 0)\)
* \(p(X \geq 7)\)
* \(p(X < 0)\)
* \(p(X > 7)\)

### Situation 3

À l’issue d’une chaîne de fabrication de jouets en bois, on recherche deux types de défauts : les défauts de solidité et les défauts de couleur. Une étude a permis de dresser le tableau suivant sur un échantillon de 1000 jouets. À réparer, un défaut de couleur coûte 5 euros par jouet tandis qu’un défaut de solidité coûte 12 euros par jouet. On note \(X\) la variable aléatoire donnant le coût de réparation d’un objet avant d’être mis sur le marché. Déterminer la loi de probabilité de \(X\) puis déterminer les probabilités suivantes : \(p(X \leq 5)\), \(p(X \geq 12)\), \(p(X \geq 5)\), \(p(X \leq 12)\).

## Formules des probabilités totales et variables aléatoires

### Situation 1

Un commerçant propose en promotion un modèle d’appareil photo numérique et un modèle de carte mémoire compatible avec cet appareil. Il a constaté, lors d’une précédente promotion, que :
* 20% des clients achètent l’appareil photo numérique en promotion,
* 70% des clients qui achètent l’appareil en promotion achètent aussi la carte mémoire,
* 25% des clients qui n’achètent pas l’appareil photo numérique en promotion achètent quand même la carte mémoire.

On note \(A\) l’événement « le client achète l’appareil photo en promotion » et \(C\) l’événement « le client achète la carte mémoire en promotion ». Le commerçant sait qu’il réalise un bénéfice de 30 € sur chaque appareil photo numérique en promotion vendu et il sait qu’il réalise un bénéfice de 4 € sur chaque carte mémoire compatible en promotion vendue.

On note \(B\) la variable aléatoire correspondant au bénéfice réalisé par le commerçant au cours de cette opération promotionnelle.

1. Recopier et compléter l’arbre pondéré des probabilités modélisant la situation décrite.
2. Déterminer la loi de probabilité de \(B\).
3. Pour 100 clients entrant dans son magasin, quel bénéfice le commerçant peut-il espérer obtenir ?

### Situation 2

On dispose dans une urne \(n\) boules vertes et 9 boules rouges. On pioche successivement et AVEC remise deux boules de cette urne. À chaque boule verte piochée on gagne 2,50 € tandis qu’à chaque boule rouge piochée on perd 1,5 €. On note \(X\) le gain algébrique du joueur.

1. Recopier et compléter l’arbre pondéré proposé ci-contre résumant la situation décrite.
2. Déterminer la loi de probabilité de \(X\), calculer son espérance en fonction de \(n\) et étudier son signe.
3. Combien de boules vertes doit-on mettre pour que le jeu soit favorable au joueur ?

### Situation 3

On dispose dans une urne \(n\) boules vertes et 9 boules rouges. On pioche successivement et SANS remise deux boules de cette urne. À chaque boule verte piochée on gagne 2,50 € tandis qu’à chaque boule rouge piochée on perd 1,5 €. On note \(Y\) le gain algébrique du joueur.

1. Recopier et compléter l’arbre pondéré proposé ci-contre résumant la situation décrite.
2. Déterminer la loi de probabilité de \(Y\), calculer son espérance en fonction de \(n\) et étudier son signe.
3. Combien de boules vertes doit-on mettre pour que le jeu soit favorable au joueur ?

### Situation 4

On considère une urne dans laquelle on dispose \(n\) boules blanches et 7 boules rouges. On pioche successivement et AVEC remise deux boules de cette urne. À chaque boule blanche piochée on gagne 10 euros tandis qu’à chaque boule rouge piochée on perd 5 euros. On note \(X\) le gain algébrique du joueur et on souhaite déterminer le nombre de boules blanches que l’on doit mettre dans cette urne pour que le jeu soit favorable au joueur. Après avoir dressé un arbre pondéré résumant la situation, déterminer la loi de probabilité de \(X\), calculer son espérance en fonction de \(n\) et étudier son signe à l’aide de vos connaissances sur le second degré.

### Situation 5

On considère une urne dans laquelle on dispose 7 boules blanches et \(n\) boules rouges. On pioche successivement et SANS remise deux boules de cette urne. À chaque boule blanche piochée on gagne 10 euros tandis qu’à chaque boule rouge piochée on perd 5 euros. On note \(Y\) le gain algébrique du joueur et on souhaite déterminer le nombre de boules rouges que l’on doit mettre dans cette urne pour que le jeu soit favorable au joueur. Après avoir dressé un arbre pondéré résumant la situation, déterminer la loi de probabilité de \(Y\), calculer son espérance en fonction de \(n\) et étudier son signe à l’aide de vos connaissances sur le second degré.

## De l’espérance à la notion de variance

Xavier et Yves s’affrontent en vue d’une sélection lors d’une épreuve comportant 20 tirs sur cible.

Xavier : 50 – 20 – 20 – 30 – 10 – 20 – 30 – 10 – 50 – 30 – 0 – 20 – 30 – 50 – 10 – 50 – 20 – 30 – 30 – 10

Yves : 50 – 20 – 20 – 50 – 10 – 20 – 30 – 10 – 50 – 30 – 0 – 20 – 0 – 50 – 10 – 50 – 20 – 50 – 30 – 0

* On note \(X\) la variable aléatoire correspondant aux points obtenus par Xavier.
* On note \(Y\) la variable aléatoire correspondant aux points obtenus par Yves.

1. Calculer l’espérance des deux variables aléatoires. Cet indicateur permet-il de départager les joueurs ?
2. Calculer la variance des deux variables aléatoires. Cet indicateur permet-il de départager les joueurs ?

### Situation 1

Le premier tableau donne la loi de probabilité de la variable aléatoire \(X\) résumant l’évolution, en euros, du cours d’une action A, le deuxième tableau donne la loi de probabilité de la variable aléatoire \(Y\) résumant l’évolution, en euros, du cours d’une action B.

Calculer \(E(X)\) et \(E(Y)\). L’espérance permet-elle de déterminer quelle est l’action la plus intéressante ?

Calculer \(V(X)\) et \(V(Y)\). Un trader ne souhaite pas trop prendre de risques et décide d’investir sur l’action la moins volatile : quelle action lui conseillez-vous ?

### Situation 2

Les deux tableaux proposés ci-dessous donnent les lois de probabilité d’une variable aléatoire \(X\) et d’une variable aléatoire \(Y\) représentant le cours de deux actions A et B exprimé en euros.

1. Calculer \(E(X)\) et \(E(Y)\). L’espérance permet-elle de différencier ces deux actions ?
2. Calculer \(V(X)\) et \(V(Y)\). On souhaite choisir l’action la moins volatile. Laquelle choisir ?

## La formule de König-Huygens – approfondissement possible…

Soit \(X\) une variable aléatoire dont la loi de probabilité est donnée par le tableau suivant :

On rappelle que l’espérance se calcule de la manière suivante :
\[
E(X) = m = \sum_{i=1}^{n} p_i x_i = p_1 x_1 + p_2 x_2 + \ldots + p_n x_n
\]

On rappelle également que la variance se calcule de la manière suivante :
\[
V(X) = \sum_{i=1}^{n} p_i (x_i - m)^2 = p_1 (x_1 - m)^2 + p_2 (x_2 - m)^2 + \ldots + p_n (x_n - m)^2
\]

En développant les termes \((x_i - m)^2\), démontrer l’égalité suivante :
\[
V(X) = \sum_{i=1}^{n} p_i x_i^2 - m^2 = p_1 x_1^2 + p_2 x_2^2 + \ldots + p_n x_n^2 - m^2
\]

Cette égalité (appelée formule de König-Huygens) permet d’affirmer que la variance (qui est par définition, la moyenne des carrés des écarts à la moyenne) peut également se calculer comme la différence entre la moyenne des carrés des valeurs et le carré de la moyenne.
