$(document).ready(function(){
	var gurl = $.url('?gurl');
	var gtype = $.url('?gtype');
		
	if(typeof gtype == "undefined" || gtype == null || gtype == '') gtype == "html5";
	
	if(typeof gurl != "undefined" && gurl != null && gurl != ''){
		if(gtype == "html5"){
			$("#game-play-wrapper").html('<iframe src="'+ Base64.decode(gurl) +'" frameborder="0" height="100%" width="100%"></iframe>');
		}else{
			$("#game-play-wrapper").html('<object id="flashgame" width="100%" height="100%" align="middle" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="transparent" name="wmode"/><param value="high" name="quality"/><param value="always" name="allowscriptaccess"/><param value="internal" name="allowNetworking"/><param value="'+ Base64.decode(gurl) +'" name="movie"/><embed width="100%" height="100%" align="middle" src="'+ Base64.decode(gurl) +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allownetworking="internal" wmode="transparent" ></embed></object>');
		}
		
		var gid = $.url('?gid');
		if(typeof gid != "undefined" && gid != "" && gid != null){
			$("#func-btn .back-prev a").attr("href", "/p/game-run.html?gid="+gid);
			$("#func-btn .back-comment a").attr("href", "/p/game-run.html?gid="+gid+"#gcomment");
			
			$("#fb-send").attr("data-href", $.url('protocol') + "://" + $.url('hostname') + "/p/game-run.html?gid=" + gid);
			$("#fb-like").attr("data-href", $.url('protocol') + "://" + $.url('hostname') + "/p/game-run.html?gid=" + gid);
			//$("#gplus").attr("data-href", $.url('protocol') + "://" + $.url('hostname') + "/p/game-run.html?gid=" + gid);
			
			gapi.plusone.render("gplus", { "href": $.url('protocol') + "://" + $.url('hostname') + "/p/game-run.html?gid=" + gid });
		}		
	}else{
		window.location.href = "/game";
	}
});