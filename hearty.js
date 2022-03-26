(function() {
	function getRandomColor() {
		var letters = '789ABCD';
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 6)];
		}
		return color;
	}
	$(function() {
		for(var i = 0; i < 400; i++) {
			var sizes = [
				'',
				'fa-2x',
				'fa-3x',
				'fa-2x',
				'fa-3x',
				'fa-4x',
				'fa-5x'
			];
			//pick random size
			var iconSize = sizes[~~(Math.random() * sizes.length)];
			var leftValue = Math.random(2, 98) * 100;
			var heart = $('<i>').addClass('fa fa-heart '+iconSize).css({
				'left': leftValue+'%',
				'color': getRandomColor()
			});
			$('body').append(heart);
		}
		
		$('body > .fa-heart, img').throwable({
			drag:true,
			gravity:{x:0,y:1},
			impulse:{
				f:52,
				p:{x:1,y:1}
			},
			shape:"circle",
			autostart: true,
			bounce:0,
			damping:0,
			collisionDetection: false
		});
		
		setTimeout(function() {
			$('body').prepend('<div id="text"><h1>Throw the hearts!</h1></div>');
			$('#text').css({
				'margin-left': '-'+($('#text').width()/2)+'px'
			});
		}, 2500);
		
		var clicked = false;
		$('#special').click(function() {
			if(clicked) return;
			clicked = true;
			
			var delay = 100;
			$('#text, body > .fa-heart:not(#special), img').each(function() { 
				var elem = $(this);
				setTimeout(function() {
					elem.animate({
						blurRadius: 20,
						opacity: 0,
					}, {
						duration: 1000,
						step: function() {
							elem.css({
								"filter": "blur("+this.blurRadius+"px)",
								"opacity": this.opacity
							});
						},
						complete: function() {
							elem.remove();
						}
					});
				}, delay);
				delay += 50;
			});
			$('#letter').animate({top: '-=125%'}, 5000,function() {
				$('#letter').throwable({
					drag:false,
					gravity: {x:0,y:0},
					impulse: {
						f:0,
						p:{x:1,y:1}
					},
					autostart: true,
					bounce: 0,
					damping: 100,
					collisionDetection: false
				});
				$('#letter').css('margin-left', 0);
			});
		});
	});
})();