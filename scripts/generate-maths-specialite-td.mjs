import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const COURSE_ROOT = join(ROOT, 'prototypes', 'cours', 'maths-specialite');
const r = String.raw;

const SECTIONS = [
  ['automatismes', 'Automatismes', '10 exercices courts pour sécuriser les gestes de base.'],
  ['methodes', 'Méthodes guidées', '8 exercices où l’aide disparaît progressivement.'],
  ['pieges', 'Pièges classiques', '6 exercices pour repérer les erreurs qui coûtent des points.'],
  ['choix', 'Choisir la méthode', '5 exercices où il faut décider avant de calculer.'],
  ['controle', 'Niveau contrôle', '6 exercices à faire sans aide visible.'],
  ['vingt', 'Cap 20/20', '3 exercices plus longs, seulement après les blocs précédents.'],
  ['revision', 'Révision mélangée', '2 exercices qui mélangent ce chapitre avec un autre réflexe.'],
];

const LEVEL_LABELS = {
  auto: 'Automatisme',
  guide: 'Guidé',
  trap: 'Piège',
  choice: 'Choix',
  control: 'Contrôle',
  twenty: '20/20',
  revision: 'Révision',
};

function ex(title, skill, level, statement, answer, hint = '', detail = '', source = '') {
  return { title, skill, level, statement, answer, hint, detail, source };
}

const chapters = [
  {
    slug: 'second-degre',
    index: '01',
    title: 'Second degré',
    lead: '40 exercices pour choisir la bonne forme, résoudre, étudier le signe et rédiger sans perdre les cas limites.',
    flow: ['Forme', 'Racines', 'Signe', 'Rédaction'],
    sources: [
      'Maths91, cours et fiche d’exercices Second degré',
      'Maths-et-tiques, Second degré parties 1 et 2',
      'XyMaths, cours Second degré',
      'MathGM, parcours Second degré',
    ],
    coverage: [
      'forme développée, factorisée et canonique',
      'discriminant, racines, racine double',
      'signe d’un trinôme et inéquations',
      'sommet, axe de symétrie, position relative',
      'somme et produit des racines',
    ],
    traps: [
      'oublier le signe de \(b\)',
      'utiliser le discriminant alors qu’une factorisation immédiate existe',
      'inverser le signe du trinôme quand \(a<0\)',
      'confondre racine double et deux solutions',
    ],
    exercises: {
      automatismes: [
        ex('Repérer les coefficients', 'identifier \(a\), \(b\), \(c\)', 'auto', r`Dans \(f(x)=-3x^2+5x-7\), donner \(a\), \(b\) et \(c\).`, r`\(a=-3\), \(b=5\), \(c=-7\). Le coefficient \(a\) est celui de \(x^2\).`, 'Le signe appartient au coefficient.'),
        ex('Calculer une image', 'évaluer un trinôme', 'auto', r`Pour \(f(x)=2x^2-4x+1\), calculer \(f(3)\).`, r`\(f(3)=2\times9-12+1=7\).`),
        ex('Produit nul', 'résoudre une équation factorisée', 'auto', r`Résoudre \((x-5)(2x+3)=0\).`, r`\(x=5\) ou \(x=-\frac{3}{2}\).`, 'Un produit est nul si au moins un facteur est nul.'),
        ex('Discriminant direct', 'calculer \(\Delta\)', 'auto', r`Calculer le discriminant de \(x^2-6x+5\).`, r`\(\Delta=(-6)^2-4\times1\times5=16\).`),
        ex('Deux racines', 'appliquer la formule des racines', 'auto', r`Résoudre \(x^2-6x+5=0\).`, r`Comme \(\Delta=16\), les racines sont \(1\) et \(5\).`),
        ex('Racine double', 'reconnaître \(\Delta=0\)', 'auto', r`Résoudre \(4x^2-12x+9=0\).`, r`\(\Delta=0\), donc l’unique solution est \(x=\frac{12}{8}=\frac{3}{2}\).`),
        ex('Sommet en forme canonique', 'lire \((\alpha;\beta)\)', 'auto', r`Donner le sommet de \(f(x)=-2(x-1)^2+7\).`, r`Le sommet est \(S(1;7)\).`),
        ex('Axe de symétrie', 'lire l’axe', 'auto', r`Pour \(f(x)=3(x+4)^2-2\), donner l’axe de symétrie.`, r`L’axe est la droite \(x=-4\).`),
        ex('Signe à partir des racines', 'utiliser le signe de \(a\)', 'auto', r`Un trinôme a pour racines \(-2\) et \(4\), avec \(a>0\). Où est-il négatif ?`, r`Il est négatif sur \(]-2;4[\).`),
        ex('Somme et produit', 'contrôler deux racines', 'auto', r`Pour \(x^2-7x+10\), donner la somme et le produit des racines.`, r`La somme vaut \(7\) et le produit vaut \(10\), donc les racines sont \(2\) et \(5\).`),
      ],
      methodes: [
        ex('Résolution guidée', 'résoudre avec le discriminant', 'guide', r`Résoudre \(2x^2-5x-3=0\) en écrivant les trois étapes : coefficients, discriminant, racines.`, r`Les solutions sont \(-\frac{1}{2}\) et \(3\).`, 'Commence par \(a=2\), \(b=-5\), \(c=-3\).', r`<p>On a \(a=2\), \(b=-5\), \(c=-3\).</p><p>\(\Delta=(-5)^2-4\times2\times(-3)=49\).</p><p>Donc \(x_1=\frac{5-7}{4}=-\frac{1}{2}\) et \(x_2=\frac{5+7}{4}=3\).</p>`, 'Maths91, équations du second degré'),
        ex('Passer en forme canonique', 'compléter le carré', 'guide', r`Écrire \(x^2-8x+11\) sous forme canonique.`, r`\(x^2-8x+11=(x-4)^2-5\).`, 'Compare avec \(x^2-8x+16\).'),
        ex('Étudier un signe', 'dresser un tableau de signe', 'guide', r`Résoudre \(x^2-3x-10\leq0\).`, r`Les racines sont \(-2\) et \(5\). Comme \(a>0\), la solution est \([-2;5]\).`),
        ex('Position relative', 'ramener à un trinôme', 'guide', r`Comparer \(f(x)=x^2+2x+1\) et \(g(x)=3x+5\). Pour quels \(x\) a-t-on \(f(x)\ge g(x)\) ?`, r`On résout \(x^2-x-4\ge0\). Les solutions sont \(x\le\frac{1-\sqrt{17}}{2}\) ou \(x\ge\frac{1+\sqrt{17}}{2}\).`),
        ex('Sommet et extremum', 'lire la forme canonique', 'guide', r`Pour \(f(x)=-3(x+2)^2+12\), donner le maximum et l’abscisse où il est atteint.`, r`Le maximum vaut \(12\), atteint pour \(x=-2\).`),
        ex('Factorisation connue', 'éviter un calcul inutile', 'guide', r`Factoriser \(x^2+x-12\), puis résoudre \(x^2+x-12=0\).`, r`\(x^2+x-12=(x+4)(x-3)\), donc \(x=-4\) ou \(x=3\).`),
        ex('Paramètre simple', 'imposer une racine', 'guide', r`Déterminer \(m\) pour que \(2\) soit racine de \(x^2+mx-6\).`, r`On impose \(4+2m-6=0\), donc \(m=1\).`),
        ex('Rédaction notée', 'écrire une solution complète', 'guide', r`Rédiger proprement la résolution de \(3x^2+2x-1=0\).`, r`Les solutions sont \(-1\) et \(\frac{1}{3}\).`, '', r`<p>Copie propre : \(a=3\), \(b=2\), \(c=-1\). On calcule \(\Delta=2^2-4\times3\times(-1)=16\). Comme \(\Delta>0\), l’équation admet deux solutions.</p><p>\(x_1=\frac{-2-4}{6}=-1\) et \(x_2=\frac{-2+4}{6}=\frac{1}{3}\).</p><p>Erreur qui coûte des points : écrire seulement les deux nombres sans préciser le discriminant ni la conclusion.</p>`),
      ],
      pieges: [
        ex('Signe de \(b\)', 'éviter une erreur de discriminant', 'trap', r`Un élève calcule \(\Delta=5^2-4\times2\times3\) pour \(2x^2-5x+3\). Est-ce correct ?`, r`Non, ici \(b=-5\). Il faut écrire \(\Delta=(-5)^2-4\times2\times3=1\).`),
        ex('Racine double', 'ne pas inventer deux solutions', 'trap', r`Combien de solutions a \(9x^2-6x+1=0\) ?`, r`Une seule : \(x=\frac{1}{3}\), car \(\Delta=0\).`),
        ex('Inégalité stricte', 'traiter les bornes', 'trap', r`Résoudre \((x-1)(x+2)<0\).`, r`La solution est \(]-2;1[\). Les bornes sont exclues car l’inégalité est stricte.`),
        ex('Signe de \(a<0\)', 'inverser le tableau correctement', 'trap', r`Un trinôme de coefficient directeur \(a<0\) a pour racines \(1\) et \(6\). Où est-il positif ?`, r`Il est positif entre les racines : \(]1;6[\).`),
        ex('Forme canonique', 'ne pas changer le signe de \(\alpha\)', 'trap', r`Dans \(f(x)=2(x+3)^2-8\), un élève annonce \(S(3;-8)\). Corriger.`, r`Le sommet est \(S(-3;-8)\), car \(x+3=x-(-3)\).`),
        ex('Méthode trop lourde', 'repérer une factorisation', 'trap', r`Pourquoi le discriminant n’est pas le meilleur départ pour \(x^2-9=0\) ?`, r`Parce que \(x^2-9=(x-3)(x+3)\). Les solutions se lisent directement : \(-3\) et \(3\).`),
      ],
      choix: [
        ex('Forme utile 1', 'choisir avant de calculer', 'choice', r`Pour trouver le sommet de \(f(x)=5(x-2)^2-11\), quelle forme utilises-tu ?`, r`La forme canonique, car elle donne directement \(S(2;-11)\).`),
        ex('Forme utile 2', 'choisir entre factoriser et discriminer', 'choice', r`Pour résoudre \(x^2-4x=0\), factorisation ou discriminant ?`, r`Factorisation : \(x(x-4)=0\), donc \(x=0\) ou \(x=4\).`),
        ex('Inéquation', 'choisir tableau de signe', 'choice', r`Pour résoudre \(2x^2-8x+6>0\), quelle méthode déclenches-tu ?`, r`Racines puis tableau de signe, car on demande un intervalle de valeurs de \(x\).`),
        ex('Position de courbes', 'ramener à une différence', 'choice', r`Pour comparer deux courbes \(f\) et \(g\), quel objet étudies-tu ?`, r`On étudie le signe de \(f(x)-g(x)\).`),
        ex('Racines mentalement', 'utiliser somme-produit', 'choice', r`Pour \(x^2-9x+20\), quelle méthode rapide peut remplacer le discriminant ?`, r`Somme-produit : \(4+5=9\) et \(4\times5=20\), donc racines \(4\) et \(5\).`),
      ],
      controle: [
        ex('Contrôle 1', 'résoudre et conclure', 'control', r`Résoudre \(4x^2-4x-3=0\).`, r`\(\Delta=64\), donc \(x=-\frac{1}{2}\) ou \(x=\frac{3}{2}\).`),
        ex('Contrôle 2', 'signe du trinôme', 'control', r`Résoudre \(-x^2+5x-6\ge0\).`, r`Les racines sont \(2\) et \(3\). Comme \(a<0\), la solution est \([2;3]\).`),
        ex('Contrôle 3', 'forme canonique', 'control', r`Mettre \(2x^2+12x+13\) sous forme canonique et donner le minimum.`, r`\(2x^2+12x+13=2(x+3)^2-5\). Le minimum vaut \(-5\).`),
        ex('Contrôle 4', 'position relative', 'control', r`Résoudre \(x^2+1<2x+4\).`, r`On obtient \(x^2-2x-3<0\), donc \(-1<x<3\).`),
        ex('Contrôle 5', 'paramètre', 'control', r`Déterminer \(m\) pour que \(x^2+mx+9\) ait une racine double.`, r`Il faut \(\Delta=m^2-36=0\), donc \(m=-6\) ou \(m=6\).`),
        ex('Contrôle 6', 'rédaction complète', 'control', r`Étudier le signe de \(3x^2-12x+9\) sur \(\mathbb{R}\).`, r`\(3x^2-12x+9=3(x-1)(x-3)\). Le signe est positif sur \(]-\infty;1]\cup[3;+\infty[\) et négatif sur \([1;3]\) avec zéros en \(1\) et \(3\).`),
      ],
      vingt: [
        ex('20/20 1', 'enchaîner sommet et signe', 'twenty', r`Soit \(f(x)=-2x^2+8x-5\). Donner son maximum, puis résoudre \(f(x)\ge1\).`, r`\(f(x)=-2(x-2)^2+3\), maximum \(3\). L’inéquation donne \((x-2)^2\le1\), donc \(x\in[1;3]\).`),
        ex('20/20 2', 'deux courbes et paramètre', 'twenty', r`Pour quelles valeurs de \(m\) l’équation \(x^2-4x+m=0\) admet-elle deux solutions distinctes ?`, r`\(\Delta=16-4m\). Deux solutions distinctes si \(\Delta>0\), donc \(m<4\).`),
        ex('20/20 3', 'problème d’aire', 'twenty', r`Un rectangle a pour périmètre \(20\) et pour largeur \(x\). Écrire son aire, puis trouver la largeur qui donne l’aire maximale.`, r`La longueur vaut \(10-x\). L’aire est \(A(x)=x(10-x)=-x^2+10x\). Son maximum est atteint pour \(x=5\).`),
      ],
      revision: [
        ex('Révision dérivation', 'relier sommet et dérivée', 'revision', r`Pour \(f(x)=x^2-6x+8\), calculer \(f'(x)\) puis retrouver l’abscisse du sommet.`, r`\(f'(x)=2x-6\). Elle s’annule en \(x=3\), l’abscisse du sommet.`),
        ex('Révision suites', 'modéliser une suite quadratique', 'revision', r`On pose \(u_n=n^2-5n+4\). Résoudre \(u_n=0\) pour \(n\in\mathbb{N}\).`, r`\(n^2-5n+4=(n-1)(n-4)\). Donc \(n=1\) ou \(n=4\).`),
      ],
    },
  },
  {
    slug: 'trigonometrie',
    index: '02',
    title: 'Trigonométrie',
    lead: '40 exercices pour fixer radians, cercle trigonométrique, valeurs exactes, formules et équations simples.',
    flow: ['Radian', 'Cercle', 'Valeurs', 'Équations'],
    sources: [
      'Maths91, cours et exercices Trigonométrie',
      'Parfenoff, Trigonométrie 1re spécialité',
      'Ching@Math, exercices corrigés Trigonométrie',
    ],
    coverage: [
      'mesure en radians et longueur d’arc',
      'enroulement de la droite réelle',
      'cosinus, sinus, valeurs remarquables',
      'symétries et formules de base',
      'équations \(\cos x=a\) et \(\sin x=a\)',
    ],
    traps: [
      'confondre degrés et radians',
      'oublier les solutions modulo \(2\pi\)',
      'changer le signe du sinus dans le mauvais quadrant',
      'utiliser une formule de fonction trigonométrique avant le cercle',
    ],
    exercises: {
      automatismes: [
        ex('Conversion 1', 'convertir degrés en radians', 'auto', r`Convertir \(60^\circ\) en radians.`, r`\(60^\circ=\frac{\pi}{3}\).`),
        ex('Conversion 2', 'convertir radians en degrés', 'auto', r`Convertir \(\frac{5\pi}{6}\) en degrés.`, r`\(\frac{5\pi}{6}=150^\circ\).`),
        ex('Longueur d’arc', 'utiliser \(L=r\theta\)', 'auto', r`Sur un cercle de rayon \(4\), quelle est la longueur de l’arc intercepté par un angle \(\frac{\pi}{3}\) ?`, r`\(L=4\times\frac{\pi}{3}=\frac{4\pi}{3}\).`),
        ex('Valeur exacte', 'connaître le cercle', 'auto', r`Donner \(\cos\left(\frac{\pi}{3}\right)\) et \(\sin\left(\frac{\pi}{3}\right)\).`, r`\(\cos\left(\frac{\pi}{3}\right)=\frac{1}{2}\) et \(\sin\left(\frac{\pi}{3}\right)=\frac{\sqrt3}{2}\).`),
        ex('Quadrant', 'lire le signe', 'auto', r`Quel est le signe de \(\cos x\) et de \(\sin x\) si \(x\in]\pi;\frac{3\pi}{2}[\) ?`, r`Les deux sont négatifs dans le troisième quadrant.`),
        ex('Symétrie cosinus', 'utiliser \(\cos(-x)\)', 'auto', r`Simplifier \(\cos(-\frac{\pi}{4})\).`, r`\(\cos(-\frac{\pi}{4})=\cos(\frac{\pi}{4})=\frac{\sqrt2}{2}\).`),
        ex('Symétrie sinus', 'utiliser \(\sin(-x)\)', 'auto', r`Simplifier \(\sin(-\frac{\pi}{6})\).`, r`\(\sin(-\frac{\pi}{6})=-\frac{1}{2}\).`),
        ex('Relation fondamentale', 'appliquer \(\cos^2+\sin^2=1\)', 'auto', r`Si \(\cos x=\frac{3}{5}\) et \(\sin x>0\), déterminer \(\sin x\).`, r`\(\sin x=\frac{4}{5}\).`),
        ex('Périodicité', 'ajouter \(2\pi\)', 'auto', r`Donner une mesure positive associée au même point que \(-\frac{\pi}{3}\).`, r`\(-\frac{\pi}{3}+2\pi=\frac{5\pi}{3}\).`),
        ex('Équation immédiate', 'résoudre sur \([0;2\pi[\)', 'auto', r`Résoudre \(\cos x=1\) sur \([0;2\pi[\).`, r`La seule solution est \(x=0\).`),
      ],
      methodes: [
        ex('Placer un angle', 'réduire modulo \(2\pi\)', 'guide', r`Réduire \(\frac{17\pi}{6}\) dans \([0;2\pi[\), puis donner le point associé.`, r`\(\frac{17\pi}{6}-2\pi=\frac{5\pi}{6}\). Le point est dans le deuxième quadrant.`),
        ex('Valeurs par symétrie', 'trouver cosinus et sinus', 'guide', r`Donner \(\cos\left(\frac{2\pi}{3}\right)\) et \(\sin\left(\frac{2\pi}{3}\right)\).`, r`\(\frac{2\pi}{3}=\pi-\frac{\pi}{3}\), donc \(\cos=-\frac12\) et \(\sin=\frac{\sqrt3}{2}\).`),
        ex('Trouver l’angle', 'utiliser les coordonnées', 'guide', r`Sur \([0;2\pi[\), quel réel a pour coordonnées \(\left(-\frac{\sqrt2}{2};\frac{\sqrt2}{2}\right)\) ?`, r`C’est \(x=\frac{3\pi}{4}\).`),
        ex('Formule carré', 'calculer une valeur manquante', 'guide', r`Si \(\sin x=\frac{5}{13}\) et \(x\in[0;\frac{\pi}{2}]\), calculer \(\cos x\).`, r`\(\cos x=\frac{12}{13}\).`),
        ex('Équation cosinus', 'résoudre dans un intervalle', 'guide', r`Résoudre \(\cos x=\frac12\) sur \([0;2\pi[\).`, r`\(x=\frac{\pi}{3}\) ou \(x=\frac{5\pi}{3}\).`),
        ex('Équation sinus', 'résoudre dans un intervalle', 'guide', r`Résoudre \(\sin x=-\frac{\sqrt2}{2}\) sur \([0;2\pi[\).`, r`\(x=\frac{5\pi}{4}\) ou \(x=\frac{7\pi}{4}\).`),
        ex('Arc et rayon', 'exploiter \(L=r\theta\)', 'guide', r`Un arc mesure \(6\pi\) sur un cercle de rayon \(9\). Donner l’angle en radians.`, r`\(\theta=\frac{6\pi}{9}=\frac{2\pi}{3}\).`),
        ex('Rédaction notée', 'présenter les solutions modulo', 'guide', r`Rédiger la résolution de \(\sin x=\frac12\) dans \(\mathbb{R}\).`, r`\(x=\frac{\pi}{6}+2k\pi\) ou \(x=\frac{5\pi}{6}+2k\pi\), avec \(k\in\mathbb{Z}\).`, '', r`<p>Copie propre : on sait que \(\sin x=\frac12\) pour les angles \(\frac{\pi}{6}\) et \(\frac{5\pi}{6}\) sur un tour.</p><p>Donc, dans \(\mathbb{R}\), les solutions sont \(x=\frac{\pi}{6}+2k\pi\) ou \(x=\frac{5\pi}{6}+2k\pi\), avec \(k\in\mathbb{Z}\).</p><p>Erreur qui coûte des points : oublier \(+2k\pi\) quand l’intervalle n’est pas limité.</p>`),
      ],
      pieges: [
        ex('Degrés radians', 'ne pas mélanger les unités', 'trap', r`Pourquoi \(\sin(30)\neq\frac12\) dans une copie de trigonométrie en radians ?`, r`Parce que \(30\) signifie \(30\) radians, pas \(30^\circ\). Il faut écrire \(\sin(\frac{\pi}{6})=\frac12\).`),
        ex('Cosinus négatif', 'choisir le bon quadrant', 'trap', r`Résoudre \(\cos x=-\frac12\) sur \([0;2\pi[\).`, r`\(x=\frac{2\pi}{3}\) ou \(x=\frac{4\pi}{3}\).`),
        ex('Sinus nul', 'ne pas oublier \(\pi\)', 'trap', r`Résoudre \(\sin x=0\) sur \([0;2\pi[\).`, r`\(x=0\) ou \(x=\pi\). \(2\pi\) est exclu de l’intervalle.`),
        ex('Période', 'éviter \(+\pi\) partout', 'trap', r`Un élève écrit que les solutions de \(\cos x=\frac12\) sont \(\frac{\pi}{3}+k\pi\). Corriger.`, r`C’est faux : cela ajoute aussi \(\frac{4\pi}{3}\), qui a un cosinus \(-\frac12\). Il faut deux familles modulo \(2\pi\).`),
        ex('Carré du cosinus', 'garder deux signes possibles', 'trap', r`Si \(\cos^2 x=\frac14\), que peut valoir \(\cos x\) ?`, r`\(\cos x=\frac12\) ou \(\cos x=-\frac12\).`),
        ex('Angle associé', 'réduire avant de lire', 'trap', r`Réduire \(-\frac{11\pi}{6}\) dans \([0;2\pi[\).`, r`On ajoute \(2\pi\) : \(-\frac{11\pi}{6}+\frac{12\pi}{6}=\frac{\pi}{6}\).`),
      ],
      choix: [
        ex('Choix 1', 'valeur exacte ou équation', 'choice', r`Pour calculer \(\cos(\frac{7\pi}{6})\), utilises-tu le tableau ou une équation ?`, r`Le tableau et la symétrie : \(\frac{7\pi}{6}=\pi+\frac{\pi}{6}\), donc \(\cos=-\frac{\sqrt3}{2}\).`),
        ex('Choix 2', 'réduire l’angle', 'choice', r`Avant de placer \(\frac{29\pi}{4}\), quel geste faut-il faire ?`, r`Réduire modulo \(2\pi\). Ici \(\frac{29\pi}{4}-6\pi=\frac{5\pi}{4}\).`),
        ex('Choix 3', 'relation fondamentale', 'choice', r`Si l’énoncé donne \(\sin x\) et le quadrant, quelle formule déclenche-t-on pour trouver \(\cos x\) ?`, r`\(\cos^2 x+\sin^2 x=1\), puis on choisit le signe avec le quadrant.`),
        ex('Choix 4', 'intervalle ou réel', 'choice', r`Pourquoi la résolution de \(\sin x=a\) change selon que l’on travaille sur \([0;2\pi[\) ou sur \(\mathbb{R}\) ?`, r`Sur \([0;2\pi[\), on liste les solutions d’un tour. Sur \(\mathbb{R}\), on ajoute les familles modulo \(2\pi\).`),
        ex('Choix 5', 'longueur d’arc', 'choice', r`Dans un problème avec rayon et longueur d’arc, quelle formule utiliser avant les valeurs remarquables ?`, r`La formule \(L=r\theta\), car elle relie géométrie et angle en radians.`),
      ],
      controle: [
        ex('Contrôle 1', 'valeurs exactes', 'control', r`Donner \(\cos(\frac{5\pi}{4})\) et \(\sin(\frac{5\pi}{4})\).`, r`Les deux valent \(-\frac{\sqrt2}{2}\).`),
        ex('Contrôle 2', 'équation cosinus', 'control', r`Résoudre \(\cos x=-\frac{\sqrt3}{2}\) sur \([0;2\pi[\).`, r`\(x=\frac{5\pi}{6}\) ou \(x=\frac{7\pi}{6}\).`),
        ex('Contrôle 3', 'équation sinus', 'control', r`Résoudre \(\sin x=\frac{\sqrt3}{2}\) sur \(\mathbb{R}\).`, r`\(x=\frac{\pi}{3}+2k\pi\) ou \(x=\frac{2\pi}{3}+2k\pi\), \(k\in\mathbb{Z}\).`),
        ex('Contrôle 4', 'relation fondamentale', 'control', r`Si \(\cos x=-\frac{8}{17}\) et \(x\in[\frac{\pi}{2};\pi]\), déterminer \(\sin x\).`, r`\(\sin x=\frac{15}{17}\).`),
        ex('Contrôle 5', 'réduction', 'control', r`Réduire \(\frac{41\pi}{6}\) dans \([0;2\pi[\).`, r`\(\frac{41\pi}{6}-6\pi=\frac{5\pi}{6}\).`),
        ex('Contrôle 6', 'arc', 'control', r`Un arc de rayon \(5\) correspond à un angle de \(72^\circ\). Donner sa longueur exacte.`, r`\(72^\circ=\frac{2\pi}{5}\), donc \(L=5\times\frac{2\pi}{5}=2\pi\).`),
      ],
      vingt: [
        ex('20/20 1', 'enchaîner quadrant et équation', 'twenty', r`Résoudre sur \([-\pi;\pi]\) : \(2\cos^2 x-1=0\).`, r`\(\cos^2 x=\frac12\), donc \(x\in\left\{-\frac{3\pi}{4};-\frac{\pi}{4};\frac{\pi}{4};\frac{3\pi}{4}\right\}\).`),
        ex('20/20 2', 'paramètre simple', 'twenty', r`Pour quels \(x\in[0;2\pi[\) a-t-on \(\sin x=\cos x\) ?`, r`Cela arrive pour \(x=\frac{\pi}{4}\) et \(x=\frac{5\pi}{4}\).`),
        ex('20/20 3', 'arc et enroulement', 'twenty', r`Un point parcourt un cercle de rayon \(3\). Il avance d’une longueur \(11\pi\). Donner une mesure principale de l’angle parcouru.`, r`\(\theta=\frac{11\pi}{3}\). En retirant \(2\pi=\frac{6\pi}{3}\), on obtient \(\frac{5\pi}{3}\).`),
      ],
      revision: [
        ex('Révision produit scalaire', 'lier angle et cosinus', 'revision', r`Si \(\|\vec u\|=4\), \(\|\vec v\|=5\) et l’angle vaut \(\frac{\pi}{3}\), calculer \(\vec u\cdot\vec v\).`, r`\(\vec u\cdot\vec v=4\times5\times\frac12=10\).`),
        ex('Révision fonctions', 'préparer les fonctions trigo', 'revision', r`Donner le signe de \(\sin x\) sur \(]0;\pi[\), puis sur \(]\pi;2\pi[\).`, r`Positif sur \(]0;\pi[\), négatif sur \(]\pi;2\pi[\).`),
      ],
    },
  },
  {
    slug: 'produit-scalaire',
    index: '03',
    title: 'Produit scalaire',
    lead: '40 exercices pour choisir la bonne expression du produit scalaire, prouver une orthogonalité et rédiger en coordonnées.',
    flow: ['Formule', 'Angle', 'Coordonnées', 'Preuve'],
    sources: [
      'Maths91, cours et exercices Produit scalaire',
      'Meilleurenmaths, fiche Produit scalaire',
      'MathsGuyon, cours Produit scalaire',
    ],
    coverage: [
      'définitions par projection, norme et angle',
      'bilinéarité et identités remarquables',
      'orthogonalité',
      'expression analytique en repère orthonormé',
      'applications aux droites, cercles et longueurs',
    ],
    traps: [
      'oublier que le produit scalaire est un nombre',
      'utiliser une formule avec angle sans connaître les normes',
      'confondre vecteur directeur et vecteur normal',
      'développer \((\vec u+\vec v)^2\) sans le terme \(2\vec u\cdot\vec v\)',
    ],
    exercises: {
      automatismes: [
        ex('Coordonnées 1', 'calculer analytiquement', 'auto', r`Calculer \((2;-3)\cdot(5;4)\).`, r`\(2\times5+(-3)\times4=10-12=-2\).`),
        ex('Norme', 'calculer \(\vec u\cdot\vec u\)', 'auto', r`Si \(\vec u=(3;4)\), calculer \(\vec u\cdot\vec u\).`, r`\(\vec u\cdot\vec u=3^2+4^2=25\).`),
        ex('Angle droit', 'repérer orthogonalité', 'auto', r`Si \(\vec u\cdot\vec v=0\) et \(\vec u,\vec v\) sont non nuls, que peut-on conclure ?`, r`Les vecteurs sont orthogonaux.`),
        ex('Formule avec angle', 'utiliser \(\|\vec u\|\|\vec v\|\cos\theta\)', 'auto', r`Si \(\|\vec u\|=6\), \(\|\vec v\|=2\) et \(\theta=60^\circ\), calculer \(\vec u\cdot\vec v\).`, r`\(6\times2\times\frac12=6\).`),
        ex('Produit négatif', 'interpréter un angle obtus', 'auto', r`Si \(\vec u\cdot\vec v<0\), l’angle entre les vecteurs est-il aigu ou obtus ?`, r`Il est obtus.`),
        ex('Développement 1', 'développer un carré vectoriel', 'auto', r`Développer \((\vec u+\vec v)^2\).`, r`\(\|\vec u+\vec v\|^2=\|\vec u\|^2+2\vec u\cdot\vec v+\|\vec v\|^2\).`),
        ex('Développement 2', 'développer une différence', 'auto', r`Développer \((\vec u-\vec v)^2\).`, r`\(\|\vec u-\vec v\|^2=\|\vec u\|^2-2\vec u\cdot\vec v+\|\vec v\|^2\).`),
        ex('Points', 'former des vecteurs', 'auto', r`Pour \(A(1;2)\), \(B(4;6)\), donner \(\overrightarrow{AB}\).`, r`\(\overrightarrow{AB}=(3;4)\).`),
        ex('Produit de deux vecteurs points', 'coordonnées puis produit', 'auto', r`Avec \(A(0;1)\), \(B(2;5)\), \(C(3;0)\), calculer \(\overrightarrow{AB}\cdot\overrightarrow{AC}\).`, r`\(\overrightarrow{AB}=(2;4)\), \(\overrightarrow{AC}=(3;-1)\), donc \(2\).`),
        ex('Vecteur normal', 'lier droite et produit scalaire', 'auto', r`Pour la droite \(3x-2y+5=0\), donner un vecteur normal.`, r`Un vecteur normal est \((3;-2)\).`),
      ],
      methodes: [
        ex('Angle avec coordonnées', 'calculer un cosinus', 'guide', r`Soit \(\vec u=(1;2)\) et \(\vec v=(4;-2)\). Calculer \(\vec u\cdot\vec v\), puis dire si les vecteurs sont orthogonaux.`, r`\(\vec u\cdot\vec v=1\times4+2\times(-2)=0\). Ils sont orthogonaux.`),
        ex('Longueur inconnue', 'utiliser Al-Kashi', 'guide', r`Dans un triangle, \(AB=5\), \(AC=7\), \(\widehat{BAC}=60^\circ\). Calculer \(\overrightarrow{AB}\cdot\overrightarrow{AC}\).`, r`\(5\times7\times\frac12=\frac{35}{2}\).`),
        ex('Développer un carré', 'utiliser bilinéarité', 'guide', r`On sait \(\|\vec u\|=3\), \(\|\vec v\|=4\), \(\vec u\cdot\vec v=5\). Calculer \(\|\vec u+\vec v\|^2\).`, r`\(9+2\times5+16=35\).`),
        ex('Projection', 'choisir la formule par projection', 'guide', r`Si \(H\) est le projeté de \(C\) sur \((AB)\), avec \(AB=8\) et \(AH=3\), calculer \(\overrightarrow{AB}\cdot\overrightarrow{AC}\).`, r`\(\overrightarrow{AB}\cdot\overrightarrow{AC}=AB\times AH=24\).`),
        ex('Prouver un angle droit', 'produit scalaire nul', 'guide', r`Avec \(A(1;1)\), \(B(5;3)\), \(C(3;7)\), prouver que \(\widehat{ABC}\) est droit.`, r`\(\overrightarrow{BA}=(-4;-2)\), \(\overrightarrow{BC}=(-2;4)\), produit \(8-8=0\). Donc l’angle est droit en \(B\).`),
        ex('Cercle de diamètre', 'utiliser orthogonalité', 'guide', r`Un point \(M\) vérifie \(\overrightarrow{MA}\cdot\overrightarrow{MB}=0\). Que peut-on dire de \(M\) ?`, r`Le point \(M\) appartient au cercle de diamètre \([AB]\).`),
        ex('Droite normale', 'trouver une équation', 'guide', r`Donner une équation de la droite passant par \(A(2;-1)\) et de vecteur normal \((3;4)\).`, r`\(3(x-2)+4(y+1)=0\), donc \(3x+4y-2=0\).`),
        ex('Rédaction notée', 'justifier une orthogonalité', 'guide', r`Rédiger une preuve que les droites \((AB)\) et \((AC)\) sont perpendiculaires pour \(A(0;0)\), \(B(2;3)\), \(C(6;-4)\).`, r`Elles sont perpendiculaires car \(\overrightarrow{AB}\cdot\overrightarrow{AC}=0\).`, '', r`<p>On calcule \(\overrightarrow{AB}=(2;3)\) et \(\overrightarrow{AC}=(6;-4)\).</p><p>\(\overrightarrow{AB}\cdot\overrightarrow{AC}=2\times6+3\times(-4)=12-12=0\).</p><p>Les deux vecteurs directeurs sont non nuls et orthogonaux. Donc les droites \((AB)\) et \((AC)\) sont perpendiculaires.</p><p>Erreur qui coûte des points : conclure « les points sont orthogonaux » au lieu de parler des vecteurs ou des droites.</p>`),
      ],
      pieges: [
        ex('Nombre ou vecteur', 'identifier la nature', 'trap', r`Dire si \(\vec u\cdot\vec v\) est un vecteur ou un nombre.`, r`C’est un nombre réel.`),
        ex('Carré vectoriel incomplet', 'ne pas oublier le facteur 2', 'trap', r`Corriger : \(\|\vec u+\vec v\|^2=\|\vec u\|^2+\|\vec v\|^2\).`, r`Il manque \(2\vec u\cdot\vec v\), sauf si les vecteurs sont orthogonaux.`),
        ex('Signe du cosinus', 'interpréter un angle', 'trap', r`Si l’angle vaut \(120^\circ\), le produit scalaire est-il positif ou négatif ?`, r`Négatif, car \(\cos(120^\circ)<0\).`),
        ex('Vecteur opposé', 'gérer le signe', 'trap', r`Si \(\overrightarrow{BA}=-\overrightarrow{AB}\), que vaut \(\overrightarrow{BA}\cdot\overrightarrow{AC}\) par rapport à \(\overrightarrow{AB}\cdot\overrightarrow{AC}\) ?`, r`Il vaut l’opposé.`),
        ex('Coordonnées', 'ne pas mélanger les points', 'trap', r`Pour \(A(2;5)\), \(B(-1;7)\), corriger l’erreur \(\overrightarrow{AB}=(3;-2)\).`, r`\(\overrightarrow{AB}=B-A=(-3;2)\).`),
        ex('Droite', 'normal ou directeur', 'trap', r`Pour \(2x+5y-1=0\), le vecteur \((2;5)\) est-il directeur ou normal ?`, r`Il est normal. Un directeur possible est \((5;-2)\).`),
      ],
      choix: [
        ex('Choix 1', 'formule analytique', 'choice', r`Si les vecteurs sont donnés par leurs coordonnées, quelle expression du produit scalaire choisir ?`, r`La formule analytique \(xx'+yy'\).`),
        ex('Choix 2', 'formule avec angle', 'choice', r`Si les longueurs et l’angle sont connus, quelle formule choisir ?`, r`\(\vec u\cdot\vec v=\|\vec u\|\,\|\vec v\|\cos\theta\).`),
        ex('Choix 3', 'preuve d’orthogonalité', 'choice', r`Pour prouver que deux droites sont perpendiculaires avec des coordonnées, quel test utiliser ?`, r`Calculer le produit scalaire de deux vecteurs directeurs et montrer qu’il vaut \(0\).`),
        ex('Choix 4', 'droite cartésienne', 'choice', r`Pour écrire une droite avec un vecteur normal \(\vec n=(a;b)\), quelle forme utiliser ?`, r`\(a(x-x_A)+b(y-y_A)=0\).`),
        ex('Choix 5', 'cercle de diamètre', 'choice', r`Quand l’énoncé contient \(\overrightarrow{MA}\cdot\overrightarrow{MB}=0\), quelle image géométrique reconnaître ?`, r`Le cercle de diamètre \([AB]\).`),
      ],
      controle: [
        ex('Contrôle 1', 'produit analytique', 'control', r`Calculer \((4;-1)\cdot(-2;8)\).`, r`\(-8-8=-16\).`),
        ex('Contrôle 2', 'angle', 'control', r`Si \(\|\vec u\|=10\), \(\|\vec v\|=3\) et \(\vec u\cdot\vec v=15\), calculer \(\cos\theta\).`, r`\(\cos\theta=\frac{15}{30}=\frac12\).`),
        ex('Contrôle 3', 'orthogonalité', 'control', r`Les vecteurs \((6;9)\) et \((3;-2)\) sont-ils orthogonaux ?`, r`Oui, \(6\times3+9\times(-2)=18-18=0\).`),
        ex('Contrôle 4', 'norme', 'control', r`Calculer \(\|(1;2)+(3;-6)\|^2\).`, r`La somme vaut \((4;-4)\), donc la norme au carré vaut \(32\).`),
        ex('Contrôle 5', 'équation de droite', 'control', r`Écrire une équation de la droite passant par \(A(-1;2)\) et de vecteur normal \((5;-3)\).`, r`\(5(x+1)-3(y-2)=0\), soit \(5x-3y+11=0\).`),
        ex('Contrôle 6', 'triangle rectangle', 'control', r`Avec \(A(1;0)\), \(B(4;2)\), \(C(3;5)\), le triangle \(ABC\) est-il rectangle en \(B\) ?`, r`\(\overrightarrow{BA}=(-3;-2)\), \(\overrightarrow{BC}=(-1;3)\), produit \(3-6=-3\). Non.`),
      ],
      vingt: [
        ex('20/20 1', 'médiane', 'twenty', r`On sait \(\|\vec u+\vec v\|^2=50\), \(\|\vec u\|=5\), \(\|\vec v\|=3\). Calculer \(\vec u\cdot\vec v\).`, r`\(50=25+2\vec u\cdot\vec v+9\), donc \(2\vec u\cdot\vec v=16\), soit \(8\).`),
        ex('20/20 2', 'paramètre orthogonal', 'twenty', r`Déterminer \(m\) pour que \((m;2)\) et \((3;m-1)\) soient orthogonaux.`, r`\(3m+2(m-1)=0\), donc \(5m-2=0\) et \(m=\frac25\).`),
        ex('20/20 3', 'lieu géométrique', 'twenty', r`Traduire \(\overrightarrow{MA}\cdot\overrightarrow{MB}=0\) avec \(A(-2;0)\), \(B(4;0)\), puis donner le centre du lieu.`, r`Le lieu est le cercle de diamètre \([AB]\). Son centre est \((1;0)\).`),
      ],
      revision: [
        ex('Révision trigo', 'angle et cosinus', 'revision', r`Si \(\vec u\cdot\vec v=-\frac12\|\vec u\|\|\vec v\|\), donner une mesure possible de l’angle.`, r`Une mesure possible est \(\frac{2\pi}{3}\).`),
        ex('Révision géométrie repérée', 'vecteur normal', 'revision', r`Donner un vecteur directeur de la droite \(4x-y+7=0\).`, r`Un vecteur directeur est \((1;4)\).`),
      ],
    },
  },
  {
    slug: 'derivation',
    index: '04',
    title: 'Dérivation',
    lead: '40 exercices pour passer du taux moyen à la tangente, dériver proprement et justifier les variations.',
    flow: ['Taux', 'Tangente', 'Dérivée', 'Variations'],
    sources: [
      'Maths91, cours Dérivation et TD d’introduction',
      'Maths-et-tiques, dérivées usuelles et variations',
      'Ching@Math, fonctions dérivées',
      'Lycée d’Adultes de Paris, fonction dérivée',
    ],
    coverage: [
      'taux de variation et nombre dérivé',
      'équation de tangente',
      'dérivées usuelles et opérations',
      "signe de \\(f'\\), variations et extremums",
      "lecture graphique de \\(f'\\)",
    ],
    traps: [
      'confondre taux moyen et pente locale',
      'oublier le point dans l’équation de tangente',
      "déduire un extremum de \\(f'=0\\) sans changement de signe",
      'dériver un produit comme un produit des dérivées',
    ],
    exercises: {
      automatismes: [
        ex('Taux moyen', 'calculer un taux', 'auto', r`Pour \(f(x)=x^2\), calculer le taux de variation entre \(1\) et \(3\).`, r`\(\frac{f(3)-f(1)}{3-1}=\frac{9-1}{2}=4\).`),
        ex('Dérivée de \(x^2\)', 'dérivée usuelle', 'auto', r`Dériver \(f(x)=x^2\).`, r`\(f'(x)=2x\).`),
        ex('Dérivée de \(x^3\)', 'dérivée usuelle', 'auto', r`Dériver \(f(x)=x^3\).`, r`\(f'(x)=3x^2\).`),
        ex('Constante', 'dériver une constante', 'auto', r`Dériver \(f(x)=7\).`, r`\(f'(x)=0\).`),
        ex('Affine', 'dériver une affine', 'auto', r`Dériver \(f(x)=-5x+2\).`, r`\(f'(x)=-5\).`),
        ex('Somme', 'dériver terme à terme', 'auto', r`Dériver \(f(x)=3x^2-4x+9\).`, r`\(f'(x)=6x-4\).`),
        ex('Inverse', 'dérivée usuelle', 'auto', r`Dériver \(f(x)=\frac{1}{x}\) sur \(]0;+\infty[\).`, r`\(f'(x)=-\frac{1}{x^2}\).`),
        ex('Racine', 'dérivée usuelle', 'auto', r`Dériver \(f(x)=\sqrt{x}\) sur \(]0;+\infty[\).`, r`\(f'(x)=\frac{1}{2\sqrt{x}}\).`),
        ex('Tangente immédiate', r`utiliser \(y=f'(a)(x-a)+f(a)\)`, 'auto', r`Si \(f(2)=5\) et \(f'(2)=3\), donner l’équation de la tangente en \(2\).`, r`\(y=3(x-2)+5\).`),
        ex('Variation', r`lire le signe de \(f'\)`, 'auto', r`Si \(f'(x)<0\) sur \(I\), que fait \(f\) sur \(I\) ?`, r`La fonction \(f\) est décroissante sur \(I\).`),
      ],
      methodes: [
        ex('Nombre dérivé', 'calculer une limite simple', 'guide', r`Pour \(f(x)=x^2\), calculer \(f'(3)\) avec le taux \(\frac{f(3+h)-f(3)}{h}\).`, r`Le taux vaut \(6+h\), donc la limite est \(6\).`),
        ex('Tangente', 'écrire une droite', 'guide', r`Pour \(f(x)=x^2-1\), écrire la tangente au point d’abscisse \(2\).`, r`\(f'(x)=2x\), donc \(f'(2)=4\) et \(f(2)=3\). Tangente : \(y=4(x-2)+3\).`),
        ex('Produit', 'dériver un produit', 'guide', r`Dériver \(f(x)=(x^2+1)(3x-2)\).`, r`\(f'(x)=2x(3x-2)+3(x^2+1)\).`),
        ex('Quotient', 'dériver un quotient', 'guide', r`Dériver \(f(x)=\frac{x+1}{x-2}\) sur \(]2;+\infty[\).`, r`\(f'(x)=\frac{(x-2)-(x+1)}{(x-2)^2}=\frac{-3}{(x-2)^2}\).`),
        ex('Variation trinôme', 'signe de la dérivée', 'guide', r`Étudier les variations de \(f(x)=x^2-4x+1\).`, r`\(f'(x)=2x-4\). \(f\) décroît sur \(]-\infty;2]\), puis croît sur \([2;+\infty[\).`),
        ex('Extremum', 'changer de signe', 'guide', r`Pour \(f'(x)=(x-1)(x+3)\), donner les intervalles de variation de \(f\).`, r`\(f'\) est positif sur \(]-\infty;-3]\cup[1;+\infty[\), négatif sur \([-3;1]\). Donc \(f\) croît, décroît, croît.`),
        ex('Dérivée composée simple', 'dériver \(u(ax+b)\)', 'guide', r`Dériver \(f(x)=(2x-5)^3\).`, r`\(f'(x)=6(2x-5)^2\).`),
        ex('Rédaction notée', 'étude complète', 'guide', r`Rédiger l’étude de variations de \(f(x)=-x^2+6x-4\).`, r`\(f\) croît jusqu’à \(3\), puis décroît. Maximum \(5\).`, '', r`<p>\(f'(x)=-2x+6\). On résout \(f'(x)=0\), donc \(x=3\).</p><p>Comme \(f'(x)>0\) pour \(x<3\) et \(f'(x)<0\) pour \(x>3\), \(f\) est croissante sur \(]-\infty;3]\), puis décroissante sur \([3;+\infty[\).</p><p>\(f(3)=-9+18-4=5\). Le maximum vaut \(5\), atteint en \(x=3\).</p><p>Erreur qui coûte des points : annoncer un maximum sans tableau de signe de \(f'\).</p>`),
      ],
      pieges: [
        ex('Produit faux', 'ne pas multiplier les dérivées', 'trap', r`Corriger : \(((x^2)(x+1))'=2x\times1\).`, r`Il faut \(2x(x+1)+x^2\).`),
        ex('Tangente incomplète', 'ne pas oublier le point', 'trap', r`Pourquoi \(y=f'(a)x+f(a)\) n’est pas la formule générale de la tangente ?`, r`Parce que la tangente doit passer par \((a;f(a))\). La formule sûre est \(y=f'(a)(x-a)+f(a)\).`),
        ex('Dérivée nulle', 'ne pas conclure trop vite', 'trap', r`Si \(f'(2)=0\), a-t-on forcément un maximum ou un minimum en \(2\) ?`, r`Non. Il faut regarder le changement de signe de \(f'\).`),
        ex('Intervalle', 'respecter le domaine', 'trap', r`Peut-on dériver \(f(x)=\sqrt{x}\) en \(0\) avec la formule \(\frac{1}{2\sqrt{x}}\) ?`, r`Non, cette formule vaut sur \(]0;+\infty[\).`),
        ex('Quotient', 'garder le bon ordre', 'trap', r`Dans \(\left(\frac{u}{v}\right)'\), quel est le numérateur ?`, r`\(u'v-uv'\). L’ordre compte.`),
        ex('Lecture graphique', r`distinguer \(f\) et \(f'\)`, 'trap', r`Si la courbe de \(f\) monte, quel est le signe de \(f'\) ?`, r`\(f'\) est positif, mais \(f\) elle-même peut être positive ou négative.`),
      ],
      choix: [
        ex('Choix 1', 'tangente ou variation', 'choice', r`L’énoncé demande une équation de tangente. Quels deux nombres faut-il chercher ?`, r`\(f(a)\) et \(f'(a)\).`),
        ex('Choix 2', 'étude de variation', 'choice', r`L’énoncé demande les variations d’une fonction polynôme. Quelle méthode démarre ?`, r`Calculer \(f'\), étudier son signe, puis conclure sur \(f\).`),
        ex('Choix 3', 'produit ou développement', 'choice', r`Pour dériver \((x+1)(x-4)\), développer ou utiliser la formule du produit ?`, r`Les deux marchent. Développer donne \(x^2-3x-4\), donc dérivée \(2x-3\), plus rapide ici.`),
        ex('Choix 4', 'quotient', 'choice', r`Pour \(f(x)=\frac{x^2+1}{x}\), quelle formule est naturelle ?`, r`Le quotient, ou simplifier en \(x+\frac1x\). La simplification est plus courte.`),
        ex('Choix 5', 'extremum', 'choice', r`Pour prouver un maximum, suffit-il de résoudre \(f'(x)=0\) ?`, r`Non, il faut montrer le changement de signe de \(f'\) ou utiliser une forme adaptée.`),
      ],
      controle: [
        ex('Contrôle 1', 'dérivée polynomiale', 'control', r`Dériver \(f(x)=5x^3-2x^2+7x-1\).`, r`\(f'(x)=15x^2-4x+7\).`),
        ex('Contrôle 2', 'tangente', 'control', r`Pour \(f(x)=x^3\), donner la tangente en \(a=1\).`, r`\(f(1)=1\), \(f'(1)=3\). Tangente : \(y=3(x-1)+1\).`),
        ex('Contrôle 3', 'variation', 'control', r`Étudier les variations de \(f(x)=2x^2+8x+1\).`, r`\(f'(x)=4x+8\), nul en \(-2\). \(f\) décroît puis croît, minimum \(f(-2)=-7\).`),
        ex('Contrôle 4', 'quotient', 'control', r`Dériver \(f(x)=\frac{2x-1}{x+3}\).`, r`\(f'(x)=\frac{2(x+3)-(2x-1)}{(x+3)^2}=\frac{7}{(x+3)^2}\).`),
        ex('Contrôle 5', 'signe de dérivée', 'control', r`Si \(f'(x)=-3(x-2)(x+1)\), donner les variations de \(f\).`, r`\(f'\) est négatif sur \(]-\infty;-1]\), positif sur \([-1;2]\), négatif sur \([2;+\infty[\). Donc \(f\) décroît, croît, décroît.`),
        ex('Contrôle 6', 'valeur de pente', 'control', r`Pour \(f(x)=\frac1x\), donner la pente de la tangente au point d’abscisse \(2\).`, r`\(f'(2)=-\frac{1}{4}\).`),
      ],
      vingt: [
        ex('20/20 1', 'paramètre de tangente', 'twenty', r`Déterminer \(m\) pour que la tangente à \(f(x)=x^2+mx\) en \(1\) ait pour pente \(5\).`, r`\(f'(x)=2x+m\), donc \(f'(1)=2+m=5\). Ainsi \(m=3\).`),
        ex('20/20 2', 'variation rationnelle', 'twenty', r`Étudier le signe de la dérivée de \(f(x)=x+\frac{4}{x}\) sur \(]0;+\infty[\).`, r`\(f'(x)=1-\frac{4}{x^2}=\frac{x^2-4}{x^2}\). Sur \(]0;+\infty[\), \(f'\) est négatif sur \(]0;2[\), nul en \(2\), positif sur \(]2;+\infty[\).`),
        ex('20/20 3', 'optimisation', 'twenty', r`Un rectangle a une aire \(A(x)=x(12-x)\). Utiliser la dérivée pour trouver l’aire maximale.`, r`\(A'(x)=12-2x\), nul en \(6\). L’aire maximale vaut \(36\).`),
      ],
      revision: [
        ex('Révision second degré', 'signe de dérivée', 'revision', r`Pour \(f'(x)=x^2-5x+6\), donner où \(f\) est croissante.`, r`\(f'\ge0\) sur \(]-\infty;2]\cup[3;+\infty[\). Donc \(f\) y est croissante.`),
        ex('Révision exponentielle', 'préparer \(e^x\)', 'revision', r`Si une fonction vérifie \(f'=f\) et \(f(0)=1\), quel nom portera-t-elle dans le chapitre suivant ?`, r`La fonction exponentielle.`),
      ],
    },
  },
  {
    slug: 'probabilites-conditionnelles',
    index: '05',
    title: 'Probabilités conditionnelles',
    lead: '40 exercices pour traduire “sachant que”, poser un arbre, utiliser les probabilités totales et inverser une condition.',
    flow: ['Événements', 'Arbre', 'Totales', 'Inverse'],
    sources: [
      'Maths91, cours et exercices Probabilités',
      'MathGM, parcours Probabilités conditionnelles',
      'Annales2Maths, cours Probabilités conditionnelles',
    ],
    coverage: [
      'conditionnement \(P_A(B)\)',
      'intersection et arbre pondéré',
      'formule des probabilités totales',
      'indépendance',
      'conditionnelle inverse de type Bayes',
    ],
    traps: [
      'confondre \(P(A\cap B)\) et \(P_A(B)\)',
      'oublier la branche complémentaire',
      'inverser une probabilité conditionnelle sans recalcul',
      'arrondir trop tôt',
    ],
    exercises: {
      automatismes: [
        ex('Notation', 'lire \(P_A(B)\)', 'auto', r`Traduire \(P_A(B)\) en phrase.`, r`C’est la probabilité de \(B\) sachant que \(A\) est réalisé.`),
        ex('Formule', 'calculer une conditionnelle', 'auto', r`Si \(P(A\cap B)=0{,}18\) et \(P(A)=0{,}30\), calculer \(P_A(B)\).`, r`\(P_A(B)=\frac{0{,}18}{0{,}30}=0{,}6\).`),
        ex('Intersection', 'produit sur une branche', 'auto', r`Si \(P(A)=0{,}4\) et \(P_A(B)=0{,}7\), calculer \(P(A\cap B)\).`, r`\(0{,}4\times0{,}7=0{,}28\).`),
        ex('Complément', 'probabilité complémentaire', 'auto', r`Si \(P(A)=0{,}35\), calculer \(P(\overline A)\).`, r`\(0{,}65\).`),
        ex('Branche complémentaire', 'compléter un arbre', 'auto', r`Si \(P_A(B)=0{,}22\), calculer \(P_A(\overline B)\).`, r`\(0{,}78\).`),
        ex('Totales', 'additionner deux chemins', 'auto', r`Si \(P(A\cap B)=0{,}12\) et \(P(\overline A\cap B)=0{,}28\), calculer \(P(B)\).`, r`\(P(B)=0{,}40\).`),
        ex('Indépendance', 'test simple', 'auto', r`Si \(P(A)=0{,}5\), \(P(B)=0{,}2\), \(P(A\cap B)=0{,}1\), les événements sont-ils indépendants ?`, r`Oui, car \(0{,}5\times0{,}2=0{,}1\).`),
        ex('Pourcentage', 'convertir', 'auto', r`Écrire \(12\%\) sous forme décimale.`, r`\(0{,}12\).`),
        ex('Inverse', 'ne pas confondre', 'auto', r`Si \(P_A(B)=0{,}8\), peut-on conclure que \(P_B(A)=0{,}8\) ?`, r`Non. Il faut recalculer avec \(P(A\cap B)\) et \(P(B)\).`),
        ex('Univers restreint', 'sens du conditionnement', 'auto', r`Dans “parmi les élèves internes, 30 % font option maths”, quel est l’événement conditionnant ?`, r`L’événement “être interne”.`),
      ],
      methodes: [
        ex('Arbre direct', 'calculer une intersection', 'guide', r`Dans une classe, \(40\%\) sont demi-pensionnaires. Parmi eux, \(25\%\) prennent le bus. Calculer la probabilité d’être demi-pensionnaire et de prendre le bus.`, r`\(0{,}40\times0{,}25=0{,}10\).`),
        ex('Probabilités totales', 'additionner les chemins', 'guide', r`\(P(A)=0{,}3\), \(P_A(B)=0{,}6\), \(P_{\overline A}(B)=0{,}2\). Calculer \(P(B)\).`, r`\(P(B)=0{,}3\times0{,}6+0{,}7\times0{,}2=0{,}32\).`),
        ex('Conditionnelle inverse', 'recalculer le dénominateur', 'guide', r`Avec les données précédentes, calculer \(P_B(A)\).`, r`\(P(A\cap B)=0{,}18\), \(P(B)=0{,}32\). Donc \(P_B(A)=\frac{0{,}18}{0{,}32}=0{,}5625\).`),
        ex('Tableau', 'passer du tableau à la formule', 'guide', r`Sur 200 élèves, 80 font latin, 50 font théâtre, 20 font les deux. Calculer \(P_{\text{latin}}(\text{théâtre})\).`, r`\(\frac{20}{80}=0{,}25\).`),
        ex('Indépendance', 'comparer \(P_A(B)\) et \(P(B)\)', 'guide', r`Si \(P(B)=0{,}4\) et \(P_A(B)=0{,}4\), que peut-on dire si \(P(A)>0\) ?`, r`\(A\) et \(B\) sont indépendants.`),
        ex('Complément dans l’arbre', 'calculer une branche manquante', 'guide', r`\(P(A)=0{,}55\), \(P_A(B)=0{,}8\), \(P_{\overline A}(\overline B)=0{,}3\). Calculer \(P(B)\).`, r`\(P_{\overline A}(B)=0{,}7\). Donc \(P(B)=0{,}55\times0{,}8+0{,}45\times0{,}7=0{,}755\).`),
        ex('Lecture phrase', 'nommer les événements', 'guide', r`Dans “un test est positif chez 98 % des malades et 4 % des non-malades”, nommer \(M\), \(T\), puis écrire deux probabilités.`, r`\(M\) : malade, \(T\) : test positif. On lit \(P_M(T)=0{,}98\) et \(P_{\overline M}(T)=0{,}04\).`),
        ex('Rédaction notée', 'rédiger une inverse', 'guide', r`Une maladie touche \(2\%\) d’une population. Le test est positif chez \(95\%\) des malades et \(3\%\) des non-malades. Rédiger le calcul de la probabilité d’être malade sachant que le test est positif.`, r`Environ \(0{,}392\).`, '', r`<p>On note \(M\) “être malade” et \(T\) “test positif”.</p><p>\(P(M\cap T)=0{,}02\times0{,}95=0{,}019\).</p><p>\(P(T)=0{,}02\times0{,}95+0{,}98\times0{,}03=0{,}0484\).</p><p>Donc \(P_T(M)=\frac{0{,}019}{0{,}0484}\approx0{,}392\).</p><p>Erreur qui coûte des points : répondre \(95\%\), qui est \(P_M(T)\), pas \(P_T(M)\).</p>`),
      ],
      pieges: [
        ex('Intersection ou conditionnelle', 'distinguer les notations', 'trap', r`Si \(P(A)=0{,}2\) et \(P_A(B)=0{,}5\), un élève répond \(P(A\cap B)=0{,}5\). Corriger.`, r`\(P(A\cap B)=0{,}2\times0{,}5=0{,}1\).`),
        ex('Complément conditionnel', 'compléter dans le bon univers', 'trap', r`Si \(P_A(B)=0{,}7\), que vaut \(P_{\overline A}(B)\) ?`, r`On ne peut pas savoir. Le complément est \(P_A(\overline B)=0{,}3\).`),
        ex('Arrondi', 'conserver les valeurs', 'trap', r`Pourquoi éviter d’arrondir \(0{,}0484\) en \(0{,}05\) avant une division ?`, r`Parce que cela change sensiblement la conditionnelle finale.`),
        ex('Indépendance', 'ne pas confondre incompatibilité', 'trap', r`Deux événements incompatibles non impossibles sont-ils indépendants ?`, r`Non. Si \(A\cap B=\varnothing\), alors \(P(A\cap B)=0\), alors que \(P(A)P(B)>0\).`),
        ex('Pourcentage conditionnel', 'identifier la base', 'trap', r`“30 % des filles pratiquent le volley” signifie \(P_F(V)\) ou \(P_V(F)\) ?`, r`Cela signifie \(P_F(V)\).`),
        ex('Total', 'ne pas oublier toutes les branches', 'trap', r`Pour calculer \(P(B)\) avec une partition \(A,\overline A\), combien de chemins faut-il additionner ?`, r`Deux chemins : \(A\cap B\) et \(\overline A\cap B\).`),
      ],
      choix: [
        ex('Choix 1', 'arbre ou formule', 'choice', r`Si l’énoncé donne des “parmi ceux qui”, quel outil est le plus lisible ?`, r`Un arbre pondéré, car chaque “parmi” devient une branche conditionnelle.`),
        ex('Choix 2', 'tableau', 'choice', r`Si l’énoncé donne des effectifs dans deux catégories croisées, quel support choisir ?`, r`Un tableau de contingence.`),
        ex('Choix 3', 'inverse', 'choice', r`Quand l’énoncé demande “sachant que le test est positif”, quelle probabilité doit être au dénominateur ?`, r`La probabilité de l’événement conditionnant : \(P(T)\).`),
        ex('Choix 4', 'indépendance', 'choice', r`Pour prouver l’indépendance, compares-tu \(P_A(B)\) à quoi ?`, r`À \(P(B)\), ou bien \(P(A\cap B)\) à \(P(A)P(B)\).`),
        ex('Choix 5', 'complément', 'choice', r`Pour calculer “au moins un”, quel événement complémentaire est souvent plus simple ?`, r`“Aucun”. On calcule \(1-P(\text{aucun})\).`),
      ],
      controle: [
        ex('Contrôle 1', 'conditionnelle', 'control', r`\(P(A)=0{,}6\), \(P(A\cap B)=0{,}18\). Calculer \(P_A(B)\).`, r`\(0{,}18/0{,}6=0{,}3\).`),
        ex('Contrôle 2', 'intersection', 'control', r`\(P(A)=0{,}45\), \(P_A(B)=0{,}2\). Calculer \(P(A\cap B)\).`, r`\(0{,}09\).`),
        ex('Contrôle 3', 'totales', 'control', r`\(P(A)=0{,}25\), \(P_A(B)=0{,}8\), \(P_{\overline A}(B)=0{,}4\). Calculer \(P(B)\).`, r`\(0{,}25\times0{,}8+0{,}75\times0{,}4=0{,}5\).`),
        ex('Contrôle 4', 'inverse', 'control', r`Avec les données du contrôle 3, calculer \(P_B(A)\).`, r`\(P(A\cap B)=0{,}2\), \(P(B)=0{,}5\), donc \(P_B(A)=0{,}4\).`),
        ex('Contrôle 5', 'indépendance', 'control', r`\(P(A)=0{,}3\), \(P(B)=0{,}7\), \(P(A\cap B)=0{,}21\). Les événements sont-ils indépendants ?`, r`Oui, car \(0{,}3\times0{,}7=0{,}21\).`),
        ex('Contrôle 6', 'complément', 'control', r`Dans un arbre, \(P(A)=0{,}4\), \(P_A(\overline B)=0{,}1\), \(P_{\overline A}(B)=0{,}5\). Calculer \(P(\overline B)\).`, r`\(P_A(B)=0{,}9\), donc \(P(B)=0{,}4\times0{,}9+0{,}6\times0{,}5=0{,}66\). Ainsi \(P(\overline B)=0{,}34\).`),
      ],
      vingt: [
        ex('20/20 1', 'test médical', 'twenty', r`Une maladie touche \(1\%\). Test positif chez \(99\%\) des malades et \(2\%\) des non-malades. Calculer \(P_T(M)\).`, r`\(P(M\cap T)=0{,}0099\), \(P(T)=0{,}0099+0{,}99\times0{,}02=0{,}0297\). Donc \(P_T(M)=\frac13\).`),
        ex('20/20 2', 'équation de probabilité', 'twenty', r`On a \(P(A)=0{,}4\), \(P_A(B)=0{,}5\), \(P(B)=0{,}32\). Trouver \(P_{\overline A}(B)\).`, r`\(0{,}32=0{,}4\times0{,}5+0{,}6x\), donc \(x=0{,}2\).`),
        ex('20/20 3', 'indépendance paramétrée', 'twenty', r`\(P(A)=0{,}6\), \(P_B(A)=0{,}75\), \(P(B)=p\). Trouver \(p\) pour que \(P(A\cap B)=0{,}3\).`, r`Il faut \(P_B(A)=\frac{P(A\cap B)}{P(B)}\), donc \(0{,}75=\frac{0{,}3}{p}\) et \(p=0{,}4\).`),
      ],
      revision: [
        ex('Révision variables aléatoires', 'espérance de gain', 'revision', r`Un gain vaut \(10\) euros avec probabilité \(0{,}3\), sinon \(0\). Quelle est l’espérance ?`, r`\(10\times0{,}3+0\times0{,}7=3\) euros.`),
        ex('Révision suites', 'probabilité récurrente', 'revision', r`Si une probabilité suit \(p_{n+1}=0{,}8p_n+0{,}1\), calculer \(p_1\) pour \(p_0=0{,}5\).`, r`\(p_1=0{,}8\times0{,}5+0{,}1=0{,}5\).`),
      ],
    },
  },
  {
    slug: 'fonctions-trigonometriques',
    index: '06',
    title: 'Fonctions trigonométriques',
    lead: '40 exercices pour lire sinus et cosinus comme des fonctions : parité, période, variations, équations et courbes.',
    flow: ['Définir', 'Réduire', 'Varier', 'Résoudre'],
    sources: [
      'Maths91, cours et exercices Fonctions trigonométriques',
      'Jean-Yves Baudot, parité et périodicité',
      'Annales2Maths, fonctions trigonométriques',
    ],
    coverage: [
      'fonctions \(x\mapsto \cos x\) et \(x\mapsto \sin x\)',
      'parité et périodicité',
      'variations sur des intervalles de référence',
      'lecture de courbes déterministes dans le cours',
      'équations \(\cos x=r\) et \(\sin x=r\)',
    ],
    traps: [
      'confondre valeur d’angle et valeur de fonction',
      'oublier la période \(2\pi\)',
      'mal utiliser la parité de sinus',
      'résoudre une équation hors de l’intervalle demandé',
    ],
    exercises: {
      automatismes: [
        ex('Image cosinus', 'évaluer une fonction', 'auto', r`Calculer \(f(\pi)\) pour \(f(x)=\cos x\).`, r`\(f(\pi)=-1\).`),
        ex('Image sinus', 'évaluer une fonction', 'auto', r`Calculer \(g(\frac{\pi}{2})\) pour \(g(x)=\sin x\).`, r`\(g(\frac{\pi}{2})=1\).`),
        ex('Parité cosinus', 'connaître la parité', 'auto', r`La fonction cosinus est-elle paire ou impaire ?`, r`Elle est paire : \(\cos(-x)=\cos x\).`),
        ex('Parité sinus', 'connaître la parité', 'auto', r`La fonction sinus est-elle paire ou impaire ?`, r`Elle est impaire : \(\sin(-x)=-\sin x\).`),
        ex('Période', 'connaître la période', 'auto', r`Quelle est la période de \(\sin\) et \(\cos\) ?`, r`La période est \(2\pi\).`),
        ex('Bornes', 'connaître l’encadrement', 'auto', r`Pour tout réel \(x\), encadrer \(\cos x\).`, r`\(-1\le\cos x\le1\).`),
        ex('Valeur périodique', 'utiliser la période', 'auto', r`Calculer \(\cos(\frac{\pi}{3}+2\pi)\).`, r`C’est \(\cos(\frac{\pi}{3})=\frac12\).`),
        ex('Sinus négatif', 'utiliser l’imparité', 'auto', r`Calculer \(\sin(-\frac{\pi}{6})\).`, r`\(-\frac12\).`),
        ex('Variation cosinus', 'intervalle de référence', 'auto', r`Sur \([0;\pi]\), la fonction cosinus est-elle croissante ou décroissante ?`, r`Elle est décroissante.`),
        ex('Variation sinus', 'intervalle de référence', 'auto', r`Sur \([-\frac{\pi}{2};\frac{\pi}{2}]\), la fonction sinus est-elle croissante ou décroissante ?`, r`Elle est croissante.`),
      ],
      methodes: [
        ex('Réduire une image', 'périodicité', 'guide', r`Calculer \(\sin(\frac{13\pi}{6})\).`, r`\(\frac{13\pi}{6}=2\pi+\frac{\pi}{6}\), donc la valeur est \(\frac12\).`),
        ex('Parité puis valeur', 'combiner deux propriétés', 'guide', r`Calculer \(\cos(-\frac{5\pi}{3})\).`, r`\(\cos(-\frac{5\pi}{3})=\cos(\frac{5\pi}{3})=\frac12\).`),
        ex('Équation cosinus', 'résoudre sur un intervalle', 'guide', r`Résoudre \(\cos x=0\) sur \([-\pi;\pi]\).`, r`\(x=-\frac{\pi}{2}\) ou \(x=\frac{\pi}{2}\).`),
        ex('Équation sinus', 'résoudre sur un intervalle', 'guide', r`Résoudre \(\sin x=1\) sur \([0;2\pi[\).`, r`\(x=\frac{\pi}{2}\).`),
        ex('Comparer deux images', 'utiliser variation', 'guide', r`Sans calculatrice, comparer \(\cos(\frac{\pi}{5})\) et \(\cos(\frac{\pi}{4})\).`, r`Sur \([0;\pi]\), \(\cos\) décroît. Comme \(\frac{\pi}{5}<\frac{\pi}{4}\), on a \(\cos(\frac{\pi}{5})>\cos(\frac{\pi}{4})\).`),
        ex('Signe', 'lire sur le cercle', 'guide', r`Donner le signe de \(\sin x\) sur \([-\pi;0]\).`, r`\(\sin x\le0\) sur \([-\pi;0]\).`),
        ex('Période modifiée', 'fonction composée simple', 'guide', r`Quelle est la période de \(x\mapsto\cos(2x)\) ?`, r`La période est \(\pi\), car \(2(x+\pi)=2x+2\pi\).`),
        ex('Rédaction notée', 'résoudre avec intervalle', 'guide', r`Rédiger la résolution de \(\cos x=-\frac12\) sur \([-\pi;\pi]\).`, r`\(x=-\frac{2\pi}{3}\) ou \(x=\frac{2\pi}{3}\).`, '', r`<p>On cherche les angles de l’intervalle \([-\pi;\pi]\) dont le cosinus vaut \(-\frac12\).</p><p>Sur un tour, les angles de référence sont \(\frac{2\pi}{3}\) et \(\frac{4\pi}{3}\). Dans l’intervalle demandé, \(\frac{4\pi}{3}\) est remplacé par \(-\frac{2\pi}{3}\).</p><p>Donc \(S=\left\{-\frac{2\pi}{3};\frac{2\pi}{3}\right\}\).</p><p>Erreur qui coûte des points : donner une solution hors de l’intervalle demandé.</p>`),
      ],
      pieges: [
        ex('Parité inversée', 'ne pas confondre sin et cos', 'trap', r`Corriger : \(\sin(-x)=\sin x\).`, r`Faux. \(\sin(-x)=-\sin x\).`),
        ex('Période oubliée', 'familles de solutions', 'trap', r`Dans \(\mathbb{R}\), résoudre \(\cos x=1\).`, r`\(x=2k\pi\), avec \(k\in\mathbb{Z}\).`),
        ex('Amplitude', 'valeur impossible', 'trap', r`L’équation \(\sin x=1{,}4\) a-t-elle une solution ?`, r`Non, car \(\sin x\in[-1;1]\).`),
        ex('Variation locale', 'ne pas généraliser', 'trap', r`La fonction cosinus est-elle décroissante sur tout \(\mathbb{R}\) ?`, r`Non. Elle est périodique ; ses variations changent selon les intervalles.`),
        ex('Intervalle', 'borne exclue', 'trap', r`Résoudre \(\sin x=0\) sur \([0;2\pi[\).`, r`\(x=0\) ou \(x=\pi\). \(2\pi\) est exclu.`),
        ex('Signe de cos', 'quadrant', 'trap', r`Donner le signe de \(\cos x\) sur \(]\frac{\pi}{2};\frac{3\pi}{2}[\).`, r`\(\cos x<0\) sur cet intervalle.`),
      ],
      choix: [
        ex('Choix 1', 'périodicité', 'choice', r`Pour calculer \(\sin(\frac{25\pi}{6})\), que faire avant de lire la valeur ?`, r`Réduire modulo \(2\pi\).`),
        ex('Choix 2', 'parité', 'choice', r`Pour calculer \(\cos(-a)\), quelle propriété utiliser ?`, r`La parité du cosinus : \(\cos(-a)=\cos a\).`),
        ex('Choix 3', 'variation', 'choice', r`Pour comparer deux cosinus d’angles dans \([0;\pi]\), quelle idée utiliser ?`, r`La décroissance de \(\cos\) sur \([0;\pi]\).`),
        ex('Choix 4', 'équation', 'choice', r`Pour résoudre \(\sin x=r\), quel support mental est le plus sûr ?`, r`Le cercle trigonométrique et l’intervalle demandé.`),
        ex('Choix 5', 'fonction composée', 'choice', r`Pour trouver la période de \(\sin(3x)\), que comparer ?`, r`On cherche \(T\) tel que \(3(x+T)=3x+2\pi\), donc \(T=\frac{2\pi}{3}\).`),
      ],
      controle: [
        ex('Contrôle 1', 'image', 'control', r`Calculer \(\cos(-\frac{2\pi}{3})\).`, r`\(-\frac12\).`),
        ex('Contrôle 2', 'image', 'control', r`Calculer \(\sin(\frac{7\pi}{6})\).`, r`\(-\frac12\).`),
        ex('Contrôle 3', 'équation', 'control', r`Résoudre \(\sin x=-1\) sur \([0;2\pi[\).`, r`\(x=\frac{3\pi}{2}\).`),
        ex('Contrôle 4', 'équation', 'control', r`Résoudre \(\cos x=\frac{\sqrt2}{2}\) sur \([-\pi;\pi]\).`, r`\(x=-\frac{\pi}{4}\) ou \(x=\frac{\pi}{4}\).`),
        ex('Contrôle 5', 'période', 'control', r`Donner une période de \(x\mapsto\sin(4x)\).`, r`\(\frac{\pi}{2}\).`),
        ex('Contrôle 6', 'variation', 'control', r`Comparer \(\sin(\frac{\pi}{6})\) et \(\sin(\frac{\pi}{3})\).`, r`Sur \([-\frac{\pi}{2};\frac{\pi}{2}]\), \(\sin\) croît, donc \(\sin(\frac{\pi}{6})<\sin(\frac{\pi}{3})\).`),
      ],
      vingt: [
        ex('20/20 1', 'équation transformée', 'twenty', r`Résoudre \(2\cos x+1=0\) sur \([0;2\pi[\).`, r`\(\cos x=-\frac12\), donc \(x=\frac{2\pi}{3}\) ou \(x=\frac{4\pi}{3}\).`),
        ex('20/20 2', 'période et équation', 'twenty', r`Résoudre \(\sin(2x)=0\) sur \([0;2\pi[\).`, r`\(2x=k\pi\), donc \(x=\frac{k\pi}{2}\). Dans l’intervalle : \(0,\frac{\pi}{2},\pi,\frac{3\pi}{2}\).`),
        ex('20/20 3', 'variation composée', 'twenty', r`Sur \([0;\frac{\pi}{2}]\), comparer \(\cos(2x)\) au début et à la fin de l’intervalle.`, r`Quand \(x\) va de \(0\) à \(\frac{\pi}{2}\), \(2x\) va de \(0\) à \(\pi\). \(\cos(2x)\) décroît de \(1\) à \(-1\).`),
      ],
      revision: [
        ex('Révision dérivation', 'dériver sin/cos plus tard', 'revision', r`Si \(f(x)=\cos x\), quelle variation observes-tu sur \([0;\pi]\) ?`, r`Elle décroît, ce qui correspondra plus tard à une dérivée négative sur cet intervalle.`),
        ex('Révision trigonométrie', 'valeurs remarquables', 'revision', r`Donner les deux angles de \([0;2\pi[\) dont le sinus vaut \(\frac{\sqrt3}{2}\).`, r`\(\frac{\pi}{3}\) et \(\frac{2\pi}{3}\).`),
      ],
    },
  },
  {
    slug: 'suites',
    index: '07',
    title: 'Suites',
    lead: '40 exercices pour distinguer explicite et récurrence, étudier les variations, reconnaître les suites arithmétiques et géométriques.',
    flow: ['Définir', 'Calculer', 'Reconnaître', 'Modéliser'],
    sources: [
      'Maths91, cours et exercices Suites',
      'Maths-et-tiques, généralités et suites arithmétiques/géométriques',
      'MathOutils, exercices corrigés Suites',
      'XyMaths, cours Suites',
    ],
    coverage: [
      'définition explicite et par récurrence',
      'calcul de termes',
      'variations par \(u_{n+1}-u_n\) ou quotient',
      'suites arithmétiques et géométriques',
      'modélisation et algorithmes simples',
    ],
    traps: [
      'confondre \(u_n\) et \(u_{n+1}\)',
      'oublier le rang initial',
      'tester seulement deux termes pour conclure',
      'confondre raison arithmétique et raison géométrique',
    ],
    exercises: {
      automatismes: [
        ex('Terme explicite', 'calculer \(u_n\)', 'auto', r`Si \(u_n=2n+3\), calculer \(u_0\), \(u_1\), \(u_5\).`, r`\(u_0=3\), \(u_1=5\), \(u_5=13\).`),
        ex('Récurrence', 'calculer les premiers termes', 'auto', r`\(u_0=4\), \(u_{n+1}=u_n+7\). Calculer \(u_1\), \(u_2\).`, r`\(u_1=11\), \(u_2=18\).`),
        ex('Arithmétique', 'reconnaître une addition constante', 'auto', r`La suite \(5,8,11,14,\ldots\) est-elle arithmétique ?`, r`Oui, de raison \(3\).`),
        ex('Géométrique', 'reconnaître une multiplication constante', 'auto', r`La suite \(3,6,12,24,\ldots\) est-elle géométrique ?`, r`Oui, de raison \(2\).`),
        ex('Formule arithmétique', 'utiliser \(u_n=u_0+nr\)', 'auto', r`Suite arithmétique de premier terme \(u_0=10\), raison \(-2\). Calculer \(u_6\).`, r`\(u_6=10+6(-2)=-2\).`),
        ex('Formule géométrique', 'utiliser \(u_n=u_0q^n\)', 'auto', r`Suite géométrique de premier terme \(u_0=5\), raison \(3\). Calculer \(u_3\).`, r`\(u_3=5\times3^3=135\).`),
        ex('Variation', 'différence positive', 'auto', r`Si \(u_{n+1}-u_n=4\) pour tout \(n\), la suite est-elle croissante ?`, r`Oui, strictement croissante.`),
        ex('Rang initial', 'ne pas décaler', 'auto', r`Si \(u_1=7\) et \(u_{n+1}=u_n+2\), calculer \(u_3\).`, r`\(u_2=9\), \(u_3=11\).`),
        ex('Somme simple', 'additionner des termes', 'auto', r`Calculer \(1+2+3+4+5\).`, r`\(15\).`),
        ex('Limite intuitive', 'comportement', 'auto', r`La suite \(u_n=\frac{1}{n+1}\) semble-t-elle se rapprocher de \(0\) ?`, r`Oui, les termes deviennent de plus en plus petits et positifs.`),
      ],
      methodes: [
        ex('Explicite ou récurrente', 'identifier le mode', 'guide', r`La formule \(u_n=3n^2-1\) est-elle explicite ou récurrente ?`, r`Elle est explicite : elle donne \(u_n\) directement en fonction de \(n\).`),
        ex('Variation par différence', 'calculer \(u_{n+1}-u_n\)', 'guide', r`Étudier les variations de \(u_n=n^2-4n\).`, r`\(u_{n+1}-u_n=2n-3\). La suite décroît jusqu’à \(n=1\), puis croît à partir de \(n=2\).`),
        ex('Reconnaître arithmétique', 'tester la différence', 'guide', r`Montrer que \(u_n=5-3n\) est arithmétique et donner sa raison.`, r`\(u_{n+1}-u_n=-3\), donc la raison est \(-3\).`),
        ex('Reconnaître géométrique', 'tester le quotient', 'guide', r`Montrer que \(u_n=7\times2^n\) est géométrique et donner sa raison.`, r`\(\frac{u_{n+1}}{u_n}=2\), donc la raison est \(2\).`),
        ex('Modèle arithmétique', 'traduire une évolution additive', 'guide', r`Une dette de \(1200\) euros baisse de \(75\) euros par mois. Écrire \(u_n\).`, r`\(u_n=1200-75n\) si \(u_0\) désigne la dette initiale.`),
        ex('Modèle géométrique', 'traduire un pourcentage', 'guide', r`Une population de \(800\) augmente de \(4\%\) par an. Écrire \(u_{n+1}\) en fonction de \(u_n\).`, r`\(u_{n+1}=1{,}04u_n\).`),
        ex('Seuil', 'chercher le premier rang', 'guide', r`Pour \(u_n=50+8n\), déterminer le premier \(n\) tel que \(u_n\ge100\).`, r`\(50+8n\ge100\), donc \(n\ge6{,}25\). Premier entier : \(n=7\).`),
        ex('Rédaction notée', 'prouver une suite géométrique auxiliaire', 'guide', r`On pose \(u_{n+1}=0{,}5u_n+3\) et \(v_n=u_n-6\). Montrer que \(v\) est géométrique.`, r`\(v_{n+1}=0{,}5v_n\).`, '', r`<p>On calcule \(v_{n+1}=u_{n+1}-6=0{,}5u_n+3-6=0{,}5u_n-3\).</p><p>Or \(u_n=v_n+6\), donc \(v_{n+1}=0{,}5(v_n+6)-3=0{,}5v_n\).</p><p>Ainsi \((v_n)\) est géométrique de raison \(0{,}5\).</p><p>Erreur qui coûte des points : remplacer \(u_n\) par \(v_n\) sans utiliser \(u_n=v_n+6\).</p>`),
      ],
      pieges: [
        ex('Deux termes insuffisants', 'ne pas conclure trop vite', 'trap', r`Pourquoi vérifier \(u_1-u_0=u_2-u_1\) ne suffit pas pour prouver qu’une suite est arithmétique ?`, r`Il faut montrer que la différence est constante pour tout \(n\).`),
        ex('Rang initial', 'ne pas décaler la formule', 'trap', r`Une suite géométrique a \(u_1=10\), raison \(2\). Que vaut \(u_4\) ?`, r`\(u_4=10\times2^3=80\), pas \(10\times2^4\).`),
        ex('Pourcentage', 'coefficient multiplicateur', 'trap', r`Une baisse de \(15\%\) correspond à multiplier par combien ?`, r`Par \(0{,}85\).`),
        ex('Signe du quotient', 'raison négative', 'trap', r`Une suite géométrique de raison \(-2\) est-elle forcément décroissante ?`, r`Non, les signes alternent.`),
        ex('Différence ou quotient', 'choisir le bon test', 'trap', r`Pour \(2,6,18,54\), la différence est-elle utile ?`, r`Non, il faut regarder le quotient : raison \(3\).`),
        ex('Terme ou rang', 'vocabulaire', 'trap', r`Dans \(u_5=17\), que vaut le rang et que vaut le terme ?`, r`Le rang est \(5\), le terme vaut \(17\).`),
      ],
      choix: [
        ex('Choix 1', 'explicite', 'choice', r`Pour calculer directement \(u_{50}\), quelle forme est la plus pratique ?`, r`Une formule explicite.`),
        ex('Choix 2', 'récurrence', 'choice', r`Pour modéliser “chaque mois on ajoute 12”, quelle forme naturelle ?`, r`Une relation de récurrence \(u_{n+1}=u_n+12\), ou une formule explicite si besoin.`),
        ex('Choix 3', 'arithmétique ou géométrique', 'choice', r`Si une quantité augmente de \(8\%\), quelle famille de suites apparaît ?`, r`Une suite géométrique.`),
        ex('Choix 4', 'variation', 'choice', r`Pour étudier les variations d’une suite explicite polynomiale, quel calcul faire ?`, r`Calculer \(u_{n+1}-u_n\).`),
        ex('Choix 5', 'seuil', 'choice', r`Pour trouver quand une suite dépasse une valeur, que cherche-t-on exactement ?`, r`Le premier rang entier qui vérifie l’inégalité.`),
      ],
      controle: [
        ex('Contrôle 1', 'termes', 'control', r`\(u_n=4n^2-1\). Calculer \(u_3\).`, r`\(u_3=36-1=35\).`),
        ex('Contrôle 2', 'arithmétique', 'control', r`Suite arithmétique \(u_0=-2\), \(r=5\). Calculer \(u_{10}\).`, r`\(u_{10}=-2+50=48\).`),
        ex('Contrôle 3', 'géométrique', 'control', r`Suite géométrique \(u_1=6\), \(q=3\). Calculer \(u_4\).`, r`\(u_4=6\times3^3=162\).`),
        ex('Contrôle 4', 'variation', 'control', r`Étudier les variations de \(u_n=7-2n\).`, r`\(u_{n+1}-u_n=-2\), donc la suite est strictement décroissante.`),
        ex('Contrôle 5', 'modèle', 'control', r`Un abonnement coûte \(40\) euros puis augmente de \(3\) euros par mois. Donner \(u_n\).`, r`\(u_n=40+3n\) si \(n=0\) est le premier mois.`),
        ex('Contrôle 6', 'seuil géométrique', 'control', r`Une quantité \(1000\) est multipliée par \(0{,}8\) chaque année. Calculer \(u_2\).`, r`\(u_2=1000\times0{,}8^2=640\).`),
      ],
      vingt: [
        ex('20/20 1', 'suite auxiliaire', 'twenty', r`\(u_{n+1}=0{,}75u_n+5\). Trouver le nombre \(L\) tel que \(u_{n+1}-L=0{,}75(u_n-L)\).`, r`Il faut \(L=0{,}75L+5\), donc \(0{,}25L=5\) et \(L=20\).`),
        ex('20/20 2', 'comparaison de modèles', 'twenty', r`Comparer au bout de 5 ans : \(u_n=100+12n\) et \(v_n=100\times1{,}1^n\).`, r`\(u_5=160\). \(v_5=100\times1{,}1^5\approx161{,}05\). Le modèle géométrique est légèrement plus grand.`),
        ex('20/20 3', 'seuil arithmético-géométrique', 'twenty', r`On admet \(u_n=20-15\times0{,}5^n\). Trouver le premier \(n\) tel que \(u_n>18\).`, r`Il faut \(15\times0{,}5^n<2\). On teste : \(n=2\), \(3{,}75\) ; \(n=3\), \(1{,}875\). Premier rang : \(3\).`),
      ],
      revision: [
        ex('Révision exponentielle', 'lien géométrique', 'revision', r`Pourquoi une suite géométrique positive ressemble-t-elle à une exponentielle discrète ?`, r`Parce qu’on multiplie par un même facteur à chaque pas, comme \(e^{ka}\) quand le pas est régulier.`),
        ex('Révision probabilités', 'arbre récurrent', 'revision', r`Si \(p_{n+1}=0{,}7p_n+0{,}2\) et \(p_0=0{,}4\), calculer \(p_1\).`, r`\(p_1=0{,}28+0{,}2=0{,}48\).`),
      ],
    },
  },
  {
    slug: 'exponentielle',
    index: '08',
    title: 'Exponentielle',
    lead: '40 exercices pour manipuler \(e^x\), ses propriétés, sa dérivée, ses variations et les modèles exponentiels.',
    flow: ['Définition', 'Propriétés', 'Dérivée', 'Modèles'],
    sources: [
      'Maths91, cours et exercices Fonction exponentielle',
      'Maths-et-tiques, Fonction exponentielle',
      'TableauxMaths, exercices corrigés exponentielle',
      'Lycée d’Adultes de Paris, cours exponentielle',
    ],
    coverage: [
      r`fonction exponentielle définie par \(f'=f\) et \(f(0)=1\)`,
      'relation fonctionnelle et règles de calcul',
      'dérivée de \(e^x\) et de \(e^{ax+b}\)',
      'signe, variations, équations et inéquations',
      'modèles de croissance et décroissance',
    ],
    traps: [
      'écrire \(e^{a+b}=e^a+e^b\)',
      'oublier que \(e^x>0\)',
      'résoudre \(e^u=e^v\) sans utiliser la stricte croissance',
      'utiliser le logarithme avant qu’il ne soit disponible en Première',
    ],
    exercises: {
      automatismes: [
        ex('Valeur en 0', 'connaître \(e^0\)', 'auto', r`Calculer \(e^0\).`, r`\(e^0=1\).`),
        ex('Produit', 'propriété algébrique', 'auto', r`Simplifier \(e^3\times e^5\).`, r`\(e^8\).`),
        ex('Quotient', 'propriété algébrique', 'auto', r`Simplifier \(\frac{e^7}{e^2}\).`, r`\(e^5\).`),
        ex('Puissance', 'propriété algébrique', 'auto', r`Simplifier \((e^4)^3\).`, r`\(e^{12}\).`),
        ex('Inverse', 'exposant négatif', 'auto', r`Écrire \(\frac1{e^x}\) sous forme exponentielle.`, r`\(e^{-x}\).`),
        ex('Signe', 'positivité', 'auto', r`Quel est le signe de \(e^x\) pour tout réel \(x\) ?`, r`\(e^x>0\).`),
        ex('Dérivée', 'dériver \(e^x\)', 'auto', r`Dériver \(f(x)=e^x\).`, r`\(f'(x)=e^x\).`),
        ex('Dérivée composée', 'dériver \(e^{ax+b}\)', 'auto', r`Dériver \(f(x)=e^{3x-1}\).`, r`\(f'(x)=3e^{3x-1}\).`),
        ex('Équation même base', 'injectivité', 'auto', r`Résoudre \(e^{2x}=e^6\).`, r`\(2x=6\), donc \(x=3\).`),
        ex('Variation', 'croissance', 'auto', r`La fonction exponentielle est-elle croissante ou décroissante sur \(\mathbb{R}\) ?`, r`Elle est strictement croissante.`),
      ],
      methodes: [
        ex('Simplification guidée', 'regrouper les exposants', 'guide', r`Simplifier \(e^{x+2}\times e^{3-x}\).`, r`\(e^{x+2+3-x}=e^5\).`),
        ex('Quotient guidé', 'soustraire les exposants', 'guide', r`Simplifier \(\frac{e^{2x+1}}{e^{x-4}}\).`, r`\(e^{x+5}\).`),
        ex('Équation', 'utiliser la croissance', 'guide', r`Résoudre \(e^{4x-1}=e^{2x+5}\).`, r`\(4x-1=2x+5\), donc \(x=3\).`),
        ex('Inéquation', 'conserver le sens', 'guide', r`Résoudre \(e^{3x+2}\le e^8\).`, r`Comme exp est croissante, \(3x+2\le8\), donc \(x\le2\).`),
        ex('Dérivée produit', 'dériver \(xe^x\)', 'guide', r`Dériver \(f(x)=xe^x\).`, r`\(f'(x)=e^x+xe^x=(x+1)e^x\).`),
        ex('Variation', 'signe avec \(e^x>0\)', 'guide', r`Étudier les variations de \(f(x)=(x-2)e^x\).`, r`\(f'(x)=e^x+(x-2)e^x=(x-1)e^x\). Comme \(e^x>0\), le signe vient de \(x-1\).`),
        ex('Modèle', 'coefficient multiplicateur', 'guide', r`Une quantité vaut \(500e^{0{,}03t}\). Calculer sa valeur à \(t=0\).`, r`Elle vaut \(500\).`),
        ex('Rédaction notée', 'variation exponentielle', 'guide', r`Rédiger l’étude de variations de \(f(x)=(2x+1)e^x\).`, r`\(f\) décroît jusqu’à \(-\frac32\), puis croît.`, '', r`<p>On dérive avec la formule du produit : \(f'(x)=2e^x+(2x+1)e^x=(2x+3)e^x\).</p><p>Comme \(e^x>0\) pour tout réel \(x\), le signe de \(f'(x)\) est celui de \(2x+3\).</p><p>Donc \(f\) est décroissante sur \(]-\infty;-\frac32]\), puis croissante sur \([-\frac32;+\infty[\).</p><p>Erreur qui coûte des points : étudier le signe de \(e^x\) comme s’il pouvait être négatif.</p>`),
      ],
      pieges: [
        ex('Somme fausse', 'propriété algébrique', 'trap', r`Corriger : \(e^{a+b}=e^a+e^b\).`, r`Faux. \(e^{a+b}=e^a\times e^b\).`),
        ex('Zéro impossible', 'positivité', 'trap', r`Résoudre \(e^x=0\).`, r`Aucune solution, car \(e^x>0\).`),
        ex('Inéquation négative', 'positivité', 'trap', r`Résoudre \(e^{2x+1}<0\).`, r`Aucune solution.`),
        ex('Dérivée composée', 'coefficient oublié', 'trap', r`Corriger : \((e^{5x})'=e^{5x}\).`, r`Il manque le coefficient \(5\). La dérivée est \(5e^{5x}\).`),
        ex('Quotient', 'soustraction des exposants', 'trap', r`Simplifier correctement \(\frac{e^{x}}{e^{-2x}}\).`, r`\(e^{x-(-2x)}=e^{3x}\).`),
        ex('Première sans ln', 'méthode attendue', 'trap', r`En Première, comment traite-t-on souvent \(e^x=4\) si \(\ln\) n’est pas encore introduit ?`, r`Par lecture graphique ou calculatrice. On ne force pas une notation non étudiée.`),
      ],
      choix: [
        ex('Choix 1', 'simplifier', 'choice', r`Devant \(e^{x+1}e^{2-x}\), quelle propriété déclencher ?`, r`Le produit : on additionne les exposants.`),
        ex('Choix 2', 'équation même base', 'choice', r`Devant \(e^{u(x)}=e^{v(x)}\), quelle idée utiliser ?`, r`La stricte croissance de l’exponentielle : \(u(x)=v(x)\).`),
        ex('Choix 3', 'variation', 'choice', r`Pour étudier \((x+a)e^x\), quel facteur garde toujours le même signe ?`, r`\(e^x\), qui est strictement positif.`),
        ex('Choix 4', 'modèle croissant', 'choice', r`Dans \(Ae^{kt}\), quel signe de \(k\) donne une croissance ?`, r`\(k>0\).`),
        ex('Choix 5', 'inéquation', 'choice', r`Dans \(e^{3x}<e^2\), faut-il changer le sens de l’inégalité ?`, r`Non, l’exponentielle est strictement croissante.`),
      ],
      controle: [
        ex('Contrôle 1', 'simplifier', 'control', r`Simplifier \(e^{2x-3}e^{-x+4}\).`, r`\(e^{x+1}\).`),
        ex('Contrôle 2', 'quotient', 'control', r`Simplifier \(\frac{e^{5x}}{e^{2x+1}}\).`, r`\(e^{3x-1}\).`),
        ex('Contrôle 3', 'dérivée', 'control', r`Dériver \(f(x)=e^{-2x+7}\).`, r`\(f'(x)=-2e^{-2x+7}\).`),
        ex('Contrôle 4', 'équation', 'control', r`Résoudre \(e^{x^2}=e^9\).`, r`\(x^2=9\), donc \(x=-3\) ou \(x=3\).`),
        ex('Contrôle 5', 'inéquation', 'control', r`Résoudre \(e^{1-4x}\ge e^{-3}\).`, r`\(1-4x\ge-3\), donc \(x\le1\).`),
        ex('Contrôle 6', 'variation', 'control', r`Étudier les variations de \(f(x)=(x+4)e^x\).`, r`\(f'(x)=(x+5)e^x\). Donc \(f\) décroît sur \(]-\infty;-5]\), puis croît.`),
      ],
      vingt: [
        ex('20/20 1', 'équation avec substitution', 'twenty', r`Résoudre \(e^{2x}-3e^x+2=0\) en posant \(X=e^x\).`, r`\(X^2-3X+2=0\), donc \(X=1\) ou \(X=2\). Ainsi \(e^x=1\) donne \(x=0\) ; \(e^x=2\) se lit/calculatrice en Première.`),
        ex('20/20 2', 'tangente', 'twenty', r`Donner l’équation de la tangente à \(e^x\) en \(0\).`, r`\(f(0)=1\), \(f'(0)=1\). Tangente : \(y=x+1\).`),
        ex('20/20 3', 'modèle décroissant', 'twenty', r`Une quantité vaut \(80e^{-0{,}2t}\). Est-elle croissante ou décroissante ? Donner la valeur initiale.`, r`Elle est décroissante car \(-0{,}2<0\). La valeur initiale est \(80\).`),
      ],
      revision: [
        ex('Révision suites', 'suite géométrique', 'revision', r`Montrer que \(u_n=e^{0{,}2n}\) est géométrique.`, r`\(\frac{u_{n+1}}{u_n}=e^{0{,}2}\), constante.`),
        ex('Révision dérivation', 'produit', 'revision', r`Dériver \(f(x)=x^2e^x\).`, r`\(f'(x)=2xe^x+x^2e^x=(x^2+2x)e^x\).`),
      ],
    },
  },
  {
    slug: 'variables-aleatoires',
    index: '09',
    title: 'Variables aléatoires',
    lead: '40 exercices pour construire une loi, calculer espérance, variance, écart-type et interpréter les jeux.',
    flow: ['Issues', 'Loi', 'Espérance', 'Dispersion'],
    sources: [
      'Maths91, cours Variable aléatoire',
      'MathsGuyon, cours Variable aléatoire',
      'VDouine, activités Variables aléatoires réelles',
    ],
    coverage: [
      'univers et variable aléatoire',
      'loi de probabilité',
      'espérance et interprétation',
      'variance et écart-type',
      'jeux équitables et transformations \(aX+b\)',
    ],
    traps: [
      'oublier que les probabilités d’une loi somment à 1',
      'confondre valeur de la variable et issue',
      'interpréter l’espérance comme un gain certain',
      'oublier les carrés dans la variance',
    ],
    exercises: {
      automatismes: [
        ex('Somme des probabilités', 'contrôler une loi', 'auto', r`Une loi donne \(0{,}2\), \(0{,}5\), \(0{,}3\). Est-elle valide ?`, r`Oui, la somme vaut \(1\).`),
        ex('Probabilité manquante', 'compléter une loi', 'auto', r`Une variable prend trois valeurs avec probabilités \(0{,}25\), \(0{,}15\), \(p\). Trouver \(p\).`, r`\(p=0{,}60\).`),
        ex('Espérance 1', 'calculer une moyenne pondérée', 'auto', r`\(X\) vaut \(0\) avec probabilité \(0{,}7\) et \(10\) avec probabilité \(0{,}3\). Calculer \(E(X)\).`, r`\(E(X)=3\).`),
        ex('Espérance 2', 'moyenne pondérée', 'auto', r`\(X\) vaut \(-2\), \(1\), \(4\) avec probabilités \(0{,}2\), \(0{,}5\), \(0{,}3\). Calculer \(E(X)\).`, r`\(-0{,}4+0{,}5+1{,}2=1{,}3\).`),
        ex('Variance formule', 'connaître la formule', 'auto', r`Quelle formule utilise \(E(X^2)\) pour calculer la variance ?`, r`\(V(X)=E(X^2)-E(X)^2\).`),
        ex('Écart-type', 'racine de variance', 'auto', r`Si \(V(X)=9\), que vaut \(\sigma(X)\) ?`, r`\(\sigma(X)=3\).`),
        ex('Transformation', 'linéarité de l’espérance', 'auto', r`Si \(E(X)=4\), calculer \(E(2X+3)\).`, r`\(2\times4+3=11\).`),
        ex('Jeu équitable', 'interpréter espérance', 'auto', r`Un jeu est équitable si l’espérance du gain algébrique vaut combien ?`, r`Elle vaut \(0\).`),
        ex('Issue ou valeur', 'vocabulaire', 'auto', r`Une variable \(X\) peut-elle prendre la même valeur pour plusieurs issues ?`, r`Oui. Une variable aléatoire associe un nombre à chaque issue.`),
        ex('Probabilité événement', 'additionner des valeurs', 'auto', r`Si \(P(X=1)=0{,}2\) et \(P(X=2)=0{,}4\), calculer \(P(X\le2)\) si aucune autre valeur n’est \(\le2\).`, r`\(0{,}6\).`),
      ],
      methodes: [
        ex('Dé équilibré', 'construire une loi', 'guide', r`On lance un dé. \(X=1\) si le résultat est pair, \(X=-1\) sinon. Donner la loi de \(X\).`, r`\(P(X=1)=\frac12\), \(P(X=-1)=\frac12\).`),
        ex('Espérance de loi', 'calculer proprement', 'guide', r`\(X\) vaut \(0,2,5\) avec probabilités \(0{,}4,0{,}4,0{,}2\). Calculer \(E(X)\).`, r`\(E(X)=0+0{,}8+1=1{,}8\).`),
        ex('Variance', 'passer par \(E(X^2)\)', 'guide', r`Pour la loi précédente, calculer \(E(X^2)\), puis \(V(X)\).`, r`\(E(X^2)=0+4\times0{,}4+25\times0{,}2=6{,}6\). \(V(X)=6{,}6-1{,}8^2=3{,}36\).`),
        ex('Gain algébrique', 'tenir compte de la mise', 'guide', r`Un ticket coûte \(2\) euros. On gagne \(10\) euros avec probabilité \(0{,}1\), sinon rien. Calculer l’espérance du gain net.`, r`Gain net : \(8\) avec proba \(0{,}1\), \(-2\) avec proba \(0{,}9\). Espérance \(0{,}8-1{,}8=-1\).`),
        ex('Mise équitable', 'chercher un paramètre', 'guide', r`Un jeu rapporte \(12\) euros avec probabilité \(\frac14\), sinon \(0\). Quelle mise rend le jeu équitable ?`, r`Le gain moyen brut vaut \(3\). La mise équitable est \(3\) euros.`),
        ex('Événement', 'additionner les bonnes probabilités', 'guide', r`\(X\) prend \(-3,0,2,5\) avec probabilités \(0{,}1,0{,}2,0{,}4,0{,}3\). Calculer \(P(X>0)\).`, r`\(0{,}4+0{,}3=0{,}7\).`),
        ex('Transformation variance', 'utiliser \(V(aX+b)\)', 'guide', r`Si \(V(X)=4\), calculer \(V(3X-1)\).`, r`\(V(3X-1)=3^2V(X)=36\).`),
        ex('Rédaction notée', 'loi et espérance', 'guide', r`Un sac contient 2 boules rouges et 3 bleues. On tire une boule. \(X=4\) si rouge, \(X=-1\) si bleue. Rédiger la loi et l’espérance.`, r`\(E(X)=1\).`, '', r`<p>Il y a \(5\) boules au total. Donc \(P(X=4)=\frac25\) et \(P(X=-1)=\frac35\).</p><p>L’espérance vaut \(E(X)=4\times\frac25+(-1)\times\frac35=\frac85-\frac35=1\).</p><p>Interprétation : sur un grand nombre de tirages, le gain moyen serait de \(1\) unité par tirage.</p><p>Erreur qui coûte des points : donner les couleurs sans construire la loi de \(X\).</p>`),
      ],
      pieges: [
        ex('Somme différente de 1', 'contrôler la loi', 'trap', r`Une loi propose \(0{,}4\), \(0{,}4\), \(0{,}4\). Pourquoi est-ce impossible ?`, r`La somme vaut \(1{,}2\), pas \(1\).`),
        ex('Espérance certaine', 'interprétation', 'trap', r`Si \(E(X)=3\), gagne-t-on forcément \(3\) à chaque partie ?`, r`Non. C’est une moyenne théorique sur beaucoup de parties.`),
        ex('Variance sans carrés', 'formule', 'trap', r`Pourquoi ne calcule-t-on pas la variance avec \(E(X)-E(X)^2\) ?`, r`Il faut \(E(X^2)-E(X)^2\), donc les valeurs de \(X\) doivent être mises au carré avant moyenne.`),
        ex('Gain brut/net', 'mise', 'trap', r`Un jeu rapporte \(20\) euros mais coûte \(5\). Quel gain net si on gagne ?`, r`\(15\) euros.`),
        ex('Écart-type négatif', 'racine positive', 'trap', r`L’écart-type peut-il être négatif ?`, r`Non, c’est la racine carrée de la variance.`),
        ex('Valeurs répétées', 'regrouper les issues', 'trap', r`Si deux issues donnent \(X=2\), que faire dans la loi ?`, r`On additionne leurs probabilités pour obtenir \(P(X=2)\).`),
      ],
      choix: [
        ex('Choix 1', 'loi ou espérance', 'choice', r`Avant de calculer \(E(X)\), quel objet faut-il établir ?`, r`La loi de probabilité de \(X\).`),
        ex('Choix 2', 'variance', 'choice', r`Pour calculer une dispersion, quelle quantité intermédiaire est souvent utile ?`, r`\(E(X^2)\).`),
        ex('Choix 3', 'jeu', 'choice', r`Dans un jeu payant, pourquoi travailler avec le gain net ?`, r`Parce que la mise doit être soustraite du gain brut.`),
        ex('Choix 4', 'événement', 'choice', r`Pour calculer \(P(X\ge a)\), que faut-il repérer dans la loi ?`, r`Toutes les valeurs de \(X\) qui vérifient l’inégalité, puis additionner leurs probabilités.`),
        ex('Choix 5', 'équitable', 'choice', r`Pour rendre un jeu équitable, quelle équation poser ?`, r`Espérance du gain net \(=0\).`),
      ],
      controle: [
        ex('Contrôle 1', 'compléter une loi', 'control', r`\(X\) prend \(1,2,3\) avec probabilités \(0{,}2,p,0{,}5\). Trouver \(p\).`, r`\(p=0{,}3\).`),
        ex('Contrôle 2', 'espérance', 'control', r`Calculer \(E(X)\) pour \(X=-1,2,6\) de probabilités \(0{,}25,0{,}5,0{,}25\).`, r`\(-0{,}25+1+1{,}5=2{,}25\).`),
        ex('Contrôle 3', 'variance', 'control', r`Avec la loi du contrôle 2, calculer \(E(X^2)\).`, r`\(1\times0{,}25+4\times0{,}5+36\times0{,}25=11{,}25\).`),
        ex('Contrôle 4', 'variance suite', 'control', r`Avec \(E(X)=2{,}25\) et \(E(X^2)=11{,}25\), calculer \(V(X)\).`, r`\(V(X)=11{,}25-2{,}25^2=6{,}1875\).`),
        ex('Contrôle 5', 'jeu équitable', 'control', r`On gagne \(9\) euros avec probabilité \(\frac13\), sinon \(0\). Mise équitable ?`, r`Gain brut moyen \(=3\). Mise équitable \(=3\) euros.`),
        ex('Contrôle 6', 'événement', 'control', r`\(X\) vaut \(0,1,4,10\) avec probabilités \(0{,}1,0{,}2,0{,}5,0{,}2\). Calculer \(P(X\ge4)\).`, r`\(0{,}5+0{,}2=0{,}7\).`),
      ],
      vingt: [
        ex('20/20 1', 'mise inconnue', 'twenty', r`Un jeu donne \(20\) euros avec probabilité \(0{,}2\), \(5\) euros avec probabilité \(0{,}3\), rien sinon. Quelle mise rend le jeu équitable ?`, r`Gain brut moyen \(=20\times0{,}2+5\times0{,}3=5{,}5\). Mise équitable : \(5{,}50\) euros.`),
        ex('20/20 2', 'transformation', 'twenty', r`Si \(E(X)=3\) et \(V(X)=2\), calculer \(E(5-2X)\) et \(V(5-2X)\).`, r`\(E(5-2X)=5-6=-1\). \(V(5-2X)=4V(X)=8\).`),
        ex('20/20 3', 'loi de somme simple', 'twenty', r`On lance deux pièces équilibrées. \(X\) est le nombre de piles. Donner la loi et l’espérance.`, r`\(P(X=0)=\frac14\), \(P(X=1)=\frac12\), \(P(X=2)=\frac14\). \(E(X)=1\).`),
      ],
      revision: [
        ex('Révision probabilités', 'conditionnelle', 'revision', r`Dans une urne, \(P(R)=0{,}4\). Si \(X=5\) quand \(R\) arrive et \(0\) sinon, calculer \(E(X)\).`, r`\(5\times0{,}4=2\).`),
        ex('Révision suites', 'moyenne répétée', 'revision', r`Si un gain moyen vaut \(1{,}2\) euros par partie, quel gain moyen sur \(50\) parties ?`, r`En moyenne \(50\times1{,}2=60\) euros.`),
      ],
    },
  },
  {
    slug: 'geometrie-reperee',
    index: '10',
    title: 'Géométrie repérée',
    lead: '40 exercices pour calculer dans un repère : coordonnées, vecteurs, droites, intersections, cercles et projetés.',
    flow: ['Points', 'Vecteurs', 'Droites', 'Cercles'],
    sources: [
      'Maths-et-tiques, Géométrie repérée',
      'Ching@Math, équation cartésienne',
      'Maths91, notions repérées dans Produit scalaire',
    ],
    coverage: [
      'coordonnées de points et vecteurs',
      'milieu, distance, colinéarité',
      'équations cartésiennes et réduites de droites',
      'vecteurs directeurs et normaux',
      'équations de cercles et intersections simples',
    ],
    traps: [
      'faire départ moins arrivée au lieu d’arrivée moins départ',
      'confondre vecteur directeur et normal',
      'oublier de tester un point dans une droite',
      'mal développer \((x-a)^2+(y-b)^2=r^2\)',
    ],
    exercises: {
      automatismes: [
        ex('Vecteur 1', 'calculer des coordonnées', 'auto', r`Avec \(A(2;-1)\) et \(B(5;3)\), calculer \(\overrightarrow{AB}\).`, r`\(\overrightarrow{AB}=(3;4)\).`),
        ex('Milieu', 'formule du milieu', 'auto', r`Milieu de \(A(-2;5)\) et \(B(4;1)\).`, r`\(M(1;3)\).`),
        ex('Distance', 'formule de distance', 'auto', r`Calculer \(AB\) pour \(A(1;1)\), \(B(4;5)\).`, r`\(AB=\sqrt{3^2+4^2}=5\).`),
        ex('Colinéarité', 'déterminant', 'auto', r`Les vecteurs \((2;6)\) et \((1;3)\) sont-ils colinéaires ?`, r`Oui, le second est la moitié du premier.`),
        ex('Équation réduite', 'lire pente et ordonnée', 'auto', r`Dans \(y=3x-4\), donner le coefficient directeur.`, r`Le coefficient directeur est \(3\).`),
        ex('Vecteur directeur', 'équation cartésienne', 'auto', r`Pour \(2x-5y+1=0\), donner un vecteur directeur.`, r`Un vecteur directeur est \((5;2)\).`),
        ex('Vecteur normal', 'équation cartésienne', 'auto', r`Pour \(2x-5y+1=0\), donner un vecteur normal.`, r`Un vecteur normal est \((2;-5)\).`),
        ex('Appartenance droite', 'tester un point', 'auto', r`Le point \(A(1;2)\) appartient-il à \(3x-y-1=0\) ?`, r`Oui, \(3\times1-2-1=0\).`),
        ex('Cercle', 'lire centre et rayon', 'auto', r`Lire le centre et le rayon de \((x-2)^2+(y+3)^2=25\).`, r`Centre \(C(2;-3)\), rayon \(5\).`),
        ex('Intersection axe', 'poser une coordonnée nulle', 'auto', r`Trouver l’intersection de \(y=2x-6\) avec l’axe des abscisses.`, r`On pose \(y=0\), donc \(x=3\). Point \((3;0)\).`),
      ],
      methodes: [
        ex('Équation avec directeur', 'point et vecteur directeur', 'guide', r`Donner une équation de la droite passant par \(A(1;2)\) et de vecteur directeur \((3;4)\).`, r`Un vecteur normal est \((4;-3)\). Donc \(4(x-1)-3(y-2)=0\), soit \(4x-3y+2=0\).`),
        ex('Équation avec normal', 'point et normal', 'guide', r`Donner une équation de la droite passant par \(A(-2;1)\) et de vecteur normal \((5;2)\).`, r`\(5(x+2)+2(y-1)=0\), soit \(5x+2y+8=0\).`),
        ex('Intersection de droites', 'résoudre un système', 'guide', r`Trouver l’intersection de \(y=2x+1\) et \(y=-x+7\).`, r`\(2x+1=-x+7\), donc \(x=2\), \(y=5\).`),
        ex('Parallélisme', 'comparer les directions', 'guide', r`Les droites \(2x-3y+1=0\) et \(4x-6y+5=0\) sont-elles parallèles ?`, r`Oui, leurs vecteurs normaux \((2;-3)\) et \((4;-6)\) sont colinéaires.`),
        ex('Perpendicularité', 'produit scalaire', 'guide', r`Les droites de vecteurs directeurs \((2;5)\) et \((5;-2)\) sont-elles perpendiculaires ?`, r`Oui, \(2\times5+5\times(-2)=0\).`),
        ex('Cercle', 'écrire une équation', 'guide', r`Écrire l’équation du cercle de centre \(C(-1;4)\) et de rayon \(3\).`, r`\((x+1)^2+(y-4)^2=9\).`),
        ex('Point sur cercle', 'tester une équation', 'guide', r`Le point \(A(2;1)\) appartient-il au cercle \((x-1)^2+(y+1)^2=5\) ?`, r`Oui, \((2-1)^2+(1+1)^2=1+4=5\).`),
        ex('Rédaction notée', 'prouver un alignement', 'guide', r`Rédiger une preuve que \(A(1;2)\), \(B(3;6)\), \(C(4;8)\) sont alignés.`, r`Ils sont alignés car \(\overrightarrow{AB}\) et \(\overrightarrow{AC}\) sont colinéaires.`, '', r`<p>\(\overrightarrow{AB}=(2;4)\) et \(\overrightarrow{AC}=(3;6)\).</p><p>On calcule le déterminant : \(2\times6-4\times3=12-12=0\).</p><p>Les vecteurs \(\overrightarrow{AB}\) et \(\overrightarrow{AC}\) sont colinéaires. Donc les points \(A\), \(B\), \(C\) sont alignés.</p><p>Erreur qui coûte des points : écrire seulement “ça se voit” sans calcul de colinéarité.</p>`),
      ],
      pieges: [
        ex('Sens du vecteur', 'arrivée moins départ', 'trap', r`Corriger \(\overrightarrow{AB}=(x_A-x_B;y_A-y_B)\).`, r`La bonne formule est \((x_B-x_A;y_B-y_A)\).`),
        ex('Normal ou directeur', 'ne pas confondre', 'trap', r`Pour \(ax+by+c=0\), \((a;b)\) est quel type de vecteur ?`, r`Un vecteur normal.`),
        ex('Pente verticale', 'équation impossible en \(y=mx+p\)', 'trap', r`La droite \(x=3\) admet-elle une équation réduite \(y=mx+p\) ?`, r`Non, c’est une droite verticale.`),
        ex('Rayon au carré', 'lire le cercle', 'trap', r`Dans \((x-1)^2+(y-2)^2=16\), le rayon vaut-il \(16\) ?`, r`Non, le rayon vaut \(4\).`),
        ex('Appartenance', 'tester les deux coordonnées', 'trap', r`Pourquoi ne suffit-il pas de remplacer seulement \(x\) pour tester un point sur une droite ?`, r`Il faut remplacer \(x\) et \(y\), car l’équation lie les deux coordonnées.`),
        ex('Déterminant', 'ordre des produits', 'trap', r`Pour tester \((a;b)\) et \((c;d)\), écrire le déterminant.`, r`\(ad-bc\).`),
      ],
      choix: [
        ex('Choix 1', 'milieu ou distance', 'choice', r`Pour prouver qu’un point est équidistant de \(A\) et \(B\), quelle formule utiliser ?`, r`La formule de distance, souvent au carré pour éviter les racines.`),
        ex('Choix 2', 'alignement', 'choice', r`Pour prouver un alignement avec coordonnées, quel test utiliser ?`, r`La colinéarité de deux vecteurs.`),
        ex('Choix 3', 'droite par point et normal', 'choice', r`Si un vecteur normal est donné, quelle forme d’équation écrire ?`, r`\(a(x-x_A)+b(y-y_A)=0\).`),
        ex('Choix 4', 'intersection', 'choice', r`Pour trouver l’intersection de deux droites, quelle méthode ?`, r`Résoudre le système formé par leurs équations.`),
        ex('Choix 5', 'cercle', 'choice', r`Si l’énoncé donne un centre et un rayon, quelle forme d’équation choisir ?`, r`\((x-a)^2+(y-b)^2=r^2\).`),
      ],
      controle: [
        ex('Contrôle 1', 'vecteur', 'control', r`Calculer \(\overrightarrow{AB}\) pour \(A(-3;4)\), \(B(2;-5)\).`, r`\((5;-9)\).`),
        ex('Contrôle 2', 'distance', 'control', r`Calculer \(AB\) pour \(A(-1;2)\), \(B(5;-6)\).`, r`\(AB=\sqrt{6^2+(-8)^2}=10\).`),
        ex('Contrôle 3', 'droite', 'control', r`Écrire une équation de la droite passant par \(A(0;3)\) et \(B(2;7)\).`, r`Coefficient directeur \(2\), donc \(y=2x+3\).`),
        ex('Contrôle 4', 'intersection', 'control', r`Trouver l’intersection de \(x+y=5\) et \(2x-y=4\).`, r`En ajoutant : \(3x=9\), donc \(x=3\), \(y=2\).`),
        ex('Contrôle 5', 'cercle', 'control', r`Donner centre et rayon de \(x^2+y^2-4x+6y-12=0\).`, r`\((x-2)^2+(y+3)^2=25\). Centre \((2;-3)\), rayon \(5\).`),
        ex('Contrôle 6', 'appartenance cercle', 'control', r`Le point \(A(5;-3)\) appartient-il au cercle de centre \(C(2;1)\) et rayon \(5\) ?`, r`\(CA=\sqrt{3^2+(-4)^2}=5\), donc oui.`),
      ],
      vingt: [
        ex('20/20 1', 'droite et cercle', 'twenty', r`Trouver les intersections de \(y=0\) avec le cercle \((x-1)^2+y^2=9\).`, r`On obtient \((x-1)^2=9\), donc \(x=-2\) ou \(x=4\). Points \((-2;0)\) et \((4;0)\).`),
        ex('20/20 2', 'paramètre alignement', 'twenty', r`Déterminer \(m\) pour que \(A(0;1)\), \(B(2;5)\), \(C(3;m)\) soient alignés.`, r`\(\overrightarrow{AB}=(2;4)\), \(\overrightarrow{AC}=(3;m-1)\). Déterminant \(2(m-1)-12=0\), donc \(m=7\).`),
        ex('20/20 3', 'projeté simple', 'twenty', r`Le projeté orthogonal de \(A(2;5)\) sur la droite \(y=1\) est quel point ?`, r`C’est \(H(2;1)\), car la projection verticale conserve l’abscisse.`),
      ],
      revision: [
        ex('Révision produit scalaire', 'orthogonalité', 'revision', r`Prouver que les droites de vecteurs directeurs \((1;3)\) et \((6;-2)\) sont perpendiculaires.`, r`Le produit scalaire vaut \(6-6=0\).`),
        ex('Révision second degré', 'cercle et équation', 'revision', r`Développer \((x-2)^2+(y+1)^2=9\).`, r`\(x^2-4x+4+y^2+2y+1=9\), donc \(x^2+y^2-4x+2y-4=0\).`),
      ],
    },
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function normalizeMathText(value) {
  return String(value)
    .replace(/\u0008/g, 'b')
    .replace(/\u000b/g, 'v')
    .replace(/\t/g, 't')
    .replace(/\(\(alpha;beta\)\)/g, '\\((\\alpha;\\beta)\\)')
    .replace(/\(\(vec u\+vec v\)\^2\)/g, '\\(\\|\\vec u+\\vec v\\|^2\\)')
    .replace(/\(2vec ucdotvec v\)/g, '\\(2\\vec u\\cdot\\vec v\\)')
    .replace(/\(Delta=0\)/g, '\\(\\Delta=0\\)')
    .replace(/\(Delta\)/g, '\\(\\Delta\\)')
    .replace(/\(alpha\)/g, '\\(\\alpha\\)')
    .replace(/\(beta\)/g, '\\(\\beta\\)')
    .replace(/\(a<0\)/g, '\\(a<0\\)')
    .replace(/\(V\(aX\+b\)\)/g, '\\(V(aX+b)\\)')
    .replace(/\(aX\+b\)/g, '\\(aX+b\\)')
    .replace(/\\\(V\\\(aX\+b\\\)\\\)/g, '\\(V(aX+b)\\)')
    .replace(/\(E\(X\^2\)\)/g, '\\(E(X^2)\\)')
    .replace(/\(u_\{n\+1\}-u_n\)/g, '\\(u_{n+1}-u_n\\)')
    .replace(/\(u_\{n\+1\}\)/g, '\\(u_{n+1}\\)')
    .replace(/\(u_n=u_0q\^n\)/g, '\\(u_n=u_0q^n\\)')
    .replace(/\(u_n=u_0\+nr\)/g, '\\(u_n=u_0+nr\\)')
    .replace(/\(u_n\)/g, '\\(u_n\\)')
    .replace(/\(u\(ax\+b\)\)/g, '\\(u(ax+b)\\)')
    .replace(/\(L=rtheta\)/g, '\\(L=r\\theta\\)')
    .replace(/\(2pi\)/g, '\\(2\\pi\\)')
    .replace(/\(\+pi\)/g, '\\(+\\pi\\)')
    .replace(/\(pi\)/g, '\\(\\pi\\)')
    .replace(/\(cos\(-x\)\)/g, '\\(\\cos(-x)\\)')
    .replace(/\(sin\(-x\)\)/g, '\\(\\sin(-x)\\)')
    .replace(/\(cos\^2\+sin\^2=1\)/g, '\\(\\cos^2+\\sin^2=1\\)')
    .replace(/\(cos x=a\)/g, '\\(\\cos x=a\\)')
    .replace(/\(sin x=a\)/g, '\\(\\sin x=a\\)')
    .replace(/\(cos x=r\)/g, '\\(\\cos x=r\\)')
    .replace(/\(sin x=r\)/g, '\\(\\sin x=r\\)')
    .replace(/\(vec ucdotvec u\)/g, '\\(\\vec u\\cdot\\vec u\\)')
    .replace(/\(\|vec u\|\|vec v\|costheta\)/g, '\\(\\|\\vec u\\|\\,\\|\\vec v\\|\\cos\\theta\\)')
    .replace(/\(P_A\(B\)\)/g, '\\(P_A(B)\\)')
    .replace(/\(P\(B\)\)/g, '\\(P(B)\\)')
    .replace(/\(P\(Acap B\)\)/g, '\\(P(A\\cap B)\\)')
    .replace(/\(xmapsto cos x\)/g, '\\(x\\mapsto \\cos x\\)')
    .replace(/\(xmapsto sin x\)/g, '\\(x\\mapsto \\sin x\\)')
    .replace(/\(a\)/g, '\\(a\\)')
    .replace(/\(b\)/g, '\\(b\\)')
    .replace(/\(c\)/g, '\\(c\\)');
}

function renderList(items) {
  return items.map((item) => `<li>${normalizeMathText(item)}</li>`).join('\n');
}

function flattenExercises(chapter) {
  return SECTIONS.flatMap(([key]) => chapter.exercises[key] || []);
}

function renderExercise(chapter, item, number) {
  const id = `td-${chapter.slug}-${String(number).padStart(2, '0')}`;
  const label = LEVEL_LABELS[item.level] || item.level;
  const aria = item.level === 'twenty'
    ? 'Niveau 20 sur 20'
    : item.level === 'control'
      ? 'Niveau contrôle'
      : `Niveau ${label}`;
  const answer = item.detail || `<p>${item.answer}</p>`;
  const hint = item.hint ? `<p class="hint-line">${normalizeMathText(item.hint)}</p>` : '';
  const source = item.source ? `<p class="exercise-source">Inspiration adaptée : ${normalizeMathText(item.source)}</p>` : '';

  return `          <article class="exercise">
            <div class="exercise-header">
              <h3>Exercice ${number} · ${normalizeMathText(item.title)}</h3>
              <span class="difficulty" aria-label="${aria}">${label}</span>
            </div>
            <p class="exercise-skill">Ce que tu entraînes : ${normalizeMathText(item.skill)}.</p>
            <p>${item.statement}</p>
            ${hint}
            ${source}
            <button class="reveal-button" type="button" data-reveal="${id}">Voir le corrigé</button>
            <div id="${id}" class="answer" hidden>
              ${answer}
            </div>
          </article>`;
}

function renderExerciseSection(chapter, key, title, intro, startNumber) {
  const items = chapter.exercises[key] || [];
  const exercises = items.map((item, index) => renderExercise(chapter, item, startNumber + index)).join('\n\n');
  return `      <section id="${key === 'vingt' ? 'vingt-sur-vingt' : key === 'methodes' ? 'methodes-guidees' : key}" class="chapter-section">
        <div class="section-marker">
          <div class="section-marker__num">${sectionMarker(key)}</div>
          <div class="section-marker__meta">
            <p class="section-marker__kicker">TD corrigé</p>
            <h2>${title}</h2>
          </div>
        </div>
        <p>${intro}</p>
${key === 'vingt' ? `        <div class="c-gate">
          <p class="c-gate__label">Porte d’entrée</p>
          <p class="c-gate__title">Avant ce bloc</p>
          <p>Réussis au moins deux exercices de niveau contrôle sans regarder le corrigé. Le cap 20/20 n’est pas un raccourci : il combine les réflexes précédents.</p>
        </div>
` : ''}${exercises}
      </section>`;
}

function sectionMarker(key) {
  return {
    automatismes: 'A',
    methodes: 'G',
    pieges: 'P',
    choix: 'M',
    controle: 'C',
    vingt: '20',
    revision: 'R',
  }[key] || '•';
}

function renderPage(chapter) {
  const count = flattenExercises(chapter).length;
  if (count !== 40) {
    throw new Error(`${chapter.slug}: expected 40 exercises, got ${count}`);
  }

  let number = 1;
  const sections = SECTIONS.map(([key, title, intro]) => {
    const html = renderExerciseSection(chapter, key, title, intro, number);
    number += chapter.exercises[key].length;
    return html;
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TD ${escapeHtml(chapter.title)} - Maths spécialité Première</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <link rel="stylesheet" href="../cours.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
  <script defer src="../cours.js"></script>
</head>
<body class="has-course-sidebar">

  <div class="progress-bar" aria-hidden="true">
    <div class="progress-bar__fill" data-progress-fill></div>
  </div>

  <div class="section-bar" data-section-bar aria-hidden="true">
    <span class="section-bar__chip" data-section-bar-chip>00</span>
    <span class="section-bar__title" data-section-bar-title>TD ${escapeHtml(chapter.title)}</span>
    <span class="section-bar__total" data-section-bar-total>1/9</span>
  </div>

  <aside class="toc course-sidebar" aria-label="Plan du TD" data-course-sidebar>
    <div class="sidebar-head">
      <div>
        <p class="toc-title">Plan</p>
        <p class="sidebar-subtitle">TD ${escapeHtml(chapter.title)}</p>
      </div>
      <button class="sidebar-toggle" type="button" aria-label="Replier le plan" aria-expanded="true" data-sidebar-toggle><span aria-hidden="true">‹</span></button>
    </div>

    <nav class="toc-links" aria-label="Sections du TD">
      <a href="#objectifs" data-section-link><span class="toc-index">00</span><span class="toc-label">Objectifs</span></a>
      <a href="#automatismes" data-section-link><span class="toc-index">A</span><span class="toc-label">Automatismes</span></a>
      <a href="#methodes-guidees" data-section-link><span class="toc-index">G</span><span class="toc-label">Guidé</span></a>
      <a href="#pieges" data-section-link><span class="toc-index">P</span><span class="toc-label">Pièges</span></a>
      <a href="#choix" data-section-link><span class="toc-index">M</span><span class="toc-label">Choisir</span></a>
      <a href="#controle" data-section-link><span class="toc-index">C</span><span class="toc-label">Contrôle</span></a>
      <a href="#vingt-sur-vingt" data-section-link><span class="toc-index">20</span><span class="toc-label">20/20</span></a>
      <a href="#revision" data-section-link><span class="toc-index">R</span><span class="toc-label">Révision</span></a>
      <a href="#sources" data-section-link><span class="toc-index">S</span><span class="toc-label">Sources</span></a>
    </nav>

    <p class="sidebar-foot">Maths spé · TD</p>
  </aside>

  <header class="course-hero">
    <nav class="topline" aria-label="Fil d'Ariane">
      <a href="../../../..">Objectif Lycée</a>
      <span>Maths spécialité</span>
      <a href="index.html">Cours</a>
      <span>TD corrigé</span>
    </nav>

    <div class="hero-grid">
      <div>
        <p class="hero-eyebrow"><span class="num">${chapter.index}</span> TD séparé</p>
        <h1>${escapeHtml(chapter.title)}</h1>
        <p class="hero-lead">${chapter.lead}</p>
      </div>

      <aside class="hero-side" aria-label="Organisation du TD">
        <p class="hero-side__label">Objectif</p>
        <h2>40 exercices, corrigés masqués</h2>
        <div class="hero-side__steps">
          ${chapter.flow.map((item) => `<div class="hero-side__step"><span class="verb">${item}</span><span class="obj">à produire avant correction</span></div>`).join('\n          ')}
        </div>
      </aside>
    </div>
  </header>

  <main class="course-layout" data-course-layout>
    <article class="lesson course-lesson">

      <section class="course-overview" aria-label="Repères du TD">
        <div>
          <p class="course-overview__title">TD d’entraînement</p>
          <h3>Une page séparée pour travailler sans relire tout le cours</h3>
          <p class="course-overview__lead">Chaque exercice indique la compétence entraînée, puis cache une réponse ou une correction. Les corrections détaillées montrent aussi la rédaction attendue et les erreurs qui coûtent des points.</p>
        </div>
        <div class="overview-flow">
          <span>Automatismes</span>
          <em>→</em>
          <span>Méthodes</span>
          <em>→</em>
          <span>Contrôle</span>
          <em>→</em>
          <span>20/20</span>
        </div>
      </section>

      <section id="objectifs" class="chapter-section">
        <div class="section-marker">
          <div class="section-marker__num">00</div>
          <div class="section-marker__meta">
            <p class="section-marker__kicker">Avant de commencer</p>
            <h2>Ce TD reprend les points qui tombent vraiment</h2>
          </div>
        </div>
        <p>Travaille dans l’ordre. Si un automatisme bloque, ouvre le corrigé, refais l’exercice sans regarder, puis seulement passe à la suite.</p>
        <div class="diagnostic-grid">
          ${chapter.coverage.map((item, index) => `<div class="check-card">
            <p class="check-card__label"><span class="marker">${index + 1}</span>Compétence</p>
            <p>${normalizeMathText(item)}</p>
          </div>`).join('\n          ')}
        </div>
        <div class="c-callout c-callout--warn">
          <p class="c-callout__label"><span class="dot"></span>Pièges surveillés</p>
          <p>${chapter.traps.map(normalizeMathText).join(' ; ')}.</p>
        </div>
      </section>

${sections}

      <section id="sources" class="chapter-section recap-section">
        <div class="section-marker">
          <div class="section-marker__num">S</div>
          <div class="section-marker__meta">
            <p class="section-marker__kicker">Traçabilité</p>
            <h2>Sources d’inspiration et adaptation</h2>
          </div>
        </div>
        <p>Les exercices sont des variantes reformulées et recalculées à partir des sources validées. Les corrigés sont écrits pour le web : aide masquée, choix de méthode, rédaction et erreurs fréquentes.</p>
        <div class="revision-grid">
          ${chapter.sources.map((source) => `<div class="revision-card"><p class="box-title">Source</p><p>${source}</p></div>`).join('\n          ')}
        </div>
      </section>
    </article>
  </main>
</body>
</html>
`;
}

function renderSourceMap(chapter) {
  return `# Carte de couverture - TD ${chapter.title}

## Notions reprises
${chapter.coverage.map((item) => `- ${normalizeMathText(item)}`).join('\n')}

## Méthodes et exemples adaptés
- Automatismes courts pour forcer la récupération avant correction.
- Méthodes guidées avec corrigés détaillés sur les gestes structurants.
- Bloc "choisir la méthode" pour éviter l’application mécanique.
- Niveau contrôle puis cap 20/20, avec une porte d’entrée explicite.
- Révision mélangée pour reconnecter le chapitre aux autres notions de Première.

## Pièges et cas limites
${chapter.traps.map((item) => `- ${normalizeMathText(item)}`).join('\n')}

## Sources utilisées
${chapter.sources.map((item) => `- ${item}`).join('\n')}

## Graphes ou diagrammes exacts nécessaires
Aucun graphe nouveau n’est nécessaire dans le TD séparé. Les exercices restent textuels ou algébriques ; les graphes exacts du cours \`index.html\` restent la référence quand le chapitre demande une lecture graphique.

## Éléments volontairement exclus
- Pas de recopie brute d’énoncés PDF.
- Pas de schéma mathématique approximatif dessiné à la main.
- Pas de corrigé visible par défaut : la tentative élève passe avant la lecture de la réponse.
`;
}

function renderSources(chapter) {
  return `# Sources - TD ${chapter.title}

Sources validées consultées via \`lien/premiere/math.md\` et les extractions locales de \`prototypes/cours/_extracted/premiere/math/\`.

${chapter.sources.map((item) => `- ${item}`).join('\n')}

## Règle d’adaptation

Les exercices du TD ne recopient pas les PDFs. Ils conservent la progression, les méthodes et les pièges des sources, mais les nombres, formulations et corrections sont adaptés pour une page web interactive avec réponses masquées.
`;
}

function renderGenerationNotes(chapter) {
  return `# Notes de génération - TD ${chapter.title}

## Décision

Création d’une page \`td.html\` séparée pour le chapitre, avec 40 exercices corrigés et un lien visible depuis \`index.html\`.

## Structure pédagogique

- 10 automatismes.
- 8 méthodes guidées.
- 6 pièges.
- 5 exercices de choix de méthode.
- 6 exercices niveau contrôle.
- 3 exercices cap 20/20, précédés d’une porte d’entrée.
- 2 exercices de révision mélangée.

## Carte de couverture V2

${chapter.coverage.map((item) => `- ${normalizeMathText(item)}`).join('\n')}

## Rôles des sources

- Maths91 sert de colonne vertébrale pour la couverture du programme, les méthodes et les exercices de contrôle.
- Maths-et-tiques sert de complément pour l’intuition, les explications alternatives et les exemples utiles quand la source existe pour le chapitre.
- Les autres sources listées dans \`sources.md\` inspirent des variations d’énoncés et des pièges, sans recopie brute.

## Garde-fous appliqués

- Corrigés masqués avec \`data-reveal\`.
- Une réponse pour chaque exercice.
- Corrections détaillées sur les exercices structurants.
- Pas de courbe ou schéma mathématique approximatif.
- Sources citées au niveau de la page et dans \`sources.md\`.

## Éléments volontairement exclus

- Recopie brute d’énoncés PDF.
- Exercices sans réponse.
- Graphes approximatifs dessinés à la main.
`;
}

function renderVerificationNotes(chapter) {
  return `# Notes de vérification - TD ${chapter.title}

## Vérifications attendues

- KaTeX doit se rendre sans erreur console.
- Aucun bloc \`.katex-display\` ou \`.formula-card\` ne doit déborder horizontalement.
- Les boutons \`data-reveal\` doivent masquer puis afficher les corrigés.
- La sidebar doit fonctionner en desktop, mobile, état ouvert, état replié, hover et focus.
- La page \`td.html\` est couverte par \`npm run verify:course-sidebar\` et \`npm run verify:cwv\`.

## Graphes

Aucun graphe exact supplémentaire dans le TD. Si un futur exercice demande une lecture de courbe, utiliser JSXGraph ou renvoyer au graphe exact du cours.
`;
}

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function writeChapterFiles(chapter) {
  const dir = join(COURSE_ROOT, chapter.slug);
  ensureDir(dir);
  writeFileSync(join(dir, 'td.html'), renderPage(chapter), 'utf8');
  writeFileSync(join(dir, 'source-map.md'), renderSourceMap(chapter), 'utf8');
  writeFileSync(join(dir, 'sources.md'), renderSources(chapter), 'utf8');
  writeFileSync(join(dir, 'generation-notes.md'), renderGenerationNotes(chapter), 'utf8');
  writeFileSync(join(dir, 'verification-notes.md'), renderVerificationNotes(chapter), 'utf8');
}

function updateCourseIndexLinks(chapter) {
  const path = join(COURSE_ROOT, chapter.slug, 'index.html');
  let html = readFileSync(path, 'utf8');
  if (html.includes('href="td.html"')) return;
  html = html.replace('<span>Cours</span>', '<span>Cours</span>\n      <a href="td.html">TD corrigé</a>');
  writeFileSync(path, html, 'utf8');
}

function updateContentLinks() {
  const path = join(ROOT, 'contenu.html');
  let html = readFileSync(path, 'utf8');
  for (const chapter of chapters) {
    html = html.replace(
      `prototypes/cours/maths-specialite/${chapter.slug}/index.html#guides`,
      `prototypes/cours/maths-specialite/${chapter.slug}/td.html`,
    );
  }
  writeFileSync(path, html, 'utf8');
}

for (const chapter of chapters) {
  writeChapterFiles(chapter);
  updateCourseIndexLinks(chapter);
}
updateContentLinks();

console.log(`Generated ${chapters.length} TD pages with ${chapters.length * 40} exercises.`);
