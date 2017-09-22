var express = require('express');
var router = express.Router();

var thoughtsController = require('../controllers/thoughtsController');

router.get('/all', thoughtsController.getAllThoughts);

router.get('/show', function(req, res) {
	res.send('lol');
});

router.post('/create', thoughtsController.createThought);

module.exports = router;