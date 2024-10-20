create database corralon;
use corralon;

#creacion de tabla deposito
CREATE TABLE deposito(
	id INT AUTO_INCREMENT PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL, 
    precio DECIMAL(10.2)
);

CREATE TABLE proveedores(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50),
    apellido varchar(50),
    mail varchar(100),
    telefono int
);


#creacion de tabla empleado
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,      
    nombre VARCHAR(50) NOT NULL,            
    apellido VARCHAR(50) NOT NULL,          
    dni VARCHAR(20) NOT NULL UNIQUE,        
    fechaNacimiento DATE NOT NULL,         
    direccion VARCHAR(100),                 
    mail VARCHAR(100) NOT NULL UNIQUE,      
    telefono VARCHAR(20),                   
    usuario VARCHAR(50) NOT NULL UNIQUE,    
    clave VARCHAR(255) NOT NULL,            
    puesto ENUM('administrador', 'empleado') NOT NULL 
);
#aqui se modifican campos que se crean luego 
ALTER TABLE empleados
ADD COLUMN fecha_ingreso DATE,
ADD COLUMN estado ENUM('alta', 'baja');

ALTER TABLE deposito
ADD COLUMN precio_venta int,
ADD COLUMN estado ENUM('alta', 'baja'),
ADD COLUMN proveedor varchar(50);

ALTER TABLE empleados
DROP COLUMN foto;


ALTER TABLE deposito
DROP FOREIGN KEY fk_proveedor;


ALTER TABLE deposito
ADD CONSTRAINT fk_proveedor
FOREIGN KEY (proveedor)
REFERENCES proveedores(id);

ALTER TABLE proveedores MODIFY COLUMN telefono VARCHAR(20);

INSERT INTO deposito (material, cantidad, precio, precio_venta,estado,proveedor)
VALUES ('caño', 50000, 350,700,"alta",6);

INSERT INTO proveedores (nombre, apellido, mail, telefono)
VALUES ('daniel', 'montoya', 'dmontolla@gmail.com.ar', "3512365896");

INSERT INTO proveedores (nombre, apellido, mail, telefono) VALUES 
('jose', 'juarez', 'juares@example.com', '123456789'),
('Dionicio', 'Perez', 'perez@example.com', '987654321');


SHOW COLUMNS FROM deposito;
SHOW COLUMNS FROM proveedores;

ALTER TABLE deposito MODIFY COLUMN proveedor INT;








#creacion de tabla compradores
CREATE TABLE compradores (
    id INT AUTO_INCREMENT PRIMARY KEY,   
    nombre VARCHAR(100) NOT NULL,        
    apellido VARCHAR(100) NOT NULL,    
    dni VARCHAR(20) NOT NULL,           
    fecha_nacimiento DATE,              
    direccion VARCHAR(255),             
    email VARCHAR(100),                  
    telefono VARCHAR(20)                 
);

#creacion de tabla ventas 
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    id_material INT NOT NULL,                   
    cantidad INT NOT NULL,                     
    id_vendedor INT NOT NULL,                   
    id_comprador INT,                  
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de la venta
    FOREIGN KEY (id_material) REFERENCES deposito(id), 
    FOREIGN KEY (id_vendedor) REFERENCES empleados(id),  
    FOREIGN KEY (id_comprador) REFERENCES compradores(id) 
);



#consultas
SELECT nombre From proveedores;



SELECT 
    material,cantidad,precio,precio_venta,nombre as proveedor,estado
FROM 
    deposito d
JOIN 
    proveedores p ON d.proveedor = p.id;
    

