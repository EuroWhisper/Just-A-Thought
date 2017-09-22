var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page for the SPA. */
router.get('/', function(req, res, next) {
  // Serve the index page.
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;
