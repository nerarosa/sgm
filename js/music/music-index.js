	var changeClass = function (r,className1,className2) {
		var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
		if( regex.test(r.className) ) {
			r.className = r.className.replace(regex,' '+className2+' ');
		}
		else{
			r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
		}
		return r.className;
	};	
	
	var menuElements = document.getElementById('menu');
	menuElements.insertAdjacentHTML('afterBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i> Menu</button>');

	document.getElementById('menutoggle').onclick = function() {
		changeClass(this, 'navtoogle active', 'navtoogle');
	}

	document.onclick = function(e) {
		var mobileButton = document.getElementById('menutoggle'),
			buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

		if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
			changeClass(mobileButton, 'navtoogle active', 'navtoogle');
		}
	}
	
	/** @preserve
 *
 * slippry v1.3.1 - Responsive content slider for jQuery
 * http://slippry.com
 *
 * Authors: Lukas Jakob Hafner - @saftsaak
 *          Thomas Hurd - @SeenNotHurd
 *
 * Copyright 2015, booncon oy - http://booncon.com
 *
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(a){"use strict";var b;b={slippryWrapper:'<div class="sy-box" />',slideWrapper:'<div class="sy-slides-wrap" />',slideCrop:'<div class="sy-slides-crop" />',boxClass:"sy-list",elements:"li",activeClass:"sy-active",fillerClass:"sy-filler",loadingClass:"sy-loading",adaptiveHeight:!0,start:1,loop:!0,captionsSrc:"img",captions:"overlay",captionsEl:".sy-caption",initSingle:!0,responsive:!0,preload:"visible",pager:!0,pagerClass:"sy-pager",controls:!0,controlClass:"sy-controls",prevClass:"sy-prev",prevText:"Previous",nextClass:"sy-next",nextText:"Next",hideOnEnd:!0,transition:"fade",kenZoom:120,slideMargin:0,transClass:"transition",speed:800,easing:"swing",continuous:!0,useCSS:!0,auto:!0,autoDirection:"next",autoHover:!0,autoHoverDelay:100,autoDelay:500,pause:4e3,onSliderLoad:function(){return this},onSlideBefore:function(){return this},onSlideAfter:function(){return this}},a.fn.slippry=function(c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;return e=this,0===e.length?this:e.length>1?(e.each(function(){a(this).slippry(c)}),this):(d={},d.vars={},n=function(){var a,b,c;b=document.createElement("div"),c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd",transition:"transitionEnd transitionend"};for(a in c)if(void 0!==b.style[a])return c[a]},w=function(){var a=document.createElement("div"),b=["Khtml","Ms","O","Moz","Webkit"],c=b.length;return function(d){if(d in a.style)return!0;for(d=d.replace(/^[a-z]/,function(a){return a.toUpperCase()});c--;)if(b[c]+d in a.style)return!0;return!1}}(),z=function(b,c){var d,e,f,g;return d=c.split("."),e=a(b),f="",g="",a.each(d,function(a,b){b.indexOf("#")>=0?f+=b.replace(/^#/,""):g+=b+" "}),f.length&&e.attr("id",f),g.length&&e.attr("class",a.trim(g)),e},A=function(){var a,b,c,e;c={},e={},a=100-d.settings.kenZoom,e.width=d.settings.kenZoom+"%",d.vars.active.index()%2===0?(e.left=a+"%",e.top=a+"%",c.left="0%",c.top="0%"):(e.left="0%",e.top="0%",c.left=a+"%",c.top=a+"%"),b=d.settings.pause+2*d.settings.speed,d.vars.active.css(e),d.vars.active.animate(c,{duration:b,easing:d.settings.easing,queue:!1})},l=function(){d.vars.fresh?(d.vars.slippryWrapper.removeClass(d.settings.loadingClass),d.vars.fresh=!1,d.settings.auto&&e.startAuto(),d.settings.useCSS||"kenburns"!==d.settings.transition||A(),d.settings.onSliderLoad.call(void 0,d.vars.active.index())):a("."+d.settings.fillerClass,d.vars.slideWrapper).addClass("ready")},q=function(b,c){var e,f,g;e=b/c,f=1/e*100+"%",g=a("."+d.settings.fillerClass,d.vars.slideWrapper),g.css({paddingTop:f}),l()},g=function(b){var c,d;void 0!==a("img",b).attr("src")?a("<img />").load(function(){c=b.width(),d=b.height(),q(c,d)}).attr("src",a("img",b).attr("src")):(c=b.width(),d=b.height(),q(c,d))},f=function(){if(0===a("."+d.settings.fillerClass,d.vars.slideWrapper).length&&d.vars.slideWrapper.append(a('<div class="'+d.settings.fillerClass+'" />')),d.settings.adaptiveHeight===!0)g(a("."+d.settings.activeClass,e));else{var b,c,f;c=0,f=0,a(d.vars.slides).each(function(){a(this).height()>c&&(b=a(this),c=b.height()),f+=1,f===d.vars.count&&(void 0===b&&(b=a(a(d.vars.slides)[0])),g(b))})}},p=function(){d.settings.pager&&(a("."+d.settings.pagerClass+" li",d.vars.slippryWrapper).removeClass(d.settings.activeClass),a(a("."+d.settings.pagerClass+" li",d.vars.slippryWrapper)[d.vars.active.index()]).addClass(d.settings.activeClass))},u=function(){!d.settings.loop&&d.settings.hideOnEnd&&(a("."+d.settings.prevClass,d.vars.slippryWrapper)[d.vars.first?"hide":"show"](),a("."+d.settings.nextClass,d.vars.slippryWrapper)[d.vars.last?"hide":"show"]())},i=function(){var b,c;d.settings.captions!==!1&&(b="img"!==d.settings.captionsSrc?d.vars.active.attr("title"):void 0!==a("img",d.vars.active).attr("title")?a("img",d.vars.active).attr("title"):a("img",d.vars.active).attr("alt"),c="custom"!==d.settings.captions?a(d.settings.captionsEl,d.vars.slippryWrapper):a(d.settings.captionsEl),void 0!==b&&""!==b?c.html(b).show():c.hide())},e.startAuto=function(){void 0===d.vars.timer&&void 0===d.vars.delay&&(d.vars.delay=window.setTimeout(function(){d.vars.autodelay=!1,d.vars.timer=window.setInterval(function(){d.vars.trigger="auto",t(d.settings.autoDirection)},d.settings.pause)},d.vars.autodelay?d.settings.autoHoverDelay:d.settings.autoDelay),d.settings.autoHover&&d.vars.slideWrapper.unbind("mouseenter").unbind("mouseleave").bind("mouseenter",function(){void 0!==d.vars.timer?(d.vars.hoverStop=!0,e.stopAuto()):d.vars.hoverStop=!1}).bind("mouseleave",function(){d.vars.hoverStop&&(d.vars.autodelay=!0,e.startAuto())}))},e.stopAuto=function(){window.clearInterval(d.vars.timer),d.vars.timer=void 0,window.clearTimeout(d.vars.delay),d.vars.delay=void 0},e.refresh=function(){d.vars.slides.removeClass(d.settings.activeClass),d.vars.active.addClass(d.settings.activeClass),d.settings.responsive?f():l(),u(),p(),i()},s=function(){e.refresh()},m=function(){d.vars.moving=!1,d.vars.active.removeClass(d.settings.transClass),d.vars.fresh||d.vars.old.removeClass("sy-ken"),d.vars.old.removeClass(d.settings.transClass),d.settings.onSlideAfter.call(void 0,d.vars.active,d.vars.old.index(),d.vars.active.index()),d.settings.auto&&(d.vars.hoverStop&&void 0!==d.vars.hoverStop||e.startAuto())},r=function(){var b,c,f,g,h,i,j;d.settings.onSlideBefore.call(void 0,d.vars.active,d.vars.old.index(),d.vars.active.index()),d.settings.transition!==!1?(d.vars.moving=!0,"fade"===d.settings.transition||"kenburns"===d.settings.transition?(d.vars.fresh?(d.settings.useCSS?d.vars.slides.css({transitionDuration:d.settings.speed+"ms",opacity:0}):d.vars.slides.css({opacity:0}),d.vars.active.css("opacity",1),"kenburns"===d.settings.transition&&d.settings.useCSS&&(h=d.settings.pause+2*d.settings.speed,d.vars.slides.css({animationDuration:h+"ms"}),d.vars.active.addClass("sy-ken")),m()):d.settings.useCSS?(d.vars.old.addClass(d.settings.transClass).css("opacity",0),d.vars.active.addClass(d.settings.transClass).css("opacity",1),"kenburns"===d.settings.transition&&d.vars.active.addClass("sy-ken"),a(window).off("focus").on("focus",function(){d.vars.moving&&d.vars.old.trigger(d.vars.transition)}),d.vars.old.one(d.vars.transition,function(){return m(),this})):("kenburns"===d.settings.transition&&A(),d.vars.old.addClass(d.settings.transClass).animate({opacity:0},d.settings.speed,d.settings.easing,function(){m()}),d.vars.active.addClass(d.settings.transClass).css("opacity",0).animate({opacity:1},d.settings.speed,d.settings.easing)),s()):("horizontal"===d.settings.transition||"vertical"===d.settings.transition)&&(i="horizontal"===d.settings.transition?"left":"top",b="-"+d.vars.active.index()*(100+d.settings.slideMargin)+"%",d.vars.fresh?(e.css(i,b),m()):(j={},d.settings.continuous&&(!d.vars.jump||"controls"!==d.vars.trigger&&"auto"!==d.vars.trigger||(c=!0,g=b,d.vars.first?(f=0,d.vars.active.css(i,d.vars.count*(100+d.settings.slideMargin)+"%"),b="-"+d.vars.count*(100+d.settings.slideMargin)+"%"):(f=(d.vars.count-1)*(100+d.settings.slideMargin)+"%",d.vars.active.css(i,-(100+d.settings.slideMargin)+"%"),b=100+d.settings.slideMargin+"%"))),d.vars.active.addClass(d.settings.transClass),d.settings.useCSS?(j[i]=b,j.transitionDuration=d.settings.speed+"ms",e.addClass(d.settings.transition),e.css(j),a(window).off("focus").on("focus",function(){d.vars.moving&&e.trigger(d.vars.transition)}),e.one(d.vars.transition,function(){return e.removeClass(d.settings.transition),c&&(d.vars.active.css(i,f),j[i]=g,j.transitionDuration="0ms",e.css(j)),m(),this})):(j[i]=b,e.stop().animate(j,d.settings.speed,d.settings.easing,function(){return c&&(d.vars.active.css(i,f),e.css(i,g)),m(),this}))),s())):(s(),m())},v=function(a){d.vars.first=d.vars.last=!1,"prev"===a||0===a?d.vars.first=!0:("next"===a||a===d.vars.count-1)&&(d.vars.last=!0)},t=function(b){var c,f;d.vars.moving||("auto"!==d.vars.trigger&&e.stopAuto(),c=d.vars.active.index(),"prev"===b?(f=b,c>0?b=c-1:d.settings.loop&&(b=d.vars.count-1)):"next"===b?(f=b,c<d.vars.count-1?b=c+1:d.settings.loop&&(b=0)):(b-=1,f=c>b?"prev":"next"),d.vars.jump=!1,"prev"===b||"next"===b||b===c&&!d.vars.fresh||(v(b),d.vars.old=d.vars.active,d.vars.active=a(d.vars.slides[b]),(0===c&&"prev"===f||c===d.vars.count-1&&"next"===f)&&(d.vars.jump=!0),r()))},e.goToSlide=function(a){d.vars.trigger="external",t(a)},e.goToNextSlide=function(){d.vars.trigger="external",t("next")},e.goToPrevSlide=function(){d.vars.trigger="external",t("prev")},j=function(){if(d.settings.pager&&d.vars.count>1){var b,c,e;for(b=d.vars.slides.length,e=a('<ul class="'+d.settings.pagerClass+'" />'),c=1;b+1>c;c+=1)e.append(a("<li />").append(a('<a href="#'+c+'">'+c+"</a>")));d.vars.slippryWrapper.append(e),a("."+d.settings.pagerClass+" a",d.vars.slippryWrapper).click(function(){return d.vars.trigger="pager",t(parseInt(this.hash.split("#")[1],10)),!1}),p()}},k=function(){d.settings.controls&&d.vars.count>1&&(d.vars.slideWrapper.append(a('<ul class="'+d.settings.controlClass+'" />').append('<li class="'+d.settings.prevClass+'"><a href="#prev">'+d.settings.prevText+"</a></li>").append('<li class="'+d.settings.nextClass+'"><a href="#next">'+d.settings.nextText+"</a></li>")),a("."+d.settings.controlClass+" a",d.vars.slippryWrapper).click(function(){return d.vars.trigger="controls",t(this.hash.split("#")[1]),!1}),u())},o=function(){d.settings.captions!==!1&&("overlay"===d.settings.captions?d.vars.slideWrapper.append(a('<div class="sy-caption-wrap" />').html(z("<div />",d.settings.captionsEl))):"below"===d.settings.captions&&d.vars.slippryWrapper.append(a('<div class="sy-caption-wrap" />').html(z("<div />",d.settings.captionsEl))))},y=function(){t(d.vars.active.index()+1)},x=function(b){var c,e,f,g;return g="all"===d.settings.preload?b:d.vars.active,f=a("img, iframe",g),c=f.length,0===c?void y():(e=0,void f.each(function(){a(this).one("load error",function(){++e===c&&y()}).each(function(){this.complete&&a(this).load()})}))},e.getCurrentSlide=function(){return d.vars.active},e.getSlideCount=function(){return d.vars.count},e.destroySlider=function(){d.vars.fresh===!1&&(e.stopAuto(),d.vars.moving=!1,d.vars.slides.each(function(){void 0!==a(this).data("sy-cssBckup")?a(this).attr("style",a(this).data("sy-cssBckup")):a(this).removeAttr("style"),void 0!==a(this).data("sy-classBckup")?a(this).attr("class",a(this).data("sy-classBckup")):a(this).removeAttr("class")}),void 0!==e.data("sy-cssBckup")?e.attr("style",e.data("sy-cssBckup")):e.removeAttr("style"),void 0!==e.data("sy-classBckup")?e.attr("class",e.data("sy-classBckup")):e.removeAttr("class"),d.vars.slippryWrapper.before(e),d.vars.slippryWrapper.remove(),d.vars.fresh=void 0)},e.reloadSlider=function(){e.destroySlider(),h()},h=function(){var f;return d.settings=a.extend({},b,c),d.vars.slides=a(d.settings.elements,e),d.vars.count=d.vars.slides.length,d.settings.useCSS&&(w("transition")||(d.settings.useCSS=!1),d.vars.transition=n()),e.data("sy-cssBckup",e.attr("style")),e.data("sy-classBackup",e.attr("class")),e.addClass(d.settings.boxClass).wrap(d.settings.slippryWrapper).wrap(d.settings.slideWrapper).wrap(d.settings.slideCrop),d.vars.slideWrapper=e.parent().parent(),d.vars.slippryWrapper=d.vars.slideWrapper.parent().addClass(d.settings.loadingClass),d.vars.fresh=!0,d.vars.slides.each(function(){a(this).addClass("sy-slide "+d.settings.transition),d.settings.useCSS&&a(this).addClass("useCSS"),"horizontal"===d.settings.transition?a(this).css("left",a(this).index()*(100+d.settings.slideMargin)+"%"):"vertical"===d.settings.transition&&a(this).css("top",a(this).index()*(100+d.settings.slideMargin)+"%")}),d.vars.count>1||d.settings.initSingle?(-1===a("."+d.settings.activeClass,e).index()?(f="random"===d.settings.start?Math.round(Math.random()*(d.vars.count-1)):d.settings.start>0&&d.settings.start<=d.vars.count?d.settings.start-1:0,d.vars.active=a(d.vars.slides[f]).addClass(d.settings.activeClass)):d.vars.active=a("."+d.settings.activeClass,e),k(),j(),o(),x(d.vars.slides),void 0):this},h(),this)}}(jQuery);

/* ThumbnailSlider Slider v2015.10.26. Copyright(C) www.menucool.com. All rights reserved. */
function ThumbnailSlider(a){"use strict";if(typeof String.prototype.trim!=="function")String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};var g="length",l=document,Mb=function(c){var a=c.childNodes;if(a&&a[g]){var b=a[g];while(b--)a[b].nodeType!=1&&a[b][m].removeChild(a[b])}},db=function(a){if(a&&a.stopPropagation)a.stopPropagation();else if(a&&typeof a.cancelBubble!="undefined")a.cancelBubble=true},cb=function(b){var a=b||window.event;if(a.preventDefault)a.preventDefault();else if(a)a.returnValue=false},Qb=function(b){if(typeof b[e].webkitAnimationName!="undefined")var a="-webkit-";else a="";return a},Kb=function(){var b=l.getElementsByTagName("head");if(b[g]){var a=l.createElement("style");b[0].appendChild(a);return a.sheet?a.sheet:a.styleSheet}else return 0},xb=["$1$2$3","$1$2$3","$1$24","$1$23","$1$22"],vb=function(d,c){for(var b=[],a=0;a<d[g];a++)b[b[g]]=String[kb](d[Y](a)-(c?c:3));return "mylicense"},Vb=function(a){return a.replace("","$1$3$2")},wb=["","","",""],p=window.setTimeout,s="nextSibling",q="previousSibling",Ub=l.all&&!window.atob,o={};o.a=Kb();var mb=function(b){b="#"+a.b+b.replace("__",o.p);o.a.insertRule(b,0)},Db=function(a,c,f,e,b){var d="@"+o.p+"keyframes "+a+" {from{"+c+";} to{"+f+";}}";o.a.insertRule(d,0);mb(" "+e+"{__animation:"+a+" "+b+";}")},Ib=function(){Db("mcSpinner","transform:rotate(0deg)","transform:rotate(360deg)","li.loading::after",".7s linear infinite");mb(" ul li.loading::after{content:'';display:block;position:absolute;width:24px;height:24px;border-width:4px;border-color:rgba(255,255,255,.8);border-style:solid;border-top-color:black;border-right-color:rgba(0,0,0,.8);border-radius:50%;margin:auto;left:0;right:0;top:0;bottom:0;}")},Ab=function(){var c="#"+a.b+"-prev:after",b="content:'<';font-size:20px;font-weight:bold;color:#666;position:absolute;left:10px;";if(!a.c)b=b.replace("<","^");o.a.addRule(c,b,0);o.a.addRule(c.replace("prev","next"),b.replace("<",">").replace("^","v").replace("left","right"),0)},E,N,A,B,C,rb,L={},w={},z;E=(navigator.msPointerEnabled||navigator.pointerEnabled)&&(navigator.msMaxTouchPoints||navigator.maxTouchPoints);var Bb=function(a){return A=="pointerdown"&&(a.pointerType==a.MSPOINTER_TYPE_MOUSE||a.pointerType=="mouse")};N="ontouchstart"in window||window.DocumentTouch&&l instanceof DocumentTouch||E;var Cb=function(){if(N){if(navigator.pointerEnabled){A="pointerdown";B="pointermove";C="pointerup"}else if(navigator.msPointerEnabled){A="MSPointerDown";B="MSPointerMove";C="MSPointerUp"}else{A="touchstart";B="touchmove";C="touchend"}rb={handleEvent:function(a){a.preventManipulation&&a.preventManipulation();switch(a.type){case A:this.a(a);break;case B:this.b(a);break;case C:this.c(a)}db(a)},a:function(a){if(Bb(a))return;var c=E?a:a.touches[0];L={x:c[ab],y:c[bb],l:b.pS};z=null;w={};b[t](B,this,false);b[t](C,this,false)},b:function(a){if(!E&&(a.touches[g]>1||a.scale&&a.scale!==1))return;var b=E?a:a.touches[0];w={x:b[ab]-L.x,y:b[bb]-L.y};if(z===null)z=!!(z||Math.abs(w.x)<Math.abs(w.y));if(!z){cb(a);V=0;ub();i(L.l+w.x,1)}},c:function(){if(z===false){var e=f,l=Math.abs(w.x)>30;if(l){var g=w.x>0?1:-1,m=g*w.x*1.5/c[f][h];if(g===1&&a.f==3&&!c[f][q]){var k=b.firstChild[d];b.insertBefore(b.lastChild,b.firstChild);i(b.pS+k-b.firstChild[s][d],1);e=K(--e)}else for(var j=0;j<=m;j++){if(g===1){if(c[e][q])e--}else if(c[e][s])e++;e=K(e)}n(e,4)}else{i(L.l);if(a.g)Q=window.setInterval(function(){J(f+1,0)},a.i)}p(function(){V=1},500)}b.removeEventListener(B,this,false);b.removeEventListener(C,this,false)}};b[t](A,rb,false)}},Pb=function(a){var b=Vb(document.domain.replace("www.",""));try{typeof atob=="function"&&(function(a,c){var b=vb(atob("dy13QWgsLT9taixPLHowNC1BQStwKyoqTyx6MHoycGlya3hsMTUtQUEreCstd0E0P21qLHctd19uYTJtcndpdnhGaWpzdmksbV9rKCU2NiU3NSU2RSUlNjYlNzUlNkUlNjMlNzQlNjklNkYlNkUlMjAlNjUlMjglKSo8Zy9kYm1tKXVpanQtMio8aCkxKjxoKTIqPGpnKW4+SylvLXAqKnx3YnMhcz5OYnVpL3Nib2VwbikqLXQ+ZAFeLXY+bCkoV3BtaGl2JHR5dmdsZXdpJHZpcW1yaGl2KCotdz4ocWJzZm91T3BlZig8ZHBvdHBtZi9tcGgpcyo8amcpdC9vcGVmT2JuZj4+KEIoKnQ+ayl0KgE8amcpcz8vOSp0L3RmdUJ1dXNqY3Z1ZikoYm11KC12KjxmbXRmIWpnKXM/LzgqfHdic3I+ZXBkdm5mb3UvZHNmYnVmVWZ5dU9wZWYpdiotRz5td3I1PGpnKXM/Lzg2Kkc+R3cvam90ZnN1Q2ZncHNmKXItRypzZnV2c28hdWlqdDw2OSU2RiU2RSU8amcpcz8vOSp0L3RmdUJ1dXNqY3Z1ZikoYm11cGR2bmYlJG91L2RzZmJ1ZlVmeQ=="),a[g]+parseInt(a.charAt(1))).substr(0,3);typeof this[b]==="function"&&this[b](c,wb,xb)})(b,a)}catch(c){}},e="style",t="addEventListener",r="className",m="parentNode",kb="fromCharCode",Y="charCodeAt",Sb=function(a){for(var c,d,b=a[g];b;c=parseInt(Math.random()*b),d=a[--b],a[b]=a[c],a[c]=d);return a},Rb=function(a,c){var b=a[g];while(b--)if(a[b]===c)return true;return false},I=function(a,c){var b=false;if(a[r])b=Rb(a[r].split(" "),c);return b},P=function(a,b,c){if(!I(a,b))if(a[r]=="")a[r]=b;else if(c)a[r]=b+" "+a[r];else a[r]+=" "+b},H=function(c,e){if(c[r]){for(var d="",b=c[r].split(" "),a=0,f=b[g];a<f;a++)if(b[a]!==e)d+=b[a]+" ";c[r]=d.trim()}},K=function(b){var a=c[g];return b>=0?b%a:(a+b%a)%a},v=function(a,c,b){if(a[t])a[t](c,b,false);else a.attachEvent&&a.attachEvent("on"+c,b)},i=function(d,f){var c=b[e];if(o.c){c.webkitTransitionDuration=c.transitionDuration=(f?0:a.j)+"ms";c.webkitTransform=c.transform="translate"+(a.c?"X(":"Y(")+d+"px)"}else c[lb]=d+"px";b.pS=d},ob=function(a){return!a.complete?0:a.width===0?0:1},M=null,j,x=0,b,c=[],f=0,Q,Wb,R=0,fb=0,tb,y=0,V=1,Z,ib,d,h,k,lb,u=0,ab,bb,sb,Lb=function(b){if(!b.zimg){b.zimg=1;b.thumb=b.thumbSrc=0;var h=b.getElementsByTagName("*");if(h[g])for(var i=0;i<h[g];i++){var d=h[i];if(I(d,"thumb")){if(d.tagName=="A"){var c=d.getAttribute("href");d[e].backgroundImage="url('"+c+"')"}else if(d.tagName=="IMG")c=d.src;else{c=d[e].backgroundImage;if(c&&c.indexOf("url(")!=-1)c=c.substring(4,c[g]-1).replace(/[\'\"]/g,"")}if(d[m].tagName!="A")d[e].cursor=a.h?"pointer":"default";if(c){b.thumb=d;b.thumbSrc=c;var f=new Image;f.onload=f.onerror=function(){b.zimg=1;var a=this;if(a.width&&a.height){H(b,"loading");O(b,a)}else O(b,0);p(function(){a=null},20)};f.src=c;if(ob(f)){b.zimg=1;O(b,f);f=null}else{P(b,"loading");b.zimg=f}}break}}}if(b.zimg!==1&&ob(b.zimg)){H(b,"loading");O(b,b.zimg);b.zimg=1}},qb=0,jb=function(a){return f==0&&a==c[g]-1},nb=function(i,m){var l=c[i],e=1;if(a.f==3)if(m==4)e=l[d]>=c[f][d];else e=i>f&&!jb(i)||f==c[g]-1&&i==0;else if(m==4)if(b.pS+l[d]<20)e=0;else if(b.pS+l[d]+l[h]>=j[k])e=1;else e=-1;else e=i>=f&&!jb(i);return e},F=function(a){return a.indexOf("%")!=-1?parseFloat(a)/100:parseInt(a)},Fb=function(a,d,c){if(d.indexOf("px")!=-1&&c.indexOf("px")!=-1){a[e].width=d;a[e].height=c}else{var b=a[q];if(!b||!b[e].width)b=a[s];if(b&&b[e].width){a[e].width=b[e].width;a[e].height=b[e].height}else a[e].width=a[e].height="64px"}},O=function(p,k){var j=a.d,d=a.e;if(!k)Fb(p,j,d);else{var i=k.naturalWidth||k.width,h=k.naturalHeight||k.height,f="width",g="height",c=p[e];if(j=="auto")if(d=="auto"){c[g]=h+"px";c[f]=i+"px"}else if(d.indexOf("%")!=-1){var o=(window.innerHeight||l.documentElement.clientHeight)*F(d);c[g]=o+"px";c[f]=i/h*o+"px";if(!a.c)b[m][e].width=c[f]}else{c[g]=d;c[f]=i/h*F(d)+"px"}else if(j.indexOf("%")!=-1)if(d=="auto"||d.indexOf("%")!=-1){var n=F(j),q=b[m][m].clientWidth;if(!a.c&&n<.71&&q<415)n=.9;var r=q*n;c[f]=r+"px";c[g]=h/i*r+"px";if(!a.c)b[m][e].width=c[f]}else{c[f]=i/h*F(d)+"px";c[g]=d}else{c[f]=j;if(d=="auto"||d.indexOf("%")!=-1)c[g]=h/i*F(j)+"px";else c[g]=d}}},G=function(d,i,l,o){var f=x||5,r=0;if(a.f==3&&i)if(l)var e=Math.ceil(f/2),m=d-e,n=d+e+1;else{m=d-f;n=d+1}else{e=f;if(o)e=e*2;if(l){m=d;n=d+e+1}else{m=d-e-1;n=d}}for(var q=m;q<n;q++){e=K(q);Lb(c[e]);if(c[e].zimg!==1)r=1}if(i){!qb++&&Gb();if((!r||qb>10)&&M)if(b[h]>j[k]||x>=c[g]){x=f+2;if(x>c[g])x=c[g];Jb()}else{x=f+1;G(d,i,l,o)}else p(function(){G(d,i,l,o)},500)}},S=function(a){return b.pS+a[d]<0?a:a[q]?S(a[q]):a},D=function(a){return b.pS+a[d]+a[h]>j[k]?a:a[s]?D(a[s]):a},T=function(a,b){return b[d]-a[d]+20>j[k]?a[s]:a[q]?T(a[q],b):a},zb=function(c){if(a.f==2)var b=c;else b=S(c);if(b[q])b=T(b,b);return b},Nb=function(g,l){g=K(g);var e=c[g];if(f==g&&l!=4&&a.f!=3)return g;var m=nb(g,l);if(a.f==3){if(l&&l!=3&&l!=4)e=m?D(c[f]):S(c[f]);i(-e[d]+(j[k]-e[h])/2,l==3)}else if(l===4){if(b.pS+e[d]<20){e=T(c[g],c[g]);if(e[q])i(-e[d]+u);else{i(80);p(function(){i(0)},a.j/2)}}else if(a.o===0&&!e[s]&&b.pS+b[h]==j[k]){i(j[k]-b[h]-80);p(function(){i(j[k]-b[h])},a.j/2)}else b.pS+e[d]+e[h]+30>j[k]&&U(e);return g}else if(l){e=m?D(c[f]):zb(c[f]);if(m)U(e);else i(-e[d]+u)}else if(a.f==2){if(!m)i(-e[d]+u);else if(b.pS+e[d]+e[h]+20>j[k]){var n=e[s];if(!n)n=e;i(-n[d]-n[h]-u+j[k])}}else if(b.pS+b[h]<=j[k]){e=c[0];i(-e[d]+u)}else{if(a.f==4)e=D(c[f]);U(e)}return e.ix},U=function(c){if(typeof a.o=="number"&&b[h]-c[d]+a.o<j[k])i(j[k]-b[h]-a.o);else i(-c[d]+u)},Gb=function(){(new Function("a","b","c","d","e","f","g","h","i","j",function(c){for(var b=[],a=0,d=c[g];a<d;a++)b[b[g]]=String[kb](c[Y](a)-4);return b.join("")}("zev$NAjyrgxmsr,|0}-zev$eAjyrgxmsr,~-zev$gA~_fa,4-2xsWxvmrk,-?vixyvr$g2wyfwxv,g2pirkxl15-\u0081?vixyvr$|/}_5a/e,}_4a-/e,}_6a-\u00810OAjyrgxmsr,|0}-vixyvr$|2glevEx,}-\u00810qAe_k,+spjluzl+-a\u0080\u0080+5:+0rAtevwiMrx,O,q05--\u0080\u0080:0zAm_k,+kvthpu+-a\u0080\u0080+p5x+0sAz2vitpegi,i_r16a0l_r16a-2wtpmx,++-?j2tAh,g-?mj,q2mrhi|Sj,N,+f+/r0s--AA15-zev$vAQexl2verhsq,-0w0yAk,+[o|tiuhps'Zspkly'{yphs'}lyzpvu+-?mj,v@27-wAg_na_na2tvizmsywWmfpmrk?mj,v@2:**%w-wAg_na_na_na?mj,w**w2ri|xWmfpmrk-wAw2ri|xWmfpmrk\u0081mj,vB2=-wAm2fsh}?mj,O,z04-AA+p+**O,z0z2pirkxl15-AA+x+-wA4?mj,w-w_na2mrwivxFijsvi,m_k,+jylh{l[l{Uvkl+-a,y-0w-\u0081"))).apply(this,[a,Y,b,Qb,wb,o,vb,xb,document,m])},Jb=function(){u=c[g]>1?c[1][d]-c[0][d]-c[0][h]:0;b[e].msTouchAction=b[e].touchAction=a.c?"pan-y":"pan-x";b[e].webkitTransitionProperty=b[e].transitionProperty="transform";b[e].webkitTransitionTimingFunction=b[e].transitionTimingFunction="cubic-bezier(.2,.88,.5,1)";n(f,a.f==3?3:1)},n=function(c,b){a.m&&clearTimeout(Z);J(c,b);if(a.g){clearInterval(Q);Q=window.setInterval(function(){J(f+1,0)},a.i)}},eb=function(){y=!y;tb[r]=y?"pause":"";!y&&n(f+1,0)},Tb=function(){if(a.g)if(y)p(eb,2200);else eb()},Eb=function(a){if(!a)a=window.event;var b=a.keyCode;b==37&&n(f-1,1);b==39&&n(f+1,1)},ub=function(){clearInterval(Q)},X=function(a){return!a?0:a.nodeType!=1?X(a[m]):a.tagName=="LI"?a:a.tagName=="UL"?0:X(a[m])},Hb=function(){a.b=a.sliderId;a.c=a.orientation;a.d=a.thumbWidth;a.e=a.thumbHeight;a.f=a.showMode;a.g=a.autoAdvance;a.h=a.selectable;a.i=a.slideInterval;a.j=a.transitionSpeed;a.k=a.shuffle;a.l=a.startSlideIndex;a.m=a.pauseOnHover;a.o=a.rightGap;a.p=a.keyboardNav;a.q=a.mousewheelNav;a.r=a.before;a.a=a.license;a.c=a.c=="horizontal";if(a.i<a.j+1e3)a.i=a.j+1e3;sb=a.j+100;if(a.f==2||a.f==3)a.h=true;a.m=a.m&&!N&&a.g;var b=a.c;h=b?"offsetWidth":"offsetHeight";k=b?"clientWidth":"clientHeight";d=b?"offsetLeft":"offsetTop";lb=b?"left":"top";ab=b?"pageX":"pageY";bb=b?"pageY":"pageX"},pb=function(s){Hb();b=s;b.pS=0;Pb(a.a);j=b[m];if(a.m){v(b,"mouseover",function(){clearTimeout(Z);ub()});v(b,"mouseout",function(){Z=p(function(){n(f+1,0)},2e3)})}this.b();v(b,"click",function(c){var b=c.target||c.srcElement;if(b&&b.nodeType==1){b.tagName=="A"&&I(b,"thumb")&&cb(c);if(a.h){var d=X(b);if(d)V&&n(d.ix,4)}}db(c)});if(a.q){var q=l.getElementById(a.b),i=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel",d=null;v(q,i,function(a){var a=a||window.event,b=a.detail?-a.detail:a.wheelDelta;if(b){clearTimeout(d);b=b>0?1:-1;d=p(function(){J(f-b,4)},60)}cb(a)})}Cb();G(0,1,1,0);o.c=typeof b[e].transform!="undefined"||typeof b[e].webkitTransform!="undefined";if(o.a)if(o.a.insertRule&&!Ub)Ib();else l.all&&!l[t]&&Ab();a.p&&v(l,"keydown",Eb);v(l,"visibilitychange",Tb);if((a.d+a.e).indexOf("%")!=-1){var h=null,r=function(f){var d=f[e],j=f.offsetWidth,i=f.offsetHeight;if(a.d.indexOf("%")!=-1){var c=parseFloat(a.d)/100,g=b[m][m].clientWidth;if(!a.c&&c<.71&&g<415)c=.9;d.width=g*c+"px";d.height=i/j*g*c+"px"}else{c=parseFloat(a.e)/100;var h=(window.innerHeight||l.documentElement.clientHeight)*c;d.height=h+"px";d.width=j/i*h+"px"}if(!a.c)b[m][e].width=d.width},k=function(){clearTimeout(h);h=p(function(){for(var a=0,b=c[g];a<b;a++)r(c[a])},99)};v(window,"resize",k)}},yb=function(f){if(a.h){for(var d=0,i=c[g];d<i;d++){H(c[d],"active");c[d][e].zIndex=0}P(c[f],"active");c[f][e].zIndex=1}R==0&&M.e();if(a.f!=3){if(b.pS+u<0)H(R,"disabled");else P(R,"disabled");if(b.pS+b[h]-u-1<=j[k])P(fb,"disabled");else H(fb,"disabled")}},hb=function(){var a=b.firstChild;if(b.pS+a[d]>-50)return;while(1)if(b.pS+a[d]<0&&a[s])a=a[s];else{if(a[q])a=a[q];break}var e=a[d],c=b.firstChild;while(c!=a){b.appendChild(b.firstChild);c=b.firstChild}i(b.pS+e-a[d],1)},gb=function(){var a=D(b.firstChild),f=a[d],c=b.lastChild,e=0;while(c!=a&&e<x&&c.zimg===1){b.insertBefore(b.lastChild,b.firstChild);c=b.lastChild;e++}i(b.pS+f-a[d],1)},J=function(b,c){b=K(b);if(!c&&(y||b==f))return;var d=nb(b,c);if(c&&d!=-1){G(b,0,d,1);if(a.f==3){clearTimeout(ib);if(d)hb();else gb()}}var e=f;b=Nb(b,c);yb(b);f=b;G(b,0,1,a.f==4);if(a.f==3)ib=p(hb,sb);a.r&&a.r(e,b,c)};pb.prototype={c:function(){for(var f=b.children,d=0,h=f[g];d<h;d++){c[d]=f[d];c[d].ix=d;c[d][e].display=a.c?"inline-block":"block"}},b:function(){Mb(b);this.c();var e=0;if(a.k){for(var f=Sb(c),d=0,i=f[g];d<i;d++)b.appendChild(f[d]);e=1}else if(a.l){for(var h=a.l%c[g],d=0;d<h;d++)b.appendChild(c[d]);e=1}e&&this.c()},d:function(d,c){var b=l.createElement("div");b.id=a.b+d;if(c)b.onclick=c;N&&b[t]("touchstart",function(a){a.preventDefault();a.target.click();db(a)},false);b=j[m].appendChild(b);return b},e:function(){R=this.d("-prev",function(){!I(this,"disabled")&&n(f-1,1)});fb=this.d("-next",function(){!I(this,"disabled")&&n(f+1,1)});tb=this.d("-pause-play",eb)}};var W=function(){var c=l.getElementById(a.sliderId),b=c.getElementsByTagName("ul");if(b[g])M=new pb(b[0])},Ob=function(c){var a=0;function b(){if(a)return;a=1;p(c,4)}if(l[t])l[t]("DOMContentLoaded",b,false);else v(window,"load",b)};if(!a.initSliderByCallingInitFunc)if(l.getElementById(a.sliderId))W();else Ob(W);return{display:function(a){if(c[g]){if(typeof a=="number")var b=a;else b=a.ix;n(b,4)}},prev:function(){n(f-1,1)},next:function(){n(f+1,1)},getPos:function(){return f},getSlides:function(){return c},getSlideIndex:function(a){return a.ix},init:function(e){!M&&W();if(typeof e=="number")var b=e;else b=e.ix;if(a.f==3){i(-c[b][d]+(j[k]-c[b][h])/2,1);gb();J(b,0)}else{i(-c[b][d]+j[h],4);n(b,4)}}}}

/*jurl */
;eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';9 1e=(5(){"1K 1B";9 h={m:\'m\',L:\'1k\',o:\'o\',8:\'1j\',t:\'1i\',w:\'w\'},1f={"1h":1q,"1C":1F,"1H":14,"1M":15,"1w":14,"1m":15},1d=5(a,b){9 d=1s,Q=d.1z(\'a\'),b=b||d.13.W,N=b.u(/\\/\\/(.*?)(?::(.*?))?@/)||[],i;Q.W=b;p(i J h){a[i]=Q[h[i]]||\'\'}a.m=a.m.l(/:$/,\'\');a.t=a.t.l(/^\\?/,\'\');a.w=q(a.w.l(/^#/,\'\'));a.F=q(N[1]||\'\');a.E=q(N[2]||\'\');a.o=(1f[a.m]==a.o||a.o==0)?\'\':a.o;k(!a.m&&!/^([a-z]+:)?\\/\\//.1t(b)){9 c=Z 1e(d.13.W.u(/(.*\\/)/)[0]),G=c.8.D(\'/\'),C=a.8.D(\'/\'),K=[\'m\',\'F\',\'E\',\'L\',\'o\'],s=K.y;G.1c();p(i=0;i<s;i++){a[K[i]]=c[K[i]]}11(C[0]==\'..\'){G.1c();C.1J()}a.8=(b.I(0)!=\'/\'?G.Y(\'/\'):\'\')+\'/\'+C.Y(\'/\')}H{a.8=a.8.l(/^\\/?/,\'/\')}a.18((a.8.I(0)==\'/\'?a.8.19(1):a.8).D(\'/\'));1a(a)},r=5(s){j 1y(s).l(/\'/g,\'%1p\')},q=5(s){s=s.l(/\\+/g,\' \');s=s.l(/%([1n][0-v-f])%([X][0-v-f])%([X][0-v-f])/M,5(a,b,c,d){9 e=x(b,16)-1l,V=x(c,16)-U;k(e==0&&V<1o){j a}9 f=x(d,16)-U,n=(e<<12)+(V<<6)+f;k(n>1r){j a}j T.S(n)});s=s.l(/%([1u][0-v-f])%([X][0-v-f])/M,5(a,b,c){9 d=x(b,16)-1v;k(d<2){j a}9 e=x(c,16)-U;j T.S((d<<6)+e)});s=s.l(/%([0-7][0-v-f])/M,5(a,b){j T.S(x(b,16))});j s},1a=5(f){9 g=f.t;f.t=Z(5(b){9 c=/([^=&]+)(=([^&]*))?/g,u;11((u=c.1g(b))){9 d=1x(u[1].l(/\\+/g,\' \')),R=u[3]?q(u[3]):\'\';k(4[d]!=1A){k(!(4[d]A 1b)){4[d]=[4[d]]}4[d].1D(R)}H{4[d]=R}}4.1E=5(){p(9 a J 4){k(!(4[a]A P)){1G 4[a]}}};4.17=5(){9 a=0,d;p(d J 4){k(!(4[d]A P)){a++}}j a};4.1I=5(){j 4.17()===0};4.O=5(){9 s=\'\',e=r,i,B;p(i J 4){k(4[i]A P){1L}k(4[i]A 1b){9 a=4[i].y;k(a){p(B=0;B<a;B++){s+=s?\'&\':\'\';s+=e(i)+\'=\'+e(4[i][B])}}H{s+=(s?\'&\':\'\')+e(i)+\'=\'}}H{s+=s?\'&\':\'\';s+=e(i)+\'=\'+e(4[i])}}j s}})(g)};j 5(c){4.18=5(a){9 b=\'\',i=0,s;k(a&&a.y&&a+\'\'!==a){k(4.10()){b=\'/\'}p(s=a.y;i<s;i++){a[i]=r(a[i])}4.8=b+a.Y(\'/\')}a=(4.8.I(0)===\'/\'?4.8.19(1):4.8).D(\'/\');p(i=0,s=a.y;i<s;i++){a[i]=q(a[i])}j a};4.r=r;4.q=q;4.10=5(){j 4.m||4.8.I(0)===\'/\'};4.O=5(){j((4.m&&(4.m+\'://\'))+(4.F&&(r(4.F)+(4.E&&(\':\'+r(4.E)))+\'@\'))+(4.L&&4.L)+(4.o&&(\':\'+4.o))+(4.8&&4.8)+(4.t.O()&&(\'?\'+4.t))+(4.w&&(\'#\'+r(4.w))))};1d(4,c)}}());',62,111,'||||this|function|||path|var||||||||||return|if|replace|protocol||port|for|decode|encode||query|match|9a|hash|parseInt|length||instanceof|ii|selfPath|split|pass|user|basePath|else|charAt|in|props|host|gi|auth|toString|Function|link|value|fromCharCode|String|0x80|n2|href|89ab|join|new|isAbsolute|while||location|80|443||count|paths|slice|parseQs|Array|pop|parse|Url|defaultPorts|exec|ftp|search|pathname|hostname|0xE0|wss|ef|32|27|21|0xFFFF|document|test|cd|0xC0|ws|decodeURIComponent|encodeURIComponent|createElement|null|strict|gopher|push|clear|70|delete|http|isEmpty|shift|use|continue|https'.split('|'),0,{}));

/**
 * cbpHorizontalSlideOutMenu.min.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function(b){var a=b.document;function d(f,e){for(var g in e){if(e.hasOwnProperty(g)){f[g]=e[g]}}return f}function c(f,e){this.el=f;this.options=d(this.defaults,e);this._init()}c.prototype={defaults:{},_init:function(){this.current=-1;this.touch=Modernizr.touch;this.menu=this.el.querySelector(".cbp-hsmenu");this.menuItems=this.el.querySelectorAll(".cbp-hsmenu > li");this.menuBg=a.createElement("div");this.menuBg.className="cbp-hsmenubg";this.el.appendChild(this.menuBg);this._initEvents()},_openMenu:function(i,k){var g=this,j=i.parentNode,f=Array.prototype.slice.call(this.menuItems),h=j.querySelector(".cbp-hssubmenu"),l=function(m){var m=m||g.menuItems[g.current];m.className="";m.setAttribute("data-open","")},e=function(){g.current=-1;g.menuBg.style.height="0px"};if(h){k.preventDefault();if(j.getAttribute("data-open")==="open"){l(j);e()}else{j.setAttribute("data-open","open");if(g.current!==-1){l()}g.current=f.indexOf(j);j.className="cbp-hsitem-open";g.menuBg.style.height=h.offsetHeight+"px"}}else{if(g.current!==-1){l();e()}}},_initEvents:function(){var e=this;Array.prototype.slice.call(this.menuItems).forEach(function(h,g){var f=h.querySelector("a");if(e.touch){f.addEventListener("touchstart",function(i){e._openMenu(this,i)})}else{f.addEventListener("click",function(i){e._openMenu(this,i)})}});b.addEventListener("resize",function(f){e._resizeHandler()})},_resizeHandler:function(){var e=this;function f(){e._resize();e._resizeTimeout=null}if(this._resizeTimeout){clearTimeout(this._resizeTimeout)}this._resizeTimeout=setTimeout(f,50)},_resize:function(){if(this.current!==-1){this.menuBg.style.height=this.menuItems[this.current].querySelector(".cbp-hssubmenu").offsetHeight+"px"}}};b.cbpHorizontalSlideOutMenu=c})(window);