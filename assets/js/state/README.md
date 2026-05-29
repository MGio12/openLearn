# State browser

Le store actif vit dans `assets/js/state/store.js` et reste exposé via `window.OutilPrepa`.

Les pages doivent charger `assets/js/domain/model.js` avant `assets/js/state/store.js`. Le store ne doit pas contenir de sélection DOM : les comportements visuels vivent dans `assets/js/ui/` ou `assets/js/pages/`.
