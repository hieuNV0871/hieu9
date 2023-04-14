const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.set("strictQuery", false)

async function connect() {
    
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, ()=>console.log("database connected"))
    } catch (error) {
        console.log('Connect fail')
    }
}

module.exports = { connect }