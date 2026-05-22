/* ============================================================
   OBJECTIF LYCEE - Page checkout
   ------------------------------------------------------------
   UI state only. Payment Link wiring stays in scripts/checkout.js.
   ============================================================ */
(function () {
  'use strict';

  var status = document.querySelector('[data-payment-status]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-checkout-button]'));

  function visibleButtons() {
    return buttons.filter(function (button) {
      return button.offsetParent !== null;
    });
  }

  function syncPaymentStatus() {
    if (!status) return;

    var visible = visibleButtons();
    var hasReadyButton = visible.some(function (button) {
      return button.getAttribute('data-checkout-state') === 'ready';
    });
    var hasNeedsConfigButton = visible.some(function (button) {
      return button.getAttribute('data-checkout-state') === 'needs-config';
    });

    if (hasReadyButton) {
      status.textContent = 'Lien Stripe prêt. Le clic ouvre la page de paiement sécurisée.';
      status.setAttribute('data-status', 'ready');
      return;
    }

    if (hasNeedsConfigButton) {
      status.textContent = 'Lien Stripe à configurer pour ce navigateur de test.';
      status.setAttribute('data-status', 'needs-config');
      return;
    }

    status.textContent = 'Vérification du lien Stripe...';
    status.removeAttribute('data-status');
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
      window.OLAnalytics.track('checkout_selected', {
        page: 'checkout',
        offer: button.getAttribute('data-checkout-plan') || 'personalized-plan',
        billing: button.getAttribute('data-checkout-billing') || 'monthly',
      });
    });
  });

  if (buttons.length) {
    var observer = new MutationObserver(syncPaymentStatus);
    buttons.forEach(function (button) {
      observer.observe(button, {
        attributes: true,
        attributeFilter: ['data-checkout-state', 'href'],
      });
    });
  }

  window.addEventListener('pageshow', syncPaymentStatus);
  document.addEventListener('op:checkout-options-changed', syncPaymentStatus);
  syncPaymentStatus();
})();
