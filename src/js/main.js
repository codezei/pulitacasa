

import works from './modules/works'
import header from './modules/header'
import services from './modules/services'
import reviews from './modules/reviews'
import process from './modules/process'
import accordion from './modules/accordion'
import categories from './modules/categories'
import indicators from './modules/indicators'


document.addEventListener('DOMContentLoaded', function () {
	
	header()
	services()
	reviews()
	works()
	process()
	accordion()
	categories()
	indicators()

	AOS.init({
		offset: 80,
		duration: 200,
		easing: 'ease-in',
		once: true,
	});
})

