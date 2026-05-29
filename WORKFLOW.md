# Objectif Lycee — Workflow de développement

Ce fichier définit les processus de travail permanents du projet.
Il est la référence à lire avant chaque session de travail.

---

## Workflow 1 — Pipeline donnees lycee

Comment les donnees de demo et les futurs signaux utilisateur deviennent des priorites dans l'UI.

```
Etape 1 — Source
  Objectif declare par l'eleve
  Matieres et specialites
  Echeances: controles, bac, Parcoursup
  Historique local: missions vues, lancees, terminees

Etape 2 — Normalisation
  assets/js/domain/model.js garde le modele central
  assets/js/state/store.js persiste l'etat local
  scripts/mission-ui.js expose la mission du jour aux pages

Etape 3 — Scoring
  Chaque levier recoit un score simple:
    - urgence calendrier
    - impact dossier
    - fragilite declaree ou observee
    - temps disponible aujourd'hui

Etape 4 — Affichage
  objectif.html explique pourquoi la mission compte
  index.html garde la mission du jour en premier
  planning.html reçoit l'action à placer dans la semaine
  progression.html montre l'avance sans surcharger
```

**Regle :** une priorite visible doit venir d'une source claire: fixture demo nommee, etat utilisateur ou echeance explicite.

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
| `docs/mission-valeur-monetisation.md` | Mission du site, valeur utilisateur, funnel et monétisation |
| `WORKFLOW.md` | Ce fichier — le COMMENT |
| `colors_and_type.css` | Tous les tokens design |
| `objectif.html` | Page preuve objectif — impact dossier et priorites |
