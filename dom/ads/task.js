
const rotatorCaseAll = document.querySelectorAll(`.rotator`);
const rotatorCaseAlls = Array.from(rotatorCaseAll);

for (let i = 0; i < rotatorCaseAlls.length; i++) {
	const rotatorCase = rotatorCaseAlls[i].querySelectorAll(`.rotator__case`);
	const rotatorCases = Array.from(rotatorCase);

	let speed = 1000;

	let intervalId = setInterval(change, speed);

	function change() {
		let index = rotatorCases.findIndex(item => item.classList.contains(`rotator__case_active`));
		rotatorCases[index].classList.remove(`rotator__case_active`);
		rotatorCases[(index + 1) % rotatorCases.length].classList.add(`rotator__case_active`);
		
		rotatorCases[(index + 1) % rotatorCases.length].style.color = rotatorCases[(index + 1) % rotatorCases.length].getAttribute(`data-color`);
		speed = rotatorCases[(index + 1) % rotatorCases.length].getAttribute(`data-speed`);
		clearInterval(intervalId);
		intervalId = setInterval(change, speed);

	}
}