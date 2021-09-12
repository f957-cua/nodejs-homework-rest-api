const {Schema, model, SchemaTypes} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, {versionKey: false, timestamps: true})

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = {
  Contact
}