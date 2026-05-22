# Objectif Lycee Design Brief

## Visual Scene

Un lyceen ouvre le produit en fin d'apres-midi, sur ordinateur ou mobile, avant de travailler. L'interface doit ressembler a un carnet de pilotage calme : papier chaud, bordures nettes, stabilo, preuves lisibles, aucune pression inutile.

## Style

Produit statique vanilla HTML/CSS/JS. Pas de framework, pas de nouvelle dependance npm.

Style Objectif Lycee : papier chaud, grille subtile, bordures fortes, ombres dures, accents de stabilo, panneaux lisibles et utilitaires.

## Tokens

Source principale : `colors_and_type.css`.

- Fond : `--paper`, `--paper-2`, `--paper-3`
- Texte et bordures : `--ink`, `--ink-soft`, `--border`
- CTA : `--stabilo`, `--stabilo-2`
- Signaux : `--blue`, `--green`, `--orange`, `--beige`, `--red`
- Display : `Archivo Black`
- Corps : `Plus Jakarta Sans`
- Ombres : offsets durs `--sh-1`, `--sh-2`, `--sh-3`

## Layout Rules

Chaque page doit avoir une action principale identifiable vite. La mission du jour et la preuve passent avant les statistiques.

Garder les blocs denses mais respirants. Les cartes servent a grouper une decision, une action ou une preuve, pas a decorer.

Sur mobile, une seule colonne lisible, cibles tactiles confortables, aucun overflow horizontal.

## Interaction Rules

Les boutons et liens doivent avoir des etats hover, focus-visible et active clairs. Les formulaires ont un label visible et une erreur proche du champ.

Les placeholders doivent etre honnetes : indiquer "prototype", "preview" ou "bientot" quand une fonctionnalite n'existe pas vraiment.

## Bans

- Pas de palette violet/bleu IA.
- Pas de glassmorphism decoratif.
- Pas de gradient text.
- Pas de promesse commerciale non supportee.
- Pas de scroll horizontal global.
- Pas de texte qui se chevauche, desktop ou mobile.

