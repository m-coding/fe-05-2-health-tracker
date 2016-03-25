/** Start screen
 * @namespace nt.Views
 * @class nt.Views.StartView
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.StartView = Backbone.View.extend(/** @lends nt.Views.StartView# */{

    /** element */
    el: '#start-screen',

    /** events hash */
    events: {
        'click .btn-success': 'removeStart'
    },

    /** Removes the start screen
     * @function  removeStart
     * @memberof  nt.Views.StartView */
    removeStart: function() {
        this.remove();
        $('#app').show();
    }

});
