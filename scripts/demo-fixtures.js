/* ============================================================
   OUTIL PREPA - Fixtures demo explicites
   ------------------------------------------------------------
   Contenus visibles de demonstration qui ne viennent pas encore
   de l'etat utilisateur reel.
   ============================================================ */
(function (root) {
  'use strict';

  var FIXTURES = {
    checkoutDemo: {
      source: 'fixture-demo-checkout',
      cockpitDayLabel: 'Journée démo · semaine type',
      testimonial: {
        quote:
          'Avant j’ouvrais mes fiches au hasard. Là j’ai un truc à faire chaque matin — 25 min, c’est fait. J’ai pris 3 points en maths en un mois.',
        name: 'Camille',
        role: 'Terminale — spécialités maths/physique',
      },
    },
  };

  var setText = root.OutilPrepaDom.setText;

  function renderCheckoutDemo() {
    var demo = FIXTURES.checkoutDemo;
    setText('[data-checkout-demo-day]', demo.cockpitDayLabel);
    setText('[data-checkout-testimonial-quote]', '“' + demo.testimonial.quote + '”');
    setText('[data-checkout-testimonial-cite]', demo.testimonial.name + ', ' + demo.testimonial.role);
  }

  root.OutilPrepaFixtures = FIXTURES;
  renderCheckoutDemo();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCheckoutDemo);
  }
})(typeof window !== 'undefined' ? window : globalThis);
