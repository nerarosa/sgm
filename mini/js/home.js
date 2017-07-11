function shuffle(d){for(var b=d.length,a,c;0!==b;)c=Math.floor(Math.random()*b),--b,a=d[b],d[b]=d[c],d[c]=a;return d}
function getNewVideo(d){$.ajax({url:url_blog+"/feeds/posts/summary/-/Video?alt=json-in-script&orderby=published&max-results=40",type:"GET",dataType:"jsonp",success:function(b){var a="",c="",e="",g=[];b=b.feed.entry;if(void 0!==b){b=shuffle(b);for(var f=0;f<b.length;f++){for(a=0;a<b[f].link.length;a++)if("alternate"==b[f].link[a].rel){e=b[f].link[a].href;break}a=b[f].title.$t;"media$thumbnail"in b[f]?(c=b[f].media$thumbnail.url,c=c.replace(/\/s[0-9]+(\-c)\/?/g,"/w300-h225-c")):c="http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF";
g.push('<a href="'+e+'" title="'+a+'"><img src="'+c+'" alt="'+a+'"/><div class="tt-grid-caption"><span>'+a+'</span></div><span class="videoplay"><i class="fa fa-play-circle-o"></i></span></a>')}}else g="<span>No Result!</span>";d(g)},error:function(){newestInsert="<strong>Error Loading Feed!</strong>"}})}
(function(){getNewVideo(function(d){function b(a,b,c){var d=0,e=function(){this.removeEventListener(g,e);++d;d===b&&c.call()};a.forEach(function(a,b){a.querySelector("a").addEventListener(g,e)})}var a=[],a=d,c="";d=0;if(10>=a.length)for(var e=0;e<a.length;e++)c+="<li>"+a[e]+"</li>";else{for(e=0;e<a.length;e++)9>=e&&(c+="<li>"+a[e]+"</li>");d=parseInt(a.length/10)}$(".tt-grid").html(c);if(0<d)for(c=1;c<d;)$(".tt-grid-wrapper nav").append("<a></a>"),c++;var g={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd",
msAnimation:"MSAnimationEnd",animation:"animationend"}[Modernizr.prefixed("animation")],f=function(){var a=!1,b=navigator.userAgent||navigator.vendor||window.opera;if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b)||
/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
4)))a=!0;return a}()?"touchstart":"click",q=Modernizr.cssanimations;(function(){[].forEach.call(document.querySelectorAll(".tt-grid-wrapper"),function(c){function d(c){var f=[],p=[],k=[],l=[];if(10>=a.length)f=a;else for(var h=0;h<a.length;h++)9>=h?f.push(a[h]):9<h&&19>=h?p.push(a[h]):19<h&&29>=h?k.push(a[h]):29<h&&39>=h&&l.push(a[h]);var m=f;switch(c){case 1:m=p;break;case 2:m=k;break;case 3:m=l;break;default:m=f}g.forEach(function(a){(a=a.querySelector("a"))&&classie.add(a,"tt-old")});setTimeout(function(){[].forEach.call(m,
function(a,b){g[b].innerHTML+=a});classie.add(e,"tt-effect-active");var a=function(){g.forEach(function(a){var b=a.querySelector("a.tt-old");b&&a.removeChild(b);classie.remove(a,"tt-empty");a.hasChildNodes()||classie.add(a,"tt-empty")});classie.remove(e,"tt-effect-active");n=!1};q?b(g,g.length,a):a.call()},25)}var e=c.querySelector(".tt-grid"),g=[].slice.call(e.querySelectorAll("li")),k=[].slice.call(c.querySelectorAll("nav > a")),n=!1,l=0;k.forEach(function(a,b){a.addEventListener(f,function(a){if(n||
l===b)return!1;a.preventDefault();n=!0;classie.remove(k[l],"tt-current");classie.add(k[b],"tt-current");l=b;d(b)})})})})()})})();

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
		$.ajax({
			beforeSend: handleBefore,
			url: url_blog + '/feeds/posts/summary/-/ComicFull?alt=json-in-script&orderby=updated&max-results=12',
			type: 'get',
			dataType: "jsonp",
			success: function(data) {
				var titlePost = urlPost = thumbPost = datePost = htmlEmbed = '',
					entry = data.feed.entry;
				
				if(entry !== undefined){
					var itemEmbed = '';					
					for(var i = 0; i < entry.length; i++){						
						for(var j = 0; j < entry[i].link.length; j++){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
							}
						}	
						titlePost = entry[i].title.$t;
						
						var date = new Date(entry[i].updated.$t);
							datePost = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
						
						if("media$thumbnail" in entry[i]){
							thumbPost = entry[i].media$thumbnail.url.replace(/\/s[0-9](.*)\//gi, '/w280-h370-c/');
						}else{
							thumbPost = 'http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/w280-h370-c/grey.GIF';
						}
						
						itemEmbed += '<div class="col-xs-12 col-sm-6 col-md-6"><div class="gp_products_inner"><div class="gp_products_item_image"><a href="'+ urlPost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'" /></a></div><div class="gp_products_item_caption"><ul class="gp_products_caption_name"><li><a href="'+ urlPost +'">'+ titlePost +'</a></li><li><a href="#">'+ datePost +'</a></li></ul></div></div></div>';
						
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
			},
			error: function(){
				getUpdateComic();
			}
		});
	})();
	
	(function getUpdateBook () {
		$.ajax({
			beforeSend: handleBefore,
			url: url_blog + '/feeds/posts/summary/-/Book?alt=json-in-script&orderby=updated&max-results=12',
			type: 'get',
			dataType: "jsonp",
			success: function(data) {
				var titlePost = urlPost = thumbPost = datePost = htmlEmbed = '',
					entry = data.feed.entry;
				
				if(entry !== undefined){
					var itemEmbed = '';					
					for(var i = 0; i < entry.length; i++){						
						for(var j = 0; j < entry[i].link.length; j++){
							if(entry[i].link[j].rel == "alternate"){
								urlPost = entry[i].link[j].href;
							}
						}	
						titlePost = entry[i].title.$t;
						
						var date = new Date(entry[i].updated.$t);
							datePost = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
						
						if("media$thumbnail" in entry[i]){
							thumbPost = entry[i].media$thumbnail.url.replace(/\/s[0-9](.*)\//gi, '/w280-h370-c/');
						}else{
							thumbPost = 'http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/w280-h370-c/grey.GIF';
						}
						
						itemEmbed += '<div class="col-xs-12 col-sm-6 col-md-6"><div class="gp_products_inner"><div class="gp_products_item_image"><a href="'+ urlPost +'"><img src="'+ thumbPost +'" alt="'+ titlePost +'" /></a></div><div class="gp_products_item_caption"><ul class="gp_products_caption_name"><li><a href="'+ urlPost +'">'+ titlePost +'</a></li><li><a href="#">'+ datePost +'</a></li></ul></div></div></div>';
						
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
			},
			error: function(){
				getUpdateBook();
			}
		});
	})();
});