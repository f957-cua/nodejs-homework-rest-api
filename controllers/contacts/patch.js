const {Contact} = require('../../models')
const {NotFound, BadRequest} = require('http-errors')

const patch = async (req, res, next) => {
  const {favorite} = req.body
  if (!favorite) {
    throw new BadRequest()
  }
  const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner: req.user._id }, { ...req.body }, { new: true })
  if (contact) {
    res.json({ status: 'success', code: 200, data: { contact }})
    return
  }
  throw new NotFound()
}

module.exports = patch