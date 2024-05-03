document.addEventListener("DOMContentLoaded", function(event) {
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
