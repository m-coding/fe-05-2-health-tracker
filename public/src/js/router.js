/** Nutrition Tracker Router
 * @namespace nt.Router
 * @class nt.Router
 * @memberof! <global>
 * @extends Backbone.Router */

// The # tells JSDoc that the items lent to nt.Router belong to an instance of the class.
nt.Router = Backbone.Router.extend(/** @lends nt.Router# */{

    /** Routes for this app
     * @property {object} routes
     * @memberof nt.Router */
    routes:{
        'start': 'start',
        'search': 'startSearch',
        'search/:query': 'search',
        'tracker/:date': 'tracker'
    },

    /** Update url and call route function
     * @function goto
     * @memberof nt.Router */
    goto: function(url) {
        console.log('ROUTER: goto -> ' + url);
        nt.Router.Instance.navigate(url, { trigger: true });

    }, // goto

    /** Update url and display start view
     * @function start
     * @memberof nt.Router */
    start: function() {
        nt.Views.start.showStart();
    }, // start

    /** Update url and display search view
     * @function startSearch
     * @memberof nt.Router */
    startSearch: function() {
        nt.Views.start.hideStart();
        nt.Views.search.$searchFood.val('');
        nt.Views.search.$searchResults.html('');
    }, // startSearch

    /** Update url with search query and run search
     * @function search
     * @memberof nt.Router */
    search: function(query) {
        console.log('ROUTER: Food search containing the word: ' + query);
        nt.Views.start.hideStart();
        nt.Views.search.$searchFood.val(query);
        nt.Views.search.searchFood();

    }, // search

    /** Tracker screen
     * @function tracker
     * @memberof nt.Router */
    tracker: function(date) {
        console.log('ROUTER: Tracker display for date: ' + date);
    } // tracker

});
