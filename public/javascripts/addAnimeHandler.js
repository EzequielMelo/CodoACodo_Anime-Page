document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('portada').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const previewImage = document.getElementById('previewCoverImage');
        previewImage.src = e.target.result;
        previewImage.style.display = 'block'; // Mostrar la imagen
      };

      reader.readAsDataURL(file); // Leer el archivo como Data URL
    }
  });

  document.getElementById('nombre').addEventListener('input', function (event) {
    const text = event.target.value;
    document.getElementById('previewAnimeName').textContent = text;
  });

  document.getElementById('descripcion').addEventListener('input', function (event) {
    const text = event.target.value;
    document.getElementById('previewAnimeDescription').textContent = text;
  });

  const addAnime = document.getElementById('form-addAnime');

  if (addAnime) {
    addAnime.addEventListener('submit', function (event) {
      event.preventDefault();

      // Crear un FormData object para manejar tanto los archivos como otros datos
      const formData = new FormData(addAnime);

      // Obtener todos los checkboxes de géneros seleccionados
      const checkboxes = document.querySelectorAll('input[name="generosSeleccionados"]:checked');
      formData.delete('generosSeleccionados');
      checkboxes.forEach(checkbox => {
        formData.append('generosSeleccionados', checkbox.value);
      });

      fetch(`/adminAddAnime`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            addAnime.reset();

            // Mostrar un mensaje de éxito
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Anime añadido exitosamente",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error", //cambiar por error
              title: (data.message),
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.error('Error al añadir anime:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al añadir anime",
            showConfirmButton: false,
            timer: 1500
          });
        });
    });
  }
});