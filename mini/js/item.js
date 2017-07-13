(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,false);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

(function(b){var f=[];b.fn.floatingFixed=function(g){g=b.extend({},b.floatingFixed.defaults,g);var e=b(this).each(function(){var a=b(this),c=a.position();c.position=a.css("position");a.data("floatingFixedOrig",c);a.data("floatingFixedOptions",g);f.push(a)});h();return e};b.floatingFixed=b.fn.floatingFixed;b.floatingFixed.defaults={padding:0};var k=b(window),h=function(){if(0!==f.length)for(var b=k.scrollTop(),e=0;e<f.length;e++){var a=f[e],c=a.data("floatingFixedOptions");if(!a.data("isFloating")){var d=
a.offset();a.data("floatingFixedTop",d.top);a.data("floatingFixedLeft",d.left)}d=d=a.data("floatingFixedTop");d<b+c.padding&&!a.data("isFloating")?a.css({position:"fixed",top:c.padding,left:a.data("floatingFixedLeft"),width:a.width()}).data("isFloating",!0):d>=b+c.padding&&a.data("isFloating")&&(c=a.data("floatingFixedOrig"),a.css(c).data("isFloating",!1))}};k.scroll(h).resize(h)})(jQuery);

function getPostByAlbum(label, wrap) {
	$.ajax({
		url: url_blog + "/feeds/posts/summary/-/ssAlbum/PartOne/" + label + "?alt=json-in-script&max-results=8",
		type: "GET",
		dataType: "jsonp",
		success: function(data){
			var titlePost = '', thumbPost = '', urlPost='', albumInsert='';
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
					
					if(titlePost.indexOf('- P1') != -1) titlePost = titlePost.substring(0, titlePost.indexOf('- P1')).trim();
					
					if("media$thumbnail" in entry[i]){
						thumbPost = entry[i].media$thumbnail.url;
						thumbPost = thumbPost.replace(/\/s[0-9]+(.*)\/?/g, "/s180-c/")
					}else{
						thumbPost = "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF"
					}
					
					albumInsert += '<li><a href="' + urlPost + '" title="' + titlePost + '"><img src="' + thumbPost + '" alt="' + titlePost + '"><span>' + (titlePost.length > 20 ? (titlePost.substring(0, 20) + '...') : titlePost) + '</span></a></li>';
				}
			}else{
				albumInsert = "<span>No Result!</span>"
			}
			
			$(wrap).html('<h5><a href="/search/label/Photo%2B'+ label +'?max-results=9">Cùng Album ' + label.split("-")[1] + '</a></h5><div class="box"><ul>' + albumInsert + '</ul></div>');
		},
		error: function(){
			$(wrap).html('<strong>Error Loading Feed!</strong>');
		}
	});
}

function getRecentPost(label){
	$.ajax({
		url: url_blog + "/feeds/posts/summary/-/" + label,
		type: "GET",
		data: {
			alt: "json-in-script",
			"max-results" : 8
		},
		dataType: "jsonp",
		success: function(data){
			var titlePost = '', thumbPost = '', urlPost='', newestInsert='';
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
						thumbPost = entry[i].media$thumbnail.url.replace(/\/s[0-9]+(\-c)?/g, "/s180-c");
					}else{
						thumbPost = "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF"
					}
					
					newestInsert += '<li><a href="' + urlPost + '" title="' + titlePost + '"><img src="' + thumbPost + '" alt="' + titlePost + '"><span>' + (titlePost.length > 20 ? (titlePost.substring(0, 20) + '...') : titlePost) + '</span>'+ (label == "Video" ? '<div class="play-icon fa fa-play fa-5"></div>' : '') +'</a></li>';
				}
			}else{
				newestInsert = "<span>No Result!</span>"
			}
			
			$("#box-content ul").html(newestInsert);
		},
		error: function(){
			getRecentPost(label);
		}
	});
}

$(document).ready(function(){
	$('.adsrightx600').floatingFixed();
	
	$('#newest-post-select option').filter(function() { 
		return ($(this).text().toLowerCase() == postType);
	}).prop('selected', true);
	
	var defaulLabel = $("#newest-post-select").val();
	getRecentPost(defaulLabel);
	
	$('#newest-post-select').on('change', function() {
		getRecentPost($(this).val());
	});
	
	if(ssgirl == true){
		if(postType == 'photo'){
			$('.sgm-post-footer').before('<div id="ssgirl-post-related">Related Loading...</div>');
		}else{
			$('.post-body.entry-content').prepend('<div id="ssgirl-post-related">Related Loading...</div>');
		}		
				
		function getPostByText(textsearch, maxpost, idtag){
			$.ajax({
				url: url_blog + "/feeds/posts/summary?alt=json-in-script&q="+ textsearch +"&orderby=published&max-results=" + maxpost,
				type: "GET",
				dataType: "jsonp",
				success: function(data){
					var titlePost = '', urlPost = '', thumbPost = '', htmlEmbed = '',
					entry = data.feed.entry;
					if(entry !== undefined){
						for(var i = 0; i < entry.length; i++){
							for(var j = 0; j < entry[i].link.length; j++){
								if(entry[i].link[j].rel == "alternate"){
									urlPost = entry[i].link[j].href;
								}
							}
							titlePost = entry[i].title.$t;
							if("media$thumbnail" in entry[i]){
								thumbPost = entry[i].media$thumbnail.url.replace('/s72-c/', '/s172-c/');
							}else{
								thumbPost = 'http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s172-c/grey.GIF';
							}
							
							htmlEmbed += '<div class="ssgirl-post-item"><a title="'+titlePost+'" href="'+ urlPost +'"><img alt="'+titlePost+'" title="'+ titlePost +'" class="ssgirl-post-item-thumb" src="'+ thumbPost +'"/><span class="ssgirl-post-item-title">'+ titlePost +'</span></a></div>';
						}
						
						$(idtag).html(htmlEmbed+'<div class="clear"/>');
					}else{
						$(idtag).html("NO RESULT!!!");
					}					
				},
				error: function(){
					$(idtag).html('Error load feed.');
				}
			});
		}
		
		function getVote(id, wrap){	
			$.ajax({
				type: "POST",
				url: "http://ddrosa.pe.hu/vote/getvoting.php",
				data: 'id='+id,
				dataType: "json",
				cache: false,
				success: function(data){
					var like = data.up;
					var dislike = data.down;
					
					var voteresult = '50%';
					like = parseInt(like, 10);
					dislike = parseInt(dislike, 10)
					if(like == dislike){
						voteresult = "50%";
					}else if(like == 0){
						voteresult = "0%";
					}else if(dislike == 0){
						voteresult = "100%";
					}else{				
						/*if(like < dislike)
							var percent = parseInt(like/dislike * 100, 10);
						else
							var percent = 100 - parseInt(dislike/like * 100, 10);
						
						voteresult = percent+"%";*/
						
						voteresult = parseInt(like/(like+dislike) * 100) + "%";
					}
					
					var htmlEmbed = '<div class="up"><span id="girl-'+ id +'" class="vote" name="up"><i class="fa fa-heart"></i>'+ like +'</span></div><div id="votebar"><div class="voteTotal"><span class="voteTotalValue">'+ (like + dislike) +'</span> lượt bình chọn</div><div class="votebar-border"><div class="votebarresult" style="width:'+ voteresult +'">'+ voteresult +'</div></div></div><div class="down"><span id="girl-'+ id +'" class="vote" name="down"><i class="fa fa-heart-o"></i>'+ dislike +'</span></div><div class="voteNotice"></div>';
					
					$(wrap).html(htmlEmbed);
				},
				error: function(){
					$(wrap).html('Opps!!!');
				}
			});
		}
		

		var idInput = $('#search-markup').data('ssgirl');
		var profileurl = "http://ssgirl-profile.blogspot.com/feeds/posts/default/"+ idInput +"?alt=json-in-script&orderby=published&max-results=200";
		$.ajax({
			url: profileurl,
			type: "GET",
			dataType: "jsonp",
			success: function(data){
				var htmlEmbed = '', 
					title='', 
					entry = data.entry, 
					girlId = '', 
					avtEmbed = infoEmbed = '';
				if(entry !== undefined){
					title = entry.title.$t;					
					var info = "content" in entry ? entry.content.$t : '';
					
					girlId = sgmTags('id', info).split('-')[1];
					
					var girlImg = sgmTags('avatar', info);
					var girlInfo = sgmTags('info', info);
					var infoList = girlInfo.split("|");
					
					avtEmbed = '<div class="ssgirl-avt"><img src="'+ girlImg +'" /></div>';
					
					for(var j = 0; j < infoList.length; j++){
						var ssgclass = infoList[j].substring(infoList[j].indexOf("[")+1, infoList[j].indexOf("]"));
						var infoItem = infoList[j].substr(infoList[j].indexOf("]")+1).split(":");
												
						infoEmbed += '<div class="'+ ssgclass +'" ><strong class="title">'+ infoItem[0] +'</strong><span class="cont">'+ infoItem[1] +'</span></div>';
					}

					
				
					htmlEmbed = '<div id="voteInfo">Vote is loading...</div><div class="ssgirlInfo"><div class="titleInfo"> Profile of '+ title +'</div>'+ avtEmbed + '<div class="infoContent">' + infoEmbed +'</div><div class="clear"/></div>';
					
				}else{
					htmlEmbed = '<div id="voteInfo">Vote is loading...</div><div class="ssgirlInfo"><div class="titleInfo"> Profile of '+ title +'</div><div class="infoContent">Đang cập nhật...</div></div>';
				}
				
				if(postType == 'photo')
					$('.sgm-post-footer').before(htmlEmbed);
				else
					$('.post-body.entry-content').before(htmlEmbed);
			
				if(girlId !== ''){
					getVote(girlId, "#voteInfo");
				}
				
				getPostByText(idInput, 4, '#ssgirl-post-related');
			},
			error: function(e){
				console.log(e);
			}
		});	
	}
	
	if(inAlbum == true){
		if(albumLabel != ''){
			$(window).scroll(function() {
				if($(".in-one-album").hasClass("inalbum-loaded") == false){
					if ($(this).scrollTop() > ($('#Blog1').offset().top) ) {
						$(".in-one-album").addClass("inalbum-loaded");
						getPostByAlbum(albumLabel, ".in-one-album");
					}
				}
			});
		}
	}

if(sgmgirl == true){
	$('.blog-posts').append('<div class="girl--info">Girl</div>');
	$(window).scroll(function() {
		if ($(this).scrollTop() > ($('#Blog1').offset().top) ) {
			if(!$(".girl--info").hasClass("girl--info-fixed"))
				$(".girl--info").addClass("girl--info-fixed");
		}else{
			if($(".girl--info").hasClass("girl--info-fixed"))
				$(".girl--info").removeClass("girl--info-fixed");
		}
	});
	
	var girlId = $('#search-markup').data('idgirl');
	(function girlInfo(url){
		$.ajax({
			url: url,
			type: "GET",
			data: {alt: 'json-in-script'},
			dataType: "jsonp",
			success: function(data){
				var entry = data.entry;
			
				var nameG = entry.title.$t;
				var idG = entry.id.$t.split('post-')[1];
				var content = "content" in entry ? entry.content.$t : "";	
				var sAvt = sgmTags("s-avt", content),				
					realName = sgmTags("name", content),
					birthday = sgmTags("birthday", content),					
					zodiac = sgmTags("zodiac", content),
					height = sgmTags("height", content),
					weight = sgmTags("weight", content),
					bsize = sgmTags("bodysize", content);
						
				if(sAvt == '' || sAvt == null) sAvt = 'http://placehold.it/100x100?text=No+Image';
				
				//'<a href="p/girl.html?idg='+ girlId +'" title="'+ nameG +'">'+nameG+'</a>'
				
				$('.girl--info').html('<span class="sgmtooltip tooltip-effect-1"><span class="tooltip-item">'+ nameG +'</span><span class="tooltip-content clearfix"><img src="'+ sAvt +'"><span class="tooltip-text"><strong>'+ nameG +'</strong><ul><li>'+ realName +'</li><li>'+ birthday +'</li><li>'+ height +'</li><li>'+ bsize +'</li></ul> <a href="/p/girl.html?idg='+ girlId +'">Xem thêm</a></span></span></span>').css({'background-image' : 'url(' + sAvt + ')'});
				
				$('.post-info .sgmlabel').append('<a href="/search?q=@'+ girlId +'" rel="tag nofollow">'+ nameG +'</a>');
			},
			error: function(e){
				girlInfo(url);
			}
		});
	})('http://sgmgirldata.blogspot.com/feeds/posts/default/'+ girlId);
}	
	
if(Cookies.get('confirmage')==null){
	if($('.main-post-content .adult-content').length > 0){
		$('.main-post-content .adult-content').each(function(){
			var oimg = $(this).attr('href');
			//var odisplayimg = $(this).children().attr('src');
			var odisplayimg = $(this).children().attr('data-adult-original');
			
			$(this).attr('data-ohref', oimg);
			$(this).children().attr('data-osrc', odisplayimg);
			
			var hideimg = 'https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg';
			
			$(this).attr('href', hideimg);
			$(this).children().attr('src', hideimg);
			
			$(this).after('<div class="turnon-adult-content"><i class="fa fa-toggle-off"></i><span class="btn-display-adult turn-on">Click here to view Adult Content</span></div>');
		});
		
		$('body').on('click', '.btn-display-adult', function(){
			if($(this).hasClass('turn-on')){
				$('.main-post-content .adult-content').each(function(){
					$(this).attr('href', $(this).data('ohref'));				
					$(this).children().attr('src', $(this).children().data('osrc')).attr('data-original', $(this).children().data('adult-original'));					
					
					var hideimg = 'https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg';
					
					$(this).attr('data-ohref', hideimg);
					$(this).children().attr('data-osrc', hideimg);					
					
					var imgZ = $(this).children();
					imgZ.elevateZoom({
						scrollZoom : true, 
						borderColour: "rgba(255, 255, 255, 0.5)",
						cursor: "pointer"
					});
				});
				
				$('.btn-display-adult').removeClass('turn-on').addClass('turn-off').text('Hide Adult Content');
				$('.turnon-adult-content .fa').removeClass('fa-toggle-off').addClass('fa-toggle-on');
			}else{
				$('.main-post-content .adult-content').each(function(){
					var oimg = $(this).attr('href');
					var odisplayimg = $(this).children().attr('src');
					
					var hideimg = 'https://lh6.googleusercontent.com/-4mAGa3KKq9I/VaPq_MaXMaI/AAAAAAAACIA/V9utNz5pmwE/s430-no/replaceadult.jpg';
					
					$(this).attr('data-ohref', oimg);
					$(this).children().attr('data-osrc', odisplayimg).attr('data-original', hideimg);
					
					$(this).attr('href', hideimg);
					$(this).children().attr('src', hideimg);
					
					var imgZ = $(this).children();					
					imgZ.removeData('elevateZoom');
					imgZ.removeData('zoomImage');
					$('.zoomContainer').each(function(){
						if($(this).children('.zoomWindowContainer').children().attr('style').indexOf(oimg) != -1)
							$(this).remove();
					});	
					
				});
				$('.btn-display-adult').removeClass('turn-off').addClass('turn-on').text('Show Adult Content');
				$('.turnon-adult-content .fa').removeClass('fa-toggle-on').addClass('fa-toggle-off');
			}
		});
	}
}	
});

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			user.getToken(false).then(function(idToken) {
				//console.log(idToken);
			}).catch(function(error) {
				
			});
		} else {
			// User is signed out.
			loginFireBase()
		}
	});

	Date.prototype.getWeek = function() {
	  var date = new Date(this.getTime());
	  date.setHours(0, 0, 0, 0);
	  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	  
	  var week1 = new Date(date.getFullYear(), 0, 4);
	  
	  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}
	
	Date.prototype.getWeekYear = function() {
	  var date = new Date(this.getTime());
	  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	  return date.getFullYear();
	}	

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
      initViewCount();
    }else{
		loginFireBase();
	}
});	

function initViewCount(){
	var timeRef = database.ref('times');
	var newWeek = false,
		newMonth = false;
	timeRef.once('value', function(snapshot){
		if(!snapshot.exists()) {
			var data = {
				'current': firebase.database.ServerValue.TIMESTAMP,
				'thisWeek' : 0,
				'thisMonth' : 0
			};
			timeRef.set(data);
			
		}else{
			timeRef.child('current').set(firebase.database.ServerValue.TIMESTAMP);
			
			var data = snapshot.val();			
			var mydate = new Date(data.current),
				curWeek = mydate.getWeek(),
				curMonth = mydate.getMonth(),
				dataWeek = data.thisWeek,
				dataMonth = data.thisMonth;
			
			if(curWeek != dataWeek){
				timeRef.child('thisWeek').set(curWeek);
				newWeek = true;
			}
			if(curMonth != dataMonth){
				timeRef.child('thisMonth').set(curMonth);
				newMonth = true;
			}

		}
	});
	
	var idGirl = $('.model-name').attr('data-idgirl');
	if(postType == 'video')
		var elem = $('.post-view-count');
	else
		var elem = $('.view-count');
	
	var idPost = elem.attr('name');
	if(postType != ''){
		var postRef = database.ref('posts/'+ postType +'s/' + idPost);
	}else{
		var postRef = database.ref('posts/other/' + idPost);
	}
	
	var ranNum = Math.floor(Math.random()*(10000 - 100 +1) + 100);
	
	postRef.once('value', function(snapshot) {
		var data = snapshot.val();
		var isnew = false; 
		if(!snapshot.exists()) {
			data = {};
			data.id = idPost;
			data.title = titleP;
			data.viewCount = ranNum;
			data.viewCountW = ranNum;
			data.viewCountM = ranNum;
			data.url = location.protocol + '//' + location.host + location.pathname;
			if(postType != '')
				data.type = postType;			
			else
				data.type = 'other';
			if(postType == 'video')
				data.dislike = 0;
			
			data.like = 0;
			
			data.album = 'NaN';
			if(postType == 'photo' || postType == 'video' || postType == 'wallpaper')
			if(idGirl != '' && idGirl != null){
				data.girl = idGirl;		
			}else
				data.girl = 'NaN';
				
			data.thumb = thumbUrl;
			data.lastUpdate	= firebase.database.ServerValue.TIMESTAMP;
			
			isnew = true;
		}
		elem.children('span').text(data.viewCount);
		if(snapshot.hasChild('like')){
			if(postType == 'video')
				$('.like .icobutton__text').text(data.like)
			else	
				$('.like__post .icobutton__text').text(data.like);
		}
		if(snapshot.hasChild('dislike')){
			$('.dislike .icobutton__text').text(data.dislike)
		}
		
		data.viewCount++;
		if(newWeek == true){
			data.viewCount = 0;
		}else{
			data.viewCountW++;
		}
		
		if(newMonth == true){
			data.viewCountM = 0
		}else{
			data.viewCountM++;
		}
		
		if(isnew) 
			postRef.set(data);
		else {
			postRef.child('viewCount').set(data.viewCount);
			postRef.child('viewCountW').set(data.viewCountW);
			postRef.child('viewCountM').set(data.viewCountM);
			postRef.child('lastUpdate').set(firebase.database.ServerValue.TIMESTAMP);
			
			if(idGirl != '' && idGirl != null)
			if(snapshot.hasChild('girl')){
				if(data.girl == "NaN" && idGirl != '' && idGirl != null){
					postRef.child('girl').set(idGirl)
				}
			}else{
				postRef.update({"girl": idGirl});
			}
			
			if(!snapshot.hasChild('like')){
				postRef.update({"like": 0});
			}
			
			if(postType == "video" && !snapshot.hasChild('dislike')){
				postRef.update({"dislike": 0});
			}
			
			if(data.thumb != thumbUrl)
				postRef.child('thumb').set(thumbUrl);
		}
		
		if(idGirl != '' && idGirl != null){
			var girlRef = database.ref('girls/' + idGirl);
			girlRef.once('value', function(snap){
				var girlData = snap.val();
				
				var isnewg = false; 
				if(!snap.exists()) {
					girlData = {};
					girlData.id = idGirl;
					girlData.viewCount = 0;
					girlData.lastUpdate	= firebase.database.ServerValue.TIMESTAMP;
					
					isnewg = true;
				}
				
				girlData.viewCount++;
				
				if(isnewg)
					girlRef.set(girlData);
				else {
					girlRef.child('viewCount').set(girlData.viewCount);					
					girlRef.child('lastUpdate').set(firebase.database.ServerValue.TIMESTAMP);
				}
			});			
		}
	});
}

(function($){	
	var newerLink = $('a.blog-pager-newer-link');
	var olderLink = $('a.blog-pager-older-link');
	
	function getNextPrev(link, labelText){
		var path = link.attr('href').split('.com')[1];
		var url = 'https://www.googleapis.com/blogger/v3/blogs/9217536117332083683/posts/bypath?path='+path+'&key=AIzaSyAgi7eyJY7T5TZY7iNp0KNQAa6NG67CbYo&fields=title,content';
		$.ajax({
			url: url,
			type: "GET",
			dataType: "jsonp",
			success: function(data){
				var thumbnail = '';
				var title = data.title;
				var content = $(data.content).find('img');

				if(content.length > 1){
					thumbnail = content[1].src;
				}else if(content.length == 1){
					thumbnail = content[0].src;
				}else{
					thumbnail = "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF";
				}
				
				link.html('<span class="icon-wrap"><svg class="icon" width="24" height="24" viewBox="0 0 64 64"><use xlink:href="#arrow-left-2"></svg></span><div><span>'+ labelText +' Gallery</span><h3>'+title+'</h3><p>by SSGirl</p><img src="'+ thumbnail.replace(/\/s[0-9]+(\-no)?/g, '/s104-c') +'" alt="'+ labelText +' thumb" /></div>');
			},
			error: function(e){
				console.log(e);
			}
		});
	}
	
	if(newerLink.length)
		getNextPrev(newerLink, 'Next');
	if(olderLink.length)	
		getNextPrev(olderLink, 'Previous');
})(jQuery);