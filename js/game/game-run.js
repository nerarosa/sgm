var gid = $.url('?gid');

function checkCatInMenu(catOfPost){
	var result = false;
	$("ul.cat-menu li a").removeClass("active");
	
	$("ul.cat-menu:eq(1) li a").each(function(){
		var catInMenu = $(this).attr("href").split("?cat=")[1];
		
		if(catOfPost == catInMenu){
			$(this).addClass("active");
			$(".sgmg-back").attr("href", "/p/game-cat.html?cat="+catOfPost)
			result = true;
			return false;
		}
	});	
	
	return result;
}

function getRelatedGame(label){
	var maxPost = 10;	
	if($(".related-content ul li").length > maxPost){
		return;
	}
	
	var urlfeed = gameDataUrl + '/feeds/posts/default/-/'+ label +'?alt=json-in-script&orderby=updated&max-results=11';
		
	$.ajax({
		url: urlfeed,
		type: "GET",
		dataType: "jsonp",
		success: function(data){
			var urlPost='', idPost='', thumbPost = '', titlePost = '', htmlItems = '',
			entry = data.feed.entry;
			
			if(entry !== undefined){
				for(var i=0; i<entry.length; i++){
					if($(".related-content ul li").length > maxPost){
						break;
					}
					
					idPost = entry[i].id.$t.substr(entry[i].id.$t.lastIndexOf("-")+1);																	
					if(idPost == gid){
						continue;
					}					
					if($(".related-content ul li a").length){
						var existHref = $(".related-content ul li a").attr("href");
						if(existHref.indexOf(idPost) != -1) continue;
					}
					
					for(var j=0; j<entry[i].link.length; j++){
						if(entry[i].link[j].rel == "alternate"){
							urlPost = entry[i].link[j].href;
							break;
						}
					}
					
					var content = "content" in entry[i] ? entry[i].content.$t : "",
						titlePost = entry[i].title.$t;
					
					if(content != ""){
						var thumbPost = sgmTags("thumb", content);
					}					
					
					htmlItems += '<li><a href="/p/game-run.html?gid='+ idPost +'" target="_top"><img src="' + thumbPost + '" alt=""/><span>' + titlePost + '</span></a></li>';
				}
			}else{
				console.log("Not Found!!!");
			}
			
			var htmlEmbed = "<ul>"+ htmlItems +"</ul>";
			
			$(".related-content").html(htmlEmbed);
		},
		error: function(e){
			console.log(e);
		}
	});
}

	function getGameInfo(){		
		if(typeof gid != "undefined" && gid != ''){
			var pUrl = gameDataUrl + "/feeds/posts/default/" + gid + "?alt=json-in-script";
			
			$.ajax({
				type: 'get',
				url: pUrl,
				cache: false,
				dataType: 'jsonp',
				success: function(data){
					var gThumb, gTitle, gUrl, gCover, gLink, gDes, gScreen, gType,
					entry=data.entry;

					if (entry !== undefined) {					
						for (var j = 0; j < entry.link.length; j++) {
							if (entry.link[j].rel == "alternate") {
								gUrl = entry.link[j].href;
							}
						}
						
						var pLabel = entry.category;
						
						for(var i = 0; i < pLabel.length; i++){
							if(pLabel[i].term != "html5" && pLabel[i].term != "flash"){
								getRelatedGame(pLabel[i].term);
							}
						}
						
						for(var i = 0; i < pLabel.length; i++){
							var isSetMenu = checkCatInMenu(pLabel[i].term);
							if(isSetMenu == true) break;
						}
						
						for(var i = 0; i < pLabel.length; i++){
							if(pLabel[i].term == "flash"){ 
								gType = "fl";
								break;
							}
							if(pLabel[i].term == "html5"){
								gType = "h5";
								break;
							}	
						}
						
						gTitle = entry.title.$t;				
							
						var gPost = entry.published.$t;
						
						var content = "content" in entry ? entry.content.$t : "";
						
						gThumb = sgmTags("thumb", content);
						gCover = sgmTags("cover", content);
						gLink = sgmTags("link", content);
						gDes = sgmTags("des", content);
						gScreen = sgmTags("screenshot", content);
					}
					
					$(".details .sgmg-name").text(gTitle);
					
					if(gCover != ""){
						$(".game .branding").attr("style", "background: url('"+ gCover +"') no-repeat 0 0;background-size: 100% auto;");
					}
					
					if(gThumb != ""){
						$(".game #sgm-thumb-game").attr("src", gThumb);
					}
					
					if(gLink != ""){
						if(gType == "h5")
							$(".cta .sgmg-play").attr("href", "/p/game-play.html?gurl=" + Base64.encode(gLink) + "&gid=" + gid);
						else if(gType == "fl"){
							
							$(".cta .sgmg-play").attr("href", "javascript:;").attr("data-flsrc", gLink);
							
							$(".cta .sgmg-play").click(function(){
								$("#play-game-wraper").show().html('<object id="flashgame" width="100%" height="100%" align="middle" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="transparent" name="wmode"/><param value="high" name="quality"/><param value="always" name="allowscriptaccess"/><param value="internal" name="allowNetworking"/><param value="'+ $(this).data("flsrc") +'" name="movie"/><embed width="100%" height="100%" align="middle" src="'+ $(this).data("flsrc") +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allownetworking="internal" wmode="transparent" ></embed></object>');
								$(this).children().text("Reload");
							});
							
							$(".cta").append('<a class="sgmg-full-play button" href="/p/game-play.html?gurl='+ Base64.encode(gLink) +'&gtype=flash&gid='+ gid +'" target="_top"><span>Fullscreen</span></a>');
						}	
					}
					
					if(gDes != ""){
						$(".info-detail .info-content").html(gDes);
					}
				},
				error: function(e) {
					console.log(e);
				}
			});
		}else{
			$(".details .sgmg-name").text("Game not found!!!");
			$(".cta").hide();
		}
	}
	
$(document).ready(function(){
	getGameInfo();
	$(".fb-comments").attr("data-href", window.location.href);
});