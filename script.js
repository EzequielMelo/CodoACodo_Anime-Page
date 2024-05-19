const LogButton = document.getElementById("LogButton");
const userInput = document.getElementById("userInput");
const title = document.getElementById("title");
const LogUp= document.getElementById("LogUp");
const LogIn = document.getElementById("LogIn");
const forgotID = document.getElementById("forgotID");

document.addEventListener("DOMContentLoaded", function() {
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
});

LogIn.onclick = function(){
    userInput.style.maxHeight = "0";
    title.innerHTML = "Acceder";
    LogButton.innerHTML = "Acceder";
    LogIn.style.display = "none";
    LogUp.style.display = "inline"
    forgotID.innerHTML = "¿HAS OLVIDADO TU CONTRASEÑA?";
}

LogUp.onclick = function(){
    userInput.style.maxHeight = "60px";
    title.innerHTML = "Registrar";
    LogButton.innerHTML = "Crear cuenta";
    LogUp.style.display = "none";
    LogIn.style.display = "inline";
    forgotID.innerHTML = "";
}

