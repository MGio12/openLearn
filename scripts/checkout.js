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

  function configuredUrl() {
    var globalUrl = clean(window.OP_STRIPE_CHECKOUT_URL);
    var meta = document.querySelector('meta[name="stripe-checkout-url"]');
    var metaUrl = meta ? clean(meta.getAttribute("content")) : "";
    var dataUrl = clean(document.body ? document.body.getAttribute("data-stripe-checkout-url") : "");
    var storedUrl = "";

    try {
      storedUrl = clean(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      storedUrl = "";
    }

    return globalUrl || metaUrl || dataUrl || storedUrl;
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
    var url = configuredUrl();
    var valid = isStripeCheckoutUrl(url);

    buttons.forEach(function (button) {
      button.setAttribute("href", valid ? url : "#configurer-stripe");
      button.setAttribute("data-checkout-state", valid ? "ready" : "needs-config");
    });

    if (valid && input && !input.value) {
      input.value = url;
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var url = configuredUrl();

      if (!isStripeCheckoutUrl(url)) {
        event.preventDefault();
        showSetup("Ajoute une URL Payment Link Stripe pour activer le checkout.");
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

  updateButtonTargets();
}());
