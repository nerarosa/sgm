/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry2=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);

/*Advance Search by Ha Leona*/
function sgmSearch(urlNext) {
	var _this = this;
	var query_value = $('input#morphsearchInput').val().trim(),
		category = $('#category').val(),
		country = $('#country').val(),
		postGr = $('#postGroup').val(),
		stt = $('#stt').val(),
		multiLabel = '';
		
	if(category != 0) multiLabel += '/' + category;
	if(country != 0) multiLabel += '/' + country;
	if(postGr != 0) multiLabel += '/' + postGr;
	if(stt != 0) multiLabel += '/' + stt;
	
	if(urlNext === undefined){
		if(multiLabel == ''){
			var urlsearch = url_blog+"feeds/posts/summary?alt=json-in-script&max-results=200";
		}else {
			var urlsearch = url_blog+"feeds/posts/summary/-" + multiLabel + "?alt=json-in-script&max-results=200";
		}
	}else{
		var urlsearch = urlNext;
	}
	
	$('b#search-string').html(query_value);	
		
	if(query_value !== ''){
		$.ajax({
			type: "get",
			url: urlsearch,
			cache: false,			
			dataType: 'jsonp',
			beforeSend: function(){
				addLoading();
			},
			success: function(data){
				_this.analyzeData(data);
			},
			error: function(){
				$("#grid-gallery").html('<strong id="error-result">Lỗi load dữ liệu</strong>');
			},
			complete: function(){
				removeLoading();
			}
		});
	}
	
	_this.analyzeData = function(data){
		var entry = '', 
			resultItem = '',
			link = '', 
			title = '', 
			sum = '',
			type = '', 
			thumbimg = '', 
			labels,
			changeResultText = '',
			nextLink = '',
			entry = data.feed.entry,
			globalLink = data.feed.link;
			
		for(var i = 0; i < globalLink.length; i++){
			if(globalLink[i].rel == 'next'){
				nextLink = globalLink[i].href;							
				if(multiLabel == ''){
					nextLink = url_blog+"feeds/posts/summary?" + nextLink.split('?')[1];
				}else {
					nextLink = url_blog+"feeds/posts/summary/-" + multiLabel + "?" + nextLink.split('?')[1];
				}
				$('#advance-search-page').html('<span id="next-link" data-url-next="' + nextLink + '">Load More</span>');
			}else{
				$('#advance-search-page').html('');
			}
		}
		
		if (entry !== undefined) {
			var enQueryValue = query_value;
			if($("#cb6").is(':checked') == false){
				enQueryValue = _this.change_alias(enQueryValue);
			}
			
			for (var i = 0; i < entry.length; i++) {
				var exeData = _this.executeData(entry[i]);						
					link = exeData.link;
					title = exeData.title;
					thumbimg = exeData.thumbimg;
					sum = exeData.sum;
					type = exeData.type;
				
				if($("#cb6").is(':checked')==false){
					var enTitle = _this.change_alias(title);					
					var enSum = _this.change_alias(sum);
				}else{
					var enTitle = title;					
					var enSum = sum;
				}
								
				if($("#cb7").is(':checked')==true){
					if(_this.regExp(enSum, enQueryValue) || _this.regExp(enTitle, enQueryValue)){																		
						resultItem += _this.printResultItem(link, thumbimg, title, type);
					}
				}else{
					if(_this.regExp(enTitle, enQueryValue) || _this.regExp(enQueryValue, enTitle)){
						resultItem += _this.printResultItem(link, thumbimg, title, type);
					}
				}
			}
			
			if(resultItem === '' && $("#cb7").is(':checked') == false && $("#cb6").is(':checked') == false && enQueryValue.indexOf(' ') != -1){
				var arrChar = enQueryValue.split(' ');
			
				for (var i = 0; i < entry.length; i++) {
					var exeData = _this.executeData(entry[i]);
						link = exeData.link;
						title = exeData.title;
						thumbimg = exeData.thumbimg;
						sum = exeData.sum;
						type = exeData.type;

					if($("#cb6").is(':checked')==false){
						var enTitle = _this.change_alias(title);
						var enSum = _this.change_alias(sum);
					}else{
						var enTitle = title;
						var enSum = sum;
					}
									
					for(var x = 0; x < arrChar.length; x++){							
						if(_this.regExp(enTitle, arrChar[x])){
							resultItem += _this.printResultItem(link, thumbimg, title, type);
						}
					}						
				}
			
				if(resultItem !== ''){
					changeResultText = 'Không tìm thấy kết quả với "' + query_value + '". Kết quả thay thế với các từ : ' + arrChar;
				}				
			}
			
		}
		
		if(resultItem !== ''){
			$("h4#results-text-change").html(changeResultText);

			if(urlNext === undefined){
				$("#grid-gallery").html(resultItem);
				var lastItem = 0;
			}else{
				if($("#no-result").length > 0){
					$("#no-result").remove();
				}
				var lastItem = $("#grid-gallery").find('.content-box').length - 1;
				$("#grid-gallery").append(resultItem);				
			}
			
			var newItems = $("#grid-gallery").find('.content-box')
			
			$('#advance-search-page').fadeIn();
			
			if(urlNext === undefined){
				$("#grid-gallery").masonry2({
					itemSelector: '.content-box',
					isAnimated: true,
					columnWidth: getImageWidthForScreen
				});
			}else{
				
			}
			
			$("#grid-gallery").imagesLoaded(function() {
				var i = lastItem, len, displayItem;
				
				$("#grid-gallery").masonry2('reload').trigger('itemsLoaded');
				
				displayItem = function(i) {
					$(newItems[i]).css({
						opacity: 0,
						visibility: 'visible',
						marginTop: 100
					}).animate({
						opacity: 1,
						marginTop: 0
					}, 300, function() {
						if (i === len - 1) {
							$("#grid-gallery").masonry2("reload");
						}
					})
				};
				
				for (i = lastItem, len = newItems.length; i < len; i += 1) {
					(function(i) {
						window.setTimeout(function() {
							displayItem(i)
						}, i * 100)
					})(i)
				}
			})
			
			$("#grid-gallery").on('mouseenter', '.content-box', doOnItemMouseEnter);
			$("#grid-gallery").on('mouseleave', '.content-box', doOnItemMouseLeave);
		}else{
			if(urlNext === undefined){
				if($('#advance-search-page').length == 0){
					$("#grid-gallery").html('<div id="no-result">Không tìm thấy kết quả nào</div>');
					if($("h4#results-text-change").html() !== '') $("h4#results-text-change").html('');
				}else{
					if(nextLink != '')
						sgmSearch(nextLink);
					else{
						if($("ul#og-grid a").length == 0){
							//$("ul#og-grid").html('<div id="no-result">Không tìm thấy kết quả nào</div>');
							//if($("h4#results-text-change").html() !== '') $("h4#results-text-change").html('');
						}
					}	
				}
			}else{
				if(nextLink != '')
					sgmSearch(nextLink);							
				else{
					if($("#grid-gallery a").length == 0){
						$("#grid-gallery").html('<div id="no-result">Không tìm thấy kết quả nào</div>');
						if($("h4#results-text-change").html() !== '') $("h4#results-text-change").html('');
					}
				}	
			}
		}
	}
	
	function getImageWidthForScreen(containerWidth) {
		var imageWidth = 300,
			imageHeight = 186,
			itemMargin = 7;
		
		var items = $("#grid-gallery").find(".content-box");	
		
		var numColumns = 0,
			spaceLeft = 0,
			ratio = 0,
			newImgW, i, len, col, row, w, h;
		numColumns = Math.floor(containerWidth / imageWidth);
		spaceLeft = containerWidth - numColumns * (imageWidth - itemMargin);
		if (spaceLeft > 0) {
			newImgW = 0;
			if (!(numColumns === 1 && imageWidth / 2 > spaceLeft)) {
				numColumns += 1
			}
			newImgW = Math.floor(containerWidth / numColumns) - itemMargin;
			ratio = imageWidth / newImgW;
			for (i = 0, len = items.length; i < len; i += 1) {
				col = $(items[i]).data('col');
				row = $(items[i]).data('row');
				w = newImgW;
				h = 0;
				if (col > 1 && numColumns > 1) {
					w = (newImgW + itemMargin) * col - itemMargin
				}
				$(items[i]).width(w).find("img").width(w);
				$(items[i]).width(w).find(".no-color").width(w);
				if (imageHeight !== "auto") {
					h = numColumns === 1 ? "auto" : (Math.floor(imageHeight / ratio) + itemMargin) * row - itemMargin;
					$(items[i]).height(h).find("img").height(h);
					$(items[i]).width(w).find(".no-color").height(h)
				}
			}
		}
		return newImgW + itemMargin
	}
	
	function doOnItemMouseEnter() {
		elemFadeIn($(this).find('.content-box-text'), 1)
	}

	function doOnItemMouseLeave() {
		if (!isMobile) {
			elemFadeOut($(this).find('.content-box-text'), 0)
		}
	}
	
	function elemFadeIn($elem, opacity) {
		opacity = opacity || 1;
		$elem.stop().animate({
			opacity: 1
		}, function() {
			$elem.animate({
				opacity: opacity
			}, 0)
		})
	}

	function elemFadeOut($elem, opacity) {
		$elem.stop().animate({
			opacity: opacity
		}, function() {
			$elem.animate({
				opacity: opacity
			}, 0)
		})
	}
	
	function removeLoading() {
		$(".advance-search-loading").fadeOut();
	}

	function addLoading() {
		$(".advance-search-loading").fadeIn();
	}
	
	//convert Vietnamese
	_this.change_alias = function(a){a=a.toLowerCase();a=a.replace(/\u00e0|\u00e1|\u1ea1|\u1ea3|\u00e3|\u00e2|\u1ea7|\u1ea5|\u1ead|\u1ea9|\u1eab|\u0103|\u1eb1|\u1eaf|\u1eb7|\u1eb3|\u1eb5/g,"a");a=a.replace(/\u00e8|\u00e9|\u1eb9|\u1ebb|\u1ebd|\u00ea|\u1ec1|\u1ebf|\u1ec7|\u1ec3|\u1ec5/g,"e");a=a.replace(/\u00ec|\u00ed|\u1ecb|\u1ec9|\u0129/g,"i");a=a.replace(/\u00f2|\u00f3|\u1ecd|\u1ecf|\u00f5|\u00f4|\u1ed3|\u1ed1|\u1ed9|\u1ed5|\u1ed7|\u01a1|\u1edd|\u1edb|\u1ee3|\u1edf|\u1ee1/g,"o");a=a.replace(/\u00f9|\u00fa|\u1ee5|\u1ee7|\u0169|\u01b0|\u1eeb|\u1ee9|\u1ef1|\u1eed|\u1eef/g,
	"u");a=a.replace(/\u1ef3|\u00fd|\u1ef5|\u1ef7|\u1ef9/g,"y");return a.replace(/\u0111/g,"d")}

	_this.regExp = function(str, pat){
		var patReg = new RegExp(pat, "i");

		return patReg.test(str);
	}
	
	_this.printResultItem = function(link, thumbimg, title, type){
		var col, row, textView;
		if(type == "video" || type == "photo" || type == 'story' || type == 'radio'){
			col = 1; row = 1
		}else if (type == "wallpaper"){
			col = 2; row = 2
		}else if (type == "book" || type == "audiobook" || type == "comic"){
			col = 1; row = 2
		}
		
		switch(type){			
			case 'video': textView = "Play"; break;
			case 'wallpaper': textView = "Download"; break;
			case 'comic':
			case 'book': textView = "Đọc"; break;
			case 'radio':
			case 'audiobook': textView = "Nghe"; break;
			case 'photo':
			default:textView = "View"; break;
		}
		
		
		var htmlItem = '<div class="content-box" data-col="'+ col +'" data-row="'+ row +'" style="width:300px;"><img src="'+ thumbimg +'" width="300"/><div class="content-box-content"><div class="content-box-text"><a href="'+ link +'" title="'+ title +'"><div class="text-wrapper"><h3 class="post-info"></h3><h2>'+ title +'</h2></div><div class="view-gallery"><span class="item-num">'+ type +'</span><span class="grid-gallery-icon '+ type +'"></span><span class="view-text">'+ textView +' <span class="more-arrow">»</span></span></div></a></div></div></div>';
		
		return htmlItem;
	}

	_this.executeData = function(entry){
		var link='', 
			title='', 
			sum='',
			thumbimg='',
			labels = [],
			typeP = '',
			imgInContent='';

		for (var j = 0; j < entry.link.length; j++) {
			if (entry.link[j].rel == "alternate") {
				link = entry.link[j].href;
			}
		}
		
		title=entry.title.$t;
		
		sum = ("content" in entry) ? entry.content.$t : ("summary" in entry) ? entry.summary.$t : "";	
		
		if ("media$thumbnail" in entry) {
			thumbimg = imageHostFix(entry.media$thumbnail.url);
		} else {
			/*if (imgInContent.length != 0) {
				thumbimg = imgInContent[0].src;
				if(thumbimg.indexOf('blogspot.com')!=-1)
					thumbimg=thumbimg.replace(/\/s[0-9]+(\-c)?/g, "/s250-c");
			} else {*/
				thumbimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==";
			//}
		}
		
		if(entry.category !== undefined){
			$.each(entry.category, function(i){
				labels.push(entry.category[i].term);
			})			
		}
		if($.inArray("Photo", labels) != -1){
			typeP = 'photo';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h160-c/")
		}else if($.inArray("Video", labels) != -1){
			typeP = 'video';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h160-c/")
		}else if($.inArray("Wallpaper", labels) != -1){
			typeP = 'wallpaper';
			thumbimg = thumbimg.replace("/s72-c/", "/w520-h325-c/")
		}else if($.inArray("ComicFull", labels) != -1){
			typeP = 'comic';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h325-c/")
		}else if($.inArray("Book", labels) != -1){
			typeP = 'book';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h325-c/")
		}else if($.inArray("AudioBook", labels) != -1){
			typeP = 'audiobook';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h325-c/")
		}else if($.inArray("Story", labels) != -1){
			typeP = 'story';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h160-c/")
		}else if($.inArray("Radio", labels) != -1){
			typeP = 'radio';
			thumbimg = thumbimg.replace("/s72-c/", "/w255-h160-c/")
		}else{
			typeP = 'other';
			thumbimg = thumbimg.replace("/s72-c/", "/w250-c/")
		}	
		
		sum = sum.replace(/<\S[^>]*>/g, "");
		
		var jsonResult = {};
		jsonResult['title'] = title;
		jsonResult['link'] = link;
		jsonResult['sum'] = sum;
		jsonResult['thumbimg'] = thumbimg;
		jsonResult['type'] = typeP;
		
		return jsonResult;
	}
	
	return false;
}


$(document).ready(function() {

	//run on event
	$("input#morphsearchInput").on("keyup", function(e) {	
		var canceKey = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40];
		if($.inArray(e.keyCode, canceKey) !== -1) return false;
		
		clearTimeout($.data(this, 'timer'));
		var search_string = $(this).val().trim();
		$("#grid-gallery").html('');
		$('#advance-search-page').fadeOut().html('');
		if (search_string == '') {
			$("#grid-gallery").fadeOut();
			$('h4#results-text').fadeOut();
		}else{
			if (search_string.length > 1) {
			$("#grid-gallery").fadeIn();
			$('h4#results-text').fadeIn();
			$(this).data('timer', setTimeout(function(){
				sgmSearch();
			}, 100));
			}
		};
	});

	$("#wrapselect select").change(function(e) {
		clearTimeout($.data(this, 'timer'));
		var search_string = $("input#morphsearchInput").val().trim();
		$("#grid-gallery").html('');
		$('#advance-search-page').fadeOut().html('');
		$("input#morphsearchInput").focus();
		if (search_string == '') {
			$("#grid-gallery").fadeOut();
			$('h4#results-text').fadeOut();
		}else{
			if (search_string.length > 1) {
			$("#grid-gallery").fadeIn();
			$('h4#results-text').fadeIn();
			$(this).data('timer', setTimeout(function(){
				sgmSearch();
			}, 100));
			}
		};		
	});

	$("#wrapselect input[type=checkbox]").change(function(e) {
		clearTimeout($.data(this, 'timer'));
		var search_string = $("input#morphsearchInput").val().trim();
		$("#grid-gallery").html('');
		$('#advance-search-page').fadeOut().html('');
		$("input#morphsearchInput").focus();
		if (search_string == '') {
			$("#grid-gallery").fadeOut();
			$('h4#results-text').fadeOut();
		}else{
			if (search_string.length > 1) {
			$("#grid-gallery").fadeIn();
			$('h4#results-text').fadeIn();
			$(this).data('timer', setTimeout(function(){
				sgmSearch();
			}, 100));
			}
		};		
	});
	
	$(document).on("click" ,"#advance-search-page span" ,function(event){
		event.preventDefault();
		var urlNext = $(this).data('url-next');	
		clearTimeout($.data(this, 'timer'));
		$(this).data('timer', setTimeout(function(){
				sgmSearch(urlNext);
		}, 100));
	});
	
	getRecent ('Bikini','#recentOverlay');
	getRecent ('Sexy','#recentOverlay1', true);
});
	
function getRecent(h,d,k){$.ajax({url:""+url_blog+"feeds/posts/default/-/"+h+"?alt=json-in-script&orderby=updated&max-results=6",type:"get",dataType:"jsonp",success:function(a){var g,e,f="",b="";a=a.feed.entry;if(void 0!==a){for(var c=0;c<a.length;c++){for(b=0;b<a[c].link.length;b++)if("alternate"==a[c].link[b].rel){g=a[c].link[b].href;break}e=a[c].title.$t;b=imageHostFix(a[c].media$thumbnail.url);f+='<a class="dummy-media-object" href="'+g+'" target="_blank"><img '+(1==k?'class="round"':"")+' src="'+b+'" alt="'+
e+'"/><h3>'+e+"</h3></a>"}$(d).html(f)}else $(d).html("<span>No result!</span>")},error:function(){$(d).html("<strong>Error Loading Feed!</strong>")}})};

(function(){function c(){if(classie.has(a,"open")){classie.remove(a,"open");classie.remove(d,"overlay-open");classie.add(a,"close");var b=function(c){if(support.transitions){if("visibility"!==c.propertyName)return;this.removeEventListener(transEndEventName,b)}classie.remove(a,"close")};support.transitions?a.addEventListener(transEndEventName,b):b()}else classie.has(a,"close")||(classie.add(a,"open"),classie.add(d,"overlay-open"))}var d=document.querySelector("div.sgm-container"),b=document.getElementById("trigger-overlay"),
a=document.querySelector("div.ss-overlay"),e=a.querySelector("button.overlay-close");transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};transEndEventName=transEndEventNames[Modernizr.prefixed("transition")];support={transitions:Modernizr.csstransitions};b.addEventListener("click",c);e.addEventListener("click",c)})();
(function(){function c(){if(classie.has(b,"open")){classie.remove(b,"open");classie.add(b,"close");var a=function(c){if(support.transitions){if("visibility"!==c.propertyName)return;this.removeEventListener(transEndEventName,a)}classie.remove(b,"close")};support.transitions?b.addEventListener(transEndEventName,a):a()}else classie.has(b,"close")||(classie.add(b,"open"),$("input#morphsearchInput").focus())}var d=document.getElementById("trigger-overlay1"),b=document.querySelector("div.second-overlay"),
a=b.querySelector("button.overlay-close");transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};transEndEventName=transEndEventNames[Modernizr.prefixed("transition")];support={transitions:Modernizr.csstransitions};d.addEventListener("click",c);a.addEventListener("click",c)})();

var ssgirlData = 'http://ssgirl-profile.blogspot.com';
function getListStar(){
	var url = ssgirlData + '/feeds/posts/summary?alt=json-in-script&max-results=200';
		
	$.ajax({
		url: url,
		type: 'get',
		dataType: "jsonp",
		success: function(data) {
			var listHtml = '<div class="fail-message"><span>Không có kết quả nào.</span></div>', 
				label, sum, namegirl, idgirl, nameexist = [],
				labelFilter = ['Người mẫu', 'Ca sĩ', 'Diễn viên', 'Hàn Quốc', 'Nhật Bản', 'Việt Nam', 'Thái Lan', 'Trung Quốc', 'Âu Mĩ'],
				classArr = ['model', 'singer', 'actress', 'kr', 'jp', 'vn', 'tl', 'cn', 'en-us'],
				entry = data.feed.entry;
			if (entry !== undefined) {
				
				for (var i = 0, len = entry.length; i < len; i++) {								
					sum = "summary" in entry[i] ? entry[i].summary.$t : "";
										
					namegirl = entry[i].title.$t;
					idgirl = entry[i].id.$t.split('post-')[1];
					
					
					var filterclass='';
					label = entry[i].category;
					for(var j = 0; j< label.length; j++ ){
						if($.inArray(label[j].term, labelFilter) > -1){
							filterclass += ' ' + classArr[labelFilter.indexOf(label[j].term)];
						}						
					}
					
					
					listHtml += '<div class="mix' + filterclass + '" data-abcorder="' + namegirl + '"><a href="' + url_blog + 'search?q=' + idgirl + '&d=ssgirl" >' + namegirl + '</a></div>';
				}
				
				$('#mix-container').html(listHtml);
				
				if($('#mix-container').html() !== ''){
					var buttonFilter = {
						$filters: null,
						$reset: null,
						groups: [],
						outputArray: [],
						outputString: '',
						init: function(){
							var self = this; 
							
							self.$filters = $('.control-bar');
							self.$reset = $('#Reset');
							self.$container = $('#mix-container');
							
							self.$filters.find('div.ft').each(function(){
							  self.groups.push({
								$buttons: $(this).find('.filter'),
								active: ''
							  });
							});
							
							self.bindHandlers();
						},
						bindHandlers: function(){
							var self = this;
							
							self.$filters.on('click', '.filter', function(e){
							  e.preventDefault();
							  
							  var $button = $(this);
							  
							  $button.hasClass('active') ?
								$button.removeClass('active') :
								$button.addClass('active').siblings('.filter').removeClass('active');
							  
							  self.parseFilters();
							});
							
							self.$reset.on('click', function(e){
							  e.preventDefault();
							  
							  self.$filters.find('.filter').removeClass('active');
							  
							  self.parseFilters();
							});
						},
						parseFilters: function(){
							var self = this;
							
							for(var i = 0, group; group = self.groups[i]; i++){
							  group.active = group.$buttons.filter('.active').attr('data-filter') || '';
							}
							
							self.concatenate();
						},
						concatenate: function(){
							var self = this;						
							self.outputString = '';
							
							for(var i = 0, group; group = self.groups[i]; i++){
							  self.outputString += group.active;
							}
							
							!self.outputString.length && (self.outputString = 'all'); 
							
							console.log(self.outputString); 						
							  if(self.$container.mixItUp('isLoaded')){
								self.$container.mixItUp('filter', self.outputString);
							  }
						}
					};

					var buttonSort = {
						$sorts: null,
						groups: [],
						outputArray: [],
						outputString: '',
						init: function(){
							var self = this; 
							
							self.$sorts = $('.control-bar');
							self.$container = $('#mix-container');
							
							self.$sorts.find('div.st').each(function(){
							  self.groups.push({
								$buttons: $(this).find('.sort'),
								active: ''
							  });
							});
							
							self.bindHandlers();
						},
						bindHandlers: function(){
							var self = this;
							
							self.$sorts.on('click', '.sort', function(e){
							  e.preventDefault();
							  
							  var $button = $(this);
							  
							  $button.hasClass('active') ?
								$button.removeClass('active') :
								$button.addClass('active').siblings('.sort').removeClass('active');
							  
							  self.parseFilters();
							});
						},
						parseFilters: function(){
							var self = this;
							
							for(var i = 0, group; group = self.groups[i]; i++){
							  group.active = group.$buttons.filter('.active').attr('data-sort') || '';
							}
							
							self.concatenate();
						},
						concatenate: function(){
							var self = this;
							self.outputString = '';
							
							for(var i = 0, group; group = self.groups[i]; i++){
							  self.outputString += group.active;
							}
							
							!self.outputString.length && (self.outputString = 'all'); 
							
							console.log(self.outputString); 
							
							if(self.$container.mixItUp('isLoaded')){
								self.$container.mixItUp('sort', self.outputString);
							}
						}
					};
					
					buttonFilter.init();
					buttonSort.init();

					$('#mix-container').mixItUp({
						load: {sort: 'abcsort:desc'},
						layout: {containerClass: 'list'},
						controls: {enable: false},
						/*controls: {
							toggleFilterButtons: true,
							toggleLogic: 'and'
						}*/
					});
				}
			} else {
				$('#mix-container').html('<div class="slide"><span>No result!</span></div>');
			}
		},
		error: function() {
			$('#mix-container').html('<div class="slide"><strong>Error Loading Feed!</strong></div>');
		}
	});
}

$(document).ready(function () {
	$('#funbutton #trigger-overlay').click(function(){
		if(!$(this).hasClass('wasLoaded')){
			getListStar();
			$(this).addClass('wasLoaded');
		}
	});
});

/*!
 * jQuery iLightbox
 * Copyright (c) 2014 Creativedream.net
 * Version: 0.1 (26-09-2014)
 * Requires: jQuery v1.7.1 or later
 */
(function(e){e.fn.iLightbox=function(t){var n=e.extend({},e.fn.iLightbox.defaults,t);this.each(function(t,r){var i,s=e(r),o=e('<div id="iLightbox"></div>'),u={container:"#iLightbox",box:".iLightbox-container:last-child",boxB:".iLightbox-media",boxM:".iLightbox-container:last-child img, .iLightbox-container:last-child iframe",boxD:".iLightbox-details",loader:".iLightbox-loader",btns:{closeB:".iLightbox-close",nextB:".iLightbox-btnNext",prevB:".iLightbox-btnPrev"}},f={},l={ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40},c={init:function(){i=this;i.k=l;i.s=s;i.c=o;i.n=n;i.g=f;i._styleCont();e(s).on("click",function(e){e.preventDefault();i._showBox()});e("body").on("click",function(e){if(e.target.id=="iLightbox"){i._hideBox()}});e(window).on("resize",function(){i._styleBox();i.n.onUpdate?i.n.onUpdate(o):null})},_keyUp:function(e){e.preventDefault();switch(e.keyCode){case i.k.ESC:i._hideBox();break;case i.k.LEFT:case i.k.UP:i._goToPrev(e.keyCode);break;case i.k.RIGHT:case i.k.DOWN:i._goToNext(e.keyCode);break}},_styleCont:function(){o.css({position:"fixed",width:"100%",height:"100%",top:"0",left:"0",overflowY:"scroll",overflowX:"hidden",display:"none"})},_styleBox:function(e,t){if(!i.c||typeof i.c=="string"){return}var n={wH:.85,mT:0},r={};if(t){switch(t){case"next":case"prev":r.left="50%";break;case"up":case"down":r.top="50%";break}}if(o.find(u.boxD).length!=0){n.wH=.8;n.mT=0}if(o.find(u.boxM).is("iframe") || o.find(u.boxM).is("embed")){o.find(u.boxB).addClass("iLightbox-iframe");o.find(u.boxM).attr({width:Math.round($(window).width()*(.85-.25)),height:Math.round($(window).height()*(n.wH-.25))})}o.find(u.boxM).css({maxWidth:Math.round($(window).width()*.85),maxHeight:Math.round($(window).height()*n.wH)});o.find(u.box).css({marginLeft:-o.find(u.box).width()/2,marginTop:-o.find(u.box).height()/2-n.mT});if(e){o.find(u.box).animate(r,{queue:false,duration:"normal"})}else{o.find(u.box).css({left:"50%",top:"50%"})}},_clear:function(){e("body").find(u.container).remove();$(window).unbind("keyup",i._keyUp);o.html("")},_showBox:function(){i._clear();i._loaderToggle();e("body").css({overflow:"hidden",width:e("body").innerWidth()});o.appendTo("body").fadeIn(250,function(){i._loadContent()});o.on("click",u.btns.closeB,function(e){e.preventDefault();i._hideBox()}).on("click",u.boxB+" "+u.btns.nextB,function(e){e.preventDefault();i._goToNext()}).on("click",u.boxB+" "+u.btns.prevB,function(e){e.preventDefault();i._goToPrev()});$(window).bind("keyup",i._keyUp)},_hideBox:function(){i.n.beforeClose?i.n.beforeClose(o):null;e("body").find(u.container).fadeOut(250,function(){e("body").css({overflow:"",width:""});i._clear();i.n.afterClose?i.n.afterClose():null})},_loaderToggle:function(){if(e(i.c).find(".iLightbox-loader").length==0){e(i.c).prepend('<div class="iLightbox-loader"></div>')}else{e(i.c).find(".iLightbox-loader").remove()}},_goToPrev:function(e){var t=f.e.find(f.t),n=f.c-1,r={};if(e){switch(e){case i.k.LEFT:r.left="35%";break;case i.k.UP:r.top="35%";break}}else{r.left="35%"}if(n==t.length){n=0}if(n<0){if(!i.n.loop){return}}if(n<0){n=t.length-1}if(!t[n]){n=0}o.find(u.box).animate(r,{queue:false,duration:"normal"});o.find(u.box).fadeOut(250,function(){$(this).remove()});i._loadContent(t[n],e==l.UP?"up":"prev");i.n.onUpdate?i.n.onUpdate(o):null},_goToNext:function(e){var t=f.e.find(f.t),n=f.c+1,r={};if(e){switch(e){case i.k.RIGHT:r.left="65%";break;case i.k.DOWN:r.top="65%";break}}else{r.left="65%"}if(n>=t.length){if(!i.n.loop){return}n=0}if(!t[n]){n=0}o.find(u.box).animate(r,{queue:false,duration:"normal"});o.find(u.box).fadeOut(250,function(){$(this).remove()});i._loadContent(t[n],e==l.DOWN?"down":"next");i.n.onUpdate?i.n.onUpdate(o):null},_loadContent:function(t,n){var r=s,u=false;if(t){i._loaderToggle();r=e(t);u=true}o.append('<div class="iLightbox-container"></div>');a={href:!r.attr("href")?i.n.href?i.n.href:null:r.attr("href"),title:r.attr("data-lightbox-title")?r.attr("data-lightbox-title"):i.n.title?i.n.title:null,gallery:r.attr("data-lightbox-gallery")?r.attr("data-lightbox-gallery"):null,type:r.attr("data-lightbox-type")?r.attr("data-lightbox-type"):i.n.type?i.n.type:"image"};switch(a.type){case"image":a.html=e('<img src="'+a.href+'" alt="" />');a.html.error(function(){i._error();return false}).load(function(){i._render(t,n,r,u,a)});break;case"iframe":a.html='<iframe frameborder="0" vspace="0" hspace="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" scrolling="auto" src="'+a.href+'"></iframe>';i._render(t,n,r,u,a);break;case"ajax":var f=$.ajax({url:a.href,type:"GET",data:{fromB:"lightbox"},dataType:"html"}).done(function(e){a.html=e;i._render(t,n,r,u,a)}).fail(function(e,t){i._error()});break;case"swf":a.html=e('<embed src="'+a.href+'" autostart="true">');i._render(t,n,r,u,a);break;case"html":a.html="<div>"+(r.attr("data-lightbox-content")?r.attr("data-lightbox-content"):i.n.content?i.n.content:null)+"</div>";i._render(t,n,r,u,a);break;default:i._clear();break}},_render:function(t,n,r,s,a){o.find(u.box).find("div").remove();var l=e("<div>"+(i.n.closeBtn?'<a href="javascript:;" class="iLightbox-close"></a>':null)+'<div class="iLightbox-media"></div></div>');if(a.html){l.find(".iLightbox-media").append(a.html)}if(a.title){l.append('<div class="iLightbox-details"><h3>'+a.title+"</h3></div>")}if(a.gallery!=null){var c;if(a.gallery=="gallery"){var h=r.parent();while(h[0]){var p=$(h);if(p.find('*[data-lightbox-gallery="gallery"]').length>1){c=p;break}else{c=null;h=p.parent()}}f.t='*[data-lightbox-gallery="gallery"]'}else if(a.gallery.length==0){c=e("body");c=c.find('*[data-lightbox-gallery=""]').length>1?c:null;f.t='*[data-lightbox-gallery=""]'}else{var h=r.parent();while(h[0]){var p=$(h);if(p.find('*[data-lightbox-gallery="'+a.gallery+'"]').length>1){c=p;break}else{c=null;h=p.parent()}}f.t='*[data-lightbox-gallery="'+a.gallery+'"]'}if(c!=null){f.e=c;f.c=c.find(f.t).index(r);if(i.n.arrows){l.find(u.boxB).prepend('<div class="iLightbox-btnPrev"><a href="javascript:;"></a></div>');l.find(u.boxB).append('<div class="iLightbox-btnNext"><a href="javascript:;"></a></div>');if(!i.n.loop){if(f.c==0){l.find(u.boxB).find(".iLightbox-btnPrev").remove()}}if(!i.n.loop){if(c.find(f.t).length==f.c+1){l.find(u.boxB).find(".iLightbox-btnNext").remove()}}}}else{f={}}}e(l).hide().appendTo(o.find(u.box));o=o;i.n.beforeShow?i.n.beforeShow(o,a):null;if(s){if(n){switch(n){case"next":o.find(u.box).css({left:"35%",top:"50%"});break;case"prev":o.find(u.box).css({left:"65%",top:"50%"});break;case"up":o.find(u.box).css({top:"65%",left:"50%"});break;case"down":o.find(u.box).css({top:"35%",left:"50%"});break}e(l).fadeIn(250,function(){i.n.onShow?i.n.onShow(o,a):null})}else{e(l).fadeIn(250,function(){i.n.onShow?i.n.onShow(o,a):null})}}else{e(l).fadeIn(250,function(){i.n.onShow?i.n.onShow(o,a):null})}i._styleBox(s,n);i._loaderToggle()},_error:function(){}};c.init()});return this};e.fn.iLightbox.defaults={type:"image",width:"auto",height:"auto",loop:true,arrows:true,closeBtn:true,title:null,href:null,content:null,openEffect:"fade",closeEffect:"fade",animation:"slide",beforeShow:function(e,t){},onShow:function(e,t){},beforeClose:function(){},afterClose:function(){},onUpdate:function(e){},template:{container:'<div class="iLightbox-container"></div>',image:'<div class="iLightbox-media"></div>',iframe:'<div class="iLightbox-media iLightbox-iframe"></div>',title:'<div class="iLightbox-details"></div>',error:'<div class="iLightbox-error">The requested content cannot be loaded.<br/>Please try again later.</div>',closeBtn:'<a href="#" class="iLightbox-close"></a>',prevBtn:'<div class="iLightbox-btnPrev"><a href="javascript:;"></a></div>',nextBtn:'<div class="iLightbox-btnNext"><a href="javascript:;"></a></div>'}}})(jQuery);

$(document).ready(function(){
	
	var listYoutube = ["PLcexS2ONZ6d0yoH-ELBJo2iq4aJr82zEt", "PLcexS2ONZ6d2gOZI02lNMQtBhtJO-yxHg"];
	function randomVideoFromYTChannel(){
		let ranList = Math.floor(Math.random() * (listYoutube.length - 1));
		
		$.ajax({
			url: "https://www.googleapis.com/youtube/v3/playlistItems",
			type: "get",
			data: {
				key : "AIzaSyALiTeDemN-zjrulrD723vdt6MIjRfIMuY",
				part : "snippet",
				playlistId : listYoutube[ranList],
				maxResults : 50
			},
			dataType: "jsonp",
			success: function(data) {				
				let videos = data.items;
				if(videos !== undefined){
					if(videos.length > 0){
						let randNum = Math.floor(Math.random() * (videos.length - 1));
						let ytLink = "http://www.youtube.com/embed/"+ videos[randNum].snippet.resourceId.videoId +"?rel=0&amp;autoplay=1&amp;wmode=transparent&amp;showinfo=0";
						$(".yt-overlay-play-button a").attr("href", ytLink).addClass("has-yt");						
					}
					
					$('.yt-overlay-play-button a[data-lightbox-gallery]').iLightbox();
				}
			},
			error: function(e){
				console.log(e);
			}
		});
	}
	
	randomVideoFromYTChannel();
	$(".yt-overlay-play-button a").on("click", function(){
		randomVideoFromYTChannel();
	});

null!=Cookies.get("confirmage")&&$(".switch-input").prop("checked",!0);$(".switch").on("click",function(){$(".switch-input").is(":checked")?(null==Cookies.get("confirmage")&&Cookies.set("confirmage",1,{path:"/",domain:"sexygirlmedia.blogspot.com",secure:!1}),0<$(".main-post-content .adult-content").length&&
($(".main-post-content .adult-content").each(function(){$(this).attr("href",$(this).data("ohref"));$(this).children().attr("src",$(this).children().data("osrc"));$(this).attr("data-ohref","https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg");$(this).children().attr("data-osrc","https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg")}),$(".turnon-adult-content").remove())):null!=Cookies.get("confirmage")&&
Cookies.remove("confirmage",{expires:null,path:"/",domain:"sexygirlmedia.blogspot.com",secure:!1})})});

jQuery(document).ready(function(a){function c(){a("#cd-success").is(":checked")?a(".cd-response-success").addClass("slide-in"):a("#cd-error").is(":checked")?a(".cd-response-error").addClass("is-visible"):a(".cd-response-success").addClass("slide-in")}var d=a('div[data-type="message"]');a(".cd-form .cd-email").keyup(function(b){13!=b.which&&(d.removeClass("slide-in is-visible"),a(".cd-form").removeClass("is-submitted").find(".cd-loading").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"));
b=a(this).val();var c=b.indexOf("@");dotPosition=b.lastIndexOf(".");1>c||dotPosition<c+2?a(".cd-form").removeClass("is-active").find(".cd-loading").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"):a(".cd-form").addClass("is-active")});a(".cd-form .cd-email").on("focus",function(){d.removeClass("slide-in is-visible");a(".cd-form").removeClass("is-submitted").find(".cd-loading").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")});
a(".cd-submit").on("click",function(b){a(".cd-form").hasClass("is-active")&&(a(".cd-form").addClass("is-submitted").find(".cd-loading").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){c()}),a("html").hasClass("no-csstransitions")&&c())});Modernizr.input.placeholder||(a("[placeholder]").focus(function(){var b=a(this);b.val()==b.attr("placeholder")&&b.val("")}).blur(function(){var b=a(this);""!=b.val()&&b.val()!=b.attr("placeholder")||b.val(b.attr("placeholder"))}).blur(),
a("[placeholder]").parents("form").submit(function(){a(this).find("[placeholder]").each(function(){var b=a(this);b.val()==b.attr("placeholder")&&b.val("")})}))});

$(document).ready(function() {
    var stickyNavTop = $('#menu-wrapper').offset().top; 
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();         
        if (scrollTop > stickyNavTop) { 
            $('#menu-wrapper').css({'position':'fixed','top':0,'left':0,'z-index':99, 'background': 'rgba(0, 0, 0, 0.6)'});
        } else {
            $('#menu-wrapper').css({'position':'relative', 'background':''});
        }
    };
    stickyNav();
    $(window).scroll(function() {
        stickyNav();
    });
	
	$('.searchbutton').click(function(){
		$(this).toggleClass('active');
		$('.search-form').slideToggle('normal');
	});
});

//Menu Top
/*$(document).ready(function(){
	var str=location.href.toLowerCase();
	$('.main-nav ul li a').each(function(){
		if(str.indexOf(this.href.toLowerCase())>-1){
			$("li.highlight").removeClass("highlight");
			$(this).parent().addClass("highlight")
		}})})
$(function(){
	var pull=$('#pull');
		menu=$('.main-nav ul');
		menuHeight=menu.height();
		$(pull).on('click',function(e){e.preventDefault();menu.slideToggle()});
		$(window).resize(function(){
			var w=$(window).width();
			if(w>320&&menu.is(':hidden')){menu.removeAttr('style')}
		})
});*/

function showLucky(a){a=a.feed.entry[0];for(var b=0;b<a.link.length;++b)"alternate"==a.link[b].rel&&(window.location=a.link[b].href)}function fetchLuck(a){script=document.createElement("script");script.src="/feeds/posts/summary?start-index="+a+"&max-results=1&alt=json-in-script&callback=showLucky";script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script)}
function readLucky(a){a=parseInt(a.feed.openSearch$totalResults.$t,10);a=Math.floor(Math.random()*a);a++;fetchLuck(a)}function feelingLucky(){var a=document.createElement("script");a.type="text/javascript";a.src="/feeds/posts/summary?max-results=0&alt=json-in-script&callback=readLucky";document.getElementsByTagName("head")[0].appendChild(a)};

$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('#BounceToTop').fadeIn(); 
		} else {
			$('#BounceToTop').fadeOut(); 
		} 
	});
	$('#BounceToTop').click(function() {
		$('body, html').animate({scrollTop:0},600).animate({scrollTop:25},200).animate({scrollTop:0},150).animate({scrollTop:0},50); 
	});
	
	var isOpen = false;
	/*$('#show-hide-shoutbox').click(function() {
		if (isOpen) {
			$(this).parent().stop(true, true).animate({left: '-250'}, 'fast');			
		} else {
			$(this).parent().stop(true, true).animate({left: '0'}, 'fast');			
		}
		isOpen = !isOpen;
	});*/
	
	$('#bt-show-hide-shoutbox').click(function() {
		if (isOpen) {		
			$("#panel-shoutbox-bottom").stop(true, true).animate({bottom: '-530px'}, 'fast');
		} else {			
			$("#panel-shoutbox-bottom").stop(true, true).animate({bottom: '0'}, 'fast');
		}
		isOpen = !isOpen;
	});
	if(!isOpen){
		$('#close-shoutbox').click(function() {
			$("#panel-shoutbox-bottom").stop(true, true).animate({bottom: '-530px'}, 'fast');
		});
	}
});