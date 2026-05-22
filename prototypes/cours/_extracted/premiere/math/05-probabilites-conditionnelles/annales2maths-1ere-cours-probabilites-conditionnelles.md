---
source_url: "https://www.annales2maths.com/1ere-cours-probabilites-conditionnelles/"
chapter: "05-probabilites-conditionnelles"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:23:19+00:00"
cleaned_at: "2026-05-22T08:32:45+00:00"
---

## I Rappels

On considère deux événements \(A\) et \(B\) d’un même univers \(\Omega\).

> **Définition 1 :** On appelle **événement contraire** de \(A\), l’événement constitué des issues n’appartenant pas à \(A\). On le note \(\overline{A}\).

**Exemple :** Dans un lancer de dé, on considère l’événement \(A\) “Obtenir un 1 ou un 2”. L’événement contraire est \(\overline{A}\) “Obtenir un 3, 4, 5 ou 6”.

> **Définition 2 :** L’événement “\(A\) ou \(B\)”, noté \(A \cup B\) et se lit “\(A\) union \(B\)”, contient les issues appartenant à \(A\) ou à \(B\).

**Remarque :** Les éléments de \(A \cup B\) peuvent appartenir à la fois à \(A\) et à \(B\).

**Exemple :** Dans un lancer de dé, on appelle \(A\) l’événement “Obtenir 1,2 ou 3” et \(B\) l’événement “Obtenir 3 ou 5”. L’événement \(A \cup B\) est “Obtenir 1, 2, 3 ou 5”.

> **Définition 3 :** L’événement “\(A\) et \(B\)”, noté \(A \cap B\) et se lit “\(A\) inter \(B\)”, contient les issues communes à \(A\) et \(B\).

**Exemple :** Dans un lancer de dé, on appelle \(A\) l’événement “Obtenir 1,2 ou 3” et \(B\) l’événement “Obtenir 3 ou 5”. L’événement \(A \cap B\) est “Obtenir 3”.

> **Définition 4 :** Les événements \(A\) et \(B\) sont dits **disjoints** ou **incompatibles** si l’événement \(A \cap B\) est impossible.

**Exemple :** Dans un lancer de dé, les événements “Obtenir 1 ou 2” et “Obtenir 4 ou 5” sont incompatibles.

**Remarques :**
* Lorsque deux événements \(A\) et \(B\) sont disjoints on note \(A \cap B = \varnothing\) où \(\varnothing\) signifie “ensemble vide”.
* Pour tout événement \(A\), les événements \(A\) et \(\overline{A}\) sont disjoints.

**Propriété 1 :** Dans une situation d’équiprobabilité on a :
\[
p(A) = \frac{\text{nombre d’issues de } A}{\text{nombre total d’issues}}
\]

**Exemple :** Dans un jeu de 32 cartes, on considère l’événement \(A\) “tirer un roi”, on a \(p(A) = \frac{4}{32} = \frac{1}{8}\).

**Propriété 2 :** Soit \(A\) un événement d’une expérience aléatoire d’univers \(\Omega\).
1. \(0 \leqslant p(A) \leqslant 1\)
2. \(p(\Omega) = 1\)
3. \(p(\varnothing) = 0\)
4. \(p(\overline{A}) = 1 - p(A)\)

**Propriété 3 :** On considère deux événements \(A\) et \(B\) d’un univers \(\Omega\).
\[
p(A \cup B) = p(A) + p(B) - p(A \cap B)
\]

## II Probabilités conditionnelles

> **Définition 5 :** On considère deux événements \(A\), tel que \(p(A) \neq 0\), et \(B\).
> On appelle **probabilité conditionnelle de \(B\) sachant \(A\)** le nombre
> \[
> p_A(B) = \frac{p(A \cap B)}{p(A)}
> \]

**Exemple :** On tire une carte noire d’un jeu de 32 cartes. On veut déterminer la probabilité que cette carte soit un roi.
On considère alors les événements :
* \(N\) : “la carte tirée est noire” ;
* \(R\) : “la carte tirée est un roi”.

On veut donc calculer
\[
p_N(R) = \frac{p(N \cap R)}{p(N)}
\]
Or \(p(N) = \frac{1}{2}\) et
\[
p(N \cap R) = \frac{2}{32} = \frac{1}{16}
\]
Donc
\[
p_N(R) = \frac{\frac{1}{16}}{\frac{1}{2}} = \frac{1}{16} \times 2 = \frac{1}{8}.
\]

Les probabilités conditionnelles suivent les mêmes règles que les probabilités en général, c’est-à-dire :

**Propriété 4 :** On considère deux événements \(A\), tel que \(p(A) \neq 0\), et \(B\).
1. \(0 \leqslant p_A(B) \leqslant 1\)
2. \(p_A(\varnothing) = 0\)
3. \(p_A(A) = 1\)
4. \(p_A(B) + p_A(\overline{B}) = 1\)

> **Preuve Propriété 4**
> 1. \(p(A \cap B) \geqslant 0\) et \(p(A) \geqslant 0\) donc \(p_A(B) = \frac{p(A \cap B)}{p(A)} \geqslant 0\).
> De plus \(A \cap B\) est inclus dans \(A\). Par conséquent \(p(A \cap B) \leqslant p(A)\) et \(p_A(B) \leqslant 1\).
> 2. \(p(A \cap \varnothing) = 0\) donc \(p_A(\varnothing) = 0\)
> 3. On a
> \[
> p_A(A) = \frac{p(A \cap A)}{p(A)} = \frac{p(A)}{p(A)} = 1
> \]
> 4. On a
> \[
> p_A(B) + p_A(\overline{B}) = \frac{p(A \cap B)}{p(A)} + \frac{p(A \cap \overline{B})}{p(A)} = \frac{p(A \cap B) + p(A \cap \overline{B})}{p(A)} = \frac{p(A)}{p(A)} = 1
> \]

**Propriété 5 :** On considère deux événements \(A\) et \(B\) de probabilités tous les deux non nulles.
\[
p(A \cap B) = p_A(B) \times p(A) = p_B(A) \times p(B)
\]

> **Preuve Propriété 5**
> Par définition \(p_A(B) = \frac{p(A \cap B)}{p(A)}\) donc \(p(A \cap B) = p_A(B) \times p(A)\).
> De même \(p_B(A) = \frac{p(A \cap B)}{p(B)}\) donc \(p(A \cap B) = p_B(A) \times p(B)\).

**Exemple :** On considère deux événements \(A\) et \(B\) tels que \(p(A) = 0,7\) et \(p_A(B) = 0,4\).
On a alors :
\[
p(A \cap B) = p(A) \times p_A(B) = 0,7 \times 0,4 = 0,28
\]

## III Du côté des arbres pondérés

On considère deux événements \(A\), tel que \(p(A) \neq 0\), et \(B\).
On a alors un arbre pondéré de ce type qui se généralise aux situations dans lesquelles il y a plus de deux événements :

**Propriété 6 :** Dans un arbre pondéré, la somme des probabilités des branches issues d’un même nœud vaut 1.

**Remarque :** On retrouve en effet la propriété \(p_A(B) + p_A(\overline{B}) = 1\).

**Propriété 7 :** Dans un arbre pondéré, la probabilité d’un chemin est égale au produit des probabilités des branches qui le composent.

**Remarque :** On retrouve ainsi la propriété \(p(A \cap B) = p_A(B) \times p(A)\).

**Exemple :** En prévision d’une élection entre deux candidats \(A\) et \(B\), un institut de sondage recueille les intention de vote de futurs électeurs.
Parmi les 1200 personnes qui ont répondu au sondage, 47% affirment vouloir voter pour le candidat \(A\) et les autres pour le candidat \(B\).
Compte-tenu du profil des candidats, l’institut de sondage estime que 10% des personnes déclarant vouloir voter pour le candidat \(A\) ne disent pas la vérité et votent en réalité pour le candidat \(B\), tandis que 20% des personnes déclarant vouloir voter pour le candidat \(B\) ne disent pas la vérité et votent en réalité pour le candidat \(A\).

On choisit au hasard une personne ayant répondu au sondage et on note :
* \(A\) l’événement “La personne interrogée affirme vouloir voter pour le candidat \(A\)” ;
* \(B\) l’événement “La personne interrogée affirme vouloir voter pour le candidat \(B\)” ;
* \(V\) l’événement “La personne interrogée dit la vérité”.

On veut construire un arbre de probabilité traduisant la situation.

On sait que \(p(A) = 0,47\) donc \(p(B) = 1 - p(A) = 0,53\).
De plus \(p_A(\overline{V}) = 0,1\) donc \(p_A(V) = 0,9\) et \(p_B(\overline{V}) = 0,2\) donc \(p_B(V) = 0,8\).

Ce qui nous donne l’arbre pondéré suivant :

D’après l’arbre pondéré, on peut dire que :
\[
p(A \cap V) = p(A) \times p_A(V) = 0,47 \times 0,9 = 0,423
\]

## IV Formule des probabilités totales

> **Définition 6 :** On considère un entier naturel \(n\) non nul.
> Les événements \(A_1, A_2, \dots, A_n\) forment **un système complet d’événements fini** ou **une partition de l’univers** \(\Omega\) si :
> 1. Pour tout \(i \in \{1,2,\dots,n\}\), \(p(A_i) \neq 0\) ;
> 2. Les événements \(A_i\) sont disjoints deux à deux ;
> 3. \(A_1 \cup A_2 \cup \dots \cup A_n = \Omega\)

**Remarque :** On parle également parfois de partition de l’unité.

**Propriété 8 : (Probabilités totales – cas général)**
On considère les événements \(A_1, A_2, \dots, A_n\) formant un système complet d’événements fini et un événement \(B\).
\[
p(B) = p(A_1 \cap B) + p(A_2 \cap B) + \dots + p(A_n \cap B) = p_{A_1}(B)\,p(A_1) + p_{A_2}(B)\,p(A_2) + \dots + p_{A_n}(B)\,p(A_n)
\]

Très souvent dans les exercices on utilisera cette propriété dans les cas suivants :
* Si \(n = 2\) : \(A\) et \(\overline{A}\) forment un système complet d’événements fini. Par conséquent \(0 < p(A) < 1\) et
\[
p(B) = p(A \cap B) + p(\overline{A} \cap B) = p_A(B)\,p(A) + p_{\overline{A}}(B)\,p(\overline{A})
\]
* Si \(n = 3\) : On considère que les événements \(A_1\), \(A_2\) et \(A_3\) forment un système complet d’événements fini.
\[
p(B) = p(A_1 \cap B) + p(A_2 \cap B) + p(A_3 \cap B) = p_{A_1}(B)\,p(A_1) + p_{A_2}(B)\,p(A_2) + p_{A_3}(B)\,p(A_3)
\]

**Exemple :** On reprend l’exemple de la partie **III** sur les arbres pondérés.
\(A\) et \(B\) forment un système complet d’événements fini.
D’après la formule des probabilités totales on a donc :
\[
p(V) = p(A \cap V) + p(B \cap V) = p(A) \times p_A(V) + p(B) \times p_B(V) = 0,47 \times 0,9 + 0,53 \times 0,8 = 0,847
\]
Ainsi 84,7% des personnes interrogées disent la vérité.

## V Indépendance

> **Définition 7 :** On dit que deux événements \(A\) et \(B\) sont **indépendants** si
> \[
> p(A \cap B) = p(A) \times p(B).
> \]
> Cela signifie que les deux événements peuvent se produire indépendamment l’un de l’autre.

**Exemple :** On tire au hasard une carte d’un jeu de 32 cartes.
On considère les événements suivants :
* \(A\) “la carte tirée est un as” ;
* \(C\) “la carte tirée est un cœur”.

\(p(A) = \frac{4}{32} = \frac{1}{8}\) et \(p(C) = \frac{1}{4}\) donc \(p(A) \times p(C) = \frac{1}{32}\).
Il n’y a qu’un seul as de cœur donc \(p(A \cap C) = \frac{1}{32}\).
Par conséquent \(p(A) \times p(C) = p(A \cap C)\) et les événements \(A\) et \(C\) sont indépendants.

**Attention :**
* Ne pas confondre indépendant et incompatible ;
* \(p(A \cap B) = p(A) \times p(B)\) que dans le cas des événements indépendants.
\(p(A \cap B) = p(A) \times p_A(B)\).

**Propriété 9 :** On considère deux événements indépendants \(A\) et \(B\) alors \(A\) et \(\overline{B}\) sont également indépendants.

> **Preuve Propriété 9**
> On suppose que \(0 < p(B) < 1\).
> \(A\) et \(B\) sont indépendants donc \(p(A \cap B) = p(A) \times p(B)\).
> D’après la formule des probabilités totales on a :
> \[
> p(A) = p(A \cap B) + p(A \cap \overline{B}) = p(A) \times p(B) + p(A \cap \overline{B})
> \]
> Par conséquent :
> \[
> p(A \cap \overline{B}) = p(A) - p(A) \times p(B) = (1 - p(B)) \times p(A) = p(\overline{B}) \times p(A)
> \]
> \(A\) et \(\overline{B}\) sont donc indépendants.

**Propriété 10 :** On considère deux événements \(A\) et \(B\) de probabilités non nulles.
\[
A \text{ et } B \text{ sont indépendants } \iff p_A(B) = p(B) \iff p_B(A) = p(A)
\]

> **Preuve Propriété 10**
> \[
> A \text{ et } B \text{ sont indépendants } \iff p(A \cap B) = p(A) \times p(B) \iff p_A(B) \times p(A) = p(A) \times p(B) \iff p_A(B) = p(B)
> \]
> On procède de même pour montrer que \(p_B(A) = p(A)\).

## Probabilités conditionnelles (Partie 2/2)

### Arbre pondéré et probabilités totales

**Définition : Arbre pondéré**
Un arbre pondéré est un diagramme qui représente une expérience aléatoire composée de plusieurs étapes. Chaque branche est associée à une probabilité.

**Propriétés d'un arbre pondéré**
- Sur chaque branche, on inscrit la probabilité correspondante.
- La somme des probabilités des branches issues d'un même nœud est égale à 1.
- La probabilité d'un chemin est le produit des probabilités des branches qui le composent.
- La probabilité d'un événement est la somme des probabilités des chemins qui mènent à cet événement.

**Exemple :**
On considère une urne contenant 3 boules rouges et 2 boules vertes. On tire successivement deux boules sans remise.
Soit \(R_1\) l'événement "la première boule est rouge" et \(R_2\) l'événement "la deuxième boule est rouge".

L'arbre pondéré correspondant est :

\[
\begin{array}{c}
\text{1er tirage} \\
\begin{array}{c}
R_1 \\
\frac{3}{5} \\
\end{array}
\begin{array}{c}
\text{2e tirage} \\
\begin{array}{c}
R_2 \\
\frac{2}{4} \\
\end{array} \\
\begin{array}{c}
\overline{R_2} \\
\frac{2}{4} \\
\end{array}
\end{array}
\begin{array}{c}
\overline{R_1} \\
\frac{2}{5} \\
\end{array}
\begin{array}{c}
\text{2e tirage} \\
\begin{array}{c}
R_2 \\
\frac{3}{4} \\
\end{array} \\
\begin{array}{c}
\overline{R_2} \\
\frac{1}{4} \\
\end{array}
\end{array}
\end{array}
\]

**Calculs :**
- \(P(R_1 \cap R_2) = \frac{3}{5} \times \frac{2}{4} = \frac{6}{20} = \frac{3}{10}\)
- \(P(R_2) = P(R_1 \cap R_2) + P(\overline{R_1} \cap R_2) = \frac{3}{5} \times \frac{2}{4} + \frac{2}{5} \times \frac{3}{4} = \frac{6}{20} + \frac{6}{20} = \frac{12}{20} = \frac{3}{5}\)

### Formule des probabilités totales

**Théorème :**
Soit \(A_1, A_2, \dots, A_n\) une partition de l'univers \(\Omega\) (c'est-à-dire des événements deux à deux incompatibles dont la réunion est \(\Omega\)). Alors pour tout événement \(B\) :
\[
P(B) = P(A_1 \cap B) + P(A_2 \cap B) + \dots + P(A_n \cap B)
\]
ou encore :
\[
P(B) = P(A_1) \times P_{A_1}(B) + P(A_2) \times P_{A_2}(B) + \dots + P(A_n) \times P_{A_n}(B)
\]

**Exemple :**
Dans une entreprise, 60% des employés sont des hommes et 40% sont des femmes. Parmi les hommes, 30% sont cadres. Parmi les femmes, 45% sont cadres.
On choisit un employé au hasard. Quelle est la probabilité que ce soit un cadre ?

Soit \(H\) l'événement "l'employé est un homme", \(F\) l'événement "l'employé est une femme" et \(C\) l'événement "l'employé est un cadre".
\(H\) et \(F\) forment une partition de l'univers.
D'après la formule des probabilités totales :
\[
P(C) = P(H) \times P_H(C) + P(F) \times P_F(C) = 0,60 \times 0,30 + 0,40 \times 0,45 = 0,18 + 0,18 = 0,36
\]

### Indépendance de deux événements

**Définition :**
Deux événements \(A\) et \(B\) sont dits **indépendants** si et seulement si :
\[
P(A \cap B) = P(A) \times P(B)
\]

**Propriété :**
Si \(A\) et \(B\) sont indépendants et \(P(B) \neq 0\), alors :
\[
P_B(A) = P(A)
\]
La connaissance de la réalisation de \(B\) ne modifie pas la probabilité de \(A\).

**Propriété :**
Si \(A\) et \(B\) sont indépendants, alors \(A\) et \(\overline{B}\) sont aussi indépendants, de même que \(\overline{A}\) et \(B\), et \(\overline{A}\) et \(\overline{B}\).

**Exemple :**
On lance un dé équilibré à 6 faces.
Soit \(A\) l'événement "obtenir un nombre pair" et \(B\) l'événement "obtenir un multiple de 3".
\(P(A) = \frac{3}{6} = \frac{1}{2}\), \(P(B) = \frac{2}{6} = \frac{1}{3}\), \(P(A \cap B) = P(\text{obtenir 6}) = \frac{1}{6}\).
On a \(P(A) \times P(B) = \frac{1}{2} \times \frac{1}{3} = \frac{1}{6} = P(A \cap B)\).
Donc \(A\) et \(B\) sont indépendants.

**Contre-exemple :**
On reprend l'exemple précédent du tirage de deux boules sans remise.
Soit \(A\) l'événement "la première boule est rouge" et \(B\) l'événement "la deuxième boule est rouge".
\(P(A) = \frac{3}{5}\), \(P(B) = \frac{3}{5}\) (calculé plus haut), \(P(A \cap B) = \frac{3}{10}\).
\(P(A) \times P(B) = \frac{3}{5} \times \frac{3}{5} = \frac{9}{25} \neq \frac{3}{10}\).
Donc \(A\) et \(B\) ne sont pas indépendants.
