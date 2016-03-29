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
    },

    initialize: function() {
        console.log('init Editor View');
        var d = new Date();
        this.today = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toJSON().slice(0, 10);
        this.$inputDate = $('#foodTrackDate');
        this.createFood();
    },

    /** Render results */
    render: function() {
        console.log("Editor View render()");

        // Populate nutrition inputs
        this.$el.html(this.editorTemplate(this.food.attributes));

        return this;
    },

    /** Generate new attributes for a food item */
    newAttributes: function() {
        return {
            sortOrder: nt.Collections.tracker.nextOrder(),
            trackDate: this.$inputDate.val()
        };
    },

    createFood: function() {
        console.log("Editor View createFood()");

        // Create a new nutrition Model
        this.food = new nt.Models.Nutrition();

        // Add nutrition data
        this.food.set( this.model.toJSON() );

        // Add today's date
        this.food.set({ trackDate: this.today });

        console.log('this.food:');
        console.dir(this.food);
    },

    saveFood: function(e) {
        e.preventDefault();
        console.log("Editor View saveFood()");

        var newAttr = this.newAttributes();
        console.dir(newAttr);

        // Set additional attributes
        this.food.set( newAttr );

        // Add food to tracker Collection
        nt.Collections.tracker.add(this.food);

        // Save it to localStorage
        this.food.save();

        console.log('nt.Collections.tracker:');
        console.dir(nt.Collections.tracker);

        // Close this view
        this.close();
    },

    close: function() {
        console.log("Editor View close()");
        // Destroy this view
        this.remove();
    }

});
