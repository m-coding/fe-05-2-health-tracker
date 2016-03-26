/** Nutrition Tracker Router
 * @namespace nt.Router
 * @class nt.Router
 * @memberof! <global>
 * @extends Backbone.Router */

// The # tells JSDoc that the items lent to nt.Router belong to an instance of the class.
nt.Router = Backbone.Router.extend(/** @lends nt.Router# */{
    routes:{
        'search/:query': 'search'
    },

    search: function(query) {
        console.log('Food search containing the word: ' + query);
    },

    /** Instantiate Models, Collections, and Views
     * @function initialize
     * @memberof nt.Router */
    initialize: function() {
        nt.Models.nutrition    = new nt.Models.Nutrition();
        nt.Collections.results = new nt.Collections.FoodSearch();
        nt.Collections.recipes = new nt.Collections.FoodRecipes();
        nt.Collections.tracker = new nt.Collections.FoodTracker();
        nt.Views.tabs          = new nt.Views.TabNav();
        nt.Views.start         = new nt.Views.Start();
        nt.Views.search        = new nt.Views.Search({collection: nt.Collections.results});
        nt.Views.recipe        = new nt.Views.Recipe({collection: nt.Collections.recipes});
        nt.Views.nutrition     = new nt.Views.Nutrition({model: nt.Models.nutrition});
        nt.Views.tracker       = new nt.Views.Tracker({collection: nt.Collections.tracker});
      //nt.Views.food          = new nt.Views.FoodView();
    }
});
