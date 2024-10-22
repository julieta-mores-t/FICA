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
    fecha_nacimiento = datos_empleado.get("fecha_nacimiento")
    direccion = datos_empleado.get("direccion")
    mail = datos_empleado.get("mail")
    telefono = datos_empleado.get("telefono")
    usuario = datos_empleado.get("usuario")
    clave = datos_empleado.get("clave")
    puesto = datos_empleado.get("puesto")
    fecha_ingreso = datos_empleado.get("fecha_ingreso")
    estado = datos_empleado.get("estado")
    
    # Hashear la contraseña antes de guardarla
    clave_en_bytes = clave.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_clave = bcrypt.hashpw(clave_en_bytes, salt)
    
    # Conectar a la base de datos
    conexion = obtener_base()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO empleados (nombre, apellido, dni, fechaNacimiento, direccion, mail, telefono, usuario, clave, puesto, fecha_ingreso, estado) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (nombre, apellido, dni, fecha_nacimiento, direccion, mail, telefono, usuario, hash_clave, puesto, fecha_ingreso, estado)
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




    
