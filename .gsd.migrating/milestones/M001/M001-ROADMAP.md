# M001: Prototype statique premium orienté mission du jour

**Vision:** Transformer Objectif Lycee en prototype statique premium et vendable, centré sur la mission du jour, la valeur perçue, la confiance Stripe, et une expérience intime de carnet de lycee vivant.

## Success Criteria

- User can open index.html and immediately see what to work on today.
- User can navigate the static routine/conversion tunnel without dead primary CTAs.
- Checkout clearly communicates investment value, good deal, and Stripe trust.
- Static prototype remains honest about not having backend/auth/real dynamic personalization yet.
- Desktop and mobile verification passes for the core pages.

## Slices

- [ ] **S01: Dashboard mission du jour** `risk:high` `depends:[]`
  > After this: L’utilisateur ouvre index.html et voit immédiatement une mission du jour claire, courte, contextualisée et actionnable; les stats servent seulement d’explication.

- [ ] **S02: Tunnel routine statique** `risk:high` `depends:[S01]`
  > After this: L’utilisateur peut passer de la mission du jour à une page mission crédible, puis revenir vers les priorités ou l’abonnement sans rupture.

- [ ] **S03: Checkout investissement sur soi** `risk:medium` `depends:[S01]`
  > After this: checkout.html sells the 10 €/month subscription as an investment in oneself, a good deal, and a safe Stripe payment, without pretending backend features exist.

- [ ] **S04: Craft feel et micro-interactions** `risk:medium` `depends:[S01,S02,S03]`
  > After this: The key pages feel crafted and memorable through folders, cards, annotations, pressed CTA states, and touch-safe motion that reinforces the study environment.

- [ ] **S05: Vérification responsive et tunnel complet** `risk:medium` `depends:[S01,S02,S03,S04]`
  > After this: The full static tunnel is verified desktop/mobile with functioning CTAs, Stripe Payment Link intact, no blocking console errors, and screenshots or assertions proving the final behavior.

## Boundary Map

Not provided.
