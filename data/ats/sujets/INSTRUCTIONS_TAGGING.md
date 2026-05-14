# Instructions de tagging — Sujets ATS

## Objectif
Pour chaque sujet ATS d'une année donnée, identifier les topics abordés et les noter dans le fichier JSON correspondant. Ce travail alimente l'algorithme de pondération qui détermine les priorités de révision.

## Structure des fichiers
```
data/ats/sujets/
  2024/
    mathematiques.json
    physique-chimie.json
    francais.json
    anglais.json
    sciences-de-lingenieur.json
  2023/
    ...
```

## Format d'un topic

```json
{
  "id": "identifiant-en-kebab-case",
  "nom": "Nom lisible du chapitre/notion",
  "sousChapitre": "Précision optionnelle",
  "occurrences": 1,
  "mentionJury": false,
  "notes": "Observations libres"
}
```

## Champs

| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique, kebab-case, stable d'une année sur l'autre (ex: `algebre-lineaire`, `cinematique`, `comprehension-ecrite`) |
| `nom` | string | Nom du chapitre ou de la notion (ex: "Algèbre linéaire", "Cinématique du point") |
| `sousChapitre` | string | Précision (ex: "Matrices et déterminants") — optionnel |
| `occurrences` | number | Combien de fois ce topic apparaît dans le sujet (1 = une question, 2 = deux exercices, etc.) |
| `mentionJury` | boolean | `true` si le rapport de jury de cette année mentionne ce topic explicitement (voir `jurys/{annee}/rapport.json`) |
| `notes` | string | Tes observations libres — omettable |

## Rapports de jury

Dans `jurys/{annee}/rapport.json`, noter les observations clés du jury :

```json
{
  "annee": 2024,
  "source": "Rapport de jury ATS",
  "url": "https://www.concoursats.fr/",
  "observations": [
    {
      "matiere": "mathematiques",
      "topicId": "algebre-lineaire",
      "observation": "Les candidats ont souvent confondu valeur propre et vecteur propre.",
      "importance": "haute"
    }
  ]
}
```

## Matières ATS — IDs stables à utiliser

### Mathématiques
- `algebre-lineaire` — Matrices, déterminants, espaces vectoriels
- `probabilites-statistiques` — Variables aléatoires, lois, tests
- `analyse` — Suites, séries, intégrales, équations différentielles
- `geometrie` — Produits scalaire/vectoriel, géométrie analytique
- `calcul-differentiel` — Dérivées partielles, gradient, Jacobien

### Physique-Chimie
- `mecanique` — Cinématique, dynamique, énergie
- `thermodynamique` — Premier/second principe, cycles
- `electricite` — Circuits, régime sinusoïdal, filtres
- `optique` — Géométrique, ondulatoire
- `chimie-generale` — Acido-basique, oxydo-réduction, équilibres
- `chimie-organique` — Réactions, mécanismes

### Sciences de l'Ingénieur
- `modelisation-mecanique` — Liaisons, schémas cinématiques
- `resistance-materiaux` — Contraintes, déformations
- `automatique` — Systèmes asservis, correcteurs
- `energetique` — Bilan, rendement
- `materiaux` — Propriétés, choix de matériaux

### Français
- `comprehension-texte` — Lecture analytique
- `synthese` — Synthèse de documents
- `redaction` — Expression écrite, argumentation
- `contraction` — Résumé de texte

### Anglais
- `comprehension-ecrite` — Compréhension de texte
- `expression-ecrite` — Rédaction, traduction
- `vocabulaire-technique` — Vocabulaire scientifique/technique
- `traduction` — Thème ou version

## Algorithme de pondération (calculé automatiquement)

```
score = frequency × recencyWeight + juryBonus
  frequency      = nb total d'occurrences sur toutes les années
  recencyWeight  = 1.0 (année N) → 0.9 (N-1) → 0.81 (N-2) → ...
  juryBonus      = +0.2 si mentionJury=true sur l'une des années
```

Le fichier `data/ats/poids/weighted-topics.json` est généré automatiquement à partir de ce tagging.

## Workflow recommandé

1. Télécharger le sujet depuis Arts et Métiers
2. Lire le sujet entier (30 min max par sujet)
3. Remplir le JSON de la matière correspondante
4. Lire le rapport de jury si disponible → cocher `mentionJury: true` + ajouter l'observation dans `jurys/{annee}/rapport.json`
5. Commit : `git add data/ats/ && git commit -m "data: tag sujets ATS {annee} {matiere}"`
