/*
брать ближайших детей через children наверное не правильно, а как их взять? 
(всех детей первой вложенности) 
Работает у меня только в одну сторону, затрудняюсь сделать в обратную.
или вообще это все не туда совсем
*/

const ul = document.querySelector(`ul`);
for (let li of ul.children) {
	checkBox(li);
}

function checkBox(li) {
	let children = li.children;
	for (let tag of Array.from(children)) {
		if (tag.tagName === `LABEL`) {
			tag.querySelector(`.interest__check`).addEventListener(`change`, change);
			//tag.querySelector(`.interest__check`).addEventListener(`change`, changeParents);

			function change() {
				let input = tag.querySelector(`.interest__check`);
				let into = Array.from(input.closest(`.interest`).querySelectorAll(`.interest__check`));
				if (input.checked) {
					for (let i of into) {
						i.checked = true;
					}
				} else {
					if (into.findIndex(item => item.checked === false) === -1) {
						input.checked = true;
					} else {
						if (into.findIndex(item => item.checked === true) != -1) {
							input.indeterminate = true;
						}
					}
				}
			}

			// function changeParents() {
			// 	let input = tag.querySelector(`.interest__check`);
			// 	let parent = input.closest(`.interests_active`).closest(`.interest`).querySelector(`.interest__check`);
			// 	if (!input.checked && parent.checked) {
			// 		parent.indeterminate = true;
			// 	}
			// }

		} else {
			for (let kid of tag.children) {
				checkBox(kid);
			}
		}
	}
}

