# Diagnostic layout — Second degré

Date : 2026-05-19

## Symptômes observés

- En desktop `1366x900`, les cartes du bloc "Ce chapitre se gagne en 4 réflexes" étaient trop étroites.
- Les textes longs comme "canonique, discriminant, factorisée" dépassaient de leur carte.
- En mobile, la sidebar du plan apparaissait ouverte avant le contenu et repoussait le début réel du cours.
- La sidebar était dans la grille centrée du contenu, donc il restait un écart entre la bordure gauche de la page et le plan.
- La page n'avait pas d'overflow horizontal global, mais certains composants internes avaient `scrollWidth > clientWidth`.
- Après le premier correctif, la sidebar était collée au bord gauche, mais elle démarrait repliée au chargement.
- En mode replié, le bouton rond était trop à gauche : on ne voyait qu'une partie du cercle.
- La sidebar avait son propre scroll interne, ce qui donnait une navigation moins classique et moins stable.

## Cause racine

Le bloc `.course-overview` utilisait deux colonnes, puis `.overview-steps` divisait la deuxième colonne en quatre cartes :

```css
.course-overview {
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
}

.overview-steps {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
```

Dans la largeur disponible, chaque carte descendait autour de 85 px. C'est insuffisant pour des libellés pédagogiques français, même avec des textes courts.

La sidebar avait aussi un comportement desktop appliqué par défaut : elle restait ouverte sur mobile tant que l'utilisateur ne la repliait pas. Comme elle appartenait au layout `.course-layout` centré, elle ne pouvait pas toucher le bord gauche de la page.

Le premier repli fixe utilisait ensuite une translation horizontale :

```css
transform: translateX(calc(-1 * (var(--course-sidebar-width) - var(--course-sidebar-rail))));
```

Ce mécanisme cachait presque toute la sidebar hors écran. Le rail visible dépendait donc d'un calcul entre la largeur totale, la largeur de rail et la position du bouton. Résultat : le bouton circulaire pouvait être coupé par le bord gauche de la fenêtre.

La règle `overflow: auto` ajoutait un deuxième problème : au lieu d'avoir une vraie sidebar pleine hauteur, le plan devenait une petite zone scrollable indépendante.

## Correctifs appliqués

- La grille principale du cours donne plus de largeur au contenu et réduit l'espace perdu entre sidebar et cours.
- La sidebar est sortie du flux visuel du cours : elle est maintenant fixe, collée à `left: 0`, avec un rail visible en mode replié.
- Le repli ne se fait plus par translation hors écran : la sidebar garde `left: 0` et change seulement de largeur.
- Au chargement, la sidebar est ouverte par défaut. Le bouton permet ensuite de la pousser en rail réduit.
- Fermée, la sidebar garde toute la hauteur de l'écran et une largeur suffisante pour afficher le cercle complet du bouton.
- Le rail peut se rouvrir au hover après fermeture, mais le clic de fermeture verrouille temporairement le hover jusqu'à la sortie de souris pour éviter une réouverture immédiate.
- Le scroll interne est supprimé : le contenu du plan est compacté et les éléments secondaires peuvent disparaître sur petite hauteur.
- Le bloc réflexes passe en grille 2x2 avec une largeur minimale par carte.
- Les textes des cartes ont `min-width: 0` et `overflow-wrap: anywhere` pour éviter les débordements internes.
- Après clic sur une section en mobile, la sidebar se replie automatiquement.

## Règle de prévention

Ne pas mettre quatre cartes textuelles en ligne dans une colonne secondaire. Pour des cartes de méthode ou de réflexe :

- desktop : 2 colonnes maximum sauf si chaque carte dispose d'au moins 150 px ;
- tablette/mobile : 1 ou 2 colonnes selon la largeur réelle ;
- toujours vérifier `scrollWidth > clientWidth` sur les cartes, pas seulement l'overflow global de la page.

Pour les prochains plans de cours :

- une sidebar de navigation doit être soit complètement dans le contenu, soit franchement collée au bord gauche ;
- si elle est repliable, garder un rail constant et ne pas réserver une colonne vide dans la grille du cours ;
- éviter de replier une sidebar par translation hors écran quand un bouton doit rester visible ;
- préférer un repli par largeur : état ouvert large, état fermé étroit, toujours `left: 0` ;
- ne pas utiliser `overflow: auto` pour un plan de chapitre court ; compacter la liste ou masquer les éléments secondaires ;
- vérifier l'état ouvert, replié, hover/focus et mobile.
