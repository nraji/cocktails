class Ingredients {
    #ingredients = {};
    constructor(ingredients) {
        for (const ingredient of ingredients) {
            this.add(ingredient);
        }
    }
    add(ingredient) {
        this.#ingredients[ingredient.getName()] = ingredient;
    }
    remove(ingredient) {
        delete this.#ingredients[ingredient.getName()];
    }
    contains(searchIngredient) {
        for (const ingredient of this.toArray()) {
            if (ingredient.getName() === searchIngredient.getName()) {
                return true;
            }
        }
        return false;
    }
    getCount() {
        return this.#ingredients.length;
    }
    toArray() {
        return Object.values(this.#ingredients);
    }
}

module.exports.Ingredients = Ingredients;
