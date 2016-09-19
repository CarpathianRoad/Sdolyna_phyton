FROM tiangolo/uwsgi-nginx-flask:flask-python3.5

COPY ./app /app
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

RUN pip install flask flask_restful flask_bcrypt flask_sqlalchemy flask_mail marshmallow