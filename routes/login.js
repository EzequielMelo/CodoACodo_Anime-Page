var express = require('express');
var router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const checkUserQuery = 'SELECT * FROM usuarios WHERE nombre = ?';
    const [rows] = await connection.promise().query(checkUserQuery, [usuario]);

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(contraseña, user.contrasenia);

    if (!match) {
      return res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    // Obtener la dirección de la foto usando el foto_id
    const getPhotoQuery = 'SELECT foto FROM usuario_fotos WHERE id = ?';
    const [photoRows] = await connection.promise().query(getPhotoQuery, [user.foto_id]);

    let userPhoto = null;
    if (photoRows.length > 0) {
      userPhoto = photoRows[0].foto;
    }

    console.log(photoRows[0])
    console.log(userPhoto)

    // Almacenar datos del usuario en la sesión
    req.session.user = { id: user.id, nombre: user.nombre, email: user.email, foto: userPhoto, tipo: user.tipo };

    res.status(200).json({ success: true, message: 'Sesión iniciada' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
  }
});

module.exports = router;