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
                    <td>${material.precio_cantidad}</td>
                    <td>${material.precio_venta}</td>
                    <td><span class="badge ${material.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${material.estado}</span></td>
                    <td class="actions">
                        <a href="#" class="btn-editar" data-id="${material.id}">Editar</a>
                        <a href="#" class="btn-detalle" data-id="${material.id}">Detalle</a>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los materiales:', error));
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
        material: document.getElementById("material").value,
        cantidad: document.getElementById("cantidad").value,
        unidad_medida: document.getElementById("unidad_medida").value,
        ganancia: document.getElementById("ganancia").value,
        detalle: document.getElementById("detalle").value,
        proveedor: document.getElementById("proveedor").value,
        precio_cantidad: document.getElementById("precio_cantidad").value,
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
            modal.style.display = "none";
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

// Cargar los materiales al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarMateriales();
});




   //***EDITAR PRODUCTO***//

// Seleccionamos el modal y los campos del formulario de edición tambien sirve para el de detalle hay que hacer otro modal y otro codigo como este solo para el detalle
const editarModal = document.getElementById('editarModal');
const closeEditBtn = editarModal.querySelector('.closeEdit'); // Botón para cerrar el modal

// Abrir el modal al hacer clic en "Editar"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-editar')) {
        event.preventDefault(); // Evitar la acción predeterminada del enlace

        // Obtener el ID del material desde el atributo data-id
        const materialId = event.target.getAttribute('data-id');
        

        // Abrir el modal de edición
        const editarModal = document.getElementById('editarModal');
        editarModal.style.display = 'block';

        // Llamar al API para obtener los datos del material
        fetch(`http://127.0.0.1:5000/api/mostrar_un_material/${materialId}`)
            .then(response => response.json())
            .then(data => {
                

                // Llenar los campos del formulario con los datos obtenidos
                document.getElementById('editar-material').value = data.material;
                document.getElementById('editar-cantidad').value = data.cantidad;
                document.getElementById('editar-unidad-medida').value = data.unidad_medida;
                document.getElementById('editar-proveedor').value = data.proveedor;
                document.getElementById('editar-precio-compra').value = data.precio_cantidad;
                document.getElementById('editar-ganancia').value = data.ganancia;
                document.getElementById('editar-detalle').value = data.detalle || '';  // significa que si arroja falso el resultado, coloca vacio en el imput
                document.getElementById('editar-estado').value = data.estado;

                // Asignar el ID del material al campo de material
                document.getElementById('editar-material').setAttribute('data-id', materialId);
            })
            .catch(error => {
                console.error('Error al obtener los datos del material:', error);
            });
    }
});



// Botón de guardar cambios en el modal de edición
document.getElementById("guardarCambiosBtn").addEventListener("click", () => {
    // Obtener los datos del formulario de edición
    const materialId = document.getElementById("editar-material").getAttribute('data-id'); 
    const material = document.getElementById("editar-material").value;
    const cantidad = document.getElementById("editar-cantidad").value;
    const estado = document.getElementById("editar-estado").value;
    const proveedor = document.getElementById("editar-proveedor").value;
    const ganancia = document.getElementById("editar-ganancia").value;
    const detalle = document.getElementById("editar-detalle").value;
    const unidad_medida = document.getElementById("editar-unidad-medida").value;
    const precio_cantidad = document.getElementById("editar-precio-compra").value;

    // Crea el objeto JSON que se enviará
    const datos = {
        material,
        cantidad,
        estado,
        proveedor,
        ganancia,
        detalle,
        unidad_medida,
        precio_cantidad
    };

    // Realizar la solicitud PUT
    fetch(`http://127.0.0.1:5000/api/editar_materiales/${materialId}`, {
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
        console.log("Material actualizado:", data);
        
        editarModal.style.display = 'none'; // Cerrar el modal
        cargarMateriales();  
    })
    .catch(error => {
        console.error("Error al actualizar el material:", error);
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


//***DETALLE DEL PRODUCTO***//

// Seleccionamos el modal y el botón para cerrar
const detalleModal = document.getElementById('detalleModal');
const closeDetailBtn = detalleModal.querySelector('.closeDetail'); // Botón para cerrar el modal

// Abrir el modal al hacer clic en "Detalle"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-detalle')) {
        event.preventDefault(); 

        // Obtener el ID del material desde el atributo data-id
        const materialId = event.target.getAttribute('data-id');

        // Abrir el modal de detalle
        detalleModal.style.display = 'block';

        // Llamar al API para obtener los datos del material
        fetch(`http://127.0.0.1:5000/api/mostrar_un_material/${materialId}`)
            .then(response => response.json())
            .then(data => {
                // Llenar los campos del modal con los datos obtenidos
                document.getElementById('detalle-nombre').textContent = data.material;
                document.getElementById('detalle-cantidad').textContent = data.cantidad;
                document.getElementById('detalle-unidad-medida').textContent = data.unidad_medida;
                document.getElementById('detalle-proveedor').textContent = data.proveedor;
                document.getElementById('detalle-precio-compra').textContent = `$ ${data.precio_cantidad}`;
                document.getElementById('detalle-ganancia').textContent = `${data.ganancia}%`;
                document.getElementById('detalle-detalle').textContent = data.detalle || 'Sin detalle';
                document.getElementById('detalle-precio-final').textContent = `$ ${data.precio_venta}`;
                document.getElementById('detalle-estado').textContent = data.estado;
            })
            .catch(error => {
                console.error('Error al obtener los datos del material:', error);
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
