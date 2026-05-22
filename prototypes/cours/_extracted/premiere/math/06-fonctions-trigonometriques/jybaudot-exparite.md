---
source_url: "https://www.jybaudot.fr/Trigo/exparite.html"
chapter: "06-fonctions-trigonometriques"
role: "td"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:59+00:00"
cleaned_at: "2026-05-22T08:29:21+00:00"
---

## Parité et périodicité

Cette page est rédigée à l’attention des élèves de première générale et des premières STI2D - STL. Elle propose des exercices sur la parité et la périodicité de fonctions trigonométriques. Il n'est pas nécessaire de connaître les règles de dérivation.

### Rappels

- La fonction cosinus est paire car \( \cos(x) = \cos(-x) \).
- La fonction sinus est impaire car \( \sin(-x) = -\sin(x) \).
- \( \sin(x + \pi) = -\sin(x) \)
- \( \cos(x + \pi) = -\cos(x) \)
- \( \sin(x + 2\pi) = \sin(x) \)
- \( \cos(x + 2\pi) = \cos(x) \)

### Exercice 1

Soit la fonction \( f \) définie sur \( \mathbb{R} \) par \( f(x) = \sin(x) \cos(x) \).

**A.** Étudier la parité de \( f \).

**B.** Montrer que \( f \) est \( \pi \)-périodique.

### Exercice 2

Soit la fonction \( g \) définie sur \( \mathbb{R} \) par \( g(x) = 2\cos(-2x) \).

**A.** Étudier la parité de \( g \).

**B.** Montrer que \( g \) est \( \pi \)-périodique.

**C.** Dresser un tableau de variation de \( g \).

### Exercice 3

Soit la fonction \( h \) définie sur \( \mathbb{R} \) par \( h(x) = \cos^2(x) - \cos(x) - 1 \).

**A.** Étudier la parité de \( h \).

**B.** Étudier la périodicité de \( h \).

**C.** Tracer la courbe représentative de \( h \) avec une calculatrice.

---

### Corrigé 1

\( f(x) = \sin(x) \cos(x) \).

**A.**
\( f(-x) = \sin(-x) \cos(-x) = \sin(-x) \cos(x) \).
La fonction \( f \) n'est pas paire.
\( -f(x) = -\sin(x) \cos(x) = \sin(-x) \cos(-x) \).
La fonction \( f \) est impaire.

**B.**
\( \sin(x + \pi) \cos(x + \pi) = (-\sin(x)) \times (-\cos(x)) = \sin(x) \cos(x) \).
La fonction \( f \) est \( \pi \)-périodique.

### Corrigé 2

\( g(x) = 2\cos(-2x) \).

**A.**
\( 2\cos(-2x) = 2\cos(2x) \).
La fonction \( g \) est paire.
\( -2\cos(-2x) \neq 2\cos(2x) \).
La fonction \( g \) n'est pas impaire.

**B.**
\( 2\cos(-2(x + \pi)) = 2\cos(-2x - 2\pi) = 2\cos(-2x) \).
La fonction \( g \) est \( \pi \)-périodique.

**C.**
Comme la fonction est périodique, le tableau de variation zoome sur une période qu'il est inutile de multiplier (surtout que l'infini, c'est long…). Nous retiendrons l'intervalle \( [0; \pi] \). Les variations sont les mêmes que celles de la fonction cosinus.
Nous devons calculer deux valeurs de \( g \) : le maximum et le minimum.
\( g(0) = 2\cos(0) = 2 \).
Comme \( g \) est \( \pi \)-périodique et que la fonction cosinus présente une symétrie pour chaque période, le minimum est atteint pour \( x = \frac{\pi}{2} \).
\( g\left(\frac{\pi}{2}\right) = 2\cos(-\pi) = -2 \).

![tableau de variation](https://www.jybaudot.fr/Trigo/Tableaux/varfct.png)

### Corrigé 3

\( h(x) = \cos^2(x) - \cos(x) - 1 \).

**A.**
\( h(-x) = \cos^2(-x) - \cos(-x) - 1 = \cos^2(x) - \cos(x) - 1 \).
La fonction \( h \) est paire.
\( -h(x) = -\cos^2(x) + \cos(x) + 1 \neq h(x) \).
La fonction \( h \) n'est pas impaire.

**B.**
La fonction cosinus étant périodique de période \( 2\pi \), il en est de même pour \( h \).
\( h(x) = h(x + 2\pi) \).

**C.**
Avec une TI-83 Premium CE...

![courbe](https://www.jybaudot.fr/Trigo/Graphes/fct.png)
