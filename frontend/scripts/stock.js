// Obtener nombre y apellido de localStorage
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



//BOTÓN DE BUSCAR (filtra por codigo,nombre)
const searchInput = document.getElementById('buscarInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const stockRows = document.querySelectorAll('#stock-body tr');

    stockRows.forEach(row => {
        const codigoStock = row.cells[0].textContent.toLowerCase();
        const nombreStock = row.cells[1].textContent.toLowerCase();
        if (
            codigoStock.includes(searchText) ||
            nombreStock.includes(searchText)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    cargarStock();
});

// Cargar lista de stock
function cargarStock() {
    fetch('http://127.0.0.1:5000/api/mostrar_stock')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(stockList => {
            const tbody = document.getElementById('stock-body');
            tbody.innerHTML = stockList.map(stock => `
                <tr>
                    <td>${stock.Codigo}</td>
                    <td>${stock.Nombre}</td>
                    <td>${stock.cantidad}</td>
                </tr>
            `).join('');
        })
        .catch(error => console.error('Error al cargar el stock:', error));
}


