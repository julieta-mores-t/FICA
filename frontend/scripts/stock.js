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