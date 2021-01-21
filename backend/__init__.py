from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

db = SQLAlchemy(app)


@app.before_first_request
def create_tables():
    db.create_all()


jwt = JWTManager(app)
api = Api(app)

jinja_options = app.jinja_options.copy()
app.jinja_options.copy().update(dict(
    variable_start_string='%%',
    variable_end_string='%%',
))
app.jinja_options = jinja_options

from backend import routes
