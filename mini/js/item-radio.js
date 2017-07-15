(function ($) { $.fn.slider=function(options,flag){var EVENT=window.navigator.msPointerEnabled?2:"ontouchend" in document?3:1;if(window.debug&&console){console.log(EVENT)}function call(f,scope,args){if(typeof f==="function"){f.call(scope,args)}}var percentage={to:function(range,value){value=range[0]<0?value+Math.abs(range[0]):value-range[0];return(value*100)/this._length(range)},from:function(range,value){return(value*100)/this._length(range)},is:function(range,value){return((value*this._length(range))/100)+range[0]},_length:function(range){return(range[0]>range[1]?range[0]-range[1]:range[1]-range[0])}};function correct(proposal,slider,handle){var setup=slider.data("setup"),handles=setup.handles,settings=setup.settings,pos=setup.pos;proposal=proposal<0?0:proposal>100?100:proposal;if(settings.handles==2){if(handle.is(":first-child")){var other=parseFloat(handles[1][0].style[pos])-settings.margin;proposal=proposal>other?other:proposal}else{var other=parseFloat(handles[0][0].style[pos])+settings.margin;proposal=proposal<other?other:proposal}}if(settings.step){var per=percentage.from(settings.range,settings.step);proposal=Math.round(proposal/per)*per}return proposal}function client(f){try{return[(f.clientX||f.originalEvent.clientX||f.originalEvent.touches[0].clientX),(f.clientY||f.originalEvent.clientY||f.originalEvent.touches[0].clientY)]}catch(e){return["x","y"]}}function place(handle,pos){return parseFloat(handle[0].style[pos])}var defaults={handles:1,serialization:{to:["",""],resolution:0.01}};methods={create:function(){return this.each(function(){function setHandle(handle,to,slider){handle.css(pos,to+"%").data("input").val(percentage.is(settings.range,to).toFixed(res))}var settings=$.extend(defaults,options),handlehtml="<a><div></div></a>",slider=$(this).data("_isnS_",true),handles=[],pos,orientation,classes="",num=function(e){return !isNaN(parseFloat(e))&&isFinite(e)},split=(settings.serialization.resolution=settings.serialization.resolution||0.01).toString().split("."),res=split[0]==1?0:split[1].length;settings.start=num(settings.start)?[settings.start,0]:settings.start;$.each(settings,function(a,b){if(num(b)){settings[a]=parseFloat(b)}else{if(typeof b=="object"&&num(b[0])){b[0]=parseFloat(b[0]);if(num(b[1])){b[1]=parseFloat(b[1])}}}var e=false;b=typeof b=="undefined"?"x":b;switch(a){case"range":case"start":e=b.length!=2||!num(b[0])||!num(b[1]);break;case"handles":e=(b<1||b>2||!num(b));break;case"connect":e=b!="lower"&&b!="upper"&&typeof b!="boolean";break;case"orientation":e=(b!="vertical"&&b!="horizontal");break;case"margin":case"step":e=typeof b!="undefined"&&!num(b);break;case"serialization":e=typeof b!="object"||!num(b.resolution)||(typeof b.to=="object"&&b.to.length<settings.handles);break;case"slide":e=typeof b!="function";break}if(e&&console){console.error("Bad input for "+a+" on slider:",slider)}});settings.margin=settings.margin?percentage.from(settings.range,settings.margin):0;if(settings.serialization.to instanceof jQuery||typeof settings.serialization.to=="string"||settings.serialization.to===false){settings.serialization.to=[settings.serialization.to]}if(settings.orientation=="vertical"){classes+="vertical";pos="top";orientation=1}else{classes+="horizontal";pos="left";orientation=0}classes+=settings.connect?settings.connect=="lower"?" connect lower":" connect":"";slider.addClass(classes);for(var i=0;i<settings.handles;i++){handles[i]=slider.append(handlehtml).children(":last");var setTo=percentage.to(settings.range,settings.start[i]);handles[i].css(pos,setTo+"%");if(setTo==100&&handles[i].is(":first-child")){handles[i].css("z-index",2)}var bind=".slider",onEvent=(EVENT===1?"mousedown":EVENT===2?"MSPointerDown":"touchstart")+bind+"X",moveEvent=(EVENT===1?"mousemove":EVENT===2?"MSPointerMove":"touchmove")+bind,offEvent=(EVENT===1?"mouseup":EVENT===2?"MSPointerUp":"touchend")+bind;handles[i].find("div").on(onEvent,function(e){$("body").bind("selectstart"+bind,function(){return false});if(!slider.hasClass("disabled")){$("body").addClass("TOUCH");var handle=$(this).addClass("active").parent(),unbind=handle.add($(document)).add("body"),originalPosition=parseFloat(handle[0].style[pos]),originalClick=client(e),previousClick=originalClick,previousProposal=false;$(document).on(moveEvent,function(f){f.preventDefault();var currentClick=client(f);if(currentClick[0]=="x"){return}currentClick[0]-=originalClick[0];currentClick[1]-=originalClick[1];var movement=[previousClick[0]!=currentClick[0],previousClick[1]!=currentClick[1]],proposal=originalPosition+((currentClick[orientation]*100)/(orientation?slider.height():slider.width()));proposal=correct(proposal,slider,handle);if(movement[orientation]&&proposal!=previousProposal){handle.css(pos,proposal+"%").data("input").val(percentage.is(settings.range,proposal).toFixed(res));call(settings.slide,slider.data("_n",true));previousProposal=proposal;handle.css("z-index",handles.length==2&&proposal==100&&handle.is(":first-child")?2:1)}previousClick=currentClick}).on(offEvent,function(){unbind.off(bind);$("body").removeClass("TOUCH");if(slider.find(".active").removeClass("active").end().data("_n")){slider.data("_n",false).change()}})}}).on("click",function(e){e.stopPropagation()})}if(EVENT==1){slider.on("click",function(f){if(!slider.hasClass("disabled")){var currentClick=client(f),proposal=((currentClick[orientation]-slider.offset()[pos])*100)/(orientation?slider.height():slider.width()),handle=handles.length>1?(currentClick[orientation]<(handles[0].offset()[pos]+handles[1].offset()[pos])/2?handles[0]:handles[1]):handles[0];setHandle(handle,correct(proposal,slider,handle),slider);call(settings.slide,slider);slider.change()}})}for(var i=0;i<handles.length;i++){var val=percentage.is(settings.range,place(handles[i],pos)).toFixed(res);if(typeof settings.serialization.to[i]=="string"){handles[i].data("input",slider.append('<input type="hidden" name="'+settings.serialization.to[i]+'">').find("input:last").val(val).change(function(a){a.stopPropagation()}))}else{if(settings.serialization.to[i]==false){handles[i].data("input",{val:function(a){if(typeof a!="undefined"){this.handle.data("noUiVal",a)}else{return this.handle.data("noUiVal")}},handle:handles[i]})}else{handles[i].data("input",settings.serialization.to[i].data("handleNR",i).val(val).change(function(){var arr=[null,null];arr[$(this).data("handleNR")]=$(this).val();slider.val(arr)}))}}}$(this).data("setup",{settings:settings,handles:handles,pos:pos,res:res})})},val:function(){if(typeof arguments[0]!=="undefined"){var val=typeof arguments[0]=="number"?[arguments[0]]:arguments[0];return this.each(function(){var setup=$(this).data("setup");for(var i=0;i<setup.handles.length;i++){if(val[i]!=null){var proposal=correct(percentage.to(setup.settings.range,val[i]),$(this),setup.handles[i]);setup.handles[i].css(setup.pos,proposal+"%").data("input").val(percentage.is(setup.settings.range,proposal).toFixed(setup.res))}}})}else{var handles=$(this).data("setup").handles,re=[];for(var i=0;i<handles.length;i++){re.push(parseFloat(handles[i].data("input").val()))}return re.length==1?re[0]:re}},disabled:function(){return flag?$(this).addClass("disabled"):$(this).removeClass("disabled")}};var $_val=jQuery.fn.val;jQuery.fn.val=function(){return this.data("_isnS_")?methods.val.apply(this,arguments):$_val.apply(this,arguments)};return options=="disabled"?methods.disabled.apply(this):methods.create.apply(this)}})(jQuery);

$(document).ready(function(){
	//var audioUrl = $('.playerData').data('audioUrl');
	var playerGUI = '#sgm-radio-controls',
		mainPlayer = '#sgm-radio';
		
	if (!Modernizr.csscalc) {
		$('.progress').css('width', '100%').css('width', '-=150px');
		$(window).resize(function() { 
			$('.progress').css('width', '100%').css('width', '-=150px');
		});
	}
		
	function audioMedia(i){	
		if(audioMp3.length > 0 && audioM4a.length == 0 && audioOgg.length == 0)
			return {mp3: audioMp3[i]};
		else if(audioMp3.length == 0 && audioM4a.length > 0 && audioOgg.length == 0)
			return {m4a: audioM4a[i]};
		else if(audioMp3.length == 0 && audioM4a.length == 0 && audioOgg.length > 0)
			return {oga: audioOgg[i]};
		else if(audioMp3.length > 0 && audioM4a.length > 0 && audioOgg.length == 0)
			return {mp3: audioMp3[i], m4a: audioM4a[i]};
		else if(audioMp3.length > 0 && audioM4a.length == 0 && audioOgg.length > 0)
			return {mp3: audioMp3[i], oga: audioOgg[i]};
		else if(audioMp3.length > 0 && audioM4a.length > 0 && audioOgg.length > 0)
			return {m4a: audioM4a[i], oga: audioOgg[i]};
		else
			return {mp3: audioMp3[i], m4a: audioM4a[i], oga: audioOgg[i]};
	}	
	
	var i = 0;
	var options = {
		ready: function () {
			$(this).jPlayer("setMedia", audioMedia(i)).jPlayer('play');
		},
		swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.swf",
		supplied: "mp3, oga, m4a",
		solution: 'html, flash',
		volume: 0.8,
		smoothPlayBar: true,
		keyEnabled: true,			
		cssSelectorAncestor: playerGUI,
		cssSelector: {
			videoPlay: ".jp-jplayer",
			play: ".jp-play",
			pause: ".jp-pause",
			stop: ".jp-stop",
			seekBar: ".jp-seek-bar",
			playBar: ".jp-play-bar",
			mute: ".jp-mute",
			unmute: ".jp-unmute",
			volumeBar: ".jp-volume-bar",
			volumeBarValue: ".jp-volume-bar-value",
			volumeMax: ".jp-volume-max",
			playbackRateBar: ".jp-playback-rate-bar",
			playbackRateBarValue: ".jp-playback-rate-bar-value",
			currentTime: ".jp-current-time",
			duration: ".jp-duration",
			title: ".jp-title",
			fullScreen: ".jp-full-screen",
			restoreScreen: ".jp-restore-screen",
			repeat: ".jp-repeat",
			repeatOff: ".jp-repeat-off",
			gui: ".jp-gui",
			noSolution: ".jp-no-solution"
		},
		error: function(event) {
			if(event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
				$(this).jPlayer("setMedia", audioMedia[i]).jPlayer('play');
			}
		},
		play: function() {
			
		},
		pause: function() {
			
		},
		volumechange: function(event) {
			var curVol = event.jPlayer.options.volume;

			if(curVol > 0.2 && curVol < 0.6) {
				$('.jp-volume-controls .jp-mute').addClass('sicon-volume_down');
			} else {
				$('.jp-volume-controls .jp-mute').removeClass('sicon-volume_down');
			}  
		},
		timeupdate: function(event) {
			$(playerGUI + ' .seekDot').css('left', event.jPlayer.status.currentPercentRelative + '%');
		},
		progress: function(event) {
			$(playerGUI + ' .seekDot').css('left' ,event.jPlayer.status.currentPercentRelative + '%');
		},
		ended: function() {
			if(audioMp3.length > 1 && i < audioMp3.length) {
				i++;
				$(this).jPlayer("setMedia", audioMedia(i)).jPlayer('play');
			}
		}
	};
			
	/*$(playerGUI + ' .jp-volume-bar-value').slider({
		range: [0, 1],
		step: 0.01,
		start : 0.8,
		handles: 1,
		slide: function() {
			var value = $(this).val();
			$(mainPlayer).jPlayer("option", "muted", false);
			$(mainPlayer).jPlayer("option", "volume", value);
		}
	});*/
	
	$(playerGUI + ' .jp-seek-bar').slider({
		range: [0,100],
		step: 0.01,
		start: 0,
		handles: 1,
		slide: function() {
			var value = $(this).val();
			$(mainPlayer).jPlayer("playHead", value);
		}			
	});
			
	$(mainPlayer).jPlayer(options);
});
