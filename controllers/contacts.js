const {Contact} = require('../models')

const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find({})
    res.json({ status: 'success', code: 200, data: data })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const item = await Contact.findById(req.params.contactId)
    if (item) {
        res.json({ status: 'success', code: 200, data: item })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const post = async (req, res, next) => {
  try {
    const item = await Contact.create(req.body)
    if (item) {
        res.json({ status: 'success', code: 201, data: {favorite: false, ...item} })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: 200, message: 'contact deleted', data: contact })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const put = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
    if (contact) {
        res.json({ status: 'success', code: 200, data: { contact }})
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const patch = async (req, res, next) => {
  try {
    const {favorite} = req.body
    if (!favorite) {
      res.json({ status: 'error', code: 400, message: 'missing field favorite' })
      return
    }
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, {favorite}, {new: true})
    if (contact) {
        res.json({ status: 'success', code: 200, data: { contact }})
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getAll,
    getById,
    post,
    remove,
    put,
    patch
}