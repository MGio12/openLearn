# Verification Phase 3: Paiement Stripe

## Automated / local checks

| Check | Status | Evidence |
|---|---|---|
| Landing page exists | PASS | `checkout.html` added |
| Confirmation page exists | PASS | `merci.html` added |
| Checkout does not expose Stripe secret | PASS | Only a Payment Link URL is accepted client-side |
| CTA handles missing config | PASS | `scripts/checkout.js` opens setup panel instead of navigating |
| CTA accepts Stripe hosted URLs | PASS | Regex accepts `https://buy.stripe.com/...` and `https://checkout.stripe.com/...` |
| Dashboard navigation includes subscription page | PASS | `index.html` and `ats.html` link to `checkout.html` |

## Requirement status

| Requirement | Status | Notes |
|---|---|---|
| PAY-01 | IMPLEMENTED | Landing page presents offer and purchase CTA |
| PAY-02 | BLOCKED_EXTERNAL | Requires real Stripe Payment Link / checkout session |
| PAY-03 | IMPLEMENTED | Post-payment confirmation page exists |
| PAY-04 | BLOCKED_EXTERNAL | Requires Stripe Dashboard verification after payment |

## Manual Stripe setup

1. Create a Stripe product for Outil Prepa.
2. Add recurring price: 10 EUR / month.
3. Create a Payment Link for that recurring price.
4. Set success redirect to the deployed `merci.html` URL.
5. Set cancel redirect to the deployed `checkout.html` URL.
6. Put the Payment Link URL into `checkout.html` via the `stripe-checkout-url` meta tag or paste it into the setup panel for local testing.
7. Run a test/live payment and confirm the subscription appears active in Stripe.
