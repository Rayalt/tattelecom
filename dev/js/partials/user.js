'use strict';

window.onload = function() {
	const header = document.querySelector('header.header');
	const search = document.querySelector('.search');
	const searchInput = document.querySelector('.search__input');
	const inputSearchCleaner = document.querySelector('.search__cleaner');

	//header search open
	search.addEventListener('click', () => {
		header.classList.add('header-search-open');
		searchInput.focus();
	});
	search.addEventListener('input', () => {
		if (searchInput.value.length !== 0) {
			inputSearchCleaner.style.display = 'block';
		} else {
			inputSearchCleaner.style.display = 'none';
		}
	});
	searchInput.addEventListener('focusout', () => {
		if (searchInput.value.length === 0) {
			header.classList.remove('header-search-open');
		}
	});

	//header search cleaner
	inputSearchCleaner.addEventListener('click', () => {
		searchInput.value = '';
		inputSearchCleaner.style.display = 'none';
	});
	
	//header shadow
	setShadow();
	window.addEventListener('scroll', () => {
		setShadow();
	});
	
	
	//dropdowns
	const dropTriggerList = document.querySelectorAll('[data-drop]');
	const dropItemList = document.querySelectorAll('[data-drop-item]');

	document.body.addEventListener('click', (e) => {
		dropTriggerList.forEach((dropTrigger) => {
			if (e.target.classList.contains('secondary-nav__drop-trigger') || e.target.classList.contains('secondary-nav__drop-title') || e.target.classList.contains('secondary-nav__drop-icon')) {
				header.classList.add('drop-secondary-open');
				header.classList.remove('drop-tertiary-open');
			} else if (e.target.classList.contains('tertiary-nav__drop-trigger') || e.target.classList.contains('tertiary-nav__drop-link') || e.target.classList.contains('tertiary-nav__drop-icon')) {
				header.classList.add('drop-tertiary-open');
				header.classList.remove('drop-secondary-open');
			} else {
				header.classList.remove('drop-tertiary-open');
				header.classList.remove('drop-secondary-open');
			}
		});
	});
	
	dropItemList.forEach((dropItem) => {
		dropItem.addEventListener('click', () => {
			dropItem.parentElement.previousElementSibling.firstElementChild.innerHTML = dropItem.firstChild.innerHTML;
			header.classList.remove('drop-tertiary-open');
			header.classList.remove('drop-secondary-open');
		});
	});
	
	//tabs
	let triggersList = document.querySelectorAll('[data-tab]'),
		contentList = document.querySelectorAll('[data-content]');

	for (let trigger of triggersList) {
		trigger.addEventListener('click', (event) => {
			event.preventDefault();

			for (let trigger of triggersList) {
				trigger.classList.remove('action-card__tab_active');
			}
			trigger.classList.add('action-card__tab_active');

			for (let content of contentList) {
				content.classList.add('action-card__tab-content_hidden');
				if (+trigger.getAttribute('data-tab').match(/\d+/g) === +content.getAttribute('data-content').match(/\d+/g)) {
					content.classList.remove('action-card__tab-content_hidden');
				}
			}
		});
	}
	
	//plugins
	//swiper
	const swiperTariff = new Swiper('.slider-card', {
		slidesPerView: 4,
		pagination: {
			el: '.slider-card__pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-card__button-next',
			prevEl: '.slider-card__button-prev',
		},
		// autoplay: {
		// 	delay: 5000,
		// 	pauseOnMouseEnter: true,
		// },
		spaceBetween: 30,
		debugger: true,
		mousewheel: true,
	});

	
	const swiperNews = new Swiper('.slider-news', {
		slidesPerView: 3,
		navigation: {
			nextEl: '.slider-news__button-next',
			prevEl: '.slider-news__button-prev',
		},
		// autoplay: {
		// 	delay: 5000,
		// 	pauseOnMouseEnter: true,
		// },
		spaceBetween: 30,
		debugger: true,
		mousewheel: true,
	});
	
	//inputmask
	let inputTelList = document.querySelectorAll('[data-mask-tel]');
	for (let inputTel of inputTelList) {
		let im = new Inputmask('+7 (999) 999-99-99');
		im.mask(inputTel);
	}
	
	let inputNumberList = document.querySelectorAll('[data-mask-number]');
	for (let inputNumber of inputNumberList) {
		let im = new Inputmask('9{1,}');
		im.mask(inputNumber);
	}
	
	
	//functions
	function setShadow() {
		if (window.scrollY >= 460) {
			header.style.boxShadow = '0 0.266004px 20px rgba(153, 152, 168, 0.17)';
		} else {
			header.style.boxShadow = 'none';
		}
	}
}