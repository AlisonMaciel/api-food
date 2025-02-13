const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/userRepositoryInMemory")

describe("UserCreateService",  () => {
    let userCreateService = null
    let userRepositoryInMemory = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })
    
    it("create a user", async () => {
        const user = {
            name: "teste1",
            email: "teste@",
            password:"teste123"
        }

        const userCreate = await userCreateService.execute(user)
        expect(userCreate).toHaveProperty("id")
    })
})