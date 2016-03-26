/** Collection of foods searched
 * @namespace  nt.Collections
 * @class nt.Collections.FoodSearch
 * @memberof! <global>
 * @extends Backbone.Collection */
nt.Collections.FoodRecipes = Backbone.Collection.extend(/** @lends nt.Collections.FoodSearch# */{

    /** Reference to this collection's model. */
    model: nt.Models.Recipe,

    /** Edamam Recipe Search API */
    url: 'https://api.edamam.com/search',

    /** Override sync to set "jsonp" option */
    sync: function(method, collection, options) {
        options.dataType = 'jsonp'; // cross origin workaround
        return Backbone.sync(method, collection, options);
    },

    /** Override parse to return only "hits" from the response */
    parse: function(response) {
        return response.hits;
    }

});
