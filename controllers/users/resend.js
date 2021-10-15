const { BadRequest } = require('http-errors')

const {User} = require('../../models')
const {sendMail} = require('../../utils')

const resend = async(req, res) => {
  const {email} = req.body
  const user = await User.findOne({email})
  if (user && user.verify) {
    throw new BadRequest('verification has already been passed')
  }

  //send verify email
  const {verifyToken} = user
  const data = {
    to: email,
    subject: 'Сonfirmation of registration on the web-site',
    html: `<a href='http://localhost:3000/api/users/verify/${verifyToken}'>Click on this link to confirm your registration</a>`
  }
  await sendMail(data)
  res.json({
    message: 'verification email sent'
  })
}

module.exports = resend