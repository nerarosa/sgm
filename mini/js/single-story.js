$(document).ready(function(){
	var audioBgUrl = $('#bg-audio').data('audioUrl');

	$("#bg-audio").jPlayer({
		ready: function () {
		  $(this).jPlayer("setMedia", {
			mp3: audioBgUrl
		  }).jPlayer("play");
		},
		ended: function() {
			$(this).jPlayer("play");
		},
		solution: "html, flash",
		supplied: "mp3, ogg",
		swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.swf"
	});
	
	$(document).on('click', "#control-audio", function() {
		if($(this).hasClass('is-play')){
			$(this).removeClass("is-play");
			$(this).addClass("is-pause").html('<i class="fa fa-microphone-slash" aria-hidden="true"></i>');
			$("#bg-audio").jPlayer("pause");
			$('.circle').addClass('paused-animate');
		}else{
			$(this).removeClass("is-pause");
			$(this).addClass("is-play").html('<i class="fa fa-microphone" aria-hidden="true"></i>');
			$("#bg-audio").jPlayer("play");
			$('.circle').removeClass('paused-animate');
		}
	});
});