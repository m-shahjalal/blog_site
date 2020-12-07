const Flash = require('../utils/Flash')

exports.dashboardGet = (req, res) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('/login')
	}
	res.render('pages/dashboard', { flashMessage: Flash.getMessage(req) })
}
// require('../views/pages/dashboard.ejs')
