/** Tracker Editor View
 * @namespace  nt.Views
 * @class nt.Views.Editor
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Editor = Backbone.View.extend(/** @lends nt.Views.Editor# */{

    tagName: 'div',

    className: 'edit-item',

    editorTemplate: Handlebars.compile( $('#editor-template').html() ),

    events: {
        'click #foodSave': 'saveFood',
        'click #foodClose': 'close'
    },

    /** Create a new food model this view will display */
    initialize: function() {
        this.createFood();
    }, // initialize

    /** Render food */
    render: function() {
        // Populate nutrition inputs
        this.$el.html(this.editorTemplate( this.food.toJSON() ));

        // Enable chaining
        return this;

    }, // render

    /** Activate the date picker plugin */
    renderDatePicker: function() {
        // Use this.$el since template html is inserted in the DOM later
        this.$el.find('#dateTimePicker').datetimepicker({
            format: 'YYYY-MM-DD',
            allowInputToggle: true,
            widgetPositioning: { horizontal: 'right' }
        });

        return this;

    }, // renderDatePicker

    /** Display validation error */
    renderError: function(message) {
        var error = '<p class="bs-callout bs-callout-danger alert-danger"><i class="glyphicon glyphicon-exclamation-sign"></i> ' + message + '</p>';
        this.$el.find('#editor-top').append(error);

    }, // renderError

    /** Remove error message */
    removeError: function() {
        this.$el.find('.bs-callout').remove();
    }, // removeError

    /** Generate new attributes for a food item */
    newAttributes: function() {
        return {
            sortOrder: nt.Collections.tracker.nextOrder(),
            trackDate:  this.$el.find('#foodTrackDate').val().trim(),
            itemName: this.$el.find('#foodName').val().trim()
        };

    }, // newAttributes

    /** Create a new model for the Tracker and copy the nutritionView's data to it */
    createFood: function() {
        // Create a new nutrition Model
        this.food = new nt.Models.Nutrition();

        // Add nutrition data
        this.food.set( this.model.toJSON() );

    }, // createFood

    /** Save the model to the collection and close the view */
    saveFood: function(e) {
        e.preventDefault();

        this.removeError();

        var newAttr = this.newAttributes();

        // Set additional attributes
        this.food.set( newAttr, {validate: true} );

        var notValid = this.food.validationError;

        if(notValid) {
            this.renderError(notValid);
        } else {
            // Add and save food to tracker Collection
            nt.Collections.tracker.create(this.food, {merge: true});

            // Tell the Nutrition View the food was saved
            this.model.trigger('foodsaved');

            // Close this view
            this.close();
        }

    }, // saveFood

    /** Destroy this view */
    close: function() {
        $('#dateTimePicker').data('DateTimePicker').destroy();
        this.remove();
    } // close

});
