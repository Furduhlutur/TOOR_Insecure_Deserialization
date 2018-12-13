# Python libraries
import os

# Installed libraries
from flask import Flask, send_from_directory, safe_join
from flask_cors import CORS

# Created libraries
from . import db
from . import api

BUILD_FOLDER='/Backend/build'

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # References for other modules
    db.init_app(app)
    app.register_blueprint(api.bp)
    @app.route('/', defaults={'filename': 'index.html'})
    @app.route('/<path:filename>')
    def download_file(filename):
        p = safe_join(BUILD_FOLDER, filename)
        print(filename)
        if not os.path.exists(p):
            return send_from_directory(BUILD_FOLDER, 'index.html')
        else:
            return send_from_directory(BUILD_FOLDER, filename)

    return app
