const pollTitle = document.getElementById(`poll__title`);
const pollAnswers = document.getElementById(`poll__answers`);
const poll = document.querySelector(`.poll`);
let xhr = new XMLHttpRequest();

/* почему не работает с async = false? */

xhr.open(`GET`, `https://students.netoservices.ru/nestjs-backend/poll`);
xhr.send();
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		let data = JSON.parse(xhr.responseText);
		//console.log(data);
		pollTitle.textContent = data.data.title;
		for (let i = 0; i < data.data.answers.length; i++) {
			let button = document.createElement(`button`);
			button.classList.add(`poll__answer`);
			button.textContent = data.data.answers[i];
			pollAnswers.appendChild(button);

			button.addEventListener(`click`, () => {
				alert(`Спасибо, ваш голос засчитан!`);
				let xhrPost = new XMLHttpRequest();
				xhrPost.open(`POST`, `https://students.netoservices.ru/nestjs-backend/poll`);
				xhrPost.setRequestHeader(`Content-type`, `application/x-www-form-urlencoded`);

				xhrPost.send(`vote=${data.id}&answer=${i}`);

				xhrPost.onreadystatechange = function() {
					if (xhrPost.readyState === 4) {
						let answer = JSON.parse(xhrPost.responseText);

						if (document.querySelector(`.result`) != null) {
							let result = Array.from(document.querySelectorAll(`.result`));
							for (let i = 0; i <  result.length; i++) {
								result[i].remove();
							}		
						}
						resultVoite(answer);
					}
				}
			});
		}
	};
}

function resultVoite(obj) {
	pollAnswers.classList.remove(`poll__answers_active`);
	
	let sum = 0;
	for (let i = 0; i < obj.stat.length; i++) {
		sum += obj.stat[i].votes;
	}

	for (let i = 0; i < obj.stat.length; i++) {
		let div = document.createElement(`div`);
		div.classList.add(`result`);
		div.textContent = `${obj.stat[i].answer}: ${(obj.stat[i].votes / (sum / 100)).toFixed(2)}%`;
		poll.appendChild(div);
	}
}