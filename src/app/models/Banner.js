const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    images: [
        {
          src: {
            type: String,
            required: true,
            unique: true
          },
          id: {
            type: String,
            required: true,
            unique: true
          }
        }
    ],
    
    order: {
        type: Number,
        unique: true
    }

}, {timestamps: true})


module.exports = mongoose.model("Banner", bannerSchema)