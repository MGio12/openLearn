/* ============================================================
   OBJECTIF LYCEE - Domaine pricing
   ------------------------------------------------------------
   Donnees pures de tarification partageables entre checkout,
   futurs bandeaux d'abonnement et tests navigateur.
   ============================================================ */
(function (root) {
  'use strict';

  var PLANS = {
    weekly: {
      essential: {
        price: ‘Gratuit’,
        period: ‘’,
        total: ‘Gratuit — open source’,
        billing: ‘Accès libre et open source — aucun paiement requis.’,
      },
      ‘ia-plus’: {
        price: ‘Gratuit’,
        period: ‘’,
        total: ‘Gratuit — open source’,
        billing: ‘Accès libre et open source — aucun paiement requis.’,
      },
      stickyPrice: ‘Gratuit’,
      stickyPeriod: ‘’,
    },
    trimester: {
      essential: {
        price: ‘Gratuit’,
        period: ‘’,
        total: ‘Gratuit — open source’,
        billing: ‘Accès libre et open source — aucun paiement requis.’,
      },
      ‘ia-plus’: {
        price: ‘Gratuit’,
        period: ‘’,
        total: ‘Gratuit — open source’,
        billing: ‘Accès libre et open source — aucun paiement requis.’,
      },
      stickyPrice: ‘Gratuit’,
      stickyPeriod: ‘’,
    },
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getBillingConfig(id) {
    return PLANS[id] ? clone(PLANS[id]) : null;
  }

  root.OPPricing = {
    defaultBilling: 'trimester',
    getBillingConfig: getBillingConfig,
    plans: clone(PLANS),
  };
})(typeof window !== 'undefined' ? window : globalThis);
