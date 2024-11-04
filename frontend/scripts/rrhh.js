document.addEventListener("DOMContentLoaded", function() {
    
    const proveedoresCard = document.getElementById('proveedores-card');
    const sociosCard = document.getElementById('socios-card');
    const empleadosCard = document.getElementById('empleados-card');

    proveedoresCard.addEventListener('click', function() {
        window.location.href = 'proveedores.html'; 
    });

    
    sociosCard.addEventListener('click', function() {
        window.location.href = 'socios.html'; 
    });

    empleadosCard.addEventListener('click', function() {
        window.location.href = 'empleados.html'; 
    });

});


// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");
const emailUsuario = localStorage.getItem("mail");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        // Mostrar el nombre y apellido en los elementos correspondientes
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
        document.getElementById("emailUsuario").textContent = `${emailUsuario}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
});