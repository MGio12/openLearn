(function () {
  "use strict";

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function track(name, props) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== "function") return;
    window.OLAnalytics.track(name, Object.assign({ page: "parent" }, props || {}));
  }

  function hashToken() {
    var hash = window.location.hash || "";
    if (!hash || hash.length < 4) return "";
    var params = new URLSearchParams(hash.replace(/^#/, ""));
    return params.get("p") || "";
  }

  function text(selector, value) {
    var node = qs(selector);
    if (node) node.textContent = value == null ? "" : String(value);
  }

  function show(selector) {
    qsa(selector).forEach(function (node) {
      node.hidden = false;
    });
  }

  function hide(selector) {
    qsa(selector).forEach(function (node) {
      node.hidden = true;
    });
  }

  function formatPrice(value) {
    var number = Number(value);
    if (!Number.isFinite(number)) return "19,99 €";
    return number.toFixed(2).replace(".", ",") + " €";
  }

  function renderFallback() {
    show("[data-parent-fallback]");
    track("parent_recap_viewed", { payload_valid: false });
  }

  function renderRecap(payload) {
    show("[data-parent-recap]");

    text("[data-parent-classe]", payload.classe);
    text("[data-parent-matiere]", payload.matiere);
    text("[data-parent-echeance]", payload.premiereEcheance || "Échéance à préciser");
    text("[data-parent-trial-days]", payload.offre.trialDays);
    text("[data-parent-price]", formatPrice(payload.offre.pricePerMonth));
    text("[data-parent-mission-action]", payload.mission.action);
    text("[data-parent-mission-duration]", payload.mission.duree);
    text("[data-parent-objectif]", payload.objectif);
    text("[data-parent-niveau]", payload.niveau);
    text("[data-parent-mission-why]", payload.mission.why);
    text("[data-parent-mission-trace]", payload.mission.trace);

    var checkout = qs("[data-parent-checkout]");
    if (checkout) {
      checkout.addEventListener("click", function () {
        track("parent_recap_checkout_clicked", {
          source: "parent-share",
          payload_valid: true,
        });
      });
    }

    track("parent_recap_viewed", { payload_valid: true });
  }

  function init() {
    hide("[data-parent-recap]");
    hide("[data-parent-fallback]");
    var helper = window.OLParentShare;
    var payload = helper && helper.decodePayload(hashToken());
    if (!payload) {
      renderFallback();
      return;
    }
    renderRecap(payload);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("hashchange", init);
}());
