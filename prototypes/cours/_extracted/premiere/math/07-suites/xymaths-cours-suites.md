---
source_url: "https://xymaths.fr/Lycee/premiere-generale-specialite-mathematiques/Cours/Cours-Suites.php"
chapter: "07-suites"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:00+00:00"
cleaned_at: "2026-05-22T08:29:43+00:00"
---

## Suites numériques

Cours de mathématiques sur les suites numériques en spécialité maths, première générale. Définition générale des suites numériques, et deux modes de définition : explicite comme échantillonnage d'une fonction, ou par récurrence.
On étudie deux suites très particulières : les suites arithmétiques et les suites géométriques, ainsi que la somme des termes consécutifs de ces suites.

### Définition d'une suite

> **Définition**
> Une **suite numérique** est une fonction définie sur \(\mathbb{N}\) (ou une partie de \(\mathbb{N}\)) à valeurs dans \(\mathbb{R}\).
> On note généralement \((u_n)\) la suite, et \(u_n\) le terme de rang \(n\) (ou d'indice \(n\)).

#### Définition explicite

> **Définition**
> Une suite est définie **explicitement** lorsque l'on peut calculer directement \(u_n\) en fonction de \(n\).
> On a alors \(u_n = f(n)\) où \(f\) est une fonction définie sur \(\mathbb{N}\).

**Exemple**
Soit \((u_n)\) la suite définie pour tout \(n \in \mathbb{N}\) par \(u_n = 3n - 2\).
Alors \(u_0 = -2\), \(u_1 = 1\), \(u_2 = 4\), \(u_3 = 7\), etc.

#### Définition par récurrence

> **Définition**
> Une suite est définie **par récurrence** lorsque l'on donne :
> * son premier terme \(u_0\) (ou \(u_1\)),
> * une relation qui permet de calculer un terme à partir du précédent : \(u_{n+1} = g(u_n)\) où \(g\) est une fonction.

**Exemple**
Soit \((u_n)\) la suite définie par \(u_0 = 1\) et pour tout \(n \in \mathbb{N}\), \(u_{n+1} = 2u_n + 3\).
Alors \(u_1 = 2 \times 1 + 3 = 5\), \(u_2 = 2 \times 5 + 3 = 13\), \(u_3 = 2 \times 13 + 3 = 29\), etc.

### Sens de variation d'une suite

> **Définition**
> Soit \((u_n)\) une suite.
> * \((u_n)\) est **croissante** si pour tout \(n \in \mathbb{N}\), \(u_{n+1} \ge u_n\).
> * \((u_n)\) est **décroissante** si pour tout \(n \in \mathbb{N}\), \(u_{n+1} \le u_n\).
> * \((u_n)\) est **constante** si pour tout \(n \in \mathbb{N}\), \(u_{n+1} = u_n\).
> * \((u_n)\) est **monotone** si elle est croissante ou décroissante.

> **Méthode**
> Pour étudier le sens de variation d'une suite \((u_n)\) :
> * On peut étudier le signe de \(u_{n+1} - u_n\).
> * Si \(u_n > 0\) pour tout \(n\), on peut comparer \(\frac{u_{n+1}}{u_n}\) à 1.
> * Si la suite est définie explicitement par \(u_n = f(n)\), on peut étudier les variations de \(f\) sur \([0;+\infty[\).

**Exemple**
Soit \((u_n)\) définie pour tout \(n \in \mathbb{N}\) par \(u_n = n^2 - 4n\).
\(u_{n+1} - u_n = (n+1)^2 - 4(n+1) - (n^2 - 4n) = n^2 + 2n + 1 - 4n - 4 - n^2 + 4n = 2n - 3\).
Pour \(n \ge 2\), \(2n - 3 \ge 1 > 0\) donc \((u_n)\) est croissante à partir du rang 2.

### Suites particulières

#### Suite arithmétique

> **Définition**
> Une suite \((u_n)\) est **arithmétique** s'il existe un réel \(r\) (appelé **raison**) tel que pour tout \(n \in \mathbb{N}\),
> \[ u_{n+1} = u_n + r. \]

> **Propriété**
> Si \((u_n)\) est une suite arithmétique de premier terme \(u_0\) et de raison \(r\), alors pour tout \(n \in \mathbb{N}\) :
> \[ u_n = u_0 + n r. \]
> Plus généralement, pour tous \(p, n \in \mathbb{N}\) :
> \[ u_n = u_p + (n-p) r. \]

> **Propriété (sens de variation)**
> Soit \((u_n)\) une suite arithmétique de raison \(r\).
> * Si \(r > 0\), la suite est strictement croissante.
> * Si \(r < 0\), la suite est strictement décroissante.
> * Si \(r = 0\), la suite est constante.

> **Propriété (somme des termes)**
> La somme des \(n+1\) premiers termes d'une suite arithmétique \((u_n)\) de premier terme \(u_0\) et de raison \(r\) est :
> \[ S_n = u_0 + u_1 + \cdots + u_n = \frac{(n+1)(u_0 + u_n)}{2}. \]
> Plus généralement, la somme de termes consécutifs d'une suite arithmétique est :
> \[ \text{(nombre de termes)} \times \frac{\text{(premier terme + dernier terme)}}{2}. \]

**Exemple**
Soit \((u_n)\) la suite arithmétique de premier terme \(u_0 = 5\) et de raison \(r = 3\).
Alors \(u_n = 5 + 3n\).
\(u_{10} = 5 + 3 \times 10 = 35\).
Somme des 11 premiers termes : \(S_{10} = \frac{11 \times (5 + 35)}{2} = \frac{11 \times 40}{2} = 220\).

#### Suite géométrique

> **Définition**
> Une suite \((u_n)\) est **géométrique** s'il existe un réel \(q\) (appelé **raison**) tel que pour tout \(n \in \mathbb{N}\),
> \[ u_{n+1} = u_n \times q. \]

> **Propriété**
> Si \((u_n)\) est une suite géométrique de premier terme \(u_0\) et de raison \(q\), alors pour tout \(n \in \mathbb{N}\) :
> \[ u_n = u_0 \times q^n. \]
> Plus généralement, pour tous \(p, n \in \mathbb{N}\) :
> \[ u_n = u_p \times q^{n-p}. \]

> **Propriété (sens de variation)**
> Soit \((u_n)\) une suite géométrique de premier terme \(u_0\) et de raison \(q\).
> * Si \(u_0 > 0\) :
>   * Si \(q > 1\), la suite est strictement croissante.
>   * Si \(0 < q < 1\), la suite est strictement décroissante.
>   * Si \(q = 1\), la suite est constante.
> * Si \(u_0 < 0\) :
>   * Si \(q > 1\), la suite est strictement décroissante.
>   * Si \(0 < q < 1\), la suite est strictement croissante.
>   * Si \(q = 1\), la suite est constante.
> * Si \(q < 0\), la suite n'est pas monotone (termes alternés).

> **Propriété (somme des termes)**
> La somme des \(n+1\) premiers termes d'une suite géométrique \((u_n)\) de premier terme \(u_0\) et de raison \(q \neq 1\) est :
> \[ S_n = u_0 + u_1 + \cdots + u_n = u_0 \times \frac{1 - q^{n+1}}{1 - q}. \]
> Si \(q = 1\), alors \(S_n = (n+1) u_0\).

**Exemple**
Soit \((u_n)\) la suite géométrique de premier terme \(u_0 = 3\) et de raison \(q = 2\).
Alors \(u_n = 3 \times 2^n\).
\(u_5 = 3 \times 2^5 = 3 \times 32 = 96\).
Somme des 6 premiers termes : \(S_5 = 3 \times \frac{1 - 2^6}{1 - 2} = 3 \times \frac{1 - 64}{-1} = 3 \times 63 = 189\).

### Exercices

**Exercice 1**
Soit \((u_n)\) la suite définie pour tout \(n \in \mathbb{N}\) par \(u_n = \frac{2n+1}{n+2}\).
1. Calculer \(u_0\), \(u_1\), \(u_2\), \(u_3\).
2. Étudier le sens de variation de \((u_n)\).

**Exercice 2**
Soit \((u_n)\) la suite définie par \(u_0 = 2\) et pour tout \(n \in \mathbb{N}\), \(u_{n+1} = \frac{1}{2}u_n + 1\).
1. Calculer \(u_1\), \(u_2\), \(u_3\).
2. La suite \((v_n)\) est définie par \(v_n = u_n - 2\). Montrer que \((v_n)\) est une suite géométrique.
3. En déduire l'expression de \(u_n\) en fonction de \(n\).

**Exercice 3**
Une entreprise produit des articles. La production augmente de 5% chaque année. La première année, elle produit 10 000 articles.
1. Modéliser la production par une suite \((u_n)\) où \(u_n\) est la production la \(n\)-ième année.
2. Quelle est la production la 5e année ?
3. Quelle est la production totale sur les 10 premières années ?

**Exercice 4**
Soit \((u_n)\) une suite arithmétique telle que \(u_5 = 12\) et \(u_{10} = 27\).
1. Déterminer la raison \(r\) et le premier terme \(u_0\).
2. Calculer \(u_{20}\).
3. Calculer la somme \(S = u_0 + u_1 + \cdots + u_{20}\).
