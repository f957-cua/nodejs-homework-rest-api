const { Unauthorized } = require('http-errors')
const {Order} = require('../../models')
const {User} = require('../../models')

const getAll = async (req, res) => {
  try {
    //get current user with orders
    const result = await Order.find({owner: req.user._id}).populate('owner', '_id email subscription')

    //get info about user
    if (result == false) {
      return res.json({
        status: 'success',
        code: 200,
        user: {
          email: req.user.email,
          subscription: req.user.subscription
        }
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    throw new Unauthorized()
  }
}

module.exports = getAll