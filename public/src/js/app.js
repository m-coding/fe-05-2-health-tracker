var app = app || {};
var ENTER_KEY = 13;

$(function() {

    // Create the app
    new app.AppView();

    // Enable bootstrap tabs
    $('#app-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

});