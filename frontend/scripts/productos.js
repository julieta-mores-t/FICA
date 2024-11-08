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

// Función para abrir y cerrar el modal
const modal = document.getElementById("materialModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.querySelector(".close");

openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    cargarProveedores();
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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


// Enviar el formulario al servidor
document.getElementById("materialForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = {
        material: document.getElementById("material").value,
        cantidad: document.getElementById("cantidad").value,
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
            modal.style.display = "none";
        })
        .catch(error => console.error('Error al agregar el material:', error));
});



// botón de BUSCAR
// Selección de elementos
const buscarInput = document.getElementById("buscarInput");
const iconoBuscar = document.getElementById("iconoBuscar");

function realizarBusqueda() {
    const query = buscarInput.value.trim().toLowerCase();
    if (!query) {
        console.log("Ingrese un término para buscar.");
        return;
    }
    
    const productosRows = document.querySelectorAll('.producto-row');
    const resultados = [];

    productosRows.forEach(row => {
        const codigo = row.cells[0].textContent.toLowerCase();
        const nombre = row.cells[1].textContent.toLowerCase();
        const proveedor = row.cells[2].textContent.toLowerCase();
        const fecha_ingreso = row.cells[3].textContent.toLowerCase();
        const estado = row.cells[4].textContent.toLowerCase();

        // Filtra por coincidencia en cualquiera de los campos
        if (
            codigo.includes(query) || 
            nombre.includes(query) || 
            proveedor.includes(query) || 
            fecha_ingreso.includes(query) || 
            estado.includes(query)
        ) {
            row.style.display = ''; // Mostrar fila si coincide
            resultados.push({
                codigo,
                nombre,
                proveedor,
                fecha_ingreso,
                estado
            });
        } else {
            row.style.display = 'none'; // Ocultar fila si no coincide
        }
    });

    console.log("Resultados de búsqueda:", resultados);
}

// Evento al hacer clic en el icono de búsqueda
iconoBuscar.addEventListener("click", realizarBusqueda);

// Evento al presionar Enter en el campo de búsqueda
buscarInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        realizarBusqueda();
    }
});