/** Model for nutrition label data
 * @namespace nt.Models
 * @class nt.Models.Nutrition
 * @memberof! <global>
 * @extends Backbone.Model */
nt.Models.Nutrition = Backbone.Model.extend(/** @lends nt.Models.Nutrition# */{

    /** Default attributes */
    defaults: function() {
        return {
            width: 280,
            id: '',
            itemName: '',

            showPolyFat: false,
            showMonoFat: false,
            showIngredients: false,

            valueServingSize: 0,
            valueServingSizeUnit: '',

            valueCalories: 0,
            valueFatCalories: 0,
            valueTotalFat: 0,
            valueSatFat: 0,
            valueTransFat: 0,
            valueCholesterol: 0,
            valueSodium: 0,
            valueTotalCarb: 0,
            valueFibers: 0,
            valueSugars: 0,
            valueProteins: 0,
            valueVitaminA: 0,
            valueVitaminC: 0,
            valueCalcium: 0,
            valueIron: 0
        };
    },

    /** Nutritionix API /item will return an object with all nutrition data */
    url: 'https://api.nutritionix.com/v1_1/item/',

    /** Override parse and return response attributes */
    parse: function(data) {

        //  Only parse response if data from API
        if (data.hasOwnProperty('item_id')) {
        var label = {};
            label.width                = 280;
            label.id                   = data.item_id;
            label.itemName             = data.item_name;
            label.showPolyFat          = false;
            label.showMonoFat          = false;
            label.showIngredients      = false;
            label.valueServingSize     = data.nf_serving_size_qty;
            label.valueServingSizeUnit = data.nf_serving_size_unit;
            label.valueCalories        = data.nf_calories;
            label.valueFatCalories     = data.nf_calories_from_fat;
            label.valueTotalFat        = data.nf_total_fat;
            label.valueSatFat          = data.nf_saturated_fat;
            label.valueTransFat        = data.nf_trans_fatty_acid;
            label.valueCholesterol     = data.nf_cholesterol;
            label.valueSodium          = data.nf_sodium;
            label.valueTotalCarb       = data.nf_total_carbohydrate;
            label.valueFibers          = data.nf_dietary_fiber;
            label.valueSugars          = data.nf_sugars;
            label.valueProteins        = data.nf_protein;
            label.valueVitaminA        = data.nf_vitamin_a_dv;
            label.valueVitaminC        = data.nf_vitamin_c_dv;
            label.valueCalcium         = data.nf_calcium_dv;
            label.valueIron            = data.nf_iron_dv;

            return label;
        } else
            return data;

    }, // parse

    /** Model validation for editable attributes */
    validate: function(attrs, options) {
        // Check if property exists since it is not a default attribute
        if(attrs.hasOwnProperty('trackDate')) {
            if (attrs.trackDate === '') {
                return 'Date cannot be blank.';

            } else if (this.validateDate(attrs.trackDate)) {
                return 'Date must be in YYYY-MM-DD format.';

            }
        } // trackDate

        // Make sure the name isn't blank
        if (attrs.itemName === '') {
            return 'Food name cannot be blank.';

        } // itemName

    }, // validate

    // Credit: http://stackoverflow.com/questions/24989065/trying-to-validate-yyyy-mm-dd

    /** Validate a date in YYYY-MM-DD format
     * @param {string} - The date to test.
     * @return {boolean} - True for valid, false for invalid. */
    validateDate: function(str) {
        console.log('validateDate() str: ', str);
        // check the format first
        if(!/(\d{4})-(\d{2})-(\d{2})/.test(str)) {
            return false;
        }
        var parts = str.split(/\D/) // split on non-digits
            .map(function(val) { return parseInt(val, 10); }); // convert strings to ints
        console.log('parts[0]: ' + parts[0] + ' parts[1]: ' + parts[1] + ' parts[2]: ' + parts[2]);
        if(parts[0] < 1000 || parts[0] > 2999) { // invalid year
            return false;
        }
        if(parts[1] > 12 || parts[1] === 0) { // invalid month
            return false;
        }
        if(parts[2] > 31 || parts[2] === 0) { // invalid day
            return false;
        }
        switch(parts[1]) {
            case 4:
            case 6:
            case 9:
            case 11:
                if(parts[2] > 30) { // invalid day
                    return false;
                }
                break;
            case 2: // February...
                return (parts[2] < 29 || parts[2] == 29 && this.isLeapYear(parts[0]));
                break;
        }
        return true;
    }, // validateDate

    /** Check whether a given year is a leap year
     * @param {integer} - y The integer
     * @return {boolean} - True for yes, false for no */
    isLeapYear: function(y) {
        return (0 === y % 4 && (0 === y % 400 || 0 !== y % 100));
    } // isLeapYear

});