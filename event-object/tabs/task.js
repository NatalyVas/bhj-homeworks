const tabAll = document.querySelectorAll(`.tabs`);
const tabsAll = Array.from(tabAll);

//const switch_1 = document.getElementById(`tabs1`);

for (let i = 0; i < tabsAll.length; i++) {
	const tab = tabsAll[i].querySelector(`.tab__navigation`).querySelectorAll(`.tab`);
	const tabs = Array.from(tab);

	const tabContent = tabsAll[i].querySelector(`.tab__contents`).querySelectorAll(`.tab__content`);
	const tabsContent = Array.from(tabContent);
	 

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener(`click`, switch1);
		
		function switch1(event) {
			let index = tabsContent.findIndex(item => item.classList.contains(`tab__content_active`));
			tabsContent[index].classList.remove(`tab__content_active`);
			tabsContent[i].classList.add(`tab__content_active`);

			let index2 = tabs.findIndex(item => item.classList.contains(`tab_active`));
			tabs[index2].classList.remove(`tab_active`);
			tabs[i].classList.add(`tab_active`);
		}
	}
}