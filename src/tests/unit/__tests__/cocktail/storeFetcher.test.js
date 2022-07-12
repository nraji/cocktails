const axios = require('axios');
const {Ingredients} = require('./../cocktail/../../../../cocktail/ingredients');
const {IngredientMapper} = require('./../cocktail/../../../../cocktail/ingredientMapper');
const {StoreFetcher} = require("../../../../cocktail/storeFetcher");
const {Ingredient} = require("../../../../cocktail/ingredient");

jest.disableAutomock();
jest.mock('axios', () => ({
    get: jest.fn(),
    defaults: {
        baseURL: 'BASE_URL'
    }
}));

describe('running the store fetcher', () => {
    it('Simple run with 1 ingredient response', async () => {
        const ingredientsResponse = {
            data: [
                {
                    id: 'ID_1',
                    name: 'INGREDIENT_1'
                },
                {
                    id: 'ID_2',
                    name: 'INGREDIENT_2'
                }
            ]
        };

        axios.get.mockImplementationOnce(() => {
            return Promise.resolve(ingredientsResponse);
        });
        const storeFetcher = new StoreFetcher(axios, new IngredientMapper());
        const result = await storeFetcher.run();

        expect(result).toBeInstanceOf(Ingredients);
        expect(result.getCount()).toEqual(2);

        for (const ingredient of result.toArray()) {
            expect(ingredient).toBeInstanceOf(Ingredient);
        }
    });
});
