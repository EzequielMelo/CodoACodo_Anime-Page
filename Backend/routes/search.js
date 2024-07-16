const express = require('express');
const router = express.Router();
var connection = require('./db');

router.get('/', async (req, res) => {
  const query = req.query.query;

  try {
    const searchQuery = `
      SELECT * FROM animes
      WHERE nombre LIKE ? OR descripcion LIKE ?
    `;
    const [results] = await connection.promise().query(searchQuery, [`%${query}%`, `%${query}%`]);

    res.render('searchresults', { results, query });
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ success: false, message: 'Error al realizar la búsqueda' });
  }
});

module.exports = router;