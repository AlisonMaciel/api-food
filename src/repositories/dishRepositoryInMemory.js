class DishRepositoryInMemory {
    dishs = []
    ingredients = []

    async create({name, category, price, description, ingredients}) {
        const dish1 = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            category,
            price,
            description
        }

        const dishIngredients = [].concat(ingredients).map(ingredient => ({
            id: Math.floor(Math.random() * 1000) + 1,
            dish_id: dish1.id,
            name: ingredient
        }))

        this.dishs.push(dish1)
        this.ingredients.push(...dishIngredients)

        return dish1, dishIngredients[0]
    }
}

module.exports = DishRepositoryInMemory