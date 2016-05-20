from flask import Flask, redirect, url_for, session,jsonify, render_template, request
from flask_oauth import OAuth

from flask.ext.mysqldb import MySQL

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'app_youtube'
app.config['MYSQL_HOST'] = 'localhost'
mysql.init_app(app)


# You must configure these 3 values from Google APIs console
# https://code.google.com/apis/console
GOOGLE_CLIENT_ID = '778810842547-qqvoic08gga7plchr8ska7tsr5urj0d3.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = 'Mg-rga3hkSXsx11M6HZyio9P'
REDIRECT_URI = '/authorized'  # one of the Redirect URIs from Google APIs console
# REDIRECT_URI = 'http://localhost:5000'  # one of the Redirect URIs from Google APIs console

SECRET_KEY = 'development key'
DEBUG = True

# app = Flask(__name__)
app.debug = DEBUG
app.secret_key = SECRET_KEY
oauth = OAuth()

google = oauth.remote_app('google',
	base_url='https://www.google.com/accounts/',
	authorize_url='https://accounts.google.com/o/oauth2/auth',
	request_token_url=None,
	request_token_params={'scope': 'https://www.googleapis.com/auth/youtube',
	                    'response_type': 'code'},
	access_token_url='https://accounts.google.com/o/oauth2/token',
	access_token_method='POST',
	access_token_params={'grant_type': 'authorization_code'},
	consumer_key=GOOGLE_CLIENT_ID,
	consumer_secret=GOOGLE_CLIENT_SECRET)

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/savedata')
def savedata():
	idFavorite = request.args.get('idFavorite')
	cur = mysql.connection.cursor()
	cur.execute('''SELECT user, host FROM mysql.user''')
	#
	query = "INSERT INTO scrap (id_favorite) VALUES ('%s')" % (idFavorite)
	cur.execute(query)
	mysql.connection.commit()
	#
	rv = cur.fetchall()
	return str(rv)


@app.route('/auth')
def index():
    # return jsonify(session)
    access_token = session.get('access_token')
    if access_token is None:
        return redirect(url_for('login'))

    access_token = access_token[0]
    from urllib2 import Request, urlopen, URLError

    headers = {'Authorization': 'OAuth '+access_token}
    req = Request('https://www.googleapis.com/auth/youtube',
                  None, headers)
    try:
        res = urlopen(req)
    except URLError, e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('access_token', None)
            return redirect(url_for('login'))
        return res.read()

    return res.read()


@app.route('/login')
def login():
    callback=url_for('authorized', _external=True)
    return google.authorize(callback=callback)

@app.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
    access_token = resp['access_token']
    session['access_token'] = access_token, ''
    return redirect(url_for('index'))

@google.tokengetter
def get_access_token():
    return session.get('access_token')

def main():
	app.run()


if __name__ == '__main__':
    main()
