
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar la tarjeta de Materiales por su id
    const materialesCard = document.getElementById('materiales-card');
    const rrhhCard = document.getElementById('rrhh-card');
    const ventasCard = document.getElementById('ventas-card');

    // Añadir un evento de clic para redirigir a materiales.html
    materialesCard.addEventListener('click', function() {
        window.location.href = 'materiales.html'; // Redirigir a la página de Materiales
    });

    // Añadir un evento de clic para redirigir a rrhh.html
    rrhhCard.addEventListener('click', function() {
        window.location.href = 'rrhh.html'; // Redirigir a la página de RRHH
    });

    // Añadir un evento de clic para redirigir a ventas.html
    ventasCard.addEventListener('click', function() {
        window.location.href = 'ventas.html'; // Redirigir a la página de Ventas
    });
});


// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        // Mostrar el nombre y apellido en los elementos correspondientes
        document.getElementById("bienvenidaNombre").textContent = `${nombre} ${apellido}`;
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
});
