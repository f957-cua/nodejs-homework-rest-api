const {Contact} = require('../../models')

const getById = async (req, res, next) => {
  const item = await Contact.findOne({ _id: req.user._id, owner: req.params.contactId })
  if (item) {
    res.json({ status: 'success', code: 200, data: item })
    return
  }
  res.json({ status: 'error', code: 404, message: 'Not found' })
}

module.exports = getById