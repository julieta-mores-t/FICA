from flask import jsonify, request
import bcrypt
from flask_bcrypt import Bcrypt
from modelo.modelo_empleados import agregar_empleado
from modelo.modelo_empleados import mostrar_usuarios




def agregar_empleado_endpoint():
    
    dic_empleado = request.get_json()
    nuevo_empleado = agregar_empleado(dic_empleado)
    return jsonify({"Mensaje": "Empleado creado", "id": nuevo_empleado}), 201



def mostrar_empleado_endpoint():
    
    usuarios_claves = mostrar_usuarios()
    return jsonify(usuarios_claves), 200  


def verificar_contrasena_endpoint():
    from app import aplicacion
    bcrypt = Bcrypt(aplicacion)
    data = request.json
    data = request.json
    contrasena = data.get("contrasena")
    hash_clave = data.get("hash")

    # Verificar si la contraseña coincide con el hash
    if bcrypt.check_password_hash(hash_clave, contrasena):
        return jsonify({"exito": True})
    else:
        return jsonify({"exito": False}), 401
    


    
