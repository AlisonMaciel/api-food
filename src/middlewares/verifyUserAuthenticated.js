const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");

function verifyUserAuthenticated(req, res, next) {
    const authHeader = req.headers;

    if (!authHeader.cookie) {
        throw new AppError("Jwt token não informado", 401);
    }

    const [, token] = authHeader.cookie.split("token=");

    try {
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

        req.user = {
            id: Number(user_id),
            role,
        };

        next();
    } catch {
        throw new AppError("Invalid JWT token");
    }
}

module.exports = verifyUserAuthenticated;
