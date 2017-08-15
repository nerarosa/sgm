/*watermark plugin*/
console.log('watermark: Start');
(function(){console.log("watermark: Init defaults");var g={file:"Owned_Stamp.png",xpos:0,ypos:0,xrepeat:0,opacity:100,clickable:!1,url:""},f=function(){var b,c,d,a,e;b=Array.prototype.slice.call(arguments);c=b.shift()||{};for(d in b)for(e in a=b[d],a)a.hasOwnProperty(e)&&(c[e]="object"===typeof a[e]?f(c[e],a[e]):a[e]);return c};videojs.plugin("watermark",function(b){console.log("watermark: Register init");var c,d,a;f(g,b);c=this.el();d=document.createElement("div");a=document.createElement("img");
d.appendChild(a);a.className="vjs-watermark flipInX";a.src=b.file;0===b.ypos&&0===b.xpos?(a.style.top="0",a.style.left="0"):0===b.ypos&&100===b.xpos?(a.style.top="0",a.style.right="0"):100===b.ypos&&100===b.xpos?(a.style.bottom="0",a.style.right="0"):100===b.ypos&&0===b.xpos?(a.style.bottom="0",a.style.left="0"):50===b.ypos&&50===b.xpos&&(a.style.top=this.height()/2+"px",a.style.left=this.width()/2+"px");d.style.opacity=b.opacity;b.clickable&&""!==b.url?(a=document.createElement("a"),a.href=b.url,a.target=
"_blank",a.appendChild(d),c.appendChild(a)):c.appendChild(d);console.log("watermark: Register end")})})();

/* videojs-overlay plugin */
(function(v,m){var r={content:"This overlay will show up while the video is playing",overlays:[{start:"playing",end:"paused"}]},t=function(b,e){return b.start-e.start},u=function(b,e){return b.end-e.end},g,k;g=function(b,e,c){var d=document.createElement("div"),f=c.content||e.content,h=e.align||c.align;e=e["class"]||c["class"];d.className="vjs-overlay";c.el=d;h&&(d.className+=" vjs-overlay-"+h);e&&(d.className+=" "+e);"string"===typeof f?d.innerHTML=f:d.appendChild(f);d&&$(".vjs-overlay").remove();
b.el().appendChild(d)};k=function(b,e,c){c.el.parentNode&&c.el.parentNode.removeChild(c.el);delete c.el};m.plugin("overlay",function(b){var e=m.util.mergeOptions(r,b),c=this,d={};b=[];var f=[],h=function(l){l=d[l.type];for(var a=l.length,b;a--;)b=l[a],b.el||g(c,e,b)},n=function(a){a=d[a.type];for(var b=a.length,f;b--;)f=a[b],f.el&&k(c,e,f)},p=function(a,b,d){var f=0,h=0,g;g=function(){var g=a[h],k=c.currentTime();f>k&&(h=0,g=a[h]);for(;g&&g[b]<=k;g=a[++h])d(c,e,g);f=k};c.on("timeupdate",g);c.overlay.eventListeners.push({type:"timeupdate",
fn:g})},a,q;(function(){var a,b;for(b in c.overlay.eventListeners)a=c.overlay.eventListeners[b],c.off(a.type,a.fn)})();c.overlay.eventListeners=[];for(q in e.overlays)a=e.overlays[q],"string"===typeof a.start?(d[a.start]||(d[a.start]=[],c.on(a.start,h),c.overlay.eventListeners.push({type:a.start,fn:h})),d[a.start].push(a)):b.push(a),"string"===typeof a.end?(d[a.end]||(d[a.end]=[],c.on(a.end,n),c.overlay.eventListeners.push({type:a.end,fn:n})),d[a.end].push(a)):f.push(a);b.length&&(b.sort(t),p(b,"start",
g));f.length&&(f.sort(u),p(f,"end",function(a,b,c){c.el&&k(a,b,c)}))})})(window,window.videojs);

/* Age Gate plugin */
(function(m){var n=function(b){var h,d,e;for(d=1;d<arguments.length;d++)for(e in h=arguments[d],h)h.hasOwnProperty(e)&&(b[e]=h[e]);return b},p={minDate:null,promptMessage:"Please enter your birth date",deniedMessage:"Sorry, you must be older to view this video"},b=null,e=function(l){var h=this;l=n({},p,l||{});var d=l.minDate,m=l.promptMessage,q=l.deniedMessage,r=new Date;e={drawGate:function(){var c=document.createElement("div");c.id="vjs-age-gate";var b=document.createElement("h3");b.innerHTML=m;
var d=document.createElement("select");d.id="vjs-age-gate-day";var f=document.createElement("option");f.text="DD";f.value="";d.appendChild(f);for(var a=1;31>=a;a++)f=document.createElement("option"),f.value=a,f.text=a,d.appendChild(f);f=document.createElement("select");f.id="vjs-age-gate-month";var g=document.createElement("option");g.text="MM";g.value="";f.appendChild(g);for(a=1;12>=a;a++)g=document.createElement("option"),g.value=a,g.text=a,f.appendChild(g);g=document.createElement("select");g.id=
"vjs-age-gate-year";var k=document.createElement("option");k.text="YYYY";k.value="";g.appendChild(k);for(a=r.getFullYear();1900<a;a--)k=document.createElement("option"),k.value=a,k.text=a,g.appendChild(k);a=document.createElement("input");a.id="vjs-age-gate-submit";a.type="submit";a.value="ENTER";a.onclick=function(){e.validateFields()&&(e.setGivenDate(),e.verifyDate())};k=document.createElement("div");k.id="vjs-age-gate-error-message";k.textContent="Please fill out all fields";c.appendChild(b);c.appendChild(k);
c.appendChild(f);c.appendChild(d);c.appendChild(g);c.appendChild(a);h.el().appendChild(c)},validateFields:function(){return""===document.getElementById("vjs-age-gate-year").value||""===document.getElementById("vjs-age-gate-month").value||""===document.getElementById("vjs-age-gate-day").value?(document.getElementById("vjs-age-gate-error-message").style.display="block",!1):!0},setGivenDate:function(){null===b&&(b=new Date);b.setFullYear(document.getElementById("vjs-age-gate-year").value,document.getElementById("vjs-age-gate-month").value,
document.getElementById("vjs-age-gate-day").value);"undefined"!==typeof window.localStorage&&localStorage.setItem("givenDate",JSON.stringify(b))},verifyDate:function(){h.el().removeChild(document.getElementById("vjs-age-gate"));if(b<=d)h.play();else{var c=document.createElement("div");c.id="vjs-age-gate-fail-verification";var e=document.createElement("h4");e.innerHTML=q;c.appendChild(e);h.el().appendChild(c)}}};h.on("play",function(){if("undefined"!==typeof d&&null!=d){if(null===b&&"undefined"!==
typeof window.localStorage){var c=JSON.parse(localStorage.getItem("givenDate"));null!==c&&(b=new Date(c))}null!==b&&!isNaN(b.getTime())&&b<=d||(h.pause(),e.drawGate())}})};m.plugin("ageGate",e)})(window.videojs);

/*Save volume plugin*/
(function(b){"function"===typeof define&&define.amd?define(["./video"],function(e){b(window,document,e)}):"object"===typeof exports&&"object"===typeof module?b(window,document,require("video.js")):b(window,document,videojs)})(function(b,e,l){var f=function(){try{return b.localStorage.setItem("persistVolume","persistVolume"),b.localStorage.removeItem("persistVolume"),!0}catch(a){return!1}},g=function(a){f()?a=b.localStorage.getItem(a):a&&(new RegExp("(?:^|;\\s*)"+b.escape(a).replace(/[\-\.\+\*]/g,
"\\$&")+"\\s*\\=")).test(e.cookie)?(a=new RegExp("(?:^|.*;\\s*)"+b.escape(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),a=b.unescape(e.cookie.replace(a,"$1"))):a=null;return a},k=function(a,h){var c;if(f())c=b.localStorage.setItem(a,h);else{if(a&&!/^(?:expires|max\-age|path|domain|secure)$/i.test(a)){c="";switch(Infinity.constructor){case Number:c=Infinity===Infinity?"; expires=Tue, 19 Jan 2038 03:14:07 GMT":"; max-age=Infinity";break;case String:c="; expires=Infinity";break;
case Date:c="; expires="+Infinity.toGMTString()}e.cookie=b.escape(a)+"="+b.escape(h)+c+"; path=/"}c=void 0}return c},m=function(a){var b,c,d;for(c=1;c<arguments.length;c++)for(d in b=arguments[c],b)b.hasOwnProperty(d)&&(a[d]=b[d]);return a},n={namespace:""};l.plugin("persistvolume",function(a){var b=this;a=m({},n,a||{});var c=a.namespace+"-volume",d=a.namespace+"-mute";b.on("volumechange",function(){k(c,b.volume());k(d,b.muted())});a=g(c);null!==a&&b.volume(a);a=g(d);null!==a&&b.muted("true"===a)})});

/* global videojs, YT */
(function(){function h(a,b,c){a.addEventListener?a.addEventListener(b,c,!0):a.attachEvent(b,c)}function g(a,b){if("undefined"===typeof a)return!1;try{a["innerText"in a?"innerText":"textContent"]=b}catch(c){a.setAttribute("innerText",b)}}videojs.Youtube=videojs.MediaTechController.extend({init:function(a,b,c){this.player_=a;this.featuresTimeupdateEvents=this.featuresProgressEvents=!1;this.featuresNativeTextTracks=this.featuresPlaybackRate=!0;videojs.MediaTechController.call(this,a,b,c);this.isIos=
/(iPad|iPhone|iPod)/g.test(navigator.userAgent);this.isAndroid=/(Android)/g.test(navigator.userAgent);this.playVideoIsAllowed=!(this.isIos||this.isAndroid);if(this.isIos||this.isAndroid)this.player_.options().autoplay=!1;if("undefined"!==typeof b.source)for(var d in b.source)b.source.hasOwnProperty(d)&&(a.options()[d]=b.source[d]);this.player_.options().playbackRates=[];this.userQuality=videojs.Youtube.convertQualityName(a.options().quality);this.playerEl_=a.el();this.playerEl_.className+=" vjs-youtube";
this.qualityButton=document.createElement("div");this.qualityButton.setAttribute("class","vjs-quality-button vjs-menu-button vjs-control");this.qualityButton.setAttribute("tabindex",0);b=document.createElement("div");b.setAttribute("class","vjs-control-content");this.qualityButton.appendChild(b);this.qualityTitle=document.createElement("span");this.qualityTitle.setAttribute("class","vjs-control-text");b.appendChild(this.qualityTitle);"undefined"!==a.options().quality&&g(this.qualityTitle,a.options().quality||
"auto");c=document.createElement("div");c.setAttribute("class","vjs-menu");b.appendChild(c);this.qualityMenuContent=document.createElement("ul");this.qualityMenuContent.setAttribute("class","vjs-menu-content");c.appendChild(this.qualityMenuContent);this.id_=this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});this.el_.setAttribute("allowFullScreen","");this.playerEl_.insertBefore(this.el_,
this.playerEl_.firstChild);/MSIE (\d+\.\d+);/.test(navigator.userAgent)?this.addIframeBlocker(Number(RegExp.$1)):/(iPad|iPhone|iPod|Android)/g.test(navigator.userAgent)||(this.el_.className+=" onDesktop",this.addIframeBlocker());this.parseSrc(a.options().src);this.playOnReady=this.player_.options().autoplay&&this.playVideoIsAllowed;this.forceHTML5=!("undefined"!==typeof this.player_.options().forceHTML5&&!0!==this.player_.options().forceHTML5);this.updateIframeSrc();var e=this;a.ready(function(){if(e.player_.options().controls){var b=
e.playerEl_.querySelectorAll(".vjs-control-bar")[0];b&&b.appendChild(e.qualityButton)}e.playOnReady&&!e.player_.options().ytcontrols&&("undefined"!==typeof e.player_.loadingSpinner&&e.player_.loadingSpinner.show(),"undefined"!==typeof e.player_.bigPlayButton&&e.player_.bigPlayButton.hide());a.trigger("loadstart")});this.on("dispose",function(){this.ytplayer&&this.ytplayer.destroy();this.player_.options().ytcontrols||this.player_.off("waiting",this.bindedWaiting);this.playerEl_.querySelectorAll(".vjs-poster")[0].style.backgroundImage=
"none";this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_);this.qualityButton.parentNode&&this.qualityButton.parentNode.removeChild(this.qualityButton);"undefined"!==typeof this.player_.loadingSpinner&&this.player_.loadingSpinner.hide();"undefined"!==typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.hide();this.iframeblocker&&this.playerEl_.removeChild(this.iframeblocker)})}});videojs.Youtube.prototype.loadThumbnailUrl=function(a,b){var c="https://img.youtube.com/vi/"+a+"/maxresdefault.jpg",
d="https://img.youtube.com/vi/"+a+"/0.jpg";try{var e=new Image;e.onload=function(){if("naturalHeight"in this){if(90>=this.naturalHeight||120>=this.naturalWidth){this.onerror();return}}else if(90>=this.height||120>=this.width){this.onerror();return}b(c)};e.onerror=function(){b(d)};e.src=c}catch(k){b(d)}};videojs.Youtube.prototype.updateIframeSrc=function(){var a="undefined"===typeof this.player_.options().ytFullScreenControls||this.player_.options().ytFullScreenControls?1:0,a={enablejsapi:1,iv_load_policy:3,
playerapiid:this.id(),disablekb:1,wmode:"transparent",controls:this.player_.options().ytcontrols?1:0,fs:a,html5:this.player_.options().forceHTML5?1:null,playsinline:this.player_.options().playsInline?1:0,showinfo:0,rel:0,autoplay:this.playOnReady?1:0,loop:this.player_.options().loop?1:0,list:this.playlistId,vq:this.userQuality,origin:window.location.protocol+"//"+window.location.host};"file:"!==window.location.protocol&&"app:"!==window.location.protocol||delete a.origin;for(var b in a)!a.hasOwnProperty(b)||
"undefined"!==typeof a[b]&&null!==a[b]||delete a[b];var c=this;this.videoId||this.playlistId?(this.el_.src="https://www.youtube.com/embed/"+(this.videoId||"videoseries")+"?"+videojs.Youtube.makeQueryString(a),this.player_.options().ytcontrols?this.player_.controls(!1):!this.videoId||"undefined"!==typeof this.player_.poster()&&0!==this.player_.poster().length||setTimeout(function(){c.loadThumbnailUrl(c.videoId,function(a){c.player_.poster(a)})},100),this.bindedWaiting=function(){c.onWaiting()},this.player_.on("waiting",
this.bindedWaiting),videojs.Youtube.apiReady?this.loadYoutube():(videojs.Youtube.loadingQueue.push(this),videojs.Youtube.apiLoading||(b=document.createElement("script"),b.onerror=function(a){c.onError(a)},b.src="https://www.youtube.com/iframe_api",a=document.getElementsByTagName("script")[0],a.parentNode.insertBefore(b,a),videojs.Youtube.apiLoading=!0))):(this.el_.src="about:blank",setTimeout(function(){c.triggerReady()},500))};videojs.Youtube.prototype.onWaiting=function(){"undefined"!==typeof this.player_.bigPlayButton&&
this.player_.bigPlayButton.hide()};videojs.Youtube.prototype.addIframeBlocker=function(a){this.iframeblocker=videojs.Component.prototype.createEl("div");this.iframeblocker.className="iframeblocker";this.iframeblocker.style.position="absolute";this.iframeblocker.style.left=0;this.iframeblocker.style.right=0;this.iframeblocker.style.top=0;this.iframeblocker.style.bottom=0;a&&9>a?this.iframeblocker.style.opacity=.01:this.iframeblocker.style.background="rgba(255, 255, 255, 0.01)";var b=this;h(this.iframeblocker,
"mousemove",function(a){b.player_.userActive()||b.player_.userActive(!0);a.stopPropagation();a.preventDefault()});h(this.iframeblocker,"click",function(){b.paused()?b.play():b.pause()});this.playerEl_.insertBefore(this.iframeblocker,this.el_.nextSibling)};videojs.Youtube.prototype.parseSrc=function(a){if(this.srcVal=a){var b=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);this.videoId=b&&11===b[2].length?b[2]:null;b=a.match(/[?&]list=([^#\&\?]+)/);null!==b&&1<b.length?this.playlistId=
b[1]:this.playlistId&&delete this.playlistId;b=a.match(/[?&]vq=([^#\&\?]+)/);null!==b&&1<b.length&&(this.userQuality=b[1],videojs.Youtube.appendQualityLabel(this.qualityTitle,this.userQuality))}};videojs.Youtube.prototype.src=function(a){if("undefined"!==typeof a){this.parseSrc(a);if("about:blank"===this.el_.src){this.updateIframeSrc();return}delete this.defaultQuality;if(null!==this.videoId){this.player_.options().autoplay&&this.playVideoIsAllowed?this.ytplayer.loadVideoById({videoId:this.videoId,
suggestedQuality:this.userQuality}):this.ytplayer.cueVideoById({videoId:this.videoId,suggestedQuality:this.userQuality});var b=this;this.loadThumbnailUrl(this.videoId,function(a){b.playerEl_.querySelectorAll(".vjs-poster")[0].style.backgroundImage="url("+a+")";b.player_.poster(a)})}}return this.srcVal};videojs.Youtube.prototype.load=function(){};videojs.Youtube.prototype.play=function(){null!==this.videoId&&(this.player_.options().ytcontrols||this.player_.trigger("waiting"),this.isReady_?(this.ytplayer.setVolume(100*
this.player_.volume()),0<this.volumeVal?this.ytplayer.unMute():this.ytplayer.mute(),this.playVideoIsAllowed&&this.ytplayer.playVideo()):this.playOnReady=!0)};videojs.Youtube.prototype.pause=function(){this.ytplayer&&this.ytplayer.pauseVideo()};videojs.Youtube.prototype.paused=function(){return this.ytplayer?this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING:!0};videojs.Youtube.prototype.currentTime=function(){return this.ytplayer&&this.ytplayer.getCurrentTime?this.ytplayer.getCurrentTime():
0};videojs.Youtube.prototype.setCurrentTime=function(a){this.lastState===YT.PlayerState.PAUSED&&(this.timeBeforeSeek=this.currentTime());this.ytplayer.seekTo(a,!0);this.player_.trigger("timeupdate");this.player_.trigger("seeking");this.isSeeking=!0;this.lastState===YT.PlayerState.PAUSED&&this.timeBeforeSeek!==a&&(this.checkSeekedInPauseInterval=setInterval(videojs.bind(this,function(){this.lastState===YT.PlayerState.PAUSED&&this.isSeeking?this.currentTime()!==this.timeBeforeSeek&&(this.player_.trigger("timeupdate"),
this.player_.trigger("seeked"),this.isSeeking=!1,clearInterval(this.checkSeekedInPauseInterval)):clearInterval(this.checkSeekedInPauseInterval)}),250))};videojs.Youtube.prototype.playbackRate=function(){return this.ytplayer&&this.ytplayer.getPlaybackRate?this.ytplayer.getPlaybackRate():1};videojs.Youtube.prototype.setPlaybackRate=function(a){if(this.ytplayer&&this.ytplayer.setPlaybackRate){this.ytplayer.setPlaybackRate(a);var b=this;setTimeout(function(){b.player_.trigger("ratechange")},100)}};videojs.Youtube.prototype.duration=
function(){return this.ytplayer&&this.ytplayer.getDuration?this.ytplayer.getDuration():0};videojs.Youtube.prototype.currentSrc=function(){return this.srcVal};videojs.Youtube.prototype.ended=function(){return this.ytplayer?this.lastState===YT.PlayerState.ENDED:!1};videojs.Youtube.prototype.volume=function(){this.ytplayer&&isNaN(this.volumeVal)&&(this.volumeVal=this.ytplayer.getVolume()/100,this.volumeVal=isNaN(this.volumeVal)?1:this.volumeVal,this.player_.volume(this.volumeVal));return this.volumeVal};
videojs.Youtube.prototype.setVolume=function(a){"undefined"!==typeof a&&a!==this.volumeVal&&(this.ytplayer.setVolume(100*a),this.volumeVal=a,this.player_.trigger("volumechange"))};videojs.Youtube.prototype.muted=function(){return this.mutedVal};videojs.Youtube.prototype.setMuted=function(a){a?(this.storedVolume=this.volumeVal,this.ytplayer.mute(),this.player_.volume(0)):(this.ytplayer.unMute(),this.player_.volume(this.storedVolume));this.mutedVal=a;this.player_.trigger("volumechange")};videojs.Youtube.prototype.buffered=
function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var a=this.ytplayer.getVideoBytesLoaded(),b=this.ytplayer.getVideoBytesTotal();if(!a||!b)return 0;var c=this.ytplayer.getDuration(),a=a/b*c,b=this.ytplayer.getVideoStartBytes()/b*c;return videojs.createTimeRange(b,b+a)}return videojs.createTimeRange(0,0)};videojs.Youtube.prototype.supportsFullScreen=function(){return"function"!==typeof this.el_.webkitEnterFullScreen||!/Android/.test(videojs.USER_AGENT)&&/Chrome|Mac OS X 10.5/.test(videojs.USER_AGENT)?
!1:!0};videojs.Youtube.isSupported=function(){return!0};videojs.Youtube.canPlaySource=function(a){return"video/youtube"===a.type};videojs.Youtube.canControlVolume=function(){return!0};videojs.Youtube.loadingQueue=[];videojs.Youtube.prototype.loadYoutube=function(){var a=this;this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(b){b.target.vjsTech.onReady();a.player_.trigger("ratechange")},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data)},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data)},
onError:function(a){a.target.vjsTech.onError(a.data)}}});this.ytplayer.vjsTech=this};videojs.Youtube.makeQueryString=function(a){var b=["modestbranding=1"],c;for(c in a)a.hasOwnProperty(c)&&b.push(c+"="+a[c]);return b.join("&")};window.onYouTubeIframeAPIReady=function(){for(var a;a=videojs.Youtube.loadingQueue.shift();)a.loadYoutube();videojs.Youtube.loadingQueue=[];videojs.Youtube.apiReady=!0};videojs.Youtube.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.player_.options().playbackRates=
this.ytplayer.getAvailablePlaybackRates();this.player_.controlBar.playbackRateMenuButton.update();this.player_.trigger("loadedmetadata");this.player_.trigger("durationchange");this.player_.trigger("timeupdate");"undefined"===typeof this.player_.loadingSpinner||this.isIos||this.isAndroid||this.player_.loadingSpinner.hide();this.player_.options().muted&&this.setMuted(!0);if(!this.videoId&&this.playlistId){this.videoId=this.ytplayer.getPlaylist()[0];var a=this;this.loadThumbnailUrl(this.videoId,function(b){a.player_.poster(b)})}this.playOnReady&&
(this.playOnReady=!1,this.play())};videojs.Youtube.prototype.updateCaptions=function(){this.ytplayer.loadModule("captions");this.ytplayer.loadModule("cc");var a=this.ytplayer.getOptions(),b=0<=a.indexOf("captions")?"captions":0<=a.indexOf("cc")?"cc":null;if(null!==b&&!this.tracked_&&(a=this.ytplayer.getOption(b,"tracklist"))&&0<a.length){for(var c=0;c<a.length;c++)this.addTextTrack("captions",a[c].displayName,a[c].languageCode);var d=this;this.textTracks().on("change",function(){for(var a=null,c=
0;c<this.length;c++)if("showing"===this[c].mode){a=this[c].language;break}null!==a?d.ytplayer.setOption(b,"track",{languageCode:a}):d.ytplayer.setOption(b,"track",{})});this.tracked_=!0}};videojs.Youtube.prototype.updateQualities=function(){function a(a){h(a,"click",function(){var a=this.getAttribute("data-val");c.ytplayer.setPlaybackQuality(a);c.userQuality=a;videojs.Youtube.appendQualityLabel(c.qualityTitle,a);(a=c.qualityMenuContent.querySelector(".vjs-selected"))&&videojs.Youtube.removeClass(a,
"vjs-selected");videojs.Youtube.addClass(this,"vjs-selected")})}var b=this.ytplayer.getAvailableQualityLevels(),c=this;0>b.indexOf(this.userQuality)&&videojs.Youtube.appendQualityLabel(c.qualityTitle,this.defaultQuality);if(0===b.length)this.qualityButton.style.display="none";else{for(this.qualityButton.style.display="";this.qualityMenuContent.hasChildNodes();)this.qualityMenuContent.removeChild(this.qualityMenuContent.lastChild);for(var d=0;d<b.length;++d){var e=document.createElement("li");e.setAttribute("class",
"vjs-menu-item");e.setAttribute("data-val",b[d]);videojs.Youtube.appendQualityLabel(e,b[d]);b[d]===this.quality&&videojs.Youtube.addClass(e,"vjs-selected");a(e);this.qualityMenuContent.appendChild(e)}}};videojs.Youtube.prototype.onStateChange=function(a){if(a!==this.lastState){switch(a){case -1:this.player_.trigger("durationchange");break;case YT.PlayerState.ENDED:var b=!0;this.playlistId&&!this.player_.options().loop&&(b=0===this.ytplayer.getPlaylistIndex());b&&(this.player_.options().ytcontrols||
(this.playerEl_.querySelectorAll(".vjs-poster")[0].style.display="block","undefined"!==typeof this.player_.bigPlayButton&&this.player_.bigPlayButton.show()),this.player_.trigger("pause"),this.player_.trigger("ended"));break;case YT.PlayerState.PLAYING:this.playerEl_.querySelectorAll(".vjs-poster")[0].style.display="none";this.playVideoIsAllowed=!0;this.updateQualities();this.updateCaptions();this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");
this.player_.trigger("play");this.isSeeking&&(this.player_.trigger("seeked"),this.isSeeking=!1);break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate"),this.player_.options().ytcontrols||this.player_.trigger("waiting")}this.lastState=a}};videojs.Youtube.convertQualityName=function(a){switch(a){case "144p":return"tiny";case "240p":return"small";case "360p":return"medium";case "480p":return"large";case "720p":return"hd720";
case "1080p":return"hd1080";case "1440p":return"hd1440";case "2160p":return"hd2160"}return"auto"};videojs.Youtube.parseQualityName=function(a){switch(a){case "tiny":return"144p";case "small":return"240p";case "medium":return"360p";case "large":return"480p";case "hd720":return"720p";case "hd1080":return"1080p";case "hd1440":return"1440p";case "hd2160":return"2160p"}return"auto"};videojs.Youtube.appendQualityLabel=function(a,b){g(a,videojs.Youtube.parseQualityName(b));var c=document.createElement("span");
c.setAttribute("class","vjs-hd-label");switch(b){case "hd720":case "hd1080":case "hd1440":g(c,"HD");a.appendChild(c);break;case "hd2160":g(c,"4K"),a.appendChild(c)}};videojs.Youtube.prototype.onPlaybackQualityChange=function(a){if("undefined"===typeof this.defaultQuality&&(this.defaultQuality=a,"undefined"!==typeof this.userQuality))return;this.quality=a;videojs.Youtube.appendQualityLabel(this.qualityTitle,a);switch(a){case "medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;case "large":this.player_.videoWidth=
640;this.player_.videoHeight=480;break;case "hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case "hd1080":this.player_.videoWidth=1440;this.player_.videoHeight=1080;break;case "highres":this.player_.videoWidth=1920;this.player_.videoHeight=1080;break;case "small":this.player_.videoWidth=320;this.player_.videoHeight=240;break;case "tiny":this.player_.videoWidth=144;this.player_.videoHeight=108;break;default:this.player_.videoWidth=0,this.player_.videoHeight=0}this.player_.trigger("ratechange")};
videojs.Youtube.prototype.onError=function(a){this.player_.error(a)};videojs.Youtube.addClass=function(a,b){-1===(" "+a.className+" ").indexOf(" "+b+" ")&&(a.className=""===a.className?b:a.className+" "+b)};videojs.Youtube.removeClass=function(a,b){var c,d;if(-1!==a.className.indexOf(b)){c=a.className.split(" ");for(d=c.length-1;0<=d;d--)c[d]===b&&c.splice(d,1);a.className=c.join(" ")}};var f=document.createElement("style");f.setAttribute("type","text/css");document.getElementsByTagName("head")[0].appendChild(f);
f.styleSheet?f.styleSheet.cssText=" .vjs-youtube .vjs-poster { background-size: 100%!important; }.vjs-youtube .vjs-poster, .vjs-youtube .vjs-loading-spinner, .vjs-youtube .vjs-big-play-button, .vjs-youtube .vjs-text-track-display{ pointer-events: none !important; }.vjs-youtube.vjs-user-active .iframeblocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-tech.onDesktop { pointer-events: none; }.vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }":f.appendChild(document.createTextNode(" .vjs-youtube .vjs-poster { background-size: 100%!important; }.vjs-youtube .vjs-poster, .vjs-youtube .vjs-loading-spinner, .vjs-youtube .vjs-big-play-button, .vjs-youtube .vjs-text-track-display{ pointer-events: none !important; }.vjs-youtube.vjs-user-active .iframeblocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-tech.onDesktop { pointer-events: none; }.vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }"));
Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c=this.length>>>0,d=Number(b)||0,d=0>d?Math.ceil(d):Math.floor(d);for(0>d&&(d+=c);d<c;d++)if(d in this&&this[d]===a)return d;return-1})})();

/* Vimeo Media Controller - Wrapper for Vimeo Media API */
var VimeoState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3
};

videojs.Vimeo=videojs.MediaTechController.extend({init:function(a,e,d){videojs.MediaTechController.call(this,a,e,d);if("undefined"!=typeof e.source)for(var h in e.source)a.options()[h]=e.source[h];this.player_=a;this.player_el_=document.getElementById(this.player_.id());this.player_.controls(!1);this.id_=this.player_.id()+"_vimeo_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",
mozallowfullscreen:"true",allowFullScreen:"true"});this.player_el_.insertBefore(this.el_,this.player_el_.firstChild);this.baseUrl=("file:"===document.location.protocol?"http:":document.location.protocol)+"//player.vimeo.com/video/";this.vimeo={};this.vimeoInfo={};var f=this;this.el_.onload=function(){f.onLoad()};this.startMuted=a.options().muted;this.src(a.options().src)}});
videojs.Vimeo.prototype.dispose=function(){this.vimeo.removeEvent("ready");this.vimeo.api("unload");delete this.vimeo;this.el_.parentNode.removeChild(this.el_);videojs.MediaTechController.prototype.dispose.call(this)};
videojs.Vimeo.prototype.src=function(a){this.isReady_=!1;if(a=a.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/))this.videoId=a[5];a={api:1,byline:0,portrait:0,show_title:0,show_byline:0,show_portait:0,fullscreen:1,player_id:this.id_,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0,color:this.player_.options().color||""};"#"===a.color.substring(0,1)&&(a.color=a.color.substring(1));this.el_.src=this.baseUrl+this.videoId+"?"+videojs.Vimeo.makeQueryString(a)};
videojs.Vimeo.prototype.load=function(){};videojs.Vimeo.prototype.play=function(){this.vimeo.api("play")};videojs.Vimeo.prototype.pause=function(){this.vimeo.api("pause")};videojs.Vimeo.prototype.paused=function(){return this.vimeoInfo.state!==VimeoState.PLAYING&&this.vimeoInfo.state!==VimeoState.BUFFERING};videojs.Vimeo.prototype.currentTime=function(){return this.vimeoInfo.time||0};videojs.Vimeo.prototype.setCurrentTime=function(a){this.vimeo.api("seekTo",a);this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.duration=function(){return this.vimeoInfo.duration||0};videojs.Vimeo.prototype.buffered=function(){return videojs.createTimeRange(0,this.vimeoInfo.buffered*this.vimeoInfo.duration||0)};videojs.Vimeo.prototype.volume=function(){return this.vimeoInfo.muted?this.vimeoInfo.muteVolume:this.vimeoInfo.volume};videojs.Vimeo.prototype.setVolume=function(a){this.vimeo.api("setvolume",a);this.vimeoInfo.volume=a;this.player_.trigger("volumechange")};
videojs.Vimeo.prototype.currentSrc=function(){return this.el_.src};videojs.Vimeo.prototype.muted=function(){return this.vimeoInfo.muted||!1};videojs.Vimeo.prototype.setMuted=function(a){a?(this.vimeoInfo.muteVolume=this.vimeoInfo.volume,this.setVolume(0)):this.setVolume(this.vimeoInfo.muteVolume);this.vimeoInfo.muted=a;this.player_.trigger("volumechange")};
videojs.Vimeo.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.player_.trigger("loadedmetadata");this.startMuted&&(this.setMuted(!0),this.startMuted=!1)};
videojs.Vimeo.prototype.onLoad=function(){this.vimeo&&this.vimeo.api&&(this.vimeo.api("unload"),delete this.vimeo);this.vimeo=$f(this.el_);this.vimeoInfo={state:VimeoState.UNSTARTED,volume:1,muted:!1,muteVolume:1,time:0,duration:0,buffered:0,url:this.baseUrl+this.videoId,error:null};var a=this;this.vimeo.addEvent("ready",function(e){a.onReady();a.vimeo.addEvent("loadProgress",function(d,e){a.onLoadProgress(d)});a.vimeo.addEvent("playProgress",function(d,e){a.onPlayProgress(d)});a.vimeo.addEvent("play",
function(d){a.onPlay()});a.vimeo.addEvent("pause",function(d){a.onPause()});a.vimeo.addEvent("finish",function(d){a.onFinish()});a.vimeo.addEvent("seek",function(d,e){a.onSeek(d)})})};videojs.Vimeo.prototype.onLoadProgress=function(a){var e=!this.vimeoInfo.duration;this.vimeoInfo.duration=a.duration;this.vimeoInfo.buffered=a.percent;this.player_.trigger("progress");e&&this.player_.trigger("durationchange")};videojs.Vimeo.prototype.onPlayProgress=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.onPlay=function(){this.vimeoInfo.state=VimeoState.PLAYING;this.player_.trigger("play")};videojs.Vimeo.prototype.onPause=function(){this.vimeoInfo.state=VimeoState.PAUSED;this.player_.trigger("pause")};videojs.Vimeo.prototype.onFinish=function(){this.vimeoInfo.state=VimeoState.ENDED;this.player_.trigger("ended")};videojs.Vimeo.prototype.onSeek=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate");this.player_.trigger("seeked")};
videojs.Vimeo.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};videojs.Vimeo.isSupported=function(){return!0};videojs.Vimeo.prototype.supportsFullScreen=function(){return!1};videojs.Vimeo.canPlaySource=function(a){return"video/vimeo"==a.type};videojs.Vimeo.makeQueryString=function(a){var e=[],d;for(d in a)a.hasOwnProperty(d)&&e.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));return e.join("&")};
var Froogaloop=function(){function a(m){return new a.fn.init(m)}function e(a,c,b){if(!b.contentWindow.postMessage)return!1;a=JSON.stringify({method:a,value:c});b.contentWindow.postMessage(a,k)}function d(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(d){}"ready"!=b||l||(l=!0);if(!/^https?:\/\/player.vimeo.com/.test(a.origin))return!1;"*"===k&&(k=a.origin);a=c.value;var e=c.data,g=""===g?null:c.player_id;c=g?f[g][b]:f[b];b=[];if(!c)return!1;void 0!==a&&b.push(a);e&&b.push(e);g&&b.push(g);
return 0<b.length?c.apply(null,b):c.call()}function h(a,c,b){b?(f[b]||(f[b]={}),f[b][a]=c):f[a]=c}var f={},l=!1,k="*";a.fn=a.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;return this},api:function(a,c){if(!this.element||!a)return!1;var b=this.element,d=""!==b.id?b.id:null,f=c&&c.constructor&&c.call&&c.apply?null:c,g=c&&c.constructor&&c.call&&c.apply?c:null;g&&h(a,g,d);e(a,f,b);return this},addEvent:function(a,c){if(!this.element)return!1;
var b=this.element,d=""!==b.id?b.id:null;h(a,c,d);"ready"!=a?e("addEventListener",a,b):"ready"==a&&l&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b=""!==c.id?c.id:null;a:{if(b&&f[b]){if(!f[b][a]){b=!1;break a}f[b][a]=null}else{if(!f[a]){b=!1;break a}f[a]=null}b=!0}"ready"!=a&&b&&e("removeEventListener",a,c)}};a.fn.init.prototype=a.fn;window.addEventListener?window.addEventListener("message",d,!1):window.attachEvent("onmessage",d);return window.Froogaloop=
window.$f=a}();

/*Video.js Hotkeys*/
(function(e,f){e.videojs_hotkeys={version:"0.2.5"};f.plugin("hotkeys",function(c){var a=this;c=c||{};var h=c.volumeStep||.1,g=c.seekStep||5,e=c.enableMute||!0,k=c.enableFullscreen||!0,f=c.enableNumbers||!0;a.el().hasAttribute("tabIndex")||a.el().setAttribute("tabIndex","-1");a.on("play",function(){var b=a.el().querySelector(".iframeblocker");b&&""==b.style.display&&(b.style.display="block",b.style.bottom="39px")});a.on("keydown",function(b){var d=b.which;if(a.controls()){var c=document.activeElement;
if(c==a.el()||c==a.el().querySelector(".vjs-tech")||c==a.el().querySelector(".vjs-control-bar")||c==a.el().querySelector(".iframeblocker"))switch(d){case 32:b.preventDefault();a.paused()?a.play():a.pause();break;case 37:b.preventDefault();b=a.currentTime()-g;a.currentTime()<=g&&(b=0);a.currentTime(b);break;case 39:b.preventDefault();a.currentTime(a.currentTime()+g);break;case 40:b.preventDefault();a.volume(a.volume()-h);break;case 38:b.preventDefault();a.volume(a.volume()+h);break;case 77:e&&(a.muted()?
a.muted(!1):a.muted(!0));break;case 70:k&&(a.isFullscreen()?a.exitFullscreen():a.requestFullscreen());break;default:(47<d&&59>d||95<d&&106>d)&&f&&(c=48,95<d&&(c=96),d-=c,b.preventDefault(),a.currentTime(a.duration()*d*.1))}}});a.on("dblclick",function(b){a.controls()&&(b=b.relatedTarget||b.toElement||document.activeElement,(b==a.el()||b==a.el().querySelector(".vjs-tech")||b==a.el().querySelector(".iframeblocker"))&&k&&(a.isFullscreen()?a.exitFullscreen():a.requestFullscreen()))});return this})})(window,
window.videojs);

/*
 *  Copyright (c) 2013 Funny or Die, Inc.
 *  http://www.funnyordie.com
 *  https://github.com/funnyordie/videojs-relatedCarousel/blob/master/LICENSE.md
 */
(function(e){var k=function(c){var d,b,a;for(b=1;b<arguments.length;b++)for(a in d=arguments[b],d)d.hasOwnProperty(a)&&(c[a]=d[a]);return c},l=[{imageSrc:"",title:"",url:""}];e.plugin("relatedCarousel",function(c){var d=this;c=k({},l,c||{});var b=document.createElement("div");b.className="vjs-related-carousel-holder";var a=document.createElement("h5");a.innerHTML="More Videos";b.appendChild(a);d.el().appendChild(b);for(var f in c){a=document.createElement("img");a.src=c[f].imageSrc;a.className="vjs-carousel-thumbnail";
a.alt=c[f].title;var g=document.createElement("a");g.href=c[f].url;g.appendChild(a);g.title=c[f].title;b.appendChild(g)}var h=e.Button.extend({init:function(a,b){e.Button.call(this,a,b)}});h.prototype.buttonText="Related Videos";h.prototype.buildCSSClass=function(){return"vjs-related-carousel-button "+e.Button.prototype.buildCSSClass.call(this)};h.prototype.onClick=function(a){b.classList.toggle("active")};d.ready(function(){new h(d);d.on("ended",function(){b.classList.toggle("active")})})})})(window.videojs);

/*! videojs-social - v1.5.1 - 2015-07-23
* Copyright (c) 2015 Brightcove; Licensed https://accounts.brightcove.com/en/terms-and-conditions */
!function(a,b){"use strict";var c=function(a){var b=this,c=!!b.ads,d=!1,e=!1,f=!1;c&&(b.on("adstart",function(){e=!0,f=!1}),b.on("adend",function(){e&&(f=!0)})),b.on("ended",function(){!d&&(!c||e&&f||!e&&!f)&&(d=!0),d&&c&&!f?b.on("adend",function(){b.trigger("endscreen")}):d&&b.trigger("endscreen")})};b.plugin("endscreen",c)}(window,window.videojs),function(a,b){"use strict";var c,d={title:"",description:"",url:"",deeplinking:!1,displayAfterVideo:!1,offset:"00:00:00",services:{facebook:!0,google:!0,twitter:!0,tumblr:!0,pinterest:!0,linkedin:!0}},e=function(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):(a.addEventListener||"click"!==b||(b="onclick"),a.attachEvent(b,c))};c=function(a){var c,e=this;if(c=b.util.mergeOptions(d,a),!(c&&c.services&&(c.services.facebook||c.services.twitter||c.services.google||c.services.tumblr||c.services.pinterest||c.services.linkedin)))throw new Error("videojs-social requires at least one service to be enabled");e.controlBar.socialButton&&(e.controlBar.removeChild(e.controlBar.socialButton),delete e.controlBar.socialButton,e.socialOverlay&&(e.removeChild(e.socialOverlay),delete e.socialOverlay)),e.controlBar.socialButton=e.controlBar.addChild("socialButton",c),e.socialOverlay=e.addChild("socialOverlay",c),e.controlBar.socialButton.el().setAttribute("tabindex","0"),c.displayAfterVideo&&(e.endscreen(),e.on("endscreen",function(){e.socialOverlay.enableRestartButton(),e.socialOverlay.show()}))},b.SocialButton=b.Button.extend({init:function(a,c){b.Button.call(this,a,c),this.on("touchstart",function(b){a.socialOverlay.update(),a.socialOverlay.disableRestartButton(),a.socialOverlay.show(),b.preventDefault()}),this.on("click",function(){a.socialOverlay.update(),a.socialOverlay.disableRestartButton(),a.socialOverlay.show()})}}),b.SocialButton.prototype.createEl=function(){return b.Button.prototype.createEl.call(this,"div",{className:"vjs-share-control vjs-control",role:"button","aria-live":"polite",innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">Share</span></div>'})},b.SocialOverlay=b.Component.extend({init:function(a,c){var d,f,g,h,i,j,k,l,m=a.poster();a.socialOverlay&&a.removeChild(a.socialOverlay),b.Component.call(this,a,c),this.el().querySelector(".vjs-social-embed-container input").setAttribute("value",this.getEmbedCode()),this.el().querySelector(".vjs-social-direct-link-container input").setAttribute("value",this._getUrlWithTime()),l=this.el().querySelector(".vjs-restart"),e(l,"click",b.bind(this,this._restartPlayer)),e(l,"activate",b.bind(this,this._restartPlayer)),h=encodeURIComponent(this._getUrl()),i=encodeURIComponent(this._getTitle()),j=encodeURIComponent(c.description),m&&(k=encodeURIComponent(m)),this._bindSocialButton(".vjs-share-facebook","https://www.facebook.com/sharer/sharer.php?u={URL}&title={TITLE}".replace("{URL}",h).replace("{TITLE}",i)),this._bindSocialButton(".vjs-share-gplus","https://plus.google.com/share?url={URL}".replace("{URL}",h)),this._bindSocialButton(".vjs-share-twitter","https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&text={TITLE}&tw_p=tweetbutton&url={URL}".replace("{URL}",h).replace("{TITLE}",i)),this._bindSocialButton(".vjs-share-tumblr","http://www.tumblr.com/share?v=3&u={URL}&t={TITLE}".replace("{URL}",h).replace("{TITLE}",i)),this._bindSocialButton(".vjs-share-pinterest","https://pinterest.com/pin/create/button/?url={URL}{POSTER}&description={TITLE}&is_video=true".replace("{URL}",h).replace("{TITLE}",i).replace("{POSTER}",k?"&media="+k:"")),this._bindSocialButton(".vjs-share-linkedin","https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}&summary={DESCRIPTION}&source=Classic".replace("{URL}",h).replace("{TITLE}",i).replace("{DESCRIPTION}",j)),c.deeplinking||(d=this.el().querySelector(".vjs-social-start"),d.className+=" vjs-hidden "),c.removeEmbed&&c.removeEmbed===!0&&(this.el().querySelector(".vjs-social-embed-container").className+=" vjs-hidden "),c.removeDirect&&c.removeDirect===!0&&(this.el().querySelector(".vjs-social-direct-link-container").className+=" vjs-hidden "),f=this.el().querySelector(".direct-link-textbox"),e(f,"click",function(){this.select()}),g=this.el().querySelector(".embed-code-textbox"),e(g,"click",function(){this.select()}),this.offsetTextBox=this.el().querySelector(".start-offset-textbox"),e(this.offsetTextBox,"change",b.bind(this,this.update)),this.closeButton=this.el().querySelector(".vjs-social-cancel"),e(this.el(),"keydown",function(b){"none"!==a.socialOverlay.el().display&&27===b.keyCode&&a.socialOverlay.hide()},!0),this.on("click",function(b){b.target===this.closeButton&&a.socialOverlay.hide()})},update:function(){var a,b=this.el().querySelector(".embed-code-textbox");/^\s*(0*[1-5]*\d|0*[1-5]*\d:[0-5]\d|\d+:[0-5]\d:[0-5]\d)\s*$/.test(this.offsetTextBox.value)?(a=this.el().querySelector(".direct-link-textbox"),this.offsetTextBox.className=this.offsetTextBox.className.replace(/(^|\s)vjs-invalid/,""),a.value=this._getUrlWithTime()):this.offsetTextBox.className+=" vjs-invalid",b.setAttribute("value",this.getEmbedCode())},enableRestartButton:function(){var a=this.el().querySelector(".vjs-restart");a.className=a.className.replace(/\bvjs\-hidden\b/,"")},disableRestartButton:function(){var a=this.el().querySelector(".vjs-restart");/\bvjs-hidden\b/.test(a.className)||(a.className+=" vjs-hidden")},hide:function(){b.Component.prototype.hide.call(this),this.previouslyPlaying&&this.player().play(),this.player().controlBar.socialButton.el().focus()},show:function(){b.Component.prototype.show.call(this),this.player().paused()||(this.previouslyPlaying=!0,this.player().pause()),this.el().querySelector(".vjs-share-options a:first-child").focus()}}),b.SocialOverlay.prototype.createEl=function(){var a=this.player(),c=this.options();return b.Component.prototype.createEl.call(this,"div",{className:"vjs-social-overlay vjs-hidden","aria-role":"dialog","aria-label":a.localize("Sharing Dialog"),tabindex:-1,innerHTML:'<div class="vjs-social-cancel" role="button"><div class="vjs-control-text" aria-label="'+a.localize("Close button")+'">'+a.localize("Close")+"</div></div><form><legend>"+a.localize("Share Video")+": "+this._getTitle()+"</legend><label>"+a.localize("Share via")+':<ul class="vjs-share-options">'+this._addSocialButtons(c.services)+'</ul></label><div class="vjs-social-link-options"><label class="vjs-social-start" aria-label="'+a.localize("Start From")+'">'+a.localize("Start From")+': <input class="start-offset-textbox" type="text" tabindex="9" title="The offset must be specified using the following pattern: hh:mm:ss" placeholder="hh:mm:ss" maxlength="10" value="'+c.offset+'" /></label><div class="vjs-social-direct-link-container"><label class="vjs-social-link" aria-label="Read Only: Direct Link To Content">'+a.localize("Direct Link")+': <input class="direct-link-textbox" type="text" tabindex="8" readonly="true" /></label></div></div><div class="vjs-social-embed-container"><label arial-label="Read Only: Embed Code">'+a.localize("Embed Code")+': <input class="embed-code-textbox" type="text" tabindex="10" readonly="true" /></label></div></form><button tabindex="0" class="vjs-restart vjs-hidden"><div class="vjs-control-content"><span class="vjs-control-text">'+a.localize("Restart")+"</span></div></button>"})},b.SocialOverlay.prototype.getEmbedCode=function(){var b,c,d,e,f,g,h;return g=this.player(),h=this.options(),b=h.deeplinking?this._convertOffset(h.offset):null,c=g.el().querySelector(".start-offset-textbox"),c&&h.deeplinking&&(b=this._convertOffset(c.value)),d=g.options(),d["data-embed-url"]&&(d["data-embed-url"]=encodeURI(d["data-embed-url"])),f="//players.brightcove.net/{{account_id}}/{{player_id}}_{{embed_id}}/index.html{{video_id}}",a.parent!=a&&(f=a.location.href),e=h.embedCode?h.embedCode:"<iframe src='"+f+"{{offset}}' allowfullscreen frameborder=0></iframe>",e.replace("{{account_id}}",d["data-account"]).replace("{{player_id}}",d["data-player"]).replace("{{embed_id}}",d["data-embed"]).replace("{{video_id}}",g.mediainfo&&g.mediainfo.id?"?videoId="+g.mediainfo.id:"").replace("{{offset}}",b?"#t="+b:"")},b.SocialOverlay.prototype._getUrl=function(){var b,c=this.options();return b=c.url?c.url:a.parent!=a?document.referrer:a.location.href},b.SocialOverlay.prototype._getUrlWithTime=function(){var a,b=this.options(),c=this._getUrl();return b.deeplinking&&(a=this._convertOffset(this.el().querySelector(".start-offset-textbox").value)),a&&(c=c+"#t="+a),c},b.SocialOverlay.prototype._getTitle=function(){var a,b=this.options(),c=this.player(),d=b.title;return d||(a=c.options(),a["data-media"]&&a["data-media"].title&&(d=a["data-media"].title)),d||""},b.SocialOverlay.prototype._convertOffset=function(a){var b,c,d,e=0,f=[1,60,3600],g="";if(a&&(b=a.split(":"),b.length>=1&&b.length<=3)){for(c=0;c<b.length;++c){if(d=parseInt(b[c],10)*f[b.length-1-c],isNaN(d))return"";e+=d}return g="",e>=3600&&0!==Math.floor(e/3600)&&(g=Math.floor(e/3600)+"h",e%=3600),e>=60&&0!==Math.floor(e/60)&&(g+=Math.floor(e/60)+"m",e%=60),e>0&&(g+=e+"s"),g}return""},b.SocialOverlay.prototype._bindSocialButton=function(b,c){var d,f;d=this.el().querySelector(b),f=function(b){b.preventDefault(),a.open(c,"_blank","width=600, height=400, top=100, left=100, titlebar=yes, modal=yes, resizable=yes, toolbar=no, status=1, location=no, menubar=no, centerscreen=yes")},d&&(d.href=c,e(d,"touchstart",f),e(d,"click",f))},b.SocialOverlay.prototype._addSocialButtons=function(a){var b,c;b="";for(c in a)a[c]===!0&&(b+=this._addServiceButton(c));return b},b.SocialOverlay.prototype._addServiceButton=function(a){var b="";switch(a){case"facebook":b='<li><a class="vjs-share-facebook" aria-role="link" aria-label="Share on Facebook" tabindex="1" title="Facebook" target="_blank"><span class="vjs-control-text">Facebook</span></a></li>';break;case"google":b='<li><a class="vjs-share-gplus" aria-role="link" aria-label="Share on Google Plus" tabindex="2" title="Google+" target="_blank"><span class="vjs-control-text">Google+</span></a></li>';break;case"twitter":b='<li><a class="vjs-share-twitter" aria-role="link" aria-label="Share on Twitter" tabindex="3" title="Twitter" target="_blank"><span class="vjs-control-text">Twitter</span></a></li>';break;case"tumblr":b='<li><a class="vjs-share-tumblr" aria-role="link" aria-label="Share on Tumblr" tabindex="4" title="Tumblr" target="_blank"><span class="vjs-control-text">tumblr</span></a></li>';break;case"pinterest":b='<li><a class="vjs-share-pinterest" aria-role="link" aria-label="Share on Pinterest" tabindex="5" title="Pinterest" target="_blank"><span class="vjs-control-text">Pinterest</span></a></li>';break;case"linkedin":b='<li><a class="vjs-share-linkedin" aria-role="link" aria-label="Share on LinkedIn" tabindex="6" title="LinkedIn" target="_blank"><span class="vjs-control-text">LinkedIn</span></a></li>';break;default:throw new Error("An unsupported social service was specified.")}return b},b.SocialOverlay.prototype._restartPlayer=function(){var a=this.player();a.socialOverlay.hide(),a.currentTime(0),a.play()},b.plugin("social",c)}(window,window.videojs);

(function(l,d){var g={content:""},b,f=function(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},h=function(a){setTimeout(function(){b.controlBar.socialButton.trigger("click")},100);a.preventDefault()},e=function(a,b){return'<button class="'+a+'" tabindex="0"><div class="vjs-control-content"><span class="vjs-control-text">'+b+"</span></div></button>"},k=function(a){setTimeout(function(){b.currentTime(0);b.play();b.customOverlay.hide()},100);a.preventDefault()};d.CustomOverlay=
d.Component.extend({init:function(a,b){a.customOverlay&&a.removeChild(a.customOverlay);var c='<div class="vjs-endscreen-overlay-content">'+a.localize(b.content)+'</div><div class="vjs-overlay-buttons">'+e("vjs-restart-control",a.localize("Restart"));a.social&&(c+=e("vjs-trigger-social-control",a.localize("Share")));c+="</div>";d.Component.call(this,a,{el:d.Component.prototype.createEl.call(this,"div",{className:"vjs-custom-overlay","aria-role":"dialog","aria-label":a.localize("Endscreen"),tabindex:-1,
innerHTML:c})});c=this.el().querySelector(".vjs-restart-control");f(c,"click",k)}});d.plugin("customEndscreen",function(a){var e=d.util.mergeOptions(g,a);b=this;b.endscreen();b.on("endscreen",function(){b.customOverlay=b.addChild("CustomOverlay",e);b.customOverlay.show();if(b.social){var a=b.el().querySelector(".vjs-trigger-social-control");f(a,"click",h)}})})})(window,window.videojs);

/*! videojs-progressTips - v0.1.0 - 2013-09-16
* https://github.com/mickey/videojs-progressTips
* Copyright (c) 2013 Michael Bensoussan; Licensed MIT */
(function(){videojs.plugin("progressTips",function(e){this.on("loadedmetadata",function(){var c;"Html5"===this.techName&&(c=this,$(".vjs-progress-control").after($("      <div id='vjs-tip'>      <div id='vjs-tip-arrow'></div>      <div id='vjs-tip-inner'></div>      </div>    ")),$(".vjs-progress-control").on("mousemove",function(d){var b,a;b=c.controlBar.progressControl.seekBar;a=(d.pageX-$(b.el()).offset().left)/b.width()*c.duration();a===c.duration()&&(a-=.1);b=Math.floor(a/60);a=Math.floor(a-
60*b);10>a&&(a="0"+a);$("#vjs-tip-inner").html(""+b+":"+a);b=$(".vjs-control-bar").height();$("#vjs-tip").css("bottom",""+(b+14)+"px").css("left",""+(d.pageX-$(this).offset().left-20)+"px").css("visibility","visible")}),$(".vjs-progress-control, .vjs-play-control").on("mouseout",function(){$("#vjs-tip").css("visibility","hidden")}))})})}).call(this);

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';
    if (typeof s[p] == 'string') {
        return true;
    }
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
            return true;
        }
    }
    return false;
}
videojs.plugin('OpenloadAnim', function(options) {
    if (!supportsTransitions()) return;
    var props = {
        id: 'anim-container',
        innerHTML: '<div id="playeranim"></div>'
    };
    var el = videojs.Component.prototype.createEl(null, props);
    this.bigPlayButton.el().parentNode.appendChild(el);
    document.getElementById("anim-container").style.visibility = "hidden";
    var playinganimation = false;

    function timeAnim() {
        window.setTimeout(function() {
            document.getElementById("anim-container").style.visibility = "hidden";
            document.getElementById("anim-container").className = "";
            playinganimation = false;
        }, 500);
    }
    $("video:first, #disRightClick, .vjs-control-bar .vjs-play-control").click("click", function(e) {
        if (playinganimation) return;
        playinganimation = true;
        if (this.paused()) {
            document.getElementById("anim-container").style.visibility = "visible";
            document.getElementById("anim-container").className = "pause anim";
            timeAnim();
        } else {
            document.getElementById("anim-container").style.visibility = "visible";
            document.getElementById("anim-container").className = "play anim";
            timeAnim();
        }
    }.bind(this));
});

/**
 * Video.js Resolution Selector
 * This plugin for Video.js adds a resolution selector option
 * to the toolbar. Usage:
 * <video>
 * 	<source data-res="480" src="..." />
 * 	<source data-res="240" src="..." />
 * </video>
 */
(function(c){var k={res_label:function(b){return/^\d+$/.test(b)?b+"p":b}};c.ResolutionMenuItem=c.MenuItem.extend({call_count:0,init:function(b,a){a.label=k.res_label(a.res);a.selected=a.res.toString()===b.getCurrentRes().toString();c.MenuItem.call(this,b,a);this.resolution=a.res;this.on(["click","tap"],this.onClick);b.on("changeRes",c.bind(this,function(){this.resolution==b.getCurrentRes()?this.selected(!0):this.selected(!1);this.call_count=0}))}});c.ResolutionMenuItem.prototype.onClick=function(){0<
this.call_count||(this.player().changeRes(this.resolution),this.call_count++)};c.ResolutionTitleMenuItem=c.MenuItem.extend({init:function(b,a){c.MenuItem.call(this,b,a);this.off("click")}});c.ResolutionSelector=c.MenuButton.extend({init:function(b,a){b.availableRes=a.available_res;c.MenuButton.call(this,b,a);this.el().firstChild.firstChild.innerHTML=a.buttonText}});c.ResolutionSelector.prototype.className="vjs-res-button";c.ResolutionSelector.prototype.createItems=function(){var b=this.player(),a=
[],g;a.push(new c.ResolutionTitleMenuItem(b,{el:c.Component.prototype.createEl("li",{className:"vjs-menu-title vjs-res-menu-title",innerHTML:b.localize("Quality")})}));for(g in b.availableRes)"length"!=g&&a.push(new c.ResolutionMenuItem(b,{res:g}));a.sort(function(a,b){return"undefined"==typeof a.resolution?-1:parseInt(b.resolution)-parseInt(a.resolution)});return a};c.plugin("resolutionSelector",function(b){if(this.el().firstChild.canPlayType){var a=this,g=a.options().sources,d=g.length;b=c.util.mergeOptions({default_res:"",
force_types:!1},b||{});for(var f={length:0},e,h=b.default_res&&"string"==typeof b.default_res?b.default_res.split(","):[];0<d;)d--,g[d]["data-res"]&&(e=g[d]["data-res"],"object"!==typeof f[e]&&(f[e]=[],f.length++),f[e].push(g[d]));if(b.force_types)for(e in f)if("length"!=e){d=b.force_types.length;for(found_types=0;0<d;)for(d--,g=f[e].length;0<g;)if(g--,b.force_types[d]===f[e][g].type){found_types++;break}found_types<b.force_types.length&&(delete f[e],f.length--)}if(!(2>f.length)){for(d=0;d<h.length;d++)if(f[h[d]]){a.src(f[h[d]]);
a.currentRes=h[d];break}"function"!==typeof a.localize&&(a.localize=function(a){return a});a.getCurrentRes=function(){if("undefined"!==typeof a.currentRes)return a.currentRes;try{return res=a.options().sources[0]["data-res"]}catch(b){return""}};a.changeRes=function(b){var c=a.el().firstChild,d=a.paused(),f=a.currentTime(),e;if(a.getCurrentRes()!=b&&a.availableRes&&a.availableRes[b]){"none"==c.preload&&(c.preload="metadata");a.src(a.availableRes[b]).one("loadedmetadata",function(){a.currentTime(f);
a.addClass("vjs-has-started");d||a.play()});a.currentRes=b;if(a.controlBar.resolutionSelector)for(c=a.controlBar.resolutionSelector.el().firstChild.children,e=c.length;0<e;)if(e--,"vjs-control-text"==c[e].className){c[e].innerHTML=k.res_label(b);break}a.trigger("changeRes")}};(e=a.getCurrentRes())&&(e=k.res_label(e));d=new c.ResolutionSelector(a,{buttonText:a.localize(e||"Quality"),available_res:f});a.controlBar.resolutionSelector=a.controlBar.addChild(d)}}})})(videojs);

/*!
 * @name videojs-upnext
 * @version 2.2.0
 * @author Fernando Godino <fernando@varsityviews.com>
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsUpnext = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));

var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

function getMainTemplate(options) {
  return '\n    <div class="vjs-upnext-top">\n      <span class="vjs-upnext-headtext">' + options.headText + '</span>\n      <div class="vjs-upnext-title"></div>\n    </div>\n    <div class="vjs-upnext-autoplay-icon">\n      <svg height="100%" version="1.1" viewbox="0 0 98 98" width="100%">\n        <circle class="vjs-upnext-svg-autoplay-circle" cx="49" cy="49" fill="#000" fill-opacity="0.8" r="48"></circle>\n        <circle class="vjs-upnext-svg-autoplay-ring" cx="-49" cy="49" fill-opacity="0" r="46.5" stroke="#FFFFFF" stroke-width="4" transform="rotate(-90)"></circle>\n        <polygon class="vjs-upnext-svg-autoplay-triangle" fill="#fff" points="32,27 72,49 32,71"></polygon></svg>\n    </div>\n    <span class="vjs-upnext-bottom">\n      <span class="vjs-upnext-cancel">\n        <button class="vjs-upnext-cancel-button" tabindex="0" aria-label="Cancel autoplay">' + options.cancelText + '</button>\n      </span>\n    </span>\n  ';
}

//var Component = videojs.getComponent('Component');

var Component = videojs.Component;

/**
 * EndCard Component
 */

var EndCard = function (_Component) {
  _inherits(EndCard, _Component);

  function EndCard(player, options) {
    _classCallCheck(this, EndCard);

    var _this = _possibleConstructorReturn(this, (EndCard.__proto__ || Object.getPrototypeOf(EndCard)).call(this, player, options));

    _this.getTitle = _this.options_.getTitle;
    _this.next = _this.options_.next;

    _this.upNextEvents = new videojs.EventTarget();

    _this.dashOffsetTotal = 586;
    _this.dashOffsetStart = 293;
    _this.interval = 50;
    _this.chunkSize = (_this.dashOffsetTotal - _this.dashOffsetStart) / (_this.options_.timeout / _this.interval);

    player.on('ended', function (event) {
      player.addClass('vjs-upnext--showing');
      _this.showCard(function (canceled) {
        player.removeClass('vjs-upnext--showing');
        _this.container.style.display = 'none';
        if (!canceled) {
          _this.next();
        }
      });
    });

    player.on('playing', function () {
      this.upNextEvents.trigger('playing');
    }.bind(_this));
    return _this;
  }

  _createClass(EndCard, [{
    key: 'createEl',
    value: function createEl() {

      var container = _get(EndCard.prototype.__proto__ || Object.getPrototypeOf(EndCard.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-upnext-content',
        innerHTML: getMainTemplate(this.options_)
      });

      this.container = container;
      container.style.display = 'none';

      this.autoplayRing = container.getElementsByClassName('vjs-upnext-svg-autoplay-ring')[0];
      this.title = container.getElementsByClassName('vjs-upnext-title')[0];
      this.cancelButton = container.getElementsByClassName('vjs-upnext-cancel-button')[0];
      this.nextButton = container.getElementsByClassName('vjs-upnext-autoplay-icon')[0];

      this.cancelButton.onclick = function () {
        this.upNextEvents.trigger('cancel');
      }.bind(this);

      this.nextButton.onclick = function () {
        this.upNextEvents.trigger('next');
      }.bind(this);

      return container;
    }
  }, {
    key: 'showCard',
    value: function showCard(cb) {

      var timeout = void 0;
      var start = void 0;
      var now = void 0;
      var newOffset = void 0;

      this.autoplayRing.setAttribute('stroke-dasharray', this.dashOffsetStart);
      this.autoplayRing.setAttribute('stroke-dashoffset', -this.dashOffsetStart);

      this.title.innerHTML = this.getTitle();

      this.upNextEvents.one('cancel', function () {
        clearTimeout(timeout);
        cb(true);
      });

      this.upNextEvents.one('playing', function () {
        clearTimeout(timeout);
        cb(true);
      });

      this.upNextEvents.one('next', function () {
        clearTimeout(timeout);
        cb(false);
      });

      var update = function update() {
        now = this.options_.timeout - (new Date().getTime() - start);

        if (now <= 0) {
          clearTimeout(timeout);
          cb(false);
        } else {
          newOffset = Math.max(-this.dashOffsetTotal, this.autoplayRing.getAttribute('stroke-dashoffset') - this.chunkSize);
          this.autoplayRing.setAttribute('stroke-dashoffset', newOffset);
          timeout = setTimeout(update.bind(this), this.interval);
        }
      };

      this.container.style.display = 'block';
      start = new Date().getTime();
      timeout = setTimeout(update.bind(this), this.interval);
    }
  }]);

  return EndCard;
}(Component);

//videojs.registerComponent('EndCard', EndCard);
videojs.Component.extend({init:EndCard});

var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-upnext');
};

var upnext = function upnext(options) {
  var _this2 = this;

  this.ready(function () {
    onPlayerReady(_this2, videojs.util.mergeOptions(defaults, options));
  });

  var opts = options || {};
  var settings = {
    next: opts.next,
    getTitle: opts.getTitle,
    timeout: opts.timeout || 5000,
    cancelText: opts.cancelText || 'Cancel',
    headText: opts.headText || 'Up Next'
  };

  this.appendChild('endCard', settings);
};

// Register the plugin with video.js.
registerPlugin('upnext', upnext);

// Include the version number.
upnext.VERSION = '2.2.0';

exports.EndCard = EndCard;
exports['default'] = upnext;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])(1)
});