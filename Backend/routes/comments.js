const express = require('express');
const router = express.Router();
const connection = require('./db'); // Importa tu configuración de base de datos
const isAuthenticated = require('../public/middleware/authmiddleware');

// Ruta para añadir un comentario
router.post('/:animeId/comentarios', isAuthenticated, async (req, res) => {
  const animeId = req.params.animeId;
  const usuarioId = req.session.user.id;
  const { comentario, valoracion } = req.body;

  try {
    await connection.promise().query(
      'INSERT INTO comentarios (anime_id, usuario_id, comentario, valoracion) VALUES (?, ?, ?, ?)',
      [animeId, usuarioId, comentario, valoracion]
    );
    res.json({ success: true, message: 'Comentario agregado exitosamente.' });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ success: false, message: 'Error al agregar comentario.' });
  }
});

// Ruta para añadir una respuesta a un comentario
router.post('/:id/respuestas', isAuthenticated, async (req, res) => {
  const comentarioId = req.params.id;
  const { respuesta } = req.body;
  const usuarioId = req.session.user.id;

  try {
    await connection.promise().query(
      `INSERT INTO respuestas (comentario_id, usuario_id, respuesta)
             VALUES (?, ?, ?)`,
      [comentarioId, usuarioId, respuesta]
    );
    res.json({ success: true, message: 'Respuesta añadida.' });
  } catch (error) {
    console.error('Error al añadir respuesta:', error);
    res.status(500).json({ success: false, message: 'Error al añadir respuesta.' });
  }
});

module.exports = router;