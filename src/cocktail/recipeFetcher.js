const _get = require('lodash/get');
const {Ingredients} = require('./ingredients');
const {Recipe} = require('./recipe');
const {Recipes} = require('./recipes');

const RECIPE_URL = 'https://cocktails.deno.dev/cocktails';

class RecipeFetcher {
    #apiClient;
    #ingredientMapper;

    /**
     *
     * @param {ApiClient} apiClient
     * @param {IngredientMapper} ingredientMapper
     */
    constructor(apiClient, ingredientMapper) {
        this.#apiClient = apiClient;
        this.#ingredientMapper = ingredientMapper;
    }

    /**
     * @example response
     * [
     *     {
     *         "id": 1,
     *         "key": "12460",
     *         "title": "Vodka And Tonic",
     *         "instructions": "Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.",
     *         "modified": "2017-09-07T00:00:00.000Z",
     *         "ingredients":
     *         [
     *             "Vodka",
     *             "Tonic water"
     *         ]
     *     }
     * ]
     * @returns {Promise<*>}
     */
    async #fetch() {
        return await this.#apiClient.get(RECIPE_URL);
    };

    #mapRecipe(rawRecipe) {
        const ingredients = _get(rawRecipe, 'ingredients', []);
        const mappedIngredients = [];
        for (const ingredient of ingredients) {
            mappedIngredients.push(this.#ingredientMapper.map({name: ingredient}));
        }

        return new Recipe (
            _get(rawRecipe, 'id'),
            _get(rawRecipe, 'title'),
            _get(rawRecipe, 'instructions'),
            new Ingredients(mappedIngredients)
        );
    };

    async run() {
        const response = await this.#fetch();
        const mappedRecipes = [];
        for (const rawRecipe of response.data) {
            mappedRecipes.push(this.#mapRecipe(rawRecipe));
        }
        return new Recipes(mappedRecipes);
    };
}

module.exports.RecipeFetcher  = RecipeFetcher;

// {
//     "id": 1,
//     "key": "12460",
//     "title": "Vodka And Tonic",
//     "instructions": "Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.",
//     "modified": "2017-09-07T00:00:00.000Z",
//     "ingredients": [
//       "Vodka",
//       "Tonic water"
//     ]
//   }


