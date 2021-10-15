'use strict';

window.onload = function() {
	const header = document.querySelector('header.header');
	const searchList = document.querySelectorAll('.search');
	const page = document.querySelector('.page');

	//header search open
	searchList.forEach((search) => {
		search.addEventListener('click', () => {
			header.classList.add('header-search-open');

			search.firstElementChild.children[1].focus();

			page.classList.remove('open-menu');
		});

		search.addEventListener('input', () => {
			console.log(search.firstElementChild.children[1])
			if (search.firstElementChild.children[1].value.length !== 0) {
				search.firstElementChild.lastElementChild.style.display = 'block';
			} else {
				search.firstElementChild.lastElementChild.style.display = 'none';
			}
		});
		
		
		search.firstElementChild.addEventListener('focusout', () => {
			if (search.firstElementChild.children[1].value.length === 0) {
				header.classList.remove('header-search-open');
			}
		});

		//header search cleaner
		search.firstElementChild.lastElementChild.addEventListener('click', () => {
			search.firstElementChild.children[1].value = '';
			search.firstElementChild.lastElementChild.style.display = 'none';
		});

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
			
			dropTrigger.addEventListener('click', () => {
				page.classList.remove('open-menu');
			});
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
	const triggersList = document.querySelectorAll('[data-tab]'),
		contentList = document.querySelectorAll('[data-content]');
	
	tabClicker(triggersList, contentList, 'action-card__tab_active', 'action-card__tab-content_hidden', 'data-tab', 'data-content');
	

	//header side-nav open
	const menuTriggerList = document.querySelectorAll('.header__menu, .page__darker');
	const menuItemList = document.querySelectorAll('.tertiary-nav__link, .primary-nav__link');
	menuTriggerList.forEach((menuTrigger) => {
		menuTrigger.addEventListener('click', () => {
			if (window.getComputedStyle(document.querySelector('.header__menu')).display !== 'none') {
				page.classList.toggle('open-nav');
			}
			
			page.classList.remove('open-menu');
		});
	});
	
	menuItemList.forEach((menuItem) => {
		menuItem.addEventListener('click', () => {
			page.classList.remove('open-nav');
		});
	});
	
	//header menu-open
	const primaryItemList = document.querySelectorAll('.primary-nav__link');
	const menuLinkList = document.querySelectorAll('.menu__link, .menu__heading');
	
	primaryItemList.forEach((primaryItem) => {
		primaryItem.addEventListener('click', () => {
			page.classList.add('open-menu');
		});
	});

	menuLinkList.forEach((menuLink) => {
		menuLink.addEventListener('click', (e) => {
			page.classList.remove('open-menu');

			for (let menuLink of menuLinkList) {
				menuLink.classList.remove('menu__link_active');
			}
			e.target.classList.add('menu__link_active');
		});
	});

	//menu tabs
	const menuTabList = document.querySelectorAll('[data-nav-tab]'), 
		menuTabContentList = document.querySelectorAll('[data-menu-content]');

	tabClicker(menuTabList, menuTabContentList, 'primary-nav__link_active', 'menu__inner_hidden', 'data-nav-tab', 'data-menu-content');
	
	//footer accordions open/close
	accordionOpen();

	window.addEventListener('resize', () => {
		if (document.body.clientWidth <= 992) {
			accordionOpen();
		} else {
			document.querySelector('.link-set__body').style.height = 'auto';
		}
	});
	
	//plugins
	//swiper
	const swiperTariff = new Swiper('.slider-card', {
		pagination: {
			el: '.slider-card__pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-card__button-next',
			prevEl: '.slider-card__button-prev',
		},
		slidesPerView: 4,
		spaceBetween: 30,

		breakpoints: {
			0: {
				slidesPerView: 'auto',
				spaceBetween: 14,
				loop: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
				loop: false,
			},
			992: {
				slidesPerView: 3,
			},
			1280: {
				slidesPerView: 4,
			},
		},
		debugger: true,
	});
	
	const swiperNews = new Swiper('.slider-news', {
		pagination: {
			el: '.slider-news__pagination',
			clickable: true,
		},
		
		navigation: {
			nextEl: '.slider-news__button-next',
			prevEl: '.slider-news__button-prev',
		},
		slidesPerView: 3,
		spaceBetween: 30,
		
		breakpoints: {
			0: {
				slidesPerView: 'auto',
				spaceBetween: 10,
				loop: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
				loop: false,
			},
			992: {
				slidesPerView: 3,
			},
		},
		debugger: true,
	});

	const swiperInfo = new Swiper('.slider-info', {
		pagination: {
			el: '.slider-info__pagination',
			clickable: true,
		},

		navigation: {
			nextEl: '.slider-info__button-next',
			prevEl: '.slider-info__button-prev',
		},
		slidesPerView: 3,
		spaceBetween: 30,

		breakpoints: {
			0: {
				slidesPerView: 'auto',
				spaceBetween: 10,
				loop: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
				loop: false,
			},
			992: {
				slidesPerView: 3,
			},
		},
		debugger: true,
	});
	
	//inputmask
	let inputTelList = document.querySelectorAll('[data-mask-tel]');
	for (let inputTel of inputTelList) {
		let im = new Inputmask('+7 (999) 999-99-99');
		im.mask(inputTel);
	}
	
	let inputNumberList = document.querySelectorAll('[data-mask-number]');
	for (let inputNumber of inputNumberList) {
		let im = new Inputmask('9{0,}');
		im.mask(inputNumber);

		inputNumber.addEventListener('input', () => {
			if (inputNumber.previousElementSibling.hasAttribute('data-sum') && +inputNumber.value > +inputNumber.previousElementSibling.dataset.sum) {
				inputNumber.value = +inputNumber.previousElementSibling.dataset.sum;
			}
		});
		
	}
	
	//functions
	function setShadow() {
		if (window.scrollY >= 460) {
			header.style.boxShadow = '0 0.266004px 20px rgba(153, 152, 168, 0.17)';
		} else {
			header.style.boxShadow = 'none';
		}
	}
	
	function tabClicker(triggersList, contentList, tabActive, contentHidden, tabAttribute, contentAttribute) {
		for (let trigger of triggersList) {
			trigger.addEventListener('click', (event) => {
				event.preventDefault();

				for (let trigger of triggersList) {
					trigger.classList.remove(`${tabActive}`);
				}
				trigger.classList.add(`${tabActive}`);

				for (let content of contentList) {
					content.classList.add(`${contentHidden}`);
					if (+trigger.getAttribute(`${tabAttribute}`).match(/\d+/g) === +content.getAttribute(`${contentAttribute}`).match(/\d+/g)) {
						content.classList.remove(`${contentHidden}`);
					}
				}
			});
		}
	}

	function autoHeightAnimate (element, time, speed) {
		let curHeight = element.offsetHeight;
		function autoHeight () {
			element.style.height = 'auto';
			return element.offsetHeight;
		}
		element.style.height = curHeight + 'px';
		function animate () {
			if (curHeight < autoHeight()) {
				curHeight += speed;
				element.style.height = curHeight + 'px';
			} else {
				clearInterval(interval);
			}
		}
		let interval = setInterval(animate, time);
	}

	function autoHeightAnimateDelete (element, time, speed) {
		let curHeight = element.offsetHeight;
		function animate () {
			if (curHeight > 0) {
				curHeight -= speed;
				element.style.height = curHeight + 'px';
			} else {
				element.style.height = '0';
				clearInterval(interval);
			}
		}
		let interval = setInterval(animate, time);
	}
	
	function accordionOpen () {
		const accordionHeaderList = document.querySelectorAll('.link-set__header');

		accordionHeaderList.forEach((accordionHeader) => {
			accordionHeader.addEventListener('click', () => {
				accordionHeader.parentElement.classList.toggle('accordion-open');
				if (window.getComputedStyle(accordionHeader.nextElementSibling).getPropertyValue('height') !== '0px') {
					autoHeightAnimateDelete(accordionHeader.nextElementSibling, 1, 10);
					accordionHeader.parentElement.classList.remove('accordion-open');
				} else {
					autoHeightAnimate(accordionHeader.nextElementSibling, 5, 10);
				}
			});
		})
		//accordion.classList.add('accordion-open');
		//accordionBody.style.height = 'auto';

		
	}
}