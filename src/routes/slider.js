const router = require("express").Router()

const sliderController = require("../app/controllers/sliderController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")


router.post("/create", auth, authAdmin, sliderController.createSlider)

router.get("/get_all", sliderController.getAllSlider)

router.patch("/update/:id", auth, authAdmin, sliderController.updateSlider)

router.delete("/delete/:id", auth, authAdmin, sliderController.deleteOneSlider)

module.exports = router
