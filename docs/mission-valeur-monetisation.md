# Objectif Lycee - Mission du site et valeur produit

**Date :** 2026-05-16  
**Statut :** document strategique operationnel

## Lecteur et action attendue

Ce document est ecrit pour le fondateur, un designer produit ou un agent IA qui reprend le site sans contexte oral.

Apres lecture, il doit pouvoir decider quoi ameliorer en priorite pour augmenter :

- la valeur percue par l'etudiant ;
- la retention quotidienne ;
- l'engagement dans la boucle produit ;
- la coherence entre la promesse produit et l'UX.

## Diagnostic rapide

Objectif Lycee a deja une direction forte : ce n'est pas une bibliotheque de contenu, c'est un cockpit qui dit quoi travailler maintenant. Les pages actuelles montrent deja les briques principales : onboarding, mission du jour dans le cockpit, preuve Objectif, planning, progression, checkout et retour Stripe.

La valeur la plus differenciante est claire : transformer les sujets de bac, l'objectif et le temps disponible en une mission courte et rationnelle. L'etudiant n'achete pas des fiches. Il achete moins d'incertitude, moins de hasard, et une sensation de controle.

Le risque principal est de laisser les metriques devenir le produit. La couverture dossier, la maitrise par matiere et les heatmaps sont des preuves. Elles ne doivent pas remplacer la promesse emotionnelle : ouvrir l'app, comprendre le bon prochain geste, le faire, puis sentir que l'avance grandit.

Il y a aussi une incoherence commerciale a resoudre : le checkout vend un abonnement direct a 10 euros par mois, tandis que l'onboarding mentionne un essai de 14 jours sans carte bancaire. Pour maximiser la conversion, le site doit choisir une seule logique de funnel et l'appliquer partout.

## Mission centrale

La mission du site est :

> Donner chaque jour a un etudiant ambitieux la bonne mission de travail, au bon moment, avec une preuve claire que cette mission le rapproche de son objectif.

Formule courte :

> Plus de hasard. Une mission. Une preuve. Une avance visible.

Le produit doit vendre une transformation :

- avant : je ne sais pas quoi travailler, j'ouvre mes fiches au hasard, je culpabilise ;
- pendant : l'app me donne une mission courte, explique pourquoi elle compte, puis me fait placer ou faire le prochain geste concret ;
- apres : je vois une progression visible et je sais quoi faire demain ;
- a long terme : je deviens l'etudiant qui travaille juste, regulierement, sans se disperser.

## Boucle produit a renforcer

La boucle centrale doit devenir evidente sur toutes les pages :

1. **Diagnostic** : l'utilisateur donne son objectif, sa filiere, son rythme et ses priorites.
2. **Decision** : Objectif Lycee choisit la mission du jour.
3. **Execution** : l'utilisateur planifie ou termine une action concrete.
4. **Preuve** : l'app explique le lien entre la mission, les sujets de bac, le programme ou l'objectif.
5. **Progression visible** : l'utilisateur voit son avance grandir.
6. **Retour le lendemain** : l'app propose la prochaine mission et entretient l'elan.

Si une fonctionnalite ne sert pas cette boucle, elle doit rester secondaire.

## Role de chaque ecran

### Onboarding

L'onboarding doit creer un engagement psychologique avant la creation de compte ou le paiement. Il doit rester conversationnel : objectif, filiere, annee, rythme realiste, priorites, premiere semaine.

Ce qui marche deja :

- le choix d'objectif est bon parce qu'il parle de projection personnelle ;
- le rythme est formule sans culpabiliser ;
- l'email arrive apres une premiere projection de valeur ;
- la premiere mission donne une victoire immediate.

Amelioration prioritaire : l'onboarding doit deboucher sur un vrai moment de valeur, pas seulement sur le cockpit. Le bon enchainement est : reponses -> premiere mission personnalisee -> preuve Objectif -> progression visible -> email ou abonnement.

### Aujourd'hui

La page Aujourd'hui doit etre le coeur quotidien. Elle doit repondre en moins de cinq secondes :

- qu'est-ce que je fais maintenant ;
- pourquoi c'est le bon choix ;
- combien de temps ca prend ;
- comment je commence.

Les metriques de soutien doivent rester en second niveau. La mission du jour doit etre plus importante que les statistiques.

### Mission du jour

La mission du jour n'est plus une page publique separee. Elle doit rester visible dans `index.html` et expliquee dans `objectif.html`, comme une fiche d'action integree au parcours.

Le format ideal :

- un titre clair ;
- une justification courte ;
- 3 a 5 etapes cocheables ;
- les ressources liees ;
- une action de planification dominante ;
- une action apres mission vers la progression ou l'abonnement quand la valeur a ete prouvee.

### Focus

Le focus reste un concept d'experience premium possible, mais il n'a plus de route publique dediee. Si on le remet plus tard, il doit rester calme et presque rituel, sans recreer une page redondante avec Objectif.

Le moment de fin de session est commercialement important. C'est la que l'utilisateur ressent la valeur. Il faut y montrer :

- ce qui vient d'etre accompli ;
- ce qui a progresse ;
- la prochaine action douce ;
- l'effet sur la progression visible.

### Objectif

La page Objectif est la preuve rationnelle. Elle doit repondre a la question : "Pourquoi cette mission est intelligente ?"

Elle ne doit pas devenir le tableau de bord principal de motivation. Elle est la source de confiance, pas la boucle quotidienne.

Le bon usage commercial :

- montrer que le produit ne recommande pas au hasard ;
- rendre visibles les chapitres a fort rendement ;
- fournir un argument fort pour payer la personnalisation.

### Progression

La page Progression doit rendre le progres scolaire lisible sans devenir un tableau de bord froid. La surface principale n'est plus une metaphore de jardin : c'est un graphe doux des moyennes, avec un point de depart, un point actuel et une evolution en points.

Le streak reste utile, mais il doit rester simple et secondaire : combien de jours de suite, puis les 7 derniers jours. Il sert a montrer le rythme, pas a remplacer la preuve scolaire.

## Refonte prioritaire : progression par resultats

La meilleure direction actuelle est de transformer Progression en **courbe de resultats lisible**.

L'idee : l'etudiant voit d'abord si ses moyennes montent, globalement puis par matiere. Les notes brutes pourront etre stockees ailleurs plus tard ; la page n'a besoin que d'un JSON d'affichage produit par le backend ou l'IA.

### Hierarchie recommandee

Au chargement de Progression, l'utilisateur doit voir :

- un grand graphe de moyenne generale par defaut ;
- des boutons matiere : moyenne generale, Maths spe, Physique-chimie, etc. ;
- des boutons periode : global, trimestre 1, trimestre 2, trimestre 3 ;
- la moyenne de depart sur le site ;
- le point actuel et l'evolution en points ;
- un bloc streak tres simple avec le nombre de jours de suite et les 7 derniers jours.

La progression par matiere n'a plus besoin d'un panneau lateral dedie : le graphe permet de changer de matiere directement.

### Format de donnees

Format recommande pour la page statique :

- `defaultSubjectId` pour la vue par defaut ;
- `subjects[]` avec `id`, `label`, puis `points[]` ;
- chaque point contient `label`, `term` et `value` sur 20.

La page doit lire en priorite `window.OutilPrepa.state.gradeProgress`, puis utiliser un JSON local de demonstration si aucune donnee utilisateur n'existe.

### Regles produit

- Le graphe montre des moyennes scolaires, pas une simulation de progres.
- Le point de depart doit toujours rester visible.
- L'evolution doit etre exprimee en points pour eviter les interpretations vagues.
- Le streak ne doit pas culpabiliser : il montre un rythme recent, pas une punition.
- Une base de donnees servira plus tard a stocker les notes brutes ; pour ce prototype, le JSON d'affichage est suffisant.

## Valeur a rendre plus monnayable

Le paywall ne doit pas vendre "plus de pages". Il doit vendre **la continuite personnalisee**.

Ce qui peut rester gratuit :

- heatmap objectif publique ;
- quelques missions de demonstration ;
- articles methode ;
- onboarding de diagnostic ;
- apercu de cockpit ;
- une premiere mission gratuite.

Ce qui doit etre payant :

- plan quotidien personnalise ;
- missions adaptees au niveau, au temps disponible et aux objectifs ;
- historique de progression ;
- evolution des resultats et suivi long terme ;
- priorisation automatique apres chaque mission ;
- mode focus integre aux missions, si on le reintroduit sans route publique dediee ;
- sauvegarde multi-appareils ;
- rappels et ajustements de planning ;
- mode bac blanc ou sprint Parcoursup 8 semaines.

La promesse doit rester simple :

> Gratuit et open source : un cadre de travail quotidien pour tous les lyceens, quelle que soit leur situation.

## Parcours recommande

Le parcours le plus fort pour ce produit :

1. Landing : "travaille ce qui rapporte, pas au hasard".
2. Onboarding court : objectif, filiere, rythme, priorites.
3. Generation d'une premiere mission.
4. Action guidee courte ou preview actionnable.
5. Progression visible : le graphe ou le streak donne un premier signe lisible.
6. Email pour sauvegarder.
7. Retour le lendemain : l'app propose la prochaine mission.

Le paiement doit arriver apres une preuve de valeur, pas avant. L'utilisateur doit avoir pense : "ok, ca m'a vraiment dit quoi faire".

## Modele open source

ObjectifLycee est gratuit et open source (licence MIT). Pas d'abonnement, pas de paywall.

Pourquoi ce modele :

- acces egal pour tous les lyceens, quelle que soit la situation familiale ;
- transparence totale : le code est lisible, auditable et forkable ;
- contribution communautaire : les lyceens eux-memes peuvent ameliorer le produit ;
- mission alignee avec la valeur : si l'outil aide vraiment, il doit etre accessible a tous.

L'engagement est simple :

> ObjectifLycee sera toujours gratuit. Le code sera toujours ouvert.

## Points de conversion a ameliorer

### Clarifier la promesse du checkout

Le checkout doit vendre le plan quotidien personnalise, pas seulement une liste de features.

Angle a renforcer :

- "Tu ouvres l'app, tu sais quoi faire maintenant."
- "Chaque mission vient avec une raison."
- "Tu vois ton avance grandir."
- "Tu ne bosses plus au hasard."

### Remplacer les preuves faibles par des preuves reelles

Eviter les temoignages inventes ou trop precis tant qu'ils ne sont pas reels. A la place :

- montrer le parcours du fondateur ;
- montrer les donnees lycee ;
- montrer des captures de mission ;
- montrer des avant/apres de planning ;
- publier le journal de build et d'utilisation.

### Connecter paiement et progression

Le moment ou la progression devient visible est un tres bon endroit pour convertir :

> Tu viens de terminer ta premiere mission. On peut preparer les 7 prochaines et suivre ton avance jour apres jour.

## Roadmap prioritaire

### Priorite 1 - Aligner le funnel

Choisir une logique unique : 3 missions gratuites, essai gratuit, ou paiement direct. La recommandation est 3 missions gratuites puis abonnement.

Mettre a jour tous les textes pour eviter les contradictions entre onboarding, checkout et retour paiement.

### Priorite 2 - Refaire Progression autour du graphe de moyennes

Remplacer la priorite visuelle "maitrise par matiere" ou "jardin" par une progression scolaire lisible : moyenne generale, matieres, periodes, depart, actuel, evolution.

Critere de succes : l'utilisateur comprend en trois secondes si ses resultats avancent et sur quelle matiere regarder.

### Priorite 3 - Persister l'activite et les resultats

Meme en local, il faut que cocher une mission ait un effet durable :

- compteur de mission ;
- streak ou jours actifs ;
- prochain objectif quotidien.
- plus tard : notes brutes et JSON de progression produit pour le graphe.

Sans persistance, la boucle emotionnelle est faible.

### Priorite 4 - Relier Objectif aux missions

Chaque mission doit pouvoir dire pourquoi elle existe :

- chapitre frequent ;
- faiblesse de maitrise ;
- delai avant bac blanc ou controle ;
- recurrence dans les sujets de bac ;
- retard de revision.

Cette preuve justifie l'abonnement.

### Priorite 5 - Ameliorer les captures produit sur la landing

La landing doit montrer le vrai cockpit et la vraie mission du jour. Le produit est plus vendeur que des promesses abstraites.

### Priorite 6 - Ajouter le contenu organique

Le blog methode doit servir l'acquisition, mais rester leger :

- 3 paragraphes par methode ;
- source serieuse ;
- lien vers une mission ou un diagnostic ;
- ton humain, pas encyclopedique.

## Metriques a suivre

### Activation

- onboarding commence ;
- onboarding termine ;
- premiere mission vue ;
- premiere mission lancee ;
- premiere mission terminee ;
- email donne.

### Retention

- retour lendemain ;
- nombre de jours actifs sur 7 ;
- missions terminees par semaine ;
- actions guidees lancees ;
- evolution de moyenne et streak recent.

### Conversion

- clic checkout ;
- conversion apres premiere mission ;
- conversion apres 3 missions ;
- abandon checkout ;
- resiliation mensuelle.

### Valeur educative

- chapitres prioritaires travailles ;
- couverture dossier utile ;
- temps passe sur missions prioritaires ;
- ecart entre plan propose et missions faites.

## Regles de decision produit

1. Une page doit toujours avoir une action principale.
2. Une metrique doit toujours aider a decider ou rassurer.
3. Le produit doit d'abord faire travailler, puis seulement montrer les details.
4. La progression doit etre visible sans devenir enfantine.
5. Le paywall doit proteger la personnalisation, pas cacher la preuve.
6. L'IA doit rester silencieuse et utile.
7. Le site doit donner envie de s'installer et travailler.

## Boucle d'amelioration avec Claude Opus et Playwright

Pour ameliorer le site avec Claude Opus en reflexion maximale, le meilleur workflow par defaut est **Playwright + screenshots**, pas une navigation libre dans Chrome.

Raison : Playwright donne des captures reproductibles, aux memes tailles d'ecran, avec les memes etats. Claude peut lire les screenshots, comparer la hierarchie visuelle, puis demander des corrections precises. C'est meilleur pour iterer serieusement sur une interface.

Utiliser Playwright pour :

- verifier desktop et mobile ;
- comparer avant/apres ;
- tester les pages importantes ;
- capturer les etats de panneaux, menus et checkout ;
- garder une trace objective des iterations.

Utiliser Claude Chrome pour :

- explorer librement un funnel ;
- ressentir le parcours comme un utilisateur ;
- chercher des concurrents ou inspirations ;
- verifier une experience interactive ponctuelle ;
- faire un dernier walkthrough qualitatif.

Workflow recommande :

1. Codex implemente la modification.
2. Playwright capture les pages et etats importants.
3. Claude Opus lit les screenshots en mode critique.
4. Claude produit une liste de corrections concretes.
5. Codex applique.
6. Nouvelle capture.
7. La feature est acceptee apres deux passages visuels propres.

Conclusion pratique :

> Pour ameliorer vraiment le site : Playwright + screenshots comme boucle principale. Claude Chrome seulement en complement pour l'exploration et le ressenti final.

## Definition d'une bonne prochaine version

La prochaine version doit faire sentir ceci :

> J'ouvre Objectif Lycee. Je vois ma mission. Je comprends pourquoi elle compte. Je la fais. Ma progression grandit. Je reviens demain.

Si cette boucle est forte, la monetisation devient beaucoup plus naturelle. L'abonnement ne sert plus a acheter une app. Il sert a garder un rythme, une avance et une clarte quotidienne.
