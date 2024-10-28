from flask import jsonify, request
from modelo.modelo_impuestos import agregar_impuesto



def agregar_impuesto_endpoint():
    dic_impuestos = request.get_json()
    return jsonify({"Mensaje":"se agrega impuesto", "id":agregar_impuesto(dic_impuestos)}),201