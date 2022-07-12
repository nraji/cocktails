
class RecipeView {
    render(recipe) {
        const ingredients = [];
        for (const ingredient of recipe.getIngredients().toArray()) {
            ingredients.push(ingredient.getName());

        }
        return {
            id: recipe.getId(),
            title: recipe.getTitle(),
            instruction: recipe.getInstruction(),
            ingredients
        }
    };
    batchRender(recipes) {
        const output = [];
        for (const recipe of recipes.toArray()) {
            output.push(this.render(recipe));
        }
        return JSON.stringify(output);
    };
}

module.exports.RecipeView = RecipeView;
