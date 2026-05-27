# Onboarding Objectif Lycée

Source de vérité produit pour le flow d'onboarding. Le code de référence vit dans `onboarding/` à la racine. Quand cette note diverge du code, le code gagne.

## Stack

- Page hôte : `onboarding.html` à la racine.
- Framework : React 18 production UMD via CDN unpkg + bundle précompilé `onboarding/onboarding.bundle.js`. Exception assumée à la règle vanilla du projet (voir CLAUDE.md). Après chaque modification des JSX, lancer `npm run build:onboarding`.
- Modules JSX dans `onboarding/` :
  - `state.jsx` : manifeste des 15 écrans, listes de choix, moteur mission, helpers dates, helpers localStorage.
  - `profile.jsx` : sidebar IKEA, lignes profil avec emojis, animation `just-filled`.
  - `screens-early.jsx` : intro, classe, objectif, moyenne, échéance, matière.
  - `screens-mid.jsx` : blocage, niveau, effort, nom.
  - `screens-late.jsx` : génération, mission, social, recap, paywall, écran post-activation.
  - `app.jsx` : orchestrateur, persistance, navigation, dots de progression.
- CSS : `onboarding/onboarding.css`. Tokens hérités de `colors_and_type.css`.
- Pont parent : `parent.html` + `assets/js/shared/parent-share.js` + `assets/js/pages/parent.js`. Le partage QR charge localement `qrcode-generator@2.0.4` seulement quand l'élève clique sur "Afficher le QR code".
- Persistance : `localStorage`, clé `objectif-lycee-onboarding-v3`. Trois champs : `profile`, `screenIdx`, `mission`.
- Tweaks runtime : objet global `window.__ONBOARDING_TWEAKS_DEFAULTS` défini en haut de `onboarding.html`. Pas de panneau debug en prod.
- Analytics : `scripts/analytics.js` doit être chargé avant le bundle onboarding pour capter les vues et complétions d'écrans React.

## Décisions verrouillées

- UX : diagnostic guidé, profil latéral qui se construit en parallèle.
- Visuel : carnet premium, fond papier chaud, ombres dures, surlignage stabilo, typographie Archivo Black + Plus Jakarta Sans + Kalam + JetBrains Mono.
- Modèle commercial : hard paywall après preuve de valeur (mission délivrée avant paywall).
- Offre : essai gratuit 3 jours, prix 19,99 € par mois, prélèvement automatique après essai sauf annulation en 1 clic.
- Ancienne offre missions gratuites avant abonnement : supprimée définitivement.

## Promesse

> En 2 minutes, tu obtiens une mission utile pour aujourd'hui, expliquée à partir de ton profil.

L'app ne promet ni note, ni école, ni mention. Elle promet une décision de travail plus claire et une première action faisable aujourd'hui.

Logique commerciale :

> Gratuit avant paywall : comprendre pourquoi cette mission est la bonne. Payant après essai : garder le plan quotidien personnalisé qui s'adapte.

## Sensations cibles, dans l'ordre

1. "On me comprend."
2. "Mon profil devient concret."
3. "La mission n'est pas sortie au hasard."
4. "Je sais ce que je gagne avant de payer."

Chaque écran doit renforcer au moins une de ces sensations. Sinon il est simplifié ou supprimé.

## Principes

- L'onboarding est une preuve progressive de valeur, pas un formulaire d'inscription.
- Chaque réponse modifie visiblement le profil.
- La première victoire est une mission claire, faisable aujourd'hui, avec une trace écrite attendue.
- Paywall après diagnostic, mission, justification et conseil contextualisé.
- Ton sérieux, calme, direct, tutoiement.
- Aucune culpabilisation. Aucun 20/20 promis. Aucun témoignage inventé présenté comme réel.
- Une idée par écran. Pas de mur de texte pendant les questions.

## Preuves d'autorité et apprentissage scientifique

Ces sources servent à guider la conception, le ton et certaines microcopies candidates. Elles ne doivent pas devenir des promesses commerciales visibles de note, d'école, de mention ou de réussite garantie.

| Source | Message à retenir | Usage produit |
|---|---|---|
| [Harvard Gazette, apprentissage actif](https://news.harvard.edu/gazette/story/2019/09/study-shows-that-students-learn-more-when-taking-part-in-classrooms-that-employ-active-learning-strategies/) | Les élèves peuvent avoir l'impression d'apprendre moins quand ils produisent activement, alors que l'apprentissage réel peut être meilleur. Citation courte utilisable : "Deep learning is hard work." | Justifier les écrans qui demandent de choisir une méthode, produire une trace, répondre, recommencer et relire ses erreurs, même si c'est plus exigeant que relire un cours. |
| [École polytechnique, IA obligatoire en 2e année](https://www.polytechnique.edu/presse/communiques-et-dossiers-de-presse/lecole-polytechnique-generalise-lenseignement-de-lintelligence-artificielle-en-2eme-annee-partir-de) | L'IA devient une compétence à comprendre, mobiliser et questionner, pas une magie à subir. | Positionner Objectif Lycée comme un outil d'aide à la décision et à la méthode : l'IA aide à choisir la prochaine action, mais l'élève produit le travail. |
| [UNESCO, guidance generative AI in education and research](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research) | L'IA éducative doit rester humaine, éthique, prudente, adaptée à l'âge et claire sur ses limites. | Éviter le ton "l'IA va réussir pour toi". Afficher ce qui est personnalisé, protéger les données sensibles, et garder une décision compréhensible par l'élève et le parent. |
| [Education Endowment Foundation, metacognition and self-regulation](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation) | Planifier, surveiller son travail et évaluer sa progression sont des leviers solides, mais difficiles à transformer correctement en pratique. | Faire remplir le profil, expliciter le blocage, demander une trace de fin, relire les erreurs, et utiliser les chiffres EEF comme preuve interne de conception, pas comme argument marketing. |
| [Carnegie Mellon, retrieval practice](https://www.cmu.edu/teaching/resources/instructionalstrategies/activelearningstrategies/retrievalpractice/index.html) et [revue Springer sur la pratique de récupération](https://link.springer.com/article/10.1007/s10648-021-09595-9) | Se tester, rappeler une notion, recevoir du feedback et retravailler une erreur ancrent mieux l'apprentissage que la simple relecture. | Chaque mission doit demander une réponse, une méthode écrite, une correction ou un rappel actif, puis donner un retour exploitable. |

## Leviers psychologiques autorisés

- Autorité sobre : citer Harvard, Polytechnique, UNESCO, EEF ou CSEN seulement quand la source précise est disponible. Pas de badge tape-à-l'oeil, pas de logo décoratif qui ferait croire à un partenariat.
- Engagement progressif : profil qui se remplit, mission prête, récap avant paywall. L'engagement doit clarifier la décision, pas piéger l'élève.
- Preuve de personnalisation : montrer quelles réponses alimentent la mission, surtout matière, blocage, niveau et temps hebdo.
- Métacognition : faire planifier, produire une trace, nommer une méthode, relire ses erreurs et comparer son intention avec ce qui a vraiment été fait.
- Zeigarnik et loss aversion : autorisés seulement après preuve de valeur, c'est-à-dire après mission, justification, conseil et récap. Ne pas créer d'anxiété artificielle.
- Preuve sociale : les avis placeholders restent explicitement marqués tant qu'ils ne sont pas réels. Aucun chiffre inventé, aucun témoignage simulé comme preuve.

## Microcopies d'autorité candidates

- `L'IA ne travaille pas à ta place. Elle t'aide à choisir la bonne prochaine action.`
- `Apprendre vraiment demande de produire quelque chose, pas seulement de relire.`
- `Ta mission croise ton objectif, ton blocage, ton niveau et ton temps réel.`
- `Même les meilleures écoles enseignent désormais l'IA comme une compétence à comprendre et questionner.`
- `Une mission utile finit par une trace : une méthode, une réponse, une erreur corrigée.`
- `Le sentiment de comprendre ne suffit pas. On te demande une action visible.`
- `Ces preuves guident le produit. Elles ne promettent ni note, ni mention, ni école.`

## Flow : 15 écrans

Manifeste exact dans `onboarding/state.jsx` (`SCREENS`). Vue d'ensemble :

| # | id | type | données capturées | rôle |
|---|---|---|---|---|
| 0 | `intro` | accroche | aucune | poser le problème direction vs effort |
| 1 | `classe` | single choice | `classe` | adapter calendrier et urgences |
| 2 | `objectif` | multi choice | `objectif` | direction de travail |
| 3 | `moyenne` | double slider | `moyenne.current`, `moyenne.target` | boussole chiffrée à 3 mois |
| 4 | `echeance` | multi choice filtré par classe | `echeances[]` | urgence concrète, dates calculées |
| 5 | `matiere` | multi choice | `matieres[]` | matière prioritaire pour la mission |
| 6 | `blocage` | single choice | `blocage` | variable la plus pesante pour la mission |
| 7 | `niveau` | single choice | `niveau` | calibrage difficulté d'entrée |
| 8 | `effort` | slider 0 à 10 h + photo emploi du temps | `effortHebdo.hours`, `effortHebdo.scheduleUpload` | engagement hebdo, dérive durée mission |
| 9 | `nom` | champ libre | `nom` | personnalisation UI |
| 10 | `generation` | animation 5 étapes | aucune | preuve visible que la mission est construite |
| 11 | `mission` | écran de livraison | `missionRecommandee` calculée | première valeur ressentie |
| 12 | `social` | stats + 4 témoignages élève/parent + conseil | aucune | rassurer sans inventer |
| 13 | `recap` | "Ton année en clair" + partage parent | aucune | cohérence avant paywall, IKEA stack, co-décision parent |
| 14 | `paywall` | hard paywall avec essai 3 jours + partage parent | `trialActivated` à l'activation | décision finale |

Le compteur de progression montre `n / 15` et des dots. Retour arrière possible à chaque étape avant activation.

## Personnalisation et moteur mission

Code de référence : `computeMission(profile)` dans `state.jsx`.

Variables qui pèsent dans la mission :

1. `matieres[0]` : matière prioritaire (par ordre de sélection).
2. `blocage` : variable la plus pesante. Templates dédiés par couple matière x blocage.
3. `niveau` : module la difficulté d'entrée.
4. `effortHebdo.hours` : dérive la durée cible. Formule `Math.round((weekly * 60) / 7 / 5) * 5`, bornée 15 à 60 min.

Variables qui modulent ton et urgence sans changer le template :

- `classe` : filtre les échéances disponibles, ajuste le ton.
- `objectif` : choisit la formulation de la justification.
- `echeances` : ajoutent une urgence dans le récap.
- `moyenne` : sert de boussole dans le récap et le paywall.

Variables purement UI :

- `nom` : affichage seulement, jamais envoyé en analytics.

## Pont parent sans backend

Le pont parent sert à transformer le diagnostic élève en récapitulatif partageable sans compte et sans serveur. L'élève voit une carte "Partager ce plan à un parent" sur le récap et sur le paywall.

Format public :

```text
parent.html#p=<base64url-json>
```

Payload v1 autorisé :

- `version`, `date`, `classe`, `objectif`, `matiere`, `blocage`, `niveau` ;
- `heuresParSemaine`, `premiereEcheance` quand ces infos existent ;
- `mission.action`, `mission.duree`, `mission.why`, `mission.trace` ;
- `offre.trialDays`, `offre.pricePerMonth`.

Champs interdits dans le lien :

- `nom`, email, téléphone ou identifiant personnel ;
- moyenne exacte actuelle/cible ;
- photo d'emploi du temps, nom de fichier ou métadonnées upload ;
- URL Stripe privée, token, query sensible ou texte libre non borné.

Canaux de partage :

- partage natif `navigator.share` quand disponible ;
- WhatsApp ;
- email `mailto:` ;
- copie du lien pour Instagram, SMS ou autre app ;
- QR code généré en SVG local, sans service externe ni CDN runtime.

La page parent affiche la mission proposée, pourquoi elle est logique, la trace attendue, le cadre parent et un CTA vers `checkout.html?source=parent-share#offre`. Si le hash est absent ou invalide, elle affiche un fallback sobre : "Le lien n'est plus lisible", avec retour vers l'onboarding.

## Templates de mission

Bibliothèque complète dans `TEMPLATES` de `state.jsx`. Neuf matières prises en charge :

`Mathématiques`, `Physique-chimie`, `SVT`, `SES`, `HGGSP`, `Histoire-géo`, `Français`, `Philosophie`, `Anglais`.

Sept clés de blocage : `go`, `method-gap`, `start`, `small-errors`, `method`, `late`, `focus`, `combo`. Toute clé absente retombe sur `method-gap`. La clé `go` ("je veux juste commencer") retombe explicitement sur `method-gap` pour ne jamais bloquer l'élève sur le diagnostic.

Chaque template fournit deux champs :

- `a` : l'action concrète à mener.
- `t` : la trace attendue à la fin.

La durée ajuste le texte : ajout d'un préfixe `[Version courte X min]` sous 15 min, ajout d'une étape de relecture à voix haute au-dessus de 50 min.

## Échéances par classe

Liste complète dans `ECHEANCES_ALL`. Chaque entrée porte : `v`, `label`, `emoji`, `days` (delta jours), `classes[]`, `psy` (clé du message d'encouragement contextuel dans `ECHEANCE_PSY`).

Règle : `echeancesForClasse(classe)` filtre par classe. Sans classe choisie, fallback Première. Tri par `days` croissant. Tag `Pressant` automatique si `days <= 14`.

## Profil latéral

Lignes définies dans `PROFILE_LINES`. Chaque ligne porte un emoji calculé via `choiceEmoji(key, value)` :

- pour les choix listés, emoji du choix sélectionné dans `*_CHOICES` ;
- pour `moyenne`, `echeances`, `effortHebdo`, `nom` : emoji statique.

Une ligne marquée `keyForMission` reçoit un badge "Mission" quand l'écran courant est `mission`, `social`, `recap` ou `paywall`. Concrètement, `blocage` et `niveau`.

Après livraison de la mission, une ligne supplémentaire "Mission du jour" apparaît dans le panneau avec un extrait de l'action.

Sur mobile, le profil devient sticky compact en haut avec un toggle "Replier / Voir".

## Preuve sociale

Stats personnalisées par classe et matière, retournées par `getSocialStats(profile)`. Trois cartes : taux d'achèvement de la première mission, taux de continuation à une semaine, note parents sur la régularité.

Quatre témoignages : un élève contextualisé par blocage (`STUDENT_BY_BLOCAGE`), un second élève générique sur la limite de temps, deux parents.

Bandeau obligatoire au-dessus : "exemples placeholders à remplacer". Pas de faux avis présenté comme réel. Étoiles affichées (de 4 à 5 selon le témoignage).

Un conseil ciblé par blocage est affiché en bas (`ADVICE_BY_BLOCAGE`).

## Paywall et règles commerciales

- Hard paywall après diagnostic, mission, justification, conseil et récap.
- Essai gratuit 3 jours. Aucun prélèvement pendant cette période.
- Date exacte de premier prélèvement affichée avant activation. Calcul : `addDays(today, trialDays)`.
- Annulation en 1 clic avant la date, depuis l'espace utilisateur.
- Prélèvement automatique après les 3 jours si pas d'annulation.
- Prix : 19,99 € par mois, ajustable via `__ONBOARDING_TWEAKS_DEFAULTS.pricePerMonth`.
- Ancrage cours particulier : 40 € de l'heure, 160 € pour 4 h par mois. Affiché en barres rouge vs verte dans `.ob-anchor`. Ratio "8x moins cher" calculé dynamiquement.
- Loss aversion : liste barrée de ce que l'élève n'aura pas sans essai. Activable via `showLossAversion`.
- Zeigarnik lock sur l'écran mission : la mission est "prête" mais le bouton commencer renvoie au paywall. Activable via `showZeigarnikLock`.

Texte commercial obligatoire et visible :

- "Aucun prélèvement avant le {trialEnd}."
- "Annulation en 1 clic avant le {trialEnd}."
- "Prélèvement automatique 19,99 €/mois si tu n'annules pas."
- "Paiement Stripe, aucune donnée bancaire stockée chez nous."

## Instrumentation

Événements analytics autorisés pour l'onboarding et le pont parent :

- `onboarding_screen_viewed` : déclenché à chaque vue d'écran React ;
- `onboarding_screen_completed` : déclenché quand l'élève avance après un écran ;
- `parent_share_clicked` : déclenché avec `share_channel` (`native`, `whatsapp`, `email`, `copy`, `qr`) ;
- `parent_recap_viewed` : déclenché sur `parent.html`, avec `payload_valid` ;
- `parent_recap_checkout_clicked` : déclenché quand le parent clique vers le checkout ;
- `billing_selected` : événement checkout autorisé pour le choix d'offre, avec `plan` et `billing`.

Props safe supplémentaires : `screen_id`, `screen_idx`, `share_channel`, `payload_valid`.

Ne pas réintroduire `checkout_selected` ni la prop `offer` : l'événement valide est `billing_selected`, et la prop valide est `plan`.

## Tweaks runtime

Objet `window.__ONBOARDING_TWEAKS_DEFAULTS` dans `onboarding.html` :

| clé | défaut | rôle |
|---|---|---|
| `pricePerMonth` | `19.99` | prix mensuel post-essai |
| `trialDays` | `3` | durée essai |
| `tutorPricePerHour` | `40` | tarif cours particulier pour l'ancre |
| `showStatsNumbers` | `true` | active les 3 cartes stats sur l'écran social |
| `showAnchorMath` | `true` | active le bloc ancrage cours particulier |
| `showZeigarnikLock` | `true` | active le cadenas sur l'écran mission |
| `showLossAversion` | `true` | active la liste barrée du paywall |
| `showCommitmentRecap` | `true` | active l'écran recap |
| `profilePosition` | `"left"` | côté du profil, `left` ou `right` |
| `conversionIntensity` | `7` | non utilisé actuellement, prévu pour piloter l'agressivité globale |
| `startAtScreen` | `1` | non utilisé actuellement |

Aucun panneau debug en prod. Pour ajuster, éditer directement l'objet dans `onboarding.html`.

## Direction visuelle

Tokens dans `colors_and_type.css`. Spécifiquement pour l'onboarding :

- Fond papier `--paper` avec grille discrète (`--grid-color`, `--grid-step`).
- Bordures `--ink` 2.5 à 3 px selon hiérarchie.
- Ombres dures sans flou : `--sh-3`, `4px 4px 0`, `6px 6px 0`, `8px 8px 0`.
- Surlignage stabilo `--stabilo` et `--stabilo-wash` pour les éléments importants.
- Pills d'eyebrow : noir par défaut, stabilo pour valorisation, bleu pour numérotation d'étape.
- Animations sobres calées sur `--ease-calm`. Respect de `prefers-reduced-motion` dans toutes les transitions.

À éviter : dégradés violet/bleu SaaS, glassmorphism, gamification enfantine, cartes trop arrondies.

## Règles de contenu

- Eyebrow : 2 à 5 mots.
- Titre : une phrase courte.
- Microcopy : une phrase, moins de 120 caractères si possible.
- Choix : libellé court, sous-texte court si utile.
- Pas de paragraphe long pendant les questions.
- Pas de promesse commerciale avant la preuve de valeur.

Chaque choix doit permettre à l'élève de se reconnaître et donner une information exploitable au moteur de mission.

## Accessibilité

- Toutes les réponses au clavier. Focus visible net.
- Cartes de choix annoncées comme `aria-pressed`.
- Retour arrière accessible et visible.
- Animations désactivables via `prefers-reduced-motion`.
- Contraste fort sur fond papier.
- Date de prélèvement et annulation lisibles par lecteur d'écran, jamais cachées en gris pâle.

## États à prévoir

- Première visite, profil vide.
- Reprise après refresh : `loadState()` restaure profile + screenIdx + mission.
- Retour arrière, modification d'une réponse, invalidation de la mission calculée si une variable clé change.
- Choix Autre ouvre un champ inline.
- Multi-select : compteur masqué, validation explicite via bouton Continuer.
- Génération en cours, mission prête, paywall vu, essai activé.
- Reset complet : shift-clic sur le brand renvoie au début après confirmation. Effacement via `localStorage.removeItem(LS_KEY)`.

## Tests qualité

Avant de considérer le flow comme bon :

- Le profil se remplit en parallèle, ligne par ligne, avec emoji et animation `just-filled`.
- La mission utilise visiblement matière + blocage + niveau + temps hebdo.
- La mission dit quoi faire, pourquoi, combien de temps, quelle trace produire.
- Aucune mention de missions gratuites avant abonnement n'apparaît dans le flow.
- Le paywall affiche prix, date exacte de prélèvement, annulation en 1 clic, prélèvement automatique.
- `nom` n'est jamais envoyé en analytics.
- Le lien parent généré se décode, reste sous 1800 caractères et ne contient pas de champ sensible.
- Le QR code parent rend un SVG local après clic.
- `parent.html#p=...` affiche mission, justification, trace et CTA checkout ; un payload invalide affiche le fallback.
- Mobile et desktop testés à 390 px et 1440 px, sans overflow horizontal.
- `prefers-reduced-motion` testé : transitions instantanées, génération raccourcie.

Commandes de vérification dédiées :

- `npm run build:onboarding`
- `npm run verify:analytics`
- `npm run verify:onboarding`
- `npm run verify:parent-share`
- `git diff --check`

## Interdits

- Demander email, téléphone, compte avant la mission.
- Faux témoignages présentés comme réels.
- Promettre un 20/20, une mention, une école ou une hausse de notes garantie.
- Cacher la date de débit ou l'annulation.
- Vendre le paywall comme "plus de contenu" plutôt que "garder ton plan personnalisé".

## Définition d'un bon onboarding

L'élève doit pouvoir dire :

> Je sais pourquoi cette mission m'est proposée, je sais ce que je dois produire, et je comprends ce que l'essai garde ouvert.

La dernière impression avant le paywall :

> On m'a compris. La mission est concrète. Maintenant je sais exactement ce que je paie si je veux garder ce plan personnalisé.
