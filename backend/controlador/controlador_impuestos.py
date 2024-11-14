from flask import jsonify, request
from modelo.modelo_impuestos import agregar_impuesto
from modelo.modelo_impuestos import mostrar_impuesto
from modelo.modelo_impuestos import editar_impuesto
from modelo.modelo_impuestos import agregar_material_impuesto
from modelo.modelo_impuestos import editar_material_impuesto
from modelo.modelo_impuestos import mostrar_material_impuesto
from modelo.modelo_impuestos import eliminar_material_impuesto



def agregar_impuesto_endpoint():
    dic_impuestos = request.get_json()
    return jsonify({"Mensaje":"se agrega impuesto", "id":agregar_impuesto(dic_impuestos)}),201



def mostrar_impuesto_endpoint():
    return jsonify(mostrar_impuesto()),200


def editar_impuesto_endpoint(id):
    dic_impuesto = request.get_json()
    editar_impuesto(id,dic_impuesto)
    
    return jsonify({"Mensaje":"El impuesto se modificó correctamente"}),200


def agregar_material_impuesto_endpoint():
    dic_matimp = request.get_json()
    return jsonify({"Mensaje":"se agrego el impuesto al material","id":agregar_material_impuesto(dic_matimp)}), 200


def editar_material_impuesto_endpoint(id):
    dato = request.get_json()
    return jsonify({"Mensaje":"se edita el impuesto para el material", "id": editar_material_impuesto(dato,id)}),200


def mostrar_impuesto_material_endpoint():
    return jsonify(mostrar_material_impuesto())

def eliminar_material_impuesto_endpoint(id):
    return eliminar_material_impuesto(id)
    