const {Contact} = require('../../models')

const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find({})
    res.json({ status: 'success', code: 200, data: data })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll