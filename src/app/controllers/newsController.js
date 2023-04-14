const News = require('../models/News')

const newsController = {
    createNews: async (req, res) => {
        try {
            const {title, author, content, publishedAt} = req.body
            const news = await News.findOne({title})
            if(news) return res.status(400).json({error: "Bài viết đã tồn tại"})
            const newNews = new News({
                title, author, content, publishedAt
            })
            await newNews.save()
            res.status(200).json({success: "Tạo bài viết thành công", data: newNews})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    updateNews: async (req, res) => {
        try {
            const {title, author, content, publishedAt} = req.body
            const _id = req.params.id
            await News.findByIdAndUpdate(_id, {title, author, content, publishedAt})
            res.status(200).json({success: "Cập nhật bài viết thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    deleteOneNews: async (req, res) => {
        try {
            const _id = req.params.id
            await News.deleteOne({_id})
            res.status(200).json({success: "Xóa bài viết thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getAllNews: async (req, res) => {
        try {
            const news = await News.find()
            res.status(200).json({success: "Lấy tất cả bài viết thành công", data: news})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getAllNewsPublished: async (req, res) => {
        try {
            const currentTime = new Date();
            const news = await News.find({ publishedAt: { $lte: currentTime } });
            res.status(200).json({success: "Lấy tất cả bài biết đã xuất bản thành công", data: news})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
}

module.exports = newsController