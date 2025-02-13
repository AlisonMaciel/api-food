class UserRepositoryInMemory {
    users = []

    async create({name, email, password}) {
        const user1 = {
            id: Math.floor(Math.random() * 1000) +1,
            name,
            email,
            password
        }

        this.users.push(user1)

        return user1
    }

    async findByEmail({email}) {
        return this.users.find(user => user.email === email)
    }
}

module.exports = UserRepositoryInMemory