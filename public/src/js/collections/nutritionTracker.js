/** Collection of foods being tracked
 * @namespace  nt.Collections
 * @class nt.Collections.NutritionTracker
 * @memberof! <global>
 * @extends Backbone.Collection */
nt.Collections.NutritionTracker = Backbone.Collection.extend(/** @lends nt.Collections.NutritionTracker# */{

    /** Reference to this collection's model. */
    model: nt.Models.Nutrition,

    /** Save all of the food items in localStorage */
    localStorage: new Backbone.LocalStorage('nutrition-test3'),

    // This generates the next order number for new items.
    nextOrder: function() {
        console.log('NutritionTracker nextOrder()');
        if ( !this.length ) {
            return 1;
        }
            return this.last().get('sortOrder') + 1;
    },

    // Each food item is sorted by its original insertion order.
    comparator: function( food ) {
            console.log('NutritionTracker comparator()');
            return food.get('sortOrder');
    }

});
