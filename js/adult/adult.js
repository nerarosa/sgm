function isInteger(n) {
	return Math.floor(n) == n && $.isNumeric(n);
}

function isEmpty(str){
	if(!str || str.length === 0)
		return true;

	return !str.trim();
}

var page = $.url('?page'),
	cat = $.url('?cat');

var urlData = 'https://sgmadultdata.blogspot.com',
	postInPage = 150,
	startIndex = 1;

if(isInteger(page) == true && page > 1)
	startIndex = postInPage * (page - 1) + 1;
else
	page = 1;

function findImg(str){
    let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
    
    let result = rex.exec(str)[1];
    
    if(!isEmpty(result)){
        return result;  
    }else{
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
    }
}

function getAds() {
	let ran = Math.floor(Math.random() * 100) + 1;
	
	$.ajax({
		url: '/feeds/posts/default/-/Photo',
		type: 'get',
		data: {
			alt: "json-in-script",
			"max-results": 1,
			"start-index": ran
		},
		dataType: "jsonp",
		success: function(data){
			let entry = data.feed.entry[0],
				htmlEmbed = '',
				thumbnail = '';
			
			let content = "content" in entry ? entry.content.$t : '';
			
			if("media$thumbnail" in entry){
				thumbnail = resizeImg(entry.media$thumbnail.url, {'s':'200', 'crop':'c'});				
			}else{
				if(content.indexOf('<img') != -1){
					thumbnail = resizeImg(findImg(content), {'s':'200', 'crop':'c'});					
				}else{
					thumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
				}
			}
			
			let urlPost = '';
			for(let j in entry.link){
                if(entry.link[j].rel == "alternate"){
                    urlPost = entry.link[j].href;
                }
            }
			
			let titlePost = entry.title.$t;
			
			htmlEmbed = `<a href="${urlPost}" title="${titlePost}"><img src="${thumbnail}" alt="${titlePost}" /></a>`;
			
			$('.sgm-feature.no-content').html(htmlEmbed).removeClass('no-content');;
		}
	});
}

function getRecomend(){
	$.ajax({
		url: urlData + '/feeds/posts/default/-/Main',
		type: 'get',
		data: {
			"alt": "json-in-script",
			"max-results": 5
		},
		dataType: 'jsonp',
		success: function(data){
			var entry = data.feed.entry,
				htmlEmbed = '';
			
			if(entry !== undefined){
				
			}
		}
	})
}

function getPevPost(curId, time){
	$.ajax({
		url: 'https://www.googleapis.com/blogger/v3/blogs/8312197006443011958/posts',
		type: "get",
		data: {
			"key": "AIzaSyAgi7eyJY7T5TZY7iNp0KNQAa6NG67CbYo",
            "maxResults" : 1,            
            "endDate" : time,            
            "labels" : "Main",
            "fields" : 'items(id)'
		},
		dataType: "jsonp",		
		success: function(data){
			if("items" in data){
				if(data.items[0].id != curId){
					$('.article-nav .prev-post a').attr('href', '/p/adult.html?id=' + data.items[0].id);
				}
			}
		}
	});
}

function getNextPost(curId, time){
	$.ajax({
		url: 'https://www.googleapis.com/blogger/v3/blogs/8312197006443011958/posts',
		type: "get",
		data: {
			key: "AIzaSyAgi7eyJY7T5TZY7iNp0KNQAa6NG67CbYo",
            maxResults : 1,            
            startDate : time,
            labels : "Main",
            fields : 'items(id)'
		},
		dataType: "jsonp",		
		success: function(data){
			if("items" in data){
				if(data.items[0].id != curId){
					$('.article-nav .next-post a').attr('href', '/p/adult.html?id=' + data.items[0].id);
				}
			}
		}
	});
}

function getPostContent(id, el){
	var url = urlData + '/feeds/posts/default/'+ id +'?alt=json-in-script';
	
	$.ajax({
		type: 'get',
		url: url,
		dataType: 'jsonp',
		success: function(data){
			let entry = data.entry,
				htmlEmbed = '';
			
			var titlePost = entry.title.$t;			
			var contentFull = "content" in entry ? entry.content.$t : "";
			var content = sgmTags("con", contentFull);
			
			var cats = [];
			for(let j = 0; j < entry.category.length; j++){						
				if(entry.category[j].term != "Main"){
					cats.push(entry.category[j].term);
				}
			}
			
			let part = sgmTags("part", contentFull);
			let page = sgmTags("page", contentFull);
			
			let thumbPost = "media$thumbnail" in entry ? entry.media$thumbnail.url : 'http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s72-c/grey.GIF';
					
			htmlEmbed = `<span class="category category--full">${cats.join(', ')}</span>
				<h2 class="title title--full">${titlePost}</h2>
				<div class="meta meta--full">
					<img class="meta__avatar" src="${thumbPost}" alt="${titlePost}" />
					<span class="meta__author">SGMedia</span>
					<span class="meta__date"><i class="fa fa-calendar-o"></i> 6 Apr</span>
					<span class="meta__reading-time"><i class="fa fa-clock-o"></i> 2 min read</span>
					<span class="meta__misc meta__misc--seperator"><i class="fa fa-comments-o"></i> 7 comments</span>
					<span class="meta__misc"><i class="fa fa-heart"></i> 12 favorites</span>
					<nav class="article-nav">
						<button class="prev-post"><a href="javascript:;"><i class="fa fa-angle-left"></i> <span>Previous</span></a></button>
						<button class="next-post"><a href="javascript:;"><span>Next</span> <i class="fa fa-angle-right"></i></a></button>
					</nav>
				</div>
				<div class="content-detail">
					<div id="${id}">
						<div class="page-head">Trang 1</div>${content}
					</div>
				</div>`;
			
			if(!isEmpty(part))
				htmlEmbed += '<div class="pagination" data-id="' + part + '">Tải trang sau</div>';
			
			if(!isEmpty(page)) {
				let listPage = page.split(',');
				let itemPage = '';

				for(let i = 0, len = listPage.length; i < len; i++){
					if('' !== listPage[i])
						itemPage += `<a class="${i == 0 ? 'current loaded' : ''}" href="javascript:;" data-id="${listPage[i]}">${i+1}</a>`;
					
				}
				
				if($('.pager').length){					
					$('.pager').html(`<span class="btn-show-hide">Đóng list trang <i class="fa fa-angle-double-down" aria-hidden="true"></i></span>${itemPage}`);
					
					if($('.pager').hasClass('hiding'))
						$('.pager').removeClass('hiding').addClass('showing').css('bottom', 0);
				}else{
					$('.scroll-wrap').after(`<div class="pager showing"><span class="btn-show-hide">Đóng list trang <i class="fa fa-angle-double-down" aria-hidden="true"></i></span>${itemPage}</div>`);
				}				
				
				setTimeout(function(){
					if($('.pager').hasClass('showing')){
						let pagerHeight = $('.pager').height();
						
						$('.pager').removeClass('showing').addClass('hiding').css({
							"bottom" : -pagerHeight + "px"
						});
						
						$('.pager .btn-show-hide').html('Hiện list trang <i class="fa fa-angle-double-up" aria-hidden="true"></i>');
					}
				}, 4000);
			}else{
				if($(".pager").length)
					$(".pager").remove();
			}
			
			el.html(htmlEmbed);
			
			let first_line = $('.content-detail > div').contents().filter(function() { 
                           return !!$.trim( this.innerHTML || this.data ); 
                       });
					   
			$(first_line[2]).after('<div class="sgm-feature no-content"></div>');
			
			getAds();
			
			if(!isEmpty(page)) {
				let listPage = page.split(',');
				
				$('.scroll-wrap').scroll(function(){
					let wrapHeight = $('.scroll-wrap').height();
					let wrapPos = $('.scroll-wrap').scrollTop();
					let docHeight = $('.content-detail').height();
					
					for (let i = 0; i < listPage.length; i++) {
						
						let theID = listPage[i];
						if($("#" + theID).length){
							let divPos = $("#" + theID).offset().top;
							let divHeight = $("#" + theID).height();
							if (wrapPos >= (divPos - $('.scroll-wrap').offset().top + $('.scroll-wrap').scrollTop() - wrapHeight/2) && wrapPos < (divPos - $('.scroll-wrap').offset().top + $('.scroll-wrap').scrollTop() + divHeight)) {
								$(".pager a[data-id='" + theID + "']").addClass("current");							
							} else {
								$(".pager a[data-id='" + theID + "']").removeClass("current");
							}
						}						
					}

					if(wrapPos + wrapHeight == docHeight) {
						if (!$(".pager a.loaded:last-child").hasClass("current")) {
							var navActiveCurrent = $(".current").attr("href");
							$(".pager a").removeClass("current");
							$(".pager a.loaded:last-child").addClass("current");
						}
					}
				});
			}
			
			let publishedDate = entry.published.$t;
			
			setTimeout(function(){
				getPevPost(id, publishedDate);
				getNextPost(id, publishedDate);
			}, 3000);
		},
		error: function(){
			setTimeout(function(){
				getPostContent(id, el);
			},2000);
		}
	});
}

function getNextContent(id){	
	$.ajax({
		type: 'get',
		url: urlData + '/feeds/posts/default/'+ id +'?alt=json-in-script',
		dataType: 'jsonp',
		success: function(data){
			var entry = data.entry,
				htmlEmbed = '';
						
			var contentFull = "content" in entry ? entry.content.$t : "";
			var content = sgmTags("con", contentFull);
			
			var part = sgmTags("part", contentFull);
			
			//let nextPage = $('.pager a[data-id=' + id + ']').next();
			let nextPage = $('.pager a[data-id=' + id + ']').nextAll('a.loaded')[0];			
			
			htmlEmbed += '<div id="'+ id +'"><div class="page-head">Trang ' + $('.pager a[data-id=' + id + ']').text() + '</div><div class="sgm-feature no-content"></div>' + content + '</div>';
			
			if(!isEmpty(part)){
				if($('.pagination').length){
					$('.pagination').data('id', part);
				}else{
					htmlEmbed += '<div class="pagination" data-id="' + part + '">Tải trang sau</div>';
				}
			}else{
				if($('.pagination').length) 
					$('.pagination').remove();
			}
			
			if(undefined !== nextPage){
				let nextPageId = '#' + $(nextPage).data('id');
				
				$(nextPageId).before(htmlEmbed);
			}else{
				$('.content__item .content-detail').append(htmlEmbed);
			}			
			
			getAds();
			
			$('.pager a[data-id=' + id + ']').addClass('loaded');
			
			$('.scroll-wrap').animate({scrollTop: $('#' + id).offset().top - $('.scroll-wrap').offset().top + $('.scroll-wrap').scrollTop() - 100}, "slow");
			$('.pager a').removeClass('current');
			$('.pager a[data-id=' + id + ']').addClass('current');
		},
		error: function(){
			setTimeout(function(){
				//getNextContent(id);
			},2000);
			
		}
	});
}

function animatedGridLayout() {

	var bodyEl = document.body,
		docElem = window.document.documentElement,
		support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		gridEl = document.getElementById('theGrid'),
		sidebarEl = document.getElementById('theSidebar'),
		gridItemsContainer = gridEl.querySelector('section.grid'),
		contentItemsContainer = gridEl.querySelector('section.content'),
		gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
		contentItems = contentItemsContainer.querySelectorAll('.content__item'),
		closeCtrl = contentItemsContainer.querySelector('.close-button'),
		current = -1,
		lockScroll = false, xscroll, yscroll,
		isAnimating = false,
		menuCtrl = document.getElementById('menu-toggle'),
		menuCloseCtrl = sidebarEl.querySelector('.close-button');
		
		$('.close-button').off("click");

	/**
	 * gets the viewport width and height
	 * based on http://responsejs.com/labs/dimensions/
	 */
	function getViewport( axis ) {
		var client, inner;
		if( axis === 'x' ) {
			client = docElem['clientWidth'];
			inner = window['innerWidth'];
		}
		else if( axis === 'y' ) {
			client = docElem['clientHeight'];
			inner = window['innerHeight'];
		}
		
		return client < inner ? inner : client;
	}
	function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
	function scrollY() { return window.pageYOffset || docElem.scrollTop; }

	function init() {
		initEvents();		
	}

	function initEvents() {
		let idOpen = $.url('?id');	
		if(idOpen !== undefined && idOpen != null && idOpen !== ''){
			if(isAnimating || current === 0) {
				return false;
			}
			
			isAnimating = true;
			// index of current item
			/*[].slice.call(gridItems).forEach(function(item, pos) {
				if($(item).attr('name') == idOpen){
					current = pos;
				}
			});*/
			
			current = 0;
			
			//let item = $('a[name="'+ idOpen +'"]');
			let item = $('.grid__item:first-child');
			// simulate loading time..
			$(item).addClass('grid__item--loading');
			setTimeout(function() {
				$(item).addClass('grid__item--animate');
				// reveal/load content after the last element animates out (todo: wait for the last transition to finish)
				setTimeout(function() { loadContent(item); }, 500);
			}, 1000);
			
			History.pushState({state:1}, 'Truyện người lớn - SGMedia', "/p/adult.html");
			History.replaceState({state:2}, History.getState().title, "?id=" + idOpen);
		}
	
		[].slice.call(gridItems).forEach(function(item, pos) {
			// grid item click event
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				if(isAnimating || current === pos) {
					return false;
				}
				isAnimating = true;
				// index of current item
				current = pos;
				// simulate loading time..
				$(item).addClass('grid__item--loading');
				setTimeout(function() {
					$(item).addClass('grid__item--animate');
					// reveal/load content after the last element animates out (todo: wait for the last transition to finish)
					setTimeout(function() { 
						loadContent(item); 
					}, 500);
				}, 1000);

				let itemTitle = $(item).find('h2.title--preview').text(),
					itemID = $(item).attr('name');
				History.pushState({state:1}, 'Truyện người lớn - SGMedia', "/p/adult.html");
				History.pushState({state:2}, itemTitle, "?id="+itemID);
			});
		});
		
		$(closeCtrl).on('click', function() {
			// hide content
			hideContent();
			History.back();
		});

		History.Adapter.bind(window, 'statechange', function () {
			let currentUrl = History.getState().url,
				hasPostId = $.url('?id', currentUrl);

			if('' === hasPostId || null === hasPostId || undefined === hasPostId){
				hideContent();
			}
		});

		// keyboard esc - hide content
		document.addEventListener('keydown', function(ev) {
			if(!isAnimating && current !== -1) {
				var keyCode = ev.keyCode || ev.which;
				if( keyCode === 27 ) {
					ev.preventDefault();
					if ("activeElement" in document)
    					document.activeElement.blur();
					hideContent();
					History.back();
				}
			}
		} );

		// hamburger menu button (mobile) and close cross
		menuCtrl.addEventListener('click', function() {
			if( !$(sidebarEl).hasClass('sidebar--open') ) {
				$(sidebarEl).addClass('sidebar--open');
			}
		});

		$(menuCloseCtrl).on('click', function() {
			if($(sidebarEl).hasClass('sidebar--open') ) {
				$(sidebarEl).removeClass('sidebar--open');
			}
		});
	}

	function loadContent(item) {		
		// add expanding element/sgm--placeholder 
		var dummy = document.createElement('div');
		dummy.className = 'sgm--placeholder';

		// set the width/heigth and position
		dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
		dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';

		// add transition class 		
		$(dummy).addClass('sgm--placeholder--trans-in');

		// insert it after all the grid items
		gridItemsContainer.appendChild(dummy);
		
		// body overlay		
		$(bodyEl).addClass('view-single');
		var currentItem = $('article.content__item');
		
		let idOpen = $.url('?id');	
		if(idOpen !== undefined && idOpen != null && idOpen !== ''){
			var id = idOpen;	
		}else{			
			var gridItem = gridItems[current];
			var id = $(gridItem).attr('name');
		}
		
		getPostContent(id, currentItem);
		
		setTimeout(function() {
			// expands the sgm--placeholder
			dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			// disallow scroll
			window.addEventListener('scroll', noscroll);
		}, 25);

		onEndTransition(dummy, function() {
			// add transition class 
			
			$(dummy).removeClass('sgm--placeholder--trans-in').addClass('sgm--placeholder--trans-out');
			// position the content container
			contentItemsContainer.style.top = scrollY() + 'px';
			// show the main content container
			$(contentItemsContainer).addClass('content--show');
			
			// show content item:
			$( currentItem ).addClass( "content__item--show" );
			// show close control
			
			$(closeCtrl).addClass('close-button--show');
			// sets overflow hidden to the body and allows the switch to the content scroll
			
			if($('.pager').length) $('.pager').show();
			
			$(bodyEl).addClass('noscroll');

			isAnimating = false;
		});
	}

	function hideContent() {
		var gridItem = gridItems[current], contentItem = $('article.content__item');
		
		$(contentItem).removeClass('content__item--show');
		
		$(contentItemsContainer).removeClass('content--show');
		
		$(closeCtrl).removeClass('close-button--show');
		
		if($('.pager').length) $('.pager').hide();
		
		$(bodyEl).removeClass('view-single');

		setTimeout(function() {
			var dummy = gridItemsContainer.querySelector('.sgm--placeholder');

			$(bodyEl).removeClass('noscroll');
			dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';

			onEndTransition(dummy, function() {
				// reset content scroll..
				//contentItem.parentNode.scrollTop = 0;
				$('.sgm--placeholder').remove();
		
				$(gridItem).removeClass('grid__item--loading');
		
				$(gridItem).removeClass('grid__item--animate')
				lockScroll = false;
				window.removeEventListener( 'scroll', noscroll );
			});
			
			// reset current
			current = -1;
		}, 25);
		
		//History.back();
		//History.go(1);
	}

	function noscroll() {
		if(!lockScroll) {
			lockScroll = true;
			xscroll = scrollX();
			yscroll = scrollY();
		}
		window.scrollTo(xscroll, yscroll);
	}

	/*window.addEventListener('')
	hideContent();*/

	init();
};

function getPreviewPost(url){
	var tempUrl = '';

	if(url == undefined){
		tempUrl = url;

		if(!isEmpty(cat)){
			url = urlData + '/feeds/posts/default/-/Main/'+ cat;
		}else
			url = urlData + '/feeds/posts/default/-/Main';
	}
		
	return $.ajax({
		type: 'get',
		url: url,
		data: {
			alt : "json-in-script",
			"max-results" : postInPage,
			"start-index" : startIndex,
			orderby : "updated"
		},
		dataType: 'jsonp',
		beforeSend: function(){
			if(undefined !== tempUrl)
				$('.load-more').show();
		},
		success: function(data){
			let entry = data.feed.entry,
				links = data.feed.link,
				nextUrl = '',
				htmlEmbed = '';
			
			for(let i = 0, len = links.length; i < len; i++){
				if('next' == links[i].rel){
					nextUrl = links[i].href;
				}
			}
			
			if(undefined !== entry){
				let urlPost = '',
					titlePost = '',
					thumbPost = '',
					cat = '';
					
				for(let i = 0, len = entry.length; i < len; i++){
					
					for(let j = 0; j < entry[i].link.length; j++){
						if(entry[i].link[j].rel == 'alternate'){
							urlPost = entry[i].link[j].href;
						}
					}
					
					let idP = entry[i].id.$t.split('post-')[1];
					let cats = [];
					for(let j = 0; j < entry[i].category.length; j++){
						if(entry[i].category[j].term != "Main"){
							cats.push(entry[i].category[j].term);
						}

						if(cats.length == 2) break;
					}
					
					titlePost = entry[i].title.$t;
						
					if("media$thumbnail" in entry[i]){
						thumbPost = entry[i].media$thumbnail.url;
					}else{
						thumbPost = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
					}
					
					htmlEmbed += `<a name="${idP}" class="grid__item" href="#">
						<h2 class="title title--preview">${titlePost}</h2>
						<div class="loader"></div>
						<span class="category fs-12px">${cats.join(', ')}</span>
						<div class="meta meta--preview">
							<img class="meta__avatar" src="${thumbPost}" alt="author04" />
							<span class="meta__date"><i class="fa fa-calendar-o"></i> 6 Apr</span>
							<span class="meta__reading-time"><i class="fa fa-clock-o"></i> 2 min read</span>
						</div>
					</a>`;
				}
				
				if(undefined === tempUrl){
					$('header.top-bar').after(htmlEmbed);					
				}else{
					$('.load-more').before(htmlEmbed);
					$('.load-more').hide();

					var curPage = url.split('&start-index=')[1].split('&')[0];
						curPage = Math.floor(curPage / postInPage) + 1;
					History.pushState(null, 'Trang ' + curPage + ' ~ SGMedia', '?page=' + curPage);
				}	
				
				animatedGridLayout();
				
				if('' !== nextUrl){
					$('.load-more').data('next', nextUrl.split('?')[1]);
				}else{
					$('.load-more').data('next', '');
				}
			}else{
				$('header.top-bar').after('<span style="text-align:center;">No Post</span>');
			}
		},
		error: function(){
			setTimeout(function(){
				if(undefined === url)
					getPreviewPost();
				else
					getPreviewPost(url);
			},2000);
		}
	});
}

$(document).ready(function(){
	getPreviewPost();
	
	var win = $(window);
	var urlLoadMore = '';
	var loadUrl = '';
	
	win.scroll(function() {
		urlLoadMore = $('.load-more').data('next');

		if ($(document).height() - win.height() == win.scrollTop()) {
			if(!isEmpty(cat))
				loadUrl =  urlData + '/feeds/posts/default/-/' + cat + '?' + urlLoadMore;
			else
				loadUrl =  urlData + '/feeds/posts/default?' + urlLoadMore;
			
			if('' != urlLoadMore){
				getPreviewPost(loadUrl);
				loadUrl = '';
				$('.load-more').data('next', '');
			}	
		}		
	});
	
	$('body').on('click', '.pagination', function(e){
		getNextContent($(this).data('id'));
	});
	
	$(".content--show .scroll-wrap").scroll(function() {
		console.log('scroll div');
	});

	$('body').on('click', '.pager a', function(e){
		if($(this).hasClass('loaded')){
			if($(this).hasClass('current')){
				e.preventDefault();
			}else{
				$('.scroll-wrap').animate({scrollTop: $('#' + $(this).data('id')).offset().top - $('.scroll-wrap').offset().top + $('.scroll-wrap').scrollTop() - 100}, "slow");
			}
		}else{
			getNextContent($(this).data('id'));
		}
	});
	
	$('body').on('click', '.pager .btn-show-hide', function(){
		let pagerHeight = $('.pager').height();
		
		if($('.pager').hasClass('showing')){
			$('.pager').removeClass('showing').addClass('hiding').css({
				"bottom" : -pagerHeight + "px"
			});
			
			$(this).html('Hiện list trang <i class="fa fa-angle-double-up" aria-hidden="true"></i>');
		}else{
			$('.pager').removeClass('hiding').addClass('showing').css({
				"bottom" : 0
			});

			$(this).html('Đóng list trang <i class="fa fa-angle-double-down" aria-hidden="true"></i>');
		}
	});
	
	let idOpen = $.url('?id');
	
	if(!isEmpty(idOpen)){
		$(".photo-exam").on("click", function(){
			let photo_url = $(this).data("url");
			
			$(this).after(`<div class="photo-exam-content"><img src="${photo_url}" /></div>`);
		});
		
		$(".video-exam").on("click", function(){
			let video_url = $(this).data("url");
		});
	}
});