/** Nutrition View
 * @namespace  nt.Views
 * @class nt.Views.Nutrition
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Nutrition = Backbone.View.extend(/** @lends nt.Views.Nutrition# */{

    el: '#app',

    buttonsTemplate: Handlebars.compile( $('#buttons-template').html() ),

    events: {
        'click .item-nutrition': 'openNutrition',
        'click #nutrition-close': 'closeNutrition',
        'click #nutrition-add': 'addFood',
        'click #nutrition-remove': 'RemoveFood'
    },

    initialize: function() {
        // Setup `this` context
        _.bindAll(this, 'itemSuccess', 'itemError');

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

    render: function() {
        // Display pie chart
        this.displayChart();

        // Display nutrition label
        this.displayNutrition();
    }, // render

    showColumn: function() {
        this.$nutrition.removeClass('hideColumn');
    }, // showColumn

    hideColumn: function() {
        this.$nutrition.addClass('hideColumn');
    }, // hideColumn

    openNutrition: function(e) {
        e.preventDefault();

        // Close if already open
        this.closeNutrition();

        var elem = $(e.target);
        var id   = elem.data('item');

        // Highlight selected item
        elem.closest('.item').css('background-color', '#b8dec0').addClass('highlight');

        // Show second column
        this.showColumn();

        // TODO: Display preload animation

        // Get nutrition data from item id
        this.getNutrition(id);

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

    itemSuccess: function(model, response) {
        this.render();
    }, // itemSuccess

    itemError: function(model, errorResponse) {
        console.log('nt.Models.nutrition ERROR: ' + errorResponse);
        console.log('NUTRITIONIX REQUEST FAILED');
    }, // itemError

    getNutrition: function(itemID) {
        var parameters = {
            'id': itemID,
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        // Clear the model
        this.model.clear();

        // Make GET request to Nutritionix
        this.model.fetch({
            data: $.param(parameters),
            success: this.itemSuccess,
            error: this.itemError
        });

    }, // getNutrition

    displayChart: function() {
        var data = google.visualization.arrayToDataTable([
            ['Nutrient', 'Value'],
            ['Fat', this.model.attributes.valueTotalFat],
            ['Carbs', this.model.attributes.valueTotalCarb],
            ['Protein', this.model.attributes.valueProteins]
        ]);

        var options = {
            width: 280,
            height: 140,
            backgroundColor: '#b8dec0'
        };

        // Add 'g' for grams unit to the values
        if(!this.gformat)
            this.gformat = new google.visualization.NumberFormat({suffix: 'g'});

        // Clear chart.
        if(this.gchart) this.gchart.clearChart();

        // Instantiate chart.
        this.gchart = new google.visualization.PieChart(
                document.getElementById('gchart')
            );

        // Apply formatter to second column
        this.gformat.format(data, 1);

        // Draw chart.
        this.gchart.draw(data, options);

    }, // displayChart

    displayNutrition: function() {
        // Reference Example #2
        // http://dev2.nutritionix.com/html/label-jquery-plugin/demo/demo.html

        var tracking = false;

        this.$nutritionMenu.append(this.buttonsTemplate({
            tracking: tracking
        }));

        // Activate Nutrition Label jQuery Plugin by Nutritionix
        this.$nutritionResults.find('figcaption').nutritionLabel(this.model.toJSON());

    }, // displayNutrition

    addFood: function() {
        console.log('Nutrition View addFood()');
        // Create an editor view with the nutrition data model
        var editorView = new nt.Views.Editor({model: this.model});

        // Render the editor view and append its element to the nutrition view
        this.$nutrition.append( editorView.render().el );
    },

    removeFood: function() {

    }


});
