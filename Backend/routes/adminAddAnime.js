const express = require('express');
const router = express.Router();
const connection = require('./db');
const isAuthenticated = require('../public/middleware/isAuthenticated');
const isAdmin = require('../public/middleware/isAdmin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images')); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Guardar el archivo con su nombre original
  }
});

const upload = multer({ storage: storage });

router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [generos] = await connection.promise().query(
      `SELECT * FROM generos`
    );
    res.render('adminAddAnime', { generos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
});

router.post('/', isAuthenticated, isAdmin, upload.fields([{ name: 'portada' }, { name: 'portadaInicio' }]), async (req, res) => {
  try {
    console.log(req.files); // Debería mostrar los archivos subidos
    console.log(req.body); // Debería mostrar los otros datos del formulario // Esto debería mostrar todos los archivos recibidos
    let { nombre, descripcion, linkTrailer, anio, enemision, generosSeleccionados } = req.body;
    let enEmision = req.body.enemision !== undefined ? parseInt(req.body.enemision, 10) : 0;

    if (isNaN(enEmision)) {
      enEmision = 0; // Si no es un número, asegurarse de que sea 0
    }
    const portadaFileName = req.files && req.files.portada ? req.files.portada[0].originalname : null;
    const portadaInicioFileName = req.files && req.files.portadaInicio ? req.files.portadaInicio[0].originalname : null;

    // Verificar que se subió una portada
    if (!portadaFileName) {
      return res.status(400).json({ success: false, message: 'El campo portada es obligatorio' });
    }

    // Función para verificar si un archivo ya existe
    const checkFileExists = (fileName) => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '..', 'uploads', fileName);
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            resolve(false); // El archivo no existe
          } else {
            resolve(true); // El archivo existe
          }
        });
      });
    };

    // Verificar si los archivos ya existen en el servidor
    const [portadaExists, portadaInicioExists] = await Promise.all([
      portadaFileName ? checkFileExists(portadaFileName) : Promise.resolve(false),
      portadaInicioFileName ? checkFileExists(portadaInicioFileName) : Promise.resolve(false)
    ]);

    if (portadaExists || (portadaInicioFileName && portadaInicioExists)) {
      return res.status(400).json({ success: false, message: 'Uno o ambos archivos ya existen en el servidor' });
    }

    // Insertar el nuevo anime en la base de datos
    const result = await connection.promise().query(
      `INSERT INTO animes (nombre, descripcion, portada, portadaprincipal, trailerprincipal, anio, enemision) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, portadaFileName, portadaInicioFileName, linkTrailer, anio, enEmision]
    );
    const animeId = result[0].insertId;

    // Guardar los géneros seleccionados
    if (Array.isArray(generosSeleccionados)) {
      for (const generoId of generosSeleccionados) {
        await connection.promise().query(
          `INSERT INTO animes_generos (anime_id, genero_id) VALUES (?, ?)`,
          [animeId, generoId]
        );
      }
    }

    res.json({ success: true, message: 'Anime añadido exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;

module.exports = router;
