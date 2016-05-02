from flask import Flask, request, session, g, redirect, url_for, abort, \
	render_template, flash
app = Flask(__name__)

@app.route("/")
def main():
	app.logger.debug('A value for debugging')
	error = 'erororo echo'
	title = "Python request"
	return render_template('index.html',**locals())


if __name__ == "__main__":
	app.debug = True
	app.run()
