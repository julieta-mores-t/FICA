// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        document.getElementById("bienvenidaNombre").textContent = `${nombre} ${apellido}`;
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
});



const empleado = {
    "apellido": "Martini",
    "clave": "$2b$12$wrLvoN7g0SF3N0teUXF0CeU44aB/W1MECeex.kDmURFUPCk67AXpq",
    "direccion": "valeriano 120",
    "dni": "31568987",
    "estado": "alta",
    "fechaNacimiento": "Sun, 19 Jul 1987 00:00:00 GMT",
    "fecha_ingreso": "Fri, 05 Nov 2021 00:00:00 GMT",
    "id": 8,
    "mail": "gonza.mart@example.com",
    "nombre": "Gonzalo",
    "puesto": "administrador",
    "telefono": "3512895654",
    "usuario": "prueba"
};

// Función para obtener nombre y apellido del empleado
function obtenerNombreCompleto(empleado) {
    const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`;
    return nombreCompleto;
}

// Guardamos el nombre completo en una variable
const nombreCompletoEmpleado = obtenerNombreCompleto(empleado);

// Mostramos el nombre completo en la página empleados.html
document.addEventListener("DOMContentLoaded", () => {
    const nombreElemento = document.getElementById("nombreEmpleado");
    if (nombreElemento) {
        nombreElemento.textContent = nombreCompletoEmpleado;
    }
});

