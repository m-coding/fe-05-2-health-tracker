/** Collection of foods searched
 * @namespace  nt.Collections
 * @class nt.Collections.FoodSearch
 * @memberof! <global>
 * @extends Backbone.Collection */
nt.Collections.FoodSearch = Backbone.Collection.extend(/** @lends nt.Collections.FoodSearch# */{

    /** Reference to this collection's model. */
    model: nt.Models.Food,

    /** Nutritionix API /search will return an array of matching foods */
    url: function() {
        return 'https://api.nutritionix.com/v1_1/search/' + this.searchPhrase;
    },

    /** Override fetch to pass in search phrase and parameters */
    fetch1: function(options, searchPhrase) {
        var _url = this.url;

        if(searchPhrase) {
            // credit: https://github.com/jashkenas/backbone/issues/93
            this.url = this.url + searchPhrase;
        }

        this.fetch(options);

        this.url = _url;
    },

    fetch2: function(options, searchPhrase, parameters) {
        var _url = this.url;

        if(searchPhrase && parameters) {
            // credit: https://github.com/jashkenas/backbone/issues/93
            this.url = this.url + searchPhrase + '?' + $.param(parameters);
        }

        this.fetch(options);

        this.url = _url;
    },

    /** Override parse to return only "hits" from the response */
    parse: function(response) {
        return response.hits;
    },

    error: function(model, response, options) {
        console.log(model);
        console.log(response);
        console.log(options);
    },

    /** This generates the next order number for new items.
    * @returns {number} Next order number */
    nextOrder: function() {
        if ( !this.length ) {
            return 1;
        }
            return this.last().get('sortOrder') + 1;
    },

    /**  Each food item is sorted by its original insertion order.
    * @returns {number} Sor order */
    comparator: function( food ) {
            return food.get('sortOrder');
        }
});
