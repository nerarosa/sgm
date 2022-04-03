function isInteger(n) {
	return Math.floor(n) == n && $.isNumeric(n);
}

var urlDB = 'https://sgmgirldata.blogspot.com';

var page = $.url('?page'),
	idGirl = $.url('?idg'),
	startIndex = 1,
	postInPage = 20;

	
if(idGirl == '' || idGirl == null){	

var abc = $.url('?abc'),
	na = $.url('?na'),
	attr = $.url('?att'),
	sort = $.url('?sort'),
	cat = '';

if(abc != '' && abc != null)	
	cat += '/' + abc;
if(na != '' && na != null)	
	cat += '/' + na;
if(attr != '' && attr != null)	
	cat += '/' + attr;
	
if(page != '' && page != null && isInteger(page) == true && page > 1){
	startIndex = (page-1) * postInPage + 1;
}else{
	page = 1;
}

function getGirlList(){
	let options = {
			"url":urlDB + '/feeds/posts/default',
			"dataSend":{
				"max-results": postInPage,
				"start-index": startIndex
			},
		};
	
	if(cat != ''){
		options.url = urlDB + '/feeds/posts/default/-'+ cat;
	}

	getAjax(options, function(data){
		if(data == "errFeed"){
			$('.mote-all').html('<strong>Error Loading Feed!</strong>');
		}else{
			var entry = data.feed.entry,					
				nameG = '',
				idG = '',				
				htmlEmbed = '';
			
			if(entry !== undefined){
				for(var i = 0; i < entry.length; i++){
					nameG = entry[i].title.$t;
					idG = entry[i].id.$t.split('post-')[1];
			
					var content = "content" in entry[i] ? entry[i].content.$t : '';
					
					var sAvt = sgmTags("s-avt", content);
					
					if(sAvt == '' || sAvt == null) sAvt = 'https://placehold.it/200x200?text=No+Image';
					
					if(requestMobile == false)
						htmlEmbed += '<li><div class="mote-list-rows-img-di"><a href="?idg=' + idG + '"><img alt="'+ nameG +'" src="'+ sAvt +'"/></a></div><a href="?idg=' + idG + '" class="mote-list-rows-title">' + nameG + '</a></li>';
					else
						htmlEmbed += '<li class="' + ((i+1)%3==0? 'mr0' : '') + '"><div><a href="?idg=' + idG + '"><img "'+ nameG +'" src="'+ sAvt +'"/></a><a class="title" href=""?idg=' + idG + '"">' + nameG + '</a></div></li>';
				}
				if(requestMobile == false)
					$('.mote-all ul').html(htmlEmbed);
				else
					$('.mote-list.mr24 ul').html(htmlEmbed);
								
			}else{
				$('.mote-all ul').html('<li><div class="mote-list-rows-img-di"><a href="#"><img alt="No Image" src="https://placehold.it/200x200?text=No+Image"/></a></div><a href="#" class="mote-list-rows-title">No Girl</a></li>');
			}
		}
	});
}

function paginationG(){
	let options = {
			"url":urlDB + '/feeds/posts/default',
			"dataSend":{
				"max-results": 0				
			},
		};
	
	if(cat != ''){
		options.url = urlDB + '/feeds/posts/default/-'+ cat;
	}
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var totalPost = data.feed.openSearch$totalResults.$t,				
				htmlEmbed = '';
			
			if(totalPost > postInPage){
				var totalPage = Math.floor(totalPost / postInPage);
				
				if(totalPost % postInPage != 0) totalPage++;
				
				if(requestMobile == false){
					for(var i = 1; i <= totalPage; i++){
						if(page == i)
							htmlEmbed += '<a class="thisclass">' + i + '</a>';
						else
							htmlEmbed += '<a href="?page=' + i + '">' + i + '</a>';
					}
					
					if(page > 1)
						htmlEmbed += '<a href="?page=1">Đầu</a><a href="?page='+ (page - 1) +'">Trước</a>';
						
					if(page != totalPage)
						htmlEmbed += '<a href=?page='+ (page + 1) +'>Sau</a><a href="?page=' + totalPage + '">Cuối</a>';			
					
					$('.page').html('<ul>' + htmlEmbed + '</ul>');
				}else{
					htmlEmbed += '<a>' + page + '/' + totalPage + '</a>';
					
					if(page != totalPage)
						htmlEmbed += '<a href=?page='+ (page + 1) +'>Sau</a>';
					
					if(page > 1)
						htmlEmbed = '<a href="?page='+ (page - 1) +'">Trước</a>' + htmlEmbed;
										
					
					$('.page').html(htmlEmbed);
				}
			}
		}
	});
}

function getGirlInfo(id, count){
	let options = {
			"url":urlDB + '/feeds/posts/default/'+ id
		};	
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var entry = data.entry,
				htmlEmbed = '';
			
			var nameG = entry.title.$t;
			var idG = entry.id.$t.split('post-')[1];
			var content = "content" in entry ? entry.content.$t : "";	
			var sAvt = sgmTags("s-avt", content);
					
			if(sAvt == '' || sAvt == null) sAvt = 'https://placehold.it/200x200?text=No+Image';
			
			if(requestMobile == false)
				htmlEmbed = '<li><div class="mote-list-rows-img-di"><a href="?idg='+ id +'"><img alt="'+ nameG +'" src="'+ sAvt +'"/></a></div><a href="?idg='+ id +'" class="mote-list-rows-title">'+ nameG +'</a></li>';
			else
				htmlEmbed = '<li class="'+ (count == 3 ? 'mr0' : '') +'"><div><a href="?idg='+ id +'"><img alt="'+ nameG +'" src="'+ sAvt +'"/></a><a class="title" href="?idg='+ id +'">'+ nameG +'</a></div></li>';
			
			$('.new-update ul').append(htmlEmbed);
		}
	});
}

function getNewUpdateList(){	
	let options = {
			"url": url_blog + 'feeds/posts/summary/-/sgmgirl',
			"dataSend": {
				"max-results": 150 
			}
		};
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var entry = data.feed.entry,				
				htmlEmbed = '';
			
			if(entry !== undefined){
				var count = 1;
				var tempIdArr = [];
				for(let i = 0, len = entry.length; i < len; i++){
					if(requestMobile == false){
						if(count > 10) break;
					}else{
						if(count > 6) break;
					}	
				
					var content = "summary" in entry[i] ? entry[i].summary.$t : "";					
					var tempIdG = sgmTags("sgmg", content).replace("@", "").trim();
					
					if(tempIdG != '' && tempIdG != null)
						if($.inArray(tempIdG, tempIdArr) > -1) continue;
						else tempIdArr.push(tempIdG);
					else continue;

					count++;	
				}
				
				for(let i = 0, len = tempIdArr.length; i < len; i++){
					if(requestMobile == false)
						getGirlInfo(tempIdArr[i]);
					else
						getGirlInfo(tempIdArr[i], i+1);
				}
			}
		}
	});
}

$(document).ready(function(){
	$('.girl-detail-layout').remove();
	getGirlList();
	paginationG();
	getNewUpdateList();

	if(requestMobile == false){
		if(abc != '' && abc != null){
			$('.filter-abc a').each(function(){
				var linkCat = $(this).attr('href');
				if(linkCat.indexOf('abc='+abc) != -1){
					$(this).parent().children('a.cur').removeClass('cur');
					$(this).addClass('cur');
				}
			});
		}
		if(na != '' && na != null){		
			$('.filter-nation a').each(function(){
				var linkCat = $(this).attr('href');
				if(linkCat.indexOf('na='+na) != -1){
					$(this).parent().children('a.cur').removeClass('cur');
					$(this).addClass('cur');
				}
			});
		}
		if(attr != '' && attr != null){		
			$('.filter-attr a').each(function(){
				var linkCat = $(this).attr('href');
				if(linkCat.indexOf('att='+attr) != -1){
					$(this).parent().children('a.cur').removeClass('cur');
					$(this).addClass('cur');
				}
			});
		}
	}
});

}else{
	
	document.getElementById('main-content').innerHTML = '';

/**
 * jQuery Masonry v2.1.03
 */

(function( window, $, undefined ){
  'use strict';

  var $event = $.event,
      resizeTimeout;

  $event.special.smartresize = {
    setup: function() {
      $(this).bind( "resize", $event.special.smartresize.handler );
    },
    teardown: function() {
      $(this).unbind( "resize", $event.special.smartresize.handler );
    },
    handler: function( event, execAsap ) {
      var context = this,
          args = arguments;

      event.type = "smartresize";

      if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
      resizeTimeout = setTimeout(function() {
        $.event.handle.apply( context, args );
      }, execAsap === "execAsap"? 0 : 100 );
    }
  };

  $.fn.smartresize = function( fn ) {
    return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
  };

// ========================= Masonry ===============================
  $.Mason = function( options, element ){
    this.element = $( element );

    this._create( options );
    this._init();
  };

  $.Mason.settings = {
    isResizable: true,
    isAnimated: false,
    animationOptions: {
      queue: false,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: false,
    isFitWidth: false,
    containerStyle: {
      position: 'relative'
    }
  };

  $.Mason.prototype = {

    _filterFindBricks: function( $elems ) {
      var selector = this.options.itemSelector;
      return !selector ? $elems : $elems.filter( selector ).add( $elems.find( selector ) );
    },

    _getBricks: function( $elems ) {
      var $bricks = this._filterFindBricks( $elems )
        .css({ position: 'absolute' })
        .addClass('masonry-brick');
      return $bricks;
    },

    _create : function( options ) {
      
      this.options = $.extend( true, {}, $.Mason.settings, options );
      this.styleQueue = [];

      var elemStyle = this.element[0].style;
      this.originalStyle = {
        height: elemStyle.height || ''
      };

      var containerStyle = this.options.containerStyle;
      for ( var prop in containerStyle ) {
        this.originalStyle[ prop ] = elemStyle[ prop ] || '';
      }

      this.element.css( containerStyle );

      this.horizontalDirection = this.options.isRTL ? 'right' : 'left';

      this.offset = {
        x: parseInt( this.element.css( 'padding-' + this.horizontalDirection ), 10 ),
        y: parseInt( this.element.css( 'padding-top' ), 10 )
      };

      this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === 'function';

      var instance = this;
      setTimeout( function() {
        instance.element.addClass('masonry');
      }, 0 );
      
      if ( this.options.isResizable ) {
        $(window).bind( 'smartresize.masonry', function() { 
          instance.resize();
        });
      }

      this.reloadItems();

    },
  
    _init : function( callback ) {
      this._getColumns();
      this._reLayout( callback );
    },

    option: function( key, value ){
      if ( $.isPlainObject( key ) ){
        this.options = $.extend(true, this.options, key);
      } 
    },
    
    // ====================== General Layout ======================
    layout : function( $bricks, callback ) {
      for (var i=0, len = $bricks.length; i < len; i++) {
        this._placeBrick( $bricks[i] );
      }
      
      var containerSize = {};
      containerSize.height = Math.max.apply( Math, this.colYs );
      if ( this.options.isFitWidth ) {
        var unusedCols = 0;
        i = this.cols;
        while ( --i ) {
          if ( this.colYs[i] !== 0 ) {
            break;
          }
          unusedCols++;
        }

        containerSize.width = (this.cols - unusedCols) * this.columnWidth - this.options.gutterWidth;
      }
      this.styleQueue.push({ $el: this.element, style: containerSize });

      var styleFn = !this.isLaidOut ? 'css' : (
            this.options.isAnimated ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions;

      var obj;
      for (i=0, len = this.styleQueue.length; i < len; i++) {
        obj = this.styleQueue[i];
        obj.$el[ styleFn ]( obj.style, animOpts );
      }

      this.styleQueue = [];

      if ( callback ) {
        callback.call( $bricks );
      }
      
      this.isLaidOut = true;
    },
    
    _getColumns : function() {
      var container = this.options.isFitWidth ? this.element.parent() : this.element,
          containerWidth = container.width();

      this.columnWidth = this.isFluid ? this.options.columnWidth( containerWidth ) :
                    this.options.columnWidth ||
                    this.$bricks.outerWidth(true) ||
                    containerWidth;

      this.columnWidth += this.options.gutterWidth;

      this.cols = Math.floor( ( containerWidth + this.options.gutterWidth ) / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );

    },

    _placeBrick: function( brick ) {
      var $brick = $(brick),
          colSpan, groupCount, groupY, groupColY, j;

      colSpan = Math.ceil( $brick.outerWidth(true) /
        ( this.columnWidth + this.options.gutterWidth ) );
      colSpan = Math.min( colSpan, this.cols );

      if ( colSpan === 1 ) {
        groupY = this.colYs;
      } else {
        groupCount = this.cols + 1 - colSpan;
        groupY = [];

        for ( j=0; j < groupCount; j++ ) {
          groupColY = this.colYs.slice( j, j+colSpan );
          groupY[j] = Math.max.apply( Math, groupColY );
        }

      }

      var minimumY = Math.min.apply( Math, groupY ),
          shortCol = 0;
      for (var i=0, len = groupY.length; i < len; i++) {
        if ( groupY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }

      var position = {
        top: minimumY + this.offset.y
      };

      position[ this.horizontalDirection ] = this.columnWidth * shortCol + this.offset.x;
	  
      this.styleQueue.push({ $el: $brick, style: position });

      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    
    resize: function() {
      var prevColCount = this.cols;
      this._getColumns();
      if ( this.isFluid || this.cols !== prevColCount ) {
        this._reLayout();
      }
    },
      
    _reLayout : function( callback ) {
      var i = this.cols;
      this.colYs = [];
      while (i--) {
        this.colYs.push( 0 );
      }

      this.layout( this.$bricks, callback );
    },
    
    // ====================== Convenience methods ======================
    reloadItems : function() {
      this.$bricks = this._getBricks( this.element.children() );
    },
    
    reload : function( callback ) {
      this.reloadItems();
      this._init( callback );
    },
    
    appended : function( $content, isAnimatedFromBottom, callback ) {
      if ( isAnimatedFromBottom ) {
        this._filterFindBricks( $content ).css({ top: this.element.height() });
        var instance = this;
        setTimeout( function(){
          instance._appended( $content, callback );
        }, 1 );
      } else {
        this._appended( $content, callback );
      }
    },
    
    _appended : function( $content, callback ) {
      var $newBricks = this._getBricks( $content );
      this.$bricks = this.$bricks.add( $newBricks );
      this.layout( $newBricks, callback );
    },
    
    remove : function( $content ) {
      this.$bricks = this.$bricks.not( $content );
      $content.remove();
    },
    
    destroy : function() {

      this.$bricks
        .removeClass('masonry-brick')
        .each(function(){
          this.style.position = '';
          this.style.top = '';
          this.style.left = '';
        });

      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.masonry')
        .removeClass('masonry')
        .removeData('masonry');
      
      $(window).unbind('.masonry');
    }
  };
  
  
  // ======================= imagesLoaded Plugin ===============================
  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      var src = this.src;
      this.src = blank;
      this.src = src;
    });

    return $this;
  };

  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };
  
  // =======================  Plugin bridge  ===============================
  // leverages data method to either create or return $.Mason constructor
  // A bit from jQuery UI
  //   https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js
  // A bit from jcarousel 
  //   https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

  $.fn.masonry = function( options ) {
    if ( typeof options === 'string' ) {
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function(){
        var instance = $.data( this, 'masonry' );
        if ( !instance ) {
          logError( "cannot call methods on masonry prior to initialization; " +
            "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for masonry instance" );
          return;
        }
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each(function() {
        var instance = $.data( this, 'masonry' );
        if ( instance ) {
          instance.option( options || {} );
          instance._init();
        } else {
          $.data( this, 'masonry', new $.Mason( options, this ) );
        }
      });
    }
    return this;
  };
})( window, jQuery );	
	
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);	
	
function getGirlInfo(id){	
	let options = {
			"url": urlDB + '/feeds/posts/default/'+ id
		};
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var entry = data.entry;				
			
			var nameG = entry.title.$t;
			var idG = entry.id.$t.split('post-')[1];
			var content = "content" in entry ? entry.content.$t : "";	
			var avt = sgmTags("avatar", content),
				cover = sgmTags("cover", content),
				realName = sgmTags("name", content),
				birthday = sgmTags("birthday", content),
				birthplace = sgmTags("birthplace", content),
				zodiac = sgmTags("zodiac", content),
				height = sgmTags("height", content),
				weight = sgmTags("weight", content),
				bsize = sgmTags("bodysize", content).split('-'),
				bio = sgmTags("bio", content);
					
			if(avt == '' || avt == null) avt = 'https://placehold.it/200x273?text=No+Image';
			if(cover == '' || cover == null) cover = 'https://placehold.it/1054x241?text=No+Image';
			
			if(requestMobile == false){
				$('.warp.motelist-h1').css("background", "url(" + cover + ") no-repeat");
				if(page == '' || page == null || page == 1){
					$('.warp.motelist-h1 a').text(nameG).attr("alt", nameG);
					$('.mote-info-panle-info img.avt-g').attr('src', avt).attr('alt', nameG);
					$('.mote-info-panle-info-name').html(nameG);			
					$('.mote-info-panle-info ul').append('<li>Tên thật : '+ realName +'</li><li>Ngày sinh : '+ birthday +'</li><li>Quốc gia : '+ birthplace +'</li><li>Cung hoàng đạo:'+ zodiac +'</li><li>Chiều cao : '+ height +'</li><li>Cân nặng : '+ weight +'</li><li>Vòng ngực : '+ bsize[0] +' cm</li><li>Vòng eo : '+ bsize[1] +' cm</li><li>Vòng mông :'+ bsize[2] +' cm</li>');
					$('.mote-info-panle-desc').html(bio);
					$('.warp .local').append(nameG);
				}
			}else{
				$('#mote-top .motelist-h1 img').attr('src', cover).attr("alt", nameG);
				$('#mote-top .motelist-h1 a').attr('href', '?idg='+id).attr("title", nameG);
				$('#list h1.fl').text(nameG);
				if(page == '' || page == null || page == 1){
					$('#moteinfo .mote-info ul').html('<li><span>Tên thật : </span>'+ realName +'</li><li><span>Ngày sinh : </span>'+ birthday +'</li><li><span>Quốc gia : </span>'+ birthplace +'</li><li><span>Cung hoàng đạo: </span>'+ zodiac +'</li><li><span>Chiều cao : </span>'+ height +'</li><li><span>Cân nặng : </span>'+ weight +'</li><li><span>Vòng ngực : </span>'+ bsize[0] +' cm</li><li><span>Vòng eo : </span>'+ bsize[1] +' cm</li><li><span>Vòng mông : </span>'+ bsize[2] +' cm</li>');
					$('.mote-info-bio').html(bio);
				}
			}
		}
	});
}	

function getAllPostByGirl(id){	
	let options = {
			"url": url_blog + 'feeds/posts/summary',
			"dataSend":{
				"q": "@" + id,
				"max-results": 20
			}
		};
		
	getAjax(options, function(data){
		if(data != "errFeed"){
			var entry = data.feed.entry,
				title = '',
				urlPost = '',
				thumb = '',
				dataPost = '',
				htmlEmbed = '';
				
			if(typeof entry !== undefined){
				for(let i = 0, len = entry.length; i < len; i++){
					for(let j in entry[i].link){
						if(entry[i].link[j].rel == "alternate")
							urlPost = entry[i].link[j].href;
					}
					
					title = entry[i].title.$t;
					thumb = "media$thumbnail" in entry[i] ? imageHostFix(resizeImg(entry[i].media$thumbnail.url, {"w":"250","h":"360","crop": "c"})) : "https://placehold.it/250x360?text=No+Image";
					
					var date = new Date(entry[i].published.$t);
						datePost = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
					
					if(requestMobile == false)
						htmlEmbed += '<dl><dd class="mote-list-body-rows-img"><a target="_blank" href="' + urlPost + '"><img alt="'+ title +'" title="'+ title +'" data-original="'+ thumb +'" src="https://placehold.it/250x360?text=SGMedia"/></a></dd><dt><a target="_blank" href="'+ urlPost +'" title="'+ title +'" >' + title + '</a></dt><dd class="mote-list-body-rows-more clearfix"><span class="mote-icon-time">'+ datePost +'</span><span class="mote-icon-eye">0</span></dd></dl>';
					else
						htmlEmbed += '<li><a href="' + urlPost + '" title="'+ title +'"><img data-original="'+ thumb +'" src="https://placehold.it/250x360?text=SGMedia" alt="'+ title +'"/></a><a class="title" href="'+ urlPost +'">'+ title +'</a></li>';
				}
				
				if(requestMobile == false){
					$('.mote-list-body').html(htmlEmbed);				
					$('.mote-list-body-rows-img img').lazyload({effect : "fadeIn"});
				}else{
					$('#list ul').html(htmlEmbed);
					$('#list ul li img').lazyload({effect : "fadeIn"});
					
					var lh = $(window).width()*0.45;
					var gh = $(window).width()*0.05;
					var $container = $('#list ul');
					$container.masonry({
						itemSelector : '#list ul li',
						gutterWidth : lh,
						gutterWidth:gh,
						isAnimated: true
					});
					$('#list ul li img').load(function(){
						$container.masonry({
							itemSelector: '#list ul li',
							columnWidth:lh,
							gutterWidth:gh
						});
					});
				}
			}
		}
	});
}	

function paginationGInfo(id){
	let options = {
			"url": url_blog + 'feeds/posts/summary',
			"dataSend":{
				"q": "@" + id,
				"max-results": 0
			}
		};
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var totalPost = data.feed.openSearch$totalResults.$t,				
				htmlEmbed = '';
			
			if(totalPost > postInPage){
				var totalPage = Math.floor(totalPost / postInPage);
				
				if(totalPost % postInPage != 0) totalPage++;
				
				if(requestMobile == false){
					for(let i = 1; i <= totalPage; i++){
						if(page == i)
							htmlEmbed += '<a class="thisclass">' + i + '</a>';
						else
							htmlEmbed += '<a href="?idg='+id+'&page=' + i + '">' + i + '</a>';
					}
					
					if(page > 1)
						htmlEmbed += '<a href="?idg='+id+'&page=1">Đầu</a><a href="?page='+ (page - 1) +'">Trước</a>';
						
					if(page != totalPage)
						htmlEmbed += '<a href=?idg='+id+'&page='+ (page + 1) +'>Sau</a><a href="?page=' + totalPage + '">Cuối</a>';			
					
					$('.page').html('<ul>' + htmlEmbed + '</ul>');
				}else{
					htmlEmbed += '<a>' + page + '/' + totalPage + '</a>';
					
					if(page != totalPage)
						htmlEmbed += '<a href=?idg='+id+'&page='+ (page + 1) +'>Sau</a>';
					
					if(page > 1)
						htmlEmbed = '<a href="?idg='+id+'&page='+ (page - 1) +'">Trước</a>' + htmlEmbed;
					
					$('.page').html(htmlEmbed);
				}
			}
		}
	});
}

function getTopGirl(id){	
	let options = {
			"url": urlDB + '/feeds/posts/default/'+ id
		};
	
	getAjax(options, function(data){
		if(data != "errFeed"){
			var entry = data.entry;
			
			var nameG = entry.title.$t;
			
			var content = "content" in entry ? entry.content.$t : "";	
			var avt = sgmTags("s-avt", content),
				realName = sgmTags("name", content);				
								
					
			if(avt == '' || avt == null) avt = 'https://placehold.it/190x190?text=No+Image';			
			if(requestMobile == false){
				$('#' + id + ' .hot-motes-body-rows-di img').attr('src', avt);
				$('#' + id + ' .hot-motes-body-rows-di-t a').text(nameG);
			}else{
				$('#' + id + ' a').text(nameG);
			}
		}
	});
}

function getTopPost(id){
	if(requestMobile == false){
	var postsRefPhoto = database.ref('posts/photos').orderByChild("viewCount");
	var postsRefVideo = database.ref('posts/videos').orderByChild("viewCount");
	var postsRefWallpaper = database.ref('posts/wallpapers').orderByChild("viewCount");
	
	var hotPostEl = $('.mote-hot-imgs-body');
	
	postsRefPhoto.once('value', function(snapshot) {
		var data = [];
		if(snapshot.exists()){
			snapshot.forEach(function(childSnapshot) {
				if(data.length > 5) return false;
				
				if (childSnapshot.val().girl == id) {
					data.push(childSnapshot.val());
				}
			});
		
			var htmlEmbed = '';
			for(var i = 0; i < data.length; i++){
				htmlEmbed += '<li><div class="mote-hot-imgs-body-pic"><a target="_blank" href="'+ data[i].url.replace('?m=1', '') +'"><img alt="'+ data[i].title +'" title="'+ data[i].title +'" src="'+ data[i].thumb.replace('/s72-c/', '/w250-h360-c/') +'"/></a><span>Xem:'+ data[i].viewCount +'</span></div><a target="_blank" class="mote-hot-imgs-body-t" href="'+ data[i].url +'" title="'+ data[i].title +'" >'+ data[i].title +'</a></li>';
			}

			hotPostEl.html(htmlEmbed);
		}
	
	});
	
	var girlsRef = database.ref('girls').orderByChild("viewCount").limitToLast(7);
	
	var hotGirlEl = $('.hot-motes-body');
	var hotGirlHTML = '';
	girlsRef.once('value', function(snapshot) {
		if(snapshot.exists()){
			var i = snapshot.numChildren();
			snapshot.forEach(function(childSnapshot){
				var hotNum = childSnapshot.val().viewCount;
				
				if(hotNum > 10000) hotNum = '10000+';
				
				hotGirlHTML = '<li id="'+ childSnapshot.val().id +'" class="clearfix"><span class="hot-motes-body-rows-icon fa fa-angle-right" /><span class="hot-motes-body-rows-num num'+ i +'">0' + i + '</span><div class="hot-motes-body-rows-di"><a href="/p/girl.html?idg='+ childSnapshot.val().id +'"><img src="https://placehold.it/190x190?text=No+Image"/></a><div class="hot-motes-body-rows-di-t" ><a href="/p/girl.html?idg='+ childSnapshot.val().id +'">Name</a><span>Hot: '+ hotNum +'</span></div></div></li>' + hotGirlHTML;
				i--;
			});
			
			hotGirlEl.html(hotGirlHTML);
			
			snapshot.forEach(function(childSnapshot){
				getTopGirl(childSnapshot.val().id);
			});
		}		
	});	
	}else{
		var girlsRef = database.ref('girls').orderByChild("viewCount").limitToFirst(12);
	
		var hotGirlEl = $('.top-girl ul');
		var hotGirlHTML = '';
		girlsRef.once('value', function(snapshot) {
		if(snapshot.exists()){			
			var i = 1;
			snapshot.forEach(function(childSnapshot){				
				hotGirlHTML = '<li id="'+ childSnapshot.val().id +'" class="fl border-tag"><a ' + (i % 4 == 0 ? 'class="border-tag4"' : '') +' href="/p/girl.html?idg='+ childSnapshot.val().id +'" >Name</a></li>' + hotGirlHTML;
				i++;
			});
			
			hotGirlEl.html(hotGirlHTML);
			
			snapshot.forEach(function(childSnapshot){
				getTopGirl(childSnapshot.val().id);
			});
		}		
		});
	}
}

$(document).ready(function(){		
	$('.girl-detail-layout').appendTo('#main-content');
	
	if(page == '' || page == null || page == 1){		
		getTopPost(idGirl);		
	}else{
		$('.main-info-content').hide();
		if(requestMobile == true) $('.hide-page').hide();
	}
	getGirlInfo(idGirl);
	paginationGInfo(idGirl)
	getAllPostByGirl(idGirl);

});	
if(requestMobile == false){
	$(function(){
		var $top = $("#top");
		var tl = ($("body").width() - 1054) / 2 - 50;
		$top.css({
			right: tl+'px'
		});
		$(window).scroll(function(event){
			if($(document).scrollTop() > 222){
				$top.show();
			}else{
				$top.hide();
			}
		});
		$top.on("click",function(e){
			e.preventDefault();
			$("body,html").stop().animate({
				scrollTop: "0px"},
				600,function(){
					$top.hide();
				});
		});

		var $nav = $("#nav li");
		$nav.hover(function() {
			$(this).find('.sonnav').fadeIn();
		}, function() {
			$(this).find('.sonnav').fadeOut();
		});
		
	});
}else{
	$(function(){
		$(".mote-s").on("click",function(e){
			e.preventDefault();
			var section = $(this).attr("data-section");
			var $r = $(".select-row");
			var len = $r.length;
			$r.css("display","none");
			for(var i = 0; i < len; i++){
				if ($r.eq(i).attr("data-section") == section){
					$r.eq(i).css("display","block");
					if(section == "tt"){
						var lh = $(window).width()*0.45;
						var gh = $(window).width()*0.05;
						var $container = $('#list ul');
						$container.masonry({
							itemSelector : '#list ul li',
							gutterWidth : lh,
							gutterWidth:gh,
							isAnimated: true
						});
					}
					break;
				}
			}
		});
	});
}

}