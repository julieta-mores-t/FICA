from flask import jsonify,request
from modelo.modelo_proveedores import mostrar_proveedor
from modelo.modelo_proveedores import agregar_proveedor
from modelo.modelo_proveedores import editar_proveedor
from modelo.modelo_proveedores import mostrar_un_proveedor
def mostrar_proveedor_endpoint():
    return jsonify(mostrar_proveedor()),200

def agregar_proveedor_endpoint():
    datos = request.get_json()
    agregar_proveedor(datos)
    return jsonify({"Mensaje":"se agrego el proveedor"})

def editar_proveedor_endpoint(id):
    datos = request.get_json()
    return editar_proveedor(datos,id)


def mostrar_un_proveedor_endpoint(id):
    return jsonify(mostrar_un_proveedor(id)),200
