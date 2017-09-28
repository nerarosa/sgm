/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-canvastext-cssanimations-csscalc-csstransforms3d-csstransitions-hsla-input-inputtypes-placeholder-textshadow-touchevents-video-domprefixes-prefixed-prefixedcss-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function a(){var e,t,n,a,o,i,s;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],t=x[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),y.push((a?"":"no-")+s.join("-"))}}function o(e){var t=S.className,n=Modernizr._config.classPrefix||"";if(w&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),w?S.className.baseVal=t:S.className=t)}function i(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function s(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function l(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):w?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function c(e,t){return!!~(""+e).indexOf(t)}function u(){var e=t.body;return e||(e=l(w?"svg":"body"),e.fake=!0),e}function d(e,n,r,a){var o,i,s,c,d="modernizr",f=l("div"),p=u();if(parseInt(r,10))for(;r--;)s=l("div"),s.id=a?a[r]:d+(r+1),f.appendChild(s);return o=l("style"),o.type="text/css",o.id="s"+d,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",c=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),i=n(f,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=c,S.offsetHeight):f.parentNode.removeChild(f),!!i}function f(t,r){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(s(t[a]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];a--;)o.push("("+s(t[a])+":"+r+")");return o=o.join(" or "),d("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function p(e,t){return function(){return e.apply(t,arguments)}}function m(e,t,n){var a;for(var o in e)if(e[o]in t)return n===!1?e[o]:(a=t[e[o]],r(a,"function")?p(a,n||t):a);return!1}function h(e,t,a,o){function s(){d&&(delete M.style,delete M.modElem)}if(o=r(o,"undefined")?!1:o,!r(a,"undefined")){var u=f(e,a);if(!r(u,"undefined"))return u}for(var d,p,m,h,v,g=["modernizr","tspan","samp"];!M.style&&g.length;)d=!0,M.modElem=l(g.shift()),M.style=M.modElem.style;for(m=e.length,p=0;m>p;p++)if(h=e[p],v=M.style[h],c(h,"-")&&(h=i(h)),M.style[h]!==n){if(o||r(a,"undefined"))return s(),"pfx"==t?h:!0;try{M.style[h]=a}catch(y){}if(M.style[h]!=v)return s(),"pfx"==t?h:!0}return s(),!1}function v(e,t,n,a,o){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+L.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?h(s,t,a,o):(s=(e+" "+T.join(i+" ")+i).split(" "),m(s,t,n))}function g(e,t,r){return v(e,n,n,t,r)}var y=[],x=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var b=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=b;var S=t.documentElement,w="svg"===S.nodeName.toLowerCase();w||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=x.elements;return"string"==typeof e?e.split(" "):e}function a(e,t){var n=x.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),x.elements=n+" "+e,c(t)}function o(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function i(e,n,r){if(n||(n=t),d)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,s=r(),l=s.length;l>i;i++)a.createElement(s[i]);return a}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return x.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(x,t.frag)}function c(e){e||(e=t);var r=o(e);return!x.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,r),e}var u,d,f="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,d=!0}}();var x={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:d,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:c,createElement:i,createDocumentFragment:s,addElements:a};e.html5=x,c(t),"object"==typeof module&&module.exports&&(module.exports=x)}("undefined"!=typeof e?e:this,t);var E="Moz O ms Webkit",T=C._config.usePrefixes?E.toLowerCase().split(" "):[];C._domPrefixes=T,Modernizr.addTest("canvas",function(){var e=l("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("canvastext",function(){return Modernizr.canvas===!1?!1:"function"==typeof l("canvas").getContext("2d").fillText}),Modernizr.addTest("video",function(){var e=l("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=l("a");return n.style.cssText=e+b.join(t+e),!!n.style.length}),Modernizr.addTest("placeholder","placeholder"in l("input")&&"placeholder"in l("textarea"));var _=l("input"),k="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),P={};Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)P[t[n]]=!!(t[n]in _);return P.list&&(P.list=!(!l("datalist")||!e.HTMLDataListElement)),P}(k);var N="search tel url email datetime date month week time datetime-local number range color".split(" "),z={};Modernizr.inputtypes=function(e){for(var r,a,o,i=e.length,s="1)",l=0;i>l;l++)_.setAttribute("type",r=e[l]),o="text"!==_.type&&"style"in _,o&&(_.value=s,_.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&_.style.WebkitAppearance!==n?(S.appendChild(_),a=t.defaultView,o=a.getComputedStyle&&"textfield"!==a.getComputedStyle(_,null).WebkitAppearance&&0!==_.offsetHeight,S.removeChild(_)):/^(search|tel)$/.test(r)||(o=/^(url|email)$/.test(r)?_.checkValidity&&_.checkValidity()===!1:_.value!=s)),z[e[l]]=!!o;return z}(N),Modernizr.addTest("hsla",function(){var e=l("a").style;return e.cssText="background-color:hsla(120,40%,100%,.5)",c(e.backgroundColor,"rgba")||c(e.backgroundColor,"hsla")});var j="CSS"in e&&"supports"in e.CSS,$="supportsCSS"in e;Modernizr.addTest("supports",j||$);var L=C._config.usePrefixes?E.split(" "):[];C._cssomPrefixes=L;var F=function(t){var r,a=b.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var i=0;a>i;i++){var s=b[i],l=s.toUpperCase()+"_"+r;if(l in o)return"@-"+s.toLowerCase()+"-"+t}return!1};C.atRule=F;var D=C.testStyles=d;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",b.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");D(r,function(e){n=9===e.offsetTop})}return n});var A={elem:l("modernizr")};Modernizr._q.push(function(){delete A.elem});var M={style:A.elem.style};Modernizr._q.unshift(function(){delete M.style});var U=C.testProp=function(e,t,r){return h([e],n,t,r)};Modernizr.addTest("textshadow",U("textShadow","1px 1px")),C.testAllProps=v;var q=C.prefixed=function(e,t,n){return 0===e.indexOf("@")?F(e):(-1!=e.indexOf("-")&&(e=i(e)),t?v(e,t,n):v(e,"pfx"))};C.prefixedCSS=function(e){var t=q(e);return t&&s(t)};C.testAllProps=g,Modernizr.addTest("cssanimations",g("animationName","a",!0)),Modernizr.addTest("csstransforms3d",function(){var e=!!g("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in S.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",D(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",g("transition","all",!0)),a(),o(y),delete C.addTest,delete C.addAsyncTest;for(var H=0;H<Modernizr._q.length;H++)Modernizr._q[H]();e.Modernizr=Modernizr}(window,document);

/*! js-cookie v2.1.0 | MIT */
!function(a){if("function"==typeof define&&define.amd)define(a);else if("object"==typeof exports)module.exports=a();else{var b=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=b,c}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=c.write?c.write(e,b):encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("=");'"'===o.charAt(0)&&(o=o.slice(1,-1));try{if(o=c.read?c.read(o,n):c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}catch(i){}}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});


var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

function sgmTags(tagname, content){
	var openTag = "[" + tagname + "]",
		closeTag = "[/" + tagname + "]",
		startIndex = content.indexOf(openTag) + (tagname.length + 2),
		endIndex = content.indexOf(closeTag),
		result = "";
	
	if(content.indexOf(openTag) != -1)
		result = content.substring(startIndex, endIndex);	
		
	return result;
}

function isImageOk(img) {
    if (!img.complete) {
        return false;
    }
    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
        return false;
    }
    return true;
}
function imageHostFix(url){
	if(url.indexOf('googleusercontent.com') != -1)
		return url;
	
	if(url.indexOf('1.bp.blogspot.com') != -1 || url.indexOf('3.bp.blogspot.com') != -1){
		url = url.replace(/[1|3]\.bp\.blogspot\.com/, 'lh3.googleusercontent.com');
	}else if(url.indexOf('2.bp.blogspot.com') != -1 || url.indexOf('4.bp.blogspot.com') != -1){
		url = url.replace(/[2|4]\.bp\.blogspot\.com/, 'lh4.googleusercontent.com');
	}else{
		url = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&amp;refresh=31536000&amp;url=" + encodeURIComponent(url);
	}
	
	return url;
}

function resizeImg(url, size){
	/*
		size:{
			"w": New Width,
			"h": New Height,
			"s": New pixels on largest dimension,			
			"crop": - "no" not crops image
					- "c" crops image to provided dimensions
					- "p" smart square crop, attempts cropping to faces
					- "pp" alternate smart square crop, does not cut off faces
					- "cc" generates a circularly cropped image
					- "ci" square crop to smallest of: width, height, or specified =s parameter
					- "nu" no-upscaling. Disables resizing an image to larger than its original resolution
			"rotation": "fv" — flip vertically
						"fh" — flip horizontally
						"r{90, 180, 270}" — rotates image 90, 180, or 270 degrees clockwise
			"convert": "rj" — forces the resulting image to be JPG
					   "rp" — forces the resulting image to be PNG
					   "rw" — forces the resulting image to be WebP
					   "rg" — forces the resulting image to be GIF			
		}
	*/
	if(("w" in size && size.w != '') || ("h" in size && size.h != '') || ("s" in size && size.s != '')){
		let newImg = '';
		if(url.indexOf('googleusercontent.com') != -1 || url.indexOf('bp.blogspot.com') != -1){
			let newWidth = '',
				newHeight = '',
                newSize = '';
			let quanlity = ("q" in size && size.q != '') ? "-l" + size.q : "-l90";
			if("s" in size && size.s != ''){
				newSize = "s"+ size.s + (size.crop != "" ? "-"+size.crop : "") + quanlity + "-e365";
			}else{
				if("w" in size && size.w != '') newWidth = "w" + size.w + "-";
				if("h" in size && size.h != '') newHeight = "h" + size.h + "-";
			
				newSize = newWidth + newHeight + (size.crop != "" ? size.crop : "") + quanlity + "-e365";
			}
			//if(url.indexOf('.jpg') == -1 && url.indexOf('.png') == -1 && url.indexOf('.gif') == -1 && url.indexOf('.jpeg') == -1 &&
			  // url.indexOf('.JPG') == -1 && url.indexOf('.PNG') == -1 && url.indexOf('.GIF') == -1 && url.indexOf('.JPEG') == -1){
			if(!/\.[jpg|png|gif|jpeg]/i.test(url)){
				if(url.indexOf('=') != -1)
					newImg = url.replace(/\=.*/g, newSize);
				else
					newImg = url + "=" + newSize;
			}else{
				//newImg = url.replace(/\/s[0-9]{1,4}.*\//g, newSize);
				
				let elUrl = url.split("/");
                
                elUrl.splice(elUrl.length - 2, 1, newSize);
                
                newImg = elUrl.join("/");
			}
			
		}else{
			let newWidth = '',
				newHeight = '';
			if("s" in size && size.s != ''){
				newWidth = newHeight = size.s;
			}else{
				if("w" in size && size.w != '') newWidth = '&resize_w=' + size.w;
				if("h" in size && size.h != '') newHeight = '&resize_h=' + size.h;
			}	
			
			
			newImg = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=31536000"+ newWidth + newHeight +"&url=" + encodeURIComponent(url);
		}
			
		return newImg;
	}else{
		return url;
	}
}

function getViewportSize(){
	var w = window, 
		d = document, 
		e = d.documentElement, 
		g = d.getElementsByTagName('body')[0], 
		x = w.innerWidth || e.clientWidth || g.clientWidth, 
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	return x+"x"+y;	
}

$.fn.isOnScreen = function(){    
    var win = $(window);    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
	
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));  
};

function getAjax(options, callback){
	if(typeof options.url === "undefined" || options.url === '' || options.url === null)
		return;
	
	let countLoop = 0;
	let defaultSend = {
		"alt":"json-in-script"
	};
	let sendData = {};	
	
	if(typeof options.beforeHandle === "undefined" || !$.isFunction(options.beforeHandle))
		options.beforeHandle = function(){};
	
	if(typeof options.dataSend === "undefined" || typeof options.dataSend !== "object" || $.isEmptyObject(options.dataSend))
		sendData = defaultSend;
	else
		if(options.url.indexOf('blogspot.com') != -1 || options.url.indexOf('/feeds/') != -1)
			sendData = $.extend({}, defaultSend, options.dataSend);
		else
			sendData = options.dataSend;
	
	$.ajax({
		url: options.url,
		type: "get",
		data: sendData,
		dataType: "jsonp",
		beforeSend: options.beforeHandle,
		success: function(data){
			callback(data)
		},
		error: function(){
			countLoop++;
			if(countLoop < 3)
				getAjax(options, callback);
			else
				callback('errFeed');
		}
	});
}
