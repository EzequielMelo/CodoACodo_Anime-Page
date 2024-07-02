var express = require('express');
var router = express.Router();
var connection = require('./db');
const isAuthenticated = require('../public/middleware/authmiddleware');

router.get('/', isAuthenticated, (req, res) => {
  res.render('myprofile', { user: req.session.user });
});

module.exports = router;