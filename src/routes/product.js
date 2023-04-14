const router = require("express").Router()

const productController = require("../app/controllers/productController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")


router.post("/create", auth, authAdmin, productController.createProduct)

router.get("/get_all", productController.getAllProduct)
router.get("/get_product_by_id/:id", auth, authAdmin, productController.getProductById)
router.get("/get_product_by_slug/:slug", productController.getProductBySlug)
router.get("/get_product_by_category/:name",  productController.getAllProductsByCategoryName)
router.get("/get_product", productController.getProductPerpage)
router.get("/get_deleted", auth, authAdmin, productController.getAllProductDeleted)

router.patch("/update/:id", auth, authAdmin, productController.updateProduct)

router.delete("/delete/:id", auth, authAdmin, productController.deleteOneProduct)
router.delete("/delete_selected", auth, authAdmin, productController.deleteSelectedProduct)
router.delete("/delete_force/:id", auth, authAdmin, productController.deleteProductDeleted)

router.patch("/restore/:id", auth, authAdmin, productController.restoreProduct)
router.patch("/restore_selected", auth, authAdmin, productController.restoreSelectedProduct)
router.patch("/restore_all", auth, authAdmin, productController.restoreAllProduct)




module.exports = router
