const router = require("express").Router()

const paymentController = require("../app/controllers/paymentController")


router.post("/momo_pay", paymentController.momoPayment)


module.exports = router
