const button = document.getElementById(`tasks__add`);
const taskList = document.getElementById(`tasks__list`);
let deals = [];
let storage = window.localStorage;

if (storage.length > 0) {
	for (let i = 0; i < storage.length; i++) {
		let get = storage.getItem(i);
		let div = document.createElement(`div`);
		div.innerHTML = get;
		let el = div.firstChild;
		taskList.appendChild(el);
		deals.push(el);

		removeTask(el.querySelector(`.task__remove`));
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

		deals.push(deal);
		storage.setItem(deals.length - 1, deal.outerHTML);

		removeTask(a);

		taskList.appendChild(deal);

	}
	return false;
}
 
function removeTask(obj) {
	obj.addEventListener(`click`, (e) => {
		let index = deals.indexOf(obj.closest(`.task`));
		deals.splice(index, 1);
		storage.removeItem(index);
		obj.closest(`.task`).remove();

	});
} 

