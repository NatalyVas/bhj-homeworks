const modal = document.querySelector(`.modal`);

if (getCookie(`modal`) === null) {
	modal.classList.add(`modal_active`);
}

modal.querySelector(`.modal__close`).addEventListener(`click`, () => {
	modal.classList.remove(`modal_active`);
	document.cookie = `modal=` + encodeURIComponent(`close`);
});

function getCookie(name) {
	const pairs = document.cookie.split(`; `);
	const cookie = pairs.find(p => p.startWith(name + `=`));
	return cookie.substr(name.length + 1);
}

/*
	почему у меня в браузере куки не отображаются (куки пустые)??
*/