document.addEventListener("DOMContentLoaded", function(event) {
    const maxLength = 300;
    const descriptions = document.querySelectorAll('.text-limit');
    descriptions.forEach(description => {
        const text = description.innerHTML;
        if (text.length > maxLength) {
            const truncatedText = text.substring(0, maxLength) + '...';
            description.innerHTML = truncatedText;
        }
    });
});