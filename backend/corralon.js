document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    const material = document.getElementById("material").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    const datos = {
        material: material,
        cantidad: cantidad,
        precio: precio
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
    });
});
