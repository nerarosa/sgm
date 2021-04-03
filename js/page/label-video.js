$(document).ready(function(){
	(function getFeaturedVideo () {
		$.ajax({
			url: url_blog + 'feeds/posts/summary/-/Video?alt=json-in-script&orderby=updated&max-results=12',
			type: 'get',
			dataType: "jsonp",
			success: function(data) {
				var titlePost = urlPost = thumbPost = htmlEmbed = '',
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
							thumbPost = entry[i].media$thumbnail.url.replace(/\/s[0-9](.*)\//g, '/w468-h263-c/');
						}else{
							thumbPost = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
						}
						
						itemEmbed += '<div class="col-xs-12 col-sm-4 col-md-2 portfolio_utube_item"><div class="portfolio_utube_item_image"><img src="'+ thumbPost +'" alt="'+ titlePost +'" /><a href="'+ urlPost +'" data-toggle="tooltip" data-placement="left" title="Duration">7:29</a></div><div class="portfolio_utube_item_caption"><a href="'+ urlPost +'">'+ titlePost +'</a><div class="portfolio_utube_item_caption_author"><span>by</span><a href="#"> ssgirl</a><i class="fa fa-check-square" data-toggle="tooltip" data-placement="top" title="Verified"></i></div></div></div>';
						
						if(i == 5){
							htmlEmbed += '<div class="item active"><div class="row">' + itemEmbed + '</div></div>';
							itemEmbed = '';
						}else if (i == entry.length-1){
							htmlEmbed += '<div class="item"><div class="row">' + itemEmbed + '</div></div>';	
						}
						
					}
					
					$('.featured-video .carousel-inner').html(htmlEmbed);
					$('.featured-video .carousel-inner img').each(function(){
						if (!isImageOk($(this))) {
							$(this).attr("src", $(this).attr("src"));
						}
					});
					$.getScript("https://cdn.rawgit.com/nerarosa/sgm/master/js/responsive_bootstrap_carousel.js");
				}else{
					$('.featured-video .carousel-inner').html('No Result');
				}
			},
			error: function(){
				getFeaturedVideo();
			}
		});
	})();
});