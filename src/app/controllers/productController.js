const Product = require("../models/Product")
const Category = require("../models/Category")

const productController = {
    createProduct: async(req, res)=>{
        try {
            const {name, description, category, price, originPrice, sizes, colors, productCount, images} = req.body
            const product = await Product.findOne({name})
            if(product) return res.status(400).json({error: "Sản phẩm đã tồn tại"})
            
            const newProduct = new Product({
                name,
                description,
                category,
                price,
                originPrice,
                sizes,
                colors,
                productCount,
                images,
            })
            
            await newProduct.save()
            res.status(200).json({success: "Thêm sản phẩm thành công", data: newProduct})
            
        } catch (error) {
            res.status(500).json({error: error.message})

        }
    },
    updateProduct: async (req, res)=>{
        try {
            const {name, description, category, price,originPrice, sizes, colors, productCount, images} = req.body
            const id = req.params.id
            const updateProduct = await Product.findOneAndUpdate({_id: id}, {
                name, description, category, price,originPrice, sizes, colors, productCount, images
            })
            res.status(200).json({success: "Cập nhật sản phẩm thành công", data: updateProduct})
            
        } catch (error) {
            res.status(500).json({error: error.message})

        }
    },



    restoreProduct: async (req, res)=> {
        try {
            const _id = req.params.id
            const product = await Product.restore({_id})
            return res.status(200).json({ success: 'Khôi phục thành công'})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    restoreSelectedProduct: async (req, res)=> {
        try {
            const _ids = req.body
            await Product.restore({ _id: { $in: _ids } });
            return res.status(200).json({ success: 'Khôi phục thành công'})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    restoreAllProduct: async (req, res)=> {
        try {
            
            const deletedProducts = await Product.findDeleted({deleted: true})
            for (const product of deletedProducts) {
              product.deleted = false;
              await product.save();
            }
            return res.status(200).json({ success: 'Khôi phục thành công'})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    deleteOneProduct: async (req, res)=>{
        try {
			const id = req.params.id
			await Product.deleteById(id)
			return res.status(200).json({ success: 'Xóa thành công'})
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
    },

    deleteSelectedProduct: async (req, res)=>{
        try {
			const _ids = req.body
			await Product.delete({ _id: { $in: _ids } }, { deleted: true });
			return res.status(200).json({ success: 'Xóa thành công'})
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
    },


    deleteProductDeleted: async (req, res) => {
		try {
			const _id = req.params.id
			const deletedProduct = await Product.findOneDeleted({ _id })
			const product = await Product.deleteOne({ _id })
			return res.status(200).json({success: 'Đã xóa vĩnh viền sản phẩm thành công'})
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	},

    getAllProduct: async (req, res)=>{
        try {
            const products = await Product.find()
            res.status(200).json({success: "Lấy tất cả sản phẩm thành công", data: products})
        } catch (error) {
            res.status(500).json({error: error.message})
            
        }
    },
    getProductById: async(req, res)=> {
        try {
            const id = req.params.id
            const product = await Product.findById(id)
            res.status(200).json({success: "Lấy sản phẩm thành công", data: product})
        } catch (error) {
            res.status(500).json({error: error.message})
            
        }
    },
    getProductBySlug: async(req, res)=> {
        try {
            const slug = req.params.slug
            const product = await Product.findOne({slug})
            res.status(200).json({success: "Lấy sản phẩm thành công", data: product})
        } catch (error) {
            res.status(500).json({error: error.message})
            
        }
    },
    getAllProductsByCategoryName: async(req, res)=> {
        try {
          const name = req.params.name;
          const category = await Category.findOne({ name });
      
          if (!category) {
            return res.status(404).json({ error: "Không tìm thấy danh mục" });
          }
      
          const products = await Product.find({ category: category.name });
          res.status(200).json({ success: "Lấy sản phẩm thành công", data: products });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

    getProductPerpage: async (req, res)=>{
        try {
            const limit = req.query.limit || null; 
            const page = req.query.page || 1; 
            const skip = (page - 1) * limit; 
            const search = req.query.search || null
            let products
            if(search){
                products = await Product.find({
                   $expr: {
                     $regexMatch: {
                       input: { $getField: 'name' },
                       regex: new RegExp(search, 'i')
                     }
                   }
                 }).limit(limit); }
                else{
                     products = await Product.find().skip(skip).limit(limit);

                }
            res.status(200).json({success: "Lấy sản phẩm thành công", data: products})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getAllProductDeleted: async(req, res)=>{
        try {
            // const deleted = req.query.delete || false
            const limit = req.query.limit || null; 
            const page = req.query.page || 1; 
            const skip = (page - 1) * limit; 
            const search = req.query.search || null
            let productDeleted
            if(search){
                 productDeleted = await Product.findDeleted({
                    deleted: true,
                    $expr: {
                      $regexMatch: {
                        input: { $getField: 'name' },
                        regex: new RegExp(search, 'i')
                      }
                    }
                  }).limit(limit);
            }else{
                 productDeleted = await Product.findDeleted({deleted: true}).skip(skip).limit(limit)
            }
            return res.status(200).json({success: "lay san pham thanh cong", data: productDeleted})
        } catch (error) {
            res.status(500).json({error: error.message})
            
        }
    },
}


module.exports = productController
