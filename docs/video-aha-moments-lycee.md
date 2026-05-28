# Aha moments video - Objectif Lycee

**Cible :** lyceens d'abord.
**Angle :** j'ouvre, je sais quoi faire, je comprends pourquoi, je le fais, mon avance devient visible.

Le produit ne doit pas etre filme comme une bibliotheque de fiches. La video doit montrer une boucle courte : diagnostic, mission, preuve, action planifiee ou faite, avance visible.

## Capture reproductible

Commande :

```bash
node scripts/capture-aha-moments.mjs
```

Sortie :

```text
output/playwright/aha-video/
```

La commande genere un clip WebM et des captures PNG par moment. Pour ne filmer qu'un moment :

```bash
node scripts/capture-aha-moments.mjs 03-objectif-progression
```

Ajouter `--headed` permet de voir Chromium pendant la capture.

## Clips prioritaires

| Priorite | Clip | Route | Ce qu'il faut montrer | Hook possible |
|---|---|---|---|---|
| 1 | Diagnostic -> mission prete | `onboarding.html` | Le profil se remplit, puis la premiere mission apparait. | "Tu ne manques pas de fiches. Tu manques du bon prochain geste." |
| 2 | Pourquoi cette mission ? | `index.html` | Le cockpit ouvre la preuve : echeance proche, objectif long terme, mission courte. | "Ce n'est pas une fiche au hasard." |
| 3 | Objectif -> progression visible | `objectif.html` puis `progression.html` | Preuve de choix, puis avance visible apres une mission terminee. | "Quand tu fais la bonne mission, ton avance reste visible." |
| 4 | Rythme recent | `progression.html` | La mission terminee devient une trace visible dans le streak et l'historique. | "25 minutes de travail ne disparaissent pas." |
| 5 | Moyennes par matiere | `progression.html` | Le graphe passe de la moyenne generale a une matiere. | "Les stats existent, mais elles restent au bon endroit." |
| 6 | Objectif, preuve du choix | `objectif.html` | Levier rentable, heatmap, urgence, impact, faisable. | "Objectif Lycee te dit pourquoi cette mission compte." |
| 7 | Cours : choisir la methode | `prototypes/cours/maths-specialite/second-degre/index.html#choix-methode` | L'eleve choisit la methode avant de calculer, puis ouvre la reponse. | "Avant de calculer, choisis la methode." |
| 8 | Brouillon insuffisant vs copie complete | `prototypes/cours/maths-specialite/second-degre/index.html#redaction` | Le bon resultat ne suffit pas : la copie doit rapporter les points. | "Voila pourquoi tu perds des points meme avec le bon resultat." |
| 9 | Porte 20/20 | `prototypes/cours/maths-specialite/second-degre/index.html#vingt-sur-vingt` | Le niveau 20/20 est gate par le niveau controle. | "Pas de raccourci : passe la porte avant." |

## Scripts courts a tester

- "Tu ne manques pas de fiches. Tu manques du bon prochain geste."
- "Avant de calculer, choisis la methode. C'est souvent la que la note se joue."
- "Quand tu termines une mission, ton avance prend racine."
- "Objectif Lycee ne te dit pas juste de travailler. Il te dit pourquoi cette mission compte."

## Regles de tournage

- Commencer par une action visible, pas par une explication sur l'IA.
- Garder les clips courts : un probleme, une interaction, un resultat.
- Montrer les clics importants : diagnostic, pourquoi, planifier ou finir une action, progression, correction.
- Ne pas cacher la densite scolaire : le produit est calme, mais il doit rester serieux.
- Pour les cours de maths, filmer les blocs qui forcent une production eleve : choisir, repondre, ouvrir la correction, comparer une copie.

## A eviter maintenant

- Ne pas filmer les prix ou le checkout tant que le funnel n'est pas aligne.
- Ne pas filmer les temoignages ou stats onboarding marques comme placeholders.
- Ne pas ouvrir avec "IA". Le meilleur signal est mission, preuve, avance visible.
