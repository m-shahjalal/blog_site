const router = require('express').Router()
const signupValidator = require('../validator/auth/signupValidator')

const {
	signupGet,
	signupPost,
	loginGet,
	loginPost,
	logout,
} = require('../controllers/auth')

//validators

router.get('/signup', signupGet)
router.post('/signup', signupValidator, signupPost)

router.get('/login', loginGet)
router.post('/login', loginPost)

router.get('/logout', logout)

module.exports = router
