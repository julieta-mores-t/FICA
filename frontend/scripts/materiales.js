document.addEventListener("DOMContentLoaded", function() {
    
    const productosCard = document.getElementById('productos-card');
    const stockCard = document.getElementById('stock-card');

    productosCard.addEventListener('click', function() {
        window.location.href = 'productos.html'; 
    });

    
    stockCard.addEventListener('click', function() {
        window.location.href = 'stock.html'; 
    });

});
