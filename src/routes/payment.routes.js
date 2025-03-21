const {Router} = require("express")

const PaymentController = require("../controller/paymentController")
const paymentController = new PaymentController()
const verifyUserAuthenticated = require("../middlewares/verifyUserAuthenticated")

const paymentRouter = Router()

paymentRouter.use(verifyUserAuthenticated)

paymentRouter.post("/", paymentController.execute)

module.exports = paymentRouter