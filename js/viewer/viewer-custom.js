$(function () {
  'use strict';
	var console = window.console || { log: function () {} };
  
	$.ajax({
		type: 'get',
		url: url_blog+"feeds/posts/summary/-/Photo?alt=json-in-script&max-results=10",
		cache: false,
		dataType: 'jsonp',
		success: function(data){
			var pTitle, pUrl, pThumb, htmlEmbed = '',
			entry = data.feed.entry;
			if(entry != undefined){
				for (var i = 0; i < entry.length; i++) {
					for (var j=0; j < entry[i].link.length; j++){
						 if (entry[i].link[j].rel == "alternate"){
							pUrl = entry[i].link[j].href;
							break;
						}
					}                
					pTitle = entry[i].title.$t;
					
					pThumb = "media$thumbnail" in entry[i] ? entry[i].media$thumbnail.url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
					
					htmlEmbed += '<li style="background: url('+ pThumb.replace(/\/s[0-9]+(\-no|\-c)?\/+/gi, '/w500-h200-c/') +') center center no-repeat; background-size: 100% auto;height: 100px;" class="list-group-item"><a target="_blank" class="other-post-url" href="'+ pUrl +'">'+ pTitle +'</a></li>';
				}
			}else{
				htmlEmbed = '<li class="list-group-item">No Result</li>';
			}
			
			$('.docs-toggles ul.list-group').html(htmlEmbed);
		},
		error: function(e){
			console.log(e);
			$('.docs-toggles ul.list-group').html('<li class="list-group-item">No Result</li>');
		}
	});
  
function getPostByDate(date, type){
	date = encodeURIComponent(date).replace("+", "%2B");
 	if(typeof type === undefined) type = "Min";
	if(type == "Max")
		var url = url_blog + "feeds/posts/summary/-/Photo?alt=json-in-script&orderby=published&published-max="+ date +"&max-results=2";
	else
		var url = url_blog + "feeds/posts/summary/-/Photo?alt=json-in-script&orderby=published&published-min="+ date +"&max-results=2";
	
	$.ajax({
		url: url,
		type: "GET",
		dataType: "jsonp",
		success: function(data){
			var urlPost='', idPost='',
			entry = data.feed.entry;
			
			if(entry !== undefined){
				for(var i=0; i<entry.length; i++){
					idPost = entry[i].id.$t.substr(entry[i].id.$t.lastIndexOf("-")+1);
					
					if(idPost == $.url("?idp")) continue;
					
					for(var j=0; j<entry[i].link.length; j++){
						if(entry[i].link[j].rel == "alternate"){
							urlPost = entry[i].link[j].href;
							break;
						}
					}
					
					if(type=="Max")
						$('.pPrev').attr('onclick', "location.href = '"+ url_blog +"p/viewer.html?idp="+ idPost +"';").prop("disabled", false);
					else
						$('.pNext').attr('onclick', "location.href = '"+ url_blog +"p/viewer.html?idp="+ idPost +"';").prop("disabled", false);	
				}

			}else{
			
			}			
		},
		error: function(e){
			console.log(e);
		}
	});
}  
  
	//generate image list
	var idp = $.url("?idp");
	
	if(typeof idp != "undefined" && idp != ''){
		var pUrl = url_blog + "feeds/posts/default/" + idp + "?alt=json-in-script";
		
		$.ajax({
			type: 'get',
			url: pUrl,
			cache: false,
			dataType: 'jsonp',
			success: function(data){
				var pListThumb, pTitle, pUrl,
				entry=data.entry;

				if (entry !== undefined) {					
					for (var j = 0; j < entry.link.length; j++) {
						if (entry.link[j].rel == "alternate") {
							pUrl = entry.link[j].href;
						}
					}
					
					pTitle = entry.title.$t;					
								
					var dPost = entry.published.$t;
					getPostByDate(dPost);
					getPostByDate(dPost, "Max");
					
					var content = "content" in entry ? entry.content.$t : "";
					
					var allImg = $(content).find("img");
					var i = 0;
					var listHTML = '';
					
					while(allImg[i]){
						if(i > 0){
							var linkimg = $(allImg[i]).attr("src");
							
							listHTML += '<li><img data-original="'+ linkimg.replace(/\/s[0-9]+(\-no|\-c)?\/+/gi, '/s0/') +'" src="' + linkimg.replace(/\/s[0-9]+(\-no|\-c)?\/+/gi, '/s480-c/') + '"/></li>';
						}
						i++;
					}
					
					if(listHTML != ''){
						$("h1.page-header").html(pTitle);
						$(".docs-pictures").html(listHTML);
						
						if ( 'undefined' !== typeof FB ){
							$(".viewer-comments").html('<div class="fb-comments" data-href="' + pUrl + '" data-numposts="10" data-width="100%" data-colorscheme="light"></div>')
							FB.XFBML.parse();
						}	
					
					//init viewer	
					var $images = $('.docs-pictures');					
					var $buttons = $('.docs-buttons');
					var handler = function (e) {
						console.log(e.type);
					};
					var dataDl = '';
					var addCropBtn = function (e) {
						$('.viewer-toolbar').append('<li data-urlimg="" class="viewer-crop"><i class="fa fa-crop" aria-hidden="true"></i></li>').prepend('<li class="viewer-dl" data-urlimg=""><i class="fa fa-download" aria-hidden="true"></i></li>');
						$('.viewer-toolbar').on('click', '.viewer-crop', function(){
							var data = $(this).data('urlimg');
							if(data == '' || data === undefined){
								return;
							}
							
							window.location.href = url_blog + 'p/cropper.html?img=' + data;
						});
						$('.viewer-toolbar').on('click', '.viewer-dl', function(){
							if(dataDl == '')
								dataDl = $(this).data('urlimg');
							
							if(dataDl == '' || dataDl === undefined){
								return;
							}
							
							/*var linkDl = document.createElement('a');
							linkDl.href = dataDl;
							linkDl.download = 'SGMImage';
							linkDl.setAttribute("hidden", true);
							linkDl.style.display = 'none';
							document.body.appendChild(linkDl);
							linkDl.click();
							document.body.removeChild(linkDl);*/
							
							var theImage = new Image();
							theImage.src = dataDl;
							var winWidth = theImage.width + 20;
							var winHeight = theImage.height + 20;
							window.open(dataDl,  null, 'height=' + winHeight + ', width=' + winWidth + ', toolbar=0, location=0, status=0, scrollbars=1, resizable=1'); 

							return false;
						});
					};
					var changeUrlImg = function(e){						
						var urlimg = $('.viewer-canvas img').attr('src');
						
						$('.viewer-crop').attr('data-urlimg', urlimg);
						$('.viewer-dl').attr('data-urlimg', urlimg);
						dataDl = urlimg;
					}
					var options = {
						// inline: true,
						url: 'data-original',
						title: false,
						build: handler,
						built: handler,
						show: handler,
						shown: handler,
						hide: handler,
						hidden: handler
					};					
					
					$images.on({
						'build.viewer': handler,
						'built.viewer': addCropBtn,
						'show.viewer': handler,
						'shown.viewer': handler,
						'hide.viewer': handler,
						'hidden.viewer': handler,
						//'view.viewer': changeUrlImg,
						'viewed.viewer':changeUrlImg
					}).viewer(options);					

					$images.viewer('show');
					
					$buttons.on('click', 'button', function () {
						var data = $(this).data();
						var args = data.arguments || [];

						if (data.method) {
						  if (data.target) {
							$images.viewer(data.method, $(data.target).val());
						  } else {
							$images.viewer(data.method, args[0], args[1]);
						  }						  
						}
					});
					
					}
				}
			},
			error: function(e) {
				console.log(e);
			}
		});
	}
	
	$('.closeWV').click(function(){
		window.close();
	});
});