from flask import Flask, json, jsonify, request, session, g, redirect, url_for, abort, \
	render_template, flash
app = Flask(__name__)

@app.route("/")
def main():
	app.logger.debug('A value for debugging')
	error = 'erororo echo'
	title = "Python request"
	return render_template('index.html',**locals())

@app.route('/hello')
def hello():
	return 'Hello World'

@app.route("/json", methods=['GET'])
def getdata():
	return json.dumps({'html':'<span>All fields good !!</span>'})

@app.route('/jsonify')
def get_current_user():
    return jsonify(username="pepe rios", email="peperios@gmil.com", id="2343")

if __name__ == "__main__":
	app.debug = True
	app.run()
