const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const route = require('./src/routes')
const db = require('./src/configs/db')

const app = express()

db.connect()

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173', 'http://localhost:5174']
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)     
    }
    else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT || 5000

route(app)

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})