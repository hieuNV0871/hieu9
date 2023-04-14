const router = require("express").Router()

const bannerController = require("../app/controllers/bannerController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")


router.post("/create", auth, authAdmin, bannerController.createBanner)

router.get("/get_all", bannerController.getAllBanner)

router.patch("/update/:id", auth, authAdmin, bannerController.updateBanner)

router.delete("/delete/:id", auth, authAdmin, bannerController.deleteOneBanner)

module.exports = router
