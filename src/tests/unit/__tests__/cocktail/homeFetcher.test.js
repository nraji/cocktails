const axios = require('axios');
const {Ingredients} = require('./../cocktail/../../../../cocktail/ingredients');
const {IngredientMapper} = require('./../cocktail/../../../../cocktail/ingredientMapper');
const {HomeFetcher} = require("../../../../cocktail/homeFetcher");
const {Ingredient} = require("../../../../cocktail/ingredient");

jest.disableAutomock();
jest.mock('axios', () => ({
    get: jest.fn(),
    defaults: {
        baseURL: 'BASE_URL'
    }
}));

describe('running the home fetcher', () => {
    it('Simple run with 1 ingredient response', async () => {
        const ingredientsResponse = {
            data: [
                "Vodka",
                "Tonic water"
            ]
        };

        axios.get.mockImplementationOnce(() => {
            return Promise.resolve(ingredientsResponse);
        });
        const homeFetcher = new HomeFetcher(axios, new IngredientMapper());
        const result = await homeFetcher.run();

        expect(result).toBeInstanceOf(Ingredients);
        expect(result.getCount()).toEqual(2);

        for (const ingredient of result.toArray()) {
            expect(ingredient).toBeInstanceOf(Ingredient);
        }
    });
});
