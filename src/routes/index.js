require('dotenv').config()

const authRouter = require('./auth')
const userRouter = require('./user')
const uploadRouter = require('./upload')
const productRouter = require('./product')
const categoryRouter = require('./category')
const sliderRouter = require('./slider')
const bannerRouter = require('./banner')
const newsRouter = require('./news')
const billRouter = require('./bill')
const paymentRouter = require('./payment')



function route(app) {
    app.use('/v1/auth', authRouter)
    app.use('/v1/user', userRouter)
    app.use('/v1/upload', uploadRouter)
    app.use('/v1/product', productRouter)
    app.use('/v1/category', categoryRouter)
    app.use('/v1/slider', sliderRouter)
    app.use('/v1/banner', bannerRouter)
    app.use('/v1/news', newsRouter)
    app.use('/v1/bill', billRouter)
    app.use('/v1/payment', paymentRouter)


    




    app.use((req, res, next) => {
        res.status(404).json({error: 'Not found!'})
    })
    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({error: error.message})
    })
}

module.exports = route