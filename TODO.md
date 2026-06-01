# TODO - Execution lineaire avec goal

But : donner a un agent une file de travail simple a suivre sans reinterpretation permanente. Le fichier se lit de haut en bas. On prend le premier item restant, on l'implemente, on teste, on verifie, on met a jour les docs si necessaire, puis on supprime l'item termine du fichier.

Objectif produit actuel : rendre chaque page du site vraiment fonctionnelle en local, pouvoir creer un compte local et se servir du site, puis integrer une premiere couche IA utile aux cours. Le premier cas IA cible est la methode Feynman a la fin de chaque cours : l'eleve ecrit ce qu'il a compris, l'IA corrige, precise les manques, approfondit clairement, et adapte son ton au profil demande.

## Regle pour lancer un goal

Objectif conseille compact :

```text
Localise le premier item restant dans TODO.md avec `rg -n "^### |^- \\[ \\]" TODO.md`, lis seulement cet item et les docs/fichiers qu'il cite explicitement, applique la boucle obligatoire, puis supprime l'item de TODO.md uniquement quand il est implemente, verifie et documente si besoin.
```

Regles d'execution :

- Ne traiter qu'un item actif a la fois.
- Ne pas sauter un item parce qu'il semble plus facile plus loin.
- Ne pas garder d'items coches dans `TODO.md` : un item fini doit etre supprime entierement.
- Ne pas ajouter de longues preuves dans `TODO.md`; mettre les preuves utiles dans la reponse finale, le message de commit, ou la doc durable pertinente.
- Si un item est deja fait dans le code, le prouver par lecture et verification avant de le supprimer du fichier.
- Si une verification echoue, corriger l'item courant avant de continuer, sauf si l'echec vient clairement d'une zone sans rapport.
- Ne pas lancer de gros refactor hors item courant.
- Faire un commit git a la fin de chaque item/changement termine, apres tests, doc-impact-review, eventuelles mises a jour Markdown, et `git diff --check`.
- Ne pas faire de commit si une verification liee a l'item echoue.
- Ne pas push sans demande explicite.
- Donner le SHA court du commit et les commandes de verification executees dans la reponse finale ou le message de commit, pas dans `TODO.md`.
- Apres toute edition de fichier du repo, appliquer le garde-fou `.agents/skills/doc-impact-review` avant la reponse finale.

## Boucle obligatoire pour chaque item

1. **Comprendre**
   - Lire `CLAUDE.md`.
   - Lire `docs/agent-codebase-map.md` si l'item touche une zone code existante.
   - Lire les docs ciblees indiquees par `CLAUDE.md` pour le scenario concerne.
   - Inspecter `git status --short` pour ne pas ecraser le travail existant.

2. **Implementer**
   - Modifier uniquement les fichiers necessaires a l'item courant.
   - Garder le code simple, vanilla, et coherent avec les conventions existantes.
   - Si l'item touche `onboarding/*.jsx`, lancer ensuite `npm run build:onboarding`.

3. **Tester**
   - Lancer les commandes ciblees indiquees dans l'item.
   - Ajouter une verification manuelle ou Playwright quand le comportement visible compte.
   - Pour les pages de cours maths, appliquer les verifications Course Page Agent.

4. **Verifier**
   - Lancer `git diff --check`.
   - Lancer `npm run verify` quand l'item touche un flux transversal ou avant de considerer un lot comme termine.
   - Noter les commandes executees et leur resultat.

5. **Documenter**
   - Lancer le skill `.agents/skills/doc-impact-review`.
   - Mettre a jour les Markdown utiles si le changement modifie comportement, architecture, commandes, analytics, pricing, onboarding, funnel, cours, ou conventions.

6. **Clore l'item**
   - Supprimer l'item courant de `TODO.md` seulement si les criteres de fini sont remplis.
   - Ne pas laisser de section cochee, de `Preuves` longues, ni d'historique d'item termine dans `TODO.md`.
   - Faire le commit de l'item seulement si les verifications liees a l'item ont reussi.
   - Passer au prochain item restant.

## File active

### 7. Injection du contenu de cours

- [ ] Injecter le bon contexte de cours dans l'appel IA sans exploser le prompt.

Objectif : l'IA corrige par rapport au cours reel, pas depuis une lecon generique.

Actions :

- Pour chaque cours cible, definir une extraction de contexte :
  - titre ;
  - niveau ;
  - objectifs ;
  - definitions essentielles ;
  - proprietes ;
  - methodes ;
  - exemples corriges courts ;
  - pieges frequents ;
  - attendus de redaction.
- Ne pas injecter tout le HTML brut.
- Commencer avec un contexte manuel ou genere statiquement par cours, puis generaliser.
- Prevoir une taille maximale du contexte envoye.
- Pour les cours maths, respecter les regles Course Page Agent et ne pas remplacer les sources PDF par une lecon inventee.

Tester :

- Comparer deux cours differents : l'IA doit parler du bon chapitre.
- Verifier qu'une notion absente du contexte est signalee prudemment.
- `npm run verify:course-agent`
- `git diff --check`

Criteres de fini :

- Le contexte envoye est court, structure, et lie au cours ouvert.
- L'IA ne repond pas comme un tuteur generique deconnecte du chapitre.
- La methode fonctionne au moins sur un cours pilote avant generalisation.

### 8. Page pilote Feynman sur un cours

- [ ] Integrer la methode Feynman sur un premier cours pilote.

Objectif : valider l'experience complete sur un seul vrai cours avant de la copier partout.

Actions :

- Choisir un cours pilote deja assez stable.
- Ajouter le bouton/zone Feynman a la fin du cours.
- Brancher le contexte du cours pilote.
- Sauvegarder localement la tentative et le retour.
- Verifier que KaTeX, sidebar, corrections, et bouton Feynman cohabitent sans conflit.

Tester :

- `npm run verify:course-sidebar`
- `npm run verify:course-agent`
- Test navigateur desktop/mobile.
- `git diff --check`

Criteres de fini :

- Le cours pilote a une experience Feynman complete.
- Les interactions de correction/reveal du cours continuent de marcher.
- Le composant peut etre reutilise sans copier un bloc fragile partout.

### 9. Generalisation aux cours

- [ ] Ajouter la methode Feynman a tous les cours cibles, progressivement.

Objectif : chaque cours important propose une vraie activite de restitution a la fin.

Actions :

- Lister les cours a couvrir en premier.
- Pour chaque cours :
  - ajouter ou verifier le bouton Feynman ;
  - fournir le contexte court du cours ;
  - verifier que le texte d'aide correspond au chapitre ;
  - tester l'envoi mock ;
  - verifier les interactions existantes.
- Ne pas generaliser a un cours dont la source/contenu n'est pas assez fiable.

Tester :

- `npm run verify:course-sidebar`
- `npm run verify:course-agent`
- `git diff --check`

Criteres de fini :

- Tous les cours cibles ont le meme comportement de base.
- Chaque cours envoie un contexte specifique.
- Aucun cours n'a de formule KaTeX compressee, scroll horizontal, ou overflow ajoute par le bloc IA.

### 10. Profils de ton IA

- [ ] Permettre a l'eleve de choisir le ton de retour IA sans multiplier prematurement les agents.

Objectif : adapter la forme du feedback sans changer la rigueur pedagogique.

Actions :

- Ajouter un choix dans le compte local ou les parametres :
  - simple ;
  - normal ;
  - exigeant ;
  - coach calme.
- Traduire ce choix en consignes de prompt.
- Ne pas creer plusieurs agents techniques tant qu'un prompt parametre suffit.
- Garder la possibilite future de specialiser des agents si les tests montrent un vrai besoin :
  - agent clarificateur ;
  - agent correcteur mathematique ;
  - agent coach ;
  - agent examinateur.

Tester :

- Meme reponse eleve, quatre tons differents.
- Verifier que les erreurs signalees restent les memes.
- `npm run verify:localstorage`
- `git diff --check`

Criteres de fini :

- Le ton change vraiment.
- L'exigence et la correction des erreurs ne changent pas.
- Le choix persiste localement.

### 11. Historique local IA et progression

- [ ] Relier les tentatives Feynman a la progression locale.

Objectif : que l'IA ne soit pas une boite de dialogue isolee, mais une trace de travail utile.

Actions :

- Sauvegarder par cours :
  - date de tentative ;
  - texte eleve ;
  - resume du retour IA ;
  - prochaine micro-action ;
  - statut : a refaire, correct, a approfondir.
- Afficher une trace simple dans progression ou dans le cours.
- Ne pas stocker de donnees sensibles inutiles.
- Prevoir un bouton supprimer l'historique local IA.

Tester :

- `npm run verify:localstorage`
- `npm run verify:s02`
- `npm run verify:cwv`
- `git diff --check`

Criteres de fini :

- Une tentative Feynman apparait dans la progression locale.
- L'eleve peut reprendre ou supprimer son historique.
- La progression reste lisible sans backend.

### 12. Documentation d'installation IA locale

- [ ] Documenter comment lancer le site en local avec ou sans DeepSeek.

Objectif : pouvoir reprendre le projet sans redeviner la configuration IA.

Actions :

- Documenter :
  - commandes de lancement local ;
  - variable `DEEPSEEK_API_KEY` ;
  - mode mock sans cle ;
  - endpoint local IA ;
  - limites de securite ;
  - cout/usage a surveiller ;
  - ou verifier les docs officielles DeepSeek avant upgrade.
- Mentionner que les noms de modeles et options DeepSeek doivent etre verifies au moment de l'implementation.

Tester :

- Relire la doc comme un utilisateur qui n'a jamais lance l'IA.
- `git diff --check`

Criteres de fini :

- Un futur agent ou le mainteneur peut lancer le mode mock.
- Un futur agent ou le mainteneur peut configurer une vraie cle localement.
- La doc n'expose aucun secret.

### 13. QA complete locale

- [ ] Tester le parcours complet en local avec compte et IA.

Objectif : valider que le site est utilisable pour travailler vraiment en local.

Actions :

- Parcours complet :
  - creer un compte local ;
  - remplir ou reprendre l'onboarding ;
  - ouvrir les pages principales ;
  - ouvrir un cours ;
  - utiliser la methode Feynman ;
  - lire le feedback IA ou mock ;
  - retrouver la trace dans la progression ;
  - modifier les preferences IA ;
  - reinitialiser si besoin.
- Tester sans cle API puis avec cle API si disponible.
- Corriger les bugs bloquants trouves dans ce parcours.

Tester :

- `npm run verify`
- `git diff --check`
- Test navigateur desktop/mobile.

Criteres de fini :

- Le parcours local fonctionne de bout en bout.
- Le mode mock fonctionne sans cle.
- Le mode DeepSeek fonctionne si une cle est configuree.
- Les limites restantes sont documentees.

## Hors file active

Ces sujets ne doivent pas interrompre la file active sauf demande explicite :

- Backend complet, comptes utilisateurs, Stripe reel, emails.
- Migration Astro/MDX des cours.
- Refonte generale du design system.
- Espace parent durable avec historique serveur.
- Ajout de dependances npm non indispensables.

## Rappel cours de maths

Si un item touche une page de cours ou de TD maths, il faut appliquer le role Course Page Agent de `AGENTS.md` avant edition :

- lire les docs pedagogiques listees dans `AGENTS.md` ;
- partir des PDFs valides ;
- produire une mini-carte de couverture ;
- verifier KaTeX, sidebar, corrections, interactions, graphes exacts, absence d'overflow ;
- lancer les commandes de verification course quand disponibles.
