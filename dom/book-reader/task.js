const book = document.getElementById(`book`);

const aSize = document.querySelectorAll(`.font-size`);
const aSizes = Array.from(aSize);

for (let i = 0; i < aSizes.length; i++) {

	aSizes[i].onclick = function() {
		change(aSizes, `font-size_active`, `data-size`, [`book_fs-small`, `book_fs-big`], [`small`, `big`], i);
		return false;
	}
}

 const textColor = document.querySelector(`.book__control_color`).querySelectorAll(`.color`);
 const textColors = Array.from(textColor);

 for (let i = 0; i < textColors.length; i++) {
 		
 	textColors[i].onclick = function() {
 		change(textColors, `color_active`, `data-text-color`, [`book_color-gray`, `book_color-whitesmoke`,`book_color-black`], [`black`, `gray`, `whitesmoke`], i);
 		return false;
 	}
 }

 const bgColor = document.querySelector(`.book__control_background`).querySelectorAll(`.color`);
 const bgColors = Array.from(bgColor);

 for (let i = 0; i < bgColors.length; i++) {
 		
 	bgColors[i].onclick = function() {
 		change(bgColors, `color_active`, `data-bg-color`, [`book_bg-gray`, `book_bg-black`, `book_bg-white`], [`black`, `gray`, `white`], i);
		return false;
	}
 }

function change(arr, classActive, dataAtr, bookClassArray, dataAttrArray, num) {
	let indArrray = bookClassArray[0].split(/\_|\-|\//);
	let index = arr.findIndex(item => item.classList.contains(classActive));
	arr[index].classList.remove(classActive);
	arr[num].classList.add(classActive);

	const attr = arr[num].getAttribute(dataAtr);
	for (let j = 0; j < bookClassArray.length; j++) {
 		book.classList.remove(bookClassArray[j]);
 	}

  	if (attr != null) {
		book.classList.add(`book_${indArrray[1]}-${attr}`);
 	}
}