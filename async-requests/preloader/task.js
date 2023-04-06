const loader = document.getElementById(`loader`);
const items = document.getElementById(`items`);

const storage = window.localStorage;
const currences = Array.from(items.children).map(item => {
	let currency = {
		name: item.querySelector(`.item__code`).textContent,
		value: item.querySelector(`.item__value`).textContent
	}
});
//storage.clear();

if (storage.hasOwnProperty(`currency`)) {
	loader.classList.remove(`loader_active`);

	let elements = JSON.parse(storage.currency);

	for (let i = 0; i < elements.length; i++) {
		let el = makeItem();
		el.querySelector(`.item__code`).textContent = elements[i].name;
		el.querySelector(`.item__value`).textContent = elements[i].value;

		items.appendChild(el);
	}
}


let xhr = new XMLHttpRequest();
xhr.open(`GET`, `https://students.netoservices.ru/nestjs-backend/slow-get-courses`, true);
xhr.responseType = 'json';
xhr.send();
xhr.onload = function () {
	
		loader.classList.remove(`loader_active`);
		//xhr.responseType = 'json';
		let data = xhr.responseText;
		exchangeRates(data);
		
	};

function exchangeRates(list) {
	let valute = list.response.Valute;
	storage.clear();
	clearItems();

	for (let key in valute) {
		let unit = makeItem();

		unit.querySelector(`.item__code`).textContent = valute[key].CharCode;
		unit.querySelector(`.item__value`).textContent = valute[key].Value;

		items.appendChild(unit);

		let push = {
			name: unit.querySelector(`.item__code`).textContent,
			value: unit.querySelector(`.item__value`).textContent	
		}
		currences.push(push);

		storage.setItem(`currency`, JSON.stringify(currences));
	}
}

function makeItem() {
		let item = document.createElement(`div`);
		item.classList.add(`item`);
		
		let itemCode = document.createElement(`div`);
		itemCode.classList.add(`item__code`);
		item.appendChild(itemCode);

		let itemValue = document.createElement(`div`);
		itemValue.classList.add(`item__value`);
		item.appendChild(itemValue);

		let itemCurrency = document.createElement(`div`);
		itemCurrency.classList.add(`item__currency`);
		itemCurrency.textContent = `руб.`;
		item.appendChild(itemCurrency);

		return item;	
}

function clearItems() {
	let arrItems = Array.from(items.querySelectorAll(`.item`));
	for (let i of arrItems) {
		i.remove();
	}
}