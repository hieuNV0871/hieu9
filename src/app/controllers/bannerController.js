const Banner = require('../models/Banner')


const bannerController = {
    createBanner: async (req, res) => {
        try {
            const {images, order} = req.body
            const newBanner = new Banner({
                images, order
            })
            await newBanner.save()
            res.status(200).json({success: "Thêm banner thành công", data: newBanner})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateBanner: async (req, res) => {
        try {
            const {images, order} = req.body
            const _id = req.params.id
            await Banner.findByIdAndUpdate(_id, {images, order})
            res.status(200).json({success: "Cập nhật banner thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteOneBanner: async (req, res) => {
        try {
            const _id = req.params.id
            await Banner.deleteOne({_id})
            res.status(200).json({success: "Xóa banner thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getAllBanner: async (req, res) => {
        try {
            const banner = await Banner.find()
            res.status(200).json({success: "Lấy tất cả banner thành công", data: banner})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = bannerController