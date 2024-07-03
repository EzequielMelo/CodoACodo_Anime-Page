var express = require('express');
var router = express.Router();
var connection = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
  const { usuario, email, contraseña } = req.body;

  // Verificar si el usuario o el email ya existen en la base de datos
  try {
    // Verificar si el usuario o el email ya existen en la base de datos
    const checkUserQuery = 'SELECT * FROM usuarios WHERE nombre = ? OR email = ?';
    connection.query(checkUserQuery, [usuario, email], async (error, results) => {
      if (error) {
        console.error('Error al verificar usuario:', error);
        return res.status(500).json({ success: false, message: 'Error al verificar usuario' });
      }

      if (results.length > 0) {
        // Si ya existe un usuario o email, enviar un mensaje de error
        return res.status(400).json({ success: false, message: 'El usuario o el correo electrónico ya están registrados' });
      }

      // Si no existe, proceder con el registro
      const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
      const insertUserQuery = 'INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)';
      connection.query(insertUserQuery, [usuario, email, hashedPassword], (error, results) => {
        if (error) {
          console.error('Error al registrar usuario:', error);
          return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
        }

        res.status(200).json({ success: true, message: 'Usuario registrado exitosamente' });
      });
    });
  } catch (error) {
    console.error('Error general al registrar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

module.exports = router;