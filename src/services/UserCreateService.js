const AppError = require("../utils/AppError.js");
const { hash } = require("bcryptjs");

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const checkEmailExist = await this.userRepository.findByEmail({
            email,
        });

        if (checkEmailExist) {
            throw new AppError("Este email já está em uso");
        }

        const hashPassword = await hash(password, 8);

        const userCreate = await this.userRepository.create({
            name,
            email,
            password: hashPassword,
        });

        return userCreate;
    }
}

module.exports = UserCreateService;
