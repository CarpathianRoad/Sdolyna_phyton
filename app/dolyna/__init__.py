from flask import Flask, request, jsonify, session, render_template
from flask_sqlalchemy import *
from flask_bcrypt import Bcrypt
from marshmallow import Schema, fields, ValidationError, pre_load
from dolyna.config import *
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config.from_object(BaseConfig)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

app.debug = app.config['DEBUG']

from dolyna.models import *
from dolyna.main import *
from dolyna.funcs import *