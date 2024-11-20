from flask import jsonify, request
from modelo.modelo_materiales import agregar_material
from modelo.modelo_materiales import mostrar_material
from modelo.modelo_materiales import mostrar_un_material
from modelo.modelo_materiales import editar_material



def agregar_material_endpoint():
    dic_materiales = request.get_json()

    return jsonify({"mensaje":"material agregado con exito", "id": agregar_material(dic_materiales)}), 201

def mostrar_material_endpoint():
    return jsonify(mostrar_material()),200

def mostrar_un_material_endpoint(id):
    return jsonify(mostrar_un_material(id)),200


def editar_material_endpoint(id):
    datos_material = request.get_json()
    return editar_material(id, datos_material)

