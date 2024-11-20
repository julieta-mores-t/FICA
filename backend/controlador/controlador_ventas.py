from flask import jsonify, request
import bcrypt
from flask_bcrypt import Bcrypt

from modelo.modelo_ventas import mostrar_ventas


def mostrar_ventas_endpoint(fecha1,fecha2):
    return jsonify(mostrar_ventas(fecha1,fecha2))

