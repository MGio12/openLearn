---
source_url: "https://www.maths-et-tiques.fr/telech/19SecdegP2M.pdf"
chapter: "01-second-degre"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:15:38+00:00"
cleaned_at: "2026-05-22T08:16:37+00:00"
---

## SECOND DEGRÉ – Chapitre 2/2

Tout le cours en vidéo : [https://youtu.be/tc9wvbYuZts](https://youtu.be/tc9wvbYuZts)

### Partie 1 : Résolution d'une équation du second degré

> **Définition :** Une équation du second degré est une équation de la forme \(ax^2 + bx + c = 0\) où \(a\), \(b\) et \(c\) sont des réels avec \(a \neq 0\).

**Exemple :** L'équation \(3x^2 - 6x - 2 = 0\) est une équation du second degré.

> **Définition :** On appelle discriminant du trinôme \(ax^2 + bx + c\), le nombre \(\Delta = b^2 - 4ac\).

> **Propriété :** Soit \(\Delta\) le discriminant du trinôme \(ax^2 + bx + c\).
> * Si \(\Delta < 0\) : L'équation \(ax^2 + bx + c = 0\) n'a pas de solution réelle.
> * Si \(\Delta = 0\) : L'équation \(ax^2 + bx + c = 0\) a une unique solution : \(x_0 = \frac{-b}{2a}\).
> * Si \(\Delta > 0\) : L'équation \(ax^2 + bx + c = 0\) a deux solutions distinctes : \(x_1 = \frac{-b - \sqrt{\Delta}}{2a}\) et \(x_2 = \frac{-b + \sqrt{\Delta}}{2a}\).

**Démonstration au programme :** Vidéo [https://youtu.be/7VFpZ63Tgis](https://youtu.be/7VFpZ63Tgis)

On a vu dans « Second degré Chapitre 1/2 » que la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x) = ax^2 + bx + c\) peut s'écrire sous sa forme canonique : \(f(x) = a(x - \alpha)^2 + \beta\) avec \(\alpha = -\frac{b}{2a}\) et \(\beta = \frac{-\Delta}{4a}\).

Donc : \(ax^2 + bx + c = 0\) peut s’écrire :
\[
a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a} = 0
\]
\[
a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a} = 0
\]
\[
a\left(x + \frac{b}{2a}\right)^2 = \frac{\Delta}{4a}
\]
\[
\left(x + \frac{b}{2a}\right)^2 = \frac{\Delta}{4a^2} \quad \text{car } a \text{ est non nul.}
\]

* Si \(\Delta < 0\) : Comme un carré ne peut être négatif \(\left(\frac{\Delta}{4a^2} < 0\right)\), l'équation \(ax^2 + bx + c = 0\) n'a pas de solution.
* Si \(\Delta = 0\) : L'équation \(ax^2 + bx + c = 0\) peut s'écrire : \(\left(x + \frac{b}{2a}\right)^2 = 0\). L'équation n'a qu'une seule solution : \(x_0 = -\frac{b}{2a}\).
* Si \(\Delta > 0\) : L'équation \(ax^2 + bx + c = 0\) est équivalente à :
\[
x + \frac{b}{2a} = -\sqrt{\frac{\Delta}{4a^2}} \quad \text{ou} \quad x + \frac{b}{2a} = \sqrt{\frac{\Delta}{4a^2}}
\]
\[
x + \frac{b}{2a} = -\frac{\sqrt{\Delta}}{2a} \quad \text{ou} \quad x + \frac{b}{2a} = \frac{\sqrt{\Delta}}{2a}
\]
\[
x = -\frac{\sqrt{\Delta}}{2a} - \frac{b}{2a} \quad \text{ou} \quad x = \frac{\sqrt{\Delta}}{2a} - \frac{b}{2a}
\]
\[
x = \frac{-b - \sqrt{\Delta}}{2a} \quad \text{ou} \quad x = \frac{-b + \sqrt{\Delta}}{2a}
\]
L'équation a deux solutions distinctes : \(x_1 = \frac{-b - \sqrt{\Delta}}{2a}\) et \(x_2 = \frac{-b + \sqrt{\Delta}}{2a}\).

**Méthode : Résoudre une équation du second degré**

Vidéos : [https://youtu.be/youUIZ-wsYk](https://youtu.be/youUIZ-wsYk) | [https://youtu.be/RhHheS2Wpyk](https://youtu.be/RhHheS2Wpyk) | [https://youtu.be/v6fI2RqCCiE](https://youtu.be/v6fI2RqCCiE)

Résoudre les équations suivantes :
a) \(2x^2 - x - 6 = 0\)
b) \(2x^2 - 3x + \frac{9}{8} = 0\)
c) \(x^2 + 3x + 10 = 0\)

**Correction**

a) Calculons le discriminant de l'équation \(2x^2 - x - 6 = 0\) :
\(a = 2\), \(b = -1\) et \(c = -6\) donc \(\Delta = b^2 - 4ac = (-1)^2 - 4 \times 2 \times (-6) = 49\).
Comme \(\Delta > 0\), l'équation possède deux solutions distinctes :
\[
x_1 = \frac{-b - \sqrt{\Delta}}{2a} = \frac{-(-1) - \sqrt{49}}{2 \times 2} = -\frac{3}{2}
\]
\[
x_2 = \frac{-b + \sqrt{\Delta}}{2a} = \frac{-(-1) + \sqrt{49}}{2 \times 2} = 2
\]

b) Calculons le discriminant de l'équation \(2x^2 - 3x + \frac{9}{8} = 0\) :
\(a = 2\), \(b = -3\) et \(c = \frac{9}{8}\) donc \(\Delta = b^2 - 4ac = (-3)^2 - 4 \times 2 \times \frac{9}{8} = 0\).
Comme \(\Delta = 0\), l'équation possède une unique solution :
\[
x_0 = -\frac{b}{2a} = -\frac{-3}{2 \times 2} = \frac{3}{4}
\]

c) Calculons le discriminant de l'équation \(x^2 + 3x + 10 = 0\) :
\(a = 1\), \(b = 3\) et \(c = 10\) donc \(\Delta = b^2 - 4ac = 3^2 - 4 \times 1 \times 10 = -31\).
Comme \(\Delta < 0\), l'équation ne possède pas de solution réelle.

> **Définition :** Pour une fonction polynôme \(f\) du second degré de la forme \(f(x) = ax^2 + bx + c\), les solutions de l’équation \(ax^2 + bx + c = 0\) s’appellent les racines de \(f\).

**Remarque :** Dans la pratique, une racine \(x_1\) de \(f\) vérifie \(f(x_1) = 0\). La courbe de \(f\) coupe l’axe des abscisses en \(x_1\).

> **Propriété :** La somme \(S\) et le produit \(P\) des racines d’un polynôme du second degré de la forme \(ax^2 + bx + c\) sont donnés par :
> \[
> S = -\frac{b}{a} \quad \text{et} \quad P = \frac{c}{a}.
> \]

**Méthode : Utiliser les formules de somme et produit des racines**

Vidéo à venir bientôt.

Soit \(f\) la fonction polynôme du second degré définie sur \(\mathbb{R}\) par : \(f(x) = -2x^2 + x + 1\).
1) Montrer que \(x_1 = 1\) est une racine de \(f\).
2) Déterminer la deuxième racine.

**Correction**

1) \(x_1\) est une racine si elle vérifie \(f(x_1) = 0\).
\(f(x_1) = f(1) = -2 \times 1^2 + 1 + 1 = 0\).
Donc \(x_1\) est une racine de \(f\).

2) En utilisant le produit des racines, on a :
\(P = x_1 \times x_2 = 1 \times x_2 = x_2\)
Et \(P = \frac{c}{a} = \frac{1}{-2} = -\frac{1}{2}\).
Donc \(x_2 = -\frac{1}{2}\).
Et donc \(f\) admet \(x_2 = -\frac{1}{2}\) comme deuxième racine.

### Partie 2 : Factorisation et signe d'un trinôme

#### 1) Factorisation

> **Propriété :** Soit \(f\) une fonction polynôme du second degré définie sur \(\mathbb{R}\) par : \(f(x) = ax^2 + bx + c\).
> * Si \(\Delta = 0\) : \(f(x) = a(x - x_0)^2\), avec \(x_0\) racine de \(f\).
> * Si \(\Delta > 0\) : \(f(x) = a(x - x_1)(x - x_2)\), avec \(x_1\) et \(x_2\) racines de \(f\).

**Remarque :** Si \(\Delta < 0\), il n’existe pas de forme factorisée de \(f\).

**Méthode : Déterminer les fonctions du second degré, s’annulant en deux nombres réels distincts**

Vidéo : [https://youtu.be/JiokX41_2nw](https://youtu.be/JiokX41_2nw)

On considère la fonction polynôme \(f\) du second degré s’annulant en \(-1\) et \(2\) et tel que \(f(3) = -2\). Déterminer une expression factorisée de la fonction \(f\).

**Correction**

* Comme la fonction \(f\) s’annule en \(-1\) et \(2\), on peut affirmer que \(-1\) et \(2\) sont les racines de \(f\). Et donc :
\(f(x) = a(x - (-1))(x - 2) = a(x + 1)(x - 2)\).

* De plus, \(f(3) = -2\).
Donc : \(a(3 + 1)(3 - 2) = -2\)
\(a \times 4 \times 1 = -2\)
\(a = -\frac{2}{4} = -\frac{1}{2}\).

* On en déduit que : \(f(x) = -\frac{1}{2}(x + 1)(x - 2)\).

**Méthode : Factoriser un trinôme**

Vidéo : [https://youtu.be/eKrZK1Iisc8](https://youtu.be/eKrZK1Iisc8)

Factoriser les trinômes suivants :
a) \(4x^2 + 19x - 5\)
b) \(9x^2 - 6x + 1\)

**Correction**

a) On cherche les racines du trinôme \(4x^2 + 19x - 5\) :
Calcul du discriminant : \(\Delta = 19^2 - 4 \times 4 \times (-5) = 441\).
Les racines sont :
\[
x_1 = \frac{-19 - \sqrt{441}}{2 \times 4} = -5 \quad \text{et} \quad x_2 = \frac{-19 + \sqrt{441}}{2 \times 4} = \frac{1}{4}
\]
On a donc :
\[
4x^2 + 19x - 5 = 4\left(x - (-5)\right)\left(x - \frac{1}{4}\right) = 4(x + 5)\left(x - \frac{1}{4}\right).
\]

b) On cherche les racines du trinôme \(9x^2 - 6x + 1\) :
Calcul du discriminant : \(\Delta = (-6)^2 - 4 \times 9 \times 1 = 0\).
La racine unique est :
\[
x_0 = -\frac{-6}{2 \times 9} = \frac{1}{3}
\]
On a donc :
\[
9x^2 - 6x + 1 = 9\left(x - \frac{1}{3}\right)^2.
\]

#### 2) Signe d'un trinôme

> **Propriété :** Soit \(f\) une fonction polynôme du second degré définie sur \(\mathbb{R}\) par \(f(x) = ax^2 + bx + c\).
> * Si \(\Delta < 0\) : \(f\) ne possède pas de racine. Donc \(f\) ne s’annule pas.
> * Si \(\Delta = 0\) : \(f\) possède une unique racine \(x_0\). Donc \(f\) s’annule en \(x_0\).
> * Si \(\Delta > 0\) : \(f\) possède deux racines \(x_1\) et \(x_2\). Donc \(f\) s’annule en \(x_1\) et \(x_2\).

**Tableaux de signes :**

* Cas \(a > 0\) et \(\Delta < 0\) :
\[
\begin{array}{c|ccc}
x & -\infty & & +\infty \\
\hline
f(x) & & + & \\
\end{array}
\]

* Cas \(a < 0\) et \(\Delta < 0\) :
\[
\begin{array}{c|ccc}
x & -\infty & & +\infty \\
\hline
f(x) & & - & \\
\end{array}
\]

* Cas \(a > 0\) et \(\Delta = 0\) :
\[
\begin{array}{c|ccccc}
x & -\infty & & x_0 & & +\infty \\
\hline
f(x) & & + & 0 & + & \\
\end{array}
\]

* Cas \(a < 0\) et \(\Delta = 0\) :
\[
\begin{array}{c|ccccc}
x & -\infty & & x_0 & & +\infty \\
\hline
f(x) & & - & 0 & - & \\
\end{array}
\]

* Cas \(a > 0\) et \(\Delta > 0\) :
\[
\begin{array}{c|ccccccc}
x & -\infty & & x_1 & & x_2 & & +\infty \\
\hline
f(x) & & + & 0 & - & 0 & + & \\
\end{array}
\]

* Cas \(a < 0\) et \(\Delta > 0\) :
\[
\begin{array}{c|ccccccc}
x & -\infty & & x_1 & & x_2 & & +\infty \\
\hline
f(x) & & - & 0 & + & 0 & - & \\
\end{array}
\]

**Méthode : Déterminer le signe d’un trinôme**

Vidéos : [https://youtu.be/pT4xtI2Yg2Q](https://youtu.be/pT4xtI2Yg2Q) | [https://youtu.be/sFNW9KVsTMY](https://youtu.be/sFNW9KVsTMY) | [https://youtu.be/JCVotquzIIA](https://youtu.be/JCVotquzIIA)

Démontrer que la fonction polynôme \(f\) du second degré définie sur \(\mathbb{R}\) par \(f(x) = 2x^2 + x + 4\) est positive.

**Correction**

Le discriminant de \(2x^2 + x + 4\) est \(\Delta = 1^2 - 4 \times 2 \times 4 = -31 < 0\).
La fonction \(f\) ne possède pas de racine.
La parabole représentant \(f\) se trouve donc soit au-dessus de l’axe des abscisses, soit en dessous.
Comme \(a = 2 > 0\), la parabole a les branches tournées vers le haut et donc elle se trouve au-dessus de l’axe des abscisses.
On en déduit que \(f\) est toujours positive.

**Méthode : Résoudre une inéquation du second degré**

Vidéo : [https://youtu.be/AEL4qKKNvp8](https://youtu.be/AEL4qKKNvp8)

Résoudre les inéquations :
a) \(x^2 - 2x - 15 < 0\)
b) \(x^2 + 3x - 5 < -x + 2\)

**Correction**

a) Le discriminant de \(x^2 - 2x - 15\) est \(\Delta = (-2)^2 - 4 \times 1 \times (-15) = 64\) et ses racines sont :
\[
x_1 = \frac{2 - \sqrt{64}}{2 \times 1} = -3 \quad \text{et} \quad x_2 = \frac{2 + \sqrt{64}}{2 \times 1} = 5
\]
On obtient le tableau de signes :
\[
\begin{array}{c|ccccccc}
x & -\infty & & -3 & & 5 & & +\infty \\
\hline
x^2 - 2x - 15 & & + & 0 & - & 0 & + & \\
\end{array}
\]
On lit dans le tableau de signes que \(x^2 - 2x - 15 < 0\) pour \(-3 < x < 5\).
L'ensemble des solutions de l'inéquation \(x^2 - 2x - 15 < 0\) est donc \(S = ]-3 ; 5[\).

b) On commence par rassembler tous les termes dans le membre de gauche afin de pouvoir étudier le signe d’un trinôme :
\[
x^2 + 3x - 5 < -x + 2
\]
\[
x^2 + 3x - 5 + x - 2 < 0
\]
\[
x^2 + 4x - 7 < 0.
\]
Le discriminant de \(x^2 + 4x - 7\) est \(\Delta = 4^2 - 4 \times 1 \times (-7) = 44\) et ses racines sont :
\[
x_1 = \frac{-4 - \sqrt{44}}{2 \times 1} = \frac{-4 - 2\sqrt{11}}{2} = -2 - \sqrt{11} \quad \text{et} \quad x_2 = \frac{-4 + \sqrt{44}}{2 \times 1} = -2 + \sqrt{11}
\]
On obtient le tableau de signes :
\[
\begin{array}{c|ccccccc}
x & -\infty & & -2 - \sqrt{11} & & -2 + \sqrt{11} & & +\infty \\
\hline
x^2 + 4x - 7 & & + & 0 & - & 0 & + & \\
\end{array}
\]
On lit dans le tableau de signes que \(x^2 + 4x - 7 < 0\) pour \(-2 - \sqrt{11} < x < -2 + \sqrt{11}\).
L'ensemble des solutions de l'inéquation \(x^2 + 3x - 5 < -x + 2\) est donc :
\[
S = \left]-2 - \sqrt{11} ; -2 + \sqrt{11}\right[.
\]

#### 3) Application

**Méthode : Étudier la position de deux courbes**

Vidéo : [https://youtu.be/EyxP5HIfyF4](https://youtu.be/EyxP5HIfyF4)

Soit \(f\) et \(g\) deux fonctions définies sur \(\mathbb{R}\) par :
\(f(x) = -x^2 + 8x - 11\) et \(g(x) = x - 1\).
Étudier la position relative des courbes représentatives \(C_f\) et \(C_g\).

**Correction**

On va étudier le signe de la différence \(f(x) - g(x)\) :
\[
f(x) - g(x) = -x^2 + 8x - 11 - x + 1 = -x^2 + 7x - 10.
\]
Le discriminant du trinôme \(-x^2 + 7x - 10\) est \(\Delta = 7^2 - 4 \times (-1) \times (-10) = 9\).
Le trinôme possède deux racines distinctes :
\[
x_1 = \frac{-7 - \sqrt{9}}{2 \times (-1)} = 5 \quad \text{et} \quad x_2 = \frac{-7 + \sqrt{9}}{2 \times (-1)} = 2
\]
On dresse le tableau de signes du trinôme \(-x^2 + 7x - 10\) :
\[
\begin{array}{c|ccccccc}
x & -\infty & & 2 & & 5 & & +\infty \\
\hline
-x^2 + 7x - 10 & & - & 0 & + & 0 & - & \\
\end{array}
\]
On conclut :
* \(f(x) - g(x) \leq 0\), soit \(f(x) \leq g(x)\) pour tout \(x\) de \(]-\infty ; 2] \cup [5 ; +\infty[\). La courbe \(C_f\) est donc en-dessous de la courbe \(C_g\) pour tout \(x\) de \(]-\infty ; 2] \cup [5 ; +\infty[\).
* De même, la courbe \(C_f\) est au-dessus de la courbe \(C_g\) pour tout \(x\) de \([2 ; 5]\).
