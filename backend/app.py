from flask import Flask
from controllers.search_controller import search_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5000"}})

app.register_blueprint(search_bp)


