exports.notfound = (req, res, next) => {
	let error = new Error('404 page not found!')
	error.status = 404
	next(error)
}
exports.errorHandler = (error, req, res, next) => {
	if (error.status === 404) {
		return res.render('pages/errors/404', {
			flashMessage: {},
			title: '404 not found',
		})
	}
	res.render('pages/errors/500', {
		flashMessage: {},
		title: '500 server error',
	})
}
