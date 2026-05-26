# Master brief onboarding - Objectif Lycée

## Lecteur et action attendue

Ce document est la source de vérité pour créer le fil de fer onboarding.

Il est écrit pour un designer produit, un agent IA ou un développeur frontend qui reprend le sujet sans contexte oral. Après lecture, il doit pouvoir produire l'expérience complète sans redemander :

- l'intention produit ;
- la sensation visuelle attendue ;
- la structure écran par écran ;
- le rôle du panneau de profil personnalisé ;
- les textes visibles ;
- les données à capturer ;
- la logique de personnalisation ;
- le moment exact du paywall ;
- les règles d'essai gratuit ;
- les événements analytics ;
- les critères de qualité.

Le format cible est un master brief. Il ne décrit pas encore le code final, mais il doit être assez précis pour guider le wireframe, la rédaction, la hiérarchie UI, les états responsives et les comportements.

## Décisions verrouillées

- Direction UX : diagnostic guidé avec un profil qui se construit petit à petit.
- Direction visuelle : carnet premium.
- Modèle commercial : hard paywall après preuve de valeur.
- Offre : essai gratuit 3 jours.
- Pendant l'essai : aucun prélèvement pendant 3 jours.
- Après l'essai : prélèvement automatique si l'utilisateur n'annule pas.
- Annulation : résiliation possible en 1 clic avant le prélèvement.
- Ancienne logique à ne pas reprendre : missions gratuites avant abonnement.

Des mentions d'une ancienne offre de missions gratuites peuvent exister dans de vieux documents ou écrans du prototype, mais elles ne font pas partie de ce fil de fer onboarding. Le parcours décrit ici remplace cette logique par un essai gratuit de 3 jours avec hard paywall.

## Vision produit

Objectif Lycée ne doit pas se présenter comme une bibliothèque de contenus, ni comme une app de motivation générique.

L'idée centrale :

> Tu peux travailler beaucoup... et viser le mauvais endroit.

Le problème n'est pas que l'élève ne fait rien. Le problème est souvent qu'il travaille dans le flou :

- il révise ce qui rassure, pas ce qui rapporte ;
- il passe du temps sur une matière sans savoir quel blocage attaquer ;
- il lit des cours sans produire de trace ;
- il confond "travailler longtemps" et "travailler juste" ;
- il culpabilise alors qu'il a surtout besoin d'une meilleure décision.

Objectif Lycée doit être vécu comme un outil de décision quotidienne :

> Tu réponds à quelques questions. On comprend ton profil. On choisit une mission courte, justifiée, faisable aujourd'hui.

La promesse n'est pas magique. L'app ne promet pas une note, une école, une mention ou une transformation immédiate. Elle promet une décision de travail plus claire, un cadre plus stable et une première action qui évite de se disperser.

## Promesse élève

La promesse visible pendant l'onboarding :

> En 2 minutes, tu obtiens une mission utile pour aujourd'hui, expliquée à partir de ton profil.

Ce que l'élève doit comprendre :

- la mission n'est pas choisie au hasard ;
- la mission tient compte de sa classe, sa matière sous pression, son blocage, son niveau ressenti et son temps réel ;
- le résultat attendu est concret ;
- l'app vend la continuité personnalisée, pas une pile de pages en plus.

Formulation à garder en tête :

> Gratuit avant paywall : comprendre pourquoi cette mission est la bonne. Payant après essai : garder le plan quotidien personnalisé qui s'adapte.

## Ce que l'interface doit faire ressentir

L'expérience doit faire naître quatre sensations, dans cet ordre :

1. "On me comprend."
2. "Mon profil devient concret."
3. "La mission n'est pas sortie au hasard."
4. "Je sais ce que je gagne avant de payer."

Chaque écran doit renforcer au moins une de ces sensations. Si un écran ne fait que collecter une donnée sans améliorer la clarté ressentie, il doit être simplifié ou déplacé.

## Principes onboarding

- L'onboarding n'est pas un formulaire d'inscription. C'est une preuve progressive de valeur.
- Les questions servent à produire une décision, pas à remplir un CRM.
- Le parcours part de l'élève, de son urgence et de son blocage, pas du catalogue de fonctionnalités.
- Chaque réponse doit modifier visiblement le profil en construction.
- La première victoire est une mission claire, faisable aujourd'hui, avec une trace attendue.
- Le paywall arrive seulement après diagnostic, mission, justification et conseil contextualisé.
- Le ton reste sérieux, calme, direct, au tutoiement.
- L'élève ne doit jamais être culpabilisé.
- Aucun texte ne doit garantir une note, une école, une mention ou un 20/20.
- Les placeholders de témoignages doivent rester explicitement marqués comme placeholders.
- Le rythme doit être rapide : une idée par écran, une action claire, pas de mur de texte.

## Direction visuelle - Carnet premium

L'onboarding doit ressembler à un carnet de travail sérieux et premium, pas à une app SaaS froide, ni à une interface enfantine.

### Matière visuelle

- Fond papier chaud, légèrement texturé.
- Grille ou lignes de carnet très discrètes.
- Bordures noires nettes.
- Ombres dures et courtes, comme des feuilles posées sur un bureau.
- Touches de stabilo pour les éléments importants : réponse validée, ligne de profil remplie, mission recommandée, date de prélèvement.
- Couleurs sobres, contrastées, avec une sensation studieuse.
- Typographie lisible, avec une hiérarchie claire entre titre, question, choix et annotations.

### Ce qu'il faut éviter

- Dégradés violet/bleu de SaaS générique.
- Glassmorphism, flous décoratifs, bulles abstraites.
- Gamification enfantine.
- Icônes trop ludiques.
- Cartes trop arrondies.
- Look "questionnaire administratif".
- Témoignages ou badges qui sonnent faux.

### Détails de style attendus

- Les choix ressemblent à des lignes de carnet cliquables ou à des fiches courtes.
- Le profil en construction ressemble à une fiche personnelle annotée.
- Les éléments validés peuvent recevoir un trait stabilo, une coche discrète ou un tampon sobre.
- La génération ressemble à une courte annotation en train de s'écrire, pas à un loader technique.
- Le paywall ressemble à une page de carnet signée : décision claire, prix clair, date claire.

### Micro-animations sobres

Les animations doivent confirmer que l'élève avance, sans ralentir le flow :

- au clic sur une réponse : sélection nette, léger surlignage, puis transition ;
- quand une ligne du profil se remplit : apparition courte avec statut visible ;
- pendant la génération : 4 ou 5 lignes s'activent successivement ;
- à l'apparition de la mission : le lien entre réponse et mission doit être visuel ;
- au paywall : le prix, la date de prélèvement et l'annulation doivent rester stables, sans effet marketing agressif.

Respecter `prefers-reduced-motion` : si l'utilisateur réduit les animations, les transitions deviennent instantanées ou très courtes.

## Structure UX globale

Le flow contient 13 écrans :

1. Ouverture forte.
2. Classe.
3. Objectif.
4. Matière sous pression.
5. Blocage principal.
6. Niveau ressenti.
7. Temps disponible aujourd'hui.
8. Nom ou pseudo.
9. Source de découverte.
10. Génération animée.
11. Première mission personnalisée.
12. Preuve sociale personnalisée.
13. Paywall avec essai gratuit 3 jours.

Le parcours doit être fluide. Éviter une barre froide du type "Question 2/13". Préférer une progression implicite : le profil se remplit, donc l'élève voit qu'il avance.

Retour arrière possible à tout moment avant le paywall. Modifier une réponse doit mettre à jour la ligne de profil correspondante et invalider les éléments calculés ensuite si nécessaire.

## Layout B - Diagnostic avec profil latéral

Le layout retenu est le layout B : question principale et profil qui se construit en parallèle.

### Desktop

- Panneau profil stable à gauche.
- Question active à droite.
- Le profil reste visible pendant les questions, la génération, la mission et le paywall.
- Le panneau profil ne doit pas voler la priorité à la question active.
- Largeur recommandée : profil lisible mais compact ; zone de question plus large.
- Le panneau peut avoir une sensation de fiche de carnet : titre, lignes, statuts, annotations.

### Mobile

- Header compact en haut.
- Résumé de profil sticky sous le header.
- Le résumé affiche 1 à 3 lignes prioritaires selon l'étape.
- Un bouton ou accordéon permet d'ouvrir le profil complet.
- La question reste l'élément principal.
- Aucun élément sticky ne doit masquer les choix ou l'action principale.

### Rôle du profil

Le profil n'est pas un décor. C'est la preuve visuelle de personnalisation.

Chaque réponse complète une ligne du profil avec un statut clair :

- "à préciser" avant réponse ;
- valeur choisie après réponse ;
- "utilisé pour la mission" pendant ou après génération ;
- "non utilisé pour la mission" si la donnée sert seulement au produit ou à l'acquisition.

Exemple de lignes :

- Classe : Première.
- Objectif : Préparer un contrôle.
- Matière sous pression : Mathématiques.
- Blocage : Je comprends le cours, mais je rate les exercices.
- Niveau ressenti : Fragile.
- Temps réel : 30 minutes.
- Nom affiché : Lina.
- Découverte : Instagram, non utilisé pour la mission.
- Mission recommandée : exercice type contrôle avec méthode écrite.

## Composants attendus

### Shell onboarding

- Fond papier chaud.
- Colonne profil.
- Zone question.
- Navigation retour discrète.
- Indication de progression par profil rempli, pas par compteur mécanique.

### Carte question

- Kicker court optionnel.
- Titre ou question principale.
- Microcopy d'une phrase.
- Choix cliquables.
- Action explicite uniquement pour les champs libres.

### Choix

- Maximum 6 choix visibles, plus `Autre`.
- Chaque choix peut avoir un libellé et un sous-texte court.
- Un clic valide la réponse, sauf si le choix `Autre` ouvre un champ.
- Le choix sélectionné doit être immédiatement visible.

### Champ libre

- Utilisé pour le nom ou pseudo et les choix `Autre`.
- Longueur limitée.
- Ne pas laisser croire qu'un email est demandé.
- Validation simple et non humiliante.

### Panneau profil

- Lignes stables.
- Statuts visuels.
- Mise à jour immédiate.
- Indication des données qui alimentent la mission.
- Résumé de mission après génération.

### Génération

- Liste courte d'étapes.
- Durée brève.
- Pas de spinner technique seul.
- Chaque ligne doit expliquer ce qui est croisé.

### Mission

- Diagnostic.
- Mission du jour.
- Durée.
- Pourquoi cette mission.
- Trace attendue.
- Action pour voir ou commencer.

### Preuve sociale

- Conseils personnalisés.
- Placeholders clairement identifiés si aucun vrai retour utilisateur n'est disponible.
- Pas de faux avis présentés comme réels.

### Paywall

- Hard paywall.
- Récapitulatif de valeur déjà obtenue.
- Essai gratuit 3 jours.
- Date exacte de premier prélèvement.
- Prix après essai.
- Annulation en 1 clic.
- Action principale d'activation.
- Action secondaire pour relire la mission.

## Règles de contenu

Budget recommandé par écran :

- kicker : 2 à 5 mots ;
- titre : 1 phrase courte ;
- microcopy : 1 phrase, moins de 120 caractères si possible ;
- choix : libellé court, sous-texte court si utile ;
- pas de paragraphe long pendant les questions ;
- pas de promesse commerciale avant la preuve de valeur.

Chaque écran doit suivre implicitement cette logique :

1. Nommer une confusion réelle.
2. Montrer comment Objectif Lycée réduit cette confusion.
3. Expliquer ce que l'élève gagne maintenant.
4. Demander une réponse simple.

Ne jamais afficher les mots "problème", "solution", "gain" ou "question" comme titres de structure. Cette logique guide la rédaction, elle ne doit pas apparaître comme un canevas.

## Séquence détaillée des écrans

### Écran 1 - Ouverture forte

Rôle pédagogique :
Installer le problème central : le travail n'est pas toujours le problème, la direction l'est.

Texte visible :

- Kicker : `Diagnostic - 2 min`
- Titre : `Tu peux travailler beaucoup... et viser le mauvais endroit.`
- Corps : `Le problème, ce n'est pas toujours l'effort. C'est souvent la direction.`
- Microcopy : `On choisit une mission utile pour aujourd'hui.`
- Action principale : `Trouver ma mission`

Comportement visuel :
Le panneau profil est visible mais vide. Il peut afficher une fiche "Profil en construction" avec les lignes à venir en statut "à préciser".

Donnée capturée :
Aucune.

Impact sur le profil :
Initialise le diagnostic. Les lignes du profil deviennent visibles mais non remplies.

Erreur à éviter :
Ouvrir par une promesse de réussite ou par une demande de compte.

### Écran 2 - Classe

Rôle pédagogique :
Adapter le diagnostic au contexte scolaire : construction des habitudes, notes, spécialités, bac, Parcoursup.

Texte visible :

- Question : `Tu es en quelle classe ?`
- Microcopy : `Première et Terminale n'ont pas les mêmes urgences.`

Choix :

1. `Seconde` - `Je veux prendre de bonnes habitudes tôt.`
2. `Première` - `Je construis mes notes et mes spécialités.`
3. `Terminale` - `Je dois tenir les contrôles, le bac et Parcoursup.`
4. `Autre` - `Je précise ma situation.`

Comportement visuel :
Au choix, la ligne `Classe` du profil se remplit. Une courte annotation peut apparaître : `calibre le calendrier`.

Donnée capturée :
`classe`

Impact sur le profil :
Affiche la classe et prépare les urgences du diagnostic.

Erreur à éviter :
Bloquer les élèves hors Première ou Terminale. Le produit peut être centré lycée supérieur, mais le choix `Autre` évite une impasse.

### Écran 3 - Objectif

Rôle pédagogique :
Comprendre ce que l'élève veut surtout obtenir cette année.

Texte visible :

- Question : `Cette année, tu veux surtout...`
- Microcopy : `Ta réponse oriente la première mission.`

Choix :

1. `Remonter une matière` - `J'ai une matière qui tire le dossier vers le bas.`
2. `Préparer un contrôle` - `J'ai une échéance proche.`
3. `Arrêter de travailler au hasard` - `Je fais des efforts, mais je ne sais pas si c'est utile.`
4. `Construire un meilleur dossier` - `Je pense aux bulletins, aux spécialités ou à Parcoursup.`
5. `Tenir une routine` - `Je veux travailler un peu, mais régulièrement.`
6. `Reprendre confiance` - `Je veux une première action que je peux finir.`
7. `Autre` - `Je précise mon objectif.`

Comportement visuel :
La ligne `Objectif` se remplit. Le profil peut commencer à afficher une phrase de synthèse : `On cherche une mission pour...`

Donnée capturée :
`objectif`

Impact sur le profil :
Donne la direction générale de la mission et du conseil final.

Erreur à éviter :
Transformer l'objectif en orientation post-bac détaillée trop tôt. Ici, on cherche le besoin de travail immédiat.

### Écran 4 - Matière sous pression

Rôle pédagogique :
Identifier la matière qui occupe le plus de charge mentale aujourd'hui.

Texte visible :

- Question : `Quelle matière te met le plus de pression ?`
- Microcopy : `Pas forcément ta pire matière : celle qui prend le plus de place aujourd'hui.`

Choix :

1. `Mathématiques` - `Je bloque vite quand l'exercice change.`
2. `Physique-chimie` - `Je mélange cours, formules et exercices.`
3. `SVT` - `Je ne sais pas quoi retenir ni comment répondre.`
4. `SES` - `J'ai du mal à construire une réponse claire.`
5. `HGGSP` - `Je dois mieux organiser mes idées.`
6. `Français / philo` - `Je bloque sur la méthode ou la rédaction.`
7. `Autre` - `Je choisis une autre matière.`

Comportement visuel :
La ligne `Matière sous pression` se remplit et devient une des lignes fortes du profil.

Donnée capturée :
`matiereSousPression`

Impact sur le profil :
Devient une variable principale de la mission recommandée.

Erreur à éviter :
Afficher une liste interminable de matières. Maximum 6 visibles plus `Autre`.

### Écran 5 - Blocage principal

Rôle pédagogique :
Éviter une mission générique. Deux élèves en mathématiques peuvent avoir besoin de missions très différentes.

Texte visible :

- Question : `Qu'est-ce qui te bloque vraiment ?`
- Microcopy : `On évite de te donner une mission inutile.`

Choix :

1. `Je ne sais pas par où commencer` - `J'ouvre mes cours, puis je tourne en rond.`
2. `Je comprends le cours, mais je rate les exercices` - `La méthode ne sort pas au bon moment.`
3. `Je fais des erreurs bêtes` - `Je perds des points sur les détails.`
4. `Je manque de méthode` - `Je ne sais pas quoi écrire pour que ce soit propre.`
5. `Je suis en retard` - `J'ai trop de chapitres à reprendre.`
6. `Je perds vite ma concentration` - `Je commence, mais je ne vais pas au bout.`
7. `Autre` - `Je précise mon blocage.`

Comportement visuel :
La ligne `Blocage` se remplit avec un statut fort : `clé de mission`.

Donnée capturée :
`blocagePrincipal`

Impact sur le profil :
Doit peser fortement dans la mission et le conseil personnalisé.

Erreur à éviter :
Donner la même mission à tous les élèves d'une même matière. Le blocage doit changer l'action proposée.

### Écran 6 - Niveau ressenti

Rôle pédagogique :
Calibrer la difficulté d'entrée sans baisser l'exigence finale.

Texte visible :

- Question : `Dans cette matière, tu te sens...`
- Microcopy : `Assez simple pour commencer, assez précis pour progresser.`

Choix :

1. `Perdu` - `J'ai besoin de reprendre les bases.`
2. `Fragile` - `Je comprends parfois, mais ça casse vite.`
3. `Correct` - `Je peux avancer avec une méthode claire.`
4. `Solide` - `Je veux gagner en précision et en vitesse.`
5. `Ambitieux` - `Je veux des exercices plus exigeants.`
6. `Irrégulier` - `Ça dépend beaucoup des chapitres.`
7. `Autre` - `Je précise mon niveau.`

Comportement visuel :
La ligne `Niveau ressenti` se remplit. Le statut indique `calibre l'entrée`.

Donnée capturée :
`niveauRessenti`

Impact sur le profil :
Détermine le niveau d'aide au départ et la précision attendue dans la trace.

Erreur à éviter :
Demander une note sur 20 ou faire sentir à l'élève qu'il est jugé.

### Écran 7 - Temps disponible aujourd'hui

Rôle pédagogique :
Forcer une mission réaliste. La recommandation doit tenir dans le vrai temps disponible.

Texte visible :

- Question : `Tu as combien de temps réel aujourd'hui ?`
- Microcopy : `Le vrai temps, pas le temps idéal.`

Choix :

1. `10 minutes` - `Juste de quoi relancer.`
2. `20 minutes` - `Une mission courte, mais utile.`
3. `30 minutes` - `Assez pour faire un exercice propre.`
4. `45 minutes` - `On peut aller plus loin.`
5. `1 heure` - `Bonne session de travail.`
6. `Plus d'une heure` - `On découpe pour éviter de s'éparpiller.`
7. `Autre` - `Je précise mon temps.`

Comportement visuel :
La ligne `Temps réel` se remplit. La mission à venir doit afficher une durée cohérente avec cette réponse.

Donnée capturée :
`tempsDisponible`

Impact sur le profil :
Fixe la taille de la mission et empêche une recommandation trop large.

Erreur à éviter :
Punir un temps court. 10 minutes doit produire une vraie mission de relance, pas un message de culpabilité.

### Écran 8 - Nom ou pseudo

Rôle pédagogique :
Personnaliser l'espace sans demander un compte.

Texte visible :

- Question : `On met quel nom sur ton espace ?`
- Microcopy : `Un prénom ou un pseudo suffit.`
- Placeholder : `Ex. Lina`
- Action principale : `Continuer`

Comportement visuel :
Le nom apparaît dans le profil et peut ensuite personnaliser la mission. Le champ doit ressembler à une ligne de carnet à compléter.

Donnée capturée :
`nomAffiche`

Impact sur le profil :
Personnalise l'interface, les titres et la mission.

Erreur à éviter :
Demander l'email, le téléphone ou un identifiant de compte ici. `nomAffiche` ne doit pas être envoyé en analytics.

### Écran 9 - Source de découverte

Rôle pédagogique :
Comprendre le canal d'acquisition sans casser le rythme et sans influencer la mission.

Texte visible :

- Question : `Tu as découvert Objectif Lycée où ?`
- Microcopy : `Ta mission ne dépend pas de cette réponse.`

Choix :

1. `TikTok`
2. `Instagram`
3. `YouTube`
4. `Google`
5. `Un ami`
6. `Un parent ou un prof`
7. `Autre`

Comportement visuel :
La ligne `Découverte` se remplit avec une annotation claire : `non utilisé pour la mission`.

Donnée capturée :
`sourceDecouverte`

Impact sur le profil :
Complète le profil produit, mais ne doit pas modifier la mission recommandée.

Erreur à éviter :
Donner l'impression que cette réponse compte autant que le blocage ou la matière.

### Écran 10 - Génération animée

Rôle pédagogique :
Transformer les réponses en preuve visible. L'élève doit sentir que la mission est construite à partir du profil.

Texte visible :

- Titre : `On prépare ta mission.`
- Microcopy : `On croise matière, blocage, niveau et temps disponible.`

Étapes affichées successivement :

1. `Analyse de ton profil` - `Classe, objectif et matière prioritaire.`
2. `Priorité identifiée` - `On cherche l'action qui débloque le plus vite.`
3. `Niveau calibré` - `On évite une mission trop facile ou trop dure.`
4. `Temps pris en compte` - `La mission doit rentrer dans ton vrai temps.`
5. `Mission prête` - `Tu vas voir quoi faire, pourquoi, et quoi produire.`

Comportement visuel :
Les lignes importantes du profil passent au statut `utilisé pour la mission`. La génération doit durer brièvement et ne jamais ressembler à un faux calcul interminable.

Donnée capturée :
Aucune nouvelle donnée. Les données utilisées sont `classe`, `objectif`, `matiereSousPression`, `blocagePrincipal`, `niveauRessenti`, `tempsDisponible` et `nomAffiche`.

Impact sur le profil :
Ajoute une synthèse temporaire : `Mission en préparation`.

Erreur à éviter :
Afficher un spinner seul ou une attente artificielle qui donne l'impression de maquiller une réponse générique.

### Écran 11 - Première mission personnalisée

Rôle pédagogique :
Donner la première preuve de valeur : une mission concrète, justifiée par les réponses.

Texte visible :

- Titre : `Ta première mission est prête, {nomAffiche}.`
- Diagnostic : `Tu as choisi {matiereSousPression} et {blocagePrincipal}. Avec {tempsDisponible}, on garde une action précise.`
- Bloc mission : `Mission du jour : {actionConcrete}`
- Durée : `{duree} minutes`
- Pourquoi : `Elle attaque ton blocage sans te demander de refaire tout le chapitre.`
- Trace attendue : `À la fin : une réponse écrite, une correction relue, ou une liste claire de tes erreurs.`
- Action principale : `Voir la mission`

Comportement visuel :
La mission apparaît comme une page de carnet validée. Les lignes du profil utilisées peuvent être reliées visuellement au diagnostic, par surlignage ou rappel discret.

Donnée capturée :
`missionRecommandee`, `justificationMission`, `traceAttendue`

Impact sur le profil :
Ajoute la ligne `Mission recommandée` avec le statut `prête`.

Erreur à éviter :
Montrer une mission vague du type "réviser les maths". La mission doit dire quoi faire et quoi produire.

Exemples de missions :

Mathématiques, exercices qui bloquent, 30 minutes :

> Refaire un exercice type contrôle en écrivant la méthode avant chaque calcul.

Trace attendue :

> Une solution propre avec les étapes nommées : données, méthode choisie, calcul, vérification.

Physique-chimie, formules mélangées, 20 minutes :

> Classer 3 exercices par situation physique, puis choisir la formule adaptée pour chacun.

Trace attendue :

> Pour chaque exercice : grandeur cherchée, grandeurs données, formule choisie, unité vérifiée.

Français / philo, méthode, 45 minutes :

> Construire une introduction et un plan détaillé sur un sujet déjà vu.

Trace attendue :

> Une problématique, deux ou trois axes, et un exemple précis par axe.

### Écran 12 - Preuve sociale personnalisée

Rôle pédagogique :
Rassurer sans inventer de faux témoignages et donner un conseil lié au blocage.

Texte visible :

- Titre : `Ce qui a aidé d'autres élèves dans ton cas.`
- Microcopy : `Le plus utile est souvent de réduire la prochaine action.`
- Libellé obligatoire si les avis ne sont pas réels : `Exemples placeholders - à remplacer par de vrais retours utilisateurs.`

Avis placeholders :

> "Ce qui m'a aidé, c'est que la mission ne disait pas juste 'revois le chapitre'. Elle me disait quoi produire à la fin."
>
> Placeholder - élève de Première, matière scientifique.

> "Je travaillais déjà, mais je commençais toujours par ce qui me rassurait. La mission m'a forcé à attaquer le vrai blocage."
>
> Placeholder - élève de Terminale, préparation contrôle.

> "Le plus utile était la limite de temps. En 25 minutes, je savais exactement ce que je devais rendre."
>
> Placeholder - élève avec temps court disponible.

Conseils selon `blocagePrincipal` :

- `Je ne sais pas par où commencer` : `Commence par une trace minuscule : une définition, un exercice, une erreur corrigée. Le premier objectif est de sortir du flou.`
- `Je comprends le cours, mais je rate les exercices` : `Avant de calculer, écris la méthode en une phrase. Si tu ne peux pas nommer la méthode, tu risques de faire au hasard.`
- `Je fais des erreurs bêtes` : `Les erreurs bêtes coûtent souvent des points parce qu'elles ne sont pas relues au bon moment. Ta mission doit inclure une vérification explicite.`
- `Je manque de méthode` : `Une bonne réponse ne montre pas seulement le résultat. Elle montre pourquoi tu as choisi cette étape.`
- `Je suis en retard` : `En retard, tu n'as pas besoin de tout ouvrir. Tu as besoin d'une première zone rentable à reprendre proprement.`
- `Je perds vite ma concentration` : `Une session courte avec une trace précise vaut mieux qu'une heure ouverte sans fin claire.`

Comportement visuel :
La preuve sociale doit être calme, comme des notes de marge ou des retours collectés. Le conseil personnalisé doit être plus fort que les placeholders.

Donnée capturée :
`variantePreuveSociale`

Impact sur le profil :
Ajoute une ligne `Conseil associé` ou renforce la ligne `Blocage`.

Erreur à éviter :
Présenter des placeholders comme des avis réels. Ne pas utiliser de chiffres inventés.

### Écran 13 - Paywall avec essai gratuit 3 jours

Rôle pédagogique :
Bloquer la continuité après la preuve de valeur et expliquer exactement ce que l'essai ouvre.

Règle commerciale :

- Hard paywall après diagnostic, mission, justification et conseil.
- Essai gratuit 3 jours.
- Aucun prélèvement pendant les 3 jours.
- Date exacte du premier prélèvement affichée avant activation.
- Annulation en 1 clic avant la date.
- Prélèvement automatique ensuite si l'utilisateur n'annule pas.
- Prix affiché : `10 euros par mois` si le prototype garde le prix actuel.

L'élève a déjà vu :

- son diagnostic ;
- sa mission personnalisée ;
- la justification ;
- la trace attendue ;
- un conseil contextualisé.

Il ne doit pas accéder au cockpit complet, au focus, au suivi ou aux missions suivantes sans activer l'essai.

Texte visible :

- Kicker : `Essai gratuit 3 jours`
- Titre : `Ton plan est prêt. Active l'essai pour commencer.`
- Corps : `L'essai ouvre ta mission, le focus et le suivi personnalisé.`
- Valeur récapitulée : `Mission prête : {actionConcrete}`
- Temps : `Temps prévu : {duree}`
- Priorité : `Priorité : {matiereSousPression} - {blocagePrincipal}`
- Prix : `3 jours gratuits, puis 10 euros par mois.`
- Garantie de délai : `Tu ne seras pas débité avant {trialChargeDate}.`
- Annulation : `Annulation en 1 clic avant cette date.`
- Automatique : `Sans annulation, l'abonnement démarre automatiquement après l'essai.`
- Action principale : `Activer mon essai gratuit`
- Action secondaire : `Relire ma mission`
- Microcopy : `Pas de surprise : tu paies pour garder un plan quotidien personnalisé.`

Comportement visuel :
Le paywall doit ressembler à une décision claire sur une page de carnet. La date de prélèvement, le prix et l'annulation doivent être très visibles. Ne pas les mettre en petit gris illisible.

Donnée capturée :
`trialChargeDate` quand l'essai est activé.

Impact sur le profil :
Ajoute un statut `Plan prêt - essai requis` puis `Essai actif` si l'utilisateur active.

Erreur à éviter :
Vendre "plus de contenu" ou masquer le prélèvement automatique. La clarté commerciale fait partie de la confiance.

Règle de date :

La date affichée doit être calculée comme `date d'activation + 3 jours`.

Exemple pour le prototype daté du mardi 26 mai 2026 :

> Tu ne seras pas débité avant vendredi 29 mai 2026.

## Règles de personnalisation

La première mission est déterminée par quatre variables principales :

1. `matiereSousPression`
2. `blocagePrincipal`
3. `niveauRessenti`
4. `tempsDisponible`

`classe` et `objectif` modulent le ton, l'urgence et la justification.

`nomAffiche` personnalise l'interface seulement.

`sourceDecouverte` ne modifie jamais la mission.

### Règles simples de mission

- Si `tempsDisponible` vaut `10 minutes`, proposer une mission de relance : classer, relire une correction, identifier une erreur, écrire une méthode.
- Si `tempsDisponible` vaut `20 minutes`, proposer une mission courte avec une trace unique.
- Si `tempsDisponible` vaut `30 minutes`, proposer un exercice ou une rédaction courte.
- Si `tempsDisponible` vaut `45 minutes`, `1 heure` ou plus, proposer une mission en deux temps : préparation puis production.
- Si `niveauRessenti` vaut `Perdu` ou `Fragile`, commencer par une entrée guidée.
- Si `niveauRessenti` vaut `Solide` ou `Ambitieux`, demander plus de précision dans la trace attendue.
- Si `blocagePrincipal` concerne la concentration, réduire le périmètre et rendre la fin très explicite.
- Si `blocagePrincipal` concerne la méthode, forcer l'élève à nommer la méthode avant de produire.
- Si `objectif` concerne un contrôle proche, la mission doit ressembler à une action type contrôle.
- Si `objectif` concerne la routine, la mission doit être assez courte pour être répétable.
- Si `objectif` concerne la confiance, la mission doit garantir une première trace finissable.

### Règles de rédaction des choix

Chaque choix doit faire deux choses :

- permettre à l'élève de se reconnaître ;
- donner une information exploitable au moteur de mission.

Mauvais choix :

> Maths

Meilleur choix :

> Mathématiques - "Je bloque vite quand l'exercice change."

Mauvais choix :

> Je suis nul.

Meilleur choix :

> Fragile - "Je comprends parfois, mais ça casse vite."

## Payload onboarding cible

Le payload produit par l'onboarding doit contenir ces champs :

| Champ | Rôle | Analytics |
|---|---|---|
| `classe` | Contexte scolaire et urgence | Oui |
| `objectif` | Direction de travail | Oui |
| `matiereSousPression` | Matière prioritaire | Oui |
| `blocagePrincipal` | Blocage qui détermine la mission | Oui |
| `niveauRessenti` | Calibrage de difficulté | Oui |
| `tempsDisponible` | Durée réaliste de mission | Oui |
| `nomAffiche` | Personnalisation UI | Non |
| `sourceDecouverte` | Acquisition | Oui |
| `missionRecommandee` | Mission proposée | Oui, sous forme de type ou catégorie |
| `justificationMission` | Pourquoi cette mission | Non, sauf catégorie |
| `traceAttendue` | Résultat concret demandé | Non, sauf catégorie |
| `variantePreuveSociale` | Variante vue | Oui |
| `trialChargeDate` | Date de premier prélèvement | Oui |

Règle importante :

`nomAffiche` sert à personnaliser l'UI, mais ne doit pas être envoyé en analytics. Ne pas envoyer non plus de texte libre sensible saisi dans `Autre` sans nettoyage ou catégorisation.

## Analytics attendus

Les événements doivent être utiles sans données sensibles.

Événements minimum :

- `onboarding_started` : l'utilisateur démarre le diagnostic.
- `onboarding_step_viewed` : un écran est affiché.
- `onboarding_answer_selected` : une réponse est sélectionnée.
- `onboarding_name_submitted` : le champ nom est validé, sans envoyer la valeur.
- `onboarding_generation_started` : la génération commence.
- `onboarding_generation_completed` : la mission est prête.
- `onboarding_mission_viewed` : la mission personnalisée est vue.
- `onboarding_social_proof_viewed` : la preuve sociale est vue.
- `trial_paywall_viewed` : le paywall est vu.
- `trial_started` : l'essai est activé.
- `paywall_secondary_action_clicked` : l'utilisateur clique une action secondaire du paywall.

Propriétés autorisées :

- `step_id`
- `step_type`
- `classe`
- `objectif`
- `matiere_sous_pression`
- `blocage_principal`
- `niveau_ressenti`
- `temps_disponible`
- `source_decouverte`
- `mission_type`
- `preuve_sociale_variant`
- `trial_charge_date`

Propriétés interdites :

- `nomAffiche`
- email ;
- téléphone ;
- texte libre brut ;
- détail personnel non nécessaire.

## Tableau de contrôle des questions

| Écran | Question | Nombre de choix hors `Autre` | `Autre` présent |
|---|---|---:|---|
| 2 | Tu es en quelle classe ? | 3 | Oui |
| 3 | Cette année, tu veux surtout... | 6 | Oui |
| 4 | Quelle matière te met le plus de pression ? | 6 | Oui |
| 5 | Qu'est-ce qui te bloque vraiment ? | 6 | Oui |
| 6 | Dans cette matière, tu te sens... | 6 | Oui |
| 7 | Tu as combien de temps réel aujourd'hui ? | 6 | Oui |
| 8 | On met quel nom sur ton espace ? | Champ libre | Non applicable |
| 9 | Tu as découvert Objectif Lycée où ? | 6 | Oui |

## Responsive

### Desktop

- Profil visible en permanence.
- Question lisible sans scrolling excessif.
- Choix alignés de façon à rester scannables.
- Mission et paywall assez larges pour ne pas compresser les textes importants.
- Aucun élément important dans une carte trop étroite.

### Mobile

- Résumé de profil sticky compact.
- Zone de question prioritaire.
- Choix en pleine largeur.
- Boutons avec cible tactile confortable.
- Profil complet accessible sans recouvrir définitivement l'écran.
- Paywall lisible sans cacher la date de prélèvement.

### États à prévoir

- première visite ;
- retour arrière ;
- modification d'une réponse ;
- choix `Autre` ouvert ;
- champ vide ou trop long ;
- génération ;
- mission prête ;
- paywall vu ;
- essai activé ;
- annulation depuis le paywall ou la gestion d'abonnement.

## Accessibilité

- Toutes les réponses doivent être accessibles au clavier.
- Le focus visible doit être net.
- Les cartes de choix doivent être annoncées comme des options sélectionnables.
- Le retour arrière doit être accessible.
- Les animations doivent respecter `prefers-reduced-motion`.
- Le contraste doit rester fort sur fond papier.
- Les informations commerciales obligatoires ne doivent pas dépendre seulement de la couleur.
- Les erreurs de champ doivent expliquer comment corriger.
- La date de prélèvement et l'annulation doivent être lisibles par lecteur d'écran.

## Tests qualité du fil de fer

Avant de considérer le wireframe comme prêt, vérifier :

- Un designer sans contexte peut dessiner les 13 écrans.
- La vibe carnet premium est visible dans le layout, les bordures, les ombres, les surlignages et la hiérarchie.
- Le profil en construction est central, stable et utile.
- Chaque réponse remplit une ligne du profil.
- La mission utilise visiblement la matière, le blocage, le niveau et le temps.
- La mission dit quoi faire, pourquoi, combien de temps et quelle trace produire.
- La preuve sociale ne contient aucun faux avis présenté comme réel.
- Le paywall arrive après preuve de valeur.
- Le paywall bloque la continuité personnalisée, pas la compréhension initiale.
- L'essai gratuit 3 jours est sans ambiguïté.
- La phrase "aucun prélèvement pendant 3 jours" est visible.
- La date exacte de premier prélèvement est visible.
- L'annulation en 1 clic est visible.
- Le prélèvement automatique après 3 jours est visible.
- Aucune mention d'offre de missions gratuites avant abonnement ne reste dans le flow onboarding.
- `nomAffiche` n'est pas envoyé en analytics.
- Mobile et desktop ne créent pas de chevauchement ni de texte illisible.

## Points à ne pas faire

- Ne pas demander l'email avant la preuve de valeur dans ce fil de fer.
- Ne pas transformer l'onboarding en quiz scolaire.
- Ne pas présenter les fonctionnalités avant le diagnostic.
- Ne pas commencer par un prix ou par une création de compte.
- Ne pas faire croire que répondre à l'onboarding suffit pour progresser.
- Ne pas afficher une longue liste de matières.
- Ne pas utiliser de témoignages inventés comme preuves réelles.
- Ne pas promettre un 20/20, une mention, une école ou une hausse de notes garantie.
- Ne pas vendre le paywall comme un simple accès à plus de contenu.
- Ne pas cacher la date de débit.
- Ne pas cacher l'annulation.
- Ne pas oublier le prélèvement automatique après l'essai.

## Définition d'un bon onboarding

L'onboarding est réussi si l'élève peut dire :

> Je sais pourquoi cette mission m'est proposée, je sais ce que je dois produire, et je comprends ce que l'essai garde ouvert.

Il ne doit pas seulement avoir cliqué sur des choix. Il doit avoir ressenti une décision de travail plus claire qu'avant.

La dernière impression avant le paywall doit être :

> On m'a compris. La mission est concrète. Maintenant je sais exactement ce que je paie si je veux garder ce plan personnalisé.
