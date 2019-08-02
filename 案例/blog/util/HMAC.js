const crypto = require('crypto');
module.exports = function(data) {
	const hmac = crypto.createHmac('sha256', '888');
	hmac.update(data)
	return hmac.digest('hex')
}

