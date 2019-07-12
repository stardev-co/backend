const express = require('express')
const mongoose = require('mongoose')
require('./models/offer')
require('./models/user')
require('./models/invoice')

const app = express()
app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.set('Access-Control-Allow-Headers', 'content-type')
  next()
})

// Connect to database, then continue the request
app.use(async (req, res, next) => {
  if (!process.env.DB_URI) {
    console.log('No DB_URI specified')
    return res.status(500).end()
  }
  await mongoose.connect(process.env.DB_URI, {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
  })
  next()
})

require('./routes/user')(app)
require('./routes/offer')(app)

app.use(async (req, res, next) => {
    await mongoose.disconnect()
  next()
})

module.exports = app
