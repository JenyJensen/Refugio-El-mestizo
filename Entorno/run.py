from app import app  # Importar la aplicación Flask desde __init__.py
from flask import jsonify, request
from flask_cors import CORS
from app.database import get_db

# Permitir solicitudes desde cualquier origen
CORS(app)

@app.route('/api/animales', methods=['GET'])
def get_animales():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Animales')
    animales = cursor.fetchall()
    return jsonify(animales)

@app.route('/api/animales', methods=['POST'])
def add_animal():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO Animales (foto, Nombre, raza, peso, edad, descripcion) VALUES (%s, %s, %s, %s, %s, %s)',
        (data['foto'], data['Nombre'], data['raza'], data['peso'], data['edad'], data['descripcion'])
    )
    db.commit()
    return jsonify({'id': cursor.lastrowid}), 201

if __name__ == '__main__':
    app.run(debug=True)
