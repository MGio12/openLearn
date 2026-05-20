(function () {
  var STORAGE_KEY = "op.stripe.checkoutUrl";
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-checkout-button]"));
  var setupPanel = document.getElementById("checkout-setup");
  var form = document.querySelector("[data-checkout-config-form]");
  var input = document.getElementById("stripe-url");
  var message = document.querySelector("[data-checkout-message]");

  function clean(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function metaUrl(name) {
    var meta = document.querySelector('meta[name="' + name + '"]');
    return meta ? clean(meta.getAttribute("content")) : "";
  }

  function bodyUrl(name) {
    return clean(document.body ? document.body.getAttribute(name) : "");
  }

  function planMapUrl(plan, billing) {
    var urls;

    try {
      urls = window.OP_STRIPE_CHECKOUT_URLS;
    } catch (error) {
      urls = null;
    }

    if (!urls || typeof urls !== "object") return "";

    if (plan && billing) {
      return clean(urls[plan + "-" + billing]) ||
        clean(urls[plan + ":" + billing]) ||
        clean(urls[plan] && urls[plan][billing]);
    }

    return plan ? clean(urls[plan]) : "";
  }

  function planBillingUrl(plan, billing) {
    if (!plan || !billing) return "";

    return planMapUrl(plan, billing) ||
      metaUrl("stripe-checkout-url-" + plan + "-" + billing) ||
      bodyUrl("data-stripe-checkout-url-" + plan + "-" + billing);
  }

  function planUrl(plan) {
    if (!plan) return "";

    return planMapUrl(plan) ||
      metaUrl("stripe-checkout-url-" + plan) ||
      bodyUrl("data-stripe-checkout-url-" + plan);
  }

  function configuredUrl(plan, billing) {
    var globalUrl = clean(window.OP_STRIPE_CHECKOUT_URL);
    var globalMetaUrl = metaUrl("stripe-checkout-url");
    var dataUrl = bodyUrl("data-stripe-checkout-url");
    var storedUrl = "";

    try {
      storedUrl = clean(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      storedUrl = "";
    }

    return planBillingUrl(plan, billing) || planUrl(plan) || globalUrl || globalMetaUrl || dataUrl || storedUrl;
  }

  function isStripeCheckoutUrl(url) {
    return /^https:\/\/(buy|checkout)\.stripe\.com\/.+/i.test(url);
  }

  function showSetup(text) {
    var setupAnchor = document.getElementById("configurer-stripe");
    if (setupAnchor) {
      setupAnchor.classList.add("is-visible");
      setupAnchor.setAttribute("aria-hidden", "false");
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
        button.getAttribute("data-checkout-plan"),
        button.getAttribute("data-checkout-billing")
      );
      var valid = isStripeCheckoutUrl(url);
      button.setAttribute("href", valid ? url : "#configurer-stripe");
      button.setAttribute("data-checkout-state", valid ? "ready" : "needs-config");
    });

    var fallbackUrl = configuredUrl();
    if (isStripeCheckoutUrl(fallbackUrl) && input && !input.value) {
      input.value = fallbackUrl;
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var url = configuredUrl(
        button.getAttribute("data-checkout-plan"),
        button.getAttribute("data-checkout-billing")
      );

      if (!isStripeCheckoutUrl(url)) {
        event.preventDefault();
        showSetup("Ajoute une URL Payment Link Stripe pour activer cette offre.");
        return;
      }

      event.preventDefault();
      window.location.assign(url);
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var url = clean(input ? input.value : "");

      if (!isStripeCheckoutUrl(url)) {
        showSetup("URL attendue: https://buy.stripe.com/... ou https://checkout.stripe.com/...");
        return;
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, url);
      } catch (error) {
        showSetup("URL valide, mais le navigateur refuse le stockage local.");
        return;
      }

      if (message) {
        message.textContent = "Checkout Stripe active pour ce navigateur.";
      }
      updateButtonTargets();
    });
  }

  window.OP_UPDATE_CHECKOUT_BUTTONS = updateButtonTargets;
  document.addEventListener("op:checkout-options-changed", updateButtonTargets);
  updateButtonTargets();
}());
