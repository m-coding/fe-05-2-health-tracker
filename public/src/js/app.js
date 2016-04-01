// Setup Nutrition Tracker app when DOM is ready
$(document).ready(function() {
    // Instantiate Models and Collections
    nt.Models.nutrition    = new nt.Models.Nutrition();
    nt.Collections.suggest = new nt.Collections.AutocompleteSearch();
    nt.Collections.results = new nt.Collections.FoodSearch();
    nt.Collections.recipes = new nt.Collections.RecipeSearch();
    nt.Collections.tracker = new nt.Collections.NutritionTracker();

    // Instantiate Views
    nt.Views.tabs        = new nt.Views.TabNav();
    nt.Views.start       = new nt.Views.Start();
    nt.Views.search      = new nt.Views.Search({ collection: nt.Collections.results });
    nt.Views.recipe      = new nt.Views.Recipe({ collection: nt.Collections.recipes });
    nt.Views.nutrition   = new nt.Views.Nutrition({ model: nt.Models.nutrition });
    nt.Views.tracker     = new nt.Views.Tracker({ collection: nt.Collections.tracker });

    // Instantiate the Router
    nt.Router.Instance = new nt.Router();
    Backbone.history.start();
    nt.Router.Instance.navigate('start');
});

