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
    descripcion = proveedor.get("descripcion")
    cuit = proveedor.get("cuit")
    ciudad = proveedor.get("ciudad")
    codigo_postal = proveedor.get("codigo_postal")
    barrio = proveedor.get("barrio")
    razon_social = proveedor.get("razon_social")
    direccion = proveedor.get("direccion")
    numero = proveedor.get("numero")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""INSERT INTO proveedores (nombre,mail,telefono,descripcion,cuit,ciudad,codigo_postal,barrio,razon_social,direccion,numero)
                      VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""",(nombre,mail,telefono,descripcion,cuit,ciudad,codigo_postal,barrio,razon_social,direccion,numero))
    
    conexion.commit()
    conexion.close()
    cursor.close()



def editar_proveedor(proveedor,id):
    nombre = proveedor.get("nombre")
    mail = proveedor.get("mail")
    telefono =proveedor.get("telefono")
    descripcion = proveedor.get("descripcion")
    cuit = proveedor.get("cuit")
    ciudad = proveedor.get("ciudad")
    codigo_postal = proveedor.get("codigo_postal")
    barrio = proveedor.get("barrio")
    razon_social = proveedor.get("razon_social")
    direccion = proveedor.get("direccion")
    numero = proveedor.get("numero")
    estado = proveedor.get("estado")

    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""
        UPDATE proveedores
        SET nombre = %s, mail = %s, telefono = %s, descripcion = %s, cuit = %s, ciudad = %s,codigo_postal = %s, barrio = %s, razon_social = %s, direccion = %s,numero = %s,estado = %s
        WHERE id = %s
    """, (nombre, mail,telefono,descripcion,cuit,ciudad,codigo_postal,barrio,razon_social,direccion,numero,estado, id))

    conexion.commit()
    conexion.close()
    cursor.close()

    return {"mensaje": "Proveedor actualizado con éxito"}, 200


def mostrar_un_proveedor(id):
    conexion = obtener_base()
    cursor = conexion.cursor()
    
    cursor.execute("""
        SELECT * 
        FROM proveedores
        WHERE id = %s;
    """, (id,))  
    proveedor = cursor.fetchone()
  
    columnas = [desc[0] for desc in cursor.description]

    cursor.close()
    conexion.close()

    if proveedor:
        
        json_proveedor = {columnas[i]: proveedor[i] for i in range(len(columnas))}
        return json_proveedor
    else:
        return None 




    

