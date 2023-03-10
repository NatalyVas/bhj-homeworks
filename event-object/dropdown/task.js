const dropdownList = document.getElementsByClassName(`dropdown`);
const dropdownLists = Array.from(dropdownList);


for (let i = 0; i < dropdownLists.length; i++) {


	const elValue = dropdownLists[i].querySelector(`div.dropdown__value`);
	//let elValues = Array.from(elValue);

	const ulList = dropdownLists[i].querySelector(`ul.dropdown__list`);


	elValue.addEventListener(`click`, upClose);

	function upClose() {
		ulList.classList.contains(`dropdown__list_active`) ? ulList.classList.remove(`dropdown__list_active`) : ulList.classList.add(`dropdown__list_active`);
	}

	const liList = ulList.querySelectorAll(`.dropdown__link`);
	let liLists = Array.from(liList);

	for (let i = 0; i < liLists.length; i++) {
		//liLists[i].addEventListener(`click`, choice);
		liLists[i].onclick = choice;

		function choice() {
			elValue.textContent = liLists[i].textContent;
			ulList.classList.remove(`dropdown__list_active`);
			return false;
		}
	}
}

