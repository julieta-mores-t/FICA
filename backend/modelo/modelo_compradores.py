from utilidades.utilidades import obtener_base
from datetime import datetime


def mostrar_compradores():
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM compradores;")
    impuestos = cursor.fetchall()

    columnas = [col[0] for col in cursor.description]

    list_impuestos = []
    for imp in impuestos:
        dic_impuestos = {}
        for i in range(len(columnas)):
            valor = imp[i]
            # Formatear la fecha si la columna es 'fecha_nacimiento'
            if columnas[i] == "fecha_nacimiento":
                try:
                    # Convertir a datetime si es una cadena
                    if isinstance(valor, str):
                        valor = datetime.strptime(valor, "%a, %d %b %Y %H:%M:%S %Z")
                    # Formatear al formato deseado
                    valor = valor.strftime("%d/%m/%Y")
                except (ValueError, TypeError):
                    # Dejar el valor sin cambios si no es una fecha válida
                    pass
            dic_impuestos[columnas[i]] = valor
        list_impuestos.append(dic_impuestos)

    cursor.close()
    conexion.close()

    return list_impuestos



from datetime import datetime

def mostrar_un_comprador(id):
    conexion = obtener_base()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT * 
        FROM compradores
        WHERE id = %s;
    """, (id,)) 
    impuestos = cursor.fetchone()  # Devuelve una sola fila como tupla

    # Verifica si no se encontró ninguna fila
    if not impuestos:
        cursor.close()
        conexion.close()
        return {"error": "No se encontró el comprador"}

    columnas = [col[0] for col in cursor.description]

    # Crear un diccionario directamente de las columnas y la fila única
    dic_impuestos = {}
    for i in range(len(columnas)):
        valor = impuestos[i]  # Acceder directamente a la columna por índice
        # Formatear la fecha si la columna es 'fecha_nacimiento'
        if columnas[i] == "fecha_nacimiento":
            try:
                # Convertir a datetime si es una cadena
                if isinstance(valor, str):
                    valor = datetime.strptime(valor, "%a, %d %b %Y %H:%M:%S %Z")
                # Formatear al formato deseado
                valor = valor.strftime("%d/%m/%Y")
            except (ValueError, TypeError):
                
                pass
        dic_impuestos[columnas[i]] = valor

    cursor.close()
    conexion.close()

    return dic_impuestos


