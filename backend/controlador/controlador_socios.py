from flask import jsonify, request
import bcrypt
from flask_bcrypt import Bcrypt
from modelo.modelo_socios import mostrar_socios
from modelo.modelo_socios import agregar_socio
from modelo.modelo_socios import mostrar_un_socio



def mostrar_socios_endpoint():
    return jsonify(mostrar_socios()),200


def agragar_socio_endpoint():
    datos = request.get_json()
    agregar_socio(datos)
    return jsonify({"Mensaje": "se agrego el socio correctamente"}),201

def mostrar_un_socio_endpoint(id):
    return jsonify(mostrar_un_socio(id)),200