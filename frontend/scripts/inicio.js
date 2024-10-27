
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
