import os

basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dev.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Upload Settings:
    UPLOAD_FOLDER = '/static/files/uploads'  # Upload Folder
    ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg', 'gif'}  # Upload extensions
    MAX_CONTENT_LENGTH = 1 * 1024 * 1024 + 1  # Max upload size

    # mail server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = 'robot@aits.ua'
    MAIL_PASSWORD = '37Rh!_09=S/U'

    # administrator list
    ADMINS = ['inspectahdeck227@gmail.com']


# Development settings:
Test_Settings = {
    # Добавлять новый контент при старте сайта?:
    'AddRandContent': False,
    # Сколько контента добавлять:
    'AddRandContentSize': 10,
    # Api Settings:
    'ApiVersion': '1.0',
    'ApiKey': "ASLKDJKL2121",
    'AllowRegister': True
}
