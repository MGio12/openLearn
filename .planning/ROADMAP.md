# Roadmap: Outil Prepa

## Overview

Plateforme d'apprentissage qui donne aux etudiants ATS et lyceens un coup d'avance permanent sur leur programme. Phase 1 livree (dashboard + donnees ATS). La suite rend les donnees dynamiques, cree du contenu, puis ouvre aux lyceens.

## Phases

- [x] **Phase 1: MVP ATS Dashboard** - Dashboard HTML/CSS/JS, heatmap statique, donnees 2018-2024 taguees, script compute-weights
- [ ] **Phase 2: Heatmap ATS Dynamique** - Rendre ats.html entierement dynamique depuis weighted-topics.json
- [ ] **Phase 3: Contenu et Audience** - Blog methodes, SEO, workflow video quotidien
- [ ] **Phase 4: Lyceens** - Onboarding objectif-driven, parcours personnalise, abonnement 10EUR/mois
- [ ] **Phase 5: Ecosysteme** - Marketplace tuteurs, PWA mobile, calendrier, communaute

## Phase Details

### Phase 1: MVP ATS Dashboard
**Goal**: Dashboard cockpit fonctionnel avec heatmap ATS statique et donnees reelles 2018-2024
**Depends on**: Nothing
**Requirements**: [ATS-01, ATS-02, ATS-03, ATS-04]
**Success Criteria** (what must be TRUE):
  1. ats.html affiche une heatmap avec les topics maths 2018-2024
  2. La colonne Total est visuellement dominante (22px + barre stabilo)
  3. weighted-topics.json est genere par compute-weights.js depuis les JSON de sujets
  4. Playwright screenshot confirme le rendu visuel
**Plans**: 4 plans

Plans:
- [x] 01-01: Dashboard HTML/CSS/JS initial
- [x] 01-02: Tagging sujets ATS maths 2018-2024
- [x] 01-03: Script compute-weights.js
- [x] 01-04: Fix visuel colonne Total (22px Archivo Black + barre stabilo)

### Phase 2: Heatmap ATS Dynamique
**Goal**: ats.html entierement pilote par weighted-topics.json - zero donnee statique dans le HTML
**Depends on**: Phase 1
**Requirements**: [ATS-05, ATS-06, ATS-07, ATS-08, ATS-09, ATS-10]
**Success Criteria** (what must be TRUE):
  1. Les lignes de la heatmap sont generees en JS depuis les donnees JSON (pas de HTML code en dur)
  2. Les colonnes annees sont calculees dynamiquement depuis la plage reelle des donnees
  3. Les etats des cellules (rempli/vide) sont calcules depuis le tableau years du topic
  4. La colonne Total affiche le compte Nx et une barre proportionnelle depuis le score JSON
  5. Les onglets de filtre par matiere fonctionnent (afficher/masquer par slug)
  6. La liste de priorite des topics est rendue sous la heatmap (classee par score)
**Plans**: TBD

Plans:
- [ ] 02-01: Fetch et rendu dynamique de la heatmap

### Phase 3: Contenu et Audience
**Goal**: Blog methodes + SEO + workflow video quotidien
**Depends on**: Phase 2
**Requirements**: [CONTENT-01, CONTENT-02, CONTENT-03]
**Success Criteria** (what must be TRUE):
  1. Blog avec au moins 3 articles methodes (Feynman, Pomodoro, active recall)
  2. Meta tags et structured data sur toutes les pages
  3. Checklist workflow video quotidien documentee
**Plans**: TBD

Plans:
- [ ] 03-01: Blog methodes

### Phase 4: Lyceens
**Goal**: Onboarding objectif-driven et abonnement 10EUR/mois
**Depends on**: Phase 3
**Requirements**: [LYCEEN-01, LYCEEN-02, LYCEEN-03]
**Success Criteria** (what must be TRUE):
  1. L'utilisateur declare son objectif et recoit un parcours personnalise
  2. Une mission quotidienne est generee depuis le programme + objectif
  3. Le paiement Stripe 10EUR/mois fonctionne end-to-end
**Plans**: TBD

Plans:
- [ ] 04-01: Onboarding et abonnement

### Phase 5: Ecosysteme
**Goal**: Marketplace tuteurs + PWA mobile
**Depends on**: Phase 4
**Requirements**: [ECO-01, ECO-02]
**Success Criteria** (what must be TRUE):
  1. La marketplace tuteurs liste et filtre des tuteurs etudiant
  2. La PWA est installable sur mobile (manifest + service worker)
**Plans**: TBD

Plans:
- [ ] 05-01: Marketplace et PWA

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. MVP ATS Dashboard | 4/4 | Complete | 2026-05-14 |
| 2. Heatmap ATS Dynamique | 0/1 | Not started | - |
| 3. Contenu et Audience | 0/1 | Not started | - |
| 4. Lyceens | 0/1 | Not started | - |
| 5. Ecosysteme | 0/1 | Not started | - |