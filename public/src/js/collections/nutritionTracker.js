/** Collection of foods being tracked
 * @namespace  nt.Collections
 * @class nt.Collections.NutritionTracker
 * @memberof! <global>
 * @extends Backbone.Collection */
nt.Collections.NutritionTracker = Backbone.Collection.extend(/** @lends nt.Collections.NutritionTracker# */{

    /** Reference to this collection's model. */
    model: nt.Models.Nutrition,

    /** Save all of the food items in localStorage. */
    localStorage: new Backbone.LocalStorage('nutrition-tracker'),

    /** Set default tracker date for today */
    initialize: function() {
        nt.Option.trackerDate = moment(new Date()).format('YYYY-MM-DD');
        nt.Option.displayAll = false;

    }, // initialize

    /** This generates the next order number for new items. */
    nextOrder: function() {
        if ( !this.length ) {
            return 1;
        }
            return this.last().get('sortOrder') + 1;

    }, // nextOrder

    /** Each food item is sorted by its original insertion order. */
    comparator: function( food ) {
            return food.get('sortOrder');
    }, // comparator

    /** Returns a group of models with the same date */
    getModelsByDate: function() {
        // Filter the models by date
        var groupArray = this.where({ trackDate: nt.Option.trackerDate });

        // Convert the array back into a Collection
        var groupCollection = new Backbone.Collection(groupArray);

        return groupCollection;

    }, // getModelsByDate

    /** Returns the sum value of the attribute passed */
    calculateSum: function(attribute) {
        var group = this;
        var sum = 0;

        if(!this.length) return;

        if(!nt.Option.displayAll)
            group = this.getModelsByDate();

        // credit: http://underscorejs.org/#reduce
        sum = group.reduce(function(memo, value) {
          return memo + value.get(attribute);
         }, 0);

        // If it's a whole number, don't show decimal
        if(Number.isInteger(sum))
            return sum;
        else
            return sum.toFixed(2);

    } // calculateSum

});
