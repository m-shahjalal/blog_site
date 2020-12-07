const { notfound, errorHandler } = require('../controllers/error')

const errors = [notfound, errorHandler]
module.exports = (app) => {
	errors.forEach((e) => {
		app.use(e)
	})
}
