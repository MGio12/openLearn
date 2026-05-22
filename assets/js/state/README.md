# State browser

Le store historique reste exposé par `scripts/state.js` pour ne pas casser les pages existantes.

Quand il faudra le déplacer, garder un wrapper compatible `scripts/state.js` ou mettre à jour toutes les pages dans le même diff. Le store ne doit pas contenir de sélection DOM : les comportements visuels vivent dans `assets/js/ui/` ou `assets/js/pages/`.
