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
    console.log(material);
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



// EDITAAR  PRODUCTOO-- Función para abrir el modal y cargar datos
function abrirModalEdicion(codigoId) {
    
    const modalEditar = document.getElementById("editarModal");
    modalEditar.style.display = "block";

    fetch(`http://127.0.0.1:5000/api/mostrar_material/${codigoId}`)
        .then(response => response.json())
        .then(material => {
            document.getElementById("material").value = material.material || '';
            document.getElementById("cantidad").value = material.cantidad || '';
            document.getElementById("estado").value = material.estado || '';
            document.getElementById("proveedor").value = material.proveedor || '';
            document.getElementById("ganancia").value = material.ganancia || '';
            document.getElementById("detalle").value = material.detalle || '';
            document.getElementById("unidad_medida").value = material.unidad_medida || '';
        })
        .catch(error => console.error('Error al cargar los datos del producto:', error));
}

// Función para agregar eventos a los botones "Editar"
function agregarEventosEditar() {
    document.querySelectorAll(".btn-editar").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            const codigoId = button.getAttribute("data-id");
            abrirModalEdicion(codigoId);
        });
    });
}

// Cerrar modal al hacer clic en el botón de cierre
document.querySelector(".closeEdit").addEventListener("click", () => {
    document.getElementById("editarMaterialModal").style.display = "none";
});

// Cargar los materiales al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarMateriales();
});






// // BOTON DETALLE PRODUCTO

// // Función para cargar productos en la tabla
// function cargarMateriales() {
//     fetch('http://127.0.0.1:5000/api/mostrar_material')
//         .then(response => {
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             return response.json();
//         })
//         .then(materiales => {
//             const tbody = document.getElementById('materiales-body');
//             tbody.innerHTML = materiales.map(material => `
//                 <tr>
//                     <td>${material.codigo}</td>
//                     <td>${material.material}</td>
//                     <td>${material.unidad_medida}</td>
//                     <td>${material.proveedor}</td>
//                     <td>${material.cantidad}</td>
//                     <td>${material.fecha_ingreso}</td>
//                     <td>${material.ganancia}</td>
//                     <td>${material.precio}</td>
//                     <td>${material.precio_venta}</td>
//                     <td><span class="badge ${material.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${material.estado}</span></td>
//                     <td class="actions">
//                         <a href="#" class="btn-editar" data-id="${material.id}">Editar</a>
//                         <a href="#" class="btn-detalle" data-id="${material.id}">Detalle</a>
//                     </td>
//                 </tr>
//             `).join('');
//             agregarEventosEditar(); // Llamamos a la función para agregar los eventos de edición
//         })
//         .catch(error => console.error('Error al cargar los materiales:', error));
// }


// // Función para mostrar el modal de DETALLE del producto
// function abrirModalDetalle(codigoId) {
//     const modal = document.getElementById("detalleProductoModal");
//     modal.style.display = "block";
//     // Fetch de datos del producto específico
//     fetch(`http://127.0.0.1:5000/api/mostrar_material/${codigoId}`)
//         .then(response => response.json())
//         .then(material => {
//             document.getElementById("material").textContent = `Nombre: ${material.material}`;
//             document.getElementById("cantidad").textContent = `Cantidad: ${material.cantidad} ${material.unidad_medida}`;
//             document.getElementById("unidad_medida").textContent = `Unidad de medida: ${material.unidad_medida}`;
//             document.getElementById("proveedor").textContent = `Nombre proveedor: ${material.proveedor}`;
//             document.getElementById("precio_compra").textContent = `Precio: $${material.precio_compra}`;
//             document.getElementById("iva").textContent = `IVA ${material.iva}%: ${material.aplica_iva ? 'SI APLICA' : 'NO APLICA'}`;
//             document.getElementById("ganancia").textContent = `Margen de ganancia: ${material.ganancia}%`;
//             document.getElementById("precio_final").textContent = `Precio: $${material.precio_final}`;
//         })
//         .catch(error => console.error('Error al obtener el detalle del producto:', error));
// }

// // Función para agregar eventos a los botones "Detalle"
// function agregarEventosDetalle() {
//     const botonesDetalle = document.querySelectorAll(".btn-detalle");
//     botonesDetalle.forEach(button => {
//         button.addEventListener("click", (event) => {
//             event.preventDefault();
//             const codigoId = button.getAttribute("data-id");
//             abrirModalDetalle(codigoId);
//         });
//     });
// }

// // Cerrar el modal de detalle
// document.getElementById("closeDetalleModal").addEventListener("click", () => {
//     document.getElementById("detalleProductoModal").style.display = "none";
// });

// window.addEventListener("click", (event) => {
//     const modal = document.getElementById("detalleProductoModal");
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// });

// // Cargar productos cuando la página esté lista
// window.addEventListener("DOMContentLoaded", (event) => {
//     cargarMateriales();
// });
