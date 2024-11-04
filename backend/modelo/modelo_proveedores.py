from utilidades.utilidades import obtener_base

def mostrar_proveedor():
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("SELECT * From proveedores;")
    proveedores = cursor.fetchall()
    
    columnas = [columna[0] for columna in cursor.description]

    cursor.close()
    conexion.close()

    lista_proveedores = []
    for proveedor in proveedores:
        dict_proveedor = {columnas[i]:proveedor[i] for i in range(len(columnas))}
        lista_proveedores.append(dict_proveedor)
    return lista_proveedores


def agregar_proveedor(proveedor):
    nombre = proveedor.get("nombre")
    mail = proveedor.get("mail")
    telefono = proveedor.get("telefono")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""INSERT INTO proveedores (nombre,mail,telefono)
                      VALUES (%s,%s,%s);""",(nombre,mail,telefono))
    
    conexion.commit()
    conexion.close()
    cursor.close()


    

