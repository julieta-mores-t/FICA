// Obtener nombre y apellido de localStorage
const nombre = localStorage.getItem("nombre");
const apellido = localStorage.getItem("apellido");
const emailUsuario = localStorage.getItem("mail");

document.addEventListener("DOMContentLoaded", () => {
    if (nombre && apellido) {
        document.getElementById("nombreApellido").textContent = `${apellido} ${nombre}`;
        document.getElementById("emailUsuario").textContent = `${emailUsuario}`;
    } else {
        console.error("Nombre y apellido no encontrados en localStorage");
    }
    cargarMateriales();
});


//BOTÓN DE BUSCAR (filtra por codigo,nombre,proveedor y estado)
const searchInput = document.getElementById('buscarInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const productoRows = document.querySelectorAll('#materiales-body tr');

    productoRows.forEach(row => {
        const codigo = row.cells[0].textContent.toLowerCase();
        const nombre = row.cells[1].textContent.toLowerCase();
        const proveedor = row.cells[2].textContent.toLowerCase();
        const estado = row.cells[5].textContent.toLowerCase();
        if (
            codigo.includes(searchText) ||
            nombre.includes(searchText) ||
            proveedor.includes(searchText) ||
            estado.includes(searchText)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


// Función para cargar proveedores en el select
function cargarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => response.json())
        .then(proveedores => {
            const proveedorSelect = document.getElementById('proveedor');
            proveedorSelect.innerHTML = '<option value=""></option>' +
                proveedores.map(proveedor => `<option value="${proveedor.nombre}">${proveedor.nombre}</option>`).join('');
        })
        .catch(error => console.error('Error al cargar los proveedores:', error));
}

// Función para cargar materiales en la tabla
function cargarMateriales() {
    fetch("http://127.0.0.1:5000/api/mostrar_stock")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(materiales => {
            const tbody = document.getElementById('materiales-body');
            tbody.innerHTML = materiales.map(material => `
                <tr>
                    <td>${material.codigo}</td>
                    <td>${material.material}</td>
                    <td>${material.proveedor}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.precio_venta}</td>
                    <td><span class="badge ${material.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${material.estado}</span></td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los materiales:', error));
}