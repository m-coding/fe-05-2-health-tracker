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

    } // parse

});