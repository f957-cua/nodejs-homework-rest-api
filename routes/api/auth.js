const express = require('express')

const ctrl = require('../../controllers/users')
const { checkSignupUser, checkResendRequest } = require('../../middlewares/validation')
const {controllerWrapper, authenticate, upload} = require('../../middlewares')

const router = express.Router()

router.post('/signup', checkSignupUser, controllerWrapper(ctrl.signup))
router.post('/login', checkSignupUser, controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

//verify token
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

//resend verification email
router.post('/verify', checkResendRequest, controllerWrapper(ctrl.resend))

router.patch('/avatars', controllerWrapper(authenticate), upload.single('avatar'), controllerWrapper(ctrl.updateImage))

module.exports = router