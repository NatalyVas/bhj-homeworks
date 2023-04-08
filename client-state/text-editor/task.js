const storage = window.localStorage;
//storage.clear();
const textarea = document.getElementById(`editor`);
const save = document.querySelector(`.toStorage`);
const clear = document.querySelector(`.clear`);

if (storage.text != null) {
	textarea.textContent = storage.text;
}

save.addEventListener(`click`, () => {
	storage.setItem(`text`, textarea.value);
});

clear.addEventListener(`click`, () => {
	textarea.value = ``;
	storage.setItem(`text`, textarea.value);
});