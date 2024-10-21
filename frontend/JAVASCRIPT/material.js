document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    const material = document.getElementById("material").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;
    const precio_venta = document.getElementById("precio_venta").value;
    const estado = document.getElementById("estado").value;
    const proveedor = document.getElementById("proveedor").value; // Usar el select de proveedores

    const datos = {
        material: material,
        cantidad: cantidad,
        precio: precio,
        precio_venta: precio_venta,
        estado: estado,
        proveedor: proveedor
    };

    fetch("http://127.0.0.1:5000/api/agregar_material", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("formulario").reset(); 
        cargarMateriales(); 
    })
    .catch(error => {
        console.error('Error al agregar el material:', error);
    });
});

// Función para cargar los materiales y agregarlos a la tabla
function cargarMateriales() {
    fetch('http://127.0.0.1:5000/api/mostrar_material')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(materiales => {
            const tbody = document.getElementById('materiales-body');
            if (!tbody) {
                return;
            }
            tbody.innerHTML = ''; 

            materiales.forEach(material => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${material.material}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.precio}</td>
                    <td>${material.precio_venta}</td>
                    <td>${material.estado}</td>
                    <td>${material.proveedor}</td>
                    <td><button class="editar-btn" data-id="${material.id}">Editar</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los materiales:', error);
        });
}

// Función para cargar los proveedores y agregarlos a la lista desplegable
function cargarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(proveedores => {
            const proveedorSelect = document.getElementById('proveedor');
            if (!proveedorSelect) {
                return;
            }

            // Limpiar las opciones actuales
            proveedorSelect.innerHTML = '<option value="">Seleccione un proveedor</option>';

            // Agregar cada proveedor como opción en el select
            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.nombre; // Usar el nombre como valor
                option.textContent = proveedor.nombre; // Mostrar el nombre del proveedor
                proveedorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los proveedores:', error);
        });
}

// Cargar los proveedores y materiales cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProveedores(); // Cargar proveedores
    cargarMateriales(); // Cargar materiales
});
