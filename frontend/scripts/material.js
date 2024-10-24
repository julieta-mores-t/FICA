// Configurar la fecha de hoy en el campo oculto
const hoy = new Date();
const fechaHoy = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
document.getElementById("fecha_ingreso").value = fechaHoy;
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();


    const material = document.getElementById("material").value;
    const proveedor = document.getElementById("proveedor").value; 
    const cantidad = document.getElementById("cantidad").value;
    const ganancia = document.getElementById("ganancia").value;
    const precio = document.getElementById("precio").value;
    const precio_venta = document.getElementById("precio_venta").value;
    const estado = document.getElementById("estado").value;
    const fecha_ingreso = document.getElementById("fecha_ingreso").value;

    const datos = {
        
        material: material,
        proveedor: proveedor,
        cantidad: cantidad,
        ganancia:ganancia,
        precio: precio,
        precio_venta: precio_venta,
        estado: estado,
        fecha_ingreso: fecha_ingreso
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
                    <td>${material.codigo}</td>
                    <td>${material.material}</td>
                    <td>${material.proveedor}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.fecha_ingreso}</td>
                    <td>${material.ganancia}</td>
                    <td>${material.precio}</td>
                    <td>${material.precio_venta}</td>
                    <td>${material.estado}</td>
                    
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
