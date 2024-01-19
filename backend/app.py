from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

app = Flask(__name__)

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('learn2launch.db')
    except sqlite3.error as e:
        print(e)
    return conn

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

if __name__ == '__main__':
    app.run(debug=True)
