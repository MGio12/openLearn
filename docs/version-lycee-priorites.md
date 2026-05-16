# Objectif Lycee - Ce qu'il reste a faire pour une bonne version lycee

**Date :** 2026-05-16  
**Statut :** note produit et commerciale

## Lecteur et action attendue

Ce document est ecrit pour le fondateur, un designer produit ou un agent IA qui reprend le projet.

Apres lecture, il doit pouvoir prioriser les prochaines etapes pour passer d'un prototype lycee coherent a une version lycee credible, vendable et comprehensible par les eleves comme par les parents.

## Diagnostic rapide

La version actuelle raconte maintenant la bonne histoire : un lyceen de Premiere ou Terminale ouvre Objectif Lycee, voit une mission courte, comprend le lien avec son dossier, puis suit son avance.

Le point fort est deja la boucle :

> objectif d'ecole -> mission du jour -> focus -> progression visible -> abonnement

Le risque principal est que cette boucle reste trop statique. Pour devenir vraiment convaincante, elle doit reagir aux reponses de l'eleve : classe, specialites, ecole visee, rythme, points faibles et echeances.

Le second enjeu est commercial : pour des lyceens, l'acheteur ou le co-decideur sera souvent le parent. Le produit ne doit donc pas seulement parler a l'eleve ambitieux. Il doit aussi rassurer le parent qui veut moins de stress, plus de regularite et un dossier Parcoursup mieux construit.

## Priorite 1 - Rendre la personnalisation reelle

Aujourd'hui, les pages racontent bien le lycee, mais beaucoup de contenu reste statique.

La prochaine vraie etape produit est de sauvegarder les reponses de l'onboarding :

- classe : Premiere ou Terminale ;
- specialites ;
- ecole ou filiere visee ;
- rythme realiste ;
- matieres a renforcer ;
- echeances proches : controle, bac blanc, Parcoursup, grand oral.

Ces reponses doivent ensuite alimenter :

- la mission du jour ;
- la page Objectif ;
- le planning ;
- la progression ;
- le message commercial du checkout.

Critere de succes :

> Deux lyceens avec des objectifs differents ne doivent pas voir la meme mission principale.

## Priorite 2 - Creer une base de donnees lycee minimale

Il ne faut pas viser une base parfaite au debut. Il faut une base assez credible pour que la mission du jour semble intelligente.

Structure minimale :

- niveaux : Premiere, Terminale ;
- matieres : maths, physique-chimie, SVT, SES, HGGSP, anglais, francais/philo, grand oral ;
- chapitres par matiere ;
- types d'impact : controle, bac, dossier, Parcoursup, ecole visee ;
- missions courtes par chapitre ;
- niveau d'urgence : faible, utile, prioritaire, critique.

Exemple de logique :

> Terminale + maths/physique + ecole d'ingenieur -> priorite aux chapitres de maths et physique qui influencent les notes de controle et le dossier.

## Priorite 3 - Renforcer la page Objectif

La page Objectif remplace l'ancienne preuve rationnelle.

Elle doit repondre clairement a ces questions :

- pourquoi cette mission aide mon dossier ;
- quelles matieres comptent le plus pour l'ecole visee ;
- quels chapitres ou habitudes peuvent faire monter mes notes ;
- quoi faire cette semaine pour progresser sans se disperser.

Elle ne doit pas devenir un tableau de bord froid. Elle doit etre une preuve calme :

> On ne te donne pas une mission au hasard. On te montre pourquoi elle sert ton objectif.

## Priorite 4 - Parler aussi aux parents

C'est probablement un levier commercial majeur.

L'eleve achete de la clarte quotidienne :

- je sais quoi faire maintenant ;
- je travaille moins au hasard ;
- je vois mon avance ;
- je garde une routine.

Le parent achete autre chose :

- moins de stress a la maison ;
- moins de disputes sur "tu devrais travailler" ;
- un cadre de travail regulier ;
- une meilleure preparation du dossier Parcoursup ;
- un outil moins cher qu'un soutien scolaire classique ;
- une preuve que l'eleve avance vraiment.

Le checkout et la landing doivent donc contenir deux niveaux de promesse :

Pour l'eleve :

> Tu ouvres l'app, tu sais quoi travailler aujourd'hui.

Pour le parent :

> Votre enfant garde un rythme clair, construit son dossier, et avance sans que vous ayez a piloter chaque soir.

Le ton doit rester sobre. Ne pas promettre une ecole. Promettre un cadre, une regularite et une meilleure decision quotidienne.

## Priorite 5 - Clarifier le funnel commercial

Le modele recommande reste :

> 3 missions offertes, puis 10 euros par mois.

Ce qui doit etre gratuit :

- onboarding ;
- premiere mission personnalisee ;
- apercu de la page Objectif ;
- une session focus ;
- premier etat du jardin d'avance.

Ce qui doit etre payant :

- plan quotidien personnalise ;
- suivi long terme ;
- progression sauvegardee ;
- ajustement apres chaque mission ;
- preparation hebdomadaire ;
- rappels et rythme ;
- historique utile pour l'eleve et le parent.

Le paiement doit arriver apres une preuve de valeur, pas avant.

## Priorite 6 - Brancher un vrai backend

Pour une version vendable, il faudra :

- compte utilisateur ;
- sauvegarde des reponses d'onboarding ;
- sauvegarde des missions terminees ;
- progression persistante ;
- Stripe reellement connecte ;
- email de confirmation ;
- analytics simples : onboarding termine, mission lancee, mission terminee, checkout clique, paiement.

Sans backend, le site peut convaincre. Avec backend, il peut retenir.

## Priorite 7 - Tester vite avec des lyceens et des parents

Le test le plus important n'est pas encore technique.

Il faut montrer le site a 5 a 10 lyceens et a quelques parents, puis observer :

- comprennent-ils en moins de 10 secondes la promesse ;
- croient-ils que la mission du jour est utile ;
- voient-ils le lien avec l'ecole visee ;
- les parents comprennent-ils pourquoi payer 10 euros par mois ;
- l'eleve a-t-il envie de revenir demain.

Si la reponse est oui, il faut construire.  
Si la reponse est non, il faut retravailler la promesse avant d'ajouter des features.

## Prochain sprint recommande

Le prochain sprint le plus rentable :

1. Sauvegarder l'onboarding.
2. Generer dynamiquement la mission du jour.
3. Alimenter la page Objectif avec les reponses de l'eleve.
4. Ajouter un bloc parent sur le checkout.
5. Tester le parcours avec un lyceen et un parent.

Ce sprint transforme le prototype actuel en premiere version lycee credible.

## Phrase boussole

Pour l'eleve :

> Je sais quoi travailler aujourd'hui pour me rapprocher de l'ecole que je vise.

Pour le parent :

> Mon enfant a un cadre clair, regulier et visible pour construire son dossier sans travailler au hasard.
