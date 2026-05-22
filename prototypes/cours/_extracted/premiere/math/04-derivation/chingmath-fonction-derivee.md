---
source_url: "https://chingmath.fr/1re/fonction-derivee"
chapter: "04-derivation"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:59+00:00"
cleaned_at: "2026-05-22T08:29:09+00:00"
---

## Fonctions dérivées

### Définition du nombre dérivé

> **Définition**
> Soit \( f \) une fonction définie sur un intervalle \( I \) et \( a \in I \).
> On appelle **taux d'accroissement** de \( f \) entre \( a \) et \( a+h \) (avec \( h \neq 0 \) et \( a+h \in I \)) le quotient :
> \[
> \frac{f(a+h)-f(a)}{h}
> \]
> Si ce quotient admet une limite finie lorsque \( h \) tend vers 0, on dit que \( f \) est **dérivable** en \( a \).
> Cette limite est appelée **nombre dérivé** de \( f \) en \( a \), noté \( f'(a) \) :
> \[
> f'(a) = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}
> \]

### Interprétation graphique

> **Propriété**
> Si \( f \) est dérivable en \( a \), alors la courbe représentative de \( f \) admet une tangente au point \( A(a; f(a)) \).
> Le coefficient directeur de cette tangente est \( f'(a) \).
> Une équation de la tangente est :
> \[
> y = f'(a)(x-a) + f(a)
> \]

### Fonction dérivée

> **Définition**
> On appelle **fonction dérivée** (ou simplement **dérivée**) de \( f \) la fonction notée \( f' \) qui, à tout \( x \) où \( f \) est dérivable, associe le nombre dérivé \( f'(x) \).

### Dérivées des fonctions usuelles

| Fonction \( f(x) \) | Dérivée \( f'(x) \) | Intervalle de dérivabilité |
|:---:|:---:|:---:|
| \( k \) (constante) | \( 0 \) | \( \mathbb{R} \) |
| \( x \) | \( 1 \) | \( \mathbb{R} \) |
| \( x^2 \) | \( 2x \) | \( \mathbb{R} \) |
| \( x^3 \) | \( 3x^2 \) | \( \mathbb{R} \) |
| \( x^n \) (\( n \in \mathbb{N}^* \)) | \( n x^{n-1} \) | \( \mathbb{R} \) |
| \( \frac{1}{x} \) | \( -\frac{1}{x^2} \) | \( ]-\infty;0[ \cup ]0;+\infty[ \) |
| \( \sqrt{x} \) | \( \frac{1}{2\sqrt{x}} \) | \( ]0;+\infty[ \) |

### Opérations sur les dérivées

Soit \( u \) et \( v \) deux fonctions dérivables sur un intervalle \( I \).

| Opération | Dérivée |
|:---:|:---:|
| Somme : \( u+v \) | \( u' + v' \) |
| Produit par une constante : \( k u \) | \( k u' \) |
| Produit : \( u v \) | \( u'v + uv' \) |
| Inverse : \( \frac{1}{v} \) (avec \( v(x) \neq 0 \)) | \( -\frac{v'}{v^2} \) |
| Quotient : \( \frac{u}{v} \) (avec \( v(x) \neq 0 \)) | \( \frac{u'v - uv'}{v^2} \) |

### Exemple résolu

**Énoncé** : Soit \( f(x) = 3x^2 - 5x + 2 \). Calculer \( f'(x) \) puis déterminer l'équation de la tangente à la courbe de \( f \) au point d'abscisse \( a = 1 \).

**Correction** :
1. Calcul de la dérivée :
   \[
   f'(x) = 3 \times 2x - 5 = 6x - 5
   \]
2. Valeur du nombre dérivé en \( a = 1 \) :
   \[
   f'(1) = 6 \times 1 - 5 = 1
   \]
3. Valeur de la fonction en \( a = 1 \) :
   \[
   f(1) = 3 \times 1^2 - 5 \times 1 + 2 = 0
   \]
4. Équation de la tangente :
   \[
   y = f'(1)(x-1) + f(1) = 1 \times (x-1) + 0 = x - 1
   \]

### Exercices

#### Exercice 1
Calculer la dérivée des fonctions suivantes :
1. \( f(x) = 4x^3 - 2x^2 + 7x - 1 \)
2. \( g(x) = \frac{5}{x} + 3\sqrt{x} \)
3. \( h(x) = (2x+1)(x^2-3) \)

#### Exercice 2
Soit \( f(x) = \frac{2x+1}{x-3} \) définie sur \( ]3;+\infty[ \).
1. Calculer \( f'(x) \).
2. Déterminer l'équation de la tangente à la courbe de \( f \) au point d'abscisse \( a = 4 \).

#### Exercice 3
On considère la fonction \( f \) définie sur \( \mathbb{R} \) par \( f(x) = x^3 - 3x + 1 \).
1. Calculer \( f'(x) \).
2. Déterminer les abscisses des points où la tangente à la courbe de \( f \) est horizontale.
3. Donner une équation de la tangente au point d'abscisse \( a = 0 \).

### Correction des exercices

#### Correction de l'exercice 1
1. \( f'(x) = 4 \times 3x^2 - 2 \times 2x + 7 = 12x^2 - 4x + 7 \)
2. \( g'(x) = 5 \times \left(-\frac{1}{x^2}\right) + 3 \times \frac{1}{2\sqrt{x}} = -\frac{5}{x^2} + \frac{3}{2\sqrt{x}} \)
3. On pose \( u(x) = 2x+1 \) et \( v(x) = x^2-3 \). Alors \( u'(x)=2 \) et \( v'(x)=2x \).
   \( h'(x) = u'(x)v(x) + u(x)v'(x) = 2(x^2-3) + (2x+1)(2x) = 2x^2 - 6 + 4x^2 + 2x = 6x^2 + 2x - 6 \)

#### Correction de l'exercice 2
1. On pose \( u(x)=2x+1 \) et \( v(x)=x-3 \). Alors \( u'(x)=2 \) et \( v'(x)=1 \).
   \[
   f'(x) = \frac{u'(x)v(x) - u(x)v'(x)}{v(x)^2} = \frac{2(x-3) - (2x+1)(1)}{(x-3)^2} = \frac{2x-6 - 2x - 1}{(x-3)^2} = \frac{-7}{(x-3)^2}
   \]
2. \( f(4) = \frac{2\times4+1}{4-3} = \frac{9}{1} = 9 \) et \( f'(4) = \frac{-7}{(4-3)^2} = -7 \).
   Équation de la tangente : \( y = f'(4)(x-4) + f(4) = -7(x-4) + 9 = -7x + 28 + 9 = -7x + 37 \)

#### Correction de l'exercice 3
1. \( f'(x) = 3x^2 - 3 \)
2. La tangente est horizontale lorsque \( f'(x)=0 \), soit \( 3x^2 - 3 = 0 \) donc \( x^2 = 1 \).
   Les solutions sont \( x = 1 \) et \( x = -1 \).
3. \( f(0) = 0^3 - 3\times0 + 1 = 1 \) et \( f'(0) = 3\times0^2 - 3 = -3 \).
   Équation de la tangente : \( y = f'(0)(x-0) + f(0) = -3x + 1 \)
