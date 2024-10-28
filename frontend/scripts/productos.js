document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
    cargarMateriales();

    document.getElementById("formulario").addEventListener("submit", (event) => {
        event.preventDefault();

        const datos = {
            material: document.getElementById("material").value,
            cantidad: document.getElementById("cantidad").value,
            precio: document.getElementById("precio-compra").value,
            ganancia: document.getElementById("margen-ganancia").value,
            proveedor: document.getElementById("proveedor").value,
            estado: document.querySelector('input[name="estado"]:checked').value
        };

        fetch("http://127.0.0.1:5000/api/agregar_material", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(() => {
            document.getElementById("formulario").reset(); 
            cargarMateriales(); 
            bootstrap.Modal.getInstance(document.getElementById('staticBackdrop')).hide();
        })
        .catch(error => console.error('Error al agregar el material:', error));
    });
});

// Cargar materiales
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

// Cargar proveedores
function cargarProveedores() {
    fetch('http://127.0.0.1:5000/api/mostrar_proveedores')
        .then(response => response.json())
        .then(proveedores => {
            const proveedorSelect = document.getElementById('proveedor');
            proveedorSelect.innerHTML = '<option value="">Seleccione un proveedor</option>' + 
                proveedores.map(proveedor => `<option value="${proveedor.nombre}">${proveedor.nombre}</option>`).join('');
        });
}

