const {Ingredients} = require('./../cocktail/../../../../cocktail/ingredients');
const {Ingredient} = require("../../../../cocktail/ingredient");

jest.disableAutomock();

describe('running the store fetcher', () => {
    it('Simple run with 1 ingredient response', async () => {
        const ingredients = new Ingredients([
            new Ingredient('NAME_1'),
            new Ingredient('NAME_2'),
        ])
        const searchIngredient = new Ingredient('NAME_2');

        expect(ingredients.contains(searchIngredient)).toEqual(true);
    });
});
