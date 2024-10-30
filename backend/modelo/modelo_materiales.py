from utilidades.utilidades import obtener_base
from datetime import datetime



def agregar_material(material):
    ganancia = material.get("ganancia")
    
    nombre_material = material.get("material")
    cantidad = material.get("cantidad")
    precio = material.get("precio")
    precio_venta = material.get("precio_venta")
    estado = material.get("estado")
    proveedor = material.get("proveedor")

    conexion = obtener_base()
    cursor = conexion.cursor()

    # Verificar que el proveedor existe en la tabla proveedores
    cursor.execute("SELECT id FROM proveedores WHERE nombre = %s", (proveedor,))
    resultado = cursor.fetchone()

    if resultado:
        proveedor_id = resultado[0]
    else:
        cursor.close()
        conexion.close()
        return "Proveedor no encontrado"

    # Insertar el nuevo material en la tabla deposito utilizando el id del proveedor
    cursor.execute(
        "INSERT INTO deposito (material, cantidad, precio, precio_venta, estado, proveedor,ganancia) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (nombre_material, cantidad, precio, precio_venta, estado, proveedor_id, ganancia)
    )
    conexion.commit()
    ultimo_dato = cursor.lastrowid
    cursor.close()
    conexion.close()
    return ultimo_dato








def mostrar_material():
    conexion = obtener_base()
    cursor = conexion.cursor()
    
    cursor.execute("""
        SELECT codigo, material, cantidad, precio, precio_venta, nombre AS proveedor, estado, fecha_ingreso, ganancia 
        FROM deposito d 
        JOIN proveedores p ON d.proveedor = p.id;
    """)
    
    materiales = cursor.fetchall()

    # Obtener nombres de las columnas
    columnas = [desc[0] for desc in cursor.description]

    cursor.close()
    conexion.close()

    lista_materiales = []
    for mat in materiales:
        materiales_dict = {columnas[i]: mat[i] for i in range(len(columnas))}
        
        # Formatear la fecha en el formato deseado
        if 'fecha_ingreso' in materiales_dict:
            # Convertir a datetime y luego formatear
            fecha_ingreso_dt = materiales_dict['fecha_ingreso']
            if isinstance(fecha_ingreso_dt, datetime):
                materiales_dict['fecha_ingreso'] = fecha_ingreso_dt.strftime('%d/%m/%Y')
        
        lista_materiales.append(materiales_dict)

    return lista_materiales





def editar_material(id, material):
    nombre_material = material.get("material")
    cantidad = material.get("cantidad")
    precio = material.get("precio")
    estado = material.get("estado")
    proveedor = material.get("proveedor")
    ganancia = material.get("ganancia")

    conexion = obtener_base()
    cursor = conexion.cursor()

    # Verificar que el proveedor existe en la tabla proveedores
    cursor.execute("SELECT id FROM proveedores WHERE nombre = %s", (proveedor,))
    resultado_proveedor = cursor.fetchone()

    if resultado_proveedor:
        proveedor_id = resultado_proveedor[0]
    else:
        cursor.close()
        conexion.close()
        return {"mensaje": "Proveedor no encontrado"}, 404

    # Actualizar solo las columnas especificadas en la tabla deposito
    cursor.execute("""
        UPDATE deposito
        SET material = %s, cantidad = %s, precio = %s, estado = %s, proveedor = %s, ganancia = %s
        WHERE id = %s
    """, (nombre_material, cantidad, precio, estado, proveedor_id, ganancia, id))

    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Material actualizado con éxito"}, 200






