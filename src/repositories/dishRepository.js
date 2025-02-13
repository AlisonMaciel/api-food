const knex = require("../database/knex/index")

class DishRepository {
    async create({name, category, price, description, ingredient}) {
        const [dish_id] = await knex("dish").insert({name, category, price, description })

        const insertIngredient = ingredient.map(tag_name => {
            return {
                tag_name,
                dish_id
            }
        }) 

        await knex("tags").insert(insertIngredient)

        return {dish_id, insertIngredient}
    }

    async updateDish({name, category, price, description, ingredient, id}) {
        const dish = await knex("dish").where({id}).first()

        const updateName = name || dish.name
        const updateCategory = category || dish.category
        const updateDescription = description || dish.description
        const updatePrice = price || dish.price

        await knex("dish").where({id}).update({
            name: updateName,
            category: updateCategory,
            price: updatePrice,
            description: updateDescription
        })

        await knex("tags").where({"dish_id": id}).del()

        const dish_id = id
        
        const insertTags = ingredient.map(tag_name => {
            return {
                tag_name,
                dish_id
            }
        })

        await knex("tags").insert(insertTags)

    }
}

module.exports = DishRepository