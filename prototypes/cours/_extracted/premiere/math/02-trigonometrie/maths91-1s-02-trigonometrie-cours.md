---
source_url: "http://www.maths91.fr/cours1spemaths/1S-02-TRIGONOMETRIE-cours.pdf"
chapter: "02-trigonometrie"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:35:09+00:00"
cleaned_at: "2026-05-22T08:35:28+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 02 − TRIGONOMÉTRIE

Dans tout le chapitre, le plan est muni d’un repère orthonormé \((O ; \vec{\imath}, \vec{\jmath})\).

## I Le cercle trigonométrique et le radian

### 1) Définition

> **DÉFINITION**
> On appelle **cercle trigonométrique** le cercle \(\mathcal{C}\) de centre \(O\) et de rayon \(1\) sur lequel on a choisi un sens de parcours, appelé le **sens direct** (sens inverse des aiguilles d’une montre).

### 2) Longueur d’un arc de cercle

La longueur d’un cercle de rayon \(R\) est donnée par la formule \(2\pi R\). Or le cercle trigonométrique a pour rayon \(R = 1\), donc sa longueur est de \(2\pi\). Son demi-cercle a donc pour longueur \(\pi\) et son quart de cercle a pour longueur \(\frac{\pi}{2}\).

Ainsi, tout point \(M\) du cercle trigonométrique peut être défini par la longueur de l’arc \(\overset{\frown}{IM}\).

> **PROPRIÉTÉ**
> La longueur d’un arc de cercle et la mesure en degré de l’angle au centre qui l’intercepte sont proportionnelles.
>
> | Mesure de l’angle au centre | \(360\) | \(180\) | \(90\) | \(45\) | \(0\) |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | Longueur de l’arc intercepté | \(2\pi\) | \(\pi\) | \(\frac{\pi}{2}\) | \(\frac{\pi}{4}\) | \(0\) |

> **DÉMONSTRATION**
> Simple proportionnalité.

### 3) Le radian

Soit \(\mathcal{C}\) un cercle trigonométrique de centre \(O\) dans un repère \((O ; I ; J)\).

> **DÉFINITION**
> Le **radian** (symbole : rad) est la mesure d’un angle au centre qui intercepte sur le cercle \(\mathcal{C}\) un arc de longueur \(1\).

> **EXEMPLE**
> Sur le cercle trigonométrique de la définition, l’angle \(\widehat{IOJ}\) mesure \(90\) degrés, mais aussi \(\frac{\pi}{2}\) radians.

### 4) Enroulement de la droite des réels

Soit \(d\) la tangente à \(\mathcal{C}\) au point \(I(1 ; 0)\). Alors tout point \(N\) de \(d\) est repéré par un unique réel \(x\). (\(d\) peut être assimilée à un axe gradué)

En enroulant la droite \(d\) sur le cercle \(\mathcal{C}\), on associe à tout réel \(x\) un unique point \(M(x)\) du cercle \(\mathcal{C}\) et on dit que \(x\) est une mesure de l’angle \(\widehat{IOM}\).

> **EXEMPLE**
> Sur un cercle trigonométrique, placer les points \(I(0)\), \(J\left(\frac{\pi}{2}\right)\), \(K(\pi)\), \(L\left(\frac{3\pi}{2}\right)\), \(M(2\pi)\), \(N\left(-\frac{\pi}{2}\right)\), \(P\left(-\frac{3\pi}{4}\right)\).

> **PROPRIÉTÉ**
> Pour tout réel \(x\) et pour tout entier relatif \(k\), les points \(M(x)\) et \(M'(x + k \times 2\pi)\) du cercle trigonométrique sont confondus.

> **DÉMONSTRATION**
> La longueur du cercle trigonométrique étant égale à \(2\pi\), le résultat est immédiat.

> **EXEMPLE**
> Dans l’exemple précédent, \(I\) et \(M\) sont confondus, et \(N\) et \(L\) sont confondus.

## II Cosinus et sinus d’un réel

### 1) Cosinus, sinus et cercle trigonométrique

Soit \(\mathcal{C}\) le cercle trigonométrique de centre \(O\) dans un repère orthonormé direct \((O ; \vec{\imath}, \vec{\jmath})\). Soit \(x\) un réel et \(M\) le point de \(\mathcal{C}\) associé à \(x\).

> **DÉFINITION**
> On appelle **cosinus** de \(x\) et **sinus** de \(x\), notés \(\cos x\) et \(\sin x\), l’abscisse et l’ordonnée de \(M\) dans le repère \((O ; \vec{\imath}, \vec{\jmath})\).
> On le note : \(M(\cos x ; \sin x)\), ou encore : \(\overrightarrow{OM} = \cos x \times \vec{\imath} + \sin x \times \vec{\jmath}\).

### 2) Propriétés

> **PROPRIÉTÉ**
> Pour tout réel \(x\), \(-1 \leqslant \cos x \leqslant 1\) et \(-1 \leqslant \sin x \leqslant 1\).

> **DÉMONSTRATION**
> \(\cos(x)\) est l’abscisse d’un point \(M\) du cercle trigonométrique, cercle dont le centre est \(O\) et le rayon vaut \(1\). Quelle que soit la position du point \(M\) sur ce cercle, cette abscisse varie donc de \(-1\) à \(1\), donc on a bien pour tout réel \(x\), \(-1 \leqslant \cos(x) \leqslant 1\). Même raisonnement pour \(\sin(x)\), qui est l’ordonnée d’un point de ce cercle.

> **PROPRIÉTÉ**
> Pour tout réel \(x\), \(\cos^2 x + \sin^2 x = 1\).

> **DÉMONSTRATION**
> Si \(x \in \left[0 ; \frac{\pi}{2}\right]\), alors d’après le théorème de Pythagore dans le triangle \(OMH\), où \(H\) est le point de \([OI]\) tel que \((MH) \perp (OI)\), on a \(OM^2 = OH^2 + HM^2\), donc \(1^2 = \cos^2(x) + \sin^2(x)\), soit \(\cos^2(x) + \sin^2(x) = 1\). On admet le résultat pour les autres valeurs de \(x\).

> **PROPRIÉTÉ**
> * \(\forall x \in \mathbb{R}\), \(\sin(-x) = -\sin x\).
> * \(\forall x \in \mathbb{R}\), \(\cos(-x) = \cos x\).
> * \(\forall x \in \mathbb{R}\), \(\cos(x + k \times 2\pi) = \cos(x)\) et \(\sin(x + k \times 2\pi) = \sin(x)\).

> **DÉMONSTRATION**
> Par considération géométrique sur le cercle trigonométrique.

> **PROPRIÉTÉ**
> Pour tout réel \(x\) :
> * \(\sin\left(\frac{\pi}{2} - x\right) = \cos x\) ; \(\cos\left(\frac{\pi}{2} - x\right) = \sin x\)
> * \(\sin\left(\frac{\pi}{2} + x\right) = \cos x\) ; \(\cos\left(\frac{\pi}{2} + x\right) = -\sin x\)
> * \(\sin(\pi - x) = \sin x\) ; \(\cos(\pi - x) = -\cos x\)
> * \(\sin(\pi + x) = -\sin x\) ; \(\cos(\pi + x) = -\cos x\)

> **DÉMONSTRATION**
> Par considération géométrique sur le cercle trigonométrique.

### 3) Cercle trigonométrique et valeurs à connaître

| \(x\) | \(0\) | \(\frac{\pi}{6}\) | \(\frac{\pi}{4}\) | \(\frac{\pi}{3}\) | \(\frac{\pi}{2}\) | \(\pi\) | \(\frac{3\pi}{2}\) | \(2\pi\) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| \(\sin x\) | \(0\) | \(\frac{1}{2}\) | \(\frac{\sqrt{2}}{2}\) | \(\frac{\sqrt{3}}{2}\) | \(1\) | \(0\) | \(-1\) | \(0\) |
| \(\cos x\) | \(1\) | \(\frac{\sqrt{3}}{2}\) | \(\frac{\sqrt{2}}{2}\) | \(\frac{1}{2}\) | \(0\) | \(-1\) | \(0\) | \(1\) |

> **DÉMONSTRATIONS**
>
> **Démonstration pour \(\frac{\pi}{4}\) :**
> Soit \(ABCD\) un carré de côté de longueur \(a\), avec \(a\) un réel strictement positif.
> 1. Déterminer la mesure en radian des angles \(\widehat{BAC}\) et \(\widehat{BCA}\).
> 2. Déterminer en fonction de \(a\) la longueur \(AC\).
> 3. En déduire la valeur exacte de \(\sin\left(\frac{\pi}{4}\right)\) et de \(\cos\left(\frac{\pi}{4}\right)\).
>
> **Démonstration pour \(\frac{\pi}{3}\) et \(\frac{\pi}{6}\) :**
> Soit \(ABC\) un triangle équilatéral de côté de longueur \(a\), avec \(a\) un réel strictement positif, et soit \(H\) le pied de la hauteur du triangle issue de \(A\).
> 1. Déterminer la mesure en radian des angles \(\widehat{ABH}\) et \(\widehat{BAH}\).
> 2. Déterminer en fonction de \(a\) la longueur \(AH\).
> 3. En déduire la valeur exacte de \(\sin\left(\frac{\pi}{3}\right)\), \(\cos\left(\frac{\pi}{3}\right)\), \(\sin\left(\frac{\pi}{6}\right)\) et \(\cos\left(\frac{\pi}{6}\right)\).
