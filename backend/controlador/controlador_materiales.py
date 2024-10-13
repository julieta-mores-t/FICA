from flask import jsonify, request
from modelo.modelo_materiales import agregar_material




def agregar_material_endpoint():
    dic_materiales = request.get_json()

    return jsonify({"mensaje":"material agregado con exito", "id": agregar_material(dic_materiales)}), 201
