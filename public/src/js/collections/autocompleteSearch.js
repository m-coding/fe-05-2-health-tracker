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

    /** Override parse to return only "hits" from the response */
    parse: function(response) {
        console.log("Collection AutocompleteSearch response:");
        console.dir(response);
        return response;
    }

});
