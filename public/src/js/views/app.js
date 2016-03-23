var app = app || {};

app.AppView = Backbone.View.extend({

    el: '.container',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),


    events: {
        'click .btn-success': 'toggleStart',
        'keyup #search-food': 'searchFood'
    },

    initialize: function() {
        // Setup DOM references.
        this.startButton = this.$('.btn-success')[0];
        this.query = $('#search-food').val();
        this.$startScreen = this.$('#start-screen');
        this.$app = $('#app');
        this.$searchTop = $('#search-top');
        this.$searchResults = $('#search-results');
        this.$searchFood = $('#search-food');
    },

    render: function() {

    },

    toggleStart: function() {
        this.$startScreen.hide();
        this.$app.show();
    },

    searchFood: function() {
        /**
         * nutritionix api
         */

        var query = this.$searchFood.val();

        // Nutritionix API v.1.1 Fields:
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
            $.ajax({
                context: this,
                type: 'GET',
                url: 'https://api.nutritionix.com/v1_1/search/' + query,
                dataType: 'json',
                data: parameters,
            })
            .done(function(data){

                this.displayResults(query, data.hits);

            })
            .fail(function(err){

                console.log('NUTRITIONIX REQUEST FAILED');

            });
        } else { // query.length > 0
            this.$searchResults.html('');
        }
    }, // searchFood

    displayResults: function(q, results) {
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
