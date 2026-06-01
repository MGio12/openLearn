/* ============================================================
   AGENT HEADER
   Role: cablage Payment Links Stripe, etat des CTA et formulaire
   de config; hydrate data-pricing-* seulement si OPPricing est charge.
   Loaded by: checkout.html apres le HTML des offres.
   Reads/writes: lit OP_STRIPE_CHECKOUT_URL(S), meta/body
   data-stripe-*, localStorage; ecrit outilPrepa:stripe.checkoutUrl
   apres config valide; migre puis supprime op.stripe.checkoutUrl.
   Public contract: data-checkout-button, data-checkout-plan,
   data-checkout-billing, data-checkout-state, data-payment-status,
   window.OP_UPDATE_CHECKOUT_BUTTONS, op:checkout-options-changed.
   Verify: npm run verify:s03 ; npm run verify:localstorage.
   Read next: `docs/agent-codebase-map.md` Zone 1 et Zone 5.

   OBJECTIF LYCEE - Page checkout
   ------------------------------------------------------------
   Hydrate les prix visibles, synchronise l'etat UI des CTA et
   cable les Payment Links Stripe de la page checkout.
   ============================================================ */
(function () {
  'use strict';

  var CHECKOUT_STORAGE_KEY = 'outilPrepa:stripe.checkoutUrl';
  var LEGACY_CHECKOUT_STORAGE_KEY = 'op.stripe.checkoutUrl';
  var status = document.querySelector('[data-payment-status]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-checkout-button]'));
  var setupPanel = document.getElementById('checkout-setup');
  var form = document.querySelector('[data-checkout-config-form]');
  var input = document.getElementById('stripe-url');
  var message = document.querySelector('[data-checkout-message]');

  function clean(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function isStripeCheckoutUrl(url) {
    return /^https:\/\/(buy|checkout)\.stripe\.com\/.+/i.test(clean(url));
  }

  function metaUrl(name) {
    var meta = document.querySelector('meta[name="' + name + '"]');
    return meta ? clean(meta.getAttribute('content')) : '';
  }

  function bodyUrl(name) {
    return clean(document.body ? document.body.getAttribute(name) : '');
  }

  function planMapUrl(plan, billing) {
    var urls;

    try {
      urls = window.OP_STRIPE_CHECKOUT_URLS;
    } catch (error) {
      urls = null;
    }

    if (!urls || typeof urls !== 'object') return '';

    if (plan && billing) {
      return clean(urls[plan + '-' + billing]) ||
        clean(urls[plan + ':' + billing]) ||
        clean(urls[plan] && urls[plan][billing]);
    }

    return plan ? clean(urls[plan]) : '';
  }

  function planBillingUrl(plan, billing) {
    if (!plan || !billing) return '';

    return planMapUrl(plan, billing) ||
      metaUrl('stripe-checkout-url-' + plan + '-' + billing) ||
      bodyUrl('data-stripe-checkout-url-' + plan + '-' + billing);
  }

  function planUrl(plan) {
    if (!plan) return '';

    return planMapUrl(plan) ||
      metaUrl('stripe-checkout-url-' + plan) ||
      bodyUrl('data-stripe-checkout-url-' + plan);
  }

  function readStoredUrl() {
    var storedUrl = '';
    var legacyUrl = '';

    try {
      storedUrl = clean(window.localStorage.getItem(CHECKOUT_STORAGE_KEY));
      if (isStripeCheckoutUrl(storedUrl)) return storedUrl;

      legacyUrl = clean(window.localStorage.getItem(LEGACY_CHECKOUT_STORAGE_KEY));
      if (!isStripeCheckoutUrl(legacyUrl)) return '';

      window.localStorage.setItem(CHECKOUT_STORAGE_KEY, legacyUrl);
      window.localStorage.removeItem(LEGACY_CHECKOUT_STORAGE_KEY);
      return legacyUrl;
    } catch (error) {
      return '';
    }
  }

  function configuredUrl(plan, billing) {
    var globalUrl = clean(window.OP_STRIPE_CHECKOUT_URL);
    var globalMetaUrl = metaUrl('stripe-checkout-url');
    var dataUrl = bodyUrl('data-stripe-checkout-url');

    return planBillingUrl(plan, billing) ||
      planUrl(plan) ||
      globalUrl ||
      globalMetaUrl ||
      dataUrl ||
      readStoredUrl();
  }

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

  function hydratePricing() {
    var pricing = window.OPPricing;
    if (!pricing || typeof pricing.getBillingConfig !== 'function') return;

    var config = pricing.getBillingConfig(pricing.defaultBilling || 'trimester');
    if (!config) return;

    document.querySelectorAll('[data-pricing-plan][data-pricing-field]').forEach(function (element) {
      var plan = element.getAttribute('data-pricing-plan');
      var field = element.getAttribute('data-pricing-field');
      var value = config[plan] && config[plan][field];
      if (typeof value === 'string' && value) element.textContent = value;
    });
  }

  function trackBillingSelected(button) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track('billing_selected', {
      page: 'checkout',
      plan: button.getAttribute('data-checkout-plan') || 'personalized-plan',
      billing: button.getAttribute('data-checkout-billing') || 'monthly',
    });
  }

  function trackCheckoutClick(button, completed) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track('checkout_clicked', {
      page: 'checkout',
      plan: button.getAttribute('data-checkout-plan'),
      billing: button.getAttribute('data-checkout-billing'),
      completed: completed,
    });
  }

  function showSetup(text) {
    var setupAnchor = document.getElementById('configurer-stripe');
    if (setupAnchor) {
      setupAnchor.classList.add('is-visible');
      setupAnchor.setAttribute('aria-hidden', 'false');
    }

    if (setupPanel) {
      setupPanel.hidden = false;
    }

    if (message) {
      message.textContent = text;
    }

    if (input) {
      input.focus();
    }
  }

  function updateButtonTargets() {
    buttons.forEach(function (button) {
      var url = configuredUrl(
        button.getAttribute('data-checkout-plan'),
        button.getAttribute('data-checkout-billing')
      );
      var valid = isStripeCheckoutUrl(url);
      button.setAttribute('href', valid ? clean(url) : '#configurer-stripe');
      button.setAttribute('data-checkout-state', valid ? 'ready' : 'needs-config');
    });

    var fallbackUrl = configuredUrl();
    if (isStripeCheckoutUrl(fallbackUrl) && input && !input.value) {
      input.value = clean(fallbackUrl);
    }

    syncPaymentStatus();
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var url = configuredUrl(
        button.getAttribute('data-checkout-plan'),
        button.getAttribute('data-checkout-billing')
      );

      trackBillingSelected(button);

      if (!isStripeCheckoutUrl(url)) {
        event.preventDefault();
        trackCheckoutClick(button, false);
        showSetup('Ajoute une URL Payment Link Stripe pour activer cette offre.');
        return;
      }

      event.preventDefault();
      trackCheckoutClick(button, true);
      window.location.assign(clean(url));
    });
  });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var url = clean(input ? input.value : '');

      if (!isStripeCheckoutUrl(url)) {
        showSetup('URL attendue: https://buy.stripe.com/... ou https://checkout.stripe.com/...');
        return;
      }

      try {
        window.localStorage.setItem(CHECKOUT_STORAGE_KEY, url);
      } catch (error) {
        showSetup('URL valide, mais le navigateur refuse le stockage local.');
        return;
      }

      if (message) {
        message.textContent = 'Checkout Stripe active pour ce navigateur.';
      }
      updateButtonTargets();
    });
  }

  if (buttons.length) {
    var observer = new MutationObserver(syncPaymentStatus);
    buttons.forEach(function (button) {
      observer.observe(button, {
        attributes: true,
        attributeFilter: ['data-checkout-state', 'href'],
      });
    });
  }

  window.OP_UPDATE_CHECKOUT_BUTTONS = updateButtonTargets;
  window.addEventListener('pageshow', syncPaymentStatus);
  document.addEventListener('op:checkout-options-changed', updateButtonTargets);
  hydratePricing();
  updateButtonTargets();
})();
