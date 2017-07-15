var audiobookSourceType = document.getElementById('book-play-source').getAttribute("data-abhost");
var audiobookSource = document.getElementById('book-play-source').getAttribute("data-absource");

if(audiobookSourceType == 'yt'){
/**
 * uiMorphingButton_fixed.js v1.0.0
 */
;( function( window ) {
	'use strict';
	var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function UIMorphingButton( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	UIMorphingButton.prototype.options = {
		closeEl : '',
		onBeforeOpen : function() { return false; },
		onAfterOpen : function() { return false; },
		onBeforeClose : function() { return false; },
		onAfterClose : function() { return false; }
	}

	UIMorphingButton.prototype._init = function() {
		this.button = this.el.querySelector( 'button' );
		this.expanded = false;
		this.contentEl = this.el.querySelector( '.morph-content' );
		this._initEvents();
	}

	UIMorphingButton.prototype._initEvents = function() {
		var self = this;
		this.button.addEventListener( 'click', function() { self.toggle(); } );
		if( this.options.closeEl !== '' ) {
			var closeEl = this.el.querySelector( this.options.closeEl );
			if( closeEl ) {
				closeEl.addEventListener( 'click', function() { self.toggle(); } );
			}
		}
	}

	UIMorphingButton.prototype.toggle = function() {
		if( this.isAnimating ) return false;

		if( this.expanded ) {
			this.options.onBeforeClose();
		}
		else {
			classie.addClass( this.el, 'active' );
			this.options.onBeforeOpen();
		}

		this.isAnimating = true;

		var self = this,
			onEndTransitionFn = function( ev ) {
				if( ev.target !== this ) return false;

				if( support.transitions ) {
					if( self.expanded && ev.propertyName !== 'opacity' || !self.expanded && ev.propertyName !== 'width' && ev.propertyName !== 'height' && ev.propertyName !== 'left' && ev.propertyName !== 'top' ) {
						return false;
					}
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				self.isAnimating = false;
				
				if( self.expanded ) {
					classie.removeClass( self.el, 'active' );
					self.options.onAfterClose();
				}
				else {
					self.options.onAfterOpen();
				}

				self.expanded = !self.expanded;
			};

		if( support.transitions ) {
			this.contentEl.addEventListener( transEndEventName, onEndTransitionFn );
		}
		else {
			onEndTransitionFn();
		}
		
		var buttonPos = this.button.getBoundingClientRect();
		classie.addClass( this.contentEl, 'no-transition' );
		this.contentEl.style.left = 'auto';
		this.contentEl.style.top = 'auto';
		
		setTimeout( function() { 
			self.contentEl.style.left = buttonPos.left + 'px';
			self.contentEl.style.top = buttonPos.top + 'px';
			
			if( self.expanded ) {
				classie.removeClass( self.contentEl, 'no-transition' );
				classie.removeClass( self.el, 'open' );
			}
			else {
				setTimeout( function() { 
					classie.removeClass( self.contentEl, 'no-transition' );
					classie.addClass( self.el, 'open' ); 
				}, 25 );
			}
		}, 25 );
	}

	window.UIMorphingButton = UIMorphingButton;

})( window );

var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var plist = false;
if(audiobookSource.length > 11){
	plist = true;
	var totalVideo, curVideo;
}	
var time_update_interval;
function onYouTubeIframeAPIReady() {
	if(plist == false)
		player = new YT.Player('video-placeholder', {
			width: 600,
			height: 400,
			videoId: audiobookSource,
			playerVars: {
				color: 'white',
				autoplay: 0
			},
			events: {
				'onReady': initialize,
				'onStateChange': onPlayerStateChange
			}
		});
	else{
		player = new YT.Player('video-placeholder', {
			width: 600,
			height: 400,					
			playerVars: {
				color: 'white',
				autoplay: 0
			},
			events: {
				'onReady': initialize,
				'onStateChange': onPlayerStateChange
			}
		});
	}
}

function initialize(event){			
	if(plist == true){
		event.target.cuePlaylist({
			listType:'playlist',
			list:audiobookSource,
			index:parseInt(0),
			suggestedQuality:'small'
		});
	}
	
	updateTimerDisplay();
	updateProgressBar();
	if(plist == false)
		$('.play-book span').text(formatTime( player.getDuration() ));
	clearInterval(time_update_interval);

	time_update_interval = setInterval(function () {
		updateTimerDisplay();
		updateProgressBar();
	}, 1000)
}

function onPlayerStateChange(event) {				
	if (event.data == YT.PlayerState.PLAYING) {
		setInterval(function () {
			$('.play-book span').text(formatTime(player.getCurrentTime()));
		}, 1000)
	}
	if(plist == true)
	if (event.data == YT.PlayerState.CUED) {
		totalVideo = event.target.getPlaylist().length;
		curVideo = event.target.getPlaylistIndex();

		$('#current-time').before('<span id="plist-info">Phần <span>'+ (curVideo + 1) + '</span>/' + totalVideo +'</span>');
		$('.play-book span').text(formatTime(event.target.getDuration()));
	}
}
function updateTimerDisplay(){			
	$('#current-time').text(formatTime(player.getCurrentTime()));
	$('#duration').text(formatTime( player.getDuration() ));	
}
function formatTime(time){
	time = Math.round(time);

	var hours = Math.floor(time / 3600),
		minutes = Math.floor((time - (hours * 3600)) / 60),
		seconds = time - hours * 3600 - minutes * 60;

	seconds = seconds < 10 ? '0' + seconds : seconds;

	var result = "00:00:00";
	if(hours > 0)
		result = hours + ":" + minutes + ":" + seconds
	else
		result = minutes + ":" + seconds;
	return result;
}

function updateProgressBar(){
	var currentPercent = (player.getCurrentTime() / player.getDuration()) * 100;
	$('.progress-bar span').css("width", currentPercent + "%").text(currentPercent + "%")
}

(function() {	
	var docElem = window.document.documentElement, didScroll, scrollPosition;

	function noScrollFn() {
		window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
	}

	function noScroll() {
		window.removeEventListener( 'scroll', scrollHandler );
		window.addEventListener( 'scroll', noScrollFn );
	}

	function scrollFn() {
		window.addEventListener( 'scroll', scrollHandler );
	}

	function canScroll() {
		window.removeEventListener( 'scroll', noScrollFn );
		scrollFn();
	}

	function scrollHandler() {
		if( !didScroll ) {
			didScroll = true;
			setTimeout( function() { scrollPage(); }, 60 );
		}
	};

	function scrollPage() {
		scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
		didScroll = false;
	};

	scrollFn();
	
	var el = document.querySelector( '.morph-button' );
	new UIMorphingButton( el, {
		closeEl : '.icon-close',
		onBeforeOpen : function() {			
			noScroll();
			player.playVideo();
		},
		onAfterOpen : function() {			
			canScroll();
			classie.addClass( document.body, 'noscroll' );
			classie.addClass( document.documentElement, 'noscroll' );			
			classie.addClass( el, 'scroll' );
		},
		onBeforeClose : function() {			
			classie.removeClass( document.body, 'noscroll' );
			classie.removeClass( document.documentElement, 'noscroll' );			
			classie.removeClass( el, 'scroll' );			
			noScroll();
		},
		onAfterClose : function() {			
			canScroll();
			player.pauseVideo();
		}
	} );
})();

//fullscreen slideshow
/* imagesLoaded jQuery plugin by @desandro : https://github.com/desandro/imagesloaded */
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);

/* cbpBGSlideshow.js v1.0.0*/
var cbpBGSlideshow = (function() {
	var $slideshow = $( '#cbp-bislideshow' ),
		$items = $slideshow.children( 'li' ),
		itemsCount = $items.length,
		$controls = $( '#cbp-bicontrols' ),
		navigation = {
			$navPrev : $controls.find( 'span.cbp-biprev' ),
			$navNext : $controls.find( 'span.cbp-binext' ),
			$navPlayPause : $controls.find( 'span.cbp-bipause' )
		},
		current = 0,
		slideshowtime,
		isSlideshowActive = true,
		interval = 3500;

	function init( config ) {
		$slideshow.imagesLoaded( function() {
			if( Modernizr.backgroundsize ) {
				$items.each( function() {
					var $item = $( this );
					$item.css( 'background-image', 'url(' + $item.find( 'img' ).attr( 'src' ) + ')' );
				} );
			}
			else {
				$slideshow.find( 'img' ).show();
			}
			$items.eq( current ).css( 'opacity', 1 );
			initEvents();
			startSlideshow();
		} );
	}

	function initEvents() {
		navigation.$navPlayPause.on( 'click', function() {
			var $control = $( this );
			if( $control.hasClass( 'cbp-biplay' ) ) {
				$control.removeClass( 'cbp-biplay' ).addClass( 'cbp-bipause' );
				player.playVideo();
				startSlideshow();
			}
			else {
				$control.removeClass( 'cbp-bipause' ).addClass( 'cbp-biplay' );
				player.pauseVideo();
				stopSlideshow();
			}
		} );

		navigation.$navPrev.on( 'click', function() { 
			navigate( 'prev' ); 
			if(plist == true){
				player.previousVideo();
				if($('#plist-info span').text() > 1)
					$('#plist-info span').text(parseInt($('#plist-info span').text()) - 1);
			}	
			if( isSlideshowActive ) { 
				startSlideshow(); 
			} 
		} );
		navigation.$navNext.on( 'click', function() { 
			if(plist == true){
				player.nextVideo();
				if($('#plist-info span').text() < totalVideo)
					$('#plist-info span').text(parseInt($('#plist-info span').text()) + 1);
			}	
			navigate( 'next' ); 
			if( isSlideshowActive ) { 
				startSlideshow(); 
			}
		} );
	}

	function navigate( direction ) {
		var $oldItem = $items.eq( current );
		
		if( direction === 'next' ) {
			current = current < itemsCount - 1 ? ++current : 0;
		}
		else if( direction === 'prev' ) {
			current = current > 0 ? --current : itemsCount - 1;
		}

		var $newItem = $items.eq( current );
		$oldItem.css( 'opacity', 0 );
		$newItem.css( 'opacity', 1 );
	}

	function startSlideshow() {
		isSlideshowActive = true;
		clearTimeout( slideshowtime );
		slideshowtime = setTimeout( function() {
			navigate( 'next' );
			startSlideshow();
		}, interval );
	}

	function stopSlideshow() {
		isSlideshowActive = false;
		clearTimeout( slideshowtime );
	}

	return { init : init };

})();
}

$(function() {
	var bookInfoData = $('.book-info').html();
	var bookAuthor = sgmTags('author', bookInfoData),
		bookSum = sgmTags('sum', bookInfoData);

	$('.mockup-right .book-author a').text(bookAuthor);
	$('.mockup-right .book-summary').html(bookSum);


	if(audiobookSourceType == 'yt'){
		cbpBGSlideshow.init();

		var timeDrag = false;
		$('.progress-bar').mousedown(function(e) {
			timeDrag = true;
			updatebar(e.pageX);
		});
		$(document).mouseup(function(e) {
			if(timeDrag) {
				timeDrag = false;
				updatebar(e.pageX);
			}
		});
		$(document).mousemove(function(e) {
			if(timeDrag) {
				updatebar(e.pageX);
			}
		});
		 
		var updatebar = function(x) {
			var progress = $('.progress-bar');
			var maxduration = player.getDuration();
			var position = x - progress.offset().left;
			var percentage = 100 * position / progress.width();
			console.log(percentage);
			if(percentage > 100) {
				percentage = 100;
			}
			if(percentage < 0) {
				percentage = 0;
			}
			$('.progress-bar span').css('width', percentage+'%');
			player.seekTo(maxduration * percentage / 100);
		};

		/*
		$('#mute-toggle').on('click', function() {
			var mute_toggle = $(this);

			if(player.isMuted()){
				player.unMute();
				mute_toggle.text('volume_up');
			}
			else{
				player.mute();
				mute_toggle.text('volume_off');
			}
		});

		$('#volume-input').on('change', function () {
			player.setVolume($(this).val());
		});*/
	}else if(audiobookSourceType == 'mix'){
		$('.morph-content').hide();
		$('.play-book span').hide();
		$('.play-book').on('click', function(){
			if($("#audio-player").length <= 0)
				$('.entry-content section.ab-content-wrap').before('<div id="audio-player"><iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?feed='+ encodeURIComponent(audiobookSource) +'&hide_cover=1&autoplay=1" frameborder="0"></iframe></div>');
			$(this).hide();
			$("html, body").animate({ scrollTop: $(".post.hentry").offset().top }, "slow");
			return false;
		});
	}
});
