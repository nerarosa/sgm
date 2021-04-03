$(document).ready(function(){
$('.main-post-content').html($($('.main-post-content noscript').text().replace(/src=/g, 'class="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==" data-original=')));

	var listimg = $('.post-body.entry-content .main-post-content').find('img');
	var gridelements = '';

	if(listimg.length >= 3){
		listimg.each(function(e){
			if(e>0){
				$(this).attr({id:"photo"+e})
				gridelements += '<a href="#photo'+ e +'"><img src="'+ $(this).attr('data-original') +'" /></a>';
			}
		});
		
		$('#postgallery').html(gridelements);
		if($('#postgallery').html() !== '')
			$("#postgallery").justifiedGallery({ 
				randomize : true,
				captions  : false,
				lastRow   : 'justify'
			});
			
		$(document).on('click', '#postgallery a', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
		});	
	}

	if(listimg.length >= 3){
		listimg.each(function(e){
			if(e==1 || e==listimg.length-1){
				if(isMobile == false)
					$(this).parent().before('<div><a href="http://www.facebook.com/cvnphotoblog" target="_blank"><img src="https://lh3.googleusercontent.com/-PXLkB5DvQO4/Vq00g6Log9I/AAAAAAAACmQ/8tSxWLshtPk/s0-Ic42/sgm468x60.jpg"/></a></div>');
				else
					$(this).parent().before('<div><a href="http://www.facebook.com/cvnphotoblog" target="_blank"><img src="https://lh3.googleusercontent.com/-jvkiPdK3STs/Vq0w40f59XI/AAAAAAAACl8/FD_YPjZtG1M/s0-Ic42/sgm300x50.jpg"/></a></div>');
			}	
		});
	}
	
	//right mini thumb
	var thumbelements = '';
	var numImg=0, bigW=141, bigH=141, smallW=72, smallH=72;
	
	if(listimg.length > 0){
		listimg.each(function(e){
			if(e>0){
				//$(this).load(function(){
					//var imgW=$(this).width();
					//var imgH=$(this).height();
					var imgW=listimg[e].naturalWidth;
					var imgH=listimg[e].naturalHeight;
					
					thumbelements += '<span style="text-align:center;"><a href="#photo'+ e +'"><img src="http://p0.ttimg.vn/images/spacer.gif" style="background: transparent url(\'' + $(this).attr('data-original') + '\') no-repeat scroll center center; width:100px; margin-bottom:1px; background-size:' + (imgW > imgH ? 'auto 100%' : '100% auto') + '; -moz-background-size:100% auto;" /></a></span>';
				//});
				numImg++;
				
				var srcImage = $(this).parent().attr('href');
				var thumbImage = srcImage.replace(/\/s[0-9]+(.*)\//g, "/s100/");
				var titleImage = $(this).attr('alt');
				$("#gallery").append('<img alt="'+ titleImage +'" src="'+ thumbImage +'" data-image="'+ srcImage +'" data-description="'+ titleImage +'">');
				if(e==1){
					$('#func-btn-gallery a.gl-download').attr('href', srcImage);
					$('#func-btn-gallery a.gl-crop').attr('href', url_blog + 'p/cropper.html?img=' + srcImage);
				}
				
				if($(this).parent().hasClass("adult-content")==false){
					$(this).attr({'data-zoom-image':srcImage});
				}else{
					$(this).attr({'data-original':"https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg", 'data-zoom-image':srcImage, 'data-adult-original':$(this).attr('data-original')})
				}
				
			}
		});
		
		if(isMobile == false){
		$('#hor-1').html(thumbelements);
				
		if(numImg > 9 && numImg < 13){
			bigH += 47;
			smallH += 24;
		}else if(numImg > 12 && numImg < 17){
			bigH += 47;
			bigW += 47;
			smallH += 24*2;
		}else if(numImg > 16 && numImg < 21){
			bigH += 47*2;
			smallH += 24*3;
		}else if(numImg > 20 && numImg < 26){
			bigH += 47*2;
			bigW += 47*2;
			smallH += 24*4;
		}else if(numImg > 25 && numImg < 31){
			bigH += 47*3;
			smallH += 24*5;
		}else if(numImg > 30 && numImg < 36){
			bigH += 47*3;
			bigW += 47*3;
			smallH += 24*6;
		}else if(numImg > 35){
			bigH += 47*4;
			bigW += 47*4;
			smallH += 24*7;
		}
		
		$('.thumbRight').css('height', smallH+'px');
		$('.thumbRight .thumbAll').css('height', smallH+'px');
		
		$(".thumbRight").click(function(){
			$(".thumbRight").animate({
				height: bigH+"px",
				width: bigW+"px"
			});
			$(".thumbRight .thumbAll").animate({
				height:bigH+"px",
				width:bigW+"px"
			});
            $(".thumbRight span").animate({
                width:"46px",
                height:"46px"
            });
            
			$(".btnThumbClose").fadeIn("fast");
		});
		$(".btnThumbClose").click(function(){
			$(".thumbRight").animate({	
				height:smallH+"px",
				width:"72px"
			});
			$(".thumbRight .thumbAll").animate({
				height:smallH+"px",
				width:"72px"     
			});
            
            $(".thumbRight span").animate({
                width:"23px",
                height:"23px"    
            });
            
			$(".btnThumbClose").fadeOut("fast");
		});
		$(window).scroll(function() {
			if ($(this).scrollTop() > ($('#wrapper').offset().top - 60) ) {
				$('.thumbRight').fadeIn(); 
			} else {
				$('.thumbRight').fadeOut(); 
			}
		});
		}
	}
	
	$("img.lazy").lazyload({
		effect : "fadeIn"
	});
	
	if(isMobile == false){
		$('img.lazy').each(function(e){
			if($(this).parent().hasClass("adult-content")==false){
				$(this).on('load',function(){
					var imgZ = $(this);
					imgZ.elevateZoom({
						scrollZoom : true, 
						borderColour: "rgba(255, 255, 255, 0.5)",				
						cursor: "pointer"
					});
					if($('.zoomContainer').height() <= 1){
						$('.zoomContainer').remove();
						imgZ.removeData('elevateZoom');
						imgZ.removeData('zoomImage');
						imgZ.elevateZoom({
							scrollZoom : true, 
							borderColour: "rgba(255, 255, 255, 0.5)",					
							cursor: "pointer"
						});
					}
				});
			}
		});
	}
	
	var unite = $("#gallery").unitegallery({
		theme_enable_text_panel: false,
		slider_scale_mode: "fill",
		gallery_height:"600",	
	});
	unite.on("item_change",function(num, data){		
		$('#func-btn-gallery a.gl-download').attr('href',data.urlImage);
		$('#func-btn-gallery a.gl-crop').attr('href', url_blog + 'p/cropper.html?img=' + data.urlImage);
	});
	$("#layout-gallery").on("dblclick", ".ug-item-wrapper", function(){
		unite.resetZoom();
	});
	
	if($('#music-id').length){
		var SCId = $('#music-id').data('soundcloud-id');
		if(SCId !== ''&&SCId !== undefined){
			$("#backgroundSC").attr("src", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+SCId+"&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_playcount=false&amp;show_artwork=false&amp;sharing=false&amp;buying=false&amp;liking=false&amp;download=false");
		}
	}
	
	var soundcloudFrID = SC.Widget("backgroundSC");
	soundcloudFrID.bind(SC.Widget.Events.ERROR, function() {
		soundcloudFrID.load('http://api.soundcloud.com/tracks/174822441', {
          show_artwork: false,
		  show_playcount: false,
		  hide_related: false,
		  show_comments: false,
		  show_user: false,
		  show_reposts: false,
		  sharing: false,
		  buying: false,
		  liking: false,
		  download: false,
		  auto_play: false,
		  color: "ff5500"
        });
	});
	
	$("#change-layout-button .display-viewer a").click(function(e){
		e.preventDefault();
		
		var h = screen.height ,
			w = screen.width;
		
		var params = [
			'height=' + h,
			'width=' + w,
			'fullscreen=yes', // only works in IE, but here for completeness
			'menubar=no',
			'location=yes',
			'resizable=yes',
			'scrollbars=yes',
			'status=no'
		].join(',');			 

		var popup = window.open($(this).attr("href"), 'viewer_window', params); 
		popup.moveTo(0,0);
		var wp = popup.outerWidth,
			hp = popup.outerHeight;
		if(wp < w || hp < h) popup.resizeTo(w, h);
		popup.focus();
	});
	$("#change-layout-button .display-slider a").click(function(e){
		e.preventDefault();
		if($(this).hasClass('active') == false){
			$("#change-layout-button .display-list a").removeClass('active');
			$(this).addClass("active");
			$("#layout-gallery").fadeIn();
			$('.main-post-content').fadeOut();
			$('.zoomContainer').css('display', 'none');
			//unite.play();
			soundcloudFrID.play();
		}
	});
	$("#change-layout-button .display-list a").click(function(e){
		e.preventDefault();
		if($(this).hasClass('active') == false){
			$("#change-layout-button .display-slider a").removeClass('active');
			$(this).addClass("active");
			$('.main-post-content').fadeIn();
			$('.zoomContainer').css('display', '');
			soundcloudFrID.pause();
			//unite.stop();
			$("#layout-gallery").fadeOut();			
		}
	});
	$("#func-btn-gallery a.gl-print").click(function(){		
		var printWindow = window.open('', 'sSGirl Print Window','location=1,status=1,scrollbars=1,width=800,height=600');
        printWindow.document.write('<html><head><title>Print Window</title>');
        printWindow.document.write('</head><body ><img src=\'');
        printWindow.document.write( $("#func-btn-gallery a.gl-download").attr("href") );
        printWindow.document.write('\' /></body></html>');
        printWindow.document.close();
        printWindow.focus();
		printWindow.print();
		printWindow.close();
		
	});
		
	$(window).scroll(function() {
	if($("body").hasClass("next-page-loaded") == false){
		if ($('.sgm-post-footer').isOnScreen() == true) {
			$("body").addClass("next-page-loaded");
			if(nextPageLink == '')
			if($(".link-continues").length > 0){
				nextPageLink = $(".link-continues").attr("href");				
			}
			
			if(nextPageLink.indexOf(".html") != -1){
				nextPageLink = nextPageLink.replace('www.sexygirlmedia.com', 'sexygirlmedia.blogspot.com');
			}
			
			if(nextPageLink != ''){
				$.get(nextPageLink, function(data) {
					var photoList = $($.parseHTML($(data).find(".main-post-content noscript").text())).find('img'), nextHTML='';
					var titleNextPage = $(data).find('.blog-posts h1.post-title').text();
					if(photoList.length > 0){
						var nextContentHTML = '', miniOtherThumb = '', topThumb = '';
						photoList.each(function(e){						
							if(e == 0){
								topThumb = '<a title="'+ titleNextPage +'" href="'+ nextPageLink +'"><img src="' + $(this).attr("src").replace(/\/s[0-9]+/g, "/s1600") + '"/></a>';
							}else{
								miniOtherThumb += '<div class="next-gallery-item"><a title="'+ titleNextPage +'" href="'+ nextPageLink +'"><img src="' + $(this).attr("src").replace(/\/s[0-9]+/g, "/w280-h370-c") + '"/></a></div>';
							}
						});
						
						nextHTML = '<div class="next-page-gallery"><div class="next-title"><h3>'+ titleNextPage +'</h3></div><div class="featured-photo">'+ topThumb +'</div><div class="next-gallery">'+ miniOtherThumb +'<div class="clear"></div></div></div>';
					}
					if(nextHTML != ''){
						$("#related_posts").before(nextHTML);
					}
				}).fail(function() {
					$("body").removeClass("next-page-loaded");
				});
			}
		}
	}	
	});	
});