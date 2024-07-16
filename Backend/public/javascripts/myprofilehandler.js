document.addEventListener('DOMContentLoaded', function () {
  const openPopupBtn = document.getElementById('open-popup-btn');
  const popup = document.getElementById('popup');
  const closePopupBtn = document.getElementById('close-popup-btn');
  const cancelPopupBtn = document.getElementById('cancel-popup-btn');
  const popupForm = document.getElementById('popup-form');

  openPopupBtn.addEventListener('click', function () {
    popup.style.display = 'flex';
  });

  closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  cancelPopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  popupForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const selectedElement = document.querySelector('input[name="element"]:checked');

    if (selectedElement) {
      const selectedPhotoId = selectedElement.value;

      try {
        const response = await fetch('myprofile/update-photo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ photoId: selectedPhotoId })
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Foto actualizada.",
            showConfirmButton: false,
            timer: 1500
          });
          var delayInMilliseconds = 1000;

          setTimeout(function () {
            popup.style.display = 'none';
            location.reload();
          }, delayInMilliseconds);
        } else {
          Swal.fire({
            position: "top-end",
            icon: 'error',
            title: "Error al actualizar la foto",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: 'error',
          title: "Error al actualizar la foto"(error),
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: 'error',
        title: "Por favor seleccione una foto",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
});
