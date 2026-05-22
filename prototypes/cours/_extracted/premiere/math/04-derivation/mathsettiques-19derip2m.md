---
source_url: "https://www.maths-et-tiques.fr/telech/19DeriP2M.pdf"
chapter: "04-derivation"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:47+00:00"
cleaned_at: "2026-05-22T08:24:35+00:00"
---

## DÉRIVATION – Chapitre 2/3

Tout le cours en vidéo : [https://youtu.be/uMSNllPBFhQ](https://youtu.be/uMSNllPBFhQ)

### Partie 1 : Dérivées des fonctions usuelles

#### 1) Exemples d’introduction

**Démonstration au programme : Dérivée de la fonction carré**
Vidéo [https://youtu.be/-nRmE8yFSSg](https://youtu.be/-nRmE8yFSSg)

Soit la fonction \( f \) définie sur \( \mathbb{R} \) par \( f(x) = x^2 \). Démontrons que pour tout \( x \) réel, on a : \( f'(x) = 2x \).

Calculons le nombre dérivé de la fonction \( f \) en \( a \) (nombre réel quelconque).

Pour \( h \neq 0 \) :
\[
\frac{f(a+h) - f(a)}{h} = \frac{(a+h)^2 - a^2}{h} = \frac{a^2 + 2ah + h^2 - a^2}{h} = \frac{h(2a + h)}{h} = 2a + h
\]

Or :
\[
\lim_{h \to 0} \frac{f(a+h) - f(a)}{h} = \lim_{h \to 0} (2a + h) = 2a
\]

Pour tout nombre \( a \), on associe le nombre dérivé de la fonction \( f \) égal à \( 2a \). On a donc défini sur \( \mathbb{R} \) une fonction, notée \( f' \), dont l'expression est \( f'(x) = 2x \). Cette fonction s'appelle la **fonction dérivée** de \( f \).

> Le mot « dérivé » vient du latin « derivare » qui signifiait « détourner un cours d’eau ». Le mot a été introduit par le mathématicien franco-italien Joseph Louis Lagrange (1736 ; 1813) pour signifier que cette nouvelle fonction dérive (au sens de "provenir") d'une autre fonction.

**Démonstration au programme : Dérivée de la fonction inverse**
Vidéo [https://youtu.be/rQ1XfMN5pdk](https://youtu.be/rQ1XfMN5pdk)

Soit la fonction \( f \) définie sur \( \mathbb{R} \setminus \{0\} \) par \( f(x) = \frac{1}{x} \). Démontrons que pour tout \( x \) de \( \mathbb{R} \setminus \{0\} \), on a : \( f'(x) = -\frac{1}{x^2} \).

Pour \( h \neq 0 \) et \( h \neq -a \) :
\[
\frac{f(a+h) - f(a)}{h} = \frac{\frac{1}{a+h} - \frac{1}{a}}{h} = \frac{\frac{a - (a+h)}{a(a+h)}}{h} = \frac{-h}{a(a+h)} \times \frac{1}{h} = -\frac{1}{a(a+h)}
\]

Or :
\[
\lim_{h \to 0} \frac{f(a+h) - f(a)}{h} = \lim_{h \to 0} \left( -\frac{1}{a(a+h)} \right) = -\frac{1}{a^2}
\]

Pour tout nombre \( a \), on associe le nombre dérivé de la fonction \( f \) égal à \( -\frac{1}{a^2} \). Ainsi, pour tout \( x \) de \( \mathbb{R} \setminus \{0\} \), on a : \( f'(x) = -\frac{1}{x^2} \).

> **Définitions :** On dit que la fonction \( f \) est **dérivable** sur un intervalle \( I \), si elle est dérivable en tout réel de \( I \). Dans ce cas, la fonction qui à tout réel \( x \) de \( I \) associe le nombre dérivé de \( f \) en \( x \) est appelée **fonction dérivée** de \( f \) et se note \( f' \).

#### 2) Dérivées des fonctions usuelles

| Fonction | Dérivée |
| :--- | :--- |
| \( f(x) = a, \ a \in \mathbb{R} \) | \( f'(x) = 0 \) |
| \( f(x) = ax, \ a \in \mathbb{R} \) | \( f'(x) = a \) |
| \( f(x) = x^2 \) | \( f'(x) = 2x \) |
| \( f(x) = x^n, \ n \ge 1 \text{ entier} \) | \( f'(x) = n x^{n-1} \) |
| \( f(x) = \frac{1}{x} \) | \( f'(x) = -\frac{1}{x^2} \) |
| \( f(x) = \frac{1}{x^n}, \ n \ge 1 \text{ entier} \) | \( f'(x) = -\frac{n}{x^{n+1}} \) |
| \( f(x) = \sqrt{x} \) | \( f'(x) = \frac{1}{2\sqrt{x}} \) |

**Méthode : Dériver les fonctions usuelles**
Vidéo [https://youtu.be/9Mann4wOGJA](https://youtu.be/9Mann4wOGJA)

Calculer la dérivée de chacune des fonctions :
\( f(x) = 100 \) ; \( g(x) = -5x \) ; \( h(x) = x^4 \) ; \( k(x) = \frac{1}{x^5} \) ; \( m(x) = \sqrt{x} \)

**Correction**
- \( f(x) = 100 \rightarrow f'(x) = 0 \)
- \( g(x) = -5x \rightarrow g'(x) = -5 \)
- \( h(x) = x^4 \rightarrow h'(x) = 4x^3 \)
- \( k(x) = \frac{1}{x^5} \rightarrow k'(x) = -\frac{5}{x^6} \)
- \( m(x) = \sqrt{x} \rightarrow m'(x) = \frac{1}{2\sqrt{x}} \)

#### 3) Cas de la fonction racine carrée

On peut lire dans le tableau plus haut que la fonction racine carrée est définie sur l’intervalle \( [0 ; +\infty[ \) mais dérivable sur l’intervalle \( ]0 ; +\infty[ \).

**Démonstration au programme : Non dérivabilité de la fonction racine carrée en 0**
Vidéo [https://youtu.be/N5wnOoLDrjo](https://youtu.be/N5wnOoLDrjo)

Soit la fonction \( f \) définie sur \( [0 ; +\infty[ \) par \( f(x) = \sqrt{x} \). On calcule le taux d’accroissement de \( f \) en 0 :

Pour \( h > 0 \) :
\[
\frac{f(0+h) - f(0)}{h} = \frac{\sqrt{0+h} - \sqrt{0}}{h} = \frac{\sqrt{h}}{h} = \frac{\sqrt{h}}{\sqrt{h} \times \sqrt{h}} = \frac{1}{\sqrt{h}}
\]

Or :
\[
\lim_{h \to 0} \frac{f(0+h) - f(0)}{h} = \lim_{h \to 0} \frac{1}{\sqrt{h}} = +\infty
\]

En effet, lorsque \( h \) tend vers 0, \( \frac{1}{\sqrt{h}} \) prend des valeurs de plus en plus grandes. Donc \( f \) n’est pas dérivable en 0.

Géométriquement, cela signifie que la courbe représentative de la fonction racine carrée admet une tangente verticale en 0.

### Partie 2 : Opérations sur les fonctions dérivées

#### 1) Opérations sur les fonctions dérivées

\( u \) et \( v \) sont deux fonctions dérivables.

**Démonstration au programme pour le produit :**
Vidéo [https://youtu.be/PI4A8TLGnxE](https://youtu.be/PI4A8TLGnxE)

Soit \( u \) et \( v \) deux fonctions dérivables sur un intervalle \( I \). On veut démontrer que pour tout \( a \) de \( I \), on a :
\[
\lim_{h \to 0} \frac{(uv)(a+h) - (uv)(a)}{h} = u'(a)v(a) + u(a)v'(a)
\]

\[
\frac{(uv)(a+h) - (uv)(a)}{h} = \frac{u(a+h)v(a+h) - u(a)v(a)}{h}
\]
\[
= \frac{u(a+h)v(a+h) - u(a)v(a+h) + u(a)v(a+h) - u(a)v(a)}{h}
\]
\[
= \frac{(u(a+h) - u(a))v(a+h) + u(a)(v(a+h) - v(a))}{h}
\]
\[
= \frac{u(a+h) - u(a)}{h} v(a+h) + u(a) \frac{v(a+h) - v(a)}{h}
\]

En passant à la limite lorsque \( h \) tend vers 0, on a :
\[
\lim_{h \to 0} \frac{u(a+h) - u(a)}{h} = u'(a) \quad \text{et} \quad \lim_{h \to 0} \frac{v(a+h) - v(a)}{h} = v'(a)
\]
Car \( u \) et \( v \) sont dérivables sur \( I \). Et, \( \lim_{h \to 0} v(a+h) = v(a) \).

Soit :
\[
\lim_{h \to 0} \frac{(uv)(a+h) - (uv)(a)}{h} = u'(a)v(a) + u(a)v'(a)
\]

Ainsi : \( (uv)' = u'v + uv' \)

| Fonction | Dérivée |
| :--- | :--- |
| \( f(x) = u(x) + v(x) \) | \( f'(x) = u'(x) + v'(x) \) |
| \( f(x) = k u(x), \ k \in \mathbb{R} \) | \( f'(x) = k u'(x) \) |
| \( f(x) = u(x) v(x) \) | \( f'(x) = u'(x) v(x) + u(x) v'(x) \) |
| \( f(x) = \frac{1}{u(x)} \) | \( f'(x) = -\frac{u'(x)}{u(x)^2} \) |
| \( f(x) = \frac{u(x)}{v(x)} \) | \( f'(x) = \frac{u'(x) v(x) - u(x) v'(x)}{v(x)^2} \) |

**Méthode : Calculer les dérivées de sommes, produits et quotients de fonctions**
Vidéos : [https://youtu.be/ehHoLK98Ht0](https://youtu.be/ehHoLK98Ht0) | [https://youtu.be/1fOGueiO_zk](https://youtu.be/1fOGueiO_zk) | [https://youtu.be/OMsZNNIIdrw](https://youtu.be/OMsZNNIIdrw) | [https://youtu.be/jOuC7aq3YkM](https://youtu.be/jOuC7aq3YkM) | [https://youtu.be/-MfEczGz_6Y](https://youtu.be/-MfEczGz_6Y)

Dans chaque cas, calculer la fonction dérivée de \( f \) :

a) \( f(x) = 3x^2 + 4\sqrt{x} \)
b) \( f(x) = 5x^3 - 3x^2 \)
c) \( f(x) = (3x^2 + 4x)(5x - 1) \)
d) \( f(x) = \frac{1}{2x^2 + 5x} \)
e) \( f(x) = \frac{6x - 5}{x^2 - 2x - 1} \)

**Correction**

a) \( f(x) = u(x) + v(x) \) avec
- \( u(x) = 3x^2 \rightarrow u'(x) = 3 \times 2x = 6x \)
- \( v(x) = 4\sqrt{x} \rightarrow v'(x) = 4 \times \frac{1}{2\sqrt{x}} = \frac{2}{\sqrt{x}} \)

Donc : \( f'(x) = u'(x) + v'(x) = 6x + \frac{2}{\sqrt{x}} \)

b) \( f(x) = u(x) + v(x) \) avec
- \( u(x) = 5x^3 \rightarrow u'(x) = 5 \times 3x^2 = 15x^2 \)
- \( v(x) = -3x^2 \rightarrow v'(x) = -3 \times 2x = -6x \)

Donc : \( f'(x) = u'(x) + v'(x) = 15x^2 + (-6x) = 15x^2 - 6x \)

c) \( f(x) = u(x) v(x) \) avec
- \( u(x) = 3x^2 + 4x \rightarrow u'(x) = 6x + 4 \)
- \( v(x) = 5x - 1 \rightarrow v'(x) = 5 \)

Donc :
\[
f'(x) = u'(x) v(x) + u(x) v'(x) = (6x + 4)(5x - 1) + (3x^2 + 4x) \times 5
\]
\[
= 30x^2 - 6x + 20x - 4 + 15x^2 + 20x = 45x^2 + 34x - 4
\]

d) \( f(x) = \frac{1}{u(x)} \) avec \( u(x) = 2x^2 + 5x \rightarrow u'(x) = 4x + 5 \)

Donc :
\[
f'(x) = -\frac{u'(x)}{u(x)^2} = -\frac{4x + 5}{(2x^2 + 5x)^2}
\]

e) \( f(x) = \frac{u(x)}{v(x)} \) avec
- \( u(x) = 6x - 5 \rightarrow u'(x) = 6 \)
- \( v(x) = x^2 - 2x - 1 \rightarrow v'(x) = 2x - 2 \)

Donc :
\[
f'(x) = \frac{u'(x) v(x) - u(x) v'(x)}{v(x)^2} = \frac{6(x^2 - 2x - 1) - (6x - 5)(2x - 2)}{(x^2 - 2x - 1)^2}
\]
\[
= \frac{6x^2 - 12x - 6 - (12x^2 - 12x - 10x + 10)}{(x^2 - 2x - 1)^2}
\]
\[
= \frac{6x^2 - 12x - 6 - 12x^2 + 22x - 10}{(x^2 - 2x - 1)^2} = \frac{-6x^2 + 10x - 16}{(x^2 - 2x - 1)^2}
\]

#### 2) Dérivée d’une fonction composée

| Fonction | Dérivée |
| :--- | :--- |
| \( f(ax + b) \) | \( a f'(ax + b) \) |

**Méthode : Dériver une fonction composée \( f(ax + b) \)**
Vidéo [https://youtu.be/aFkPQkg0p-A](https://youtu.be/aFkPQkg0p-A)

Calculer les fonctions dérivées des fonctions \( g \) et \( h \) définies par :
\( g(x) = (7x + 1)^3 \)
\( h(x) = \sqrt{5x - 4} \)

**Correction**

1) \( g(x) = (7x + 1)^3 \)
\[
g'(x) = 7 \times 3(7x + 1)^2 = 21(7x + 1)^2
\]
En effet, la dérivée de la fonction cube est \( (x^3)' = 3x^2 \).

2) \( h(x) = \sqrt{5x - 4} \)
\[
h'(x) = 5 \times \frac{1}{2\sqrt{5x - 4}} = \frac{5}{2\sqrt{5x - 4}}
\]
En effet, la dérivée de la fonction racine carrée est \( (\sqrt{x})' = \frac{1}{2\sqrt{x}} \).

---

*Hors du cadre de la classe, aucune reproduction, même partielle, autres que celles prévues à l'article L 122-5 du code de la propriété intellectuelle, ne peut être faite de ce site sans l'autorisation expresse de l'auteur.*
*[www.maths-et-tiques.fr/index.php/mentions-legales](http://www.maths-et-tiques.fr/index.php/mentions-legales)*
