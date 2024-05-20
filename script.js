document.addEventListener("DOMContentLoaded", function() {
    const LogButton = document.getElementById("LogButton");
    const userInput = document.getElementById("userInput");
    const title = document.getElementById("title");
    const LogUp= document.getElementById("LogUp");
    const LogIn = document.getElementById("LogIn");
    const forgotID = document.getElementById("forgotID");
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
    if (LogIn) {
        LogIn.onclick = function(){
            userInput.style.maxHeight = "0";
            title.innerHTML = "Acceder";
            LogButton.innerHTML = "Acceder";
            LogIn.style.display = "none";
            LogUp.style.display = "inline";
            forgotID.innerHTML = "¿HAS OLVIDADO TU CONTRASEÑA?";
        }
    }
    
    if (LogUp) {
        LogUp.onclick = function(){
            userInput.style.maxHeight = "60px";
            title.innerHTML = "Registrar";
            LogButton.innerHTML = "Crear cuenta";
            LogUp.style.display = "none";
            LogIn.style.display = "inline";
            forgotID.innerHTML = "";
        }
    }

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
                maxlength: 1
            }
        }
    });

    $(".btn-aplicar").click(function(){
        if($("#form1").valid() == false)
        {
            return;
        }
        let email = $("#email").val();
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let telefono =$("#telefono").val();
        let pais = $("#pais").val();
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
        minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
    });
});

