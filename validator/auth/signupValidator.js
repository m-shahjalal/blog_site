const User = require('../../models/User')
const { body } = require('express-validator')

module.exports = [
	body('name')
		.isLength({ min: 3, max: 30 })
		.withMessage('name must be between 3-30 character')
		.trim(),

	body('email')
		.isEmail()
		.withMessage('Please provide a valid email')
		.normalizeEmail()
		.custom(async (email) => {
			let user = await User.findOne({ email })
			if (user) return Promise.reject('Email already exists')
		}),

	body('password')
		.isLength({ min: 5, max: 64 })
		.withMessage('Password must be grater then 5 character'),

	body('confirmPassword')
		.isLength({ min: 5, max: 64 })
		.withMessage('Password must be grater then 5 character')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('password does not match')
			}
			return true
		}),
]
