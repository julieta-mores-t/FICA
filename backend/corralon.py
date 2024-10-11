from flask import Flask,jsonify,request
from flask_cors import CORS
import mysql.connector
import bcrypt
from datetime import datetime

aplicacion = Flask(__name__)
CORS(aplicacion)


#--------------coneccion a base de datos ---------------------

base = {
    "host": "localhost",
    "user": "root",
    "password": "naty2611",
    "database": "corralon"
}










#--------------- Se agrega empleado ---------------------
@aplicacion.route("/api/agregar_empleado", methods=["POST"])
def agregar_usuario():
    data = request.get_json()
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    # convertir fecha
    fecha_nacimiento_str = data.get("fecha_nacimiento")
    fecha_nacimiento = datetime.strptime(fecha_nacimiento_str, '%d/%m/%Y').strftime('%Y-%m-%d')
    direccion = data.get("direccion")
    mail = data.get("mail")
    telefono = data.get("telefono")
    usuario = data.get("usuario")
    clave = data.get("clave")  
    puesto = data.get("puesto")
    
    fecha_ingreso_str = data.get("fecha_ingreso")
    fecha_ingreso = datetime.strptime(fecha_ingreso_str, '%d/%m/%Y').strftime('%Y-%m-%d')
    
    estado = data.get("estado")

    # Hashear la contraseña antes de almacenarla en la base de datos
    clave_en_bytes = clave.encode('utf-8')  # Convertir la clave a bytes
    salt = bcrypt.gensalt()  # Generar un salt aleatorio
    hash_clave = bcrypt.hashpw(clave_en_bytes, salt)  # Hashear la clave

    
    con = mysql.connector.connect(**base)
    cursor = con.cursor()

   
    cursor.execute(
        "INSERT INTO empleados (nombre, apellido, dni, fechaNacimiento, direccion, mail, telefono, usuario, clave, puesto,fecha_ingreso,estado) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s)",
        (nombre, apellido, dni, fecha_nacimiento, direccion, mail, telefono, usuario, hash_clave, puesto,fecha_ingreso,estado)
    )
    
    con.commit()

    # Cerrar la conexión
    cursor.close()
    con.close()

    ultimo_dato = cursor.lastrowid
    return jsonify({"Mensaje": "Empleado creado", "id": ultimo_dato}), 201


# ----------------------obtener todos los empleados ----------------

@aplicacion.route("/api/obtener_empleados", methods=["GET"])
def obtener_empleados():
    con = mysql.connector.connect(**base)  
    cursor = con.cursor()

    cursor.execute("SELECT * FROM empleados")
    empleados = cursor.fetchall() 

    columnas = []
    for column in cursor.description:
        columnas.append(column[0])

    cursor.close()
    con.close()

    lista_empleados = []
    for empleado in empleados:
        empleado_dict = {}
        for i in range(len(columnas)):
            empleado_dict[columnas[i]] = empleado[i]
    
        # Agregar el diccionario a la lista de compradores
        lista_empleados.append(empleado_dict)

    return jsonify(lista_empleados), 200  








#--------------se agrega deposito ---------------------
@aplicacion.route("/api/agregar_material", methods=["POST"])
def agregar_material():
    data = request.get_json()
    material = data.get("material")
    cantidad = data.get("cantidad")
    precio = data.get("precio")

    con = mysql.connector.connect(**base)
    cursor = con.cursor()

    cursor.execute("INSERT INTO deposito (material,cantidad,precio) VALUES (%s,%s,%s)",(material,cantidad,precio))
    con.commit()
    cursor.close()
    con.close()
    ultimo_dato = cursor.lastrowid
    return jsonify({"Mensaje":"Material ingresado","id": ultimo_dato}), 201


#---------------se agrega compradores---------------------------
@aplicacion.route("/api/agregar_comprador", methods=["POST"])
def agregar_comprador():
    data = request.get_json()
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    fecha_nacimiento = data.get("fecha_nacimiento")
    direccion = data.get("direccion")
    email = data.get("email")
    telefono = data.get("telefono")

    con = mysql.connector.connect(**base)
    cursor = con.cursor()

    cursor.execute(
                    "INSERT INTO compradores (nombre,apellido,dni,fecha_nacimiento,direccion,email,telefono) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                    (nombre,apellido,dni,fecha_nacimiento,direccion,email,telefono))
    con.commit()

    con.close()
    cursor.close()

    ultimo_dato = cursor.lastrowid
    return({"Mensaje": "Comprador agregado","id": ultimo_dato}),201


# ----------------------obtener todos los compradores ----------------

@aplicacion.route("/api/obtener_compradores", methods=["GET"])
def obtener_compradores():
    con = mysql.connector.connect(**base)  
    cursor = con.cursor()

    cursor.execute("SELECT * FROM compradores")
    compradores = cursor.fetchall() 

    cursor.close()
    con.close()

    # Obtener los nombres de las columnas
    columnas = []
    for column in cursor.description:
        columnas.append(column[0])

    lista_compradores = []
    for comprador in compradores:
        comprador_dict = {}
        for i in range(len(columnas)):
            comprador_dict[columnas[i]] = comprador[i]
    
        # Agregar el diccionario a la lista de compradores
        lista_compradores.append(comprador_dict)

    return jsonify(lista_compradores), 200  


if __name__ == "__main__":
    aplicacion.run(debug= True)