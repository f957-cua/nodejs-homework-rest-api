const { Unauthorized } = require('http-errors')
const {Contact} = require('../../models')

const getAll = async (req, res) => {
  try {
    //pagination contacts option
    const {favorite = null, limit = 5, page = 1} = req.query
    
    const optionsSearch = {owner: req.user._id}
    if (favorite !== null) {
      optionsSearch.favorite = favorite
    }
    //get current user with orders
    const result = await Contact.paginate(optionsSearch, { limit, page, populate: { path: 'owner', select: '_id email subscription' } })
    const {docs: contacts, ...rest} = result

    //get info about user
    if (result == false) {
      return res.json({
        status: 'success',
        code: 200,
        data: {contacts, ... rest}
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {contacts, ... rest}
    })
  } catch (error) {
    throw new Unauthorized()
  }
}

module.exports = getAll