---
source_url: "https://www.lyceedadultes.fr/sitepedagogique/documents/math/math1spe/04_fonction_derivee/04_cours_fonction_derivee.pdf"
chapter: "04-derivation"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:56+00:00"
cleaned_at: "2026-05-22T08:28:51+00:00"
---

## La fonction dérivée

### 1 Un problème historique

La notion de fonction dérivée est liée à la notion de fonction et de limite. Lorsque Newton (1643-1727) et Leibniz (1646-1716) créent le calcul différentiel, aucune de ces deux notions ne sont bien définies. Un problème historique va nous permettre d'entrevoir la difficulté de mettre en place la notion de dérivée sans avoir la notion de limite.

**Problème :** Déterminer la vitesse instantanée d'un objet en chute libre. On lâche une pierre à \(t = 0\) s. Quelle est sa vitesse instantanée au bout d'une seconde ?

Depuis Galilée on sait que la vitesse d'une pierre en chute libre, si l'on néglige la force de frottement, ne dépend pas de sa masse. Galilée a pu établir alors que la position de l'objet était proportionnelle au carré du temps écoulé.

\[
z(t) = \frac{1}{2}gt^2 = 5t^2 \quad \text{avec } g = 10 \text{ m·s}^{-2}
\]

Pour calculer la vitesse instantanée en \(t = 1\), on mesure la distance entre les instants \(t = 1\) et \(t = 1 + dt\), où l'intervalle de temps \(dt\) est le plus petit possible (quantité infinitésimale).

\[
v(1) = \frac{z(1 + dt) - z(1)}{dt}
\]
\[
v(1) = \frac{5(1 + dt)^2 - 5}{dt}
\]
\[
v(1) = \frac{5 + 10dt + 5dt^2 - 5}{dt}
\]
\[
v(1) = 10 + 5dt
\]

Pour Newton la vitesse en \(t = 1\) s est de \(10 \text{ m·s}^{-1}\). Mais la vitesse est-elle exactement égale à \(10 \text{ m·s}^{-1}\) ou d'environ \(10 \text{ m·s}^{-1}\) ?

* Si la vitesse est exactement de \(10 \text{ m·s}^{-1}\) alors \(dt = 0\)
* mais si \(dt = 0\), la notion de vitesse instantanée n'a aucun sens : le dénominateur est nul.
* Si la vitesse instantanée est d'environ \(10 \text{ m·s}^{-1}\) comment calculer la vitesse exacte ?

Ce blocage ne fut résolu qu'au XIXe siècle avec la notion de limite. Si cette notion de limite est cette fois rigoureuse, elle a malheureusement complexifié le problème de départ. Avec ce nouveau concept de limite, la vitesse instantanée en \(t = 1\) vaut :

\[
v(1) = \lim_{dt \to 0} \frac{dz}{dt}
\]

La vitesse en 1 est la limite quand \(dt\) tend vers 0 de la variation d'altitude, \(dz\), sur la variation de temps \(dt\).

**Remarque :** La notion de limite sera davantage développée en terminale. Pour ce chapitre nous nous contenterons d'utiliser la méthode intuitive de Newton.

### 2 Le nombre dérivé

#### 2.1 Définition

> **Définition 1 :** Soit la fonction \(f\) définie sur un intervalle ouvert \(I\) contenant \(a\).
> * On appelle taux de variation (ou taux d'accroissement) de la fonction \(f\) entre \(a\) et \(a + h\), le nombre \(t(h)\) défini par :
> \[
> t(h) = \frac{f(a + h) - f(a)}{h}
> \]
> * La fonction \(f\) admet un nombre dérivé, noté \(f'(a)\), en \(a\), si et seulement si, le taux de variation de la fonction \(f\) en \(a\) admet une limite finie, c'est à dire :
> \[
> f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}
> \]
> ou encore
> \[
> f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}
> \]

**Attention :** La notation \(h \to 0\) signifie que \(h\) tend vers zéro sans l'atteindre (\(h \neq 0\)).

**Remarque :**
* On utilisera par la suite la première notation.
* Les physiciens utilisent la notation appelée différentielle : \(f'(a) = \frac{df}{dx}(a)\)

#### 2.2 Exemples

Deux exemples graphiques pour montrer la signification du nombre dérivé.

On donne la courbe \(\mathcal{C}_f\) d'une fonction \(f\). En chacun des points indiqués, la courbe admet une tangente qui est tracée. La fonction \(f\) admet donc des nombres dérivés en ces points. Lire, en se servant du quadrillage les nombres suivants :
* \(f(-4)\) et \(f'(-4)\)
* \(f(2)\) et \(f'(2)\)
* \(f(6)\) et \(f'(6)\)

On lit les images et les nombres dérivés suivants :
\[
\begin{cases}
f(-4) = 3 \\
f'(-4) = \frac{1}{1} = 1
\end{cases}
\quad
\begin{cases}
f(-2) = 4 \\
f'(2) = \frac{(-1)}{2} = -\frac{1}{2}
\end{cases}
\quad
\begin{cases}
f(6) = 0 \\
f'(6) = \frac{(-2)}{1} = -2
\end{cases}
\]

On donne la courbe \(\mathcal{C}_g\) d'une fonction \(g\). En chacun des points indiqués, la courbe admet une tangente qui est tracée. La fonction \(g\) admet donc des nombres dérivés en ces points. Lire, en se servant du quadrillage les nombres suivants :
* \(g(-2)\) et \(g'(-2)\)
* \(g(0)\) et \(g'(0)\)
* \(g(1)\) et \(g'(1)\)

On lit les images et les nombres dérivés suivants :
\[
\begin{cases}
g(-2) = -1 \\
g'(-2) = 0
\end{cases}
\quad
\begin{cases}
g(0) = 1 \\
g'(0) = \frac{(-1)}{2} = -\frac{1}{2}
\end{cases}
\quad
\begin{cases}
g(1) = 1,5 \\
g'(1) = \frac{2}{1} = 2
\end{cases}
\]

### 3 Fonction dérivée. Dérivée des fonctions élémentaires

#### 3.1 Fonction dérivée

> **Définition 2 :** Soit une fonction \(f\) définie sur un intervalle \(I\). Si la fonction \(f\) admet un nombre dérivé en tout point de \(I\), on dit que la fonction \(f\) est dérivable sur \(I\). La fonction, notée \(f'\), définie sur \(I\) qui à tout \(x\) associe son nombre dérivé est appelée fonction dérivée de \(f\).

**Remarque :** Le but du paragraphe suivant est de déterminer les fonctions dérivées des fonctions élémentaires puis d'établir des règles opératoires afin de pouvoir déterminer la dérivée d'une fonction quelconque.

#### 3.2 Fonction dérivée des fonctions élémentaires

##### 3.2.1 Fonction affine

Soit \(f\) la fonction affine suivante : \(f(x) = ax + b\)

Déterminons le taux de variation en \(x\), pour \(h \neq 0\) :
\[
\forall x \in \mathbb{R},\quad t(h) = \frac{f(x + h) - f(x)}{h} = \frac{a(x + h) + b - ax - b}{h} = \frac{ah}{h} = a
\]

On passe à la limite :
\[
\forall x \in \mathbb{R},\quad f'(x) = \lim_{h \to 0} t(h) = \lim_{h \to 0} a = a
\]

##### 3.2.2 Fonction carrée

Soit \(f\) la fonction carrée : \(f(x) = x^2\)

Déterminons le taux de variation en \(x\), pour \(h \neq 0\) :
\[
\forall x \in \mathbb{R},\quad t(h) = \frac{f(x + h) - f(x)}{h} = \frac{(x + h)^2 - x^2}{h} = \frac{x^2 + 2xh + h^2 - x^2}{h} = \frac{h(2x + h)}{h} = 2x + h
\]

On passe à la limite :
\[
\forall x \in \mathbb{R},\quad f'(x) = \lim_{h \to 0} t(h) = \lim_{h \to 0} 2x + h = 2x
\]

##### 3.2.3 Fonction puissance (admis)

\(f(x) = x^n\), \(n \in \mathbb{N}^*\) est dérivable sur \(\mathbb{R}\) et \(f'(x) = nx^{n-1}\)

**Exemple :** Soit \(f(x) = x^5\) on a alors \(f'(x) = 5x^4\).

##### 3.2.4 Fonction inverse

Soit \(f\) la fonction inverse : \(f(x) = \frac{1}{x}\)

Déterminons le taux de variation en \(x \neq 0\), pour \(h \neq 0\) :
\[
t(h) = \frac{f(x + h) - f(x)}{h} = \frac{\frac{1}{x + h} - \frac{1}{x}}{h} = \frac{\frac{x - x - h}{x(x + h)}}{h} = \frac{-h}{h \times x(x + h)} = -\frac{1}{x(x + h)}
\]

On passe à la limite :
\[
\forall x \in \mathbb{R}^*_+ \text{ ou } \mathbb{R}^*_-,\quad f'(x) = \lim_{h \to 0} t(h) = \lim_{h \to 0} -\frac{1}{x(x + h)} = -\frac{1}{x^2}
\]

##### 3.2.5 Fonction puissance inverse (admis)

\(f(x) = \frac{1}{x^n}\), \(n \in \mathbb{N}^*\) est dérivable sur \(\mathbb{R}^*_-\) ou sur \(\mathbb{R}^*_+\) et :
\[
f'(x) = -\frac{n}{x^{n+1}}
\]

**Exemple :** Soit \(f(x) = \frac{1}{x^4}\) on a alors \(f'(x) = -\frac{4}{x^5}\).

##### 3.2.6 Fonction racine

Soit \(f\) la fonction racine carrée : \(f(x) = \sqrt{x}\)

**Attention :** La fonction racine est définie mais pas dérivable en 0. Sa courbe représentative admet une tangente verticale en 0 et donc l'équation de la tangente en 0 n'admet pas de coefficient directeur.

Déterminons le taux de variation en \(x \neq 0\), pour \(h \neq 0\) :
\[
t(h) = \frac{f(x + h) - f(x)}{h} = \frac{\sqrt{x + h} - \sqrt{x}}{h} = \frac{(\sqrt{x + h} - \sqrt{x})(\sqrt{x + h} + \sqrt{x})}{h(\sqrt{x + h} + \sqrt{x})} = \frac{x + h - x}{h(\sqrt{x + h} + \sqrt{x})} = \frac{1}{\sqrt{x + h} + \sqrt{x}}
\]

On passe à la limite :
\[
\forall x \in \mathbb{R}^*_+,\quad f'(x) = \lim_{h \to 0} t(h) = \lim_{h \to 0} \frac{1}{\sqrt{x + h} + \sqrt{x}} = \frac{1}{2\sqrt{x}}
\]

#### 3.3 Règles de dérivation

Dans ce paragraphe, on considère deux fonctions \(u\) et \(v\), dérivables sur \(I\), et \(\lambda \in \mathbb{R}\).

##### 3.3.1 Dérivée de la somme

La dérivée de la somme est la somme des dérivées car \((u + v)(x) = u(x) + v(x)\).

\[
(u + v)' = u' + v'
\]

**Exemple :** Soit la fonction \(f\) telle que : \(f(x) = x^2 + \frac{1}{x}\). En appliquant la dérivée de la somme :
\[
f'(x) = 2x + \left(-\frac{1}{x^2}\right) = 2x - \frac{1}{x^2}
\]

##### 3.3.2 Produit par un scalaire

La dérivée du produit par un scalaire est le produit du scalaire par la dérivée car \((\lambda u)(x) = \lambda u(x)\).

\[
(\lambda u)' = \lambda u'
\]

**Exemple :** Soient \(f(x) = 3x^4\) et \(g(x) = 5x^3 + 12x^2 - 7x + 3\). En appliquant le produit par un scalaire :
\[
f'(x) = 3(4x^3) = 12x^3
\]
En appliquant la somme et le produit par un scalaire :
\[
g'(x) = 15x^2 + 24x - 7
\]

##### 3.3.3 Dérivée du produit

**Attention :** La démonstration n'est pas au programme. Elle est donnée ici à titre indicatif.

Calculons le taux de variation de \((uv)(x) = u(x)v(x)\), pour \(h \neq 0\) :
\[
t(h) = \frac{(uv)(x + h) - (uv)(x)}{h} = \frac{u(x + h)v(x + h) - u(x)v(x)}{h}
\]

On retranche puis on ajoute un même terme :
\[
t(h) = \frac{u(x + h)v(x + h) - u(x)v(x + h) + u(x)v(x + h) - u(x)v(x)}{h}
\]
\[
t(h) = \frac{v(x + h)[u(x + h) - u(x)] + u(x)[v(x + h) - v(x)]}{h}
\]
\[
t(h) = v(x + h) \times \frac{u(x + h) - u(x)}{h} + u(x) \times \frac{v(x + h) - v(x)}{h}
\]

On passe ensuite à la limite :
\[
\lim_{h \to 0} t(h) = \lim_{h \to 0} \frac{(uv)(x + h) - (uv)(x)}{h}
\]
\[
= \lim_{h \to 0} \left[ v(x + h) \times \frac{u(x + h) - u(x)}{h} + u(x) \times \frac{v(x + h) - v(x)}{h} \right]
\]
\[
= \lim_{h \to 0} v(x + h) \times \lim_{h \to 0} \frac{u(x + h) - u(x)}{h} + \lim_{h \to 0} u(x) \times \lim_{h \to 0} \frac{v(x + h) - v(x)}{h}
\]
\[
= v(x) u'(x) + u(x) v'(x)
\]

\[
(uv)' = u'v + uv'
\]

**Attention :** La dérivée du produit n'est malheureusement pas le produit des dérivées !

**Exemple :** Soit la fonction \(f\) définie sur \(\mathbb{R}_+\) telle que : \(f(x) = (3x + 1)\sqrt{x}\). \(f\) dérivable sur \(\mathbb{R}^*_+\) et :
\[
f'(x) = 3\sqrt{x} + (3x + 1)\frac{1}{2\sqrt{x}} = \frac{6x + 3x + 1}{2\sqrt{x}} = \frac{9x + 1}{2\sqrt{x}}
\]

##### 3.3.4 Dérivée de l'inverse

**Attention :** La démonstration n'est pas au programme. Elle est donnée ici à titre indicatif.

Calculons le taux de variation de \(\left(\frac{1}{v}\right)(x) = \frac{1}{v(x)}\), pour \(h \neq 0\) et \(v(x) \neq 0\) :
\[
t(h) = \frac{\frac{1}{v(x + h)} - \frac{1}{v(x)}}{h} = \frac{\frac{v(x) - v(x + h)}{v(x)v(x + h)}}{h} = -\frac{v(x + h) - v(x)}{h} \times \frac{1}{v(x + h)v(x)}
\]

On passe ensuite à la limite :
\[
\lim_{h \to 0} t(h) = \lim_{h \to 0} \left[ -\frac{v(x + h) - v(x)}{h} \times \frac{1}{v(x + h)v(x)} \right]
\]
\[
= \lim_{h \to 0} -\frac{v(x + h) - u(x)}{h} \times \lim_{h \to 0} \frac{1}{v(x + h)v(x)} = -\frac{v'(x)}{v^2(x)}
\]

\[
\left(\frac{1}{v}\right)' = -\frac{v'}{v^2}
\]

**Exemple :** Soit la fonction \(f\) définie et dérivable sur \(\mathbb{R}\) par : \(f(x) = \frac{1}{x^2 + x + 1}\). En appliquant la règle de l'inverse :
\[
f'(x) = -\frac{2x + 1}{(x^2 + x + 1)^2}
\]

##### 3.3.5 Dérivée du quotient

On cherche la dérivée du produit par l'inverse : \(\left(\frac{u}{v}\right)' = \left(u \times \frac{1}{v}\right)'\). D'après la règle du produit, on obtient :
\[
\left(\frac{u}{v}\right)' = u' \times \frac{1}{v} + u \times -\frac{v'}{v^2} = \frac{u'v - uv'}{v^2}
\]

\[
\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}
\]

**Exemple :** Soit la fonction \(f\) définie et dérivable sur \(\mathbb{R}\) par : \(f(x) = \frac{2x + 5}{x^2 + 1}\). En appliquant la dérivée du quotient :
\[
f'(x) = \frac{2(x^2 + 1) - 2x(2x + 5)}{(x^2 + 1)^2} = \frac{2x^2 + 2 - 4x^2 - 10x}{(x^2 + 1)^2} = \frac{-2x^2 - 10x + 2}{(x^2 + 1)^2}
\]

##### 3.3.6 Dérivée de la puissance et de la racine

**Attention :** On donne sans démonstration la dérivée de la puissance et de la racine. Dans ce dernier cas, la fonction \(u\) doit être positive sur \(I\).

\[
(u^n)' = n u' u^{n-1} \quad \text{et} \quad (\sqrt{u})' = \frac{u'}{2\sqrt{u}}
\]

**Exemple :** Soient \(f(x) = (3x - 5)^5\) et \(g(x) = \sqrt{x^2 + 1}\). En appliquant les règles sur la dérivée de la puissance et de la racine, on a :
\[
f'(x) = 5 \times 3 (3x - 5)^4 = 15(3x - 5)^4
\]
\[
g'(x) = \frac{2x}{2\sqrt{x^2 + 1}} = \frac{x}{\sqrt{x^2 + 1}}
\]

##### 3.3.7 Dérivée de la composée (hors programme)

**Attention :** On donne sans démonstration la dérivée de la composée. Il y a des conditions que l'on explicitera pas ici.

\[
(v \circ u)' = [v(u)]' = u' \times v'(u) = u' \times v' \circ u
\]

**Exemple :** Soit \(f(x) = \sin(x^2 + x - 1)\) on donne \(\sin' = \cos\). En appliquant les règles sur la dérivée de la composée, on a :
\[
f'(x) = (2x + 1) \cos(x^2 + x - 1)
\]

#### 3.4 Tableau récapitulatif

**Tableau des dérivées des fonctions élémentaires et sinus, cosinus.**

| Fonction | \(D_f\) | Dérivée | \(D'\) |
|:---:|:---:|:---:|:---:|
| \(f(x) = k\) | \(\mathbb{R}\) | \(f'(x) = 0\) | \(\mathbb{R}\) |
| \(f(x) = x\) | \(\mathbb{R}\) | \(f'(x) = 1\) | \(\mathbb{R}\) |
| \(f(x) = x^n\) \(n \in \mathbb{N}^*\) | \(\mathbb{R}\) | \(f'(x) = nx^{n-1}\) | \(\mathbb{R}\) |
| \(f(x) = \frac{1}{x}\) | \(\mathbb{R}^*\) | \(f'(x) = -\frac{1}{x^2}\) | \(]-\infty;0[\) ou \(]0;+\infty[\) |
| \(f(x) = \frac{1}{x^n}\) \(n \in \mathbb{N}^*\) | \(\mathbb{R}^*\) | \(f'(x) = -\frac{n}{x^{n+1}}\) | \(]-\infty;0[\) ou \(]0;+\infty[\) |
| \(f(x) = \sqrt{x}\) | \([0;+\infty[\) | \(f'(x) = \frac{1}{2\sqrt{x}}\) | \(]0;+\infty[\) |
| \(f(x) = \sin x\) | \(\mathbb{R}\) | \(f'(x) = \cos x\) | \(\mathbb{R}\) |
| \(f(x) = \cos x\) | \(\mathbb{R}\) | \(f'(x) = -\sin x\) | \(\mathbb{R}\) |

**Tableau des règles de dérivation.**

| Dérivée de la somme | \((u + v)' = u' + v'\) |
|:---:|:---:|
| Dérivée du produit par un scalaire | \((\lambda u)' = \lambda u'\) |
| Dérivée du produit | \((uv)' = u'v + uv'\) |
| Dérivée de l'inverse | \(\left(\frac{1}{v}\right)' = -\frac{v'}{v^2}\) |
| Dérivée du quotient | \(\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}\) |
| Dérivée de la puissance | \((u^n)' = n u' u^{n-1}\) |
| Dérivée de la racine | \((\sqrt{u})' = \frac{u'}{2\sqrt{u}}\) |
| Dérivée de la composée | \((v \circ u)' = u' \times v' \circ u\) |

**Remarque :** Les fonctions polynômes et les fonctions rationnelles sont dérivables sur leur ensemble de définition.

### 4 Interprétations géométrique et numérique

#### 4.1 Équation de la tangente

Soit la courbe \(\mathcal{C}_f\) représentative d'une fonction \(f\) et \((T_a)\) sa tangente en \(x = a\).

Le coefficient directeur de la tangente est égal au nombre dérivé en \(a\). Si on considère un point \(M(x; y)\) quelconque de cette tangente, on obtient alors :
\[
f'(a) = \frac{y - f(a)}{x - a}
\]
\[
y - f(a) = f'(a)(x - a)
\]
\[
y = f'(a)(x - a) + f(a)
\]

> **Théorème 1 :** L'équation de la tangente \((T_a)\) en \(a\) à la courbe \(\mathcal{C}_f\) d'une fonction \(f\) dérivable en \(a\) est égale à :
> \[
> y = f'(a)(x - a) + f(a)
> \]

**Exemple :** Soit \(f\) définie et dérivable sur \(\mathbb{R}\) par : \(f(x) = x^3 - 3x^2 + 3x + 4\). Déterminer l'équation de la tangente au point d'abscisse 2.

L'équation de la tangente au point d'abscisse 2 est : \(y = f'(2)(x - 2) + f(2)\).

On détermine la dérivée : \(f'(x) = 3x^2 - 6x + 3\) et on calcule :
\[
f'(2) = 3 \times 2^2 - 6 \times 2 + 3 = 3
\]
\[
f(2) = 2^3 - 3 \times 2^2 + 3 \times 2 + 4 = 6
\]

On obtient alors l'équation de la tangente suivante :
\[
y = 3(x - 2) + 6 \iff y = 3x - 6 + 6 \iff y = 3x
\]

#### 4.2 Approximation affine

Lorsque \(x\) est proche de \(a\), on peut confondre le point \(M\) sur la courbe \(\mathcal{C}_f\) avec le point \(M'\) de la tangente \((T_a)\) à la courbe en \(a\). On pose \(x = a + h\) avec \(h\) proche de 0. Si on confond le point \(M\) avec le point \(M'\), on a : \(y \approx f(a + h)\). On a alors :
\[
f(a + h) \approx f(a) + h f'(a)
\]

**Exemple :** Déterminer une approximation affine de \(\sqrt{4,03}\).

On pose \(f(x) = \sqrt{x}\), on a \(a = 4\) et \(h = 0,03\). On calcule alors la dérivée en 4.
\[
f'(x) = \frac{1}{2\sqrt{x}} \quad \text{donc} \quad f'(4) = \frac{1}{4}
\]
et donc
\[
f(4,03) \approx f(4) + 0,03 \times \frac{1}{4} \approx 2,0075
\]

On a donc : \(\sqrt{4,03} \approx 2,0075\) (la calculatrice donne 2,007486).

#### 4.3 Cinématique

La cinématique est l'étude du mouvement : position, vitesse, accélération d'un solide en physique. C'est justement l'étude de la vitesse instantanée qui a permis à Newton de concevoir le concept de dérivée. La vitesse est alors la dérivée de l'équation horaire et l'accélération la dérivée de la vitesse par rapport au temps.

**Exemple :** Deux mobiles \(M_1\) et \(M_2\) sont sur l'axe des abscisses animés d'un mouvement dont les lois horaires en fonction du temps \(t\) sont respectivement \(x_1(t) = 2t^2 + t + 4\) et \(x_2(t) = -t^2 + 5t + 8\).

**a)** Déterminer les positions et les vitesses initiales des mobiles \(M_1\) et \(M_2\).

À l'instant initial, on a \(t = 0\), d'où \(x_1(0) = 4\) et \(x_2(0) = 8\).

Pour calculer les vitesses initiales, on dérive :
\[
v_1(t) = x'_1(t) = 4t + 1 \quad \text{et} \quad v_2(t) = x'_2(t) = -2t + 5
\]

On a alors : \(v_1(0) = 1\) et \(v_2(0) = 5\).

**b)** Calculer l'instant \(t_0\) où les deux mobiles se rencontrent. Déterminer la position correspondante.

Pour que les deux mobiles se rencontrent, on doit avoir : \(x_1(t) = x_2(t)\) soit
\[
2t^2 + t + 4 = -t^2 + 5t + 8 \iff 3t^2 - 4t - 4 = 0
\]
\[
\Delta = 16 + 48 = 64 = 8^2
\]
d'où la solution positive \(t_0 = \frac{4 + 8}{6} = 2\).

Les mobiles se rencontrent donc au bout de 2 secondes. Leur position est alors : \(x_1(2) = x_2(2) = 14\).

**c)** Calculer les vitesses respectives de ces deux mobiles à l'instant \(t_0\). Les deux mobiles se croisent-ils ou si l'un dépasse-t-il l'autre ?

On a \(v_1(2) = 9\) et \(v_2(2) = 1\). Comme \(v_1(2) > v_2(2) > 0\) les vitesses ont même signe, donc \(M_1\) double \(M_2\).

**d)** Bilan sur les deux mouvements.

Les accélérations de \(M_1\) et \(M_2\) :
\[
a_1(t) = v'_1(t) = 4 \quad \text{et} \quad a_2(t) = v'_2(t) = -2
\]

\(a_1\) et \(a_2\) sont constantes donc les deux mobiles sont uniformément accélérés.

* \(a_1(t) = 4\) et \(v_1(0) > 0\) : Le mobile \(M_1\) se dirige vers le sens positif en accélérant.
* \(a_2(t) = -2\) et \(v_2(0) > 0\) : Le mobile \(M_2\) se dirige vers le sens positif en décélérant puis rebrousse chemin dans l'autre sens en accélérant.

\(M_2\) rebroussera chemin quand \(v_2(t) = 0 \iff -2t + 5 = 0 \iff t = 2,5\). Au bout de 2,5 s, le mobile \(M_2\) rebrousse chemin.

### 5 Sens de variation d'une fonction

#### 5.1 Aperçu géométrique

Si l'on trace un certain nombre de tangentes à une courbe sans tracer celle-ci, on peut remarquer que la courbe apparaît en filigrane. Voici deux exemples où \(m\) est un paramètre que l'on fait varier de façon à obtenir une famille de tangentes.

* Pour tracer les tangentes \((T_m)\) de la fonction carrée en \(m\), on utilise l'équation de la tangente :
\[
y = f'(m)(x - m) + f(m) \iff y = 2m(x - m) + m^2 \iff y = 2mx - m^2
\]

On trace ensuite ces tangentes \((T_m)\) en faisant varier \(m\) dans l'exemple ci-contre de \(A = -2\) à \(B = 2\) avec un pas de \(P = 0,2\).

On peut proposer l'algorithme suivant pour tracer les tangentes \((T_m)\). On introduit une liste \(L_1\) où l'on stocke toutes les valeurs de \(m\).

```
Variables : I entier, A, B, P réels, L1 liste
Entrées et initialisation
  Effacer dessin
Traitement
  pour I de 1 à (B - A)/P faire
    -2 + P*I → L1(I)
  fin
Sorties :
  Tracer les droites y = 2*L1*x - L1^2
```

Avec la calculatrice, on écrit les droites.

* Autre exemple avec : \(f(x) = -x^3 + 2x\). Les tangentes sont de la forme \(y = (-3m^2 + 2)x + 2m^3\).

#### 5.2 Sens de variation

> **Théorème 2 :** Soit une fonction \(f\) dérivable sur un intervalle \(I\).
> * Si la fonction dérivée \(f'\) est nulle, alors la fonction est constante.
> * Si la fonction dérivée est strictement positive (sauf en quelques points isolés de \(I\) où elle s'annule), alors la fonction \(f\) est strictement croissante sur \(I\).
> * Si la fonction dérivée est strictement négative (sauf en quelques points isolés de \(I\) où elle s'annule), alors la fonction \(f\) est strictement décroissante sur \(I\).

**Exemple :** Déterminer les variations de la fonction \(f\) dérivable sur \(\mathbb{R}\) : \(f(x) = -x^3 + 3x^2 + 2\).

* On calcule la dérivée : \(f'(x) = -3x^2 + 6x = 3x(-x + 2)\)
* On cherche les valeurs qui annulent la dérivée : \(f'(x) = 0 \iff x = 0\) ou \(x = 2\)
* Le signe de \(f'(x)\) est celui d'un trinôme du second degré. On obtient le tableau de variation suivant :

\[
\begin{array}{c|ccccccc}
x & -\infty & & 0 & & 2 & & +\infty \\
\hline
f'(x) & & - & 0 & + & 0 & - & \\
\hline
& +\infty & & & & & 6 & \\
f(x) & & \searrow & & \nearrow & & \searrow & \\
& & & 2 & & & & -\infty \\
\end{array}
\]

#### 5.3 Extremum d'une fonction

>
