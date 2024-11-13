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


//BOTÓN DE BUSCAR (filtra por nombre)
const searchInput = document.getElementById('buscarInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const productoRows = document.querySelectorAll('#materiales-body tr');

    productoRows.forEach(row => {
        const codigoProducto = row.cells[0].textContent.toLowerCase();
        const nombreProducto = row.cells[1].textContent.toLowerCase();
        const proveedorProducto = row.cells[3].textContent.toLowerCase();
        const estadoProducto = row.cells[9].textContent.toLowerCase();
        if (
            codigoProducto.includes(searchText) ||
            nombreProducto.includes(searchText) ||
            proveedorProducto.includes(searchText) ||
            estadoProducto.includes(searchText)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});



// Referencias a los elementos del DOM
const modal = document.getElementById("materialModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.querySelector(".close");

const confirmModal = document.getElementById("confirmModal");
const successModal = document.getElementById("successModal");

// Abrir y cerrar el modal principal
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    cargarProveedores();
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Función para abrir el modal de confirmación
function openConfirmModal() {
    confirmModal.style.display = "block";
}

// Función para cerrar cualquier modal por su ID
function closeModalById(modalId) {
    document.getElementById(modalId).style.display = "none";
}

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
    fetch('http://127.0.0.1:5000/api/mostrar_material')
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
                    <td>${material.unidad_medida}</td>
                    <td>${material.proveedor}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.fecha_ingreso}</td>
                    <td>${material.ganancia}</td>
                    <td>${material.precio}</td>
                    <td>${material.precio_venta}</td>
                    <td><span class="badge ${material.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${material.estado}</span></td>
                    <td class="actions">
                        <a href="#">Editar</a>
                        <a href="#">Detalle</a>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los materiales:', error));
}

// Función para confirmar el guardado y enviar los datos
function confirmSave() {
    closeModalById("confirmModal");

    // Mostrar el mensaje de éxito
    successModal.style.display = "block";

    // Llamada para guardar los datos en la base de datos
    guardarDatosEnBaseDeDatos();
}

// Función para guardar datos en la base de datos
function guardarDatosEnBaseDeDatos() {
    const datos = {
        material: document.getElementById("material").value,
        cantidad: document.getElementById("cantidad").value,
        unidad_medida: document.getElementById("unidad_medida").value,
        ganancia: document.getElementById("ganancia").value,
        proveedor: document.getElementById("proveedor").value,
        precio: document.getElementById("precio").value,
        precio_venta: document.getElementById("precio_venta").value,
    };

    fetch("http://127.0.0.1:5000/api/agregar_material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById("materialForm").reset();
            cargarMateriales();
            modal.style.display = "none"; // Cierra el modal principal
        })
        .catch(error => console.error('Error al agregar el material:', error));
}

// Mostrar el modal de confirmación al hacer submit
document.getElementById("materialForm").addEventListener("submit", (event) => {
    event.preventDefault();
    openConfirmModal();
});

// Cerrar el modal de éxito después de unos segundos
successModal.addEventListener("click", () => {
    closeModalById("successModal");
});

window.addEventListener("click", (event) => {
    if (event.target === confirmModal) {
        confirmModal.style.display = "none";
    }
    if (event.target === successModal) {
        successModal.style.display = "none";
    }
});
