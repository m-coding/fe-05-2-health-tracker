var app = app || {};

app.AppView = Backbone.View.extend({

    el: '.container',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),

    events: {
        'click .btn-success': 'toggleStart',
        'keyup #search-food': 'searchFood'
    },

    initialize: function() {
        this.startButton = this.$('.btn-success')[0];
        this.$startScreen = this.$('#start-screen');
        this.$app = this.$('#app');
        this.$searchResults = this.$('#search-results');
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
        console.log('query: ' + query);

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

        console.log('before AJAX');

        $.ajax({
            context: this,
            type: 'GET',
            url: 'https://api.nutritionix.com/v1_1/search/' + query,
            dataType: 'json',
            data: parameters,
        })
        .done(function(data){

            this.displayResults(data.hits);

        })
        .fail(function(err){

            console.log('NUTRITIONIX REQUEST FAILED');

        });
    }, // searchFood

    displayResults: function(results) {
        console.log('inside displayResults');
        // console.dir(results);
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
        var last = false;

        // Clear out old results
        this.$searchResults.html('');

        for(i; i < length; i++) {
            food = results[i];
            name = food.fields.item_name;
            calories = food.fields.nf_calories;
            fat = food.fields.nf_total_fat;
            carbs = food.fields.nf_total_carbohydrate;
            protein = food.fields.nf_protein;
            servingSize = food.fields.nf_serving_size_qty;
            servingUnit = food.fields.nf_serving_size_unit;

            if(i === length - 1) last = true;

            this.$searchResults.append(this.itemTemplate({
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

    }

});
