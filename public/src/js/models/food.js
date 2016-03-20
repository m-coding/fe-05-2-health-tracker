var app = app || {};

// Model for each food item tracked
app.Food = Backbone.Model.extend({

    // Default attributes
    defaults: {
        sortOrder: 0,
        name: '',
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
        servingSize: 0,
        servingUnit: '',
        trackDate: '',
        source: ''
    }

});