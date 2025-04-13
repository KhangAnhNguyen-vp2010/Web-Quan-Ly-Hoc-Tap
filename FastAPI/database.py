# database.py
import pyodbc

def get_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=LAPTOP-8HLF4UKP\SQLEXPRESS;'
        'DATABASE=QUAN_LY_HOC_TAP;'
        'Trusted_Connection=yes;'
    )
    return conn
