---
source_url: "https://www.maths-et-tiques.fr/telech/19SecdegP1M.pdf"
chapter: "01-second-degre"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:15:38+00:00"
cleaned_at: "2026-05-22T08:16:00+00:00"
---

## SECOND DEGRÉ – Chapitre 1/2

Tout le cours en vidéo : https://youtu.be/WVYWdN13kPE

### Partie 1 : Fonction polynôme du second degré

> **Définition :** On appelle fonction polynôme du second degré toute fonction \( f \) définie sur \( \mathbb{R} \) par une expression de la forme :
> \[ f(x) = ax^2 + bx + c \]
> où les coefficients \( a \), \( b \) et \( c \) sont des réels donnés avec \( a \neq 0 \).

**Remarque :** Une fonction polynôme du second degré s'appelle également « trinôme ».

**Exemples et contre-exemples :**
- \( f(x) = 3x^2 - 7x + 3 \)
- \( g(x) = \frac{1}{2}x^2 - 5x + \frac{3}{5} \)
- \( h(x) = 4 - 2x^2 \)
  sont des fonctions polynômes du second degré.
- \( k(x) = (x - 4)(5 - 2x) \)
- \( m(x) = 5x - 3 \) est une fonction polynôme du premier degré (fonction affine).
- \( n(x) = 5x^4 - 7x^3 + 3x - 8 \) est une fonction polynôme de degré 4.

### Partie 2 : Forme canonique d'une fonction polynôme du second degré

> **Propriété :** Toute fonction polynôme \( f \) du second degré définie sur \( \mathbb{R} \) par \( f(x) = ax^2 + bx + c \) peut s'écrire sous la forme :
> \[ f(x) = a(x - \alpha)^2 + \beta \]
> où \( \alpha \) et \( \beta \) sont deux nombres réels. Cette dernière écriture s'appelle la forme canonique de \( f \).

**Démonstration :**
Comme \( a \neq 0 \), on peut écrire :
\[
\begin{aligned}
f(x) &= ax^2 + bx + c \\
&= a\left( x^2 + \frac{b}{a}x \right) + c \\
&= a\left[ x^2 + \frac{b}{a}x + \left( \frac{b}{2a} \right)^2 - \left( \frac{b}{2a} \right)^2 \right] + c \\
&= a\left[ \left( x + \frac{b}{2a} \right)^2 - \left( \frac{b}{2a} \right)^2 \right] + c \\
&= a\left( x + \frac{b}{2a} \right)^2 - a\frac{b^2}{4a^2} + c \\
&= a\left( x + \frac{b}{2a} \right)^2 - \frac{b^2}{4a} + c \\
&= a\left( x + \frac{b}{2a} \right)^2 - \frac{b^2 - 4ac}{4a} \\
&= a(x - \alpha)^2 + \beta
\end{aligned}
\]
avec \( \alpha = -\frac{b}{2a} \) et \( \beta = -\frac{b^2 - 4ac}{4a} \).

**Méthode : Déterminer la forme canonique d'une fonction polynôme du second degré**

Vidéo https://youtu.be/JcT6kph74O0
Vidéo https://youtu.be/OQHf-hX9JhM

Soit la fonction polynôme \( f \) du second degré définie sur \( \mathbb{R} \) par :
\[ f(x) = 2x^2 - 20x + 10 \]
Écrire \( f \) sous sa forme canonique.

**Correction**
On veut exprimer la fonction \( f \) sous sa forme canonique : \( f(x) = a(x - \alpha)^2 + \beta \) où \( a \), \( \alpha \) et \( \beta \) sont des nombres réels.
\[
\begin{aligned}
f(x) &= 2x^2 - 20x + 10 \\
&= 2\left[ x^2 - 10x \right] + 10 \\
&= 2\left[ x^2 - 10x + 25 - 25 \right] + 10 \\
&= 2\left[ (x - 5)^2 - 25 \right] + 10 \\
&= 2(x - 5)^2 - 50 + 10 \\
&= 2(x - 5)^2 - 40
\end{aligned}
\]
\( f(x) = 2(x - 5)^2 - 40 \) est la forme canonique de \( f \).

### Partie 3 : Variations, extremum et représentation graphique

#### 1) Variations

> **Propriétés :** Soit \( f \) une fonction polynôme du second degré, telle que \( f(x) = ax^2 + bx + c \).
> - Si \( a \) est positif, \( f \) est d'abord décroissante, puis croissante : « 😊 ».
> - Si \( a \) est négatif, \( f \) est d'abord croissante, puis décroissante : « ☹ ».

\( a > 0 \) | \( a < 0 \)
--- | ---
<!-- UNSURE: Les tableaux de variations sont manquants dans l'original, seuls les graphiques étaient présents. -->

#### 2) Extremum

**Exemple :** Soit la fonction \( f \) donnée sous sa forme canonique par :
\[ f(x) = 2(x - 1)^2 + 3 \]
On a : \( 2(x - 1)^2 \geq 0 \)
Donc : \( 2(x - 1)^2 + 3 \geq 3 \)
Soit : \( f(x) \geq 3 \)
Or : \( f(1) = 3 \) donc pour tout \( x \), \( f(x) \geq f(1) \).
\( f \) admet donc un minimum en 1. Ce minimum est égal à 3.

> **Propriété :** Soit \( f \) une fonction polynôme du second degré définie par \( f(x) = a(x - \alpha)^2 + \beta \), avec \( a \neq 0 \).
> - Si \( a > 0 \), \( f \) admet un minimum pour \( x = \alpha \). Ce minimum est égal à \( \beta \).
> - Si \( a < 0 \), \( f \) admet un maximum pour \( x = \alpha \). Ce maximum est égal à \( \beta \).

> **Propriété :** Pour \( f(x) = ax^2 + bx + c \), avec \( a \neq 0 \), on a :
> \[ \alpha = -\frac{b}{2a} \quad \text{et} \quad \beta = f\left( -\frac{b}{2a} \right) \]

Si \( a > 0 \) : | Si \( a < 0 \) :
--- | ---
<!-- UNSURE: Les graphiques des paraboles sont manquants dans l'original. -->

> **Définition :** La représentation graphique d'une fonction polynôme \( f \) du second degré s'appelle une parabole. Le point de coordonnées \( (\alpha ; \beta) \) s'appelle le sommet de la parabole. Il correspond à l'extremum de la fonction \( f \).

> **Propriété :** La parabole admet pour axe de symétrie la droite d'équation \( x = \alpha \).

**Méthode : Déterminer les caractéristiques d'une parabole**

Vidéo https://youtu.be/7IOCVfUnoz0

Soit la fonction polynôme du second degré définie par \( f(x) = 2x^2 - 12x + 1 \). Déterminer le sommet de la parabole de \( f \) et son axe de symétrie.

**Correction**
Les coordonnées du sommet de la parabole sont \( (\alpha ; \beta) \), avec :
\[
\alpha = -\frac{b}{2a} = -\frac{-12}{2 \times 2} = 3
\]
\[
\beta = f\left( -\frac{b}{2a} \right) = f(3) = 2 \times 3^2 - 12 \times 3 + 1 = -17
\]
Le point de coordonnées \( (3 ; -17) \) est donc le sommet de la parabole.
**Remarque :** Comme \( a = 2 > 0 \), ce sommet correspond à un minimum.

La parabole possède un axe de symétrie d'équation \( x = -\frac{b}{2a} \), soit \( x = 3 \). La droite d'équation \( x = 3 \) est donc axe de symétrie de la parabole.

#### 3) Représentation graphique

**Méthode : Représenter graphiquement une fonction polynôme du second degré**

Vidéo https://youtu.be/KK76UohzUW4

Représenter graphiquement la fonction polynôme \( f \) du second degré définie sur \( \mathbb{R} \) par \( f(x) = -x^2 + 4x \).

**Correction**
Commençons par écrire la fonction \( f \) sous sa forme canonique :
\[
\begin{aligned}
f(x) &= -x^2 + 4x \\
&= -(x^2 - 4x) \\
&= -(x^2 - 4x + 4 - 4) \\
&= -((x - 2)^2 - 4) \\
&= -(x - 2)^2 + 4
\end{aligned}
\]
\( f \) admet donc un maximum en \( \alpha = 2 \) égal à \( \beta = 4 \).
**Remarque :** On peut aussi appliquer les formules \( \alpha = -\frac{b}{2a} \) et \( \beta = f\left( -\frac{b}{2a} \right) \).

Les variations de \( f \) sont donc données dans le tableau suivant :

| \( x \) | \( -\infty \) | \( 2 \) | \( +\infty \) |
|--------|---------------|---------|---------------|
| \( f(x) \) | \( \nearrow \) | \( 4 \) | \( \searrow \) |

Pour représenter graphiquement la fonction \( f \), on calcule les coordonnées de quelques points appartenant à la courbe :
\[
f(0) = -0^2 + 4 \times 0 = 0
\]
\[
f(1) = -1^2 + 4 \times 1 = -1 + 4 = 3
\]
On obtient d'autres points par symétrie par rapport à la droite d'équation \( x = 2 \). On trace la courbe représentative de \( f \) ci-contre.

<!-- UNSURE: Le graphique de la parabole est manquant dans l'original. -->

Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur. www.maths-et-tiques.fr/index.php/mentions-legales
