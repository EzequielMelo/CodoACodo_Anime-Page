const express = require('express');
const router = express.Router();
const connection = require('./db');

// Middleware para verificar si el usuario está logueado
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).json({ success: false, message: 'Debes estar logueado para agregar favoritos' });
  }
}

router.post('/add', isAuthenticated, async (req, res) => {
  const { anime_id } = req.body;
  const user_id = req.session.user.id;

  try {
    const query = 'INSERT INTO usuario_favoritos (usuario_id, anime_id) VALUES (?, ?)';
    await connection.promise().query(query, [user_id, anime_id]);
    res.status(200).json({ success: true, message: 'Anime agregado a favoritos' });
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    res.status(500).json({ success: false, message: 'Error al agregar a favoritos' });
  }
});

module.exports = router;
