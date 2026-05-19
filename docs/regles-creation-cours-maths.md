# Règles de création des cours de maths

## Lecteur et action attendue

Ce document sert à créer ou relire un chapitre de maths avant publication.

Après lecture, un auteur ou un agent IA doit pouvoir vérifier si un cours est vraiment utile pour l'élève, s'il favorise la rétention, et s'il crée assez de valeur perçue pour soutenir la monétisation.

## Règle mère

Le site doit baisser la difficulté d'entrée, pas l'exigence finale.

Un bon chapitre ne dit pas : "les maths sont faciles". Il dit plutôt : "on va rendre l'effort lisible, progressif et rentable".

L'élève doit sentir trois choses :

- je comprends mieux qu'avec un PDF brut ;
- je sais quoi faire maintenant ;
- si je continue, je peux vraiment monter vers le niveau contrôle puis 20/20.

## Attention aux mauvaises prémisses

### Ne pas partir de "le lycée est simple"

Le contenu peut paraître simple à quelqu'un qui maîtrise déjà les abstractions. Pour un élève moyen, la difficulté vient souvent de la charge mentale :

- symboles ;
- vocabulaire ;
- choix de méthode ;
- enchaînement des étapes ;
- rédaction ;
- stress face à l'exercice complet.

La bonne prémisse est :

> Le lycée peut devenir simple si l'apprentissage est bien séquencé.

### Ne pas promettre 20/20 comme garantie

Le 20/20 est une ambition pédagogique interne, pas une promesse commerciale garantie.

On ne contrôle pas le professeur, le sujet, le barème exact, le stress ou le temps de travail réel. La promesse visible doit rester crédible :

> Tu sais quoi maîtriser, tu t'entraînes jusqu'au niveau contrôle, puis tu montes vers le niveau 20/20.

## Règles pédagogiques obligatoires

### 1. Combattre l'illusion de compréhension

Un élève peut lire une correction et croire qu'il sait faire. C'est souvent faux.

Chaque notion doit donc forcer l'élève à :

- répondre sans regarder immédiatement la correction ;
- compléter une étape manquante ;
- refaire seul un exercice proche ;
- choisir la méthode dans un énoncé mélangé ;
- rédiger une réponse propre.

Un cours qui se lit bien mais ne force jamais l'élève à produire quelque chose est insuffisant.

### 2. Ajouter des portes entre les niveaux

Les catégories visibles sont utiles, mais elles peuvent mentir si l'élève saute trop vite au niveau supérieur.

Avant un bloc `20/20`, il faut idéalement une porte simple :

> Réussis 2 exercices de niveau contrôle sans aide avant de passer au défi 20/20.

Ces portes ne doivent pas devenir un système de scoring lourd. Elles servent à éviter le découragement et les fausses victoires.

### 3. Enseigner le choix de méthode

La difficulté n'est pas seulement de connaître une méthode. C'est de savoir quand l'utiliser.

Chaque chapitre doit contenir des questions du type :

- faut-il factoriser ou utiliser le discriminant ?
- faut-il étudier un signe ou résoudre une équation ?
- faut-il dériver, dresser un tableau, ou lire graphiquement ?
- quelle information de l'énoncé déclenche la méthode ?

Ce bloc est un différenciateur fort face aux PDF classiques.

### 4. Enseigner la rédaction notée

Pour viser les meilleures notes, il faut enseigner la copie attendue, pas seulement le résultat.

Les exercices importants doivent montrer :

- la réponse brouillon ;
- la réponse propre ;
- les étapes qui rapportent les points ;
- les erreurs qui peuvent coûter 0,5 ou 1 point ;
- la phrase finale attendue.

Un élève qui a le bon résultat mais une rédaction floue n'est pas encore au niveau 20/20.

### 5. Utiliser les fun facts avec discipline

Un fun fact est accepté seulement s'il aide à apprendre.

Il doit au moins remplir une fonction :

- rendre une notion moins intimidante ;
- créer une image mentale utile ;
- expliquer pourquoi une méthode existe ;
- aider à retenir un piège ;
- donner envie de continuer.

S'il ne fait que décorer le cours, il doit être supprimé.

### 6. Ne pas rester enfermé dans le chapitre

Les notes montent quand l'élève retient dans le temps et sait reconnaître la bonne méthode.

Chaque chapitre doit donc préparer des révisions mélangées avec d'autres chapitres :

- second degré + dérivation ;
- suites + exponentielle ;
- probabilités + variables aléatoires ;
- trigonométrie + produit scalaire.

La révision mélangée doit arriver après l'apprentissage de base, pas au tout début.

### 7. Ne jamais comprimer les formules KaTeX

Une formule est un contenu à lire, pas une image à faire rentrer dans une case.

Les formules KaTeX doivent donc :

- utiliser toute la largeur disponible du bloc ;
- passer en hauteur quand elles sont longues ;
- rester à une taille lisible, y compris sur mobile ;
- éviter tout scroll horizontal ;
- être écrites dans le langage mathématique adapté, avec des symboles définis avant usage ;
- garder les mêmes notations dans la méthode, l'exemple et la correction.

À faire :

- couper un calcul long avec `aligned` ;
- séparer deux racines ou deux étapes dans deux blocs `\[...\]` ;
- remplacer un long enchaînement par une ligne de formule, puis une phrase courte, puis la ligne suivante ;
- donner plus de largeur au bloc si la formule est centrale ;
- numéroter ou labelliser clairement les réponses quand une correction contient plusieurs questions, plusieurs cas ou plusieurs résultats ;
- écrire une correction en parties visibles : "1.", "2.", "Conclusion", "Cas 1", "Cas 2", ou équivalent ;
- séparer trois réponses consécutives en blocs ou lignes commentées, au lieu de les empiler dans une seule équation.

À éviter :

- `overflow-x: auto` sur une formule ;
- réduire fortement la taille de police pour faire rentrer une formule ;
- mettre une formule importante dans une carte ou une colonne trop étroite ;
- aligner deux calculs longs avec `\qquad` si cela crée un débordement ;
- laisser le navigateur couper une équation au hasard ;
- donner plusieurs réponses finales d'affilée sans phrase, sans numéro, ni repère visuel.

Dans une correction, la structure doit suivre celle de l'exercice. Si l'énoncé demande 1, 2 et 3, la correction affiche 1, 2 et 3. Si une étape donne plusieurs solutions, chacune doit être identifiable.

### 8. Construire un cours plus consistant que le prototype minimal

Un chapitre doit avoir plus de substance mathématique qu'une page de motivation.

La version attendue doit inclure :

- les définitions exactes et les hypothèses ;
- les propriétés ou théorèmes utiles, avec leurs cas ;
- des exemples résolus qui utilisent les mêmes notations que la méthode ;
- des exercices proches des exemples, puis des exercices moins guidés ;
- des corrections qui expliquent pourquoi la méthode est choisie ;
- des pièges réels issus du chapitre, pas des avertissements génériques ;
- une rédaction notée qui montre les lignes attendues sur une copie.

La consistance se vérifie à la fin :

- les mêmes objets gardent le même nom dans la section, l'exemple et la correction ;
- une formule n'apparaît pas avant que ses lettres aient été définies ;
- une méthode annoncée est utilisée dans au moins un exemple résolu ;
- un exercice de contrôle renvoie à une compétence réellement préparée avant ;
- le bloc `20/20` combine des compétences déjà travaillées, sans saut magique.

### 9. Utiliser les sources PDF comme colonne vertébrale

Pour la Première spécialité, les PDFs validés sont listés dans `lien/premiere/math.md`.

La logique de travail est volontairement conservatrice : on part d'un cours d'expert, on en extrait le plan, puis on reprend quasiment toute sa substance mathématique. Le rôle du cours web n'est pas de remplacer l'expertise du PDF par une leçon générique. Il est d'améliorer ce que le PDF ne peut pas faire aussi bien : lever les ambiguïtés, séquencer l'effort, faire produire l'élève, masquer les corrections, faire choisir une méthode et ajouter des visuels exacts.

Le rôle des sources est obligatoire :

- Maths91 sert de base principale pour la couverture du programme, les définitions, les propriétés et les exercices ;
- Maths-et-tiques complète quand son approche rend une idée plus intuitive, donne un exemple utile, ou clarifie une méthode ;
- les exercices du cours web doivent venir des PDFs, ou être des variantes proches construites pour la progression interactive ;
- si une notion importante du PDF n'est pas reprise, la raison doit être notée dans les notes de génération du chapitre.

Avant d'écrire la page, l'agent doit produire une carte de couverture courte :

1. notions à traiter ;
2. définitions/propriétés à conserver ;
3. méthodes et exemples résolus ;
4. exercices à adapter ;
5. erreurs fréquentes ;
6. graphes exacts nécessaires ;
7. éléments volontairement exclus de cette version.

Le but n'est pas de copier les PDFs. Le but est de garder leur densité mathématique et leur couverture, puis d'ajouter ce que le PDF ne peut pas faire : questions immédiates, choix de méthode, corrections masquées, graphes exacts et progression active.

### 10. Viser zéro ambiguïté

Un cours peut être long s'il est clair. Il ne doit pas être court au prix d'une ambiguïté.

L'élève ne doit jamais avoir à deviner :

- ce que représente une lettre ou un symbole ;
- pourquoi une méthode est choisie plutôt qu'une autre ;
- quelle ligne justifie la ligne suivante ;
- où commence et où finit un cas ;
- quelle est la réponse finale attendue ;
- ce qu'il faut écrire sur une copie.

Si un passage reste ambigu, l'auteur doit ajouter ce qui manque :

- une phrase d'explication ;
- une étape intermédiaire de calcul ;
- une mini-définition avant la formule ;
- une métaphore courte si elle rend l'idée plus intuitive ;
- un exemple numérique simple avant le cas général ;
- une image imagegen pour une intuition non exacte, sans axes, formule, courbe ou label mathématique critique.

La règle est : trop expliquer vaut mieux que laisser un trou logique. Ensuite seulement, on coupe les répétitions qui n'ajoutent rien.

## Mécanique par notion

Chaque notion importante doit suivre cette séquence :

1. **Voir l'idée**  
   Une intuition courte, une image mentale ou une situation simple.

2. **Lire la méthode**  
   Un exemple résolu proprement, avec les étapes visibles.

3. **Compléter une étape manquante**  
   L'élève ne refait pas tout, mais il produit déjà une partie du raisonnement.

4. **Refaire seul un exercice proche**  
   Même type d'exercice, chiffres ou contexte légèrement changés.

5. **Identifier le piège**  
   Cas limite, confusion fréquente, erreur de signe, mauvaise méthode.

6. **Choisir la méthode dans un énoncé mélangé**  
   L'élève doit décider quoi faire avant de calculer.

7. **Rédiger comme en contrôle**  
   Réponse propre, phrases mathématiques, conclusion.

8. **Monter vers 20/20**  
   Exercice plus long, combiné, avec moins d'indices.

Cette mécanique transforme le cours en entraînement réel, pas en lecture agréable.

## Règles de rétention élève

La rétention ne vient pas d'une interface addictive. Elle vient du sentiment que revenir demain sert vraiment.

Un chapitre doit donc créer :

- une victoire rapide au début ;
- une difficulté réelle mais franchissable ;
- une preuve que l'élève progresse ;
- une suite claire à faire après la session ;
- une raison de revenir plus tard pour vérifier que c'est resté.

À la fin d'une session, l'élève doit voir :

- ce qu'il sait mieux faire ;
- ce qu'il doit revoir ;
- le prochain exercice recommandé ;
- pourquoi ce travail peut compter pour un contrôle.

Le bon signal n'est pas seulement le temps passé. Un élève peut rester longtemps parce qu'il est perdu. Les meilleurs signaux sont :

- question tentée avant correction ;
- exercice refait sans aide ;
- correction ouverte après tentative ;
- retour sur une erreur précédente ;
- passage réussi d'un exercice guidé à un exercice seul ;
- retour sur le site pour une révision mélangée ;
- lancement d'une série avant contrôle.

## Règles de monétisation

La monétisation doit venir de la valeur ressentie, pas d'une frustration artificielle.

Le gratuit doit prouver :

- que le cours est plus digeste qu'un PDF ;
- que les questions révèlent les fausses compréhensions ;
- que la correction aide vraiment ;
- que l'élève sait quoi faire ensuite.

Le payant peut porter sur :

- la suite complète du chapitre ;
- les exercices `Contrôle` et `20/20` ;
- les révisions mélangées entre chapitres ;
- les plans de révision selon les erreurs ;
- le suivi de progression ;
- les séries avant contrôle.

Le moment de paiement doit arriver après une preuve de valeur :

> Tu viens de comprendre, t'entraîner et voir ton prochain point faible. Pour continuer le plan complet, débloque la suite.

À éviter :

- bloquer avant que l'élève ait ressenti un progrès ;
- promettre une note garantie ;
- vendre de la quantité de contenu plutôt que de la clarté ;
- cacher les corrections essentielles juste pour frustrer.

Les bons moments pour proposer le payant :

- après une première victoire nette ;
- après un diagnostic qui révèle une faiblesse précise ;
- après un exercice corrigé qui donne envie de continuer ;
- après la fin d'un bloc gratuit qui annonce clairement la suite ;
- avant un contrôle, si le plan de révision devient concret.

Les mauvais moments :

- avant que l'élève ait compris la valeur du format ;
- pendant une erreur frustrante ;
- avant de montrer une vraie correction ;
- sous forme de promesse vague du type "deviens fort en maths".

## Différenciateur produit

Il existe déjà beaucoup de cours gratuits.

Le site gagne s'il fait ce que les PDF ne font pas :

- détecter les fausses compréhensions ;
- forcer la récupération active ;
- apprendre à choisir la méthode ;
- apprendre à rédiger pour gagner tous les points ;
- faire monter progressivement vers des exercices mélangés ;
- montrer à l'élève quoi revoir ensuite.

Le produit ne doit pas seulement être un meilleur cours. Il doit être un meilleur entraînement.

## Checklist avant publication

Avant de publier un chapitre, vérifier :

- le cours est découpé en blocs courts ;
- chaque notion importante a une question immédiate ;
- il existe au moins un exemple résolu par méthode ;
- l'aide disparaît progressivement ;
- l'élève doit refaire seul, pas seulement lire ;
- il y a des pièges explicites ;
- il y a des exercices de choix de méthode ;
- il y a une rédaction propre attendue ;
- les exercices `20/20` ne sont pas accessibles sans préparation ;
- les fun facts servent vraiment l'apprentissage ;
- la fin du chapitre recommande quoi revoir ;
- la suite du parcours donne une raison claire de revenir ;
- la valeur gratuite est suffisante pour donner confiance ;
- le paywall, s'il existe, arrive après une preuve de progrès.

## Critère de refus

Refuser ou retravailler un chapitre si :

- il ressemble à un PDF découpé en sections ;
- il donne l'impression de comprendre sans faire produire l'élève ;
- il promet trop directement une note ;
- il ne montre pas la rédaction attendue ;
- il ne contient pas de choix de méthode ;
- il ne prépare aucune révision mélangée ;
- il ajoute du contenu agréable mais non utile ;
- il ne donne pas à l'élève une raison concrète de revenir.
