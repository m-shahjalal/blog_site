exports.homeGet = (req, res) => {
	res.render('pages/home', { title: 'welcome' })
}
