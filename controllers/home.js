exports.homeGet = (req, res) => {
	console.log(req)
	res.render('pages/home', { title: 'welcome' })
}
