const {Order} = require('../../models')

const add = async (req, res) => {
  const newOrder = {...req.body, owner: req.user._id}
  const result = await Order.create(newOrder)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success add order',
    data: {
      result
    }
  })
}

module.exports = add