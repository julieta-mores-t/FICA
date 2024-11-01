from flask import jsonify, request
from modelo.modelo_stock import mostrar_stock


def mostrar_stock_endpoint():
    return jsonify(mostrar_stock()),200