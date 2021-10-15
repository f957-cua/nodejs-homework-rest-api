const {Contact} = require('../../models')

const put = async (req, res, next) => {
  const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner: req.user._id }, { ...req.body }, { new: true })
  if (contact) {
    res.json({ status: 'success', code: 200, data: { contact } })
    return
  }
  res.json({ status: 'error', code: 404, message: 'Not found' })
}

module.exports = put