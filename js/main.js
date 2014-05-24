/*jshint devel: true*/
/*global TweenMax: true*/
/*global TimelineMax: true*/

$(document).ready(function(){

	var $m = {

		init: function(){

			$m.work.l();

		}, // end of init

		s: {

			ani: 0.25, // generic animation value

			work: false, // boolean check as to if the work ul is being interacted with... dictates how the rollover animations look

		}, // end of settings

		g: {

			show: function($this, $state){

				TweenMax.set($this, {'display': $state});

			} // end of show

		}, // end of general

		work: {

			l: function(){

				console.log('adding WORK listeners...');

				var $work = $('#work');

				$work.on('mouseenter', '.thumbList', function(){

					$m.work.a.listEnter($work);

				}).on('mouseleave', '.thumbList', function(){

					$m.work.a.listLeave($work);

				}).on('mouseenter', '.thumbSquare', function(){

					$m.work.a.infoEnter($work, $(this));

				});


			}, // end of listeners

			a: {

				infoEnter: function($work, $this){

					var $ani = $m.s.ani,
						$pos = $this.position(),
						$info = $work.find('#workInformation');

					if($m.s.work){

						TweenMax.set($info, {
							'display': 'block'
						});

						TweenMax.to($info, $ani, {
							'left': $pos.left,
							'opacity': '1',
							'top': $pos.top
						});

						$m.work.a.jump.up($info, $ani);

					}else{

						TweenMax.set($info, {
							'display': 'block',
							'left': $pos.left,
							'top': $pos.top
						});

						TweenMax.to($info, $ani, {
							'opacity': '1',
							'transform': 'scale(1)'
						});

					} // end of statement

				}, // end of infoEnter

				jump: {

					up: function($info, $ani){

						TweenMax.to($info, ($ani / 2), {
							'boxShadow': '0 30px 30px 0 rgba(0, 0, 0, 0.15)',
							'scale': '1.1',
							'onComplete': $m.work.a.jump.down,
							'onCompleteParams': [$info, $ani]
						});

					}, // end of up

					down: function($info, $ani){

						TweenMax.to($info, ($ani / 2), {
							'boxShadow': 'none',
							'scale': '1'
						});

					} // end of down

				}, // end of jump

				listEnter: function(){

					console.log('work list = active');
					$m.s.work = true;

				}, // end of listEnter

				listLeave: function($work){

					var $ani = $m.s.ani,
						$info = $work.find('#workInformation');

					TweenMax.to($info, $ani, {
						'opacity': '0',
						'transform': 'scale(1.5)',
						'onComplete': $m.g.show,
						'onCompleteParams': [$info, 'none']
					});

					console.log('work list = dormant');
					$m.s.work = false;

				} // end of listLeave

			} // end of actions
		}


	}; // end of $m module container

	(function(){

		$m.init();

	})();

}); // end of document.ready

