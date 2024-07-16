document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    });
  } else {
    console.error('searchForm o searchInput no encontrado');
  }
});