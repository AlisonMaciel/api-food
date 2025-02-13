const {Router} = require("express")

const UserController = require("../controller/userController.js")
const userController = new UserController()

const userRouter = Router()

userRouter.post("/", userController.create)


module.exports = userRouter