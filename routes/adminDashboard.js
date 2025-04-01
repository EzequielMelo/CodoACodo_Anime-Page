const express = require('express');
const router = express.Router();
const connection = require('./db');
const isAuthenticated = require('../public/middleware/isAuthenticated');
const isAdmin = require('../public/middleware/isAdmin');

router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  res.render('adminDashboard');
});

module.exports = router;