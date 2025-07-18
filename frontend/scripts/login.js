function redirectToLogin() {
    window.location.href = 'templates/login.html'; 
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    console.log(usuario);

    try {
        // Hacer una solicitud GET a la API para obtener los usuarios
        const response = await fetch("http://127.0.0.1:5000/api/mostrar_usuarios");
        const usuarios = await response.json();

        // Encontrar el usuario ingresado
        const usuarioEncontrado = usuarios.find(user => user.usuario === usuario);
        console.log(usuarioEncontrado);

        if (!usuarioEncontrado) {
            alert("Usuario no encontrado");
            return;
        }

        // Hacer una solicitud POST para verificar la contraseña
        const verificarResponse = await fetch("http://127.0.0.1:5000/api/verificar_contrasena", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contrasena, hash: usuarioEncontrado.clave })
        });

        const verificarResult = await verificarResponse.json();

        if (verificarResult.exito) {
            // Verificar el puesto del usuario y redirigir a la página correspondiente
            if (usuarioEncontrado.puesto === "administrador") {

                localStorage.setItem("nombre", usuarioEncontrado.nombre);
                localStorage.setItem("apellido", usuarioEncontrado.apellido);
                localStorage.setItem("mail", usuarioEncontrado.mail);
                // Redirigir a la página de inicio.html si el usuario es administrador
                window.location.href = "inicio.html";
            } else if (usuarioEncontrado.puesto === "empleado") {
                // Redirigir a la página de empleado.html si el usuario es empleado
                window.location.href = "empleado.html";
            } else {
                alert("Puesto no reconocido");
            }
        } else {
            alert("Contraseña incorrecta");
        }

    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        alert("Ocurrió un error, por favor intente nuevamente");
    }
});