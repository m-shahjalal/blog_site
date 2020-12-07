const config = require('config')

module.exports = `mongodb+srv://${config.get('db-username')}:${config.get(
	'db-password'
)}@cluster0.1gsip.mongodb.net/dive-into-nodejs-blog-site?retryWrites=true&w=majority`
