from flask import Flask, redirect, url_for, session,jsonify, render_template, request
import json
import youtubeapi
import urllib2

app = Flask(__name__)
app.debug = True

# @app.route('/')
# def getdata():
# 	response = urllib2.urlopen("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=FLvPN2SvwQ6Vqfd1HMHYcceA&key=AIzaSyDeHDq3Af4hBv78NsZ1K4I810eEOSytQJw")
# 	return response.read()

@app.route('/')
def api():
	youtube = youtubeapi.YoutubeAPI({'key': 'AIzaSyDeHDq3Af4hBv78NsZ1K4I810eEOSytQJw'})
	# video = youtube.get_video_info('FjNdYp2gXRY')
	video = youtube.get_playlist_items_by_playlist_id('FLvPN2SvwQ6Vqfd1HMHYcceA')
	return json.dumps(video)









if __name__ == '__main__':
	app.run()
