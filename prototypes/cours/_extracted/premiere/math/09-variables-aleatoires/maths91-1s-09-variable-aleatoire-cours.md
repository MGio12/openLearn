---
source_url: "http://www.maths91.fr/cours1spemaths/1S-09-VARIABLE_ALEATOIRE-cours.pdf"
chapter: "09-variables-aleatoires"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:53+00:00"
cleaned_at: "2026-05-22T08:27:25+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 09 − VARIABLE ALÉATOIRE

Dans ce chapitre, \(n\) et \(i\) désignent des entiers naturels.

## I Variable aléatoire et loi de probabilité

### 1) Définition

> On considère une expérience aléatoire associée à un univers \(\Omega\). Une **variable aléatoire** \(X\) est une fonction définie sur \(\Omega\) et à valeurs dans \(\mathbb{R}\) ; autrement dit, \(X\) est une fonction qui, à tout élément \(\omega\) de \(\Omega\), associe un unique réel :
> \[
> X : \Omega \rightarrow \mathbb{R}, \quad \omega \mapsto X(\omega)
> \]

**Exemple :** On tire au hasard une boule dans une urne contenant des boules rouges et des boules noires. Ainsi, ici, on peut définir l'univers comme \(\Omega = \{ \text{« rouge »} ; \text{« noire »} \}\). Soit \(X\) la variable aléatoire qui, à tout élément de \(\Omega\), associe un réel dont la valeur est \(10\) si la boule tirée est rouge, et \(-20\) si la boule tirée est noire. On a alors \(X(\text{« rouge »}) = 10\) et \(X(\text{« noire »}) = -20\).

**Remarques :**
* Une variable aléatoire est généralement notée par une lettre majuscule : \(X, Y, Z, T, G\)...
* Pour tout réel \(k\), on note l'événement « \(X\) prend la valeur \(k\) » sous la forme réduite « \(X = k\) ». On notera de façon analogue « \(X < k\) », « \(X \leqslant k\) », « \(X > k\) », « \(X \geqslant k\) » ou encore « \(X \neq k\) ».

### 2) Loi de probabilité

> Lorsqu'à chaque valeur \(x_i\) (\(1 \leqslant i \leqslant n\)) prise par une variable aléatoire \(X\), on associe la probabilité de l'événement \(X = x_i\), on dit que l'on définit la **loi de probabilité** de \(X\). On représente généralement cette loi à l'aide d'un tableau :
>
| Valeur \(x_i\) | \(x_1\) | \(x_2\) | ... | \(x_n\) |
| :---: | :---: | :---: | :---: | :---: |
| \(P(X = x_i)\) | \(p_1\) | \(p_2\) | ... | \(p_n\) |

> **Propriété :** En reprenant les notations précédentes, on a \(p_1 + p_2 + \dots + p_n = 1\).

**Démonstration :** \(p_1 + p_2 + \dots + p_n = P(X = x_1) + P(X = x_2) + \dots + P(X = x_n)\). Or les événements \(X = x_i\), pour tout entier \(i\) compris entre \(1\) et \(n\), sont des événements incompatibles deux à deux et dont la réunion donne l'univers de l'expérience. Ils partitionnent donc l'univers et par définition, la somme de leurs probabilités est donc égale à \(1\).

### 3) Deux exemples complets

#### a) Lancer d'un dé

On lance un dé cubique, non pipé, dont les faces sont numérotées 1, 1, 1, 2, 3 et 4. Soit \(X\) la variable aléatoire donnant le numéro apparu. Déterminer la loi de probabilité de \(X\).

**Correction :** Les valeurs prises par \(X\) sont 1, 2, 3 et 4. Le dé étant non pipé, chaque face a la même probabilité d'être obtenue. 3 faces ayant le chiffre 1, on a donc \(P(X = 1) = \frac{3}{6} = \frac{1}{2}\). De même, \(P(X = 2) = \frac{1}{6}\), \(P(X = 3) = \frac{1}{6}\) et \(P(X = 4) = \frac{1}{6}\). La loi de probabilité de \(X\) est donc :

| Valeur \(k\) | 1 | 2 | 3 | 4 |
| :---: | :---: | :---: | :---: | :---: |
| \(P(X = k)\) | \(\frac{1}{2}\) | \(\frac{1}{6}\) | \(\frac{1}{6}\) | \(\frac{1}{6}\) |

#### b) Tirage d'une boule dans l'urne

Un jeu consiste à tirer au hasard une boule dans une urne contenant 5 boules bleues, 3 boules vertes et 10 boules rouges. Le joueur gagne 1 euro s'il tire une boule bleue, 2 euros s'il tire une boule verte et il perd 3 euros s'il tire une boule rouge. Soit \(G\) la variable aléatoire égale au gain algébrique du joueur à l'issue d'une partie. Déterminer la loi de probabilité de \(G\).

**Correction :** Les valeurs prises par \(G\) sont 1, 2 et \(-3\). L'événement « \(G = 1\) » correspond à l'événement de tirer une boule bleue parmi les 18 boules de l'urne. Il y a 5 boules bleues, et le tirage est au hasard, donc \(P(G = 1) = \frac{5}{18}\). De même, on obtient \(P(G = 2) = \frac{3}{18} = \frac{1}{6}\) et \(P(G = -3) = \frac{5}{9}\). Donc la loi de probabilité de \(G\) est :

| Valeur \(k\) | 1 | 2 | \(-3\) |
| :---: | :---: | :---: | :---: |
| \(P(G = k)\) | \(\frac{5}{18}\) | \(\frac{1}{6}\) | \(\frac{5}{9}\) |

## II Espérance, variance et écart-type

Dans toute cette partie, on appelle \(X\) une variable aléatoire qui prend les valeurs \(x_1, x_2, \dots, x_n\).

### 1) Espérance

#### a) Définition

> L'**espérance mathématique** de la variable aléatoire \(X\) est le nombre réel noté \(E(X)\) défini par :
> \[
> E(X) = \sum_{i=1}^{n} p_i x_i = p_1 x_1 + p_2 x_2 + \dots + p_n x_n
> \]
> avec pour tout entier \(i\) compris entre \(1\) et \(n\), \(p_i = P(X = x_i)\).

**Remarque :** L'espérance mathématique de \(X\) peut être interprétée comme une valeur moyenne de \(X\) dans le cas d'un grand nombre de répétitions de l'expérience aléatoire.

**Exemple :** On reprend l'exemple du tirage dans l'urne précédent. La loi de probabilité de \(G\) est :

| Valeur \(k\) | 1 | 2 | \(-3\) |
| :---: | :---: | :---: | :---: |
| \(P(G = k)\) | \(\frac{5}{18}\) | \(\frac{1}{6}\) | \(\frac{5}{9}\) |

Donc \(E(G) = 1 \times \frac{5}{18} + 2 \times \frac{1}{6} + (-3) \times \frac{5}{9} = -\frac{19}{18} \approx -1,06\). Ainsi, si on répète un grand nombre de fois le jeu du tirage de boules, on perdra en moyenne 1,06 euros par partie. Cette espérance étant négative, le jeu n'est pas favorable au joueur mais à l'organisation. D'où la remarque suivante :

**Remarque :** Si \(X\) est une variable aléatoire égale à un gain algébrique dans une expérience aléatoire représentant un jeu, alors :
* Si \(E(X) > 0\), alors le jeu est dit favorable au joueur (et défavorable à l'organisateur).
* Si \(E(X) < 0\), alors le jeu est dit défavorable au joueur (et favorable à l'organisateur).
* Si \(E(X) = 0\), alors le jeu est dit équitable.

#### b) Linéarité de l'espérance

> **Propriété :** Soient \(a\) et \(b\) deux réels et \(X\) une variable aléatoire. Alors :
> \[
> E(aX + b) = aE(X) + b
> \]

**Démonstration :** Si \(X\) prend les valeurs \(x_1, x_2, \dots, x_n\), alors \(aX + b\) prend les valeurs \(ax_1 + b, ax_2 + b, \dots, ax_n + b\) et on a : \(\forall 1 \leqslant i \leqslant n, X = x_i \Leftrightarrow aX + b = ax_i + b\) d'où \(P(aX + b = ax_i + b) = P(X = x_i)\). Ainsi, en posant \(p_i = P(X = x_i)\), on a :
\[
\begin{aligned}
E(aX + b) &= \sum_{i=1}^{n} (ax_i + b) P(aX + b = ax_i + b) \\
&= \sum_{i=1}^{n} (ax_i + b) p_i \\
&= \sum_{i=1}^{n} a x_i p_i + \sum_{i=1}^{n} b p_i \\
&= a \sum_{i=1}^{n} p_i x_i + b \sum_{i=1}^{n} p_i.
\end{aligned}
\]
Or \(\sum_{i=1}^{n} p_i x_i = E(X)\) et \(\sum_{i=1}^{n} p_i = 1\). Donc \(E(aX + b) = aE(X) + b\).

### 2) Variance et écart-type

#### a) Définitions

> La **variance** de la loi de probabilité de \(X\) est le nombre réel positif noté \(V(X)\) défini par :
> \[
> V(X) = \sum_{i=1}^{n} p_i (x_i - E(X))^2
> \]
> avec pour tout entier \(i\) compris entre \(1\) et \(n\), \(p_i = P(X = x_i)\).

La variance de \(X\) est la moyenne des carrés des écarts des valeurs de \(X\) à l'espérance de \(X\). On a ainsi : \(V(X) = E((X - E(X))^2)\).

> L'**écart-type** de la loi de probabilité de \(X\) est le nombre réel positif noté \(\sigma(X)\) défini par :
> \[
> \sigma(X) = \sqrt{V(X)}
> \]

**Exemple :** On considère la variable aléatoire \(X\) de loi de probabilité suivante :

| \(x_i\) | 1 | 2 | \(-3\) |
| :---: | :---: | :---: | :---: |
| \(P(X = x_i)\) | 0,3 | 0,5 | 0,2 |

Alors \(E(X) = 1 \times 0,3 + 2 \times 0,5 - 3 \times 0,2 = 0,3 + 1 - 0,6 = 0,7\). Et ainsi,
\[
V(X) = 0,3 \times (1 - 0,7)^2 + 0,5 \times (2 - 0,7)^2 + 0,2 \times (-3 - 0,7)^2 = \dots = 3,61
\]
Et \(\sigma(X) = \sqrt{V(X)} = \sqrt{3,61} = 1,9\).

#### b) Deux propriétés de la variance

> **Propriété (Formule de König-Huyghens) :** Soit \(X\) une variable aléatoire. Alors on a :
> \[
> V(X) = E(X^2) - E(X)^2
> \]

**Démonstration :**
\[
\begin{aligned}
V(X) &= \sum_{i=1}^{n} p_i (x_i - E(X))^2 \\
&= \sum_{i=1}^{n} p_i (x_i^2 - 2x_i E(X) + E(X)^2) \\
&= \sum_{i=1}^{n} p_i x_i^2 - 2E(X) \sum_{i=1}^{n} p_i x_i + E(X)^2 \sum_{i=1}^{n} p_i.
\end{aligned}
\]
Or \(\sum_{i=1}^{n} p_i x_i^2 = E(X^2)\) ; \(\sum_{i=1}^{n} p_i x_i = E(X)\) et \(\sum_{i=1}^{n} p_i = 1\). Donc \(V(X) = E(X^2) - 2E(X)^2 + E(X)^2 = E(X^2) - E(X)^2\).

**Exemple :** On peut reprendre l'exemple précédent et rajouter une ligne dans le tableau de la loi de probabilité de \(X\) pour calculer la variance de \(X\) à l'aide de la formule de König-Huyghens :

| \(x_i\) | 1 | 2 | \(-3\) |
| :---: | :---: | :---: | :---: |
| \(P(X = x_i)\) | 0,3 | 0,5 | 0,2 |
| \(x_i^2\) | 1 | 4 | 9 |

Ainsi, \(V(X) = E(X^2) - E(X)^2 = (0,3 \times 1 + 0,5 \times 4 + 0,2 \times 9) - (1 \times 0,3 + 2 \times 0,5 - 3 \times 0,2) = \dots = 3,61\).

> **Propriété :** Soient \(a\) et \(b\) deux réels et \(X\) une variable aléatoire. Alors :
> \[
> V(aX + b) = a^2 V(X) \quad \text{et} \quad \sigma(aX + b) = |a| \sigma(X)
> \]

**Démonstration :**
\[
\begin{aligned}
V(aX + b) &= \sum_{i=1}^{n} p_i (ax_i + b - E(aX + b))^2 \\
&= \sum_{i=1}^{n} p_i (ax_i + b - (aE(X) + b))^2 \\
&= \sum_{i=1}^{n} p_i (ax_i - aE(X))^2 \\
&= \sum_{i=1}^{n} p_i a^2 (x_i - E(X))^2 \\
&= a^2 \sum_{i=1}^{n} p_i (x_i - E(X))^2 = a^2 V(X)
\end{aligned}
\]
\[
\sigma(aX + b) = \sqrt{V(aX + b)} = \sqrt{a^2 V(X)} = |a| \sqrt{V(X)} = |a| \sigma(X)
\]
