# Vibe Coding — Ordre et methode

> Synthese des pratiques observees chez les builders solo (Pieter Levels, Marc Lou, Theo, etc.)

---

## L'ordre qui marche

### 1. UI d'abord
Construire l'interface avant toute logique.

**Pourquoi :** Le visuel valide l'idee en 10 minutes. Il motive. Il force a definir ce que le produit fait *vraiment* avant d'ecrire une ligne de code metier. L'UI dicte aussi la forme des donnees — tu sais exactement ce dont tu as besoin.

**Comment :** HTML/CSS statique ou v0.dev / Bolt. Pas de vraie donnee. Juste la coquille.

---

### 2. Architecture
Une fois l'UI claire, definir la structure.

**Pourquoi :** Evite les rewrites douloureux. L'UI montre ce que la DB doit contenir. Tu choisis le stack, tu definis les routes, le schema, les types.

**Ce qu'on decide ici :** stack technique, schema de donnees, routes API, auth (si applicable).

**Regle :** Ne pas sur-architecturer. La structure la plus simple qui fait tourner l'UI suffit.

---

### 3. Paiement tot
Stripe ou LemonSqueezy avant les features.

**Pourquoi :** Le paiement est dur a retrofitter. Les webhooks Stripe affectent le schema de DB. Et surtout : un vrai checkout valide que les gens veulent *payer* — c'est le signal PMF le plus honnete qui soit.

**Regle :** Un seul plan d'abord. Pas de tiers compliques. Juste "ca marche ou ca marche pas".

---

### 4. Features et fichiers
Remplir la coquille avec la vraie logique.

**Pourquoi :** Une fois que l'UI, l'archi et le paiement sont en place, les features sont du remplissage. Tu sais exactement ce qu'il faut construire. Tu peux couper si tu manques de temps.

---

## Principes transversaux

| Regle | Raison |
|-------|--------|
| Shipper vite, iterer | Le feedback reel bat toute planification |
| Une session AI = un contexte propre | Les agents perdent en qualite apres 2h de contexte chaud |
| Commits frequents | Filet de securite, historique lisible |
| Pas de refactor avant que ca tourne | Optimiser ce qui n'existe pas est du temps perdu |
| Build in public | Les retours arrivent avant que tu aies fini |
| Une feature a la fois | Le multitasking tue la vitesse de shipping |

---

## Stack typique vibe coding 2025

| Besoin | Outil |
|--------|-------|
| UI rapide | v0.dev, Bolt, ou HTML/CSS vanilla |
| Execution AI | Claude Code, Cursor, Codex |
| Deploy | Vercel, Netlify |
| DB | Supabase, PlanetScale, ou SQLite local |
| Auth | Clerk, NextAuth, ou auth maison |
| Paiement | Stripe, LemonSqueezy |
| Email | Resend, Postmark |

---

## Application a Objectif Lycee

On est deja dans l'ordre :
- Phase 1 : UI statique livree (heatmap, dashboard) — **UI faite**
- Phase 2 : donnees dynamiques — **architecture des donnees**
- Phase 3-4 : contenu + lyceens + paiement 10EUR/mois — **dans l'ordre**

Le seul ajustement possible : mettre le checkout Stripe plus tot (Phase 3 plutot que 4) pour valider que les gens paient avant de construire tout le parcours personnalise.