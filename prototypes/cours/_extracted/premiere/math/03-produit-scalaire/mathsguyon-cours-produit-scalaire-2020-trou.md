---
source_url: "https://mathsguyon.fr/wp-content/uploads/2020/03/cours-produit-scalaire_2020_trou.pdf"
chapter: "03-produit-scalaire"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:55+00:00"
cleaned_at: "2026-05-22T08:28:12+00:00"
---

## Lycée Bellevue 1ère spé maths

## Produit scalaire

### I Rappels des fondamentaux de seconde sur les vecteurs et la géométrie repérée

Ce qu'il faut connaître :

Dans un repère quelconque :

Soient \(A(x_A; y_A)\) et \(B(x_B; y_B)\), les coordonnées du vecteur \(\overrightarrow{AB}\) vérifient :
\[
\overrightarrow{AB} \begin{pmatrix} x_B - x_A \\ y_B - y_A \end{pmatrix}
\]

Soient \(A(x_A; y_A)\) et \(B(x_B; y_B)\), les coordonnées du milieu \(I\) de \([AB]\) vérifient :
\[
I\left( \frac{x_B + x_A}{2} ; \frac{y_B + y_A}{2} \right)
\]

On appelle **déterminant** de deux vecteurs \(\vec{u}(x; y)\) et \(\vec{v}(x'; y')\) le nombre :
\[
\det(\vec{u}, \vec{v}) = \begin{vmatrix} x & x' \\ y & y' \end{vmatrix} = x y' - x' y
\]

Deux vecteurs sont colinéaires si et seulement si leur déterminant est nul :
\[
\vec{u} \text{ et } \vec{v} \text{ colinéaires } \iff \det(\vec{u}, \vec{v}) = 0
\]

Dans un repère orthonormé, la norme d'un vecteur \(\vec{u}\begin{pmatrix} x \\ y \end{pmatrix}\) et la distance entre les points \(A(x_A; y_A)\) et \(B(x_B; y_B)\) vérifient :
\[
\|\vec{u}\| = \sqrt{x^2 + y^2} \quad \text{et} \quad AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}
\]

### II Géométrie non repérée

Dans cette section, nous nous placerons dans un plan euclidien.

---

## 1 Définitions du produit scalaire

### Angle de deux vecteurs (Vidéo 1)

> **Définition :** Soit deux vecteurs, non nuls, \(\vec{u}\) et \(\vec{v}\). On note \((\widehat{\vec{u} ; \vec{v}})\), l'angle géométrique \(\widehat{BAC}\) où \(\vec{u} = \overrightarrow{AB}\) et \(\vec{v} = \overrightarrow{AC}\).

**Exemple :**
\[
\begin{tikzpicture}
\draw[->] (0,0) -- (2,0) node[below] {B};
\draw[->] (0,0) -- (1,1.5) node[above] {C};
\draw (0,0) node[below left] {A};
\draw (0.5,0) arc (0:56:0.5);
\node at (0.7,0.3) {\(\widehat{BAC}\)};
\node at (1,-0.3) {\(\vec{u}\)};
\node at (0.5,1) {\(\vec{v}\)};
\end{tikzpicture}
\]

On a l'égalité : ...

> **Définition 1 : Produit scalaire et norme**
> On appelle **produit scalaire** de deux vecteurs, non nuls, \(\vec{u}\) et \(\vec{v}\) le réel noté \(\vec{u} \cdot \vec{v}\) tel que :
> \[
> \vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos(\vec{u}, \vec{v})
> \]

**Exemple :**
\[
\begin{tikzpicture}
\draw[->] (0,0) -- (3,0) node[below] {B};
\draw[->] (0,0) -- (1,1.732) node[above] {C};
\draw (0,0) node[below left] {A};
\draw (0.5,0) arc (0:60:0.5);
\node at (0.8,0.3) {60°};
\node at (1.5,-0.3) {2};
\node at (0.5,1) {3};
\end{tikzpicture}
\]

> **Définition 2 : (Vidéo 2) Produit scalaire et projeté orthogonal**
> Soit deux vecteurs \(\vec{u}\) et \(\vec{v}\), non nuls. Soit \(\vec{u} = \overrightarrow{AB}\), \(\vec{v} = \overrightarrow{AC}\) et \(H\) le projeté orthogonal de \(C\) sur \((AB)\). On a alors :
> \[
> \overrightarrow{AB} \cdot \overrightarrow{AC} = \overrightarrow{AB} \cdot \overrightarrow{AH}
> \]

> **Définition 3 : Calcul du produit scalaire avec le projeté orthogonal**
> Soient \(\overrightarrow{AB}\) et \(\overrightarrow{AC}\) deux vecteurs du plan. Soit \(H\) le projeté orthogonal de \(C\) sur \((AB)\). Le produit scalaire des vecteurs \(\overrightarrow{AB}\) et \(\overrightarrow{AC}\) est défini par :
> * \(\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AH\) si les deux vecteurs forment un angle aigu ;
> * \(\overrightarrow{AB} \cdot \overrightarrow{AC} = - AB \times AH\) si les deux vecteurs forment un angle obtus.

**1er cas :** \(\overrightarrow{AB}\) et \(\overrightarrow{AH}\) de même sens, i.e. cas où l'angle est aigu :
\[
\begin{tikzpicture}
\draw[->] (0,0) -- (4,0) node[below] {B};
\draw[->] (0,0) -- (1,2) node[above] {C};
\draw[dashed] (1,2) -- (1,0) node[below] {H};
\draw (0,0) node[below left] {A};
\end{tikzpicture}
\]

**2e cas :** \(\overrightarrow{AB}\) et \(\overrightarrow{AH}\) de sens contraire, i.e. cas où l'angle est obtus :
\[
\begin{tikzpicture}
\draw[->] (0,0) -- (4,0) node[below] {B};
\draw[->] (0,0) -- (-1,2) node[above] {C};
\draw[dashed] (-1,2) -- (-1,0) node[below] {H};
\draw (0,0) node[below left] {A};
\end{tikzpicture}
\]

**Exemple :** Soit \(ABCD\) un rectangle tel que \(AB = 3\). Calculer \(\overrightarrow{AB} \cdot \overrightarrow{AC}\).

\[
\begin{tikzpicture}
\draw (0,0) rectangle (3,2);
\draw (0,0) node[below left] {A};
\draw (3,0) node[below right] {B};
\draw (3,2) node[above right] {C};
\draw (0,2) node[above left] {D};
\node at (1.5,-0.3) {3};
\end{tikzpicture}
\]

**Correction :**

> **Remarque :** N'essayez pas d'interpréter le produit scalaire de façon géométrique car dans un cas général, le produit scalaire n'a aucune signification géométrique particulière. Cependant, il existe un cas où le produit scalaire a une signification géométrique ; c'est ce que nous allons voir dans le paragraphe suivant.

**Applications : (Vidéo 3)** En utilisant les renseignements portés sur la figure ci-contre, qui n'est pas réalisée à l'échelle, calculer les produits scalaires suivants :

1. \((\overrightarrow{AB} + \overrightarrow{AH}) \cdot \overrightarrow{AB}\)
2. \((\overrightarrow{AH} + \overrightarrow{HC}) \cdot \overrightarrow{AB}\)

\[
\begin{tikzpicture}
\draw[->] (0,0) -- (4,0) node[below] {B};
\draw[->] (0,0) -- (1,2) node[above] {C};
\draw[dashed] (1,2) -- (1,0) node[below] {H};
\draw (0,0) node[below left] {A};
\node at (2,-0.3) {2};
\node at (0.5,1) {1};
\end{tikzpicture}
\]

**Correction :**

---

## 2 Orthogonalité de deux vecteurs

### Vecteurs orthogonaux (Vidéo 4)

> **Définition :** Deux vecteurs sont orthogonaux si leur support (les droites ayant la même direction) forment un angle droit.

**Exemple :** Les vecteurs \(\vec{u}\) et \(\vec{v}\) suivants sont orthogonaux :
\[
\begin{tikzpicture}
\draw[->] (0,0) -- (2,0) node[below] {\(\vec{u}\)};
\draw[->] (0,0) -- (0,2) node[left] {\(\vec{v}\)};
\end{tikzpicture}
\]

> **Propriété :**
> \[
> \vec{u} \text{ et } \vec{v} \text{ sont orthogonaux } \iff \vec{u} \cdot \vec{v} = 0
> \]

**Démonstration :**

* Supposons \(\vec{u}\) et \(\vec{v}\) orthogonaux.

\[
\begin{tikzpicture}
\draw[->] (0,0) -- (3,0) node[below] {B};
\draw[->] (0,0) -- (0,2) node[above] {C};
\draw (0,0) node[below left] {A};
\node at (1.5,-0.3) {\(\vec{u}\)};
\node at (-0.3,1) {\(\vec{v}\)};
\end{tikzpicture}
\]

Par définition, si on note \(H\) le projeté orthogonal de \(C\) sur \((AB)\), on a :
\[
\vec{u} \cdot \vec{v} = AB \times AH = AB \times 0 = 0
\]

Ainsi, si \(\vec{u}\) et \(\vec{v}\) sont orthogonaux alors \(\vec{u} \cdot \vec{v} = 0\).

* Supposons que \(\vec{u} \cdot \vec{v} = 0\), avec \(\vec{u} \neq \vec{0}\) et \(\vec{v} \neq \vec{0}\). Notons \(\vec{u} = \overrightarrow{AB}\) et \(\vec{v} = \overrightarrow{AC}\), puis \(H\) le projeté orthogonal de \(C\) sur \((AB)\). Alors, \(AB \times AH = 0\). Comme \(\vec{u} \neq \vec{0}\), \(AB \neq 0\), ce qui signifie donc que \(AH = 0\). Or, \(H \in (AB)\) par construction, donc \(H\) est confondu avec \(A\). \(H\) étant le projeté orthogonal de \(C\) sur \((AB)\), cela signifie que \((AC)\) est perpendiculaire à \((AB)\), c'est-à-dire que \(\vec{u}\) et \(\vec{v}\) sont orthogonaux.

Ainsi, si \(\vec{u} \cdot \vec{v} = 0\) alors \(\vec{u}\) et \(\vec{v}\) sont orthogonaux. On déduit de cela l'équivalence.

---

## 3 Propriétés algébriques du produit scalaire (Vidéo 5)

### Distributivité

Soient \(\vec{u}\), \(\vec{v}\) et \(\vec{w}\) trois vecteurs du plan. Alors,
\[
\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}
\]

**Démonstration :**

Considérons les vecteurs \(\vec{u}\), \(\vec{v}\) et \(\vec{w}\) comme sur le schéma ci-dessous. On ne considérera que le cas où les produits scalaires rencontrés sont positifs (car le cas où ils sont négatifs est similaire).

\[
\begin{tikzpicture}
\draw[->] (0,0) -- (4,0) node[below] {B};
\draw[->] (0,0) -- (1,1.5) node[above] {C};
\draw[->] (1,1.5) -- (3,2.5) node[above] {D};
\draw[dashed] (1,1.5) -- (1,0) node[below] {H};
\draw[dashed] (3,2.5) -- (3,0) node[below] {K};
\draw (0,0) node[below left] {A};
\node at (2,-0.3) {\(\vec{u}\)};
\node at (0.5,1) {\(\vec{v}\)};
\node at (2,2.5) {\(\vec{w}\)};
\end{tikzpicture}
\]

D'une part, on a :
\[
\vec{u} \cdot (\vec{v} + \vec{w}) = \overrightarrow{AB} \cdot (\overrightarrow{AC} + \overrightarrow{CD}) = \overrightarrow{AB} \cdot \overrightarrow{AD} = AB \times AK. \tag{1}
\]

D'autre part, on a :
\[
\vec{u} \cdot \vec{v} = \overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AH \quad \text{et} \quad \vec{u} \cdot \vec{w} = \overrightarrow{AB} \cdot \overrightarrow{CD} = AB \times HK
\]
donc :
\[
\vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w} = AB \times AH + AB \times HK = AB \times (AH + HK) = AB \times AK. \tag{2}
\]

Des égalités (1) et (2), on peut déduire :
\[
\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}
\]

Quels que soient les points \(A, B, C\) et \(D\) du plan :
\[
\overrightarrow{AB} \cdot \overrightarrow{CD} = \overrightarrow{AB} \cdot (\overrightarrow{CA} + \overrightarrow{AD}) = \overrightarrow{AB} \cdot \overrightarrow{CA} + \overrightarrow{AB} \cdot \overrightarrow{AD}
\]

### Symétrie (commutativité)

Pour tous vecteurs \(\vec{u}\) et \(\vec{v}\) du plan,
\[
\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}
\]

**Démonstration :**
\[
\begin{aligned}
\vec{u} \cdot \vec{v} &= \|\vec{u}\| \times \|\vec{v}\| \times \cos (\vec{u}, \vec{v}) \\
&= \|\vec{u}\| \times \|\vec{v}\| \times \cos \left[ - (\vec{v}, \vec{u}) \right] \\
&= \|\vec{u}\| \times \|\vec{v}\| \times \cos (\vec{v}, \vec{u}) \quad \text{car la fonction } x \mapsto \cos x \text{ est paire} \\
&= \|\vec{v}\| \times \|\vec{u}\| \times \cos (\vec{v}, \vec{u}) \quad \text{car pour } a \text{ et } b \text{ réels, } a \times b = b \times a \\
&= \vec{v} \cdot \vec{u}
\end{aligned}
\]

### Bilinéarité

Soit \(k \in \mathbb{R}^*\), et soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs quelconques. Alors,
\[
(k \vec{u}) \cdot \vec{v} = \vec{u} \cdot (k \vec{v}) = k (\vec{u} \cdot \vec{v})
\]

\[
\begin{tikzpicture}
\draw[->] (0,0) -- (3,0) node[below] {B};
\draw[->] (0,0) -- (1,1.5) node[above] {C};
\draw[->] (0,0) -- (2,3) node[above] {D};
\draw[dashed] (1,1.5) -- (1,0) node[below] {H};
\draw[dashed] (2,3) -- (2,0) node[below] {K};
\draw (0,0) node[below left] {A};
\node at (1.5,-0.3) {\(\vec{u}\)};
\node at (0.5,1) {\(\vec{v}\)};
\node at (1,2.5) {\(\lambda \vec{v}\)};
\end{tikzpicture}
\]

Notons \(\vec{u} = \overrightarrow{AB}\), \(\vec{v} = \overrightarrow{AC}\) et \(\lambda \vec{v} = \overrightarrow{AD}\). D'après le théorème de Thalès :
\[
AD = k AC \implies AK = k AH
\]

Donc :
\[
\vec{u} \cdot (k \vec{v}) = AB \times AK = AB \times k AH = k AB \times AH
\]
\[
k (\vec{u} \cdot \vec{v}) = k AB \times AH
\]

Donc, \(\vec{u} \cdot (k \vec{v}) = k (\vec{u} \cdot \vec{v})\). Un raisonnement analogue montrerait que : \((\lambda \vec{u}) \cdot \vec{v} = \lambda (\vec{u} \cdot \vec{v})\).

### Identités avec les normes

Pour tous \(\vec{u}\) et \(\vec{v}\) du plan :

1. \(\vec{u} \cdot \vec{u} = \vec{u}^2 = \|\vec{u}\|^2\)
2. \(\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + \|\vec{v}\|^2 + 2 \vec{u} \cdot \vec{v}\)

**Démonstration :**

1. \(\vec{u} \cdot \vec{u} = \|\vec{u}\| \times \|\vec{u}\| \times \cos (\vec{u} ; \vec{u}) = \|\vec{u}\|^2 \times \cos 0 = \|\vec{u}\|^2\)

2. \(\|\vec{u} + \vec{v}\|^2 = (\vec{u} + \vec{v})^2 = \vec{u}^2 + 2 \vec{u} \cdot \vec{v} + \vec{v}^2 = \|\vec{u}\|^2 + \|\vec{v}\|^2 + 2 \vec{u} \cdot \vec{v}\)

---

## 4 Propriétés complémentaires (Vidéo 6)

Pour tous \(\vec{u}\) et \(\vec{v}\) du plan,

\[
\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
\]
\[
\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 \right)
\]
\[
\vec{u} \cdot \vec{v} = \frac{1}{4} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
\]

**Démonstration :**

* Nous avons vu précédemment que : \((\vec{u} + \vec{v})^2 = \vec{u}^2 + 2 \vec{u} \cdot \vec{v} + \vec{v}^2\), que l'on peut aussi écrire : \(\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + 2 \vec{u} \cdot \vec{v} + \|\vec{v}\|^2\). En isolant \(\vec{u} \cdot \vec{v}\), on arrive à :
\[
\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 \right)
\]

* En exploitant l'égalité : \((\vec{u} - \vec{v})^2 = \vec{u}^2 - 2 \vec{u} \cdot \vec{v} + \vec{v}^2\), que l'on peut aussi écrire : \(\|\vec{u} - \vec{v}\|^2 = \|\vec{u}\|^2 - 2 \vec{u} \cdot \vec{v} + \|\vec{v}\|^2\), on arrive à :
\[
\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
\]

* En ajoutant les deux précédentes égalités, on a :
\[
2 \vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 + \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right) = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
\]

D'où :
\[
\vec{u} \cdot \vec{v} = \frac{1}{4} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
\]

### III Géométrie repérée

Dans cette section, on rapporte le plan euclidien à un repère orthonormé.

---

## 1 Calcul du produit scalaire avec les coordonnées (Vidéo 7)

### Égalité du produit scalaire

Dans un repère orthonormé, on considère les vecteurs \(\vec{u}\begin{pmatrix} x \\ y \end{pmatrix}\) et \(\vec{v}\begin{pmatrix} x' \\ y' \end{pmatrix}\). Alors,
\[
\vec{u} \cdot \vec{v} = x x' + y y'
\]

**Démonstration :**

D'après la propriété précédente, \(\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)\).

On sait que : \(\|\vec{u}\|^2 = x^2 + y^2\) et \(\|\vec{v}\|^2 = x'^2 + y'^2\) car on est dans un repère orthonormé.

De plus, \((\vec{u} - \vec{v}) \begin{pmatrix} x' - x \\ y' - y \end{pmatrix}\) donc :
\[
\|\vec{u} - \vec{v}\|^2 = (x' - x)^2 + (y' - y)^2 = x'^2 - 2 x x' + x^2 + y'^2 - 2 y y' + y^2
\]

Ainsi,
\[
\begin{aligned}
\vec{u} \cdot \vec{v} &= \frac{1}{2} \left( x^2 + y^2 + x'^2 + y'^2 - x'^2 + 2 x x' - x^2 - y'^2 + 2 y y' - y^2 \right) \\
&= \frac{1}{2} \left( 2 x x' + 2 y y' \right) \\
&= x x' + y y'
\end{aligned}
\]

**Application :** Soit \(\vec{u}\begin{pmatrix} 5 \\ -2 \end{pmatrix}\) et \(\vec{v}\begin{pmatrix} 1 \\ 7 \end{pmatrix}\) deux vecteurs d'un repère orthonormé. Calculer \(\vec{u} \cdot \vec{v}\).

**Correction :**

---

## 2 Application pour trouver la mesure d'un angle (Vidéo 8)

**Exemple :**

Soit \(\vec{u}\begin{pmatrix} 5 \\ -2 \end{pmatrix}\) et \(\vec{v}\begin{pmatrix} 1 \\ 7 \end{pmatrix}\) deux vecteurs d'un repère orthonormé. Déterminer une mesure approchée de l'angle \((\vec{u}, \vec{v})\).

### IV Applications du produit scalaire

---

## 1 Formule d'Al-Kashi (Vidéo 9)

### Généralisation du théorème de Pythagore

\[
\begin{tikzpicture}
\draw (0,0) -- (4,0) node[below] {B};
\draw (0,0) -- (1,2) node[above] {C};
\draw (4,0) -- (1,2);
\draw (0,0) node[below left] {A};
\node at (2,-0.3) {c};
\node at (0.5,1.2) {b};
\node at (2.5,1.2) {a};
\node at (0.3,0.3) {\(\hat{A}\)};
\end{tikzpicture}
\]

Soit \(ABC\) un triangle quelconque. En notant : \(a = BC\), \(b = AC\), \(c = AB\), \(\hat{A} = \widehat{BAC}\), on a :
\[
a^2 = b^2 + c^2 - 2bc \cos \hat{A}
\]

**Démonstration fondamentale :**

---

## 2 Ligne de niveau

> **Propriété : (Vidéo 10)**
> Pour tous points \(A\), \(B\) et \(M\) du plan,
> \[
> \overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - \frac{1}{4} AB^2
> \]
> où \(I\) est le milieu de \([AB]\).

**Démonstration :**

> **Propriété : (Vidéo 11)**
> Soient \(A\) et \(B\) deux points du plan. L'ensemble des points \(M\) du plan qui vérifient l'égalité \(\overrightarrow{MA} \cdot \overrightarrow{MB} = 0\) est le cercle de diamètre \([AB]\).

**Démonstration :**

---

## 3 Équation cartésienne de cercles (Vidéo 12)

Soit \(I(a; b)\) un point du plan rapporté au repère orthonormé. Une équation du cercle de centre \(I\) et de rayon \(r\) est :
\[
(x - a)^2 + (y - b)^2 = r^2
\]

**Démonstration :**

---

## 4 Vecteur normal d'une droite

> **Définition :**
> Dans un repère orthonormé, on considère la droite \(D\) d'équation cartésienne \(ax + by + c = 0\). On appelle **vecteur normal** à \(D\) tout vecteur orthogonal au vecteur directeur de \(D\).

> **Propriété :**
> Dans un repère orthonormé, on considère la droite \(D\) d'équation cartésienne \(ax + by + c = 0\). Alors \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) est un vecteur normal à \(D\).
