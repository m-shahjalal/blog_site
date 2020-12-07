const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
	body('email')
		.isEmail()
		.normalizeEmail()
		.custom(async (email) => {
			const user = await User.findOne({ email })
			if (user) return Promise.reject('Please Give authentic informations')
		}),
	body('password').custom(async (password) => {
		const user = await User.findOne({ password })
		if (user) return await Promise.reject('Please Give authentic information')
	}),
]
