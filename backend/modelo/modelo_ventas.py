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