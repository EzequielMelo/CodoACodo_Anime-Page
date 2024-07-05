document.addEventListener("DOMContentLoaded", function () {

  const commentsContainer = document.querySelector('.comments-container');

  const maxLength = 350;
  const descriptions = document.querySelectorAll('.text-limit');
  descriptions.forEach(description => {
    const text = description.innerHTML;
    if (text.length > maxLength) {
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

  if (commentsContainer) {
    commentsContainer.addEventListener('click', function (event) {
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

