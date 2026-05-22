---
source_url: "http://www.maths91.fr/cours1spemaths/1S-08-FONCTION_EXPONENTIELLE-cours.pdf"
chapter: "08-exponentielle"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:52+00:00"
cleaned_at: "2026-05-22T08:26:52+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 08 − FONCTION EXPONENTIELLE

## I La fonction exponentielle

### 1) Définition de la fonction exponentielle

> **Notation :** On notera l'égalité \(f(x)=g(x)\), pour tout \(x\) réel, sous la forme réduite \(f=g\).

> **PROPRIÉTÉ ET DÉFINITION (admise)**
> Il existe une unique fonction \(f\) dérivable sur \(\mathbb{R}\) telle que \(f'=f\) et \(f(0)=1\). C'est la **fonction exponentielle**, notée \(\exp\).

En utilisant la notation \(\exp\), on peut donc dire que :
* Pour tout réel \(x\), \(\exp'(x)=\exp(x)\).
* \(\exp(0)=1\).

**Remarque :**

### 2) Une première propriété de la fonction exponentielle

> **PROPRIÉTÉ**
> La fonction exponentielle ne s'annule pas sur \(\mathbb{R}\). Autrement dit, pour tout réel \(x\), \(\exp(x)\neq0\).

**DÉMONSTRATION**
Soit \(\varphi\) la fonction définie sur \(\mathbb{R}\) par \(\varphi(x)=\exp(x)\times\exp(-x)\). \(\varphi\) est dérivable sur \(\mathbb{R}\) et :
\[
\forall x\in\mathbb{R},\quad \varphi'(x)=\exp'(x)\times\exp(-x)+\exp(x)\times(-\exp'(-x)) \quad ((f(ax+b))'=a\times f'(ax+b),\text{ chap. 4})
\]
\[
=\exp(x)\exp(-x)-\exp(x)\exp(-x) \quad \text{car }\exp'=\exp
\]
\[
=0.
\]
Ainsi, on remarque que la fonction \(\varphi'\) est la fonction nulle, donc \(\varphi\) est une fonction constante sur \(\mathbb{R}\). Cherchons la constante en question.
\[
\varphi(0)=\exp(0)\times\exp(-0)=1\times1=1,
\]
donc pour tout nombre réel \(x\), \(\varphi(x)=1\) et ainsi :
\[
\forall x\in\mathbb{R},\quad \exp(x)\times\exp(-x)=1.
\]
Supposons alors qu'il existe un réel \(x_0\) tel que \(\exp(x_0)=0\). Alors, d'après la formule obtenue au-dessus, on aurait : \(\exp(x_0)\times\exp(-x_0)=1\), soit \(0\times\exp(-x_0)=1\), soit enfin \(0=1\) ! Ce qui est absurde. Donc pour tout nombre réel \(x\), \(\exp(x)\neq0\).

> **PROPRIÉTÉ**
> \[
> \forall x\in\mathbb{R},\quad \exp(x)\times\exp(-x)=1,
> \]
> donc en transposant \(\exp(x)\) à droite (possible car on vient de voir que la fonction \(\exp\) ne s'annulait pas sur \(\mathbb{R}\)), on a alors la conséquence immédiate suivante :
> \[
> \text{Pour tout nombre réel }x,\quad \exp(-x)=\frac{1}{\exp(x)}.
> \]

### 3) Relation fonctionnelle

> **PROPRIÉTÉ**
> Pour tous nombres réels \(x\) et \(y\),
> \[
> \exp(x+y)=\exp(x)\times\exp(y).
> \]

**Remarque :** On dit que la fonction exponentielle transforme une somme en un produit.

**DÉMONSTRATION**
Soit \(\varphi\) la fonction définie sur \(\mathbb{R}\) par \(\varphi(x)=\frac{\exp(x+y)}{\exp(x)}\) (\(\varphi\) existe car \(\exp\neq0\) sur \(\mathbb{R}\)).
\(\varphi\) est dérivable sur \(\mathbb{R}\) et
\[
\varphi'(x)=\frac{\exp(x+y)\exp(x)-\exp(x+y)\exp(x)}{(\exp(x))^2}=0 \quad (\text{car }\exp'=\exp).
\]
Donc \(\varphi\) est constante sur \(\mathbb{R}\). Or \(\varphi(0)=\frac{\exp(0+y)}{\exp(0)}=\exp(y)\), donc pour tout \(x\) réel, \(\varphi(x)=\exp(y)\), soit \(\frac{\exp(x+y)}{\exp(x)}=\exp(y)\), donc \(\exp(x+y)=\exp(x)\exp(y)\).

**Remarque :** On retrouve la propriété vue dans le 2), à savoir \(\exp(-x)=\frac{1}{\exp(x)}\). En effet, d'après la relation fonctionnelle vue ci-dessus, on a, en remplaçant \(y\) par \(-x\) :
\[
\exp(x)\times\exp(-x)=\exp(x+(-x))=\exp(0).
\]
Or d'après la définition de la fonction exponentielle du 1), on a \(\exp(0)=1\). Ainsi, \(\exp(x)\times\exp(-x)=1\), puis \(\exp(-x)=\frac{1}{\exp(x)}\) (car \(\exp\neq0\)).

### 4) Signe de la fonction \(\exp\)

> **PROPRIÉTÉ**
> La fonction exponentielle est strictement positive sur \(\mathbb{R}\).

**DÉMONSTRATION**
Pour tout nombre réel \(x\), d'après la relation fonctionnelle, on a :
\[
\exp(x)=\exp\left(\frac{x}{2}+\frac{x}{2}\right)=\left(\exp\left(\frac{x}{2}\right)\right)^2 \geqslant 0.
\]
Donc \(\forall x\in\mathbb{R}\), \(\exp(x)\geqslant 0\). Or la fonction exponentielle ne s'annule pas sur \(\mathbb{R}\), donc pour tout nombre réel \(x\), \(\exp(x)>0\).

### 5) Propriétés algébriques de la fonction \(\exp\)

> **PROPRIÉTÉ**
> Pour tous nombres réels \(x\) et \(y\),
> \[
> \exp(x-y)=\frac{\exp(x)}{\exp(y)}.
> \]

**DÉMONSTRATION**
Pour tous nombres réels \(x\) et \(y\),
\[
\exp(x-y)=\exp(x+(-y))=\exp(x)\times\exp(-y)
\]
d'après la relation fonctionnelle. Or \(\exp(-y)=\frac{1}{\exp(y)}\), donc \(\exp(x-y)=\frac{\exp(x)}{\exp(y)}\).

**Remarque :** On peut généraliser la relation fonctionnelle à plus de deux termes :
Pour tous réels \(x_1, x_2, \dots, x_n\) (\(n\in\mathbb{N}^*\)) :
\[
\exp(x_1+x_2+\dots+x_n)=\exp(x_1)\times\exp(x_2)\times\dots\times\exp(x_n).
\]

> **PROPRIÉTÉ**
> Pour tout nombre réel \(x\) et tout nombre entier relatif \(n\),
> \[
> \exp(nx)=(\exp(x))^n.
> \]

**DÉMONSTRATION**
Lorsque \(n>0\), on obtient l'égalité en appliquant la propriété précédente dans le cas particulier où \(x_1=x_2=\dots=x_n=x\).
Lorsque \(n=0\), l'égalité est vérifiée car \(\exp(0)=1\).
Lorsque \(n<0\), \(\exp(nx)=\exp((-n)(-x))\). Or \(-n>0\) donc d'après le premier cas, \(\exp(nx)=(\exp(-x))^{-n}\). Donc \(\exp(nx)=\left(\frac{1}{\exp(x)}\right)^{-n}=(\exp(x))^n\).

### 6) Nouvelle notation

Posons \(e=\exp(1)\) et avec la calculatrice, \(e\approx 2,718\).

Pour tout nombre entier relatif \(n\), \(\exp(n)=\exp(n\times1)=(\exp(1))^n=e^n\).

Par extension, on peut noter pour tout nombre réel \(x\), \(\exp(x)=e^x\) (lire « \(e\) exposant \(x\) »). On définit ainsi n'importe quelle puissance **RÉELLE** du nombre \(e\).

> **PROPRIÉTÉ (admise)**
> Nouvelles écritures des propriétés :
> Pour tous nombres réels \(x\) et \(y\) et tout nombre entier relatif \(n\), on a :
> \[
> e^0=1 \qquad e^1=e \qquad e^x>0 \qquad e^{-x}=\frac{1}{e^x}
> \]
> \[
> e^{x+y}=e^x\times e^y \qquad e^{x-y}=\frac{e^x}{e^y} \qquad (e^x)^n=e^{nx}
> \]

**Remarque :** On retrouve les propriétés habituelles de calcul sur les puissances entières d'un réel vues au collège.

**EXERCICE**
Simplifier les écritures suivantes :
1. \(e^{x+2}\times e^{-x+2}\).
2. \(\frac{e^{-2x+1}}{e^{-x+1}}\).
3. \(\frac{e^{x-1}}{e^{x+1}}+\frac{e^{-x-1}}{e^{-x+1}}\).

## II Étude de la fonction exponentielle

### 1) Sens de variation de la fonction \(\exp\)

> **PROPRIÉTÉ**
> La fonction exponentielle est strictement croissante sur \(\mathbb{R}\).

**DÉMONSTRATION**
La fonction exponentielle est dérivable sur \(\mathbb{R}\) et \(\exp'=\exp\). Or pour tout nombre réel \(x\), \(\exp(x)>0\) donc la fonction exponentielle est strictement croissante sur \(\mathbb{R}\).

La propriété ci-dessus permet d'établir une conséquence immédiate :

> **PROPRIÉTÉ**
> Pour tous nombres réels \(a\) et \(b\) :
> \[
> e^a < e^b \iff a < b
> \]
> \[
> e^a = e^b \iff a = b
> \]

**EXERCICE**
Résoudre les équations et inéquations suivantes dans \(\mathbb{R}\) :
1. \((E_1) : e^{3x}=e^2\)
2. \((E_2) : e^{5x+2}-1=0\)
3. \((E_3) : e^{5x+2}+1=0\)
4. \((I_1) : e^{3x+1}-e^{-x}<0\)
5. \((I_2) : e^{3x+1}+e^{-x}<0\)
6. \((I_3) : e^{5-2x}+2\geqslant 0\)
7. \((I_4) : -2e^{3x}-2e\geqslant 0\)
8. \((I_5) : -2e^{3x}+2e\geqslant 0\)
9. \((E_4) : e^{2x}+2e^x=3\)

### 2) Limites de la fonction \(\exp\)

> **PROPRIÉTÉ (admise)**
> \[
> \lim_{x\to +\infty} e^x = +\infty \quad \text{et} \quad \lim_{x\to -\infty} e^x = 0
> \]

**Remarque :** Ces limites ne sont pas à retenir en classe de 1ère.

### 3) Courbe représentative de la fonction \(\exp\)

Tableau de variations détaillé de la fonction exponentielle :

\[
\begin{array}{c|ccc}
x & -\infty & & +\infty \\
\hline
(\exp)'(x) & & + & \\
\hline
& & & +\infty \\
\exp & & \nearrow & \\
& 0 & & \\
& & 1 & \\
\end{array}
\]

**EXERCICE**
1. Déterminer l'équation de la tangente \(T_0\) à la courbe de la fonction \(\exp\) au point d'abscisse 0. (réponse : \(y=x+1\)).
2. Déterminer l'équation de la tangente \(T_1\) à la courbe de la fonction \(\exp\) au point d'abscisse 1. (réponse : \(y=e x\)).

Courbe représentative de la fonction exponentielle :

![Courbe de la fonction exponentielle](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)
<!-- UNSURE: The original PDF contains a graph image that cannot be rendered in text. The placeholder above is a white square. -->

**Remarque :** \(\lim_{x\to -\infty} e^x = 0\) donc l'axe des abscisses, d'équation \(y=0\), est appelée asymptote horizontale à la courbe de \(\exp\) en \(-\infty\).

## III Compléments sur la fonction exponentielle

### 1) Dérivée de la fonction \(x \mapsto e^{ax+b}\)

> **PROPRIÉTÉ**
> Soient \(a\) et \(b\) deux réels. Alors la fonction \(f\) définie sur \(\mathbb{R}\) par \(f(x)=e^{ax+b}\) est dérivable sur \(\mathbb{R}\), et pour tout réel \(x\),
> \[
> f'(x)=a\times e^{ax+b}.
> \]

**DÉMONSTRATION**
Le résultat est immédiat d'après la propriété du chapitre IV, qui donne la dérivée de \(f(ax+b)\) : \(a\times f'(ax+b)\).

**Remarque :** On peut généraliser la propriété précédente en remplaçant la fonction affine \(x\mapsto ax+b\) par une fonction dérivable \(u\) :

> **PROPRIÉTÉ (admise)**
> Soit \(u\) une fonction définie et dérivable sur un intervalle \(I\). Alors la fonction \(e^u\) est définie et dérivable sur \(I\) et
> \[
> (e^u)' = u' e^u.
> \]

**EXEMPLE**
Soit \(f\) la fonction définie sur \(\mathbb{R}\) par \(f(x)=e^{x^2+3x+1}\). Alors \(f\) est dérivable sur \(\mathbb{R}\) et pour tout réel \(x\),
\[
f'(x)=(2x+3)e^{x^2+3x+1}.
\]

**DÉMONSTRATION**
Ce résultat sera démontré en classe de Terminale.

### 2) Représentations des fonctions \(t \mapsto e^{kt}\) et \(t \mapsto e^{-kt}\)

> **PROPRIÉTÉ**
> Soit \(k\) un réel strictement positif. Alors les fonctions \(t\mapsto e^{kt}\) sont strictement croissantes sur \(\mathbb{R}\), et ont pour représentation graphique :

![Courbes de e^{kt}](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)
<!-- UNSURE: The original PDF contains a graph image that cannot be rendered in text. The placeholder above is a white square. -->

**Remarques :**
* On parle de **croissance exponentielle**.
* Plus la valeur de \(k\) est grande, plus la fonction \(t\mapsto e^{kt}\) croît rapidement.

**DÉMONSTRATION**
Soit \(k\) un réel strictement positif, et soit \(f\) la fonction définie sur \(\mathbb{R}\) par \(f(t)=e^{kt}\). \(f\) est dérivable sur \(\mathbb{R}\), et \(\forall t\in\mathbb{R}\), \(f'(t)=k\times e^{kt}\). Or \(k>0\) et pour tout réel \(t\), \(e^{kt}>0\) (car la fonction \(\exp\) est strictement positive sur \(\mathbb{R}\)). Donc \(\forall t\in\mathbb{R}\), \(f'(t)>0\) et donc \(f\) est strictement croissante sur \(\mathbb{R}\).

> **PROPRIÉTÉ**
> Soit \(k\) un réel strictement positif. Alors les fonctions \(t\mapsto e^{-kt}\) sont strictement décroissantes sur \(\mathbb{R}\), et ont pour représentation graphique :

![Courbes de e^{-kt}](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)
<!-- UNSURE: The original PDF contains a graph image that cannot be rendered in text. The placeholder above is a white square. -->

**Remarques :**
* On parle de **décroissance exponentielle**.
* Plus la valeur de \(k\) est grande, plus la fonction \(t\mapsto e^{-kt}\) décroît rapidement.

**DÉMONSTRATION**
Soit \(k\) un réel strictement positif, et soit \(f\) la fonction définie sur \(\mathbb{R}\) par \(f(t)=e^{-kt}\). \(f\) est dérivable sur \(\mathbb{R}\), et \(\forall t\in\mathbb{R}\), \(f'(t)=-k\times e^{-kt}\). Or \(k>0\), donc \(-k<0\) et pour tout réel \(t\), \(e^{-kt}>0\) (car la fonction \(\exp\) est strictement positive sur \(\mathbb{R}\)). Donc \(\forall t\in\mathbb{R}\), \(f'(t)<0\) et donc \(f\) est strictement décroissante sur \(\mathbb{R}\).

### 3) Étude de la suite géométrique \((e^{na})\)

> **PROPRIÉTÉ**
> Pour tout réel \(a\), la suite \((u_n)\) définie sur \(\mathbb{N}\) par \(u_n = e^{na}\) est une suite géométrique de raison \(e^a\) et de premier terme \(u_0=1\).

**DÉMONSTRATION**
\[
\forall n\in\mathbb{N},\quad u_{n+1}=e^{(n+1)a}=e^{na+a}=e^{na}\times e^a = u_n \times e^a.
\]
Donc \((u_n)\) est bien une suite géométrique de raison \(q=e^a\) et de premier terme \(u_0=e^{0\times a}=e^0=1\).
