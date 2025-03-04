const {Router} = require("express")

const userRouter = require("./user.routes.js")
const dishRouter = require("./dish.routes.js")
const sessionsRouter = require("./sessions.routes.js")
const paymentRouter = require("./payment.routes.js")

const routes = Router()

routes.use("/user", userRouter)
routes.use("/dish", dishRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/payment", paymentRouter)

module.exports = routes