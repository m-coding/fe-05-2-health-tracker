/** Tab navigation
 * @namespace  nt.Views
 * @class nt.Views.TabView
 * @memberof! <global>
 * @extends Backbone.View */
nt.Views.TabView = Backbone.View.extend(/** @lends nt.Views.TabView# */{

    /** Enable bootstrap tabs
     * @function  removeStart
     * @memberof  nt.Views.TabView */
    initialize: function() {
        $('#app-tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }

});
