from angularcp import *
def auth_api_link():
    return '/api/v' + Api_Settings.get('ApiVersion') + '/' + Api_Settings.get('AuthApi')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route(auth_api_link() + '/login', methods=['POST'])
def login():
    json_data = request.json
    user = User.query.filter_by(email=json_data['email']).first()
    if user and bcrypt.check_password_hash(user.password, json_data['password']):
        session['logged_in'] = True
        status = True
    else:
        status = False
    return jsonify({'result': status})


@app.route(auth_api_link() + '/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify({'result': 'success'})


@app.route(auth_api_link() + '/status', methods=["GET"])
def status():
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True})
    else:
        return jsonify({'status': False})

@app.route('/api/v1.0/content/all', methods=["GET"])
def show_content():
    article = Content.query.all()
    result = contents_schema.dump(article)
    return jsonify({'result': result.data})

@app.route('/api/v1.0/content/page/<int:id>')
def get_article(id):
    article = Content.query.get(id)
    result = content_schema.dump(article)
    return jsonify({'result': result.data})

if __name__ == "__main__":
    app.run(host='localhost', port=5000)