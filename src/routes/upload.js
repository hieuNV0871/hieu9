const router = require("express").Router()

const uploadController = require("../app/controllers/uploadController")

const auth = require("../app/middleware/auth")
const authAdmin = require("../app/middleware/authAdmin")
const upload = require("../app/middleware/multer")

router.post("/upload_images", auth, authAdmin, upload.array('images', 5), uploadController.uploadImages)
router.post("/upload_avatar", auth, upload.single('image'), uploadController.uploadImage)




module.exports = router