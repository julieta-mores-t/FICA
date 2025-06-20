from flask import jsonify, request
import bcrypt
from flask_bcrypt import Bcrypt
from modelo.modelo_empleados import agregar_empleado
from modelo.modelo_empleados import mostrar_usuarios
from modelo.modelo_empleados import editar_empleado
from modelo.modelo_empleados import mostrar_un_empleado




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
    

def editar_empleado_endpoint(id):
    datos = request.get_json()
    return editar_empleado(id,datos)


def mostrar_un_empleado_endpoint(id):
    return jsonify(mostrar_un_empleado(id)),200
    


    
