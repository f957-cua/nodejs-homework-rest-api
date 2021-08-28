const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { checkCreateContact, checkUpdateContact } = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts()
    res.json({ status: 'success', code: 200, data: data })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const item = await contacts.getContactById(req.params.contactId)
    if (item) {
        res.json({ status: 'success', code: 200, data: item })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', checkCreateContact, async (req, res, next) => {
  try {
    const item = await contacts.addContact(req.body)
    if (item) {
        res.json({ status: 'success', code: 201, data: item })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: 200, message: 'contact deleted', data: contact })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', checkUpdateContact, async (req, res, next) => {
  try {
    const contact = await contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
        res.json({ status: 'success', code: 200, data: { contact } })
        return
    }
    res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
