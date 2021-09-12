const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const {contactsRouter} = require('./routes/api')
const {authRouter} = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
app.use('/api/users/current', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ status: 'fail', code: status, message: err.message })
})

module.exports = app
