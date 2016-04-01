/** Autocomplete Search View
 * @namespace  nt.Views
 * @class nt.Views.Autocomplete
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Autocomplete = Backbone.View.extend(/** @lends nt.Views.Autocomplete# */{

    el: '#search-top',

    // events: {
    //     'keyup #search-food': 'getSuggestions'
    // },

    initialize: function() {
        console.log("Autocomplete View initialize()");

    },

    autoSuccess: function(collection, response) {
        console.log("autoSuccess()");

    },

    autoError: function(collection, errorResponse) {
        console.log(errorResponse);
        console.log('NUTRITIONIX REQUEST FAILED');
    },

    getSuggestions: function() {
        var q = $('#search-food').val().trim();
        var parameters = {
            'q': q,
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        console.log("getSuggestions() q: " + q);

        // Clear out all the models in the collection
        nt.Collections.suggest.reset();

        if (q.length > 0) {
            this.collection.fetch({
                data: $.param(parameters),
                success: this.autoSuccess,
                error: this.autoError
            });
        }
    }

});
