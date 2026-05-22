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
        price: '12,99 €',
        period: '/semaine',
        billing: 'Facturé chaque semaine — sans trimestre complet.',
      },
      'ia-plus': {
        price: '24,99 €',
        period: '/semaine',
        billing: 'Facturé chaque semaine — plus d’IA, sans engagement long.',
      },
      stickyPrice: '24,99 €',
      stickyPeriod: '/semaine',
    },
    trimester: {
      essential: {
        price: '7,62 €',
        period: '/semaine',
        billing: 'Facturé 99 € / trimestre — soit 7,62 €/semaine pour l’accès site + IA master.',
      },
      'ia-plus': {
        price: '15,31 €',
        period: '/semaine',
        billing: 'Ainsi 199 € pour le trimestre entier.',
      },
      stickyPrice: '15,31 €',
      stickyPeriod: '/semaine',
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
