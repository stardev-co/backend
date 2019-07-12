const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const InvoiceSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'usd',
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Invoice', InvoiceSchema)
