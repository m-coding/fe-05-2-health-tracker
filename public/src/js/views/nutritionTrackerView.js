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
        'click .tracked-edit': 'editFood',
        'click .tracked-delete': 'deleteFood'
    },

    initialize: function() {
        console.log('init TrackerView');

        this.$trackerResults = $('#tracker-results');

        //this.listenTo(this.collection, 'sync', this.render);
        this.listenTo(this.collection, 'update', this.render);
        //this.listenTo(this.collection, 'destroy', this.render);
        this.listenTo(this.collection, 'all', this.temp);

        this.collection.fetch();
    },

    /** Render results */
    render: function() {
        // Clear previous list
        this.$trackerResults.html('');

        // Check if the Collection is empty
        if(this.collection && this.collection.length)
            this.$trackerResults.append( this.trackedTemplate(this.collection) );
         else
            this.$trackerResults.html( this.emptyMessage );
        console.log("---------> nt.Views.Tracker.render()");
        // Make the Tracker and Nutrition columns equal heights
        // $('.row').eqHeights({child:'#nutrition'});

        return this;
    },

    editFood: function(e) {

    },

    deleteFood: function(e) {
        console.log("deleteFood()");
        var elem = $(e.target);
        var id   = elem.data('id');
        var food = this.collection.get(id);
        food.destroy();
    },

    temp: function(eventName) {
        console.log('eventName: ', eventName);
    }

});
