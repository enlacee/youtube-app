/**
*/
// global namespace

function AppScrap(){
	this.API_KEY = 'AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI';
	this.model = new AjaxModel();

	this.getApiKey = function() {
		return this.API_KEY;
	};

}
var AS = AppScrap.prototype;

AS.testOne = function() {
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=FLvPN2SvwQ6Vqfd1HMHYcceA&key=" + me.getApiKey();
	me.model.load(url)
		.then(function() {
			console.log(me.model);
		});

};

AS.getDatosBasicosYoutube = function(access_token){
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,brandingSettings,invideoPromotion&mine=true&key=" + me.getApiKey();
	url += '&access_token=' + access_token;
	me.model.load(url)
		.then(function() {
			console.log(me.model);
		});
};


var app = new AppScrap();
app.testOne();
