const route = require('express').Router()
const { homeGet } = require('../controllers/home')

route.get('/', homeGet)

module.exports = route
