const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(new RegExp('^[0-9\s]{8,13}$()')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ru'] } }).required()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(new RegExp('^[0-9_+]{8,13}$')).required(), // подскажите как задать через регулярное выражение следующую строку "(748) 206-2688"
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ru', 'org'] } }).required()
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  }
  catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, '')
    })
  }
}

module.exports = {
  checkCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  checkUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  }
}
