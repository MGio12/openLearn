# Outil Prepa — Vision Produit

**Date :** 2026-05-14
**Statut :** Approuvé — boussole de référence pour toutes les décisions produit

---

## Promesse centrale

> **"Toujours un chapitre d'avance."**

Pas pour tricher. Pour que quand le prof aborde le sujet, l'élève ait déjà les bases — et que ça se voie dans ses résultats, son dossier, son classement.

C'est une promesse concrète, vérifiable, universelle du lycée à la prépa.

---

## Ce que le produit vend réellement

Outil Prepa ne vend pas des quiz, des fiches, des statistiques, des PDF.

Outil Prepa vend :

- un coup d'avance permanent sur le programme
- de la clarté mentale ("je sais exactement quoi travailler aujourd'hui")
- de la maîtrise visible (progression réelle, pas simulée)
- une meilleure version de l'étudiant

---

## Positionnement

**Anti-usine. Human-first.**

Pendant que Studyrama, Schoolmouv et les GPT-wrappers produisent du contenu générique à la chaîne, Outil Prepa est humain, sourcé, spécifique.

| Concurrent | Problème |
|---|---|
| Studyrama / Schoolmouv | Catalogue générique, zéro personnalisation réelle |
| Anki / Notion | Outils sans direction — l'élève doit tout construire lui-même |
| Coachs TikTok | Inspiration sans structure, pas de suivi |
| **Outil Prepa** | Structure + direction + coup d'avance + branding humain |

**Ce que le produit ne doit jamais ressembler :**
un LMS froid, un SaaS corporate, un clone Notion, une app gaming, une plateforme "fun étudiant".

---

## Segments et séquence

### Couche 1 — ATS *(an 1, personnel + contenu)*

- **Marché :** 800 à 1 000 élèves par an. Petit — ce n'est pas le moteur business.
- **Rôle :** Preuve de concept + authenticité. Le fondateur utilise le produit en live pendant son année ATS et filme au quotidien.
- **Contenu :** "Aujourd'hui l'outil me dit de faire ça." Récurrent, tangible, honnête. Les gens suivent un vrai parcours, pas une pub.
- **Valeur pour l'élève ATS :** Le concours est daté, les sujets sont connus. Anticiper les chapitres les plus fréquents 8 semaines avant, c'est le coup d'avance incarné.

### Couche 2 — Lycéens, objectif-driven *(marché principal)*

- **Marché :** Lycéens avec un objectif précis (HEC, Polytechnique, médecine, grande école d'ingé…)
- **Mécanisme "coup d'avance" :**
  - En **spécialités lycée** : avancer sur les chapitres avant le cours. Le prof voit qui a déjà compris. Le dossier Parcoursup reflète les notes continues.
  - En **prépa** : la distinction se fait sur les résultats continus. Un chapitre d'avance change le classement en khôlles, en DS, dans l'œil du prof.
- **Expérience :** Objectif déclaré → parcours personnalisé généré → tâche du jour → avance visible.
- **Vibe :** Cosy, intimiste, pas une usine. L'opposé exact de ce que l'IA crache en masse.
- **Prix :** Accessible — environ 10€/mois pour la couche personnalisée.

### Couche 3 — Culture / méthodes *(légitimité + SEO, gratuit)*

- Méthodes de travail (Feynman, Pomodoro, spaced repetition, active recall…)
- Format : 3 paragraphes — c'est quoi, à qui ça convient, un lien vers la recherche sérieuse qui va plus loin.
- Gratuit. Crédibilise sans alourdir le produit.

---

## Modèle économique

| Gratuit | Payant (~10€/mois) |
|---|---|
| Dashboard ATS (fréquences, heatmap) | Parcours custom : objectif → plan → avance quotidienne |
| Planning + missions du jour (basique) | — |
| Blog méthodes, sources scientifiques | — |
| Ressources générales | — |
| — | Marketplace tuteurs étudiants *(plus tard)* |

**Philosophie économique :**
50 utilisateurs payants × 10€ = 500€/mois = suffisant pour itérer sérieusement en solo.
L'objectif n'est pas de croître vite — c'est d'avoir une base réelle et de construire proprement.
Aucune tentation de mettre des murs premium trop tôt : la priorité est la base utilisateurs large et active.

**Monétisation indirecte à terme :**
Marketplace de tuteurs étudiants — abordable, curatée, même vibe cosy. Pas de plateforme froide.

---

## Séquence de build

```
Phase 0 — Fait ✓
  Dashboard cockpit HTML/CSS/JS
  Structure données ATS (data/ats/ — 2018→2026)
  Design system complet (colors, type, composants)

Phase 1 — MVP ATS fonctionnel
  "Aujourd'hui on me dit de faire ça" — missions générées depuis les données ATS
  Heatmap fréquences améliorée (le total est visuellement dominant)
  Tagging des sujets ATS (analyse des PDFs officiels → remplissage des JSON)
  Script de pondération (weighted-topics.json généré automatiquement)

Phase 2 — Contenu + audience
  Vidéos quotidiennes pendant l'année ATS
  Blog méthodes (Feynman, Pomodoro, etc.) avec sources
  SEO organique

Phase 3 — Lycéens
  Onboarding objectif-driven
  Génération du parcours personnalisé
  Abonnement 10€/mois pour la couche custom
  Contenu spécialités lycée

Phase 4 — Écosystème
  Marketplace tuteurs étudiants
  Mobile (PWA ou natif)
  Intégration calendrier
  Communauté
```

---

## Règles produit permanentes

Ces règles ne changent pas quelle que soit la phase :

1. **Une information principale par bloc.** Jamais 20 métriques visibles simultanément.
2. **Le "coup d'avance" est toujours visible.** L'utilisateur doit voir immédiatement où il en est par rapport au programme.
3. **Zéro gamification agressive.** Streaks discrets, progression réelle, jamais "LEVEL UP".
4. **L'IA est silencieuse.** Elle suggère, ne crie pas. "Calm strategic assistant", pas une mascotte.
5. **Le branding est vivant, pas généré.** Photos, vidéos, blog — tout est humain, sourcé, organique.
6. **MVP discipline.** Toujours prioriser utilité réelle et vitesse de shipping avant perfection visuelle.

---

## Ce qui ne change pas

**La sensation finale sur chaque écran :**
> L'utilisateur doit se sentir plus organisé, plus calme, plus concentré, plus stratégique, plus en contrôle de son année.

La DA ne doit jamais exister seule. Elle sert toujours la progression réelle de l'étudiant.
