---
source_url: "https://www.maths-et-tiques.fr/telech/19Derivation2TM.pdf"
chapter: "04-derivation"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:47+00:00"
cleaned_at: "2026-05-22T08:24:41+00:00"
---

## 1 sur 5
Yvan Monka – Académie de Strasbourg – www.maths-et-tiques.fr

DÉRIVATION – Chapitre 2/2

## Partie 1 : Fonction dérivée

> **Définition :** La fonction qui à tout réel \(x\) associe le nombre dérivé de \(f\) en \(x\) est appelée fonction dérivée de \(f\) et se note \(f'\).

### Formules de dérivation de fonctions usuelles :

| Fonction | Dérivée |
|----------|---------|
| \(f(x)=a,\ a\in\mathbb{R}\) | \(f'(x)=0\) |
| \(f(x)=ax,\ a\in\mathbb{R}\) | \(f'(x)=a\) |
| \(f(x)=x^2\) | \(f'(x)=2x\) |
| \(f(x)=x^3\) | \(f'(x)=3x^2\) |

### Formules d'opération sur les fonctions dérivées :

\[
(f+g)' = f' + g'
\]
\[
(kf)' = kf',\ k\in\mathbb{R}
\]

### Méthode : Calculer des fonctions dérivées

Vidéo https://youtu.be/uTk3T_GfwYo

Dans chaque cas, calculer la fonction dérivée de la fonction \(f\) :

a) \(f(x)=3x\)
b) \(f(x)=x^2+5\)
c) \(f(x)=5x^3\)
d) \(f(x)=3x^2+4x\)

**Correction**

a) \(f(x)=3x\) → \(f'(x)=3\)
b) \(f(x)=x^2+5\) → \(f'(x)=2x+0=2x\)
c) \(f(x)=5\times x^3\) → \(f'(x)=5\times 3x^2=15x^2\)
d) \(f(x)=3\times x^2+4x\) → \(f'(x)=3\times 2x+4=6x+4\)

## Partie 2 : Fonction dérivée d'une fonction polynôme

### 1) Fonction polynôme de degré 2

Soit \(f\) une fonction polynôme du second degré définie par \(f(x)=5x^2-3x+2\).

Pour déterminer la fonction dérivée \(f'\), on applique la technique suivante :

\[
\begin{aligned}
f(x) &= 5\times x^2 - 3x + 2 \\
\downarrow & \\
f'(x) &= 5\times 2x - 3 + 0 \\
&= 10x - 3
\end{aligned}
\]

> **Définition :** Soit \(f\) une fonction polynôme du second degré définie sur \(\mathbb{R}\) par \(f(x)=ax^2+bx+c\). On appelle fonction dérivée de \(f\), notée \(f'\), la fonction définie sur \(\mathbb{R}\) par \(f'(x)=a\times 2x + b\).

### Méthode : Déterminer la fonction dérivée d'une fonction polynôme du second degré

Vidéo https://youtu.be/5WDIrv_bEYE

Déterminer les fonctions dérivées des fonctions suivantes :

a) \(f(x)=4x^2-6x+1\)
b) \(g(x)=x^2-2x+6\)
c) \(h(x)=-3x^2+2x+8\)
d) \(k(x)=x^2+x+1\)
e) \(l(x)=5x^2+5\)
f) \(m(x)=-x^2+7x\)

**Correction**

a) \(f(x)=4\times x^2-6x+1\) donc \(f'(x)=4\times 2x-6+0=8x-6\)
b) \(g(x)=x^2-2x+6\) donc \(g'(x)=2x-2\)
c) \(h(x)=-3\times x^2+2x+8\) donc \(h'(x)=(-3)\times 2x+2=-6x+2\)
d) \(k(x)=x^2+1x+1\) donc \(k'(x)=2x+1\)
e) \(l(x)=5\times x^2+5\) donc \(l'(x)=5\times 2x=10x\)
f) \(m(x)=-x^2+7x\) donc \(m'(x)=-2x+7\)

### 2) Fonction polynôme de degré 3

Soit \(f\) une fonction polynôme du troisième degré définie par : \(f(x)=2x^3-3x^2+5x-1\).

Pour déterminer la fonction dérivée \(f'\), on applique la technique suivante :

\[
\begin{aligned}
f(x) &= 2\times x^3 - 3\times x^2 + 5x - 1 \\
\downarrow & \\
f'(x) &= 2\times 3x^2 - 3\times 2x + 5 - 0 \\
&= 6x^2 - 6x + 5
\end{aligned}
\]

> **Définition :** Soit \(f\) une fonction polynôme du troisième degré définie sur \(\mathbb{R}\) par \(f(x)=ax^3+bx^2+cx+d\). On appelle fonction dérivée de \(f\), notée \(f'\), la fonction définie sur \(\mathbb{R}\) par \(f'(x)=a\times 3x^2 + b\times 2x + c\).

### Méthode : Déterminer la fonction dérivée d'une fonction polynôme du troisième degré

Vidéo https://youtu.be/1fOGueiO_zk

Déterminer les fonctions dérivées des fonctions suivantes :

a) \(f(x)=x^3-3x^2+2x-5\)
b) \(g(x)=5x^3+2x^2+2x-7\)
c) \(h(x)=-2x^3-3x^2-7x+8\)
d) \(k(x)=-x^3+x^2+1\)
e) \(l(x)=4x^3+1\)
f) \(m(x)=-x^3+7x\)

**Correction**

a) \(f(x)=x^3-3\times x^2+2x-5\) donc \(f'(x)=3x^2-3\times 2x+2=3x^2-6x+2\)
b) \(g(x)=5\times x^3+2\times x^2+2x-7\) donc \(g'(x)=5\times 3x^2+2\times 2x+2=15x^2+4x+2\)
c) \(h(x)=-2\times x^3-3\times x^2-7x+8\) donc \(h'(x)=(-2)\times 3x^2-3\times 2x-7=-6x^2-6x-7\)
d) \(k(x)=-x^3+x^2+1\) donc \(k'(x)=-3x^2+2x\)
e) \(l(x)=4\times x^3+1\) donc \(l'(x)=4\times 3x^2=12x^2\)
f) \(m(x)=-x^3+7x\) donc \(m'(x)=-3x^2+7\)

## Partie 3 : Variations d'une fonction polynôme

> **Théorème :**
> Si \(f'(x) \le 0\), alors \(f\) est décroissante.
> Si \(f'(x) \ge 0\), alors \(f\) est croissante.

### Méthode : Étudier les variations d'une fonction polynôme du second degré

Vidéo https://youtu.be/EXTobPZzORo
Vidéo https://youtu.be/zxyKLqnlMIk

Soit la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x)=2x^2-8x+1\).

a) Calculer la fonction dérivée de \(f\).
b) Déterminer le signe de \(f'\) en fonction de \(x\).
c) Dresser le tableau de variations de \(f\).

**Correction**

a) \(f'(x)=2\times 2x-8=4x-8\).

b) Étude du signe de la dérivée :

On commence par résoudre l'équation \(f'(x)=0\). Soit :

\[
4x-8=0 \\
4x=8 \\
x=\frac{8}{4}=2.
\]

La fonction \(f'\) est une fonction affine représentée par une droite dont le coefficient directeur 4 est positif. Donc \(f'\) est croissante. Elle est donc d'abord négative (avant \(x=2\)) puis positive (après \(x=2\)).

c) On dresse le tableau de variations en appliquant le théorème :

\[
\begin{array}{c|ccc}
x & -\infty & & 2 & & +\infty \\
\hline
f'(x) & & - & 0 & + & \\
\hline
f(x) & & \searrow & -7 & \nearrow & \\
\end{array}
\]

\(f(2)=2\times 2^2-8\times 2+1=-7\). La fonction \(f\) admet un minimum égal à \(-7\) en \(x=2\).

### Méthode : Étudier les variations d'une fonction polynôme du troisième degré

Vidéo https://youtu.be/Ktc-PThiP6I

Soit la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x)=x^3+\frac{9}{2}x^2-12x+5\).

1) a) Calculer la fonction dérivée de \(f\).
   b) Démontrer que \(f'(x)=3(x+4)(x-1)\).
2) Déterminer le signe de \(f'\) en fonction de \(x\).
3) Dresser le tableau de variations de \(f\).
4) À l'aide de la calculatrice, représenter graphiquement la fonction \(f\).

**Correction**

1) a) On a : \(f'(x)=3x^2+\frac{9}{2}\times 2x-12=3x^2+9x-12\)

   b) Développons \(3(x+4)(x-1)\) :

   \[
   \begin{aligned}
   3(x+4)(x-1) &= (3x+12)(x-1) \\
   &= 3x^2 - 3x + 12x - 12 \\
   &= 3x^2 + 9x - 12 \\
   &= f'(x)
   \end{aligned}
   \]

   Donc \(f'(x)=3(x+4)(x-1)\).

2) On commence par résoudre l'équation \(f'(x)=0\) :

   \[
   3(x+4)(x-1)=0 \\
   x+4=0 \quad\text{ou}\quad x-1=0 \\
   x=-4 \quad\quad\quad x=1
   \]

   La dérivée s'annule en \(-4\) et \(1\). Comme \(a=3>0\), les branches de la parabole représentant la fonction dérivée sont tournées vers le haut. La dérivée est donc d'abord positive, puis négative, puis positive.

3) On en déduit le tableau de variations de \(f\) :

\[
\begin{array}{c|ccccc}
x & -\infty & & -4 & & 1 & & +\infty \\
\hline
f'(x) & & + & 0 & - & 0 & + & \\
\hline
f(x) & & \nearrow & 61 & \searrow & -\frac{3}{2} & \nearrow & \\
\end{array}
\]

En effet :

\[
f(-4)=(-4)^3+\frac{9}{2}\times(-4)^2-12\times(-4)+5=61 \\
f(1)=1^3+\frac{9}{2}\times1^2-12\times1+5=-\frac{3}{2}
\]

4) Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur. www.maths-et-tiques.fr/index.php/mentions-legales
