const mongoose = require("mongoose")

const sliderSchema = new mongoose.Schema({
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

    text: {
        type: String,
        unique: true
    },

    order: {
        type: Number,
        unique: true
    }

}, {timestamps: true})


module.exports = mongoose.model("Slider", sliderSchema)