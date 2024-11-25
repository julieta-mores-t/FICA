from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from controlador.controlador_empleados import agregar_empleado_endpoint
from controlador.controlador_empleados import mostrar_empleado_endpoint
from controlador.controlador_empleados import mostrar_un_empleado_endpoint
from controlador.controlador_empleados import editar_empleado_endpoint
from controlador.controlador_materiales import agregar_material_endpoint
from controlador.controlador_materiales import mostrar_material_endpoint
from controlador.controlador_proveedores import mostrar_proveedor_endpoint
from controlador.controlador_proveedores import agregar_proveedor_endpoint
from controlador.controlador_proveedores import mostrar_un_proveedor_endpoint
from controlador.controlador_proveedores import editar_proveedor_endpoint
from controlador.controlador_materiales import editar_material_endpoint
from controlador.controlador_materiales import mostrar_un_material_endpoint
from controlador.controlador_empleados import verificar_contrasena_endpoint
from controlador.controlador_impuestos import agregar_impuesto_endpoint
from controlador.controlador_impuestos import mostrar_impuesto_endpoint
from controlador.controlador_impuestos import editar_impuesto_endpoint
from controlador.controlador_impuestos import agregar_material_impuesto_endpoint
from controlador.controlador_impuestos import editar_material_impuesto_endpoint
from controlador.controlador_impuestos import mostrar_impuesto_material_endpoint
from controlador.controlador_impuestos import eliminar_material_impuesto_endpoint
from controlador.controlador_impuestos import mostrar_un_impuesto_endpoint
from controlador.controlador_stock import mostrar_stock_endpoint
from controlador.controlador_socios import mostrar_socios_endpoint
from controlador.controlador_socios import agragar_socio_endpoint
from controlador.controlador_socios import mostrar_un_socio_endpoint
from controlador.controlador_socios import editar_socio_endpoint
from controlador.controlador_ventas import mostrar_ventas_endpoint
from controlador.controlador_ventas import mostrar_ventas_empleado_endpoint
from controlador.controlador_ventas import editar_venta_endpoint
from controlador.controlador_ventas import agregar_venta_endpoint




aplicacion = Flask(__name__)

CORS(aplicacion)
bcrypt = Bcrypt(aplicacion)

# --------------------------------------------------------------------
# ----------------------------------EMPLEADOS-------------------------
# --------------------------------------------------------------------


# ------------------------------agregar empleados---------------------

@aplicacion.route("/api/agregar_empleado", methods=["POST"])
def agregar_empleado():
    return agregar_empleado_endpoint()

# ------------------------------enviar empleados----------------------

@aplicacion.route("/api/mostrar_usuarios",methods=["GET"])
def mostrar_usuario():
    return mostrar_empleado_endpoint()

#-----------------------------mostrar un empleado---------------------
@aplicacion.route("/api/mostrar_un_empleado/<int:id>",methods = ["GET"])
def mostrar_un_empleado(id):
    return mostrar_un_empleado_endpoint(id)



# Ruta para verificar la contraseña
@aplicacion.route('/api/verificar_contrasena', methods=['POST'])
def verificar_contrasena():
    return verificar_contrasena_endpoint()

#------------------------------editar empleados-----------------------
@aplicacion.route("/api/editar_empleado/<int:id>", methods = ["PUT"])
def editar_empleado(id):
    return editar_empleado_endpoint(id)


# --------------------------------------------------------------------
# ------------------------------MATERIALES----------------------------
# --------------------------------------------------------------------


#---------------------------agregar materiales------------------------
@aplicacion.route("/api/agregar_material", methods=["POST"])
def agregar_material():
    return agregar_material_endpoint()

#----------------------------enviar materiales------------------------
@aplicacion.route("/api/mostrar_material", methods = ["GET"])
def mostrar_material():
    return mostrar_material_endpoint()

#-----------------------------mostrar un material---------------------
@aplicacion.route("/api/mostrar_un_material/<int:id>",methods = ["GET"])
def mostrar_un_material(id):
    return mostrar_un_material_endpoint(id)

#------------------------------editar material------------------------
@aplicacion.route("/api/editar_materiales/<int:id>", methods = ["PUT"])
def editar_material(id):
    return editar_material_endpoint(id)









# --------------------------------------------------------------------
#---------------------------------proveedores-------------------------
# --------------------------------------------------------------------


#-----------------------------mostrar proveedores---------------------
@aplicacion.route("/api/mostrar_proveedores", methods = ["GET"])
def mostrar_proveedores():
    return mostrar_proveedor_endpoint()


#-----------------------------mostrar un proveedor---------------------
@aplicacion.route("/api/mostrar_un_proveedor/<int:id>",methods = ["GET"])
def mostrar_un_proveedor(id):
    return mostrar_un_proveedor_endpoint(id)

#----------------------------agregar proveedores----------------------
@aplicacion.route("/api/agregar_porveedor", methods = ["POST"])
def agregar_proveedores():
    return agregar_proveedor_endpoint()

#---------------------------editar proveedores-----------------------
@aplicacion.route("/api/editar_proveedor/<int:id>",methods = ["PATCH"])
def editar_proveedores(id):
    return editar_proveedor_endpoint(id)






# --------------------------------------------------------------------
#---------------------------------impuestos---------------------------
# --------------------------------------------------------------------


#------------------------------Mostrar impuestos----------------------
@aplicacion.route("/api/mostrar_impuesto", methods = ["GET"])
def mostrar_impuestos():
    return mostrar_impuesto_endpoint()

#-----------------------------mostrar un impuesto---------------------
@aplicacion.route("/api/mostrar_un_impuesto/<int:id>",methods = ["GET"])
def mostrar_un_impuesto(id):
    return mostrar_un_impuesto_endpoint(id)

#------------------------------agregar impuestos----------------------
@aplicacion.route("/api/agregar_impuesto", methods = ["POST"])
def agregar_impuesto():
    return agregar_impuesto_endpoint()

#-----------------------------editar impuestos-----------------------
@aplicacion.route("/api/editar_impusto/<int:id>",methods = ["PUT"])
def editar_impuesto(id):
    return editar_impuesto_endpoint(id)

#----------------------------agregar impuesto al material ------------
@aplicacion.route("/api/agregar_material_impuesto", methods = ["POST"])
def agregar_material_impuesto():
    return agregar_material_impuesto_endpoint()


#-------------------------editar el impuesto al material---------------
@aplicacion.route("/api/editar_material_impuesto/<int:id>", methods = ["PUT"])
def editar_material_impuesto(id):
    return editar_material_impuesto_endpoint(id)

#------------------------mostrar impuesto del material-----------------
@aplicacion.route("/api/mostrar_impuesto_material",methods = ["GET"])
def mostrar_impuesto_material():
    return mostrar_impuesto_material_endpoint()

#-----------------------eliminar impuesto de lmaterial ----------------
@aplicacion.route("/api/eliminar_impuesto_material/<int:id>", methods = ["DELETE"])
def eliminar_impuesto_material(id):
    return eliminar_material_impuesto_endpoint(id)






# --------------------------------------------------------------------
#---------------------------------stock-------------------------------
# --------------------------------------------------------------------


#-----------------------------mostrar stock---------------------------
@aplicacion.route("/api/mostrar_stock", methods = ["GET"])
def mostrar_stock():
    return mostrar_stock_endpoint()






# --------------------------------------------------------------------
#---------------------------------socios-------------------------------
# --------------------------------------------------------------------

#-----------------------------mostrar socios---------------------------
@aplicacion.route("/api/mostrar_socios", methods = ["GET"])
def mostrar_socios():
    return mostrar_socios_endpoint()

#-----------------------------mostrar un socio---------------------
@aplicacion.route("/api/mostrar_un_socio/<int:id>",methods = ["GET"])
def mostrar_un_socio(id):
    return mostrar_un_socio_endpoint(id)

#-----------------------------agregar socios---------------------------
@aplicacion.route("/api/agregar_socios", methods = ["POST"])
def agregar_socios():
    return agragar_socio_endpoint()

#---------------------------editar socio-----------------------
@aplicacion.route("/api/editar_socio/<int:id>",methods = ["PUT"])
def editar_socio(id):
    return editar_socio_endpoint(id)




# --------------------------------------------------------------------
#---------------------------------ventas-------------------------------
# --------------------------------------------------------------------

#-----------------------------mostrar ventas---------------------------
@aplicacion.route("/api/mostrar_ventas/<fecha1>/<fecha2>", methods=["GET"])
def mostrar_ventas(fecha1,fecha2):
    return mostrar_ventas_endpoint(fecha1,fecha2)

#------------------------mostrar ventas por empleado----------------------
@aplicacion.route("/api/mostrar_ventas_empleado/<int:id>", methods=["GET"])
def mostrar_ventas_empleado(id):
    return mostrar_ventas_empleado_endpoint(id)

#------------------------mostrar ventas por socio----------------------
@aplicacion.route("/api/editar_venta/<int:id>",methods = ["PUT"])
def editar_venta(id):
    return editar_venta_endpoint(id)

#------------------------agregar ventas--------------------------------

@aplicacion.route("/api/agregar_venta", methods = ["POST"])
def agregar_venta():
    return agregar_venta_endpoint()








if __name__ == "__main__":
    aplicacion.run(debug=True)





