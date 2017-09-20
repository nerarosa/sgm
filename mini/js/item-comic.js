/* jQuery Shorten plugin 1.0.0 */
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
	var mainData = $(".comic-post-content").text(),
		auth = sgmTags("author", mainData),
		transtor = sgmTags("trans", mainData),
		des = sgmTags("des", mainData),
		chap = sgmTags("chap", mainData);
	
	$(".comic-author .value").text(auth);
	$(".comic-translator .value").text(transtor);
	$(".comic-des .comic-sum").text(des);
	
	$(".comic-sum").shorten({
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
				$(".comic-chap-list").html("Data is Loading...");
			}
		};
		
		getAjax(options, function(data){
			if(data == "effFeed"){
				$('.comic-chap-list').html('<strong>Error Load Feed!!!</strong>');
			}else{
				var htmlChap = '', nextUrl = '',
					entry = data.feed.entry,
					links = data.feed.link;
					
				for(let i=0, len = links.length; i< len; i++){
					if(links[i].rel == "next") nextUrl = links[i].href.split("?")[1];
				}
				
				if(entry !== undefined){
					let idChap = '', 
						dateChap = '', 
						titleChap = '';
					for(let i = 0, len = entry.length; i < len; i++){
						titleChap = entry[i].title.$t;
						idChap = entry[i].id.$t.split('post-')[1];
						dateChap = entry[i].published.$t;
					
						let date = new Date(dateChap);
						dateChap = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
						
						htmlChap += '<div class="row"><span><a href="' + url_blog + 'p/reader.html?id='+idMain + '&idc=' + idChap + '&sv=' + url.split('//')[1].split('.')[0] +'" target="_blank" title="'+ titleChap +'">'+ titleChap +'</a></span><span>'+ dateChap +'</span></div>';
						
						if(i==0){
							$('.start.btn').attr('href', '/p/reader.html?id='+idMain + '&idc=' + idChap + '&sv=' + url.split('//')[1].split('.')[0]);
							$('.comic-date-update .value').text(dateChap);
						}
					}
					
					if(nextUrl != ''){
						var next = url.split("?")[0] + "?" + nextUrl;
						getChapter(next);
					}
				}else{
					htmlChap = "Đang cập nhật";
				}
				if($(".comic-chap-list row").length > 0)
					$(".comic-chap-list").append(htmlChap);
				else
					$(".comic-chap-list").html(htmlChap);
			}
		});
	}
	
	if(chap != ''){
		var urlData = "//" + chap.split(";")[0] + ".blogspot.com",
			nameComic = chap.split(";")[1];
		var urlSv = urlData + "/feeds/posts/default/-/" + nameComic + "?alt=json-in-script&max-results=100&orderby=published";
		getChapter(urlSv);
	}
	
});