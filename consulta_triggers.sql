
#muestra todos los triggers que hay
SELECT 
    TRIGGER_NAME 
FROM 
    information_schema.TRIGGERS
WHERE 
    TRIGGER_SCHEMA = 'corralon';

#muestra especificametne el trigger con sus datos
SELECT 
    TRIGGER_NAME, 
    EVENT_MANIPULATION AS Event,
    EVENT_OBJECT_TABLE AS TableName,
    ACTION_STATEMENT AS Definition
FROM 
    information_schema.TRIGGERS
WHERE 
    TRIGGER_SCHEMA = 'corralon'  -- Reemplaza 'tu_base_de_datos' con el nombre de tu base de datos
    AND TRIGGER_NAME = 'actualizar_precio_venta_despues_insertar_material_impuesto';  -- Reemplaza 'nombre_del_trigger' con el nombre del trigger que quieres ver
