const {Contact} = require('../../models')

const post = async (req, res, next) => {
  try {
    const item = await Contact.create(req.body)
    if (item) {
        res.json({ status: 'success', code: 201, data: {favorite: false, ...item} })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = post