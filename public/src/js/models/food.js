/** Model for each food item tracked
 * @namespace nt.Models
 * @class nt.Models.Food
 * @memberof! <global>
 * @extends Backbone.Model */
nt.Models.Food = Backbone.Model.extend(/** @lends nt.Models.Food# */{

    /** Default attributes */
    defaults: {
        sortOrder: 0,
        itemId: '',
        name: '',
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
        servingSize: 0,
        servingUnit: '',
        trackDate: ''
    }

});