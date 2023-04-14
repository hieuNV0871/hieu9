const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
const deletePlugin = require('mongoose-delete');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        slug: 'name',
        unique: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        require: true
      },
      price: {
        type: String,
        required: true
      },
      originPrice: {
        type: String
      },
      productCount: {
        type: Number,
        required: true,
        default: 1
      },
      sizes: [{
        type: String
      }],
      colors: [{
        type: String
      }],
      images: [
        {
          src: {
            type: String,
            // required: true
          },
          id: {
            type: String,
            // required: true
          }
        }
      ]
    
        
    

}, {timestamps: true})

productSchema.plugin(deletePlugin, { overrideMethods: true, deletedAt: true,});
module.exports = mongoose.model("Product", productSchema)