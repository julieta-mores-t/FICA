from utilidades.utilidades import obtener_base
import bcrypt

def mostrar_socios():
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""SELECT * FROM socios""")
    socios = cursor.fetchall()

    # Obtener los nombres de las columnas
    columnas = [column[0] for column in cursor.description]

    cursor.close()
    conexion.close()

    lista_empleados = []
    for socio in socios:
        socio_dict = {columnas[i]: socio[i] for i in range(len(columnas))}
        lista_empleados.append(socio_dict)

    return lista_empleados


def agregar_socio(datos):
    nombre = datos.get("nombre")
    telefono = datos.get("telefono")
    direccion = datos.get("direccion")
    numero = datos.get("numero")
    barrio = datos.get("barrio")
    correo = datos.get("correo")
    dni = datos.get("dni")
    estado_civil = datos.get("estado_civil")
    nacionalidad = datos.get("nacionalidad")
    ciudad = datos.get("ciudad")
    codigo_postal = datos.get("codigo_postal")
    fecha_nacimiento = datos.get("fecha_nacimiento")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute(
    "INSERT INTO socios (nombre, telefono,direccion,numero,barrio,correo,dni,estado_civil,nacionalidad,ciudad,codigo_postal,fecha_nacimiento) "
    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
    (nombre, telefono,direccion,numero,barrio,correo,dni,estado_civil,nacionalidad,ciudad,codigo_postal,fecha_nacimiento))

    conexion.commit()
    conexion.close()
    cursor.close()
    





    