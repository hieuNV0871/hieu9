
const Category = require('../models/Category')

const categoryController = {
    createCategory: async (req, res) => {
        try {
            const {name, order} = req.body
            const category = await Category.findOne({
                $or: [{ name }, { order}]
              });
              if (category) {
                
                    if (category.name === name) {
                      return res.status(400).json({ error: "Danh mục đã tồn tại" });
                    } else{
                      return res.status(400).json({ error: "Thứ tự đã tồn tại" });
                    }
                
              }
            const newCategory = new Category({
                name, order
            })
            await newCategory.save()
            res.status(200).json({success: "Thêm danh mục thành công", data: newCategory})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateCategory: async (req, res) => {
        try {
            const {name, order} = req.body
            const _id = req.params.id
            await Category.findByIdAndUpdate(_id, {name, order})
            res.status(200).json({success: "Cập nhật danh mục thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteOneCategory: async (req, res) => {
        try {
            const _id = req.params.id
            console.log(_id);
            await Category.deleteOne({_id})
            res.status(200).json({success: "Xóa danh mục thành công"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
    getCategoryById: async(req, res)=> {
        try {
            const id = req.params.id
            const category = await Category.findById(id)
            res.status(200).json({success: "Lấy sản phẩm thành công", data: category})
        } catch (error) {
            res.status(500).json({error: error.message})
            
        }
    },

    getAllCategory: async (req, res) => {
        try {
            const limit = req.query.limit || null; 
            const page = req.query.page || 1; 
            const skip = (page - 1) * limit; 
            const search = req.query.search || null
            let categories
            if(search){
                categories = await Category.find({
                   $expr: {
                     $regexMatch: {
                       input: { $getField: 'name' },
                       regex: new RegExp(search, 'i')
                     }
                   }
                 }).limit(limit); }
                else{
                    categories = await Category.find().skip(skip).limit(limit);

                }
            res.status(200).json({success: "Lấy tất cả danh mục thành công", data: categories})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = categoryController