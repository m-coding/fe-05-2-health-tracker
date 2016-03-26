/** Search Results View
 * @namespace  nt.Views
 * @class nt.Views.Search
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Search = Backbone.View.extend(/** @lends nt.Views.Search# */{

    el: '.container',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),

    events: {
        'keyup #search-food': 'searchFood'
    },

    /** Setup `this` context, DOM references, and listeners */
    initialize: function() {
        _.bindAll(this, 'searchSuccess', 'searchError');

        this.$searchTop = $('#search-top');
        this.$searchResults = $('#search-results');
        this.$searchFood = $('#search-food');

        // When the food search results collection contents have been reset, update the view
        //this.listenTo(nt.Collections.results, 'reset', this.render);

    },

    /** Render results */
    render: function() {
        // Clear out old results
        this.$searchResults.html('');

        this.$searchResults.append(this.itemTemplate(this.model.attributes));

        return this;

        // for(i; i < length; i++) {
        //     if(i === 0) first = true; else first = false;
        //     if(i === length - 1) last = true; else last = false;

        //     // Populate item template with the data and append to DOM
        //     this.$searchResults.append(this.itemTemplate({
        //         first: first,
        //         food: q,
        //         id: modelsArray[i].attributes.id,
        //         name: modelsArray[i].attributes.name,
        //         calories: modelsArray[i].attributes.calories,
        //         fat: modelsArray[i].attributes.fat,
        //         carbs: modelsArray[i].attributes.carbs,
        //         protein: modelsArray[i].attributes.protein,
        //         servingSize: modelsArray[i].attributes.servingSize,
        //         servingUnit: modelsArray[i].attributes.servingUnit,
        //         last: last
        //     }));

        // } // for
    },

    /** Add food */
    addFood: function(e) {
        e.preventDefault();

        var d = new Date();

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
            trackDate: new Date(d.getTime() - d.getTimezoneOffset() * 60000).toJSON().slice(0, 10)
        };

        var food = new app.Food(attributes);
        app.TrackedFoods.add(food);

    }, // addFood

    searchSuccess: function(collection, response) {
        console.log('nt.Collections.results.fetch SUCCESS');
        console.dir(collection);
        console.log('-----------------');
        console.dir(collection.models);
        this.displayResults(response.hits);
        //this.render();
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

    displayResults: function(results) {
        var q = this.$searchFood.val();
        var id = '';
        var name = '';
        var calories = '';
        var fat = '';
        var carbs = '';
        var protein = '';
        var servingSize = '';
        var servingUnit = '';
        var i = 0;
        var length = results.length;
        var food = '';
        var first = false;
        var last = false;

        // Clear out old results
        this.$searchResults.html('');

        for(i; i < length; i++) {
            if(i === 0) first = true; else first = false;
            food = results[i];
            id = food._id;
            name = food.fields.item_name;
            calories = food.fields.nf_calories;
            fat = food.fields.nf_total_fat;
            carbs = food.fields.nf_total_carbohydrate;
            protein = food.fields.nf_protein;
            servingSize = food.fields.nf_serving_size_qty;
            servingUnit = food.fields.nf_serving_size_unit;
            if(i === length - 1) last = true; else last = false;

            // Populate item template with the data and append to DOM
            this.$searchResults.append(this.itemTemplate({
                first: first,
                food: q,
                id: id,
                name: name,
                calories: calories,
                fat: fat,
                carbs: carbs,
                protein: protein,
                servingSize: servingSize,
                servingUnit: servingUnit,
                last: last
            }));
        } // for

    } // displayResults

});
