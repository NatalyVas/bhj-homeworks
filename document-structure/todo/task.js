const button = document.getElementById(`tasks__add`);
const taskList = document.getElementById(`tasks__list`);
const names = Array.from(taskList.children).map((item) => item.querySelector(`.task__title`).textContent);
let storage = window.localStorage;
//storage.clear();

if (storage.hasOwnProperty(`tasks`)) {
	/*
	как из строки сделать массив, если в тексте элемента используется запятая?
	не только как разделитель, но и внутри текста	
	*/

	let deals = storage.tasks.split(`,`);
	for (let i = 0; i < deals.length; i++) {
		let div = makeTask(deals[i]);
		taskList.appendChild(div);

		removeTask(div.querySelector(`.task__remove`));
	}
}

button.onclick = () => {
	let input = document.getElementById(`task__input`).value;
	document.getElementById(`task__input`).value = ``;
	if (input.length > 0) {
		let deal = makeTask(input);
		taskList.appendChild(deal);

		names.push(deal.querySelector(`.task__title`).textContent);

		storage.setItem(`tasks`, names);
		console.log(storage.setItem(`tasks`, names));

		removeTask(deal.querySelector(`.task__remove`));

	}
	return false;
}
 
function removeTask(obj) {
	obj.addEventListener(`click`, (e) => {
		let index = names.indexOf(obj.closest(`.task`).querySelector(`.task__title`).textContent);
		names.splice(index, 1);
		storage.setItem(`tasks`, names);
		obj.closest(`.task`).remove();

	});
}

function makeTask(text) {
	let deal = document.createElement('div');
	deal.classList.add(`task`); 
	let title = document.createElement(`div`);
	title.classList.add(`task__title`);

	title.innerText = text;
	deal.appendChild(title);

	let a = document.createElement(`a`);
	a.href = `#`;
	a.classList.add(`task__remove`);
	a.innerHTML = `&times;`;
	deal.appendChild(a);
	return deal;	
} 

