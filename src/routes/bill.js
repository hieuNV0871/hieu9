const router = require("express").Router()

const billController = require("../app/controllers/billController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")

router.post("/create", billController.createBill)

router.get("/get_all", auth, authAdmin, billController.getAllBill)
router.get("/get_personal_bill", auth, billController.getPersonalBill)
router.get("/get_all_bill_deleted", auth, authAdmin, billController.getAllBillDeleted)


router.patch("/update_personal_bill/:id", auth, billController.updatePersonalBill)
router.patch("/update/:id", auth, authAdmin, billController.updateBill)

//check middleware payment neu k phai admin
// router.patch("/update_bill_status/:id", auth, , billController.updateStatusBill) 

router.delete("/delete/:id", auth, billController.deleteOneBill)
router.delete("/delete_force/:id", auth, authAdmin, billController.deleteBillDeleted)
router.delete("/delete_selected", auth, authAdmin, billController.deleteSelectedBill)

router.patch("/restore/:id", auth, authAdmin, billController.restoreBill)
router.patch("/restore_all", auth, authAdmin, billController.restoreAllBill)
router.patch("/restore_selected", auth, authAdmin, billController.restoreSelectedBill)



module.exports = router
