document.addEventListener('DOMContentLoaded', () => {
    mostrarProveedores();
});

// Cargar lista de stock
function mostrarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(proveedoresList => {
            const tbody = document.getElementById('proveedores-body');
            tbody.innerHTML = proveedoresList.map(proveedores => `
                <tr>
                    <td>${proveedores.id}</td>
                    <td>${proveedores.mail}</td>
                    <td>${proveedores.nombre}</td>
                    <td>${proveedores.telefono}</td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar el proveedor:', error));
}

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