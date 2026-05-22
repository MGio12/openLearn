---
source_url: "https://www.mathoutils.fr/cours-et-exercices/cours-et-exercices-1e-generale/suites-numeriques-exercices-corriges/"
chapter: "07-suites"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:05+00:00"
cleaned_at: "2026-05-22T08:31:56+00:00"
---

# Suites numériques : exercices corrigés

Accédez au cours sur les [généralités sur les suites](https://www.mathoutils.fr/cours-et-exercices/cours-et-exercices-1e-generale/generalites-sur-les-suites/).

Consultez les exercices corrigés sur les [suites arithmétiques](https://www.mathoutils.fr/cours-et-exercices/cours-et-exercices-1e-generale/suites-arithmetiques-exercices-corriges/).

## Suites définies explicitement

### Exercice 1
Dans chacun des cas suivants, déterminer les termes de rang 0, 1, 2 et 3 de la suite définie pour tout \( n \in \mathbb{N} \) par…

* \( u_n = -7n + 2 \)
* \( v_n = n^2 - 1 \)
* \( w_n = \left( \frac{1}{2} \right)^n \)

<details>
<summary>Afficher/Masquer la solution</summary>

* \( u_0 = -7 \times 0 + 2 = 2 \)
* \( u_1 = -7 \times 1 + 2 = -5 \)
* \( u_2 = -7 \times 2 + 2 = -12 \)
* \( u_3 = -7 \times 3 + 2 = -19 \)

* \( v_0 = 0^2 - 1 = -1 \)
* \( v_1 = 1^2 - 1 = 0 \)
* \( v_2 = 2^2 - 1 = 3 \)
* \( v_3 = 3^2 - 1 = 8 \)

* \( w_0 = \left( \frac{1}{2} \right)^0 = 1 \)
* \( w_1 = \left( \frac{1}{2} \right)^1 = \frac{1}{2} \)
* \( w_2 = \left( \frac{1}{2} \right)^2 = \frac{1}{4} \)
* \( w_3 = \left( \frac{1}{2} \right)^3 = \frac{1}{8} \)

</details>

### Exercice 2
On considère la suite \( (u_n) \), définie pour tout \( n \in \mathbb{N} \) par \( u_n = 2n^2 - 3n - 1 \).

1. Calculer \( u_0 \), \( u_1 \), \( u_{10} \).
2. Existe-t-il un \( n \in \mathbb{N} \) tel que \( u_n = 0 \) ?
3. Montrer que pour tout \( n \in \mathbb{N} \), \( u_n > -3 \).

<details>
<summary>Afficher/Masquer la solution</summary>

1. On a…
   * \( u_0 = 2 \times 0^2 - 3 \times 0 - 1 = -1 \)
   * \( u_1 = 2 \times 1^2 - 3 \times 1 - 1 = -2 \)
   * \( u_{10} = 2 \times 10^2 - 3 \times 10 - 1 = 169 \)

2. On cherche un entier \( n \) tel que \( 2n^2 - 3n - 1 = 0 \). Résolvons donc l'équation d'inconnue \( x \in \mathbb{R} \) suivante : \( 2x^2 - 3x - 1 = 0 \).
   Le discriminant \( \Delta \) de \( 2x^2 - 3x - 1 \) vaut \( (-3)^2 - 4 \times 2 \times (-1) = 17 \), qui est strictement positif.
   L'équation possède donc deux solutions :
   \[
   x_1 = \frac{3 - \sqrt{17}}{4} \quad \text{et} \quad x_2 = \frac{3 + \sqrt{17}}{4}
   \]
   Aucune de ces solutions n'est un nombre entier positif. Il n'existe donc aucun \( n \in \mathbb{N} \) tel que \( u_n = 0 \).

3. Pour tout \( n \in \mathbb{N} \), \( u_n - (-3) = 2n^2 - 3n + 2 \). Or, le discriminant de \( 2n^2 - 3n + 2 \) vaut \( (-3)^2 - 4 \times 2 \times 2 = -7 \) qui est strictement négatif. Ainsi, \( 2n^2 - 3n + 2 \) ne s'annule jamais et garde un signe constant : celui du coefficient en \( n^2 \), c'est-à-dire \( 2 \).
   Ainsi, pour tout \( n \in \mathbb{N} \), \( u_n - (-3) > 0 \), c'est-à-dire \( u_n > -3 \).

</details>

### Exercice 3 (en lien avec la partie Trigonométrie)
On considère la suite \( (u_n) \), définie pour tout \( n \in \mathbb{N} \) par \( u_n = \sin\left( \frac{n\pi}{6} \right) \).

1. Calculer \( u_0 \), \( u_1 \), \( u_2 \).
2. Trouver un entier \( k \) tel que, pour tout \( n \in \mathbb{N} \), \( u_{n+k} = u_n \).

<details>
<summary>Afficher/Masquer la solution</summary>

1. * \( u_0 = \sin\left( 0 \times \frac{\pi}{6} \right) = 0 \)
   * \( u_1 = \sin\left( 1 \times \frac{\pi}{6} \right) = \frac{1}{2} \)
   * \( u_2 = \sin\left( 2 \times \frac{\pi}{6} \right) = \frac{\sqrt{3}}{2} \)

2. Pour tout \( n \in \mathbb{N} \), on a :
   \[
   u_{n+12} = \sin\left( \frac{(n+12)\pi}{6} \right) = \sin\left( \frac{n\pi}{6} + 2\pi \right) = \sin\left( \frac{n\pi}{6} \right) = u_n
   \]
   Donc \( k = 12 \).

</details>

### Exercice 4
Soit \( (u_n) \) une suite numérique et \( n \in \mathbb{N} \). Dans chacun des cas suivants, exprimer \( u_{n+1} \) en fonction de \( n \).

* \( u_n = 4n - 7 \)
* \( u_n = \frac{2n - 1}{3n + 6} \)
* \( u_n = 2n^2 - 5n + 8 \)
* \( u_n = (n - 1)^5 \)
* \( u_n = (3n + 7)^2 \)
* \( u_n = \sqrt{2n^2 - 4n + 2} \)

<details>
<summary>Afficher/Masquer la solution</summary>

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} = 4(n+1) - 7 = 4n + 4 - 7 = 4n - 3
  \]

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} = \frac{2(n+1) - 1}{3(n+1) + 6} = \frac{2n + 2 - 1}{3n + 3 + 6} = \frac{2n + 1}{3n + 9}
  \]

* Pour tout \( n \in \mathbb{N} \),
  \[
  \begin{aligned}
  u_{n+1} &= 2(n+1)^2 - 5(n+1) + 8 \\
  &= 2(n^2 + 2n + 1) - 5n - 5 + 8 \\
  &= 2n^2 + 4n + 2 - 5n - 5 + 8 \\
  &= 2n^2 - n + 5
  \end{aligned}
  \]

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} = (n+1 - 1)^5 = n^5
  \]

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} = (3(n+1) + 7)^2 = (3n + 10)^2
  \]

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} = \sqrt{2(n+1)^2 - 4(n+1) + 2} = \sqrt{2n^2} = \sqrt{2} \, n
  \]

</details>

## Suites définies par récurrence

### Exercice 5
Pour chacune des suites numériques suivantes, calculer les termes de rang 1, 2 et 3.

* \( \begin{cases} u_0 = 4 \\ \text{Pour tout } n \in \mathbb{N}, \; u_{n+1} = 2u_n - 3 \end{cases} \)
* \( \begin{cases} u_0 = 2 \\ \text{Pour tout } n \in \mathbb{N}, \; u_{n+1} = \frac{1}{u_n} + 1 \end{cases} \)
* \( \begin{cases} v_0 = 256 \\ \text{Pour tout } n \in \mathbb{N}, \; v_{n+1} = \sqrt{v_n} \end{cases} \)
* \( \begin{cases} w_0 = -3 \\ \text{Pour tout } n \in \mathbb{N}, \; w_{n+1} = w_n + n \end{cases} \)

<details>
<summary>Afficher/Masquer la solution</summary>

* \( u_1 = 2u_0 - 3 = 2 \times 4 - 3 = 5 \)
  \( u_2 = 2u_1 - 3 = 2 \times 5 - 3 = 7 \)
  \( u_3 = 2u_2 - 3 = 2 \times 7 - 3 = 11 \)

* \( u_1 = \frac{1}{u_0} + 1 = \frac{1}{2} + 1 = \frac{3}{2} \)
  \( u_2 = \frac{1}{u_1} + 1 = \frac{1}{\frac{3}{2}} + 1 = \frac{2}{3} + 1 = \frac{5}{3} \)
  \( u_3 = \frac{1}{u_2} + 1 = \frac{1}{\frac{5}{3}} + 1 = \frac{3}{5} + 1 = \frac{8}{5} \)

* \( v_1 = \sqrt{v_0} = \sqrt{256} = 16 \)
  \( v_2 = \sqrt{v_1} = \sqrt{16} = 4 \)
  \( v_3 = \sqrt{v_2} = \sqrt{4} = 2 \)

* \( w_1 = w_0 + 0 = -3 \)
  \( w_2 = w_1 + 1 = -3 + 1 = -2 \)
  \( w_3 = w_2 + 2 = 0 \)

</details>

### Exercice 6
Soit \( k \in \mathbb{N} \). On dit que \( k \) est un nombre triangulaire s'il est possible de placer \( k \) pastilles de manière à représenter un triangle, comme sur la figure ci-dessous. On note \( u_n \) le \( n \)-ième nombre triangulaire.

![Représentation des nombres triangulaires](https://www.mathoutils.fr/wp-content/ql-cache/quicklatex.com-5202f7440b8e9d186a1e7931cf0a38cc_l3.svg)

1. Que valent \( u_1 \), \( u_2 \) et \( u_5 \) ?
2. Exprimer la suite \( (u_n) \) à l'aide d'une relation de récurrence.

<details>
<summary>Afficher/Masquer la solution</summary>

1. On voit que \( u_1 = 1 \) et \( u_2 = 3 \). En continuant le schéma, on trouvera que \( u_5 = 15 \).

   ![Schéma des nombres triangulaires](https://www.mathoutils.fr/wp-content/ql-cache/quicklatex.com-59c6f19f2bf1acfded287ee745c39c53_l3.svg)

2. Pour passer du premier au deuxième, on ajoute 2 points. Pour passer du deuxième au troisième, on ajoute trois points… Pour passer du \( n \)-ième au \( (n+1) \)-ième, on ajoute \( (n+1) \) points.
   Ainsi, pour tout entier naturel \( n \), \( u_{n+1} = u_n + n + 1 \).

</details>

### Exercice 7
Pour chacune des suites numériques suivantes, calculer les termes de rang 2, 3 et 4.

* \( \begin{cases} u_0 = 1 \\ u_1 = 2 \\ \text{Pour tout } n \in \mathbb{N}, \; u_{n+2} = u_{n+1} \times u_n \end{cases} \)
* \( \begin{cases} v_0 = -1 \\ v_1 = 3 \\ \text{Pour tout } n \in \mathbb{N}, \; v_{n+1} = (v_{n+1})^2 - (v_n)^2 \end{cases} \)

<details>
<summary>Afficher/Masquer la solution</summary>

* On a
  * \( u_2 = u_1 \times u_0 = 2 \times 1 = 2 \)
  * \( u_3 = u_2 \times u_1 = 2 \times 2 = 4 \)
  * \( u_4 = u_3 \times u_2 = 4 \times 2 = 8 \)

* On a
  * \( v_2 = (v_1)^2 - (v_0)^2 = 3^2 - (-1)^2 = 9 - 1 = 8 \)
  * \( v_3 = (v_2)^2 - (v_1)^2 = 8^2 - 3^2 = 64 - 9 = 55 \)
  * \( v_4 = (v_3)^2 - (v_2)^2 = 55^2 - 8^2 = 3025 - 64 = 2961 \)

</details>

### Exercice 8
Chaque année, 70% des adhérents d'une association de passionnés de mathématiques renouvellent leur adhésion et 500 nouvelles personnes se joignent à eux. En 2016, cette association compte 2000 abonnés. On note \( a_n \) le nombre d'abonnés en l'an 2016 + \( n \).

1. Que valent \( a_1 \) et \( a_2 \) ?
2. Exprimer la suite \( (a_n) \) à l'aide d'une relation de récurrence.

<details>
<summary>Afficher/Masquer la solution</summary>

1. * \( a_1 = 0.7 \times 2000 + 500 = 1900 \)
   * \( a_2 = 0.7 \times 1900 + 500 = 1830 \)

2. Pour tout \( n \in \mathbb{N} \), on a \( a_{n+1} = 0.7 a_n + 500 \).

</details>

### Exercice 9
Chez les fourmis, lorsque la reine pond un œuf, elle peut décider ou non de le féconder à l'aide d'un spermatozoïde, stocké dans une spermathèque. Si l'œuf est fécondé, il donnera naissance à une femelle. Sinon, il donnera naissance à un mâle. Oui, la fourmi peut décider si elle aura un garçon ou une fille !

On s'intéresse à l'arbre généalogique d'une fourmi mâle. On notera \( M \) si l'ascendant est un mâle et \( F \) si c'est une femelle.

![Arbre généalogique d'une fourmi mâle](https://www.mathoutils.fr/wp-content/ql-cache/quicklatex.com-07c53f2cfa4f271d7dff81dca2f90afa_l3.svg)

On note \( a_n \) le nombre d'ascendants de la fourmi mâle à la \( n \)-ième génération. On note \( m_n \) et \( f_n \) le nombre d'ascendants mâles et d'ascendants femelles à la \( n \)-ième génération.
On a par exemple \( a_1 = 1 \), \( m_1 = 0 \) et \( f_1 = 1 \).

1. Compléter le tableau de valeurs suivant :

| \( n \) | 1 | 2 | 3 | 4 | 5 | 6 |
|---------|---|---|---|---|---|---|
| \( m_n \) | 0 |   |   |   |   |   |
| \( f_n \) | 1 |   |   |   |   |   |
| \( a_n \) | 1 |   |   |   |   |   |

2. Pour tout entier naturel \( n \), exprimer \( a_n \) en fonction de \( m_n \) et \( f_n \).
3. Pour tout entier naturel \( n \), exprimer \( m_{n+1} \) et \( f_{n+1} \) en fonction de \( m_n \) et \( f_n \).
4. En déduire que pour tout entier naturel \( n \), on a \( a_{n+2} = a_{n+1} + a_n \).

Une telle relation est dite « de Fibonacci », du nom d'un mathématicien italien du XIIIe siècle. Plutôt que d'étudier l'ascendance d'une fourmi, celui-ci étudiait la descendance d'un couple de lapin. Chacun son truc.

<details>
<summary>Afficher/Masquer la solution</summary>

1. Tableau complété :

| \( n \) | 1 | 2 | 3 | 4 | 5 | 6 |
|---------|---|---|---|---|---|---|
| \( m_n \) | 0 | 1 | 1 | 2 | 3 | 5 |
| \( f_n \) | 1 | 1 | 2 | 3 | 5 | 8 |
| \( a_n \) | 1 | 2 | 3 | 5 | 8 | 13 |

2. Le nombre d'ascendants est égal au nombre de mâles additionné au nombre de femelles : pour tout \( n \in \mathbb{N} \) :
   \[
   a_n = m_n + f_n
   \]

3. Puisque chaque femelle possède un père et que les mâles n'en ont pas, le nombre de mâles à la génération \( n+1 \) est égal au nombre de femelles à la génération \( n \) :
   \[
   m_{n+1} = f_n
   \]
   De plus, chaque mâle et chaque femelle possède une mère. On a alors :
   \[
   f_{n+1} = m_n + f_n
   \]

4. Rappelons que pour tout \( n \in \mathbb{N} \) :
   \[
   a_n = m_n + f_n
   \]
   Alors,
   \[
   a_{n+2} = m_{n+2} + f_{n+2}
   \]
   Cependant,
   \[
   m_{n+2} = f_{n+1}
   \]
   et
   \[
   f_{n+2} = f_{n+1} + m_{n+1} = a_{n+1}
   \]
   Ainsi,
   \[
   a_{n+2} = f_{n+1} + a_{n+1} = m_n + f_n + a_{n+1} = a_n + a_{n+1}
   \]

</details>

## Suite générée à l'aide d'une fonction

### Exercice 10
On a tracé la courbe représentative d'une fonction \( f \) définie sur \( \mathbb{R} \) dans un repère orthonormé.

![Courbe représentative de f](https://www.mathoutils.fr/wp-content/ql-cache/quicklatex.com-1e054c7eeb4918ad3d302aee8c007552_l3.svg)

1. On considère la suite \( (u_n) \) définie pour tout \( n \) par \( u_n = f(n) \). Déterminer graphiquement les valeurs de \( u_1 \), \( u_3 \), \( u_4 \) et \( u_5 \).
2. On utilise la même fonction \( f \). On pose \( v_0 = 5 \) et pour tout entier naturel \( n \), \( v_{n+1} = f(v_n) \). Déterminer graphiquement des valeurs approchées de \( v_1 \), \( v_2 \) et \( v_3 \).

<details>
<summary>Afficher/Masquer la solution</summary>

1. On a
   * \( u_1 = f(1) = 1 \)
   * \( u_2 = f(2) = 3 \)
   * \( u_3 = f(3) = 4 \)
   * \( u_4 = f(4) = 4 \)
   * \( u_5 = f(5) = 2 \)

2. On a
   * \( v_1 = f(v_0) = f(5) = 2 \)
   * \( v_2 = f(v_1) = f(2) = 3 \)
   * \( v_3 = f(v_2) = f(3) = 4 \)

</details>

### Exercice 11
On a tracé la courbe représentative d'une fonction \( f \) définie sur \( \mathbb{R} \) dans un repère orthonormé.

![Courbe représentative de f](https://www.mathoutils.fr/wp-content/ql-cache/quicklatex.com-3e56235d6384ca777d96df0e1d987e0f_l3.svg)

1. On considère la suite \( (u_n) \) définie pour tout \( n \) par \( u_n = f(n) \). Déterminer graphiquement les valeurs de \( u_1 \), \( u_2 \), \( u_3 \).
2. On utilise la même fonction \( f \). On pose \( v_0 = 3 \) et pour tout entier naturel \( n \), \( v_{n+1} = f(v_n) \). Déterminer la valeur de \( v_{2019} \).

<details>
<summary>Afficher/Masquer la solution</summary>

1. On a
   * \( u_1 = f(1) = 2 \)
   * \( u_2 = f(2) = 3 \)
   * \( u_3 = f(3) = -2 \)

2. Calculons les premiers termes de la suite \( (v_n) \) :
   * \( v_0 = 3 \)
   * \( v_1 = f(v_0) = f(3) = -2 \)
   * \( v_2 = f(v_1) = f(-2) = 1 \)
   * \( v_3 = f(v_2) = f(1) = 2 \)
   * \( v_4 = f(v_3) = f(2) = 3 \)

   On remarque que l'on est revenu à 3 et on aura alors \( v_5 = -2 \), \( v_6 = 1 \), etc. La suite est périodique, de période 4.
   Ainsi, si \( n \) est un multiple de 4, on aura \( v_n = v_0 = 3 \). 2016 étant un multiple de 4, \( v_{2016} = v_0 = 3 \). Alors, \( v_{2017} = -2 \), \( v_{2018} = 1 \) et \( v_{2019} = 2 \).

</details>

## Variations des suites

### Exercice 12
Dans chacun des cas suivants, déterminer le sens de variations de la suite définie pour tout entier naturel \( n \) par…

* \( u_n = -5n + 3 \)
* \( v_n = n^2 \)
* \( w_n = 3n + 4 \)
* \( a_n = \frac{1}{n+1} \)

<details>
<summary>Afficher/Masquer la solution</summary>

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} - u_n = (n+1)^2 - n^2 = (n+1-n)(n+1+n) = 2n+1 > 0
  \]
  La suite \( (u_n) \) est strictement croissante.

* Pour tout \( n \in \mathbb{N} \),
  \[
  v_{n+1} = (n+1)^2 + 2(n+1) - 3 = n^2 + 2n + 1 + 2n + 2 - 3 = n^2 + 4n
  \]
  Ainsi,
  \[
  v_{n+1} - v_n = n^2 + 4n - (n^2 + 2n - 3) = 6n + 3 > 0
  \]
  (On rappelle que \( n \) désigne un entier positif). La suite \( (u_n) \) est strictement croissante.

* On sait que la fonction \( x \mapsto 3x + 4 \) est croissante sur \( \mathbb{R} \) (elle est affine, de coefficient directeur 3 qui est strictement positif). La suite \( (w_n) \) est donc strictement croissante.

* Pour tout \( n \in \mathbb{N} \),
  \[
  \begin{aligned}
  a_{n+1} - a_n &= \frac{1}{n+2} - \frac{1}{n+1} \\
  &= \frac{n+1}{(n+2)(n+1)} - \frac{n+2}{(n+2)(n+1)} \\
  &= \frac{-1}{(n+1)(n+2)} < 0
  \end{aligned}
  \]
  La suite \( (a_n) \) est strictement décroissante.

</details>

### Exercice 13
Dans chacun des cas suivants, déterminer le sens de variations de la suite \( (u_n) \) définie par…

* \( \begin{cases} u_0 = 2 \\ \text{Pour tout } n \in \mathbb{N}, \; u_{n+1} = u_n + \frac{1}{2n - 4} \end{cases} \)
* \( \begin{cases} v_0 = -3 \\ \text{Pour tout } n \in \mathbb{N}, \; v_{n+1} = v_n - \frac{1}{n^2 + 1} \end{cases} \)
* \( \begin{cases} w_0 = \pi \\ \text{Pour tout } n \in \mathbb{N}, \; w_{n+1} = w_n (1 - w_n) \end{cases} \)
* \( \begin{cases} a_0 = -1 \\ \text{Pour tout } n \in \mathbb{N}, \; a_{n+1} = a_n + 3n^2 + 2n + 7 \end{cases} \)

<details>
<summary>Afficher/Masquer la solution</summary>

* Pour tout \( n \in \mathbb{N} \),
  \[
  u_{n+1} - u_n = u_n + \frac{1}{2n - 4} - u_n = \frac{1}{2n - 4}
  \]
  qui est positif dès que \( n \geqslant 1 \). La suite \( (u_n) \) est croissante à partir du rang 1.

* Pour tout \( n \in \mathbb{N} \),
  \[
  v_{n+1} - v_n = v_n - \frac{1}{n^2 + 1} - v_n = -\frac{1}{n^2 + 1} < 0
  \]
  La suite \( (v_n) \) est strictement décroissante.

* Pour tout \( n \in \mathbb{N} \),
  \[
  w_{n+1} - w_n = w_n (1 - w_n) - w_n = w_n (1 - w_n - 1) = -(w_n)^2 \leqslant 0
  \]
  La suite \( (w_n) \) est décroissante.

* Pour tout \( n \in \mathbb{N} \),
  \[
  a_{n+1} - a_n = a_n + 3n^2 + 2n + 7 - a_n = 3n^2 + 2n + 7
  \]
  Le discriminant du polynôme \( 3n^2 + 2n + 7 \) vaut \( 2^2 - 4 \times 3 \times 7 = -80 \) qui est strictement négatif. Ainsi, le polynôme \( 3n^2 + 2n + 7 \) n'admet aucune racine réelle et son signe est celui de son coefficient en \( n^2 \), c'est-à-dire 3.
  Ainsi, pour tout \( n \), \( 3n^2 + 2n + 7 > 0 \). La suite \( (a_n) \) est strictement croissante.

</details>

### Exercice 14 (en lien avec la partie Trigonométrie)
On considère la suite \( (u_n) \) définie pour tout \( n \in \mathbb{N} \) par \( u_n = \sin\left( \frac{n\pi}{2} \right) + n \).

1. Calculer \( u_0 \), \( u_1 \), \( u_2 \) et \( u_3 \).
2. Montrer que, pour tout \( n \in \mathbb{N} \), \( u_{n+4} = u_n + 4 \).
3. Montrer que la suite \( (u_n) \) est croissante.
4. La fonction \( f : x \mapsto \sin\left( \frac{x\pi}{2} \right) + x \), définie sur \( \mathbb{R} \), est-elle croissante sur \( \mathbb{R} \) ?

<details>
<summary>Afficher/Masquer la solution</summary>

1. * \( u_0 = \sin\left( \frac{0\pi}{2} \right) + 0 = 0 + 0 = 0 \)
   * \( u_1 = \sin\left( \frac{1\pi}{2} \right) + 1 = 1 + 1 = 2 \)
   * \( u_2 = \sin\left( \frac{2\pi}{2} \right) + 2 = 0 + 2 = 2 \)
   * \( u_3 = \sin\left( \frac{3\pi}{2} \right) + 3 = -1 + 3 = 2 \)

2. Pour tout \( n \in \mathbb{N} \),
   \[
   \begin{aligned}
   u_{n+4} &= \sin\left( \frac{(n+4)\pi}{2} \right) + n + 4 \\
   &= \sin\left( \frac{n\pi}{2} + 2\pi \right) + n + 4 \\
   &= \left( \sin\left( \frac{n\pi}{2} \right) + n \right) + 4 \\
   &= u_n + 4
   \end{aligned}
   \]

3. Il suffit de se servir des questions précédentes : de \( u_0 \) à \( u_3 \), la suite est croissante et ses termes sont inférieurs à 4. Puis, on reprend les mêmes termes auxquels on ajoute 4, ce qui ne change pas le sens de variation. La suite \( (u_n) \) est donc croissante.

4. En revanche, la fonction \( f \) n'est pas croissante : on a \( f(1) = 2 \) et \( f\left( \frac{5}{2} \right) = \sin\left( \frac{5\pi}{4} \right) + \frac{5}{2} = \frac{5 - \sqrt{2}}{2} \).
   Or, \( 5 - \sqrt{2} < 4 \) car \( \sqrt{2} > 1 \). On en déduit que \( \frac{5 - \sqrt{2}}{2} < \frac{4}{2} = 2 = f(1) \).
   Ainsi, \( 1 < \frac{5}{2} \) mais \( f(1) > f\left( \frac{5}{2} \right) \). \( f \) n'est pas croissante.

</details>

### Exercice 15
Dans chacun des cas suivants, en utilisant un quotient, déterminer le sens de variations de la suite définie pour tout entier naturel \( n \) par…

* \( u_n = \left( \frac{2}{3} \right)^n \)
* \( v_n = \frac{n}{n+1} \)
* \( w_n = \frac{3^n}{n} \) pour \( n > 0 \).

<details>
<summary>Afficher/Masquer la solution</summary>

* Pour tout entier naturel \( n \), \( u_n > 0 \) et
  \[
  \frac{u_{n+1}}{u_n} = \frac{\left( \frac{2}{3} \right)^{n+1}}{\left( \frac{2}{3} \right)^n} = \frac{2}{3} < 1
  \]
  La suite \( (u_n) \) est donc strictement décroissante.

* Pour tout entier naturel \( n \), \( v_n > 0 \) et
  \[
  \frac{v_{n+1}}{v_n} = \frac{\frac{n+1}{n+2}}{\frac{n}{n+1}} = \frac{n+1}{n+2} \times \frac{n+1}{n}
  \]
  Ainsi,
  \[
  \frac{v_{n+1}}{v_n} = \frac{n^2 + 2n + 1}{n^2 + 2n} = \frac{n^2
