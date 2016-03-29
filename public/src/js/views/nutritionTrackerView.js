/** Tracker View
 * @namespace  nt.Views
 * @class nt.Views.Tracker
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Tracker = Backbone.View.extend(/** @lends nt.Views.Tracker# */{

    el: '#tracker',

    trackedTemplate: Handlebars.compile( $('#tracked-template').html() ),

    emptyMessage: '<p>No foods are being tracked.</p><p>Do a search and add something!</p>',

    initialize: function() {
        console.log('init TrackerView');

        this.$trackerResults = $('#tracker-results');

        this.listenTo(this.collection, 'sync', this.render);

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

        return this;
    }

});
