const _get = require("lodash/get");
const axios = require('axios');
const https = require("https");

const {ApiClient} = require("../../../src/infrastructure/apiClient");
const {MySqlDatabase} = require("../../../src/infrastructure/mySqlDatabase");
const {CocktailService} = require("../../cocktail/cocktailService");
const {RecipeFetcher} = require("../../cocktail/recipeFetcher");
const {RecipeView} = require("./view/recipeView");
const {RecipeRepository} = require("../../cocktail/repository/recipeRepository");
const {IngredientMapper} = require("../../cocktail/ingredientMapper");
const {HomeFetcher} = require("../../cocktail/homeFetcher");
const {StoreFetcher} = require("../../cocktail/storeFetcher");

class ServiceFactory {
    #caching = {};
    apiClient() {
        if (_get(this.#caching, 'apiClient', null) === null) {
            this.#caching.apiClient = new ApiClient();
        }
        return this.#caching.apiClient;
    };
    mysqlDb() {
        if (_get(this.#caching, 'mysqlDb', null) === null) {
            this.#caching.mysqlDb = new MySqlDatabase(
                "localhost",
                "yourusername",
                "yourpassword"
            );
        }
        return this.#caching.mysqlDb;
    };
    recipeRepository() {
        return new RecipeRepository(this.mysqlDb());
    };
    recipeFetcher() {
        return new RecipeFetcher(this.apiClient(), this.ingredientMapper());
    };
    recipeView() {
        return new RecipeView();
    };
    ingredientMapper() {
        return new IngredientMapper();
    };
    homeFetcher() {
        return new HomeFetcher(this.apiClient(), this.ingredientMapper());
    };
    storeFetcher() {
        return new StoreFetcher(this.apiClient(), this.ingredientMapper());
    };
    cocktailService() {
        return new CocktailService(
            this.recipeFetcher(),
            this.homeFetcher(),
            this.storeFetcher(),
            this.recipeRepository()
        );
    };
}

module.exports.ServiceFactory = ServiceFactory;
