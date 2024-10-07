from flask import Flask,jsonify,request
from flask_cors import CORS
import mysql.connector

aplicacion = Flask(__name__)
CORS(aplicacion)


#--------------coneccion a base de datos ---------------------

base = {
    "host": "localhost",
    "user": "root",
    "password": "naty2611",
    "database": "corralon"
}

@aplicacion.route("/api/agregar_usuario", methods=["POST"])
def agregar_usuario():
    data = request.get_json()
    usuario = data.get("usuario")
    clave = data.get("pass")
    puesto = data.get("puesto")

    con = mysql.connector.connect(**base)
    cursor = con.cursor()

    cursor.execute("INSERT INTO usuarios (usuario,pass,puesto) VALUES(%s,%s,%s)",(usuario,clave,puesto))
    con.commit()

    cursor.close()
    con.close()

    ultimo_dato = cursor.lastrowid
    return jsonify({"Mensaje":"Usuario creado", "id": ultimo_dato}), 201






if __name__ == "__main__":
    aplicacion.run(debug= True)