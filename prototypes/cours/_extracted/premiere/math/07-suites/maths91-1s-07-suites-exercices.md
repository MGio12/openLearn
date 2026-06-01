---
source_url: "http://www.maths91.fr/cours1spemaths/1S-07-SUITES-exercices.pdf"
chapter: "07-suites"
role: "exercices"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:22:51+00:00"
cleaned_at: "2026-05-22T08:26:17+00:00"
---

## 1ère 2 − Suites - Fiche d’exercices

Tous les résultats seront arrondis, si besoin, à \(10^{-6}\) près.

### Exercice 1 - Clientèle

Un fournisseur fait une étude sur la fidélité de sa clientèle depuis l’année 2018, où il y a eu 200 clients. Chaque année, sa clientèle est composée de 50% des clients de l’année précédente auxquels s’ajoutent 400 nouveaux clients. On note \(u_n\) le nombre de centaines de clients à l’année \(2018 + n\).

1. Préciser \(u_0\).
2. Démontrer que pour tout entier naturel \(n\), \(u_{n+1} = 0{,}5 u_n + 4\).
3. On a tracé ci-dessous la droite représentative de la fonction \(f\) définie sur \([0 ; +\infty[\) par \(f(x) = 0{,}5x + 4\), ainsi que la droite d’équation \(y = x\). Placer sur l’axe des abscisses par construction et sans calcul les premières valeurs de la suite \(u\).

   <!-- UNSURE: graphique non reproduit -->

4. Déterminer par le calcul les coordonnées du point d’intersection des deux droites tracées.
5. Conjecturer le sens de variations et la limite de la suite \(u\).
6. On considère la suite \(v\) définie sur \(\mathbb{N}\) par \(v_n = u_n - 8\).
   (a) Démontrer que \(v\) est une suite géométrique dont on précisera la raison et le premier terme.
   (b) En déduire l’expression en fonction de \(n\) de \(v_n\) puis de \(u_n\).
   (c) Déterminer le sens de variations de la suite \(u\).
7. Déterminer la limite de la suite \(u\). Que peut-on en conclure pour le nombre de clients du fournisseur ?

### Exercice 2 - Entreprise

Le 1er Janvier 2018, une grande entreprise compte 1 500 employés. Une étude montre que lors de chaque année à venir, 10% de l’effectif précédent partira à la retraite. Pour ajuster les effectifs à ses besoins, l’entreprise embauche 100 nouveaux salariés chaque année. On note \(u_n\) le nombre d’employés de l’entreprise au premier janvier de l’année \(2018 + n\).

1. Préciser \(u_0\), puis déterminer pour tout entier naturel \(n\), l’expression de \(u_{n+1}\) en fonction de \(u_n\).
2. On pose \(v\) la suite définie pour tout entier naturel \(n\) par \(v_n = u_n - 1000\).
   (a) Démontrer que \(v\) est une suite géométrique dont on précisera la raison et le premier terme.
   (b) En déduire l’expression en fonction de \(n\), pour tout entier naturel \(n\), de \(v_n\) puis de \(u_n\).
   (c) Déterminer le sens de variations de la suite \(u\).
   (d) Déterminer la limite de la suite \(u\). Que peut-on en déduire pour l’entreprise ?

### Exercice 3 - Attention au premier terme

On donne la suite \(u\) définie par \(u_1 = 3\) et pour tout entier naturel \(n\) non nul, \(u_{n+1} = \frac{1}{3} u_n + 1\).

1. À l’aide d’un tableur, donner une conjecture sur le sens de variations et la convergence de la suite \(u\).
2. Pour tout entier naturel \(n\) non nul, on pose \(v_n = u_n - \frac{3}{2}\).
   (a) Démontrer que \(v\) est une suite géométrique dont on précisera la raison et le premier terme.
   (b) En déduire l’expression en fonction de \(n\), pour tout entier naturel \(n\) non nul, de \(v_n\) puis de \(u_n\).
   (c) Étudier le sens de variations de la suite \(u\).
   (d) Déterminer la limite de la suite \(u\).

### Exercice 4 - Représentation graphique de suite 1

Représenter graphiquement les premiers termes de la suite \(u\) définie par \(u_0 = -1{,}5\) et pour tout entier naturel \(n\), \(u_{n+1} = \sqrt{u_n + 2}\) :

<!-- UNSURE: graphique non reproduit -->

### Exercice 5 - Représentation graphique de suite 2

Représenter graphiquement les premiers termes de la suite \(u\) définie par \(u_0 = 1\) et pour tout entier naturel \(n\), \(u_{n+1} = u_n - 3\) :

<!-- UNSURE: graphique non reproduit -->

### Exercice 6 - Représentation graphique de suite 3

Représenter graphiquement les premiers termes de la suite \(u\) définie par \(u_0 = 1\) et pour tout entier naturel \(n\), \(u_{n+1} = \frac{1}{2} u_n^2 - 2 u_n + 1\) :

<!-- UNSURE: graphique non reproduit -->

### Exercice 7 - Colonie de vacances

Une colonie de vacances héberge des enfants dans des tentes de 10 places chacune. Pendant l’été 2017, 160 enfants ont participé à cette colonie. À la suite d’une étude prévisionnelle, on estime que, chaque année, 80% des enfants déjà inscrits se réinscrivent l’année suivante et 50 nouveaux enfants les rejoignent.

1. (a) Donner une estimation du nombre d’enfants inscrits à l’été 2018.
   (b) Donner le nombre minimal de tentes nécessaire pour loger l’ensemble des inscrits pendant l’été 2018.
2. Soit \((u_n)\) la suite numérique qui modélise le nombre d’inscrits lors de l’année \(2017 + n\). Ainsi \(u_0 = 160\). Expliquer pourquoi, pour tout entier naturel \(n\), on a : \(u_{n+1} = 0{,}8 u_n + 50\).
3. Voici la copie d’écran d’une feuille de tableur utilisée pour déterminer les valeurs des termes de la suite.

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | 1 | indice \(n\) | 0 | 1 | 2 | 3 | 4 | 5 |
   | 2 | valeur de \(u(n)\) | 160 |   |   |   |   |   |

   (a) Quelle formule peut-on saisir dans la cellule C2 pour obtenir, par recopie vers la droite, le nombre d’inscrits l’année \(2017 + n\) ?
   (b) Recopier et compléter ce tableau en arrondissant chacune des valeurs à l’entier.
   (c) Donner une estimation du nombre d’inscrits en 2021.
4. Soit \((v_n)\) la suite numérique dont le terme général est défini par \(v_n = u_n - 250\) pour tout \(n \in \mathbb{N}\).
   (a) Montrer que la suite \((v_n)\) est géométrique de raison \(0{,}8\) et préciser son terme initial.
   (b) Exprimer \(v_n\) en fonction de \(n\), pour tout entier naturel \(n\).
   (c) Montrer que, pour tout \(n \in \mathbb{N}\), \(u_n = 250 - 90 \times 0{,}8^n\).
   (d) Déterminer la limite de la suite \((u_n)\), puis interpréter ce résultat dans le contexte de l’exercice.
5. En 2017, la colonie comptait 22 tentes. Afin de déterminer à partir de quelle année il sera nécessaire de construire une nouvelle tente, on propose l’algorithme ci-dessous :

   ```
   U ← 160
   N ← 0
   Tant que ............... faire
       U ← 0,8 U + 50
       N ← ...............
   Fin tant que
   ```

   (a) Recopier et compléter cet algorithme afin qu’il permette de répondre au problème.
   (b) Quelle est la valeur de \(N\) obtenue après exécution de cet algorithme ?

### Exercice 8

Soit \((u_n)\) la suite définie par \(u_0 = 3\), \(u_1 = 6\) et, pour tout entier naturel \(n\) :
\[
u_{n+2} = \frac{5}{4} u_{n+1} - \frac{1}{4} u_n.
\]

Le but de cet exercice est d’étudier la limite éventuelle de la suite \((u_n)\).

#### Partie A : Calculs avec un tableur

On souhaite calculer les valeurs des premiers termes de la suite \((u_n)\) à l’aide d’un tableur. On a reproduit ci-dessous une partie d’une feuille de calcul, où figurent les valeurs de \(u_0\) et de \(u_1\).

|   | A | B |
|---|---|---|
| 1 | \(n\) | \(u_n\) |
| 2 | 0 | 3 |
| 3 | 1 | 6 |
| 4 | 2 |   |
| 5 | 3 |   |
| 6 | 4 |   |
| 7 | 5 |   |

1. Donner une formule qui, saisie dans la cellule B4, puis recopiée vers le bas, permet d’obtenir des valeurs de la suite \((u_n)\) dans la colonne B.
2. Recopier et compléter le tableau ci-dessus. On donnera des valeurs approchées à \(10^{-3}\) près de \(u_n\) pour \(n\) allant de 2 à 5.
3. Que peut-on conjecturer à propos de la convergence de la suite \((u_n)\) ?

#### Partie B : Étude de la suite

On considère les suites \((v_n)\) et \((w_n)\) définies pour tout entier naturel \(n\) par :
\[
v_n = u_{n+1} - \frac{1}{4} u_n \quad \text{et} \quad w_n = u_n - 7.
\]

1. (a) Démontrer que \((v_n)\) est une suite constante.
   (b) En déduire que, pour tout entier naturel \(n\), \(u_{n+1} = \frac{1}{4} u_n + \frac{21}{4}\).
2. (a) Démontrer que \((w_n)\) est une suite géométrique dont on précisera le premier terme et la raison.
   (b) En déduire que, pour tout entier naturel \(n\), \(u_n = 7 - \left(\frac{1}{4}\right)^{n-1}\).
   (c) Calculer la limite de la suite \((u_n)\).

### Exercice 9 - Bouteille consignée

Chaque semaine, un agriculteur propose un panier de produits frais contenant une bouteille de jus de fruits consignée. Une étude statistique révèle que :
- à l’issue de la 1ère semaine, la probabilité qu’un client rapporte la bouteille consignée la semaine suivante est \(0{,}9\) ;
- si le client a rapporté la bouteille une semaine, alors il la ramène la semaine suivante avec une probabilité de \(0{,}95\) ;
- si le client n’a pas rapporté la bouteille une semaine, alors il ramène la bouteille la semaine suivante avec une probabilité égale à \(0{,}2\).

On choisit au hasard un client de cet agriculteur. Pour tout entier \(n \geqslant 1\), on note \(R_n\) l’événement « le client rapporte la bouteille de la \(n\)-ième semaine ».

1. (a) Modéliser la situation étudiée pour les deux premières semaines à l’aide d’un arbre pondéré.
   (b) Montrer que \(P(R_2) = 0{,}875\) et interpréter le résultat dans le contexte de l’exercice.
2. Pour tout entier \(n \geqslant 1\), on note \(p_n\) la probabilité que le client rapporte la bouteille la \(n\)-ième semaine. Ainsi, on a \(p_n = P(R_n)\).
   (a) Recopier et compléter l’arbre de probabilité ci-dessous.

   <!-- UNSURE: arbre non reproduit -->

   (b) Justifier que, pour tout entier \(n \geqslant 1\), on a \(p_{n+1} = 0{,}75 p_n + 0{,}2\).
   (c) On pose, pour tout entier \(n \geqslant 1\), la suite \((v_n)\) définie par \(v_n = p_n - 0{,}8\).
        i. Démontrer que \((v_n)\) est une suite géométrique dont on précisera la raison et le premier terme.
        ii. Exprimer, pour tout entier \(n \geqslant 1\), \(v_n\) en fonction de \(n\), et en déduire que \(p_n = 0{,}1 \times 0{,}75^{n-1} + 0{,}8\).
        iii. Déterminer la limite de la suite \((p_n)\). Interpréter le résultat dans le contexte de l’exercice.
