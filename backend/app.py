from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})  # This allows all origins for all routes

def db_connection():
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

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    hashed_password = generate_password_hash(password, method='sha256')

    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    if cursor.fetchone():
        return jsonify({"message": "User already exists"}), 400

    sql = """INSERT INTO users (username, password, email) VALUES (?, ?, ?)"""
    cursor.execute(sql, (username, hashed_password, email))
    conn.commit()
    return jsonify({"message": "Registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()

    if user and check_password_hash(user[2], password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

def main():
    database = r"learn2launch.db"

    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users (
                                     id integer PRIMARY KEY,
                                     username text NOT NULL,
                                     password text NOT NULL,
                                     email text NOT NULL
                                 ); """

    conn = db_connection()

    if conn is not None:
        create_table(conn, sql_create_users_table)
    else:
        print("Error! Cannot create the database connection.")

    app.run(debug=True)

if __name__ == '__main__':
    main()