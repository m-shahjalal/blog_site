const playgroundRouter = require('express').Router()

playgroundRouter.get('/validator', (req, res) => {
	res.render('play/p.ejs', { title: 'playground' })
	// res.json({ message: 'It is working correctly' })
})

module.exports = playgroundRouter
