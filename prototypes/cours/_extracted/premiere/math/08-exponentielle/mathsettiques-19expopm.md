---
source_url: "https://www.maths-et-tiques.fr/telech/19ExpoPM.pdf"
chapter: "08-exponentielle"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:53+00:00"
cleaned_at: "2026-05-22T08:27:22+00:00"
---

## FONCTION EXPONENTIELLE

Tout le cours en vidéo : [https://youtu.be/aD03wqgxexk](https://youtu.be/aD03wqgxexk)

### Partie 1 : Introduction de la fonction exponentielle

#### 1) Définition

> **Propriété et définition :** Il existe une unique fonction \( f \) dérivable sur \( \mathbb{R} \) telle que \( f' = f \) et \( f(0) = 1 \). Cette fonction s’appelle **fonction exponentielle** et se note \( \exp \).

**Conséquence :** \( \exp(0) = 1 \)

Avec la calculatrice, il est possible d'observer l'allure de la courbe représentative de la fonction exponentielle.

**Remarque :** On verra plus bas que la fonction exponentielle est croissante. Mais sa croissance est très rapide, ainsi \( \exp(21) \) dépasse le milliard. Pour des valeurs de \( x \) de plus en plus grandes, la fonction exponentielle prend des valeurs de plus en plus grandes.

> **Propriété :** La fonction exponentielle est strictement positive sur \( \mathbb{R} \).

#### 2) Variations et courbe

Par définition de la fonction \( \exp \), on a :

> **Propriété :** La fonction exponentielle est dérivable sur \( \mathbb{R} \) et \( (\exp(x))' = \exp(x) \)

> **Propriété :** La fonction exponentielle est strictement croissante sur \( \mathbb{R} \).

**Démonstration :** \( (\exp(x))' > 0 \) car \( (\exp(x))' = \exp(x) > 0 \).

#### 3) Propriétés

> **Théorème :** \( \exp(x + y) = \exp(x) \exp(y) \)

**Remarque :** Cette formule permet de transformer une somme en produit et réciproquement. On l’appelle **relation fonctionnelle**.

**Corollaires :**
a) \( \exp(-x) = \frac{1}{\exp(x)} \) ou encore \( \exp(x) \exp(-x) = 1 \)
b) \( \exp(x - y) = \frac{\exp(x)}{\exp(y)} \)
c) \( \exp(nx) = (\exp x)^n \) avec \( n \in \mathbb{N} \)

**Démonstration du a et b :**
a) \( \exp(x) \exp(-x) = \exp(x - x) = \exp(0) = 1 \)
b) \( \exp(x - y) = \exp\left[ x + (-y) \right] = \exp(x) \exp(-y) = \exp(x) \frac{1}{\exp(y)} = \frac{\exp(x)}{\exp(y)} \)

### Partie 2 : Le nombre \( e \)

#### 1) Le nombre \( e \)

> **Notation :** L'image de 1 par la fonction exponentielle est notée \( e \). On a ainsi \( \exp(1) = e \)

**Remarque :** Avec la calculatrice, on peut obtenir une valeur approchée de \( e \).

**Notation nouvelle :** \( \exp(x) = \exp(x \times 1) = (\exp 1)^x = e^x \)

**Divertissement :**

**Notation :** On note pour tout \( x \) réel, \( \exp x = e^x \). Dans la suite, on utilisera la notation \( e^x \) pour désigner la fonction exponentielle.

Comme \( \pi \), le nombre \( e \) est un nombre irrationnel, c'est-à-dire qu'il s'écrit avec un nombre infini de décimales sans suite logique. Ses premières décimales sont :
\( e \approx 2,7182818284 5904523536 0287471352 6624977572 4709369995 9574966967 6277240766 3035354759 4571382178 5251664274… \)

Le nombre \( e \) est également un nombre transcendant. On dit qu’un nombre est transcendant s’il n’est solution d’aucune équation à coefficients entiers. Le nombre \( \sqrt{2} \) par exemple, est irrationnel mais n’est pas transcendant puisqu’il est solution de l’équation \( x^2 = 2 \). Un tel nombre est dit « algébrique ».

Le premier à s’intéresser de façon sérieuse au nombre \( e \) est le mathématicien suisse Leonhard Euler (1707 ; 1783). C’est à lui que nous devons le nom de ce nombre. Non pas qu’il s’agisse de l’initiale de son nom mais peut-être car \( e \) est la première lettre du mot exponentielle. Dans « Introductio in Analysin infinitorum » publié en 1748, Euler explique que :
\[ e = 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \ldots \]
Rappelons que par exemple \( 5! \) se lit "factorielle 5" et est égal à \( 1 \times 2 \times 3 \times 4 \times 5 \). Par cette formule, il obtient une estimation de \( e \) avec 18 décimales exactes. Nous devons aussi à Euler la démonstration de l’irrationalité de \( e \).

#### 2) Propriétés

Avec cette nouvelle notation, on peut ainsi résumer l'ensemble des propriétés de la fonction exponentielle :

> **Propriétés :**
> * \( e^0 = 1 \) et \( e^1 = e \)
> * \( e^x > 0 \)
> * \( e^{x+y} = e^x e^y \)
> * \( e^{-x} = \frac{1}{e^x} \)
> * \( e^{x-y} = \frac{e^x}{e^y} \)
> * \( (e^x)^n = e^{nx} \), avec \( n \in \mathbb{N} \).

**Méthode : Simplifier les écritures**

Vidéo : [https://youtu.be/qDFjeFyA_OY](https://youtu.be/qDFjeFyA_OY)

Simplifier l'écriture des nombres suivants :
\[ A = \frac{e^2 \times e^3}{e^4} \quad B = (e^{-2})^3 \times e^{-4} \quad C = \frac{(e^{-3})^2}{e^{-5} \times (e^2)^{-1}} \quad D = \frac{e^{-2} \times (e^{-3})^{-4}}{e^{-5}} \]

**Correction**
\[ A = \frac{e^2 \times e^3}{e^4} = \frac{e^{2+3}}{e^4} = \frac{e^5}{e^4} = e^{5-4} = e^1 = e \]
\[ B = (e^{-2})^3 \times e^{-4} = e^{-2 \times 3} \times e^{-4} = e^{-6} \times e^{-4} = e^{-6 + (-4)} = e^{-10} \]
\[ C = \frac{(e^{-3})^2}{e^{-5} \times (e^2)^{-1}} = \frac{e^{-3 \times 2}}{e^{-5} \times e^{2 \times (-1)}} = \frac{e^{-6}}{e^{-5} \times e^{-2}} = \frac{e^{-6}}{e^{-7}} = e^{-6 - (-7)} = e^{1} = e \]
\[ D = \frac{e^{-2} \times (e^{-3})^{-4}}{e^{-5}} = \frac{e^{-2} \times e^{-3 \times (-4)}}{e^{-5}} = \frac{e^{-2} \times e^{12}}{e^{-5}} = \frac{e^{10}}{e^{-5}} = e^{10 - (-5)} = e^{15} \]

#### 3) Équations et inéquations contenant des exponentielles

> **Propriétés :**
> a) \( e^a = e^b \iff a = b \)
> b) \( e^a < e^b \iff a < b \)

**Méthode : Résoudre une équation ou une inéquation contenant des exponentielles**

Vidéos : [https://youtu.be/dA73-HT-I_Y](https://youtu.be/dA73-HT-I_Y) et [https://youtu.be/d28Fb-zBe4Y](https://youtu.be/d28Fb-zBe4Y)

a) Résoudre dans \( \mathbb{R} \) l'équation \( e^{x^2 - 3} - e^{-2x} = 0 \).
b) Résoudre dans \( \mathbb{R} \) l'inéquation \( e^{4x - 1} \ge 1 \).

**Correction**
a) \( e^{x^2 - 3} - e^{-2x} = 0 \)
\( e^{x^2 - 3} = e^{-2x} \)
\( x^2 - 3 = -2x \)
\( x^2 + 2x - 3 = 0 \)
\( \Delta = 2^2 - 4 \times 1 \times (-3) = 16 \)
Donc \( x = \frac{-2 - \sqrt{16}}{2 \times 1} = -3 \) ou \( x = \frac{-2 + \sqrt{16}}{2 \times 1} = 1 \)
\( S = \{ -3 ; 1 \} \).

b) \( e^{4x - 1} \ge 1 \)
\( e^{4x - 1} \ge e^0 \)
\( 4x - 1 \ge 0 \)
\( x \ge \frac{1}{4} \)
\( S = \left[ \frac{1}{4} ; +\infty \right[ \).

### Partie 3 : Étude de la fonction exponentielle

#### 1) Dérivabilité

> **Propriété :** La fonction exponentielle est dérivable sur \( \mathbb{R} \) et \( (e^x)' = e^x \)

**Méthode : Dériver une fonction exponentielle**

Vidéo : [https://youtu.be/XcMePHk6Ilk](https://youtu.be/XcMePHk6Ilk)

Dériver les fonctions suivantes :
a) \( f(x) = 4x - 3e^x \)
b) \( g(x) = (x - 1)e^x \)
c) \( h(x) = \frac{e^x}{x} \)

**Correction**
a) \( f'(x) = 4 - 3e^x \)
b) \( g(x) = (x - 1)e^x = u(x)v(x) \)
Avec \( u(x) = x - 1 \rightarrow u'(x) = 1 \)
\( v(x) = e^x \rightarrow v'(x) = e^x \)
\( g'(x) = u'(x)v(x) + u(x)v'(x) \)
\( = 1 \times e^x + (x - 1)e^x \)
\( = e^x + xe^x - e^x \)
\( = xe^x \)
c) \( h(x) = \frac{e^x}{x} = \frac{u(x)}{v(x)} \)
Avec : \( u(x) = e^x \rightarrow u'(x) = e^x \)
\( v(x) = x \rightarrow v'(x) = 1 \)
\( h'(x) = \frac{u'(x)v(x) - u(x)v'(x)}{v(x)^2} \)
\( = \frac{e^x \times x - e^x \times 1}{x^2} \)
\( = \frac{xe^x - e^x}{x^2} \)
\( = \frac{e^x (x - 1)}{x^2} \)

#### 2) Variations et courbe de la fonction exponentielle

> **Propriété :** La fonction exponentielle est strictement croissante sur \( \mathbb{R} \).

\[
\begin{array}{c|cc}
x & -\infty & +\infty \\
\hline
(e^x)' & + & \\
\hline
& & +\infty \\
e^x & & \\
& 0 & \\
\end{array}
\]

**Méthode : Étudier une fonction exponentielle**

Vidéo : [https://youtu.be/_MA1aW8ldjo](https://youtu.be/_MA1aW8ldjo)

Soit \( f \) la fonction définie sur \( \mathbb{R} \) par \( f(x) = (x + 1)e^x \).
a) Calculer la dérivée de la fonction \( f \).
b) Dresser le tableau de variations de la fonction \( f \).
c) Déterminer une équation de la tangente à la courbe au point d’abscisse 0.
d) Tracer la courbe représentative de la fonction \( f \) en s'aidant de la calculatrice.

**Correction**
a) \( f(x) = (x + 1)e^x = u(x)v(x) \)
Avec \( u(x) = x + 1 \rightarrow u'(x) = 1 \)
\( v(x) = e^x \rightarrow v'(x) = e^x \)
\( f'(x) = u'(x)v(x) + u(x)v'(x) \)
\( = 1 \times e^x + (x + 1)e^x \)
\( = e^x + xe^x + e^x \)
\( = 2e^x + xe^x \)
\( = e^x (2 + x) \) ← Factoriser \( f'(x) \) permet d’étudier son signe à la question b.

b) Comme \( e^x > 0 \), \( f'(x) \) est du signe de \( x + 2 \).
On commence par résoudre l’équation \( x + 2 = 0 \). Soit : \( x = -2 \).
La fonction \( x \mapsto x + 2 \) est une fonction affine représentée par une droite dont le coefficient directeur 1 est positif. Donc la fonction \( x \mapsto x + 2 \) est croissante. Elle est donc d’abord négative (avant \( x = -2 \)) puis positive (après \( x = -2 \)).
On dresse le tableau de variations :
\[
\begin{array}{c|ccc}
x & -\infty & -2 & +\infty \\
\hline
f'(x) & - & 0 & + \\
\hline
& & & +\infty \\
f(x) & & & \\
& -\infty & & \\
& & -e^{-2} & \\
\end{array}
\]
\( f(-2) = (-2 + 1)e^{-2} = -e^{-2} \).

c) \( f(0) = (0 + 1)e^0 = 1 \)
\( f'(0) = (0 + 2)e^0 = 2 \)
Une équation de la tangente à la courbe en 0 est donc :
\( y = f'(0)(x - 0) + f(0) \), soit : \( y = 2x + 1 \)

d) <!-- UNSURE: The original document contains a graph here, which cannot be reproduced in text. -->

### Partie 4 : Fonctions de la forme \( t \longmapsto e^{kt} \)

#### 1) Dérivabilité

> **Propriété :** La fonction \( f \) définie par \( f(t) = e^{kt} \) est dérivable sur \( \mathbb{R} \) et \( f'(t) = k e^{kt} \).

**Démonstration :** On rappelle que la dérivée d’une fonction composée \( t \longmapsto g(at + b) \) est \( t \longmapsto a g'(at + b) \). En considérant \( g(t) = e^t \), \( a = k \) et \( b = 0 \), on a : \( (e^{kt})' = k e^{kt} \).

**Méthode : Dériver une fonction du type \( t \longmapsto e^{kt} \)**

Vidéo : [https://youtu.be/RlyFEcx5Y3E](https://youtu.be/RlyFEcx5Y3E)

Dériver les fonctions suivantes :
\( a) f(t) = 5e^{-3t} \quad b) g(t) = t e^{-t} \quad c) h(t) = \frac{4}{e^t} \)

**Correction**
\( a) f'(t) = 5 \times (-3) e^{-3t} = -15 e^{-3t} \)
b) \( g(t) = t e^{-t} = u(t)v(t) \)
Avec : \( u(t) = t \rightarrow u'(t) = 1 \)
\( v(t) = e^{-t} \rightarrow v'(t) = -e^{-t} \)
\( g'(t) = u'(t)v(t) + u(t)v'(t) \)
\( = 1 \times e^{-t} + t(-e^{-t}) \)
\( = e^{-t} - t e^{-t} \)
c) \( h(t) = \frac{4}{e^t} = 4 e^{-t} \)
\( h'(t) = 4 \times (-1) e^{-t} = -4 e^{-t} \)

#### 2) Variations et courbe

> **Propriété :**
> * Si \( k > 0 \) : la fonction \( t \longmapsto e^{kt} \) est strictement croissante.
> * Si \( k < 0 \) : la fonction \( t \longmapsto e^{kt} \) est strictement décroissante.

**Démonstration :** On a : \( (e^{kt})' = k e^{kt} \)
Or, \( e^{kt} > 0 \) pour tout réel \( t \) et tout entier relatif \( k \) non nul.
Donc le signe de la dérivée \( t \longmapsto k e^{kt} \) dépend du signe de \( k \).
Si \( k > 0 \) alors la dérivée est strictement positive et donc la fonction \( t \longmapsto e^{kt} \) est strictement croissante.
Si \( k < 0 \) alors la dérivée est strictement négative et donc la fonction \( t \longmapsto e^{kt} \) est strictement décroissante.

**Méthode : Étudier une fonction \( t \longmapsto e^{kt} \) dans une situation concrète**

Vidéo : [https://youtu.be/lsLQwiB9Nrg](https://youtu.be/lsLQwiB9Nrg)

Par suite d’une infection, le nombre de bactéries contenues dans un organisme en fonction du temps (en heures) peut être modélisé par la fonction \( f \) définie sur \( [0 ; 10] \) et telle que \( f'(t) = 0,14 f(t) \).
1) Montrer que la fonction \( f \) définie sur \( [0 ; 10] \) par \( f(t) = A e^{0,14 t} \) convient.
2) On suppose que \( f(0) = 50 000 \). Déterminer \( A \).
3) Déterminer les variations de \( f \) sur \( [0 ; 10] \).
4) a) À l'aide de la calculatrice, donner un arrondi au millier près du nombre de bactéries après 3h puis 5h30.
b) À l'aide de la calculatrice, déterminer au bout de combien de temps le nombre de bactéries a-t-il doublé. Arrondir à l’heure près.

**Correction**
1) \( f'(t) = A \times 0,14 e^{0,14 t} = 0,14 \times A e^{0,14 t} = 0,14 f(t) \).
La fonction \( f \) définie sur \( [0 ; 10] \) par \( f(t) = A e^{0,14 t} \) vérifie bien l’égalité \( f'(t) = 0,14 f(t) \) donc elle convient.
2) \( f(0) = A e^{0,14 \times 0} = A e^0 = A \).
Donc, si \( f(0) = 50 000 \), on a : \( A = 50 000 \).
Une expression de la fonction \( f \) est donc : \( f(t) = 50 000 e^{0,14 t} \).
3) Comme \( k = 0,14 > 0 \), on en déduit que la fonction \( t \longmapsto e^{0,14 t} \) est strictement croissante sur \( [0 ; 10] \). Il en est de même pour la fonction \( f \).
4) a) \( f(3) = 50 000 e^{0,14 \times 3} = 50 000 e^{0,42} \approx 76 000 \)
\( f(5,5) = 50 000 e^{0,14 \times 5,5} = 50 000 e^{0,77} \approx 108 000 \)
Après 3h, l’organisme contient environ 76 000 bactéries.
Après 5h30, l’organisme contient environ 108 000 bactéries.
b) Le nombre de bactéries a doublé à partir de 100 000 bactéries, soit au bout d'environ 5h.

### Partie 5 : Exponentielle et suite géométrique

> **Propriété :** Pour tout réel \( a \), on a : \( e^{na} = (e^a)^n \)
> La suite \( (e^{na}) \) est une suite géométrique de raison \( e^a \).

**Méthode : Déterminer une suite géométrique comprenant une exponentielle**

Vidéo : [https://youtu.be/hKh-ry9AAO0](https://youtu.be/hKh-ry9AAO0)

1) Dans chaque cas, déterminer la raison et le premier terme de la suite géométrique dont le terme général est :
a) \( u_n = e^{2n} \)
b) \( u_n = 2 e^{-n} \)
c) \( u_n = - e^{3n} \)
d) \( u_n = e^{3n - 1} \)
2) a) Déterminer une expression en fonction de \( n \) de la suite géométrique de raison \( \frac{1}{e} \) et de premier terme 3.
b) Donner les variations de cette suite.

**Correction**
On rappelle qu’une suite géométrique de raison \( q \) et de premier terme \( u_0 \) a pour terme général : \( u_n = u_0 q^n \).
1) a) \( u_n = e^{2n} = 1 (e^2)^n \)
\( (u_n) \) est une suite géométrique de raison \( e^2 \) et de premier terme 1.
b) \( u_n = 2 e^{-n} = 2 (e^{-1})^n \)
\( (u_n) \) est une suite géométrique de raison \( e^{-1} \) et de premier terme 2.
c) \( u_n = - e^{3n} = (-1) \left[ e^3 \right]^n \)
\( (u_n) \) est une suite géométrique de raison \( e^3 \) et de premier terme –1.
d) \( u_n = e^{3n - 1} = e^{3n} e^{-1} = e^{-1} (e^3)^n = \frac{1}{e} (e^3)^n \)
\( (u_n) \) est une suite géométrique de raison \( e^3 \) et de premier terme \( \frac{1}{e} \).
2) a) \( (u_n) \) est une suite géométrique de raison \( \frac{1}{e} \) et de premier terme 3, donc :
\( u_n = 3 \left( \frac{1}{e} \right)^n = 3 (e^{-1})^n = 3 e^{-n} \).
b) La raison de la suite est telle que \( 0 < \frac{1}{e} < 1 \), donc la suite est décroissante.

---
*Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur.*
*[www.maths-et-tiques.fr/index.php/mentions-legales](http://www.maths-et-tiques.fr/index.php/mentions-legales)*
