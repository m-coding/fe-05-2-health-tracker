var app = app || {};

app.NutritionView = Backbone.View.extend({

    el: '.container',

    buttonsTemplate: Handlebars.compile( $('#buttons-template').html() ),

    events: {
        'click .item-nutrition': 'openNutrition',
        'click #nutrition-close': 'closeNutrition'
    },

    initialize: function() {
        // Setup DOM references.
        this.$nutrition = $('#nutrition');
        this.$nutritionTop = $('#nutrition-top');
        this.$nutritionMenu = $('#nutrition-button-menu');
        this.$nutritionResults = $('#nutrition-results');
        this.gchart = null;
        this.gformat = null;

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
    },

    showColumn: function() {
        this.$nutrition.removeClass('hideColumn');
    }, // showColumn

    hideColumn: function() {
        this.$nutrition.addClass('hideColumn');
    }, // hideColumn

    openNutrition: function(e) {
        // Close if already open
        this.closeNutrition();

        var elem = $(e.target);
        var id   = elem.data('item');

        // Highlight selected item
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
