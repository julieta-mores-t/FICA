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


//BOTÓN DE BUSCAR (filtra por nombre,razon social,cuit y estado)
const searchInput = document.getElementById('buscarInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const proveedorRows = document.querySelectorAll('#proveedores-body tr');

    proveedorRows.forEach(row => {
        const nombreProveedor = row.cells[1].textContent.toLowerCase();
        const razonSocial = row.cells[3].textContent.toLowerCase();
        const cuit = row.cells[3].textContent.toLowerCase();
        const estadoProveedor = row.cells[9].textContent.toLowerCase();
        if (
            nombreProveedor.includes(searchText) ||
            razonSocial.includes(searchText) ||
            cuit.includes(searchText) ||
            estadoProveedor.includes(searchText)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});




// Referencias a los elementos del DOM
const modal = document.getElementById("proveedorModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.querySelector(".close");
const confirmModal = document.getElementById("confirmModal");
const successModal = document.getElementById("successModal");

// Abrir y cerrar el modal principal
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
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


// Función para cargar materiales en la tabla
function cargarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(proveedores => {
            const tbody = document.getElementById('proveedores-body');
            tbody.innerHTML = proveedores.map(proveedor => `
                <tr>
                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.razon_social}</td>
                    <td>${proveedor.ciudad}</td>
                    <td>${proveedor.domicilio}</td>
                    <td>${proveedor.fecha_ingreso}</td>
                    <td>${proveedor.mail}</td>
                    <td>${proveedor.cuit}</td>
                    <td>${proveedor.telefono}</td>
                    <td><span class="badge ${proveedor.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${proveedor.estado}</span></td>
                    <td class="actions">
                        <a href="#" class="btn-editar" data-id="${proveedor.id}">Editar</a>
                        <a href="#" class="btn-detalle" data-id="${proveedor.id}">Detalle</a>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los proveedores:', error));
}

// Función para confirmar el guardado y enviar los datos
function confirmSave() {
    closeModalById("confirmModal");
    successModal.style.display = "block";
    guardarDatosEnBaseDeDatos();
}


// Función para guardar datos en la base de datos
function guardarDatosEnBaseDeDatos() {
    const datos = {
        nombre: document.getElementById("nombre").value,
        razonSocial: document.getElementById("razon_social").value,
        ciudad: document.getElementById("ciudad").value,
        domicilio: document.getElementById("domicilio").value,
        email: document.getElementById("mail").value,
        cuit: document.getElementById("cuit").value,
        telefono: document.getElementById("telefono").value,
    };

    fetch("http://127.0.0.1:5000/api/agregar_proveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById("proveedorForm").reset();
            cargarProveedores();
            modal.style.display = "none";
        })
        .catch(error => console.error('Error al agregar el proveedor:', error));
}


// Mostrar el modal de confirmación al hacer submit
document.getElementById("proveedorForm").addEventListener("submit", (event) => {
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


// Cerrar modal al hacer clic en el botón de cierre
document.querySelector(".closeEdit").addEventListener("click", () => {
    document.getElementById("editarModal").style.display = "none";
});

window.addEventListener("click", event => {
    const modal = document.getElementById("editarModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Cargar los proveedores al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProveedores();
});


//***EDITAR PROVEEDOR***//
const editarModal = document.getElementById('editarModal');
const closeEditBtn = editarModal.querySelector('.closeEdit');

// Abrir el modal al hacer clic en "Editar"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-editar')) {
        event.preventDefault();
        // Obtener el ID del proveedor desde el atributo data-id
        const proveedorId = event.target.getAttribute('data-id');


        // Abrir el modal de edición
        const editarModal = document.getElementById('editarModal');
        editarModal.style.display = 'block';

        // Llamar al API para obtener los datos del material
        fetch(`http://127.0.0.1:5000/api/mostrar_un_proveedor/${materialId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nombre').value = data.nombre;
                document.getElementById('cuit').value = data.cuit;
                document.getElementById('razon_social').value = data.razonSocial;
                document.getElementById('ciudad').value = data.ciudad;
                document.getElementById('codigo_postal').value = data.codigoPostal;
                document.getElementById('barrio').value = data.barrio;
                document.getElementById('direccion').value = data.direccion;
                document.getElementById('numero').value = data.numero;
                document.getElementById('telefono').value = data.telefono;
                document.getElementById('mail').value = data.email;
                document.getElementById('editar-estado').value = data.estado;
                document.getElementById('detalle').value = data.detalle || '';

                // Asignar el ID del proveedor al campo de nombre
                document.getElementById('nombre').setAttribute('data-id', materialId);
            })
            .catch(error => {
                console.error('Error al obtener los datos del proveedor:', error);
            });
    }
});

// Botón de guardar cambios en el modal de edición
document.getElementById("guardarCambiosBtn").addEventListener("click", () => {
    // Obtener los datos del formulario de edición
    const nombreId = document.getElementById("nombre").getAttribute('data-id');
    const nombre = document.getElementById("nombre").value;
    const cuit = document.getElementById("cuit").value;
    const razonSocial = document.getElementById("razon_social").value;
    const ciudad = document.getElementById("ciudad").value;
    const codigoPostal = document.getElementById("codigo_postal").value;
    const barrio = document.getElementById("barrio").value;
    const direccion = document.getElementById("direccion").value;
    const numero = document.getElementById("numero").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("mail").value;

    // Crea el objeto JSON que se enviará
    const datos = {
        nombre,
        cuit,
        razonSocial,
        ciudad,
        codigoPostal,
        barrio,
        direccion,
        numero,
        telefono,
        email
    };

    // Realizar la solicitud PUT
    fetch(`http://127.0.0.1:5000/api/editar_proveedor/${nombreId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al guardar los cambios");
            }
        })
        .then(data => {
            console.log("Proveedor actualizado:", data);

            editarModal.style.display = 'none'; 
            cargarProveedores();
        })
        .catch(error => {
            console.error("Error al actualizar el proveedor:", error);
            alert("Hubo un problema al guardar los cambios. Inténtalo nuevamente.");
        });
});


// Cerrar el modal al hacer clic en el botón de cierre
closeEditBtn.addEventListener('click', () => {
    editarModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === editarModal) {
        editarModal.style.display = 'none';
    }
});


//***DETALLE DEL PROVEEDOR***//

// Seleccionamos el modal y el botón para cerrar
const detalleModal = document.getElementById('detalleModal');
const closeDetailBtn = detalleModal.querySelector('.closeDetail'); 

// Abrir el modal al hacer clic en "Detalle"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-detalle')) {
        event.preventDefault();

        // Obtener el ID del material desde el atributo data-id
        const nombreId = event.target.getAttribute('data-id');

        // Abrir el modal de detalle
        detalleModal.style.display = 'block';

        // Llamar al API para obtener los datos del material
        fetch(`http://127.0.0.1:5000/api/mostrar_un_proveedor/${nombreId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('detalle-nombre').textContent = data.nombre;
                document.getElementById('detalle-razon-social').textContent = data.razonSocial;
                document.getElementById('detalle-cuit').textContent = data.cuit;
                document.getElementById('detalle-mail').textContent = data.email;
                document.getElementById('detalle-telefono').textContent = data.telefono;
                document.getElementById('detalle-ciudad').textContent = data.ciudad;
                document.getElementById('detalle-codigo-postal').textContent = data.codigoPostal;
                document.getElementById('detalle-barrio').textContent = data.barrio;
                document.getElementById('detalle-direccion').textContent = data.direccion;
                document.getElementById('detalle-numero').textContent = data.numero;
                document.getElementById('detalle-fecha-ingreso').textContent = data.fechaIngreso;
                document.getElementById('detalle-estado').textContent = data.estado;
            })
            .catch(error => {
                console.error('Error al obtener los datos del proveedor:', error);
                alert('Hubo un problema al cargar los datos del detalle.');
            });
    }
});

// Cerrar el modal al hacer clic en el botón de cierre
closeDetailBtn.addEventListener('click', () => {
    detalleModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === detalleModal) {
        detalleModal.style.display = 'none';
    }
});
