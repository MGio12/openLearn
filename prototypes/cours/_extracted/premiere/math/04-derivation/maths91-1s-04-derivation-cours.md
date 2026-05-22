---
source_url: "http://www.maths91.fr/cours1spemaths/1S-04-DERIVATION-cours.pdf"
chapter: "04-derivation"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:46+00:00"
cleaned_at: "2026-05-22T08:24:19+00:00"
---

## I. Nombre dérivé d’une fonction en un réel

Dans cette partie, \(f\) désigne une fonction définie au moins sur un intervalle \(I\), \(\mathcal{C}_f\) désigne sa courbe représentative dans un repère \((O;\vec{i},\vec{j})\) et \(a\) et \(b\) désignent deux réels appartenant à \(I\) avec \(a \neq b\).

### 1) Taux de variation

> **Définition**
> Le taux de variation de la fonction \(f\) entre \(a\) et \(b\) est le quotient \(\frac{f(b)-f(a)}{b-a}\).
> En posant \(b=a+h\), avec \(h\) un réel non nul, ce quotient s’écrit aussi \(\frac{f(a+h)-f(a)}{h}\).

### 2) Interprétation graphique du taux de variation

Notons \(A\) le point de coordonnées \((a;f(a))\) et \(M\) le point de coordonnées \((a+h;f(a+h))\).

Le coefficient directeur de la sécante \((AM)\) est égal à \(\frac{y_M-y_A}{x_M-x_A} = \frac{f(a+h)-f(a)}{a+h-a} = \frac{f(a+h)-f(a)}{h}\).

On a ainsi la propriété suivante :

> **Propriété**
> Le taux de variation de la fonction \(f\) entre \(a\) et \(b\) est égal au coefficient directeur de la sécante \((AM)\).

### 3) Nombre dérivé

> **Définition**
> Supposons que pour les valeurs de \(h\) de plus en plus proches de zéro (mais toujours avec \(h \neq 0\)), les nombres \(\frac{f(a+h)-f(a)}{h}\) deviennent de plus en plus proches d’un nombre réel fixé noté \(l\).
> Alors on dit que la fonction \(f\) est **dérivable** en \(a\) et que \(l\) est le **nombre dérivé** de \(f\) en \(a\).
> Ce nombre dérivé est noté \(f'(a)\).

> **Remarque**
> On peut alors noter \(f'(a) = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}\).

### 4) Interprétation graphique du nombre dérivé

On suppose ici que la fonction \(f\) est dérivable en un réel \(a\) de l’intervalle \(I\).

> **Définition**
> La droite qui passe par le point \(A(a;f(a))\) et dont le coefficient directeur est le réel \(f'(a)\) est la **tangente** à la courbe représentative de \(f\) au point d’abscisse \(a\).

> **Remarque**
> Autrement dit, quand il existe, \(f'(a)\) est le coefficient directeur de la tangente à la courbe représentative de \(f\) au point d’abscisse \(a\).

> **Propriété**
> L’équation de la tangente à la courbe représentative de \(f\) au point d’abscisse \(a\) est :
> \[
> y = f'(a)(x-a) + f(a)
> \]

> **Démonstration**
> Nommons \(T_a\) cette tangente. Par définition, \(f'(a)\) est le coefficient directeur de \(T_a\), donc il existe un réel \(b\) tel que l’équation de \(T_a\) soit \(y = f'(a)x + b\).
> Or \(A(a;f(a)) \in T_a\) donc ses coordonnées vérifient l’équation de \(T_a\), c’est-à-dire \(y_A = f'(a)x_A + b\), d’où \(f(a) = f'(a) \times a + b\), donc \(b = f(a) - a f'(a)\).
> L’équation de \(T_a\) est donc : \(T_a : y = f'(a)x + f(a) - a f'(a)\), soit \(T_a : y = f'(a)(x-a) + f(a)\).

## II. Dérivées des fonctions usuelles

### 1) Exemple

Soit \(f\) la fonction définie sur \(\mathbb{R}\) par \(f(x) = 3x^2 + 1\).

1. Démontrer que \(f\) est dérivable en \(2\) et justifier que \(f'(2) = 12\).
2. Démontrer que \(f\) est dérivable en \(x \in \mathbb{R}\) et justifier que \(f'(x) = 6x\).

Faire alors le lien avec la notion de fonction dérivée et la dérivabilité sur un intervalle.

### 2) Fonction dérivée

> **Définition**
> Soit \(f\) une fonction définie au moins sur un intervalle \(I\).
> La fonction \(f\) est dite **dérivable** sur \(I\) si et seulement si pour tout réel \(a \in I\), \(f\) est dérivable en \(a\).
> La fonction définie sur \(I\) qui, à tout réel \(x\) de \(I\), associe le nombre dérivé de \(f\) en \(x\) est appelée la **fonction dérivée** de \(f\). Cette fonction est notée \(f'\).

> **Exemple**
> Démontrer que la fonction carrée est dérivable sur \(\mathbb{R}\).
> Soit \(x\) un réel. Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\).
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{(x+h)^2 - x^2}{h} = \frac{x^2 + 2xh + h^2 - x^2}{h} = \frac{2xh + h^2}{h} = \frac{h(2x+h)}{h} = 2x + h.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(2x \in \mathbb{R}\) car \(x \in \mathbb{R}\).
> Donc \(f\) est dérivable en \(x\).
> Or ceci est vrai pour tout réel \(x\), donc \(f\) est dérivable sur \(\mathbb{R}\). On a alors, pour tout réel \(x\), \(f'(x) = 2x\).

### 3) Dérivée d’une fonction constante

> **Propriété**
> Soit \(f\) une fonction définie sur \(\mathbb{R}\) par \(f : x \mapsto k\), \(k \in \mathbb{R}\).
> Alors \(f\) est dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = 0\).

> **Démonstration**
> Soit \(x\) un réel. Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\).
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{k - k}{h} = 0.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(0 \in \mathbb{R}\).
> Donc \(f\) est dérivable en \(x\).
> Or ceci est vrai pour tout réel \(x\), donc \(f\) est dérivable sur \(\mathbb{R}\).
> On a alors, pour tout réel \(x\), \(f'(x) = 0\).

### 4) Dérivée d’une fonction affine

> **Propriété**
> Soit \(f\) une fonction définie sur \(\mathbb{R}\) par \(f : x \mapsto ax + b\), \((a;b) \in \mathbb{R}^2\) et \(a\) non nul.
> Alors \(f\) est dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = a\).

> **Démonstration**
> Soit \(x\) un réel. Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\).
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{a(x+h)+b - (ax+b)}{h} = \frac{ax + ah + b - ax - b}{h} = \frac{ah}{h} = a.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(a \in \mathbb{R}\).
> Donc \(f\) est dérivable en \(x\).
> Or ceci est vrai pour tout réel \(x\), donc \(f\) est dérivable sur \(\mathbb{R}\).
> On a alors, pour tout réel \(x\), \(f'(x) = a\).

### 5) Dérivée de la fonction carrée

> **Propriété**
> Soit \(f\) la fonction carrée définie sur \(\mathbb{R}\) par \(f : x \mapsto x^2\).
> Alors \(f\) est dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = 2x\).

> **Démonstration**
> Fait dans le II.2.

### 6) Dérivée de la fonction cube

> **Propriété**
> Soit \(f\) la fonction cube définie sur \(\mathbb{R}\) par \(f : x \mapsto x^3\).
> Alors \(f\) est dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = 3x^2\).

> **Démonstration**
> Pré-requis utile pour la démonstration :
> Pour tous réels \(a\) et \(b\), on a :
> \[
> (a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3
> \]
> En effet :
> \[
> (a+b)^3 = (a+b)^2(a+b) = (a^2 + 2ab + b^2)(a+b) = a^3 + a^2b + 2a^2b + 2ab^2 + ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3.
> \]
> Soit \(x\) un réel. Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\).
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{(x+h)^3 - x^3}{h} = \frac{x^3 + 3x^2h + 3xh^2 + h^3 - x^3}{h} = \frac{3x^2h + 3xh^2 + h^3}{h}
> \]
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{h(3x^2 + 3xh + h^2)}{h} = 3x^2 + 3xh + h^2.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(3x^2 \in \mathbb{R}\) car \(x \in \mathbb{R}\).
> Donc \(f\) est dérivable en \(x\). Or ceci est vrai pour tout réel \(x\), donc \(f\) est dérivable sur \(\mathbb{R}\).
> On a alors, pour tout réel \(x\), \(f'(x) = 3x^2\).

### 7) Dérivée de la fonction inverse

> **Propriété**
> Soit \(f\) la fonction inverse définie sur \(\mathbb{R}^*\) par \(f : x \mapsto \frac{1}{x}\).
> Alors \(f\) est dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\), et \(\forall x \in \mathbb{R}^*\), \(f'(x) = -\frac{1}{x^2}\).

> **Remarque**
> Par définition, une fonction est dérivable sur un intervalle uniquement. C’est pour cela qu’on évite de dire que la fonction inverse est « dérivable sur \(\mathbb{R}^*\) » car \(\mathbb{R}^*\) est une réunion d’intervalles et non un intervalle (\(\mathbb{R}^* = ]-\infty;0[ \cup ]0;+\infty[\)).

> **Démonstration**
> Soit \(x \in ]0;+\infty[\). Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h > 0\).
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{\frac{1}{x+h} - \frac{1}{x}}{h} = \frac{\frac{x}{x(x+h)} - \frac{x+h}{x(x+h)}}{h} = \frac{x - x - h}{x(x+h)} \times \frac{1}{h} = -\frac{1}{x(x+h)}
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(-\frac{1}{x^2} \in \mathbb{R}\) car \(x \in \mathbb{R}_+^*\).
> Donc \(f\) est dérivable en \(x\).
> Or ceci est vrai pour tout réel \(x > 0\), donc \(f\) est dérivable sur \(\mathbb{R}_+^*\).
> On démontre de même que \(f\) est dérivable sur \(\mathbb{R}_-^*\).
> On a alors, pour tout réel \(x\) non nul, \(f'(x) = -\frac{1}{x^2}\).

### 8) Dérivées des fonctions de la forme \(x \mapsto x^n\)

> **Propriété**
> Soit \(n \in \mathbb{N}\) et soit \(f\) la fonction définie sur \(\mathbb{R}\) par \(f : x \mapsto x^n\).
> Alors \(f\) est dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = n x^{n-1}\).

> **Remarque**
> Cette propriété reste vraie si \(n \in \mathbb{Z} \setminus \mathbb{N}\) (c’est-à-dire si \(n\) est un entier strictement négatif) en restreignant l’ensemble de définition de \(f\) à \(\mathbb{R}^*\). \(f\) est alors dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\).

> **Exemples**
> * Si \(n=2\), alors \(f(x) = x^2\). \(f\) est donc définie et dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = 2x^{2-1} = 2x\). (On retrouve le résultat vu pour la fonction carrée).
> * Si \(n=3\), alors \(f(x) = x^3\). \(f\) est donc définie et dérivable sur \(\mathbb{R}\) et \(\forall x \in \mathbb{R}\), \(f'(x) = 3x^{3-1} = 3x^2\). (On retrouve le résultat vu pour la fonction cube).
> * Si \(n=-1\), alors \(f(x) = x^{-1} = \frac{1}{x}\). \(f\) est donc définie et dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\) et \(\forall x \in \mathbb{R}^*\), \(f'(x) = -1 x^{-1-1} = -x^{-2} = -\frac{1}{x^2}\). (On retrouve le résultat vu pour la fonction inverse).

> **Exercice**
> Démontrer que \(f : x \mapsto \frac{1}{x^3}\) est dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\) et déterminer sa dérivée.
> \(\forall x \in \mathbb{R}^*\), \(f(x) = \frac{1}{x^3} = x^{-3}\). Donc d’après la propriété précédente, \(f\) est dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\) et \(\forall x \in \mathbb{R}^*\), on a \(f'(x) = -3 x^{-3-1} = -3 x^{-4} = -\frac{3}{x^4}\).

### 9) Dérivée de la fonction racine carrée

> **Propriété**
> Soit \(f\) la fonction racine carrée définie sur \([0;+\infty[\) par \(f : x \mapsto \sqrt{x}\).
> Alors \(f\) est dérivable sur \(]0;+\infty[\) et \(\forall x \in ]0;+\infty[\), \(f'(x) = \frac{1}{2\sqrt{x}}\).

> **Démonstration**
> * Montrons que \(f\) est dérivable sur \(]0;+\infty[\) :
> Soit \(x\) un réel de \(]0;+\infty[\). Calculons le taux de variation de \(f\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h \in ]0;+\infty[\) :
> \[
> \frac{f(x+h)-f(x)}{h} = \frac{\sqrt{x+h} - \sqrt{x}}{h} \times \frac{\sqrt{x+h} + \sqrt{x}}{\sqrt{x+h} + \sqrt{x}} = \frac{(\sqrt{x+h})^2 - (\sqrt{x})^2}{h(\sqrt{x+h} + \sqrt{x})} = \frac{x+h-x}{h(\sqrt{x+h} + \sqrt{x})} = \frac{1}{\sqrt{x+h} + \sqrt{x}}.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{f(x+h)-f(x)}{h}\) tend vers \(\frac{1}{\sqrt{x} + \sqrt{x}} = \frac{1}{2\sqrt{x}} \in \mathbb{R}\) car \(x \in ]0;+\infty[\).
> Donc \(f\) est dérivable en \(x\).
> Or ceci est vrai pour tout réel \(x \in ]0;+\infty[\), donc \(f\) est dérivable sur \(]0;+\infty[\).
> On a alors, pour tout réel \(x \in ]0;+\infty[\), \(f'(x) = \frac{1}{2\sqrt{x}}\).
> * Montrons que \(f\) n’est pas dérivable en \(0\) :
> Calculons pour cela le taux de variation de \(f\) entre \(0\) et \(0+h\) avec \(h \neq 0\) tel que \(0+h \in [0;+\infty[\) :
> \[
> \frac{f(0+h)-f(0)}{h} = \frac{\sqrt{0+h} - \sqrt{0}}{h} = \frac{\sqrt{h}}{h} = \frac{\sqrt{h}}{\sqrt{h} \times \sqrt{h}} = \frac{1}{\sqrt{h}}.
> \]
> Ainsi, quand \(h\) tend vers \(0\), \(\sqrt{h}\) tend vers \(0\) et le quotient \(\frac{f(0+h)-f(0)}{h}\) tend vers un quotient dont le dénominateur serait nul, ce qui est impossible dans \(\mathbb{R}\).
> Or \(f\) est dérivable en \(0\) si et seulement si \(\frac{f(0+h)-f(0)}{h}\) tend vers un nombre réel.
> Donc \(f\) n’est pas dérivable en \(0\).

> **Remarques**
> * En fait, quand \(h\) tend vers \(0\), \(\frac{f(0+h)-f(0)}{h}\) tend vers l’inverse d’un nombre aussi proche de \(0\) que l’on veut (tout en restant positif), donc il tend vers \(+\infty\). Or \(+\infty \notin \mathbb{R}\) (puisque \(\mathbb{R} = ]-\infty;+\infty[\), intervalle ouvert !) donc \(f\) n’est pas dérivable en \(0\).
> * \(\sqrt{x} = x^{\frac{1}{2}}\) et la formule vue pour \(x^n\) ne s’applique pas pour \(n = \frac{1}{2}\).

### 10) Dérivée de la fonction valeur absolue

> **Propriété**
> Soit \(f\) la fonction valeur absolue définie sur \(\mathbb{R}\) par \(f(x) = |x| = \begin{cases} x & \text{si } x \ge 0 \\ -x & \text{si } x < 0 \end{cases}\).
> Alors la fonction \(f\) est dérivable sur \(]-\infty;0[\) et sur \(]0;+\infty[\) et on a \(f'(x) = \begin{cases} 1 & \text{si } x > 0 \\ -1 & \text{si } x < 0 \end{cases}\).
> En particulier, la fonction valeur absolue n’est pas dérivable en \(0\).

> **Démonstration**
> * Montrons que \(f\) n’est pas dérivable en \(0\) :
> Posons, pour tout réel \(h\) non nul, \(t(h) = \frac{f(0+h)-f(0)}{h}\). On a alors \(t(h) = \frac{|0+h|}{h} = \frac{|h|}{h}\).
> Si \(h > 0\), \(t(h) = \frac{h}{h} = 1\) mais si \(h < 0\), \(t(h) = \frac{-h}{h} = -1\).
> Ainsi, selon si \(h\) est positif ou négatif, le taux de variation de \(f\) en \(0\) tend vers deux réels différents, ce qui est contraire à la définition de la dérivabilité en un réel. Donc \(f\) n’est pas dérivable en \(0\).
> * Montrons que \(f\) est dérivable sur \(]0;+\infty[\) :
> Pour tout réel \(x > 0\), \(f(x) = |x| = x\). Or la fonction \(x \mapsto x\) est une fonction affine dérivable sur \(\mathbb{R}\) et dont la dérivée est \(x \mapsto 1\).
> Donc \(f\) est dérivable sur \(]0;+\infty[\) et pour tout \(x > 0\), \(f'(x) = 1\).
> * Montrons que \(f\) est dérivable sur \(]-\infty;0[\) :
> Pour tout réel \(x < 0\), \(f(x) = |x| = -x\). Or la fonction \(x \mapsto -x\) est une fonction affine dérivable sur \(\mathbb{R}\) et dont la dérivée est \(x \mapsto -1\).
> Donc \(f\) est dérivable sur \(]-\infty;0[\) et pour tout \(x < 0\), \(f'(x) = -1\).

### 11) Tableau récapitulatif des dérivées des fonctions usuelles

| \(f(x)\) | \(f'(x)\) | \(D_f\) | \(D_{f'}\) | Conditions |
| :--- | :--- | :--- | :--- | :--- |
| \(k\) | \(0\) | \(\mathbb{R}\) | \(\mathbb{R}\) | \(k \in \mathbb{R}\) |
| \(ax+b\) | \(a\) | \(\mathbb{R}\) | \(\mathbb{R}\) | \(a, b\) réels |
| \(x^2\) | \(2x\) | \(\mathbb{R}\) | \(\mathbb{R}\) | |
| \(x^3\) | \(3x^2\) | \(\mathbb{R}\) | \(\mathbb{R}\) | |
| \(x^n\) | \(n x^{n-1}\) | \(\mathbb{R}\) | \(\mathbb{R}\) | \(n \in \mathbb{N}\) |
| \(x^n\) | \(n x^{n-1}\) | \(\mathbb{R}^*\) | \(]-\infty;0[\) et \(]0;+\infty[\) | \(n \in \mathbb{Z} \setminus \mathbb{N}\) |
| \(\frac{1}{x}\) | \(-\frac{1}{x^2}\) | \(\mathbb{R}^*\) | \(]-\infty;0[\) et \(]0;+\infty[\) | |
| \(\sqrt{x}\) | \(\frac{1}{2\sqrt{x}}\) | \([0;+\infty[\) | \(]0;+\infty[\) | |
| \(|x|\) | \(\begin{cases} 1 & \text{si } x > 0 \\ -1 & \text{si } x < 0 \end{cases}\) | \(\mathbb{R}\) | \(]-\infty;0[\) et \(]0;+\infty[\) | |

> **Exercice**
> Pour chacune des fonctions suivantes, préciser l’ensemble de définition, l’ensemble de dérivation et l’expression de la dérivée :
> \[
> f : x \mapsto 2x+3 \quad g : x \mapsto x^4 \quad h : x \mapsto 4-5x \quad k : x \mapsto 17 \quad \ell : x \mapsto \frac{1}{x^5}
> \]

## III. Dérivée d’une somme, d’un produit et d’un quotient

### 1) Dérivée d’une somme

> **Propriété**
> Soient \(u\) et \(v\) deux fonctions définies et dérivables sur un intervalle \(I\).
> Alors la fonction \(u+v\) est définie et dérivable sur \(I\) et \((u+v)' = u' + v'\).

> **Démonstration**
> Soit \(x\) un réel de \(I\). Calculons le taux de variation de la fonction \(u+v\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h \in I\) :
> \[
> \frac{(u+v)(x+h) - (u+v)(x)}{h} = \frac{u(x+h) + v(x+h) - u(x) - v(x)}{h} = \frac{u(x+h)-u(x)}{h} + \frac{v(x+h)-v(x)}{h}.
> \]
> Or \(u\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{u(x+h)-u(x)}{h}\) tend vers \(u'(x) \in \mathbb{R}\).
> De même, \(v\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{v(x+h)-v(x)}{h}\) tend vers \(v'(x) \in \mathbb{R}\).
> Ainsi, \(\frac{(u+v)(x+h) - (u+v)(x)}{h}\) tend vers \(u'(x) + v'(x) \in \mathbb{R}\).
> Donc \(u+v\) est dérivable en \(x\). Or ceci est vrai pour tout réel \(x\) de \(I\), donc \(u+v\) est dérivable sur \(I\) et \((u+v)' = u' + v'\).

> **Exemple**
> Soit \(f : x \mapsto x^2 + 5x\). Justifier que \(f\) est dérivable sur \(\mathbb{R}\) et calculer sa dérivée.

### 2) Dérivée de \(k u\)

> **Propriété**
> Soit \(u\) une fonction définie et dérivable sur un intervalle \(I\) et \(k\) un réel.
> Alors la fonction \(k u : x \mapsto k \times u(x)\) est définie et dérivable sur \(I\) et \((k u)' = k u'\).

> **Démonstration**
> Soit \(x\) un réel de \(I\). Calculons le taux de variation de la fonction \(k u\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h \in I\) :
> \[
> \frac{(k u)(x+h) - (k u)(x)}{h} = \frac{k u(x+h) - k u(x)}{h} = \frac{k(u(x+h)-u(x))}{h} = k \times \frac{u(x+h)-u(x)}{h}.
> \]
> Or \(u\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{u(x+h)-u(x)}{h}\) tend vers \(u'(x) \in \mathbb{R}\).
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{(k u)(x+h) - (k u)(x)}{h}\) tend vers \(k \times u'(x) \in \mathbb{R}\).
> Donc \(k u\) est dérivable en \(x\). Or ceci est vrai pour tout réel \(x\) de \(I\), donc \(k u\) est dérivable sur \(I\) et \((k u)' = k u'\).

> **Exemple**
> Soit \(f : x \mapsto 3x^5\). Justifier que \(f\) est dérivable sur \(\mathbb{R}\) et calculer sa dérivée.

### 3) Conséquences des dérivées d’une somme et de \(k u\)

#### a) Dérivée d’une différence

> **Propriété**
> Soient \(u\) et \(v\) deux fonctions définies et dérivables sur un intervalle \(I\).
> Alors la fonction \(u - v\) est définie et dérivable sur \(I\) et \((u - v)' = u' - v'\).

> **Démonstration**
> \(u - v = u + (-v)\) donc à l’aide de la dérivée de \(k v\) avec \(k = -1\) et de la dérivée d’une somme, le résultat est immédiat.

#### b) Dérivée d’une fonction polynôme

> **Propriété**
> Toute fonction polynôme est définie et dérivable sur \(\mathbb{R}\).

> **Exemple**
> Soit \(f : x \mapsto 5x^3 - 4x^2 + 5x - 178\). Justifier que \(f\) est dérivable sur \(\mathbb{R}\) et calculer sa dérivée.

### 4) Dérivée d’un produit

> **Propriété**
> Soient \(u\) et \(v\) deux fonctions définies et dérivables sur un intervalle \(I\).
> Alors la fonction \(u v : x \mapsto u(x) \times v(x)\) est définie et dérivable sur \(I\) et \((u v)' = u' v + u v'\).

> **Démonstration**
> Soit \(x\) un réel de \(I\). Calculons le taux de variation de la fonction \(u v\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h \in I\) :
> \[
> \frac{(u v)(x+h) - (u v)(x)}{h} = \frac{u(x+h)v(x+h) - u(x)v(x)}{h}
> \]
> \[
> = \frac{u(x+h)v(x+h) - u(x)v(x+h) + u(x)v(x+h) - u(x)v(x)}{h}
> \]
> \[
> = \frac{u(x+h)-u(x)}{h} v(x+h) + \frac{v(x+h)-v(x)}{h} u(x).
> \]
> Or \(u\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{u(x+h)-u(x)}{h}\) tend vers \(u'(x) \in \mathbb{R}\).
> De même, \(v\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{v(x+h)-v(x)}{h}\) tend vers \(v'(x) \in \mathbb{R}\).
> Enfin, on admet que si \(h\) tend vers \(0\), alors \(v(x+h)\) tend vers \(v(x)\).
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{(u v)(x+h) - (u v)(x)}{h}\) tend vers \(u'(x) v(x) + v'(x) u(x) \in \mathbb{R}\).
> Donc \(u v\) est dérivable en \(x\). Or ceci est vrai pour tout réel \(x\) de \(I\), donc \(u v\) est dérivable sur \(I\) et \((u v)' = u' v + u v'\).

> **Exemple**
> Soit \(f : x \mapsto x \sqrt{x}\). Justifier que \(f\) est dérivable sur \(]0;+\infty[\) et calculer sa dérivée.

> **Exercice**
> Soit \(u\) une fonction définie et dérivable sur un intervalle \(I\). Montrer que la fonction \(u^2\) est dérivable sur \(I\) et que \((u^2)' = 2 u' u\).

### 5) Dérivée d’un quotient

#### a) Dérivée de l’inverse d’une fonction non nulle

> **Propriété**
> Soit \(u\) une fonction définie et dérivable sur un intervalle \(I\) telle que pour tout réel \(x\) de \(I\), \(u(x) \neq 0\).
> Alors la fonction \(\frac{1}{u}\) est définie et dérivable sur \(I\) et \(\left(\frac{1}{u}\right)' = -\frac{u'}{u^2}\).

> **Démonstration**
> Soit \(x\) un réel de \(I\). Calculons le taux de variation de la fonction \(\frac{1}{u}\) entre \(x\) et \(x+h\), avec \(h \neq 0\) tel que \(x+h \in I\) :
> \[
> \frac{\frac{1}{u(x+h)} - \frac{1}{u(x)}}{h} = \frac{\frac{u(x)}{u(x)u(x+h)} - \frac{u(x+h)}{u(x)u(x+h)}}{h} = \frac{u(x) - u(x+h)}{h u(x) u(x+h)} = -\frac{u(x+h)-u(x)}{h} \times \frac{1}{u(x) u(x+h)}.
> \]
> Or \(u\) est dérivable sur \(I\), donc en \(x\), donc quand \(h\) tend vers \(0\), \(\frac{u(x+h)-u(x)}{h}\) tend vers \(u'(x) \in \mathbb{R}\).
> On admet de plus que si \(h\) tend vers \(0\), alors \(u(x+h)\) tend vers \(u(x)\).
> Ainsi, quand \(h\) tend vers \(0\), \(\frac{\frac{1}{u(x+h)} - \frac{1}{u(x)}}{h}\) tend vers \(-u'(x) \times \frac{1}{u(x) \times u(x)} = -\frac{u'(x)}{u(x)^2} \in \mathbb{R}\).
> Donc \(\frac{1}{u}\) est dérivable en \(x\). Or ceci est vrai
