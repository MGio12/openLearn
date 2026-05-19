# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? | Made By |
|---|------|-------|----------|--------|-----------|------------|---------|
| D001 | M001 planning | architecture | Architecture scope for M001 | Keep M001 as a static HTML/CSS/JS UX prototype with no backend/auth/database. | The user wants to polish UI/UX and iterate with Claude Design before building serious backend functionality; adding backend now would slow the craft loop. | Yes | collaborative |
| D002 | M001 planning | product/ux | Primary dashboard experience | Make mission du jour the center of the dashboard; analytics support the mission instead of leading the experience. | The user explicitly wants simplification and an adapted daily to-do list, not a global stats dashboard that feels useless. | Yes | collaborative |
| D003 | M001 planning | security/integration | Stripe integration method | Use Stripe Payment Link only in M001 and never expose Stripe API secrets in frontend code. | A hosted Payment Link safely supports static checkout validation without backend complexity or secret handling. | Yes | collaborative |
| D004 | M001 planning | design | Visual direction for M001 | Use a carnet de lycee vivant visual language and avoid generic SaaS/AI-slop aesthetics. | The user's conversion thesis depends on intimacy, specificity, and craft details that make the low-price offer feel personal and valuable. | Yes | collaborative |
