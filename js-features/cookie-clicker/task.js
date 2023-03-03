let cookie = document.getElementById(`cookie`);

let timeClick = 0;
let timeClickPrev = 0;

function countCookie() {
	document.getElementById(`clicker__counter`).textContent = Math.floor(document.getElementById(`clicker__counter`).textContent) + 1;
	// if (cookie.width === 200) {
	// 	cookie.width = 250;
	// } else {
	// 	cookie.width = 200;
	// }

	cookie.width = cookie.width === 200 ? 250 : 200;

	timeClick = Date.now() / 1000;

	document.getElementById(`clicker__speed`).textContent = (1/interval()).toFixed(2);

	timeClickPrev = timeClick;
}

function interval() {
	return timeClick - timeClickPrev;
}

cookie.onclick = countCookie;


