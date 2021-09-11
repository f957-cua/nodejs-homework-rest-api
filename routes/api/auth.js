const express = require('express')

const ctrl = require('../../controllers/users')
const { checkSignupUser } = require('../../middlewares/validation')
const {controllerWrapper, authenticate} = require('../../middlewares')

const router = express.Router()

router.post('/signup', checkSignupUser, controllerWrapper(ctrl.signup))
router.post('/login', checkSignupUser, controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

module.exports = router