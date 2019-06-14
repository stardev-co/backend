const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const auth = require('../middleware/auth')
const Offer = mongoose.model('Offer')

module.exports = (app) => {
  app.post('/offers', auth, createOffer)
  app.put('/offers', auth, updateOffer)
  app.get('/offers', auth, loadOffer)
}

const createOffer = asyncExpress(async (req, res) => {
  const offer = await Offer.create({
    ...req.body,
    ownerId: req.user._id,
  })
  res.json(offer._doc)
})

const updateOffer = asyncExpress(async (req, res) => {
  const { modifiedCount } = await Offer.updateOne({
    _id: mongoose.types.ObjectId(req.query._id),
  }, req.body)
  if (modifiedCount !== 1) {
    res.status(422).json({ message: 'Modified count is not one' })
    return
  }
  res.status(204).end()
})

const loadOffer = asyncExpress(async (req, res) => {
  const offer = await Offer.findOne(req.query._id).lean().exec()
  res.json(offer)
})
