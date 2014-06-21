/*jshint devel: true*/
/*global TweenMax: true*/
/*global FastClick: true*/
/*global Modernizr: true*/

$(document).ready(function(){

	var $m = {

		init: function(){

			$m.s.init();
			$m.features.init();
			// $m.work.init();
			$m.details.init();
			$m.fastClick();

			if($('html').hasClass('lt-ie9')){ $m.ie8.init(); }

		}, // end of init

		s: {

			ani: 0.25, // generic animation value

			dom: {}, // store references to DOM element

			col: {
				'blueDark': '#323e50'
			},

			work: false, // boolean check as to if the work ul is being interacted with... dictates how the rollover animations look

			init: function(){



			} // end of init

		}, // end of settings

		g: {

			show: function($this, $state){

				TweenMax.set($this, {'display': $state});

			} // end of show

		}, // end of general

		fastClick: function(){

			FastClick.attach(document.body);

		}, // end of fastClick

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

		work: {

			init: function(){

				$m.work.d(); // get DOM references
				$m.work.l(); // create listeners

			}, // end of init

			d: function(){

				var $work = $('#work'),
					$thumbInfo = $work.find('#thumbInformation'),
					$url = $thumbInfo.find('a'),
					$overflow = $url.find('> .overflow'),
					$cont = $overflow.find('> .content');

				// store in global settings...
				$m.s.dom.work = $work;
				$m.s.dom.thumbInfo = $thumbInfo;
				$m.s.dom.url = $url;
				$m.s.dom.cont = $cont;
				$m.s.dom.shadowTop = $overflow.find('> .shadow.top');
				$m.s.dom.shadowBot = $overflow.find('> .shadow.bottom');
				$m.s.dom.desc = $cont.find('> .description');

			}, // end of DOM

			l: function(){

				console.log('adding WORK listeners...');

				var $work = $m.s.dom.work;

				$work.on('mouseenter', '.thumbList', function(){

					$m.work.a.listEnter();

				}).on('mouseleave', '.thumbList', function(){

					$m.work.a.listLeave();

				}).on('mouseenter', '.thumbSquare', function(){

					$m.work.a.infoEnter($(this));

				});


			}, // end of listeners

			a: {

				infoEnter: function($this){

					var $ani = $m.s.ani,
						$pos = $this.position(),
						$info = $m.s.dom.thumbInfo,
						$content = $m.s.dom.cont,
						$project = $this.attr('data-project');

					console.log('project = ' + $project);

					$m.work.a.desc($this, $info, $project);

					if($m.s.work){

						TweenMax.set($info, {
							'display': 'block'
						});

						TweenMax.to($info, $ani, {
							'left': $pos.left,
							'autoAlpha': '1',
							'top': $pos.top
						});

						$m.work.a.jump.up($this, $info, $project, $ani);

					}else{

						TweenMax.set($info, {
							'display': 'block',
							'left': $pos.left,
							'top': $pos.top
						});

						TweenMax.to($info, $ani, {
							'autoAlpha': '1',
							'transform': 'scale(1)'
						});

					} // end of statement

					$m.work.a.overflow.check($this, $content);

				}, // end of infoEnter

				desc: function($this, $info, $project){

					var $desc = $this.find('> .description').text();

					$info.attr({'data-project': $project});
					$m.s.dom.desc.text($desc);

				}, // end of info

				url: function($this, $project){

					console.log('add in the URL = /' + $project + '.html');

					$m.s.dom.url.attr({'href': $project + '.html'});

				}, // end of url

				overflow: {

					check: function($this, $content){

						var $thumb = $this.height(),
							$contHgt = $content.outerHeight(true),
							$dif = $thumb - $contHgt,
							$top = $m.s.dom.shadowTop,
							$bot = $m.s.dom.shadowBot;

						console.log('thumb height = ' + $thumb);
						console.log('content height = ' + $contHgt);
						console.log('difference = ' + $dif);

						if($dif < 0){

							TweenMax.set($content, {
								'bottom': $dif,
								'transform': 'translateY(0)'
							});
							TweenMax.set($top, {'opacity': '0'});
							TweenMax.set($bot, {'opacity': '1'});

							$m.work.a.overflow.reveal($content, $dif, $top, $bot);

						}else{

							TweenMax.set($content, {
								'bottom': '50%',
								'transform': 'translateY(50%)'
							});
							TweenMax.set($top, {'autoAlpha': '0'});
							TweenMax.set($bot, {'autoAlpha': '0'});

						} // end of statement;

					}, // end of check

					reveal: function($content, $dif, $top, $bot){

						console.log('overflow = true');

						var $ani = ($dif * -1) / 20; // scroll up "?"px per second

						console.log('animation time = ' + $ani);

						TweenMax.to($content, $ani, {
							'bottom': '0'
						});

						TweenMax.to($top, $ani, {
							'autoAlpha': '1'
						});

						TweenMax.to($bot, $ani, {
							'autoAlpha': '0'
						});

					} // end of reveal

				}, // end of overflow

				jump: {

					up: function($this, $info, $project, $ani){

						TweenMax.to($info, ($ani / 2), {
							'boxShadow': '0 30px 30px 0 rgba(0, 0, 0, 0.15)',
							'scale': '1.1',
							'onComplete': $m.work.a.jump.down,
							'onCompleteParams': [$this, $info, $project, $ani]
						});

					}, // end of up

					down: function($this, $info, $project, $ani){

						console.log('- jump down = ' + $project);

						TweenMax.to($info, ($ani / 2), {
							'boxShadow': 'none',
							'scale': '1',
							'onComplete': $m.work.a.url,
							'onCompleteParams': [$this, $project]
						});

					} // end of down

				}, // end of jump

				listEnter: function(){

					console.log('work list = active');
					$m.s.work = true;

				}, // end of listEnter

				listLeave: function(){

					var $ani = $m.s.ani,
						$info = $m.s.dom.thumbInfo;

					TweenMax.to($info, $ani, {
						'autoAlpha': '0',
						'transform': 'scale(1.5)'
					});

					console.log('work list = dormant');
					$m.s.work = false;

				} // end of listLeave

			} // end of actions
		
		}, // end of work

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
				// var $address = $m.s.dom.details.find('address');

				$address.on('mouseenter', 'li', function(){

					$m.details.a.userEnter($(this));
					
				}).on('mouseleave', 'li', function(){

					$m.details.a.userLeave($(this));
					
				});

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

					TweenMax.to($this, $ani, {'color': $m.s.col.blueDark});
					TweenMax.to($dormant, $ani, {'autoAlpha': '1'});
					TweenMax.to($active, $ani, {'autoAlpha': '0'});

				}, // end of userLeave

			} // end of actions

		}, // end of details

		ie8: {

			init: function(){

				$m.ie8.iconFont();

			}, // end if init

			iconFont: function(){

				$('.icon').removeClass('ie8');

			} // end of iconFont
		}

	}; // end of $m module container

	(function(){

		$m.init();

	})();

}); // end of document.ready

