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
        'click .tracked-delete': 'deleteFood'
    },

    initialize: function() {
        this.$trackerResults = $('#tracker-results');
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(this.collection, 'all', this.temp);
        this.collection.fetch();

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

    deleteFood: function(e) {
        var id = $(e.target).data('id');
        var food = this.collection.get(id);
        food.destroy();

    }, // deleteFood

    temp: function(eventName) {
        console.log('eventName: ', eventName);
    }

});
