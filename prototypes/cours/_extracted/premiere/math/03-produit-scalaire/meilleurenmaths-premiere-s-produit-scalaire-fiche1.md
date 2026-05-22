---
source_url: "https://www.meilleurenmaths.com/images/misyl/premiereS/premiere-s-produit-scalaire-fiche1.pdf"
chapter: "03-produit-scalaire"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:54+00:00"
cleaned_at: "2026-05-22T08:27:52+00:00"
---

## Produit scalaire – Exercices – Fiche 1

### Exercice 1
Soit \(ABC\) un triangle tel que \(AB=5\), \(AC=3\) et \(\widehat{BAC} = \frac{3\pi}{4}\). Déterminer \(\overrightarrow{AB} \cdot \overrightarrow{AC}\).

\[
\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AC \times \cos\left(\frac{3\pi}{4}\right)
\]

Or, \(\cos\left(\frac{3\pi}{4}\right) = \cos\left(\pi - \frac{\pi}{4}\right) = -\cos\left(\frac{\pi}{4}\right) = -\frac{\sqrt{2}}{2}\).

Donc,
\[
\overrightarrow{AB} \cdot \overrightarrow{AC} = 5 \times 3 \times \left(-\frac{\sqrt{2}}{2}\right) = -\frac{15\sqrt{2}}{2}.
\]

### Exercice 2
Soit \(\vec{u}\) et \(\vec{v}\) deux vecteurs tels que \(\|\vec{u}\| = 2\), \(\vec{u} \cdot \vec{v} = -7\) et \((\vec{u}, \vec{v}) = \frac{\pi}{6}\). Déterminer \(\|\vec{v}\|\).

\[
\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos(\vec{u}, \vec{v})
\]
\[
-7 = 2 \times \|\vec{v}\| \times \cos\left(\frac{\pi}{6}\right)
\]

Or, \(\cos\left(\frac{\pi}{6}\right) = \frac{\sqrt{3}}{2}\).

Donc,
\[
-7 = \sqrt{3} \, \|\vec{v}\|
\]
\[
\|\vec{v}\| = -\frac{7}{\sqrt{3}} = -\frac{7\sqrt{3}}{3}.
\]

### Exercice 3
Soit \(M(1;3)\), \(N(4;-2)\) et \(P(2;-1)\) trois points dans un repère \((O, \vec{i}, \vec{j})\).

1. Déterminer \(\overrightarrow{MN} \cdot \overrightarrow{MP}\).
2. En déduire une valeur approchée de \(\widehat{NMP}\) en degrés à \(0,1\) près.

**1.**
\[
\overrightarrow{MN} \begin{pmatrix} 4-1 \\ -2-3 \end{pmatrix} = \begin{pmatrix} 3 \\ -5 \end{pmatrix}, \quad
\overrightarrow{MP} \begin{pmatrix} 2-1 \\ -1-3 \end{pmatrix} = \begin{pmatrix} 1 \\ -4 \end{pmatrix}
\]
\[
\overrightarrow{MN} \cdot \overrightarrow{MP} = 3 \times 1 + (-5) \times (-4) = 23.
\]

**2.**
\[
\overrightarrow{MN} \cdot \overrightarrow{MP} = MN \times MP \times \cos \widehat{NMP}
\]

Or,
\[
MN^2 = 3^2 + (-5)^2 = 9 + 25 = 34 \quad \Rightarrow \quad MN = \sqrt{34}
\]
\[
MP^2 = 1^2 + (-4)^2 = 1 + 16 = 17 \quad \Rightarrow \quad MP = \sqrt{17}
\]

Donc,
\[
23 = \sqrt{34} \times \sqrt{17} \times \cos \widehat{NMP}
\]
\[
23 = \sqrt{34 \times 17} \times \cos \widehat{NMP}
\]
\[
23 = 17\sqrt{2} \times \cos \widehat{NMP}
\]
\[
\cos \widehat{NMP} = \frac{23}{17\sqrt{2}}
\]

On obtient \(\widehat{NMP} \approx 16,9^\circ\).

### Exercice 4
Soit \(A(-2;-3)\), \(B(1;1)\), \(C(-3;-1)\), \(D(-4;2)\), \(E(-1;-3)\) et \(F(2;-1)\) dans un repère orthonormé. Les triangles \(ABC\) et \(EDF\) sont-ils rectangles en \(C\) et \(E\) respectivement ?

Le triangle \(ABC\) est rectangle en \(C\) si et seulement si \(\overrightarrow{CA} \cdot \overrightarrow{CB} = 0\).

\[
\overrightarrow{CA} \begin{pmatrix} -2+3 \\ -3+1 \end{pmatrix} = \begin{pmatrix} 1 \\ -2 \end{pmatrix}, \quad
\overrightarrow{CB} \begin{pmatrix} 1+3 \\ 1+1 \end{pmatrix} = \begin{pmatrix} 4 \\ 2 \end{pmatrix}
\]
\[
\overrightarrow{CA} \cdot \overrightarrow{CB} = 1 \times 4 + (-2) \times 2 = 4 - 4 = 0
\]

Donc le triangle \(ABC\) est rectangle en \(C\).

\[
\overrightarrow{ED} \begin{pmatrix} -4+1 \\ 2+3 \end{pmatrix} = \begin{pmatrix} -3 \\ 5 \end{pmatrix}, \quad
\overrightarrow{EF} \begin{pmatrix} 2+1 \\ -1+3 \end{pmatrix} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}
\]
\[
\overrightarrow{ED} \cdot \overrightarrow{EF} = -3 \times 3 + 5 \times 2 = 1 \neq 0
\]

Donc le triangle \(EDF\) n'est pas rectangle en \(E\).

### Exercice 5
\(ABCD\) est un losange de centre \(O\) tel que \(OA=4\) et \(OD=3\).

**1.** Calculer les produits scalaires suivants :
a. \(\overrightarrow{AC} \cdot \overrightarrow{AD}\)
b. \(\overrightarrow{BO} \cdot \overrightarrow{BC}\)
c. \(\overrightarrow{AB} \cdot \overrightarrow{DC}\)
d. \(\overrightarrow{BC} \cdot \overrightarrow{BD}\)

a. \(O\) est le pied de la hauteur du triangle \(ADC\) issue de \(D\), donc :
\[
\overrightarrow{AC} \cdot \overrightarrow{AD} = \overrightarrow{AC} \cdot \overrightarrow{AO} = AC \times AO \times \cos(\overrightarrow{AC}, \overrightarrow{AO}) = 8 \times 4 \times 1 = 32.
\]

b. \(O\) est le pied de la hauteur du triangle \(OBC\) issue de \(C\), donc :
\[
\overrightarrow{BO} \cdot \overrightarrow{BC} = \overrightarrow{BO} \cdot \overrightarrow{BO} = \overrightarrow{BO}^2 = BO^2 = 3^2 = 9.
\]

c. \(\overrightarrow{AB} = \overrightarrow{DC}\) car \(ABCD\) est un losange, donc :
\[
\overrightarrow{AB} \cdot \overrightarrow{DC} = \overrightarrow{AB} \cdot \overrightarrow{AB} = \overrightarrow{AB}^2 = AB^2.
\]

Dans le triangle rectangle \(OAB\), d'après le théorème de Pythagore :
\[
AB^2 = OA^2 + OB^2 = 4^2 + 3^2 = 16 + 9 = 25.
\]
\[
\overrightarrow{AB} \cdot \overrightarrow{DC} = 25.
\]

d. \(O\) est le pied de la hauteur du triangle \(DBC\) issue de \(C\), donc :
\[
\overrightarrow{BC} \cdot \overrightarrow{BD} = \overrightarrow{BD} \cdot \overrightarrow{BC} = \overrightarrow{BD} \cdot \overrightarrow{BO} = BD \times BO \times \cos(\overrightarrow{BD}, \overrightarrow{BO}) = 6 \times 3 \times 1 = 18.
\]

**2.** En utilisant les coordonnées des points dans le repère orthonormal \((O; \vec{i}, \vec{j})\), calculer :
a. \(\overrightarrow{AB} \cdot \overrightarrow{AD}\)
b. \(\overrightarrow{OC} \cdot \overrightarrow{BA}\)
c. \(\overrightarrow{AD} \cdot \overrightarrow{DC}\)

\(A(-4;0)\), \(B(0;-3)\), \(C(4;0)\), \(D(0;3)\).

a.
\[
\overrightarrow{AB} \begin{pmatrix} 4 \\ -3 \end{pmatrix}, \quad
\overrightarrow{AD} \begin{pmatrix} 4 \\ 3 \end{pmatrix}
\]
\[
\overrightarrow{AB} \cdot \overrightarrow{AD} = 4 \times 4 + (-3) \times 3 = 16 - 9 = 7.
\]

b.
\[
\overrightarrow{OC} \begin{pmatrix} 4 \\ 0 \end{pmatrix}, \quad
\overrightarrow{BA} \begin{pmatrix} -4 \\ 3 \end{pmatrix}
\]
\[
\overrightarrow{OC} \cdot \overrightarrow{BA} = 4 \times (-4) + 0 \times 3 = -16.
\]

c.
\[
\overrightarrow{AD} \begin{pmatrix} 4 \\ 3 \end{pmatrix}, \quad
\overrightarrow{DC} \begin{pmatrix} 4 \\ -3 \end{pmatrix}
\]
\[
\overrightarrow{AD} \cdot \overrightarrow{DC} = 4 \times 4 + 3 \times (-3) = 16 - 9 = 7.
\]

### Exercice 6
Le vecteur \(\vec{u}\) a pour coordonnées \(\begin{pmatrix} 2 \\ -1 \end{pmatrix}\) et \(\vec{v}\) a pour coordonnées \(\begin{pmatrix} 1 \\ 4 \end{pmatrix}\). Calculer :
a. \(\vec{u} \cdot \vec{v}\)
b. \(\vec{u}^2\)
c. \((4\vec{u} + \vec{v}) \cdot (\vec{u} - \vec{v})\)
d. \((\vec{u} + 2\vec{v}) \cdot (2\vec{u} - \vec{v})\)

a.
\[
\vec{u} \cdot \vec{v} = 2 \times 1 + (-1) \times 4 = 2 - 4 = -2.
\]

b.
\[
\vec{u}^2 = 2^2 + (-1)^2 = 4 + 1 = 5.
\]

c.
\[
4\vec{u} + \vec{v} \begin{pmatrix} 4 \times 2 + 1 \\ 4 \times (-1) + 4 \end{pmatrix} = \begin{pmatrix} 9 \\ 0 \end{pmatrix}, \quad
\vec{u} - \vec{v} \begin{pmatrix} 2 - 1 \\ -1 - 4 \end{pmatrix} = \begin{pmatrix} 1 \\ -5 \end{pmatrix}
\]
\[
(4\vec{u} + \vec{v}) \cdot (\vec{u} - \vec{v}) = 9 \times 1 + 0 \times (-5) = 9.
\]

d.
\[
\vec{u} + 2\vec{v} \begin{pmatrix} 2 + 2 \times 1 \\ -1 + 2 \times 4 \end{pmatrix} = \begin{pmatrix} 4 \\ 7 \end{pmatrix}, \quad
2\vec{u} - \vec{v} \begin{pmatrix} 2 \times 2 - 1 \\ 2 \times (-1) - 4 \end{pmatrix} = \begin{pmatrix} 3 \\ -6 \end{pmatrix}
\]
\[
(\vec{u} + 2\vec{v}) \cdot (2\vec{u} - \vec{v}) = 4 \times 3 + 7 \times (-6) = 12 - 42 = -30.
\]

### Exercice 7
\(ABC\) est un triangle rectangle en \(A\) tel que \(AC=5\) et \(AB=4\) et \((\overrightarrow{AC} ; \overrightarrow{AB}) = \frac{\pi}{2} (2\pi)\). Soit \(D\) le point du plan vérifiant \(AD=4\) et \((\overrightarrow{AC} ; \overrightarrow{AD}) = \frac{\pi}{6} (2\pi)\). \(H\) est le pied de la hauteur du triangle \(ABD\) issue de \(B\). \(K\) est le pied de la hauteur du triangle \(ACD\) issue de \(C\).

Calculer les produits scalaires suivants :
a. \(\overrightarrow{BA} \cdot \overrightarrow{BC}\)
b. \(\overrightarrow{AB} \cdot \overrightarrow{AH}\)
c. \(\overrightarrow{AC} \cdot \overrightarrow{AK}\)
d. \(\overrightarrow{AB} \cdot (\overrightarrow{CA} + \overrightarrow{AH})\)
e. \(\overrightarrow{AC} \cdot (\overrightarrow{BA} + \overrightarrow{AK})\)
f. \(\overrightarrow{KB} \cdot \overrightarrow{HC}\)

a. Le triangle \(ABC\) est rectangle en \(A\) donc le pied de la hauteur du triangle \(ABC\) issue de \(C\) est \(A\), donc :
\[
\overrightarrow{BA} \cdot \overrightarrow{BC} = \overrightarrow{BA} \cdot \overrightarrow{BA} = \overrightarrow{BA}^2 = BA^2 = 4^2 = 16.
\]

b. Le triangle \(ABH\) est rectangle en \(H\) donc le pied de la hauteur du triangle \(ABH\) issue de \(B\) est \(H\), donc :
\[
\overrightarrow{AB} \cdot \overrightarrow{AH} = \overrightarrow{AH} \cdot \overrightarrow{AB} = \overrightarrow{AH} \cdot \overrightarrow{AH} = \overrightarrow{AH}^2 = AH^2.
\]

Dans le triangle rectangle \(ABH\) :
\[
\widehat{BAH} = \frac{\pi}{2} - \frac{\pi}{6} = \frac{\pi}{3}
\]
\[
\cos\left(\frac{\pi}{3}\right) = \frac{AH}{AB} = \frac{1}{2} \quad \Rightarrow \quad AH = \frac{1}{2} AB = 2.
\]
\[
\overrightarrow{AB} \cdot \overrightarrow{AH} = 2^2 = 4.
\]

c. Le triangle \(ACK\) est rectangle en \(K\) donc le pied de la hauteur du triangle \(ACK\) issue de \(C\) est \(K\), donc :
\[
\overrightarrow{AC} \cdot \overrightarrow{AK} = \overrightarrow{AK} \cdot \overrightarrow{AC} = \overrightarrow{AK} \cdot \overrightarrow{AK} = \overrightarrow{AK}^2 = AK^2.
\]
\[
\cos\left(\frac{\pi}{6}\right) = \frac{AK}{AC} = \frac{\sqrt{3}}{2} \quad \Rightarrow \quad AK = \frac{\sqrt{3}}{2} AC = \frac{5\sqrt{3}}{2}.
\]
\[
\overrightarrow{AC} \cdot \overrightarrow{AK} = \left(\frac{5\sqrt{3}}{2}\right)^2 = \frac{75}{4}.
\]

d.
\[
\overrightarrow{AB} \cdot (\overrightarrow{CA} + \overrightarrow{AH}) = \overrightarrow{AB} \cdot \overrightarrow{CA} + \overrightarrow{AB} \cdot \overrightarrow{AH}
\]

Or, les vecteurs \(\overrightarrow{AB}\) et \(\overrightarrow{AC}\) sont orthogonaux donc \(\overrightarrow{AB} \cdot \overrightarrow{CA} = 0\).
\[
\overrightarrow{AB} \cdot (\overrightarrow{CA} + \overrightarrow{AH}) = 4.
\]

e.
\[
\overrightarrow{AC} \cdot (\overrightarrow{BA} + \overrightarrow{AK}) = \overrightarrow{AC} \cdot \overrightarrow{BA} + \overrightarrow{AC} \cdot \overrightarrow{AK}
\]

Or, \(\overrightarrow{AC} \cdot \overrightarrow{BA} = 0\).
\[
\overrightarrow{AC} \cdot (\overrightarrow{BA} + \overrightarrow{AK}) = \frac{75}{4}.
\]

f.
\[
\overrightarrow{KB} \cdot \overrightarrow{HC} = (\overrightarrow{KA} + \overrightarrow{AB}) \cdot (\overrightarrow{HA} + \overrightarrow{AC})
\]
\[
\overrightarrow{KB} \cdot \overrightarrow{HC} = \overrightarrow{KA} \cdot \overrightarrow{HA} + \overrightarrow{KA} \cdot \overrightarrow{AC} + \overrightarrow{AB} \cdot \overrightarrow{HA} + \overrightarrow{AB} \cdot \overrightarrow{AC}
\]

Or, \(\overrightarrow{AB} \cdot \overrightarrow{AC} = 0\).
\[
\overrightarrow{KA} \cdot \overrightarrow{HA} = KA \times HA \times \cos(\overrightarrow{KA}, \overrightarrow{HA}) = \frac{5\sqrt{3}}{2} \times 2 \times 1 = 5\sqrt{3}
\]
\[
\overrightarrow{KA} \cdot \overrightarrow{AC} = -\overrightarrow{AK} \cdot \overrightarrow{AC} = -\frac{75}{4}
\]
\[
\overrightarrow{AB} \cdot \overrightarrow{HA} = -\overrightarrow{AB} \cdot \overrightarrow{AH} = -4
\]
\[
\overrightarrow{KB} \cdot \overrightarrow{HC} = 5\sqrt{3} - \frac{75}{4} - 4 = \frac{20\sqrt{3} - 75 - 16}{4} = \frac{20\sqrt{3} - 91}{4}.
\]

### Exercice 8
\(ABC\) est un triangle tel que \(AB=6\), \(BC=4\) et \(AC=5\). Déterminer une mesure en degré à \(10^{-1}\) près de l'angle \(\widehat{BAC}\).

\(a = BC = 4\), \(b = AC = 5\), \(c = AB = 6\).

\[
a^2 = b^2 + c^2 - 2bc \cos \widehat{A}
\]
\[
16 = 25 + 36 - 2 \times 5 \times 6 \times \cos \widehat{BAC}
\]
\[
-45 = -60 \cos \widehat{BAC}
\]
\[
\cos \widehat{BAC} = \frac{45}{60} = \frac{3}{4}
\]
\[
\widehat{BAC} \approx 41,4^\circ.
\]

### Exercice 9
\(ABC\) est un triangle tel que \(AB=5\), \(BC=8\) et \(AC=7\). \(I\) est le milieu de \([BC]\). Calculer la longueur \(AI\).

\[
AB^2 + AC^2 = 2 AI^2 + 2 IC^2
\]
\[
25 + 49 = 2 AI^2 + 2 \times 4^2
\]
\[
74 = 2 AI^2 + 32
\]
\[
2 AI^2 = 42
\]
\[
AI^2 = 21
\]
\[
AI = \sqrt{21}.
\]
