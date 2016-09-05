import datetime
from angularcp import db, bcrypt
from angularcp import *


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, email, password, admin=False):
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.registered_on = datetime.datetime.now()
        self.admin = admin

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User {0}>'.format(self.email)


class Content(db.Model):
    __tablename__ = "content"

    article_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    article_category = db.Column(db.Integer, nullable=False)
    article_title = db.Column(db.String(500), nullable=False)
    article_text = db.Column(db.Text, nullable=False)
    article_date = db.Column(db.String(100), default=None)
    article_date_end = db.Column(db.String(100), nullable=False)

    def __iter__(self):
        self._values = [
            self.article_id,
            self.article_category,
            self.article_title,
            self.article_text,
            self.article_date,
            self.article_date_end]

        return iter(self._values)

    def __repr__(self):
        return '<Content %r>' % self.article_id


def format_name(article):
    return "{}, {}, {}, {}, {}, {}".format(article.article_id, article.article_category, article.article_title,
                                           article.article_text, article.article_date, article.article_date_end)


class ContentSchema(Schema):
    article_id = fields.Int(dump_only=True)
    article_category = fields.Int()
    article_title = fields.Str()
    article_text = fields.Str()
    article_date = fields.Str()
    article_date_end = fields.Str()

    @staticmethod
    def must_not_be_blank(self, data):
        if not data:
            raise ValidationError('Data not provided.')


content_schema = ContentSchema()
contents_schema = ContentSchema(many=True)
