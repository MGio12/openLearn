---
name: claude-token-efficient
description: Apply the Universal CLAUDE.md rules from drona23/claude-token-efficient when the user wants terse, token-efficient Claude behavior without losing correctness.
source: https://github.com/drona23/claude-token-efficient
source-ref: b32fa8b71f818e14458a6e9909039c5f429aef99
---

# Claude Token Efficient

Use this skill to keep Claude's output terse and token-efficient while preserving the requested work and verification.

## Approach

- Read existing files before writing. Do not re-read unless changed.
- Be thorough in reasoning, concise in output.
- Skip files over 100KB unless required.
- No sycophantic openers or closing fluff.
- No emojis or em-dashes.
- Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs before asserting.

## Override

User instructions always win. If the user asks for detail, alternatives, teaching, or a verbose explanation, provide it.
