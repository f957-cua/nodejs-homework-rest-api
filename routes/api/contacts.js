const express = require('express')
const router = express.Router()

const ctrl = require('../../controllers/contacts')
const { checkCreateContact, checkUpdateContact } = require('./validation')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', checkCreateContact, ctrl.post)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', checkUpdateContact, ctrl.put)

router.patch('/:contactId/favorite', ctrl.patch)

module.exports = router
