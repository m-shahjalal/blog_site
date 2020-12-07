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
		if (route.controller === homeRoute) {
			app.get(route.path, route.controller)
		} else {
			app.use(route.path, route.controller)
		}
	})
}
