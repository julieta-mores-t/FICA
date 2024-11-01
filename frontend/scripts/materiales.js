document.addEventListener("DOMContentLoaded", function() {
    
    const productosCard = document.getElementById('productos-card');
    const stockCard = document.getElementById('stock-card');

    productosCard.addEventListener('click', function() {
        window.location.href = 'productos.html'; 
    });

    
    stockCard.addEventListener('click', function() {
        window.location.href = 'stock.html'; 
    });

});


// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        // Mostrar el nombre y apellido en los elementos correspondientes
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
});