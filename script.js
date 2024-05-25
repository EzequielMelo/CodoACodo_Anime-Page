document.addEventListener("DOMContentLoaded", function() {

    const commentsContainer = document.querySelector('.comments-container');

    const maxLength = 350;
    const descriptions = document.querySelectorAll('.text-limit');
    descriptions.forEach(description => {
        const text = description.innerHTML;
        if (text.length > maxLength){
            let truncatedText = text.substring(0, maxLength);
            if (truncatedText.charAt(truncatedText.length - 1) === ' ') {
                truncatedText += '...';
            } else {
                const lastSpaceIndex = truncatedText.lastIndexOf(' ');
                truncatedText = truncatedText.substring(0, lastSpaceIndex) + '...';
            }
            description.innerHTML = truncatedText;
        }
    });

    jQuery.validator.addMethod("exactlength", function(value, element, param) {
        return this.optional(element) || value.length == param;
    }, $.validator.format("Por favor ingrese {0} characteres."));

    $("#form1").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3,
                maxlength: 30,
            },
            apellido: {
                required: true,
                minlength: 3,
                maxlength: 30,
            },
            email: {
                required: true,
                email: true
            },
            telefono: {
                required: true,
                number: true
            },
            pais: {
                required: true,
                minlength: 3,
                maxlength: 30
            },
            terminos: {
                required: true,
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "terminos") {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $(".btn-aplicar").click(function(event){
        event.preventDefault();
        if($("#form1").valid() == false)
        {
            return;
        }
        let email = $("#email").val();
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let telefono =$("#telefono").val();
        let pais = $("#pais").val();
        let terminos = $("#checkId").val();
        Swal.fire({
            title: '¡Aplicación Enviada!',
            text: 'Tu aplicación de empleo fue enviada correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../index.html";
            }
        });
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio.",
        remote: "Por favor, rellena este campo.",
        email: "Por favor, escribe una dirección de correo válida",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número entero válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Por favor, escribe el mismo valor de nuevo.",
        accept: "Por favor, escribe un valor con una extensión aceptada.",
        maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: jQuery.validator.format("Por favor, escriba mas de {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
    });

    if (commentsContainer) {
        commentsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('bi-hand-thumbs-up')) {
                event.target.classList.remove('bi-hand-thumbs-up');
                event.target.classList.add('bi-hand-thumbs-up-fill');
            } else if (event.target.classList.contains('bi-hand-thumbs-up-fill')) {
                event.target.classList.remove('bi-hand-thumbs-up-fill');
                event.target.classList.add('bi-hand-thumbs-up');
            }
        });
    }
});

