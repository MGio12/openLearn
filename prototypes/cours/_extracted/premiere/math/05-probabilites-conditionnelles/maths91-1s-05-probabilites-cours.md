---
source_url: "http://www.maths91.fr/cours1spemaths/1S-05-PROBABILITES-cours.pdf"
chapter: "05-probabilites-conditionnelles"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:47+00:00"
cleaned_at: "2026-05-22T08:24:55+00:00"
---

## 1ère SPÉCIALITÉ MATHÉMATIQUES 05 − PROBABILITÉS

### I Activité d’approche

Une société emploie 40% de cadres. 55% des cadres et 30% des non-cadres sont des femmes. Dans la base de données des employés, on tire au hasard le nom de l’un des employés. On note \( C \) l’événement « l’employé est cadre » et \( F \) l’événement « l’employé est une femme ».

1. Représenter la situation à l’aide d’un arbre pondéré. (introduction aux probabilités conditionnelles)
2. Calculer la probabilité que l’employé soit une femme cadre. (introduction à la probabilité d’une intersection)
3. Calculer la probabilité que l’employé soit une femme. (introduction aux probabilités totales)

### II Probabilités conditionnelles

#### 1) Probabilité de \( A \) sachant \( B \)

> **DÉFINITION**
> Soient \( A \) et \( B \) deux événements relatifs à un univers \( \Omega \), \( B \) étant de probabilité non nulle. La probabilité conditionnelle de \( A \) sachant que \( B \) est réalisé est le nombre réel noté \( P_B(A) \) défini par :
> \[
> P_B(A) = \frac{P(A \cap B)}{P(B)}
> \]

**EXEMPLE**
Dans l’activité précédente, « 55% des cadres sont des femmes » se note \( P_C(F) = 0{,}55 \).

#### 2) Probabilité de l’intersection \( A \cap B \)

> **PROPRIÉTÉ** (admise)
> Soient \( A \) et \( B \) deux événements relatifs à un univers \( \Omega \) et de probabilités non nulles. Alors
> \[
> P(A \cap B) = P(A) \times P_A(B) \quad \text{et} \quad P(A \cap B) = P(B) \times P_B(A)
> \]
> (Faire un arbre à chaque fois)

**EXEMPLE**
Dans l’activité précédente, la probabilité de l’événement « l’employé est une femme cadre » se note \( P(C \cap F) \). On a alors
\[
P(C \cap F) = P(C) \times P_C(F) = 0{,}4 \times 0{,}55 = 0{,}22.
\]

### III Probabilités totales

#### 1) Partition de l’univers

> **DÉFINITION**
> Soit \( n \in \mathbb{N}^* \), soit \( \Omega \) un univers et soient \( A_1, A_2, \dots, A_n \) \( n \) événements de probabilités non nulles, deux à deux incompatibles, et tels que leur réunion est \( \Omega \). On dit alors que les événements \( A_1, A_2, \dots, A_n \) forment une partition de l’univers \( \Omega \). (Faire un schéma)

#### 2) Formule des probabilités totales

> **PROPRIÉTÉ** (admise)
> On reprend les données de la définition précédente. Soit également \( E \) un événement relatif à cet univers. Alors la formule des probabilités totales s’écrit :
> \[
> P(E) = P(E \cap A_1) + P(E \cap A_2) + \dots + P(E \cap A_n)
> \]
> (Faire un schéma)

**EXEMPLE**
Dans l’activité précédente, la probabilité de l’événement « l’employé est une femme » se note \( P(F) \). \( C \) et \( \overline{C} \) partitionnent l’univers de cette expérience, et ainsi, d’après la formule des probabilités totales, on a alors :
\[
\begin{aligned}
P(F) &= P(C \cap F) + P(\overline{C} \cap F) \\
P(F) &= P(C) \times P_C(F) + P(\overline{C}) \times P_{\overline{C}}(F) \\
P(F) &= 0{,}4 \times 0{,}55 + 0{,}6 \times 0{,}3 \\
P(F) &= 0{,}4.
\end{aligned}
\]

**EXERCICE**
À un carrefour doté d’un feu tricolore :
- 2% des véhicules s’arrêtent au feu vert.
- 65% des véhicules s’arrêtent au feu orange.
- 97% des véhicules s’arrêtent au feu rouge.

On observe le comportement d’un véhicule se présentant au carrefour. On admet que l’état du feu à l’arrivée du véhicule est aléatoire et que la probabilité que le feu soit vert est de 0,6, celle qu’il soit orange de 0,1 et celle qu’il soit rouge de 0,3. On note \( V \) l’événement « Le feu est vert », \( O \) « Le feu est orange », \( R \) « Le feu est rouge » et enfin \( A \) l’événement « Le véhicule s’arrête ».

1. Réaliser un arbre pondéré de cette situation.
2. Quelle est la probabilité que le véhicule observé s’arrête ?
3. Le véhicule est passé. Quelle est la probabilité que le feu soit rouge ?

### IV Indépendance de deux événements

#### 1) Définition et propriété

> **DÉFINITION**
> Soient \( A \) et \( B \) deux événements. On dit que \( A \) et \( B \) sont indépendants si et seulement si
> \[
> P(A \cap B) = P(A) \times P(B)
> \]

**REMARQUE**
On sait que pour tous événements \( A \) et \( B \) (avec \( P(B) \neq 0 \)), on a : \( P(A \cap B) = P(A) \times P_A(B) \). Mais si \( A \) et \( B \) sont indépendants, alors on a aussi : \( P(A \cap B) = P(A) \times P(B) \). Ainsi, si \( A \) et \( B \) sont indépendants, on a \( P_A(B) = P(B) \). D’où la propriété suivante :

> **PROPRIÉTÉ** (admise)
> Si \( A \) et \( B \) sont deux événements indépendants et de probabilités non nulles, alors :
> \[
> P_A(B) = P(B) \quad \text{et} \quad P_B(A) = P(A)
> \]
> Autrement dit, si deux événements sont indépendants, alors la réalisation de l’un ne dépend pas de la réalisation de l’autre.

#### 2) Indépendance et événements contraires

> **PROPRIÉTÉ**
> Si \( A \) et \( B \) sont deux événements indépendants, alors \( A \) et \( \overline{B} \) sont aussi indépendants.

**DÉMONSTRATION**
\( P(B) = P(A \cap B) + P(\overline{A} \cap B) \) donc \( P(\overline{A} \cap B) = P(B) - P(A \cap B) \). Donc si \( A \) et \( B \) sont indépendants :
\[
P(\overline{A} \cap B) = P(B) - P(A) \times P(B) = (1 - P(A)) \times P(B) = P(\overline{A}) \times P(B),
\]
donc \( \overline{A} \) et \( B \) sont indépendants.

**REMARQUE**
De même, on peut montrer que \( A \) et \( \overline{B} \) sont indépendants, ainsi que \( \overline{A} \) et \( \overline{B} \).
