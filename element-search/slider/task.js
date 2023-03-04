const leftArrow = document.getElementsByClassName(`slider__arrow_prev`);
const rightArrow = document.getElementsByClassName(`slider__arrow_next`);

const sliderItems = document.querySelectorAll(`.slider__item`);
Array.from(sliderItems);

const sliderDots = document.querySelectorAll(`.slider__dot`);
Array.from(sliderDots);

let index = 0;
sliderDots[0].classList.add(`slider__dot_active`);

leftArrow.item(0).onclick = leftArrowClick;
rightArrow.item(0).onclick = rightArrowClick;

function leftArrowClick() {
	sliderItems[index].classList.remove(`slider__item_active`);
	sliderDots[index].classList.remove(`slider__dot_active`);
	if (index - 1 >= 0) {
		sliderItems[index - 1].classList.add(`slider__item_active`);
		sliderDots[index - 1].classList.add(`slider__dot_active`);
		index = index - 1;	
	} else {
		index = sliderItems.length - 1;
		sliderItems[index].classList.add(`slider__item_active`);
		sliderDots[index].classList.add(`slider__dot_active`);
	}
}

function rightArrowClick() {
	sliderItems[index].classList.remove(`slider__item_active`);
	sliderDots[index].classList.remove(`slider__dot_active`);
	if (index + 1 <= sliderItems.length - 1) {
		sliderItems[index + 1].classList.add(`slider__item_active`);
		sliderDots[index + 1].classList.add(`slider__dot_active`);
		index = index + 1;	
	} else {
		index = 0;
		sliderItems[index].classList.add(`slider__item_active`);
		sliderDots[index].classList.add(`slider__dot_active`);
	}
}

for (let i = 0; i < sliderDots.length; i++) {
	sliderDots[i].onclick = clickDots;
	function clickDots() {
		sliderDots[index].classList.remove(`slider__dot_active`);
		sliderDots[i].classList.add(`slider__dot_active`);

		sliderItems[index].classList.remove(`slider__item_active`);
		sliderItems[i].classList.add(`slider__item_active`);
		index = i;
	}
}

