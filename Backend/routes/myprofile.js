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
    const getPhotosQuery = 'SELECT id, foto FROM usuario_fotos';
    const [favoriteRows] = await connection.promise().query(favoritesQuery, [userId]);
    const [photosRows] = await connection.promise().query(getPhotosQuery);


    res.render('myprofile', { user: req.session.user, animes: favoriteRows, photos: photosRows });
  } catch (error) {
    console.error('Error al obtener los animes favoritos:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los animes favoritos' });
  }

});

router.post('/update-photo', isAuthenticated, async (req, res) => {
  const { photoId } = req.body;
  const userId = req.session.user.id;

  try {
    const updatePhotoQuery = 'UPDATE usuarios SET foto_id = ? WHERE id = ?';
    await connection.promise().query(updatePhotoQuery, [photoId, userId]);

    // Realizar una nueva consulta para obtener la dirección de la nueva foto
    const getPhotoQuery = 'SELECT foto FROM usuario_fotos WHERE id = ?';
    const [photoRows] = await connection.promise().query(getPhotoQuery, [photoId]);

    let userPhoto = null;
    if (photoRows.length > 0) {
      userPhoto = photoRows[0].foto;
    }

    // Actualizar la foto en la sesión
    req.session.user.foto = userPhoto;

    res.status(200).json({ success: true, message: 'Foto actualizada' });
  } catch (error) {
    console.error('Error al actualizar la foto:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la foto' });
  }
});


module.exports = router;