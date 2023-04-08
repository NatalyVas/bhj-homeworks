const signin = document.getElementById(`signin`);
const form = document.getElementById(`signin__form`);
const button = document.getElementById(`signin__btn`);
const welcome = document.getElementById(`welcome`);
const exit = document.getElementById(`exit__btn`);

const storage = window.localStorage;
let arrayId = [];

if (storage.auth != null) {
	let storageAuth = JSON.parse(storage.auth);
	for (let s of storageAuth) {
		arrayId.push(s);
	}
}


button.addEventListener(`click`, () => {
	form.addEventListener(`submit`, (event) => {
		event.preventDefault();
		let formData = new FormData(form);
		let xhr = new XMLHttpRequest();
		xhr.responseType = `json`;

		xhr.open(`POST`, `https://students.netoservices.ru/nestjs-backend/auth`);
		xhr.send(formData);

		xhr.addEventListener(`load`, (event) => {
			let answer = xhr.response;
			findId(answer) ? showWelcome(answer) : authorization(answer);
		});
	});	
});

exit.addEventListener(`click`, () => {
	signin.classList.add(`signin_active`);
	welcome.classList.remove(`welcome_active`);
	clearForm();

	let index = arrayId.findIndex(item => item === document.getElementById(`user_id`).textContent);
	arrayId.splice(index, 1);
	storage.setItem(`auth`, JSON.stringify(arrayId));
})


function authorization(obj) {
	if (obj.success) {
		arrayId.push(obj.user_id);
		storage.setItem(`auth`, JSON.stringify(arrayId));
		showWelcome(obj);
	} else {
		alert(`Неверный логин/пароль`);
		clearForm();
	}
}

function findId(obj) {
	return arrayId.find(item => item === obj.user_id) != undefined;
}

function showWelcome(obj) {
	signin.classList.remove(`signin_active`);
	welcome.classList.add(`welcome_active`);
	document.getElementById(`user_id`).textContent = obj.user_id;
}

function clearForm() {
	//document.getElementsByName(`login`)[0].value = ``;
	//document.getElementsByName(`password`)[0].value = ``;
	form.reset();
}
