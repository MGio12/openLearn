# Outil Prepa — Workflow de développement

Ce fichier définit les processus de travail permanents du projet.
Il est la référence à lire avant chaque session de travail.

---

## Workflow 1 — Pipeline données ATS

Comment les données brutes deviennent des insights dans l'UI.

```
Étape 1 — Source
  PDFs officiels sur concoursats.fr
  URLs déjà référencées dans data/ats/sujets/{annee}/{matiere}.json

Étape 2 — Extraction (Claude lit les PDFs)
  Claude télécharge le PDF via l'URL du JSON
  Claude identifie les chapitres abordés dans le sujet
  Claude remplit les champs du JSON :
    - id          → identifiant kebab-case stable (ex: "algebre-lineaire")
    - nom         → nom lisible
    - occurrences → combien de fois dans le sujet
    - mentionJury → true si le rapport jury en parle
    - notes       → observations libres

Étape 3 — Rapports de jury (optionnel mais précieux)
  Claude lit le rapport de jury (URL dans jurys/{annee}/rapport.json)
  Claude remplit les observations par matière + topicId

Étape 4 — Calcul des poids (script Node)
  node scripts/compute-weights.js
  Formule : score = frequency × recencyWeight + juryBonus
    recencyWeight  = 0.9^(annéesDepuisAujourdhui)  // années récentes = plus de poids
    juryBonus      = +0.2 si mentionJury = true
  Output : data/ats/poids/weighted-topics.json

Étape 5 — Affichage
  ats.html fetch() les JSON
  Heatmap générée dynamiquement
  Priorités triées par score pondéré
```

**Règle :** Ne jamais écrire de données à la main dans weighted-topics.json.
C'est toujours généré par le script à partir des sujets taggés.

---

## Workflow 2 — Boucle d'itération visuelle (Codex + Playwright)

Comment on améliore l'UX sans boucles infinies subjectives.

```
Étape 1 — Implémentation initiale
  Claude (ou Codex) implémente la feature ou la modification CSS/HTML

Étape 2 — Capture Playwright
  Playwright ouvre la page dans un vrai navigateur (Chromium)
  Screenshot pleine page + screenshot above-the-fold
  Screenshots sauvegardés dans /screenshots/{nom-page}-{timestamp}.png

Étape 3 — Review Claude (lecture image)
  Claude lit le screenshot
  Claude évalue selon 4 critères :
    [ ] Hiérarchie visuelle — l'information la plus importante est-elle dominante ?
    [ ] Cohérence design — borders, shadows, colors conformes à la branding bible ?
    [ ] Lisibilité — densité OK, espace négatif suffisant ?
    [ ] Promesse produit — est-ce que ça donne le sentiment "calme, maîtrisé, coup d'avance" ?

Étape 4 — Verdict
  PASS → on passe à la feature suivante
  FIX  → Claude rédige les corrections précises (CSS/HTML spécifique)
         Codex applique les corrections
         Retour à l'étape 2

Étape 5 — Validation finale
  Minimum 2 PASS consécutifs avant de considérer la feature terminée
```

**Règle :** Codex implémente, Claude orchestre et lit les images.
Claude ne code pas pendant la boucle d'itération — il pilote.

**Critère d'arrêt :** La boucle s'arrête quand Claude passe les 4 critères au PASS.
Pas de "assez bon" subjectif — les 4 critères doivent passer.

---

## Workflow 3 — Décision de feature

Avant d'implémenter quoi que ce soit de nouveau.

```
1. Est-ce que c'est dans la séquence de build du spec vision ?
   NON → on n'implémente pas maintenant, on note pour plus tard
   OUI → on continue

2. Est-ce que ça sert directement la promesse "coup d'avance" ?
   NON → on questionne l'utilité avant d'avancer
   OUI → on continue

3. Est-ce que c'est le plus simple possible qui marche ?
   NON → on simplifie d'abord
   OUI → on implémente
```

**Règle absolue (MVP discipline) :** Toujours prioriser utilité réelle et vitesse de shipping
avant perfection visuelle, fonctionnalités secondaires, ou écosystème complet.

---

## Référence rapide — fichiers clés

| Fichier | Rôle |
|---|---|
| `docs/superpowers/specs/2026-05-14-vision-produit.md` | Boussole produit — le QUOI |
| `WORKFLOW.md` | Ce fichier — le COMMENT |
| `data/ats/sujets/INSTRUCTIONS_TAGGING.md` | Guide de tagging des sujets ATS |
| `data/ats/poids/weighted-topics.json` | Scores calculés (généré, ne pas éditer) |
| `colors_and_type.css` | Tous les tokens design |
| `ats.html` | Page principale ATS — priorité Phase 1 |
