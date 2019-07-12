const mongoose = require('mongoose')
const Invoice =  mongoose.model('Invoice')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/invoices', loadInvoice)
  app.post('/invoices', auth, createInvoice)
}

const createInvoice = async (req, res) => {
  try {
    const { _doc } = await Invoice.create({
      ...req.body,
      ownerId: req.user._id,
      createdAt: new Date(),
    })
    res.json(_doc)
  } catch (err) {
    res.status(400).json({
      message: `Error creating invoice, ${err.toString()}`,
    })
  }
}

const loadInvoice = async (req, res) => {
  if (!req.query._id) {
    res.status(400).json({
      message: 'No invoice _id supplied',
    })
    return
  }
  const invoice = await Invoice.findOne({
    _id: mongoose.Types.ObjectId(req.query._id),
  })
    .lean()
    .exec()
  if (!invoice) {
    res.status(404).json({
      message: `No invoice found for _id: ${req.query._id}`
    })
    return
  }
  res.json(invoice)
}
