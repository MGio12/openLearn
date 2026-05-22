---
source_url: "http://www.maths91.fr/cours1spemaths/1S-01-SECOND_DEGRE-cours.pdf"
chapter: "01-second-degre"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:15:37+00:00"
cleaned_at: "2026-05-22T08:16:37+00:00"
---

## I Fonctions polynômes du second degré

### 1) Forme développée

> **DÉFINITION**
> Soit \(f\) une fonction définie sur \(\mathbb{R}\). On dit que \(f\) est une **fonction polynôme du second degré**, ou **fonction trinôme du second degré**, si et seulement s'il existe trois réels \(a\), \(b\) et \(c\), avec \(a \neq 0\), tels que pour tout réel \(x\) :
> \[ f(x) = ax^2 + bx + c \]
> Cette forme est appelée la **forme développée** de \(f(x)\).

> **REMARQUE**
> La forme développée d'une fonction polynôme du second degré est unique.

> **VOCABULAIRE**
> * \(f\) est une fonction et \(f(x)\) est un réel (c'est l'image de \(x\) par la fonction \(f\)). Ainsi, les phrases « \(f(x)\) est une fonction du second degré » ou « \(f = ax^2 + bx + c\) » sont fausses.
> * Si \(a\), \(b\) et \(c\) sont des réels, avec \(a \neq 0\), alors \(f : x \mapsto ax^2 + bx + c\) est une **fonction polynôme du second degré** et \(f(x) = ax^2 + bx + c\) est un **polynôme du second degré**.

> **EXEMPLES**
> * \(f : x \mapsto -3x^2 + 5x - 1\)
> * \(g : x \mapsto 2(5 - x)(4x + 3)\) (Attention, ce n'est pas la forme développée de \(g\) ici)
> * \(h : x \mapsto 5x^2 + 2\)

> **CONTRE-EXEMPLES**
> * \(f : x \mapsto 2x + 1\) (Fonction polynôme du premier degré, ou fonction affine)
> * \(g : x \mapsto 3x^3\) (Fonction polynôme du troisième degré)
> * \(h : x \mapsto 5x^2 + \frac{1}{x}\) (Fonction rationnelle)

### 2) Forme factorisée

> **DÉFINITION**
> Soit \(P\) une fonction polynôme du second degré définie sur \(\mathbb{R}\). On appelle **racine** du polynôme \(P(x)\) tout nombre réel \(x_0\) tel que \(P(x_0) = 0\).

> **VOCABULAIRE**
> Autrement dit, \(x_0\) est une racine de \(P(x)\) si et seulement si \(x_0\) est une solution de l'équation \(P(x) = 0\).

> **EXEMPLE**
> Soit \(P(x) = 2x^2 - 2x - 4\). Calculer \(P(2)\) et conclure.
> \[ P(2) = 2 \times 2^2 - 2 \times 2 - 4 = 8 - 4 - 4 = 0 \]
> Donc \(2\) est une racine de \(P(x)\).

> **DÉFINITION**
> Soit \(P(x)\) un polynôme du second degré défini sur \(\mathbb{R}\) par \(P(x) = ax^2 + bx + c\), avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). On dit que \(P(x)\) est mis sous **forme factorisée** si on peut l'écrire \(P(x) = a(x - x_1)(x - x_2)\), où \(x_1\) et \(x_2\) sont deux réels (éventuellement égaux).

> **REMARQUE**
> Dans le cas où \(P(x)\) admet bien une forme factorisée telle que définie ci-dessus, les réels \(x_1\) et \(x_2\) sont alors les deux racines du polynôme \(P(x)\) et les deux seules. En effet :
> \[ \forall x \in \mathbb{R},\; P(x) = 0 \iff a(x - x_1)(x - x_2) = 0 \iff (x - x_1)(x - x_2) = 0 \text{ (car } a \neq 0) \iff x - x_1 = 0 \text{ ou } x - x_2 = 0 \iff x = x_1 \text{ ou } x = x_2 \]

> **REMARQUE**
> Certains polynômes du second degré ne peuvent pas être mis sous forme factorisée dans \(\mathbb{R}\). Considérons par exemple le polynôme défini sur \(\mathbb{R}\) par \(P(x) = x^2 + 1\). \(\forall x \in \mathbb{R},\; x^2 \geqslant 0\) donc \(x^2 + 1 \geqslant 1 > 0\). Donc l'équation \(P(x) = 0\) n'a pas de solution dans \(\mathbb{R}\) et \(P(x)\) n'a donc pas de racine réelle. Il ne peut donc pas être mis sous forme factorisée, car alors il aurait des racines (raisonnement immédiat par l'absurde).

### 3) Somme et produit des racines

> **THÉORÈME**
> Soit \(P(x) = ax^2 + bx + c\) un polynôme du second degré défini sur \(\mathbb{R}\), avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). Si \(P(x)\) admet deux racines \(x_1\) et \(x_2\) (éventuellement égales), alors on a :
> \[ x_1 + x_2 = -\frac{b}{a} \quad \text{et} \quad x_1 x_2 = \frac{c}{a} \]

> **DÉMONSTRATION**
> Si \(x_1\) et \(x_2\) sont les racines de \(P(x)\), alors pour tout réel \(x\), on a \(P(x) = a(x - x_1)(x - x_2)\). Donc
> \[ P(x) = a(x^2 - x x_2 - x x_1 + x_1 x_2) = a x^2 - a(x_1 + x_2)x + a x_1 x_2. \]
> Or pour tout réel \(x\), on a aussi \(P(x) = a x^2 + b x + c\). La forme développée d'un polynôme étant unique, par identification, on a donc : \(b = -a(x_1 + x_2)\) et \(c = a x_1 x_2\). Soit
> \[ x_1 + x_2 = -\frac{b}{a} \quad \text{et} \quad x_1 x_2 = \frac{c}{a} \quad (a \neq 0). \]

L'un des objectifs de ce chapitre sera de déterminer les racines d'un polynôme du second degré donné sous forme développée. Autrement dit, savoir passer de la forme développée à la forme factorisée, ou encore savoir résoudre une équation dite du second degré. C'est ce que nous allons voir dans la suite. Pour cela, nous allons introduire une troisième forme possible d'un polynôme du second degré, la forme canonique.

### 4) Forme canonique

> **PROPRIÉTÉ & DÉFINITION**
> Soit \(f\) une fonction polynôme du second degré définie sur \(\mathbb{R}\) par \(f(x) = a x^2 + b x + c\), avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). Alors pour tout réel \(x\) :
> \[ f(x) = a(x - \alpha)^2 + \beta, \quad \text{avec } \alpha = -\frac{b}{2a} \text{ et } \beta = f(\alpha) \]
> Cette écriture est appelée la **forme canonique** de \(f\).

> **EXEMPLE**
> Déterminons la forme canonique de \(3x^2 + 6x + 1\).
> \[ \forall x \in \mathbb{R},\; 3x^2 + 6x + 1 = 3(x^2 + 2x) + 1 = 3[(x + 1)^2 - 1^2] + 1 = 3[(x + 1)^2 - 1] + 1 = 3(x + 1)^2 - 3 + 1 = 3(x + 1)^2 - 2 \]

> **DÉMONSTRATION**
> Généralisons le procédé pour tout polynôme du second degré :
> Soit \(f(x) = a x^2 + b x + c\) un polynôme du second degré avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). Pour tout réel \(x\), on a :
> \[
> \begin{aligned}
> f(x) &= a x^2 + b x + c \\
> &= a\left( x^2 + \frac{b}{a} x \right) + c \quad (\text{car } a \neq 0) \\
> &= a\left[ \left( x + \frac{b}{2a} \right)^2 - \left( \frac{b}{2a} \right)^2 \right] + c \\
> &= a\left[ \left( x + \frac{b}{2a} \right)^2 - \frac{b^2}{4a^2} \right] + c \\
> &= a\left( x + \frac{b}{2a} \right)^2 - \frac{b^2}{4a} + \frac{4ac}{4a} \\
> &= a\left( x + \frac{b}{2a} \right)^2 - \frac{b^2 - 4ac}{4a} \\
> &= a(x - \alpha)^2 + \beta, \quad \text{avec } \alpha = -\frac{b}{2a} \text{ et } \beta = -\frac{b^2 - 4ac}{4a}
> \end{aligned}
> \]
> (On vérifie facilement par le calcul que \(f(\alpha) = \beta\))

> **EXERCICE**
> Déterminer la forme canonique des polynômes définis sur \(\mathbb{R}\) par \(P(x) = 3x^2 - 6x + 1\) et \(R(x) = -2x^2 + 5x + 3\).

### 5) Variations et courbe représentative

> **PROPRIÉTÉ**
> Soit \(f\) une fonction polynôme du second degré dont la forme canonique est \(f(x) = a(x - \alpha)^2 + \beta\), avec \(a\), \(\alpha\) et \(\beta\) des réels et \(a \neq 0\). Alors son tableau de variation est :
>
> **Si \(a > 0\)**
> \[
> \begin{array}{c|ccc}
> x & -\infty & \alpha & +\infty \\
> \hline
> f & & \beta & \\
> & \searrow & & \nearrow
> \end{array}
> \]
>
> **Si \(a < 0\)**
> \[
> \begin{array}{c|ccc}
> x & -\infty & \alpha & +\infty \\
> \hline
> f & & \beta & \\
> & \nearrow & & \searrow
> \end{array}
> \]

> **DÉMONSTRATION**
> Montrons que si \(a > 0\), alors \(f\) est strictement croissante sur \([\alpha ; +\infty[\) :
> Soient \(x_1\) et \(x_2\) deux réels tels que \(\alpha \leqslant x_1 < x_2\). Alors \(0 \leqslant x_1 - \alpha < x_2 - \alpha\). Or la fonction carrée est strictement croissante sur \([0 ; +\infty[\), donc des réels positifs et leurs images sont rangées dans le même ordre. Donc \((x_1 - \alpha)^2 < (x_2 - \alpha)^2\). Or \(a\) est un réel strictement positif, donc \(a(x_1 - \alpha)^2 < a(x_2 - \alpha)^2\). Et enfin, par somme avec \(\beta\), on a \(a(x_1 - \alpha)^2 + \beta < a(x_2 - \alpha)^2 + \beta\), soit \(f(x_1) < f(x_2)\). Par définition, \(f\) est donc strictement croissante sur \([\alpha ; +\infty[\). (On démontre de même les variations sur \(]-\infty ; \alpha]\) et lorsque \(a < 0\)).

> **Représentation graphique :**
> Dans un repère \((O; \vec{i}, \vec{j})\) du plan, la courbe représentative d'une fonction polynôme du second degré de la forme \(x \mapsto a(x - \alpha)^2 + \beta\) (\(a\), \(\alpha\) et \(\beta\) réels et \(a \neq 0\)), est une **parabole** de sommet le point \(S(\alpha ; \beta)\), et qui admet pour axe de symétrie la droite d'équation \(x = \alpha\).

## II Équations du second degré

### 1) Définition

> **DÉFINITION**
> On appelle **équation du second degré** toute équation pouvant se ramener à la forme \(a x^2 + b x + c = 0\) avec \(a\), \(b\) et \(c\) des réels tels que \(a \neq 0\).

### 2) Premiers exemples

On sait déjà résoudre certaines équations du second degré : toutes celles n'ayant que deux termes par exemple, ou celles dont le polynôme du second degré est déjà factorisé. Résolvons-les avec les méthodes vues en Seconde ou au collège :

**Ex 1 :** résoudre dans \(\mathbb{R}\) l'équation \(x^2 = 3\) (\(b = 0\))
\[ \forall x \in \mathbb{R},\; x^2 = 3 \iff x = \sqrt{3} \text{ ou } x = -\sqrt{3} \]

**Ex 2 :** résoudre dans \(\mathbb{R}\) l'équation \(4x^2 - 2x = 0\) (\(c = 0\))
\[ \forall x \in \mathbb{R},\; 4x^2 - 2x = 0 \iff 2x(2x - 1) = 0 \iff 2x = 0 \text{ ou } 2x - 1 = 0 \iff x = 0 \text{ ou } x = \frac{1}{2} \]

**Ex 3 :** résoudre dans \(\mathbb{R}\) l'équation \(-5x^2 = 0\) (\(b = 0\) et \(c = 0\))
\[ \forall x \in \mathbb{R},\; -5x^2 = 0 \iff x^2 = 0 \iff x = 0 \]

**Ex 4 :** résoudre dans \(\mathbb{R}\) l'équation \((x - 3)(x + 1) = 0\) (forme factorisée)
\[ \forall x \in \mathbb{R},\; (x - 3)(x + 1) = 0 \iff x - 3 = 0 \text{ ou } x + 1 = 0 \iff x = 3 \text{ ou } x = -1 \]

**Ex 5 :** résoudre dans \(\mathbb{R}\) l'équation \((3x + 2)^2 = 0\) (carré nul)
\[ \forall x \in \mathbb{R},\; (3x + 2)^2 = 0 \iff 3x + 2 = 0 \iff x = -\frac{2}{3} \]

**Ex 6 :** résoudre dans \(\mathbb{R}\) l'équation \(x^2 + 5 = 0\) (pas de solution réelle)
\[ \forall x \in \mathbb{R},\; x^2 + 5 = 0 \iff x^2 = -5. \text{ Or } \forall x \in \mathbb{R},\; x^2 \geqslant 0, \text{ donc l'équation } x^2 + 5 = 0 \text{ n'a pas de solution dans } \mathbb{R} \]

**Ex 7 :** résoudre dans \(\mathbb{R}\) l'équation \((4 - 5x)^2 + 3 = 0\) (idem, pas besoin de développer !)
\[ \forall x \in \mathbb{R},\; (4 - 5x)^2 + 3 = 0 \iff (4 - 5x)^2 = -3. \text{ Or } \forall x \in \mathbb{R},\; (4 - 5x)^2 \geqslant 0, \text{ donc l'équation } (4 - 5x)^2 + 3 = 0 \text{ n'a pas de solution dans } \mathbb{R} \]

**Ex 8 :** résoudre dans \(\mathbb{R}\) l'équation \(x^2 - 2x + 1 = 0\) (identité remarquable)
\[ \forall x \in \mathbb{R},\; x^2 - 2x + 1 = 0 \iff (x - 1)^2 = 0 \iff x - 1 = 0 \iff x = 1 \]

Considérons maintenant cette équation :
\[ -2x^2 + x + 1 = 0 \]
Ici, le membre de droite est nul et le membre de gauche est constitué de trois termes, sans facteur commun ni reconnaissance d'une identité remarquable. Comment résoudre cette équation ? En utilisant (pour le moment !) la forme canonique :
\[
\begin{aligned}
\forall x \in \mathbb{R},\; -2x^2 + x + 1 = 0 &\iff -2\left( x^2 + \frac{1}{2} x \right) + 1 = 0 \\
&\iff -2\left[ \left( x + \frac{1}{4} \right)^2 - \frac{1}{16} \right] + 1 = 0 \\
&\iff -2\left( x + \frac{1}{4} \right)^2 + \frac{1}{8} + \frac{8}{8} = 0 \\
&\iff -2\left( x - \frac{1}{4} \right)^2 + \frac{9}{8} = 0 \\
&\iff -2\left( x - \frac{1}{4} \right)^2 = -\frac{9}{8} \\
&\iff \left( x - \frac{1}{4} \right)^2 = \frac{9}{16} \\
&\iff \left( x - \frac{1}{4} \right)^2 - \frac{9}{16} = 0 \\
&\iff \left( x - \frac{1}{4} - \frac{3}{4} \right)\left( x - \frac{1}{4} + \frac{3}{4} \right) = 0 \\
&\iff (x - 1)\left( x + \frac{1}{2} \right) = 0 \\
&\iff x - 1 = 0 \text{ ou } x = -\frac{1}{2}
\end{aligned}
\]
Ouf ! En passant par la forme canonique, on a réussi à factoriser le membre de gauche pour résoudre l'équation.

### 3) Généralisation

Généralisons ce procédé afin d'obtenir notre théorème :
Soient \(a\), \(b\) et \(c\) trois réels tels que \(a \neq 0\).
\[
\begin{aligned}
\forall x \in \mathbb{R},\; a x^2 + b x + c = 0 &\iff a\left( x + \frac{b}{2a} \right)^2 - \frac{b^2 - 4ac}{4a} = 0 \quad (\text{d'après la forme canonique}) \\
&\iff a\left[ \left( x + \frac{b}{2a} \right)^2 - \frac{b^2 - 4ac}{4a^2} \right] = 0 \\
&\iff \left( x + \frac{b}{2a} \right)^2 - \frac{b^2 - 4ac}{4a^2} = 0 \quad (\text{car } a \neq 0) \\
&\iff \left( x + \frac{b}{2a} \right)^2 = \frac{b^2 - 4ac}{4a^2}
\end{aligned}
\]

Posons \(\Delta = b^2 - 4ac\). Ainsi :
\[ \forall x \in \mathbb{R},\; a x^2 + b x + c = 0 \iff \left( x + \frac{b}{2a} \right)^2 = \frac{\Delta}{4a^2} \iff \left( x + \frac{b}{2a} \right)^2 = \frac{\Delta}{(2a)^2} \]

* **Si \(\Delta < 0\)** alors \(\frac{\Delta}{(2a)^2} < 0\) (car \(\forall a \neq 0,\; (2a)^2 > 0\)). Or \(\forall x \in \mathbb{R},\; \left( x + \frac{b}{2a} \right)^2 \geqslant 0\). Ainsi, si \(\Delta < 0\), l'équation \(a x^2 + b x + c = 0\) n'a pas de solution dans \(\mathbb{R}\).

* **Si \(\Delta = 0\)**, alors \(\frac{\Delta}{(2a)^2} = 0\). Ainsi :
\[ \forall x \in \mathbb{R},\; a x^2 + b x + c = 0 \iff \left( x + \frac{b}{2a} \right)^2 = 0 \iff x + \frac{b}{2a} = 0 \iff x = -\frac{b}{2a} \]
Ainsi, si \(\Delta = 0\), l'équation \(a x^2 + b x + c = 0\) admet une unique solution réelle.

* **Si \(\Delta > 0\)**, alors \(\frac{\Delta}{(2a)^2} = \left( \frac{\sqrt{\Delta}}{2a} \right)^2\). Ainsi :
\[
\begin{aligned}
\forall x \in \mathbb{R},\; a x^2 + b x + c = 0 &\iff \left( x + \frac{b}{2a} \right)^2 = \left( \frac{\sqrt{\Delta}}{2a} \right)^2 \\
&\iff \left( x + \frac{b}{2a} \right)^2 - \left( \frac{\sqrt{\Delta}}{2a} \right)^2 = 0 \\
&\iff \left( x + \frac{b}{2a} - \frac{\sqrt{\Delta}}{2a} \right)\left( x + \frac{b}{2a} + \frac{\sqrt{\Delta}}{2a} \right) = 0 \\
&\iff \left( x + \frac{b - \sqrt{\Delta}}{2a} \right)\left( x + \frac{b + \sqrt{\Delta}}{2a} \right) = 0 \\
&\iff x + \frac{b - \sqrt{\Delta}}{2a} = 0 \text{ ou } x + \frac{b + \sqrt{\Delta}}{2a} = 0 \\
&\iff x = -\frac{b - \sqrt{\Delta}}{2a} \text{ ou } x = -\frac{b + \sqrt{\Delta}}{2a} \\
&\iff x = \frac{-b + \sqrt{\Delta}}{2a} \text{ ou } x = \frac{-b - \sqrt{\Delta}}{2a}
\end{aligned}
\]
Ainsi, si \(\Delta > 0\), l'équation \(a x^2 + b x + c = 0\) admet deux solutions réelles et distinctes : \(\frac{-b - \sqrt{\Delta}}{2a}\) et \(\frac{-b + \sqrt{\Delta}}{2a}\).

### 4) Discriminant et énoncé du théorème

> **DÉFINITION**
> Soit \(a x^2 + b x + c\) un polynôme du second degré défini sur \(\mathbb{R}\), avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). Le réel \(b^2 - 4ac\), noté \(\Delta\), est appelé le **discriminant** du polynôme \(a x^2 + b x + c\).

> **THÉORÈME**
> Soient \(a\), \(b\) et \(c\) des réels, avec \(a \neq 0\), et \(\Delta\) le réel défini par \(\Delta = b^2 - 4ac\). Soit \((E)\) l'équation \(a x^2 + b x + c = 0\).
> * Si \(\Delta < 0\), alors \((E)\) n'a pas de solution réelle.
> * Si \(\Delta = 0\), alors \((E)\) admet une unique solution réelle \(x_0 = -\frac{b}{2a}\). On dit que cette solution est **double**.
> * Si \(\Delta > 0\), alors \((E)\) admet deux solutions réelles : \(x_1 = \frac{-b - \sqrt{\Delta}}{2a}\) et \(x_2 = \frac{-b + \sqrt{\Delta}}{2a}\).

> **DÉMONSTRATION**
> La démonstration a été faite dans le 3).

> **REMARQUE**
> Les solutions, lorsqu'elles existent, sont les abscisses des points d'intersection de la courbe représentative de la fonction \(x \mapsto a x^2 + b x + c\) et de l'axe des abscisses.

> **VOCABULAIRE**
> Les solutions de l'équation \(a x^2 + b x + c = 0\) sont les **racines** du polynôme \(a x^2 + b x + c\). Attention à ne pas confondre ces deux mots de vocabulaire !

### 5) Exemples rédigés

> **EXEMPLE**
> **Ex 1 (cas où \(\Delta > 0\)) :** Résoudre dans \(\mathbb{R}\) l'équation \(-2x^2 + x + 1 = 0\).
> \(-2x^2 + x + 1\) est un polynôme du second degré dont le discriminant \(\Delta\) est :
> \[ \Delta = 1^2 - 4 \times (-2) \times 1 = 1 + 8 = 9 \]
> \(\Delta > 0\) donc l'équation \(-2x^2 + x + 1 = 0\) admet deux solutions réelles qui sont :
> \[ x_1 = \frac{-1 - \sqrt{9}}{2 \times (-2)} = \frac{-1 - 3}{-4} = \frac{-4}{-4} = 1 \quad \text{et} \quad x_2 = \frac{-1 + \sqrt{9}}{2 \times (-2)} = \frac{-1 + 3}{-4} = \frac{2}{-4} = -\frac{1}{2} \]
> Ainsi, les solutions de l'équation \(-2x^2 + x + 1 = 0\) sont \(-\frac{1}{2}\) et \(1\).

> **EXEMPLE**
> **Ex 2 (cas où \(\Delta < 0\)) :** Résoudre dans \(\mathbb{R}\) l'équation \(3x^2 - 7x + 5 = 0\).
> \(3x^2 - 7x + 5\) est un polynôme du second degré dont le discriminant \(\Delta\) est :
> \[ \Delta = (-7)^2 - 4 \times 3 \times 5 = 49 - 60 = -11 \]
> \(\Delta < 0\) donc l'équation \(3x^2 - 7x + 5 = 0\) n'admet pas de solution dans \(\mathbb{R}\).

> **EXEMPLE**
> **Ex 3 (cas où \(\Delta = 0\)) :** Résoudre dans \(\mathbb{R}\) l'équation \(-x^2 - 8x - 16 = 0\).
> \(-x^2 - 8x - 16\) est un polynôme du second degré dont le discriminant \(\Delta\) est :
> \[ \Delta = (-8)^2 - 4 \times (-1) \times (-16) = 64 - 64 = 0 \]
> \(\Delta = 0\) donc l'équation \(-x^2 - 8x - 16 = 0\) admet une unique solution dans \(\mathbb{R}\) qui est
> \[ x_0 = \frac{-(-8)}{2 \times (-1)} = \frac{8}{-2} = -4 \]

> **REMARQUE**
> Lorsque l'on obtient \(\Delta = 0\), cela signifie que l'on est passé à côté d'une identité remarquable (le vérifier avec l'Ex 3).

## III Signe d'un trinôme et inéquations du second degré

### 1) Conjecture graphique

Faire au tableau les trois configurations possibles si \(a > 0\) puis si \(a < 0\), et conjecturer oralement.

### 2) Énoncé du théorème

> **THÉORÈME**
> Soit \(a x^2 + b x + c\) un trinôme du second degré avec \(a\), \(b\) et \(c\) des réels et \(a \neq 0\). Alors le trinôme \(a x^2 + b x + c\) est toujours du signe de \(a\), sauf entre ses racines lorsqu'elles existent.

> **DÉMONSTRATION**
> * **Cas où \(\Delta < 0\) :** À l'aide de la forme canonique, pour tout réel \(x\),
> \[ a x^2 + b x + c = a\left[ \left( x + \frac{b}{2a} \right)^2 - \frac{\Delta}{4a^2} \right]. \]
> Or \(\forall x \in \mathbb{R},\; \left( x + \frac{b}{2a} \right)^2 \geqslant 0\). De plus, \(\Delta < 0\), donc \(-\frac{\Delta}{4a^2} > 0\). Ainsi, par somme, \(\left( x + \frac{b}{2a} \right)^2 - \frac{\Delta}{4a^2} > 0\), donc le signe de \(a x^2 + b x + c\) est bien celui de \(a\), pour tout réel \(x\).
> * **Cas où \(\Delta = 0\) :** Alors pour tout réel \(x\),
> \[ a x^2 + b x + c = a\left( x + \frac{b}{2a} \right)^2 \]
> et pour tout réel \(x\), \(\left( x + \frac{b}{2a} \right)^2 \geqslant 0\). Donc \(a x^2 + b x + c\) est du signe de \(a\) pour tout réel \(x\) et s'annule en \(-\frac{b}{2a}\).
> * **Cas où \(\Delta > 0\) :** À l'aide de la forme factorisée, pour tout réel \(x\),
> \[ a x^2 + b x + c = a(x - x_1)(x - x_2), \]
> où \(x_1\) et \(x_2\) sont les racines du trinôme. À l'aide d'un tableau de signe, en supposant que \(x_1 < x_2\) :
> \[
> \begin{array}{c|ccccc}
> x & -\infty & x_1 & & x_2 & +\infty \\
> \hline
> x - x_1 & - & 0 & + & & + \\
> x - x_2 & - & & - & 0 & + \\
> (x - x_1)(x - x_2) & + & 0 & - & 0 & + \\
> \hline
> a(x - x_1)(x - x_2) & \text{signe de } a & 0 & \text{signe de } -a & 0 & \text{signe de } a
> \end{array}
> \]

> **EXEMPLE**
> * Déterminer le signe du polynôme \(P(x) = 4x^2 - 5x + 7\) sur \(\mathbb{R}\).
> \(4x^2 - 5x + 7\) est un polynôme du second degré dont le discriminant \(\Delta\) est :
> \[ \Delta = (-5)^2 - 4 \times 4 \times 7 = 25 - 112 = -87 \]
> \(\Delta < 0\) donc \(4x^2 - 5x + 7\) est du signe de \(4\), strictement positif, pour tout réel \(x\).

> **EXEMPLE**
> * Déterminer le signe du polynôme \(Q(x) = -x^2 + 6x + 7\) sur \(\mathbb{R}\).
> \(-x^2 + 6x + 7\) est un polynôme du second degré dont le discriminant \(\Delta\) est :
> \[ \Delta = 6^2 - 4 \times (-1) \times 7 = 36 + 28 = 64 \]
> \(\Delta > 0\) donc \(-x^2 + 6x + 7\) est du signe de \(-1\), strictement négatif, sauf entre ses racines qui sont :
> \[ x_1 = \frac{-6 - \sqrt{64}}{2 \times (-1)} = \frac{-6 - 8}{-2} = \frac{-14}{-2} = 7 \quad \text{et} \quad x_2 = \frac{-6 + \sqrt{64}}{2 \times (-1)} = \frac{-6 + 8}{-2} = \frac{2}{-2} = -1 \]
> Ainsi, le signe de \(Q(x)\) sur \(\mathbb{R}\) est :
> \[
> \begin{array}{c|ccccc}
> x & -\infty & -1 & & 7 & +\infty \\
> \hline
> Q(x) & - & 0 & + & 0 & -
> \end{array}
> \]

### 3) Inéquations du second degré

> **DÉFINITION**
> Soient \(a\), \(b\) et \(c\) des réels avec \(a \neq 0\). Une **inéquation du second degré** à une inconnue \(x\) est une inéquation qui peut s'écrire sous l'une des formes suivantes : \(a x^2 + b x + c > 0\), \(a x^2 + b x + c \geqslant 0\), \(a x^2 + b x + c < 0\) ou \(a x^2 + b x + c \leqslant 0\).

> **REMARQUE**
> Pour résoudre une telle inéquation, on étudie le signe du trinôme \(a x^2 + b x + c\).

> **EXEMPLE**
> Résoudre dans \(\mathbb{R
