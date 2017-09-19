/*jQuery Shorten plugin 1.0.0*/
(function($) {
$.fn.shorten = function (settings) {
	var config = {
		showChars: 100,
		ellipsesText: "...",
		moreText: "more",
		lessText: "less"
	};

	if (settings) {
		$.extend(config, settings);
	}
	
	$(document).off("click", '.morelink');
	
	$(document).on({click: function () {
			var $this = $(this);
			if ($this.hasClass('less')) {
				$this.removeClass('less');
				$this.html(config.moreText);
			} else {
				$this.addClass('less');
				$this.html(config.lessText);
			}
			$this.parent().prev().toggle();
			$this.prev().slideToggle();
			return false;
		}
	}, '.morelink');

	return this.each(function () {
		var $this = $(this);
		if($this.hasClass("shortened")) return;
		
		$this.addClass("shortened");
		var content = $this.html();
		if (content.length > config.showChars) {
			var c = content.substr(0, config.showChars);
			var h = content.substr(config.showChars, content.length - config.showChars);
			var html = c + '<span class="moreellipses"> </span><span class="morecontent"><span>' + h + '</span> <a href="#" class="morelink">' + config.ellipsesText + '' + config.moreText + '</a></span>';
			$this.html(html);
			$(".morecontent span").hide();
		}
	});
};
})(jQuery);

$(document).ready(function(){
var mainData = $(".book-post-content").html(),
	auth = sgmTags("author", mainData),
	transtor = sgmTags("trans", mainData),
	des = sgmTags("des", mainData),
	numchap = sgmTags('numchap', mainData);
	chap = sgmTags("chap", mainData);

$(".book-author .value").text(auth);
$(".book-translator .value").text(transtor);
$(".book-des .book-sum").html(des);
$(".book-num-chap .value").text(numchap);

$(".book-sum").shorten({
	"showChars" : 200,
	"moreText"  : "Xem thêm",
	"lessText"  : "Rút gọn"
});

function getChapter(url){
	let options = {
			"url":url,
			"dataSend":{				
				"max-results": 100,
				"orderby": "published"
			},
			"beforeHandle": function(){
				$(".book-chap-list").html("Data is Loading...");
			}
		};
	
	getAjax(options, function(data){
		if(data == "effFeed"){
			$('.book-chap-list').html('<strong>Error Load Feed!!!</strong>');
		}else{
			var htmlChap = '', nextUrl = '',
				entry = data.feed.entry,
				links = data.feed.link;
				
			for(var i=0; i< links.length; i++){
				if(links[i].rel == "next") nextUrl = links[i].href.split("?")[1];
			}
			
			if(entry !== undefined){
				var idChap = '', titleChap = '';
				for(var i = 0, len = entry.length; i < len; i++){
					titleChap = entry[i].title.$t;
					idChap = entry[i].id.$t.split('post-')[1];
					
					if(i == len - 1) $('.info-footer a.start').attr('href', '/p/book-reader.html?idb='+idMain + '&idc=' + idChap + '&sv=' + url.split('//')[1].split('.')[0]);
					
					htmlChap += '<div class="row"><span><i class="fa fa-leaf" aria-hidden="true"></i><a href="'+ url_blog + 'p/book-reader.html?idb='+idMain + '&idc=' + idChap + '&sv=' + url.split('://')[1].split('.')[0] +'" target="_blank" title="'+ titleChap +'">'+ titleChap +'</a></span></div>';
				}
				
				if(nextUrl != ''){
					var next = url.split("?")[0] + "?" + nextUrl;
					getChapter(next);
				}
			}else{
				htmlChap = "Đang cập nhật";
			}
			if($(".book-chap-list row").length > 0)
				$(".book-chap-list").append(htmlChap);
			else
				$(".book-chap-list").html(htmlChap);
		}
	});
}

if(chap != ''){
	var urlData = "//" + chap.split(";")[0] + ".blogspot.com",
		nameComic = chap.split(";")[1];
	var urlSv = urlData + "/feeds/posts/default/-/" + nameComic;
	getChapter(urlSv);
}
});