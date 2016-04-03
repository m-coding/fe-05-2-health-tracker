/** Search Results View
 * @namespace  nt.Views
 * @class nt.Views.Search
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Search = Backbone.View.extend(/** @lends nt.Views.Search# */{

    el: '#search-top',

    prevQuery: '',

    itemTemplate: Handlebars.compile( $('#item-template').html() ),

    /** Setup `this` context, DOM references, and listeners */
    initialize: function() {
        _.bindAll(this, 'searchSuccess', 'searchError');

        this.$searchTop = $('#search-top');
        this.$searchResults = $('#search-results');
        this.$searchFood = $('#search-food');
        this.$preload = $('.typeahead-preload');
        this.$dropmenu = $('#search-suggest .dropdown-menu');

        // Run the search if the user selects an option from the autocomplete list
        this.listenTo(nt.Plugin.Instance, 'selected', this.searchFood);

        // Show/Hide preloader message
        this.listenTo(nt.Collections.suggest, 'fetch', this.showPreloader);
        this.listenTo(nt.Collections.suggest, 'sync', this.hidePreloader);
    }, // initialize

    /** Render results */
    render: function() {
        // Clear out old results
        this.$searchResults.html('');

        // Populate item template with the food's attributes
        // credit: http://stackoverflow.com/questions/21653956
        this.$searchResults.append( this.itemTemplate({ items: this.collection.toJSON() }) );

        return this;
    }, // render

    renderNoResults: function() {
        var val = this.$searchFood.val();
        var msg = '<div class="alert alert-info">Could not find any foods containing: ' + val + '</div>';
        this.$searchResults.html(msg);
    }, // renderNoResults

    showPreloader: function() {
        var msg = 'Loading...';
        var html = '<li class="typeahead-preload"><a>' + msg + '</a></li>';
        this.$preload.remove();
        this.$dropmenu.show().prepend(html);
    }, // showPreloader

    hidePreloader: function() {
        this.$preload.remove();
    }, // hidePreloader

    searchSuccess: function(collection, response) {
        if(response.total_hits === 0)
            this.renderNoResults();
        else
            this.render();
    }, // searchSuccess

    searchError: function(collection, errorResponse) {
        var status = errorResponse.status;
        var statusText = errorResponse.statusText;
        var msg = '<div class="alert alert-danger">Nutritionix search request failed with error: <br>' +
                   status + ' : ' + statusText + '</div>';
        this.$searchResults.html(msg);
    }, // searchError

    searchFood: function(e) {
        var query = this.$searchFood.val().trim();

        // Nutritionix API v.1.1 Field Reference
        // https://docs.google.com/spreadsheets/d/1jZSa039OfpQOiRzaS980nPKCvVe2TRKRPZk7ZbaH7kE/edit#gid=0
        var parameters = {
            'results': '0:10', // 10 items
            'fields': 'item_name,' +
                      'nf_calories,' +
                      'nf_total_fat,' +
                      'nf_total_carbohydrate,' +
                      'nf_protein,' +
                      'nf_serving_size_qty,' +
                      'nf_serving_size_unit',
            'appId': '53242d79',
            'appKey': '82289438a16ec7b92cdcf5ad054159c4'
        };

        if (query.length > 0 && query !== this.prevQuery) {
            // Clear out all the models in the collection
            this.collection.reset();

            // Set the terms to be searched
            this.collection.searchPhrase = query;

            // Make GET request to Nutritionix
            this.collection.fetch({
                data: $.param(parameters),
                success: this.searchSuccess,
                error: this.searchError
            });
        } else
            this.$searchResults.html('');

        this.prevQuery = query;

        // Update url
        nt.Router.Instance.goto('search/' + query);

        // Prevent form submission
        return false;

    } // searchFood

});
