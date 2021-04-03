jQuery('#out-of-the-box-demo').slippry({});

(function($){
	$(window).load(function(){
		$(".s-col").mCustomScrollbar({				
			theme:"light-thin",
			scrollButtons:{ enable: true }
		});
	});
})(jQuery);

$(document).ready(function(){
	var el = "#thumbnail-slider .inner";
	var markLabel = $(el).text();
	if(markLabel == "" || markLabel == null)
		var urlfeed = url_blog + 'feeds/posts/default/-/Video/?alt=json-in-script&orderby=updated&max-results=10';
	else 
		var urlfeed = url_blog + 'feeds/posts/default/-/Video/'+ markLabel +'?alt=json-in-script&orderby=updated&max-results=20';
	
	$.ajax({
		url: urlfeed,
		type: 'get',
		async: true,
		dataType: "jsonp",
		beforesend: function(xhr) {
		},
		success: function(data) {				
			var posturl, posttitle, postimg, sliderHtml = '',
				entry = data.feed.entry;
			if (entry !== undefined) {					
				for (var i = 0; i < entry.length; i++) {
					for (var j=0; j < entry[i].link.length; j++){
						if (entry[i].link[j].rel == "alternate"){
							posturl = entry[i].link[j].href;
							break;
						}
					}                
					posttitle = entry[i].title.$t;
					if(posttitle.length > 10) posttitle = posttitle.substring(0, 10) + "...";
					if ("media$thumbnail" in entry[i]) {
						postimg = entry[i].media$thumbnail.url;
						postimg = postimg.replace('/s72-c','/w450-h225-c');
					} else {
						postimg = "http://placehold.it/450x225&amp;text=No+Image"
					}
					sliderHtml += '<li><a href="'+posturl+'"><span class="hi-icon"><i class="fa fa-play-circle-o"></i></span><img class="thumb" src="'+ postimg +'"/></a></li>';
				}
				
				$(el).html("<ul>" + sliderHtml + "</ul>");
				
				var thumbnailSliderOptions = {
					sliderId: "thumbnail-slider",
					orientation: "horizontal",
					thumbWidth: "50%",
					thumbHeight: "auto",
					showMode: 3,
					autoAdvance: true,
					selectable: true,
					slideInterval: 3000,
					transitionSpeed: 1000,
					shuffle: false,
					startSlideIndex: 0, //0-based
					pauseOnHover: true,
					initSliderByCallingInitFunc: false,
					rightGap: 0,
					keyboardNav: true,
					mousewheelNav: true,
					before: null,
					license: "mylicense"
				};

				var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);

				$("#thumbnail-slider li a").click(function(e){
					if($(this).parent().hasClass("active") == false){
						e.preventDefault();
					}
				});
			} else {
				$(el).html('<span>No result!</span>');
			}
		},
		error: function() {				
			$(el).html('<strong>Error Loading Feed!</strong>');
		}
	});
});	

$(document).ready(function(){
	$(".cbp-hsmenu li").children("a").on("click", function(){
		$(window).scrollTop($(window).scrollTop()+1);
		$(window).scrollTop($(window).scrollTop()-1);
	});
	
	jQuery.fn.center = function () {
		this.css("position","absolute");
		this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	}
	var posOnLoad = $(this).scrollTop(0);
	var maxScrollOnLoad = $("#slider-bottom-player").offset().top;
	
	if(posOnLoad > maxScrollOnLoad){
		$("#sgm-player-wraper").addClass("isFixed").css({
			"position" : "fixed",
			"bottom" : "0px",					
			"z-index" : "99999999",
			//"background" : "#000",
			"width" : "100%",					
		});
	}
	
	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();		
		var maxscroll = $("#slider-bottom-player").offset().top;
		
		if(scroll >= maxscroll){
			if($("#sgm-player-wraper").hasClass("isFixed") == false){
				$("#sgm-player-wraper").addClass("isFixed").css({
					"position" : "fixed",
					"bottom" : "0px",
					"z-index" : "999999999",
					//"background" : "#000",
					"width" : "100%",					
				});
			}
		}else{
			if($("#sgm-player-wraper").hasClass("isFixed") == true){
				$("#sgm-player-wraper").removeClass("isFixed").css({
					"position" : "",
					"bottom" : "",
					"background" : ""
				});
			}
		}
	});
	
	var getDataListInMenu = function(el, more, curl){
		if(more == undefined) more = false;
		if(curl == undefined){
			var markLabel = $(el).text();
			var urlfeed = dblisturl + '/feeds/posts/default/-/'+ markLabel +'?alt=json-in-script&orderby=updated&max-results=6';
		}else var urlfeed = curl;
		
		$.ajax({
			url: urlfeed,
			type: 'get',
			async: false,
			dataType: "jsonp",
			beforesend: function(xhr) {
				
			},
			success: function(data) {				
				var posturl, posttitle, postimg, postid, sliderHtml = '',
					entry = data.feed.entry;
				var blogLink = data.feed.link, endAll = true;
				var conId = $(el).attr("id");
				for(var x = 0; x < blogLink.length; x++){				
					if(blogLink[x].rel == "next"){			
						endAll = false;
						var nextLink = blogLink[x].href.split("?")[1];
						nextLink = dblisturl + '/feeds/posts/default/-/'+ markLabel + "?" + nextLink;
						
						$("a[data-content-id='" + conId +"']").attr("data-more-link", nextLink).show();;
					}
				}
				if(endAll == true) $("a[data-content-id='" + conId +"']").hide();
				
				if (entry !== undefined) {					
					for (var i = 0; i < entry.length; i++) {
						for (var j=0; j < entry[i].link.length; j++){
							if (entry[i].link[j].rel == "alternate"){
								posturl = entry[i].link[j].href;
								break;
							}
						}                
						posttitle = entry[i].title.$t;
						var sorttitle = posttitle;
						if(posttitle.length > 10) sorttitle = posttitle.substring(0, 10) + "...";
						
						postid = entry[i].id.$t.split("post-")[1];
						
						var content = "content" in entry[i] ? entry[i].content.$t : "";
						
						if (content.indexOf("[playlistThumb]") != -1) {
							postimg = content.substring(content.indexOf("[playlistThumb]")+15, content.indexOf("[/playlistThumb]"));
							postimg = postimg.replace('/s1600','/w236-h180-c');
						} else {
							postimg = "http://placehold.it/236x180&amp;text=No+Image"
						}
						
						sliderHtml += '<li><a class="remote-playlist" href="javascript:void(0);" title="'+ posttitle +'" data-plist-id="'+ postid +'"><img src="'+ postimg +'" alt="'+ posttitle +'"/><span>'+ posttitle +'</span></a></li>';
						
					}
					
					if(more==false){
						$(el).html(sliderHtml);						
					}else{
						
					}
				} else {
					$(el).html('<span>No result!</span>');
				}
			},
			error: function() {
				$(el).html('<strong>Error Loading Feed!</strong>');
			}
		});
	}

	function loadCustomPlaylist(listid, auto){
		if(auto == undefined) auto = false;
		var listJsonUrl = dblisturl + "/feeds/posts/default/" + listid + "?alt=json-in-script";
		
		$.ajax({
			type: 'get',
			url: listJsonUrl,
			cache: false,			
			dataType: 'jsonp',
			success: function(data){
				var pListThumb, pListTitle, pListType, pListDes, pListContent,
				entry=data.entry;

				if (entry !== undefined) {					
					
					pListTitle = entry.title.$t;
					//tempThumb = entry.media$thumbnail.url;

					var content = "content" in entry ? entry.content.$t : "";
					pListDes = content.substring(content.indexOf("[playlistDes]")+13, content.indexOf("[/playlistDes]"));
					pListThumb = content.substring(content.indexOf("[playlistThumb]")+15, content.indexOf("[/playlistThumb]"));
					
					pListContent = content.substring(content.indexOf("[playlistCon]")+13, content.indexOf("[/playlistCon]"));
					
					$("#playlists li:eq(1)").data("thumbnail-path", pListThumb);
					$("#playlists li:eq(1) .minimalDarkCategoriesTitle").html('<span class="bold">Title: </span>' + pListTitle);
					$("#playlists li:eq(1) .minimalDarkCategoriesDescription").html('<span class="bold">Description: </span>' + pListDes);
					
					if(auto == true){						
						player1.addListener(FWDRAP.READY, function(){
							var currentCatId = player1.getCatId();							
							
							if(currentCatId != 1){
								$("#playlist2").html(pListContent);
								player1.loadPlaylist(1);
							}else if(currentCatId != 2){
								$("#playlist3").html(pListContent);
								player1.loadPlaylist(2);									
							}
							
							player1.addListener(FWDRAP.LOAD_PLAYLIST_COMPLETE, function(){
								$("#now-playing-title .playlist-title h3").text(pListTitle);
							});
						});												
					}else{
						if(player1.getIsAPIReady()){
							var currentCatId = player1.getCatId();
							
							if(currentCatId != 1){
								$("#playlist2").html(pListContent);
								player1.loadPlaylist(1);
							}else if(currentCatId != 2){
								$("#playlist3").html(pListContent);
								player1.loadPlaylist(2);
							}
							
							player1.addListener(FWDRAP.LOAD_PLAYLIST_COMPLETE, function(){
								$("#now-playing-title .playlist-title h3").text(pListTitle);
								var u  = new Url;	
								
								if(u.query.cid !== listid){
									u.query.cid = listid;
									
									if(history.pushState) {
										history.pushState(null, null, u);
									}
								}	
							});
						}
					}
				}
			},
			error: function(e) {
				console.log(e);
			}
		});
	}		
	
	var getDataList = function(el, more, curl){
		if(more == undefined) more = false;
		if(curl == undefined){
			var markLabel = $(el).text();
			var urlfeed = dblisturl + '/feeds/posts/default/-/'+ markLabel +'?alt=json-in-script&orderby=updated&max-results=6';
		}else var urlfeed = curl;
		
		$.ajax({
			url: urlfeed,
			type: 'get',
			async: true,
			dataType: "jsonp",
			beforesend: function(xhr) {
				
			},
			success: function(data) {				
				var posturl, posttitle, postimg, postid, sliderHtml = '',
					entry = data.feed.entry;
				var blogLink = data.feed.link, endAll = true;
				var conId = $(el).attr("id");
				for(var x = 0; x < blogLink.length; x++){				
					if(blogLink[x].rel == "next"){			
						endAll = false;
						var nextLink = blogLink[x].href.split("?")[1];
						nextLink = dblisturl + '/feeds/posts/default/-/'+ markLabel + "?" + nextLink;
						
						$("a[data-content-id='" + conId +"']").attr("data-more-link", nextLink).show();;
					}
				}
				if(endAll == true) $("a[data-content-id='" + conId +"']").hide();
				
				if (entry !== undefined) {
					for (var i = 0; i < entry.length; i++) {
						for (var j=0; j < entry[i].link.length; j++){
							if (entry[i].link[j].rel == "alternate"){
								posturl = entry[i].link[j].href;
								break;
							}
						}                
						posttitle = entry[i].title.$t;
						var sorttitle = posttitle;
						if(posttitle.length > 10) sorttitle = posttitle.substring(0, 10) + "...";
						
						postid = entry[i].id.$t.split("post-")[1];
						
						var content = "content" in entry[i] ? entry[i].content.$t : "";
						
						if (content.indexOf("[playlistThumb]") != -1) {
							postimg = content.substring(content.indexOf("[playlistThumb]")+15, content.indexOf("[/playlistThumb]"));
							postimg = postimg.replace('/s1600','/w236-h180-c');
						} else {
							postimg = "http://placehold.it/236x180&amp;text=No+Image"
						}
						
						sliderHtml += '<div><a class="remote-playlist" href="javascript:void(0);" title="'+ posttitle +'" data-plist-id="'+ postid +'"><h3 style="background: transparent url(' + postimg + ') center center no-repeat scroll;">' + sorttitle + '</h3></a></div>';
					}
					
					if(more==false){
						$(el).html(sliderHtml);
						
						$(el).slick({
						  centerMode: false,	  
						  slidesToShow: 5,	  
						  responsive: [
							{
								breakpoint: 1024,
								settings: {				
									centerMode: false,
									centerPadding: '40px',
									slidesToShow: 4,				
								}
							},
							{
							  breakpoint: 768,
							  settings: {
								arrows: false,
								centerMode: true,
								centerPadding: '40px',
								slidesToShow: 3,		
							  }
							},
							{
							  breakpoint: 480,
							  settings: {
								arrows: false,
								centerMode: true,
								centerPadding: '40px',
								slidesToShow: 1,			
							  }
							}
						  ]
						});
					}else{
						$(el).slick('slickAdd', sliderHtml);
						
						var totalSlide = 0;
						$(el + ' .slick-slide').each(function(e){
							if($(this).hasClass("slick-cloned") == false)
								totalSlide += 1;
						});
						
						$(el).slick('slickGoTo', totalSlide-1-1);
					}
				} else {
					$(el).html('<span>No result!</span>');
				}
			},
			error: function() {
				$(el).html('<strong>Error Loading Feed!</strong>');
			}
		});
	}
	
	$('.sgm-center').each(function(){
		getDataList($(this));
	});
			
	$('.js-add-slide').each(function(e){
		$(this).on('click', function() {
			var conId = $(this).data("content-id");
			var moreUrl = $(this).data("more-link");
			getDataList("#"+conId, true, moreUrl);
		});
	});
	
	var u  = new Url;
	if(u.query.cid !== null && u.query.cid !== undefined && u.query.cid !== ''){			
		var listid = u.query.cid
		loadCustomPlaylist(listid, true);
	}
	
	$(document).on("click", ".remote-playlist", function(e){		
		var listid = $(this).data("plist-id");
		loadCustomPlaylist(listid);		
	});
	
	$('.list-in-menu').each(function(){
		getDataListInMenu($(this));
	});
	var menu = new cbpHorizontalSlideOutMenu( document.getElementById( 'cbp-hsmenu-wrapper' ) );
});