const textA = Array.from(document.querySelectorAll(`.has-tooltip`));

for (let a of textA) {
		addTooltip(a); 
	}

for (let a of textA) {
	a.onclick = (e) => {
		let target = event.target;

	 	for (let b of textA) {
	 		if (b != a) {
	 			b.querySelector(`.tooltip`).classList.remove(`tooltip_active`);
	 		}
	 	}

		if (a.querySelector(`.tooltip`).classList.contains(`tooltip_active`)) {
	 		a.querySelector(`.tooltip`).classList.remove(`tooltip_active`);
	 	} else {
	 		a.querySelector(`.tooltip`).classList.add(`tooltip_active`);
	 	}

	 	let atrPosition = a.querySelector(`.tooltip`).getAttribute(`data-position`);
		let coords = target.getBoundingClientRect();

		let left = coords.left;
		let top = coords.top;

		if (atrPosition === `bottom`) {
		 	top = top + coords.height;
		} else 
		if (atrPosition === `top`) {
			top = top - coords.height; 
		} else 
		if (atrPosition === `left`) {
			left = left - coords.width;
		} else {
			left = left + coords.width;
		}
		

		a.querySelector(`.tooltip`).style.left = left + 'px';
		a.querySelector(`.tooltip`).style.top = top + 'px';
		return false;
	}
}


function addTooltip(el) {
	let tooltip = document.createElement('div');
	tooltip.innerText = el.title;
	tooltip.classList.add(`tooltip`);

	tooltip.dataset.position = `bottom`;

	el.appendChild(tooltip);
}