# Objectif Lycee — Dashboard Cockpit Implementation Spec

## Scope

Static HTML/CSS/JS implementation for a lycee study cockpit. The first screen must answer one question: what should the student work on now?

## Core Pages

```text
index.html        cockpit + mission du jour
mission.html      execution de la mission
focus.html        session focus
objectif.html     preuve objectif, dossier et priorites
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
