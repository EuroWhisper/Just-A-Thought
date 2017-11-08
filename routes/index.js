var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');

/* GET home page for the SPA. */
router.get('/', function(req, res, next) {
  // Serve the index page.
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

/* Verify captcha */
router.post('/verify-captcha', function(req, res, next) {
	const captchaResponse = req.body.greCaptchaResponse;
	const secret = "6LePPjcUAAAAAGR2BStHdj3sWmMuFEjWM2JhS9Ic";
	const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
	
	const options = {
		url: verificationURL,
		method: 'POST',
		form: {
			'secret': secret,
			'response': captchaResponse
		}
	};
	
	console.log('verifying captcha' + captchaResponse);
	
	request(options, function(error, response, body) {
		var body = JSON.parse(body);
		console.log(body);
		if(body.success === true) {
			res.send(true);
		} else {
			res.send(false);
		}
	});
	
	
	
});

module.exports = router;
