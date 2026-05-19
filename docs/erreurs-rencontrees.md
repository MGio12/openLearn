# Erreurs rencontrées

## KaTeX cassé par un sélecteur CSS trop large

**Symptôme :** des formules comme `\(f(x)\)` ou `\(f'\)` s'affichent sous forme de pastilles, lettres empilées ou fragments décorés.

**Cause :** KaTeX génère beaucoup de balises internes, notamment des `<span>`. Un sélecteur générique comme `.method-step span` applique donc le style prévu pour un badge à chaque morceau de formule.

**Prévention :** ne jamais styler des tags génériques (`span`, `div`, `em`, etc.) dans une zone qui peut contenir du KaTeX ou une librairie de rendu. Ajouter une classe explicite à l'élément voulu, par exemple `.step-number`, puis cibler cette classe.

**Test minimal :** après une modification CSS autour d'un contenu mathématique, vérifier une formule inline dans un paragraphe, une formule inline dans une carte, et une formule bloc.
