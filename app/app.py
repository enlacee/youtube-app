from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
	app.logger.debug('A value for debugging')
	return render_template('index.html')

@app.route("/hola")
def hola():
	return "hola pepe lucho <h1>hi!</h1>"

@app.route('/compartir/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

if __name__ == "__main__":
	app.debug = True
	app.run()
