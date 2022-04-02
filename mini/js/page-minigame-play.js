/*Base64 JavaScript*/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="",d,b,f,g,h,e,k=0;for(c=Base64._utf8_encode(c);k<c.length;)d=c.charCodeAt(k++),b=c.charCodeAt(k++),f=c.charCodeAt(k++),g=d>>2,d=(d&3)<<4|b>>4,h=(b&15)<<2|f>>6,e=f&63,isNaN(b)?h=e=64:isNaN(f)&&(e=64),a=a+Base64._keyStr.charAt(g)+Base64._keyStr.charAt(d)+Base64._keyStr.charAt(h)+Base64._keyStr.charAt(e);return a},decode:function(c){var a="",d,b,f,g,h,e=0;for(c=c.replace(/[^A-Za-z0-9\+\/\=]/g,
"");e<c.length;)d=Base64._keyStr.indexOf(c.charAt(e++)),b=Base64._keyStr.indexOf(c.charAt(e++)),g=Base64._keyStr.indexOf(c.charAt(e++)),h=Base64._keyStr.indexOf(c.charAt(e++)),d=d<<2|b>>4,b=(b&15)<<4|g>>2,f=(g&3)<<6|h,a+=String.fromCharCode(d),64!=g&&(a+=String.fromCharCode(b)),64!=h&&(a+=String.fromCharCode(f));return a=Base64._utf8_decode(a)},_utf8_encode:function(c){c=c.replace(/\r\n/g,"\n");for(var a="",d=0;d<c.length;d++){var b=c.charCodeAt(d);128>b?a+=String.fromCharCode(b):(127<b&&2048>b?a+=
String.fromCharCode(b>>6|192):(a+=String.fromCharCode(b>>12|224),a+=String.fromCharCode(b>>6&63|128)),a+=String.fromCharCode(b&63|128))}return a},_utf8_decode:function(c){for(var a="",d=0,b=c1=c2=0;d<c.length;)b=c.charCodeAt(d),128>b?(a+=String.fromCharCode(b),d++):191<b&&224>b?(c2=c.charCodeAt(d+1),a+=String.fromCharCode((b&31)<<6|c2&63),d+=2):(c2=c.charCodeAt(d+1),c3=c.charCodeAt(d+2),a+=String.fromCharCode((b&15)<<12|(c2&63)<<6|c3&63),d+=3);return a}};

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