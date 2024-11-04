from flask import jsonify,request
from modelo.modelo_proveedores import mostrar_proveedor
from modelo.modelo_proveedores import agregar_proveedor

def mostrar_proveedor_endpoint():
    return jsonify(mostrar_proveedor()),200

def agregar_proveedor_endpoint():
    datos = request.get_json()
    agregar_proveedor(datos)
    return jsonify({"Mensaje":"se agrego el proveedor"})