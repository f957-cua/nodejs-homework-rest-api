const {Contact} = require('../../models')

const remove = async (req, res, next) => {
  const contact = await Contact.findOneAndRemove({_id: req.user._id, owner: req.params.contactId})
  if (contact) {
    res.json({ status: 'success', code: 200, message: 'contact deleted', data: contact })
    return
  }
  res.json({ status: 'error', code: 404, message: 'Not found' })
}

module.exports = remove