from dolyna import *
from dolyna.funcs import get_key, get_api_ver, dsettings, upload_random_content


@app.route('/')
def index():
     app.send_static_file('index.html')

@app.route('/api/<version>/<tocken>/auth/register', methods=['POST'])
def register(version, tocken):
    if not dsettings('AllowRegister'):
        return jsonify({'result': False})

    if not get_key(tocken) or version != get_api_ver():
        return jsonify({'result': False})

    json_data = request.json
    user = User(
        email=json_data['email'],
        password=json_data['password']
    )
    try:
        db.session.add(user)
        db.session.commit()
        status = 'success'
    except:
        status = 'this user is already registered'
    db.session.close()
    return jsonify({'result': status})


@app.route('/api/v1.0/auth/login', methods=['POST'])
def login():
    json_data = request.json
    user = User.query.filter_by(email=json_data['email']).first()
    if user and bcrypt.check_password_hash(user.password, json_data['password']):
        session['logged_in'] = True
        status = True
    else:
        status = False
    return jsonify({'result': status})


@app.route('/api/v1.0/auth/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify({'result': 'success'})


@app.route('/api/v1.0/auth/status', methods=["GET"])
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


@app.route('/api/v1.0/content/page/<article_id>')
def get_article(article_id):
    article = Content.query.get(article_id)
    if not article:
        return jsonify({'result': 'Cant find content'})

    result = content_schema.dump(article)
    return jsonify({'result': result.data})


@app.route('/api/v1.0/content/fests')
def get_fests():
    camps = Content.query.filter_by(article_category=1)
    result = contents_schema.dump(camps)
    return jsonify({'result': result.data})


@app.route('/api/v1.0/content/camps')
def get_camps():
    festivals = Content.query.filter_by(article_category=3)
    result = contents_schema.dump(festivals)
    return jsonify({'result': result.data})


@app.route('/api/v1.0/content/countries')
def get_countries():
    countries = Content.query.filter_by(article_category=0)
    result = contents_schema.dump(countries)
    return jsonify({'result': result.data})


@app.route('/api/v1.0/content/page/delete/<article_id>', methods=["GET"])
def del_article(article_id):
    delete = Content.query.filter_by(article_id=article_id).delete()
    if not delete:
        return jsonify({'result': 'Failed to delete ID' + str(article_id)})

    db.session.commit()
    return jsonify({'result': 'Success'})


@app.route('/api/v1.0/content/page/add/', methods=["POST"])
def add_article():
    json_data = request.json
    content = Content(
        article_category=json_data['category'],
        article_title=json_data['title'],
        article_text=json_data['text'],
        article_date=json_data['date_start'],
        article_date_end=json_data['date_end']
    )
    try:
        db.session.add(content)
        db.session.commit()
        state = True
    except:
        state = False

    return jsonify({'result': state})


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']


@app.route('/api/v1.0/content/image/add/', methods=["GET", "POST"])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Добавить загрузку пути в базу.
            return jsonify({'result': True})
    return jsonify({'result': False})

if __name__ == "__main__":
    if dsettings('AddRandContent'):
        a = 0
        while a < dsettings('AddRandContentSize'):
            upload_random_content()
            a += 1

    app.run(host='127.0.0.1', port=80)
