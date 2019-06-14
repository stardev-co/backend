const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token
  if (!token) {
    res.status(400).json({ message: 'No auth token supplied' })
    return
  }
  try {
    const user = jwt.verify(token, process.env.WEB_TOKEN_SECRET)
    if (user._id) {
      user._id = mongoose.Types.ObjectId(user._id)
    }
    req.user = user
    next()
  } catch (err) {
    res.status(400).json({ message: 'Error parsing token' })
  }
}
