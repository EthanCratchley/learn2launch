import sqlite3
import os

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('learn2launch.db')
    except sqlite3.Error as e:
        print(e)
    return conn

def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except sqlite3.Error as e:
        print(e)

def main():
    database = r"learn2launch.db"

    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users (
                                     id integer PRIMARY KEY,
                                     username text NOT NULL,
                                     password text NOT NULL,
                                     email text NOT NULL
                                 ); """

    conn = create_connection()

    if conn is not None:
        create_table(conn, sql_create_users_table)
    else:
        print("Error! Cannot create the database connection.")

if __name__ == '__main__':
    main()
