const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

module.exports = mongoose.model('Offer', OfferSchema)
