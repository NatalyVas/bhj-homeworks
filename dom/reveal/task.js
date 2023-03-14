const block = document.querySelectorAll(`.reveal`);
const blocks = Array.from(block);

document.addEventListener(`scroll`, checkBlock);

function checkBlock() {
	for (let i = 0; i < blocks.length; i++) {
		if (visible(blocks[i])) {
			blocks[i].classList.add(`reveal_active`)	
		}
	}
}

function visible(el) {
	const viewportHeight = window.innerHeight;
	const elTop = el.getBoundingClientRect().top;
	const elBottom = el.getBoundingClientRect().bottom;

	return elTop < viewportHeight || elBottom < viewportHeight ? true : false;
}