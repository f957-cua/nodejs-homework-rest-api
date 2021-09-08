const {Contact} = require('../../models')

const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: 200, message: 'contact deleted', data: contact })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = remove