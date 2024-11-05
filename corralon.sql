-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: corralon
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compradores`
--

DROP TABLE IF EXISTS `compradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compradores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `socio` enum('sí','no') NOT NULL,
  `situacion_laboral` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compradores`
--

LOCK TABLES `compradores` WRITE;
/*!40000 ALTER TABLE `compradores` DISABLE KEYS */;
INSERT INTO `compradores` VALUES (1,'Juan','Pérez','12345678','1985-07-15','Calle Falsa 123','juan.perez@example.com','+3512565854','sí',NULL),(3,'Damian','Marquez','12345678','1985-07-15','rancagua 685','perez@example.com','+3512855854','sí',NULL);
/*!40000 ALTER TABLE `compradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `material` varchar(255) NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `precio_venta` int DEFAULT NULL,
  `estado` varchar(255) DEFAULT 'alta',
  `proveedor` int DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `ganancia` int DEFAULT NULL,
  `porcentaje_imp` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_proveedor` (`proveedor`),
  CONSTRAINT `fk_proveedor` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
INSERT INTO `deposito` VALUES (55,'cemento premiun',900,100,228,'alta',6,'aaa-001','2024-10-30 18:34:44',100,29),(56,'piedra granza',2100,1200,3780,'alta',1,'aaa-002','2024-10-30 18:47:44',2400,15),(57,'hierro 8',1000,2000,4000,'baja',5,'aaa-003','2024-11-03 12:59:13',2000,NULL),(58,'puerta',200,100,200,'baja',1,'aaa-004','2024-11-03 21:08:08',100,NULL),(59,'tornillos',180,200,300,'alta',1,'aaa-005','2024-11-03 21:51:29',100,NULL),(60,'piedra bola',2000,1200,3600,'alta',6,'aaa-006','2024-11-05 13:49:24',2400,NULL);
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `generar_codigo_deposito` BEFORE INSERT ON `deposito` FOR EACH ROW BEGIN
    DECLARE nuevo_numero INT;

    -- Obtener el número actual más alto de la secuencia y sumarle 1
    SELECT COALESCE(MAX(CAST(SUBSTRING_INDEX(codigo, '-', -1) AS UNSIGNED)), 0) + 1
    INTO nuevo_numero
    FROM deposito;

    -- Formatear el nuevo código como 'aaa-001', 'aaa-002', etc.
    SET NEW.codigo = CONCAT('aaa-', LPAD(nuevo_numero, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_precio_venta_antes_insertar` BEFORE INSERT ON `deposito` FOR EACH ROW BEGIN
    SET NEW.precio_venta = NEW.precio + NEW.ganancia;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_stock_after_deposito` AFTER INSERT ON `deposito` FOR EACH ROW BEGIN
    -- Insertar un nuevo registro en la tabla stock con el material y su cantidad
    INSERT INTO stock (material_id, cantidad)
    VALUES (NEW.id, NEW.cantidad);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_stock_after_deposito` AFTER UPDATE ON `deposito` FOR EACH ROW BEGIN
    DECLARE cantidad_ventas INT;

    -- Sumar la cantidad total de ventas para el material correspondiente
    SET cantidad_ventas = (SELECT IFNULL(SUM(cantidad), 0) FROM ventas WHERE id_material = NEW.id);

    -- Actualizar la cantidad en stock
    UPDATE stock
    SET cantidad = NEW.cantidad - cantidad_ventas
    WHERE material_id = NEW.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `mail` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `puesto` enum('administrador','empleado') NOT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `estado` enum('alta','baja') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (8,'Gonzalo','Martini','31568987','1987-07-19','valeriano 120','gonza.mart@example.com','3512895654','prueba','$2b$12$wrLvoN7g0SF3N0teUXF0CeU44aB/W1MECeex.kDmURFUPCk67AXpq','administrador','2021-11-05','alta'),(11,'Gonzalo','Martini','1','1987-07-19','valeriano 120','gonmart@example.com','3512895654','prueba2','$2b$12$tjM8t1HEhIuwmEu6dVGAZObgKVXqkj5kCqgHBZnuuaeakKNRPb78K','administrador','2021-11-05','alta'),(14,'Mariano','Martini','30332145','2000-07-22','Valeriano 120','gonzalez.mart@example.com','351254587','prueba3','$2b$12$e9hdAsLshNQir.q6s450qekFXgeRmgjblu8sk9olhWdugKuqFbkmO','empleado','2020-10-25','alta'),(15,'Damian','Marquez','36925814','1983-08-15','paisa 58','dmarquez@example.com','3512120589','dmarquez','$2b$12$tYpBy9MwjKNM3uVGUo4kguATvMu0EOOc/6LFUalDMyv039J0yoWIi','administrador','2022-01-01','alta');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impuestos`
--

DROP TABLE IF EXISTS `impuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impuestos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `porcentaje` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impuestos`
--

LOCK TABLES `impuestos` WRITE;
/*!40000 ALTER TABLE `impuestos` DISABLE KEYS */;
INSERT INTO `impuestos` VALUES (1,'iva21',21),(2,'iva10',10),(3,'imppais',5),(6,'tarjeta',3),(7,'nafta',15);
/*!40000 ALTER TABLE `impuestos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_porcentaje_imp_despues_actualizar` AFTER UPDATE ON `impuestos` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.porcentaje_imp = (
        SELECT SUM(i.porcentaje)
        FROM material_impuesto mi
        JOIN impuestos i ON mi.id_impuesto = i.id
        WHERE mi.id_material = d.id
    )
    WHERE d.id IN (
        SELECT mi.id_material
        FROM material_impuesto mi
        WHERE mi.id_impuesto = OLD.id
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `material_impuesto`
--

DROP TABLE IF EXISTS `material_impuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_impuesto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_material` int DEFAULT NULL,
  `id_impuesto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_impuesto` (`id_impuesto`),
  KEY `fk_material_impuesto_material` (`id_material`),
  CONSTRAINT `fk_material_impuesto_material` FOREIGN KEY (`id_material`) REFERENCES `deposito` (`id`) ON DELETE CASCADE,
  CONSTRAINT `material_impuesto_ibfk_2` FOREIGN KEY (`id_impuesto`) REFERENCES `impuestos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_impuesto`
--

LOCK TABLES `material_impuesto` WRITE;
/*!40000 ALTER TABLE `material_impuesto` DISABLE KEYS */;
INSERT INTO `material_impuesto` VALUES (43,55,1),(44,55,6),(45,56,2),(46,55,3),(47,56,3);
/*!40000 ALTER TABLE `material_impuesto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_impuesto_despues_insertar` AFTER INSERT ON `material_impuesto` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.porcentaje_imp = (  -- Cambiado de 'd.impuesto' a 'd.porcentaje_imp'
        SELECT SUM(i.porcentaje)
        FROM material_impuesto mi
        JOIN impuestos i ON mi.id_impuesto = i.id
        WHERE mi.id_material = NEW.id_material
    )
    WHERE d.id = NEW.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_precio_venta_despues_insertar_material_impuesto` AFTER INSERT ON `material_impuesto` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.precio_venta = d.precio + d.ganancia + (d.precio * (
        SELECT SUM(i.porcentaje) 
        FROM material_impuesto mi 
        JOIN impuestos i ON mi.id_impuesto = i.id 
        WHERE mi.id_material = d.id
    ) / 100)
    WHERE d.id = NEW.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_precio_venta_despues_actualizar_material_impuesto` AFTER UPDATE ON `material_impuesto` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.precio_venta = d.precio + d.ganancia + (d.precio * (
        SELECT IFNULL(SUM(i.porcentaje), 0)
        FROM material_impuesto mi
        JOIN impuestos i ON mi.id_impuesto = i.id
        WHERE mi.id_material = d.id
    ) / 100)
    WHERE d.id = NEW.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_porcentaje_imp_despues_eliminar` AFTER DELETE ON `material_impuesto` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.porcentaje_imp = (
        SELECT SUM(i.porcentaje)
        FROM material_impuesto mi
        JOIN impuestos i ON mi.id_impuesto = i.id
        WHERE mi.id_material = d.id
    )
    WHERE d.id = OLD.id_material;  -- Actualiza el porcentaje_imp del material correspondiente
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_precio_venta_despues_eliminar_material_impuesto` AFTER DELETE ON `material_impuesto` FOR EACH ROW BEGIN
    UPDATE deposito d
    SET d.precio_venta = d.precio + d.ganancia + (d.precio * (
        SELECT IFNULL(SUM(i.porcentaje), 0)
        FROM material_impuesto mi
        JOIN impuestos i ON mi.id_impuesto = i.id
        WHERE mi.id_material = d.id
    ) / 100)
    WHERE d.id = OLD.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `cuit` varchar(20) DEFAULT NULL,
  `ciudad` varchar(500) DEFAULT NULL,
  `codigo_postal` int DEFAULT NULL,
  `barrio` varchar(50) DEFAULT NULL,
  `fecha_ingreso` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `razon_social` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `estado` varchar(255) DEFAULT 'alta',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cuit` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'daniel','dmontolla@gmail.com.ar','3512365896',NULL,NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(5,'jose','juares@example.com','123456789',NULL,NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(6,'Dionicio','perez@example.com','987654321',NULL,NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(7,'Natalia','naty@gmail.com','351254578',NULL,NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(8,'Damian','dm@gmail.com','36925814',NULL,NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(9,'ferrocons','ferroavenida@gmail.com','3512565896','agrego descripcion',NULL,NULL,NULL,NULL,'2024-11-05 17:57:42',NULL,NULL,NULL,'alta'),(10,'easy','easy@gmail.com','3512565896','otra descripcion','30-25632361-2','cordoba',5000,'lomas','2024-11-05 18:26:13','ferro sa.','calle',150,'alta');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `material_id` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_ibfk_1` (`material_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `deposito` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (19,55,200),(20,56,1900),(21,57,1000),(22,58,200),(23,59,180),(24,60,2000);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_material` int NOT NULL,
  `cantidad` int NOT NULL,
  `id_vendedor` int NOT NULL,
  `id_comprador` int DEFAULT NULL,
  `fecha_venta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `total` decimal(10,2) GENERATED ALWAYS AS ((`precio_venta` * (1 - (`descuento` / 100)))) VIRTUAL,
  PRIMARY KEY (`id`),
  KEY `id_material` (`id_material`),
  KEY `id_vendedor` (`id_vendedor`),
  KEY `id_comprador` (`id_comprador`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `deposito` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_vendedor`) REFERENCES `empleados` (`id`),
  CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`id_comprador`) REFERENCES `compradores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` (`id`, `id_material`, `cantidad`, `id_vendedor`, `id_comprador`, `fecha_venta`, `precio_venta`, `descuento`) VALUES (4,55,500,15,1,'2024-10-30 21:35:35',NULL,NULL),(5,56,200,15,1,'2024-10-30 21:48:31',NULL,NULL),(6,55,200,15,1,'2024-11-04 21:54:52',1200.00,20.00);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_stock_after_ventas` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
    DECLARE cantidad_deposito INT;

    -- Obtener la cantidad actual en deposito para el id_material correspondiente
    SET cantidad_deposito = (SELECT cantidad FROM deposito WHERE id = NEW.id_material);

    -- Actualizar la cantidad en stock
    UPDATE stock
    SET cantidad = cantidad_deposito - (SELECT IFNULL(SUM(cantidad), 0) FROM ventas WHERE id_material = NEW.id_material)
    WHERE material_id = NEW.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_stock_after_ventas_update` AFTER UPDATE ON `ventas` FOR EACH ROW BEGIN
    DECLARE cantidad_deposito INT;

    -- Obtener la cantidad actual en deposito para el id_material correspondiente
    SET cantidad_deposito = (SELECT cantidad FROM deposito WHERE id = NEW.id_material);

    -- Actualizar la cantidad en stock
    UPDATE stock
    SET cantidad = cantidad_deposito - (SELECT IFNULL(SUM(cantidad), 0) FROM ventas WHERE id_material = NEW.id_material)
    WHERE material_id = NEW.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_stock_after_ventas_delete` AFTER DELETE ON `ventas` FOR EACH ROW BEGIN
    DECLARE cantidad_deposito INT;

    -- Obtener la cantidad actual en deposito para el id_material correspondiente
    SET cantidad_deposito = (SELECT cantidad FROM deposito WHERE id = OLD.id_material);

    -- Actualizar la cantidad en stock
    UPDATE stock
    SET cantidad = cantidad_deposito - (SELECT IFNULL(SUM(cantidad), 0) FROM ventas WHERE id_material = OLD.id_material)
    WHERE material_id = OLD.id_material;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'corralon'
--

--
-- Dumping routines for database 'corralon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-05 17:07:42
