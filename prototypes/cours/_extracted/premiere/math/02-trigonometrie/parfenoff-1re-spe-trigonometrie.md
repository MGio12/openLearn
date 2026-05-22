---
source_url: "https://www.parfenoff.org/pdf/1re_Spe/geometrie/1re_spe_Trigonometrie.pdf"
chapter: "02-trigonometrie"
role: "cours"
cleaned: "true"
cleaner: "deepseek-chat"
extracted_at: "2026-05-22T08:35:11+00:00"
cleaned_at: "2026-05-22T08:35:55+00:00"
---

## Trigonométrie

### I) Cercle trigonométrique. Longueur d’arc. Le radian

#### 1) Cercle trigonométrique

> **Définition :**
> Le cercle trigonométrique de centre O est un cercle qui a pour rayon 1 et qui est muni d’un sens direct : le sens inverse des aiguilles d’une montre.

**Remarque :** L’arc IJ inclus dans le secteur angulaire saillant \(\widehat{IOJ}\) (colorié en violet) est parcouru dans le sens positif. Le sens positif du cercle trigonométrique correspond au sens de rotation de la terre.

#### 2) Longueur d’un arc de cercle

La longueur d’un cercle de rayon \(R\) est égale à \(2\pi R\). Or le cercle trigonométrique a pour rayon 1 donc sa longueur est \(2\pi\). Son demi-cercle a pour longueur \(\pi\) et son quart de cercle \(\frac{\pi}{2}\).

Ainsi tout point M du cercle trigonométrique peut être défini par la longueur de l’arc IM.

La longueur d’un arc de cercle et la mesure en degré de l’angle au centre qui l’intercepte sont proportionnelles :

| Mesure de l’angle au centre (en degré) | 360 | 180 | 90 | 45 | 0 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Longueur de l’arc intercepté | \(2\pi\) | \(\pi\) | \(\frac{\pi}{2}\) | \(\frac{\pi}{4}\) | 0 |

Ce tableau se démontre facilement : La longueur de l’arc intercepté étant proportionnelle à la mesure de l’angle.

Le point J est placé pour que \(\widehat{IOJ}\) soit positif comme sur la figure ci-contre.

#### 3) Le radian

Soit C un cercle trigonométrique de centre O dans un repère (O ; I ; J).

> **Définition :**
> Le radian (symbole : rad) est la mesure d’un angle au centre qui intercepte sur le cercle C un arc de longueur 1.

**Explication :**

**Remarque :** Un angle de 1 radian a pour mesure en degré environ 57,3° : \(\frac{180}{\pi} \approx 57,3°\).

**Exemple :**

Sur le cercle trigonométrique : L’angle \(\widehat{IOJ}\) mesure 90° mais aussi \(\frac{\pi}{2}\) radians.

#### 4) Correspondance degrés et radians

Ainsi, à \(2\pi\) radians (tour complet), on fait correspondre un angle de 360°. Par proportionnalité, on obtient les correspondances suivantes :

| Angle en degré | 0° | 30° | 45° | 60° | 90° | 180° | 360° |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Angle en radian | 0 | \(\frac{\pi}{6}\) | \(\frac{\pi}{4}\) | \(\frac{\pi}{3}\) | \(\frac{\pi}{2}\) | \(\pi\) | \(2\pi\) |

**Démonstration pour 30° :**

| Angle en degré | 30° | 360° |
| :--- | :--- | :--- |
| Angle en radian | ? | \(2\pi\) |

La longueur du cercle de rayon 1 est \(2\pi\) et cela correspond à un angle au centre de mesure 360°.
Pour connaitre la longueur en radian d’un angle de 30° :
\[
\frac{2\pi \times 30}{360} = \frac{2 \times 30\pi}{30 \times 6 \times 2} = \frac{\pi}{6}
\]
On fait de même pour les autres angles.

**Remarque :** Un angle de 1 radian a pour mesure en degré environ 57,3° : \(\frac{180}{\pi} \approx 57,3°\).

### II) Enroulement de la droite des réels sur le cercle trigonométrique

#### 1) Enroulement de la droite sur le cercle trigonométrique

> **Définition :**
> *   Soit (C) le cercle trigonométrique et (d) la tangente en I à ce cercle (voir la figure ci-contre).
> *   On munit (d) d’un repère \((I, \overrightarrow{IA'})\) où \(\overrightarrow{IA'} = \vec{j}\). Le rayon de ce cercle (qui, dans notre cas est 1) est aussi l’unité de longueur sur la droite (d). Cela permet de graduer la droite (d), puis le cercle (C).

La graduation de A’ est donc 1. Il lui correspond, par enroulement sur le cercle le point A : par conséquent l’arc IA mesure aussi 1 unité (qui est le rayon du cercle). Par définition, l’angle \(\widehat{IOA}\) a pour mesure 1 radian.

En enroulant cette droite (d) autour du cercle (C) nous obtenons aussi une correspondance entre le point M’ de la droite (d) et un unique point M du cercle (C), de la même manière le point N’ de la droite (d) se superpose au point N et ainsi de suite…

Plaçons le point B’ sur la droite (d) de graduation 2. A’B’ est donc aussi égal à 1 (IA’ = A’B’ = 1) et toujours par enroulement de la droite (d) autour du cercle, l’angle \(\widehat{AOB}\) mesure aussi 1 radian.

#### 2) Angles de référence en radian

### III) Cosinus et sinus d’un nombre réel

#### 1) Cosinus, sinus et cercle trigonométrique

Soit \(x\) un nombre réel. On considère le cercle trigonométrique (C) et la tangente (d) en I. On munit (d) d’un repère \((I; \vec{j})\). (voir figure ci-dessous)
Par enroulement de la droite (d) sur le cercle (C), M’(1 ; \(x\)) a pour image M.

> **Définition :**
> Les coordonnées du point M sont : \((\cos x ; \sin x)\).
> Le cosinus de \(x\) noté \(\cos x\) est l’abscisse du point M.
> Le sinus de \(x\) noté \(\sin x\) est l’ordonnée du point M.
> On peut aussi écrire \(\overrightarrow{OM} = \cos x \, \vec{i} + \sin x \, \vec{j}\).

**Exemples :**

Le nombre \(\frac{\pi}{2}\) a pour image le point J de coordonnées (0 ; 1) donc \(\cos \frac{\pi}{2} = 0\) et \(\sin \frac{\pi}{2} = 1\).

Le nombre \(\pi\) a pour image le point K de coordonnées (-1 ; 0) donc \(\cos \pi = -1\) et \(\sin \pi = 0\).

#### 2) Propriétés

Pour tout nombre réel \(x\) et tout nombre entier relatif \(k\) :
*   \(-1 \le \cos x \le 1\) et \(-1 \le \sin x \le 1\)
*   \(\cos (x + 2k\pi) = \cos x\) et \(\sin (x + 2k\pi) = \sin x\)
*   \(\cos^2 x + \sin^2 x = 1\)

**Démonstration :**
*   Le périmètre du cercle étant \(2\pi\), \(k\) tours du cercle correspondent à \(2k\pi\) on a donc : \(x’ = x + 2k\pi\) (\(k \in \mathbb{Z}\)). Donc \(\cos (x + 2k\pi) = \cos x\) et \(\sin (x + 2k\pi) = \sin x\).
*   Soit M (\(x\) ; \(y\)), dans le triangle OMA rectangle en A, on applique le théorème de Pythagore :
    \[
    OM^2 = OA^2 + AM^2
    \]
    AM = OE = \(\sin x\)
    OA = \(\cos x\)
    OM = 1 car sa mesure est le rayon du cercle (C) on obtient donc :
    \[
    1 = \cos^2 x + \sin^2 x
    \]
*   Comme \(\cos^2 x + \sin^2 x = 1\) alors \(-1 \le \cos x \le 1\) et \(-1 \le \sin x \le 1\).
    Autre explication : comme \(\cos x\) et \(\sin x\) sont les abscisses et les ordonnées de tout point du cercle trigonométrique alors \(-1 \le \cos x \le 1\) et \(-1 \le \sin x \le 1\).

#### 3) Lien avec la trigonométrie du triangle rectangle

Cette définition permet de définir le \(\cos x\) et le \(\sin x\) pour tout nombre réel \(x\). Elle est cohérente et prolonge la définition donnée dans un triangle rectangle pour le \(\cos x\) et le \(\sin x\) d’un angle aigu.

Ainsi lorsque l’angle \(\widehat{IOM}\) est aigu, à partir du triangle OMA rectangle en A on a :
\[
\cos \widehat{IOM} = \cos \widehat{AOM} = \frac{OA}{OM} = \frac{OA}{1} = OA = \cos x
\]
et
\[
\sin \widehat{IOM} = \sin \widehat{AOM} = \frac{AM}{OM} = \frac{AM}{1} = AM = \sin x
\]

#### 4) Tableau des valeurs à connaitre

| \(x\) (radians) | \(0\) | \(\frac{\pi}{6}\) | \(\frac{\pi}{4}\) | \(\frac{\pi}{3}\) | \(\frac{\pi}{2}\) | \(\pi\) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| \(\cos x\) | \(1\) | \(\frac{\sqrt{3}}{2}\) | \(\frac{\sqrt{2}}{2}\) | \(\frac{1}{2}\) | \(0\) | \(-1\) |
| \(\sin x\) | \(0\) | \(\frac{1}{2}\) | \(\frac{\sqrt{2}}{2}\) | \(\frac{\sqrt{3}}{2}\) | \(1\) | \(0\) |

**Démonstrations :**
*   **Pour l’angle 0 :** Le nombre 0 est associé au point (1 ; 0) donc \(\cos 0 = 1\) et \(\sin 0 = 0\).
*   **Pour l’angle \(\frac{\pi}{4}\) :**
    La mesure \(\frac{\pi}{4}\) radian est égale à la mesure de 45°.
    Comme \(\widehat{OHA} = 90°\) alors \(\widehat{HAO} = 180 - (90 + 45) = 45°\).
    \(\widehat{AOH} = \widehat{HAO} = 45°\).
    De plus OH = \(\cos \widehat{AOH}\) et HA = \(\sin \widehat{AOH}\).
    Le triangle OHA est isocèle et rectangle en H :
    Donc OH = HA donc \(\cos \widehat{AOH} = \sin \widehat{AOH}\).
    Or \(\sin^2 \widehat{AOH} + \cos^2 \widehat{AOH} = 1\) donc \(2 \cos^2 \widehat{AOH} = 1\).
    \(\cos^2 \widehat{AOH} = \frac{1}{2}\) donc \(\cos \widehat{AOH} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}\) et \(\sin \widehat{AOH} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}\).
*   **Pour l’angle \(\frac{\pi}{3}\) :**
    La mesure \(\frac{\pi}{3}\) radian est égale à la mesure de 60°.
    De plus on sait que OA = OB = 1, donc OAB est un triangle équilatéral. Sa hauteur issue de A, [AH] est aussi la médiane et la médiatrice donc [AH] coupe [OB] en son milieu.
    Donc OH = \(\frac{1}{2} = \cos \widehat{AOH}\).
    Donc \(\cos \frac{\pi}{3} = \frac{1}{2}\).
    De plus \(\cos^2 \frac{\pi}{3} + \sin^2 \frac{\pi}{3} = 1\).
    \(\left(\frac{1}{2}\right)^2 + \sin^2 \frac{\pi}{3} = 1\).
    \(\sin^2 \frac{\pi}{3} = 1 - \frac{1}{4} = \frac{3}{4}\) donc \(\sin \frac{\pi}{3} = \frac{\sqrt{3}}{2}\).

**Exemples :** On considère un repère orthonormé (O, I, J) et le cercle trigonométrique (C) de centre O.

1.  a. Placer le point du cercle trigonométrique associé au réel \(\frac{2\pi}{3}\).
    b. En utilisant le tableau des valeurs remarquables, déterminer les valeurs exactes du cosinus et du sinus de ce réel.
2.  a. Placer le point du cercle trigonométrique associé au réel \(-\frac{3\pi}{4}\).
    b. En utilisant le tableau des valeurs remarquables, déterminer les valeurs exactes du cosinus et du sinus de ce réel.

**Correction :**

1.  a. Soit A le point de (C) associé au réel \(\frac{2\pi}{3}\). Comme \(\frac{2\pi}{3} = 2 \times \frac{\pi}{3}\), or \(\frac{\pi}{3}\) correspond à un angle de 60° donc \(\frac{2\pi}{3}\) correspond à un angle de 120° dans le sens direct.
    b. Nous savons que : \(\cos \frac{\pi}{3} = \frac{1}{2}\) et \(\sin \frac{\pi}{3} = \frac{\sqrt{3}}{2}\).
    Nous observons que le point A est le symétrique du point de (C) associé à \(\frac{\pi}{3}\) par rapport à l’axe des ordonnées.
    Les points ont donc des abscisses opposées et des ordonnées égales. Par conséquent :
    \[
    \cos \frac{2\pi}{3} = -\frac{1}{2} \quad \text{et} \quad \sin \frac{2\pi}{3} = \frac{\sqrt{3}}{2}
    \]

2.  a. Soit B le point de (C) associé au réel \(-\frac{3\pi}{4}\). Comme \(-\frac{3\pi}{4} = -3 \times \frac{\pi}{4}\), or \(\frac{\pi}{4}\) correspond à un angle de 45° donc \(-\frac{3\pi}{4}\) correspond à un angle de 135° dans le sens indirect.
    b. Nous savons que : \(\cos \frac{\pi}{4} = \frac{\sqrt{2}}{2}\) et \(\sin \frac{\pi}{4} = \frac{\sqrt{2}}{2}\).
    Nous observons que le point B est le symétrique du point de (C) associé à \(\frac{\pi}{4}\) par rapport à l’origine O du repère.
    Les points ont donc des abscisses et des ordonnées opposées. Par conséquent :
    \[
    \cos \left(-\frac{3\pi}{4}\right) = -\frac{\sqrt{2}}{2} \quad \text{et} \quad \sin \left(-\frac{3\pi}{4}\right) = -\frac{\sqrt{2}}{2}
    \]

#### 5) Formules trigonométriques

**Propriété :**
*   \(\cos (-x) = \cos x\)
*   \(\sin (-x) = -\sin x\)

M et N ont la même abscisse et les ordonnées opposées par symétrie par rapport à l’axe des abscisses.

### IV) Fonctions trigonométriques

#### 1) Définitions

*   La fonction cosinus, notée cos, est définie sur \(\mathbb{R}\) par \(x \mapsto \cos x\).
*   La fonction sinus, notée sin, est définie sur \(\mathbb{R}\) par \(x \mapsto \sin x\).

Le parcours d’un point sur le cercle trigonométrique, permet de construire, point par point, les courbes représentatives des fonctions cosinus et sinus.

#### 2) Propriétés sur la parité des fonctions sinus et cosinus

*   La fonction cosinus est paire : Pour tout \(x\) appartenant à \(\mathbb{R}\), \(\cos (-x) = \cos x\).
*   La fonction sinus est impaire : Pour tout \(x\) appartenant à \(\mathbb{R}\), \(\sin (-x) = -\sin x\).

En effet, pour tout nombre réel \(x\), les points associés à \(x\) et \(-x\) sur le cercle trigonométrique sont symétriques par rapport à l’axe des abscisses. Ils ont donc la même abscisse et l’ordonnée opposée.

#### 3) Propriété sur la périodicité des fonctions sinus et cosinus

Les fonctions cosinus et sinus sont périodiques de période \(2\pi\).

En effet, pour tout nombre réel \(x\), les points du cercle trigonométrique associés à \(x\) et à \(x + 2\pi\) sont confondus.

#### 4) Tableau de variation et courbe représentative des fonctions sinus et cosinus

La fonction \(x \mapsto \cos x\) est périodique de période \(2\pi\), de plus elle est paire donc symétrique par rapport à l’axe des ordonnées. Il suffit donc d’étudier cette fonction sur l’intervalle \([0, \pi]\) ; le reste de la courbe se déduisant par symétrie.

| \(x\) | 0 | \(\pi\) |
| :--- | :--- | :--- |
| \(\cos x\) | 1 | -1 |

La fonction \(x \mapsto \sin x\) est périodique de période \(2\pi\), de plus elle est impaire donc symétrique par rapport à l’origine O du repère. Il suffit donc d’étudier cette fonction sur l’intervalle \([0, \pi]\) ; le reste de la courbe se déduisant par symétrie.

| \(x\) | 0 | \(\frac{\pi}{2}\) | \(\pi\) |
| :--- | :--- | :--- | :--- |
| \(\sin x\) | 0 | 1 | 0 |
