from flask import Flask, render_template
from flask_cors import CORS
import os

# Obtener la ruta base del proyecto
base_dir = os.path.abspath(os.path.dirname(__file__))

# Crear la aplicación Flask con las rutas correctas para plantillas y archivos estáticos
app = Flask(__name__, template_folder=os.path.join(base_dir, '..', '..', 'Perromatch-front', 'templates'), static_folder=os.path.join(base_dir, '..', '..', 'Perromatch-front', 'static'))
CORS(app)  # Habilitar CORS para permitir peticiones del front-end

# Define tus rutas aquí
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar-mascota')
def buscar_mascota():
    return render_template('buscar-mascota.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/perromatch')
def perromatch():
    return render_template('perromatch.html')
@app.route('/fragments/footer')
def footer():
    return render_template('fragments/footer.html')
@app.route('/fragments/navbar')
def navbar():
    return render_template('fragments/navbar.html')
# Importar base de datos
from .database import get_db, init_app

# Inicializar la base de datos
init_app(app)
