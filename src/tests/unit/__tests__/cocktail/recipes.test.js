const {Ingredients} = require('./../cocktail/../../../../cocktail/ingredients');
const {Ingredient} = require("../../../../cocktail/ingredient");
const {Recipes} = require('./../cocktail/../../../../cocktail/recipes');
const {Recipe} = require("../../../../cocktail/recipe");

jest.disableAutomock();

describe('running the store fetcher', () => {
    it('Simple run with 1 ingredient response', async () => {

        // {
        //     "id": 10,
        //     "key": "13936",
        //     "title": "Miami Vice",
        //     "instructions": "First: Mix pina colada with 2.5 oz. of rum with ice(set aside). Second: Mix daiquiri with 2.5 oz. of rum with ice. Third: While frozen, add pina colda mix then daiquiri mix in glass (Making sure they do not get mixed together).",
        //     "modified": "2015-09-02T00:00:00.000Z",
        //     "ingredients": [
        //       "151 proof rum",
        //       "Pina colada mix",
        //       "Daiquiri mix"
        //     ]
        //   }
        const recipe = new Recipe(
            '10',
            'Miami Vice',
            'First: Mix pina colada with 2.5 oz. of rum with ice(set aside). Second: Mix daiquiri with 2.5 oz. of rum with ice. Third: While frozen, add pina colda mix then daiquiri mix in glass (Making sure they do not get mixed together).',
            new Ingredients([
                new Ingredient('151 proof rum'),
                new Ingredient('Pina colada mix'),
                new Ingredient('Daiquiri mix'),
            ])
        )
        const recipes = new Recipes([recipe]);

        const searchIngredients = new Ingredients([
            new Ingredient('151 proof rum'),
            new Ingredient('Pina colada mix'),
            new Ingredient('Daiquiri mix'),
        ]);

        expect(recipes.filterByIngredients(searchIngredients)).toEqual(recipes);
    });
});
