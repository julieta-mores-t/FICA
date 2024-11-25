from utilidades.utilidades import obtener_base
import bcrypt


def mostrar_stock():
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""SELECT 
    deposito.codigo AS "Codigo",
    deposito.material AS "Nombre",
    deposito.unidad_medida AS "Unidad de Medida",
    deposito.precio_venta AS "Precio de Venta",
    stock.cantidad,
    proveedores.nombre AS "Proveedor"
FROM 
    deposito
JOIN 
    stock ON deposito.id = stock.material_id
JOIN 
    proveedores ON deposito.proveedor = proveedores.id;
""")

    stock = cursor.fetchall()

    columnas = [column[0] for column in cursor.description]

    cursor.close()
    conexion.close()

    lista_stock = []
    for st in stock:
        empleado_dict = {columnas[i]: st[i] for i in range(len(columnas))}
        lista_stock.append(empleado_dict)

    return lista_stock


