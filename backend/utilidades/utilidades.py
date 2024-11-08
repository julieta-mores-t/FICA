import mysql.connector

def obtener_base():
    base = {
        "host": "localhost",
        "user": "root",
        "password": "1230",
        "database": "corralon"
    }
    return mysql.connector.connect(**base)