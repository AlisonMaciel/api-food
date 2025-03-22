const UserCreateService = require("../services/UserCreateService.js")
const UserRepository = require("../repositories/userRepository.js")

class UserController {
    async create(request, response) {
        const {name, email, password, role} = request.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)    
        await userCreateService.execute({name, email, password, role})

        return response.json("Usuário criado com sucesso"); 
      
    }
}

module.exports = UserController  