const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },

    order: {
        type: Number,
        require: true,
        unique: true
    }

}, {timestamps: true})


module.exports = mongoose.model("Category", categorySchema)