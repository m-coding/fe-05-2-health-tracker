var app = app || {};

app.AppView = Backbone.View.extend({

    el: '.container',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),

    recipeTemplate: Handlebars.compile( $('#recipe-template').html() ),

    buttonsTemplate: Handlebars.compile( $('#buttons-template').html() ),

    events: {
        'click .btn-success': 'toggleStart',
        'keyup #search-food': 'searchFood',
        'click #recipe-open': 'openRecipes',
        'click #recipe-close': 'closeRecipes',
        'click .item-nutrition': 'openNutrition',
        'click #nutrition-close': 'closeNutrition'
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
        this.$recipeTop = $('#recipe-top');
        this.$recipeResults = $('#recipe-results');
        this.$nutrition = $('#nutrition');
        this.$nutritionTop = $('#nutrition-top');
        this.$nutritionMenu = $('#nutrition-button-menu');
        this.$nutritionResults = $('#nutrition-results');
        this.gchart = null;
        this.gformat = null;

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
    },

    render: function() {

    },

    toggleStart: function() {
        this.$startScreen.hide();
        this.$app.show();
    },

    showColumn: function() {
        this.$nutrition.removeClass('hideColumn');
    }, // showColumn

    hideColumn: function() {
        this.$nutrition.addClass('hideColumn');
    }, // hideColumn

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

    }, // displayResults

    getRecipes: function(q) {
        // Edamam API
        // https://developer.edamam.com/recipe-docs
        var parameters = {
            'q': q,
            'app_id': '109142f6',
            'app_key': '21467cc06c5f05e55b19271dcc457914',
            'to': '5' // return 5 results
        };

        $.ajax({
            context: this,
            type: 'GET',
            url: 'https://api.edamam.com/search',
            dataType: 'jsonp', // cross origin workaround
            data: parameters,
        })
        .done(function(data){

            this.displayRecipes(data.hits);

        })
        .fail(function(err){

            console.log('EDAMAM REQUEST FAILED');

        });
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

    }, // closeRecipes

    openNutrition: function(e) {
        // Close if already open
        this.closeNutrition();

        var elem = $(e.target);
        var id   = elem.data('item');
        elem.closest('.item').css('background-color', '#b8dec0').addClass('highlight');

        // Show second column
        this.showColumn();

        // Display preload animation

        // Get nutrition data from item id
        this.getNutrition(id);

        return false;

    }, // openNutrition

    closeNutrition: function() {
        // Remove highlight from selected item
        $('.highlight').removeAttr('style').removeClass('highlight');

        // Clear button menu
        this.$nutritionMenu.html('');

        // Clear chart
        this.$nutritionResults.find('figure').html('');

        // Clear nutrition label
        this.$nutritionResults.find('figcaption').html('');

        // Hide second column
        this.hideColumn();

    }, // closeNutrition

    getNutrition: function(itemID) {
        var parameters = {
            'id': itemID,
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        $.ajax({
            context: this,
            type: 'GET',
            url: 'https://api.nutritionix.com/v1_1/item/',
            dataType: 'json',
            data: parameters,
        })
        .done(function(data){

            // Display pie chart
            this.displayChart(data);

            // Display nutrition label
            this.displayNutrition(data);

        })
        .fail(function(err){

            console.log('NUTRITIONIX REQUEST FAILED');

        });
    }, // getNutrition

    displayChart: function(amt) {
        var data = google.visualization.arrayToDataTable([
                ['Nutrient', 'Amount'],
                ['Fat', amt.nf_total_fat],
                ['Carbs', amt.nf_total_carbohydrate],
                ['Protein', amt.nf_protein]
            ]);

        var options = {
            width: 280,
            height: 140,
            backgroundColor: '#b8dec0'
        };

        if(!this.gformat)
            this.gformat = new google.visualization.NumberFormat({suffix: 'g'});

        // Clear chart.
        if(this.gchart) this.gchart.clearChart();

        // Instantiate chart.
        this.gchart = new google.visualization.PieChart(
                document.getElementById('gchart')
            );

        // Apply formatter to second column.
        this.gformat.format(data, 1);

        // Draw chart.
        this.gchart.draw(data, options);

    }, // displayChart

    displayNutrition: function(data) {
        // Reference Example #2
        // http://dev2.nutritionix.com/html/label-jquery-plugin/demo/demo-mini.html
        var label = {
            'width': 280,
            'itemName' : data.item_name,

            'showPolyFat' : false,
            'showMonoFat' : false,
            'showIngredients': false,

            'valueCalories' : data.nf_calories,
            'valueFatCalories' : data.nf_calories_from_fat,
            'valueTotalFat' : data.nf_total_fat,
            'valueSatFat' : data.nf_saturated_fat,
            'valueTransFat' : data.nf_trans_fatty_acid,
            'valueCholesterol' : data.nf_cholesterol,
            'valueSodium' : data.nf_sodium,
            'valueTotalCarb' : data.nf_total_carbohydrate,
            'valueFibers' : data.nf_dietary_fiber,
            'valueSugars' : data.nf_sugars,
            'valueProteins' : data.nf_protein,
            'valueVitaminA' : data.nf_vitamin_a_dv,
            'valueVitaminC' : data.nf_vitamin_c_dv,
            'valueCalcium' : data.nf_calcium_dv,
            'valueIron' : data.nf_iron_dv
        };

        var tracking = false;

        this.$nutritionMenu.append(this.buttonsTemplate({
            tracking: tracking
        }));

        // Activate Nutrition Label jQuery Plugin by Nutritionix
        this.$nutritionResults.find('figcaption').nutritionLabel(label);

    } // displayNutrition

});
