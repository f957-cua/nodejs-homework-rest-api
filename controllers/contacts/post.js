const {Contact} = require('../../models')

const post = async (req, res, next) => {
  const item = await Contact.create({owner: req.user._id, ...req.body})
  if (item) {
    res.json({ status: 'success', code: 201, data: { favorite: false, item } })
    return
  }
  res.json({ status: 'error', code: 404, message: 'Not found' })
}

module.exports = post