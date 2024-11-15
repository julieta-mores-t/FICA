from utilidades.utilidades import obtener_base
from datetime import datetime



def agregar_material(material):
    ganancia = material.get("ganancia")
    nombre_material = material.get("material")
    cantidad = material.get("cantidad")
    proveedor = material.get("proveedor")
    detalle = material.get("detalle")
    unidad_medida = material.get("unidad_medida")
    precio_cantidad = material.get("precio_cantidad")

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
<<<<<<< HEAD
        "INSERT INTO deposito (material, cantidad, proveedor,ganancia,detalle,unidad_medida,precio_cantidad) VALUES (%s, %s, %s, %s, %s, %s, %s)",
=======
        "INSERT INTO deposito (material, cantidad, proveedor,ganancia,detalle,unidad_medida,precio_cantidad) VALUES ( %s, %s, %s, %s, %s, %s, %s)",
>>>>>>> c1e0d6f8ebd49a823bcd09e2ba8aa5c4eb893da4
        (nombre_material, cantidad, proveedor_id,ganancia,detalle,unidad_medida,precio_cantidad)
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
        SELECT d.id, d.codigo, d.material, d.cantidad, d.precio, d.precio_venta, 
       p.nombre AS proveedor, d.estado, d.fecha_ingreso, d.ganancia,detalle,unidad_medida,precio_cantidad
FROM deposito d
JOIN proveedores p ON d.proveedor = p.id
LIMIT 0, 200;
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



def mostrar_un_material(id):
    conexion = obtener_base()
    cursor = conexion.cursor()
    
    cursor.execute("""
        SELECT d.id, d.codigo, d.material, d.cantidad, d.precio, d.precio_venta, 
        p.nombre AS proveedor, d.estado, d.fecha_ingreso, d.ganancia
        FROM deposito d
        JOIN proveedores p ON d.proveedor = p.id
        WHERE d.id = %s;  -- Filtrar por el ID del material
    """, (id,))  
    material = cursor.fetchone()
  
    columnas = [desc[0] for desc in cursor.description]

    cursor.close()
    conexion.close()

    if material:
        
        material_dict = {columnas[i]: material[i] for i in range(len(columnas))}
        return material_dict
    else:
        return None  




def editar_material(id, material):
    nombre_material = material.get("material")
    cantidad = material.get("cantidad")
    estado = material.get("estado")
    proveedor = material.get("proveedor")
    ganancia = material.get("ganancia")
    detalle = material.get("detalle")
    unidad_medida = material.get("unidad_medida")

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
        SET material = %s, cantidad = %s, estado = %s, proveedor = %s, ganancia = %s, detalle = %s,unidad_medida = %s
        WHERE id = %s
    """, (nombre_material, cantidad, estado, proveedor_id, ganancia, detalle, unidad_medida, id))

    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Material actualizado con éxito"}, 200






