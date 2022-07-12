const _has = require('lodash/has')
const {Ingredient} = require('./ingredient')

class IngredientMapper {
    map(rawIngredient) {
        if (!_has(rawIngredient, 'name')) {
            throw new Error('Missing property name in raw ingredient');
        }
        return new Ingredient(rawIngredient.name);
    };
}

module.exports.IngredientMapper  = IngredientMapper;
