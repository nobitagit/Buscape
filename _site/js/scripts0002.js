+(function(){


	// STATS ANIMATIONS
	// --> REVIEWS ANIM.

	function BuscaSlides(reviews, transitionTime){
		this.review = reviews;
		this.len = reviews.length;
		this.stateDefaults = {
			'-webkit-transform': 'perspective(250px) rotateY( 0deg )',
			'-moz-transform':    'perspective(250px) rotateY( 0deg )',
			'-ms-transform':     'perspective(250px) rotateY( 0deg )',
			'transform':         'perspective(250px) rotateY( 0deg )'
		};
		this.animDefaults = {
			'-webkit-transform': 'perspective(250px) rotateY( 90deg )',
			'-moz-transform': 'perspective(250px) rotateY( 90deg )',
			'-ms-transform': 'perspective(250px) rotateY( 90deg )',
			'transform': 'perspective(250px) rotateY( 90deg )',
			'-webkit-transition': transitionTime || 'all 1s',
			'-moz-transition': transitionTime || 'all 1s',
			'-o-transition': transitionTime || 'all 1s',
			'transition': transitionTime || 'all 1s'
		};
	}

	BuscaSlides.prototype.spin = function(timing){
		var	that = this,
			current = 0;

		// Hide all but first review
		that.review.slice(1).hide();
		setInterval(function(){
			// basic && cross-browser fadeIn/fadeOut
			that.review.eq(current).fadeOut(1000)
				// here we animate only the blockquote for supported Browsers
				.find('blockquote').css(that.animDefaults);	// Hide currently displayed review
			current = (current === that.len - 1) ? 0 : current+=1;	// if we're on last slide set current to 0 otherwise = next
			that.review.eq(current).fadeIn( timing/2 )
				.find('blockquote').css(that.stateDefaults);	// Show next review
		},timing);
	};

	function revSlideInit(){
		var revSlide = new BuscaSlides($('.new-quote'), 'all 1s');
		revSlide.spin(5000);
	}
	revSlideInit();

	// NUMBERS ANIM.
	var bindAnimate = function(){
		$(this).addClass('animated10 activecolor');
	};

	var animateStats = function(){
		var nums = $('.numbers');
			numsLen = nums.length;

		for( var i = 0; i < numsLen; i++){
			var $this = nums.eq(i),	// we target each entry in the stats
				span = $this.find('span'),
				ow = span.outerWidth(), // check for digits width in px
				digits = span.text().length, // count the n° of digits
				calcWidth = Math.floor(ow / 100 * 160); // define the dimensions of the surrounding circle

			// apply the animation to each entry with a slight delay
			$this.delay(i*400).animate({
						width: calcWidth,
						height: calcWidth,
						borderWidth: digits * 3, // the bigger the number, the thicker the circle (border)
						lineHeight: calcWidth - ( digits * 6 ) + 'px', // vertical centering for digits
						marginLeft: -(calcWidth / 2), // keep the circle always centered while growing
						fontSize: 20 + digits * 4 + 'px' // smaller font for smaller numbers
			}, 1200, bindAnimate);
		}

	};

	animateStats();


	// MENU BEHAVIOURS
	var menuButtons = $('ul.menu li'),
		mobileBreakpoint = 600;

	$('div.toggler2').click(function(){
			// open/close menu
			menuButtons.slideToggle();
	});

	var closeMobileMenu = function(){
		menuButtons.slideUp();
	};

	// Hides menu items for mobile users when page is *loaded*
	$(document).ready(function(){
		if ($(window).width() < mobileBreakpoint ) {
		closeMobileMenu();
		}
	});


	// Hides/shows menu items for mobile users when page is *resized*
	$(window).resize(function(){
		var viewport = $(window).width(),
			nav_menu = $('ul#the-menu');
		if ( viewport >= mobileBreakpoint ) {
			// remove style added by clicking the toggler so that menu
			// displays ok when resizing over 600px
			menuButtons.removeAttr('style');

		} else {
			// closes the menu when resizing from mobile to desktop
			closeMobileMenu();
		}
	});
	$('.to-top').on('click', function(){
		$('html, body').animate({
            scrollTop: $('.main-sect').offset().top
	}, 1500);
	});


if (!("pushState" in history)) { // check
	// if pushState is unsupported... IE9 and below
	console.log('uh uh..old browser');
} else {
	// ...if pushState is supported then
	console.log('pushState is supported');
			// Do something, then change the URL
	//window.history.replaceState(null, "New Title", link);
}


// Check for pushState support (modern browsers, IE10+)
// If true we use AJAX to load pages without full page refresh
// updating the url every time so pages can be hotlinked.
// If false fallback to standard mode and refresh the page.
if ('pushState' in history) {
	var content = $('#container');

	$('header a').on('click', function(e){
		var $this = $(this),
			link = $this.attr('href'),
			alt = $this.attr('alt'),
			clickedListItem = $this.parent(),
			viewport = $(window).width();

		// prevent page refresh
		e.preventDefault();

			window.onpopstate = function(event) {
				//alert(location.href);
				//window.location = location.href;
			};

		// hide current page content
		// fire ajax function on callback
		content.animate({opacity: 0, visibility: 'hidden'}, 200, ajaxLoad);

		function ajaxLoad(){
			content.load( link + ' .page-contents', function(){
					content
					.css({'margin-top': '-100px', 'padding-bottom': '100px', visibility: 'visible' })
					.animate({'margin-top': 0, 'padding-bottom': 0, opacity: 1},500);

					if($('.stats').length !== 0){
						animateStats();
						revSlideInit();
					}
				});


			// update title in history (alt) and URL in the address bar (link)
			window.history.pushState(null, alt, link);
			// update title
			$('title').text('Buscapè - ' + alt);

		}


		// if we're on mobile better close the menu after tapping
		if ( viewport < mobileBreakpoint ) {
			closeMobileMenu();
		}

		// highlight current page in the menu
		if ( $(this).hasClass('logo') )
			{
				// if logo is clicked remove highlight from every button
				menuButtons.removeClass('highlighted');

			} else {
				// if a button is clicked highlight this one and remove highlight from the other buttons
				clickedListItem.addClass('highlighted').siblings().removeClass('highlighted');
			}
	}); // end ajax page loading function
}


/*
var quotes = $('.new-quote'),
	len = quotes.length,
	current = 0,
	speed = 1100;

// Hide all but first review
quotes.slice(1).hide();

setInterval(function(){
	quotes.eq(current).fadeOut(speed/4);	// Hide currently displayed review
	current = (current === len - 1) ? 0 : current+=1;	// if we're on last slide set current to 0 otherwise = next
	quotes.eq(current).fadeIn(speed);	// Show next || first review
},5000);
*/

})();

