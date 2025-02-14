const {Router} = require("express")
const multer = require("multer")
const uploadsConfig = require("../config/uploads")

const DishController = require("../controller/dishController")
const AvatarDishController = require("../controller/avatarDishController")
const verifyUserAuthenticated = require("../middlewares/verifyUserAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishController = new DishController()
const avatarDishController = new AvatarDishController()
const dishRouter = Router()

const uploads = multer(uploadsConfig.MULTER)

dishRouter.use(verifyUserAuthenticated) 

dishRouter.post("/", verifyUserAuthorization(["admin"]), dishController.create)
dishRouter.put("/:id",verifyUserAuthorization(["admin"]), dishController.update)
dishRouter.delete("/:id",verifyUserAuthorization(["admin"]), dishController.delete)
dishRouter.patch("/:avatar_dish/:id", verifyUserAuthorization(["admin"]), uploads.single("avatar_dish"), avatarDishController. avatarDish)
dishRouter.get("/:id", dishController.show)
dishRouter.get("/", dishController.index)

module.exports = dishRouter