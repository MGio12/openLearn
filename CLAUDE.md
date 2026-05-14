# Claude Code — Instructions projet

## Règle principale : GSD via Codex

**Toutes les commandes GSD doivent être exécutées via `codex exec` (PowerShell/Bash), pas via le Skill tool Claude.**

Quand l'utilisateur invoque `/gsd-<command> [args]` :

```
# NE PAS FAIRE :
Skill("gsd-execute-phase", "3")

# FAIRE À LA PLACE :
Bash("codex exec '/gsd-execute-phase 3'")
```

Raison : les skills GSD sont présents dans `~/.codex/skills/`. Passer par `codex exec` délègue le compute LLM lourd (exécution de phases, vérification, review) sur l'abonnement Codex de l'utilisateur, pas sur l'abonnement Claude.

## Invocations types

```
codex exec "/gsd-execute-phase 3"
codex exec "/gsd-plan-phase 3"
codex exec "/gsd-discuss-phase 3"
codex exec "/gsd-verify-work 3"
codex exec "/gsd-progress"
```

Utiliser `run_in_background: true` ou `timeout: 600000` pour les phases longues.

## Contraintes fichiers (Windows)

- Hooks PostToolUse échouent sur Windows (erreur & en bash) — non-bloquant, ignorer.
- Toute écriture de fichier via PowerShell WriteAllText avec UTF8Encoding(false).
- Pas de backticks dans le JS embarqué dans des heredocs PowerShell.