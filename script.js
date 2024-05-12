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

const searchInputGroup = document.getElementById("searchInputGroup");
const profileOptions = document.getElementById("profileOptions");

function toggleSearchInput() {
    
    if (searchInputGroup.style.display === "none") {
        searchInputGroup.style.display = "flex";
        profileOptions.style.display = "none";
    } else {
        searchInputGroup.style.display = "none";
    }
}

function toggleProfileOptions() {
    if(profileOptions.style.display === "none")
    {
        profileOptions.style.display = "block";
        searchInputGroup.style.display = "none";
    }else{
        profileOptions.style.display = "none";
    }

}
function login() {
    console.log("Iniciando sesión...");
}

function logup() {
    console.log("Registrarse...");
}
