class Ingredient {
    #name;
    constructor(name) {
        this.#name = name;
    }
    getName() {
        return this.#name;
    }
}

module.exports.Ingredient = Ingredient;
