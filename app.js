require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const routes = require('./routes')
const middleware = require('./middleware')
const errors = require('./routes/error')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware and routes
middleware(app)
routes(app)
errors(app)

mongoose
	.connect(require('./utils/db-url'), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(config.get('port'), () =>
			console.log(
				chalk.bgYellow.black(`Server is running on port ${config.get('port')}`)
			)
		)
	)
	.catch((e) => console.log(e))
