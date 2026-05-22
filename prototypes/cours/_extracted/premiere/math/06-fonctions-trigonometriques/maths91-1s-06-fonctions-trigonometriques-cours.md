---
source_url: "http://www.maths91.fr/cours1spemaths/1S-06-FONCTIONS-TRIGONOMETRIQUES-cours.pdf"
chapter: "06-fonctions-trigonometriques"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:48+00:00"
cleaned_at: "2026-05-22T08:25:12+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 06 − FONCTIONS TRIGONOMÉTRIQUES

## I Fonction sinus et fonction cosinus

### 1) Définition

Le plan est muni d’un repère orthonormé \((O; \vec{\imath}, \vec{\jmath})\). À tout réel \(t\), on associe un unique point \(M\) du cercle trigonométrique de centre \(O\) tel que \(t = (\vec{\imath}, \overrightarrow{OM})\) (mesure de l’angle orienté en radians). Le point \(M\) a pour coordonnées \((\cos t ; \sin t)\).

> **Remarque :** \(\forall t \in \mathbb{R}\), \(-1 \leqslant \cos t \leqslant 1\) et \(-1 \leqslant \sin t \leqslant 1\).

> **DÉFINITION**
> * La fonction qui à tout réel \(x\) fait correspondre l’abscisse \(\cos x\) du point \(M\) est appelée la **fonction cosinus** et est notée \(\cos\).
> * La fonction qui à tout réel \(x\) fait correspondre l’ordonnée \(\sin x\) du point \(M\) est appelée la **fonction sinus** et est notée \(\sin\).

> **REMARQUE** Ces deux fonctions sont définies sur \(\mathbb{R}\).

### 2) Parité des fonctions cosinus et sinus

Soit \(f\) une fonction définie sur \(\mathbb{R}\).

> **DÉFINITIONS**
> * On dit que \(f\) est **paire** sur \(\mathbb{R}\) si et seulement si pour tout réel \(x\), \(f(-x) = f(x)\).
> * On dit que \(f\) est **impaire** sur \(\mathbb{R}\) si et seulement si pour tout réel \(x\), \(f(-x) = -f(x)\).

> **EXEMPLES**
> * Montrer que la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x) = 3x^2 + 1\) est paire sur \(\mathbb{R}\) :
>   \(\forall x \in \mathbb{R}\), \(f(-x) = 3(-x)^2 + 1 = 3x^2 + 1 = f(x)\) donc \(f\) est paire sur \(\mathbb{R}\).
> * Montrer que la fonction \(g\) définie sur \(\mathbb{R}\) par \(g(x) = x^3\) est impaire sur \(\mathbb{R}\) :
>   \(\forall x \in \mathbb{R}\), \(g(-x) = (-x)^3 = -x^3 = -g(x)\) donc \(g\) est impaire sur \(\mathbb{R}\).
> * Étudier la parité de la fonction \(k\) définie sur \(\mathbb{R}\) par \(k(x) = 5 - 2x\) :
>   \(k(1) = 5 - 2 \times 1 = 5 - 2 = 3\) et \(k(-1) = 5 - 2 \times (-1) = 5 + 2 = 7\).
>   \(k(-1) \neq k(1)\) donc \(k\) n’est pas paire. \(k(-1) \neq -k(1)\) donc \(k\) n’est pas impaire.

> **PROPRIÉTÉ**
> * La fonction \(\cos\) est **paire** sur \(\mathbb{R}\). Autrement dit, pour tout réel \(x\), \(\cos(-x) = \cos x\).
> * La fonction \(\sin\) est **impaire** sur \(\mathbb{R}\). Autrement dit, pour tout réel \(x\), \(\sin(-x) = -\sin x\).

**Interprétation graphique :** Le plan est muni d’un repère orthonormal \((O; \vec{\imath}, \vec{\jmath})\).
* Les points \(M(x; \cos x)\) et \(M'(-x; \cos(-x))\) sont symétriques par rapport à l’axe \((O; \vec{\jmath})\). La courbe représentative de la fonction cosinus est donc symétrique par rapport à l’axe \((O; \vec{\jmath})\).
* Les points \(M(x; \sin x)\) et \(M'(-x; \sin(-x))\) sont symétriques par rapport à l’origine \(O\) du repère. La courbe représentative de la fonction sinus est donc symétrique par rapport à l’origine \(O\) du repère.

### 3) Périodicité des fonctions cosinus et sinus

Soit \(f\) une fonction définie sur \(\mathbb{R}\) et \(T\) un réel.

> **DÉFINITION**
> On dit que \(f\) est **périodique** de période \(T\) si et seulement si, pour tout réel \(x\), \(f(x + T) = f(x)\).

> **PROPRIÉTÉ**
> Les fonctions \(\cos\) et \(\sin\) sont périodiques de période \(2\pi\). Autrement dit, pour tout réel \(x\), \(\cos(x + 2\pi) = \cos(x)\) et \(\sin(x + 2\pi) = \sin(x)\).

> **EXEMPLES**
> * Montrer que la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x) = 5 + 3\cos(x)\) est périodique de période \(2\pi\) :
>   \(\forall x \in \mathbb{R}\), \(f(x + 2\pi) = 5 + 3\cos(x + 2\pi) = 5 + 3\cos(x) = f(x)\) donc \(f\) est périodique de période \(2\pi\).
> * Montrer que la fonction \(g\) définie sur \(\mathbb{R}\) par \(g(x) = \sin(2x)\) est périodique de période \(\pi\) :
>   \(\forall x \in \mathbb{R}\), \(g(x + \pi) = \sin(2(x + \pi)) = \sin(2x + 2\pi) = \sin(2x) = g(x)\) donc \(g\) est périodique de période \(\pi\).

**Conséquences graphiques :** \(M(x; \cos x)\) et \(M'(x + 2\pi; \cos(x + 2\pi))\) sont tels que \(\overrightarrow{MM'} = 2\pi \vec{\imath}\). \(N(x; \sin x)\) et \(N'(x + 2\pi; \sin(x + 2\pi))\) sont tels que \(\overrightarrow{NN'} = 2\pi \vec{\imath}\). Il suffit donc d’étudier les fonctions sinus et cosinus sur un intervalle de longueur \(2\pi\). Mais de plus, les fonctions \(\sin\) et \(\cos\) étant respectivement impaires et paires sur \(\mathbb{R}\), par symétrie, on peut restreindre leur étude sur un intervalle de longueur \(\pi\).

## II Étude de la fonction cosinus

### 1) Dérivée

> **PROPRIÉTÉ**
> La fonction cosinus est définie et dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(\cos'(x) = -\sin x\).

### 2) Sens de variation

D’après ce qui précède, il suffit d’étudier la fonction cosinus sur l’intervalle \([0 ; \pi]\) :

\[
\begin{array}{c|ccc}
x & 0 & & \pi \\
\hline
\cos'(x) = -\sin x & 0 & - & 0 \\
\hline
\cos & 1 & \searrow & -1 \\
\end{array}
\]

On en déduit alors le sens de variations de la fonction cosinus sur \([-\pi ; \pi]\) par symétrie axiale par rapport à l’axe des ordonnées :

\[
\begin{array}{c|ccccc}
x & -\pi & & 0 & & \pi \\
\hline
\cos & -1 & \nearrow & 1 & \searrow & -1 \\
\end{array}
\]

### 3) Courbe représentative

\[
\begin{array}{c|cccccccc}
x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} & \frac{2\pi}{3} & \frac{3\pi}{4} & \frac{5\pi}{6} \\
\hline
\cos x & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 & -\frac{1}{2} & -\frac{\sqrt{2}}{2} & -\frac{\sqrt{3}}{2} \\
\end{array}
\]

## III Étude de la fonction sinus

### 1) Dérivée

> **PROPRIÉTÉ**
> La fonction sinus est définie et dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(\sin'(x) = \cos x\).

### 2) Sens de variation

D’après ce qui précède, il suffit d’étudier la fonction sinus sur l’intervalle \([0 ; \pi]\) :

\[
\begin{array}{c|ccccc}
x & 0 & & \frac{\pi}{2} & & \pi \\
\hline
\sin'(x) = \cos x & + & 0 & - \\
\hline
\sin & 0 & \nearrow & 1 & \searrow & 0 \\
\end{array}
\]

On en déduit alors le sens de variations de la fonction sinus sur \([-\pi ; \pi]\) par symétrie centrale par rapport à \(O\) :

\[
\begin{array}{c|ccccc}
x & -\pi & & -\frac{\pi}{2} & & \frac{\pi}{2} & & \pi \\
\hline
\sin & 0 & \nearrow & -1 & \nearrow & 1 & \searrow & 0 \\
\end{array}
\]

### 3) Courbe représentative

\[
\begin{array}{c|cccccccc}
x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} & \frac{2\pi}{3} & \frac{3\pi}{4} & \frac{5\pi}{6} \\
\hline
\sin x & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} \\
\end{array}
\]
