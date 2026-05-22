---
source_url: "https://www.maths-et-tiques.fr/telech/19SuitesP2M.pdf"
chapter: "07-suites"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:51+00:00"
cleaned_at: "2026-05-22T08:26:39+00:00"
---

## SUITES ARITHMÉTIQUES ET SUITES GÉOMÉTRIQUES

Tout le cours en vidéo : https://youtu.be/05UHsy9G4M4

## Partie 1 : Suites arithmétiques

### 1) Définition

**Exemple d’introduction :**
Considérons la suite \((u_n)\) où l’on passe d’un terme au suivant en ajoutant 5. Si le premier terme est égal à 3, les termes suivants sont : \(u_0=3\), \(u_1=8\), \(u_2=13\), \(u_3=18\). Une telle suite est appelée une suite arithmétique de raison 5 et de premier terme 3. La suite est donc définie par :
\[
\begin{cases}
u_0 = 3 \\
u_{n+1} = u_n + 5
\end{cases}
\]

> **Définition :** Une suite \((u_n)\) est une suite arithmétique s'il existe un nombre \(r\) tel que pour tout entier \(n\), on a : \(u_{n+1} = u_n + r\). Le nombre \(r\) est appelé raison de la suite.

**Remarque :** La raison peut être un nombre négatif. On peut par exemple ajouter \(-2\).

**Méthode : Démontrer qu’une suite est arithmétique**
Vidéo https://youtu.be/YCokWYcBBOk

a) La suite \((u_n)\) définie par : \(u_n = 7 - 9n\) est-elle arithmétique ?
b) La suite \((v_n)\) définie par : \(v_n = n^2 + 3\) est-elle arithmétique ?

**Correction**
a)
\[
\begin{aligned}
u_{n+1} - u_n &= 7 - 9(n+1) - (7 - 9n) \\
&= 7 - 9n - 9 - 7 + 9n \\
&= -9.
\end{aligned}
\]
La différence entre deux termes successifs reste constante et égale à \(-9\), donc on passe d’un terme au suivant en ajoutant \(-9\). \((u_n)\) est une suite arithmétique de raison \(-9\).

b)
\[
\begin{aligned}
v_{n+1} - v_n &= (n+1)^2 + 3 - (n^2 + 3) \\
&= n^2 + 2n + 1 + 3 - n^2 - 3 \\
&= 2n + 1.
\end{aligned}
\]
La différence entre un terme et son précédent n’est pas constante car elle dépend de \(n\). \((v_n)\) n'est pas une suite arithmétique.

> **Propriété :** \((u_n)\) est une suite arithmétique de raison \(r\) et de premier terme \(u_0\). Pour tout entier naturel \(n\), on a : \(u_n = u_0 + nr\)

**Démonstration au programme :**
Vidéo https://youtu.be/Jn4_xM_ZJD0

La suite arithmétique \((u_n)\) de raison \(r\) et de premier terme \(u_0\) vérifie la relation \(u_{n+1} = u_n + r\). En calculant les premiers termes :
\[
\begin{aligned}
u_1 &= u_0 + r \\
u_2 &= u_1 + r \\
u_3 &= u_2 + r \\
&\ \vdots \\
u_n &= u_{n-1} + r
\end{aligned}
\]
En additionnant membre à membre ces \(n\) égalités, on obtient :
\[
u_1 + u_2 + u_3 + \cdots + u_n = u_0 + u_1 + u_2 + \cdots + u_{n-1} + n \times r
\]
Soit, en retranchant aux deux membres les termes identiques :
\[
u_n = u_0 + nr
\]

**Méthode : Déterminer une expression en fonction de \(n\) d’une suite arithmétique**
Vidéo https://youtu.be/6O0KhPMHvBA

a) Déterminer l’expression, en fonction de \(n\), de la suite arithmétique définie par :
\[
\begin{cases}
u_0 = 7 \\
u_{n+1} = u_n - 4
\end{cases}
\]

b) Déterminer l’expression, en fonction de \(n\), de la suite arithmétique définie par :
\[
\begin{cases}
u_1 = 5 \\
u_{n+1} = u_n + 3
\end{cases}
\]

**Correction**
a) On a : \(u_0 = 7\) et \(u_{n+1} = u_n - 4\). On passe d’un terme au suivant en ajoutant \(-4\), et donc la raison \(r\) est égale à \(-4\) et le premier terme \(u_0\) est égal à 7. Ainsi :
\[
\begin{aligned}
u_n &= u_0 + nr \\
u_n &= 7 + n \times (-4) \\
u_n &= 7 - 4n
\end{aligned}
\]

b) On a : \(u_1 = 5\) et \(u_{n+1} = u_n + 3\). On passe d’un terme au suivant en ajoutant 3, donc la raison \(r\) est égale à 3. Ici, le terme \(u_0\) n’est pas donné mais on peut le calculer. Pour passer de \(u_1\) à \(u_0\), on retire 3 (« marche arrière ») donc \(u_0 = u_1 - 3 = 5 - 3 = 2\). Ainsi :
\[
\begin{aligned}
u_n &= u_0 + nr \\
u_n &= 2 + 3n
\end{aligned}
\]

⚠ **À noter :** Il peut être pratique d’appliquer directement la formule : \(u_n = u_1 + (n-1)r\)

**Méthode : Déterminer la raison et le premier terme d'une suite arithmétique**
Vidéo https://youtu.be/iEuoMgBblz4

Considérons la suite arithmétique \((u_n)\) tel que \(u_5 = 7\) et \(u_9 = 19\).

a) Déterminer la raison et le premier terme de la suite \((u_n)\).
b) Exprimer \(u_n\) en fonction de \(n\).

**Correction**
a) Les termes de la suite sont de la forme \(u_n = u_0 + nr\). Ainsi :
\[
\begin{cases}
u_5 = u_0 + 5r \\
u_9 = u_0 + 9r
\end{cases}
\]
\[
\begin{cases}
7 = u_0 + 5r \\
19 = u_0 + 9r
\end{cases}
\]
On soustrait membre à membre :
\[
7 - 19 = u_0 + 5r - u_0 - 9r
\]
\[
-12 = -4r
\]
\[
\frac{-12}{-4} = r
\]
\[
r = 3
\]
Comme \(u_0 + 5r = 7\), on a :
\[
u_0 + 5 \times 3 = 7
\]
\[
u_0 = 7 - 15
\]
\[
u_0 = -8.
\]

b) \(u_n = u_0 + nr\)
\[
u_n = -8 + n \times 3
\]
\[
u_n = 3n - 8
\]

### 2) Sens de variation

> **Propriété :** \((u_n)\) est une suite arithmétique de raison \(r\).
> * Si \(r > 0\) alors la suite \((u_n)\) est croissante.
> * Si \(r < 0\) alors la suite \((u_n)\) est décroissante.

**Démonstration :**
\(u_{n+1} - u_n = u_n + r - u_n = r\).
* Si \(r > 0\) alors \(u_{n+1} - u_n > 0\) et la suite \((u_n)\) est croissante.
* Si \(r < 0\) alors \(u_{n+1} - u_n < 0\) et la suite \((u_n)\) est décroissante.

**Méthode : Déterminer le sens de variation d’une suite arithmétique**
Vidéo https://youtu.be/R3sHNwOb02M

Étudier les variations des suites arithmétiques \((u_n)\) et \((v_n)\) définies par :
a) \(u_n = 3 + 5n\)
b)
\[
\begin{cases}
v_0 = -3 \\
v_{n+1} = v_n - 4
\end{cases}
\]

**Correction**
a) \((u_n)\) est croissante car de raison positive et égale à 5.
b) On passe d’un terme au suivant en ajoutant \(-4\). \((v_n)\) est décroissante car de raison négative et égale à \(-4\).

### 3) Représentation graphique

Les points de la représentation graphique d'une suite arithmétique sont alignés.

**Exemple :** On a représenté ci-dessous la suite arithmétique de raison \(-0,5\) et de premier terme 4.

### RÉSUMÉ

\((u_n)\) une suite arithmétique de raison \(r\) de premier terme \(u_0\). Exemple : \(r = -0,5\) et \(u_0 = 4\)

| Définition | \(u_{n+1} = u_n + r\) | \(u_{n+1} = u_n - 0,5\) |
| :--- | :--- | :--- |
| | La différence entre un terme et son précédent est égale à \(-0,5\). | |
| Propriété | \(u_n = u_0 + nr\) | \(u_n = 4 - 0,5n\) |
| Sens de variation | Si \(r > 0\) : \((u_n)\) est croissante. Si \(r < 0\) : \((u_n)\) est décroissante. | \(r = -0,5 < 0\) La suite \((u_n)\) est décroissante. |
| Représentation graphique | Remarque : Les points de la représentation graphique sont alignés. La croissance est linéaire. | |

## Partie 2 : Suites géométriques

### 1) Définition

**Exemple d’introduction :**
Considérons la suite \((u_n)\) où l’on passe d’un terme au suivant en multipliant par 2. Si le premier terme est égal à 5, les termes suivants sont : \(u_0=5\), \(u_1=10\), \(u_2=20\), \(u_3=40\). Une telle suite est appelée une suite géométrique de raison 2 et de premier terme 5. La suite est donc définie par :
\[
\begin{cases}
u_0 = 5 \\
u_{n+1} = 2u_n
\end{cases}
\]

> **Définition :** Une suite \((u_n)\) est une suite géométrique s'il existe un nombre réel non nul \(q\) tel que pour tout entier \(n\), on a : \(u_{n+1} = q \times u_n\). Le nombre \(q\) est appelé raison de la suite.

**Méthode : Démontrer qu’une suite est géométrique**
Vidéo https://youtu.be/YPbEHxuMaeQ

La suite \((u_n)\) définie par : \(u_n = 3 \times 5^n\) est-elle géométrique ?

**Correction**
\[
\frac{u_{n+1}}{u_n} = \frac{3 \times 5^{n+1}}{3 \times 5^n} = \frac{5^{n+1}}{5^n} = 5
\]
Le rapport entre un terme et son précédent reste constant et égal à 5, donc on passe d’un terme au suivant en multipliant par 5. \((u_n)\) est une suite géométrique de raison 5 et de premier terme \(u_0 = 3 \times 5^0 = 3\).

**Exemple concret :**
On place un capital de 500 € sur un compte dont les intérêts annuels s'élèvent à 4 %. Chaque année, le capital est donc multiplié par 1,04. Ce capital suit une progression géométrique de raison 1,04. On a ainsi :
\[
\begin{aligned}
u_1 &= 1,04 \times 500 = 520 \\
u_2 &= 1,04 \times 520 = 540,80 \\
u_3 &= 1,04 \times 540,80 = 562,432
\end{aligned}
\]
De manière générale : \(u_{n+1} = 1,04 \times u_n\) avec \(u_0 = 500\).

> **Propriété :** \((u_n)\) est une suite géométrique de raison \(q\) et de premier terme \(u_0\). Pour tout entier naturel \(n\), on a : \(u_n = u_0 \times q^n\).

**Démonstration au programme :**
Vidéo https://youtu.be/OpLU8Ci1GnE

La suite géométrique \((u_n)\) de raison \(q\) et de premier terme \(u_0\) vérifie la relation \(u_{n+1} = q \times u_n\).
Si \(q\) ou \(u_0\) est nul, alors tous les termes de la suite sont nuls. La démonstration est évidente dans ce cas.
Dans la suite, on suppose donc que \(q\) et \(u_0\) sont non nuls. Dans ce cas, tous les termes de la suite sont non nuls.
En calculant les premiers termes :
\[
\begin{aligned}
u_1 &= q \times u_0 \\
u_2 &= q \times u_1 \\
u_3 &= q \times u_2 \\
&\ \vdots \\
u_n &= q \times u_{n-1}
\end{aligned}
\]
En multipliant membre à membre ces \(n\) égalités, on obtient :
\[
u_1 \times u_2 \times u_3 \times \cdots \times u_n = u_0 \times u_1 \times u_2 \times \cdots \times u_{n-1} \times q^n
\]
Comme les termes de la suite sont non nuls, on peut diviser aux deux membres les facteurs identiques, on obtient :
\[
u_n = u_0 \times q^n
\]

**Méthode : Déterminer une expression en fonction de \(n\) d’une suite géométrique**
Vidéo https://youtu.be/WTmdtbQpa0c

a) Déterminer l’expression en fonction de \(n\) de la suite géométrique définie par :
\[
\begin{cases}
u_0 = 3 \\
u_{n+1} = 4u_n
\end{cases}
\]

b) Déterminer l’expression en fonction de \(n\) de la suite géométrique définie par :
\[
\begin{cases}
u_1 = 5 \\
u_{n+1} = 2u_n
\end{cases}
\]

**Correction**
a) On a : \(u_0 = 3\) et \(u_{n+1} = 4u_n\). On passe d’un terme au suivant en multipliant par 4, donc la raison \(q\) est égale à 4 et le premier terme \(u_0\) est égal à 3. Ainsi :
\[
\begin{aligned}
u_n &= u_0 \times q^n \\
u_n &= 3 \times 4^n
\end{aligned}
\]

b) On a : \(u_1 = 5\) et \(u_{n+1} = 2u_n\). On passe d’un terme au suivant en multipliant par 2 donc la raison \(q\) est égale à 2. Ici, le terme \(u_0\) n’est pas donné mais on peut le calculer. Pour passer de \(u_1\) à \(u_0\), on divise par 2 (« marche arrière ») donc :
\[
u_0 = \frac{u_1}{2} = \frac{5}{2} = 2,5.
\]
La raison \(q\) est égale à 2 et le premier terme \(u_0\) est égal à 2,5. Ainsi :
\[
\begin{aligned}
u_n &= u_0 \times q^n \\
u_n &= 2,5 \times 2^n
\end{aligned}
\]

⚠ **À noter :** Il peut être pratique d’appliquer directement la formule : \(u_n = u_1 \times q^{n-1}\)

**Méthode : Déterminer la raison et le premier terme d'une suite géométrique**
Vidéo https://youtu.be/wUfleWpRr10

Considérons la suite géométrique \((u_n)\) tel que \(u_4 = 8\) et \(u_7 = 512\).

a) Déterminer la raison et le premier terme de la suite \((u_n)\).
b) En déduire une expression de la suite en fonction de \(n\).

**Correction**
a) Les termes de la suite sont de la forme \(u_n = u_0 \times q^n\). Ainsi :
\[
\begin{cases}
u_4 = u_0 \times q^4 \\
u_7 = u_0 \times q^7
\end{cases}
\]
\[
\begin{cases}
8 = u_0 \times q^4 \\
512 = u_0 \times q^7
\end{cases}
\]
On effectue le quotient membre à membre :
\[
\frac{512}{8} = \frac{u_0 \times q^7}{u_0 \times q^4}
\]
\[
64 = q^3
\]
On utilise la fonction racine cubique de la calculatrice pour trouver le nombre qui élevé au cube donne 64. Ainsi \(q = \sqrt[3]{64} = 4\).

Comme \(u_0 \times q^4 = 8\), on a :
\[
u_0 \times 4^4 = 8
\]
\[
u_0 = \frac{8}{4^4}
\]
\[
u_0 = \frac{8}{256} = \frac{1}{32}.
\]

b) Et donc :
\[
u_n = \frac{1}{32} \times 4^n
\]

### 2) Sens de variation

> **Propriété :** \((u_n)\) est une suite géométrique de raison \(q\) et de premier terme non nul \(u_0\).
> * Pour \(u_0 > 0\) :
>   * Si \(q > 1\) alors la suite \((u_n)\) est croissante.
>   * Si \(0 < q < 1\) alors la suite \((u_n)\) est décroissante.
> * Pour \(u_0 < 0\) :
>   * Si \(q > 1\) alors la suite \((u_n)\) est décroissante.
>   * Si \(0 < q < 1\) alors la suite \((u_n)\) est croissante.

**Démonstration dans le cas où \(u_0 > 0\) :**
\(u_{n+1} - u_n = u_0 q^{n+1} - u_0 q^n = u_0 q^n (q - 1)\).
* Si \(q > 1\) alors \(u_{n+1} - u_n > 0\) et la suite \((u_n)\) est croissante.
* Si \(0 < q < 1\) alors \(u_{n+1} - u_n < 0\) et la suite \((u_n)\) est décroissante.

**Remarques :**
* Si \(q = 1\), la suite est constante.
* Si \(q \le 0\), la suite n'est pas monotone.

**Méthode : Déterminer le sens de variation d’une suite géométrique**
Vidéo https://youtu.be/vLshnJqW-64

Déterminer le sens de variation des suites géométriques \((u_n)\) et \((v_n)\) définies par :
a) \(u_n = -4 \times 2^n\)
b)
\[
\begin{cases}
v_0 = -2 \\
v_{n+1} = \frac{1}{2}v_n
\end{cases}
\]

**Correction**
a) La suite géométrique \((u_n)\) définie par \(u_n = -4 \times 2^n\) est décroissante car : \(u_0 = -4\) donc \(u_0 < 0\) et \(q = 2\) donc \(q > 1\).
b) La suite géométrique \((v_n)\) définie par \(v_{n+1} = \frac{1}{2}v_n\) et \(v_0 = -2\) est croissante car : \(v_0 = -2\) donc \(v_0 < 0\) et \(q = \frac{1}{2}\) donc \(0 < q < 1\).

## Partie 3 : Sommes de termes consécutifs

### 1) Cas des suites arithmétiques

> **Propriété :** \(n\) est un entier naturel non nul, alors on a :
> \[
> 1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}
> \]

**Remarque :** Il s'agit de la somme des \(n\) premiers termes d'une suite arithmétique de raison 1 et de premier terme 1.

**Démonstration au programme :**
Vidéo https://youtu.be/-G3FWv5Bkzk

\[
\begin{aligned}
&1 + 2 + 3 + \dots + n-1 + n \\
+ \ &n + n-1 + n-2 + \dots + 2 + 1 \\
\hline
&(n+1) + (n+1) + (n+1) + \dots + (n+1) + (n+1) = n \times (n+1)
\end{aligned}
\]
Donc : \(2 \times (1 + 2 + 3 + \cdots + n) = n(n+1)\)
Et donc : \(1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}\).

**Méthode : Calculer la somme des termes d'une suite arithmétique**
Vidéo https://youtu.be/WeDtB9ZUTHs
Vidéo https://youtu.be/iSfevWwk8e4

Calculer les sommes suivantes :
\[
S_1 = 1 + 2 + 3 + \cdots + 348
\]
\[
S_2 = 15 + 16 + 17 + \cdots + 88
\]
\[
S_3 = 33 + 36 + 39 + \cdots + 267
\]

**Correction**
* \(S_1 = 1 + 2 + 3 + \cdots + 348\) ← \(n = 348\) dans la formule
\[
= \frac{348 \times (348 + 1)}{2} = \frac{348 \times 349}{2} = 60\ 726
\]

* \(S_2 = 15 + 16 + 17 + \cdots + 88\)
\[
\begin{aligned}
&= (1 + 2 + 3 + \cdots + 88) - (1 + 2 + 3 + \cdots + 14) \\
&= \frac{88 \times 89}{2} - \frac{14 \times 15}{2} \\
&= 3916 - 105 \\
&= 3811
\end{aligned}
\]

* \(S_3 = 33 + 36 + 39 + \cdots + 267\)
\[
\begin{aligned}
&= 3 \times 11 + 3 \times 12 + 3 \times 13 + \cdots + 3 \times 89 \\
&= 3 \times (11 + 12 + 13 + \cdots + 89) \\
&= 3 \times \left[ (1 + 2 + 3 + \cdots + 89) - (1 + 2 + 3 + \cdots + 10) \right] \\
&= 3 \times \left[ \frac{89 \times 90}{2} - \frac{10 \times 11}{2} \right] \\
&= 3 \times (4005 - 55) \\
&= 11\ 850
\end{aligned}
\]

Une anecdote relate comment le mathématicien allemand Carl Friedrich Gauss (1777 ; 1855), alors âgé de 10 ans a fait preuve d’un talent remarquable pour le calcul mental. Voulant occuper ses élèves, le professeur demande d’effectuer des additions, plus exactement d’effectuer la somme des nombres de 1 à 100. Après très peu de temps, le jeune Gauss impressionne son professeur en donnant la réponse correcte. Sa technique consiste à regrouper astucieusement les termes extrêmes par deux. Sans le savoir encore, Gauss a découvert la formule permettant de calculer la somme des termes d’une série arithmétique.

### 2) Cas des suites géométriques

> **Propriété :** \(n\) est un entier naturel non nul et \(q\) un réel différent de 1 alors on a :
> \[
> 1 + q + q^2 + q^3 + \cdots + q^n = \frac{1 - q^{n+1}}{1 - q}
> \]

**Remarque :** Il s'agit de la somme des \(n+1\) premiers termes d'une suite géométrique de raison \(q\) et de premier terme 1.

**Démonstration au programme :**
Vidéo https://youtu.be/7msY7aEe084

\[
S = 1 + q + q^2 + q^3 + \cdots + q^n
\]
\[
q \times S = q + q^2 + q^3 + q^4 + \cdots + q^{n+1}
\]
Ainsi :
\[
S - q \times S = (1 + q + q^2 + q^3 + \cdots + q^n) - (q + q^2 + q^3 + q^4 + \cdots + q^{n+1})
\]
\[
S - q \times S = 1 - q^{n+1}
\]
\[
S \times (1 - q) = 1 - q^{n+1}
\]
\[
S = \frac{1 - q^{n+1}}{1 - q}
\]

**Méthode : Calculer la somme des termes d'une suite géométrique**
Vidéo https://youtu.be/eSDrE1phUXY
Vidéo https://youtu.be/gUkOjvAiZGA

Calculer les sommes suivantes :
\[
S_1 = 1 + \frac{1}{2} + \left(\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^3 + \cdots + \left(\frac{1}{2}\right)^8
\]
\[
S_2 = 3 + 3^2 + 3^3 + \cdots + 3^{15}
\]

**Correction**
* \(S_1 = 1 + \frac{1}{2} + \left(\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^3 + \cdots + \left(\frac{1}{2}\right)^8\)
\[
\begin{aligned}
&= \frac{1 - \left(\frac{1}{2}\right)^{8+1}}{1 - \frac{1}{2}} \\
&= \frac{1 - \left(\frac{1}{2}\right)^9}{\frac{1}{2}} \\
&= \left(1 - \frac{1}{256}\right) \times 2 \\
&= \left(\frac{256}{256} - \frac{1}{256}\right) \times 2 \\
&= \frac{255}{256} \times 2 \\
&= \frac{255}{128}
\end{aligned}
\]

* \(S_2 = 3 + 3^2 + 3^3 + \cdots + 3^{15}\)
\[
\begin{aligned}
&= 1 + 3 + 3^2 + 3^3 + \cdots + 3^{15} - 1 \\
&= \frac{1 - 3^{16}}{1 - 3} - 1 \\
&= 2\ 391\ 484 - 1 \\
&= 2\ 391\ 483
\end{aligned}
\]

**Méthode : Calculer la somme des termes d'une suite géométrique (problème)**
Vidéo https://youtu.be/XcszOqP9sbk

Un entrepreneur investit au départ 20 000 €. Puis, chaque mois, il investit un montant supplémentaire diminuée de 30 % par rapport au mois précédent. On note \(u_n\) le montant investi au mois \(n\). On considère alors que \(u_0 = 20\ 000\). Calculer le montant total investi la première année (12 mois).

**Correction**
Diminuer un nombre de 30 % revient à le multiplier par \(1 - 0,30 = 0,70\). La suite \((u_n)\) est donc définie, pour tout entier \(n\), par : \(u_0 = 20\ 000\) et \(u_{n+1} = 0,7 u_n\). \((u_n)\) est donc une suite géométrique de premier terme \(u_0 = 20\ 000\) et de raison \(q = 0,7\). Et on a : \(u_n = 20\ 000 \times 0,7^n\).

Le montant total investi la première année est égal à :
\[
\begin{aligned}
u_0 + u_1 + u_2 + \cdots + u_{11} &= 20\ 000 \times 0,7^0 + 20\ 000 \times 0,7^1 + 20\ 000 \times 0,7^2 + \cdots + 20\ 000 \times 0,7^{11} \\
&= 20\ 000 \times (0,7^0 + 0,7^1 + 0,7^2 + \cdots + 0,7^{11}) \\
&= 20\ 000 \times \frac{1 - 0,7^{12}}{1 - 0,7} \\
&= 20\ 000 \times \frac{1 - 0,7^{12}}{0,3} \\
&\approx 65\ 744
\end{aligned}
\]
Le montant total investi la première année est environ égal à 65 744 €.

### 3) Algorithme de somme

**Méthode : Appliquer l’algorithme de somme**
Vidéo https://youtu.be/_3bwycUCtmg

Pour tout entier \(n\), on donne :
\[
\begin{cases}
u_0 = 2 \\
u_{n+1} = 0,2 u_n + 1
\end{cases}
\]
Calculer à l’aide d’un programme la somme \(u_0 + u_1 + u_2 + \cdots + u_{10}\).

**Correction**
La suite \((u_n)\) n’est ni arithmétique, ni géométrique. Il n’est donc pas possible d’utiliser les formules vues plus haut pour calculer la somme des termes consécutifs. Pour cela, on va utiliser un programme Python. On trouve :
\[
u_0 + u_1 + u_2 + \cdots + u_{10} \approx 14,69
\]

Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur. www.maths-et-tiques.fr/index.php/mentions-legales
