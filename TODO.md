# TODO — Objectif Lycee

Date: 2026-05-17

Ce fichier sert de feuille de route produit et technique. Le but n'est pas
d'ajouter des pages pour donner une impression de richesse, mais de rendre le
produit plus utile, plus clair, plus durable et plus facile a faire evoluer.

## Nord Produit

Promesse a proteger:

> Une mission claire, une preuve qu'elle compte, une avance visible.

Tout ce qui est ajoute doit renforcer au moins une partie de cette boucle:

1. Diagnostic: l'utilisateur donne son objectif, son niveau, son temps et ses priorites.
2. Decision: l'app choisit la mission la plus utile maintenant.
3. Execution: l'utilisateur lance le focus et termine une action concrete.
4. Preuve: l'app explique pourquoi cette mission rapproche de l'objectif.
5. Progression: l'avance devient visible et donne envie de revenir.
6. Retour: le lendemain, l'utilisateur sait quoi faire sans repartir de zero.

## Principes Long Terme

- Utilite avant decoration: chaque bloc doit aider l'utilisateur a decider, agir ou comprendre sa progression.
- Pas de AI slop: pas de textes vagues, pas de metriques inventees sans fonction, pas de promesses generiques.
- Une information principale par bloc: la mission du jour reste plus importante que les stats.
- La preuve doit etre sourcee: sujets de bac, objectifs, controle, planning ou historique utilisateur.
- Le calme est un avantage produit: pas de gamification agressive, pas de pression inutile.
- Architecture lisible: un nouveau dev doit comprendre ou vivent les donnees, la logique metier, l'etat et l'UI.
- Evolution progressive: le site peut rester statique au debut, mais les frontieres doivent preparer un vrai produit.

## P0 — Fondations Avant Nouvelles Features

- [x] Definir un modele de donnees central pour `profile`, `objective`, `mission`, `missionProgress`, `focusSession`, `subscriptionState`.
- [x] Creer une source unique pour la mission du jour au lieu de la dupliquer dans `index.html`, `mission.html`, `focus.html`, `progression.html` et `objectif.html`.
- [x] Brancher onboarding -> premiere mission -> focus -> mission terminee -> progression.
- [x] Faire en sorte que terminer une mission dans `mission.html` ou `focus.html` mette a jour `scripts/state.js`.
- [x] Supprimer les contradictions de navigation: choisir entre la progression integree dans `index.html` et la page `progression.html`, puis nettoyer les liens.
- [x] Remplacer les dates/personas hardcodes visibles par un etat utilisateur ou des fixtures explicites.
- [x] Ajouter un script unique `npm run verify` qui lance toutes les verifications existantes.
- [x] Ajouter une validation JSON qui detecte les fichiers vides, les BOM UTF-8, les champs manquants et les topics invalides.

## P1 — Architecture Fichiers Claire

Objectif: arreter de mettre logique, CSS et contenu directement dans les pages HTML.

Structure cible progressive, compatible avec le site statique actuel:

```text
assets/
  css/
    tokens.css
    base.css
    layout.css
    components.css
    pages/
      dashboard.css
      mission.css
      focus.css
      objectif.css
      progression.css
      checkout.css
  js/
    domain/
      missions.js
      objectives.js
      progress.js
      objectives.js
    state/
      store.js
      storage.js
    ui/
      checklist.js
      slideover.js
      timer.js
      checkout.js
    pages/
      dashboard.js
      onboarding.js
      mission.js
      focus.js
      objectif.js
      progression.js
data/
  fixtures/
docs/
scripts/
tests/
```

- [x] Extraire les styles inline page par page vers `assets/css/pages/`.
- [ ] Extraire les scripts inline page par page vers `assets/js/pages/`.
- [ ] Garder les tokens design dans un seul fichier de reference.
- [ ] Creer des modules metier purs pour calculer mission, progression, verrouillage gratuit et priorites.
- [ ] Garder les scripts DOM minces: ils lisent l'etat, appellent la logique, rendent l'interface.
- [ ] Documenter les conventions de nommage: pages, modules, donnees, IDs de topics, attributs `data-*`.
- [ ] Eviter les composants dupliques: sidebar, topbar, cartes mission, chips, boutons, stats et panneaux doivent avoir une source commune ou un pattern clair.

## P1 — Boucle Produit et Retention

- [ ] L'utilisateur doit comprendre en moins de 5 secondes quoi faire maintenant.
- [ ] La mission du jour doit afficher: titre, raison, duree, 3 a 5 etapes, bouton focus, preuve d'impact.
- [ ] La fin de focus doit montrer ce qui a ete accompli et proposer une suite douce.
- [ ] La progression doit reagir immediatement a une mission terminee.
- [ ] Le jardin d'avance doit rester sobre: croissance liee au travail reel, aucune punition si un jour est rate.
- [ ] Le checkout doit arriver apres un moment de valeur ressenti, pas avant.
- [ ] Le tunnel recommande reste: onboarding court -> premiere mission -> focus ou preview actionnable -> progression visible -> email -> offre 10 euros par mois.
- [ ] Mesurer les evenements d'activation en local au debut: onboarding commence, onboarding termine, mission vue, mission lancee, mission terminee, email donne, checkout clique.
- [ ] Mesurer les evenements de retention: retour lendemain, jours actifs sur 7, missions terminees par semaine, sessions focus lancees, progression du jardin.
- [ ] Mesurer les evenements de conversion: clic checkout, conversion apres premiere mission, conversion apres 3 missions, abandon checkout.

## P1 — Donnees Lycee et Preuve

Etat observe: les priorites visibles sont encore des fixtures demo. Il faut maintenant les relier a un objectif lycee explicite: dossier Parcoursup, controles, specialites et progression hebdomadaire.

- [ ] Definir les sources de preuve lycee: programme, controle a venir, objectif Parcoursup, notes declarees et historique utilisateur.
- [ ] Distinguer clairement fixtures demo et donnees utilisateur dans le code et dans les dossiers.
- [ ] Relier les missions aux donnees de preuve: impact objectif, urgence scolaire, faiblesse utilisateur ou echeance Parcoursup.
- [ ] Afficher la preuve avec sobriete: une phrase courte vaut mieux qu'un tableau dense.

## P2 — Qualite UX Page Par Page

### Dashboard

- [ ] La mission du jour doit dominer visuellement les stats.
- [ ] Les stats doivent etre des signaux de soutien, pas le produit principal.
- [ ] Le bouton principal doit toujours lancer l'action la plus utile.
- [ ] Les missions suivantes doivent etre utiles sans distraire de la mission du jour.

### Onboarding

- [ ] Chaque reponse doit modifier la premiere mission ou le plan preview.
- [ ] L'email arrive apres une preuve de valeur, pas avant.
- [ ] Ajouter un etat d'erreur email calme mais visible.
- [ ] Persister les reponses pour alimenter le dashboard.

### Mission

- [ ] La page mission doit etre une fiche d'action, pas un article.
- [ ] Les cases cochees doivent persister et compter dans la progression.
- [ ] Les ressources liees doivent devenir de vrais liens ou etre marquees comme preview.
- [ ] Le CTA focus doit etre dominant.

### Focus

- [ ] Le timer doit pouvoir terminer une vraie session.
- [ ] La fin de session doit proposer: marquer termine, revoir la preuve, prochaine action.
- [ ] Les ambiances doivent rester optionnelles et ne pas devenir le coeur du produit.
- [ ] Le focus ne doit pas afficher des stats inventees si elles ne viennent pas de l'etat.

### Progression

- [ ] Le jardin doit etre la premiere lecture.
- [ ] Les details analytiques restent dans le panneau lateral.
- [ ] Le panneau doit rester accessible clavier et mobile.
- [ ] La progression doit expliquer calmement pourquoi revenir demain.

### Objectif

- [ ] La heatmap doit repondre a "pourquoi cette mission est intelligente ?".
- [ ] Les priorites doivent pouvoir ouvrir une mission coherente avec le levier clique.
- [ ] Les libelles doivent etre concrets: objectif, controle, Parcoursup, dossier, chapitre fragile.

### Checkout

- [ ] Remplacer le Payment Link test par une config de production avant lancement.
- [ ] Garder la promesse simple: gratuit pour comprendre quoi travailler, payant pour garder le plan quotidien personnalise.
- [ ] Verifier que tous les textes parlent du meme modele: 3 missions offertes puis 10 euros par mois.
- [ ] Ne pas promettre de backend, compte ou sauvegarde multi-appareil avant que ce soit vrai.

## P2 — Bonnes Pratiques Techniques

- [ ] Ajouter un `.env.example` si une configuration locale devient necessaire.
- [ ] Ne jamais mettre de cle secrete Stripe dans le frontend.
- [ ] Ajouter une CI minimale: install, validation data, verification Playwright.
- [ ] Garder les tests Playwright par contrat utilisateur, pas seulement par selecteurs fragiles.
- [ ] Ajouter des tests unitaires pour les fonctions metier: generation mission, progression, limites gratuites, scoring des priorites.
- [ ] Ajouter une commande de format/lint quand l'architecture JS/CSS sera extraite.
- [ ] Eviter les dependances tant qu'elles ne retirent pas une vraie complexite.
- [ ] Garder les fichiers generes clairement identifies et ne pas les editer a la main.
- [ ] Ajouter une checklist de release: liens, responsive, console, paiement, data, textes commerciaux.

## P3 — Contenu et Acquisition

- [ ] Creer les premieres pages methode: Feynman, Pomodoro, active recall, spaced repetition.
- [ ] Chaque page methode doit tenir en 3 parties: c'est quoi, pour qui, comment l'essayer aujourd'hui.
- [ ] Ajouter une source serieuse par methode.
- [ ] Relier chaque contenu a une mission ou un diagnostic.
- [ ] Garder le ton humain, concret, non encyclopedique.
- [ ] Preparer les contenus quotidiens lycee: "l'outil me dit de faire ca aujourd'hui, voila pourquoi".

## Anti AI Slop — Critere De Refus

Refuser ou retravailler une feature si:

- elle ajoute une page sans changer la decision ou l'action de l'utilisateur;
- elle contient du texte generique qu'on pourrait mettre sur n'importe quelle app d'etude;
- elle met l'IA au centre au lieu de la mission;
- elle invente une precision numerique qui ne vient pas d'une source ou d'un etat;
- elle complique l'interface sans ameliorer activation, retention ou conversion;
- elle ajoute de la gamification qui culpabilise ou infantilise;
- elle rend le code plus difficile a naviguer sans gain clair.

## Definition Of Done

Une amelioration est terminee seulement si:

- [ ] elle sert explicitement la boucle mission -> preuve -> progression;
- [ ] elle a une source de donnees claire ou une fixture explicitement nommee;
- [ ] elle ne casse pas le responsive desktop/mobile;
- [ ] elle n'ajoute pas d'erreur console;
- [ ] elle passe les scripts de verification pertinents;
- [ ] elle ne duplique pas inutilement logique, styles ou contenu;
- [ ] elle garde le ton utile, calme et concret.
