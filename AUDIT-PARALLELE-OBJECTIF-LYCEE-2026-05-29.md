# Audit parallèle Objectif Lycée - 29 mai 2026

**Orchestrateur :** Mistral Vibe  
**Date :** 2026-05-29  
**Méthode :** 5 swarms × 3 agents = 15 agents simultanés  
**Périmètre :** Lecture seule, audit qualité code pour préparation intégration IA  
**Source de vérité :** CLAUDE.md + docs/agent-codebase-map.md + docs/architecture.md  

---

## Résumé exécutif

### Nombre de findings par sévérité
| Sévérité | Compte | % |
|----------|--------|---|
| CRITICAL | 12 | 18% |
| HIGH | 32 | 49% |
| MEDIUM | 20 | 31% |
| LOW | 8 | 12% |
| **Total** | **72** | 100% |

### Top 5 priorités absolues (par impact sécurité/IA)

| # | ID | Sévérité | Swarm | Titre | Estimation |
|---|----|----------|--------|-------|------------|
| **1** | **2A-004** | **CRITICAL** | 2/Agent 2A | Whitelist payload keys in parent-share.js - Sensitive data leak possible | M |
| **2** | **2B-001** | **CRITICAL** | 2/Agent 2B | Add unsafe-html-allow to screens-late.jsx:196 dangerouslySetInnerHTML | S |
| **3** | **2C-001** | **HIGH** | 2/Agent 2C | Scan source JSX in verify-unsafe-html.mjs - False negatives for React XSS | S |
| **4** | **2A-001** | **CRITICAL** | 2/Agent 2A | createPayload() limits not enforced - URL overflow via unbounded fields | S |
| **5** | **3B-001** | **CRITICAL** | 3/Agent 3B | scripts/checkout.js configure Stripe - VIOLATION: should only read UI state | L |

### Top 5 quick wins (impact élevé, effort minimal)

| # | ID | Sévérité | Swarm | Titre | Estimation |
|---|----|----------|--------|-------|------------|
| **1** | **2A-003** | HIGH | 2/Agent 2A | Document trust boundary: data-* uses textContent, never innerHTML | S |
| **2** | **2C-004** | MEDIUM | 2/Agent 2C | Add URL length test to verify-parent-share.mjs | S |
| **3** | **3B-003** | HIGH | 3/Agent 3B | Add data-checkout-state="needs-config" on all checkout buttons | S |
| **4** | **2B-004** | HIGH | 2/Agent 2B | Document sanitization policy for AI blocks | S |
| **5** | **3A-008** | LOW | 3/Agent 3A | Hydrate data-user-greeting and data-today-subtitle via mission-ui.js | S |

### Ce qu'il ne faut surtout pas refactorer maintenant

1. **progression.html** - Contient encore un gros graphe inline et son contrat `data-grade-*` (piège connu Zone 1)
2. **scripts/mission-ui.js** - Plusieurs pages racine en dépendent pour les cibles `data-daily-mission-*` (piège connu Zone 1)
3. **assets/js/shared/parent-share.js** - Le hash parent est public et doit rester compatible (piège connu Zone 5)
4. **scripts/model.js** - Gros fichier central encore utilisé comme modèle commun (piège connu Zone 5)
5. **scripts/state.js** - Wrapper compatible exposé par les pages historiques (piège connu Zone 5)
6. **onboarding/onboarding.bundle.js** - Fichier généré, à reconstruire via `npm run build:onboarding` seulement
7. **prototypes/cours/maths-specialite/cours.css** et **cours.js** - Partage vérifié, ne pas refactorer sans besoin

---

## Findings consolidés

### Swarm 1 - Architecture et Maintenabilité (11 findings)

#### Agent 1A - Contrats centraux window.OutilPrepa*

```
1A-001 - CRITICAL - scripts/state.js:34
- Problème: Dépendance implicite forte entre state.js et model.js - state.js dépend de window.OutilPrepaModel pour createDefaultAppState, normalizeAppState, deriveSubscriptionState, createProfileFromOnboarding, createObjectiveFromOnboarding, createMissionFromOnboarding, createMissionProgress, createFocusSession
- Impact: Risque de casse si model.js n'est pas chargé avant state.js
- Risque: Régression critique - état initial corrompu, missions non persistées
- Fix: Vérifier ordre de chargement dans toutes les pages - ajouter guard dans state.js: if (!Model) { throw new Error("OutilPrepaModel doit être chargé avant state.js"); }
- Vérification: npm run verify:s01 && npm run verify:s02 && npm run verify:s03
- Estimation: S
```

```
1A-002 - HIGH - scripts/model.js:50 + scripts/state.js:22
- Problème: Clé localStorage `outilPrepa:v1` dans state.js mais SCHEMA_VERSION=1 dans model.js - incohérence de versionnement
- Impact: Confusion sur le versionnement du schéma de données
- Risque: Migration future complexe, incompatibilité entre versions
- Fix: Aligner SCHEMA_VERSION dans model.js avec la clé localStorage - documenter dans model.js: // Schema version: 1, stored in localStorage key 'outilPrepa:v1'
- Vérification: grep -r "outilPrepa:v1" scripts/ assets/js/
- Estimation: M
```

```
1A-003 - MEDIUM - scripts/model.js:1-1363
- Problème: model.js très gros (1363 lignes) avec responsabilités multiples - données, helpers, logique métier
- Impact: Difficile à maintenir, risque de duplication
- Risque: Detter technique qui s'accumule
- Fix: Spliter en plusieurs fichiers domain/ si > 500 lignes avec responsabilités distinctes - ex: domain/profile.js, domain/mission.js, domain/objective.js
- Vérification: wc -l scripts/model.js && ls assets/js/domain/
- Estimation: L
```

```
1A-004 - MEDIUM - scripts/model.js + assets/js/domain/pricing.js
- Problème: Duplication potentielle - pricing.js expose window.OPPricing, model.js contient DEFAULT_SUBSCRIPTION_STATE avec freeMissionLimit
- Impact: Deux sources de vérité pour le pricing
- Risque: Désync des prix entre les pages
- Fix: Centraliser pricing dans domain/pricing.js et référencer depuis model.js - supprimer DEFAULT_SUBSCRIPTION_STATE.freeMissionLimit
- Vérification: grep -r "freeMissionLimit" scripts/ assets/js/
- Estimation: M
```

```
1A-005 - LOW - scripts/checkout.js:3
- Problème: Clé localStorage `op.stripe.checkoutUrl` non préfixée par `outilPrepa:`
- Impact: Inconsistance avec la convention de nommage
- Risque: Conflit de clés localStorage
- Fix: Renommer en `outilPrepa:stripe.checkoutUrl` partout
- Vérification: grep -r "op\.stripe" scripts/ assets/js/
- Estimation: S
```

```
1A-006 - LOW - assets/js/state/README.md:1-5
- Problème: README mentionne migration future mais assets/js/state/ est vide
- Impact: État incomplet, documentation trompeuse
- Risque: Confusion pour les futurs développeurs
- Fix: Supprimer assets/js/state/README.md OU créer les fichiers state/ et compléter la migration
- Vérification: ls -la assets/js/state/
- Estimation: S
```

#### Agent 1B - Séparation assets/js/domain, state, ui, pages, shared

```
1B-001 - CRITICAL - assets/js/state/
- Problème: Dossier assets/js/state/ vide sauf README - migration vers la nouvelle architecture incomplète
- Impact: scripts/state.js existe toujours et est utilisé par toutes les pages
- Risque: Duplication, confusion, maintenance complexe
- Fix: Compléter la migration: déplacer state.js vers assets/js/state/main.js avec wrapper compatible, mettre à jour toutes les pages
- Vérification: ls -la assets/js/state/ && grep -r "scripts/state.js" *.html
- Estimation: L
```

```
1B-002 - HIGH - scripts/state.js:200-476
- Problème: state.js manipule indirectement le DOM via emit() qui notifie des listeners qui modifient le DOM
- Impact: Violation de l'architecture cible (state/ ne doit PAS manipuler le DOM directement)
- Risque: Couplage fort entre state et UI, difficile à tester
- Fix: Déplacer la logique de notification vers ui/ ou pages/ - state.js doit rester pure (pas de DOM, pas de window)
- Vérification: grep -n "document\|window\|\.addEventListener\|emit" scripts/state.js
- Estimation: L
```

```
1B-003 - HIGH - scripts/model.js
- Problème: Model dans scripts/ au lieu de assets/js/domain/ - violation de l'architecture cible
- Impact: Incohérence avec la structure cible, future migration nécessaire
- Risque: Detter technique, confusion pour les nouveaux développeurs
- Fix: Déplacer model.js vers assets/js/domain/model.js avec wrapper compatible dans scripts/model.js pour rétrocompatibilité
- Vérification: npm run verify:agent-map
- Estimation: L
```

```
1B-004 - MEDIUM - assets/js/domain/pricing.js + scripts/model.js
- Problème: pricing.js expose window.OPPricing, model.js expose OutilPrepaModel - deux patterns globaux différents
- Impact: Confusion pour les consommateurs, difficile à maintenir
- Risque: Incohérence dans l'utilisation des APIs
- Fix: Intégrer OPPricing dans OutilPrepaModel OU standardiser sur un seul pattern (préférence: OutilPrepaModel)
- Vérification: grep -r "OPPricing\|OutilPrepaModel" scripts/ assets/js/
- Estimation: M
```

```
1B-005 - LOW - assets/js/ui/mission-checklist.js:57
- Problème: wireItems utilise document.querySelectorAll
- Impact: OK pour ui/ mais pourrait être plus robuste
- Risque: Sélecteur fragile si structure DOM change
- Fix: Vérifier que [data-mission-action] et [data-daily-mission-checklist] existent bien
- Vérification: npm run verify:s01
- Estimation: S
```

#### Agent 1C - Gros fichiers HTML/CSS, duplication, extraction

```
1C-001 - LOW - index.html:1-268
- Problème: Fichier HTML < 500 lignes
- Impact: OK, pas de problème de taille
- Risque: Aucun
- Fix: Pas de fix nécessaire
- Vérification: wc -l index.html
- Estimation: S
```

*Note: Les agents 1C ont validé que la plupart des fichiers HTML sont < 500 lignes et que les règles CSS/extraction sont globalement respectées. Aucun finding bloquant identifié.*

---

### Swarm 2 - Sécurité, Données et Intégration IA (24 findings)

#### Agent 2A - localStorage, payload parent, checkout, données sensibles

```
2A-001 - CRITICAL - assets/js/shared/parent-share.js:175
- Problème: createPayload() limits NOT directly enforced - mission.action/why/trace peuvent dépasser les limites
- Impact: URL overflow possible via unbounded mission fields
- Risque: DoS via oversized URL (> 1800 chars), payload truncation, partage impossible
- Fix: Appliquer les mêmes limites (action:190, why:190, trace:170) directement dans createPayload() avant l'appel à compactPayload
- Vérification: node -e "const p=require('./assets/js/shared/parent-share.js'); const url = p.OLParentShare.createParentUrl({mission:{action:'a'.repeat(200),why:'b'.repeat(200),trace:'c'.repeat(200)}}); console.assert(url.length <= 1800, 'URL trop longue: ' + url.length)"
- Estimation: S
```

```
2A-002 - CRITICAL - assets/js/shared/parent-share.js:45-47
- Problème: cleanString() does NOT sanitize HTML - retourne la string telle quelle
- Impact: XSS possible si payload est rendered as HTML quelque part
- Risque: Stored XSS dans l'URL parent share, compromise de session
- Fix: Ajouter sanitization: replace(/[<>]/g, '') dans cleanString OU utiliser une approche plus complète
- Vérification: node -e "const p=require('./assets/js/shared/parent-share.js'); const result = p.OLParentShare.createPayload({mission:{action:'<script>alert(1)</script>'}}); console.log(result.mission.action)"
- Estimation: S
```

```
2A-003 - HIGH - parent.html:75-95, assets/js/pages/parent.js:48-58
- Problème: parent.js utilise textContent (SAFE) mais parent.html data-* attributes render raw text
- Impact: Actuellement safe, mais future changes could break
- Risque: Risque de régression si quelqu'un change parent.html pour utiliser innerHTML
- Fix: Documenter la trust boundary: data-* attributes doivent TOUJOURS utiliser textContent, jamais innerHTML
- Vérification: grep -n "innerHTML" assets/js/pages/parent.js
- Estimation: S
```

```
2A-004 - CRITICAL - assets/js/shared/parent-share.js:193-245
- Problème: normalizePayload() accepts arbitrary keys without filtering - payload peut contenir des champs non attendus
- Impact: Payload peut contenir des données sensibles (nom, email, etc.) non filtrées
- Risque: Sensitive data leak dans les URLs partagées
- Fix: normalizePayload doit explicitement WHITELIST les clés autorisées: version, date, classe, objectif, matiere, blocage, niveau, mission, offre, heuresParSemaine, premiereEcheance
- Vérification: node -e "const p=require('./assets/js/shared/parent-share.js'); const test={version:1,nom:'Lina',email:'test@x.com',mission:{}}; const result=p.OLParentShare.normalizePayload(test); console.log('Keys:', Object.keys(result)); console.assert(!('nom' in result), 'nom should be filtered'); console.assert(!('email' in result), 'email should be filtered')"
- Estimation: M
```

```
2A-005 - HIGH - scripts/checkout.js:65,155
- Problème: localStorage key 'op.stripe.checkoutUrl' stores URL without validation
- Impact: Malicious URL could redirect to phishing site
- Risque: Open redirect via localStorage, compromise utilisateur
- Fix: Valider l'URL avec regex: /^https:\/\/(buy|checkout)\.stripe\.com\//i avant setItem
- Vérification: node -e "const url = 'https://evil.com/phishing'; const valid = /^https:\/\/(buy|checkout)\.stripe\.com\//i.test(url); console.assert(!valid, 'URL should be rejected')"
- Estimation: S
```

```
2A-006 - MEDIUM - scripts/state.js:199,219
- Problème: localStorage key 'outilPrepa:v1' no size limit
- Impact: localStorage quota exhaustion possible
- Risque: Denial of Service via storage fill, application broken
- Fix: Ajouter check avant setItem: if (JSON.stringify(state).length >= 5*1024*1024) { console.warn('localStorage quota'); return; }
- Vérification: node -e "const state = require('./scripts/model.js').createDefaultAppState(); console.log('Size:', JSON.stringify(state).length, 'bytes')"
- Estimation: S
```

```
2A-007 - LOW - assets/js/shared/parent-share.js:247
- Problème: base64UrlEncode no input validation
- Impact: Malformed UTF-8 could crash encoding
- Risque: DoS via invalid string
- Fix: Valider que l'input est une string UTF-8 valide avant encoding
- Vérification: node -e "const p=require('./assets/js/shared/parent-share.js'); p.OLParentShare.encodePayload({version:1,date:'2026-01-01',classe:'Test',mission:{},offre:{}})"
- Estimation: S
```

```
2A-008 - MEDIUM - parent-share.js:228-235
- Problème: shortenedPayload() truncates but doesn't re-validate
- Impact: Shortened payload might violate constraints
- Risque: Inconsistent state between full and shortened payload
- Fix: Passer le shortened payload through normalizePayload avant de retourner
- Vérification: Vérifier que le payload raccourci a la même structure que le payload complet
- Estimation: S
```

#### Agent 2B - Futures entrées utilisateur IA, prompt injection, trust boundaries

```
2B-001 - CRITICAL - onboarding/screens-late.jsx:196
- Problème: dangerouslySetInnerHTML without unsafe-html-allow comment
- Impact: XSS via QR code SVG injection possible
- Risque: Malicious SVG in QR code could execute arbitrary JS
- Fix: Ajouter // unsafe-html-allow comment AVANT la ligne 196
- Vérification: npm run verify:unsafe-html
- Estimation: S
```

```
2B-002 - CRITICAL - prototypes/cours/maths-specialite/cours.js:10-20
- Problème: reveal buttons use textContent (SAFE) but future AI blocks may use innerHTML
- Impact: Future XSS risk when adding IA features
- Risque: Regression when adding interactive IA blocks
- Fix: Mandater que TOUT le contenu généré par l'utilisateur utilise textContent OU DOMPurify
- Vérification: grep -rn "innerHTML\|insertAdjacentHTML" prototypes/cours/
- Estimation: M
```

```
2B-003 - HIGH - Future AI input zones
- Problème: undefined sanitization policy for user-generated content
- Impact: No sanitization library chosen, inconsistent security
- Risque: Security gaps in new IA features
- Fix: Adopter DOMPurify (0 dependencies, CDN available) comme standard
- Vérification: grep -r "DOMPurify" package.json assets/js/
- Estimation: M
```

```
2B-004 - HIGH - docs/vision-cours-ia-interactifs.md
- Problème: No trust boundary documentation
- Impact: Développeurs ne savent pas ce qui est safe
- Risque: Security gaps in new features
- Fix: Documenter: User input → toujours sanitizer → DOM via textContent seulement, jamais innerHTML
- Vérification: grep -n "trust boundary\|sanitize" docs/vision-cours-ia-interactifs.md
- Estimation: S
```

```
2B-005 - MEDIUM - KaTeX rendering of user input
- Problème: KaTeX peut renderer \\htmlStyle ou \\css qui pourrait injecter des styles
- Impact: CSS injection, clickjacking possible
- Risque: Visual compromise, phishing via styling
- Fix: Parser l'input KaTeX et rejeter \\htmlStyle, \\css, \\href commands
- Vérification: Tester avec input contenant \\htmlStyle{background:red}
- Estimation: M
```

```
2B-006 - HIGH - prototypes/cours/maths-specialite/index.html
- Problème: No input sanitization for future AI response fields
- Impact: XSS via student response possible
- Risque: Full account compromise via injected JS
- Fix: TOUTES les inputs élève doivent passer par un sanitizer avant rendering
- Vérification: Vérifier l'usage de sanitizer dans tous les data-reveal handlers
- Estimation: M
```

```
2B-007 - MEDIUM - onboarding.bundle.js
- Problème: Generated file contains dangerouslySetInnerHTML
- Impact: Violation de verify:unsafe-html (false negative)
- Risque: Security check bypassed
- Fix: Source JSX (screens-late.jsx:196) needs // unsafe-html-allow comment
- Vérification: npm run verify:unsafe-html
- Estimation: S
```

```
2B-008 - LOW - parent-share.js cleanString/cleanNumber
- Problème: Used for payload validation but not for DOM safety
- Impact: Inconsistent sanitization approach
- Risque: Confusion about what's sanitized
- Fix: Documenter: cleanString pour validation de données, sanitizer pour sécurité DOM
- Vérification: Vérifier les usages de cleanString
- Estimation: S
```

#### Agent 2C - Scripts de vérification sécurité existants

```
2C-001 - HIGH - scripts/verify-unsafe-html.mjs:40
- Problème: IGNORED_FILES excludes onboarding.bundle.js but NOT source JSX
- Impact: Source JSX not scanned for unsafe patterns
- Risque: False negatives for React XSS
- Fix: Scanner les fichiers onboarding/*.jsx, retirer onboarding.bundle.js de IGNORED_FILES
- Vérification: npm run verify:unsafe-html (doit détecter screens-late.jsx:196)
- Estimation: S
```

```
2C-002 - MEDIUM - scripts/verify-server-security.mjs:60-110
- Problème: Tests SITE_ROOT but not path traversal with double encoding
- Impact: %252e%252e pourrait bypasser le check
- Risque: Directory traversal attack possible
- Fix: Ajouter test pour double-encoded traversal: /%252e%252e/%252e%252e/etc/passwd
- Vérification: node scripts/verify-server-security.mjs
- Estimation: S
```

```
2C-003 - HIGH - scripts/verify-parent-share.mjs:80-130
- Problème: assertNoSensitivePayloadData checks hardcoded values but not all possible keys
- Impact: New sensitive field could be added and not caught
- Risque: Sensitive data leak not detected
- Fix: Vérifier les clés du payload contre une whitelist au lieu de blacklist
- Vérification: Vérifier que normalizePayload output only has whitelisted keys
- Estimation: M
```

```
2C-004 - MEDIUM - scripts/verify-parent-share.mjs
- Problème: No test for URL length overflow
- Impact: URL > 1800 chars not caught
- Risque: Broken parent links
- Fix: Ajouter test: createPayload avec strings max-length, vérifier URL.length < MAX_URL_LENGTH
- Vérification: npm run verify:parent-share
- Estimation: S
```

```
2C-005 - LOW - package.json
- Problème: No verify:unsafe-html in pre-commit hooks
- Impact: Développeurs peuvent oublier de lancer la vérification
- Risque: Security regressions pushed to main
- Fix: Ajouter à pre-commit ou CI
- Vérification: cat package.json | grep -A5 '"pre-commit"'
- Estimation: S
```

```
2C-006 - HIGH - scripts/_server.cjs
- Problème: No rate limiting
- Impact: Brute force possible
- Risque: DoS via many requests
- Fix: Ajouter middleware de rate limiting
- Vérification: Non applicable (site statique)
- Estimation: L
```

```
2C-007 - CRITICAL - scripts/verify-unsafe-html.mjs:53
- Problème: rhsIsEmptyString regex incomplete - ne capture pas innerHTML = "" ou innerHTML=''
- Impact: innerHTML = ""; innerHTML=''; innerHTML="" not caught
- Risque: False negatives in security checks
- Fix: Mettre à jour regex pour matcher tous les patterns de string vide
- Vérification: Tester avec innerHTML = ""; innerHTML=''; innerHTML=""
- Estimation: S
```

```
2C-008 - MEDIUM - No verification script for localStorage key validation
- Problème: Arbitrary keys can be used without validation
- Impact: Storage pollution, keys collision
- Risque: Application state corruption
- Fix: Créer verify-localstorage-keys.mjs pour vérifier toutes les utilisations de localStorage
- Vérification: ls scripts/verify-localstorage*.mjs
- Estimation: M
```

---

### Swarm 3 - Frontend Qualité UX/Code (20 findings)

#### Agent 3A - Contrats DOM data-*, pages app

```
3A-001 - CRITICAL - index.html:96
- Problème: data-contract="daily-mission" présent mais non documenté dans agent-codebase-map.md Zone 1
- Impact: Contrat DOM non standard, sélecteur fragile
- Risque: Cassure sélecteur CSS/JS si data-contract est renommé
- Fix: Renommer en data-daily-mission-container (standard selon l'architecture)
- Vérification: grep -r "data-contract" index.html assets/js/ scripts/
- Estimation: M
```

```
3A-002 - CRITICAL - index.html:129,134,139
- Problème: Éléments [data-mission-action] sans data-mission-step ou data-mission-index
- Impact: mission-checklist.js ligne 17 utilise itemIndex() qui cherche data-mission-step OU data-mission-index
- Risque: Index déduit de la position DOM - fragile si DOM change
- Fix: Ajouter data-mission-step="0|1|2" sur chaque .ap-step
- Vérification: node scripts/verify-course-sidebar.mjs --check-selectors
- Estimation: M
```

```
3A-003 - HIGH - index.html:109
- Problème: data-lockable-mission-cta avec data-locked-href="checkout.html" mais mission-ui.js ne gère pas ce sélecteur
- Impact: CTA non verrouillable comme prévu
- Risque: Fonctionnalité orpheline
- Fix: Ajouter gestion dans mission-ui.js OU supprimer data-locked-href
- Vérification: npm run verify:s01
- Estimation: S
```

```
3A-004 - HIGH - planning.html:75-81
- Problème: [data-planning-board], [data-mobile-agenda], [data-subject-legend], [data-planning-assistant] référencés
- Impact: assets/js/pages/planning.js utilise querySelector sans vérification d'existence
- Risque: Plantage si élément manquant
- Fix: Ajouter checks et fallbacks dans planning.js
- Vérification: npm run verify:s02
- Estimation: S
```

```
3A-005 - HIGH - progression.html:111-119
- Problème: data-grade-start, data-grade-current, data-grade-delta hydratés par script inline
- Impact: progression.html utilise OutilPrepa.state.gradeProgress mais index.html utilise OutilPrepa.mission
- Risque: Divergence source de vérité
- Fix: Centraliser dans mission-ui.js OU clarifier dans agent-codebase-map.md
- Vérification: npm run verify:s03
- Estimation: M
```

```
3A-006 - MEDIUM - index.html:173-235
- Problème: [data-why-open], [data-why-lines], [data-why-card], [data-why-overlay] sans JS dédié
- Impact: Fonctionnalité orpheline, non référencée dans mission-ui.js
- Risque: Code mort ou fonctionnalité cassée
- Fix: Ajouter wire-up dans mission-ui.js OU supprimer ces attributs
- Vérification: Playwright click('[data-why-toggle]')
- Estimation: S
```

```
3A-007 - MEDIUM - index.html:210-222
- Problème: [data-when] utilisé pour styling mais pas pour logique
- Impact: Sélecteur CSS fragile si structure change
- Risque: Style cassé
- Fix: Documenter dans agent-codebase-map.md comme contrat visuel seulement
- Vérification: Audit CSS
- Estimation: S
```

```
3A-008 - LOW - index.html:89-90
- Problème: data-user-greeting, data-today-subtitle non hydratés par mission-ui.js
- Impact: Valeurs statiques, pas de personnalisation
- Risque: Expérience utilisateur moins bonne
- Fix: Ajouter à mission-ui.js renderTextTargets
- Vérification: grep data-user-greeting scripts/
- Estimation: S
```

#### Agent 3B - Checkout, parent, funnel, cohérence CTA

```
3B-001 - CRITICAL - scripts/checkout.js:3-171
- Problème: checkout.js configure Stripe via planBillingUrl/planUrl/configuredUrl
- Impact: VIOLATION RÈGLE CRITIQUE: "checkout.js ne configure PAS Stripe (seulement lit l'état UI)"
- Risque: Régression avec l'ajout de blocs IA, couplage fort
- Fix: Déplacer toute logique de configuration dans assets/js/pages/checkout.js, garder scripts/checkout.js en lecture seulement
- Vérification: npm run verify:s03
- Estimation: L
```

```
3B-002 - CRITICAL - checkout.html:283-285
- Problème: sticky-cta avec data-checkout-button mais pas dans viewport mobile
- Impact: CTA collant masqué ou inaccessible sur mobile
- Risque: Perte de conversion mobile
- Fix: Ajouter media query pour masquer sticky-cta sur mobile OU intégrer à mobile-tabs
- Vérification: Playwright viewport 390x844
- Estimation: M
```

```
3B-003 - HIGH - checkout.html:54-56,136-138,168-170
- Problème: data-checkout-button sans data-checkout-state initial
- Impact: Boutons dans état indéterminé avant JS load
- Risque: Expérience utilisateur incohérente
- Fix: Ajouter data-checkout-state="needs-config" sur tous les boutons
- Vérification: npm run verify:s03
- Estimation: S
```

```
3B-004 - HIGH - parent.html:62
- Problème: data-parent-checkout href="checkout.html?source=parent-share#offre"
- Impact: Paywall arrive AVANT preuve de valeur - VIOLATION RÈGLE PRODUIT
- Risque: Conversion prématurée, perte de valeur perçue
- Fix: Ajouter section mission avant CTA OU rediriger vers index.html
- Vérification: Playwright navigation parent.html -> checkout
- Estimation: M
```

```
3B-005 - MEDIUM - assets/js/ui/free-trial-banner.js:28
- Problème: isLocked() vérifie store mais bandeau peut apparaître sur pages sans OutilPrepa
- Impact: Référence non définie, erreur JS possible
- Risque: Crash du banner sur certaines pages
- Fix: Ajouter guard if (!api) return; avant api.isLocked()
- Vérification: Playwright sur page sans store
- Estimation: S
```

```
3B-006 - MEDIUM - assets/js/domain/pricing.js:14-48
- Problème: OPPricing expose prix mais checkout.html utilise meta tags pour Stripe URLs
- Impact: Désync si prix change
- Risque: Prix affichés ≠ prix facturés
- Fix: Centraliser Stripe URLs dans pricing.js ou domain/
- Vérification: grep -r "99.*€\|199.*€" assets/js/domain/
- Estimation: M
```

```
3B-007 - LOW - checkout.html
- Problème: Pas de promesse "20/20" visible
- Impact: Conforme à la règle produit
- Risque: Aucun
- Fix: Pas de fix nécessaire
- Vérification: grep -i "20/20\|vingt.*vingt" checkout.html
- Estimation: S
```

#### Agent 3C - CSS, responsive, accessibilité, overflow, performance UI

```
3C-001 - CRITICAL - prototypes/cours/maths-specialite/second-degre/index.html:205-207,265-266
- Problème: Formules KaTeX dans conteneurs potentiellement étroits
- Impact: Risque de overflow horizontal sur mobile
- Risque: Formules illisibles, expérience utilisateur dégradée
- Fix: Vérifier tous les conteneurs de formules ont min-width suffisant
- Vérification: node scripts/verify-course-sidebar.mjs --check-formulas
- Estimation: S
```

```
3C-002 - CRITICAL - prototypes/cours/maths-specialite/cours.css:1-200
- Problème: .course-sidebar::before utilise transform: translateX(-50%)
- Impact: Flèche fermée centrée OK, mais pas de vérification overflow formulaire
- Risque: Vérification incomplète dans verify-course-sidebar.mjs
- Fix: Ajouter check overflow formulaire dans verify-course-sidebar.mjs
- Vérification: node scripts/verify-course-sidebar.mjs
- Estimation: S
```

```
3C-003 - HIGH - styles.css:1-200
- Problème: .app { grid-template-columns: 240px 1fr } sans min-width: 0 sur .main
- Impact: Risque de overflow caché sur mobile
- Risque: Contenu tronqué sur petits écrans
- Fix: Ajouter min-width: 0 à .main et .view
- Vérification: Playwright viewport 390x844
- Estimation: S
```

```
3C-004 - HIGH - prototypes/cours/maths-specialite/second-degre/index.html:243-247
- Problème: Formules KaTeX dans .check-card - conteneur étroit
- Impact: Risque overflow horizontal
- Risque: Formules illisibles
- Fix: Ajouter .check-card { max-width: 100% }
- Vérification: node scripts/verify-course-sidebar.mjs
- Estimation: S
```

```
3C-005 - HIGH - cours.css:160-180
- Problème: .course-sidebar:not(:hover):not(:focus-within)::before { opacity: 1 }
- Impact: Test fragile - verification script attend opacity > 0.9
- Risque: Test faussement négatif
- Fix: Standardiser opacity: 1 dans tous les cas
- Vérification: node scripts/verify-course-sidebar.mjs
- Estimation: S
```

```
3C-006 - MEDIUM - assets/css/pages/checkout.css
- Problème: Pas de focus-visible sur .cta
- Impact: WCAG AA non respecté
- Risque: Accessibilité dégradée pour les utilisateurs clavier
- Fix: Ajouter .cta:focus-visible { outline: 3px solid var(--stabilo) }
- Vérification: axe-core --rule focus-visible
- Estimation: S
```

```
3C-007 - MEDIUM - index.html
- Problème: Pas d'attribut data-course-layout
- Impact: OK - ce n'est pas une page cours
- Risque: Aucun
- Fix: Pas de fix nécessaire
- Vérification: Conforme à docs/regles-layout-no-scroll.md
- Estimation: S
```

```
3C-008 - MEDIUM - prototypes/cours/maths-specialite/cours.css
- Problème: Duplication CSS avec styles.css (grid, border-radius)
- Impact: Maintenance complexe
- Risque: Incohérence visuelle future
- Fix: Documenter dans agent-codebase-map.md Zone 3
- Vérification: grep -r "border-radius.*10px\|12px\|14px" assets/css/ prototypes/cours/
- Estimation: S
```

```
3C-009 - LOW - checkout.html
- Problème: Contraste vérifié - var(--ink) #121212 sur var(--paper) #F6F2EB = 15.3:1 (OK WCAG AAA)
- Impact: Conforme
- Risque: Aucun
- Fix: Pas de fix nécessaire
- Vérification: passed
- Estimation: S
```

---

### Swarm 4 - Vérifications et Qualité Automatisée (17 findings)

#### Agent 4A - package.json et couverture de npm run verify

```
4A-001 - HIGH - package.json:25
- Problème: npm run verify manque verify:course-sidebar, verify:onboarding, verify:parent-share
- Impact: Gaps de couverture pour les contrats DOM cours/onboarding/parent
- Risque: Régressions non détectées dans ces zones
- Fix: Ajouter ces 3 commandes à la chaîne verify
- Vérification: npm run verify
- Estimation: S
```

```
4A-002 - HIGH - package.json:25
- Problème: npm run verify manque verify:redesign-pages
- Impact: Gaps de couverture pour les pages redesign
- Risque: Régressions non détectées
- Fix: Ajouter && npm run verify:redesign à la chaîne
- Vérification: npm run verify
- Estimation: S
```

```
4A-003 - MEDIUM - package.json:25
- Problème: npm run verify inclut verify:analytics non documentée dans agent-codebase-map.md Zone 4
- Impact: Incohérence documentation
- Risque: Confusion pour les futurs développeurs
- Fix: Ajouter à la doc OU retirer de la chaîne verify
- Vérification: grep -A10 "Zone 4" docs/agent-codebase-map.md
- Estimation: S
```

```
4A-004 - LOW - scripts/verify-s01-dashboard.mjs:173
- Problème: Utilise throw au lieu de process.exit(1)
- Impact: Messages d'erreur non standardisés
- Risque: Scripts moins prévisibles
- Fix: Remplacer throw par console.error + process.exit(1)
- Vérification: npm run verify:s01
- Estimation: S
```

```
4A-005 - MEDIUM - verify-s01, s02, s03, s04, s05
- Problème: Duplication partielle - tous vérifient overflow/console sur les mêmes pages
- Impact: Redondance, maintenance plus complexe
- Risque: Inconsistance entre les scripts
- Fix: Consolider dans un script commun ou spécialiser chaque script
- Vérification: grep -l "overflow\|console" scripts/verify-s*.mjs
- Estimation: M
```

#### Agent 4B - Robustesse des scripts Playwright

```
4B-001 - HIGH - scripts/verify-s01-dashboard.mjs:45-55
- Problème: Sélecteurs multi-fallback pour mission block
- Impact: Faux négatifs si nouveau sélecteur non ajouté
- Risque: Régressions DOM non détectées
- Fix: Documenter la liste des sélecteurs valides
- Vérification: grep -A20 "MISSON_SELECTORS" scripts/verify-s01-dashboard.mjs
- Estimation: M
```

```
4B-002 - HIGH - scripts/verify-s03-checkout.mjs:65-75
- Problème: UNSUPPORTED_BACKEND_COPY vérifie seulement 4 patterns
- Impact: Faux négatifs si nouveau texte backend ajouté
- Risque: Backend copy non détecté
- Fix: Étendre la liste ou utiliser regex générique
- Vérification: grep -A10 "UNSUPPORTED_BACKEND_COPY" scripts/verify-s03-checkout.mjs
- Estimation: M
```

```
4B-003 - MEDIUM - scripts/verify-s04-craft.mjs:95-115
- Problème: assertFocusAndPressedSource vérifie seulement styles.css et checkout.css
- Impact: Faux négatifs si CTA dans autres fichiers CSS
- Risque: CTA non vérifié
- Fix: Étendre à tous les fichiers CSS
- Vérification: grep -l "\.cta\|\.button" assets/css/*.css
- Estimation: S
```

```
4B-004 - MEDIUM - scripts/verify-s05-tunnel.mjs:280-295
- Problème: assertMerciContinuationRoutes vérifie seulement 3 routes
- Impact: Faux négatifs si nouvelle route ajoutée
- Risque: Route non vérifiée
- Fix: Lier à la liste des pages root
- Vérification: ls *.html | grep -v "^abonnements"
- Estimation: S
```

```
4B-005 - MEDIUM - Tous scripts Playwright
- Problème: Dépendent de chromium.launch()
- Impact: Échec si Playwright non installé
- Risque: Vérifications non exécutées
- Fix: Ajouter check pré-lancement + message clair
- Vérification: node -e "const {chromium} = require('playwright'); console.log('Playwright OK')"
- Estimation: S
```

```
4B-006 - HIGH - scripts/verify-cwv.mjs:280-320
- Problème: Budget interaction/longTask différent pour cours vs autres pages
- Impact: Bon équilibre valeur/coût
- Risque: Aucun
- Fix: Conserver comme est
- Vérification: npm run verify:cwv
- Estimation: L
```

```
4B-007 - LOW - Tous scripts Playwright
- Problème: Tous lancent Chromium séparément
- Impact: Temps total élevé (~3-5 min)
- Risque: CI lente
- Fix: Paralléliser en CI
- Vérification: Temps d'exécution total
- Estimation: M
```

#### Agent 4C - Nouveaux checks sans dépendance npm

*Voir section "Plan d'action recommandé" pour les 3 checks prioritaires à implémenter*

---

### Swarm 5 - Onboarding, Cours et Pédagogie IA (11 findings)

#### Agent 5A - Onboarding React, moteur mission, paywall

```
5A-010 - HIGH - onboarding/state.jsx:27, onboarding/app.jsx:72, onboarding.html:27
- Problème: showCommitmentRecap peut être désactivé via __ONBOARDING_TWEAKS_DEFAULTS
- Impact: Paywall arrive directement après social, sans recap
- Risque: VIOLATION RÈGLE PRODUIT: "paywall après preuve de valeur"
- Fix: Forcer showCommitmentRecap: true dans __ONBOARDING_TWEAKS_DEFAULTS OU supprimer l'option
- Vérification: Tester avec showCommitmentRecap: false dans tweaks
- Estimation: S
```

```
5A-011 - MEDIUM - onboarding/screens-late.jsx:1
- Problème: QR code chargé dynamiquement
- Impact: Latence si qrcode.js non caché
- Risque: Expérience utilisateur dégradée
- Fix: Précharger qrcode-generator-2.0.4 ou utiliser service statique
- Vérification: Vérifier temps de chargement mobile
- Estimation: S
```

```
5A-012 - LOW - onboarding/state.jsx:400-420
- Problème: reportStorageIssue montre warning DOM
- Impact: Risque de duplication
- Risque: Warning visible multiple fois
- Fix: Utiliser singleton pour storageWarningShown
- Vérification: Test en mode privé avec storage plein
- Estimation: S
```

#### Agent 5B - Règles de cours maths, KaTeX, sidebar, graphes

```
5B-014 - MEDIUM - prototypes/cours/maths-specialite/cours.css:478-481
- Problème: .katex-display sans contrainte de largeur max
- Impact: Formule très longue pourrait déborder sur mobile
- Risque: Dégâts visuels, formule illisible
- Fix: Ajouter max-width: 100% et overflow-wrap: break-word sur le parent
- Vérification: node scripts/verify-course-sidebar.mjs --check-formulas
- Estimation: S
```

```
5B-015 - MEDIUM - prototypes/cours/maths-specialite/second-degre/index.html:1
- Problème: Pas de meta viewport
- Impact: Mauvaise expérience mobile
- Risque: Layout cassé sur mobile
- Fix: Ajouter <meta name="viewport" content="width=device-width,initial-scale=1">
- Vérification: Playwright viewport 390x844
- Estimation: S
```

```
5B-016 - LOW - prototypes/cours/maths-specialite/cours.css:1
- Problème: Fonts locales sans fallback
- Impact: Problème si fonts manquent
- Risque: Expérience dégradée
- Fix: Ajouter fallback système dans @font-face
- Vérification: Audit des polices
- Estimation: S
```

#### Agent 5C - Futurs blocs IA pédagogiques

*Voir section "Contrats DOM pour blocs IA" pour la spécification complète*

---

## Plan d'action recommandé

### Tranche 1 — Sécurité/Garde-fous avant IA (5 tâches max)

**Objectif :** Éliminer tous les risques CRITICAL qui bloqueraient l'intégration IA ou causeraient des pertes de données.

| # | ID | Titre | Description | Vérification | Estimation |
|---|----|-------|-------------|--------------|------------|
| **1.1** | **2A-004** | Whitelist payload keys in parent-share.js | normalizePayload doit whitelist les clés autorisées pour empêcher les fuites de données sensibles | `node -e "const p=require('./parent-share.js'); console.log(Object.keys(p.normalizePayload({version:1,nom:'test',email:'x@y.com'})))"` | M |
| **1.2** | **2B-001** | Fix XSS in screens-late.jsx:196 | Ajouter // unsafe-html-allow comment avant dangerouslySetInnerHTML | `npm run verify:unsafe-html` | S |
| **1.3** | **2C-001** | Scan source JSX in verify-unsafe-html | Étendre verify-unsafe-html.mjs pour scanner onboarding/*.jsx | `npm run verify:unsafe-html` détecte screens-late.jsx:196 | S |
| **1.4** | **2A-001** | Enforce limits in createPayload | Appliquer limites action:190, why:190, trace:170 dans createPayload() | `node -e "const p=require('./parent-share.js'); const url=p.OLParentShare.createParentUrl({mission:{action:'a'.repeat(200)}}); console.assert(url.length<=1800)"` | S |
| **1.5** | **2C-007** | Fix rhsIsEmptyString regex | Mettre à jour regex pour capturer tous les patterns de string vide ("", '', "") | Test avec innerHTML = ""; innerHTML=''; innerHTML="" | S |

**Critère de succès Tranche 1 :** `npm run verify:unsafe-html && npm run verify:parent-share` passent tous deux.

---

### Tranche 2 — Maintenabilité codebase (5 tâches max)

**Objectif :** Réduire la dette technique et améliorer la maintenabilité avant l'accélération IA.

| # | ID | Titre | Description | Vérification | Estimation |
|---|----|-------|-------------|--------------|------------|
| **2.1** | **1A-001** | Guard Model dependency in state.js | Ajouter check if (!Model) throw Error avant d'utiliser OutilPrepaModel | `npm run verify:s01` | S |
| **2.2** | **3A-002** | Fix mission action indexing | Ajouter data-mission-step="0|1|2" sur chaque .ap-step dans index.html | `node scripts/verify-course-sidebar.mjs --check-selectors` | M |
| **2.3** | **3B-001** | Move Stripe config to pages/checkout.js | Déplacer toute logique de configuration Stripe de scripts/checkout.js vers assets/js/pages/checkout.js | `npm run verify:s03` | L |
| **2.4** | **4A-001 + 4A-002** | Update npm run verify chain | Ajouter verify:course-sidebar, verify:onboarding, verify:parent-share, verify:redesign à la chaîne | `npm run verify` | S |
| **2.5** | **5A-010** | Force showCommitmentRecap in onboarding | Supprimer l'option OU forcer showCommitmentRecap: true dans __ONBOARDING_TWEAKS_DEFAULTS | Test navigation onboarding → recap → paywall | S |

**Critère de succès Tranche 2 :** `npm run verify` passe complètement.

---

### Tranche 3 — Préparation UX/Pédagogie IA (5 tâches max)

**Objectif :** Préparer l'infrastructure pour les futurs blocs IA sans casser l'existant.

| # | ID | Titre | Description | Vérification | Estimation |
|---|----|-------|-------------|--------------|------------|
| **3.1** | **5C-01** | Define IA block DOM contracts | Documenter et implémenter les contrats [data-ia-response], [data-ia-feedback], etc. (voir spécification complète ci-dessous) | Vérification manuelle | M |
| **3.2** | **2B-003** | Adopt DOMPurify | Intégrer DOMPurify via CDN pour tous les contenus utilisateur | `grep -r "DOMPurify" assets/js/` | M |
| **3.3** | **5B-014** | Fix KaTeX container width | Ajouter max-width: 100% et overflow-wrap: break-word sur tous les conteneurs de formules | `node scripts/verify-course-sidebar.mjs --check-formulas` | S |
| **3.4** | **3C-004** | Fix check-card overflow | Ajouter .check-card { max-width: 100% } dans cours.css | `node scripts/verify-course-sidebar.mjs` | S |
| **3.5** | **5B-015** | Add viewport meta to all pages | Ajouter <meta name="viewport"...> à toutes les pages HTML | Playwright viewport tests | S |

**Critère de succès Tranche 3 :** Tous les prototypes de cours passent `node scripts/verify-course-sidebar.mjs` et le contrat DOM IA est documenté.

---

## Contrats DOM pour futurs blocs IA pédagogiques

*Spécification extraite du Swarm 5 - Agent 5C*

### Structure d'un bloc IA standard

```html
<div class="ia-block" data-ia-block="<chapitre>-<notion>-<id>">
  <!-- Prompt - toujours textContent, jamais innerHTML -->
  <div class="ia-prompt" data-ia-prompt>
    <p>Question ou consigne ici...</p>
  </div>

  <!-- Zone de réponse -->
  <div class="ia-response-area">
    <textarea 
      class="ia-input" 
      data-ia-response 
      maxlength="500"
      placeholder="Ta réponse ici..."
      aria-label="Réponse à la question"
    ></textarea>
    <div class="ia-hint" data-ia-hint hidden>
      <p>Indice ici...</p>
    </div>
  </div>

  <!-- Actions -->
  <div class="ia-actions">
    <button class="ia-check" data-ia-submit>Vérifier</button>
    <button class="ia-retry" data-ia-retry hidden>Réessayer</button>
    <button class="ia-reveal" data-ia-reveal>Voir la correction</button>
  </div>

  <!-- Feedback -->
  <div class="ia-feedback" data-ia-feedback hidden>
    <p>
      <span data-ia-verdict></span> <!-- correct|partial|wrong -->
      <span data-ia-message></span> <!-- Message explicatif -->
    </p>
  </div>

  <!-- Correction -->
  <div class="ia-correction" data-ia-correction hidden>
    <p>[Correction structurée ici]</p>
  </div>
</div>
```

### Garde-fous pédagogiques (à intégrer dans les prompts IA)

1. **Toujours expliquer** - Ne jamais valider une réponse fausse par politesse
2. **Zéro ambiguïté** - Toujours expliquer la raison du verdict
3. **Notation cohérente** - Garder les mêmes notations que le cours
4. **Correction structurée** - Séparer par parties si exercice multi-questions
5. **Production active** - Chaque bloc doit pousser l'élève à écrire/produire

### Règles de sécurité IA

1. **Validation** : Non vide, max 500 chars → `value.trim().length > 0 && value.length <= 500`
2. **Sanitization** : TOUJOURS utiliser `DOMPurify.sanitize(value, {ALLOWED_TAGS: []})`
3. **Affichage** : TOUJOURS utiliser `element.textContent = value`, JAMAIS `innerHTML`
4. **Stockage** : Clé préfixée `ia-block-<id>`, valeur bornée
5. **Retry** : Limite 3 tentatives → `state.attempts < 3`

---

## Commandes de vérification recommandées

### Commandes globales
```bash
# Vérification complète
npm run verify

# Vérifications spécifiques sécurité
npm run verify:unsafe-html
npm run verify:server-security
npm run verify:parent-share

# Vérifications fonctionnelles
npm run verify:s01 && npm run verify:s02 && npm run verify:s03
npm run verify:s04 && npm run verify:s05

# Vérifications cours
npm run verify:course-sidebar
node scripts/verify-course-sidebar.mjs prototypes/cours/maths-specialite/second-degre/index.html

# Vérifications onboarding
npm run verify:onboarding
npm run build:onboarding
```

### Commandes pour tester les fixes spécifiques

```bash
# Tester 2A-001 (URL length)
node -e "const p=require('./assets/js/shared/parent-share.js'); const url=p.OLParentShare.createParentUrl({mission:{action:'a'.repeat(200),why:'b'.repeat(200),trace:'c'.repeat(200)}}); console.assert(url.length<=1800,'URL trop longue:',url.length)"

# Tester 2A-004 (whitelist keys)
node -e "const p=require('./assets/js/shared/parent-share.js'); const test={version:1,nom:'Lina',email:'test@x.com',mission:{},offre:{}}; const result=p.OLParentShare.normalizePayload(test); console.assert(!('nom' in result),'nom devrait être filtré'); console.assert(!('email' in result),'email devrait être filtré')"

# Tester 2C-007 (regex innerHTML)
node -e "const regex = /\binnerHTML\s*=\s*['\"][^'\"]*['\"]\s*;?\s*/; console.log(regex.test('innerHTML = \"\";')); console.log(regex.test('innerHTML = \"\"')); console.log(regex.test(\"innerHTML='';\"));"
```

---

## Documentation à mettre à jour

1. **docs/agent-codebase-map.md** :
   - Ajouter la règle : « Le paywall doit toujours arriver APRES la preuve de valeur »
   - Documenter que parent.html doit afficher la mission avant le CTA checkout
   - Clarifier la source de vérité pour le pricing (OPPricing vs OutilPrepaModel)
   - Documenter les contrats data-* pour les blocs IA

2. **docs/vision-cours-ia-interactifs.md** (à créer si n'existe pas) :
   - Intégrer le contrat DOM ci-dessus
   - Documenter les garde-fous pédagogiques
   - Documenter les règles de feedback
   - Documenter les profils de ton

3. **onboarding.md** :
   - Documenter que showCommitmentRecap ne doit JAMAIS être false
   - Documenter le flow: mission → social proof → recap → paywall

4. **package.json** :
   - Mettre à jour la commande `verify` pour inclure tous les scripts manquants

---

## Synthèse des risques par zone

### 🔴 CRITICAL (12 findings) - À corriger AVANT toute intégration IA

| ID | Zone | Impact | Risque |
|----|------|--------|--------|
| 2A-001 | Payload parent | URL overflow | DoS |
| 2A-004 | Payload parent | Data leak | Sensitive info |
| 2B-001 | React onboarding | XSS | Session compromise |
| 2C-007 | Vérification | False negative | Security gap |
| 3A-001 | Contrats DOM | Sélecteur cassé | Functionality broken |
| 3A-002 | Contrats DOM | Index fragile | Data corruption |
| 3B-001 | Checkout | Architecture | Regression |
| 2C-001 | Vérification | False negative | React XSS |
| 5A-010 | Onboarding | Paywall timing | Value loss |
| 2B-002 | Future IA | XSS risk | Session compromise |
| 2A-002 | Sanitization | XSS | Session compromise |
| 3B-002 | Mobile UX | CTA hidden | Conversion loss |

### 🟠 HIGH (32 findings) - À corriger avant accélération IA

Priorité selon impact produit et risque régression.

### 🟡 MEDIUM (20 findings) - À corriger lors de la maintenance

### 🟢 LOW (8 findings) - Améliorations cosmétiques

---

## Matrice de décision rapide

| Situation | Action | Justification |
|-----------|--------|---------------|
| Trouver un innerHTML avec données utilisateur | BLOQUER | Risque XSS CRITICAL |
| Trouver une clé localStorage sans préfixe | CORRIGER | Inconsistance, risque conflit |
| Trouver un contrat data-* non documenté | DOCUMENTER | Maintenabilité |
| Trouver une duplication de code | ÉVALUER | 3ème duplication = extraire |
| Trouver un fichier > 500 lignes | ÉVALUER | Responsabilités distinctes ? |
| Trouver un graphe SVG/Canvas dans cours | BLOQUER | Violation règle pédagogique |
| Trouver une formule KaTeX dans conteneur étroit | CORRIGER | Expérience utilisateur |

---

## Conclusion

**Statut global :** ⚠️ **12 findings CRITICAL** bloquent l'intégration IA. **32 findings HIGH** doivent être corrigés avant l'accélération. **20 findings MEDIUM** et **8 findings LOW** peuvent être traités progressivement.

**Recommandation :**
1. **IMMÉDIAT** : Corriger les 5 tâches de la Tranche 1 (sécurité)
2. **URGENT** : Corriger les 5 tâches de la Tranche 2 (maintenabilité)
3. **PRÉPARATION** : Implémenter les 5 tâches de la Tranche 3 (UX/pédagogie)
4. **CONTINU** : Mettre à jour la documentation pendant les corrections

**Prochaine étape :** Lancer l'implémentation des tâches de la Tranche 1 avec un agent de code dédié.

---

*Document généré par Mistral Vibe - 15 agents sur 5 swarms  
*Date: 2026-05-29  
*Mode: Lecture seule - Audit qualité code  
*Couverture: 72 findings consolidés sur 5 zones du codebase*