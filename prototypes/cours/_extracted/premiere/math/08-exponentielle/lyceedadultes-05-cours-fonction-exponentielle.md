---
source_url: "https://www.lyceedadultes.fr/sitepedagogique/documents/math/math1spe/05_fonction_exponentielle/05_Cours_fonction_exponentielle.pdf"
chapter: "08-exponentielle"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:02+00:00"
cleaned_at: "2026-05-22T08:30:24+00:00"
---

## La fonction exponentielle

### 1 La fonction exponentielle

#### 1.1 Définition et théorèmes

> **Théorème 1 :** Il existe une unique fonction \( f \) dérivable sur \( \mathbb{R} \) telle que :
> \[
> f' = f \quad \text{et} \quad f(0) = 1
> \]
> Cette fonction est appelée **fonction exponentielle** et on la note : \( \exp \)

**Démonstration :** L'existence de cette fonction est admise. Montrons que cette fonction ne s'annule pas sur \( \mathbb{R} \) et qu'elle est unique.

* **La fonction exponentielle ne s'annule pas sur \( \mathbb{R} \)**
  Soit la fonction \( \phi \) définie sur \( \mathbb{R} \) par : \( \phi(x) = f(x) f(-x) \).
  Comme \( f \) est dérivable sur \( \mathbb{R} \), la fonction \( \phi \) est dérivable sur \( \mathbb{R} \) par produit :
  \[
  \phi'(x) = f'(x) f(-x) - f(x) f'(-x) \overset{f'=f}{=} f(x) f(-x) - f(x) f(-x) = 0
  \]
  Comme \( \phi' = 0 \) alors la fonction \( \phi \) est constante. Donc :
  \[
  \forall x \in \mathbb{R}, \quad \phi(x) = \phi(0) = f^2(0) = 1
  \]
  On en déduit alors : \( f(x) f(-x) = 1 \), donc la fonction \( f \) ne peut s'annuler.

* **Unicité de la fonction exponentielle**
  On suppose que deux fonctions \( f \) et \( g \) vérifient les conditions :
  \[
  \begin{cases}
  f' = f \quad \text{et} \quad f(0) = 1 \\
  g' = g \quad \text{et} \quad g(0) = 1
  \end{cases}
  \]
  On pose \( h = \dfrac{f}{g} \) définie sur \( \mathbb{R} \) car \( g \) ne s'annule pas. La fonction \( h \) est dérivable sur \( \mathbb{R} \) par quotient de fonctions dérivables :
  \[
  h' = \frac{f'g - fg'}{g^2} = \frac{fg - fg}{g^2} = 0
  \]
  La fonction \( h \) est donc constante et \( h(x) = \dfrac{f(0)}{g(0)} = 1 \).
  On a donc : \( \forall x \in \mathbb{R}, \dfrac{f(x)}{g(x)} = 1 \iff f(x) = g(x) \).
  On en déduit que \( f = g \). La fonction exponentielle est unique.

#### 1.2 Approche graphique : méthode d'Euler

**Algorithme :** Déterminer un algorithme permettant de visualiser la fonction exponentielle à partir de sa définition sur l'intervalle \([-a ; a]\).

On utilise l'approximation affine en \( (x_0 + p) \) (cf. chap. 4 : fonction dérivée) :
\[
f(x_0 + p) \approx f(x_0) + p f'(x_0) \overset{f'=f}{\iff} f(x_0 + p) \approx f(x_0) + p f(x_0) \iff f(x_0 + p) \approx f(x_0)(1 + p)
\]
L'approximation sera d'autant meilleure que \( p \) sera petit.

On commence à tracer le point \( (0 ; 1) \) car \( f(0) = 1 \), puis avec un pas \( p \), on trace de proche en proche les points à droite \( (X ; Y) \) et les points à gauche \( (-X ; Z) \) du point \( (0 ; 1) \) dans l'intervalle \([-a ; a]\).

```python
import math as m
def courbe(a, p):
    x = 0
    y = 1
    z = 1
    borne = int(a / p)
    plt.plot(x, y, 'or')
    for i in range(1, borne + 1):
        x = x + p
        y = y * (1 + p)
        z = z * (1 - p)
        plt.plot(x, y, 'or')
        plt.plot(-x, z, 'or')
    plt.show()
```

**Programme 1 – python**

| Variables : | \( a, p \) : entiers |
| :--- | :--- |
| | \( X, Y, Z \) : réels |
| **Entrées et initialisation** | Lire \( a, p \) |
| | \( 0 \to X \) |
| | \( 1 \to Y \) |
| | \( 1 \to Z \) |
| | Effacer dessin |
| | Tracer le point \( (X ; Y) \) |
| **Traitement** | pour \( i \) de 1 à \( a/p \) faire |
| | \( X + p \to X \) |
| | \( Y(1 + p) \to Y \) |
| | \( Z(1 - p) \to Z \) |
| | Afficher le point \( (X ; Y) \) |
| | Afficher le point \( (-X ; Z) \) |
| | fin |

On obtient la courbe suivante pour : \( a = 2 \) et \( p = 1/10 \) avec comme fenêtre pour la calculatrice : \( X \in [-2 ; 2] \) et \( Y \in [-0,5 ; 7] \)
en python : `courbe(2, 0.1)` sur la calculatrice

#### 1.3 Relation fonctionnelle

> **Théorème 2 :** Pour tous \( a, b \in \mathbb{R} \) :
> \[
> \exp(a + b) = \exp(a) \times \exp(b)
> \]

**Remarque :** Cette relation s'appelle "relation fonctionnelle" car on pourrait définir l'exponentielle à partir de cette propriété puis montrer qu'alors la fonction exponentielle est égale à sa dérivée.

**Démonstration :** Posons la fonction \( h \) définie sur \( \mathbb{R} \) par : \( h(x) = \dfrac{\exp(x + a)}{\exp(a)} \).
\( h \) est dérivable sur \( \mathbb{R} \) par composition de fonctions dérivables :
\[
h'(x) = \frac{\exp'(x + a)}{\exp(a)} = \frac{\exp(x + a)}{\exp(a)} = h(x) \quad \text{et} \quad h(0) = \frac{\exp(0 + a)}{\exp(a)} = 1
\]
La fonction \( h \) correspond alors à la définition de la fonction exponentielle. On a alors :
\[
\frac{\exp(x + a)}{\exp(a)} = \exp(x) \iff \exp(x + a) = \exp(x) \times \exp(a)
\]
En prenant \( x = b \) on a alors :
\[
\exp(a + b) = \exp(a) \times \exp(b)
\]

#### 1.4 Autres opérations

> **Théorème 3 :** Pour tous \( a, b \in \mathbb{R} \) et pour tout \( n \in \mathbb{N} \) :
> 1) \( \exp(-a) = \dfrac{1}{\exp(a)} \)
> 2) \( \exp(a - b) = \dfrac{\exp(a)}{\exp(b)} \)
> 3) \( \exp(na) = [\exp(a)]^n \)

**Démonstration :**
1) On a vu au 1.1 que : \( f(x) f(-x) = 1 \)
2) On remplace dans la relation fonctionnelle \( b \) par \( (-b) \) puis relation 1)
3) Raisonnement de proche en proche à l'aide de la relation fonctionnelle.

#### 1.5 Notation

> **Définition 1 :** De la similitude des propriétés de la fonction exponentielle et de la fonction puissance, on pose :
> \[
> e^x = \exp(x) \quad \text{avec} \quad e = \exp(1) \approx 2,718
> \]
> On a ainsi les propriétés :
> * \( e^{a+b} = e^a \times e^b \)
> * \( e^{a-b} = \dfrac{e^a}{e^b} \)
> * \( e^{-a} = \dfrac{1}{e^a} \)
> * \( e^{na} = (e^a)^n \)

**Algorithme :** On peut avoir une approximation du nombre \( e \) à l'aide de l'approximation affine :
On trouve pour :
* \( p = 10^{-2} \), \( e \approx 2,705 \)
* \( p = 10^{-4} \), \( e \approx 2,718146 \)

| Variables : | \( p \) : entiers |
| :--- | :--- |
| | \( e \) : réel |
| **Entrées et initialisation** | Lire \( p \) |
| | \( 1 \to e \) |
| **Traitement** | pour \( i \) de 1 à \( 1/p \) faire |
| | \( e(1 + p) \to e \) |
| | fin |
| **Sorties :** | Afficher \( e \) |

### 2 Étude de la fonction exponentielle

#### 2.1 Signe

> **Théorème 4 :** La fonction exponentielle est strictement positive sur \( \mathbb{R} \)

**Démonstration :** D'après la relation fonctionnelle : \( \forall x \in \mathbb{R}, \left[ e^{\frac{x}{2}} \right]^2 = e^x \). La fonction \( \exp \) ne s'annule pas sur \( \mathbb{R} \) et un carré est positif ou nul, donc : \( \forall x \in \mathbb{R}, e^x > 0 \).

#### 2.2 Variation

> **Théorème 5 :** La fonction exponentielle est strictement croissante sur \( \mathbb{R} \).

**Démonstration :** La fonction \( \exp \) est strictement positive et étant égale à sa dérivée, sa dérivée est strictement positive.

> **Propriété 1 :** De la stricte croissance de la fonction exponentielle :
> Pour tous \( a, b \in \mathbb{R} \) :
> \[
> e^a = e^b \iff a = b \quad \text{et} \quad e^a < e^b \iff a < b
> \]

**Exemples :**

* Résoudre dans \( \mathbb{R} \) l'équation : \( e^{2x^2+3} = e^{7x} \)
  \[
  e^{2x^2+3} = e^{7x} \overset{\exp \nearrow}{\iff} 2x^2 + 3 = 7x \iff 2x^2 - 7x + 3 = 0
  \]
  \( \Delta = 49 - 24 = 25 = 5^2 > 0 \), deux solutions :
  \[
  x_1 = \frac{7 + 5}{4} = 3 \quad \text{et} \quad x_2 = \frac{7 - 5}{4} = \frac{1}{2}
  \]
  d'où \( S = \left\{ \dfrac{1}{2} ; 3 \right\} \)

* Résoudre dans \( \mathbb{R} \) l'inéquation suivante : \( e^{3x} \leqslant e^{x+6} \)
  \[
  e^{3x} \leqslant e^{x+6} \overset{\exp \nearrow}{\iff} 3x \leqslant x + 6 \iff 2x \leqslant 6 \iff x \leqslant 3
  \]
  soit \( S = ]-\infty ; 3] \)

#### 2.3 Courbe représentative

D'après les résultats obtenus, on a le tableau de variation et la courbe suivante :

\[
\begin{array}{c|ccc}
x & -\infty & & +\infty \\
\hline
\exp'(x) & & + & \\
\hline
& & +\infty & \\
\exp(x) & & \nearrow & \\
& 0 & & \\
& & 1 &
\end{array}
\]

\[
T_0 : y = e^0 x + e^0 = x + 1
\]
\[
T_1 : y = e(x - 1) + e = ex \quad \text{passe par l'origine}
\]

![Courbe de la fonction exponentielle]()

#### 2.4 Étude d'une fonction

Soit \( f \) la fonction définie sur \( \mathbb{R} \) par : \( f(x) = e^x(x - 2) \). Soit \( \mathcal{C}_f \) sa courbe représentative.

1) Déterminer la fonction dérivée \( f' \) de la fonction \( f \).
2) En déduire le tableau de variation de \( f \) sur \( \mathbb{R} \).
3) Déterminer l'équation de la tangente \( T_{-1} \) à \( \mathcal{C}_f \) au point d'abscisse \( (-1) \).
4) Tracer \( \mathcal{C}_f \), \( T_{-1} \) dans un repère orthonormé. On précisera la position du minimum. On admettra que l'axe des abscisses est asymptote à \( \mathcal{C}_f \) en \( -\infty \).

**Correction :**

1) La fonction \( f \) est dérivable sur \( \mathbb{R} \) par produit de fonctions dérivables :
   \[
   f'(x) = e^x(x - 2) + e^x \times 1 = e^x(x - 2 + 1) = e^x(x - 1)
   \]

2) Comme \( \forall x \in \mathbb{R}, e^x > 0 \), on a :
   * \( f'(x) = 0 \iff x = 1 \)
   * Le signe de \( f'(x) \) est celui de \( (x - 1) \)

   \[
   \begin{array}{c|ccc}
   x & -\infty & 1 & +\infty \\
   \hline
   f'(x) & - & 0 & + \\
   \hline
   & 0 & & +\infty \\
   f(x) & \searrow & & \nearrow \\
   & & -e &
   \end{array}
   \]

3) L'équation de la tangente en \( (-1) \) :
   \[
   T_{-1} : y = f'(-1)(x + 1) + f(-1) \iff y = -2e^{-1}(x + 1) - 3e^{-1} \iff y = -2e^{-1}x - 5e^{-1}
   \]

4) Pour tracer \( T_{-1} \), on peut prendre les points : \( (-2,5 ; 0) \)
   Pour tracer \( \mathcal{C}_f \), on prend les points \( (2 ; 0) \), \( (-1 ; -3e^{-1}) \approx (-1 ; -1,1) \), minimum \( (1 ; -e) \approx (1 ; -2,7) \)

#### 2.5 Dérivée de la fonction \( e^u \)

> **Théorème 6 :** Soit la fonction \( u \) définie et dérivable sur un ensemble \( D \), alors la fonction \( e^u \) est dérivable sur \( D \) et :
> \[
> (e^u)' = u' e^u
> \]

**Exemple :** Soient \( f \) et \( g \) définies sur \( \mathbb{R} \) par : \( f(x) = e^{2x-1} \) et \( g(x) = e^{-x^2} \)
\( f \) et \( g \) sont dérivables sur \( \mathbb{R} \) :
\[
f'(x) = 2 e^{2x-1} \quad \text{et} \quad g'(x) = -2x e^{-x^2}
\]

### 3 Croissance et décroissance exponentielle

#### 3.1 Modèle continu

> **Définition 2 :** Soit un réel \( k > 0 \), on définit les fonctions \( f_k \) et \( g_k \) sur \( \mathbb{R} \) par :
> \[
> f_k(t) = e^{kt} \quad \text{et} \quad g_k(t) = e^{-kt}
> \]
> Les fonctions \( f_k \) correspondent à une **croissance exponentielle**.
> Les fonctions \( g_k \) correspondent à une **décroissance exponentielle** ou atténuation.

Les fonctions \( f_k \) et \( g_k \) sont dérivables sur \( \mathbb{R} \) :
\[
\forall t \in \mathbb{R}, \quad f'_k(t) = k e^{kt} > 0 \quad \text{et} \quad g'_k(x) = -k e^{-kt} < 0
\]
Les fonctions \( f_k \) et \( g_k \) sont respectivement croissantes et décroissantes.

On obtient les tableaux de variation :

\[
\begin{array}{c|ccc}
t & -\infty & & +\infty \\
\hline
f'_k(t) & & + & \\
\hline
& & +\infty & \\
f_k(t) & & \nearrow & \\
& 0 & & \\
& & 1 &
\end{array}
\qquad
\begin{array}{c|ccc}
t & -\infty & & +\infty \\
\hline
g'_k(t) & & - & \\
\hline
& +\infty & & \\
g_k(t) & \searrow & & 0 \\
& & 1 &
\end{array}
\]

**Remarque :** Plus \( k \) est important plus la croissance ou l'atténuation est grande.

**Exemples :** Phénomènes fonction du temps :
* **Croissance exponentielle :** cette évolution théorique a des limites car un phénomène ne peut croître indéfiniment. Dans les faits cette croissance n'a lieu qu'au début du développement. On peut citer le développement de micro-organismes (cellules, bactérie) ou la réaction en chaîne dans une bombe atomique.
* **Atténuation :** de nombreux phénomènes physiques suivent cette décroissance.
  * Nombre de noyaux dans une désintégration radioactive : \( N(t) = N_0 e^{-\lambda t} \)
  * Intensité de décharge d'un condensateur d'un circuit RC : \( i(t) = \dfrac{E}{R} e^{-\frac{t}{RC}} \)

#### 3.2 Modèle discret

Un modèle discret est un échantillonnage d'une fonction continue dont on ne considère que des valeurs en certains instants : \( t = 0, t = 1, t = 2, \dots \)
Les modèles continus sont souvent préférés car l'arsenal des outils sur les fonctions rendent plus facile leur manipulation.

> **Définition 3 :** Un phénomène discret se modélise par une croissance ou une décroissance exponentielle s'il peut être modélisé par une suite géométrique. Cette suite se visualise par un nuage de points se situant sur la courbe d'une fonction exponentielle \( t \mapsto a e^{bt} \), \( a > 0 \) et \( b \in \mathbb{R} \).
> Le coefficient \( a \) correspond au premier terme de la suite.
> Pour déterminer le coefficient \( b \) en fonction de la raison \( q \) de la suite, il faut résoudre l'équation \( q = e^b \).
> La suite \( (e^{nb}) \) est une suite géométrique de raison \( q = e^b \) et de premier terme 1.

**Remarque :**
* Si \( b > 0 \), la suite est croissante donc \( q > 1 \).
* Si \( b < 0 \), la suite est décroissante donc \( 0 < q < 1 \).
* La suite \( (e^{nb}) \) est une suite géométrique car \( e^{nb} = (e^b)^n \).

**Exemple :** La population d'une ville, initialement de 1 000 habitants, augmente de 8 % chaque année. On note \( u_n \) la population au bout de \( n \) années.

1) a) Quelle est la nature de la suite \( (u_n) \). Donner ses éléments caractéristiques.
   b) Déterminer l'expression de \( u_n \) en fonction de \( n \).

2) On cherche à déterminer un modèle continu pour la population en fonction du temps \( t \) exprimé en années. Soit \( f \) la fonction correspondante.
   a) Déterminer l'expression de \( f \) en fonction de \( t \).
   b) Déterminer la population de la ville au bout de 6,25 années.

**Correction :**

1) a) Si la population augmente de 8 % chaque année, la population l'année \( (n+1) \) par rapport à l'année \( n \) est alors :
   \[
   u_{n+1} = u_n + \frac{8}{100} u_n = 1,08 u_n
   \]
   La suite \( (u_n) \) est donc une suite géométrique de raison \( q = 1,08 \) et de premier terme \( u_0 = 1\,000 \).

   b) On a alors : \( u_n = u_0 q^n = 1\,000 \times 1,08^n \).

2) a) La fonction associée à une suite géométrique est une fonction exponentielle de la forme \( f(t) = a e^{bt} \).
   Comme \( u_0 = 1\,000 \), on en déduit le coefficient \( a = 1\,000 \).
   Comme la raison \( q \) est supérieur à 1, la suite \( (u_n) \) est croissante et le coefficient \( b \) est positif.
   Pour déterminer \( b \), il faut résoudre l'équation \( e^b = q \iff e^b = 1,08 \).
   On peut connaître une valeur approchée de \( b \) à l'aide d'une résolution graphique sur une calculatrice. On trace la fonction exponentielle et la droite \( y = 1,08 \). On cherche l'abscisse de l'intersection de la courbe et de la droite.
   À l'aide de l'outil intersection sur la calculatrice, on trouve : \( b \approx 0,076\,961 \)
   La fonction \( f \) en prenant pour \( b \) une approximation à \( 10^{-3} \) est alors :
   \[
   f(t) = 1\,000 e^{0,077 t}
   \]

   b) On a alors : \( f(6,25) \approx 1\,618 \)
   La population au bout de 6,25 années est de 1 618 habitants.
