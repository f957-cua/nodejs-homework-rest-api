const sgMail = require('@sendgrid/mail')
const { InternalServerError } = require('http-errors')

const {VERIFY_KEY} = process.env

sgMail.setApiKey(VERIFY_KEY)

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: 'ivanfiliptschik00@gmail.com' }
    await sgMail.send(mail)
    return true
  } catch (error) {
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail