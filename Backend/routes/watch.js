const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('watch');
  } catch (error) {
    console.error('Error al obtener servidores:', error);
    res.status(500).send('Error al obtener servidores del anime.');
  }
});

module.exports = router;