/** Recipe View
 * @namespace  nt.Views
 * @class nt.Views.Recipe
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Recipe = Backbone.View.extend(/** @lends nt.Views.Recipe# */{

    el: '#search',

    recipeTemplate: Handlebars.compile( $('#recipe-template').html() ),

    events: {
        'click #recipe-open': 'openRecipes',
        'click #recipe-close': 'closeRecipes'
    },

    initialize: function() {
        _.bindAll(this, 'recipeSuccess', 'recipeError');

        // Setup DOM references.
        this.$searchTop = $('#search-top');
        this.$searchResults = $('#search-results');
        this.$recipeTop = $('#recipe-top');
        this.$recipeResults = $('#recipe-results');
    },

    /** Render results */
    render: function() {
        // Clear out old results
        this.$recipeResults.html('');

        // Populate recipe template with the recipe attributes
        this.$recipeResults.append( this.recipeTemplate({recipes: this.collection.toJSON()}) );

        return this;
    },

    recipeSuccess: function(collection, response) {
        this.render();
    }, // recipeSuccess

    recipeError: function(collection, errorResponse) {
        console.log('nt.Collections.recipes.fetch ERROR: ' + errorResponse);
        console.log('EDAMAM REQUEST FAILED');
    }, // recipeError

    getRecipes: function(q) {
        // Edamam API https://developer.edamam.com/recipe-docs
        var parameters = {
            'q': q,
            'app_id': '109142f6',
            'app_key': '21467cc06c5f05e55b19271dcc457914',
            'to': '5' // return 5 results
        };

        // TODO: add preload animation

        // Clear out all the models in the collection
        this.collection.reset();

        // Make GET request to Edamam
        this.collection.fetch({
            data: $.param(parameters),
            success: this.recipeSuccess,
            error: this.recipeError
        });

        // TODO: hide preload animation

    }, // getRecipes

    openRecipes: function() {
        var food = $('#search-food').val();

        this.getRecipes(food);
        this.$searchTop.hide();
        this.$searchResults.hide();
        this.$recipeTop.show();
        this.$recipeResults.show();
    }, // openRecipes

    closeRecipes: function() {
        this.$recipeResults.html('');
        this.$recipeTop.hide();
        this.$searchTop.show();
        this.$recipeResults.hide();
        this.$searchResults.show();
    } // closeRecipes

});
