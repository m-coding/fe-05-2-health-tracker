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
        'tracker/:display(/:date)': 'tracker'
    },

    /** Update url and call route function
     * @function goto
     * @memberof nt.Router */
    goto: function(url) {
        nt.Router.Instance.navigate(url, { trigger: true });
    }, // goto

    /** Display start view
     * @function start
     * @memberof nt.Router */
    start: function() {
        nt.Views.start.showStart();
    }, // start

    /** Display empty search view
     * @function startSearch
     * @memberof nt.Router */
    startSearch: function() {
        nt.Views.start.hideStart();
        nt.Views.search.$searchFood.val('');
        nt.Views.search.$searchResults.html('');

    }, // startSearch

    /** Update search box with query and run search
     * @function search
     * @memberof nt.Router */
    search: function(query) {
        nt.Views.start.hideStart();
        nt.Views.search.$searchFood.val(query);
        nt.Views.search.searchFood();

    }, // search

    /** Set tracker view options based on url parameters
     * @function tracker
     * @memberof nt.Router */
    tracker: function(optDisplay, optDate) {
        // Check if the Tracker tab is active
        var isTrackerOpen = $('#tracker').hasClass('active');

        // Activate the tracker tab
        if(!isTrackerOpen) $('#tab2').trigger('click');

        // Set options based on display setting and render the view
        if(optDisplay === 'all') {
            $('#tracker-top h5').hide();
            nt.Option.displayAll = true;
            nt.Views.tracker.renderAll();
        }
        else if (optDisplay === 'date' && optDate.length > 0) {
            // Format the date for the date picker
            var formattedDate = moment(optDate).format('MMMM D, YYYY');

            $('#tracker-top h5').show();
            nt.Option.displayAll = false;
            nt.Option.trackerDate = optDate;

            // Update the date picker's date which will trigger a re-render
            nt.Views.tracker.$dtp.data('DateTimePicker').date(formattedDate);
        }

        // Bold the current option
        nt.Views.tracker.dateDisplay();

    } // tracker

});
