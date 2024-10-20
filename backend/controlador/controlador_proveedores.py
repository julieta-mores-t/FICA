from flask import jsonify,request
from modelo.modelo_proveedores import mostrar_proveedor

def mostrar_proveedor_endpoint():
    return jsonify(mostrar_proveedor()),200