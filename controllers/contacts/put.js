const {Contact} = require('../../models')

const put = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
    if (contact) {
        res.json({ status: 'success', code: 200, data: { contact }})
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = put