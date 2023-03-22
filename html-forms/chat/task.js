const redWidget = document.querySelector(`.chat-widget__side-text`);

redWidget.addEventListener(`click`, () => document.querySelector(`.chat-widget`).classList.add(`chat-widget_active`));

const messagesBox = document.getElementById(`chat-widget__messages`);

const input = document.getElementById(`chat-widget__input`);

const messages = [];

const list = [
	`Привет, как дела?`,
	`Что ты здесь забыл?`,
	`Голова болит`
	];

const time = new Date;

const container = document.querySelector(`.chat-widget`);

const viewHeight = container.getBoundingClientRect().height;

function visible(el) {
	const elBottom = el.getBoundingClientRect().bottom;
	return container.getBoundingClientRect().top < elBottom && elBottom < container.getBoundingClientRect().bottom - input.getBoundingClientRect().height;
}
let timeoutId;
let messageNew;

input.addEventListener('keyup', sendMessage);
function sendMessage(e) {
	if (e.code === `Enter`) {
		clearTimeout(timeoutId);
		if (input.value != ``) {
			messagesBox.innerHTML +=
		 	`<div class="message message_client">
            	<div class="message__time">${time.getHours()}:${time.getMinutes()}</div>
            	<div class="message__text">${input.value}</div>
         	</div>

         	<div class="message">
            	<div class="message__time">${time.getHours()}:${time.getMinutes()}</div>
            	<div class="message__text">${list[Math.floor(Math.random() * list.length)]}</div>
             </div>`
			;
		}
		input.value = ``;
		messageNew = messagesBox.querySelectorAll(`.message`);
		messages.push(messageNew.item(messageNew.length - 1));
		messages.push(messageNew.item(messageNew.length - 2));
		  

		if (!visible(messages[messages.length - 1])) {
			/*
				здесь должна быть прокрутка скрола, наверное типа того (container.scrollTo(0, Y)),
				но эта не работает, как сделать я не знаю
			*/
		}

		 timeoutId = setTimeout(() => {
 			messagesBox.innerHTML +=
		 	`<div class="message">
            	<div class="message__time">${time.getHours()}:${time.getMinutes()}</div>
            	<div class="message__text">${list[Math.floor(Math.random() * list.length)]}</div>
         	</div>`;
         	messageNew = messagesBox.querySelectorAll(`.message`);
			messages.push(messageNew.item(messageNew.length - 1));
     		}, 30000);
	}
}

