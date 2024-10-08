create database corralon;
use corralon;

#creacion de tabla deposito
CREATE TABLE deposito(
	id INT AUTO_INCREMENT PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL, 
    precio DECIMAL(10.2)
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


