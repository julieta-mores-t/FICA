import mysql.connector

def obtener_base():
    base = {
        "host": "localhost",
        "user": "root",
        "password": "naty2611",
        "database": "corralon"
    }
    return mysql.connector.connect(**base)