var express = require('express');
var mysql = require('mysql');
var hbs = require('hbs');
var router = express.Router();
var connection = require('./db');
const isAuthenticated = require('../public/middleware/authmiddleware');

router.post('/:animeId', isAuthenticated, async (req, res) => {
  const animeId = req.params.animeId;
  const usuarioId = req.session.user.id;
  const { voto } = req.body; // 'positivo' o 'negativo'

  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'Debes estar logueado para votar' });
    }

    // Verificar si el usuario ya ha votado por este anime
    const [rows] = await connection.promise().query(
      'SELECT voto FROM votos WHERE usuario_id = ? AND anime_id = ?',
      [usuarioId, animeId]
    );

    if (rows.length > 0) {
      const votoExistente = rows[0].voto;

      if (votoExistente === voto) {
        // Si el voto ya existe y es el mismo, devolver un mensaje
        return res.status(400).json({ success: false, message: 'Ya has votado de esta manera.' });
      } else {
        // Si el voto existe pero es diferente, actualizar el voto
        await connection.promise().query(
          'UPDATE votos SET voto = ? WHERE usuario_id = ? AND anime_id = ?',
          [voto, usuarioId, animeId]
        );
        return res.status(200).json({ success: true, message: 'Tu voto ha sido actualizado.' });
      }
    } else {
      // Si no existe un voto, insertar uno nuevo
      await connection.promise().query(
        'INSERT INTO votos (usuario_id, anime_id, voto) VALUES (?, ?, ?)',
        [usuarioId, animeId, voto]
      );
      return res.status(200).json({ success: true, message: 'Tu voto ha sido registrado.' });
    }
  } catch (error) {
    console.error('Error al registrar el voto:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el voto.' });
  }
});

module.exports = router;