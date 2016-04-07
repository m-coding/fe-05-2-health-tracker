/** Tracker View
 * @namespace  nt.Views
 * @class nt.Views.Tracker
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Tracker = Backbone.View.extend(/** @lends nt.Views.Tracker# */{

    el: '#tracker',

    trackedTemplate: Handlebars.compile( $('#tracked-template').html() ),

    emptyMessage: '<p>No foods are being tracked.</p><p>Do a search and add something!</p>',

    events: {
        'click .tracked-delete': 'deleteFood',
        'click .tracked-edit': 'openFood'
    },

    /** Setup DOM ref, listener, and fetch collection from localStorage */
    initialize: function() {
        this.$trackerResults = $('#tracker-results');
        this.listenTo(this.collection, 'update', this.render);
        this.collection.fetch();
        this.initDatePicker();

    }, // initialize

    /** Render results */
    render: function() {
        // Clear previous list
        this.$trackerResults.html('');

        // Check if the Collection is empty
        if(!this.collection.length)
            this.$trackerResults.html( this.emptyMessage );
         else
            this.$trackerResults.append( this.trackedTemplate(this.collection) );

        return this;

    }, // render

    /** Activate the date picker plugin */
    initDatePicker: function() {
        $('#tracker-date-picker').datetimepicker({
            format: 'MMMM D, YYYY',
            defaultDate: 'now',
            allowInputToggle: true
        });

    }, // initDatePicker

    /** Delete food model using id */
    deleteFood: function(e) {
        var id = $(e.target).data('id');
        var food = this.collection.get(id);
        food.destroy();

    }, // deleteFood

    /** Open nutrition view and style row in the tracker table */
    openFood: function(e) {
        var row = $(e.target).closest('.tracked-row');

        // Open nutrition view
        nt.Views.nutrition.openNutrition(e);

        // Highlight row
        row.css('background-color', '#b8dec0').addClass('highlight');

        // Hide the tracker delete icons
        $('.tracked-delete').hide();

    } // openFood

});
