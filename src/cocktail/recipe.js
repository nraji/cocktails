class Recipe {
    constructor(id, title, instruction, ingredients) {
        this.id = id;
        this.title = title;
        this.instruction = instruction;
        this.ingredients = ingredients;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getInstruction() {
        return this.instruction;
    }
    getIngredients() {
        return this.ingredients;
    }
}

module.exports.Recipe = Recipe;
