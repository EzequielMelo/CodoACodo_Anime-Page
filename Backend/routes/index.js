var express = require('express');
var mysql = require('mysql');
var hbs = require('hbs');
var router = express.Router();
var connection = require('./db');

var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerHelper('urlEncode', function (context) {
  return encodeURIComponent(context);
});

hbs.registerHelper('range', function (arr, start, end) {
  if (!Array.isArray(arr)) { return []; }
  return arr.slice(start, end);
});

hbs.registerHelper('filterNonNull', function (arr, key) {
  if (!Array.isArray(arr)) { return []; }
  return arr.filter(item => item[key] !== null);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM animes', function (error, results, fields) {
    if (error) throw error;
    res.render('index', {data: results});
  });
});

router.get('/anime/:id/:nombre/', async (req, res) => {
  var animeId = req.params.id;
  const userId = req.session.user ? req.session.user.id : null;

  try {
    const [results] = await connection.promise().query(
      `SELECT 
      a.*,
      COUNT(DISTINCT e.id) AS cantidad_episodios,
      GROUP_CONCAT(DISTINCT g.genero ORDER BY g.genero SEPARATOR ', ') AS generos,
      GROUP_CONCAT(DISTINCT CONCAT_WS('||', e.id, e.temporada, e.nombre, e.descripcion, e.imagencapitulo, e.linkcapitulo) ORDER BY e.id SEPARATOR ';;') AS episodios,
      v.voto
      FROM 
      animes a
      JOIN 
      animes_generos ag ON a.id = ag.anime_id
      JOIN 
      generos g ON ag.genero_id = g.id
      LEFT JOIN 
      episodios e ON a.id = e.anime_id
      LEFT JOIN 
      votos v ON a.id = v.anime_id AND v.usuario_id = ?
      WHERE 
      a.id = ?
      GROUP BY 
      a.id`, [userId, animeId]
    );

    const [voteCounts] = await connection.promise().query(
      `SELECT 
      SUM(CASE WHEN voto = 'positivo' THEN 1 ELSE 0 END) AS votos_positivos,
      COUNT(*) AS total_votos
      FROM 
      votos
      WHERE 
      anime_id = ?`, [animeId]
    );

    if (results.length > 0) {
      var anime = results[0];
      anime.generos = anime.generos.split(', ');
      anime.episodios = anime.episodios ? anime.episodios.split(';;').map(e => {
        const [id, temporada, nombre, descripcion, imagencapitulo, linkcapitulo] = e.split('||');
        return { id, temporada, nombre, descripcion, imagencapitulo, linkcapitulo };
      }) : [];

      anime.temporadas = [...new Set(anime.episodios.map(e => e.temporada))];

      let isFavorite = false;
      if (userId) {
        const [favoriteRows] = await connection.promise().query(
          'SELECT * FROM usuario_favoritos WHERE usuario_id = ? AND anime_id = ?',
          [userId, animeId]
        );
        isFavorite = favoriteRows.length > 0;
      }

      const totalVotos = voteCounts[0].total_votos;
      const porcentajeRecomendado = totalVotos > 0 ? (voteCounts[0].votos_positivos / totalVotos) * 100 : 0;

      res.render('anime', {
        anime: anime,
        isFavorite,
        userVote: anime.voto, 
        porcentajeRecomendado
      });
    } else {
      res.status(404).send('Anime not found');
    }
  } catch (error) {
    console.error('Error al obtener el anime:', error);
    res.status(500).json({ success: false, message: 'Error al obtener el anime' });
  }
});

/*
router.post('/votes/:id', function(req, res, next) {
  const animeId = req.params.id;

  // Verificar si el usuario está autenticado
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Debes estar logueado para votar' });
  }

  const usuarioId = req.session.user.id;
  const { voto } = req.body;

  connection.query(
    'INSERT INTO votos (usuario_id, anime_id, voto) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE voto = ?',
    [usuarioId, animeId, voto, voto],
    function (error, results, fields) {
      if (error) {
        console.error('Error al votar:', error);
        return res.status(500).json({ success: false, message: 'Error al votar' });
      }
      res.status(200).json({ success: true, message: 'Voto registrado correctamente' });
    }
  );
});
*/
/*
router.post('/votes/:id', isAuthenticated, async (req, res) => {
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
*/
router.get('/anime/:anime_id', async (req, res) => {
  const anime_id = req.params.anime_id;

  try {
    const getVotesQuery = `
      SELECT 
        SUM(voto = 'positivo') AS positivos,
        SUM(voto = 'negativo') AS negativos
      FROM votos
      WHERE anime_id = ?;
    `;
    const [rows] = await connection.promise().query(getVotesQuery, [anime_id]);

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener votos:', error);
    res.status(500).json({ success: false, message: 'Error al obtener votos' });
  }
});


module.exports = router;
