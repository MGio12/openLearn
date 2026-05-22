---
source_url: "http://www.maths91.fr/cours1spemaths/1S-03-PRODUIT_SCALAIRE-cours.pdf"
chapter: "03-produit-scalaire"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:43+00:00"
cleaned_at: "2026-05-22T08:24:06+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 03 − PRODUIT SCALAIRE

**PRODUIT SCALAIRE**

Première − Chapitre 3

**Table des matières**

I Introduction et norme d’un vecteur 2
1) Exercice de motivation.............................................. 2
2) Norme d’un vecteur................................................ 2
3) Projeté orthogonal d’un point, d’un vecteur.................................. 2
II Premières expressions du produit scalaire 3
1) Une première expression : à partir du projeté orthogonal.......................... 3
2) Une deuxième expression : pour des vecteurs colinéaires........................... 3
3) Une troisième expression : avec les normes et un angle........................... 4
III Propriétés du produit scalaire 4
1) Produit scalaire et orthogonalité......................................... 4
2) Produit scalaire et opérations.......................................... 5
IV Autres expressions du produit scalaire 6
1) Une quatrième expression : avec des normes.................................. 6
2) Une cinquième expression : avec des coordonnées............................... 6
V Applications du produit scalaire pour le calcul de longueurs et de mesures d’angles 7
1) Théorème de la médiane............................................. 7
2) Théorème d’Al-Kashi............................................... 7
VI Applications du produit scalaire en géométrie analytique 8
1) Retour sur la notion d’équation de droite................................... 8
2) Produit scalaire et équation de droite...................................... 9
3) Équation d’un cercle................................................ 11

---

## I Introduction et norme d’un vecteur

### 1) Exercice de motivation

Soit \(ABC\) un triangle tel que \(AB = 4\), \(AC = 3\) et \(\widehat{BAC} = 70^\circ\). Calculer \(BC\).

**Problème :** on ne peut pas utiliser le théorème de Pythagore car le triangle n’est pas rectangle. On verra, à la fin de ce chapitre, que le produit scalaire offre une solution à ce problème en généralisant le théorème de Pythagore à tout triangle.

### 2) Norme d’un vecteur

> **DÉFINITION**
> Soit \(\vec{u}\) un vecteur du plan, et \(A\) et \(B\) deux points du plan tels que \(\vec{u} = \overrightarrow{AB}\). La **norme** du vecteur \(\vec{u}\), notée \(\|\vec{u}\|\), est la longueur du segment \([AB]\). On a :
> \[
> \|\vec{u}\| = \|\overrightarrow{AB}\| = AB.
> \]

Dans un repère orthonormé, si \(\vec{u}\) a pour coordonnées \((x ; y)\), alors \(\|\vec{u}\| = \sqrt{x^2 + y^2}\).

> **PROPRIÉTÉS (admises)**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan.
> * Pour tout réel \(k\), on a : \(\|k\vec{u}\| = |k| \times \|\vec{u}\|\). On a notamment \(\|-\vec{u}\| = \|\vec{u}\|\).
> * \(\|\vec{u} + \vec{v}\| \le \|\vec{u}\| + \|\vec{v}\|\) (inégalité triangulaire).
> * \(\|\vec{u}\| = 0 \iff \vec{u} = \vec{0}\).

### 3) Projeté orthogonal d’un point, d’un vecteur

> **DÉFINITION**
> Soit \(M\) un point du plan et \(d\) une droite du plan. On appelle **projeté orthogonal** du point \(M\) sur la droite \(d\) le point \(M'\) de la droite \(d\) tel que les droites \((MM')\) et \(d\) soient perpendiculaires.
> En particulier, si \(M \in d\), alors son projeté orthogonal sur \(d\) est lui-même.

Cette définition du projeté orthogonal peut être étendue à un vecteur :

> **DÉFINITION**
> Soient \(A\) et \(B\) deux points du plan et \(d\) une droite de ce plan. Soient \(A'\) et \(B'\) les projetés orthogonaux respectifs des points \(A\) et \(B\) sur la droite \(d\). Alors on dit que le vecteur \(\overrightarrow{A'B'}\) est le **projeté orthogonal** du vecteur \(\overrightarrow{AB}\) sur la droite \(d\).

---

## II Premières expressions du produit scalaire

### 1) Une première expression : à partir du projeté orthogonal

> **DÉFINITION**
> Soient \(O\), \(A\) et \(B\) trois points du plan, avec \(O\) et \(A\) distincts, et \(H\) le projeté orthogonal de \(B\) sur la droite \((OA)\). On appelle **produit scalaire** de \(\overrightarrow{OA}\) par \(\overrightarrow{OB}\) le réel noté \(\overrightarrow{OA} \cdot \overrightarrow{OB}\), égal à :
> \[
> \overrightarrow{OA} \cdot \overrightarrow{OB} = \overrightarrow{OA} \cdot \overrightarrow{OH}
> \]
> * Si \(\overrightarrow{OA}\) et \(\overrightarrow{OH}\) sont de même sens, alors \(\overrightarrow{OA} \cdot \overrightarrow{OH} = OA \times OH\).
> * Si \(\overrightarrow{OA}\) et \(\overrightarrow{OH}\) sont de sens contraire, alors \(\overrightarrow{OA} \cdot \overrightarrow{OH} = -OA \times OH\).
> Si l’un des deux vecteurs est nul, on a \(\overrightarrow{OA} \cdot \overrightarrow{OB} = 0\).

> **EXEMPLE**
> Soit \(ABCD\) un carré de centre \(O\), avec \(AB = 4\).
> * \(\overrightarrow{AB} \cdot \overrightarrow{AC} = \overrightarrow{AB} \cdot \overrightarrow{AB} = AB \times AB = 4 \times 4 = 16\).
> * \(\overrightarrow{AB} \cdot \overrightarrow{BC} = \overrightarrow{AB} \cdot \overrightarrow{BB} = \overrightarrow{AB} \cdot \vec{0} = 0\).
> * \(\overrightarrow{BA} \cdot \overrightarrow{DO} = \overrightarrow{CD} \cdot \overrightarrow{DO} = \overrightarrow{CD} \cdot \frac{1}{2} \overrightarrow{DC} = -CD \times \frac{1}{2} CD = -4 \times 2 = -8\).

### 2) Une deuxième expression : pour des vecteurs colinéaires

Compte tenu de la définition, si deux vecteurs \(\vec{u}\) et \(\vec{v}\) sont colinéaires, on peut calculer directement le produit scalaire \(\vec{u} \cdot \vec{v}\) :

> **PROPRIÉTÉ**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan.
> * Si \(\vec{u}\) et \(\vec{v}\) sont colinéaires et de même sens, alors \(\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\|\).
> * Si \(\vec{u}\) et \(\vec{v}\) sont colinéaires et de sens contraire, alors \(\vec{u} \cdot \vec{v} = -\|\vec{u}\| \times \|\vec{v}\|\).

On a alors \(\vec{u} \cdot \vec{u} = \|\vec{u}\|^2\). On le note parfois \(\vec{u}^2\) mais c’est moche et ambigu...

### 3) Une troisième expression : avec les normes et un angle

> **PROPRIÉTÉ**
> Soient \(A\), \(B\) et \(C\) trois points distincts du plan. Alors on a :
> \[
> \overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AC \times \cos \widehat{BAC}
> \]

> **DÉMONSTRATION**
> On sait que \(\overrightarrow{AB} \cdot \overrightarrow{AC} = \overrightarrow{AB} \cdot \overrightarrow{AH}\), où \(H\) est le projeté orthogonal de \(C\) sur \((AB)\).
> * Si \(H \in [AB)\), alors les vecteurs \(\overrightarrow{AB}\) et \(\overrightarrow{AH}\) sont de même sens, donc \(\overrightarrow{AB} \cdot \overrightarrow{AC} = \overrightarrow{AB} \cdot \overrightarrow{AH} = AB \times AH\). Or \(\cos \widehat{BAC} = \frac{AH}{AC}\), donc \(AH = AC \times \cos \widehat{BAC}\). Donc \(\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AC \times \cos \widehat{BAC}\).
> * Si \(H \notin [AB)\), alors les vecteurs \(\overrightarrow{AB}\) et \(\overrightarrow{AH}\) sont de sens contraire, donc \(\overrightarrow{AB} \cdot \overrightarrow{AC} = \overrightarrow{AB} \cdot \overrightarrow{AH} = -AB \times AH\). Or \(\cos(\pi - \widehat{BAC}) = \frac{AH}{AC}\), donc \(AH = AC \times \cos(\pi - \widehat{BAC}) = -AC \times \cos \widehat{BAC}\). Donc \(\overrightarrow{AB} \cdot \overrightarrow{AC} = -AB \times (-AC) \times \cos \widehat{BAC} = AB \times AC \times \cos \widehat{BAC}\).

En notant \((\vec{u}, \vec{v})\) l’angle formé par les vecteurs \(\vec{u}\) et \(\vec{v}\) (on parle alors d’« angle orienté », car cet angle est muni d’un sens : de \(\vec{u}\) vers \(\vec{v}\)), on peut réécrire la propriété précédente avec des vecteurs :

> **PROPRIÉTÉ**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs non nuls du plan. Alors on a :
> \[
> \vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos(\vec{u}, \vec{v})
> \]

---

## III Propriétés du produit scalaire

### 1) Produit scalaire et orthogonalité

#### a) Vecteurs orthogonaux

> **DÉFINITION**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs non nuls du plan, et \(A\), \(B\), \(C\) et \(D\) quatre points tels que \(\vec{u} = \overrightarrow{AB}\) et \(\vec{v} = \overrightarrow{CD}\). Les vecteurs \(\vec{u}\) et \(\vec{v}\) sont dits **orthogonaux** si et seulement si les droites \((AB)\) et \((CD)\) sont perpendiculaires.
> Le vecteur nul est considéré comme orthogonal à tout vecteur du plan.

#### b) Lien avec le produit scalaire

> **THÉORÈME**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan. Les vecteurs \(\vec{u}\) et \(\vec{v}\) sont orthogonaux si et seulement si leur produit scalaire est nul :
> \[
> \vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0
> \]

> **DÉMONSTRATION**
> \(\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos(\vec{u}, \vec{v})\). D’où :
> \[
> \vec{u} \cdot \vec{v} = 0 \iff \|\vec{u}\| = 0 \text{ ou } \|\vec{v}\| = 0 \text{ ou } \cos(\vec{u}, \vec{v}) = 0.
> \]
> \[
> \vec{u} \cdot \vec{v} = 0 \iff \vec{u} = \vec{0} \text{ ou } \vec{v} = \vec{0} \text{ ou } (\vec{u}, \vec{v}) = \frac{\pi}{2} + k \times \pi, k \in \mathbb{Z}
> \]
> \[
> \vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}.
> \]

### 2) Produit scalaire et opérations

> **PROPRIÉTÉ (Symétrie du produit scalaire)**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan. Alors \(\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}\).

> **DÉMONSTRATION**
> \(\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos(\vec{u}, \vec{v})\). Or on sait que pour tout réel \(x\), \(\cos(-x) = \cos(x)\). Donc \(\cos(\vec{u}, \vec{v}) = \cos(\vec{v}, \vec{u})\). Donc \(\vec{u} \cdot \vec{v} = \|\vec{v}\| \times \|\vec{u}\| \times \cos(\vec{v}, \vec{u}) = \vec{v} \cdot \vec{u}\).

> **PROPRIÉTÉ (admise)**
> Pour tous vecteurs \(\vec{u}\), \(\vec{v}\) et \(\vec{w}\), et tout nombre réel \(k\), on a :
> 1. \(\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}\)
> 2. \((\vec{u} + \vec{v}) \cdot \vec{w} = \vec{u} \cdot \vec{w} + \vec{v} \cdot \vec{w}\)
> 3. \((k\vec{u}) \cdot \vec{v} = k(\vec{u} \cdot \vec{v}) = \vec{u} \cdot (k\vec{v})\)

> **PROPRIÉTÉ**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan.
> 1. \((\vec{u} + \vec{v})^2 = \vec{u}^2 + 2\vec{u} \cdot \vec{v} + \vec{v}^2\)
> 2. \((\vec{u} - \vec{v})^2 = \vec{u}^2 - 2\vec{u} \cdot \vec{v} + \vec{v}^2\)
> 3. \((\vec{u} + \vec{v})(\vec{u} - \vec{v}) = \vec{u}^2 - \vec{v}^2\)

> **DÉMONSTRATION**
> Les démonstrations se font rapidement à l’aide de la propriété précédente.

---

## IV Autres expressions du produit scalaire

### 1) Une quatrième expression : avec des normes

> **PROPRIÉTÉ**
> Soient \(\vec{u}\) et \(\vec{v}\) deux vecteurs du plan. Alors :
> \[
> \vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 \right)
> \]
> et
> \[
> \vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)
> \]

> **REMARQUE**
> Ces deux expressions sont appelées les **formules de polarisation**.

> **DÉMONSTRATION**
> On utilise les identités remarquables vues au-dessus :
> * \((\vec{u} + \vec{v})^2 = \vec{u}^2 + 2\vec{u} \cdot \vec{v} + \vec{v}^2\), donc \(2\vec{u} \cdot \vec{v} = (\vec{u} + \vec{v})^2 - \vec{u}^2 - \vec{v}^2\), donc \(\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 \right)\).
> * \((\vec{u} - \vec{v})^2 = \vec{u}^2 - 2\vec{u} \cdot \vec{v} + \vec{v}^2\), donc \(2\vec{u} \cdot \vec{v} = \vec{u}^2 + \vec{v}^2 - (\vec{u} - \vec{v})^2\), donc \(\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u}\|^2 + \|\vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2 \right)\).

> **EXEMPLE**
> Soit \(ABC\) un triangle tel que \(AB = 4\), \(AC = 5\) et \(BC = 6\). Calculer \(\overrightarrow{AB} \cdot \overrightarrow{AC}\).

### 2) Une cinquième expression : avec des coordonnées

> **PROPRIÉTÉ**
> Soient \(\vec{u}(x ; y)\) et \(\vec{v}(x' ; y')\) deux vecteurs du plan muni d’un repère **orthonormé** \((O ; \vec{i}, \vec{j})\), avec \(x, x', y\) et \(y'\) des réels. Alors :
> \[
> \vec{u} \cdot \vec{v} = xx' + yy'
> \]

> **DÉMONSTRATION**
> On sait que \(\vec{u} \cdot \vec{v} = \frac{1}{2} \left( \|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2 \right)\). Le repère étant orthonormé, \(\|\vec{u}\|^2 = x^2 + y^2\) et \(\|\vec{v}\|^2 = x'^2 + y'^2\). De plus, \(\vec{u} + \vec{v}\) a pour coordonnées \((x + x' ; y + y')\), donc \(\|\vec{u} + \vec{v}\|^2 = (x + x')^2 + (y + y')^2\). Ainsi,
> \[
> \vec{u} \cdot \vec{v} = \frac{1}{2} \left( (x + x')^2 + (y + y')^2 - x^2 - y^2 - x'^2 - y'^2 \right) = \ldots = xx' + yy'.
> \]

> **REMARQUES**
> * Cette expression du produit scalaire est appelée l’**expression analytique**.
> * **Attention**, l’expression analytique n’est valable **que dans un repère orthonormé** !

---

## V Applications du produit scalaire pour le calcul de longueurs et de mesures d’angles

### 1) Théorème de la médiane

> **THÉORÈME**
> Soient \(A\) et \(B\) deux points du plan et \(I\) le milieu du segment \([AB]\). Pour tout point \(M\) du plan, on a :
> \[
> MA^2 + MB^2 = 2 MI^2 + \frac{1}{2} AB^2
> \]
> \[
> MA^2 - MB^2 = 2 \overrightarrow{IM} \cdot \overrightarrow{AB}
> \]
> \[
> \overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - \frac{AB^2}{4}
> \]

> **DÉMONSTRATION**
> * \(MA^2 + MB^2 = (\overrightarrow{MI} + \overrightarrow{IA})^2 + (\overrightarrow{MI} + \overrightarrow{IB})^2 = 2 MI^2 + 2 \overrightarrow{MI} \cdot (\overrightarrow{IA} + \overrightarrow{IB}) + IA^2 + IB^2 = 2 MI^2 + \frac{1}{2} AB^2\).
> * \(MA^2 - MB^2 = (\overrightarrow{MI} + \overrightarrow{IA})^2 - (\overrightarrow{MI} + \overrightarrow{IB})^2 = 2 \overrightarrow{MI} \cdot (\overrightarrow{IA} - \overrightarrow{IB}) = 2 \overrightarrow{MI} \cdot \overrightarrow{BA}\).
> * \(\overrightarrow{MA} \cdot \overrightarrow{MB} = (\overrightarrow{MI} + \overrightarrow{IA}) \cdot (\overrightarrow{MI} + \overrightarrow{IB}) = (\overrightarrow{MI} + \overrightarrow{IA}) \cdot (\overrightarrow{MI} - \overrightarrow{IA}) = MI^2 - IA^2 = MI^2 - \frac{1}{4} AB^2\).

### 2) Théorème d’Al-Kashi

> **THÉORÈME**
> Soit \(ABC\) un triangle quelconque. Alors on a :
> \[
> AB^2 = AC^2 + BC^2 - 2 \times AC \times BC \times \cos \widehat{ACB}
> \]
> \[
> AC^2 = AB^2 + BC^2 - 2 \times AB \times BC \times \cos \widehat{ABC}
> \]
> \[
> BC^2 = AB^2 + AC^2 - 2 \times AB \times AC \times \cos \widehat{CAB}
> \]

> **DÉMONSTRATION**
> \(AB^2 = (\overrightarrow{AC} + \overrightarrow{CB})^2 = (-\overrightarrow{CA} + \overrightarrow{CB})^2 = AC^2 + BC^2 - 2 \overrightarrow{CA} \cdot \overrightarrow{CB} = AC^2 + BC^2 - 2 \times AC \times BC \times \cos \widehat{ACB}\).

> **REMARQUE**
> Si l’un des angles du triangle est droit, on retrouve le théorème de Pythagore.

> **EXERCICE**
> On peut donc enfin (ouf!) répondre au problème de motivation énoncé en début de chapitre !
> Soit \(ABC\) un triangle tel que \(AB = 4\), \(AC = 3\) et \(\widehat{BAC} = 70^\circ\). Calculer \(BC\).

---

## VI Applications du produit scalaire en géométrie analytique

> **REMARQUE**
> Dans toute cette partie, le plan est muni d’un repère orthonormé.

### 1) Retour sur la notion d’équation de droite

#### a) Équation réduite, équations cartésiennes

> **PROPRIÉTÉ & DÉFINITION**
> Soit \(a\) et \(b\) deux réels. L’ensemble des points \(M(x ; y)\) tels que \(y = ax + b\) est une droite. L’égalité \(y = ax + b\) est appelée **l’équation réduite** de la droite. Elle est unique. \(a\) est appelé **le coefficient directeur** de la droite, et \(b\) son **ordonnée à l’origine**.

> **REMARQUES**
> * Une équation de droite est donc une égalité vérifiée par les coordonnées de tous les points appartenant à cette droite : si \(d\) est une droite d’équation \(y = ax + b\), alors \(A(x_A ; y_A) \in d \iff y_A = a x_A + b\).
> * Si \(b = 0\), alors la droite d’équation \(y = ax\) passe par l’origine du repère.
> * Si \(a = 0\), alors la droite d’équation \(y = b\) est parallèle à l’axe des abscisses.
> * Une droite parallèle à l’axe des ordonnées a pour équation \(x = c\), où \(c\) est un réel.
> * \(y = ax + b \iff ax - y + b = 0\). Une telle équation est appelée **équation cartésienne**. Elle n’est pas unique. Par exemple, \(2x + y + 5 = 0\) et \(4x + 2y + 10 = 0\) sont deux équations cartésiennes d’une même droite.

#### b) Déterminer une équation de droite avec le coefficient directeur

> **PROPRIÉTÉ (admise)**
> Soient \(A\) et \(B\) deux points d’abscisses distinctes dans le plan. Alors le coefficient directeur de la droite \((AB)\) est \(a = \frac{y_B - y_A}{x_B - x_A}\).

> **REMARQUE**
> Cas particulier : si \(x_A = x_B\), la droite \((AB)\) est parallèle à l’axe des ordonnées, et n’a pas de coefficient directeur.

> **EXERCICE**
> On considère les points \(A(3 ; 2)\), \(B(-1 ; 4)\) et \(C(3 ; 4)\). Déterminer l’équation réduite de chacune des droites suivantes : \((AB)\), \((AC)\) et \((BC)\).

#### c) Déterminer une équation de droite avec un vecteur directeur

> **DÉFINITION**
> On appelle **vecteur directeur** d’une droite \(d\) tout vecteur non nul dont la direction est celle de la droite \(d\).

> **REMARQUES**
> * Une droite a une infinité de vecteurs directeurs, tous colinéaires deux à deux.
> * Si \(A\) et \(B\) sont deux points distincts de la droite \(d\), alors le vecteur \(\overrightarrow{AB}\) est un vecteur directeur de la droite \(d\).
> * Soit \(d\) une droite passant par un point \(A\) et de vecteur directeur \(\vec{u}\). Alors pour tout point \(M\) de \(d\), les vecteurs \(\overrightarrow{AM}\) et \(\vec{u}\) sont colinéaires. (Faire une figure)

> **PROPRIÉTÉ (admise)**
> Soient \(a\), \(b\) et \(c\) trois réels. L’ensemble des points \(M(x ; y)\) tels que \(ax + by + c = 0\) est une droite de vecteur directeur \(\vec{u}(-b ; a)\).

> **EXEMPLE**
> Déterminer une équation cartésienne de la droite \(d\) passant par le point \(A(4 ; 5)\) et de vecteur directeur \(\vec{u}(-1 ; 3)\) :
> \[
> M(x ; y) \in d \iff \overrightarrow{AM} \begin{pmatrix} x-4 \\ y-5 \end{pmatrix} \text{ et } \vec{u} \begin{pmatrix} -1 \\ 3 \end{pmatrix} \text{ sont colinéaires.}
> \]
> \[
> \iff \begin{vmatrix} x-4 & -1 \\ y-5 & 3 \end{vmatrix} = 0
> \]
> \[
> \iff 3(x-4) - (-1)(y-5) = 0
> \]
> \[
> \iff 3x - 12 + y - 5 = 0
> \]
> \[
> \iff 3x + y - 17 = 0
> \]

> **EXERCICE**
> 1. Déterminer une équation cartésienne de la droite \(\Delta\) passant par le point \(A(-2 ; 3)\) et de vecteur directeur \(\vec{u}(1 ; 4)\).
> 2. Soit \(d\) la droite d’équation cartésienne \(-3x + 2y + 5 = 0\).
>    (a) Le point \(B(1 ; -1)\) appartient-il à la droite \(d\) ?
>    (b) Donner les coordonnées d’un vecteur directeur de la droite \(d\).
>    (c) Donner une autre équation de la droite \(d\), et son équation réduite.
>    (d) La droite \(d' : 6x - 4y + 1 = 0\) est-elle parallèle à la droite \(d\) ?

### 2) Produit scalaire et équation de droite

#### a) Définition d’un vecteur normal à une droite

> **DÉFINITION**
> Soit \(d\) une droite de vecteur directeur \(\vec{u}\). Un **vecteur normal** à la droite \(d\) est un vecteur non nul orthogonal au vecteur \(\vec{u}\).

> **PROPRIÉTÉ (admise)**
> Soit \(d\) une droite passant par un point \(A\) du plan et de vecteur normal \(\vec{n}\). Alors la droite \(d\) est l’ensemble des points \(M\) tels que \(\overrightarrow{AM} \cdot \vec{n} = 0\).

#### b) Équation d’une droite de vecteur normal

> **THÉORÈME**
> Soit \(a\) et \(b\) deux nombres réels non nuls tous les deux (c’est-à-dire tels que \((a, b) \neq (0, 0)\)). La droite \(d\) admet le vecteur \(\vec{n}(a ; b)\) pour vecteur normal si et seulement si elle admet une équation cartésienne de la forme \(ax + by + c = 0\) avec \(c\) un réel.

> **DÉMONSTRATION**
> Soit \(A(x_A ; y_A)\) un point de \(d\) et \(\vec{n}\) un vecteur normal de \(d\) de coordonnées \((a ; b)\). Alors
> \[
> M(x ; y) \in d \iff \overrightarrow{AM} \cdot \vec{n} = 0 \iff (x - x_A) \times a + (y - y_A) \times b = 0 \iff ax + by + c = 0
> \]
> avec \(c = -a x_A + b y_A\).

> **EXERCICE**
> Le plan est muni d’un repère orthonormé. Soit \(d\) la droite passant par le point \(S(5 ; 8)\) et de vecteur normal \(\vec{n} \begin{pmatrix} -1 \\ 2 \end{pmatrix}\).
> 1. Déterminer une équation cartésienne de \(d\).
> 2. (a) Démontrer que le point \(R(-11 ; 0)\) appartient à la droite \(d\).
>    (b) Que peut-on alors dire du vecteur \(\overrightarrow{RS}\) pour la droite \(d\) ?
>    (c) En déduire, sans calcul, la valeur de \(\overrightarrow{RS} \cdot \vec{n}\).
> 3. Le point \(T(-9 ; 2)\) appartient-il à la droite \(d\) ?
> 4. Déterminer une équation cartésienne de la droite \(d'\), droite parallèle à \(d\) et passant par \(T\), de deux façons différentes.
> 5. Déterminer une équation cartésienne de la droite \(d''\), droite perpendiculaire à \(d\) et passant par \(R\), avec la méthode de votre choix.
> 6. Soit \(d_2\) la droite d’équation \(-x + 2y + 3 = 0\). Démontrer que \(d_2\) et \(d\) sont parallèles.
> 7. Soit \(d_3\) la droite d’équation \(6x + 3y - 1 = 0\). Démontrer que \(d_3\) et \(d\) sont perpendiculaires.

> **EXERCICE**
> Le plan est muni d’un repère orthonormé. Soient les points \(A(-1 ; 1)\), \(B(5 ; 6)\) et \(C(8 ; -3)\). Soit \(H\) le projeté orthogonal du point \(A\) sur la droite \((BC)\).
> 1. Réaliser une figure et conjecturer par lecture graphique les coordonnées du point \(H\).
> 2. On cherche à déterminer par le calcul les coordonnées de \(H\) :
>    (a) Déterminer une équation de la droite \((BC)\).
>    (b) Déterminer une équation cartésienne de la droite \((AH)\).
>    (c) En déduire les coordonnées du point \(H\).

### 3) Équation d’un cercle

> **PROPRIÉTÉ**
> Soit \(\mathcal{C}\) le cercle de centre \(A(x_A ; y_A)\) et de rayon \(R\). Une équation cartésienne de \(\mathcal{C}\) est :
> \[
> (x - x_A)^2 + (y - y_A)^2 = R^2
> \]

> **DÉMONSTRATION**
> \(M(x ; y) \in \mathcal{C} \iff AM = R \iff AM^2 = R^2 \iff (x - x_A)^2 + (y - y_A)^2 = R^2\).

> **EXERCICES**
> 1. Dans le plan muni d’un repère orthonormé, on considère le point \(A(3 ; -5)\) et le cercle \(\mathcal{C}\) de centre \(A\) et de rayon \(2\).
>    1. Déterminer une équation cartésienne de \(\mathcal{C}\).
>    2. Le point \(B(2 ; 5)\) appartient-il au cercle \(\mathcal{C}\) ?
>    3. Déterminer les coordonnées d’un point \(D\) appartenant au cercle \(\mathcal{C}\). Attention : il faut choisir astucieusement une valeur de \(x\) (ou de \(y\)) qui aboutit à une équation admettant au moins une solution. Une valeur simplifiant l’un des deux carrés fonctionnera toujours.
> 2. Dans le plan muni d’un repère orthonormé, déterminer une équation cartésienne du cercle trigonométrique \(\mathcal{C}\).
> 3. Dans le plan muni d’un repère orthonormé, on considère l’ensemble \(E\) des points \(M(x ; y)\) tel que \(x^2 + y^2 - 4x + 6y + 1 = 0\). L’ensemble \(E\) est-il un cercle ? Si oui, préciser son rayon et les coordonnées de son centre.

> **PROPRIÉTÉ**
> Le cercle \(\mathcal{C}\) de diamètre \([AB]\) est l’ensemble des points \(M\) tels que \(\overrightarrow{MA} \cdot \overrightarrow{MB} = 0\).

> **DÉMONSTRATION**
> Dire que \(M\) appartient au cercle \(\mathcal{C}\) signifie que \(M\) est confondu avec \(A\) ou \(B\), ou que \((MA) \perp (MB)\), c’est-à-dire \(\overrightarrow{MA} \cdot \overrightarrow{MB} = 0\).

> **EXERCICE**
> Dans le plan muni d’un repère orthonormé, on considère les points \(A(4 ; -5)\) et \(B(2 ; 0)\).
> 1. Déterminer une équation cartésienne du cercle \(\mathcal{C}\) de diamètre \([AB]\).
> 2. Déterminer les coordonnées du centre \(\Omega\) de ce cercle \(\mathcal{C}\), et le rayon du cercle \(\mathcal{C}\).
