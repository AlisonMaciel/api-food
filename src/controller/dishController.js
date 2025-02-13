const knex = require("../database/knex/index")

const DishCreateService = require("../services/DishCreateService")
const DishRepository = require("../repositories/dishRepository")

class DishController {
    async create(req, res) {
        const {name, category, price, description, ingredient} = req.body

        const dishRepository = new DishRepository()
        const dishCreateService = new DishCreateService(dishRepository)

        await dishCreateService.execute({name, category, price, description, ingredient})

        return res.status(201).json({ message: "Prato criado com sucesso!"})
    }

    async update(req, res) {
        const {name, category, price, description, ingredient} = req.body
        const {id} = req.params

        const dishRepository = new DishRepository()
        const dishCreateService = new DishCreateService(dishRepository)

        await dishCreateService.updateDish({name, category, price, description, ingredient, id})

        return res.status(201).json("Prato atualizado")
    }

    async delete(req, res) {
        const {id} = req.params

        await knex("dish").where({id}).del()
        await knex("tags").where({dish_id: id}).del()
        
        return res.status(201).json({message: "Prato deletado"})
    }

    async show(req, res) {
        const {id} = req.params
        const dish = await knex("dish").where({id}).first()
        const tags = await knex("tags").where({dish_id: id})

        return res.json({dish, tags})
    }

    async index(req, res) {
        const { name, ingredient } = req.query;
    
        let query = knex("dish").select("dish.*")
            .leftJoin("tags", "dish.id", "tags.dish_id");
    
        if (name) {
            query = query.whereLike("dish.name", `%${name}%`);
        }
    
        if (ingredient) {
            try {
                const tags = JSON.parse(ingredient).map(tag => tag.trim());
                query = query.whereIn("tags.tag_name", tags)
            } catch (error) {
                return res.status(400).json({ error: "Formato inválido para ingredientes" })
            }
        }
    
        query = query.groupBy("dish.id")
    
        const dishes = await query
        return res.json(dishes)
    }
    
        
}

module.exports = DishController