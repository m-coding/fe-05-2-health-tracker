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

    /** Setup input refs and create a new food model with today's date */
    initialize: function() {
        this.$inputDate = $('#foodTrackDate');
        this.createFood();

    }, // initialize

    /** Render results */
    render: function() {
        // Populate nutrition inputs
        this.$el.html(this.editorTemplate( this.food.toJSON() ));

        // Enable chaining
        return this;

    }, // render

    /** Activate the date picker plugin */
    renderDatePicker: function() {
        this.$el.find('#dateTimePicker').datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: 'now',
            widgetPositioning: { horizontal: 'right' }
        });

        return this;

    }, // renderDatePicker

    /** Generate new attributes for a food item */
    newAttributes: function() {
        return {
            sortOrder: nt.Collections.tracker.nextOrder(),
            trackDate: this.$inputDate.val()
        };

    }, // newAttributes

    /** Create a new nutrition model and set the date */
    createFood: function() {
        // Create a new nutrition Model
        this.food = new nt.Models.Nutrition();

        // Add nutrition data
        this.food.set( this.model.toJSON() );

        // Add today's date
        this.food.set({ trackDate: this.$inputDate.val() });

    }, // createFood

    /** Save the model to the collection and close the view */
    saveFood: function(e) {
        e.preventDefault();

        var newAttr = this.newAttributes();

        // Set additional attributes
        this.food.set( newAttr );

        // Add food to tracker Collection
        nt.Collections.tracker.add(this.food);

        // Save it to localStorage
        this.food.save();

        // Tell the Nutrition View the food was saved
        this.model.trigger('foodsaved');

        // Close this view
        this.close();

    }, // saveFood

    /** Destroy this view */
    close: function() {
        $('#dateTimePicker').data('DateTimePicker').destroy();
        this.remove();
    } // close

});
