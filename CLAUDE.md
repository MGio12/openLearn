# Claude Code — ObjectifLycee

## Profil & stack
- Solo dev, bases en info, pas ingénieur. Code simple, lisible dans 6 mois par moi-même.
- Site statique : HTML/CSS/JS **vanilla**, pas de framework.
- Arbo : `*.html` racine, `assets/css/pages/`, `assets/js/`, `data/`, `scripts/`, `docs/`.

## Règles projet (priment sur les défauts Claude)
- **Inline > extraction.** Duplique 2× sans réfléchir, extrais à la 3ᵉ. Pas de `utils.js` fourre-tout.
- **Pas de split de fichier** sauf > 500 lignes ET responsabilités distinctes.
- **Pas de tests unitaires** sans demande explicite.
- **Pas de dépendance npm** sans demander d'abord.
- CSS par page dans `assets/css/pages/` si > 50 lignes, sinon `styles.css`. Tokens dans `:root`.

## GSD via Codex (CRITIQUE)
Les commandes `/gsd-*` passent par `codex exec`, **jamais** via Skill :
```
Bash("codex exec '/gsd-execute-phase 3'")   # OUI
Skill("gsd-execute-phase", "3")              # NON
```
Raison : skills GSD dans `~/.codex/skills/`. Délègue le compute LLM lourd sur l'abonnement Codex.
Phases longues : `run_in_background: true` ou `timeout: 600000`.

## Pré-commit
1. `/simplify` — duplication, code mort, sur-ingénierie sur le diff.
2. `/review` — code review pré-merge (sécurité, bugs structurels).

## Itération visuelle
Codex implémente → Playwright capture → Claude critique le screenshot → corrections → recapture. Boucle détaillée : `WORKFLOW.md` (Workflow 2).

## Contraintes Windows
- Hooks PostToolUse échouent (non-bloquant, ignorer).
- Écriture fichier via PowerShell `WriteAllText` avec `UTF8Encoding(false)`.
- Pas de backticks dans JS embarqué dans heredocs PowerShell.

## Edge case KaTeX
Ne **jamais** styler un tag générique (`.bloc span`, `.card div`, etc.) dans une zone contenant des formules — KaTeX découpe chaque formule en multiples `<span>`. Utiliser une classe dédiée sur l'élément exact. Cas détaillé : `docs/erreurs-rencontrees.md`.

## Docs domaine (référence — charger si pertinent)
| Fichier | Sujet |
|---|---|
| `docs/mission-valeur-monetisation.md` | Promesse produit, funnel, paywall, pricing |
| `docs/version-lycee-priorites.md` | Priorités version lycée, ton élève/parent |
| `docs/pipeline-cours-ia.md` | Pipeline PDF → cours HTML+KaTeX |
| `docs/generation-image-cours.md` | Règles visuels pédagogiques, prompts imagegen |
| `docs/vibe-coding-methode.md` | Méthode dev solo (UI → archi → paiement → features) |
| `WORKFLOW.md` | Pipeline données lycée + boucle Codex+Playwright |
| `TODO.md` | Roadmap P0–P3 |
| `SKILLS-GUIDE.md` | Mémo skills (fréquences, plan-review) |
