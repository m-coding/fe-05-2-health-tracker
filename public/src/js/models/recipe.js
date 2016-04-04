/** Model for recipe data
 * @namespace nt.Models
 * @class nt.Models.Recipe
 * @memberof! <global>
 * @extends Backbone.Model */
nt.Models.Recipe = Backbone.Model.extend(/** @lends nt.Models.Recipe# */{

    /** Default attributes */
    defaults: {
        id: '',
        recipeImage: '',
        recipeTitle: '',
        numCalories: '',
        numIngredients: '',
        siteIcon: '',
        siteTitle: '',
        siteLink: ''
    },

    /** Override parse and return response attributes */
    parse: function(data) {
        var prefix = 'http://www.edamam.com/http/';
        var index  = data.recipe.uri.indexOf('_') + 1;
        var icon = 'images/icon.png';

        if(data.recipe.sourceIcon)
            icon = data.recipe.sourceIcon.replace('http://', prefix);

        var recipe = {};
            recipe.id             = data.recipe.uri.slice(index);
            recipe.recipeImage    = data.recipe.image;
            recipe.recipeTitle    = data.recipe.label;
            recipe.numCalories    = parseInt(data.recipe.calories / data.recipe.yield, 10);
            recipe.numIngredients = data.recipe.ingredientLines.length;
            recipe.siteIcon       = icon;
            recipe.siteTitle      = data.recipe.source;
            recipe.siteLink       = data.recipe.shareAs;
        return recipe;
    }
});