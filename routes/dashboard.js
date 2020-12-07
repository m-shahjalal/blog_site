const dashboardRoute = require('express').Router()
const { dashboardGet } = require('../controllers/dashboard')

dashboardRoute.get('/dashboard', dashboardGet)

module.exports = dashboardRoute
