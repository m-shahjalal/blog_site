const authRouter = require('./auth')
const dashboardRoute = require('./dashboard')
const homeRoute = require('./home')

const routes = [
	{
		path: '/',
		controller: authRouter,
	},
	{
		path: '/',
		controller: dashboardRoute,
	},
	{
		path: '/',
		controller: homeRoute,
	},
]

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.controller)
	})
}
