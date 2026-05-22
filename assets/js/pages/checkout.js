/* ============================================================
   OBJECTIF LYCEE - Page checkout
   ------------------------------------------------------------
   Selecteur de facturation et demo d'annulation. Les Payment
   Links restent geres par scripts/checkout.js.
   ============================================================ */
(function () {
  'use strict';

  function pricingConfig(id) {
    if (!window.OPPricing || typeof window.OPPricing.getBillingConfig !== 'function') return null;
    return window.OPPricing.getBillingConfig(id);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function refreshCheckoutTargets() {
    if (typeof window.OP_UPDATE_CHECKOUT_BUTTONS === 'function') {
      window.OP_UPDATE_CHECKOUT_BUTTONS();
      return;
    }
    document.dispatchEvent(new CustomEvent('op:checkout-options-changed'));
  }

  function trackCheckout(name, props) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track(name, Object.assign({
      page: 'checkout',
    }, props || {}));
  }

  function selectBilling(id, shouldTrack) {
    var config = pricingConfig(id);
    if (!config) return;

    document.querySelectorAll('[data-billing-option]').forEach((button) => {
      const active = button.dataset.billingOption === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
    });

    document.querySelectorAll('[data-checkout-billing]').forEach((el) => {
      el.setAttribute('data-checkout-billing', id);
    });

    ['essential', 'ia-plus'].forEach((plan) => {
      setText('[data-plan-price="' + plan + '"]', config[plan].price);
      setText('[data-plan-period="' + plan + '"]', config[plan].period);
      setText('[data-plan-billing-note="' + plan + '"]', config[plan].billing);
    });

    setText('[data-sticky-price]', config.stickyPrice);
    setText('[data-sticky-period]', config.stickyPeriod);
    refreshCheckoutTargets();
    if (shouldTrack) trackCheckout('billing_selected', { billing: id });
  }

  document.querySelectorAll('[data-billing-option]').forEach((button) => {
    button.addEventListener('click', () => selectBilling(button.dataset.billingOption, true));
    button.addEventListener('keydown', (event) => {
      const usesArrow = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
      if (event.key !== 'Enter' && event.key !== ' ' && !usesArrow) return;
      event.preventDefault();

      const next = usesArrow
        ? (button.dataset.billingOption === 'weekly' ? 'trimester' : 'weekly')
        : button.dataset.billingOption;
      selectBilling(next, true);
      document.querySelector('[data-billing-option="' + next + '"]')?.focus();
    });
  });

  const cancelBtn = document.querySelector('[data-cp-cancel]');
  const undoBtn = document.querySelector('[data-cp-undo]');
  const states = {
    active: document.querySelector('[data-cp-state="active"]'),
    cancelled: document.querySelector('[data-cp-state="cancelled"]'),
  };

  function showState(name) {
    Object.entries(states).forEach(([k, el]) => {
      if (!el) return;
      el.hidden = k !== name;
    });
  }

  cancelBtn?.addEventListener('click', () => {
    showState('cancelled');
    document.querySelector('[data-cancel-preview]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  undoBtn?.addEventListener('click', () => {
    showState('active');
  });

  selectBilling(window.OPPricing?.defaultBilling || 'trimester', false);
})();
