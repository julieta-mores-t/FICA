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



def mostrar_impuesto():
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM impuestos;")
    impuestos = cursor.fetchall()

    cursor.close()
    conexion.close()

    columnas = [col[0] for col in cursor.description]

    list_impuestos = []
    for imp in impuestos:
        dic_impuestos = {}
        for i in range(len(columnas)):
            dic_impuestos[columnas[i]] = imp[i]
        list_impuestos.append(dic_impuestos)
    return list_impuestos


def editar_impuesto(id,impuesto):
    nombre = impuesto.get("nombre")
    porcentaje = impuesto.get("porcentaje")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""UPDATE impuestos
                      SET  porcentaje = %s, nombre = %s
                      WHERE id = %s;""",(porcentaje,nombre,id))
    
    conexion.commit()
    cursor.close()
    conexion.close()






