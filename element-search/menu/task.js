const menus = document.querySelectorAll(`ul.menu.menu_main`);

for (let i = 0; i < menus.length; i++) {

	const menu = menus[i].getElementsByClassName(`menu__link`);

	const ulAll = menus[i].querySelectorAll(`ul`);

		for (let j = 0; j < menu.length; j++) {
			menu[j].onclick = menuClick;
			
			function menuClick() {
				const parent = menu[j].closest(`li`);
				const openUl = parent.querySelector(`ul`);

				if (openUl === null) { 
					return true;
				} 
				
				if (openUl != null && !openUl.classList.contains(`menu_active`)) {
					openUl.classList.add(`menu_active`);

					for (let x = 0; x < ulAll.length; x++) {
						if (ulAll[x] != openUl && ulAll[x].classList.contains(`menu_active`)) {
							ulAll[x].classList.remove(`menu_active`);
						}
					}
					
				} else {
					openUl.classList.remove(`menu_active`);
				}
				return false;
			} 
		}
}