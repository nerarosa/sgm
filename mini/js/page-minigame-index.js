function App() {} 

var detection = function() {
    var e, t = {
            is: {}
        },
        n = navigator.userAgent;
    t.detect = {
        html5: function() {
            return void 0 !== document.createElement("canvas").getContext
        },
        touch: function() {
            var e = "ontouchstart" in window || navigator.msMaxTouchPoints;
            return !!e
        },
        android: function() {
            return !!n.match(/Android/i)
        },
        ios: function() {
            return !!n.match(/iPhone|iPad|iPod/i)
        },
        ios7: function() {
            return t.detect.ios && n.match(/version\/7\./i)
        },
        bb10: function() {
            return !!n.match(/BB10/i)
        },
        windows: function() {
            return !!n.match(/Windows/i)
        },
        standalone: function() {
            return !!window.navigator.standalone
        },
        smartphone: function() {
            return n.match(/Android.*Mobile|iPhone|IEMobile|WPDesktop|BB10/i) ? !0 : !1
        },
        tablet: function() {
            if (window.self != window.top) return !1;
            var e = t.is.android && !t.is.smartphone,
                r = n.match(/iPad/i) ? !0 : !1;
            return e || r
        },
        pc: function() {
            return !t.is.smartphone && !t.is.tablet
        },
        phantom: function() {
            return !(!window.callPhantom && !n.match(/PhantomJS/))
        },
        iframe: function() {
            return window.self != window.top
        }
    };
    for (e in t.detect) "function" == typeof t.detect[e] && (t.is[e] = t.detect[e]());
    return t
}();

App.init = function() {
    this.bindEvents(), this.setItemWidth()
}, App.bindEvents = function() {
    this.handleClick("[data-navigate-back]", this.navigateBack)
}, App.handleResize = function() {
    this.setItemWidth()
}, App.setItemWidth = function() {
    $("section.games ul li").attr("style", "");
    var e = !1,
        t = 0;
	
    if ($("section.games ul li").each(function() {
            $(this).closest("ul").hasClass("flashContent") || (t++, ($(this).width() < e && $(this).width() > 0 || !e) && (e = $(this).width(), e -= 1))
        }), $("section.games ul li").css("width", e), t > 1) {
        var n = 2 * e;
        $("section.games ul li:first-child").css("width", n)
    }
}, App.navigateBack = function() {
    return document.referrer || document.referrer.indexOf("//" + document.location.host) > -1 ? !!history.back() : void 0
}, App.handleClick = function(e, t) {
    window.navigator.msPointerEnabled ? $(document).on("MSPointerDown", e, t) : $(document).on(detection.is.touch ? "touchstart" : "click", e, t)
}, App.replaceTeaser = function(label) {
    function e(size) {
        if ("undefined" != typeof t[size]) return t[size];
        for (var n = [32, 64, 96, 128, 160, 192, 224, 256, 288], r = 0; r < n.length; r++)
            if (n[r] >= size) return imageSize = n[r], t[size] = imageSize, imageSize;
        return t[size] = size
    }
    var t = {};
	
	function getGamesByLabel(el){
		if(isHome == true){
			var markLabel = $(el).text().trim();
			if(markLabel == "" || markLabel == null)
				var urlfeed = gameDataUrl + '/feeds/posts/default?alt=json-in-script&orderby=updated&max-results=20';
			else 
				var urlfeed = gameDataUrl + '/feeds/posts/default/-/'+ markLabel +'?alt=json-in-script&orderby=updated&max-results=20';
		}else{
			if(typeof label == "undefined" || label == "") window.location.href = "/p/game.html";
			
			var urlfeed = gameDataUrl + '/feeds/posts/default/-/'+ label +'?alt=json-in-script&orderby=updated&max-results=100';
		}		
		
		$.ajax({
			url: urlfeed,
			type: "GET",
			dataType: "jsonp",
			success: function(data){
				var urlPost='', idPost='', thumbPost = '', titlePost = '', htmlItems = '',
				entry = data.feed.entry;
				
				if(entry !== undefined){
					for(var i=0; i<entry.length; i++){
						idPost = entry[i].id.$t.substr(entry[i].id.$t.lastIndexOf("-")+1);												
						
						for(var j=0; j<entry[i].link.length; j++){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
								break;
							}
						}
						
						var content = "content" in entry[i] ? entry[i].content.$t : "",
							titlePost = entry[i].title.$t;
						
						if(content != ""){
							var thumbPost = sgmTags("thumb", content);
						}
						
						htmlItems += '<li><a href="/p/game-run.html?gid='+ idPost +'" target="_top"><img src="https://lh3.googleusercontent.com/-cQPMoPiadGI/VqNL9VQSgSI/AAAAAAAABps/gr5FI-tfHxk/s320-Ic42/PlaceholderImage.png" data-original="' + thumbPost + '" alt=""/><span>' + titlePost + '</span></a></li>';
												
					}
				}else{
					htmlItems = "<li>No Result!</li>";
				}
				
				if(isHome == true){
					var htmlEmbed = '<h3><a href="/p/game-cat.html?cat='+ markLabel +'" class="button"><em>Show all</em><span class="fa fa-chevron-circle-right"></span></a><a href="/p/game-cat.html?cat='+ markLabel +'"><span>'+ markLabel +'</span></a></h3><ul>' + htmlItems + '</ul>';
				}else{
					var htmlEmbed = '<h3><a href="javascript:history.go(-1);" class="button" data-navigate-back><span class="fa fa-chevron-circle-left"></span> <em>Back</em></a><span>'+ label +'</span></h3><ul class="categoryView">' + htmlItems + '</ul>';
				}
				
				$(el).html(htmlEmbed);
				
				if($("img[data-original]").length > 0){
					$("img[data-original]").each(function() {
						var t = $(this),
							n = t.parent().innerWidth(),
							r = e(n),
							osrc = "";
							
						if(n > 0) {
							if(r != n){
								osrc += t.attr("data-original").replace(/\/s[0-9]+(\-no|\-c)?\/+/gi, '/s'+ r +'/');
								t.attr("data-original", osrc);
							}	
						}else
							t.css("outline", "1px solid red")
					}),
					
					$("img[data-original]").lazyload()
				}
			},
			error: function(e){
				console.log(e);
			}
		});
	}
	
	if(isHome == true){
		$(".games .cat-content").each(function(){
			getGamesByLabel($(this));
		});
	}else{
		getGamesByLabel(".category-post");
	}
};