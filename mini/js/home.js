function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getNewVideo(callback){
	let url = url_blog + 'feeds/posts/summary/-/Video',			
		options = {
			"url":url,
			"dataSend":{
				"max-results": 40
			}
		};
		
	getAjax(options, function(data){
		if(data == "effFeed"){
			$('.updated-comic').html('<strong>Error Load Feed!!!</strong>');
		}else{
			var titlePost = '', thumbPost = '', urlPost='', newestInsert=[];
			var entry = data.feed.entry;
			
			if(entry !== undefined){
				entry = shuffle(entry);
				for(let i=0, len = entry.length; i<len; i++){
					for(let j in entry[i].link){
						if(entry[i].link[j].rel == "alternate"){
							urlPost = entry[i].link[j].href;
							break;
						}
					}
					
					titlePost = entry[i].title.$t;						
					
					if("media$thumbnail" in entry[i]){
						thumbPost = resizeImg(entry[i].media$thumbnail.url, {"w":"300","h":"225","crop": "c"});						
					}else{
						thumbPost = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
					}
					
					newestInsert.push('<a href="'+ urlPost +'" title="'+ titlePost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'"/><div class="tt-grid-caption"><span>'+ titlePost +'</span></div><span class="videoplay"><i class="fa fa-play-circle-o"></i></span></a>');
				}
			}else{
				newestInsert = "<span>No Result!</span>"
			}
			
			callback(newestInsert);
		}
	});
}

(function() {
	'use strict';
	
getNewVideo(function(text){
	var listThumb = [];	
	listThumb = text;

	var preThumb = '', prePage = 0;
	if(listThumb.length <= 10){
		for(let i in listThumb){
			preThumb += '<li>'+ listThumb[i] +'</li>';
		}
	}else{
		for(let i = 0, len = listThumb.length; i < len; i++){
			if(i <= 9){
				preThumb += '<li>'+ listThumb[i] +'</li>';			
			}
		}
		prePage = parseInt(listThumb.length/10);
	}
	
	$('.tt-grid').html(preThumb);	
	if(prePage > 0){
		var j = 1;
		while(j < prePage){
			$('.tt-grid-wrapper nav').append('<a></a>');
			j++;
		}
	}
	
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// event type (if mobile use touch events)
		eventtype = mobilecheck() ? 'touchstart' : 'click',
		// support for css animations
		support = Modernizr.cssanimations;

	function onAnimationEnd( elems, len, callback ) {
		var finished = 0,
			onEndFn = function() {
				this.removeEventListener( animEndEventName, onEndFn );
				++finished;
				if( finished === len ) {
					callback.call();
				}
			};

		elems.forEach( function( el,i ) { el.querySelector('a').addEventListener( animEndEventName, onEndFn ); } );
	}

	function init() {
		[].forEach.call( document.querySelectorAll( '.tt-grid-wrapper' ), function( el ) {

			var grid = el.querySelector( '.tt-grid' ),
				items = [].slice.call( grid.querySelectorAll( 'li' ) ),
				navDots = [].slice.call( el.querySelectorAll( 'nav > a' ) ),
				isAnimating = false,
				current = 0;

			navDots.forEach( function( el, i ) {
				el.addEventListener( eventtype, function( ev ) {
					if( isAnimating || current === i ) return false;
					ev.preventDefault();
					isAnimating = true;
					updateCurrent( i );
					loadNewSet( i );
				} );
			} );

			function updateCurrent( set ) {
				classie.remove( navDots[ current ], 'tt-current' );
				classie.add( navDots[ set ], 'tt-current' );
				current = set;
			}
			
			function loadNewSet( set ) {
				
				var page1 = [], page2 = [], page3 = [], page4 = [];
				if(listThumb.length <= 10){
					page1 = listThumb;
				}else{
					for(var i = 0; i < listThumb.length; i++){
						if(i <= 9){
							page1.push(listThumb[i]);							
						}else if(i>9&&i<=19){
							page2.push(listThumb[i]);
						}else if(i>19&&i<=29){
							page3.push(listThumb[i]);
						}else if(i>29&&i<=39){
							page4.push(listThumb[i]);
						}
					}
				}

				var newImages = page1;
				switch( set ) {
					case 1 : newImages = page2; break;
					case 2 : newImages = page3; break;
					case 3 : newImages = page4; break;
					default : newImages = page1; break;
				};
				
				items.forEach( function( el ) {
					var itemChild = el.querySelector( 'a' );
					// add class "tt-old" to the elements/images that are going to get removed
					if( itemChild ) {
						classie.add( itemChild, 'tt-old' );
					}
				} );

				// apply effect
				setTimeout( function() {
					
					// append new elements
					[].forEach.call( newImages, function( el, i ) { items[ i ].innerHTML += el; } );

					// add "effect" class to the grid
					classie.add( grid, 'tt-effect-active' );
					
					// wait that animations end
					var onEndAnimFn = function() {
						// remove old elements
						items.forEach( function( el ) {
							// remove old elems
							var old = el.querySelector( 'a.tt-old' );
							if( old ) { el.removeChild( old ); }
							// remove class "tt-empty" from the empty items
							classie.remove( el, 'tt-empty' );
							// now apply that same class to the items that got no children (special case)
							if ( !el.hasChildNodes() ) {
								classie.add( el, 'tt-empty' );
							};
						} );
						// remove the "effect" class
						classie.remove( grid, 'tt-effect-active' );
						isAnimating = false;
					};
					if( support ) {
						onAnimationEnd( items, items.length, onEndAnimFn );
					}
					else {
						onEndAnimFn.call();
					}

				}, 25 );
				
			}

		} );
	}
	
	init();

});
})();

$(document).ready(function(){
	var inProgress = 0;
	
	function handleBefore() {
        inProgress++;
    };

    function handleComplete() {
        if (!--inProgress) {
            $.getScript('https://cdn.rawgit.com/nerarosa/sgm/master/js/responsive_bootstrap_carousel.js');
        }
    };
	
	(function getUpdateComic () {
		let url = url_blog + 'feeds/posts/summary/-/ComicFull',			
			options = {
				"url":url,
				"dataSend":{
					"max-results": 12
				},
				"beforeHandle": handleBefore
			};
			
		getAjax(options, function(data){
			if(data == "effFeed"){
				$('.updated-comic').html('<strong>Error Load Feed!!!</strong>');
			}else{
				var titlePost = urlPost = thumbPost = datePost = htmlEmbed = '',
					entry = data.feed.entry;
				
				if(entry !== undefined){
					var itemEmbed = '';					
					for(let i = 0, len = entry.length; i < len; i++){						
						for(let j in entry[i].link){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
							}
						}	
						titlePost = entry[i].title.$t;
						
						var date = new Date(entry[i].updated.$t);
							datePost = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
						
						if("media$thumbnail" in entry[i]){
							thumbPost = imageHostFix(resizeImg(entry[i].media$thumbnail.url, {"w":"280","h":"370","crop": "c"}));
						}else{
							thumbPost = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
						}
						
						itemEmbed += '<div class="col-xs-12 col-sm-6 col-md-6"><div class="gp_products_inner"><div class="gp_products_item_image"><a title="'+ titlePost +'" href="'+ urlPost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'" /></a></div><div class="gp_products_item_caption"><ul class="gp_products_caption_name"><li><a href="'+ urlPost +'">'+ titlePost +'</a></li><li><a href="#">'+ datePost +'</a></li></ul></div></div></div>';
						
						if(entry.length > 2){
							if(i == 1){
								htmlEmbed += '<div class="item active"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
								itemEmbed = '';
							}else if (i > 1 && (i%2 != 0)){
								htmlEmbed += '<div class="item"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
								itemEmbed = '';
							}
						}else{
							if (i == (entry.length - 1))
								htmlEmbed += '<div class="item active"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
						}
					}
					
					$('.updated-comic').html(htmlEmbed);
					
					handleComplete();
					
					$('.updated-comic img').each(function(){
						if (!isImageOk($(this))) {
							$(this).attr("src", $(this).attr("src"));
						}
					});
				}else{
					$('.updated-comic').html('No Result');
				}
			}
		})
	})();
	
	(function getUpdateBook () {
		let url = url_blog + 'feeds/posts/summary/-/Book',			
			options = {
				"url":url,
				"dataSend":{					
					"max-results": 12
				},
				"beforeHandle": handleBefore
			};
		
		getAjax(options, function(data){
			if(data == "effFeed"){
				$('.updated-book').html('<strong>Error Load Feed!!!</strong>');
			}else{
				var titlePost = urlPost = thumbPost = datePost = htmlEmbed = '',
					entry = data.feed.entry;
				
				if(entry !== undefined){
					var itemEmbed = '';					
					for(let i = 0, len = entry.length; i < len; i++){						
						for(let j in entry[i].link){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
							}
						}	
						titlePost = entry[i].title.$t;
						
						var date = new Date(entry[i].updated.$t);
							datePost = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
						
						if("media$thumbnail" in entry[i]){
							thumbPost = imageHostFix(resizeImg(entry[i].media$thumbnail.url, {"w":"280","h":"370","crop": "c"}));
						}else{
							thumbPost = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
						}
						
						itemEmbed += '<div class="col-xs-12 col-sm-6 col-md-6"><div class="gp_products_inner"><div class="gp_products_item_image"><a title="'+ titlePost +'" href="'+ urlPost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'" /></a></div><div class="gp_products_item_caption"><ul class="gp_products_caption_name"><li><a href="'+ urlPost +'">'+ titlePost +'</a></li><li><a href="#">'+ datePost +'</a></li></ul></div></div></div>';
						
						if(entry.length > 2){
							if(i == 1){
								htmlEmbed += '<div class="item active"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
								itemEmbed = '';
							}else if (i > 1 && (i%2 != 0)){
								htmlEmbed += '<div class="item"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
								itemEmbed = '';
							}
						}else{
							if (i == (entry.length - 1))
								htmlEmbed += '<div class="item active"><div class="col-xs-12 col-sm-4 col-md-4 gp_products_item"><div class="row">' + itemEmbed + '</div></div></div>';
						}
					}
					
					$('.updated-book').html(htmlEmbed);
					
					handleComplete();
					
					$('.updated-book img').each(function(){
						if (!isImageOk($(this))) {
							$(this).attr("src", $(this).attr("src"));
						}
					});
				}else{
					$('.updated-book').html('No Result');
				}
			}
		})
	})();
});

/*
    JQuery Advanced News Ticker 1.0.11 (20/02/14)
    created by risq
    website (docs & demos) : http://risq.github.io/jquery-advanced-news-ticker/
*/
(function(b,k,l,m){function g(a,f){this.element=a;this.$el=b(a);this.options=b.extend({},c,f);this._defaults=c;this._name=d;this.moveInterval;this.moving=this.paused=this.state=0;(this.$el.is("ul")||this.$el.is("ol"))&&this.init()}var d="newsTicker",c={row_height:20,max_rows:3,speed:400,duration:2500,direction:"up",autostart:1,pauseOnHover:1,nextButton:null,prevButton:null,startButton:null,stopButton:null,hasMoved:function(){},movingUp:function(){},movingDown:function(){},start:function(){},stop:function(){},
pause:function(){},unpause:function(){}};g.prototype={init:function(){this.$el.height(this.options.row_height*this.options.max_rows).css({overflow:"hidden"});this.checkSpeed();this.options.nextButton&&"undefined"!==typeof this.options.nextButton[0]&&this.options.nextButton.click(function(a){this.moveNext();this.resetInterval()}.bind(this));this.options.prevButton&&"undefined"!==typeof this.options.prevButton[0]&&this.options.prevButton.click(function(a){this.movePrev();this.resetInterval()}.bind(this));
this.options.stopButton&&"undefined"!==typeof this.options.stopButton[0]&&this.options.stopButton.click(function(a){this.stop()}.bind(this));this.options.startButton&&"undefined"!==typeof this.options.startButton[0]&&this.options.startButton.click(function(a){this.start()}.bind(this));this.options.pauseOnHover&&this.$el.hover(function(){this.state&&this.pause()}.bind(this),function(){this.state&&this.unpause()}.bind(this));this.options.autostart&&this.start()},start:function(){this.state||(this.state=
1,this.resetInterval(),this.options.start())},stop:function(){this.state&&(clearInterval(this.moveInterval),this.state=0,this.options.stop())},resetInterval:function(){this.state&&(clearInterval(this.moveInterval),this.moveInterval=setInterval(function(){this.move()}.bind(this),this.options.duration))},move:function(){this.paused||this.moveNext()},moveNext:function(){"down"===this.options.direction?this.moveDown():"up"===this.options.direction&&this.moveUp()},movePrev:function(){"down"===this.options.direction?
this.moveUp():"up"===this.options.direction&&this.moveDown()},pause:function(){this.paused||(this.paused=1);this.options.pause()},unpause:function(){this.paused&&(this.paused=0);this.options.unpause()},moveDown:function(){this.moving||(this.moving=1,this.options.movingDown(),this.$el.children("li:last").detach().prependTo(this.$el).css("marginTop","-"+this.options.row_height+"px").animate({marginTop:"0px"},this.options.speed,function(){this.moving=0;this.options.hasMoved()}.bind(this)))},moveUp:function(){if(!this.moving){this.moving=
1;this.options.movingUp();var a=this.$el.children("li:first");a.animate({marginTop:"-"+this.options.row_height+"px"},this.options.speed,function(){a.detach().css("marginTop","0").appendTo(this.$el);this.moving=0;this.options.hasMoved()}.bind(this))}},updateOption:function(a,b){"undefined"!==typeof this.options[a]&&(this.options[a]=b,"duration"==a||"speed"==a)&&(this.checkSpeed(),this.resetInterval())},add:function(a){this.$el.append(b("<li>").html(a))},getState:function(){return paused?2:this.state},
checkSpeed:function(){this.options.duration<this.options.speed+25&&(this.options.speed=this.options.duration-25)},destroy:function(){this._destroy()}};b.fn[d]=function(a){var f=arguments;return this.each(function(){var c=b(this),e=b.data(this,"plugin_"+d),h="object"===typeof a&&a;e||c.data("plugin_"+d,e=new g(this,h));"string"===typeof a&&e[a].apply(e,Array.prototype.slice.call(f,1))})}})(jQuery,window,document);

/**
 * jquery.cbpQTRotator.min.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function(c,b,e){var d=b.Modernizr;c.CBPQTRotator=function(f,g){this.$el=c(g);this._init(f)};c.CBPQTRotator.defaults={speed:700,easing:"ease",interval:8000};c.CBPQTRotator.prototype={_init:function(f){this.options=c.extend(true,{},c.CBPQTRotator.defaults,f);this._config();this.$items.eq(this.current).addClass("cbp-qtcurrent");if(this.support){this._setTransition()}this._startRotator()},_config:function(){this.$items=this.$el.children("div.cbp-qtcontent");this.itemsCount=this.$items.length;this.current=0;this.support=d.csstransitions;if(this.support){this.$progress=c('<span class="cbp-qtprogress"></span>').appendTo(this.$el)}},_setTransition:function(){setTimeout(c.proxy(function(){this.$items.css("transition","opacity "+this.options.speed+"ms "+this.options.easing)},this),25)},_startRotator:function(){if(this.support){this._startProgress()}setTimeout(c.proxy(function(){if(this.support){this._resetProgress()}this._next();this._startRotator()},this),this.options.interval)},_next:function(){this.$items.eq(this.current).removeClass("cbp-qtcurrent");this.current=this.current<this.itemsCount-1?this.current+1:0;this.$items.eq(this.current).addClass("cbp-qtcurrent")},_startProgress:function(){setTimeout(c.proxy(function(){this.$progress.css({transition:"width "+this.options.interval+"ms linear",width:"100%"})},this),25)},_resetProgress:function(){this.$progress.css({transition:"none",width:"0%"})},destroy:function(){if(this.support){this.$items.css("transition","none");this.$progress.remove()}this.$items.removeClass("cbp-qtcurrent").css({position:"relative","z-index":100,"pointer-events":"auto",opacity:1})}};var a=function(f){if(b.console){b.console.error(f)}};c.fn.cbpQTRotator=function(g){if(typeof g==="string"){var f=Array.prototype.slice.call(arguments,1);this.each(function(){var h=c.data(this,"cbpQTRotator");if(!h){a("cannot call methods on cbpQTRotator prior to initialization; attempted to call method '"+g+"'");return}if(!c.isFunction(h[g])||g.charAt(0)==="_"){a("no such method '"+g+"' for cbpQTRotator instance");return}h[g].apply(h,f)})}else{this.each(function(){var h=c.data(this,"cbpQTRotator");if(h){h._init()}else{h=c.data(this,"cbpQTRotator",new c.CBPQTRotator(g,this))}})}return this}})(jQuery,window);

$(document).ready(function(){
$( '#cbp-qtrotator' ).cbpQTRotator();
});

(function getStory(){
	let url = url_blog + 'feeds/posts/default/-/Radio',
		options = {
			"url":url,
			"dataSend":{
				"alt":"json-in-script", 
				"max-results": 8
			}			
		};
	
	getAjax(options, function(data){
		if(data == "effFeed"){
			$('#nt-storytext').html('<strong>Error Load Feed!!!</strong>');
		}else{
			var entry = data.feed.entry,
				htmlEmbed = '';
				
			if(entry !== undefined){
				var titlePost = urlPost = sumPost = '';
				
				for(let i = 0, len = entry.length; i < len; i++){
					for(let j in entry[i].link){
						if(entry[i].link[j].rel == 'alternate')
							urlPost = entry[i].link[j].href;
					}
					
					var content = "content" in entry[i] ? entry[i].content.$t : "";
						content = content.replace(/<(?:.|\n)*?>/gm, '');
					
						sumPost = content.length > 100 ? content.substring(0,100) + '...' : content;
					
					titlePost = entry[i].title.$t;
					
					htmlEmbed += '<li>'+ sumPost +' <a href="'+ urlPost +'" title="'+ titlePost +'">Read more</a> </li>';										
				}
				
				$('#nt-storytext').html(htmlEmbed);
				
				var nt_storytext = $('#nt-storytext').newsTicker({
					row_height: 80,
					max_rows: 4,
					duration: 20000,
					prevButton: $('#nt-storytext-prev'),
					nextButton: $('#nt-storytext-next')
				});
			}else{
				$('#nt-storytext').html('<strong>No Result!!!</strong>');
			}			
		}
	})
})();
(function getRadio(){	
	let url = url_blog + 'feeds/posts/default/-/Radio',
		options = {
			"url":url,
			"dataSend":{
				"alt":"json-in-script", 
				"max-results": 8
			}			
		};
	
	getAjax(options, function(data){
		if(data == "effFeed"){
			$('#oneliner .radio-newsticker').html('<strong>Error Load Feed!!!</strong>');
		}else{
			var entry = data.feed.entry,
				htmlEmbed = '';
				
			if(entry !== undefined){
				var titlePost = urlPost = sumPost = '';
				
				for(let i = 0, len = entry.length; i < len; i++){
					for(let j in entry[i].link){
						if(entry[i].link[j].rel == 'alternate')
							urlPost = entry[i].link[j].href;
					}
					
					var content = "content" in entry[i] ? entry[i].content.$t : "";
						content = content.replace(/<(?:.|\n)*?>/gm, '');
										
						sumPost = content.length > 100 ? content.substring(0,100) + '...' : content;					
					
					titlePost = entry[i].title.$t;
					
					htmlEmbed += '<li><a title="'+ titlePost +'" href="'+ urlPost +'">'+ titlePost +'</a></li>';										
				}
				
				$('#oneliner .radio-newsticker').html(htmlEmbed);
				
				 var oneliner = $('#oneliner .radio-newsticker').newsTicker({
					row_height: 44,
					max_rows: 1,
					time: 10000,
					nextButton: $('#oneliner .header')
				});
				
				$('#oneliner .header').hover(function() {
					oneliner.newsTicker('pause');
				}, function() {
					oneliner.newsTicker('unpause');
				});
			}else{
				$('#oneliner .radio-newsticker').html('<strong>No Result!!!</strong>');
			}
		}
	})
})();

(function getAudioBook(){
	let url = url_blog + 'feeds/posts/default/-/AudioBook',
		options = {
			"url":url,
			"dataSend":{
				"alt":"json-in-script", 
				"max-results": 8
			}			
		};
	
	getAjax(options, function(data){
		if(data == "effFeed"){
			$('#nt-audio').html('<strong>Error Load Feed!!!</strong>');
		}else{
			let entry = data.feed.entry,
				htmlEmbed = '';
				
			if(entry !== undefined){
				var titlePost = urlPost = sumPost = '';
				
				for(let i = 0, len = entry.length; i < len; i++){
					for(let j in entry[i].link){
						if(entry[i].link[j].rel == 'alternate')
							urlPost = entry[i].link[j].href;
					}
					
					var content = "content" in entry[i] ? entry[i].content.$t : "";
						content = content.replace(/<(?:.|\n)*?>/gm, '');
					
					content = sgmTags("sum", content);
					sumPost = content.length > 300 ? content.substring(0,300) + '...' : content;					
					
					titlePost = entry[i].title.$t;
					
					htmlEmbed += '<li data-infos="'+ sumPost +'"><i class="fa fa-fw fa-play state"></i><span class="hour">08:12</span> <a title="'+ titlePost +'" href="'+ urlPost +'">'+ titlePost +'</a></li>';
					
					if(i == 0){
						$('#nt-audio-infos-container .infos-text').text(sumPost);
					}
				}
				
				$('#nt-audio').html(htmlEmbed);
				
				var nt_audio = $('#nt-audio').newsTicker({
					row_height: 60,
					max_rows: 1,
					speed: 300,
					duration: 20000,
					prevButton: $('#nt-audio-prev'),
					nextButton: $('#nt-audio-next'),
					hasMoved: function() {
						$('#nt-audio-infos-container').fadeOut(200, function(){
							$('#nt-audio-infos .infos-hour').text($('#nt-audio li:first span').text());
							$('#nt-audio-infos .infos-text').text($('#nt-audio li:first').data('infos'));
							$(this).fadeIn(400);
						});
					},
					pause: function() {
						$('#nt-audio li i').removeClass('fa-play').addClass('fa-pause');
					},
					unpause: function() {
						$('#nt-audio li i').removeClass('fa-pause').addClass('fa-play');
					}
				});
				$('#nt-audio-infos').hover(function() {
					nt_audio.newsTicker('pause');
				}, function() {
					nt_audio.newsTicker('unpause');
				});
				
			}else{
				$('#nt-audio').html('<strong>No Result!!!</strong>');
			}
		}
	})
		
})();
