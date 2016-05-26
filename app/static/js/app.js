
// Global module
function AppScrap(params){
	this.params = {};
	this.params.apiKey = (typeof params.apiKey === "undefined") ? false : params.apiKey;
	this.loadParams(params);

	this.model = new AjaxModel();
	this.getApiKey = function() {
		return this.params.apiKey;
	};
}

var AS = AppScrap.prototype;
AS.loadParams = function(data){
	for (var k in data) {
		if (k == 'apiKey' || k == 'channelId' || k == 'maxResults' || k == 'pageToken') {
			if (data.hasOwnProperty(k)) {
				this.params[k] = data[k];
			}
		}
	}
	console.log('parans', this.params);
};
/*
* get api youtube Datos basicos
*/
AS.getDatosBasicosYoutube = function(access_token){
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,brandingSettings,invideoPromotion&mine=true&key=" + me.getApiKey();
	url += '&access_token=' + access_token;
	me.model.load(url)
		.then(function() {
			console.log('me', me);
			console.log(me.model);
			console.log("id favorito");
			console.log("Name", me.model.items[0].snippet.title);
			console.log("URL avatar", me.model.items[0].snippet.thumbnails.high.url);
			console.log("ID favoritas", me.model.items[0].contentDetails.relatedPlaylists.favorites);
			var idFavorite = me.model.items[0].contentDetails.relatedPlaylists.favorites;
			var idGoogle = me.model.items[0].contentDetails.googlePlusUserId;
			var data = JSON.stringify(me.model.items);

			$.ajax({
				method: "POST",
				url: "/savedata",
				data: {'idFavorite': idFavorite, 'idGoogle': idGoogle, 'data': data}
			})
			.done(function(msg){
				alert( "Data Saved: " + msg );
			});

			//LLcshYX07XQmRS8b09MRZ6ZA
			me.loadParams({
				"channelId": idFavorite,
				"maxResults": 10,
				"pageToken": true
			});
			me.getFavoritesList();

		});
};

AS.getFavoritesList = function() {
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=" + me.params.channelId + "&fields=items(snippet,status),nextPageToken,pageInfo,prevPageToken,tokenPagination&key=" + me.getApiKey();
	url += '&maxResults=' + me.params.maxResults;
	url += '&pageToken=' + me.params.pageToken;
	url +="&fields=items(snippet,status),nextPageToken,pageInfo,prevPageToken,tokenPagination";

	var data = new AjaxModel();
	var $space = $('#spaceScanner');
	$space.append('<p>Caragando lista de videos <code>Favoritos...</code></p>');
	data.load(url)
		.then(function() {

			var strHtml = '';
			strHtml += '<ul class="ulflex">';
			data.items.forEach(function(element, index, array){
				if (typeof element.snippet.thumbnails !== "undefined") {
					var url = 'https://www.youtube.com/watch?v=' + element.snippet.resourceId.videoId;
					strHtml += '<li><a href="' + url + '" target="_blank"><img width="200" src="'+element.snippet.thumbnails.default.url+'"/>'+element.snippet.resourceId.videoId+'</a></li>';

				}
			});
			strHtml += '</ul>';
			$space.append(strHtml);

			if(data.hasOwnProperty("nextPageToken")){
				me.loadParams({"pageToken": data.nextPageToken});
				// me.getFavoritesList();
			}

		});
};

AS.checkVideo = function(idVideo){
	var me = this;
	var url ="https://www.googleapis.com/youtube/v3/videos?part=id,snippet,status&key="+ me.getApiKey();
	url += '&id='+ idVideo;

	var data = new AjaxModel();
	data.load(url)
		.then(function() {
			// console.log(data);
			if (typeof data.items[0] !== "undefined" && data.items[0].snippet.categoryId == '10') {
				dataMusic.push({id: idVideo, title: data.items[0].snippet.title});
			}
			console.log('dataMusic', dataMusic);
		});

};


var dataMusic = [];
var app = new AppScrap({apiKey : 'AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI'});
//
app.loadParams({
	"channelId": 'LLcshYX07XQmRS8b09MRZ6ZA',
	"maxResults": 15,
	"pageToken": true
});
// app.getFavoritesList();
app.checkVideo('CevxZvSJLk8');
app.checkVideo('6jGtKgbMwRY');
app.checkVideo('XjwZAa2EjKA');



//app.testOne();

// if (Util.getParameterByName('access_token')) {
// 	console.log("API youtube");
// 	var access_token = Util.getParameterByName('access_token');
// 	console.log('access_token', access_token);
// 	app.getDatosBasicosYoutube(access_token);
// }
