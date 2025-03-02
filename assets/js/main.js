/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

$(document).ready(function () {
	(function($) {
	
		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');
	
		// Breakpoints.
			breakpoints({
				wide:      [ '1281px',  '1680px' ],
				normal:    [ '981px',   '1280px' ],
				narrow:    [ '841px',   '980px'  ],
				narrower:  [ '737px',   '840px'  ],
				mobile:    [ null,      '736px'  ]
			});
	
		// Play initial animations on page load.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});
	
		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1000,
				offset: function() { return $header.height() + 10; }
			});
	
		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (browser.mobile ? 'click' : 'hover')
			});
	
		// Nav Panel.
	
			// Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});
	
			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (browser.os == 'wp' && browser.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');
	
		// Header.
			if (!browser.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {
	
				$window.on('load', function() {
	
					$banner.scrollex({
						bottom:		$header.outerHeight(),
						terminate:	function() { $header.removeClass('alt'); },
						enter:		function() { $header.addClass('alt reveal'); },
						leave:		function() { $header.removeClass('alt'); }
					});
	
				});
	
			}
	
	})(jQuery);
	
	
	document.addEventListener("DOMContentLoaded", function () {
		let submenus = document.querySelectorAll(".has-submenu > a");
	
		submenus.forEach((menu) => {
			menu.addEventListener("click", function (event) {
				event.preventDefault(); // Zapobiega przeładowaniu strony
				let submenuList = this.nextElementSibling;
	
				// Ukrywa wszystkie inne submenu przed otwarciem nowego
				document.querySelectorAll(".has-submenu ul").forEach(ul => {
					if (ul !== submenuList) {
						ul.style.display = "none";
					}
				});
	
				// Przełączanie widoczności submenu
				if (submenuList.style.display === "block") {
					submenuList.style.display = "none";
				} else {
					submenuList.style.display = "block";
				}
			});
		});
	
		// Zamknij menu po kliknięciu poza nim
		document.addEventListener("click", function (event) {
			let isClickInside = event.target.closest(".has-submenu");
			if (!isClickInside) {
				document.querySelectorAll(".has-submenu ul").forEach(ul => {
					ul.style.display = "none";
				});
			}
		});
	});
	});
	
	function zoomImage(event) {
		event.preventDefault();  // Zapobiegamy domyślnemu działaniu linku (czyli przeładowaniu strony)
	
		// Znajdujemy kliknięty obrazek
		const image = event.target;
	
		// Sprawdzamy, czy obrazek jest już powiększony
		if (image.classList.contains('zoomed')) {
			// Jeśli tak, to usuwamy klasę powiększającą
			image.classList.remove('zoomed');
			image.style.transform = ''; // Resetujemy transformację
		} else {
			// Jeśli nie, to dodajemy klasę powiększającą
			image.classList.add('zoomed');
	
			// Obliczamy szerokość okna
			const windowWidth = window.innerWidth;
	
			// Obliczamy szerokość obrazu
			const imageWidth = image.width;
	
			// Obliczamy współczynnik skali w oparciu o szerokość okna i obrazu
			const scaleFactor = windowWidth / imageWidth;
	
			// Ustalamy minimalny i maksymalny współczynnik skali
			const minScale = 1;  // minimalna skala (brak powiększenia)
			const maxScale = 2;  // maksymalna skala (powiększenie o 2 razy)
	
			// Ustalamy wartość skali, która będzie stosowana
			const scale = Math.min(Math.max(scaleFactor, minScale), maxScale);
	
			// Stosujemy obliczoną wartość skali
			image.style.transform = `scale(${scale})`; 
		}
	}

	document.addEventListener("DOMContentLoaded", function () {
		var navPanel = document.getElementById("navPanel");
		var navLinks = navPanel.querySelectorAll("nav a");
	
		// Zmienna do przechowywania maksymalnej szerokości
		var maxWidth = 0;
	
		// Sprawdzamy szerokość każdego linku w menu
		navLinks.forEach(function(link) {
			var linkWidth = link.offsetWidth;
			if (linkWidth > maxWidth) {
				maxWidth = linkWidth;
			}
		});
	
		// Dodajemy padding i ustawiamy szerokość na podstawie najdłuższego linku
		navPanel.style.width = (maxWidth + 40) + "px";  // 40px dla paddingu
	});
	