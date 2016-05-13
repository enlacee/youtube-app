from __future__ import unicode_literals
import youtube_dl
from flask import Flask
app = Flask(__name__)

## logger
class MyLogger(object):
	def debug(self, msg):
		pass

	def warning(self, msg):
		pass

	def error(self, msg):
		print(msg)

def my_hook(d):
	if d['status'] == 'finished':
		print('Done downloading, now converting ...')
		print  d['filename']
	elif d['status'] == 'error':
		print "Resource is not found"

@app.route("/")
def main():
	ydl_opts = {
		'format': '140',
		'outtmpl': 'AUDIO_%(id)s.%(ext)s',
		# 'outtmpl': 'pepe.webm'
		'logger': MyLogger(),
		'progress_hooks': [my_hook],
	}
	with youtube_dl.YoutubeDL(ydl_opts) as ydl:
		ydl.download(['https://www.youtube.com/watch?v=RfkcI8dhfsQ'])
	return "ok"

# iniciar servidor
if __name__ == "__main__":
    app.run()
