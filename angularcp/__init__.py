from flask import Flask, request, jsonify, session, render_template
from flask_sqlalchemy import *
from flask_bcrypt import Bcrypt
from marshmallow import Schema, fields, ValidationError, pre_load
from angularcp.config import *

app = Flask(__name__)
app.config.from_object(BaseConfig)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

app.debug = app.config['DEBUG']

from angularcp.models import *