const controlDec = Array.from(document.querySelectorAll(`.product__quantity-control_dec`));
const controlInc = Array.from(document.querySelectorAll(`.product__quantity-control_inc`));
const productValue = Array.from(document.querySelectorAll(`.product__quantity-value`));

for (let i = 0; i < controlDec.length; i++) {
	controlDec[i].addEventListener(`click`, () => {
		productValue[i].textContent = Math.floor(productValue[i].textContent) - 1;
		if (Math.floor(productValue[i].textContent) < 0) {
			productValue[i].textContent = `0`;
		}
	});
}

for (let i = 0; i < controlInc.length; i++) {
	controlInc[i].addEventListener(`click`, () => {
		productValue[i].textContent = Math.floor(productValue[i].textContent) + 1;
	});
}

let storage = window.localStorage;
//storage.clear();
let countItemInCart = storage.length;
let cart = document.querySelector(`.cart__products`);

if (storage.length > 0) {
	for (let i = 0; i < storage.length; i++) {
		let get = storage.getItem(i);
		let div = document.createElement(`div`);
		div.innerHTML = get;
		let el = div.firstChild;
		cart.appendChild(el);
		document.querySelector(`.cart`).classList.add(`cart__visible`);

		deleteItem(el.querySelector(`.product__delete`));
	}
}

const productAdd = Array.from(document.querySelectorAll(`.product__add`));

for (let i = 0; i < productAdd.length; i++) {
	productAdd[i].addEventListener(`click`, () => {
		let product = document.createElement('div');
		product.classList.add(`cart__product`);
		product.dataset.id = productAdd[i].closest(`.product`).getAttribute(`data-id`);

		let img = document.createElement(`img`);
		img.classList.add(`cart__product-image`);
		img.src = productAdd[i].closest(`.product`).querySelector(`.product__image`).src;
		product.appendChild(img);

		let count = document.createElement('div');
		count.classList.add(`cart__product-count`);
		count.textContent = productAdd[i].closest(`.product__quantity`).querySelector(`.product__quantity-value`).textContent;
		product.appendChild(count);

		let deleteButton = document.createElement(`div`);
		deleteButton.classList.add(`product__delete`);
		deleteButton.textContent = `Удалить`;
		product.appendChild(deleteButton);


		//let cart = document.querySelector(`.cart__products`);
		if (cart === null || !checkId(cart, product.dataset.id, productAdd[i].closest(`.product__quantity`).querySelector(`.product__quantity-value`).textContent
 )) {
			cart.appendChild(product);
			checkCart();
			storage.setItem(countItemInCart, product.outerHTML);
			countItemInCart += 1;
		}

		deleteItem(deleteButton);
	});
}

function deleteItem(button) {
	button.addEventListener(`click`, () => {
		button.closest(`.cart__product`).remove();
		let index = Object.keys(storage).find(key => storage[key] === button.closest(`.cart__product`).outerHTML);
		storage.removeItem(index);
		countItemInCart -= 1;
		checkCart();
	});
}

function checkId(obj, findId, count) {
	let cartProduct = Array.from(obj.querySelectorAll(`.cart__product`));
	for (let pro of cartProduct) {
		if (pro.dataset.id === findId) {
			pro.querySelector(`.cart__product-count`).textContent = Math.floor(pro.querySelector(`.cart__product-count`).textContent) + Math.floor(count);
			
			/* анимация */
			let start = document.querySelector(`.products`).querySelector(`[data-id = "${findId}"]`).querySelector(`.product__image`);
			animaton(start, pro.querySelector(`.cart__product-image`));
			/* анимация */

			return true;
		}
	}
	return false;
} 

function checkCart() {
	if (document.querySelector(`.cart__product`) != null) {
		document.querySelector(`.cart`).classList.add(`cart__visible`);
	} else {
		document.querySelector(`.cart`).classList.remove(`cart__visible`);
	}
}

function animaton(objStart, objFin) {
	let coordStart = objStart.getBoundingClientRect();
	let coordFin = objFin.getBoundingClientRect();
	let offcetX = coordFin.left - coordStart.left;
	let offcetY = coordFin.top - coordStart.top + 16;
	let step = 10;
	let image = objStart.cloneNode();
	image.classList.add(`product__image`, `product-shadow`);
	objStart.closest(`.product`).appendChild(image);

	let top = coordStart.top + window.pageYOffset; 
	let left = coordStart.left + window.pageXOffset;

	image.style.top = top + `px`;
	image.style.left = left + `px`;

	let countMove = 1;
	let intervalId = setInterval(() => {
		if (countMove <= step) {
			image.style.left = (left + offcetX / step * countMove) + `px`;
			image.style.top = (top + offcetY / step * countMove) + `px`;
			countMove += 1;
		} else {
			clearInterval(intervalId);
			image.remove();
		} 
	}, 30);
}