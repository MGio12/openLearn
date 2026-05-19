# Objectif Lycee — Mission du site, valeur et monetisation

**Date :** 2026-05-16  
**Statut :** document strategique operationnel

## Lecteur et action attendue

Ce document est ecrit pour le fondateur, un designer produit ou un agent IA qui reprend le site sans contexte oral.

Apres lecture, il doit pouvoir decider quoi ameliorer en priorite pour augmenter :

- la valeur percue par l'etudiant ;
- la retention quotidienne ;
- la conversion vers l'abonnement ;
- la coherence entre la promesse produit, l'UX et le paiement.

## Diagnostic rapide

Objectif Lycee a deja une direction forte : ce n'est pas une bibliotheque de contenu, c'est un cockpit qui dit quoi travailler maintenant. Les pages actuelles montrent deja les briques principales : onboarding, mission du jour, focus, Objectif, progression, checkout et retour Stripe.

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
- pendant : l'app me donne une mission courte, explique pourquoi elle compte, puis me met en focus ;
- apres : je vois une progression visible et je sais quoi faire demain ;
- a long terme : je deviens l'etudiant qui travaille juste, regulierement, sans se disperser.

## Boucle produit a renforcer

La boucle centrale doit devenir evidente sur toutes les pages :

1. **Diagnostic** : l'utilisateur donne son objectif, sa filiere, son rythme et ses priorites.
2. **Decision** : Objectif Lycee choisit la mission du jour.
3. **Execution** : l'utilisateur lance une session focus et termine une action concrete.
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

Amelioration prioritaire : l'onboarding doit deboucher sur un vrai moment de valeur, pas seulement sur le cockpit. Le bon enchainement est : reponses -> premiere mission personnalisee -> focus court -> progression visible -> email ou abonnement.

### Aujourd'hui

La page Aujourd'hui doit etre le coeur quotidien. Elle doit repondre en moins de cinq secondes :

- qu'est-ce que je fais maintenant ;
- pourquoi c'est le bon choix ;
- combien de temps ca prend ;
- comment je commence.

Les metriques de soutien doivent rester en second niveau. La mission du jour doit etre plus importante que les statistiques.

### Mission

La page Mission doit etre une fiche d'action, pas une page de contenu. Elle doit reduire la friction entre "je comprends" et "je travaille".

Le format ideal :

- un titre clair ;
- une justification courte ;
- 3 a 5 etapes cocheables ;
- les ressources liees ;
- un bouton focus dominant ;
- une action apres mission.

### Focus

Le focus vend l'experience premium : une seule mission, un timer, une ambiance, une sortie propre. Il doit rester calme et presque rituel.

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

La page Progression doit devenir moins scolaire et plus attachante. Aujourd'hui elle met trop en avant la maitrise par matiere. C'est utile, mais ce n'est pas la meilleure surface emotionnelle.

La progression doit montrer d'abord une avance qui grandit, puis les details analytiques en second niveau.

## Refonte prioritaire : progression par plante

La meilleure direction est de transformer Progression en **jardin d'avance**.

L'idee : chaque mission du jour terminee fait grandir une plante. Ce n'est pas une gamification agressive. C'est une metaphore calme : l'avance pousse parce que l'etudiant revient, travaille juste, et termine ses missions.

### Hierarchie recommandee

Au chargement de Progression, l'utilisateur doit voir :

- une grande plante ou pousse centrale ;
- un statut du type "Jour 7 — ton avance tient" ;
- le nombre de missions terminees cette semaine ;
- un rappel de la mission du jour si elle n'est pas finie ;
- un historique simple des derniers jours ;
- un bouton "Voir la maitrise par matiere".

La maitrise par matiere ne doit plus etre le bloc principal. Elle doit etre accessible via un panneau lateral.

### Panneau lateral de maitrise

Interaction recommandee :

- bouton : "Details par matiere" ;
- slide-over depuis la droite sur desktop ;
- panneau plein ecran sur mobile ;
- bouton de fermeture visible ;
- fond assombri discret ;
- focus clavier piege dans le panneau ;
- fermeture via Escape et clic hors panneau ;
- dernier bouton restaure au retour.

Contenu du panneau :

- couverture globale ;
- progression par matiere ;
- chapitres a revoir ;
- recommandation IA ;
- lien vers Objectif pour comprendre les priorites.

Ce panneau garde la puissance analytique sans voler la place de la progression emotionnelle.

### Etats de plante

Les etats doivent rester sobres :

- graine : debut, moins de 2 jours actifs ;
- pousse : 2 a 4 jours actifs ;
- tige : 5 a 9 jours actifs ;
- plante stable : 10 a 20 jours actifs ;
- floraison discrete : serie longue ou semaine complete ;
- carnet d'avance : recap mensuel.

La plante ne doit pas devenir cartoon. Elle doit ressembler a une illustration de carnet, avec le style papier, stabilo et bordures du produit.

### Regles produit

- La plante grandit seulement avec des missions terminees, pas avec du scroll.
- Une mission courte vaut mieux qu'une grosse journee aleatoire.
- Si l'utilisateur rate un jour, la plante ne "meurt" pas. Elle marque une pause.
- Le message doit rester calme : pas de honte, pas de punition.
- La croissance doit etre liee a l'avance reelle : missions, focus, couverture utile, regularite.

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
- jardin d'avance et suivi long terme ;
- priorisation automatique apres chaque mission ;
- focus lie aux missions ;
- sauvegarde multi-appareils ;
- rappels et ajustements de planning ;
- mode bac blanc ou sprint Parcoursup 8 semaines.

La phrase de vente doit rester simple :

> Gratuit : comprendre quoi travailler. Payant : avoir le plan quotidien personnalise qui te le fait tenir.

## Funnel recommande

Le funnel le plus fort pour ce produit :

1. Landing : "travaille ce qui rapporte, pas au hasard".
2. Onboarding court : objectif, filiere, rythme, priorites.
3. Generation d'une premiere mission.
4. Session focus courte ou preview actionnable.
5. Progression visible : la plante gagne son premier etat.
6. Email pour sauvegarder.
7. Offre : 10 euros par mois pour garder le plan quotidien personnalise.

Le paiement doit arriver apres une preuve de valeur, pas avant. L'utilisateur doit avoir pense : "ok, ca m'a vraiment dit quoi faire".

## Decision commerciale a prendre

Il faut choisir entre deux modeles et supprimer l'autre des textes :

### Option recommandee : 3 missions gratuites puis abonnement

Pourquoi c'est le meilleur compromis :

- pas de friction carte bancaire ;
- l'utilisateur ressent la boucle avant de payer ;
- le cout produit reste bas ;
- le message commercial reste honnete ;
- parfait pour tester l'acquisition organique.

Message possible :

> Tes 3 premieres missions sont offertes. Si le cockpit t'aide vraiment a travailler plus juste, tu gardes le plan personnalise pour 10 euros par mois.

### Option alternative : essai 14 jours sans carte

Bon pour reduire la peur, mais moins direct. Il faut ensuite convertir un utilisateur qui n'a pas pris de decision d'achat.

### Option a eviter maintenant : paiement direct sans essai

Le checkout direct peut marcher avec une audience chaude, mais il demande beaucoup de confiance. Pour un produit jeune, il convertira moins bien qu'un moment de valeur gratuit.

## Pricing

Le prix actuel de 10 euros par mois est coherent avec le positionnement :

- assez bas pour un etudiant ;
- assez simple pour acheter sans comparaison complexe ;
- assez eleve pour valider une vraie valeur ;
- compatible avec un fondateur solo.

Ne pas creer plusieurs plans maintenant. Un seul plan est preferable.

Plan futur possible, apres traction :

- mensuel : 10 euros ;
- annuel : 89 euros ;
- sprint Parcoursup 8 semaines : prix fixe separe, seulement si la demande apparait ;
- marketplace tuteurs : plus tard, uniquement apres retention produit.

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

Le moment ou la plante grandit est un tres bon endroit pour convertir :

> Tu viens de terminer ta premiere mission. On peut preparer les 7 prochaines et suivre ton avance jour apres jour.

## Roadmap prioritaire

### Priorite 1 — Aligner le funnel

Choisir une logique unique : 3 missions gratuites, essai gratuit, ou paiement direct. La recommandation est 3 missions gratuites puis abonnement.

Mettre a jour tous les textes pour eviter les contradictions entre onboarding, checkout et retour paiement.

### Priorite 2 — Refaire Progression autour du jardin

Remplacer la priorite visuelle "maitrise par matiere" par une progression vivante. Mettre les details analytiques dans un panneau lateral.

Critere de succes : l'utilisateur comprend en trois secondes que son travail quotidien construit quelque chose.

### Priorite 3 — Persister les missions terminees

Meme en local, il faut que cocher une mission ait un effet durable :

- compteur de mission ;
- plante qui evolue ;
- streak ou jours actifs ;
- prochain objectif quotidien.

Sans persistance, la boucle emotionnelle est faible.

### Priorite 4 — Relier Objectif aux missions

Chaque mission doit pouvoir dire pourquoi elle existe :

- chapitre frequent ;
- faiblesse de maitrise ;
- delai avant bac blanc ou controle ;
- recurrence dans les sujets de bac ;
- retard de revision.

Cette preuve justifie l'abonnement.

### Priorite 5 — Ameliorer les captures produit sur la landing

La landing doit montrer le vrai cockpit et la vraie mission du jour. Le produit est plus vendeur que des promesses abstraites.

### Priorite 6 — Ajouter le contenu organique

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
- sessions focus lancees ;
- progression de la plante.

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
- capturer les etats de panneaux, menus, focus et checkout ;
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
