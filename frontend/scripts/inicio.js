// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");
const emailUsuario = localStorage.getItem("mail");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        // Mostrar el nombre y apellido en los elementos correspondientes
        document.getElementById("bienvenidaNombre").textContent = `${nombre} ${apellido}`;
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
        document.getElementById("emailUsuario").textContent = `${emailUsuario}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
});


   // Seleccionar Card de Materiales por su id
document.addEventListener("DOMContentLoaded", function() {
    const materialesCard = document.getElementById('materiales-card');
    const rrhhCard = document.getElementById('rrhh-card');
    const ventasCard = document.getElementById('ventas-card');
    const administracionCard = document.getElementById('administracion-card');

    // Añadir un evento de clic para redirigir a materiales.html
    materialesCard.addEventListener('click', function() {
        window.location.href = 'materiales.html'; 
    });

    // Añadir un evento de clic para redirigir a rrhh.html
    rrhhCard.addEventListener('click', function() {
        window.location.href = 'rrhh.html'; 
    });

    // Añadir un evento de clic para redirigir a ventas.html
    ventasCard.addEventListener('click', function() {
        window.location.href = 'ventas.html'; 
    });

    // Añadir un evento de clic para redirigir a administracion.html
    administracionCardCard.addEventListener('click', function() {
        window.location.href = 'administracion.html'; 
    });
});



