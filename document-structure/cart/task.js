const controlDec = Array.from(document.querySelectorAll(`.product__quantity-control_dec`));
const controlInc = Array.from(document.querySelectorAll(`.product__quantity-control_inc`));
const productValue = Array.from(document.querySelectorAll(`.product__quantity-value`));
const cart = document.querySelector(`.cart__products`);

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
const products = Array.from(cart.children).map(item => {
	let cartProduct1 = {
		id: item.getAttribute(`data-id`),
		link: item.querySelector(`.cart__product-image`).src,
		count: item.querySelector(`.cart__product-count`).textContent
	}
});

if (storage.hasOwnProperty(`cart`)) {
	let elements = JSON.parse(storage.cart);
	for (let i = 0; i < elements.length; i++) {
		let p = makeCartProduct();
		p.dataset.id = elements[i].id;
		p.querySelector(`.cart__product-image`).setAttribute(`src`, elements[i].link);
		p.querySelector(`.cart__product-count`).textContent = elements[i].count;

	 	cart.appendChild(p);

	 	let push = {
			id: p.getAttribute(`data-id`),
			link: p.querySelector(`.cart__product-image`).src,
			count: p.querySelector(`.cart__product-count`).textContent	
		}
		products.push(push);

	 	document.querySelector(`.cart`).classList.add(`cart__visible`);

	 	deleteItem(p.querySelector(`.product__delete`));
	}
}

const productAdd = Array.from(document.querySelectorAll(`.product__add`));

for (let i = 0; i < productAdd.length; i++) {
	productAdd[i].addEventListener(`click`, () => {
		let product = makeCartProduct();
		product.dataset.id = productAdd[i].closest(`.product`).getAttribute(`data-id`);

		product.querySelector(`.cart__product-image`).setAttribute(`src`, productAdd[i].closest(`.product`).querySelector(`.product__image`).src);

		product.querySelector(`.cart__product-count`).textContent = productAdd[i].closest(`.product__quantity`).querySelector(`.product__quantity-value`).textContent;

		if (cart === null || !checkId(cart, product.dataset.id, productAdd[i].closest(`.product__quantity`).querySelector(`.product__quantity-value`).textContent
 )) {
			cart.appendChild(product);
			checkCart();

			let prod = {
				id: product.getAttribute(`data-id`),
				link: product.querySelector(`.cart__product-image`).src,
				count: product.querySelector(`.cart__product-count`).textContent	
			}
			products.push(prod);
			storage.setItem(`cart`, JSON.stringify(products));
		}

		deleteItem(product.querySelector(`.product__delete`));
	});
}

function deleteItem(button) {
	button.addEventListener(`click`, () => {
		button.closest(`.cart__product`).remove();

		let index = products.findIndex(item => item.id === button.closest(`.cart__product`).getAttribute(`data-id`));
		
		products.splice(index, 1);
		
		storage.setItem(`cart`, JSON.stringify(products));
		checkCart();
	});
}

function makeCartProduct() {
		let product1 = document.createElement('div');
		product1.classList.add(`cart__product`);

		let img = document.createElement(`img`);
		img.classList.add(`cart__product-image`);
		product1.appendChild(img);

		let count = document.createElement('div');
		count.classList.add(`cart__product-count`);
		product1.appendChild(count);

		let deleteButton = document.createElement(`div`);
		deleteButton.classList.add(`product__delete`);
		deleteButton.textContent = `Удалить`;
		product1.appendChild(deleteButton);

		return product1;
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