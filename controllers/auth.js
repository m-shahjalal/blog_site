const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const Flash = require('../utils/Flash')

exports.signupGet = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/dashboard')
	}
	res.render('pages/auth/signup', {
		title: 'Create new Account',
		error: {},
		value: {},
		flashMessage: Flash.getMessage(req),
	})
}

exports.signupPost = async (req, res, next) => {
	const { name, email, password } = req.body
	const errors = validationResult(req).formatWith((e) => e.msg)

	if (!errors.isEmpty()) {
		req.flash('fail', 'Please check your form and try again')
		return res.render('pages/auth/signup', {
			title: 'Create new Account',
			error: errors.mapped(),
			value: { name, email, password },
			flashMessage: Flash.getMessage(req),
		})
	}

	try {
		const bcryptPass = await bcrypt.hash(password, 10)
		const user = new User({ name, email, password: bcryptPass })
		const createdUser = await user.save()
		console.log('This is created user >>>', createdUser)
		req.flash('success', 'User created successfully. Please log in here!')
		res.redirect('/login')
	} catch (error) {
		console.log(error)
		next(error)
	}
}

exports.loginGet = (req, res, next) => {
	console.log(Flash.getMessage(req))
	if (req.session.isLoggedIn) {
		return res.redirect('/dashboard')
	}
	console.log(req.session)
	res.render('pages/auth/login', {
		title: 'Login to your account',
		error: '',
		flashMessage: Flash.getMessage(req),
	})
}

exports.loginPost = async (req, res, next) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })

		if (!user) {
			req.flash('fail', 'Invalid credentials, Give authentic informations')
			return res.render('pages/auth/login', {
				title: 'Login to your account',
				error: 'Error occurred! try again',
				flashMessage: Flash.getMessage(req),
			})
		} else {
			const matchPass = await bcrypt.compare(password, user.password)
			if (!matchPass) {
				req.flash('fail', 'Invalid credentials, Give authentic informations')
				return res.render('pages/auth/login', {
					title: 'Login to your account',
					error: 'Error occurred! try again',
					flashMessage: Flash.getMessage(req),
				})
			}
			req.session.isLoggedIn = true
			req.session.user = user
			req.session.save((e) => {
				if (e) {
					console.log(e)
					return next(e)
				}
				req.flash('success', 'Login successfully, Now Enjoy yourself!!')
				res.redirect('/dashboard')
			})
		}
	} catch (e) {
		console.log(e)
		next(e)
	}
}

exports.logout = (req, res, next) => {
	req.session.destroy((e) => {
		if (e) {
			console.log(e)
			return next(e)
		}
		res.redirect('/login')
	})
}
