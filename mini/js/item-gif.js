$('document').ready(function(){
	const elPlayer = $('.gif-player');
	const elDownload = $('.gif-download');	
	
	let speed = null;
	$(document).on('input change', '.x-speed input', function() {
		$('.x-speed .ng-binding').html( $(this).val() );
		
		speed = $(this).val();
		
		if($('x-gif').length) $('x-gif').attr("speed", speed);
	});
	
	let loop = null;
	$(document).on('input change', '.x-ntime input', function() {
		$('.x-ntime .ng-binding').html( $(this).val() );
		
		if($(this).val() > 0)
			loop = $(this).val();
		
		if($('x-gif').length){			
			loop = $(this).val();
			
			if (typeof $('x-gif').attr('stopped') === typeof undefined || $('x-gif').attr('stopped') === false) {
				$('x-gif').attr('stopped', '')
				$(".play-gif-icon").show();
			}
			if(loop > 0)
				$('x-gif').attr("n-times", loop);
			else{
				$('x-gif').removeAttr("n-times");
				$(".play-gif-icon").show();
			}
		}
	});

	let pingpong = '';
	$('.x-ping-pong input[type="checkbox"]').change(function() {
		if(this.checked) {
			pingpong = 'ping-pong';
		}else{
			pingpong = '';
		}
		if($('x-gif').length) 
			pingpong != '' ? $('x-gif').attr(pingpong, '') : $('x-gif').removeAttr('ping-pong');
	});
	
	function xGifReady(){
		let checkContents = setInterval(function(){
		  if (typeof $('x-gif').attr('readyplay') !== typeof undefined && $('x-gif').attr('readyplay') !== false){
			$('.gif-player .pre-view').hide();
			$('.x-gif-view').show();
			
			if (typeof $('x-gif').attr('stopped') !== typeof undefined && $('x-gif').attr('stopped') !== false) {
				$('x-gif').removeAttr('stopped');
				$(".play-gif-icon").hide();
			}
			window.clearInterval(checkContents);
		  }
		},500);
	}	
	
	$('.gif-player-inner').on('click', '.play-gif-icon-pre', function(){
		if(!$('.x-gif-view').length){
			$('.play-gif-icon-pre').text('...').addClass('x-gif-loading');
			
			let urlGif = '';
			if($('#gif-source').length){
				urlGif = $('#gif-source').data('source');
			}else if($('#gif-list').length){
				if(!$('#gif-list .active').length)
					$('#gif-list .gif-item:eq(0)').addClass('active');
				
				urlGif = $('#gif-list .gif-item.active img').data('gif');
				
			}			
			
			let speedAttr = speed != null ? `speed="${speed}"` : "";
			let loopAttr = (loop != null && loop > 0) ? `n-times="${loop}"` : "";
			$('.gif-player .gif-player-inner').append(`<div class="x-gif-view"><x-gif ${loopAttr} ${speedAttr} ${pingpong} stopped src="${urlGif}"></x-gif><span class="play-gif-icon">gif</span></div>`);
			
			xGifReady();
		}
	})
	
	elPlayer.on("click", ".play-gif-icon", function(){
		if (typeof $('x-gif').attr('stopped') !== typeof undefined && $('x-gif').attr('stopped') !== false) {
			$('x-gif').removeAttr('stopped');
			$(".play-gif-icon").hide();
		}else{
			$('x-gif').attr('stopped', '')
		}
	})
	
	elPlayer.on("click", "x-gif", function(){
		if (typeof $('x-gif').attr('stopped') === typeof undefined || $('x-gif').attr('stopped') === false) {
			$('x-gif').attr('stopped', '')
			$(".play-gif-icon").show();
		}
		if (typeof $('x-gif').attr('n-times') !== typeof undefined && $('x-gif').attr('n-times') !== false) {
			if (typeof $('x-gif').attr('stopped') !== typeof undefined && $('x-gif').attr('stopped') !== false) {
				$('x-gif').removeAttr('stopped');
				$(".play-gif-icon").hide();				
			}
		}
	})

	let supperGif = null;
	
	if($('#gif-list').length && $('#gif-list').html() != ''){
		$('#gif-list').appendTo($("#all-gifs"));
		
		let curClass = "active";
		$( "#gif-list img" ).each(function(i, el){
			1 == i && (curClass = "");			
			$(el).wrap(`<div data-stt='${i}' class='gif-item ${curClass}'></div>`);
			
			if(i == 0){
				let title = $(el).attr('title');
				if(title !== undefined && title != ''){
					let tagLink = $(el).data('tagLink');					
					if(tagLink !== undefined && tagLink != '')
						title = `<a href="${tagLink}">${title}</a>`;
					else		
						if(title.indexOf('@') != -1)
							title = `<a href="#">${title}</a>`
							
					elPlayer.before(`<p class="gif-caption">${title}</p>`)
				}
			}
		});
		
		let totalGif = $('#gif-list .gif-item').length,
			currentView = 1;
		
		let miniPager = `<div id="gif-nav"><a data-stt="-1" title="Ảnh trước" class="gif-prev" href="javascript:;">&#8249;</a><span class="gif-total">${currentView} / ${totalGif}</span><a data-stt="1" class="gif-next" href="javascript:;" title="Ảnh sau">&#8250;</a></div>`;
		$(".sgm-top-info").after(miniPager);
		
		let prevStt = 0,
			nextStt = 1;
		
		function setNewGif(elImg){
			let thumbscr = elImg.attr("src");				
			let urlGif = elImg.data("gif");
			
			if($('x-gif').length){
				$('x-gif').remove();
			}
						
			$('.pre-view img.view-thumb').attr('src', thumbscr);
			
			$('#downOGif').attr("href", urlGif);
			
			if($('.gif-player .x-gif-view').length){					
				let speedAttr = speed != null ? `speed="${speed}"` : "";
				let loopAttr = (loop != null && loop > 0) ? `n-times="${loop}"` : "";
				$('.gif-player .x-gif-view').prepend(`<x-gif ${loopAttr} ${speedAttr} ${pingpong} stopped src="${urlGif}">`);
				$('.gif-player .pre-view').show();
				$('.x-gif-view').hide();
				$(".play-gif-icon").show();
				xGifReady();
			}
			
			//if($('#post-gif-controls .btn-download').hasClass('is--active')){
			if($('.gif-download canvas').length){
				$('.down-control').hide();
				$('.gif-download canvas').css('background', 'url('+ thumbscr +') center center no-repeat');
				$('.gif-download img.view-thumb').show();
				
				if($('#allFrame').length){
					$(".all-fr-wrapp").remove();
				}
					
				if(supperGif == null)
					supperGif = new SuperGif({ gif: document.getElementById('thumb-down')});
				
				supperGif.load_url(urlGif, function(){
					$('.gif-download canvas').css('background', "");
					
					$('#totalFr').html('<strong>'+ supperGif.get_current_frame() +'</strong>' + "/" + supperGif.get_length() + " khung hình");
				
					let wFr = $('.gif-download canvas').attr("width"),
						hFr = $('.gif-download canvas').attr("height"),
						frWh = wFr + "x" + hFr;
					$('#whFr').text(frWh);
					
					$('.down-control').show();
					$('.gif-download img.view-thumb').hide();
				})
			}
			
			let title = elImg.attr('title');
			if(title !== undefined && title != ''){
				let tagLink = elImg.data('tagLink');					
				if(tagLink !== undefined && tagLink != '')
					title = `<a href="${tagLink}">${title}</a>`;
				else						
					if(title.indexOf('@') != -1)
						title = `<a href="#">${title}</a>`
				if($('.gif-caption').length){					
					$('.gif-caption').html(title);
					$('.gif-caption').show();
				}else
					elPlayer.before(`<p class="gif-caption">${title}</p>`)
			}else{
				if($('.gif-caption').length)
					$('.gif-caption').hide();
			}
		}
		
		function setNavGif(curStt){
			$("#gif-nav .gif-total").text((curStt+1) + " / " + totalGif);
			if(curStt == 0){
				prevStt = -1;
				nextStt = 1;
			}else if(curStt == totalGif-1){
				prevStt = curStt-1;
				nextStt = -1;
			}else{
				prevStt = curStt-1;
				nextStt = curStt+1;
			}
			$("#gif-nav .gif-prev").data("stt", prevStt);
			$("#gif-nav .gif-next").data("stt", nextStt);
		}
		
		$(".post-body").on('click', '.gif-prev', function(){
			if($(this).data('stt') == -1) return;
			
			let gifItem = $('.gif-item[data-stt="'+ $(this).data('stt') +'"]');
			let curStt = gifItem.data('stt');
			setNavGif(curStt);
			
			$('#gif-list .gif-item').removeClass('active');
			gifItem.addClass('active');
						
			setNewGif(gifItem.find('img'));
		})
		
		$(".post-body").on('click', '.gif-next', function(){
			if($(this).data('stt') == -1) return;
			
			let gifItem = $('.gif-item[data-stt="'+ $(this).data('stt') +'"]');
			let curStt = gifItem.data('stt');
			setNavGif(curStt);
			
			$('#gif-list .gif-item').removeClass('active');
			gifItem.addClass('active');
						
			setNewGif(gifItem.find('img'));
		})
		
		$('#gif-list').on('click', '.gif-item', function(e){
			if(!$(this).hasClass('active')){
				$('#gif-list .gif-item').removeClass('active');
				$(this).addClass('active');
				
				let curStt = $(this).data('stt');
				setNavGif(curStt);
												
				setNewGif($(this).find('img'));
				
				$("html, body").animate({ scrollTop: $(".post.hentry").offset().top }, "slow");
			}			
		});
	}
	
	
	$('#post-gif-controls .btn-play').on('click', function(){
		if(!$(this).hasClass('is--active')){
			$(this).addClass('is--active');
			$('#post-gif-controls .btn-download').removeClass('is--active');
			elDownload.hide();
			elPlayer.show();
			
			if($('.gif-download canvas').length){				
				if(supperGif != null && supperGif.get_playing())
					supperGif.pause();				
			}
		}
	})
	
	
	$('#post-gif-controls .btn-download').on('click', function(){
		if(!$(this).hasClass('is--active')){
			$(this).addClass('is--active');
			$('#post-gif-controls .btn-play').removeClass('is--active');
			elDownload.show();
			elPlayer.hide();
			
			if($('.gif-download canvas').length){
				//$('.gif-download canvas').css('background', 'url('+ thumbscr +') center center no-repeat');
			}else{
				let urlGif = '';
				if($('#gif-source').length){
					urlGif = $('#gif-source').data('source');
				}else if($('#gif-list').length){
					if(!$('#gif-list .active').length)
						$('#gif-list .gif-item:eq(0)').addClass('active');
				
					urlGif = $('#gif-list .gif-item.active img').data('gif');
				}
				$('#downOGif').attr("href", urlGif);
				$('.down-control').hide();
				$('.gif-download img.view-thumb').show();
				supperGif = new SuperGif({ gif: document.getElementById('thumb-down')});
				supperGif.load_url(urlGif, function(){
					$('.gif-download canvas').css('background', "");
					$('#totalFr').html('<strong>'+ supperGif.get_current_frame() +'</strong>' + "/" + supperGif.get_length() + " khung hình");
					
					let wFr = $('.gif-download canvas').attr("width"),
						hFr = $('.gif-download canvas').attr("height"),
						frWh = wFr + "x" + hFr;
					$('#whFr').text(frWh);
					
					$('.down-control').show();
					$('.gif-download img.view-thumb').hide();
				})
			}

			if($('x-gif').length){
				if (typeof $('x-gif').attr('stopped') === typeof undefined || $('x-gif').attr('stopped') === false) {
					$('x-gif').attr('stopped', '')
					$(".play-gif-icon").show();
				}
			}
		}
	})
	
	let firstClick = true;
	elDownload.one('click', 'canvas', function(){		
		supperGif.play();
	}).on('click', 'canvas', function(){
		if(!firstClick)
			if(supperGif.get_playing())
				supperGif.pause();
			else			
				supperGif.play();
		else
			firstClick = false;
	})
	
	$('#down-restart').on('click', function(){
		if(!supperGif.get_loading())
			supperGif.move_to(0);		
	})
	$('#down-forward').on('click', function(){
		if(!supperGif.get_loading())
			supperGif.move_relative(1);		
	})
	$('#down-back').on('click', function(){
		if(!supperGif.get_loading())
			supperGif.move_relative(-1);		
	})
	
	$('#gifDownData').change(function(){
		$('#allFrame a').removeClass('current-frame');
		let idCurFr = "#fr" + $(this).val();
		$(idCurFr).addClass('current-frame');
		$('#totalFr strong').text($(this).val());
	})
	
	$('#down-all-frame').on('click', function(){		
		if($('#allFrame').length){			
			$(".all-fr-wrapp").toggleClass("expanded");			
			return;
		}
		
		if(!supperGif.get_loading()){
			let frHtml = '';
			let currentFr = supperGif.get_current_frame();
			let postTitle = $('.view-thumb').attr('alt');
			
			for(let i = 0; i < supperGif.get_length(); i++){
				supperGif.move_to(i);
				
				let canvas = document.getElementsByTagName("canvas")[0];
				
				let data = canvas.toDataURL("image/jpeg");
				
				let currentClass = i == currentFr ? "class='current-frame'" : "";
				
				frHtml += `<a id="fr${i}" ${currentClass} href="${data}" download="${postTitle} - Frame ${i}"><img src = "${data}" /></a>`;
			}
			$(".down-control").after(`<div class="all-fr-wrapp"><p class="all-fr-note">Click vào ảnh để tải về</p><div class="all-fr-inner"><div id="allFrame">${frHtml}</div></div></div>`);
			
			supperGif.move_to(currentFr);
		}
	})
})