var QueryString = function () {	  
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");			
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);			
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;			
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    } 
    return query_string;
}();

function getTotalPostByLabel(label ,callback){
$.ajax({
    url: url_blog + "feeds/posts/summary/-/"+label+"?alt=json-in-script&max-results=0",
    type: "GET",
    dataType: "jsonp",
    success: function(data){
        callback(data.feed.openSearch$totalResults.$t);
    }
});
}

function getRecomenceVideo(){

}

function getRelatedVideo(currentVideo,callback){
getTotalPostByLabel("Video" ,function(totalVideo){
    var url = '';
    if(totalVideo > 0){
        if(totalVideo <=13){
            url = url_blog + "feeds/posts/summary/-/Video?alt=json-in-script&orderby=published&max-results=13";
        }else{
            var startIndex = Math.floor(Math.random() * (totalVideo-13)) + 1;
            url = url_blog + "feeds/posts/summary/-/Video?alt=json-in-script&orderby=published&start-index="+ startIndex +"&max-results=13";
        }
    }else{
        url = url_blog + "feeds/posts/summary/-/Video?alt=json-in-script&orderby=published&max-results=13";
    }
    
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            var titlePost = '', thumbPost = '', urlPost='', listTitle=[], listThumb=[], listUrl=[], listVideo=[];
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
                        thumbPost = thumbPost.replace(/\/s[0-9]+(\-c)?/g, "/s90-c")
                    }else{
                        thumbPost = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
                    }
                    
                    if(urlPost===currentVideo) continue;
                    
                    listTitle.push(titlePost);
                    listThumb.push(thumbPost);
                    listUrl.push(urlPost);
                    
                    if(listTitle.length==12) break;
                }
            }else{
                
            }
            
            listVideo.push(listTitle);
            listVideo.push(listThumb);
            listVideo.push(listUrl);
            callback(listVideo);
        },
        error: function(){
            
        }
    });
});
}

function displayRandomPhoto(){
var htmlADS = '';
getTotalPostByLabel("Photo" ,function(totalVideo){
    var url = '';
    if(totalVideo > 0){
        var randIndex = Math.floor(Math.random() * totalVideo) + 1;
        url = url_blog + "feeds/posts/summary/-/Photo?alt=json-in-script&orderby=published&start-index="+ randIndex +"&max-results=1";
    }else{
        url = url_blog + "feeds/posts/summary?alt=json-in-script&orderby=published&max-results=1";
    }
    
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        beforeSend: function(){
            $('#adOnPause').hide();
        },
        success: function(data){
            var titlePost = '', thumbPost = '', urlPost='';
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
                        thumbPost = thumbPost.replace(/\/s[0-9]+(\-c)?/g, "/s200-c")
                    }else{
                        thumbPost = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
                    }
                    
                    htmlADS = '<div class="overlay-video-ads"><a href="'+ urlPost +'"><img src="'+ thumbPost +'"/><span class="title-ads">'+ titlePost +'</span></a></div>';
                    
                    $('.overlay-video-ads').html(htmlADS);
                    $('#adOnPause').show();
                }
            }else{
                $('.overlay-video-ads').html('^^');
            }
        },
        error: function(e){
            console.log(e);
        }
    });
});

return htmlADS;
}

function SGMGetMedia(){
var requestCrossDomain = function(site, callback) {
    if (!site) {
        console.log('No site was passed.');
        return false;
    }

    $.get('http://cors-anywhere.herokuapp.com/' + site, function (response) {
        callback(response);			
    }).fail(function() {
        $.ajax({
          url: 'http://whateverorigin.org/get?url=' + encodeURIComponent(site) + '&callback=?',		  
          type: 'GET',
          dataType: 'json',
          scriptCharset: "utf-8",
          contentType: "application/json; charset=utf-8",
          success: function(data){
            if(data){				
                if ( typeof callback === 'function') {
                    callback(data.contents);
                }	
            }else throw new Error('Nothing returned from getJSON.');
          },
          error :function(){			
            
          }
        });
    }).always(function(){
        
    });		
}	
    
this.getURL = function(link){
    if(link.indexOf(listsvJS[0]) != -1)
        link = link.replace(/pis\.js/gi, 'https://photos.google.com');
    
    if(link.indexOf(listsvJS[1]) != -1)
        link = link.replace(/yt\.js/gi, 'https://www.youtube.com')
        
    return link;
};

var picasafn = function(data){
    var infoVideo = {};
    var regExpStr = /url\\u003d(.*)"\]/,
        match = regExpStr.exec(data);
    
    var urlList = match[0].replace('"]', '').trim().replace(/\\u003d/gi, '=').replace(/\\u0026/gi, '&').split(',');
    
    var linkJson = [];
    
    for(var i = 0 ; i < urlList.length; i++){
        var tempJson = {};
        var urlItem = decodeURIComponent(urlList[i].substring(4));

        if(urlItem.indexOf("video/mp4") != -1){				
            if (urlItem.indexOf("itag=22") != -1){
                tempJson.url = urlItem.split('&')[0];
                tempJson.quan = "720p";
                linkJson.push(tempJson);
            }else if (urlItem.indexOf("itag=18") != -1){
                tempJson.url = urlItem.split('&')[0];
                tempJson.quan = "360p";
                linkJson.push(tempJson);				
            }
        }
    }

    infoVideo["thumb"] = "";
    infoVideo["link"] = linkJson;
    
    return infoVideo;
}

function youtube_id(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
var youtubefn = function(data){
    var infoVideo = {};		
    var regex = /;ytplayer\.config\s*=\s*({.*?});/gi;
    var qdata = regex.exec(data);
    jsondata = $.parseJSON(qdata[1]);
    
    var url_encoded_fmt_stream_map = jsondata['args']['url_encoded_fmt_stream_map'].split(',');
    
    var linkJson = [];		
    for(var i = 0; i < url_encoded_fmt_stream_map.length; i++){		
        var urlstr = url_encoded_fmt_stream_map[i].replace('\u0026', '&');	
        
        urlarr = urlstr.split('&');			
        var url = '', type = '', quality = '', itag = '', s = '';
        for(var j=0; j<urlarr.length; j++){
            if(urlarr[j].indexOf('url=') != -1)
                url = decodeURIComponent(urlarr[j].split('=')[1]);
            if(urlarr[j].indexOf('type=') != -1)
                type = decodeURIComponent(urlarr[j].split('=')[1]).split(';')[0];
            if(urlarr[j].indexOf('quality=') != -1)
                quality = decodeURIComponent(urlarr[j].split('=')[1]);
            if(urlarr[j].indexOf('itag=') != -1)
                itag = decodeURIComponent(urlarr[j].split('=')[1]);
            if(urlarr[j].indexOf('s=') != -1)
                s = decodeURIComponent(urlarr[j].split('=')[1]);
                
        }
        var tempJson = {};
        if(type == 'video/mp4'){				
            tempJson.url = decodeURIComponent(url + '&quality=' + quality + '&type=' + type + '&signature=' + s);
            if(quality == 'hd720')
                tempJson.quan = '720';
            else if(quality == 'medium')
                tempJson.quan = '360';				
            
            linkJson.push(tempJson);
        }
    }
    
    infoVideo["thumb"] = "";
    infoVideo["link"] = linkJson;
    
    return infoVideo;
}

this.getData = function(url, callback){		
    var ourl = this.getURL(url);
    
    requestCrossDomain(ourl, function(data){
        if(ourl.indexOf('photos.google.com') != -1)
            callback(picasafn(data));
        
        if(ourl.indexOf('youtube') != -1)
            callback(youtubefn(data));
            
    });				
};
}

$(document).ready(function(){
    var embedPostId = QueryString.pid;
    if(embedPostId != null && embedPostId != '' && embedPostId !== undefined){
        var currentPost = "", thumbnailPost = "", titlePost = "", embedData='', video18=false, nonAdult=false;
        var tempURL = url_blog + "feeds/posts/default/"+ embedPostId +"?alt=json-in-script";
        
        $.ajax({
            type: 'get',
            url: tempURL,				
            contentType: 'application/json; charset=utf-8',
            dataType: 'jsonp',
            success: function(data){
                var entry=data.entry;

                if (entry !== undefined) {
                    for (var j = 0; j < entry.link.length; j++) {
                        if (entry.link[j].rel == "alternate") {
                            currentPost = entry.link[j].href;
                        }
                    }
                    var plabel = "category" in entry ? entry.category : "";
                    
                    for (var k = 0; k < plabel.length; k++){
                        if(plabel.term == "18"){
                            video18 = true;
                        }
                        if(plabel.term == "Non-Adult"){
                            nonAdult = true;
                        }
                    }
                    
                    titlePost = entry.title.$t;
                    thumbnailPost = entry.media$thumbnail.url;				
                    var content = "content" in entry ? entry.content.$t : '';
                    embedData = content.substring(content.indexOf('data-video-source="') + 19, content.indexOf('"', content.indexOf('data-video-source="') + 19));

var link = embedData;
if(link != '' && link != undefined && link != null){
var listsvEncrypt = ["xvideos", "xhamster", "pornhub", "redtube", "youporn", "youtubexxx", "picasa", "ssgirlexpired", "tubecup", "tube8"];
var listsvJS = ['pis.js', 'yt.js'];
var svRun = '';

for(var i=0; i<listsvEncrypt.length; i++){
    if(link.indexOf(listsvEncrypt[i]) != -1) {
        svRun="P";
        break;
    }	
}

for(var i=0; i<listsvJS.length; i++){
    if(link.indexOf(listsvJS[i]) != -1){
        svRun="J";
        break;
    }	
}

if(svRun != ''){	
    function videoSetup(infoVideo){
        if(link.indexOf('youtubexxx') != -1  || link.indexOf('ssgirlexpired') != -1 || infoVideo.thumb == null || infoVideo.thumb == ''){
            var poster = thumbnailPost;
        }else{
            var poster = infoVideo.thumb;
        }
        
        var sourceVid = '';
        if(!$.isArray(infoVideo.link)){
            sourceVid = '<source src="' + infoVideo.link + '" type="video/mp4">';
        }else{
            for(var i = 0; i < infoVideo.link.length; i++){
                sourceVid += '<source data-res="' + infoVideo.link[i].quan + '" src="'+ infoVideo.link[i].url +'" type="video/mp4">';
            }
        }
        
        if(video18 == false)
            var playerHtml = '<video id="ssgirl-videojs" class="video-js vjs-default-skin" controls autoplay preload="auto" width="auto" height="auto" poster="'+ poster +'" data-setup=\'{}\'>'+ sourceVid +'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>';
        else
            var playerHtml = '<video id="ssgirl-videojs" class="video-js vjs-default-skin" controls preload="auto" width="auto" height="auto" poster="'+ poster +'" data-setup=\'{}\'>'+ sourceVid +'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>';

        $('#player-wrapper').html(playerHtml);

        if(isMobile == false)
            var vjsoption= {
                'children': {
                    'controlBar': {
                        'children': {
                            'volumeMenuButton': { 
                                'volumeBar': { 'vertical': true },
                            },
                            'muteToggle': false,
                            'volumeControl': false,
                        }
                    }
                },
                "techOrder": ["html5", "flash"],
                "plugins":{
                    "watermark":{"file": "https://lh5.googleusercontent.com/-ilVV3M5PdRE/VfhYxTrdUEI/AAAAAAAASIg/fNytvBS2OM4/w134-h90-no/sgm-wmlb2.png", "xpos": "50", "ypos": "50" },
                    OpenloadAnim: {},
                    resolutionSelector : {
                        default_res : "480",
                    }
                },	
            };
        else
            var vjsoption= {					
                "techOrder": ["html5"],
                "plugins":{
                    "watermark":{"file": "https://lh5.googleusercontent.com/-ilVV3M5PdRE/VfhYxTrdUEI/AAAAAAAASIg/fNytvBS2OM4/w134-h90-no/sgm-wmlb2.png", "xpos": "50", "ypos": "50" },
                    OpenloadAnim: {},
                    resolutionSelector : {
                        default_res : "480",
                    }
                },	
            };
                
        videojs('ssgirl-videojs', vjsoption, function(){
            var disableDiv = document.createElement('div');
                disableDiv.id = 'disRightClick';
                disableDiv.style.cssText ='position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 10;';
                
            this.el().appendChild(disableDiv);
            var _player = this;
            this.volume(1);
            $('#disRightClick').click(function(){
                if (_player.paused()) {
                    _player.play();
                } else {
                    _player.pause();
                }
                return false;
            });
            
            this.on('changeRes', function() {
                //console.log( 'Current Res is: ' + player.getCurrentRes() );
            });
            
            this.progressTips();
        });
            
        videojs('ssgirl-videojs').ready(function () {
            var player = this;
            
            player.on("pause", function () {
                player.bigPlayButton.show();
                
                var adsDiv = document.createElement('div');	
                adsDiv.id = 'adOnPause';
                adsDiv.innerHTML = '<div class="inner-ads-content"></div>';
                adsDiv.firstChild.innerHTML = '<div class="ads-title-close"><span class="credit-ads">Ads by sSGirl</span><span class="close-ads-invideo">x</span></div><div class="overlay-video-ads"></div>';			
                this.el().appendChild(adsDiv);
                displayRandomPhoto();
                $('#adOnPause').on("click", '.close-ads-invideo', function(){
                    player.el().removeChild(adsDiv);
                    player.play();
                });
            });

            player.on("play", function () {
                player.bigPlayButton.hide();
                
                var adsPause =  document.getElementById('adOnPause');
                if (typeof(adsPause) != 'undefined' && adsPause != null){
                  this.el().removeChild(adsPause);
                }			
            });
            
            player.on("error", function () {
                setTimeout(function(){
                    player.trigger('loadstart');
                }, 1000);
                
            });
            
            player.on('ended', function() {
                var adsPause =  document.getElementById('adOnPause');
                if (typeof(adsPause) != 'undefined' && adsPause != null){
                  this.el().removeChild(adsPause);
                }
            });
            
            getRelatedVideo(currentPost, function(relatedVideo){
                var listRelated = [];
                for(var i = 0 ; i< relatedVideo[1].length; i++){
                    listRelated.push({ imageSrc: relatedVideo[1][i], url: relatedVideo[2][i], title: relatedVideo[0][i], target: '_blank' });
                }
                
                player.relatedCarousel(listRelated);
                
                if(isMobile){
                    $(".vjs-related-carousel-holder").appendTo(".ss-player");
                }
            });
            
            player.on("seeked", function(){
                if($('.vjs-related-carousel-holder').hasClass('active'))
                    $('.vjs-related-carousel-holder').removeClass('active');
            });
                            
            player.on('loadedmetadata', function() {
                var duration = player.duration();							
                var startAds = Math.floor(Math.random() * (duration-40)) + 50 + 1;					
                var endAds = startAds + 30;
                
                if(isMobile == false){
                    var contentads = '<div><a href="https://www.facebook.com/sgmedia.ent" target="_blank"><img src="https://lh3.googleusercontent.com/-PXLkB5DvQO4/Vq00g6Log9I/AAAAAAAACmQ/8tSxWLshtPk/s0-Ic42/sgm468x60.jpg"/></a></div>';
                }else{			
                    var contentads = '<div><a href="https://www.facebook.com/sgmedia.ent" target="_blank"><img src="https://lh3.googleusercontent.com/-jvkiPdK3STs/Vq0w40f59XI/AAAAAAAACl8/FD_YPjZtG1M/s0-Ic42/sgm300x50.jpg"/></a></div>';
                }
                
                player.overlay({
                  content: '<span id="close-invideo-ads" style="position: absolute;right: 5px;top: 0px;font-size: 16px;cursor: pointer;"><i class="fa fa-times"></i></span>' + contentads,
                  overlays: [{
                    content: '<span id="close-invideo-ads" style="position: absolute;right: 5px;top: 0px;font-size: 16px;cursor: pointer;"><i class="fa fa-times"></i></span>' + contentads,			
                    start: startAds,
                    end: endAds + 30,
                    align: 'bottom'
                  }, {
                    start: 15,
                    end: 45,
                    align: 'bottom'
                  }]
                });
            });
        
            var ssbutton = player.controlBar.addChild('button', {
                text : 'sSGirl'
            });
            ssbutton.addClass("vjs-ssglogo-control");
            
            var fullscreenToggleLocation = 0;
            var fullscreenLocation = function() {
                var controlBarChildren = player.controlBar.el().childNodes;
                var loc = -1;
                for ( var x = 0; x < controlBarChildren.length; x++ ) {
                    if ( controlBarChildren[x].className.indexOf('vjs-fullscreen-control') != -1) {
                        loc = x;
                        break;
                    }
                }
                return loc;
            };
            fullscreenToggleLocation = fullscreenLocation();
            player.controlBar.el().insertBefore( ssbutton.el(), player.controlBar.el().childNodes[fullscreenToggleLocation] );
            
            $(".vjs-ssglogo-control").on("click", function() {
                var redirectWindow = window.open(url_blog + 'video', '_blank');
                redirectWindow.location;
                player.pause();
            });
            
            this.hotkeys({
                volumeStep: 0.1,
                seekStep: 5,
                enableMute: true,
                enableFullscreen: true,
                enableNumbers: true
            });
        });

        $(document).ready(function(){
            $('#player-wrapper').on("click", '#close-invideo-ads', function(){
                $('.vjs-overlay').hide();
            });
        });

        var player = videojs('ssgirl-videojs');
        if(video18 == false && nonAdult == false){
            var minimumDate = new Date();
            minimumDate.setFullYear(minimumDate.getFullYear() - 18);

            player.ageGate({
                minDate: minimumDate,
                promptMessage: 'Nội dung 18+, xác nhận bạn trên 18 tuổi',
                deniedMessage: 'Xin lỗi, Nội dung video này chỉ phù hợp với người trên 18 tuổi.'
            });

            /*$(window).unload(function(){		
                    if (typeof window.localStorage !== 'undefined')
                        localStorage.removeItem("givenDate");
            });*/
        }
        
        player.persistvolume({
            namespace: "ss-Volume-lastTime"
        });
        
        player.social({
            "title": titlePost,
            "description": titlePost,
            "url": currentPost,
            "embedCode": "<iframe src='"+ url_blog +"p/embed.html?pid="+ embedPostId +"' width='640' height='480' frameborder='0' allowfullscreen></iframe>",
            "deeplinking": false,
            "offset": "00:00:00",
            "services": {
                "facebook": true,
                "google": true,
                "twitter": true,
                "tumblr": true,
                "pinterest": true,
                "linkedin": true
            }
        });
        
        player.customEndscreen({
            "content": "View all <a href='"+ url_blog +"video'><strong>Video</strong></a> sexy"
        });
    }
    
    if(svRun == 'P'){
        linkO = link.split('*')[1];
        var countBreak = 0;
        (function initVideo(url){
            $.ajax({
                url: url,
                type: "GET",
                timeout: 5000,
                data:{
                    url: linkO
                },
                dataType: "json",					
                success:function(data){					
                    videoSetup(data);
                },
                error: function(){
                    countBreak++;
                    if(countBreak < 3)
                        initVideo("https://kinhbacland.vn/kinhbacland-old/abc/sgmvideo.php");
                    else if(countBreak >= 3 && countBreak < 5)
                        initVideo("https://sgm-gets.herokuapp.com/sgmvideo.php");
                }
            });
        })("https://kinhbacland.vn/kinhbacland-old/abc/sgmvideo.php");
    
    }else if(svRun == 'J'){
        var SGMG = new SGMGetMedia;		
        SGMG.getData(link, function(infoVideo){
            videoSetup(infoVideo);
        });
    }
}else if(link.indexOf('youtube.com') != -1){
    $('#player-wrapper').html('<video id="ssgirl-videojs" class="video-js vjs-default-skin" controls autoplay preload="auto" width="auto" height="auto" poster="" data-setup=\'{ "techOrder":["youtube"], "src": "'+link+'", "plugins": {"watermark":{"file": "https://lh5.googleusercontent.com/-ilVV3M5PdRE/VfhYxTrdUEI/AAAAAAAASIg/fNytvBS2OM4/w134-h90-no/sgm-wmlb2.png", "xpos": "50", "ypos": "50"}}}\'><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>');
    
    videojs('ssgirl-videojs').ready(function () {
        var player = this;	
        var ssbutton = player.controlBar.addChild('button', {
            text : 'sSGirl',
        });
        ssbutton.addClass("vjs-ssglogo-control");
        
        var fullscreenToggleLocation = 0;
        var fullscreenLocation = function() {
            var controlBarChildren = player.controlBar.el().childNodes;
            var loc = -1;
            for ( var x = 0; x < controlBarChildren.length; x++ ) {
                if ( controlBarChildren[x].className.indexOf('vjs-fullscreen-control') != -1) {
                    loc = x;
                    break;
                }
            }
            return loc;
        };
        fullscreenToggleLocation = fullscreenLocation();
        player.controlBar.el().insertBefore( ssbutton.el(), player.controlBar.el().childNodes[fullscreenToggleLocation] );
        
        $(".vjs-ssglogo-control").on("click", function() {
            var redirectWindow = window.open(url_blog + 'search/label/Video', '_blank');
            redirectWindow.location;
            player.pause();
        });
    });

    videojs('ssgirl-videojs').persistvolume({
        namespace: "ss-Volume-lastTime"
    });
}else if(link.indexOf('vimeo') != -1){
    $('#player-wrapper').html('<video id="ssgirl-videojs" class="video-js vjs-default-skin" controls autoplay preload="auto" width="600" height="400" poster="" data-setup=\'{ "techOrder":["vimeo"], "src": "'+link+'", "plugins": {"watermark":{"file": "https://lh5.googleusercontent.com/-ilVV3M5PdRE/VfhYxTrdUEI/AAAAAAAASIg/fNytvBS2OM4/w134-h90-no/sgm-wmlb2.png", "xpos": "50", "ypos": "50"}}}\'><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>');
}
}else{
$("#player-wrapper").html($('.main-post-content'));
}
                }
            },
            error: function() {
                embedData = 'Error load data';
            }
        });	
        }else{
            document.location="https://www.sexygirlmedia.com/404.html";
        }
});

$(document).ready(function(){
	context.init({
		fadeSpeed: 100,
		filter: null,
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	});
	
	context.attach('#player-wrapper', [
		{text: 'SGMedia Player'},
		{text: 'About', href: '/', target: '_blank'}
	]);
	
	if(isMobile){
		$('body').on('touchstart', function(e){ 
			$(".vjs-res-button .vjs-lock-showing").removeClass('vjs-lock-showing');;        
		});
		
		var playerPosition = $('.ss-player').offset();
		if(window.innerHeight > window.innerWidth){
			$(window).scroll(function(){
				if(window.innerHeight > window.innerWidth){
					if($(window).scrollTop() > playerPosition.top){
						$('.ss-player').css('position','fixed').css('top','0');
					} else {
						$('.ss-player').css('position','').css('top','');
					} 
				}
			});
		}
	}
});