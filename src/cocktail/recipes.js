class Recipes {
    #recipes = {};
    constructor(recipes) {
        this.batchAdd(recipes);
    }
    add(recipe) {
        this.#recipes[recipe.getId()] = recipe;
    }
    batchAdd(recipes) {
        for (const recipe of recipes) {
            this.add(recipe)
        }
    }
    filterByIngredients(ingredients) {
        const filteredRecipes = [];
        const ingredientsArray = ingredients.toArray();
        for (const recipe of this.toArray()) {
            let containsAllIngredients = true;
            for (const ingredient of ingredientsArray) {
                if (recipe.getIngredients().contains(ingredient) === false) {
                    containsAllIngredients = false;
                    break;
                }
            }
            if (containsAllIngredients === true) {
                filteredRecipes.push(recipe);
            }
        }
        return new Recipes(filteredRecipes);
    }
    getCount() {
        return this.#recipes.length;
    }
    toArray() {
        return Object.values(this.#recipes);
    }
}

module.exports.Recipes = Recipes;
