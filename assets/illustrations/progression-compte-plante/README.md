# Illustrations de progression du compte

Ce dossier contient la série d'images imagegen qui représente la progression globale du compte avec une plante qui grandit.

Ces images ne sont pas liées à un exercice précis. Elles servent à montrer un état de progression utilisateur dans le dashboard, la page progression ou un futur espace compte.

## Nommage attendu

Utiliser des fichiers `.webp` optimisés pour le web :

- `plant-stage-01-seed.webp`
- `plant-stage-02-sprout.webp`
- `plant-stage-03-young-plant.webp`
- `plant-stage-04-strong-plant.webp`
- `plant-stage-05-flower.webp`

Si une image source haute qualité est conservée temporairement, la placer dans ce dossier avec le suffixe `-source`, puis supprimer la source avant publication si elle est trop lourde.

## Paliers produit

| Image | Palier | Sens produit |
|---|---|---|
| `plant-stage-01-seed.webp` | Graine | Compte créé, premiers cours ouverts |
| `plant-stage-02-sprout.webp` | Pousse | Premières réponses données |
| `plant-stage-03-young-plant.webp` | Jeune plante | Régularité installée |
| `plant-stage-04-strong-plant.webp` | Plante robuste | Méthodes maîtrisées sur plusieurs chapitres |
| `plant-stage-05-flower.webp` | Fleur | Autonomie et rédaction propre niveau contrôle |

La croissance doit dépendre de signaux pédagogiques observables, pas seulement du temps passé ou du nombre de connexions.

## Accessibilité

- Afficher le palier en texte visible à côté de l'image.
- Ne jamais transmettre l'état du compte uniquement par l'image.
- Ne pas dépendre uniquement de la couleur pour distinguer les paliers.
- Utiliser `alt=""` et `aria-hidden="true"` si l'image est décorative.
- Utiliser un alt court si l'image porte le statut, par exemple : `Jeune plante avec plusieurs feuilles, palier régularité installée`.
- Prévoir une phrase de prochain objectif dans l'interface, par exemple : `Réussis 2 exercices sans aide pour atteindre le palier Jeune plante.`
- Respecter `prefers-reduced-motion` si une animation de croissance est ajoutée plus tard.

## Prompt de base imagegen

```text
A consistent educational illustration of a small plant growing in a simple ceramic pot, stage 1 of 5, seed just sprouting, warm natural light, clean background, friendly but not childish, same camera angle, same pot, same background, same composition for all stages, no text, no numbers, no formulas, no axes, no mathematical symbols, no watermark, no logo.
```

Changer seulement le numero et la description du palier pour chaque image afin de garder une serie visuellement coherente.
