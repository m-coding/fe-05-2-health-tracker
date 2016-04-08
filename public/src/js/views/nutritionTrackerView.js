/** Tracker View
 * @namespace  nt.Views
 * @class nt.Views.Tracker
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Tracker = Backbone.View.extend(/** @lends nt.Views.Tracker# */{

    el: '#tracker',

    trackedTemplate: Handlebars.compile( $('#tracked-template').html() ),

    emptyMessage: '<p>No foods are being tracked.</p><p>Do a search and add something!</p>',

    emptyDate: '<p>There are no foods being tracked on this date.</p><p>Select another date or add a food.</p>',

    events: {
        'click #dtBack': 'dateBack',
        'click #dtForward': 'dateForward',
        'click #dtDisplay': 'dateDisplay',
        'click .options a': 'setOption',
        'click .tracked-delete': 'deleteFood',
        'click .tracked-edit': 'openFood',
    },

    /** Setup DOM ref, listener, and fetch collection from localStorage */
    initialize: function() {
        this.$trackerResults = $('#tracker-results');
        this.$dtp = $('#dtPicker');
        this.listenTo(this.collection, 'update', this.render);
        this.collection.fetch();
        this.duration = moment.duration({'days' : 1});
        this.initDatePicker();

    }, // initialize

    /** Check which render to run and update url route */
    render: function() {
        if(nt.Option.displayAll) {
            this.renderAll();
            nt.Router.Instance.navigate('tracker/all');
        } else {
            this.renderDate();
            nt.Router.Instance.navigate('tracker/date/' + nt.Option.trackerDate);
        }

    }, // render

    /** Render all */
    renderAll: function() {
        this.$trackerResults.html('');

        if(!this.collection.length)
            this.$trackerResults.html( this.emptyMessage );
        else
            this.$trackerResults.append( this.trackedTemplate( this.collection ));

        return this;

    }, // renderAll

    /** Render the tracker collection by date */
    renderDate: function() {
        // Clear previous list
        this.$trackerResults.html('');

        // Check if the Collection is empty
        if(!this.collection.length)
            this.$trackerResults.html( this.emptyMessage );
         else {
            var group = this.collection.getModelsByDate();

            // Check if there are models for the date chosen
            if(!group.length)
                this.$trackerResults.html( this.emptyDate );
            else
                this.$trackerResults.append( this.trackedTemplate( group ));
        }

        return this;

    }, // renderDate

    /** Activate the date picker plugin */
    initDatePicker: function() {
        this.$dtp.datetimepicker({
            format: 'MMMM D, YYYY',
            defaultDate: nt.Option.trackerDate,
            allowInputToggle: true
        });

        var self = this;
        $('#dtPicker').on('dp.change', function(e) {
            // Grab the current date from the date picker and set the tracker date option
            nt.Option.trackerDate = $(this).data('DateTimePicker').date().format('YYYY-MM-DD');

            // Re-render the view to display only models with the date selected
            self.render();
        });

    }, // initDatePicker

    /** Add a day to the current date */
    dateBack: function() {
        var currDate = this.$dtp.data('DateTimePicker').date();
        var backDate = currDate.subtract(this.duration);
        this.$dtp.data('DateTimePicker').date(backDate);

    }, // dateBack

    /** Subtract a day from the current date */
    dateForward: function() {
        var currDate = this.$dtp.data('DateTimePicker').date();
        var forwardDate = currDate.add(this.duration);
        this.$dtp.data('DateTimePicker').date(forwardDate);

    }, // dateForward

    /** Tracker display options */
    dateDisplay: function() {
        // Bold the current option
        if(nt.Option.displayAll) {
            $('#optAll').addClass('bold');
            $('#optDate').removeClass('bold');
        } else {
            $('#optAll').removeClass('bold');
            $('#optDate').addClass('bold');
        }

    }, // dateDisplay

    /** Set tracker display option and re-render view */
    setOption: function(e) {
        e.preventDefault();

        var id = $(e.target).attr('id');

        // Show/hide the date picker and navigation
        if(id === 'optDate') {
            $('#tracker-top h5').show();
            nt.Option.displayAll = false;
        } else {
            $('#tracker-top h5').hide();
            nt.Option.displayAll = true;

        }

        // Re-render this view
        this.render();

    }, // setOption

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
