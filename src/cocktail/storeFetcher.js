const {Ingredients} = require('./ingredients');

const URL = 'https://cocktails.deno.dev/all-ingredients';

class StoreFetcher {
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
     *   "Baileys irish cream",
     *   "Chambord raspberry liqueur",
     *   "Sugar syrup",
     *   "Sugar"
     * ]
     * @returns {Promise<*>}
     */
    async #fetch() {
        return await this.#apiClient.get(URL);
    };

    async run() {
        const response = await this.#fetch();
        const mappedIngredients = [];
        for (const rawIngredient of response.data) {
            mappedIngredients.push(this.#ingredientMapper.map(rawIngredient));
        }
        return new Ingredients(mappedIngredients);
    };
}

module.exports.StoreFetcher = StoreFetcher;
