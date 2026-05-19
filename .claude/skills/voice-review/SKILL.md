---
name: voice-review
description: Audit et réécriture de texte français pour éliminer les "AI tells". Use when the user asks to review copy, sound more human, fix AI slop in French content, or polish the voice on pages like mission.html, index.html, onboarding.html.
---

Skill spécifique à ObjectifLycee — site français pour lycéens. Détecte et corrige les marqueurs de texte généré par IA dans le copy français user-facing.

## Mode opératoire

1. **Lire le fichier ciblé** (HTML ou markdown)
2. **Extraire le texte user-facing** (ignorer JS, balises, attributs)
3. **Scanner les AI tells** selon la checklist ci-dessous
4. **Proposer une réécriture** qui garde le sens mais brise les patterns
5. **Appliquer via Edit** si l'utilisateur valide, en préservant exactement le HTML

## Checklist des AI tells en français

### Lexique surutilisé (rouge — toujours suspect)

- **Verbes** : maîtriser, plonger, naviguer, accompagner, optimiser, déployer, exploiter
- **Substantifs** : excellence, accompagnement personnalisé, méthodologie éprouvée, approche holistique, expérience unique, écosystème, synergie, paradigme
- **Adjectifs vides** : rigoureux, sur-mesure, innovant, unique, exceptionnel, dédié, premium
- **Transitions** : par ailleurs, en outre, de plus, ainsi, néanmoins (en début de phrase)
- **Tournures creuses** : "il convient de noter", "il est important de souligner", "dans le monde d'aujourd'hui", "à l'ère numérique"

### Structures syntaxiques (orange — à varier)

- **Triades partout** : trois adjectifs, trois bénéfices, trois étapes (l'IA aime les 3)
- **Phrases d'égale longueur** : alterner court/long crée du rythme humain
- **Nominalisations en chaîne** : "l'optimisation de la préparation par l'accompagnement de l'expert" → préférer verbes actifs
- **Subordonnées "permettant de"** : "une méthode permettant d'atteindre" → "une méthode pour atteindre" (ou rien)
- **Em-dashes (—) en rafale** : un par paragraphe max, sinon ça sent l'IA

### Spécifique lycée / éducation (cliché du domaine)

- "Réussir ton trimestre" (générique)
- "Préparation rigoureuse" (creux)
- "Accompagnement personnalisé" (tout le monde le dit)
- "Atteindre vos objectifs" (vide)
- "Boostez votre/ta réussite" (date)

### Patterns à conserver volontairement (anti-fix)

Le but n'est PAS de tout aseptiser. Garder :
- Une formulation imparfaite par paragraphe (humain ≠ parfait)
- Des phrases courtes (3-5 mots) intercalées
- Des incises parlées ("franchement", "honnêtement", "bref")
- Du concret chiffré quand possible (pas "beaucoup d'élèves" mais "470 élèves")

## Heuristique de réécriture

Pour chaque AI tell détecté, appliquer dans cet ordre :

1. **Concrétiser** : remplacer l'abstrait par un fait observable ou un chiffre
2. **Simplifier** : couper la subordonnée, virer l'adverbe, raccourcir
3. **Personnaliser** : utiliser "tu" / "toi" si le ton du site le permet (vérifier l'existant)
4. **Casser le rythme** : alterner longueurs de phrases, glisser une phrase courte tranchée

## Exemple avant/après

**Avant (AI slop)** :
> "Notre méthodologie éprouvée, fruit d'une approche personnalisée et rigoureuse, vous permettra d'atteindre l'excellence dans ton organisation de travail grâce à un accompagnement sur-mesure."

**Après (voix humaine)** :
> "Notre méthode marche. On l'a testée sur 200 lycéens l'an dernier — 78% ont gagne au moins un point de moyenne. Tu travailles avec un prof, pas une plateforme."

Trois changements : preuve chiffrée, phrases courtes, adresse directe au lecteur.

## Workflow d'invocation

Quand l'utilisateur demande "review la voix de X" ou "rends ce texte plus humain" :

1. Lire X
2. Produire un **rapport scanné** : section par section, lister les AI tells avec ligne
3. Proposer **2-3 réécritures candidates** pour les pires offenders
4. Attendre validation avant Edit
5. Une fois validé, Edit en préservant HTML/structure

## Garde-fous

- **Ne pas** réécrire du copy déjà bon juste pour "faire passer le check"
- **Ne pas** ajouter d'oralité forcée si le ton du site est sobre
- **Toujours** respecter la tonalité existante de ObjectifLycee (vérifier mission.html / index.html comme référence)
- **Ne jamais** modifier les CTA, prix, ou éléments légaux sans demander

## Liens vers la suite

- Pour un audit visuel après réécriture : `/design-review`
- Pour générer des variantes de section entière : `/design-shotgun`
- Pour mesurer l'impact (A/B testing copy) : à faire manuellement, pas d'auto pour l'instant
