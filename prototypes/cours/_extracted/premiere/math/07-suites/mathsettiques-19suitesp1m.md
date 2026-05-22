---
source_url: "https://www.maths-et-tiques.fr/telech/19SuitesP1M.pdf"
chapter: "07-suites"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:50+00:00"
cleaned_at: "2026-05-22T08:25:46+00:00"
---

## GÉNÉRALITÉS SUR LES SUITES

Tout le cours en vidéo : https://youtu.be/8I6dotcdW3I

Dès l'Antiquité, Archimède de Syracuse (-287 ; -212), met en œuvre une procédure itérative pour trouver une approximation du nombre \(\pi\). Il encadre le cercle par des polygones inscrits et circonscrits possédant un nombre de côtés de plus en plus grand. Par ce procédé, Archimède donne naissance, sans le savoir, à la notion de suite numérique.

Vers la fin du XVIIe siècle, des méthodes semblables sont utilisées pour résoudre des équations de façon approchée pour des problèmes de longueurs, d'aires, … Un formalisme plus rigoureux de la notion de suite n'apparaitra qu'au début du XIXe siècle avec le mathématicien français Augustin Louis Cauchy (1789 ; 1857).

### Partie 1 : Définition et représentation graphique

#### 1) Définition d'une suite

**Exemple d'introduction :** On considère une liste de nombres formée par tous les nombres impairs rangés dans l'ordre croissant : 1, 3, 5, 7, …

On note \((u_n)\) l'ensemble des "éléments" de cette suite de nombres tel que :
*   \(u_0 = 1\) : le premier terme de la suite
*   \(u_1 = 3\) : le 2e terme
*   \(u_2 = 5\) : le 3e terme
*   \(u_3 = 7\) : …

On a ainsi défini une suite numérique.

> **Définitions :**
> Une suite \((u_n)\) est une liste ordonnée de nombres telle qu'à tout entier \(n\), on associe un nombre réel noté \(u_n\).
> \(u_0, u_1, u_2, …\) sont appelés les **termes** de la suite.
> \(n\) est appelé le **rang**.

**Remarque :** Une suite peut être associée à une fonction définie par
\[
u : \mathbb{N} \rightarrow \mathbb{R}
\]
\[
n \longmapsto u(n) = u_n
\]

#### 2) Suites définies en fonction de \(n\) (forme explicite)

**Méthode : Calculer des termes d’une suite définie en fonction de \(n\)**
Vidéo https://youtu.be/HacflVQ7DIE (1er exemple)

Calculer les quatre premiers termes des suites suivantes :
a) \(u_n = 2n\)
b) \(v_n = 3n^2 - 1\)

**Correction**

a) On considère : \(u_n = 2n\)

Les premiers termes de cette suite sont donc :
*   \(u_0 = 2 \times 0 = 0\) ← On remplace \(n\) par 0
*   \(u_1 = 2 \times 1 = 2\) ← On remplace \(n\) par 1
*   \(u_2 = 2 \times 2 = 4\)
*   \(u_3 = 2 \times 3 = 6\)

b) On considère : \(v_n = 3n^2 - 1\).

Les premiers termes de cette suite sont donc :
*   \(v_0 = 3 \times 0^2 - 1 = -1\)
*   \(v_1 = 3 \times 1^2 - 1 = 2\)
*   \(v_2 = 3 \times 2^2 - 1 = 11\)
*   \(v_3 = 3 \times 3^2 - 1 = 26\)

#### 3) Suites définies par récurrence

Chaque terme de la suite s'obtient à partir du terme précédent. On exprime en général \(u_{n+1}\) en fonction de \(u_n\). En effet, les termes \(u_n\) et \(u_{n+1}\) se suivent. Par exemple, \(u_4\) et \(u_{4+1} = u_5\) se suivent.

**Méthode : Calculer des termes d’une suite définie par récurrence (1)**
Vidéo https://youtu.be/C38g2fHFttw (2e exemple)

Calculer les quatre premiers termes des suites suivantes :
a) Pour tout entier \(n\), on donne :
\[
\begin{cases}
u_0 = 5 \\
u_{n+1} = 3u_n
\end{cases}
\]
b) Pour tout entier \(n\), on donne :
\[
\begin{cases}
v_0 = 3 \\
v_{n+1} = 4v_n - 6
\end{cases}
\]

**Correction**

a) La suite \((u_n)\) est définie par \(u_0 = 5\) et pour tout entier \(n\), on a \(u_{n+1} = 3u_n\). Par cette suite, chaque terme est le triple de son précédent.

Les premiers termes de cette suite sont donc :
*   \(u_0 = 5\)
*   \(u_1 = 3 \times u_0 = 3 \times 5 = 15\) ← On remplace \(u_0\) par sa valeur.
*   \(u_2 = 3 \times u_1 = 3 \times 15 = 45\)
*   \(u_3 = 3 \times u_2 = 3 \times 45 = 135\)

b) La suite \((v_n)\) est définie par \(v_0 = 3\) et pour tout entier \(n\), on a \(v_{n+1} = 4v_n - 6\).

Les premiers termes de cette suite sont donc :
*   \(v_0 = 3\)
*   \(v_1 = 4 \times v_0 - 6 = 4 \times 3 - 6 = 6\)
*   \(v_2 = 4 \times v_1 - 6 = 4 \times 6 - 6 = 18\)
*   \(v_3 = 4 \times v_2 - 6 = 4 \times 18 - 6 = 66\)

**Méthode : Calculer des termes d’une suite définie par récurrence (2)**
Vidéo https://youtu.be/C38g2fHFttw

Pour tout entier \(n\), on donne :
\[
\begin{cases}
w_1 = 1 \\
w_{n+1} = w_n + n
\end{cases}
\]
Calculer les quatre premiers termes de la suite.

**Correction**

Dans cet exercice, le premier terme est \(w_1\). La suite \((w_n)\) est définie par \(w_1 = 1\) et pour tout entier \(n\), on a \(w_{n+1} = w_n + n\).

Les premiers termes de cette suite sont donc :
*   \(w_2 = w_{1+1} = w_1 + 1 = 1 + 1 = 2\) ← \(n\) est égal à 1
*   \(w_3 = w_{2+1} = w_2 + 2 = 2 + 2 = 4\) ← \(n\) est égal à 2
*   \(w_4 = w_{3+1} = w_3 + 3 = 4 + 3 = 7\) ← \(n\) est égal à 3

**Remarque :** Contrairement à une suite définie en fonction de \(n\), il n'est par exemple pas possible de calculer \(u_{25}\) sans connaître \(u_{24}\) pour une suite définie par récurrence. Le mot récurrence vient du latin *recurrere* qui signifie "revenir en arrière". Cependant, il est possible d'écrire un algorithme avec Python calculant les termes successifs d’une suite définie par récurrence.

**Méthode : Calculer un terme à l’aide d’un algorithme**
Vidéos https://youtu.be/CYDUNYndHfg

Pour tout entier \(n\), on donne :
\[
\begin{cases}
u_0 = 3 \\
u_{n+1} = 4u_n - 6
\end{cases}
\]
Écrire un programme Python permettant de calculer les termes de la suite \((u_n)\). Afficher le terme \(u_{10}\).

**Correction**

```python
def suite_u(n):
    u = 3
    for i in range(n):
        u = 4*u - 6
    return u

print(suite_u(10))
```

#### 4) Représentation graphique d'une suite

**Méthode : Représenter graphiquement une suite**
Vidéos https://youtu.be/VpSK4uLTFhM, https://youtu.be/whjDbPyJMXk, https://youtu.be/ycFal1d_QcE, https://youtu.be/Ol2wPXZTyG0

Pour tout entier \(n\), on donne : \(u_n = \frac{n^2}{2} - 3\). Représenter dans un repère les premiers termes de la suite \((u_n)\).

**Correction**

On construit un tableau de valeurs avec les premiers termes de la suite :

| \(n\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| \(u_n\) | -3 | -2,5 | -1 | 1,5 | 5 | 9,5 | 15 | 21,5 | 29 |

Dans un repère du plan, on représente la suite \((u_n)\) par un nuage de points de coordonnées \((n ; u_n)\).

### Partie 2 : Sens de variation d'une suite numérique

**Exemple :** On a représenté ci-dessous le nuage de points des premiers termes d'une suite \((u_n)\) :

On observe graphiquement que cette suite est croissante à partir du rang \(n=3\).

> **Définitions :**
> La suite \((u_n)\) est **croissante** à partir d’un certain rang signifie que \(u_{n+1} \ge u_n\) à partir de ce rang.
> La suite \((u_n)\) est **décroissante** à partir d’un certain rang signifie que \(u_{n+1} \le u_n\) à partir de ce rang.

*   \((u_n)\) est croissante
*   \((u_n)\) est décroissante

**Remarques :**
*   Pour une suite constante, on a \(u_{n+1} = u_n\).
*   Lorsqu’on a \(u_{n+1} > u_n\), on dit que \((u_n)\) est **strictement croissante**.
*   Lorsqu’on a \(u_{n+1} < u_n\), on dit que \((u_n)\) est **strictement décroissante**.

**Méthode : Étudier le sens de variation d’une suite**
Vidéos https://youtu.be/DFz8LDKCw9Y, https://youtu.be/2DYDVje53ss

a) Pour tout entier \(n\), on donne : \(u_n = n^2 - 4n + 4\). Démontrer que la suite \((u_n)\) est croissante à partir d'un certain rang à déterminer.
b) Pour tout \(n\) de \(\mathbb{N}^*\), on donne : \(v_n = \frac{1}{n(n+1)}\). Démontrer que la suite \((v_n)\) est décroissante.

**Correction**

a) On commence par calculer la différence \(u_{n+1} - u_n\) :
\[
\begin{aligned}
u_{n+1} - u_n &= (n+1)^2 - 4(n+1) + 4 - (n^2 - 4n + 4) \\
&= n^2 + 2n + 1 - 4n - 4 + 4 - n^2 + 4n - 4 \\
&= 2n - 3
\end{aligned}
\]

On étudie ensuite le signe de \(u_{n+1} - u_n\) :
\(u_{n+1} - u_n \ge 0\) pour \(2n - 3 \ge 0\) donc pour \(n \ge 1,5\). Soit \(n \ge 2\), car \(n\) est entier.

On a : \(u_{n+1} - u_n \ge 0\) donc \(u_{n+1} \ge u_n\), pour \(n \ge 2\).

On en déduit qu'à partir du rang 2, la suite \((u_n)\) est croissante.

b) On commence par calculer le rapport \(\frac{v_{n+1}}{v_n}\) :
\[
\frac{v_{n+1}}{v_n} = \frac{\frac{1}{(n+1)(n+2)}}{\frac{1}{n(n+1)}} = \frac{n(n+1)}{(n+1)(n+2)} = \frac{n}{n+2}
\]

Or \(0 < n \le n+2\), donc : \(\frac{v_{n+1}}{v_n} \le 1\) et donc \(v_{n+1} \le v_n\) (car \(v_n > 0\)).

On en déduit que \((v_n)\) est décroissante.

**Méthode : Étudier les variations d'une suite à l'aide de la fonction associée**
Vidéo https://youtu.be/dPR3GyQycH0

Pour tout \(n\) de \(\mathbb{N}\), on donne : \(u_n = \frac{1}{n+1}\).

a) On considère la fonction associée \(f\) définie sur \([0 ; +\infty[\) par \(f(x) = \frac{1}{x+1}\). Démontrer que la fonction \(f\) est décroissante sur \([0 ; +\infty[\).
b) En déduire que la suite \((u_n)\) est décroissante.

**Correction**

a) Étudions les variations de la fonction \(f\) définie sur \([0 ; +\infty[\). Pour cela, on va étudier le signe de la dérivée.
\[
f'(x) = -\frac{1}{(x+1)^2}
\]

Pour tout \(x\) de \([0 ; +\infty[\), on a : \(f'(x) < 0\), car \((x+1)^2\) est toujours strictement positif.

Donc \(f\) est strictement décroissante sur \([0 ; +\infty[\).

b) On a : \(u_n = \frac{1}{n+1}\) et \(f(x) = \frac{1}{x+1}\).

\(f\) est strictement décroissante pour tout \(x\) réel positif, donc :
\(f\) est strictement décroissante pour tout \(x\) entier positif, donc :
\((u_n)\) est strictement décroissante pour tout \(n\) entier positif.

En effet, \(f\) et \((u_n)\) ont la même expression et sont égales pour des valeurs entières positives.

> **⚠ Remarque :** En général, si la suite est décroissante, cela ne signifie pas que la fonction est décroissante. La représentation suivante montre une suite décroissante alors que la fonction \(f\) associée n'est pas décroissante.

### Partie 3 : Notion de limite d'une suite

**Exemple d’introduction :** Pour tout \(n\) de \(\mathbb{N}^*\), on donne : \(u_n = \frac{2n+1}{n}\). On construit le tableau de valeurs avec des termes de la suite de plus en plus grands :

| \(n\) | 1 | 2 | 3 | 4 | 5 | 10 | 15 | 50 | 500 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| \(u_n\) | 3 | 2,5 | 2,333 | 2,25 | 2,2 | 2,1 | 2,067 | 2,02 | 2,002 |

Plus \(n\) devient grand, plus les termes de la suite semblent se rapprocher de 2. On dit que la suite \((u_n)\) converge vers 2.

**Notation :** \(\lim_{n \to +\infty} u_n = 2\). On lit : la limite de \(u_n\) lorsque \(n\) tend vers \(+\infty\) est égale à 2.

> **Définitions :**
> Une suite **convergente** possède des termes qui se rapprochent d’une valeur, appelée **limite**, lorsque \(n\) devient de plus en plus grand.
> Une suite qui n’est pas convergente est **divergente**.

**Méthode : Conjecturer la limite d’une suite**
Vidéo https://youtu.be/0CC-EqOH92c

1) Pour tout entier \(n\), on donne : \(u_n = n^2 + 1\). Calculer \(u_0, u_1, u_2, u_{10}\) et \(u_{100}\). La suite \((u_n)\) semble-t-elle être convergente ou divergente?
2) Pour tout entier \(n\), on donne :
\[
\begin{cases}
v_0 = 2 \\
v_{n+1} = (-1)^n v_n
\end{cases}
\]
Calculer des termes de la suite. La suite \((v_n)\) semble-t-elle être convergente ou divergente?

**Correction**

1) \(u_0 = 0^2 + 1 = 1\), \(u_1 = 1^2 + 1 = 2\), \(u_2 = 2^2 + 1 = 5\), \(u_{10} = 10^2 + 1 = 101\), \(u_{100} = 100^2 + 1 = 10\,001\).

Plus \(n\) devient grand, plus les termes de la suite semblent devenir grand. La suite \((u_n)\) semble diverger vers \(+\infty\) et on note : \(\lim_{n \to +\infty} u_n = +\infty\).

2) \(v_1 = (-1)^0 v_0 = 2\)
\(v_2 = (-1)^1 v_1 = -2\)
\(v_3 = (-1)^2 v_2 = -2\)
\(v_4 = (-1)^3 v_3 = 2\)
\(v_5 = (-1)^4 v_4 = 2\)

Lorsque \(n\) augmente, les termes de la suite ne semblent pas se rapprocher d’une valeur. La suite \((v_n)\) semble diverger.

**Méthode : Déterminer un seuil à l’aide d’un algorithme**
Vidéos https://youtu.be/vJmpzwhaka8

Pour tout entier \(n\), on donne :
\[
\begin{cases}
u_0 = 2 \\
u_{n+1} = 0,9u_n + 1
\end{cases}
\]
Écrire un programme Python permettant de déterminer le rang de la suite à partir duquel les termes sont supérieurs à 8.

**Correction**

```python
def seuil():
    n = 0
    u = 2
    while u <= 8:
        u = 0.9*u + 1
        n = n + 1
    return n

print(seuil())
```

Les termes de la suite sont supérieurs à 8 à partir de \(u_{14}\).
