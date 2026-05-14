# Requirements: Outil Prepa

**Defined:** 2026-05-14
**Core Value:** "Toujours un chapitre d'avance" — coup d'avance permanent sur le programme

## v1 Requirements

### ATS Dashboard

- [x] **ATS-01**: La heatmap affiche les topics maths ATS par annee (2018-2024)
- [x] **ATS-02**: La colonne Total est visuellement dominante (22px Archivo Black + barre stabilo proportionnelle)
- [x] **ATS-03**: compute-weights.js genere weighted-topics.json depuis les JSON de sujets tagues
- [x] **ATS-04**: Les sujets maths 2018-2024 sont tagues avec les vrais topics (id, occurrences, mentionJury)

### Heatmap Dynamique

- [x] **ATS-05**: Les lignes de la heatmap sont generees en JS depuis weighted-topics.json (zero HTML statique pour les donnees)
- [x] **ATS-06**: Les colonnes annees sont calculees dynamiquement depuis la plage reelle des donnees
- [x] **ATS-07**: Les etats cellules (rempli/vide) sont calcules depuis le tableau years du topic
- [x] **ATS-08**: La colonne Total affiche le compte Nx et une barre proportionnelle depuis le score JSON
- [x] **ATS-09**: Les onglets de filtre par matiere fonctionnent (afficher/masquer par slug de matiere)
- [x] **ATS-10**: La liste de priorite des topics est rendue sous la heatmap, classee par score descendant

### Paiement

- [x] **PAY-01**: Landing page presentant l'offre (acces parcours personnalise) avec un bouton d'achat clair
- [ ] **PAY-02**: Checkout Stripe s'ouvre et accepte un vrai paiement de 10EUR/mois (mode live ou test)
- [x] **PAY-03**: Page de confirmation post-paiement s'affiche et confirme l'acces
- [ ] **PAY-04**: Un abonnement actif est visible et trackable dans le dashboard Stripe

### Contenu

- [ ] **CONTENT-01**: Blog avec articles methodes de travail (Feynman, Pomodoro, active recall) — format 3 paragraphes
- [ ] **CONTENT-02**: Meta tags SEO et structured data sur toutes les pages
- [ ] **CONTENT-03**: Workflow video quotidien documente (checklist de tournage + partage)

### Lyceens

- [ ] **LYCEEN-01**: Onboarding objectif-driven — l'utilisateur declare son objectif et recoit un parcours
- [ ] **LYCEEN-02**: Mission quotidienne generee depuis le programme + objectif declare
- [ ] **LYCEEN-03**: Acces au parcours reserve aux abonnes (webhook Stripe verifie l'abonnement actif)

### Ecosysteme

- [ ] **ECO-01**: Marketplace tuteurs etudiants — liste, filtre, contact
- [ ] **ECO-02**: PWA installable sur mobile (manifest + service worker)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Framework JS (React, Vue) | Vanilla JS only — MVP discipline |
| Backend / base de donnees | Phases 1-2 sont 100% statiques |
| Gamification agressive | Interdit par les regles produit permanentes |
| Interface LMS froide | Contraire au positionnement "anti-usine, human-first" |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ATS-01 | Phase 1 | Complete |
| ATS-02 | Phase 1 | Complete |
| ATS-03 | Phase 1 | Complete |
| ATS-04 | Phase 1 | Complete |
| ATS-05 | Phase 2 | Complete |
| ATS-06 | Phase 2 | Complete |
| ATS-07 | Phase 2 | Complete |
| ATS-08 | Phase 2 | Complete |
| ATS-09 | Phase 2 | Complete |
| ATS-10 | Phase 2 | Complete |
| PAY-01 | Phase 3 | Complete |
| PAY-02 | Phase 3 | Pending |
| PAY-03 | Phase 3 | Complete |
| PAY-04 | Phase 3 | Pending |
| CONTENT-01 | Phase 4 | Pending |
| CONTENT-02 | Phase 4 | Pending |
| CONTENT-03 | Phase 4 | Pending |
| LYCEEN-01 | Phase 5 | Pending |
| LYCEEN-02 | Phase 5 | Pending |
| LYCEEN-03 | Phase 5 | Pending |
| ECO-01 | Phase 6 | Pending |
| ECO-02 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-05-14*
*Updated: 2026-05-14 — paiement Stripe avance en Phase 3 (principe vibe coding : valider le PMF avant de construire le produit complet)*
