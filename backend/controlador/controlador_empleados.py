from flask import jsonify, request
from modelo.modelo_empleados import agregar_empleado
from modelo.modelo_empleados import mostrar_usuarios


def agregar_empleado_endpoint():
    dic_empleado = request.get_json()
    
    nuevo_empleado = agregar_empleado(dic_empleado)
    return jsonify({"Mensaje": "Empleado creado", "id": nuevo_empleado}), 201



def mostrar_empleado_endpoint():
    usuarios_claves = mostrar_usuarios()
    return jsonify(usuarios_claves), 200  


    
