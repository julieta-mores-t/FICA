from flask import Flask
from flask_cors import CORS
from controlador.controlador_empleados import agregar_empleado_endpoint
from controlador.controlador_empleados import mostrar_empleado_endpoint
from controlador.controlador_materiales import agregar_material_endpoint
from controlador.controlador_materiales import mostrar_material_endpoint
from controlador.controlador_proveedores import mostrar_proveedor_endpoint
from controlador.controlador_materiales import editar_material_endpoint


aplicacion = Flask(__name__)
CORS(aplicacion)
# ------------------------------EMPLEADOS-------------------------
# ------------------------------agregar empleados-------------------------

@aplicacion.route("/api/agregar_empleado", methods=["POST"])
def agregar_empleado():
    return agregar_empleado_endpoint()

# ------------------------------enviar empleados-------------------------

@aplicacion.route("/api/mostrar_usuarios",methods=["GET"])
def mostrar_usuario():
    return mostrar_empleado_endpoint()





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






if __name__ == "__main__":
    aplicacion.run(debug=True)





