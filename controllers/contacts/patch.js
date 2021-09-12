const {Contact} = require('../../models')
const {NotFound, BadRequest} = require('http-errors')

const patch = async (req, res, next) => {
  const {favorite} = req.body
  if (!favorite) {
    throw new BadRequest()
    // res.json({ status: 'error', code: 400, message: 'missing field favorite' })
    // return
  }
  const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner: req.user._id }, { ...req.body }, { new: true })
  if (contact) {
    res.json({ status: 'success', code: 200, data: { contact }})
    return
  }
  // res.json({ status: 'error', code: 404, message: 'Not found' })
  throw new NotFound()
}

module.exports = patch