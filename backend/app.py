from flask import Flask
from flask_cors import CORS
from controlador.controlador_empleados import agregar_empleado_endpoint
from controlador.controlador_empleados import mostrar_empleado_endpoint
from controlador.controlador_materiales import agregar_material_endpoint

aplicacion = Flask(__name__)
CORS(aplicacion)

# ------------------------------agregar empleados-------------------------

@aplicacion.route("/api/agregar_empleado", methods=["POST"])
def agregar_empleado():
    return agregar_empleado_endpoint()

# ------------------------------enviar empleados-------------------------

@aplicacion.route("/api/mostrar_usuarios",methods=["GET"])
def mostrar_usuario():
    return mostrar_empleado_endpoint()



#--------------------------------------agregar materiales--------------------------
@aplicacion.route("/api/agregar_material", methods=["POST"])
def agregar_material():
    return agregar_material_endpoint()





if __name__ == "__main__":
    aplicacion.run(debug=True)





