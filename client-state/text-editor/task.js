const storage = window.localStorage;
//storage.clear();
const textarea = document.getElementById(`editor`);
const save = document.querySelector(`.toStorage`);
const clear = document.querySelector(`.clear`);

textarea.textContent = storage.getItem(`text`);

save.addEventListener(`click`, () => {
	storage.setItem(`text`, textarea.value);
});

clear.addEventListener(`click`, () => {
	textarea.value = ``;
	storage.removeItem(`text`);
})