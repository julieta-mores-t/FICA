from utilidades.utilidades import obtener_base
import bcrypt
from datetime import datetime

def agregar_empleado(datos_empleado):  
    # Transformar las fechas de formato 'dd/mm/yyyy' a 'yyyy-mm-dd'
    if "fecha_nacimiento" in datos_empleado:
        fecha_nacimiento_str = datos_empleado["fecha_nacimiento"]
        datos_empleado["fecha_nacimiento"] = datetime.strptime(fecha_nacimiento_str, '%d/%m/%Y').strftime('%Y-%m-%d')
    
    if "fecha_ingreso" in datos_empleado:
        fecha_ingreso_str = datos_empleado["fecha_ingreso"]
        datos_empleado["fecha_ingreso"] = datetime.strptime(fecha_ingreso_str, '%d/%m/%Y').strftime('%Y-%m-%d')

    # Extraer los datos del diccionario
    nombre = datos_empleado.get("nombre")
    apellido = datos_empleado.get("apellido")
    dni = datos_empleado.get("dni")
    cuil = datos_empleado.get("cuil")
    estado_civil = datos_empleado.get("estado_civil")
    nacionalidad = datos_empleado.get("nacionalidad")
    ciudad  = datos_empleado.get("ciudad")
    codigo_postal  = datos_empleado.get("codigo_postal")
    barrio  = datos_empleado.get("barrio")
    fechaNacimiento = datos_empleado.get("fechaNacimiento")
    direccion = datos_empleado.get("direccion")
    numero = datos_empleado.get("numero")
    mail = datos_empleado.get("mail")
    telefono = datos_empleado.get("telefono")
    cuenta_bancaria = datos_empleado.get("cuenta_bancaria")
    usuario = datos_empleado.get("usuario")
    clave = datos_empleado.get("clave")
    puesto = datos_empleado.get("puesto")
    
    
    # Hashear la contraseña antes de guardarla
    clave_en_bytes = clave.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_clave = bcrypt.hashpw(clave_en_bytes, salt)
    
    # Conectar a la base de datos
    conexion = obtener_base()
    cursor = conexion.cursor()
    cursor.execute(
    "INSERT INTO empleados (nombre, apellido, dni, cuil, estado_civil, nacionalidad, ciudad, codigo_postal, barrio, fechaNacimiento, direccion, numero, mail, telefono, cuenta_bancaria, usuario, clave, puesto) "
    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
    (nombre, apellido, dni, cuil, estado_civil, nacionalidad, ciudad, codigo_postal, barrio, fechaNacimiento, direccion, numero, mail, telefono, cuenta_bancaria, usuario, hash_clave, puesto)
    )

    conexion.commit()
    ultimo_id = cursor.lastrowid

    cursor.close()
    conexion.close()
    return ultimo_id


#----------------------------------mostrar usuarios-------------------------------------
def mostrar_usuarios():
    conexion = obtener_base()
    cursor = conexion.cursor()

    
    cursor.execute("SELECT * FROM empleados")
    empleados = cursor.fetchall() 

    # Obtener los nombres de las columnas
    columnas = [column[0] for column in cursor.description]

    cursor.close()
    conexion.close()

    lista_empleados = []
    for empleado in empleados:
        empleado_dict = {columnas[i]: empleado[i] for i in range(len(columnas))}
        lista_empleados.append(empleado_dict)

    return lista_empleados





def editar_empleado(id,empleado):
    nombre = empleado.get("nombre")
    apellido = empleado.get("apellido")
    dni = empleado.get("dni")
    cuil = empleado.get("cuil")
    estado_civil = empleado.get("estado_civil")
    nacionalidad = empleado.get("nacionalidad")
    ciudad  = empleado.get("ciudad")
    codigo_postal  = empleado.get("codigo_postal")
    barrio  = empleado.get("barrio")
    fechaNacimiento = empleado.get("fechaNacimiento")
    direccion = empleado.get("direccion")
    numero = empleado.get("numero")
    mail = empleado.get("mail")
    telefono = empleado.get("telefono")
    cuenta_bancaria = empleado.get("cuenta_bancaria")
    usuario = empleado.get("usuario")
    clave = empleado.get("clave")
    puesto = empleado.get("puesto")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute(
    """
    UPDATE empleados
    SET 
        nombre = %s,
        apellido = %s,
        cuil = %s,
        estado_civil = %s,
        nacionalidad = %s,
        ciudad = %s,
        codigo_postal = %s,
        barrio = %s,
        fechaNacimiento = %s,
        direccion = %s,
        numero = %s,
        mail = %s,
        telefono = %s,
        cuenta_bancaria = %s,
        usuario = %s,
        clave = %s,
        puesto = %s
    WHERE dni = %s
    """,
    (
        nombre, apellido, cuil, estado_civil, nacionalidad, ciudad, codigo_postal, barrio, 
        fechaNacimiento, direccion, numero, mail, telefono, cuenta_bancaria, usuario, 
        clave, puesto, dni
    )
    )
    conexion.commit()
    conexion.close()
    cursor.close()
    return {"Mensaje":"edicion completada"},200





    
