---
source_url: "https://tableauxmaths.fr/spip/IMG/pdf/corr_exos_expo.pdf"
chapter: "08-exponentielle"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:01+00:00"
cleaned_at: "2026-05-22T08:30:29+00:00"
---

## 1ère générale 2019-2020
Les fonctions exponentielles Exercices

### Les propriétés de la fonction exponentielle

**Exercice 1** Simplifier les expressions suivantes :
* \( A = e^{3} \times e^{4} \)
* \( B = \frac{e^{-5}}{e^{2}} \)
* \( C = \frac{e^{5x+7} \times e^{-x-3}}{e^{2x+3}} \)
* \( D = \frac{1}{e^{-1}} \)
* \( E = e^{2} \times e^{-4} \)
* \( F = \frac{(e^{-5})^{2}}{e^{2} \times e^{-6}} \)
* \( G = e^{x} \times e^{-x} \)
* \( H = (e^{3x+2})^{2} \)
* \( I = e^{2x+1} \times e^{-3x+5} \)
* \( J = \frac{e^{-x+1}}{e^{3x-4}} \)
* \( K = \frac{e^{x-7}}{e^{2x}} \times \frac{e^{3x+5}}{e^{-2x+1}} \)

**Corrigé**

* \( A = e^{3} \times e^{4} = e^{3+4} = e^{7} \)
* \( B = \frac{e^{-5}}{e^{2}} = e^{-5-2} = e^{-7} \)
* \( C = \frac{e^{5x+7} \times e^{-x-3}}{e^{2x+3}} = \frac{e^{5x+7+(-x-3)}}{e^{2x+3}} = \frac{e^{4x+4}}{e^{2x+3}} = e^{4x+4-(2x+3)} = e^{2x+1} \)
* \( D = \frac{1}{e^{-1}} = \frac{e^{0}}{e^{-1}} = e^{0-(-1)} = e^{1} = e \)
* \( E = e^{2} \times e^{-4} = e^{2+(-4)} = e^{-2} \)
* \( F = \frac{(e^{-5})^{2}}{e^{2} \times e^{-6}} = \frac{e^{2 \times (-5)}}{e^{2+(-6)}} = \frac{e^{-10}}{e^{-4}} = e^{-10-(-4)} = e^{-6} \)
* \( G = e^{x} \times e^{-x} = e^{x+(-x)} = e^{0} = 1 \)
* \( H = (e^{3x+2})^{2} = e^{2 \times (3x+2)} = e^{6x+4} \)
* \( I = e^{2x+1} \times e^{-3x+5} = e^{2x+1+(-3x+5)} = e^{-x+6} \)
* \( J = \frac{e^{-x+1}}{e^{3x-4}} = e^{-x+1-(3x-4)} = e^{-4x+5} \)
* \( K = \frac{e^{x-7}}{e^{2x}} \times \frac{e^{3x+5}}{e^{-2x+1}} = \frac{e^{x-7+3x+5}}{e^{2x-2x+1}} = \frac{e^{4x-2}}{e^{1}} = e^{4x-2-1} = e^{4x-3} \)

---

**Exercice 2**
1) Montrer que pour tout réel \( x \), on a : \( \frac{e^{x+1}}{e + e^{x+1}} = \frac{e^{x}}{1 + e^{x}} \)
2) Montrer que pour tout réel \( x \), on a : \( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{e^{x}}{1 + e^{x}} \)
3) Justifier que pour tout réel \( x \) on a \( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{e^{x} - 1}{e^{x} + 1} \)

**Corrigé**
1) On a \( \frac{e^{x+1}}{e + e^{x+1}} = \frac{e^{x} \times e^{1}}{e^{1} + e^{x} \times e^{1}} = \frac{e^{1} \times e^{x}}{e^{1}(1 + e^{x})} = \frac{e^{x}}{1 + e^{x}} \) après simplification par \( e^{1} \).

2) On transforme le membre de gauche :
\( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{1 + e^{-x}}{1 + e^{-x}} - \frac{e^{-x}}{1 + e^{-x}} = \frac{1 + e^{-x} - e^{-x}}{1 + e^{-x}} = \frac{e^{x}}{1 + e^{x}} \)

3) **Méthode 1 :** On peut transformer le membre gauche de l'égalité :
\( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{(1 - e^{-x}) \times e^{x}}{(1 + e^{-x}) \times e^{x}} = \frac{e^{x} - e^{-x} \times e^{x}}{e^{x} + e^{-x} \times e^{x}} = \frac{e^{x} - e^{-x+x}}{e^{x} + e^{-x+x}} = \frac{e^{x} - e^{0}}{e^{x} + e^{0}} = \frac{e^{x} - 1}{e^{x} + 1} \)
CQFD

**Méthode 2 :** On peut calculer la différence des deux membres de l'égalité :
\( \frac{1 - e^{-x}}{1 + e^{-x}} - \frac{e^{x} - 1}{e^{x} + 1} = \frac{(1 - e^{-x})(e^{x} + 1)}{(1 + e^{-x})(e^{x} + 1)} - \frac{(e^{x} - 1)(1 + e^{-x})}{(e^{x} + 1)(1 + e^{-x})} \)
\( = \frac{[e^{x} + 1 - e^{-x} \times e^{x} - e^{-x}] - [e^{x} + e^{x} \times e^{-x} - 1 - e^{-x}]}{(e^{x} + 1)(1 + e^{-x})} \)
\( = \frac{e^{x} + 1 - 1 - e^{-x} - e^{x} - 1 + 1 + e^{-x}}{(e^{x} + 1)(1 + e^{-x})} = 0 \)
On a donc bien \( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{e^{x} - 1}{e^{x} + 1} \).

**Méthode 3 :** On utilise l'égalité des produits en croix :
\( \frac{1 - e^{-x}}{1 + e^{-x}} = \frac{e^{x} - 1}{e^{x} + 1} \Leftrightarrow (1 - e^{-x})(e^{x} + 1) = (1 + e^{-x})(e^{x} - 1) \)
Il n'y a pas de valeur interdite, c'est pour cela qu'il y a bien l'équivalence.
\( (1 - e^{-x})(e^{x} + 1) = e^{x} + 1 - e^{-x} \times e^{x} - e^{-x} = e^{x} + 1 - e^{0} - e^{-x} = e^{x} - e^{-x} + 1 - 1 = e^{x} - e^{-x} \)
\( (1 + e^{-x})(e^{x} - 1) = e^{x} - 1 + e^{-x} \times e^{x} - e^{-x} = e^{x} - 1 + e^{0} - e^{-x} = e^{x} - e^{-x} \)
donc, l'égalité est bien vérifiée.

---

**Exercice 3** Développer et simplifier les expressions suivantes :
* \( A = e^{x}(e^{x} + 5) \)
* \( B = e^{-x}(e^{x} - 2) \)
* \( C = e^{2x}(e^{x} - e^{-x}) \)
* \( D = (e^{x} + 2)(e^{x} + 5) \)
* \( E = (e^{x} - 1)(e^{-x} + 3) \)
* \( F = (e^{x} + 1)(2 - e^{-x}) \)
* \( G = (e^{x} - 2)^{2} \)
* \( H = (e^{x} + 1)^{2} \)
* \( I = (e^{x} - 3)(e^{x} + 3) \)

**Corrigé**
* \( A = e^{x}(e^{x} + 5) = e^{x} \times e^{x} + 5e^{x} = e^{2x} + 5e^{x} \)
* \( B = e^{-x}(e^{x} - 2) = e^{-x} \times e^{x} + e^{-x} \times (-2) = e^{-x+x} - 2e^{-x} = e^{0} - 2e^{-x} = 1 - 2e^{-x} \)
* \( C = e^{2x}(e^{x} - e^{-x}) = e^{2x} \times e^{x} + e^{2x} \times (-e^{-x}) = e^{2x+x} - e^{2x-x} = e^{3x} - e^{x} \)
* \( D = (e^{x} + 2)(e^{x} + 5) = e^{x} \times e^{x} + e^{x} \times 5 + 2 \times e^{x} + 2 \times 5 = e^{2x} + 5e^{x} + 2e^{x} + 10 = e^{2x} + 7e^{x} + 10 \)
* \( E = (e^{x} - 1)(e^{-x} + 3) = e^{x} \times e^{-x} + e^{x} \times 3 + (-1) \times e^{-x} + (-1) \times 3 = e^{0} + 3e^{x} - e^{-x} - 3 = 3e^{x} - e^{-x} - 2 \)
* \( F = (e^{x} + 1)(2 - e^{-x}) = e^{x} \times 2 + e^{x} \times (-e^{-x}) + 1 \times 2 + 1 \times (-e^{-x}) = 2e^{x} - e^{0} + 2 - e^{-x} = 2e^{x} + 1 - e^{-x} \)
* \( G = (e^{x} - 2)^{2} = (e^{x})^{2} - 2 \times e^{x} \times 2 + 2^{2} = e^{2x} - 4e^{x} + 4 \)
* \( H = (e^{x} + 1)^{2} = (e^{x})^{2} + 2 \times e^{x} \times 1 + 1^{2} = e^{2x} + 2e^{x} + 1 \)
* \( I = (e^{x} - 3)(e^{x} + 3) = (e^{x})^{2} - 3^{2} = e^{2x} - 9 \)

---

**Exercice 4**
Soit la fonction \( f \) définie par \( f(x) = \frac{2}{e^{x} + 1} \)
Démontrer que \( f(x) + f(-x) = 2 \)

**Corrigé**
Soit la fonction \( f \) définie par \( f(x) = \frac{2}{e^{x} + 1} \)
\( f(x) + f(-x) = \frac{2}{e^{x} + 1} + \frac{2}{e^{-x} + 1} \)
\( = \frac{2 \times (e^{-x} + 1)}{(e^{x} + 1) \times (e^{-x} + 1)} + \frac{2 \times (e^{x} + 1)}{(e^{-x} + 1) \times (e^{x} + 1)} \)
\( = \frac{2 \times (e^{-x} + 1) + 2 \times (e^{x} + 1)}{(e^{x} + 1)(e^{-x} + 1)} \)
\( = \frac{2e^{-x} + 2 + 2e^{x} + 2}{(e^{x} + 1)(e^{-x} + 1)} \)
\( = \frac{2e^{-x} + 2e^{x} + 4}{e^{0} + e^{x} + e^{-x} + 1} \)
\( = \frac{2e^{-x} + 2e^{x} + 4}{e^{x} + e^{-x} + 2} \)
\( = \frac{2(e^{-x} + e^{x} + 2)}{e^{x} + e^{-x} + 2} = 2 \)

---

## Equations et inéquations avec des exponentielles

**Exercice 5**
1) Résoudre dans \( \mathbb{R} \) les équations suivantes :
   a) \( e^{x} = 1 \)
   b) \( e^{x} = 0 \)
   c) \( e^{x} + 1 = 0 \)
2) Résoudre dans \( \mathbb{R} \) les équations suivantes :
   a) \( e^{4x} = e^{5x-1} \)
   b) \( e^{4x^{2}} = e^{36} \)
   c) \( e^{2x-3} = 1 \)
   d) \( e^{5x} = e^{-x} \)
3) Résoudre dans \( \mathbb{R} \) les équations suivantes :
   a) \( (3x - 5)(e^{x} + 2) = 0 \)
   b) \( 4e^{-x} + 7xe^{-x} = 0 \)
4) a) Résoudre dans \( \mathbb{R} \) l'équation : \( X^{2} + 6X - 7 = 0 \)
   b) En déduire la résolution dans \( \mathbb{R} \) de l'équation : \( e^{2x} + 6e^{x} - 7 = 0 \)
5) Résoudre dans \( \mathbb{R} \) les équations suivantes :
   a) \( e^{2x} + 3e^{x} - 4 = 0 \)
   b) \( e^{2x} + 4e^{x} + 3 = 0 \)

**Corrigé**
1) a) \( e^{x} = 1 \Leftrightarrow e^{x} = e^{0} \Leftrightarrow x = 0 \). \( S = \{0\} \)
   b) \( e^{x} = 0 \) Impossible car on a vu que l'exponentielle était strictement positive sur \( \mathbb{R} \).
   c) \( e^{x} + 1 = 0 \Leftrightarrow e^{x} = -1 \) Impossible car on a vu que l'exponentielle était strictement positive sur \( \mathbb{R} \).

2) a) \( e^{4x} = e^{5x-1} \Leftrightarrow 4x = 5x - 1 \Leftrightarrow x = 1 \). \( S = \{1\} \)
   b) \( e^{4x^{2}} = e^{36} \Leftrightarrow 4x^{2} = 36 \Leftrightarrow 4x^{2} - 36 = 0 \Leftrightarrow (2x - 6)(2x + 6) = 0 \Leftrightarrow x = 3 \text{ ou } x = -3 \). \( S = \{-3 ; 3\} \)
   c) \( e^{2x-3} = 1 \Leftrightarrow e^{2x-3} = e^{0} \Leftrightarrow 2x - 3 = 0 \Leftrightarrow x = \frac{3}{2} \). \( S = \left\{\frac{3}{2}\right\} \)
   d) \( e^{5x} = e^{-x} \Leftrightarrow 5x = -x \Leftrightarrow 6x = 0 \Leftrightarrow x = 0 \). \( S = \{0\} \)

3) a) \( (3x - 5)(e^{x} + 2) = 0 \Leftrightarrow 3x - 5 = 0 \text{ ou } e^{x} + 2 = 0 \Leftrightarrow x = \frac{5}{3} \text{ ou } e^{x} = -2 \Leftrightarrow x = \frac{5}{3} \) seulement puisque \( e^{x} > 0 \). \( S = \left\{\frac{5}{3}\right\} \)
   b) \( 4e^{-x} + 7xe^{-x} = 0 \Leftrightarrow e^{-x}(4 + 7x) = 0 \Leftrightarrow e^{-x} = 0 \text{ ou } 4 + 7x = 0 \Leftrightarrow x = -\frac{4}{7} \) seulement puisque \( e^{-x} \neq 0 \). \( S = \left\{-\frac{4}{7}\right\} \)

4) a) \( X^{2} + 6X - 7 = 0 \) pour \( X_{1} = 1 \) ou \( X_{2} = -7 \).
   b) En posant \( e^{x} = X \), l'équation \( e^{2x} + 6e^{x} - 7 = 0 \) devient : \( X^{2} + 6X - 7 = 0 \). Par a), on en déduit que \( e^{x} = 1 = e^{0} \) ou \( e^{x} = -7 \). Ce qui donne seulement \( x = 0 \) puisque \( e^{x} > 0 \). \( S = \{0\} \)

5) a) \( X^{2} + 3X - 4 = 0 \) donne \( X_{1} = 1 \) et \( X_{2} = -4 \). On en déduit que \( e^{2x} + 3e^{x} - 4 = 0 \) pour \( x = 0 \). \( S = \{0\} \)
   b) \( X^{2} + 4X + 3 = 0 \) donne \( X_{1} = -1 \) et \( X_{2} = -3 \). On en déduit que \( e^{2x} + 4e^{x} + 3 \neq 0 \) pour tout \( x \in \mathbb{R} \) car l'exponentielle est strictement positive. \( S = \varnothing \)

---

**Exercice 6**
1) a) Démontrer que pour tout réel \( x \), \( -2e^{2x} + e^{x} + 1 = (2e^{x} + 1)(1 - e^{x}) \)
   b) Compléter le tableau de signe ci-dessous :

| \( x \) | \( -\infty \) | | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( 2e^{x} + 1 \) | | | |
| Signe de \( 1 - e^{x} \) | | | |
| Signe de \( -2e^{2x} + e^{x} + 1 \) | | | |

2) Étudier le signe de l'expression \( (2x + 6)e^{x^{2}+6x+2} \). On complètera le tableau ci-dessous :

| \( x \) | \( -\infty \) | | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( 2x + 6 \) | | | |
| Signe de \( e^{x^{2}+6x+2} \) | | | |
| Signe de \( (2x + 6)e^{x^{2}+6x+2} \) | | | |

**Corrigé**
1) a) On a : \( (2e^{x} + 1)(1 - e^{x}) = 2e^{x} - 2e^{2x} + 1 - e^{x} = -2e^{2x} + e^{x} + 1 \)
   b) On a \( 2e^{x} + 1 = 0 \Leftrightarrow e^{x} = -1/2 \) ce qui est impossible.
   On a \( 1 - e^{x} = 0 \Leftrightarrow e^{x} = 1 \Leftrightarrow x = 0 \).
   On en déduit :

| \( x \) | \( -\infty \) | 0 | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( 2e^{x} + 1 \) | + | + | + |
| Signe de \( 1 - e^{x} \) | + | 0 | - |
| Signe de \( -2e^{2x} + e^{x} + 1 \) | + | 0 | - |

2) On a \( 2x + 6 = 0 \Leftrightarrow x = -3 \) et \( m = 2 > 0 \).
   \( e^{x^{2}+6x+2} > 0 \) puisqu'une exponentielle est strictement positive.

| \( x \) | \( -\infty \) | -3 | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( 2x + 6 \) | - | 0 | + |
| Signe de \( e^{x^{2}+6x+2} \) | + | + | + |
| Signe de \( (2x + 6)e^{x^{2}+6x+2} \) | - | 0 | + |

---

## Calculer une dérivée (gratuitement.... pour le plaisir!)

**Exercice 7** Calculer les dérivées des fonctions suivantes :
* \( f(x) = 2e^{x} \)
* \( g(x) = 2x + e^{x} \)
* \( h(x) = e^{2x+1} \)
* \( i(x) = (x^{2} + 3x + 5)e^{x} \)
* \( j(x) = \frac{4e^{x}}{e^{x} + 1} \)
* \( k(x) = \frac{x^{2} + x + 1}{e^{x}} \)
* \( l(x) = 10e^{-0,5x+1} \)
* \( m(x) = (2x - 3)e^{-0,1x} \)
* \( n(x) = e^{-x^{2}+x} \)

**Corrigé**
* \( f \) est de la forme \( ku \), avec \( k \) constante, donc \( f'(x) = 2e^{x} \).
* On a simplement une addition de fonctions simples et dérivables, donc \( g'(x) = 2 + e^{x} \).
* \( h \) est de la forme \( e^{U} \), avec \( U = 2x + 1 \) et \( U' = 2 \), donc \( h'(x) = 2e^{2x+1} \).
* \( i(x) = (x^{2} + 3x + 5)e^{x} \) de la forme \( UV \) avec \( U = x^{2} + 3x + 5 \) et \( V = e^{x} \) et donc \( U' = 2x + 3 \) et \( V' = e^{x} \).
  \( i'(x) = (2x + 3)e^{x} + (x^{2} + 3x + 5)e^{x} \) donc \( i'(x) = e^{x}(x^{2} + 5x + 8) \).
* \( j(x) = \frac{4e^{x}}{e^{x} + 1} \) de la forme \( \frac{U}{V} \) avec \( U = 4e^{x} \) et \( V = e^{x} + 1 \) et donc \( U' = 4e^{x} \) et \( V' = e^{x} \).
  \( j'(x) = \frac{(4e^{x})(e^{x} + 1) - (4e^{x})(e^{x})}{(e^{x} + 1)^{2}} \)
  \( j'(x) = \frac{4e^{2x} + 4e^{x} - 4e^{2x}}{(e^{x} + 1)^{2}} \) donc \( j'(x) = \frac{4e^{x}}{(e^{x} + 1)^{2}} \).
* \( k(x) = \frac{x^{2} + x + 1}{e^{x}} \) de la forme \( \frac{U}{V} \) avec \( U = x^{2} + x + 1 \) et \( V = e^{x} \) et donc \( U' = 2x + 1 \) et \( V' = e^{x} \).
  \( k'(x) = \frac{(2x + 1)e^{x} - (x^{2} + x + 1)e^{x}}{(e^{x})^{2}} = \frac{e^{x}((2x + 1) - (x^{2} + x + 1))}{e^{2x}} \) donc \( k'(x) = \frac{e^{x}(-x^{2} + x)}{e^{2x}} \).
* \( l(x) = 10e^{-0,5x+1} \) de la forme \( e^{U} \) avec \( U = -0,5x + 1 \) et \( U' = -0,5 \).
  \( l'(x) = 10 \times (-0,5)e^{-0,5x+1} \) donc \( l'(x) = -5e^{-0,5x+1} \).
* \( m(x) = (2x - 3)e^{-0,1x} \) de la forme \( UV \) avec \( U = 2x - 3 \) et \( V = e^{-0,1x} \) et donc \( U' = 2 \) et \( V' = -0,1e^{-0,1x} \).
  \( m'(x) = 2e^{-0,1x} + (2x - 3)(-0,1e^{-0,1x}) = e^{-0,1x}(2 - 0,2x + 0,3) \) donc \( m'(x) = e^{-0,1x}(2,3 - 0,2x) \).
* \( n(x) = e^{-x^{2}+x} \) de la forme \( e^{U} \) avec \( U = -x^{2} + x \) et \( U' = -2x + 1 \).
  \( n'(x) = (-2x + 1)e^{-x^{2}+x} \).

---

## Étudier une fonction

**Exercice 8**
Soit \( f \) la fonction définie sur \( \mathbb{R} \) par \( f(x) = (2x + 1)e^{x} \). On note \( \mathcal{C} \) sa courbe représentative.
Pour chaque affirmation suivante, préciser si elle est vraie ou fausse :
1) Le point \( A(0 ; 1) \) appartient à la courbe \( \mathcal{C} \).
2) Pour tout réel \( x \), \( f'(x) = 2e^{x} \).
3) La tangente à la courbe \( \mathcal{C} \) au point d'abscisse \( -1,5 \) est horizontale.
4) La fonction est croissante sur \( \mathbb{R} \).
5) La fonction est positive sur \( \mathbb{R} \).

**Corrigé**
1) \( f(0) = (2 \times 0 + 1)e^{0} = 1 \) donc \( A(0 ; 1) \) appartient bien à la courbe \( \mathcal{C} \). **Affirmation VRAIE**.
2) \( f \) est de la forme \( UV \) avec \( U = 2x + 1 \) et \( V = e^{x} \). \( U' = 2 \) et \( V' = e^{x} \).
   On a donc \( f'(x) = U'V + UV' = 2e^{x} + (2x + 1)e^{x} = 2xe^{x} + 3e^{x} \). **Affirmation FAUSSE**.
3) Une droite (et donc une tangente) est horizontale si et seulement si son coefficient directeur est nul. La tangente à la courbe \( \mathcal{C} \) au point d'abscisse \( -1,5 \) a pour coefficient directeur \( f'(-1,5) \). Or \( f'(x) = 2xe^{x} + 3e^{x} \) donc \( f'(-1,5) = 2 \times (-1,5)e^{-1,5} + 3e^{-1,5} = 0 \). **Affirmation VRAIE**.
4) Étudions le signe de \( f'(x) = 2xe^{x} + 3e^{x} \).
   * Il nous faut la dérivée sous sa forme factorisée : \( f'(x) = e^{x}(2x + 3) \).
   * Signe de la dérivée :

| \( x \) | \( -\infty \) | \( -\frac{3}{2} \) | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( e^{x} \) | + | + | + |
| Signe de \( 2x + 3 \) | - | 0 | + |
| Signe de \( f'(x) \) | - | 0 | + |

   * Variation de \( f \) sur \( \mathbb{R} \) :

| \( x \) | \( -\infty \) | \( -\frac{3}{2} \) | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Variations de \( f \) | | \( f(-1,5) \) | |
| | | | |

   **Affirmation FAUSSE**.
5) Il suffit de regarder le tableau de variations et de voir que \( f(-1,5) < 0 \). **Affirmation FAUSSE**.

---

**Exercice 9**
Soit \( f \) la fonction définie sur \( \mathbb{R} \) par \( f(x) = (3 - 8x)e^{-2x} \). On note \( \mathcal{C} \) la courbe représentative de la fonction \( f \) dans un repère orthonormal \( (O ; \vec{i}, \vec{j}) \).
1) Étudier les variations de \( f \) et dresser son tableau de variations.
2) Déterminer l'équation de la tangente à \( \mathcal{C} \) en 0.
3) Pour quelle valeur de \( x \), \( \mathcal{C} \) admet-elle une tangente parallèle à l'axe des abscisses ?

**Corrigé**
1) \( f \) est du type \( UV \) avec \( U = 3 - 8x \) et \( V = e^{-2x} \), \( U' = -8 \) et \( V' = -2e^{-2x} \).
   On a alors : \( f'(x) = -8e^{-2x} + (3 - 8x) \times (-2e^{-2x}) = (-8 + 3 - 8x)e^{-2x} = (-5 - 8x)e^{-2x} \).
   On sait qu'une exponentielle est strictement positive sur \( \mathbb{R} \).
   \( -5 - 8x = 0 \Leftrightarrow x = -\frac{5}{8} \), on en déduit le tableau de variations suivant :

| \( x \) | \( -\infty \) | \( -\frac{5}{8} \) | \( +\infty \) |
| :--- | :--- | :--- | :--- |
| Signe de \( e^{-2x} \) | + | + | + |
| Signe de \( -5 - 8x \) | + | 0 | - |
| Signe de \( f'(x) \) | + | 0 | - |
| Variations de \( f \) | | \( f(-0,625) \) | |
| | | | |

2) La tangente à \( \mathcal{C} \) en 0 a pour équation : \( y = f'(0)(x - 0) + f(0) \).
   On a \( f'(0) = -5 \) et \( f(0) = 3 \), on en déduit que \( y = -5x + 3 \).

3) La courbe admet une tangente horizontale si et seulement si \( f'(x) = 0 \). D'après le tableau de variations, on en déduit qu'il y a une tangente horizontale au point d'abscisse \( -\frac{5}{8} \).

---

**Exercice 10**
La fonction \( f \) qui à l'altitude \( x \) en kilomètres, associe la pression atmosphérique en hectopascals est définie sur \( [0 ; +\infty[ \) par : \( f(x) = 1\,013,25 e^{-0,12x} \).
1) Calculer \( f'(x) \) et déterminer le sens de variations de \( f \).
2) En 1648, Blaise Pascal et Florin Périer mesurent la hauteur de mercure dans deux baromètres, l'un situé à Clermont-Ferrand et l'autre en haut de la montagne la plus proche, le Puy-de-Dôme. Dans quel baromètre la hauteur de mercure était-elle la plus petite ?

**Corrigé**
1) \( f \) est du type \( e^{U} \), avec \( U = -0,12x \) et \( U' = -0,12 \), on a alors :
   \( f'(x) = 1\,013,25 \times (-0,12)e^{-0,12x} = -121,59 e^{-0,12x} \).
