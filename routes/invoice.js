const mongoose = require('mongoose')
const Invoice =  mongoose.model('Invoice')

module.exports = (app) => {
  app.get('/invoices', loadInvoice)
}

const loadInvoice = async (req, res) => {
  if (!req.params._id) {
    res.status(400).json({
      message: 'No invoice _id supplied',
    })
    return
  }
  const invoice = await Invoice.findOne({
    _id: mongoose.Types.ObjectId(req.params._id),
  })
    .lean()
    .exec()
  if (!invoice) {
    res.status(404).json({
      message: `No invoice found for _id: ${req.params._id}`
    })
    return
  }
  res.json(invoice)
}
