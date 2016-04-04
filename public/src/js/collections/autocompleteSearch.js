/** Collection of autocomplete search suggestions
 * @namespace  nt.Collections
 * @class nt.Collections.AutocompleteSearch
 * @memberof! <global>
 * @extends Backbone.Collection */
nt.Collections.AutocompleteSearch = Backbone.Collection.extend(/** @lends nt.Collections.AutocompleteSearch# */{

    /** Reference to this collection's model. */
    model: nt.Models.Autocomplete,

    /** Nutritionix v2 API "as you type" suggestions */
    url: 'https://apibeta.nutritionix.com/v2/autocomplete',

    /** Parameters to pass for fetch requests */
    api: {
        q: '',
        appId: '53242d79',
        appKey: '82289438a16ec7b92cdcf5ad054159c4'
    },

    /** Displays ajax error in the autocomplete drop menu */
    apiError: function(collection, response) {
        var errMsg = response.status + ' ' + response.statusText + ' : ' + 'Autocomplete server request error';
        if(window.console) console.log(errMsg);
        $('#search-suggest .dropdown-menu')
            .show()
            .prepend('<li class="typeahead-error"><a>' + errMsg + '</a></li>');

        collection.reset();

    }, // apiError

    /** Have the collection emit a 'fetch' event */
    fetch: function() {
        this.trigger( 'fetch', this );
        return Backbone.Model.prototype.fetch.apply( this, arguments );

    } // fetch

});
