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

// Ruta para eliminar un comentario
router.post('/:commentId/comentarios/borrar', isAuthenticated, async (req, res) => {
  const usuarioId = req.session.user.id;
  const comentarioId = req.params.commentId;

  if (!comentarioId) {
    return res.status(400).json({ success: false, message: 'ID de comentario no proporcionado.' });
  }

  try {
    const [result] = await connection.promise().query(
      'DELETE FROM comentarios WHERE id = ? AND usuario_id = ?', [comentarioId, usuarioId]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Comentario eliminado exitosamente.' });
    } else {
      res.status(404).json({ success: false, message: 'Comentario no encontrado o no autorizado para eliminar.' });
    }
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar comentario.' });
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

// Ruta para eliminar una respuesta a un comentario
router.post('/:commentId/:responseId/borrar', isAuthenticated, async (req, res) => {
  const usuarioId = req.session.user.id;
  const responseId = req.params.responseId;
  const comentarioId = req.params.commentId;

  if (!comentarioId) {
    return res.status(400).json({ success: false, message: 'ID de la respuesta no proporcionado.' });
  }

  try {
    const [result] = await connection.promise().query(
      'DELETE FROM respuestas WHERE id = ? AND comentario_id = ? AND usuario_id = ?', [responseId, comentarioId, usuarioId]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Respuesta eliminada exitosamente.' });
    } else {
      res.status(404).json({ success: false, message: 'Respuesta no encontrada o no autorizado para eliminar.' });
    }
  } catch (error) {
    console.error('Error al eliminar Respuesta:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar Respuesta.' });
  }
});

module.exports = router;