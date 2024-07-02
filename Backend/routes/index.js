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
  connection.query('SELECT * FROM anime', function (error, results, fields) {
    if (error) throw error;
    res.render('index', {data: results});
  });
});

router.get('/anime/:id/:nombre/', function(req, res, next) {
  var animeId = req.params.id;
  var animeNombre = decodeURIComponent(req.params.nombre);

  connection.query(   
  `SELECT 
  a.*,
  COUNT(DISTINCT e.id) AS cantidad_episodios,
  GROUP_CONCAT(DISTINCT g.genero ORDER BY g.genero SEPARATOR ', ') AS generos,
  GROUP_CONCAT(DISTINCT CONCAT_WS('||', e.id, e.temporada, e.nombre, e.descripcion, e.imagencapitulo, e.linkcapitulo) ORDER BY e.id SEPARATOR ';;') AS episodios
  FROM 
  anime a
  JOIN 
  animes_generos ag ON a.id = ag.anime_id
  JOIN 
  generos g ON ag.genero_id = g.id
  LEFT JOIN 
  episodios e ON a.id = e.anime_id
  WHERE 
  a.id = ?
  GROUP BY 
  a.id`, [animeId], function (error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {

      var anime = results[0];
      anime.generos = anime.generos.split(', ');
      anime.episodios = anime.episodios ? anime.episodios.split(';;').map(e => {
        const [id, temporada, nombre, descripcion, imagencapitulo, linkcapitulo] = e.split('||');
        return { id, temporada, nombre, descripcion, imagencapitulo, linkcapitulo };
      }) : [];

      anime.temporadas = [...new Set(anime.episodios.map(e => e.temporada))];

      console.log(anime)
      res.render('anime', { anime: anime });

    } else {
      res.status(404).send('Anime not found');
    }
  });
});

module.exports = router;
