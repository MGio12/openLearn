# Requirements: Objectif Lycee

**Defined:** 2026-05-18
**Core Value:** "Toujours un chapitre d'avance" — une mission utile maintenant, reliee a l'objectif lycee.

## v1 Requirements

### Cockpit

- [x] **LYC-01**: Le dashboard affiche une mission du jour avant les signaux secondaires.
- [x] **LYC-02**: La mission du jour expose titre, raison, duree, etapes et CTA vers `mission.html`.
- [x] **LYC-03**: Les liens principaux menent vers `mission.html`, `objectif.html`, `progression.html` et `checkout.html`.

### Objectif

- [x] **OBJ-01**: `objectif.html` explique les leviers du dossier et leur impact.
- [x] **OBJ-02**: Les priorites utilisent des libelles lycee: dossier, controle, Parcoursup, chapitre fragile.
- [ ] **OBJ-03**: Les priorites devront venir d'une source claire: fixture nommee, etat utilisateur ou echeance explicite.

### Routine

- [x] **ROUTINE-01**: Terminer une mission met a jour la progression locale.
- [x] **ROUTINE-02**: Le focus peut completer la mission du jour.
- [ ] **ROUTINE-03**: L'onboarding doit modifier la premiere mission ou le plan preview.

### Paiement

- [x] **PAY-01**: La page abonnement presente l'offre 10 EUR/mois avec un CTA clair.
- [ ] **PAY-02**: Le Payment Link Stripe live doit etre configure avant lancement.
- [x] **PAY-03**: La page de confirmation post-paiement existe.

### Qualite

- [x] **QA-01**: `npm run verify` lance les verifications existantes.
- [x] **QA-02**: `npm run validate:json` detecte JSON vide, BOM et JSON invalide.
- [ ] **QA-03**: Ajouter une CI minimale quand le repo est pret.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Framework JS | Vanilla JS only — MVP discipline |
| Backend complet | Le prototype reste statique tant que le funnel n'est pas valide |
| Gamification agressive | Contraire au positionnement calme et utile |

---
*Updated: 2026-05-18 — lycee-only scope*
