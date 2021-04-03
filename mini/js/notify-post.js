/**
 * notificationFx.js v1.0.0
 */
;( function( window ) {
	'use strict';

	var docElem = window.document.documentElement,
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function NotificationFx( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	NotificationFx.prototype.options = {
		wrapper : document.body,
		message : 'yo!',
		layout : 'growl',
		effect : 'slide',
		type : 'error',
		ttl : 6000,
		onClose : function() { return false; },
		onOpen : function() { return false; }
	}

	NotificationFx.prototype._init = function() {
		this.ntf = document.createElement( 'div' );
		this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
		var strinner = '<div class="ns-box-inner">';
		strinner += this.options.message;
		strinner += '</div>';
		strinner += '<span class="ns-close"></span></div>';
		this.ntf.innerHTML = strinner;

		this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

		var self = this;
		this.dismissttl = setTimeout( function() {
			if( self.active ) {
				self.dismiss();
			}
		}, this.options.ttl );

		this._initEvents();
	}

	NotificationFx.prototype._initEvents = function() {
		var self = this;
		this.ntf.querySelector( '.ns-close' ).addEventListener( 'click', function() { self.dismiss(); } );
	}

	NotificationFx.prototype.show = function() {
		this.active = true;
		classie.remove( this.ntf, 'ns-hide' );
		classie.add( this.ntf, 'ns-show' );
		this.options.onOpen();
	}

	NotificationFx.prototype.dismiss = function() {
		var self = this;
		this.active = false;
		clearTimeout( this.dismissttl );
		classie.remove( this.ntf, 'ns-show' );
		setTimeout( function() {
			classie.add( self.ntf, 'ns-hide' );
			self.options.onClose();
		}, 25 );

		var onEndAnimationFn = function( ev ) {
			if( support.animations ) {
				if( ev.target !== self.ntf ) return false;
				this.removeEventListener( animEndEventName, onEndAnimationFn );
			}
			self.options.wrapper.removeChild( this );
		};

		if( support.animations ) {
			this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
		}
		else {
			onEndAnimationFn();
		}
	}

	window.NotificationFx = NotificationFx;
} )( window );

function getTotalVideoN(callback){
	$.ajax({
		url: "https://sexygirlmedia.blogspot.com/feeds/posts/summary/-/Video?alt=json-in-script&max-results=0",
		type: "GET",
		dataType: "jsonp",
		async: true,
		success: function(data){
			callback(data.feed.openSearch$totalResults.$t);
		}
	});
}

function getNotify(){
	getTotalVideoN(function(totalVideo){
		var url = '';
		if(totalVideo > 0){
			var randIndex = Math.floor(Math.random() * totalVideo) + 1;
			url = "https://sexygirlmedia.blogspot.com/feeds/posts/summary/-/Video?alt=json-in-script&orderby=published&start-index="+ randIndex +"&max-results=1";
		}else{
			url = "https://sexygirlmedia.blogspot.com/feeds/posts/summary?alt=json-in-script&orderby=published&max-results=1";
		}
		
		$.ajax({
			url: url,
			type: "GET",
			dataType: "jsonp",
			async: true,
			catch: false,
			success: function(data){
				var titlePost = '', thumbPost = '', urlPost='', htmlADS='';
				var entry = data.feed.entry;
				
				if(entry !== undefined){
					for(var i=0; i<entry.length; i++){
						for(var j=0; j<entry[i].link.length; j++){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
								break;
							}
						}
						
						titlePost = entry[i].title.$t;						
						
						if("media$thumbnail" in entry[i]){
							thumbPost = entry[i].media$thumbnail.url;
							//thumbPost = thumbPost.replace(/\/s[0-9]+(\-c)?/g, "/s100-c")
						}else{
							thumbPost = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
						}
						
						htmlADS = '<span style="position: absolute;top:0;left:5px;color: #000;font-weight: bold;">You have a message!</span><a href="'+ urlPost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'" style="float: left;margin-right: 2px;"></a><a href="'+ urlPost +'">'+ titlePost +'</a><span style="color: #F00;font-weight: bold;position: absolute;bottom: 0;width: 100%;left: 0;text-align: center;">Click to view!</span>';
					}
					
					$('.noticeContent').html(htmlADS);
				}else{
					
				}
			},
			error: function(){
				
			}
		});
	});
}

(function() {
	// create the notification
	var notification = new NotificationFx({
		message : '<p class="noticeContent"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==" width="72" height="72" alt="Show Sexy Girl" style="float: left;margin-right: 2px;"><a href="#">Show Sexy Girl</a></p>',
		layout : 'attached',
		effect : 'flip',
		type : 'notice', // notice, warning or error
		ttl: 15000,
		onClose : function() {
			
		},
		onOpen : function() { 
			//$('<audio id="chatAudio"><source src="https://dl.dropbox.com/s/2h8s89f6yect9hv/sring.ogg" type="audio/ogg"><source src="https://dl.dropbox.com/s/2d3tk82khxn9ia3/sring.mp3" type="audio/mpeg"><source src="https://dl.dropbox.com/s/lsg8pr4gee5u3cx/sring.wav" type="audio/wav"></audio>').appendTo('body');
			//$('#chatAudio')[0].play();
			getNotify();
		}
	});

	// show the notification
	notification.show();
	
	setInterval(function(){
		var notification = new NotificationFx({
			message : '<p class="noticeContent"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==" width="72" height="72" alt="Show Sexy Girl" style="float: left;margin-right: 2px;"><a href="#">Show Sexy Girl</a></p>',
			layout : 'attached',
			effect : 'flip',
			type : 'notice', // notice, warning or error
			ttl: 15000,
			onClose : function() {
				
			},
			onOpen : function() {
				//$('#chatAudio')[0].play();
				getNotify();
			}
		});
		
		notification.show();
	},120000);
})();

setTimeout(function(){
	$("img").error(function(){        
        var imgSrc = $(this).attr('src') + '?' + new Date().getTime();
        $(this).attr('src',imgSrc);
	});
}, 20000);