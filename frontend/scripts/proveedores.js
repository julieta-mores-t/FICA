// Obtener nombre y apellido de localStorage para navbar
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

document.addEventListener('DOMContentLoaded', () => {
    mostrarProveedores();
});

// Muestra lista de proveedores
function mostrarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(proveedoresList => {
            const tbody = document.getElementById('proveedores-body');
            tbody.innerHTML = proveedoresList.map(proveedor => `
                <tr class="proveedor-row">
                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.razon_social}</td>
                    <td>${proveedor.ciudad}</td>
                    <td>${proveedor.direccion}</td>
                    <td>${proveedor.fecha_ingreso}</td>
                    <td>${proveedor.mail}</td>
                    <td>${proveedor.cuit}</td>
                    <td>${proveedor.telefono}</td>
                    <td><span class="badge ${proveedor.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${proveedor.estado}</span></td>
                    <td class="actions">
                        <a href="#">Editar</a>
                        <a href="#">Detalle</a>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los proveedores:', error));
}

// AGREGAR PROVEEDOR
document.getElementById("proveedorForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        razon_social: document.getElementById("razon_social").value,
        ciudad: document.getElementById("ciudad").value,
        direccion: document.getElementById("direccion").value,
        fecha_ingreso: document.getElementById("fecha_ingreso").value,
        mail: document.getElementById("mail").value,
        cuit: document.getElementById("cuit").value,
        telefono: document.getElementById("telefono").value,
    };

    fetch("http://127.0.0.1:5000/api/agregar_porveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(() => {
            document.getElementById("proveedorForm").reset();
            mostrarProveedores();
        })
        .catch(error => console.error('Error al agregar el proveedor:', error));
});


//BOTÓN DE BUSCAR (filtra por nombre)
mostrarProveedores();
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const proveedoresRows = document.querySelectorAll('.proveedor-row');
    proveedoresRows.forEach(row => {
        const nombreProveedor = row.cells[0].textContent.toLowerCase(); 
        if (nombreProveedor.startsWith(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

