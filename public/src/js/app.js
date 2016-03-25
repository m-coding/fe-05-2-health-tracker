/**! Nutrition Tracker App
 * @namespace {object} nt */

// Namespace everything in an `nt` object to prevent polluting the global namespace.
var nt = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
};

// Instantiate the Router when the DOM is ready.
$(document).ready(function() {
    nt.Router.Instance = new nt.Router();
    Backbone.history.start();
});
