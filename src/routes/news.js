const router = require("express").Router()

const newsController = require("../app/controllers/newsController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")


router.post("/create", auth, authAdmin, newsController.createNews)

router.get("/get_all",auth, authAdmin, newsController.getAllNews)
router.get("/get_all_published", newsController.getAllNewsPublished)


router.patch("/update/:id", auth, authAdmin, newsController.updateNews)

router.delete("/delete/:id", auth, authAdmin, newsController.deleteOneNews)

module.exports = router
