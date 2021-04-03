function postToGoogle(){
	$.ajax({
		url:"https://docs.google.com/forms/d/1fUy-PtxNgJDlWcNrTcnXFJ-GbRyl1OzwQlpj7vPOUnQ/formResponse",
		data:{
			"entry.1435012112":window.location.href
		},
		type:"POST",
		dataType:"xml",
		statusCode:{
			0:function(){
				$("#notification-trigger").remove();
				$("#notification-answer").text("Thanks!!! We will check and fix early");

				setTimeout(function(){
					$("#notification-answer").hide()
				}, 1000)
			},
			200:function(){
				$("#notification-trigger").remove();
				$("#notification-answer").text("Thanks!!! We will check and fix early");

				setTimeout(function(){
					$("#notification-answer").hide()
				}, 1000)
			}
		}
	});
}

$(document).ready(function(){
	$('#notification-trigger').click(function() {
		postToGoogle();									
		return false;									
	});

	$('input.embed-code').val("<iframe src='" + $('input.share-url').val() + "' width='640' height='480' frameborder='0' allowfullscreen></iframe>");			
	
	$.ajax({
		type: 'POST',
		url: 'https://www.googleapis.com/urlshortener/v1/url?fields=id&key=AIzaSyCA40nD9srZygo1w1rnFAyVar6-Ulr9--w',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify({"longUrl": $('input.url-code').val()}),
		dataType: 'json',
		success: function(data){
			$('input.url-code').val(data.id);
		}
	});
	
	$("#like-share-video .share.button").click(function(){$("#like-share-video .share-box").toggle("fast",function(){})});
});

;(function(window) {
	'use strict';

	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;
		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		var countCl = 0;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}else {
				self.options.onCheck();
				self.timeline.replay();
			}
			self.checked = !self.checked;
			countCl++;
			if(countCl > 10)
				$(this).off("click");
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};
	
	function init() {
		var el1 = document.querySelector('.dislike').querySelector('button.icobutton'), el1span = el1.querySelector('span');
		var acdislike = new Animocon(el1, {
			tweens : [
				new mojs.Burst({
					parent:el1,
					radius:{30:90},
					count:6,
					children : {
						fill: '#C0C1C3',
						opacity: 0.6,
						radius: 15,
						duration: 1700,
						easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
					}
				}),
				new mojs.Shape({
					parent: el1,
					type: 'circle',
					radius: {0: 60},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {1:0},
					opacity: 0.6,
					duration: 700,
					easing: mojs.easing.sin.out
				}),
				new mojs.Tween({
					duration : 1200,
					onUpdate: function(progress) {
						if(progress > 0.3) {
							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
						}else {
							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
						}
					}
				})
			],
			onCheck : function() {
				el1.style.color = '#000000';
				$(el1).addClass("checked");
				dislike();
				if($(el6).hasClass("checked")){
					unlike();
					el6.style.color = '#C0C1C3';
					aclike.checked = false;
				}	
			},
			onUnCheck : function() {
				el1.style.color = '#C0C1C3';
				undislike();
			}
		});

		var el6 = document.querySelector('.like').querySelector('button.icobutton'), el6span = el6.querySelector('span');
		var scaleCurve6 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
		var aclike = new Animocon(el6, {
			tweens : [
				new mojs.Burst({
					parent: el6,
					radius: {40:110},
					count: 20,
					children: {
						shape: 'line',
						fill : 'white',
						radius: { 12: 0 },
						scale: 1,
						stroke: '#E91E63',
						strokeWidth: 2,
						duration: 1500,
						easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
					},
				}),
				new mojs.Shape({
					parent: el6,
					radius: {10: 60},
					fill: 'transparent',
					stroke: '#E91E63',
					strokeWidth: {2:0},
					duration: 800,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				new mojs.Tween({
					duration : 800,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
					onUpdate: function(progress) {
						var scaleProgress = scaleCurve6(progress);
						el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
					}
				})
			],
			onCheck : function() {
				el6.style.color = '#369FCF';
				$(el6).addClass("checked");
				like();
				if($(el1).hasClass("checked")){
					undislike();
					el1.style.color = '#C0C1C3';
					acdislike.checked = false;
				}	
			},
			onUnCheck : function() {
				el6.style.color = '#C0C1C3';
				unlike();
			}
		});
	}
	
	function unlike(){
		var videoRef = database.ref('posts/videos/' + idPost + '/like');
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				videoRef.transaction(function(currentLike) {
						return currentLike - 1;
				}, function(error, committed, snapshot) {
				  if (error) {
					console.log(error);
				  } else if (!committed) {
					console.log('We aborted the transaction.');
				  } else {
					
				  }
				  if(snapshot !== null)
					$('.like .icobutton__text').text(snapshot.val());
				}, true);
			} else {
				loginFireBase();
			}
		});
	}
	function like(){
		var videoRef = database.ref('posts/videos/' + idPost + '/like');
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {				
				videoRef.transaction(function(currentLike) {
					return currentLike + 1;
				}, function(error, committed, snapshot) {
				  if (error) {
					console.log(error);
				  } else if (!committed) {
					console.log('We aborted the transaction.');
				  } else {
					
				  }
				  if(snapshot !== null)
					$('.like .icobutton__text').text(snapshot.val());
				}, true);
			} else {
				loginFireBase();
			}
		});
	}
	function undislike(){
		var videoRef = database.ref('posts/videos/' + idPost + '/dislike');
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				videoRef.transaction(function(currentLike) {
						return currentLike - 1;
				}, function(error, committed, snapshot) {
				  if (error) {
					console.log(error);
				  } else if (!committed) {
					console.log('We aborted the transaction.');
				  } else {
					
				  }
				  if(snapshot !== null)
					$('.dislike .icobutton__text').text(snapshot.val());
				}, true);
			} else {
				loginFireBase();
			}
		});
	}
	function dislike(){
		var videoRef = database.ref('posts/videos/' + idPost + '/dislike');
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				videoRef.transaction(function(currentLike) {
					return currentLike + 1;	
				}, function(error, committed, snapshot) {
				  if (error) {
					console.log(error);
				  } else if (!committed) {
					console.log('We aborted the transaction.');
				  } else {
					
				  }
				  if(snapshot !== null)
					$('.dislike .icobutton__text').text(snapshot.val());
				}, true);
			} else {
				loginFireBase();
			}
		});
	}
	
	init();
})(window);