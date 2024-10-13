from utilidades.utilidades import obtener_base



def agregar_material(material):
    
    nombre_material = material.get("material")
    cantidad = material.get("cantidad")
    precio = material.get("precio")
    conexion = obtener_base()  
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO deposito (material, cantidad, precio) VALUES (%s, %s, %s)",
        (nombre_material, cantidad, precio)
    )
    conexion.commit()

    ultimo_dato = cursor.lastrowid
    
    cursor.close()
    conexion.close()
    
    return ultimo_dato

