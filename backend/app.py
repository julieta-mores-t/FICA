from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from controlador.controlador_empleados import agregar_empleado_endpoint
from controlador.controlador_empleados import mostrar_empleado_endpoint
from controlador.controlador_empleados import editar_empleado_endpoint
from controlador.controlador_materiales import agregar_material_endpoint
from controlador.controlador_materiales import mostrar_material_endpoint
from controlador.controlador_proveedores import mostrar_proveedor_endpoint
from controlador.controlador_proveedores import agregar_proveedor_endpoint
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
from controlador.controlador_stock import mostrar_stock_endpoint



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
@aplicacion.route("/api/editar_materiales/<int:id>", methods = ["PUT", "OPTIONS"])
def editar_material(id):
    return editar_material_endpoint(id)









# --------------------------------------------------------------------
#---------------------------------proveedores-------------------------
# --------------------------------------------------------------------


#-----------------------------mostrar proveedores---------------------
@aplicacion.route("/api/mostrar_proveedores", methods = ["GET"])
def mostrar_proveedores():
    return mostrar_proveedor_endpoint()

#----------------------------agregar proveedores----------------------
@aplicacion.route("/api/agregar_porveedor", methods = ["POST"])
def agregar_proveedores():
    return agregar_proveedor_endpoint()

#---------------------------editar proveedores-----------------------
@aplicacion.route("/api/editar_proveedor/<int:id>",methods = ["PUT"])
def editar_proveedores(id):
    return editar_proveedor_endpoint(id)






# --------------------------------------------------------------------
#---------------------------------impuestos---------------------------
# --------------------------------------------------------------------


#------------------------------Mostrar impuestos----------------------
@aplicacion.route("/api/mostrar_impuesto", methods = ["GET"])
def mostrar_impuestos():
    return mostrar_impuesto_endpoint()

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









if __name__ == "__main__":
    aplicacion.run(debug=True)





