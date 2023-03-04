const windowMain = document.getElementById(`modal_main`);
windowMain.classList.add(`modal_active`);
const windowShowSuccess = document.getElementById(`modal_success`);

function closeWindow() {
	windowMain.classList.remove(`modal_active`);
	windowShowSuccess.classList.remove(`modal_active`);
}

const closeButton = document.getElementsByClassName(`modal__close_times`);

for (let i = 0; i < closeButton.length; i++) {
	closeButton.item(i).onclick = closeWindow;
}

function showSuccess() {
	windowShowSuccess.classList.add(`modal_active`);
	windowMain.classList.remove(`modal_active`);
}

const buttonShowSuccess = document.getElementsByClassName(`show-success`);
buttonShowSuccess.item(0).onclick = showSuccess;
