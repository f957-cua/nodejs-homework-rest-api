const bcrypt = require('bcryptjs')
const {Conflict} = require('http-errors')

const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const {User} = require('../../models')

const signup = async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (user) {
    throw new Conflict('Email in use')
  }

  //set avatarURL
  const gravatarImage = gravatar.url(email)
  console.log(gravatarImage)
  const currentUserInfo = {
    email,
    avatarURL: gravatarImage
  }

  const newUser = new User(currentUserInfo)
  newUser.setPassword(password)

  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

module.exports = signup