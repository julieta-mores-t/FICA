from flask import jsonify, request
from modelo.modelo_compradores import mostrar_compradores
from modelo.modelo_compradores import mostrar_un_comprador


def mostrar_compradores_endpoint():
    return jsonify(mostrar_compradores())

def mostrar_un_comprador_endpoint(id):
    return jsonify(mostrar_un_comprador(id))

