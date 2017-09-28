(function($, _0x94e1x3, _0x94e1x4, _0x94e1x5) {
	$.accordion = function(accordionParent, customoptions) {
		var options = {
			duration: 200,
			delay: 0,
			exclusive: true,
			onOpen: function() {},
			onClose: function() {}
		};
		var _el = this;
		var elParent = $(accordionParent),
			accordionParent = accordionParent,
			accordionItem = elParent.children(".accordion-item");
		_el.init = function() {
			_el.settings = $.extend({}, options, customoptions);
			_autoOpen();
			_0x94e1xd();
		};
		var _autoOpen = function() {
			$(accordionItem).each(function() {
				if ($(this).hasClass("active")) {
					$(this).children(".accordion-content").show(0)
				}
			})
		};
		var _0x94e1xd = function() {
			$(accordionItem).find(".accordion-header").bind("click", function(e) {
				if (!$(this).parent(accordionItem).hasClass("active")) {
					_el.open($(this).parent(accordionItem).index())
				} else {
					_el.close($(this).parent(accordionItem).index())
				}
			})
		};
		_el.open = function(i) {
			if (!$(accordionItem[i]).hasClass("active")) {
				if (_el.settings.exclusive) {
					$(accordionItem).find(".accordion-content").slideUp(_el.settings.duration);
					$(accordionItem).removeClass("active");
				};
				$(accordionItem[i]).children(".accordion-content").delay(_el.settings.delay).slideDown(_el.settings.duration, function() {
					$(accordionItem[i]).addClass("active")
				});
				//_el.callback("onOpen");
			}
		};
		_el.setDuration = function(_0x94e1x10) {
			_el.settings.duration = _0x94e1x10
		};
		_el.setExclusive = function(_0x94e1x11) {
			_el.settings.exclusive = _0x94e1x11
		};
		_el.setDelay = function(_0x94e1x12) {
			_el.settings.delay = _0x94e1x12
		};
		_el.close = function(i) {
			$(accordionItem[i]).children(".accordion-content").delay(_el.settings.delay).slideUp(_el.settings.duration, function() {
				$(accordionItem[i]).removeClass("active")
			});
			//_el.callback("onClose");
		};
		_el.closeAll = function() {
			$(accordionItem).find(".accordion-content").slideUp(_el.settings.duration);
			$(accordionItem).removeClass("active");
		};
		_el.callback = function(_0x94e1x13) {
			if (customoptions[_0x94e1x13] !== _0x94e1x5) {
				customoptions[_0x94e1x13].call(accordionParent)
			}
		};
		_el.init();
	};
	$.fn.accordion = function(customoptions) {
		return this.each(function() {
			if (_0x94e1x5 == $(this).data("accordion")) {
				var _el = new $.accordion(this, customoptions);
				$(this).data("accordion", _el);
			}
		})
	};
})(jQuery, window, document);

$(document).ready(function(){	
	var groupReso = ['<i class="fa fa-laptop"></i>Standard', '<i class="fa fa-mobile"></i>Mobile', '<i class="fa fa-tablet"></i>Tablet', '<i class="fa fa-television"></i>Dual', '<i class="fa fa-desktop"></i>Other'];	
	var	resolution = [
		[
			{
				name: "4:3",
				$t:"800x600,1024x768,1152x864,1400x1050,1440x1080,1600x1200,1680x1260,1920x1440,2048x1536,2560x1920,2800x2100,3200x2400,4096x3072"
			},
			{
				name: "5:4",
				$t:"1280x1024,2560x2048,3750x3000"
			}
		],
		[
			{
				name:"VAG",
				$t:"240x320,480x640,320x240,640x480"
			},
			{
				name:"WVAG",
				$t:"240x400,480x800,400x240,800x480"
			},
			{
				name:"iPhone",
				$t:"320x480,480x320,640x960,960x640"
			},
			{
				name:"iPad",
				$t:"1024x768,768x1024"
			},
			{
				name:"PSP",
				$t:"480x272"
			},
			{
				name:"Phone",
				$t:"220x176"
			}
		],
		[
			{
				name:"iPad 2",
				$t:"1024x1024"
			},
			{
				name:"Android",
				$t:"1280x1280"
			},
			{
				name:"iPad 3",
				$t:"2048x2048"
			}
		],
		[
			{
				name:"Standard 4:3",
				$t:"1600x600,2048x768,2304x864,2560x960,2800x1050,2880x1080,3200x1200,3360x1260,3840x1440,4096x1536,5120x1920,5600x2100"
			},
			{
				name: "Standard 5:4",
				$t:"2560x1024,5120x2048"
			},
			{
				name:"Wide 16:10",
				$t:"1920x600,2304x720,2560x800,2880x900,3360x1050,3840x1200,5120x1600"
			},
			{
				name:"Wide 5:3",
				$t:"1600x480,2560x768"
			},
			{
				name:"HD 16:9",
				$t:"1920x540,2048x576,2560x720,3200x900,3840x1080,4096x1152,4800x1350,5120x1440"
			}	
		],
		[
			{
				name:"Wide 5:3",
				$t:"800x480,1280x768"
			},
			{
				name:"DSLR 3:2",
				$t:"1152x768,1440x960,2000x1333"
			}
		]
	];
	var featuredRes =[		
		{
			name:"Wide 16:10",
			$t:"1280x800,1440x900,1680x1050,1920x1200,2560x1600,2880x1800"
		},
		{
			name:"HD 16:9",
			$t:"1280x720,1366x768,2000x1333,1600x900,1920x1080,2560x1440"
		},
		{
			name:"Ultra HD 4K",
			$t:"3840x2160"
		},
		{
			name:"Ultra HD 5K",
			$t:"5120x2880"
		},
		{
			name:"Ultra HD 8K",
			$t:"7680x4320"
		}
	];
	
	
	var mainContent = $(".wallpaper-post-content").text();
	var allLinkDown = sgmTags("sgmwpdown", mainContent);
	var allLinkArr = allLinkDown.split("|");
		
	var accordionData = [], featuredData = [];
	for(let i in groupReso){
		accordionData[i]={};
	}
	
	var tempExistArr = [], tempResArr = [];
	for(let i = 0, len = allLinkArr.length; i < len; i++){
		var res = allLinkArr[i].split(";")[0],
			link = allLinkArr[i].split(";")[1].replace(/\/s[0-9](.*)\//gi, '/s0/');
		tempResArr.push(res);	
		var isExist = false;
		for(let n = 0, len = featuredRes.length; n < len; n++){
			isExist = false;
			if(featuredRes[n].$t.indexOf(res) != -1){
				if(featuredData.length == 0){
					var feaItem = {};
					feaItem.grName = featuredRes[n].name;
					feaItem.grData = '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
					featuredData.push(feaItem);
				}else{
					for(let x = 0, len = featuredData.length; x < len; x++){
						if(featuredData[x].grName == featuredRes[n].name){
							featuredData[x].grData += '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
							isExist = true;
							break;
						}
					}
					
					if(isExist == false){
						var feaItem = {};
						feaItem.grName = featuredRes[n].name;
						feaItem.grData = '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
						featuredData.push(feaItem);
					}
				}
				
				tempExistArr.push(res);
			}
		}
		
		for(let j = 0, len = groupReso.length; j < len; j++){
			for(let x = 0, len = resolution[j].length; x < len; x++){
				if(resolution[j][x].$t.indexOf(res) != -1){
					if(!("grName" in accordionData[j])){
						accordionData[j].grName = groupReso[j];
						accordionData[j].grData = [];
						var count = 0;
					}
					
					if(!(count in accordionData[j].grData)){
						accordionData[j].grData[count] = {};
						accordionData[j].grData[count].item = resolution[j][x].name;
						accordionData[j].grData[count].$t = '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';						
					}else{
						if(accordionData[j].grData[count].item == resolution[j][x].name){
							accordionData[j].grData[count].$t += '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
						}else{
							count++;
						}
					}
					
					tempExistArr.push(res);
				}
			}
		}
	}	
	
	var tempOther = $(tempResArr).not(tempExistArr).get();
	if(tempOther.length > 0){
		if(!("grName" in accordionData[groupReso.length-1])){
			accordionData[groupReso.length-1].grName = groupReso[groupReso.length-1];
			accordionData[groupReso.length-1].grData = [];
			var count = 0;
		}else{
			count = accordionData[groupReso.length-1].grData.length;
		}
		
		for(let i = 0, len = tempOther.length; i < len; i++){
			if(i==0){
				accordionData[groupReso.length-1].grData[count] = {};
				accordionData[groupReso.length-1].grData[count].item = "Other";
				accordionData[groupReso.length-1].grData[count].$t = '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
			}else{				
				accordionData[groupReso.length-1].grData[count].$t += '<li><a target="_blank" href="'+ link +'" title="'+ res +'" download="' + link.substr(link.lastIndexOf('/') + 1) + '">'+ res +'</a></li>';
			}
		}
	}
	
	var featuredHTML = '';
	for(var i = 0; i < featuredData.length; i++){
		featuredHTML += '<div class="resolution-item"><div class="type-resolution">'+ featuredData[i].grName +'</div><div class="download-resolution"><ul>'+ featuredData[i].grData +'</ul></div><div class="clear"/></div>';
	}	
	$(".wp-all-resolution").prepend(featuredHTML);
	
	var accordionHTML = '';
	for(var j=0; j<accordionData.length; j++){
		if($.isEmptyObject(accordionData[j])) continue;
		
		var groupData = accordionData[j].grData,
			groupItem = '';
		for(var i=0; i<groupData.length; i++){	
			groupItem += '<div class="resolution-item"><div class="type-resolution">'+ groupData[i].item +'</div><div class="download-resolution"><ul>'+ groupData[i].$t +'</ul></div><div class="clear"></div></div>';
		}
	
		accordionHTML += '<div class="accordion-item '+ (j==0? "active" : "") +'"><div class="accordion-header">'+ accordionData[j].grName +' <span class="accordion-item-arrow"></span></div><div class="accordion-content">'+ groupItem +'</div></div>'
	}	
	$("#accordion").html(accordionHTML);
	$("#accordion").accordion();
	
	//get resolution screen of guest
	var guestRes = screen.width + "x" + screen.height;
	var guestResHTML = '';
	if(allLinkDown.indexOf(guestRes) != -1){
		var guestWpUrl = allLinkDown.split(guestRes+';')[1].split('|')[0];
		guestResHTML = 'Đẹp nhất với bạn : <a target="_blank" href="'+ guestWpUrl +'" title="Download best wallpaper for your screen">'+ guestRes +'</a><a style="margin-left:10px;" target="_blank" href="/search/label/Wallpaper%2B'+ guestRes +'" title="Search wallpaper for your screen">Ảnh cùng loại</a>';
	}else{
		guestResHTML = 'Tìm ảnh với màn hình của bạn : <a target="_blank" href="/search/label/Wallpaper%2B'+ guestRes +'" title="Search best wallpaper for your screen">'+ guestRes +'</a>';
	}
	$(".wp-user-resolution h4").html(guestResHTML);
	
	var owp = $('.wp-thumb img').attr('src');
	if(owp !== ''){
		owp = owp.replace(/\/s[1-9](.*)\//gi, '/s0/');
		$('#original-wp').attr('href', owp).attr("download", owp.substr(owp.lastIndexOf('/') + 1));
		$('#crop-wp').attr('href', "/p/cropper.html?img=" + owp);
	}
	
	$("#crop-wp").click(function(e){
		e.preventDefault();
		
		var h = screen.height ,
			w = screen.width;
		
		var params = [
			'height=' + h,
			'width=' + w,
			'fullscreen=yes', // only works in IE, but here for completeness
			'menubar=no',
			'location=yes',
			'resizable=yes',
			'scrollbars=yes',
			'status=no'
		].join(',');			 

		var popup = window.open($(this).attr("href"), 'viewer_window', params); 
		popup.moveTo(0,0);
		var wp = popup.outerWidth,
			hp = popup.outerHeight;
		if(wp < w || hp < h) popup.resizeTo(w, h);
		popup.focus();
	});
});