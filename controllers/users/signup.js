const bcrypt = require('bcryptjs')
const {Conflict} = require('http-errors')

const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const {User} = require('../../models')
const {sendMail} = require('../../utils')

const signup = async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (user) {
    throw new Conflict('Email in use')
  }

  //set avatarURL
  const gravatarImage = gravatar.url(email)
  const currentUserInfo = {
    email,
    avatarURL: gravatarImage
  }

  const newUser = new User(currentUserInfo)
  newUser.createVerifyToken()
  newUser.setPassword(password)

  //send verify email
  const {verifyToken} = newUser
  const data = {
    to: email,
    subject: 'Сonfirmation of registration on the web-site',
    html: `<a href='http://localhost:3000/api/users/verify/${verifyToken}'>Click on this link to confirm your registration</a>`
  }
  await sendMail(data)

  //save new user to db
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