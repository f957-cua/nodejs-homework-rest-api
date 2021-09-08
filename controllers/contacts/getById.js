const {Contact} = require('../../models')

const getById = async (req, res, next) => {
  try {
    const item = await Contact.findById(req.params.contactId)
    if (item) {
        res.json({ status: 'success', code: 200, data: item })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = getById