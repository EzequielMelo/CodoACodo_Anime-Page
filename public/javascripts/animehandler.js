document.addEventListener('DOMContentLoaded', function () {
  const seasonSelect = document.getElementById('season-select');
  const episodeList = document.getElementById('episode-list');
  const episodes = episodeList.querySelectorAll('li');
  const favoriteButton = document.getElementById('add-to-favorites');
  const voteButtons = document.querySelectorAll('.vote-button');
  const buttonContainer = document.getElementsByClassName('button-container')[0];
  const userVote = buttonContainer.getAttribute('data-user-vote');
  const positiveButton = document.getElementById('positive-vote-button');
  const negativeButton = document.getElementById('negative-vote-button');

  /*---------------------------------FILTRAR EPISODIOS---------------------------------*/
  function filterEpisodes() {
    const selectedSeason = seasonSelect.value;
    episodes.forEach(episode => {
      if (episode.dataset.season === selectedSeason) {
        episode.style.display = '';
      } else {
        episode.style.display = 'none';
      }
    });
  }
  seasonSelect.addEventListener('change', filterEpisodes);
  filterEpisodes(); // Initial filter

  /*---------------------------------FUNCIONAMIENTO DE FAVORITOS---------------------------------*/
  favoriteButton.addEventListener('click', function () {
    const animeId = this.dataset.animeId;
    const action = favoriteButton.textContent.trim() === 'Añadir a favoritos' ? 'add' : 'remove';

    fetch(`/favorites/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ anime_id: animeId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          favoriteButton.innerHTML = action === 'add' ? '<i class="bi bi-heartbreak"></i> Quitar de favoritos' : '<i class="bi bi-heart"></i> Añadir a favoritos';
          Swal.fire({
            title: action === 'add' ? '¡Agregado!' : '¡Eliminado!',
            text: action === 'add' ? 'Anime agregado a favoritos' : 'Anime eliminado de favoritos',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al procesar la solicitud',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  });

  /*---------------------------------VOTACION DE LOS ANIMES---------------------------------*/

  voteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const animeId = this.dataset.animeId; // Asegúrate de que sea 'data-anime-id'
      const voto = this.dataset.voto; // 'positivo' o 'negativo'

      fetch(`/votes/${animeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ voto })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const positiveButton = document.querySelector('.vote-button[data-voto="positivo"]');
            const negativeButton = document.querySelector('.vote-button[data-voto="negativo"]');

            if (voto === 'positivo') {
              positiveButton.classList.add('voted-positive');
              positiveButton.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Puntuado';
              negativeButton.classList.remove('voted-negative');
              negativeButton.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Puntuar';
              positiveButton.classList.add('voted-positive');
              positiveButton.classList.remove('voted-negative');
              negativeButton.classList.remove('voted-negative');
            } else {
              positiveButton.classList.remove('voted-positive');
              positiveButton.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Puntuar';
              negativeButton.classList.add('voted-negative');
              negativeButton.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Puntuado';
              negativeButton.classList.add('voted-negative');
              negativeButton.classList.remove('voted-positive');
              positiveButton.classList.remove('voted-positive');
            }

            Swal.fire({
              title: '¡Voto registrado!',
              text: data.message,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al registrar tu voto.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    });
  });

  /*---------------------------------CARGA INICIAL DEL ESTADO DE LOS BOTONES DE VOTACION---------------------------------*/
  if (userVote === 'positivo') {
    positiveButton.classList.add('voted-positive');
    positiveButton.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Puntuado';
    negativeButton.classList.remove('voted-negative');
    negativeButton.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Puntuar';
  } else if (userVote === 'negativo') {
    positiveButton.classList.remove('voted-positive');
    positiveButton.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Puntuar';
    negativeButton.classList.add('voted-negative');
    negativeButton.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Puntuado';
  }

  /*---------------------------------LOGICA COMENTAR---------------------------------*/

  const commentForm = document.getElementById('add-comment-form');

  if (commentForm) {
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const commentText = document.getElementById('comment-text').value;
      const rating = document.getElementById('rating').value;
      const animeId = this.getAttribute('data-anime-id');

      fetch(`/comments/${animeId}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario: commentText, valoracion: rating })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            location.reload(); // Recargar la página para ver el nuevo comentario
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: (data.message),
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.error('Error al añadir comentario:', error);
        });
    });
  }

  /*---------------------------------LOGICA ELIMINAR COMENTARIO---------------------------------*/

  document.querySelectorAll('.deleteComment').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const commentId = this.closest('.user-comment').getAttribute('data-comment-id');
      console.log(commentId)

      fetch(`/comments/${commentId}/comentarios/borrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentarioId: commentId })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            location.reload(); // Recargar la página para ver el comentario borrado
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.error('Error al borrar comentario:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error al borrar comentario',
            showConfirmButton: false,
            timer: 1500
          });
        });
    });
  });

  /*---------------------------------LOGICA RESPUESTAS A COMENTARIOS---------------------------------*/

  const responseForms = document.querySelectorAll('.response-form');

  responseForms.forEach(form => {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const comentarioId = form.getAttribute('data-comentario-id');
      const respuestaText = form.querySelector('textarea').value;

      if (respuestaText.trim() === '') {
        Swal.fire({
          position: "top-end",
          icon: 'error',
          title: "La respuesta no puede estar vacía.",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      try {
        const response = await fetch(`/comments/${comentarioId}/respuestas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ respuesta: respuestaText })
        });

        const result = await response.json();

        if (result.success) {
          // Recargar los comentarios para incluir la nueva respuesta
          location.reload();
        } else {
          Swal.fire({
            position: "top-end",
            icon: 'error',
            title: "Error al agregar respuesta.",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: 'error',
          title: "Error al agregar respuesta."(error),
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  });

  // Selecciona todos los botones de mostrar respuestas
  const showResponseButtons = document.querySelectorAll('.show-responses');

  if (showResponseButtons) {
    showResponseButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Encuentra el contenedor de respuestas más cercano
        const responses = this.closest('.user-comment').querySelector('.responses');

        // Alterna la visibilidad del contenedor de respuestas
        if (responses.style.display === 'none') {
          responses.style.display = 'block';
        } else {
          responses.style.display = 'none';
        }
      });
    });
  }

  const showResponseTextArea = document.querySelectorAll('.showTextArea');
  if (showResponseTextArea) {
    showResponseTextArea.forEach(button => {
      button.addEventListener('click', function () {
        // Encuentra el contenedor de respuestas más cercano
        const textAreas = this.closest('.user-comment').querySelector('.response-form');

        // Alterna la visibilidad del contenedor de respuestas
        if (textAreas.style.display === 'none') {
          textAreas.style.display = 'block';
        } else {
          textAreas.style.display = 'none';
        }
      });
    });
  }
  /*---------------------------------LOGICA ELIMINAR RESPUESTAS---------------------------------*/

  document.querySelectorAll('.deleteResponse').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const responseId = this.closest('.response').getAttribute('data-response-id');
      const commentId = this.closest('.user-comment').getAttribute('data-comment-id');
      console.log(responseId);
      console.log(commentId);

      fetch(`/comments/${commentId}/${responseId}/borrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ respuestaId: responseId, comentarioId: commentId })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            location.reload(); // Recargar la página para ver el comentario borrado
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.error('Error al borrar respuesta:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error al borrar respuesta',
            showConfirmButton: false,
            timer: 1500
          });
        });
    });
  });
});
