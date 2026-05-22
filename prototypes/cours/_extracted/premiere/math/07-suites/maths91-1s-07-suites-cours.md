---
source_url: "http://www.maths91.fr/cours1spemaths/1S-07-SUITES-cours.pdf"
chapter: "07-suites"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:49+00:00"
cleaned_at: "2026-05-22T08:25:54+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 07−SUITES

\[
\lim_{n \to +\infty} \left(1 + \frac{1}{3} + \frac{1}{3^2} + \frac{1}{3^3} + \dots + \frac{1}{3^n}\right) = ?
\]

**Première − Chapitre 07**

### Table des matières

I Généralités sur les suites 2
1) Notion de suite................................................... 2
2) Modes de génération d’une suite......................................... 2
3) Suite, tableur et algorithme............................................ 3
4) Algorithme de seuil................................................ 4

II Sens de variations d’une suite 4
1) Définition...................................................... 4
2) Comment étudier le sens de variation d’une suite............................... 4

III Suites arithmétiques 6
1) Définition...................................................... 6
2) Formule explicite.................................................. 6
3) Méthode pour montrer qu’une suite est arithmétique............................ 6
4) Méthode pour montrer qu’une suite n’est pas arithmétique......................... 7
5) Sens de variation d’une suite arithmétique................................... 7

IV Suites géométriques 7
1) Définition...................................................... 7
2) Formule explicite.................................................. 8
3) Méthode pour montrer qu’une suite est géométrique............................. 8
4) Méthode pour montrer qu’une suite n’est pas géométrique......................... 8
5) Sens de variation d’une suite géométrique de raison strictement positive................. 9

V Compléments sur les suites 9
1) Somme de termes.................................................. 9
2) Variations et représentations graphiques.................................... 11

Polycopié de cours de N. PEYRAT Page 1 sur 11 Lycée Saint−Charles

---

Dans tout le chapitre, on définira les suites par défaut sur l’ensemble \(\mathbb{N}\). Tous les résultats (sauf précision contraire) restent valables si la suite n’est définie qu’à partir d’un certain rang.

## I Généralités sur les suites

### 1) Notion de suite

> **DÉFINITION**
> On appelle **suite** \(u\) de nombres réels toute fonction définie sur l’ensemble \(\mathbb{N}\) des entiers naturels. L’image par \(u\) d’un entier naturel \(n\) est un réel noté \(u_n\), et se lit « \(u\) indice \(n\) ». On dit que \(u_n\) est le **terme général** de la suite \(u\), \(n\) est un **indice** ou un **rang**.

> **REMARQUES**
> * La suite \(u\) est aussi notée \((u_n)_{n \in \mathbb{N}}\) ou plus simplement \((u_n)\), à ne pas confondre avec le terme général \(u_n\) : \(u_n\) est un réel, \((u_n)\) est une suite. (Faire l’analogie avec \(f\) et \(f(x)\).)
> * Dans un repère, une représentation graphique possible de la suite \(u\) est l’ensemble des points \(M_n\) de coordonnées \((n ; u_n)\) avec \(n \in \mathbb{N}\). On verra plus tard une autre représentation graphique possible d’une suite.

### 2) Modes de génération d’une suite

Une suite peut être définie de plusieurs façons différentes :

**a) au moyen d’une formule explicite**

On définit le terme général \(u_n\) en fonction de \(n\).

> **EXEMPLE**
> Soit \(u\) la suite définie, pour tout entier naturel \(n\), par \(u_n = n^2 + 2n + 3\). Alors pour tout entier naturel \(n\), \(u_n = f(n)\) avec \(f : x \mapsto x^2 + 2x + 3\). On a ainsi \(u_0 = f(0) = 3\) etc...

**Avantages :** Lorsqu’une suite est définie de manière explicite, on peut calculer directement n’importe quel terme de la suite, sans avoir à connaître les termes précédents. Son étude est proche de celle d’une fonction. En effet, il suffit, dans l’exemple ci-dessus, d’étudier la fonction \(f\) définie sur \([0 ; +\infty[\) par \(f(x) = x^2 + 2x + 3\).

**Problème :** Dans la plupart des modélisations à l’aide de suites (évolution d’une population par exemple), les suites ne sont pas définies de façon explicite mais...

**b) au moyen d’une relation de récurrence**

On définit la suite \((u_n)\) par son premier terme et une relation permettant de calculer un terme à partir du terme précédent (généralement \(u_{n+1}\) en fonction de \(u_n\)).

> **EXEMPLE**
> Soit \(u\) la suite définie par \(u_0 = 1\) et pour tout entier naturel \(n\) par la relation \(u_{n+1} = 3u_n + 1\). On obtient alors \(u_1 = 3u_0 + 1 = 3 \times 1 + 1 = 4\), \(u_2 = \dots\) etc.

**Problème de ce mode de génération :** Pour calculer un terme, il faut connaître le précédent, et par suite (ahah), il faut donc connaître tous les termes précédents. Par exemple dans l’exemple précédent, pour calculer \(u_{17}\), il faut effectuer le calcul : \(u_{17} = 3u_{16} + 1\), et il faut donc calculer \(u_{16} = 3u_{15} + 1\), etc etc...

L’un des buts principaux de ce chapitre va être de concevoir des méthodes permettant de passer d’une formule de récurrente (peu pratique dans les calculs mais très répandue) à sa forme explicite (pratique pour les calculs et l’étude de la suite).

> **REMARQUE**
> Il est aussi possible de définir une suite à partir de plusieurs premiers termes et d’une relation de récurrence exprimant un terme en fonction de **plusieurs** termes précédents. Par exemple, la suite de Fibonacci, définie sur \(\mathbb{N}\) par \(u_0 = 1\), \(u_1 = 1\) et pour tout entier naturel \(n\), \(u_{n+2} = u_{n+1} + u_n\).

**c) par un autre moyen...**

Il existe enfin des suites dont les termes ne suivent pas une logique particulière : par exemple la suite des moyennes de Maths d’une classe, la suite des décimales de \(\pi\), ou une suite de nombres générés aléatoirement etc.

### 3) Suite, tableur et algorithme

On peut calculer les premiers termes d’une suite à l’aide d’un tableur, ou d’un algorithme.

Par exemple, en reprenant la suite \((u_n)\) définie sur \(\mathbb{N}\) par \(u_0 = 1\) et pour tout entier naturel \(n\) par \(u_n = 3u_n + 1\), on peut procéder ainsi :

**Tableur :**

|   | A | B |
|---|---|---|
| 1 | 0 | 1 |
| 2 | =A1+1 | =3*B1+1 |
| 3 | =A2+1 | =3*B2+1 |
| 4 | ...recopier vers le bas... | ...recopier vers le bas... |

**Programme en Python** (qui renvoie les termes de la suite de \(u_0\) à \(u_n\), soit les \(n+1\) premiers termes)

```python
def suite_01(n):
    u = 1
    l = [u]
    for i in range(1, n+1):
        u = 3 * u + 1
        l.append(u)
    return l
```

> **REMARQUE**
> On peut aussi utiliser `for i in range(n)` à la place de `for i in range(1, n+1)`. Dans les deux cas, la boucle `for` s’exécute bien \(n\) fois, mais il faut bien contrôler la valeur prise par \(i\), notamment si la variable \(n\) apparait dans la relation de récurrence. Pour rappel :
> * `for i in range(1, n+1)` = « pour i allant de 1 à n »
> * `for i in range(n)` = « pour i allant de 0 à n−1 »

> **EXERCICE**
> Soit \((u_n)\) la suite définie sur \(u_0 = 2\) et, pour tout entier naturel \(n\), par \(u_{n+1} = 2u_n + n - 5\). Déterminer les 5 premiers termes de la suite \((u_n)\) :
> a) à la main ;
> b) à l’aide d’un tableur ;
> c) à l’aide d’un programme écrit en langage Python.

### 4) Algorithme de seuil

> **DÉFINITION**
> Un **algorithme de seuil**, pour une suite, est un algorithme qui renvoie le plus petit rang de la suite pour lequel une condition définie est réalisée.

> **EXEMPLE**
> Soit \((u_n)\) la suite définie sur \(\mathbb{N}\) par \(u_0 = 2\) et, pour tout entier naturel \(n\), \(u_{n+1} = 1{,}05 u_n + 1\).
> 1. Écrire, en langage Python, un algorithme qui renvoie le plus petit entier naturel \(n\) tel que \(u_n > 10^3\).
> 2. Programmer cet algorithme sur la calculatrice. Quelle est la valeur de \(n\) retournée ?

## II Sens de variations d’une suite

### 1) Définition

> **DÉFINITION**
> Soit \(u\) une suite définie sur \(\mathbb{N}\).
> * On dit que la suite \(u\) est **croissante** lorsque pour tout entier naturel \(n\), \(u_n \leqslant u_{n+1}\).
> * On dit que la suite \(u\) est **décroissante** lorsque pour tout entier naturel \(n\), \(u_n \geqslant u_{n+1}\).

> **REMARQUE**
> On définit de même une suite **strictement croissante** ou **strictement décroissante** en utilisant une inégalité stricte (\(<\) ou \(>\)).

### 2) Comment étudier le sens de variation d’une suite

Soit \(u\) une suite définie sur \(\mathbb{N}\). Pour étudier le sens de variation de la suite \(u\), on peut procéder à plusieurs méthodes :

**a) 1ère méthode : étude du signe de la différence \(u_{n+1} - u_n\)**

> **PROPRIÉTÉ**
> Soit \(u\) une suite définie sur \(\mathbb{N}\).
> * Si pour tout entier naturel \(n\), \(u_{n+1} - u_n \geqslant 0\), alors la suite \(u\) est croissante.
> * Si pour tout entier naturel \(n\), \(u_{n+1} - u_n \leqslant 0\), alors la suite \(u\) est décroissante.

> **REMARQUE**
> Il faut étudier le signe de \(u_{n+1} - u_n\) pour **tout** entier naturel \(n\) (c’est-à-dire sans chercher à remplacer \(n\) par un entier au choix !!). Ce n’est pas parce que \(u_1 - u_0 > 0\) et que \(u_2 - u_1 > 0\) (etc) que l’on peut conclure que cela va rester vrai pour tous les entiers naturels \(n\) et que \(u\) est croissante !

> **EXEMPLES**
> * Déterminer le sens de variation de la suite \((u_n)\) définie sur \(\mathbb{N}\) par \(u_n = 3n + 5\).
> * Déterminer le sens de variation de la suite \((v_n)\) définie sur \(\mathbb{N}\) par \(v_0 = 2\) et, pour tout entier naturel \(n\), par \(v_{n+1} = v_n + 4n + 6\).
> * Déterminer le sens de variation de la suite \((w_n)\) définie sur \(\mathbb{N}\) par \(w_n = n^2 - 6n - 7\).

**b) 2e méthode : étude du sens de variation d’une fonction**

Soit \(u\) une suite définie sur \(\mathbb{N}\) définie de manière explicite sous la forme \(u_n = f(n)\), avec \(f\) une fonction définie sur \([0 ; +\infty[\).

> **PROPRIÉTÉ**
> * Si la fonction \(f\) est croissante sur \([0 ; +\infty[\), alors la suite \(u\) est croissante.
> * Si la fonction \(f\) est décroissante sur \([0 ; +\infty[\), alors la suite \(u\) est décroissante.

> **DÉMONSTRATION**
> Pour tout entier naturel \(n\), \(n \geqslant 0\).

> **EXEMPLE**
> Déterminer le sens de variations de la suite \(u\) définie sur \(\mathbb{N}\) par \(u_n = \frac{5}{2^n}\).

## III Suites arithmétiques

### 1) Définition

> **DÉFINITION**
> Soit \(u\) une suite définie sur \(\mathbb{N}\). On dit que \(u\) est une **suite arithmétique** de **raison** \(r\) si et seulement si il existe un réel \(r\) tel que pour tout entier naturel \(n\) :
> \[
> u_{n+1} = u_n + r
> \]

> **EXEMPLE**
> Soit \(u\) la suite arithmétique de raison \(2\) et de premier terme \(u_0 = 0\). Ainsi, pour tout entier naturel \(n\), \(u_{n+1} = u_n + 2\). Calculer les premiers termes.

### 2) Formule explicite

> **PROPRIÉTÉ**
> Soit \(u\) une suite arithmétique de raison \(r \in \mathbb{R}\), définie sur \(\mathbb{N}\). Alors pour tous entiers naturels \(n\) et \(p\), on a :
> \[
> u_n = u_p + (n - p)r
> \]
> En particulier, si \(u\) est définie à partir du rang 0, on a :
> \[
> u_n = u_0 + nr
> \]

> **DÉMONSTRATION**
> Démonstration dans le cas où \(n > p\) : Faire un schéma...

> **EXEMPLE**
> Soit \(u\) la suite arithmétique de raison \(r = 3\) définie sur \(\mathbb{N}\) et telle que \(u_{10} = 2\). Calculer \(u_{17}\).

### 3) Méthode pour montrer qu’une suite est arithmétique

> **PROPRIÉTÉ**
> Pour montrer qu’une suite \(u\) est arithmétique, on calcule, **pour tout entier naturel \(n\)**, la différence \(u_{n+1} - u_n\) et on montre que cette différence est égal à un réel constant. La suite \(u\) est alors arithmétique de raison ce réel.

> **REMARQUE**
> Ce n’est pas parce que l’on montre que \(u_1 - u_0 = u_2 - u_1\) que l’on peut conclure que cela marche pour tout entier naturel \(n\) et que la suite est arithmétique ! Il faut effectuer le calcul pour tout \(n\), donc avec la variable \(n\).

> **EXEMPLE**
> Montrer que la suite \(u\) définie sur \(\mathbb{N}\) par \(u_n = 3 - 5n\) est arithmétique et préciser sa raison et son premier terme.

### 4) Méthode pour montrer qu’une suite n’est pas arithmétique

> **PROPRIÉTÉ**
> Pour montrer qu’une suite \(u\) n’est pas arithmétique, on utilise un **contre-exemple** : Par exemple, on calcule les trois premiers termes de la suite (ou trois termes consécutifs quelconques), et on montre que leur différence n’est pas constante.

> **EXEMPLE**
> Montrer que la suite \(u\) définie sur \(\mathbb{N}\) par \(u_n = n^2\) n’est pas arithmétique.

### 5) Sens de variation d’une suite arithmétique

> **PROPRIÉTÉ**
> Soit \(u\) une suite arithmétique de raison \(r \in \mathbb{R}\), définie sur \(\mathbb{N}\).
> * Si \(r > 0\), alors la suite \(u\) est strictement croissante.
> * Si \(r < 0\), alors la suite \(u\) est strictement décroissante.
> * Si \(r = 0\), alors la suite \(u\) est constante.

> **DÉMONSTRATION**
> Si \(u\) est arithmétique de raison \(r\), alors \(u_{n+1} = u_n + r\), d’où \(r = u_{n+1} - u_n\). Or on a vu que le signe de \(u_{n+1} - u_n\) donnait les variations de \(u\), d’où le résultat.

## IV Suites géométriques

### 1) Définition

> **DÉFINITION**
> Soit \(u\) une suite définie sur \(\mathbb{N}\). On dit que \(u\) est une **suite géométrique** de **raison** \(q\) si et seulement si il existe un réel \(q\) non nul tel que pour tout entier naturel \(n\) :
> \[
> u_{n+1} = q \times u_n
> \]

> **EXEMPLE**
> Soit \(u\) la suite géométrique de raison 5 définie sur \(\mathbb{N}\) et telle que \(u_0 = 2\). Alors pour tout entier naturel \(n\), \(u_{n+1} = 5u_n\). Calculer les premiers termes.

### 2) Formule explicite

> **PROPRIÉTÉ**
> Soit \(u\) une suite géométrique de raison \(q \in \mathbb{R}\), définie sur \(\mathbb{N}\). Alors pour tous entiers naturels \(n\) et \(p\), on a :
> \[
> u_n = u_p \times q^{n-p}
> \]
> En particulier, si \(u\) est définie à partir du rang 0, on a :
> \[
> u_n = u_0 \times q^n
> \]

> **DÉMONSTRATION**
> Démonstration dans le cas où \(n > p\) : Faire un schéma...

> **EXEMPLE**
> Soit \(u\) la suite géométrique de raison \(r = \frac{1}{2}\) définie sur \(\mathbb{N}\) et telle que \(u_6 = 5\). Calculer \(u_{11}\).

### 3) Méthode pour montrer qu’une suite est géométrique

> **PROPRIÉTÉ**
> Pour montrer qu’une suite \(u\) est géométrique, on exprime, **pour tout entier naturel \(n\)**, \(u_{n+1}\) en fonction de \(u_n\) en montrant qu’il existe un réel \(q\) tel que \(u_{n+1} = q \times u_n\). La suite \(u\) est alors géométrique de raison ce réel.

> **REMARQUE**
> C’est la **seule et unique** méthode valable et correcte ! On ne peut pas essayer de montrer que le rapport \(\frac{u_{n+1}}{u_n}\) est constant car son étude implique de démontrer au préalable que \(u_n\) ne s’annule pas (long et contraignant). Ce n’est pas parce que l’on montre que \(\frac{u_1}{u_0} = \frac{u_2}{u_1}\) que l’on peut conclure que cela marche pour **tout** entier naturel \(n\) et que la suite est géométrique !

> **EXEMPLE**
> Montrer que la suite \(u\) définie sur \(\mathbb{N}\) par \(u_n = \frac{2^n}{3}\) est géométrique et préciser sa raison et son premier terme.

### 4) Méthode pour montrer qu’une suite n’est pas géométrique

> **PROPRIÉTÉ**
> Pour montrer qu’une suite \(u\) n’est pas géométrique, on utilise un **contre-exemple** : Par exemple, on calcule les trois premiers termes de la suite (ou trois termes consécutifs quelconques), et on montre que leur quotient n’est pas constant.

> **EXEMPLE**
> Montrer que la suite \(u\) définie sur \(\mathbb{N}\) par \(u_n = 4n^2 - 1\) n’est pas géométrique.

### 5) Sens de variation d’une suite géométrique de raison strictement positive

> **PROPRIÉTÉ**
> Soit \(u\) une suite définie sur \(\mathbb{N}\), géométrique de raison \(q > 0\) et de premier terme \(u_0\).
> * Si \(u_0 > 0\) :
>   * Si \(q > 1\), alors \(u\) est strictement croissante.
>   * Si \(q = 1\), alors \(u\) est constante.
>   * Si \(0 < q < 1\), alors \(u\) est strictement décroissante.
> * Si \(u_0 < 0\) :
>   * Si \(q > 1\), alors \(u\) est strictement décroissante.
>   * Si \(q = 1\), alors \(u\) est constante.
>   * Si \(0 < q < 1\), alors \(u\) est strictement croissante.

> **DÉMONSTRATION**
> Si \(u\) est géométrique de raison \(q > 0\), alors \(u_{n+1} - u_n = u_n(q - 1)\). Le signe de \(u_{n+1} - u_n\) dépend donc du signe de \(u_n\) et de la position de \(q\) par rapport à 1.

## V Compléments sur les suites

### 1) Somme de termes

**a) Somme des premiers entiers naturels**

> **PROPRIÉTÉ**
> Pour tout entier naturel \(n\), on a :
> \[
> 1 + 2 + 3 + \dots + n = \frac{n(n+1)}{2}
> \]

> **DÉMONSTRATION**
> Soit \(S = 1 + 2 + \dots + n\). On écrit la somme dans l’ordre puis dans l’ordre inverse :
> \[
> \begin{aligned}
> S &= 1 + 2 + \dots + (n-1) + n \\
> S &= n + (n-1) + \dots + 2 + 1
> \end{aligned}
> \]
> En additionnant terme à terme, on obtient \(2S = (n+1) + (n+1) + \dots + (n+1) = n(n+1)\). D’où \(S = \frac{n(n+1)}{2}\).

> **EXEMPLE**
> Calculer \(1 + 2 + 3 + \dots + 100\).

> **REMARQUE**
> On peut noter \(1 + 2 + \dots + n = \sum_{i=1}^{n} i\) (ou avec n’importe qu’elle autre lettre que \(i\)).

> **EXERCICE**
> Écrire avec le symbole \(\sum\) les sommes suivantes :
> * \(S_1 = 4 + 5 + \dots + 12\)
> * \(S_2 = 1 + 4 + 9 + 16 + \dots + 81\)
> * \(S_3 = 2 + 4 + 6 + \dots + 60\)
> * \(S_4 = 1 + 3 + 5 + \dots + 35\)

**b) Somme des puissances successives d’un réel**

> **PROPRIÉTÉ**
> Soit \(q\) un réel différent de \(1\). Alors pour tout entier naturel \(n\), on a :
> \[
> 1 + q + q^2 + q^3 + \dots + q^n = \frac{1 - q^{n+1}}{1 - q}
> \]

> **DÉMONSTRATION**
> Soit \(S = 1 + q + q^2 + \dots + q^{n-1} + q^n\). Alors \(qS = q + q^2 + q^3 + \dots + q^n + q^{n+1}\). Donc par différence de ces deux égalités, on obtient :
> \[
> S - Sq = 1 - q^{n+1}
> \]
> donc \((1 - q)S = 1 - q^{n+1}\), donc on a bien \(S = \frac{1 - q^{n+1}}{1 - q}\) (car \(q \neq 1\)).

> **REMARQUES**
> * Si \(q = 1\), alors \(1 + q + q^2 + \dots + q^n = 1 + 1 + 1 + \dots + 1 = (n+1) \times 1 = n+1\).
> * On peut écrire \(1 + q + q^2 + \dots + q^n = \sum_{i=0}^{n} q^i\).

> **EXEMPLES**
> * Calculer pour tout entier naturel \(n\) la somme \(1 + 2 + 2^2 + \dots + 2^n\).
> * Soit \((u_n)\) la suite géométrique de raison \(q = \frac{1}{3}\) et de premier terme \(u_0 = 2\). Calculer \(u_0 + u_1 + \dots + u_{10}\).

### 2) Variations et représentations graphiques

**a) Suite arithmétique**

**Variation absolue :** Soit \(u\) une suite arithmétique de raison \(r\), définie sur \(\mathbb{N}\). Alors pour tout entier naturel \(n\), on a vu que \(u_{n+1} = u_n + r\), soit \(u_{n+1} - u_n = r\). On dit que la **variation absolue** de la suite \(u\) est **constante** (et égale à \(r\)).

**Évolution linéaire :** Soit \(u\) une suite arithmétique. Tous les points de la représentation graphique de la suite \(u\) sont alignés. On dit que l’**évolution de la suite \(u\) est linéaire**.

**b) Suite géométrique**

**Variation relative :** Soit \(u\) une suite géométrique de raison \(q\) à termes tous non nuls. Alors
\[
\frac{u_{n+1} - u_n}{u_n} = \frac{q u_n - u_n}{u_n} = \frac{u_n(q-1)}{u_n} = q - 1.
\]
On remarque que ce rapport est constant. On dit que le rapport \(\frac{u_{n+1} - u_n}{u_n}\) est appelée la **variation relative** de la suite \(u\).

**Évolution exponentielle :** Soit \(u\) une suite géométrique. Tous les points de la représentation graphique de la suite \(u\) sont sur une courbe représentant une fonction ayant une « vitesse de (dé)croissance » élevée. On dit que \(u\) suit une **évolution exponentielle**.
