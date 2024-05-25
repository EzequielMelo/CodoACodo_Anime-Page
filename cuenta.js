const LogButton = document.getElementById("LogButton");
const userInput = document.getElementById("userInput");
const title = document.getElementById("title");
const LogUp= document.getElementById("LogUp");
const LogIn = document.getElementById("LogIn");
const forgotID = document.getElementById("forgotID");

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

const form = document.querySelector('#form-account');

const CreateAccount = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    //Transforma a un objeto los datos recibidos del formulario.
    const user = Object.fromEntries(data.entries());
    console.log(JSON.stringify(user));

}

form.addEventListener('submit', CreateAccount);
