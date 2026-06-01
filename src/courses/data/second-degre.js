const r = String.raw;

export const courseSections = [
  { id: 'diagnostic', marker: '00', label: 'Diagnostic', agent: true },
  { id: 'formes', marker: '01', label: 'Formes' },
  { id: 'discriminant', marker: '02', label: 'Discriminant' },
  { id: 'sommet', marker: '03', label: 'Sommet' },
  { id: 'signe', marker: '04', label: 'Signe' },
  { id: 'somme-produit', marker: '05', label: 'Somme·produit' },
  { id: 'position-relative', marker: '06', label: 'Position' },
  { id: 'choix-methode', marker: '07', label: 'Choisir', agent: true },
  { id: 'redaction', marker: '08', label: 'Rédiger', agent: true },
  { id: 'pieges', marker: 'P', label: 'Pièges' },
  { id: 'guides', marker: 'G', label: 'Guidé' },
  { id: 'controle', marker: 'C', label: 'Contrôle' },
  { id: 'vingt-sur-vingt', marker: '20', label: '20/20' },
  { id: 'revision', marker: 'R', label: 'Révision' },
];

export const tdSections = [
  { id: 'objectifs', marker: '00', label: 'Objectifs' },
  { id: 'automatismes', marker: 'A', label: 'Automatismes' },
  { id: 'methodes-guidees', marker: 'G', label: 'Guidé' },
  { id: 'pieges', marker: 'P', label: 'Pièges' },
  { id: 'choix', marker: 'M', label: 'Choisir' },
  { id: 'controle', marker: 'C', label: 'Contrôle' },
  { id: 'vingt-sur-vingt', marker: '20', label: '20/20' },
  { id: 'revision', marker: 'R', label: 'Révision' },
  { id: 'sources', marker: 'S', label: 'Sources' },
];

export const heroSteps = [
  { verb: 'Voir', object: 'orientation, sommet, axe' },
  { verb: 'Choisir', object: 'canonique, discriminant, factorisée' },
  { verb: 'Résoudre', object: 'racines, signe, inéquations' },
  { verb: 'Rédiger', object: 'copie lisible et notée' },
];

export const tdHeroSteps = [
  { verb: 'Forme', object: 'à produire avant correction' },
  { verb: 'Racines', object: 'à produire avant correction' },
  { verb: 'Signe', object: 'à produire avant correction' },
  { verb: 'Rédaction', object: 'à produire avant correction' },
];

export const formChoiceCards = [
  {
    title: 'Forme développée',
    body: r`Elle donne directement \(a\), \(b\), \(c\), donc elle prépare le discriminant et le calcul d'images.`,
  },
  {
    title: 'Forme canonique',
    body: r`Elle donne le sommet \(S(\alpha;\beta)\), l'axe \(x=\alpha\), et l'extremum.`,
  },
  {
    title: 'Forme factorisée',
    body: r`Elle donne les racines \(x_1\) et \(x_2\), donc elle accélère équations et tableaux de signes.`,
  },
  {
    title: 'Même fonction',
    body: 'Changer de forme ne change pas la parabole : on choisit l’écriture qui rend la question facile.',
  },
];

export const methodChoiceCards = [
  {
    title: 'Maximiser / minimiser',
    body: r`Chercher le sommet : forme canonique ou \(\alpha=-\frac{b}{2a}\), puis \(\beta=f(\alpha)\).`,
  },
  {
    title: r`Résoudre \(f(x)=0\)`,
    body: 'Produit nul si la forme est déjà factorisée ; discriminant si aucune factorisation courte ne saute aux yeux.',
  },
  {
    title: 'Étudier un signe',
    body: 'Trouver les racines, les ranger, puis appliquer la règle : signe de a, sauf entre les racines.',
  },
  {
    title: 'Comparer deux courbes',
    body: r`Étudier le signe de \(f(x)-g(x)\), puis traduire le résultat en position relative.`,
  },
  {
    title: 'Construire une fonction',
    body: r`Si deux racines sont données, partir de \(a(x-x_1)(x-x_2)\), puis utiliser un point pour trouver \(a\).`,
  },
  {
    title: 'Vérifier deux racines',
    body: r`Utiliser \(x_1+x_2=-\frac{b}{a}\) et \(x_1x_2=\frac{c}{a}\) pour contrôler un résultat.`,
  },
];

export const sourceCards = [
  'Maths91, cours Second degré : définitions, discriminant, racines, signe, sommet et exercices de référence.',
  'Maths91, fiche d’exercices : automatismes, équations, inéquations et problèmes de contrôle.',
  'Maths-et-tiques, parties 1 et 2 : intuitions sur les formes, exemples et cas classiques.',
  'XyMaths et MathGM : compléments pour varier les énoncés, les pièges et les exercices de synthèse.',
];

export const agentContexts = {
  courseId: 'maths-specialite-premiere-second-degre-astro',
  courseTitle: 'Second degré',
  contexts: [
    {
      id: 'diagnostic-coefficients',
      sectionId: 'diagnostic',
      entryLabel: 'Diagnostic - coefficients',
      studentTask: 'Dans f(x)=2x^2-3x+1, écris les valeurs de a, b et c, puis explique le piège de signe à surveiller.',
      minimalContext: 'Un trinôme du second degré s’écrit f(x)=ax^2+bx+c avec a non nul. Les coefficients se lisent avec leur signe dans la forme développée.',
      expectedAnswer: 'a=2, b=-3 et c=1. Le piège est de garder le signe moins de b, notamment dans le discriminant.',
      commonMistakes: ['Lire b=3 au lieu de b=-3.', 'Répondre seulement les nombres sans expliquer le piège de signe.'],
      feedbackGoal: 'Repérer si l’élève sait lire les coefficients avec leurs signes et verbaliser le piège avant de calculer Delta.',
    },
    {
      id: 'choix-methode-inequation',
      sectionId: 'choix-methode',
      entryLabel: 'Choisir - inéquation',
      studentTask: 'Pour résoudre x^2-2x-15<0, indique la méthode à choisir avant de calculer et justifie pourquoi.',
      minimalContext: 'Pour une inéquation du second degré, on trouve d’abord les racines puis on utilise la règle du signe du trinôme.',
      expectedAnswer: 'Il faut trouver les racines, puis dresser le signe. Comme l’inéquation demande un signe, le résultat attendu est un intervalle.',
      commonMistakes: ['Calculer seulement les racines.', 'Oublier que les bornes sont exclues pour une inégalité stricte.'],
      feedbackGoal: 'Vérifier que l’élève choisit racines puis signe, et non un calcul de sommet.',
    },
    {
      id: 'redaction-inequation',
      sectionId: 'redaction',
      entryLabel: 'Rédiger - inéquation',
      studentTask: 'Rédige la résolution de l’inéquation -x^2+6x-5>=0 comme sur une copie de contrôle.',
      minimalContext: 'La rédaction attendue identifie a, b, c, calcule Delta, donne les racines, justifie le signe avec a, puis conclut.',
      expectedAnswer: 'a=-1, b=6, c=-5. Delta=16, racines 1 et 5. Comme a<0, le trinôme est positif entre les racines. S=[1;5].',
      commonMistakes: ['Écrire seulement Delta=16 et S=[1;5].', 'Mettre des crochets ouverts alors que l’inégalité est large.'],
      feedbackGoal: 'Diagnostiquer les traces de calcul, la justification du signe, les crochets et la phrase finale.',
    },
  ],
};

function ex(title, skill, level, statement, answer, hint = '', detail = null) {
  return { title, skill, level, statement, answer, hint, detail };
}

export const tdGroups = [
  {
    id: 'automatismes',
    title: 'Automatismes',
    intro: '10 exercices courts pour sécuriser les gestes de base.',
    exercises: [
      ex('Repérer les coefficients', r`identifier \(a\), \(b\), \(c\)`, 'auto', r`Dans \(f(x)=-3x^2+5x-7\), donner \(a\), \(b\) et \(c\).`, r`\(a=-3\), \(b=5\), \(c=-7\). Le signe appartient au coefficient.`, 'Le signe appartient au coefficient.'),
      ex('Calculer une image', 'évaluer un trinôme', 'auto', r`Pour \(f(x)=2x^2-4x+1\), calculer \(f(3)\).`, r`\(f(3)=2\times 9-12+1=7\).`),
      ex('Produit nul', 'résoudre une équation factorisée', 'auto', r`Résoudre \((x-5)(2x+3)=0\).`, r`\(x=5\) ou \(x=-\frac{3}{2}\).`, 'Un produit est nul si au moins un facteur est nul.'),
      ex('Discriminant direct', r`calculer \(\Delta\)`, 'auto', r`Calculer le discriminant de \(x^2-6x+5\).`, r`\(\Delta=(-6)^2-4\times 1\times 5=16\).`),
      ex('Deux racines', 'appliquer la formule des racines', 'auto', r`Résoudre \(x^2-6x+5=0\).`, r`Comme \(\Delta=16\), les racines sont \(1\) et \(5\).`),
      ex('Racine double', r`reconnaître \(\Delta=0\)`, 'auto', r`Résoudre \(4x^2-12x+9=0\).`, r`\(\Delta=0\), donc l’unique solution est \(x=\frac{12}{8}=\frac{3}{2}\).`),
      ex('Sommet en forme canonique', r`lire \((\alpha;\beta)\)`, 'auto', r`Donner le sommet de \(f(x)=-2(x-1)^2+7\).`, r`Le sommet est \(S(1;7)\).`),
      ex('Axe de symétrie', 'lire l’axe', 'auto', r`Pour \(f(x)=3(x+4)^2-2\), donner l’axe de symétrie.`, r`L’axe est la droite \(x=-4\).`),
      ex('Signe à partir des racines', r`utiliser le signe de \(a\)`, 'auto', r`Un trinôme a pour racines \(-2\) et \(4\), avec \(a>0\). Où est-il négatif ?`, r`Il est négatif sur \(]-2;4[\).`),
      ex('Somme et produit', 'contrôler deux racines', 'auto', r`Pour \(x^2-7x+10\), donner la somme et le produit des racines.`, r`La somme vaut \(7\) et le produit vaut \(10\), donc les racines sont \(2\) et \(5\).`),
    ],
  },
  {
    id: 'methodes-guidees',
    title: 'Méthodes guidées',
    intro: '8 exercices où l’aide disparaît progressivement.',
    exercises: [
      ex('Résolution guidée', 'résoudre avec le discriminant', 'guide', r`Résoudre \(2x^2-5x-3=0\) en écrivant coefficients, discriminant, racines.`, r`Les solutions sont \(-\frac{1}{2}\) et \(3\).`, r`Commence par \(a=2\), \(b=-5\), \(c=-3\).`, [r`On a \(a=2\), \(b=-5\), \(c=-3\).`, r`\(\Delta=(-5)^2-4\times 2\times(-3)=49\).`, r`Donc \(x_1=\frac{5-7}{4}=-\frac{1}{2}\) et \(x_2=\frac{5+7}{4}=3\).`]),
      ex('Passer en forme canonique', 'compléter le carré', 'guide', r`Écrire \(x^2-8x+11\) sous forme canonique.`, r`\(x^2-8x+11=(x-4)^2-5\).`, r`Compare avec \(x^2-8x+16\).`),
      ex('Étudier un signe', 'dresser un tableau de signe', 'guide', r`Résoudre \(x^2-3x-10\leq 0\).`, r`Les racines sont \(-2\) et \(5\). Comme \(a>0\), la solution est \([-2;5]\).`),
      ex('Position relative', 'ramener à un trinôme', 'guide', r`Comparer \(f(x)=x^2+2x+1\) et \(g(x)=3x+5\). Pour quels \(x\) a-t-on \(f(x)\geq g(x)\) ?`, r`On résout \(x^2-x-4\geq 0\). Les solutions sont \(x\leq\frac{1-\sqrt{17}}{2}\) ou \(x\geq\frac{1+\sqrt{17}}{2}\).`),
      ex('Sommet et extremum', 'lire la forme canonique', 'guide', r`Pour \(f(x)=-3(x+2)^2+12\), donner le maximum et l’abscisse où il est atteint.`, r`Le maximum vaut \(12\), atteint pour \(x=-2\).`),
      ex('Factorisation connue', 'éviter un calcul inutile', 'guide', r`Factoriser \(x^2+x-12\), puis résoudre \(x^2+x-12=0\).`, r`\(x^2+x-12=(x+4)(x-3)\), donc \(x=-4\) ou \(x=3\).`),
      ex('Paramètre simple', 'imposer une racine', 'guide', r`Déterminer \(m\) pour que \(2\) soit racine de \(x^2+mx-6\).`, r`On impose \(4+2m-6=0\), donc \(m=1\).`),
      ex('Rédaction notée', 'écrire une solution complète', 'guide', r`Rédiger proprement la résolution de \(3x^2+2x-1=0\).`, r`Les solutions sont \(-1\) et \(\frac{1}{3}\).`, '', [r`Copie propre : \(a=3\), \(b=2\), \(c=-1\). On calcule \(\Delta=2^2-4\times 3\times(-1)=16\).`, r`Comme \(\Delta>0\), \(x_1=\frac{-2-4}{6}=-1\) et \(x_2=\frac{-2+4}{6}=\frac{1}{3}\).`, 'Erreur qui coûte des points : écrire seulement les deux nombres sans préciser le discriminant ni la conclusion.']),
    ],
  },
  {
    id: 'pieges',
    title: 'Pièges classiques',
    intro: '6 exercices pour repérer les erreurs qui coûtent des points.',
    exercises: [
      ex(r`Signe de \(b\)`, 'éviter une erreur de discriminant', 'trap', r`Un élève calcule \(\Delta=5^2-4\times2\times3\) pour \(2x^2-5x+3\). Est-ce correct ?`, r`Non, ici \(b=-5\). Il faut écrire \(\Delta=(-5)^2-4\times2\times3=1\).`),
      ex('Racine double', 'ne pas inventer deux solutions', 'trap', r`Combien de solutions a \(9x^2-6x+1=0\) ?`, r`Une seule : \(x=\frac{1}{3}\), car \(\Delta=0\).`),
      ex('Inégalité stricte', 'traiter les bornes', 'trap', r`Résoudre \((x-1)(x+2)<0\).`, r`La solution est \(]-2;1[\). Les bornes sont exclues car l’inégalité est stricte.`),
      ex(r`Signe de \(a<0\)`, 'inverser le tableau correctement', 'trap', r`Un trinôme de coefficient \(a<0\) a pour racines \(1\) et \(6\). Où est-il positif ?`, r`Il est positif entre les racines : \(]1;6[\).`),
      ex('Forme canonique', r`ne pas changer le signe de \(\alpha\)`, 'trap', r`Dans \(f(x)=2(x+3)^2-8\), un élève annonce \(S(3;-8)\). Corriger.`, r`Le sommet est \(S(-3;-8)\), car \(x+3=x-(-3)\).`),
      ex('Méthode trop lourde', 'repérer une factorisation', 'trap', r`Pourquoi le discriminant n’est pas le meilleur départ pour \(x^2-9=0\) ?`, r`Parce que \(x^2-9=(x-3)(x+3)\). Les solutions se lisent directement : \(-3\) et \(3\).`),
    ],
  },
  {
    id: 'choix',
    title: 'Choisir la méthode',
    intro: '5 exercices où il faut décider avant de calculer.',
    exercises: [
      ex('Forme utile 1', 'choisir avant de calculer', 'choice', r`Pour trouver le sommet de \(f(x)=5(x-2)^2-11\), quelle forme utilises-tu ?`, r`La forme canonique, car elle donne directement \(S(2;-11)\).`),
      ex('Forme utile 2', 'choisir entre factoriser et discriminer', 'choice', r`Pour résoudre \(x^2-4x=0\), factorisation ou discriminant ?`, r`Factorisation : \(x(x-4)=0\), donc \(x=0\) ou \(x=4\).`),
      ex('Inéquation', 'choisir tableau de signe', 'choice', r`Pour résoudre \(2x^2-8x+6>0\), quelle méthode déclenches-tu ?`, r`Racines puis tableau de signe, car on demande un intervalle de valeurs de \(x\).`),
      ex('Position de courbes', 'ramener à une différence', 'choice', r`Pour comparer deux courbes \(f\) et \(g\), quel objet étudies-tu ?`, r`On étudie le signe de \(f(x)-g(x)\).`),
      ex('Racines mentalement', 'utiliser somme-produit', 'choice', r`Pour \(x^2-9x+20\), quelle méthode rapide peut remplacer le discriminant ?`, r`Somme-produit : \(4+5=9\) et \(4\times5=20\), donc racines \(4\) et \(5\).`),
    ],
  },
  {
    id: 'controle',
    title: 'Niveau contrôle',
    intro: '6 exercices à faire sans aide visible.',
    exercises: [
      ex('Contrôle 1', 'résoudre et conclure', 'control', r`Résoudre \(4x^2-4x-3=0\).`, r`\(\Delta=64\), donc \(x=-\frac{1}{2}\) ou \(x=\frac{3}{2}\).`),
      ex('Contrôle 2', 'signe du trinôme', 'control', r`Résoudre \(-x^2+5x-6\geq 0\).`, r`Les racines sont \(2\) et \(3\). Comme \(a<0\), la solution est \([2;3]\).`),
      ex('Contrôle 3', 'forme canonique', 'control', r`Mettre \(2x^2+12x+13\) sous forme canonique et donner le minimum.`, r`\(2x^2+12x+13=2(x+3)^2-5\). Le minimum vaut \(-5\).`),
      ex('Contrôle 4', 'position relative', 'control', r`Résoudre \(x^2+1<2x+4\).`, r`On obtient \(x^2-2x-3<0\), donc \(-1<x<3\).`),
      ex('Contrôle 5', 'paramètre', 'control', r`Déterminer \(m\) pour que \(x^2+mx+9\) ait une racine double.`, r`Il faut \(\Delta=m^2-36=0\), donc \(m=-6\) ou \(m=6\).`),
      ex('Contrôle 6', 'rédaction complète', 'control', r`Étudier le signe de \(3x^2-12x+9\) sur \(\mathbb{R}\).`, r`\(3x^2-12x+9=3(x-1)(x-3)\). Le signe est positif sur \(]-\infty;1]\cup[3;+\infty[\) et négatif sur \([1;3]\), avec zéros en \(1\) et \(3\).`),
    ],
  },
  {
    id: 'vingt-sur-vingt',
    title: 'Cap 20/20',
    intro: '3 exercices plus longs, seulement après les blocs précédents.',
    gate: 'Réussis au moins deux exercices de niveau contrôle sans regarder le corrigé. Le cap 20/20 n’est pas un raccourci : il combine les réflexes précédents.',
    exercises: [
      ex('20/20 1', 'enchaîner sommet et signe', 'twenty', r`Soit \(f(x)=-2x^2+8x-5\). Donner son maximum, puis résoudre \(f(x)\geq 1\).`, r`\(f(x)=-2(x-2)^2+3\), maximum \(3\). L’inéquation donne \((x-2)^2\leq 1\), donc \(x\in[1;3]\).`),
      ex('20/20 2', 'deux courbes et paramètre', 'twenty', r`Pour quelles valeurs de \(m\) l’équation \(x^2-4x+m=0\) admet-elle deux solutions distinctes ?`, r`\(\Delta=16-4m\). Deux solutions distinctes si \(\Delta>0\), donc \(m<4\).`),
      ex('20/20 3', 'problème d’aire', 'twenty', r`Un rectangle a pour périmètre \(20\) et pour largeur \(x\). Écrire son aire, puis trouver la largeur qui donne l’aire maximale.`, r`La longueur vaut \(10-x\). L’aire est \(A(x)=x(10-x)=-x^2+10x\). Son maximum est atteint pour \(x=5\).`),
    ],
  },
  {
    id: 'revision',
    title: 'Révision mélangée',
    intro: '2 exercices qui mélangent ce chapitre avec un autre réflexe.',
    exercises: [
      ex('Révision dérivation', 'relier sommet et dérivée', 'revision', r`Pour \(f(x)=x^2-6x+8\), calculer \(f'(x)\), puis retrouver l’abscisse du sommet.`, r`\(f'(x)=2x-6\). Elle s’annule en \(x=3\), l’abscisse du sommet.`),
      ex('Révision suites', 'modéliser une suite quadratique', 'revision', r`On pose \(u_n=n^2-5n+4\). Résoudre \(u_n=0\) pour \(n\in\mathbb{N}\).`, r`\(n^2-5n+4=(n-1)(n-4)\). Donc \(n=1\) ou \(n=4\).`),
    ],
  },
];
