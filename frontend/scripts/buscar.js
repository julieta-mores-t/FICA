
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

function search() {
    const query = searchInput.value.trim();
    if (query) {
        alert(`Buscando: ${query}`);
        // Aquí puedes agregar lógica de búsqueda
    }
}

// Evento para el ícono de búsqueda
searchIcon.addEventListener('click', search);

// Evento para la tecla Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
})
