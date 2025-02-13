const DishCreateService = require("./DishCreateService")
const DishRepositoryInMemory = require("../repositories/dishRepositoryInMemory")

describe("DishCreateService",  () => {
    let dishRepositoryInMemory = null
    let dishCreateService = null

    beforeEach(() => {
        dishRepositoryInMemory = new DishRepositoryInMemory()
        dishCreateService = new DishCreateService(dishRepositoryInMemory)
    })
    
    it("create a dish", async () => {

        const dish = {
            name: "suco",
            category: "bebida",
            price:"9,90",
            description: "suco de laranja natural",
            ingredients: "laranja, suco, água"
        }

        const dishCreate = await dishCreateService.execute({dish})

        expect(dishCreate).toHaveProperty("id")
    })
})