---
source_url: "https://www.maths-et-tiques.fr/telech/19RepM.pdf"
chapter: "10-geometrie-reperee"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:06+00:00"
cleaned_at: "2026-05-22T08:31:27+00:00"
---

## GÉOMÉTRIE REPÉRÉE

Tout le cours en vidéo : https://youtu.be/EehP4SFpo5c

Dans tout le chapitre, on se place dans un repère orthonormé \((O;\vec{\imath},\vec{\jmath})\) du plan.

### Partie 1 : Rappels

Rappels du cours de 2de en vidéo : https://youtu.be/d-rUnClmcCY

**Propriétés :**

- Un vecteur directeur d’une droite d’équation cartésienne \(ax+by+c=0\) est \(\vec{u}\begin{pmatrix} -b \\ a \end{pmatrix}\).
- \(\vec{u}\begin{pmatrix} x \\ y \end{pmatrix}\) et \(\vec{v}\begin{pmatrix} x' \\ y' \end{pmatrix}\) sont colinéaires si et seulement si \(xy' - yx' = 0\).
- Dire que deux droites sont parallèles équivaut à dire qu’elles ont des vecteurs directeurs colinéaires.
- Soit deux points \(A\begin{pmatrix} x_A \\ y_A \end{pmatrix}\) et \(B\begin{pmatrix} x_B \\ y_B \end{pmatrix}\). La distance \(AB\) (ou la norme de \(\overrightarrow{AB}\)) est :
  \[
  AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}.
  \]
  Les coordonnées du milieu du segment \([AB]\) sont :
  \[
  \left( \frac{x_A + x_B}{2} ; \frac{y_A + y_B}{2} \right).
  \]

#### Méthode : Déterminer une équation de droite à partir d'un point et d'un vecteur directeur (1)

Vidéo https://youtu.be/NosYmlLLFB4

Déterminer une équation cartésienne de la droite \(d\) passant par le point \(A(3;1)\) et de vecteur directeur \(\vec{u}\begin{pmatrix} -1 \\ 5 \end{pmatrix}\).

**Correction**

La droite \(d\) admet une équation cartésienne de la forme \(ax+by+c=0\).

- Comme \(\vec{u}\begin{pmatrix} -1 \\ 5 \end{pmatrix}\) est un vecteur directeur de \(d\), on a :
  \[
  \begin{pmatrix} -1 \\ 5 \end{pmatrix} = \begin{pmatrix} -b \\ a \end{pmatrix}
  \]
  Soit \(a=5\) et \(b=1\). Une équation de \(d\) est donc de la forme \(5x + 1y + c = 0\).

- Pour déterminer \(c\), il suffit de substituer les coordonnées \((3;1)\) de \(A\) dans l'équation :
  \[
  5 \times 3 + 1 \times 1 + c = 0
  \]
  \[
  15 + 1 + c = 0
  \]
  \[
  16 + c = 0
  \]
  \[
  c = -16
  \]
  Une équation de \(d\) est donc \(5x + y - 16 = 0\).

**Remarque**
Une autre méthode consiste à utiliser la colinéarité :
Soit un point \(M(x;y)\) de la droite \(d\). Comme le point \(A\) appartient également à \(d\), les vecteurs \(\overrightarrow{AM}\begin{pmatrix} x-3 \\ y-1 \end{pmatrix}\) et \(\vec{u}\begin{pmatrix} -1 \\ 5 \end{pmatrix}\) sont colinéaires, soit :
\[
5(x-3) - (-1)(y-1) = 0.
\]
Soit encore : \(5x + y - 16 = 0\).
Une équation cartésienne de \(d\) est : \(5x + y - 16 = 0\).

#### Méthode : Déterminer une équation de droite à partir d'un point et d'un vecteur directeur (2)

Vidéo https://youtu.be/i5WD8IZdEqk

Déterminer une équation cartésienne de la droite \(d\) passant par les points \(B(5;3)\) et \(C(1;-3)\).

**Correction**

- \(B\) et \(C\) appartiennent à \(d\) donc \(\overrightarrow{BC}\) est un vecteur directeur de \(d\). On a :
  \[
  \overrightarrow{BC}\begin{pmatrix} 1-5 \\ -3-3 \end{pmatrix} = \begin{pmatrix} -4 \\ -6 \end{pmatrix} = \begin{pmatrix} -b \\ a \end{pmatrix}.
  \]
  Donc \(a = -6\) et \(b = 4\). Une équation cartésienne de \(d\) est de la forme : \(-6x + 4y + c = 0\).

- \(B(5;3)\) appartient à \(d\) donc :
  \[
  -6 \times 5 + 4 \times 3 + c = 0 \quad \text{donc} \quad c = 18.
  \]
  Une équation cartésienne de \(d\) est : \(-6x + 4y + 18 = 0\) ou encore \(-3x + 2y + 9 = 0\).

Tracer une droite dans un repère : Vidéo https://youtu.be/EchUv2cGtzo

### Partie 2 : Vecteur normal à une droite

> **Définition** : Soit une droite \(d\). On appelle **vecteur normal** à la droite \(d\), un vecteur non nul orthogonal à un vecteur directeur de \(d\).
> \(\vec{u}\) est un vecteur directeur de \(d\)
> \(\vec{n}\) est un vecteur normal de \(d\)

> **Propriété** :
> Une droite de vecteur normal \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) admet une équation cartésienne de la forme \(ax + by + c = 0\) où \(c\) est un nombre réel à déterminer.
> Réciproquement, la droite d'équation cartésienne \(ax + by + c = 0\) admet le vecteur \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) pour vecteur normal.

**Démonstration** :
Soit un point \(A(x_A;y_A)\) de la droite. \(M(x;y)\) est un point de la droite si et seulement si \(\overrightarrow{AM}\begin{pmatrix} x - x_A \\ y - y_A \end{pmatrix}\) et \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) sont orthogonaux. Soit :
\[
\overrightarrow{AM} \cdot \vec{n} = 0
\]
Soit encore :
\[
a(x - x_A) + b(y - y_A) = 0
\]
\[
ax + by - a x_A - b y_A = 0.
\]
Si \(ax + by + c = 0\) est une équation cartésienne de la droite alors \(\vec{u}\begin{pmatrix} -b \\ a \end{pmatrix}\) est un vecteur directeur de la droite. Le vecteur \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) vérifie :
\[
\vec{u} \cdot \vec{n} = -b \times a + a \times b = 0.
\]
Donc les vecteurs \(\vec{u}\) et \(\vec{n}\) sont orthogonaux. Et donc \(\vec{n}\begin{pmatrix} a \\ b \end{pmatrix}\) est un vecteur normal de la droite.

**Exemple** :
Soit la droite d'équation cartésienne \(2x - 3y - 6 = 0\).
Un vecteur normal de la droite est \(\vec{n}\begin{pmatrix} 2 \\ -3 \end{pmatrix}\).
Un vecteur directeur de la droite est : \(\vec{u}\begin{pmatrix} 3 \\ 2 \end{pmatrix}\).
On vérifie que \(\vec{n}\) et \(\vec{u}\) sont orthogonaux :
\[
\vec{u} \cdot \vec{n} = 2 \times 3 + (-3) \times 2 = 0
\]

#### Méthode : Déterminer une équation de droite connaissant un point et un vecteur normal

Vidéo https://youtu.be/oR5QoWCiDIo

On considère la droite \(d\) passant par le point \(A(-5;4)\) et dont un vecteur normal est le vecteur \(\vec{n}\begin{pmatrix} 3 \\ -1 \end{pmatrix}\). Déterminer une équation cartésienne de la droite \(d\).

**Correction**

- Comme \(\vec{n}\begin{pmatrix} 3 \\ -1 \end{pmatrix}\) est un vecteur normal de \(d\), une équation cartésienne de \(d\) est de la forme \(3x - y + c = 0\).
- Le point \(A(-5;4)\) appartient à la droite \(d\), donc :
  \[
  3 \times (-5) - 4 + c = 0 \quad \text{et donc} \quad c = 19.
  \]
  Une équation cartésienne de \(d\) est : \(3x - y + 19 = 0\).

**Remarque**
Une autre méthode consiste à utiliser le produit scalaire :
Soit un point \(M(x;y)\) de la droite \(d\). Comme le point \(A\) appartient également à \(d\), les vecteurs \(\overrightarrow{AM}\begin{pmatrix} x+5 \\ y-4 \end{pmatrix}\) et \(\vec{n}\begin{pmatrix} 3 \\ -1 \end{pmatrix}\) sont orthogonaux, soit :
\[
3(x+5) + (-1)(y-4) = 0.
\]
Soit encore : \(3x - y + 19 = 0\).
Une équation cartésienne de \(d\) est : \(3x - y + 19 = 0\).

#### Méthode : Déterminer les coordonnées du projeté orthogonal d’un point sur une droite

Vidéo https://youtu.be/-HNUbyU72Pc

Soit la droite \(d\) d’équation \(x + 3y - 4 = 0\) et le point \(A(2;4)\). Déterminer les coordonnées du point \(H\), projeté orthogonal de \(A\) sur la droite \(d\).

**Correction**

On commence par déterminer une équation de la droite \((AH)\) :
Comme \(d\) et \((AH)\) sont perpendiculaires, un vecteur directeur de \(d\) est un vecteur normal de \((AH)\).
Une équation cartésienne de \(d\) est \(x + 3y - 4 = 0\), donc le vecteur \(\vec{u}\begin{pmatrix} -3 \\ 1 \end{pmatrix}\) est un vecteur directeur de \(d\).
Et donc \(\vec{u}\begin{pmatrix} -3 \\ 1 \end{pmatrix}\) est un vecteur normal de \((AH)\).
Une équation de \((AH)\) est de la forme : \(-3x + y + c = 0\).
Or, le point \(A(2;4)\) appartient à \((AH)\), donc ses coordonnées vérifient l’équation de la droite. On a :
\[
-3 \times 2 + 4 + c = 0 \quad \text{soit} \quad c = 2.
\]
Une équation de \((AH)\) est donc : \(-3x + y + 2 = 0\).

\(H\) est le point d’intersection de \(d\) et \((AH)\), donc ses coordonnées \((x;y)\) vérifient les équations des deux droites. Résolvons alors le système :
\[
\begin{cases}
x + 3y - 4 = 0 \\
-3x + y + 2 = 0
\end{cases}
\]
\[
\begin{cases}
x = -3y + 4 \\
-3(-3y + 4) + y + 2 = 0
\end{cases}
\]
\[
\begin{cases}
x = -3y + 4 \\
9y - 12 + y + 2 = 0
\end{cases}
\]
\[
\begin{cases}
x = -3y + 4 \\
10y - 10 = 0
\end{cases}
\]
\[
\begin{cases}
x = -3y + 4 \\
y = \frac{10}{10} = 1
\end{cases}
\]
\[
\begin{cases}
x = -3 \times 1 + 4 = 1 \\
y = 1
\end{cases}
\]

Le point \(H\), projeté orthogonal de \(A\) sur la droite \(d\), a pour coordonnées \((1;1)\).

### Partie 3 : Équations de cercle

> **Propriété** :
> Une équation du cercle de centre \(A(x_A;y_A)\) et de rayon \(r\) est :
> \[
> (x - x_A)^2 + (y - y_A)^2 = r^2
> \]

**Éléments de démonstration** :
Tout point \(M(x;y)\) appartient au cercle de centre \(A(x_A;y_A)\) et de rayon \(r\) si et seulement si \(AM^2 = r^2\).

**Exemple** :
Le cercle de centre \(A(3;-1)\) et de rayon \(5\) a pour équation :
\[
(x - 3)^2 + (y + 1)^2 = 25
\]

#### Méthode : Déterminer une équation d'un cercle

Vidéo https://youtu.be/Nr4Fcr-GhXM

On considère le cercle de centre \(A(4;-1)\) et passant par le point \(B(3;5)\). Déterminer une équation du cercle.

**Correction**

- Le cercle a pour centre le point \(A(4;-1)\) donc une équation du cercle est de la forme :
  \[
  (x - 4)^2 + (y - (-1))^2 = r^2
  \]
  \[
  (x - 4)^2 + (y + 1)^2 = r^2
  \]
- On détermine le carré du rayon du cercle à l’aide de la formule de la distance :
  \[
  r^2 = AB^2 = (3 - 4)^2 + \left(5 - (-1)\right)^2 = (-1)^2 + 6^2 = 37
  \]
- Une équation cartésienne du cercle est alors :
  \[
  (x - 4)^2 + (y + 1)^2 = 37.
  \]

#### Méthode : Déterminer les caractéristiques d'un cercle

Vidéo https://youtu.be/nNidpOAhLE8

L’équation \(x^2 + y^2 - 2x - 10y + 17 = 0\) est-elle une équation de cercle ? Si oui, déterminer son centre et son rayon.

**Correction**

\[
x^2 + y^2 - 2x - 10y + 17 = 0
\]
\[
(x^2 - 2x) + (y^2 - 10y) + 17 = 0
\]
\[
(x^2 - 2x + 1) - 1 + (y^2 - 10y + 25) - 25 + 17 = 0
\]
\[
(x - 1)^2 - 1 + (y - 5)^2 - 25 + 17 = 0
\]
\[
(x - 1)^2 + (y - 5)^2 = 9
\]
\[
(x - 1)^2 + (y - 5)^2 = 3^2
\]

Il s’agit d’une équation du cercle de centre \(A(1;5)\) et de rayon \(3\).

---

Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur.
www.maths-et-tiques.fr/index.php/mentions-legales
