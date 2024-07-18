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

hbs.registerHelper('hasResponses', function (array, options) {
  if (array && array.length > 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('areEqualIds', function (id1, id2) {
  return id1 === id2;
});

/* GET home page. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM animes', function (error, results, fields) {
    if (error) throw error;
    res.render('index', { data: results });
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

    const [comments] = await connection.promise().query(
      `SELECT c.*, u.nombre AS usuario_nombre, uf.foto AS usuario_foto
      FROM comentarios c
      JOIN usuarios u ON c.usuario_id = u.id
      JOIN usuario_fotos uf ON u.foto_id = uf.id
      WHERE c.anime_id = ?`, [animeId]
    );

    // Añade respuestas a cada comentario
    for (const comentario of comments) {
      const [responses] = await connection.promise().query(
        `SELECT r.*, u.nombre AS usuario_nombre, uf.foto AS usuario_foto
         FROM respuestas r
         JOIN usuarios u ON r.usuario_id = u.id
         JOIN usuario_fotos uf ON u.foto_id = uf.id
         WHERE r.comentario_id = ?`,
        [comentario.id]
      );
      comentario.respuestas = responses;
    }

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
      const porcentajeRecomendado = totalVotos > 0 ? Math.round((voteCounts[0].votos_positivos / totalVotos) * 100) : 0;

      const isAuthenticated = req.session.user ? true : false;

      res.render('anime', {
        userId,
        anime: anime,
        user: req.session.user,
        isFavorite,
        userVote: anime.voto,
        porcentajeRecomendado,
        isAuthenticated,
        comentarios: comments
      });
    } else {
      res.status(404).send('Anime not found');
    }
  } catch (error) {
    console.error('Error al obtener el anime:', error);
    res.status(500).json({ success: false, message: 'Error al obtener el anime' });
  }
});


module.exports = router;