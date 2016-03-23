var app = app || {};

$(function() {

    // Create the app
    new app.AppView();
    new app.RecipeView();
    new app.NutritionView();

    // Enable bootstrap tabs
    $('#app-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

});