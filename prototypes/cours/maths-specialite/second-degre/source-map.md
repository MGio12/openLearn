# Carte de couverture - Pilote Second degré

## Portée du pilote

Le chapitre existe désormais sous deux formes complémentaires :

- prototype vanilla : `prototypes/cours/maths-specialite/second-degre/index.html` et `td.html` ;
- pilote Astro + MDX isolé : `src/pages/cours/second-degre/index.mdx` et `src/pages/cours/second-degre/td.mdx`.

Le pilote Astro reprend le même périmètre mathématique, sans brancher la migration dans le site public.

## Notions reprises
- forme développée, factorisée et canonique
- discriminant, racines, racine double
- signe d’un trinôme et inéquations
- sommet, axe de symétrie, position relative
- somme et produit des racines

## Méthodes et exemples à conserver

- lecture des coefficients avec leur signe ;
- choix entre forme développée, canonique et factorisée ;
- calcul du discriminant et distinction des trois cas ;
- détermination du sommet et de l'axe de symétrie ;
- tableau de signes d'un trinôme ;
- somme et produit des racines ;
- position relative de deux courbes par le signe de \(f-g\) ;
- rédaction d'une inéquation de contrôle.

## Exercices et TD adaptés
- Automatismes courts pour forcer la récupération avant correction.
- Méthodes guidées avec corrigés détaillés sur les gestes structurants.
- Bloc "choisir la méthode" pour éviter l’application mécanique.
- Niveau contrôle puis cap 20/20, avec une porte d’entrée explicite.
- Révision mélangée pour reconnecter le chapitre aux autres notions de Première.

## Pièges et cas limites
- oublier le signe de \(b\)
- utiliser le discriminant alors qu’une factorisation immédiate existe
- inverser le signe du trinôme quand \(a<0\)
- confondre racine double et deux solutions

## Sources utilisées
- Maths91, cours et fiche d’exercices Second degré
- Maths-et-tiques, Second degré parties 1 et 2
- XyMaths, cours Second degré
- MathGM, parcours Second degré

## Graphes ou diagrammes exacts nécessaires
- orientation \(a>0\) / \(a<0\) ;
- trois cas du discriminant ;
- sommet et axe de symétrie ;
- signe de \(x^2-2x-15\) ;
- position relative d'une parabole et d'une droite.

Ces graphes sont rendus par JSXGraph dans le prototype vanilla et dans le pilote Astro. Aucun graphe n'est dessiné à la main.

## Éléments volontairement exclus
- Pas de recopie brute d’énoncés PDF.
- Pas de schéma mathématique approximatif dessiné à la main.
- Pas de corrigé visible par défaut : la tentative élève passe avant la lecture de la réponse.
- Pas d'intégration du pilote Astro dans les liens publics avant validation utilisateur.
