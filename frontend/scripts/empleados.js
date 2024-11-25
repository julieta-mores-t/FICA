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
    cargarEmpleado();
});


//BOTÓN DE BUSCAR (filtra por nombre, apellido, dni, puesto)
const searchInput = document.getElementById('buscarInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const empleadoRows = document.querySelectorAll('#empleados-body tr');

    empleadoRows.forEach(row => {
        const nombre = row.cells[0].textContent.toLowerCase();
        const apellido = row.cells[1].textContent.toLowerCase();
        const dni = row.cells[2].textContent.toLowerCase();
        const puesto = row.cells[3].textContent.toLowerCase();
        if (
            nombre.includes(searchText) ||
            apellido.includes(searchText) ||
            dni.includes(searchText) ||
            puesto.includes(searchText)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Referencias a los elementos del DOM
const modal = document.getElementById("empleadoModal");
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


// Función para cargar empleados en la tabla
function cargarEmpleado() {
    fetch('http://127.0.0.1:5000/api/mostrar_usuarios')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(empleados => {
            const tbody = document.getElementById('empleados-body');
            tbody.innerHTML = empleados.map(empleado => `
                <tr>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.apellido}</td>
                    <td>${empleado.dni}</td>
                    <td>${empleado.puesto}</td>
                    <td>${empleado.mail}</td>
                    <td>${empleado.telefono}</td>
                    <td><span class="badge ${empleado.estado === 'alta' ? 'badge-alta' : 'badge-baja'}">${empleado.estado}</span></td>
                    <td class="actions">
                        <a href="#" class="btn-editar" data-id="${empleado.id}">Editar</a>
                        <a href="#" class="btn-detalle" data-id="${empleado.id}">Detalle</a>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los empleados:', error));
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
        apellido: document.getElementById("apellido").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        dni: document.getElementById("dni").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        mail: document.getElementById("mail").value,
        usuario: document.getElementById("usuario").value,
        clave: document.getElementById("clave").value,
        puesto: document.getElementById("puesto").value,
    };

    fetch("http://127.0.0.1:5000/api/agregar_empleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById("empleadoForm").reset();
            cargarEmpleado();
            modal.style.display = "none";
        })
        .catch(error => console.error('Error al agregar al empleado:', error));
}


// Mostrar el modal de confirmación al hacer submit
document.getElementById("empleadoForm").addEventListener("submit", (event) => {
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

// Cargar los empleados al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarEmpleado();
})

//***EDITAR EMPLEADO***//
const editarModal = document.getElementById('editarModal');
const closeEditBtn = editarModal.querySelector('.closeEdit');

// Abrir el modal al hacer clic en "Editar"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-editar')) {
        event.preventDefault();
        const empleadoId = event.target.getAttribute('data-id');


        // Abrir el modal de edición
        const editarModal = document.getElementById('editarModal');
        editarModal.style.display = 'block';

        // Llamar al API para obtener los datos del empleado
        fetch(`http://127.0.0.1:5000/api/mostrar_un_empleado/${empleadoId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('enombre').value = data.nombre;
                document.getElementById('eapellido').value = data.apellido;
                document.getElementById('enacionalidad').value = data.nacionalidad;
                document.getElementById('efecha_nacimiento').value = data.fecha_nacimiento;
                document.getElementById('edni').value = data.dni;
                document.getElementById('ecuil').value = data.cuil;
                document.getElementById('eestado_civil').value = data.estado_civil;
                document.getElementById('eciudad').value = data.ciudad;
                document.getElementById('ecodigo_postal').value = data.codigo_postal;
                document.getElementById('ebarrio').value = data.barrio;
                document.getElementById('edireccion').value = data.direccion;
                document.getElementById('enumero').value = data.numero;
                document.getElementById('etelefono').value = data.telefono;
                document.getElementById('email').value = data.mail;
                document.getElementById('eusuario').value = data.usuario;
                document.getElementById('eclave').value = data.clave;
                document.getElementById('epuesto').value = data.puesto;


                // Asignar el ID del empleado al campo de nombre
                document.getElementById('enombre').setAttribute('data-id', empleadoId);
            })
            .catch(error => {
                console.error('Error al obtener los datos del empleado:', error);
            });
    }
});

// Botón de guardar cambios en el modal de edición
document.getElementById("guardarCambiosBtn").addEventListener("click", () => {
    const nombreId = document.getElementById("enombre").getAttribute('data-id');
    const nombre = document.getElementById("enombre").value;
    const apellido = document.getElementById("eapellido").value;
    const nacionalidad = document.getElementById("enacionalidad").value;
    const fecha_nacimiento = document.getElementById("efecha_nacimiento").value;
    const dni = document.getElementById("edni").value;
    const cuil = document.getElementById("ecuil").value;
    const estado_civil = document.getElementById("eestado_civil").value;
    const ciudad = document.getElementById("eciudad").value;
    const codigo_postal = document.getElementById("ecodigo_postal").value;
    const barrio = document.getElementById("ebarrio").value;
    const direccion = document.getElementById("edireccion").value;
    const numero = document.getElementById("enumero").value;
    const telefono = document.getElementById("etelefono").value;
    const mail = document.getElementById("email").value;
    const usuario = document.getElementById("eusuario").value;
    const clave = document.getElementById("eclave").value;
    const puesto = document.getElementById("epuesto").value;


    // Crea el objeto JSON que se enviará
    const datos = {
        nombre,
        apellido,
        nacionalidad,
        fecha_nacimiento,
        dni,
        cuil,
        estado_civil,
        ciudad,
        codigo_postal,
        barrio,
        direccion,
        numero,
        telefono,
        mail,
        usuario,
        clave,
        puesto
    };

    // Realizar la solicitud PUT
    fetch(`http://127.0.0.1:5000/api/editar_empleado/${nombreId}`, {
        method: "PATCH",
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
            console.log("Empleado actualizado:", data);

            editarModal.style.display = 'none';
            cargarEmpleado();
        })
        .catch(error => {
            console.error("Error al actualizar al empleado:", error);
            alert("Hubo un problema al guardar los cambios. Inténtalo nuevamente.");
        });
});

// Mostrar el modal de confirmación al hacer submit
document.getElementById("empleadoForm").addEventListener("submit", (event) => {
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




//***DETALLE DEL EMPLEADO***//

// Seleccionamos el modal y el botón para cerrar
const detalleModal = document.getElementById('detalleModal');
const closeDetailBtn = detalleModal.querySelector('.closeDetail');

// Abrir el modal al hacer clic en "Detalle"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-detalle')) {
        event.preventDefault();

        // Obtener el ID del proveedor desde el atributo data-id
        const nombreId = event.target.getAttribute('data-id');

        // Abrir el modal de detalle
        detalleModal.style.display = 'block';

        fetch(`http://127.0.0.1:5000/api/mostrar_un_empleado/${nombreId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('dnombre').textContent = data.nombre;
                document.getElementById('dapellido').textContent = data.apellido;
                document.getElementById('ddni').textContent = data.dni;
                document.getElementById('dfechaNacimiento').textContent = data.fechaNacimiento;
                document.getElementById('dcuil').textContent = data.cuil;
                document.getElementById('destado_civil').textContent = data.estado_civil;
                document.getElementById('dnacionalidad').textContent = data.nacionalidad;
                document.getElementById('dciudad').textContent = data.ciudad;
                document.getElementById('dbarrio').textContent = data.barrio;
                document.getElementById('ddireccion').textContent = data.direccion;
                document.getElementById('dnumero').textContent = data.numero;
                document.getElementById('dcodigo_postal').textContent = data.codigo_postal;
                document.getElementById('dtelefono').textContent = data.telefono;
                document.getElementById('dmail').textContent = data.mail;
                document.getElementById('dusuario').textContent = data.usuario;
                document.getElementById('dclave').textContent = data.clave;
                document.getElementById('destado').textContent = data.estado;

            })
            .catch(error => {
                console.error('Error al obtener los datos del empleado:', error);
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
