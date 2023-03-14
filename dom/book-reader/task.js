const aSize = document.querySelectorAll(`.font-size`);
const aSizes = Array.from(aSize);

const book = document.getElementById(`book`);

for (let i = 0; i < aSizes.length; i++) {
	//aSizes[i].addEventListener(`click`, change);
	//aSizes[i].addEventListener(`click`, () => false);
	
	/* Почему не работает через addEventListener?
	return false там не срабатывает
	*/

	aSizes[i].onclick = function() {
		let index = aSizes.findIndex(item => item.classList.contains(`font-size_active`));
		aSizes[index].classList.remove(`font-size_active`);

		aSizes[i].classList.add(`font-size_active`);
		
		const attr = aSize[i].getAttribute(`data-size`);
		book.classList.remove(`book_fs-small`);
		book.classList.remove(`book_fs-big`);
		if (attr != null) {
		 	if (attr === `small`) {
		 	  book.classList.add(`book_fs-small`);
		 	} else book.classList.add(`book_fs-big`);
		 }

		return false;
	}
	
 	// function change() {
		
	// 	let index = aSizes.findIndex(item => item.classList.contains(`font-size_active`));
	// 	aSizes[index].classList.remove(`font-size_active`);

	// 	aSizes[i].classList.add(`font-size_active`);
		
	// 	const attr = aSize[i].getAttribute(`data-size`);
	// 	book.classList.remove(`book_fs-small`);
	// 	book.classList.remove(`book_fs-big`);
	// 	if (attr != null) {
	// 	 	if (attr === `small`) {
	// 	 	  book.classList.add(`book_fs-small`);
	// 	 	} else book.classList.add(`book_fs-big`);
	// 	 }

	// 	return false;
 	// }
}

 	const textColor = document.querySelector(`.book__control_color`).querySelectorAll(`.color`);
 	const textColors = Array.from(textColor);

 	for (let i = 0; i < textColors.length; i++) {
 		
 		textColors[i].onclick = function() {
			let index = textColors.findIndex(item => item.classList.contains(`color_active`));
			textColors[index].classList.remove(`color_active`);

			textColors[i].classList.add(`color_active`);
			
			const attr = textColors[i].getAttribute(`data-text-color`);
			book.classList.remove(`book_color-gray`);
			book.classList.remove(`book_color-whitesmoke`);
			book.classList.remove(`book_color-black`);

			if (attr === `black`) {
			 	book.classList.add(`book_color-black`);
			 } else if (attr === `gray`) {
			 	book.classList.add(`book_color-gray`);
			 } else book.classList.add(`book_color-whitesmoke`); 

			return false;
		}
 	}

 	const bgColor = document.querySelector(`.book__control_background`).querySelectorAll(`.color`);
 	const bgColors = Array.from(bgColor);

 	for (let i = 0; i < bgColors.length; i++) {
 		
 		bgColors[i].onclick = function() {
			let index = bgColors.findIndex(item => item.classList.contains(`color_active`));
			bgColors[index].classList.remove(`color_active`);

			bgColors[i].classList.add(`color_active`);
			
			const attr = bgColors[i].getAttribute(`data-bg-color`);
			book.classList.remove(`book_bg-gray`);
			book.classList.remove(`book_bg-black`);
			book.classList.remove(`book_bg-white`);

			if (attr === `black`) {
			 	book.classList.add(`book_bg-black`);
			 } else if (attr === `gray`) {
			 	book.classList.add(`book_bg-gray`);
			 } else book.classList.add(`book_bg-white`); 

			return false;
		}
 	}