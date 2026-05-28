# Objectif Lycee — Dashboard Cockpit Implementation Spec

## Scope

Static HTML/CSS/JS implementation for a lycee study cockpit. The first screen must answer one question: what should the student work on now?

Note 2026-05-28 : les routes publiques `mission.html` et `focus.html` ont ete retirees. La mission du jour reste un concept produit et un etat partage, mais les entrees publiques pointent maintenant vers `objectif.html` pour la preuve, puis `planning.html`, `progression.html` ou `checkout.html` selon l'action.

## Core Pages

```text
index.html        cockpit + mission du jour
objectif.html     preuve objectif, dossier et priorites
planning.html     placement de la prochaine action
progression.html  progression visible
checkout.html     abonnement
merci.html        confirmation
```

## Product Rules

- Keep the daily mission visually dominant.
- Use objective proof only as support: dossier, Parcoursup, controls, chapter weaknesses.
- Avoid dense analytics as the main experience.
- Keep the tone concrete, calm and lycee-specific.
- Do not promise backend, account access or sync before those systems exist.
