$(document).ready(function () {
  // Configuración de validación con jQuery Validator
  $("#form-account").validate({
    rules: {
      usuario: {
        required: true,
        minlength: 3,
        maxlength: 30
      },
      email: {
        required: true,
        email: true
      },
      contraseña: {
        required: true,
        minlength: 3,
        maxlength: 30
      }
    },
    messages: {
      usuario: {
        required: "Por favor ingrese un usuario",
        minlength: "El usuario debe tener al menos 3 caracteres",
        maxlength: "El usuario no debe tener más de 30 caracteres"
      },
      email: {
        required: "Por favor ingrese un correo electrónico",
        email: "Por favor ingrese un correo electrónico válido"
      },
      contraseña: {
        required: "Por favor ingrese una contraseña",
        minlength: "La contraseña debe tener al menos 3 caracteres",
        maxlength: "La contraseña no debe tener más de 30 caracteres"
      }
    },
    submitHandler: function (form) {
      // Si el formulario es válido, proceder con el registro usando fetch
      event.preventDefault();
      const formData = new FormData(form);
      const user = Object.fromEntries(formData.entries());

      fetch('/register', {
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
              title: 'Registrado!',
              text: 'Usuario registrado exitosamente',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/login'; // Redirige al inicio de la página
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
            text: 'Ocurrió un error al registrar el usuario: Usuario existente',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  });
});