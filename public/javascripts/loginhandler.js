document.getElementById('form-account').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const user = Object.fromEntries(formData.entries());

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Swal.fire({
          title: 'Acceso exitoso!',
          text: 'Sesión iniciada',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/'; // Redirige a la página principal o perfil
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al iniciar sesión',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
});