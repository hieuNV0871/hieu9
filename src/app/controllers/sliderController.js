const Slider = require('../models/Slider')


const sliderController = {
    createSlider: async (req, res) => {
        try {
            const {images, text, order} = req.body
            const newSlider = new Slider({
                images, text, order
            })
            await newSlider.save()
            res.status(200).json({success: "Thêm slide thành công", data: newSlider})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateSlider: async (req, res) => {
        try {
            const {images, text, order} = req.body
            const _id = req.params.id
            await Slider.findByIdAndUpdate(_id, {images, text, order})
            res.status(200).json({success: "Cập nhật slide thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteOneSlider: async (req, res) => {
        try {
            const _id = req.params.id
            await Slider.deleteOne({_id})
            res.status(200).json({success: "Xóa slide thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getAllSlider: async (req, res) => {
        try {
            const slider = await Slider.find()
            res.status(200).json({success: "Lấy tất cả slide thành công", data: slider})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = sliderController