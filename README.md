# ObjectifLycee

ObjectifLycee est un prototype statique pour aider les lyceens a travailler leurs specialites, leurs controles et leur progression. Le projet est volontairement simple : HTML, CSS et JavaScript vanilla, avec des prototypes de cours de maths interactifs en HTML + KaTeX.

## Demarrage rapide

```bash
npm install
npm run verify
```

Le site est statique. Pour le consulter localement, lancer un serveur simple a la racine :

```bash
python3 -m http.server 4173
```

Puis ouvrir `http://localhost:4173`.

## Entrees principales

- `index.html` : entree du prototype public.
- `objectif.html`, `planning.html`, `progression.html`, `checkout.html` : parcours lycee apres la mission du jour du cockpit.
- `prototypes/cours/` : cours de maths isoles avant integration au site public.
- `docs/` : decisions produit, regles de creation de cours, pipeline IA et guides pedagogiques.
- `lien/` : sources de reference, notamment les PDFs de Premiere specialite maths.
- `scripts/` : verifications, captures et outils de support.

Pilote IA de cours : le tiroir IA v1 est disponible uniquement sur `prototypes/cours/maths-specialite/second-degre/index.html`. Les autres chapitres peuvent partager le CSS/JS, mais ne doivent pas etre presentes comme pilotes IA tant qu'ils n'exposent pas le manifeste et les boutons dedies.

Note externe : `docs/monetisation-app-posture-mouvement-ergonomie.md` contient un plan autonome pour une app posture, mouvement et ergonomie. Il n'appartient pas au produit ObjectifLycee, mais reste versionne ici comme document strategique separe.

## Regles pour les agents

Les consignes agents sont versionnees dans le depot pour rester disponibles depuis n'importe quel clone.

1. Lire `AGENTS.md` en premier.
2. Utiliser `CLAUDE.md` comme source de verite du projet.
3. Pour un cours de maths, appliquer le role **Course Page Agent**.
4. Ne pas creer un cours depuis la memoire quand des PDFs valides existent.

Les regles importantes pour les cours de maths :

- le cours doit faire produire l'eleve, pas seulement lui faire lire une correction ;
- les notations restent stables entre definition, methode, exemple et correction ;
- les equations doivent etre propres, en KaTeX, separees ou numerotees quand il y a plusieurs reponses ;
- aucune formule ne doit etre compressee, scrollee horizontalement ou coupee au hasard ;
- les graphes mathematiques doivent etre exacts avec JSXGraph, Desmos, GeoGebra ou points calcules, jamais dessines a la main ;
- la sidebar de cours reste fixe a gauche, ouverte au premier chargement, repliee par largeur, avec une fleche fermee centree et non cliquable.

## Creer ou modifier un cours de maths

Avant d'ecrire la page, lire dans cet ordre :

1. `CLAUDE.md`
2. `docs/regles-creation-cours-maths.md`
3. `docs/techniques-apprentissage-maths.md`
4. `docs/pipeline-cours-ia.md`
5. `docs/generation-image-cours.md`
6. les sources du chapitre dans `lien/premiere/math.md`
7. le prototype existant et les fichiers CSS/JS partages de la matiere

Le cours attendu n'est pas un PDF plus joli. Il doit garder la densite mathematique des sources, puis ajouter ce que le web permet : questions immediates, corrections masquees, choix de methode, graphes exacts, exercices progressifs et redaction de controle.

Chaque chapitre doit aussi avoir des notes de generation : sources utilisees, notions reprises, choix pedagogiques, graphes exacts, elements exclus et raisons.

## Verifications utiles

Verification generale du site :

```bash
npm run verify
```

Verification specifique des pages de cours :

```bash
npm run verify:course-sidebar
npm run verify:course-agent
```

Avant de considerer un cours termine, verifier aussi :

- KaTeX sans erreur console ;
- aucune formule avec debordement horizontal ;
- boutons de correction fonctionnels ;
- graphes exacts visibles et non vides quand le chapitre en utilise ;
- sidebar ouverte, fermee, hover/focus, desktop et mobile ;
- pour le pilote IA second degre : manifeste, boutons pedagogiques, acces directs depuis le haut de page, marqueurs sidebar, focus du tiroir et feedback texte ;
- aucun chevauchement de texte ni overflow global ;
- `git diff --check`.

## Regle de maintenance

Quand une nouvelle contrainte agent est ajoutee, la mettre au minimum dans `CLAUDE.md`. Si elle concerne directement les agents externes ou les sous-agents, la reporter aussi dans `AGENTS.md`. Si elle concerne la generation de cours, la dupliquer dans le guide de cours correspondant sous `docs/`.
