/** Nutrition Tracker Router
 * @namespace nt.Router
 * @class Router
 * @extends Backbone.Router */
nt.Router = Backbone.Router.extend(/** @lends nt.Router# */{
    routes:{
    },


    /** Instantiate Models, Collections, and Views
     * @function initialize
     * @memberof nt.Router */
    initialize: function() {
        nt.Models.nutrition = new nt.Models.Nutrition();

        nt.Collections.results = new nt.Collections.FoodSearch();
        nt.Collections.recipes = new nt.Collections.FoodRecipes();
        nt.Collections.tracker = new nt.Collections.FoodTracker();

        nt.Views.tabs = new nt.Views.TabView();
        nt.Views.start = new nt.Views.StartView();
        nt.Views.search = new nt.Views.SearchView();
        nt.Views.recipe = new nt.Views.RecipeView();
        nt.Views.nutrition = new nt.Views.NutritionView();
        nt.Views.tracker = new nt.Views.TrackerView();
      //nt.Views.food = new nt.Views.FoodView();
    }
});
