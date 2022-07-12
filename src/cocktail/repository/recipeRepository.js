class RecipeRepository {
    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

    batchAdd(recipes) {
        this.db.insert(recipes);
    }
}

module.exports.RecipeRepository = RecipeRepository;
