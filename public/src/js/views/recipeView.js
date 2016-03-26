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
        var lastModel = this.collection.last().get('id');

        // Clear out old results
        this.$recipeResults.html('');

        this.collection.each(function(model) {
            // Set attribute for last model
            if(model.id === lastModel) model.set({last:true});

            // Populate recipe template with the recipe attributes
            this.$recipeResults.append(this.recipeTemplate(model.attributes));
        }, this);

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

    displayRecipes: function(results) {
        var img = '';
        var label = '';
        var calories = 0;
        var ingredients = 0;
        var sourceIcon = '';
        var source = '';
        var url = '';
        var i = 0;
        var length = results.length;
        var hit = '';
        var first = false;
        var last = false;
        var prefix = 'http://www.edamam.com/http/';

        for(i; i < length; i++) {
            if(i === 0) first = true; else first = false;
            hit = results[i];
            img = hit.recipe.image;
            label = hit.recipe.label;
            calories = parseInt(hit.recipe.calories / hit.recipe.yield, 10);
            ingredients = hit.recipe.ingredientLines.length;
            sourceIcon = hit.recipe.sourceIcon.replace('http://', prefix);
            source = hit.recipe.source;
            url = hit.recipe.shareAs;
            if(i === length - 1) last = true; else last = false;

            this.$recipeResults.append(this.recipeTemplate({
                first: first,
                recipeImage: img,
                recipeTitle: label,
                numCalories: calories,
                numIngredients: ingredients,
                siteIcon: sourceIcon,
                siteTitle: source,
                siteLink: url,
                last: last
            }));
        } // for
    }, // displayRecipes

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
