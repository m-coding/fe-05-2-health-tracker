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
        'click #nutrition-remove': 'removeFood',
        'click #nutrition-track': 'openTrackerView'
    },

    initialize: function() {
        // Setup `this` context
        _.bindAll(this, 'itemSuccess', 'itemError');

        // Setup DOM references and variables
        this.$nutrition = $('#nutrition');
        this.$nutritionTop = $('#nutrition-top');
        this.$nutritionMenu = $('#nutrition-button-menu');
        this.$nutritionResults = $('#nutrition-results');
        this.$nLabel = $('#nlabel');
        this.trackedItem = null;
        this.gchart = null;
        this.gformat = null;

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Close the Nutrition view when another search is run
        this.listenTo(nt.Plugin.Instance, 'selected', this.closeNutrition);

        // Update the Nutrition view tracking status when a food is saved
        this.listenTo(this.model, 'foodsaved', this.showTracking);

    }, // initialize

    render: function() {
        // Display button menu
        this.displayMenu();

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
        var elem = $(e.target);
        var id   = elem.data('item');

        e.preventDefault();

        // Close if already open
        this.closeNutrition();

        // Highlight selected item
        elem.closest('.item').css('background-color', '#b8dec0').addClass('highlight');

        // Show second column
        this.showColumn();

        // Get item data from localStorage or from the API
        this.checkItem(id);

    }, // openNutrition

    checkItem: function(itemId) {
        // Check if this item is already being tracked
        this.trackedItem = nt.Collections.tracker.get(itemId);

        if(this.trackedItem) {
            // Copy the data from the tracker
            this.model.set( this.trackedItem.toJSON() );

            // Display the item
            this.itemSuccess();
        } else {
            // Get nutrition data from API using the item id
            this.getNutrition(itemId);
        }

    }, // checkItem

    closeNutrition: function() {
        // Remove highlight from selected item
        $('.highlight').removeAttr('style').removeClass('highlight');

        // Clear chart and nutrition label
        this.$nutritionResults.find('figure').html('');

        // Hide second column
        this.hideColumn();

        // Restore hidden icons
        $('.tracked-delete').show();

    }, // closeNutrition

    itemSuccess: function(model, response) {
        // Render the nutrition info
        this.render();

        // Make the Search and Nutrition columns equal heights
        $('.row').eqHeights({child:'.eqHeights'});

    }, // itemSuccess

    itemError: function(model, errorResponse) {
        var status = errorResponse.status;
        var statusText = errorResponse.statusText;
        var msg = '<div class="alert alert-danger">Nutritionix item request failed: <br>' +
                   status + ' : ' + statusText + '</div>';
        this.$nutritionMenu.html(msg);

    }, // itemError

    getNutrition: function(itemID) {
        var parameters = {
            'id': itemID,
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        // TODO: Display preload animation

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
        var fat = this.model.get('valueTotalFat');
        var carbs = this.model.get('valueTotalCarb');
        var protein = this.model.get('valueProteins');

        var data = google.visualization.arrayToDataTable([
            ['Nutrient', 'Value'],
            ['Fat', fat],
            ['Carbs', carbs],
            ['Protein', protein]
        ]);

        var options = {
            width: 280,
            height: 140,
            backgroundColor: '#b8dec0',
            sliceVisibilityThreshold: 0
        };

        var notZero = (parseFloat(fat + carbs + protein) !== 0);

        // Don't draw a chart if all the values are zero
        if(notZero) {
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
        }

    }, // displayChart

    displayNutrition: function() {
        // Reference Example #2
        // http://dev2.nutritionix.com/html/label-jquery-plugin/demo/demo.html

        // Activate Nutrition Label jQuery Plugin by Nutritionix
        this.$nLabel.nutritionLabel(this.model.toJSON());

    }, // displayNutrition

    displayMenu: function() {
        var isTracked = false;

        // Clear button menu container
        this.$nutritionMenu.html('');

        // Set tracking flag
        if(this.trackedItem) isTracked = true;

        // Add the button menu html
        this.$nutritionMenu.append(this.buttonsTemplate({
            tracking: isTracked
        }));

    }, // displayMenu

    addFood: function() {
        // Create an editor view with the nutrition data model
        var editorView = new nt.Views.Editor({model: this.model});

        // Render the editor view and append its element to the nutrition view
        this.$nutrition.append( editorView.render().el );

    }, // addFood

    removeFood: function() {
        var id = this.model.get('id');
        var food = nt.Collections.tracker.get(id);
        food.destroy();
        this.trackedItem = null;
        this.displayMenu();

    }, // removeFood

    showTracking: function() {
        this.trackedItem = true;
        this.displayMenu();

    }, // showTracking

    openTrackerView: function() {
        this.closeNutrition();
        $('#tab2').trigger('click');

    } // openTrackerView

});
