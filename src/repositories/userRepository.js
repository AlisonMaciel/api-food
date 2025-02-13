const knex = require("../database/knex/index.js")

class UserRepository {
    async findByEmail({email}) {
        const user = await knex("user").where({email}).first()
        return user
    }

    async create({name, email, password}) {

        const userCreate = await knex("user").insert({
            name,
            email,
            password
        });
        
        return userCreate
    }
}

module.exports = UserRepository