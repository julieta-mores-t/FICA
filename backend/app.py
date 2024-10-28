from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from controlador.controlador_empleados import agregar_empleado_endpoint
from controlador.controlador_empleados import mostrar_empleado_endpoint
from controlador.controlador_materiales import agregar_material_endpoint
from controlador.controlador_materiales import mostrar_material_endpoint
from controlador.controlador_proveedores import mostrar_proveedor_endpoint
from controlador.controlador_materiales import editar_material_endpoint
from controlador.controlador_empleados import verificar_contrasena_endpoint
from controlador.controlador_impuestos import agregar_impuesto_endpoint


aplicacion = Flask(__name__)

CORS(aplicacion)
bcrypt = Bcrypt(aplicacion)
# ------------------------------EMPLEADOS-------------------------
# ------------------------------agregar empleados-------------------------

@aplicacion.route("/api/agregar_empleado", methods=["POST"])
def agregar_empleado():
    return agregar_empleado_endpoint()

# ------------------------------enviar empleados-------------------------

@aplicacion.route("/api/mostrar_usuarios",methods=["GET"])
def mostrar_usuario():
    return mostrar_empleado_endpoint()



# Ruta para verificar la contraseña
@aplicacion.route('/api/verificar_contrasena', methods=['POST'])
def verificar_contrasena():
    return verificar_contrasena_endpoint()





# ------------------------------MATERIALES-------------------------
#--------------------------------------agregar materiales--------------------------
@aplicacion.route("/api/agregar_material", methods=["POST"])
def agregar_material():
    return agregar_material_endpoint()

#-----------------------------------enviar materiales-------------------------------
@aplicacion.route("/api/mostrar_material", methods = ["GET"])
def mostrar_material():
    return mostrar_material_endpoint()

#-------------------------------------editar material-------------------------------
@aplicacion.route("/api/editar_materiales/<int:id>", methods = ["PUT"])
def editar_material(id):
    return editar_material_endpoint(id)










#----------------------------------mostrar proveedores-------------------------------
@aplicacion.route("/api/mostrar_proveedores", methods = ["GET"])
def mostrar_proveedores():
    return mostrar_proveedor_endpoint()



#--------------------------------- agregar impuestos---------------------------------
@aplicacion.route("/api/agregar_impuesto", methods = ["POST"])
def agregar_impuesto():
    return agregar_impuesto_endpoint()









if __name__ == "__main__":
    aplicacion.run(debug=True)





