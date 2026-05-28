# Regles layout no-scroll

## Lecteur et action attendue

Ce document s'adresse a un agent ou a un futur mainteneur qui doit transformer une page app en interface tenant dans la fenetre. Apres lecture, il doit pouvoir adapter une page comme Planning sans inventer une nouvelle strategie responsive.

## Quand utiliser cette regle

Utiliser cette regle seulement pour une page app ou cockpit qui doit fonctionner comme une interface complete dans le viewport : progression, planning, objectif, abonnement ou autre ecran de pilotage.

Ne pas l'appliquer aux cours, documents longs, pages marketing, pages de contenu ou pages ou le scroll fait partie de l'experience normale. Un cours doit pouvoir respirer, derouler ses exemples et afficher ses corrections.

La regle est donc activee au cas par cas. La question a poser avant de commencer est simple : est-ce que l'utilisateur doit voir tous les blocs essentiels de l'ecran sans faire defiler la page sur desktop ? Si oui, appliquer ce contrat.

## Contrat desktop

- Le viewport est la contrainte principale : la page doit tenir en `100dvh`.
- Le scroll global doit etre bloque sur `html`, `body`, l'app, la zone principale et la vue active.
- Les conteneurs flex ou grid doivent recevoir `min-height: 0` et `min-width: 0`, sinon ils refusent de reduire et creent un overflow cache.
- La vue doit etre une grille verticale stable : header compact, zone principale flexible, bloc secondaire compact.
- Les espacements doivent passer par des variables responsive : paddings, gaps, ombres, hauteurs de panneaux et tailles de zones visuelles.
- Utiliser `clamp()` pour reduire progressivement les dimensions sur laptop avant de basculer en mobile.
- Les blocs essentiels restent visibles. Les textes d'explication, legendes et notes secondaires peuvent etre raccourcis ou masques.
- Ne pas compter sur `overflow: auto` comme solution desktop. Si un bloc essentiel impose un scroll, il faut compacter la composition.

## Contrat mobile

Mobile n'est pas seulement le desktop reduit. Sous le point de rupture choisi, la page peut redevenir empilee, plus lineaire et plus compacte.

- Passer les grilles larges en une seule colonne.
- Prevoir l'espace de la navigation basse et de la zone sure avec `env(safe-area-inset-bottom)`.
- Garder des cibles tactiles correctes pour les liens, boutons, onglets et controles.
- Masquer d'abord les textes secondaires : sous-titres, paragraphes d'aide, notes de prototype, legendes redondantes.
- Reduire les paddings, gaps et titres sans rendre les informations principales illisibles.
- Si un tableau ou une grille dense ne peut pas rester lisible, fournir une vue mobile adaptee plutot qu'un tableau scrolle horizontalement.

## Contenu et composants denses

Le contenu doit etre classe avant de toucher au CSS.

- Indispensable : titre, action principale, donnees clefs, controles necessaires, resume ou preuve de progression.
- Compressible : descriptions, metadonnees, aides, notes, legendes, microcopy.
- Deplacable : details, explications longues, informations qui peuvent vivre sur une autre page ou dans un etat revele.

Pour un graphe, un calendrier ou une zone calculee, mesurer la taille reelle du conteneur et rendre le dessin depuis cette taille. Ne pas garder une hauteur fixe pensee pour un seul ecran.

Pour les libelles longs, preferer `minmax(0, 1fr)`, `max-width: 100%`, `white-space` choisi explicitement, et des tailles bornees. Le texte ne doit pas agrandir son parent jusqu'a casser l'ecran.

## Verification obligatoire

Verifier la page avec plusieurs viewports : desktop large, desktop moyen, laptop, tablette et mobile etroit.

La verification doit confirmer :

- `window.scrollY` reste a `0` apres une tentative de scroll ;
- pas d'overflow horizontal global ;
- pas d'overflow vertical global sur desktop no-scroll ;
- les blocs essentiels sont entierement visibles ;
- les composants denses rendent du contenu non vide ;
- aucun texte incoherent ne chevauche un autre bloc ;
- aucune erreur console ;
- `git diff --check` passe ;
- `npm run verify` passe si la page appartient au parcours verifie.

Si une page echoue seulement sur un petit desktop, ne pas ajouter un scroll. Reduire d'abord les variables de densite, la hauteur des zones visuelles, les textes secondaires et les gaps. Le passage mobile arrive seulement quand l'interface devient trop petite pour rester lisible.
