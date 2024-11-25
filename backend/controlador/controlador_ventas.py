from flask import jsonify, request
import bcrypt
from flask_bcrypt import Bcrypt

from modelo.modelo_ventas import mostrar_ventas
from modelo.modelo_ventas import mostrar_ventas_empleado
from modelo.modelo_ventas import editar_venta
from modelo.modelo_ventas import agregar_venta



def mostrar_ventas_endpoint(fecha1,fecha2):
    return jsonify(mostrar_ventas(fecha1,fecha2))


def mostrar_ventas_empleado_endpoint(id):
    return jsonify(mostrar_ventas_empleado(id))

def editar_venta_endpoint(id):
    datos = request.get_json()
    return editar_venta(id, datos)

def agregar_venta_endpoint():
    datos = request.get_json()
    return agregar_venta(datos)
