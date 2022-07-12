const _get = require('lodash/get');

const {ServiceFactory} = require('./../ServiceFactory');

class CocktailController {
    #serviceFactory;

    /**
     * @param {ServiceFactory} [serviceFactory]
     */
    constructor(serviceFactory) {
        this.#serviceFactory = serviceFactory;
    }
    async getAvailable(ctx, next) {
        const numOfStoreIngredients = _get(ctx.params, 'numOfStoreIngredients', 0);
        const filteredRecipes = await this.#serviceFactory.cocktailService().run(numOfStoreIngredients);
        ctx.body = this.#serviceFactory.recipeView().batchRender(filteredRecipes);
        await next();
    }
}

module.exports.CocktailController = CocktailController;
