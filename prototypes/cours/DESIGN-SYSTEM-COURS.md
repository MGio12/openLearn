# OBJECTIF LYCÉE - SYSTÈME GRAPHIQUE COURS V2

**Document de référence pour appliquer le système visuel "cours premium" à n'importe quelle page de cours du site.**

Compatible avec la Branding Bible V1 (papier chaud, ink noir, stabilo, données pastel). Spécialisé pour les **longues pages de contenu pédagogique** avec maths, exercices, et navigation par sections.

---

## 0. POSTURE & PRINCIPES

**Sensation cible :** *« un cahier d'études premium, calme, structuré, jamais infantilisant »*.

Cinq règles non-négociables :

1. **Une information principale par bloc.** Jamais 20 métriques visibles ensemble.
2. **Hiérarchie typographique stricte.** Un seul h1, des h2 plus petits, du body lisible. Pas de H1 marketing à 132px sur une page de cours.
3. **Système de cartes resserré.** Maximum 5 rôles visuels distincts. Le reste = variantes d'un même composant.
4. **Espaces noirs respectés.** L'ink (#121212) est l'encre du cahier ; le stabilo (#F4D35E) la surligne. Le rouge (#D96C5F) est l'erreur. Pas de mélange décoratif.
5. **Le calme est un avantage produit.** Bordures fines, ombres offset uniquement, zéro blur, zéro glow, zéro gradient flashy.

**Interdits stricts :**
- Pas de blanc pur (`#FFFFFF`). Toujours `#FFFDF8` ou `#F6F2EB`.
- Pas de gris froid (style SaaS). Les gris sont chauds (`#5F5B57`).
- Pas de glassmorphism, pas de blur, pas de gradient saturé.
- Pas d'emoji dans le contenu de cours.
- Pas de border-radius > 22px (sauf cas hero exceptionnel).
- Pas d'ombre avec blur (`box-shadow` toujours offset pur : `Xpx Ypx 0 #121212`).

---

## 1. TOKENS - COULEURS

Toutes les valeurs sont définies dans `:root` en CSS. **Ne jamais inventer de couleur en dehors de ces tokens.**

### 1.1 Papier (fonds)
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#F6F2EB` | Fond de page principal |
| `--paper-2` | `#EFE7DC` | Surface secondaire, headers de tableau, footer-cell |
| `--panel` | `#FFFDF8` | Fond des cartes, panneaux, sidebar |
| `--panel-tint` | `#FBF6EC` | Section alternante, fond `.answer` |

### 1.2 Encre (textes & bordures)
| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#121212` | Texte principal + toutes les bordures noires |
| `--ink-2` | `#2A2724` | Body lourd, accroches |
| `--ink-soft` | `#5F5B57` | Texte secondaire, labels, légendes |
| `--ink-mute` | `#8B857D` | Texte tertiaire, séparateurs en gris |

### 1.3 Accent - stabilo (le UN highlight du produit)
| Token | Hex | Usage |
|---|---|---|
| `--stabilo` | `#F4D35E` | CTA primaire, active state sidebar, accent du logo, surlignage |
| `--stabilo-wash` | `#FBEAB0` | Fond léger de callout "Majeur à retenir" |

**Règle stabilo :** *à utiliser avec parcimonie*. Maximum 2 surfaces stabilo visibles dans le viewport en même temps. Si tu hésites, n'en mets pas.

### 1.4 Données pastel (rôles sémantiques)
| Token | Hex | Sémantique |
|---|---|---|
| `--blue` / `--blue-2` | `#C7D9D7` / `#A8C2C0` | Méthodes, étapes, info froide |
| `--green` / `--green-2` | `#D8E6C3` / `#8BBF5F` | Validation, success, vérification |
| `--red` | `#D96C5F` | Erreur, piège, alerte (jamais agressif) |
| `--beige` | `#E8C7A9` | Notes, contenu secondaire pastel |
| `--violet-soft` | `#E5DCF3` | Bonus / 20/20 / contenu avancé (rare) |

**Règle :** chaque couleur a un rôle. Ne pas utiliser le bleu pour une erreur, le rouge pour un succès, etc.

### 1.5 Pièges de couleur (rappels)
- Quand tu lis un Hex `#FF...` dans du CSS hérité, demande-toi s'il devrait être un token. Réponse par défaut : oui.
- `#EAF1DF` (vert d'erreur dans le contenu legacy) → remplacer par `--green` ou laisser dans une variante callout tip.
- Tout `linear-gradient` doit être justifié par un effet de papier subtil ou un mood (hero). Pas de gradient sur les cartes.

---

## 2. TYPOGRAPHIE

### 2.1 Familles
```css
--font-display: "Archivo Black", "Arial Black", sans-serif;  /* Titres + chips numériques + boutons */
--font-body:    "Plus Jakarta Sans", system-ui, sans-serif;  /* Tout le corps + UI */
--font-mono:    "JetBrains Mono", "Menlo", monospace;        /* Labels, kickers, badges, math line refs */
```

- `--font-display` est **toujours en `text-transform: uppercase`** et `letter-spacing: -.01em` à -.005em.
- `--font-body` ne prend `uppercase` que dans les eyebrows.
- `--font-mono` est toujours `uppercase` + `letter-spacing: .12em à .14em` sur les labels courts. C'est le code-look des étiquettes de cahier.

### 2.2 Échelle (cours)
| Rôle | Famille | Taille | Line-height | Notes |
|---|---|---|---|---|
| **H1 hero** | display | `clamp(48px, 7vw, 88px)` | 0.96 | Plafond 88px - jamais plus |
| **H2 section** | display | `clamp(26px, 3vw, 36px)` | 1.06 | Sous le numéro de section |
| **H3 carte** | display | `18-22px` | 1.05 | Exercices, sub-headers |
| **Lead** (sous-H1) | body | `clamp(18px, 1.5vw, 22px)` | 1.45 | weight 500, color ink-2 |
| **Body** | body | `17px` (16px mobile) | 1.7 | Couleur ink ou ink-2 |
| **Body small** | body | `15px` | 1.55 | Cartes denses |
| **Caption / Note** | body | `13px` | 1.5 | ink-soft |
| **Eyebrow / Kicker** | mono | `10-11px` | 1 | letter-spacing .14em, uppercase, ink-soft |
| **Badge / Chip** | mono | `10-11px` | 1 | uppercase, letter-spacing .12em |
| **Number marker** | display | `clamp(56px, 6vw, 80px)` | 0.85 | Pour les section markers gros chiffres |

### 2.3 Règles de hiérarchie
- **Un seul `h1` par page.** Toujours dans le hero. Jamais ailleurs.
- Le H2 d'une section est **précédé d'un kicker mono uppercase** + d'un numéro de section gros.
- Le H3 est réservé aux titres de cartes (exercices, callouts importants nommés).
- Pas de H4-H6.
- **Pas de souligné** sauf sur les `.reveal-button` (souligné stabilo) et les liens hover.

---

## 3. ESPACEMENT, RADIUS, BORDURES

### 3.1 Spacing (échelle 4/8)
```
--s-1:  8px   /* gap interne carte / texte */
--s-2:  12px  /* gap interne */
--s-3:  16px  /* padding carte mobile */
--s-4:  22-24px /* padding carte desktop standard */
--s-5:  32px  /* gap entre éléments de section */
--s-6:  48-56px /* gap entre sections / padding hero */
--s-7:  80px  /* gap entre chapitres */
```

**Règle :** entre deux sections de cours, on respire à **80px** (desktop) / 56px (mobile). C'est le rythme calme du papier.

### 3.2 Radius
```
--r-1:   6-8px   /* chips, badges, pills mono */
--r-2:   10px    /* boutons, petites cartes */
--r-3:   12-14px /* cartes standards */
--r-4:   18px    /* hero side, callouts majeurs */
--r-pill: 999px  /* chips ronds, dots */
```

Jamais plus de 22px sauf cas hero.

### 3.3 Bordures
```
--b:      2.5px solid var(--ink)       /* bordure standard "cahier" */
--b-thin: 1.5px solid var(--ink)       /* cartes secondaires */
--b-hair: 1px solid rgba(18,18,18,0.14) /* séparateurs internes */
```

**Règle :** bordure noire visible et assumée. Jamais de bordure subtile grise.

Pour les **borders dashed** (utilisées pour les check-cards et séparateurs internes), épaisseur 1.5-2px, en `rgba(18, 18, 18, 0.18)` ou `var(--ink)`.

### 3.4 Ombres (offset pur, jamais de blur)
```
--sh-soft:   0 1px 0 rgba(18,18,18,0.04), 4px 4px 0 var(--ink)   /* carte standard */
--sh-major:  6px 6px 0 var(--ink)                                  /* hero, course-overview */
--sh-accent: 5px 5px 0 var(--stabilo)                              /* CTA principal ou hero-side */
```

**Hover (signature) :**
```css
.x:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--ink);
}
```

**Active :**
```css
.x:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 var(--ink);
}
```

C'est la signature tactile "papier qu'on appuie". À utiliser sur **tous** les éléments interactifs.

---

## 4. SYSTÈME DE COMPOSANTS

Limite : **5 rôles visuels** seulement. Plus = chaos.

### 4.1 `.formula-card` - Bloc mathématique noir (signature)

**Rôle :** afficher une formule clé ou un calcul rédigé. C'est le composant le plus dense visuellement, donc à utiliser pour les vraies formules, pas pour décorer.

**Structure HTML :**
```html
<div class="formula-card is-major">
  \[ \Delta = b^2 - 4ac \]
</div>
```

**CSS :**
```css
.formula-card {
  padding: 22px 26px;
  background: var(--ink);
  color: var(--panel);
  border: 2.5px solid var(--ink);
  border-radius: 14px;
  font-size: clamp(16px, 1.2vw, 19px);
  line-height: 1.5;
}
.formula-card.is-major {
  box-shadow: 5px 5px 0 var(--stabilo);
}
```

**Quand `.is-major` ?** Pour les **définitions** principales du chapitre (≈ 1 par section). Les calculs intermédiaires (à l'intérieur d'un worked-example) restent sans `.is-major`.

**Règle KaTeX :** délimiteurs `\[ … \]` (display) ou `\( … \)` (inline). Pour un bloc multi-lignes, utiliser `\begin{aligned} … \end{aligned}` (pas `eqnarray`).

### 4.2 `.c-callout` + variantes - Encadrés à message clair

**Rôle :** signaler une règle, un piège, une note, une astuce. Format unifié : un `border-left coloré` + un label mono uppercase + un texte court.

**Structure HTML :**
```html
<div class="c-callout c-callout--key">
  <p class="c-callout__label"><span class="dot"></span>Majeur à retenir</p>
  <p>Texte de la règle.</p>
</div>
```

**Variantes (et quand les choisir) :**
| Variante | Sémantique | Couleur left | Background |
|---|---|---|---|
| `c-callout--key` | Règle qui rapporte, à retenir | `--ink` | `--stabilo-wash` |
| `c-callout--warn` | Piège, erreur fréquente | `--red` | `#FEEAE5` |
| `c-callout--tip` | Astuce, objectif de session, bilan d'étape | `--green-2` | `#EAF1DF` |
| `c-callout--note` | Note neutre, contexte | `--beige` | `#F1EBE0` |

**Règle d'emploi :** maximum **2 callouts visibles** dans le viewport. S'il en faut plus dans une section, c'est que la section est trop longue, ou que tu mélanges les rôles.

### 4.3 `.check-card` - Auto-évaluation (question + reveal)

**Rôle :** question courte d'auto-éval avec corrigé masqué. Bord pointillé pour ne pas rivaliser avec les formules.

**Structure :**
```html
<div class="check-card">
  <p class="check-card__label"><span class="marker">?</span>Question 1</p>
  <p>Énoncé de la question.</p>
  <button class="reveal-button" type="button" data-reveal="diag1">Voir la réponse</button>
  <p id="diag1" class="answer" hidden>Le corrigé court.</p>
</div>
```

**CSS critiques :**
```css
.check-card {
  background: var(--panel);
  border: 2px dashed var(--ink);
  border-radius: 12px;
  padding: 20px 22px;
}
.check-card__label {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--green-2);
}
.check-card__label .marker {
  width: 22px; height: 22px;
  border: 1.5px solid var(--green-2);
  border-radius: 50%;
  color: var(--green-2);
  /* ? ou ✓ ou ✎ selon le type */
}
```

**Variantes de marker :**
- `?` = question (par défaut)
- `✓` = vérification
- `✎` = récupération active (à écrire)

### 4.4 `.worked-example` - Exemple résolu

**Rôle :** démonstration pas-à-pas. Reconnaissable par le **tape-label "EXEMPLE"** flottant en haut à gauche.

**Structure :**
```html
<div class="worked-example">
  <p>Énoncé : soit f(x) = ...</p>
  <div class="formula-card">
    \[ … \]
  </div>
  <p>Conclusion.</p>
</div>
```

**CSS :**
```css
.worked-example {
  padding: 22px 26px 24px;
  background: #F1EBE0;
  border: 1.5px solid var(--ink);
  border-radius: 14px;
  position: relative;
}
.worked-example::before {
  content: "EXEMPLE";
  position: absolute;
  top: -10px; left: 22px;
  padding: 3px 10px;
  background: var(--ink);
  color: var(--panel);
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: .16em;
  border-radius: 6px;
  transform: rotate(-1.5deg);
}
```

**Règle :** un worked-example **contient toujours** au moins un `.formula-card` (la partie calcul) entouré de phrases en prose.

### 4.5 `.exercise` - Exercice (guidé / contrôle / 20-20)

**Rôle :** exercice à faire, avec en-tête + difficulté + énoncé + indice + corrigé masqué.

**Structure :**
```html
<div class="exercise">
  <div class="exercise-header">
    <h3>Guidé 1 - Sommet</h3>
    <span class="difficulty" aria-label="Niveau comprendre">Comprendre</span>
  </div>
  <p>Énoncé.</p>
  <p class="hint-line">indice : commence par α.</p>
  <button class="reveal-button" data-reveal="guide1">Voir le corrigé</button>
  <div id="guide1" class="answer" hidden>…</div>
</div>
```

**CSS critique :**
```css
.exercise {
  padding: 24px 26px 22px;
  background: var(--panel);
  border: 1.5px solid var(--ink);
  border-left: 4px solid var(--ink);   /* clé : barre de gauche colorée par niveau */
  border-radius: 10px;
}
/* Variantes par niveau : on cible l'aria-label de la difficulté */
.exercise:has(.difficulty[aria-label="Niveau 20 sur 20"]) {
  border-left-color: var(--stabilo);
}
.exercise:has(.difficulty[aria-label="Niveau 20 sur 20"]) .difficulty {
  background: var(--stabilo);
}
.exercise:has(.difficulty[aria-label="Niveau contrôle"]) {
  border-left-color: var(--red);
}
.exercise:has(.difficulty[aria-label="Niveau contrôle"]) .difficulty {
  background: #FEEAE5;
}
```

**Règle des indices :** `hint-line` est préfixé visuellement par `"Indice · "` (via ::before, pas dans le texte HTML).

### 4.6 `.c-gate` - Porte d'entrée

**Rôle :** UN bloc noir par section avancée (cap 20/20), pour signaler "tu ne passes pas tant que…". À utiliser avec parcimonie (1-2 fois par chapitre maximum).

```html
<div class="c-gate">
  <p class="c-gate__label">Porte d'entrée</p>
  <p class="c-gate__title">Deux contrôles sans corrigé d'abord</p>
  <p>Texte explicatif.</p>
</div>
```

---

## 5. STRUCTURE GLOBALE D'UNE PAGE COURS

### 5.1 Squelette HTML
```html
<body class="has-course-sidebar">
  <div class="progress-bar"><div class="progress-bar__fill" data-progress-fill></div></div>
  <div class="section-bar" data-section-bar>…</div>

  <aside class="toc course-sidebar" data-course-sidebar>…</aside>

  <header class="course-hero">…</header>

  <main class="course-layout" data-course-layout>
    <article class="lesson course-lesson">
      <section class="course-overview">…</section>     <!-- band éditorial -->
      <section id="diagnostic" class="chapter-section">…</section>
      <section id="formes"     class="chapter-section">…</section>
      <!-- N sections -->
    </article>
  </main>

  <script>/* progress bar + section bar */</script>
</body>
```

**Hooks JS à ne jamais retirer :**
- `data-course-layout`, `data-course-sidebar`, `data-sidebar-toggle`
- `data-section-link` (chaque lien TOC)
- `data-reveal` (chaque bouton) + `id` correspondant sur `.answer`
- `id="quadratic-*"` + `data-course-curve="…"` pour les boards JSXGraph

### 5.2 Hero
```html
<header class="course-hero">
  <nav class="topline" aria-label="Fil d'Ariane">
    <a href="…">Objectif Lycée</a>
    <span>Maths spécialité</span>
    <span>Cours</span>
  </nav>
  <div class="hero-grid">
    <div>
      <p class="hero-eyebrow"><span class="num">01</span> Chapitre</p>
      <h1>Titre du chapitre</h1>
      <p class="hero-lead">Une phrase qui pose la promesse pédagogique.</p>
    </div>
    <aside class="hero-side">
      <p class="hero-side__label">Ce que tu gagnes</p>
      <h2>4 réflexes, 1 contrôle solide</h2>
      <div class="hero-side__steps">
        <!-- 4 cards verb + obj -->
      </div>
    </aside>
  </div>
</header>
```

**Règles hero :**
- Topline : **3 niveaux max** (`Site > Matière > Cours`). Jamais "Prototype isolé" ou autre info dev.
- H1 : un seul, 56-88px, uppercase, pas de mots d'arrêt.
- Lead : **1 phrase**, pas un paragraphe.
- `hero-side` : panneau noir avec `box-shadow: 5px 5px 0 var(--stabilo)`. C'est ici qu'on liste les "réflexes" ou les promesses.

### 5.3 Section markers (le rythme du cours)
```html
<section id="canonique" class="chapter-section">
  <div class="section-marker">
    <div class="section-marker__num">02</div>
    <div class="section-marker__meta">
      <p class="section-marker__kicker">Méthode 1</p>
      <h2>La forme canonique donne le sommet</h2>
    </div>
  </div>
  <p>Premier paragraphe (lead).</p>
  <!-- contenu -->
</section>
```

**Règles :**
- **Numérotation** : `00, 01, 02… 09` pour les sections principales ; lettres pour les blocs spéciaux : `G` (Guidé), `C` (Contrôle), `20` (Cap 20/20), `R` (Révision).
- Le numéro est en gros (`clamp(56px, 6vw, 80px)`), en `-webkit-text-stroke: 1.5px var(--ink)` (creux/outline).
- Le kicker au-dessus du h2 mono uppercase 11px.
- Le séparateur en bas du marker est une `border-bottom: 1.5px dashed`.

### 5.4 Course-overview (band éditorial unique)

Bande SOUS le hero pour récapituler le fil conducteur du chapitre. Une seule par page, juste après le hero. Pas de contenu identique à celui du hero-side.

```html
<section class="course-overview">
  <div>
    <p class="course-overview__title">Fil conducteur</p>
    <h3>Ce chapitre se gagne en 4 réflexes</h3>
    <p class="course-overview__lead">Pitch en 1 phrase.</p>
  </div>
  <div class="overview-flow">
    <span>Forme</span><em>→</em><span>Méthode</span><em>→</em><span>Rédaction</span><em>→</em><span>Exercices</span>
  </div>
</section>
```

### 5.5 Sidebar (TOC)
```html
<aside class="toc course-sidebar" data-course-sidebar>
  <div class="sidebar-head">
    <div>
      <p class="toc-title">Plan</p>
      <p class="sidebar-subtitle">Nom du chapitre</p>
    </div>
    <button class="sidebar-toggle" data-sidebar-toggle>‹</button>
  </div>
  <nav class="toc-links">
    <a href="#section1" data-section-link>
      <span class="toc-index">00</span>
      <span class="toc-label">Diagnostic</span>
    </a>
    <!-- … -->
  </nav>
  <p class="sidebar-foot">Maths spé · Lycée</p>
</aside>
```

**Règles :**
- Fixed left, full-height, **fond `--panel`** (jamais paper).
- Active state : `background: var(--ink); color: var(--panel);` + index pill devient stabilo.
- Toggle : carré arrondi avec shadow offset, jamais un cercle.
- **Pas de checkpoint décoratif en bas.** Juste un footer mono optionnel.
- Mode replié : 56px de large, hover ou focus pour expand temporairement.

### 5.6 Reading progress + section bar (premium touch)

Deux éléments sticky en haut :
1. **Progress bar** : 3px de haut, fill stabilo, indique le % de scroll de la page.
2. **Section bar** : apparaît UNE FOIS que le hero a quitté l'écran ; montre `[chip "02"] [titre section] [3/14]`.

JS minimal en fin de body (déjà inclus dans le template, ~30 lignes). Ne pas le déplacer.

---

## 6. INTERACTIONS

### 6.1 Reveal button (réponses masquées)

**Format :** lien souligné stabilo + flèche `↓`. Jamais un gros bouton jaune.

```css
.reveal-button {
  background: transparent;
  border: none;
  padding: 0 0 2px 0;
  font-family: var(--font-body);
  font-size: 13px; font-weight: 800;
  color: var(--ink);
  border-bottom: 2px solid var(--stabilo);
  cursor: pointer;
}
.reveal-button::after { content: "↓"; }
/* État ouvert : flèche rotate 180 (géré par cours.js) */
```

JS d'origine (`cours.js`) gère le toggle via `data-reveal` + `[id]` + attribut `hidden`. Ne pas modifier.

### 6.2 `.answer` (corrigé révélé)
```css
.answer {
  margin-top: 14px;
  padding: 16px 18px;
  background: var(--panel-tint);
  border-left: 3px solid var(--ink);
  border-radius: 0 10px 10px 0;
}
```

### 6.3 Hover sur cartes interactives
Toutes les `.choice-card`, `.case-card`, `.revision-card` ont un hover signature :
```css
.x:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--ink);
}
```

Effet "soulèvement", pas d'inflation, pas de brightness.

---

## 7. GRAPHES INTERACTIFS (JSXGraph)

**Wrapping standard :**
```html
<figure class="visual-block interactive-graph quadratic-graph">
  <div class="graph-stage">
    <div id="quadratic-orientation-board" class="jxgbox curve-board" data-course-curve="orientation"></div>
    <p class="graph-readout" aria-live="polite">
      <span>Description courte</span>
      <strong>Résultat clé</strong>
    </p>
  </div>
  <figcaption>Phrase pédagogique expliquant le graphe.</figcaption>
</figure>
```

**Règles :**
- Le `<strong>` du readout : sur fond `--ink` avec texte `--stabilo` ET typo mono. Pas un fond jaune massif.
- La `figcaption` toujours sur fond `--paper-2` avec `border-top` noire 1.5px.
- Hauteur board : `min(54vw, 380px)` minimum 280px (jamais < 280 sur desktop).
- Le `data-course-curve` est lu par `cours.js`. À conserver tel quel.

---

## 8. GRILLES STANDARD

### 8.1 Méthodes / Cas / Choix / Diagnostic
Tous ces blocs utilisent **la même grille auto-fit :**
```css
.method-grid,
.choice-grid,
.case-grid,
.diagnostic-grid,
.revision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}
```

**Pas plus de 6 cartes** par grille. Au-delà, c'est une liste, pas une grille.

### 8.2 Différenciation par accent left
- `.method-step` : `border-top: 4px solid var(--blue-2)` (méthode = ligne du dessus) + step number flottant.
- `.case-card` : `border-left: 3px solid var(--blue-2)`.
- `.choice-card` : `border-left: 3px solid var(--stabilo)`.
- `.revision-card` : `border-left: 3px solid var(--green-2)`.

Ces accents permettent à l'œil de catégoriser sans lire.

### 8.3 Math-language visual (deux cas comparés)
```css
.math-language-visual {
  border: 1.5px solid var(--ink);
  border-radius: 14px;
}
.math-language-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.math-language-card {
  padding: 22px 24px;
  border-right: 1.5px dashed rgba(18,18,18,0.14);
}
.math-language-card:last-child {
  border-right: 0;
  background: var(--panel-tint);  /* contraste subtil entre les 2 cas */
}
```

Usage : comparer "si a > 0" vs "si a < 0", deux cas symétriques.

### 8.4 Sign table (tableau de signes)
Grille simple `1.1fr repeat(4, minmax(70px, 1fr))`. Head row en `--paper-2`. Séparateurs internes en dashed `rgba(18,18,18,0.18)`. Voir CSS pour détails.

---

## 9. RESPONSIVE

3 breakpoints :
| Breakpoint | Comportement |
|---|---|
| `≤ 1100px` | `hero-grid`, `course-overview` passent en 1 colonne |
| `≤ 900px` | Sidebar 48px collapsed, grilles 1 colonne, gap section 56px, font-size H1 réduit |
| `≤ 560px` | font-size body 16px, hero h1 `clamp(36px, 9vw, 52px)`, `hero-side__steps` en 1 colonne |

**Règles mobile :**
- Sidebar reste fixed, mais 48px collapsed par défaut, expand au hover/tap.
- Toujours conserver la barre de progress en haut.
- Section bar peut être masquée en mobile si elle gêne (déjà géré dans le CSS via overflow).

---

## 10. MAPPING V1 → V2 (pour migrer une page existante)

Si tu pars d'une page cours v1, voici la table de correspondance :

| Classe v1 | → | Classe v2 | Notes |
|---|---|---|---|
| `.important` | → | `.c-callout.c-callout--key` | Garder le label en `<p class="c-callout__label">` |
| `.teacher-note` | → | `.c-callout.c-callout--warn` | Pour pièges et erreurs |
| `.session-target` | → | `.c-callout.c-callout--tip` | Pour objectifs / bilans |
| `.gate-card` | → | `.c-gate` | Restructurer en label/title/p |
| `.hero-card` | → | `.hero-side` | Repenser le contenu (4 réflexes au lieu de "promesse") |
| `.sidebar-checkpoint` | → | **supprimer** | À remplacer éventuellement par `.sidebar-foot` |
| `.box-title` (dans worked-example) | → | **supprimer** | Remplacé par le `::before "EXEMPLE"` |
| `.brain-scale`, `.mastery-mark` | → | **supprimer** | Anciens éléments du hero |
| `.formula-list` | → | `.method-grid` ou `.choice-grid` | Même CSS |
| `<h1 style="font-size: 132px">` | → | `clamp(48px, 7vw, 88px)` | **toujours** |
| `.reveal-button` (jaune massif) | → | `.reveal-button` (souligné stabilo) | Même nom, CSS refondu |
| Boutons "Voir la réponse" partout | → | Limiter à 1 par check-card / exercise | Pas plus |

---

## 11. CHECKLIST QUALITÉ (à valider avant ship)

Quand un agent applique ce système, il doit vérifier :

- [ ] Un seul `<h1>` dans la page, dans le hero, taille `clamp(48px, 7vw, 88px)`.
- [ ] Topline 3 segments max, pas de mention "prototype" ou debug.
- [ ] Chaque `.chapter-section` a un `.section-marker` avec numéro + kicker + h2.
- [ ] Maximum **5 types de cartes** dans la page (formula, callout, check, worked, exercise + gate).
- [ ] Pas de `.important`, `.teacher-note`, `.session-target`, `.gate-card` bare (migrés vers `c-callout` / `c-gate`).
- [ ] `.reveal-button` est un lien souligné stabilo, pas un bouton jaune chunky.
- [ ] Toutes les ombres sont offset pur (`Xpx Ypx 0 #121212` ou `var(--stabilo)`). Aucun blur.
- [ ] Pas de couleur hors tokens. `grep` les hex codes : doivent matcher les tokens définis.
- [ ] Pas d'emoji dans le contenu du cours.
- [ ] KaTeX : tous les `\[ … \]` et `\( … \)` rendent (vérifier console pour `ParseError`).
- [ ] JSXGraph : `data-course-curve` présent sur chaque `.jxgbox` ; ID matche la fonction de `cours.js`.
- [ ] `data-reveal` + `id="…"` cohérents : chaque bouton trouve son `.answer`.
- [ ] Progress bar et section bar fonctionnent au scroll (vérifier en mode responsive).
- [ ] Sidebar : active state visible, toggle fonctionne, footer mono optionnel uniquement.
- [ ] Mobile (≤ 560px) : pas de débordement horizontal, sidebar 48px expand au tap.
- [ ] Pas de scroll horizontal global (`document.body.scrollWidth === window.innerWidth`).

---

## 12. ANTI-SLOP (refus systématique)

Refuser ou retravailler si :

1. La page utilise plus de 2 couleurs d'accent dans le même viewport.
2. Un `<h1>` ailleurs que dans le hero.
3. Un H1 marketing > 90px sur une page de cours.
4. Plus de 3 callouts visibles en même temps.
5. Une carte sans rôle clair (juste pour "remplir un espace").
6. Un fond gradient sur une carte (gradient = hero/landing uniquement).
7. Un emoji dans le contenu (réservé éventuel : onboarding only, et encore).
8. Une icône SVG décorative qui n'aide pas à la lecture.
9. Une animation > 400ms (sauf le focus mode).
10. Du texte gris froid (`#999`, `#aaa`, etc.) - toujours `--ink-soft` ou `--ink-mute`.

---

## 13. EXEMPLE DE PROMPT POUR L'AGENT

Si tu donnes ce doc à un agent pour qu'il refonde une page de cours, voici le prompt-template :

> Tu es un designer travaillant sur Objectif Lycée. Tu reçois une page de cours legacy (`cours.css` v1) et tu dois la refondre en respectant le système graphique défini dans `DESIGN-SYSTEM.md`.
>
> Suis ces étapes :
> 1. Lis le HTML de la page legacy. Identifie chaque type de bloc (important, teacher-note, exercise, etc.).
> 2. Reporte-toi à la table § 10 (Mapping v1 → v2) pour migrer chaque classe.
> 3. Réécris la page avec la structure § 5 (hero + course-overview + chapter-sections numérotées).
> 4. Pour chaque section, choisis le bon type de callout selon § 4.2.
> 5. Limite les `formula-card.is-major` à 1 par section.
> 6. Garde **tous** les hooks JS : `data-reveal`, `data-section-link`, IDs JSXGraph, attributs `hidden`, etc.
> 7. Ne touche pas à `cours.js`. La page v2 doit fonctionner avec.
> 8. Charge `cours.css`.
> 9. Inclus le bloc `<script>` final pour progress bar + section bar (§ 5.6).
> 10. Avant de livrer, valide la checklist § 11.
>
> Interdits : voir § 12. Si tu doutes, applique la règle § 0 ("le calme est un avantage").

---

## 14. ARCHITECTURE FICHIERS RECOMMANDÉE

```
prototypes/cours/
├── maths-specialite/
│   ├── cours.css        ← le système (à inclure dans chaque page)
│   ├── cours.js            ← logique existante (ne pas modifier)
│   ├── second-degre/
│   │   └── index.html      ← page V2 (charge ../cours.css + ../cours.js)
│   ├── derivation/
│   │   └── index.html      ← idem
│   └── …/index.html
├── DESIGN-SYSTEM.md        ← ce document
```

**Une seule CSS pour toutes les pages de cours.** Si tu as besoin de styles spécifiques (ex : un graphe particulier), garde-les dans un `<style>` scoped en haut du fichier de cette page, jamais dans `cours.css`.

---

## 15. CRÉDITS / SOURCES VISUELLES

- Branding Bible V1 : `papier chaud + ink noir + stabilo + données pastel`.
- Inspirations : Linear (rythme calme), Didasko (éditorial pédagogique), cahiers de prépa scientifique premium.
- Refus explicites : Notion-like (trop neutre), Khan Academy (trop cartoon), MathPapa (trop tech).

---

**FIN.** Ce document est la source de vérité. Si une règle ici contredit le CSS, c'est le CSS qui a tort.
