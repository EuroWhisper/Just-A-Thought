var express = require('express');
var router = express.Router();

var thoughtsController = require('../controllers/thoughtsController');

router.get('/all', thoughtsController.getAllThoughts);

router.get('/tags/:hashTag', thoughtsController.getHashtagThoughts);

router.post('/create', thoughtsController.createThought);

module.exports = router;