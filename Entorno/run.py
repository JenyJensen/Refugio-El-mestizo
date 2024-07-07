from app import app  # Importar la aplicación Flask desde __init__.py
from flask import jsonify, request
from flask_cors import CORS
from app.database import get_db
import os
from PIL import Image, ImageDraw
import base64
from io import BytesIO  

# Permitir solicitudes desde cualquier origen
CORS(app)

UPLOAD_FOLDER = '../Perromatch-front/static/img/'  # Carpeta donde guardarás las imágenes
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/animales', methods=['GET'])
def get_animales():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Animales')
    animales = cursor.fetchall()
    return jsonify(animales)

def save_image(base64_str, image_name):
    image_data = base64.b64decode(base64_str)
    image = Image.open(BytesIO(image_data))
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
    image.save(image_path)
    return image_name

@app.route('/api/animales', methods=['POST'])
def add_animal():
    data = request.json
    if 'foto' not in data:
        return jsonify({'error': 'No se cargó ninguna foto'}), 400
    
    foto_base64 = data['foto']
    nombre = data.get('Nombre')
    raza = data.get('raza')
    peso = data.get('peso')
    edad = data.get('edad')
    descripcion = data.get('descripcion')
    nombre_imagen = f'imagen_{nombre}.png'
    save_image(foto_base64, nombre_imagen)

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO Animales (foto, Nombre, raza, peso, edad, descripcion) VALUES (%s, %s, %s, %s, %s, %s)',
        (nombre_imagen, nombre, raza, peso, edad, descripcion)
    )
    db.commit()
    return jsonify({'id': cursor.lastrowid}), 201


@app.route('/api/animales/<int:id>', methods=['DELETE'])
def delete_animal(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM Animales WHERE id = %s', (id,))
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({'error': 'Animal no encontrado'}), 404
    return jsonify({'message': 'Animal eliminado exitosamente'}), 200

@app.route('/api/animales/<int:id>', methods=['PUT'])
def edit_animal(id):
    data = request.json

    if 'foto' not in data:
        return jsonify({'error': 'No se cargó ninguna foto'}), 400

    foto_base64 = data['foto']
    nombre = data.get('Nombre')
    raza = data.get('raza')
    peso = data.get('peso')
    edad = data.get('edad')
    descripcion = data.get('descripcion')
    nombre_imagen = f'imagen_{nombre}.png'
    save_image(foto_base64, nombre_imagen)

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'UPDATE Animales SET foto = %s, Nombre = %s, raza = %s, peso = %s, edad = %s, descripcion = %s WHERE id = %s',
        (nombre_imagen, nombre, raza, peso, edad, descripcion, id)
    )
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({'error': 'Animal no encontrado'}), 404
    return jsonify({'message': 'Animal actualizado exitosamente'}), 200


@app.route('/api/animal/<int:id>', methods=['GET'])
def get_animal(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Animales WHERE id = %s', (id,))
    animal = cursor.fetchone()
    if not animal:
        return jsonify({'error': 'Animal no encontrado'}), 404
    return jsonify(animal)

if __name__ == '__main__':
    app.run(debug=True)

