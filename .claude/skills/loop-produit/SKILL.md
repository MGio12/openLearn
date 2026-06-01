---
name: loop-produit
description: Loop produit en 4 étapes pour solo dev vibecoder - challenge du problème via /office-hours, spec structuré via /product-management:write-spec, review adversarial via /autoplan, puis vibecode. Use when the user says "loop produit", "j'ai une feature", "j'ai une idée", "spec une feature", "nouvelle feature", "avant de coder", "comment spec", "je veux développer X", or asks to plan a feature properly before implementing it. Also triggers on "tourne le loop", "fais tourner le loop", or any request to validate a feature idea before coding.
---

Skill orchestrateur pour solo dev qui vibecode des apps/sites. Objectif : convertir une idée vague en spec serré avec edge cases listés, **avant** d'écrire la moindre ligne de code, pour que l'IA produise du juste-bon du premier coup.

Durée cible : 30 min par feature. Si ça prend plus, c'est que la feature est mal cadrée (et ça vaut le coup de continuer).

## Pré-requis

- Plugin `product-management` installé (`claude plugin list` doit le montrer)
- Skills gstack disponibles : `/office-hours`, `/autoplan`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/codex`

Si un de ces éléments manque, prévenir l'utilisateur et proposer l'install au lieu de continuer.

## Quand invoquer ce skill

- L'utilisateur a une idée de feature à coder mais elle est encore floue
- L'utilisateur a un brief qu'il s'apprête à donner direct à l'IA → freiner et passer par le loop
- L'utilisateur dit "j'ai raté des use cases" / "ça part en allers-retours" → le loop est le remède

Ne **pas** invoquer pour :
- Bug fix ponctuel (le loop est over-engineered)
- Refactor sans changement de comportement utilisateur
- Tâche de moins de 30 lignes de code (skip direct à l'implémentation)

## Le loop - 4 étapes séquentielles

### Étape 1 - Challenge du problème (pas la solution)

**Objectif** : valider que le problème existe vraiment et identifier 2-3 wedges précis.

Demander à l'utilisateur de **décrire le problème en une phrase**, sans mentionner la solution. Si la phrase contient déjà la solution ("ajouter un bouton X"), reformuler : "ok, ça c'est la solution - quel problème est-ce que ça résout pour l'élève / l'utilisateur ?".

Puis invoquer :

```
/office-hours
```

→ Pose les 6 questions YC (demande réelle, status quo, desperate specificity, narrowest wedge, observation, future-fit).

**Alternative** si l'utilisateur veut explorer plusieurs angles produit (pas seulement valider) :

```
/product-management:brainstorm
```

→ Mode sparring partner avec HMW, JTBD, First Principles, OST.

**Gate de passage à l'étape 2** :
- [ ] Le problème tient debout (preuve d'existence : observation, signal, métrique)
- [ ] 2-3 wedges concrets identifiés (pas "une plateforme", mais "un PDF par chapitre + 3 exos masqués")
- [ ] L'utilisateur peut nommer l'utilisateur cible en une phrase

Si une case n'est pas cochée, **rester en étape 1** et creuser. Ne pas passer à la spec d'un problème mal défini.

### Étape 2 - Spec structuré

**Objectif** : un PRD avec user stories, requirements priorisés, success metrics, et surtout **open questions + edge cases listés**.

```
/product-management:write-spec
```

Le plugin va poser des questions sur target users, constraints, success metrics. **Insister** pour que les sections suivantes soient présentes dans la sortie :
- User stories (au minimum 3, format "en tant que X, je veux Y pour Z")
- Requirements priorisés (must-have / nice-to-have)
- Success metrics (1-2 métriques observables)
- **Open Questions** (ce que la spec n'a pas tranché)
- **Out of Scope** (ce qui est volontairement exclu de cette itération)
- **Edge Cases connus** (au moins 5)

Si la sortie n'a pas les 3 sections en gras, demander à l'IA de compléter avant de passer à l'étape 3.

**Gate de passage à l'étape 3** :
- [ ] Le PRD existe en fichier markdown (`docs/specs/<feature>.md` ou équivalent)
- [ ] Open Questions, Out of Scope, Edge Cases sont remplies (pas vides, pas "TBD")
- [ ] L'utilisateur a relu et n'a pas dit "non, c'est pas ça"

### Étape 3 - Review adversarial du spec

**Objectif** : faire sortir les edge cases que l'utilisateur (et l'IA initiale) n'ont pas vus.

```
/autoplan
```

→ Lance CEO + design + eng + DX reviews séquentiellement sur le PRD. C'est l'étape qui résout le problème "je rate des use cases". Le `plan-eng-review` en particulier chasse les edge cases techniques.

**Bonus adversarial fort** si l'utilisateur veut une seconde paire d'yeux indépendante :

```
/codex
```

→ Mode challenge (200 IQ developer adversarial) qui essaie de casser le spec. Souvent trouve 2-3 cas que `autoplan` rate.

Pendant cette étape, **agréger les edge cases trouvés** dans la section "Edge Cases" du PRD. Ne pas les laisser dispersés dans la conversation.

**Gate de passage à l'étape 4** :
- [ ] La section Edge Cases du PRD a au moins doublé en volume (typique : 5 → 10-15)
- [ ] Les Open Questions ont reçu des réponses ou sont marquées "décision : on tranche X parce que Y"
- [ ] Aucune review n'a soulevé un blocker majeur non résolu

Si un blocker majeur reste, **boucler à l'étape 2** pour réécrire la spec, pas à l'étape 1 (le problème est toujours valide).

### Étape 4 - Vibecode

**Objectif** : implémenter avec un brief serré qui liste tout.

Construire le prompt d'implémentation à partir du PRD final. Format minimal :

```
Implémente <feature> selon docs/specs/<feature>.md.

Contraintes :
- Respecter CLAUDE.md (HTML/CSS/JS vanilla pour ObjectifLycée)
- Couvrir les Edge Cases listés dans la spec
- Ne pas dépasser le scope (voir Out of Scope)

Si tu rencontres une Open Question non tranchée, t'arrête et demande.
```

Pendant l'implémentation, **garder le PRD ouvert** comme checklist. Cocher chaque user story et chaque edge case au fur et à mesure.

**Gate de fin de loop** :
- [ ] Toutes les user stories du PRD sont implémentées
- [ ] Tous les edge cases listés ont un comportement testé (même si "afficher un message d'erreur")
- [ ] La success metric est mesurable (instrumentation en place, même basique)

## Exemple concret - paywall ObjectifLycée

Pour la feature "paywall après preuve de progrès" :

1. **`/office-hours`** → "Est-ce que les élèves payent vraiment après preuve, ou c'est une intuition produit ?" Sortie possible : il faut d'abord mesurer le taux de retour J+2 avant de mettre un paywall.
2. **`/product-management:write-spec`** → PRD du flow exact : quand le paywall apparaît, quel signal de "preuve" déclenche, quel pricing, quels user states (parent vs élève, free trial actif, etc.).
3. **`/autoplan`** sur le PRD → typiquement 10+ edge cases sortent : parent qui paie pour l'élève, refund après 1 mois, accès offline déjà téléchargé, élève mineur (RGPD), churn après 1 mois sans utilisation, double-compte (frère/sœur), changement de prix en cours d'abonnement, downgrade, etc.
4. **Vibecode** avec le PRD complet en checklist.

Résultat attendu : 2-3× moins d'allers-retours qu'un vibecode direct à partir de "ajoute un paywall".

## Anti-patterns à signaler à l'utilisateur

- **Skipper l'étape 1** ("je sais déjà ce que je veux") → garantie d'arriver à un produit qui ne sert personne. Forcer au moins 5 min de challenge du problème.
- **Skipper l'étape 3** ("j'ai pas le temps") → c'est l'étape qui paie le plus. Si vraiment 0 temps, au minimum `/plan-eng-review` seul.
- **Utiliser les commandes PM pas adaptées au stade** : `roadmap-update`, `stakeholder-update`, `synthesize-research`, `metrics-review` ne servent qu'à partir de 50+ utilisateurs actifs. Avant, ignorer.
- **Demander "fais X"** au lieu de "spec X, liste open questions, out of scope, edge cases" → règle qui change tout. Si l'utilisateur écrit un prompt direct, lui proposer de passer par le loop d'abord.

## Sortie / hand-off

À la fin du loop, écrire ou mettre à jour `docs/specs/<feature>.md` avec :
- Le PRD final (post-review)
- Les décisions prises sur les Open Questions
- La checklist d'edge cases couverts vs reportés

Ce fichier devient la référence pour les sessions de code suivantes - et pour les futures itérations sur la même feature.

## Liens vers la suite

- Implémentation : workflow standard (Codex → Playwright → screenshot → critique → corrections, voir `WORKFLOW.md`)
- QA post-implémentation : `/qa` ou `/qa-only`
- Review pré-merge : `/review` puis `/simplify`
- Mesure d'impact (quand 50+ users) : `/product-management:metrics-review`
