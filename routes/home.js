const route = require('express').Router()
const { homeGet } = require('../controllers/home')

route.get('/dashboard', homeGet)

module.exports = route
