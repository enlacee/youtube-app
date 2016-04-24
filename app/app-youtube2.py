from __future__ import unicode_literals
import youtube_dl
from flask import Flask

app = Flask(__name__)

@app.route("/")
def main():
	ydl_opts = {}
	with youtube_dl.YoutubeDL(ydl_opts) as ydl:
		ydl.download(['http://www.youtube.com/watch?v=BaW_jenozKc'])
	return "ok"

# iniciar servidor
if __name__ == "__main__":
	app.run()
