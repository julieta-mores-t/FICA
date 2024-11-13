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


def agregar_material_impuesto(matimpuesto):
    material = matimpuesto.get("material")
    impuesto = matimpuesto.get("impuesto")

    conexion = obtener_base()
    cursor = conexion.cursor()

    # Verificar que el material existe en la tabla proveedores
    cursor.execute("SELECT id FROM deposito WHERE material = %s", (material,))
    resultado = cursor.fetchone()

    if resultado:
        material_id = resultado[0]
    else:
        cursor.close()
        conexion.close()
        return "Proveedor no encontrado"
    
    # Verificar que el impuesto existe en la tabla proveedores
    cursor.execute("SELECT id FROM impuestos WHERE nombre = %s", (impuesto,))
    resultado = cursor.fetchone()

    if resultado:
        impuesto_id = resultado[0]
    else:
        cursor.close()
        conexion.close()
        return "Proveedor no encontrado"
    

    # Insertar el nuevo material impuesto en la tabla intermedia utilizando el id del material y del impuesto
    cursor.execute(
        "INSERT INTO material_impuesto (id_material,id_impuesto) VALUES (%s, %s)",
        (material_id,impuesto_id)
    )

    conexion.commit()
    cursor.close()
    conexion.close()


def editar_material_impuesto(matimpuesto,id):
    material = matimpuesto.get("material")
    impuesto = matimpuesto.get("impuesto")

    conexion = obtener_base()
    cursor = conexion.cursor()

    # Verificar que el material existe en la tabla proveedores
    cursor.execute("SELECT id FROM deposito WHERE material = %s", (material,))
    resultado = cursor.fetchone()

    if resultado:
        material_id = resultado[0]
    else:
        cursor.close()
        conexion.close()
        return "Proveedor no encontrado"
    
    # Verificar que el impuesto existe en la tabla proveedores
    cursor.execute("SELECT id FROM impuestos WHERE nombre = %s", (impuesto,))
    resultado = cursor.fetchone()

    if resultado:
        impuesto_id = resultado[0]
    else:
        cursor.close()
        conexion.close()
        return "Proveedor no encontrado"
    

    
    cursor.execute("""
        UPDATE material_impuesto
        SET id_material = %s, id_impuesto = %s
        WHERE id = %s
    """, (material_id,impuesto_id,id))

    conexion.commit()
    cursor.close()
    conexion.close()





