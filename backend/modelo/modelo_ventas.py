from utilidades.utilidades import obtener_base
import bcrypt

def mostrar_ventas(fecha1,fecha2):
    conexion = obtener_base()
    cursor = conexion.cursor()

    
    cursor.execute("""SELECT 
                        v.id,
                        d.material AS material,
                        d.codigo,
                        v.cantidad,
                        v.precio_venta,
                        v.descuento,
                        v.total,
                        s.nombre AS socio,
                        c.nombre AS comprador,
                        e.nombre AS empleado,
                        v.fecha_venta
                    FROM 
                        ventas v
                    LEFT JOIN deposito d ON v.id_material = d.id
                    LEFT JOIN socios s ON v.socio = s.id
                    LEFT JOIN compradores c ON v.id_comprador = c.id
                    LEFT JOIN empleados e ON v.id_vendedor = e.id
                    WHERE v.fecha_venta BETWEEN %s AND %s;""",(fecha1,fecha2))
    ventas = cursor.fetchall() 

    # Obtener los nombres de las columnas
    columnas = [column[0] for column in cursor.description]

    cursor.close()
    conexion.close()

    lista_ventas = []
    for venta in ventas:
        ventas_dict = {columnas[i]: venta[i] for i in range(len(columnas))}
        lista_ventas.append(ventas_dict)

    return lista_ventas





def mostrar_ventas_empleado(id):
    conexion = obtener_base()
    cursor = conexion.cursor()

    
    cursor.execute("""SELECT 
                        v.id,
                        d.material AS material,
                        d.codigo,
                        v.cantidad,
                        v.precio_venta,
                        v.descuento,
                        v.total,
                        s.nombre AS socio,
                        c.nombre AS comprador,
                        e.nombre AS empleado,
                        v.fecha_venta
                    FROM 
                        ventas v
                    LEFT JOIN deposito d ON v.id_material = d.id
                    LEFT JOIN socios s ON v.socio = s.id
                    LEFT JOIN compradores c ON v.id_comprador = c.id
                    LEFT JOIN empleados e ON v.id_vendedor = e.id
                    WHERE e.id = %s;""",(id,))
    ventas = cursor.fetchall() 

    # Obtener los nombres de las columnas
    columnas = [column[0] for column in cursor.description]

    cursor.close()
    conexion.close()

    lista_ventas = []
    for venta in ventas:
        ventas_dict = {columnas[i]: venta[i] for i in range(len(columnas))}
        lista_ventas.append(ventas_dict)

    return lista_ventas





def editar_venta(id, venta):
    material = venta.get("material")
    cantidad = venta.get("cantidad")
    comprador = venta.get("comprador")
    socio = venta.get("socio")
    descuento = venta.get("descuento")
    
    conexion = obtener_base()
    cursor = conexion.cursor()

    # Material
    cursor.execute("SELECT id FROM deposito WHERE material = %s", (material,))
    resultado_material = cursor.fetchone()

    if resultado_material:
        material_id = resultado_material[0]
    else:
        cursor.close()
        conexion.close()
        return {"mensaje": "Material no encontrado"}, 404

    # Comprador
    cursor.execute("SELECT id FROM compradores WHERE nombre = %s", (comprador,))
    resultado_comprador = cursor.fetchone()

    if resultado_comprador:
        comprador_id = resultado_comprador[0]
    else:
        comprador_id = None  
       

    # Socio
    cursor.execute("SELECT id FROM socios WHERE nombre = %s", (socio,))
    resultado_socio = cursor.fetchone()

    if resultado_socio:
        socio_id = resultado_socio[0]
    else:
        socio_id = None
        

    # Actualizar venta
    cursor.execute("""
        UPDATE ventas
        SET id_material = %s, cantidad = %s, id_comprador = %s, socio = %s, descuento = %s
        WHERE id = %s
    """, (material_id, cantidad, comprador_id, socio_id, descuento, id))

    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Venta actualizada con éxito"}, 200


def agregar_venta(datos):
    material = datos.get("material")
    cantidad = datos.get("cantidad")
    vendedor = datos.get("vendedor")
    comprador = datos.get("comprador")
    descuento = datos.get("descuento")
    socio = datos.get("socio")

    conexion = obtener_base()
    cursor = conexion.cursor()

    

    # Material
    cursor.execute("SELECT id FROM deposito WHERE material = %s", (material,))
    resultado_material = cursor.fetchone()

    if resultado_material:
        material_id = resultado_material[0]
    else:
        cursor.close()
        conexion.close()
        return {"mensaje": "Material no encontrado"}, 404

    # Comprador
    cursor.execute("SELECT id FROM compradores WHERE nombre = %s", (comprador,))
    resultado_comprador = cursor.fetchone()

    if resultado_comprador:
        comprador_id = resultado_comprador[0]
    else:
        comprador_id = None  
       

    # Socio
    cursor.execute("SELECT id FROM socios WHERE nombre = %s", (socio,))
    resultado_socio = cursor.fetchone()

    if resultado_socio:
        socio_id = resultado_socio[0]
    else:
        socio_id = None


# cargar venta
    cursor.execute("""
    INSERT INTO ventas (id_material, cantidad, id_vendedor, id_comprador, descuento, socio)
    VALUES (%s, %s, %s, %s, %s, %s)
""", (material_id, cantidad, vendedor, comprador_id, descuento, socio_id))


    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Venta actualizada con éxito"}, 200
    


