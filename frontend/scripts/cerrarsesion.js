
document.getElementById("iconoSalir").addEventListener("click", cerrarSesion);

function cerrarSesion() {
    window.location.href = "../index.html";

    // Deshabilitar las flechas del navegador para volver
    window.history.pushState(null, null, "../index.html");
    window.addEventListener("popstate", function (event) {
        window.history.pushState(null, null, "../index.html");
    });
}
