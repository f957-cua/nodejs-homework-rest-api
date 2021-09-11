const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const {User} = require('../models')

const {SECRET_KEY} = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }

    const verify = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({token})

    req.user = user
    next()
  } catch (error) {
    throw new Unauthorized('Not authorized')
  }
}

module.exports = authenticate