const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await knex("user").where({ email }).first();

        if (!user) {
            throw new AppError("Email/senha inválidos");
        }

        const checkPassword = await compare(password, user.password);

        if (!checkPassword) {
            throw new AppError("Email/senha inválidos");
        }

        const { secret, expiresIn } = jwt;

        const token = sign({ role: user.role }, secret, {
            subject: String(user.id),
            expiresIn,
        });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 15 * 60 * 1000,
        });

        delete user.password;

        return res.json({ user });
    }
}

module.exports = SessionsController;
