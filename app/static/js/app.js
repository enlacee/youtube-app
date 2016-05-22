
// Global module
function AppScrap(){
	this.API_KEY = 'AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI';
	this.model = new AjaxModel();

	this.getApiKey = function() {
		return this.API_KEY;
	};

}
var AS = AppScrap.prototype;

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

		});
};





var app = new AppScrap();
//app.testOne();

if (Util.getParameterByName('access_token')) {
	console.log("API youtube");
	var access_token = Util.getParameterByName('access_token');
	console.log('access_token', access_token);
	app.getDatosBasicosYoutube(access_token);
}
