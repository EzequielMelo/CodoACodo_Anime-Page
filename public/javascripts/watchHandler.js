document.addEventListener('DOMContentLoaded', function () {
  const Animeflv = require('animeflv');

  Animeflv.search('Naruto').then(results => {
    console.log(results); // Mostrar los resultados de búsqueda
  }).catch(err => {
    console.error('Error al buscar animes:', err);
  });
});