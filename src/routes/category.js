const router = require("express").Router()

const categoryController = require("../app/controllers/categoryController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")


router.post("/create", auth, authAdmin, categoryController.createCategory)

router.get("/get_all", categoryController.getAllCategory)
router.get("/get_category_by_id/:id", categoryController.getCategoryById)


router.patch("/update/:id", auth, authAdmin, categoryController.updateCategory)

router.delete("/delete/:id", auth, authAdmin, categoryController.deleteOneCategory)







module.exports = router
