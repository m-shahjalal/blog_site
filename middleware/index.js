const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')

const { bindUserWithRequest } = require('./authMiddleware')
const setLocals = require('./setLocals')

const middleware = [
	express.static('public'),
	morgan('dev'),
	bodyParser.json({ limit: '10mb' }),
	bodyParser.urlencoded({ extended: true, limit: '10mb' }),

	session({
		secret: process.env.SECRET_KEY || 'SECRET_KEY',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			collection: 'sessions',
			ttl: 60 * 60 * 24,
		}),
	}),
	flash(),

	//my won custom middleware
	bindUserWithRequest(),
	setLocals(),
]

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m)
	})
}
