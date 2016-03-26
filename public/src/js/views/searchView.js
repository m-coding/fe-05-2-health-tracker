/** Search Results View
 * @namespace  nt.Views
 * @class nt.Views.Search
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Search = Backbone.View.extend(/** @lends nt.Views.Search# */{

    el: '#search',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),

    events: {
        'keyup #search-food': 'searchFood'
    },

    /** Setup `this` context, DOM references, and listeners */
    initialize: function() {
        var d = new Date();
        this.today = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toJSON().slice(0, 10);

        _.bindAll(this, 'searchSuccess', 'searchError');

        this.$searchTop = $('#search-top');
        this.$searchResults = $('#search-results');
        this.$searchFood = $('#search-food');
    },

    /** Render results */
    render: function() {
        var firstModel = this.collection.first().get('id');
        var lastModel = this.collection.last().get('id');

        // Clear out old results
        this.$searchResults.html('');

        this.collection.each(function(model) {
            // Set attribute for the first and last models
            if(model.id === firstModel) model.set({first:true});
            if(model.id === lastModel) model.set({last:true});

            // Set today's date
            model.set({trackDate: this.today});

            // Populate item template with the food's attributes
            this.$searchResults.append(this.itemTemplate(model.attributes));
        }, this);

        return this;
    },

    searchSuccess: function(collection, response) {
        this.render();
    }, // searchSuccess

    searchError: function(collection, errorResponse) {
        console.log('nt.Collections.results.fetch ERROR: ' + errorResponse);
        console.log('NUTRITIONIX REQUEST FAILED');
    },

    searchFood: function() {
        /**
         * nutritionix api
         */

        var query = this.$searchFood.val();

        // Nutritionix API v.1.1 Field Reference
        // https://docs.google.com/spreadsheets/d/1jZSa039OfpQOiRzaS980nPKCvVe2TRKRPZk7ZbaH7kE/edit#gid=0
        var parameters = {
            'results': '0:10', // 10 items
            'fields': 'item_name,' +
                      'nf_calories,' +
                      'nf_total_fat,' +
                      'nf_total_carbohydrate,' +
                      'nf_protein,' +
                      'nf_serving_size_qty,' +
                      'nf_serving_size_unit',
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        if (query.length > 0) {
            // Clear out all the models in the collection
            this.collection.reset();

            // Set the terms to be searched
            this.collection.searchPhrase = query;

            // Make GET request to Nutritionix
            this.collection.fetch({
                data: $.param(parameters),
                success: this.searchSuccess,
                error: this.searchError
            });
        } else
            this.$searchResults.html('');

    }, // searchFood

    /** Add food */
    addFood: function(e) {
        e.preventDefault();

        var attributes = {
            sortOrder: app.TrackedFoods.nextOrder(),
            itemId: 'itemTest0',
            name: 'nameTesting123',
            fat: 11,
            carbs: 22,
            protein: 33,
            calories: 44,
            servingSize: 1,
            servingUnit: 'cup',
            trackDate: this.today
        };

        var food = new app.Food(attributes);
        app.TrackedFoods.add(food);

    } // addFood

});
