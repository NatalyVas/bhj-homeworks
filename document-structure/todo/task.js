const button = document.getElementById(`tasks__add`);
const taskList = document.getElementById(`tasks__list`);
let deals = [];
let storage = window.localStorage;
//storage.clear();

if (storage.hasOwnProperty(`tasks`) && storage.tasks.length != 0) {
	for (let i = 0; i < storage.tasks.length; i++) {
		let get = storage.getItem(storage.tasks[i]);
		let div = JSON.parse(get);

		// let div = document.createElement(`div`);
		// div.innerHTML = get;
		// let el = div.firstChild;
		taskList.appendChild(div);
		deals.push(get);

		removeTask(div.querySelector(`.task__remove`));
	}
}

button.onclick = () => {
	let input = document.getElementById(`task__input`).value;
	document.getElementById(`task__input`).value = ``;
	if (input.length > 0) {
		let deal = document.createElement('div');
		deal.classList.add(`task`); 
		let title = document.createElement(`div`);
		title.classList.add(`task__title`);

		title.innerText = input;
		deal.appendChild(title);

		let a = document.createElement(`a`);
		a.href = `#`;
		a.classList.add(`task__remove`);
		a.innerHTML = `&times;`;
		deal.appendChild(a);

		/*
			здесь проблема, надо разметку превратить в строку, но JSON.stringify
			выдает пустой объект. как это надо делать?
		*/

		deals.push(JSON.stringify(deal));

		storage.setItem(`tasks`, deals);

		removeTask(a);

		taskList.appendChild(deal);

	}
	return false;
}
 
function removeTask(obj) {
	obj.addEventListener(`click`, (e) => {
		let index = deals.indexOf(obj.closest(`.task`));
		deals.splice(index, 1);
		storage.removeItem(tasks.deals[index]);
		obj.closest(`.task`).remove();

	});
} 

