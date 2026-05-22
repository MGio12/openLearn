---
source_url: "https://www.annales2maths.com/1ere-cours-fonctions-trigonometriques/"
chapter: "06-fonctions-trigonometriques"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:18+00:00"
cleaned_at: "2026-05-22T08:32:29+00:00"
---

# 1ère – Cours – Fonctions trigonométriques

## I Définitions

> **Définition 1 :** On appelle **fonction cosinus** la fonction, notée cos, qui, à tout réel \(x\), associe le nombre \(\cos(x)\).

\[
\begin{array}{c|cccccccc}
x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} & \frac{2\pi}{3} & \frac{3\pi}{4} & \frac{5\pi}{6} & \pi \\ \hline
\cos(x) & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 & -\frac{1}{2} & -\frac{\sqrt{2}}{2} & -\frac{\sqrt{3}}{2} & -1
\end{array}
\]

> **Définition 2 :** On appelle **fonction sinus** la fonction, notée sin, qui, à tout réel \(x\), associe le nombre \(\sin(x)\).

\[
\begin{array}{c|cccccccc}
x & -\frac{\pi}{2} & -\frac{\pi}{3} & -\frac{\pi}{4} & -\frac{\pi}{6} & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} \\ \hline
\cos(x) & -1 & -\frac{\sqrt{3}}{2} & -\frac{\sqrt{2}}{2} & -\frac{1}{2} & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1
\end{array}
\]

## II Propriétés

> **Propriété 1 (parité) :**
> 1. La fonction cosinus est paire.
> 2. La fonction sinus est impaire.

**Preuve de la Propriété 1 :**
1. Pour tout réel \(x\), le point \(M\) du cercle trigonométrique associé au réel \(x\) et le point \(M'\) du cercle trigonométrique associé au réel \(-x\) sont symétriques par rapport à l’axe des abscisses. Ils ont donc la même abscisse. Ainsi, pour tout réel \(x\), on a \(\cos(-x) = \cos(x)\). La fonction cosinus est par conséquent paire.
2. Pour tout réel \(x\), le point \(M\) du cercle trigonométrique associé au réel \(x\) et le point \(M'\) du cercle trigonométrique associé au réel \(-x\) sont symétriques par rapport à l’axe des abscisses. Ils ont donc des ordonnées opposées. Ainsi, pour tout réel \(x\), on a \(\sin(-x) = -\sin(x)\). La fonction sinus est par conséquent impaire.

**Remarque :** Cela signifie donc que la courbe représentant la fonction cosinus est symétrique par rapport à l’axe des ordonnées et que la courbe représentant la fonction sinus est symétrique par rapport à l’origine du repère.

> **Définition 2 :** On dit qu’une fonction \(f\), dont l’ensemble de définition est \(D_f\), est **périodique** de période \(T\) si :
> * Pour tout réel \(x \in D_f\) on a \((x+T) \in D_f\) ;
> * Pour tout réel \(x\) on a \(f(x+T) = f(x)\).

> **Propriété 2 (périodicité) :** Les fonctions cosinus et sinus sont périodiques de période \(2\pi\). Cela signifie que, pour tout réel \(x\), on a \(\cos(x+2\pi) = \cos(x)\) et \(\sin(x+2\pi) = \sin(x)\).

**Preuve de la Propriété 2 :**
Pour tout réel \(x\), les points du cercle trigonométrique associés aux réels \(x\) et \(x+2\pi\) sont confondus. Ils ont donc la même abscisse et la même ordonnée. Par conséquent \(\cos(x+2\pi) = \cos(x)\) et \(\sin(x+2\pi) = \sin(x)\).

## III Représentations graphiques

Les courbes représentant les fonctions cosinus et sinus sont appelées des **sinusoïdes**.

* **Fonction cosinus**
  ![Courbe de la fonction cosinus](https://www.annales2maths.com/wp-content/uploads/2020/04/1%C3%A8re-cours-fonctions-trigonom%C3%A9triques-cosinus.png)
  La courbe est symétrique par rapport à l’axe des ordonnées (parité) et deux points dont les abscisses sont séparées de \(2\pi\) ont la même ordonnée (périodicité).

* **Fonction sinus**
  ![Courbe de la fonction sinus](https://www.annales2maths.com/wp-content/uploads/2020/04/1%C3%A8re-cours-fonctions-trigonom%C3%A9triques-sinus.png)
  La courbe est symétrique par rapport à l’origine du repère (parité) et deux points dont les abscisses sont séparées de \(2\pi\) ont la même ordonnée (périodicité).

## Fonctions trigonométriques (Partie 2/2)

### Parité et périodicité

> **Définition : Parité**
> Une fonction \(f\) définie sur un ensemble \(D\) symétrique par rapport à 0 est :
> * **paire** si pour tout \(x \in D\), \(f(-x) = f(x)\).
> * **impaire** si pour tout \(x \in D\), \(f(-x) = -f(x)\).

> **Définition : Périodicité**
> Une fonction \(f\) définie sur \(\mathbb{R}\) est **périodique** de période \(T\) (avec \(T > 0\)) si pour tout \(x \in \mathbb{R}\), \(f(x+T) = f(x)\).

**Propriétés :**
* La fonction cosinus est paire : \(\cos(-x) = \cos(x)\).
* La fonction sinus est impaire : \(\sin(-x) = -\sin(x)\).
* Les fonctions cosinus et sinus sont périodiques de période \(2\pi\) :
  \[
  \cos(x+2\pi) = \cos(x) \quad \text{et} \quad \sin(x+2\pi) = \sin(x).
  \]

**Conséquences pour l'étude :**
* Pour la fonction cosinus, on peut étudier sur \([0; \pi]\) puis compléter par symétrie par rapport à l'axe des ordonnées.
* Pour la fonction sinus, on peut étudier sur \([0; \pi]\) puis compléter par symétrie par rapport à l'origine.
* Grâce à la périodicité, il suffit de connaître la fonction sur un intervalle de longueur \(2\pi\), par exemple \([-\pi; \pi]\).

### Étude des fonctions cosinus et sinus

#### Fonction cosinus

> **Définition**
> La fonction cosinus est la fonction définie sur \(\mathbb{R}\) par \(f(x) = \cos(x)\).

**Étude sur \([0; \pi]\) :**
* Dérivée : \(f'(x) = -\sin(x)\).
* Sur \([0; \pi]\), \(\sin(x) \ge 0\) donc \(f'(x) \le 0\) : la fonction cosinus est décroissante sur \([0; \pi]\).
* Tableau de variation :
  \[
  \begin{array}{c|ccc}
  x & 0 & & \pi \\
  \hline
  f'(x) & 0 & - & 0 \\
  \hline
  f(x) & 1 & \searrow & -1
  \end{array}
  \]

**Représentation graphique :**
* La courbe de la fonction cosinus sur \([-\pi; \pi]\) s'obtient par symétrie par rapport à l'axe des ordonnées.
* Puis par translation de période \(2\pi\), on obtient la courbe sur \(\mathbb{R}\).

#### Fonction sinus

> **Définition**
> La fonction sinus est la fonction définie sur \(\mathbb{R}\) par \(f(x) = \sin(x)\).

**Étude sur \([0; \pi]\) :**
* Dérivée : \(f'(x) = \cos(x)\).
* Sur \([0; \pi]\), \(\cos(x) \ge 0\) sur \([0; \frac{\pi}{2}]\) et \(\cos(x) \le 0\) sur \([\frac{\pi}{2}; \pi]\).
* Tableau de variation :
  \[
  \begin{array}{c|ccccc}
  x & 0 & & \frac{\pi}{2} & & \pi \\
  \hline
  f'(x) & 1 & + & 0 & - & -1 \\
  \hline
  f(x) & 0 & \nearrow & 1 & \searrow & 0
  \end{array}
  \]

**Représentation graphique :**
* La courbe de la fonction sinus sur \([-\pi; \pi]\) s'obtient par symétrie par rapport à l'origine.
* Puis par translation de période \(2\pi\), on obtient la courbe sur \(\mathbb{R}\).

### Valeurs remarquables

\[
\begin{array}{|c|c|c|c|c|c|c|}
\hline
x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} & \pi \\
\hline
\cos(x) & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 & -1 \\
\hline
\sin(x) & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1 & 0 \\
\hline
\end{array}
\]

### Équations trigonométriques

> **Propriété : Équation \(\cos(x) = \cos(a)\)**
> Les solutions de l'équation \(\cos(x) = \cos(a)\) sont :
> \[
> x = a + 2k\pi \quad \text{ou} \quad x = -a + 2k\pi, \quad k \in \mathbb{Z}.
> \]

> **Propriété : Équation \(\sin(x) = \sin(a)\)**
> Les solutions de l'équation \(\sin(x) = \sin(a)\) sont :
> \[
> x = a + 2k\pi \quad \text{ou} \quad x = \pi - a + 2k\pi, \quad k \in \mathbb{Z}.
> \]

**Exemple :** Résoudre \(\cos(x) = \frac{1}{2}\) dans \(\mathbb{R}\).
* On a \(\frac{1}{2} = \cos\left(\frac{\pi}{3}\right)\).
* Les solutions sont :
  \[
  x = \frac{\pi}{3} + 2k\pi \quad \text{ou} \quad x = -\frac{\pi}{3} + 2k\pi, \quad k \in \mathbb{Z}.
  \]

**Exemple :** Résoudre \(\sin(x) = \frac{\sqrt{2}}{2}\) dans \(\mathbb{R}\).
* On a \(\frac{\sqrt{2}}{2} = \sin\left(\frac{\pi}{4}\right)\).
* Les solutions sont :
  \[
  x = \frac{\pi}{4} + 2k\pi \quad \text{ou} \quad x = \pi - \frac{\pi}{4} + 2k\pi = \frac{3\pi}{4} + 2k\pi, \quad k \in \mathbb{Z}.
  \]

### Inéquations trigonométriques

**Méthode :** On utilise le cercle trigonométrique pour déterminer les intervalles solutions.

**Exemple :** Résoudre \(\cos(x) \ge \frac{1}{2}\) sur \([0; 2\pi]\).
* Sur le cercle trigonométrique, \(\cos(x) \ge \frac{1}{2}\) correspond aux points d'abscisse \(\ge \frac{1}{2}\).
* On obtient \(x \in \left[0; \frac{\pi}{3}\right] \cup \left[\frac{5\pi}{3}; 2\pi\right]\).

**Exemple :** Résoudre \(\sin(x) < \frac{\sqrt{2}}{2}\) sur \([0; 2\pi]\).
* Sur le cercle trigonométrique, \(\sin(x) < \frac{\sqrt{2}}{2}\) correspond aux points d'ordonnée \(< \frac{\sqrt{2}}{2}\).
* On obtient \(x \in \left[0; \frac{\pi}{4}\right[ \cup \left]\frac{3\pi}{4}; 2\pi\right]\).

### Formules d'addition et de duplication

> **Formules d'addition :**
> \[
> \begin{aligned}
> \cos(a+b) &= \cos(a)\cos(b) - \sin(a)\sin(b) \\
> \cos(a-b) &= \cos(a)\cos(b) + \sin(a)\sin(b) \\
> \sin(a+b) &= \sin(a)\cos(b) + \cos(a)\sin(b) \\
> \sin(a-b) &= \sin(a)\cos(b) - \cos(a)\sin(b)
> \end{aligned}
> \]

> **Formules de duplication :**
> \[
> \begin{aligned}
> \cos(2a) &= \cos^2(a) - \sin^2(a) = 2\cos^2(a) - 1 = 1 - 2\sin^2(a) \\
> \sin(2a) &= 2\sin(a)\cos(a)
> \end{aligned}
> \]

**Exemple :** Calculer \(\cos\left(\frac{\pi}{12}\right)\).
* On écrit \(\frac{\pi}{12} = \frac{\pi}{3} - \frac{\pi}{4}\).
* \[
  \cos\left(\frac{\pi}{12}\right) = \cos\left(\frac{\pi}{3} - \frac{\pi}{4}\right) = \cos\left(\frac{\pi}{3}\right)\cos\left(\frac{\pi}{4}\right) + \sin\left(\frac{\pi}{3}\right)\sin\left(\frac{\pi}{4}\right)
  \]
* \[
  \cos\left(\frac{\pi}{12}\right) = \frac{1}{2} \times \frac{\sqrt{2}}{2} + \frac{\sqrt{3}}{2} \times \frac{\sqrt{2}}{2} = \frac{\sqrt{2} + \sqrt{6}}{4}
  \]

**Exemple :** Exprimer \(\sin(3x)\) en fonction de \(\sin(x)\).
* \[
  \sin(3x) = \sin(2x + x) = \sin(2x)\cos(x) + \cos(2x)\sin(x)
  \]
* \[
  \sin(3x) = 2\sin(x)\cos(x)\cos(x) + (1 - 2\sin^2(x))\sin(x)
  \]
* \[
  \sin(3x) = 2\sin(x)\cos^2(x) + \sin(x) - 2\sin^3(x)
  \]
* En utilisant \(\cos^2(x) = 1 - \sin^2(x)\) :
  \[
  \sin(3x) = 2\sin(x)(1 - \sin^2(x)) + \sin(x) - 2\sin^3(x) = 3\sin(x) - 4\sin^3(x)
  \]
