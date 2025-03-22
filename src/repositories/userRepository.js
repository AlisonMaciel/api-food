const knex = require("../database/knex/index.js")

class UserRepository {
    async findByEmail({email}) {
        const user = await knex("user").where({email}).first()
        return user
    }

    async create({name, email, password, role}) {

        const userCreate = await knex("user").insert({
            name,
            email,
            password, 
            role
        });
        
        return userCreate
    }
}

module.exports = UserRepository