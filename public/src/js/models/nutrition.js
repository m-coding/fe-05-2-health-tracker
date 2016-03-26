/** Model for nutrition label data
 * @namespace nt.Models
 * @class nt.Models.Nutrition
 * @memberof! <global>
 * @extends Backbone.Model */
nt.Models.Nutrition = Backbone.Model.extend(/** @lends nt.Models.Nutrition# */{

    /** Default attributes */
    defaults: {
        width: 280,
        itemName : '',

        showPolyFat: false,
        showMonoFat: false,
        showIngredients: false,

        valueCalories: '',
        valueFatCalories: '',
        valueTotalFat: '',
        valueSatFat: '',
        valueTransFat: '',
        valueCholesterol: '',
        valueSodium: '',
        valueTotalCarb: '',
        valueFibers: '',
        valueSugars: '',
        valueProteins: '',
        valueVitaminA: '',
        valueVitaminC: '',
        valueCalcium: '',
        valueIron: ''
    },

    /** Nutritionix API /item will return an object with all nutrition data */
    url: 'https://api.nutritionix.com/v1_1/item/',

    /** Override parse and return response attributes */
    parse: function(data) {
        var label = {};
            label.itemName         = data.item_name;
            label.valueCalories    = data.nf_calories;
            label.valueFatCalories = data.nf_calories_from_fat;
            label.valueTotalFat    = data.nf_total_fat;
            label.valueSatFat      = data.nf_saturated_fat;
            label.valueTransFat    = data.nf_trans_fatty_acid;
            label.valueCholesterol = data.nf_cholesterol;
            label.valueSodium      = data.nf_sodium;
            label.valueTotalCarb   = data.nf_total_carbohydrate;
            label.valueFibers      = data.nf_dietary_fiber;
            label.valueSugars      = data.nf_sugars;
            label.valueProteins    = data.nf_protein;
            label.valueVitaminA    = data.nf_vitamin_a_dv;
            label.valueVitaminC    = data.nf_vitamin_c_dv;
            label.valueCalcium     = data.nf_calcium_dv;
            label.valueIron        = data.nf_iron_dv;
        return label;
    }

});