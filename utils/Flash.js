class Flash {
	constructor(req) {
		this.req = req
		this.success = this.flashMessage('success')
		this.fail = this.flashMessage('fail')
	}

	flashMessage(name) {
		const message = this.req.flash(name)
		return message.length > 0 ? message[0] : false
	}

	hasMessage() {
		!this.fail && !this.success ? false : true
	}

	static getMessage(req) {
		let flash = new Flash(req)
		return {
			success: flash.success,
			fail: flash.fail,
			hasMessage: flash.hasMessage(),
		}
	}
}

module.exports = Flash
