/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-work-fairfax': '&#xe613;',
		'icon-work-stuff': '&#xe614;',
		'icon-work-house-of-travel': '&#xe615;',
		'icon-work-nielsen': '&#xe616;',
		'icon-work-silver-fern-farms': '&#xe617;',
		'icon-work-smiths-city': '&#xe618;',
		'icon-work-waterboy': '&#xe619;',
		'icon-icon-design': '&#xe600;',
		'icon-icon-development': '&#xe601;',
		'icon-icon-experience': '&#xe602;',
		'icon-icon-current-employment': '&#xe603;',
		'icon-icon-work': '&#xe604;',
		'icon-icon-history': '&#xe605;',
		'icon-icon-contact': '&#xe606;',
		'icon-icon-references': '&#xe607;',
		'icon-icon-view': '&#xe608;',
		'icon-icon-previous-dormant': '&#xe609;',
		'icon-icon-previous-active': '&#xe60a;',
		'icon-icon-next-dormant': '&#xe60b;',
		'icon-icon-next-active': '&#xe60c;',
		'icon-icon-close-dormant': '&#xe60d;',
		'icon-icon-close-active': '&#xe60e;',
		'icon-icon-phone-dormant': '&#xe60f;',
		'icon-icon-phone-active': '&#xe610;',
		'icon-icon-email-dormant': '&#xe611;',
		'icon-icon-email-active': '&#xe612;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
