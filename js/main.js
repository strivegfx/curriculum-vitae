/*jshint devel: true*/
/*global TweenMax: true*/
/*global FastClick: true*/
/*global Modernizr: true*/

$(document).ready(function(){

	var $m = {

		init: function(){

			if($('html').hasClass('lt-ie9')){ $m.ie8.init(); }

			$m.features.init();
			$m.work.init();
			$m.details.init();
			$m.fastClick();
			$m.lightBox.init();

		}, // end of init

		s: {

			ani: 0.25, // generic animation value

			dom: {}, // store references to DOM element

			col: {
				'white': '255, 255, 255',
				'blueLight': '120, 204, 254',
				'blue': '#538ed9',
				'blueMedium': '#325a8d',
				'blueDark': '50, 62, 80',
				'divider': '242, 250, 255',
				'shadow': '220, 220, 220'
			},

			ltie9: false

		}, // end of settings

		g: {

		}, // end of general

		fastClick: function(){

			FastClick.attach(document.body);

		}, // end of fastClick

		/*
          __             _                       
         / _| ___  __ _ | |_  _  _  _ _  ___  ___
        |  _|/ -_)/ _` ||  _|| || || '_|/ -_)(_-<
        |_|  \___|\__,_| \__| \_,_||_|  \___|/__/

		*/

		features: {

			init: function(){

				$m.features.check();

			}, // end of init

			check: function(){

				console.log('checking features');

				var $html = $('html');

				if(!Modernizr.mq('only all')){

					$html.addClass('no-mediaquery');

				} // end of statement

				if(!$html.hasClass('no-svg')){

					console.log('svg suport = false');

					$('#portraitBody').attr({'src': 'img/me-body.png'});
					$('#portraitHands').attr({'src': 'img/me-hands.png'});

				} // end of statement

			} // end of check

		}, // end of features

		/*
                           _   
        __ __ __ ___  _ _ | |__
        \ V  V // _ \| '_|| / /
         \_/\_/ \___/|_|  |_\_\

		*/

		work: {

			init: function(){

				$m.work.d(); // get DOM references
				$m.work.l(); // create listeners

			}, // end of init

			d: function(){

				$m.s.dom.work = $('#work');

			}, // end of DOM

			l: function(){

				console.log('adding WORK listeners...');

				var $work = $m.s.dom.work,
					$ul = $work.find('> .shadowContainer').find('> .thumbList');

				if(!$m.s.ltie9){

					$ul.on('mouseenter', '.thumbSquare', function(){

						$m.work.a.thumbEnter($(this));

					}).on('mouseleave', '.thumbSquare', function(){

						$m.work.a.thumbLeave($(this));

					});

				} // end of statement

				$ul.on('click', '.thumbSquare', function($e){

					$e.preventDefault();

					$m.lightBox.a.state.setDetails($(this));
					$m.lightBox.a.state.fadeIn();

				});

			}, // end of listeners

			a: {

				thumbEnter: function($this){

					// console.log('thumbEnter');

					var $ani = $m.s.ani;

					$this.attr({'data-state': 'enter'});

					TweenMax.to($this.find('> a'), $ani, {
						'color': 'rgb(' + $m.s.col.blueLight + ')',
						'transform': 'translateY(-1.5em) scale(1.1)',
						'textShadow': '0 1.5em 10px rgb(' + $m.s.col.shadow + ')'
					});

				}, // end of thumbEnter

				thumbLeave: function($this){

					// console.log('thumbLeave');

					var $ani = $m.s.ani;

					$this.removeAttr('data-state');

					TweenMax.to($this.find('> a'), $ani, {
						'color': 'rgb(' + $m.s.col.blueDark + ')',
						'transform': 'translateY(0) scale(1)',
						'textShadow': 'none'
					});

				} // end of thumbLeave

			} // end of actions
		
		}, // end of work

		/*
         _  _        _    _     _              
        | |(_) __ _ | |_ | |_  | |__  ___ __ __
        | || |/ _` || ' \|  _| | '_ \/ _ \\ \ /
        |_||_|\__, ||_||_|\__| |_.__/\___//_\_\
              |___/

		*/

		lightBox: {

			init: function(){

				$m.lightBox.l(); // create listeners

			}, // end of init

			s: {

				module: $('#lightBox'),

				projectCurrent: 1,

				projectLength: {
					travelHub : 3,
					rateCard : 2,
					nielsen : 3,
					waterboy : 1,
					dealsSection : 3,
					silverFernFarms : 3,
					stuffRedesign : 6,
					travelInfographic : 3,
					smithCity : 2
				}

			}, // end of settings

			l: function(){

				// console.log('adding LIGHT BOX listeners...');

				var $lb = $m.lightBox.s.module;

				if(!$m.s.ltie9){

					$lb.on('mouseenter', 'a', function(){

						$m.lightBox.a.changeIcon($(this), 'enter');

					}).on('mouseleave', 'a', function(){

						$m.lightBox.a.changeIcon($(this), 'leave');

					});

				} // end of statement

				$lb.on('click', 'a', function($e){

					$e.preventDefault();

					var $this = $(this);

					if($this.hasClass('close')){ $m.lightBox.a.state.fadeOut(); }
					else if($this.hasClass('previous')){ $m.lightBox.a.updateProject.init('-'); }
					else if($this.hasClass('next')){ $m.lightBox.a.updateProject.init('+'); }

				});

			}, // end of listeners

			a: {

				state: {

					fadeIn: function(){

						// console.log('open light box');

						var $ani = $m.s.ani,
							$lb = $m.lightBox.s.module;

						TweenMax.to($lb, $ani, {
							'autoAlpha': 1
						});

						if($m.s.ltie9){ $m.ie8.iconFont.lightBox(); }

					}, // end of fadeIn

					setDetails: function($this){

						var $lb = $m.lightBox.s.module,
							$img = $lb.find('> .content'),
							$pC = $this.attr('data-project'), // projectCurrent
							$pL = $m.lightBox.s.projectLength[$pC];

						$m.lightBox.s.projectCurrent = $pC;

						// reset the projectImage reference
						$img.attr({
							'data-projectCurrent': $pC,
							'data-projectLength': $pL,
							'data-projectImage': 1,
						});

						$lb.find('> .bottom-ui')
							.find('.dynamic.length').text($pL)
							.end()
							.find('.dynamic.current').text('1');

					}, // end of setDetails

					fadeOut: function(){

						// console.log('close light box');

						var $ani = $m.s.ani,
							$lb = $m.lightBox.s.module;

						TweenMax.to($lb, $ani, {
							'autoAlpha': 0
						});

					} // end of fadeOut

				}, // end of state

				changeIcon: function($this, $state){

					var $ani = $m.s.ani,
						$dormant = $this.find('.dormant'),
						$active = $this.find('.active'),
						$val;

					if($state === 'enter'){ $val = 0; }else{ $val = 1; }

					TweenMax.to($dormant, $ani, {
						'autoAlpha': $val
					});

					if($state === 'enter'){ $val = 1; }else{ $val = 0; }

					TweenMax.to($active, $ani, {
						'autoAlpha': $val
					});

				}, // end of changeIcon

				updateProject: {

					init: function($dir){

						console.log('direction = ' + $dir);

						$m.lightBox.a.updateProject.fadeOut($dir);

					}, // end of init

					fadeOut: function($dir){

						var $ani = $m.s.ani,
							$lb = $m.lightBox.s.module,
							$img = $lb.find('> .content');

						TweenMax.to($img, $ani, {
							'left': $dir + '=100px',
							'opacity': '0',
							'onComplete': $m.lightBox.a.updateProject.swap,
							'onCompleteParams': [$img, $dir]
						});
						
					}, // end of fadeOut

					swap : function($img, $dir){

						var $pC = $m.lightBox.s.projectCurrent, // projectCurrent
							$pL = $m.lightBox.s.projectLength[$pC], // projectLength
							$pI = parseInt($img.attr('data-projectImage'), 10); // projectImage

						// console.log('projectCurrent | before = ' + $pI);

						console.log('PC = ' + ($pC));
						console.log('PL = ' + ($m.lightBox.s.projectLength[$pC]));
						console.log('PI = ' + parseInt($img.attr('data-projectImage'), 10));

						if($dir === '+'){

							$pI += 1;

							if($pI > $pL){

								$pI = 1;

							} // end of statement

						}else{

							$pI -= 1;

							if($pI < 1){

								$pI = $pL;

							} // end of statement

						} // end of statement

						console.log('projectCurrent | after = ' + $pI);

						$img.attr({
							'data-projectImage': $pI
						});

						$img.siblings('.bottom-ui')
							.find('.dynamic.current')
							.text($pI);

						$m.lightBox.a.updateProject.fadeIn($img, $dir);

					}, // end of swap

					fadeIn: function($img, $dir){

						var $ani = $m.s.ani;

						if($dir === '+'){

							$dir = '-';

						}else{

							$dir = '+';

						} // end of statement

						console.log('left = ' + $dir + '=100');

						TweenMax.set($img, {
							'left': $dir + '=200px'
						});

						TweenMax.to($img, $ani, {
							'left': '0',
							'opacity': '1'
						});
						
					} // end of fadeIn

				} // end of updateProject

			} // end of actions

		}, // end of lightBox

		/*
            _       _          _  _     
         __| | ___ | |_  __ _ (_)| | ___
        / _` |/ -_)|  _|/ _` || || |(_-<
        \__,_|\___| \__|\__,_||_||_|/__/

		*/

		details: {

			init: function(){

				$m.details.d(); // get DOM references
				$m.details.l(); // create listeners

			}, // end of init

			d: function(){

				$m.s.dom.details = $('#details');

			}, // end of DOM

			l: function(){

				var $address = $m.s.dom.details.find('> .shadowContainer').find('> address');

				if(!$m.s.ltie9){

					$address.on('mouseenter', 'li', function(){

						$m.details.a.userEnter($(this));
						
					}).on('mouseleave', 'li', function(){

						$m.details.a.userLeave($(this));
						
					});

				} // end of statement

			}, // end of listeners

			a: {

				userEnter: function($this){

					console.log('detail enter');

					var $ani = $m.s.ani,
						$dormant = $this.find('.dormant'),
						$active = $this.find('.active');

					TweenMax.to($this, $ani, {'color': '#fff'});
					TweenMax.to($dormant, $ani, {'autoAlpha': '0'});
					TweenMax.to($active, $ani, {'autoAlpha': '1'});

				}, // end of userEnter

				userLeave: function($this){

					console.log('detail leave');

					var $ani = $m.s.ani,
						$dormant = $this.find('.dormant'),
						$active = $this.find('.active');

					TweenMax.to($this, $ani, {'color': 'rgb(' + $m.s.col.blueDark + ')'});
					TweenMax.to($dormant, $ani, {'autoAlpha': '1'});
					TweenMax.to($active, $ani, {'autoAlpha': '0'});

				}, // end of userLeave

			} // end of actions

		}, // end of details

		/*
         _       ___ 
        (_) ___ ( _ )
        | |/ -_)/ _ \
        |_|\___|\___/

		*/

		ie8: {

			init: function(){

				$m.s.ltie9 = true;
				$m.ie8.iconFont.allRef();

			}, // end if init

			iconFont: {

				allRef: function(){

					$('.icon').removeClass('ie8');

				}, // end of allRef

				lightBox: function(){

					$('.icon').addClass('ie8');
					$('.icon').removeClass('ie8');
				} // end of lightBox

			} // end of iconFont
		}

	}; // end of $m module container

	(function(){

		$m.init();

	})();

}); // end of document.ready

