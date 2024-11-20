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



def mostrar_un_socio(id):
    conexion = obtener_base()
    cursor = conexion.cursor()
    
    cursor.execute("""
        SELECT * 
        FROM socios
        WHERE id = %s;
    """, (id,))  
    proveedor = cursor.fetchone()
  
    columnas = [desc[0] for desc in cursor.description]

    cursor.close()
    conexion.close()

    if proveedor:
        
        json_proveedor = {columnas[i]: proveedor[i] for i in range(len(columnas))}
        return json_proveedor
    else:
        return None 
    


def editar_socio(id,datos):
    nombre = datos.get("nombre")
    telefono = datos.get("telefono")
    direccion = datos.get("direccion")
    numero = datos.get("numero")
    barrio = datos.get("barrio")
    correo = datos.get("correo")
    dni = datos.get("dni")
    estado = datos.get("estado")
    estado_civil = datos.get("estado_civil")
    nacionalidad = datos.get("nacionalidad")
    ciudad = datos.get("ciudad")
    codigo_postal = datos.get("codigo_postal")
    fecha_nacimiento = datos.get("fecha_nacimiento")


    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute(
    """
    UPDATE socios
    SET 
        nombre = %s,
        telefono = %s,
        direccion = %s,
        numero = %s,
        barrio = %s,
        correo = %s,
        dni = %s,
        estado = %s,
        estado_civil = %s,
        nacionalidad = %s,
        ciudad = %s,
        codigo_postal = %s,
        fecha_nacimiento = %s
    WHERE id = %s
    """,
    (
        nombre, telefono, direccion, numero, barrio, correo, dni, estado, 
        estado_civil, nacionalidad, ciudad, codigo_postal, fecha_nacimiento, id
    )
)

    conexion.commit()
    conexion.close()
    cursor.close()
    return {"Mensaje":"edicion completada"},200


    
    





    