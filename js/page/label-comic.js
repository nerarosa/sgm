$(document).ready(function(){
	(function getNewComic () {
		$.ajax({
			url: url_blog + 'feeds/posts/summary/-/ComicFull?alt=json-in-script&orderby=updated&max-results=12',
			type: 'get',
			dataType: "jsonp",
			success: function(data) {
				var titlePost = urlPost = thumbPost = datePost = htmlEmbed = '',
					entry = data.feed.entry;
				
				if(entry !== undefined){
					var itemEmbed = '';					
					for(var i = 0; i < entry.length; i++){						
						for(var j = 0; j < entry[i].link.length; j++){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
							}
						}	
						titlePost = entry[i].title.$t;
												
						if("media$thumbnail" in entry[i]){
							thumbPost = entry[i].media$thumbnail.url.replace(/\/s[0-9](.*)\//gi, '/w130-h180-c/');
						}else{
							thumbPost = 'http://placehold.it/130x180?text=IMAGE';
						}
						
						itemEmbed += '<div class="col-sm-2"><a href="'+ urlPost +'" data-toggle="tooltip" title="'+ titlePost +'" target="_top"><img src="'+ thumbPost +'" class="img-responsive" style="width:100%" alt="'+ titlePost +'" title="'+ titlePost +'"/></a></div>';
						
						if(i == 5){
							htmlEmbed += '<div class="row m-b-1">' + itemEmbed + '</div>';
							itemEmbed = '';
						}else if (i == (entry.length - 1)){
							htmlEmbed += '<div class="row">' + itemEmbed + '</div>';
						}	
					}
					
					$('.new-comic').html(htmlEmbed);
					
					$('.new-comic [data-toggle="tooltip"]').tooltip({placement: "auto bottom"});
					
					$('.new-comic .row img').each(function(){
						if (!isImageOk($(this))) {
							$(this).attr("src", $(this).attr("src"));
						}
					});
				}else{
					$('.new-comic').html('No Result');
				}
			},
			error: function(){
				getNewComic();
			}
		});
	})();
});	