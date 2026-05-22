---
source_url: "https://mathsguyon.fr/wp-content/uploads/2024/03/Cours_variable_aleatoire_2024.pdf"
chapter: "09-variables-aleatoires"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:04+00:00"
cleaned_at: "2026-05-22T08:31:00+00:00"
---

## 1 Généralités de bases sur les probabilités

### 1.1 Définition et vocabulaire

> **Définition : Expérience aléatoire**
> Une expérience est aléatoire :
> * quand on ne peut pas prévoir à l’avance quelle sera son résultat.
> * quand elle est renouvelable.
> * quand on connaît tous les résultats possibles que cette expérience peut donner.

> **Définition : Vocabulaire**
> * Les différents résultats possibles d’une expérience aléatoire sont appelés les **issues**.
> * L’ensemble de toutes les issues d’une expérience aléatoire forme l’**univers**, noté \(\Omega\).
> * On appelle **événement** une partie de l’univers d’une expérience aléatoire.
> * Si \(A\) est un événement, alors la probabilité qu’il soit réalisé est notée \(p(A)\).

**Exemple**
L’expérience aléatoire « lancer un dé à six faces non truqué » possède six issues : \(\{1, 2, 3, 4, 5, 6\}\).
\(\Omega = \{1, 2, 3, 4, 5, 6\}\) est donc l’univers de cette expérience aléatoire.
Si on appelle \(A\) l’événement obtenir \(\{1, 2\}\), on notera \(p(A)\) sa probabilité de réussite.

### 1.2 Probabilités élémentaires

> **Propriété : Calculer une probabilité**
> Pour calculer la probabilité d’un événement \(A\), on calcule
> \[
> p(A) = \frac{\text{Nombre d’issues de } A}{\text{Nombre total d’issues}}
> \]
> C’est un nombre réel, compris entre 0 et 1.

**Remarque**
On peut l’écrire mathématiquement ainsi :
\[
p(A) = \frac{\text{Card}(A)}{\text{Card}(\Omega)} = \frac{|A|}{|\Omega|}
\]
où Card est la fonction qui à chaque événement de \(\Omega\) lui associe son nombre d’éléments, que l’on note aussi \(|\ldots|\).

**Exemple**
On reprend l’exemple précédent, avec \(A\) l’événement obtenir \(\{1, 2\}\).
Il y a deux éléments dans l’ensemble \(A\), donc \(\text{Card } A = 2\).
Il y a six éléments dans l’univers \(\Omega\), donc \(\text{Card } \Omega = 6\).
Nous sommes dans une situation d’équiprobabilité, donc
\[
p(A) = \frac{2}{6} = \frac{1}{3}.
\]

> **Définition**
> * Lorsque l’événement \(A\) est impossible, alors \(A = \varnothing\) et \(p(A) = 0\).
> * Lorsque l’événement \(A\) est certain, alors \(A = \Omega\) et \(p(A) = 1\).
> * Si \(A\) est un événement, on note \(\overline{A}\) l’événement contraire de \(A\). On a alors
> \[
> p(\overline{A}) = 1 - p(A).
> \]

**Exemple**
On lance un dé à 6 faces. Si \(A\) est l’événement « Obtenir un nombre inférieur ou égal à 2 », on a donc
\[
p(A) = \frac{2}{6} = \frac{1}{3}.
\]
\(\overline{A}\) est son événement contraire, c’est donc « Obtenir un nombre plus grand que 2 ».
\(\overline{A}\) est réalisé par les issues \(\{3; 4; 5; 6\}\) donc
\[
p(\overline{A}) = \frac{4}{6} = \frac{2}{3}
\]
et on a bien
\[
p(\overline{A}) = 1 - p(A) = 1 - \frac{1}{3} = \frac{2}{3}.
\]

> **Définition : Déterminer une loi de probabilité**
> On appelle **loi de probabilité** la détermination de la probabilité de chaque événement élémentaire de l’univers.

**Méthode : Déterminer une loi de probabilité**
On lance un dé cubique truqué. L’événement élémentaire \(\{6\}\) a une probabilité de \(0,3\). L’événement élémentaire \(\{1\}\) a une probabilité de \(0,1\). Les 4 autres issues sont équiprobables. Déterminer la loi de probabilité de cette expérience aléatoire.

## 2 Variable aléatoire

> **Définition**
> Soit \(E\) l’ensemble des issues d’une expérience aléatoire. Une **variable aléatoire** \(X\) définie sur \(E\) associe à chaque issue de \(E\) un nombre réel.

**Remarque**
Soit \(\Omega\) l’ensemble des issues d’une expérience aléatoire. Une variable aléatoire \(X\) définie sur \(\Omega\) associe à chaque issue de \(\Omega\) un nombre réel. On a donc le schéma :
\[
X(\text{issue de l’expérience aléatoire}) = \text{un nombre réel}.
\]
Une variable aléatoire permet de numériser les issues d’une expérience aléatoire.

**Méthode : Déterminer les valeurs d’une variable aléatoire**
Niveau *
On lance un dé truqué dont la probabilité d’obtenir un 6 est de \(\frac{1}{2}\), les autres faces ayant la même probabilité de sortie. On note \(X\) la variable aléatoire qui à chaque issue détermine la probabilité qui lui est associée. Déterminer \(X(6)\) et \(X(1)\).

**Méthode : Déterminer des probabilités avec une variable aléatoire**
Niveau *
Considérons un dé cubique bien équilibré dont les faces sont numérotées de 1 à 6. On lance ce dé. L’ensemble des issues est \(\Omega = \{1, 2, 3, 4, 5, 6\}\). Chaque issue a pour probabilité \(\frac{1}{6}\). On convient que :
* si la face 6 apparaît on gagne 5 €,
* si la face 5 apparaît on gagne 3 €,
* si la face 4 apparaît on gagne 1 €,
* sinon on perd 2 €.

Déterminer les valeurs de la variable aléatoire \(X\) qui à chaque issue associe le « gain » obtenu.

**Remarque**
Alors que \(X\) est une fonction d’après sa définition, son utilisation en probabilité la considérera comme une variable dite « aléatoire », qui permettra de calculer des probabilités, non plus d’événements, mais de valeurs obtenues par \(X\).
Pour amener ces calculs, on détaillera les valeurs de la variable aléatoire \(X\) de l’exemple précédent comme ceci :
* \(X = -2\) correspond à obtenir \(\{1; 2; 3\}\).
* \(X = 1\) correspond à l’événement obtenir \(\{4\}\).
* \(X = 3\) correspond à l’événement obtenir \(\{5\}\).
* \(X = 5\) correspond à l’événement obtenir \(\{6\}\).

**Exemple**
Si on appelle \(A\) l’événement obtenir un \(\{5\}\) dans l’exemple précédent, on pourra donc écrire :
\[
p(A) = p(X = 3) = \frac{1}{6}.
\]

> **Définition**
> Soit une variable aléatoire \(X\) définie sur un ensemble \(E\) et prenant les valeurs \(x_1, x_2, \ldots, x_n\). La **loi de probabilité** de \(X\) associe à toute valeur \(x_i\) la probabilité \(p(x_i)\). On la représente souvent sous cette forme :
> \[
> \begin{array}{c|cccc}
> X = x_i & x_1 & x_2 & \ldots & x_n \\
> \hline
> p(X = x_i) & p(X = x_1) & p(X = x_2) & \ldots & p(X = x_n)
> \end{array}
> \]

**Exemple**
En poursuivant l’exemple précédent :
On peut alors définir la loi de probabilité de \(X\) :
\[
\begin{array}{c|cccc}
X = x_i & -2 & 1 & 3 & 5 \\
\hline
p(X = x_i) & \frac{1}{2} & \frac{1}{6} & \frac{1}{6} & \frac{1}{6}
\end{array}
\]

> **Propriété**
> \(\Omega\) désigne un univers de \(n\) éventualités \(\{x_1, x_2, \ldots, x_n\}\). On a toujours :
> \[
> \sum_{i=1}^{n} p(x_i) = p_1 + p_2 + \cdots + p_n = 1.
> \]

**Méthode : Déterminer la loi de probabilité d’une variable aléatoire**
On lance à trois reprises une pièce bien équilibrée et on note le résultat à l’aide d’un mot de trois lettres. On appelle \(X\) la variable aléatoire qui associe à chaque éventualité de l’univers \(\Omega\) le nombre de « pile ».
1. Déterminer l’univers \(\Omega\) de cette expérience aléatoire.
2. Calculer \(p(X = 2)\) puis \(p(X < 2)\).
3. Déterminer la loi de probabilité de la variable aléatoire \(X\).

**Méthode**
On définit une variable aléatoire \(Y\) avec la règle de jeu suivante :
On lance trois fois une pièce équilibrée.
* Un joueur gagne 8 € s’il obtient trois « pile » successifs.
* Il ne gagne rien s’il obtient deux « pile ».
* Il perd 2 € dans tous les autres cas.
1. Déterminer les valeurs prises par \(Y\).
2. Déterminer les issues correspondant à l’événement \(Y = -2\). En déduire \(p(Y = -2)\).
3. Déterminer \(p(Y \geqslant 0)\).

## 3 Espérance d’une variable aléatoire

> **Définition**
> Soit \(X\) une variable aléatoire définie sur \(\Omega\), qui prend les valeurs \(x_1, x_2, \ldots, x_k\) :
> \[
> \begin{array}{c|cccc}
> X & x_1 & x_2 & \cdots & x_k \\
> \hline
> p(X = x_i) & p_1 & p_2 & \cdots & p_k
> \end{array}
> \]
> On appelle **espérance mathématique** de \(X\), notée \(\mathrm{E}(X)\), le réel :
> \[
> \mathrm{E}(X) = \sum_{i=1}^{k} x_i p(X = x_i) = x_1 \times p_1 + x_2 \times p_2 + \cdots + x_k \times p_k.
> \]

**Remarque**
* On retient que, pour un grand nombre de tirages, l’espérance d’une variable aléatoire est la moyenne des valeurs de \(x_i\) affectées des fréquences \(p_i\).
* Dans le cas particulier d’un jeu, l’espérance \(\mathrm{E}(X)\) est le gain algébrique moyen par partie qu’un joueur peut espérer obtenir s’il joue un grand nombre de fois. Le signe de \(\mathrm{E}(X)\) permet de savoir si le joueur a plus de chances de gagner que de perdre. Si \(\mathrm{E}(X) = 0\), on dit que le jeu est équitable.

**Exemple**
On considère une variable aléatoire \(Y\) dont la loi de probabilité est donnée par le tableau suivant.
\[
\begin{array}{c|cccc}
y_i & -4 & 0 & 4 & 20 \\
\hline
p(Y = y_i) & 0,5 & 0,2 & 0,2 & 0,1
\end{array}
\]
\[
\mathrm{E}(Y) = 0,5 \times (-4) + 0,2 \times 0 + 0,2 \times 4 + 0,1 \times 20 = 0,8.
\]

**Méthode : Calculer l’espérance d’une variable aléatoire**
Considérons un dé cubique bien équilibré dont les faces sont numérotées de 1 à 6. On convient que :
* si la face 6 apparaît on gagne 5 €,
* si la face 5 apparaît on gagne 3 €,
* si la face 4 apparaît on gagne 1 €,
* sinon on perd 2 €.
On définit la variable aléatoire \(X\) qui à chaque issue associe le gain obtenu. Déterminer \(\mathrm{E}(X)\).

## 4 Variance et écart-type d’une variable aléatoire

> **Définition**
> Soit \(X = \{x_i\}_{1 \leqslant i \leqslant n}\) une variable aléatoire discrète.
> * On appelle **variance** mathématique de \(X\) le nombre défini par :
> \[
> V(X) = p_1 (x_1 - \mathrm{E}(X))^2 + p_2 (x_2 - \mathrm{E}(X))^2 + \ldots + p_n (x_n - \mathrm{E}(X))^2.
> \]
> * On appelle **écart-type** de \(X\) le nombre défini par :
> \[
> \sigma(X) = \sqrt{V(X)}.
> \]

**Exemple**
On lance deux dés non pipés. La loi de probabilité de la variable \(S\) qui détermine la somme des deux dés est donnée ci-dessous :
\[
\begin{array}{c|ccccccccccc}
s_i & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
\hline
P(S = s_i) & \frac{1}{36} & \frac{1}{18} & \frac{1}{12} & \frac{1}{9} & \frac{5}{36} & \frac{1}{6} & \frac{5}{36} & \frac{1}{9} & \frac{1}{12} & \frac{1}{18} & \frac{1}{36}
\end{array}
\]

\[
\begin{array}{c|c|c}
S - \mathrm{E}(S) & (S - \mathrm{E}(S))^2 & (S - \mathrm{E}(S))^2 \times P(S = s_i) \\
\hline
& & \\
& & \\
& & \\
\end{array}
\]

Pour calculer l’espérance, on applique le cours :
\[
\mathrm{E}(S) = \sum_{i=1}^{k} x_i p(X = x_i) = 2 \times \ldots + 3 \times \ldots + \ldots = \ldots
\]
On peut alors calculer la variance :
\[
V(S) = \sum_{i=1}^{n} [s_i - \mathrm{E}(S)]^2 \times P(S = s_i) = \ldots
\]
Il vient alors
\[
\sigma(S) = \sqrt{V(S)} = \ldots
\]

**Remarque**
La formule du calcul de la variance est complexe et pour l’apprendre, il faut comprendre cette idée de distance à la moyenne : On calcule pour chaque valeur de \(x_i\) la distance avec l’espérance : \(\mathrm{E}(X) - x_i\). Pour éviter que des valeurs supérieures à l’espérance ne compensent des valeurs inférieures, on élève au carré pour rendre positif ce nombre. Chaque distance au carré est ensuite multipliée par son coefficient, sa probabilité. La variance mesure donc la somme des carrés des écarts à la moyenne.

**Remarque**
La variance est un outil qui permet de calculer l’écart-type. Celui-ci est un paramètre de dispersion, qui mesure l’écart des valeurs autour de la moyenne. Plus l’écart-type est élevé, plus les valeurs de la variable aléatoire sont éloignées de l’espérance (moyenne).

**Méthode**
Soit \(X\) une variable aléatoire dont la loi de probabilité est donnée par :
\[
\begin{array}{c|cccc}
x_i & 0 & 20 & 5 & 15 \\
\hline
P(X = x_i) & 0,5 & 0,1 & 0,2 & 0,2
\end{array}
\]
1. Déterminer son espérance \(\mathrm{E}(X)\). Interpréter.
2. Déterminer sa variance \(V(X)\) et son écart-type \(\sigma(X)\).

## 5 Pour aller plus loin

> **Propriété : Linéarité de l’espérance**
> Soit \(X\) une variable aléatoire et \(a\) et \(b\) deux réels.
> \[
> \mathrm{E}(aX + b) = a\mathrm{E}(X) + b
> \]

**Méthode : Calculer l’espérance d’une variable aléatoire**
Chaque jour de la semaine, Jochen prend le train pour se rendre sur son lieu de travail. Des études statistiques ont montré que, pour une journée donnée, la probabilité que le train arrive avec 2 minutes de retard est égale à la probabilité qu’il arrive à l’heure, et au double de la probabilité qu’il arrive avec 5 minutes de retard. On considère qu’il n’y a pas d’autres cas possibles. \(X\) est la variable aléatoire qui donne le temps de retard pour une journée donnée.
1. Quelle est la loi de probabilité suivie par \(X\) ?
2. Calculer l’espérance et l’écart-type de \(X\).
3. Jochen prend le train 20 jours dans un mois. Déterminer l’espérance et l’écart-type de son retard moyen par jour sur une telle série de 20 jours.
