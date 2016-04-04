/** Start screen
 * @namespace nt.Views
 * @class nt.Views.Start
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.Start = Backbone.View.extend(/** @lends nt.Views.Start# */{

    /** element */
    el: '#start-screen',

    /** events hash */
    events: {
        'click .btn-success': 'removeStart'
    },

    /** Removes the start screen
     * @function  removeStart
     * @memberof  nt.Views.Start */
    removeStart: function() {
        this.remove();
        nt.Router.Instance.navigate('search');
        $('#app').show();

    } // removeStart

});
