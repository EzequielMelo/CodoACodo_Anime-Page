var express = require('express');
var router = express.Router();
var connection = require('./db');
const isAuthenticated = require('../public/middleware/authmiddleware');

router.get('/', isAuthenticated, async (req, res) => {

  const userId = req.session.user.id;

  try {
    const favoritesQuery = `
      SELECT a.*
      FROM animes a
      JOIN usuario_favoritos uf ON a.id = uf.anime_id
      WHERE uf.usuario_id = ?
    `;
    const [rows] = await connection.promise().query(favoritesQuery, [userId]);

    res.render('myprofile', { user: req.session.user, animes: rows });
  } catch (error) {
    console.error('Error al obtener los animes favoritos:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los animes favoritos' });
  }

});

module.exports = router;