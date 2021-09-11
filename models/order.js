const {Schema, model, SchemaTypes} = require('mongoose')
const bcrypt = require('bcryptjs')

const orderSchema = Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

const Order = model('order', orderSchema)

module.exports = {
  Order
}