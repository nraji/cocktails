const axios = require('axios');
const {RecipeFetcher} = require('./../cocktail/../../../../cocktail/recipeFetcher');
const {Recipes} = require('./../cocktail/../../../../cocktail/recipes');
const {Ingredients} = require('./../cocktail/../../../../cocktail/ingredients');
const {IngredientMapper} = require('./../cocktail/../../../../cocktail/ingredientMapper');

jest.disableAutomock();
jest.mock('axios', () => ({
    get: jest.fn(),
    defaults: {
        baseURL: 'BASE_URL'
    }
}));

describe('running the recipe fetcher', () => {
    it('Simple run with 1 cocktail response', async () => {
        const recipesResponse = {
            data: [
                {
                    "id": 1,
                    "key": "12460",
                    "title": "Vodka And Tonic",
                    "instructions": "Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.",
                    "modified": "2017-09-07T00:00:00.000Z",
                    "ingredients":
                        [
                            "Vodka",
                            "Tonic water"
                        ]
                }
            ]
        };

        axios.get.mockImplementationOnce(() => {
            return Promise.resolve(recipesResponse);
        });
        const recipeFetcher = new RecipeFetcher(axios, new IngredientMapper());
        const result = await recipeFetcher.run();

        expect(result).toBeInstanceOf(Recipes);
        expect(result.getCount()).toEqual(1);

        for (const recipe of result.toArray()) {
            expect(recipe.getTitle()).toEqual('Vodka And Tonic');
            expect(recipe.getId()).toEqual(1);
            expect(recipe.getInstruction()).toEqual('Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.');
            const ingredients = recipe.getIngredients();
            expect(ingredients).toBeInstanceOf(Ingredients);
            expect(ingredients.getCount()).toEqual(2);
        }
    });
});
