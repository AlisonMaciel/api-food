class DishCreateService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository
    }

    async execute({name, category, price, description, ingredient}) {
      const {dish_id} = await this.dishRepository.create({name, category, price, description, ingredient})

      return {dish_id}
    }

    async updateDish({name, category, price, description, ingredient, id}) {
        const dish = await this.dishRepository.updateDish({name, category, price, description, ingredient, id})

        return dish
    }
}

module.exports = DishCreateService