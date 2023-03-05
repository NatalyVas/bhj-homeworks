const leftArrow = document.getElementsByClassName(`slider__arrow_prev`);
const rightArrow = document.getElementsByClassName(`slider__arrow_next`);

const sliderItem = document.querySelectorAll(`.slider__item`);
const sliderItems = Array.from(sliderItem);

const sliderDot = document.querySelectorAll(`.slider__dot`);
const sliderDots = Array.from(sliderDot);

let index = 0;
sliderDots[0].classList.add(`slider__dot_active`);

leftArrow.item(0).onclick = leftArrowClick;
rightArrow.item(0).onclick = rightArrowClick;


function getSlide(num) {

	let ind = sliderItems.findIndex(item => item.classList.contains(`slider__item_active`));
	sliderItems[ind].classList.remove(`slider__item_active`);
	sliderDots[ind].classList.remove(`slider__dot_active`);
	let numCopy = num;

	if (numCopy < 0 ) {
		numCopy = sliderItems.length - 1
	} else if (numCopy > sliderItems.length - 1) {
			numCopy = 0;
		 }

	//numCopy < 0 ? numCopy = Array.from(sliderItems).length - 1: numCopy > Array.from(sliderItems).length - 1 ? numCopy = 0;
	//numCopy < 0 ? numCopy = sliderItems.length - 1 : numCopy > sliderItems.length - 1 ? numCopy = 0;
	
	sliderItems[numCopy].classList.add(`slider__item_active`);
	sliderDots[numCopy].classList.add(`slider__dot_active`);
}

function leftArrowClick() {
	let ind = sliderItems.findIndex(item => item.classList.contains(`slider__item_active`));

	getSlide(ind - 1);
}

function rightArrowClick() {
	let ind = sliderItems.findIndex(item => item.classList.contains(`slider__item_active`));

	getSlide(ind + 1);
}

for (let i = 0; i < sliderDots.length; i++) {
	sliderDots[i].onclick = clickDots;
	
	function clickDots() {
		getSlide(i);
	}
}