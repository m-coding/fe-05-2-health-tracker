var app = app || {};

var FoodList = Backbone.Collection.extend({

// Reference to this collection's model.
model: app.Food,

// Save all of the food items in localStorage
localStorage: new Backbone.LocalStorage('nutrition-test1'),

// This generates the next order number for new items.
nextOrder: function() {
    if ( !this.length ) {
        return 1;
    }
        return this.last().get('sortOrder') + 1;
},

// Each food item is sorted by its original insertion order.
comparator: function( todo ) {
        return todo.get('sortOrder');
    }
});

// Create our global collection foods
app.foodList = new FoodList();
