var dblisturl = "https://sgmmusic-list.blogspot.com";

FWDRAPUtils.onReady(function(){		
    var listJsonUrl = dblisturl + "/feeds/posts/default/5175081066803936309?alt=json-in-script";
    
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
                                    
                var content = "content" in entry ? entry.content.$t : "";
                pListDes = content.substring(content.indexOf("[playlistDes]")+13, content.indexOf("[/playlistDes]"));
                pListThumb = content.substring(content.indexOf("[playlistThumb]")+15, content.indexOf("[/playlistThumb]"));
                
                pListContent = content.substring(content.indexOf("[playlistCon]")+13, content.indexOf("[/playlistCon]"));
                
                $("#playlist1").html(pListContent);
                $("#now-playing-title .playlist-title h3").text(pListTitle);
                
                new FWDRAP({
                    //main settings
                    instanceName:"player1",
                    parentId:"sgm-audio-player",
                    playlistsId:"playlists",
                    mainFolderPath:"http://showsexygirl.zz.mu/sgmmusic/content",
                    skinPath:"minimal_skin_dark",
                    facebookAppId:"530564293649326",//required only if the facebook share button is used
                    showSoundCloudUserNameInTitle:"yes",
                    useDeepLinking:"yes",
                    rightClickContextMenu:"default",
                    showButtonsToolTips:"yes",
                    autoPlay:"yes",
                    loop:"no",
                    shuffle:"no",
                    maxWidth:801,
                    volume:1,
                    toolTipsButtonsHideDelay:1.5,
                    toolTipsButtonFontColor:"#5a5a5a",
                    //controller settings
                    animateOnIntro:"yes",
                    showThumbnail:"yes",
                    showSoundAnimation:"yes",
                    showLoopButton:"yes",
                    showShuffleButton:"yes",
                    showDownloadMp3Button:"yes",
                    showBuyButton:"yes",
                    showFacebookButton:"no",
                    expandBackground:"no",
                    titleColor:"#FFFFFF",
                    timeColor:"#888888",
                    //controller align and size settings (described in detail in the documentation!)
                    controllerHeight:76,
                    startSpaceBetweenButtons:9,
                    spaceBetweenButtons:8,
                    separatorOffsetOutSpace:5,
                    separatorOffsetInSpace:9,
                    lastButtonsOffsetTop:14,
                    allButtonsOffsetTopAndBottom:14,
                    titleBarOffsetTop:13,
                    mainScrubberOffsetTop:47,
                    spaceBetweenMainScrubberAndTime:10,
                    startTimeSpace:10,
                    scrubbersOffsetWidth:2,
                    scrubbersOffestTotalWidth:0,
                    volumeButtonAndScrubberOffsetTop:47,
                    spaceBetweenVolumeButtonAndScrubber:6,
                    volumeScrubberOffestWidth:4,
                    scrubberOffsetBottom:10,
                    equlizerOffsetLeft:1,
                    //playlists window settings
                    showPlaylistsButtonAndPlaylists:"yes",
                    showPlaylistsByDefault:"no",
                    thumbnailSelectedType:"opacity",
                    startAtPlaylist:0,
                    startAtTrack:0,
                    buttonsMargins:0,
                    thumbnailMaxWidth:330, 
                    thumbnailMaxHeight:330,
                    horizontalSpaceBetweenThumbnails:40,
                    verticalSpaceBetweenThumbnails:40,
                    //playlist settings
                    showPlayListButtonAndPlaylist:"yes",
                    showPlayListOnAndroid:"yes",
                    showPlayListByDefault:"no",
                    showPlaylistItemPlayButton:"yes",
                    showPlaylistItemDownloadButton:"yes",
                    showPlaylistItemBuyButton:"yes",
                    forceDisableDownloadButtonForPodcast:"yes",
                    forceDisableDownloadButtonForOfficialFM:"yes",
                    forceDisableDownloadButtonForFolder:"yes",
                    addScrollBarMouseWheelSupport:"yes",
                    showTracksNumbers:"yes",
                    playlistBackgroundColor:"#000000",
                    trackTitleNormalColor:"#888888",
                    trackTitleSelectedColor:"#FFFFFF",
                    trackDurationColor:"#888888",
                    maxPlaylistItems:100,
                    nrOfVisiblePlaylistItems:12,
                    trackTitleOffsetLeft:0,
                    playPauseButtonOffsetLeftAndRight:11,
                    durationOffsetRight:9,
                    downloadButtonOffsetRight:11,
                    scrollbarOffestWidth:7,
                    //search bar settings
                    showSearchBar:"yes",
                    showSortButtons:"yes",
                    searchInputColor:"#999999",
                    searchBarHeight:38,
                    inputSearchTextOffsetTop:1,
                    inputSearchOffsetLeft:0,
                    //popup settings
                    showPopupButton:"no",
                    popupWindowBackgroundColor:"#878787",
                    popupWindowWidth:750,
                    popupWindowHeight:391
                });
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
        
});
        
function buyCustomFunction(){
    alert("The buy button can open a custom link or a custom javascript function.");
}
    
FWDRLUtils.onReady(function(){
    var urlfeed = '/feeds/posts/default/-/Photo?alt=json-in-script&orderby=updated&max-results=55';
    $.ajax({
        url: urlfeed,
        type: 'get',
        async: true,
        dataType: "jsonp",
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
                    if ("media$thumbnail" in entry[i]) {
                        postimg = entry[i].media$thumbnail.url;
                        postimg = postimg.replace('/s72-c','/w308-h266-c');
                    } else {
                        postimg = "http://placehold.it/308x266&amp;text=No+Image"
                    }
                    sliderHtml += '<li data-thumbnail-path="'+ postimg +'" data-url="link:'+ posturl +'" data-target="_blank"><div><p class="gallery1DecHeader">'+ posttitle +'</p><p class="gallery1DescP">Click to view details</p></div></li>';
                }
                $('#sgmPlaylist').html('<ul data-category-name="All Sexy">'+sliderHtml+'</ul>');
                
                new FWDIGP({
        //main settings 
        rightClickContextMenu:"default",
        instanceName:"myIGP",
        parentId:"grid-sgm-post",
        mainFolderPath:"http://showsexygirl.zz.mu/sgmmusic/content",
        skinPath:"modern-skin",
        playlistId:"sgmPlaylist",
        displayType:"fluidwidth",
        dragDirection:"both",
        autoScrollDirection:"left",
        thumbnailTransitionType:"opacity",
        allCategoriesLabel:"All Categories (mixed)",
        showAllCategories:"yes",
        autoScale:"yes",
        autoScroll:"no",
        enableVisitedThumbnails:"no",
        addZoomSupport:"yes",
        addDragAndSwipeSupport:"yes",
        disableThumbnailInteractivity:"no",
        randomizeAllCategories:"yes",
        randomizeCategories:"no",
        showThumbnailOverlay:"yes",
        showThumbnailIcon:"yes",
        showHelpScreen:"no",
        startAtCategory:1,
        maxWidth:940,
        maxHeight:600,
        thumbnailMaxWidth:210,
        thumbnailMaxHeight:190,
        maxScale:1.6,
        minScale:.8,
        autoScrollSpeed:0,
        thumbnailOverlayOpacity:.7,
        helpScreenOpacity:.3,
        backgroundColor:"#000000",
        thumbnailBackgroundColor:"#111111",
        thumbnailOverlayColor:"#000000",
        helpScreenBackgroundColor:"#FFFFFF",
        //combobox settings
        selectLabel:"SELECT CATEGORIES",
        comboBoxPosition:"topRight",
        showComboBox:"no",
        comboBoxHorizontalMargins:12,
        comboBoxVerticalMargins:12,
        comboBoxCornerRadius:3,
        selctorBackgroundNormalColor:"#FFFFFF",
        selctorBackgroundSelectedColor:"#000000",
        selctorTextNormalColor:"#000000",
        selctorTextSelectedColor:"#FFFFFF",
        buttonBackgroundNormalColor:"#FFFFFF",
        buttonBackgroundSelectedColor:"#000000",
        buttonTextNormalColor:"#000000",
        buttonTextSelectedColor:"#FFFFFF",
        comboBoxShadowColor:"#000000",
        //ligtbox settings (optional)
        facebookAppId:"213684265480896",
        buttonsAlignment:"in",
        itemBoxShadow:"none",
        descriptionWindowAnimationType:"motion",
        descriptionWindowPosition:"bottom",
        slideShowAutoPlay:"no",
        addKeyboardSupport:"yes",
        showCloseButton:"yes",
        showFacebookButton:"yes",
        showZoomButton:"yes",
        showSlideShowButton:"yes",
        showSlideShowAnimation:"yes",
        showNextAndPrevButtons:"yes",
        showNextAndPrevButtonsOnMobile:"yes",
        showDescriptionButton:"yes",
        showDescriptionByDefault:"no",
        videoShowFullScreenButton:"yes",
        videoAutoPlay:"no",
        nextVideoOrAudioAutoPlay:"yes",
        videoLoop:"no",
        audioAutoPlay:"no",
        audioLoop:"no",
        backgroundOpacity:.9,
        descriptionWindowBackgroundOpacity:.95,
        buttonsHideDelay:3,
        slideShowDelay:4,
        defaultItemWidth:640,
        defaultItemHeight:480,
        itemOffsetHeight:50,
        spaceBetweenButtons:8,
        buttonsOffsetIn:5,
        buttonsOffsetOut:5,
        itemBorderSize:0,
        itemBorderRadius:0,
        itemBackgroundColor:"#333333",
        itemBorderColor:"#333333",
        lightBoxBackgroundColor:"#000000",
        descriptionWindowBackgroundColor:"#FFFFFF",
        videoPosterBackgroundColor:"#0099FF",
        videoControllerBackgroundColor:"#FFFFFF",
        audioControllerBackgroundColor:"#FFFFFF",
        timeColor:"#000000"
    });	
            } else {
                $('#sgmPlaylist').html('<span>No result!</span>');
            }
        },
        error: function() {
            $('#sgmPlaylist').html('<strong>Error Loading Feed!</strong>');
        }
    });
});

jQuery('#out-of-the-box-demo').slippry({});

	(function($){
		$(window).load(function(){
			$(".s-col").mCustomScrollbar({				
				theme:"light-thin",
				scrollButtons:{ enable: true },
				documentTouchScroll: true
			});
			
			if ($(window).width() <= 480) {
				$(".s-col").mCustomScrollbar("destroy");
			}
			
			$(window).resize(function() {
				if(window.innerWidth > 480) {
					$(".s-col").mCustomScrollbar({				
						theme:"light-thin",
						scrollButtons:{ enable: true },
						documentTouchScroll: true
					});
				} else {
					$(".s-col").mCustomScrollbar("destroy");
				}
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
						postimg = "https://placehold.it/450x225&amp;text=No+Image"
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
							postimg = "https://placehold.it/236x180&amp;text=No+Image"
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
							postimg = "https://placehold.it/236x180&amp;text=No+Image"
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