const express = require('express')
const router = express.Router()

const ctrl = require('../../controllers/contacts')
const { checkCreateContact, checkUpdateContact } = require('../../middlewares/validation')
const {controllerWrapper, authenticate} = require('../../middlewares')

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))
router.post('/', controllerWrapper(authenticate), checkCreateContact, controllerWrapper(ctrl.post))

router.get('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.getById))
router.delete('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.remove))
router.put('/:contactId', controllerWrapper(authenticate), checkUpdateContact, controllerWrapper(ctrl.put))

router.patch('/:contactId/favorite', controllerWrapper(authenticate), controllerWrapper(ctrl.patch))

module.exports = router
