const express = require('express')

const ctrl = require('../../controllers/orders')
const { checkOwner } = require('../../middlewares/validation')
const {controllerWrapper, authenticate} = require('../../middlewares')

const router = express.Router()

router.post('/', controllerWrapper(authenticate), checkOwner, controllerWrapper(ctrl.add))

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))

module.exports = router