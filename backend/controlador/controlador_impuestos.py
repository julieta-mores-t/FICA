from flask import jsonify, request
from modelo.modelo_impuestos import agregar_impuesto
from modelo.modelo_impuestos import mostrar_impuesto
from modelo.modelo_impuestos import editar_impuesto



def agregar_impuesto_endpoint():
    dic_impuestos = request.get_json()
    return jsonify({"Mensaje":"se agrega impuesto", "id":agregar_impuesto(dic_impuestos)}),201



def mostrar_impuesto_endpoint():
    return jsonify(mostrar_impuesto()),200


def editar_impuesto_endpoint(id):
    dic_impuesto = request.get_json()
    editar_impuesto(id,dic_impuesto)
    
    return jsonify({"Mensaje":"El impuesto se modificó correctamente"}),200
    