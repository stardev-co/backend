const express = require('express')
const mongoose = require('mongoose')
require('./models/offer')
require('./models/user')

const app = express()
app.use(express.json())

require('./routes/user')(app)
require('./routes/offer')(app)

module.exports = app
