from utilidades.utilidades import obtener_base

def agregar_impuesto(impuestos):
    nombre = impuestos.get("nombre")
    porcentaje = impuestos.get("porcentaje")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("INSERT INTO impuestos (nombre, porcentaje) VALUES(%s,%s)",(nombre, porcentaje))
    conexion.commit()
    conexion.close()
    cursor.close()
