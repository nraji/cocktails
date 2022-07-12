const {Ingredients} = require('./ingredients');
const {HomeFetcher} = require('./homeFetcher');
const {RecipeFetcher} = require('./recipeFetcher');
const {StoreFetcher} = require('./storeFetcher');
const {Recipes} = require('./recipes');
const {RecipeRepository} = require('./repository/recipeRepository');

class CocktailService {
    #homeFetcher;
    #recipeFetcher;
    #storeFetcher;
    #recipeRepository;

    /**
     *
     * @param {RecipeFetcher} recipeFetcher
     * @param {HomeFetcher} homeFetcher
     * @param {StoreFetcher} storeFetcher
     * @param {RecipeRepository} recipeRepository
     */
    constructor(recipeFetcher, homeFetcher, storeFetcher, recipeRepository) {
        this.#homeFetcher = homeFetcher;
        this.#recipeFetcher = recipeFetcher;
        this.#storeFetcher = storeFetcher;
        this.#recipeRepository = recipeRepository;
    }

    async run(numOfStoreIngredients) {
        const homeIngredients = await this.#homeFetcher.run();
        const recipes = await this.#recipeFetcher.run();
        // await this.#recipeRepository.batchAdd(recipes);
        const filteredRecipes = await recipes.filterByIngredients(homeIngredients);
        if (numOfStoreIngredients > 0) {
            const optionalStoreIngredients = await this.#storeFetcher.run();
            for (const optionalStoreIngredient of optionalStoreIngredients.toArray()) {
                homeIngredients.add(optionalStoreIngredient);
                filteredRecipes.batchAdd(recipes.filterByIngredients(homeIngredients));
                homeIngredients.remove(optionalStoreIngredient);
            }
        }
        return filteredRecipes;
    };
}

module.exports.CocktailService  = CocktailService;
