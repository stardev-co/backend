const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.post('/offers', auth, createOffer)
  app.get('/offers', auth, loadOffer)
}

const createOffer = asyncExpress(async (req, res) => {
  res.json({})
})

const loadOffer = asyncExpress(async (req, res) => {
  res.json({})
})
