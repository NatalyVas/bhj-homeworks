const form = document.getElementById(`form`);
const progress = document.getElementById(`progress`);

form.addEventListener(`submit`, (e) => {
	e.preventDefault();
	let formData = new FormData(form);
	let xhr = new XMLHttpRequest();

	xhr.upload.addEventListener(`progress`, (e) => {
		progress.value = Math.round(event.loaded / event.total);
	}, false);
	xhr.addEventListener('load', (e) => {
		progress.value = 0;
	}, false)

	xhr.open(`POST`, `https://students.netoservices.ru/nestjs-backend/upload`);
	xhr.send(formData);

	return false;
	
});